import React, { useEffect, useState, useRef } from 'react'
import MapView from '../Components/MapView'
import { MarkerData } from '../Utils/types'
import Video from '../Components/Video'
import { YouTubeProps } from "react-youtube";
import PlayMapControl from '../Components/PlayMapControl';
import { useWindowSize } from '../Utils/WindowSIze';
import CSS from 'csstype';
import { authService, dbService, firebaseInstance as firebase } from '../Stores/firebase';
import { useHistory, useParams } from 'react-router-dom';
import moment from 'moment';
import { Box } from '@chakra-ui/react';

const css = (style: CSS.Properties) => { return style };

const useAnimationFrame = (callback: any) => {
    // Use useRef for mutable variables that we want to persist
    // without triggering a re-render on their change
    const requestRef = React.useRef(0);
    const previousTimeRef = React.useRef(0);
    const framecount = React.useRef(0);

    const animate = (time: any) => {
        if (previousTimeRef.current) {
            const deltaTime = time - Number(previousTimeRef.current);
            framecount.current = (framecount.current + 1) % 60
            callback(deltaTime, framecount)
        }
        previousTimeRef.current = time;
        requestRef.current = requestAnimationFrame(animate);
    }

    React.useEffect(() => {
        requestRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(requestRef.current);
    }, []); // Make sure the effect runs only once
}

interface Props {

}

const PlayScreen = (props: Props) => {
    let { videoId } = useParams<any>();
    const screensize = useWindowSize()
    const clipWidth = (screensize.width > 720) ? 720 : screensize.width

    const [locationCenter, setlocationCenter] = useState({ lat: 0, lng: 0 })
    const [mapmarkers, setMarkers] = useState<MarkerData[]>([])
    const markersRef = useRef<MarkerData[]>(mapmarkers)
    useEffect(() => { markersRef.current = mapmarkers }, [mapmarkers])
    const [anchoring, setAnchoring] = React.useState<{ marker: any, lat: number, lng: number, zoom: number }>({ marker: null, lat: 0, lng: 0, zoom: 0 })
    const anchorRef = useRef<any>(anchoring)
    useEffect(() => { anchorRef.current = anchoring }, [anchoring])

    const videoref: { current?: YouTubeProps } | any = React.useRef(null)
    const [duration, setDuration] = useState(0)
    const [playTime, setPlayTime] = React.useState(0)
    const [videodbData, setVideodbData] = useState<any>({})

    let history = useHistory();

    useEffect(() => {
        // console.log("use params", videoId)
        dbService.collection(`/videos/${videoId}/markerComments`).get().then((querySnapshot) => {
            const tmarkers: Array<MarkerData> = []
            querySnapshot.forEach((doc) => {
                // console.log(`${doc.id} => ${doc.data()}`);
                const tdata = doc.data()
                tmarkers.push({
                    id: doc.id,
                    position: [tdata.position.latitude, tdata.position.longitude],
                    title: tdata.title,
                    type: tdata.type,
                    seekto: tdata.seekto,
                    description: tdata.description,
                    uid: tdata.uid,
                })
            });
            tmarkers.forEach((tmarker) => {
                if (tmarker.seekto) tmarker.seekAsSeconds = moment.duration(tmarker.seekto.split(':').length === 2 ? `00:${tmarker.seekto}` : tmarker.seekto).asSeconds()
            })
            tmarkers.sort((a, b) => {
                const asec = a.seekAsSeconds || 0
                const bsec = b.seekAsSeconds || 0
                return asec - bsec
            })
            // console.log("markers being set. lenght: " + tmarkers.length)
            setMarkers(tmarkers)
        });
        dbService.collection("videos").doc(videoId).get().then((doc) => {
            //   console.log(`${doc.id} => ${doc.data()}`);
            const tdata = doc.data()
            if (tdata) {
                setVideodbData(tdata)
                setlocationCenter({ lat: tdata.center.latitude, lng: tdata.center.longitude })
                const darr = moment.duration(tdata.duration.split(':').length === 2 ? `00:${tdata.duration}` : tdata.duration)
                const tduration = darr.asSeconds()
                setDuration(tduration)
            }
        })
        return () => { }
    }, [])

    useAnimationFrame((deltaTime: any, framecount: any) => {
        let player = videoref.current

        if (framecount.current === 0 && player.playerInfo && player.playerInfo.playerState === 1) {
            // console.log(player.playerInfo.playerState); 
            // console.log(player)
            var ptime = Math.round(player.getCurrentTime());
            // console.log("playtime is " + ptime)

            const markers = markersRef.current.filter((marker) => marker.type === "info")
            const tanchor = anchorRef.current
            // console.log("markers", markers)
            for (var i = 0; i < markers.length; i++) {
                const seconds: any = markers[i].seekAsSeconds
                const nextSeconds: any = markers[i + 1] ? markers[i + 1].seekAsSeconds : player.getDuration()
                if (ptime >= seconds && ptime < nextSeconds && (!tanchor.marker || tanchor.marker.seekto !== markers[i].seekto)) {
                    // if (markers[i].type === 'visible') break;
                    // markers[i].type = 'visible';
                    // console.log((tanchor.marker ? tanchor.marker.title : "") + " : " + markers[i].title)
                    setAnchoring({ lat: markers[i].position[0], lng: markers[i].position[1], zoom: 16, marker: markers[i] })
                } else {
                    // markers[i].marker.setIcon(icons[markers[i].type].icon)
                    // markers[i].type = 'hidden';
                }
            }
            setPlayTime(ptime)
        }
    })

    const onReady = (e: { target: any }) => {
        // console.log("video [end]: " + e.target.playerInfo.playerState);
        videoref.current = e.target
    }
    const onPlay = (e: { target: any }) => {
        // console.log("video [play]: " + e.target.playerInfo.playerState);
    }
    const onPause = (e: { target: any }) => {
        // console.log("video [pause]: " + e.target.playerInfo.playerState);
    }
    const onEnd = (e: { target: any }) => {
        // console.log("video [end]: " + e.target.playerInfo.playerState);
    }
    const onStateChange = (e: { target: any }) => {
        console.log("video state: " + e.target.playerInfo.playerState); // -1: load, 0: end, 1: play, 2: pause, 3: ready
        videoref.current = e.target
        // const duration = e.target.getDuration();
        let player = videoref.current
        var ptime = Math.round(player.getCurrentTime());
        setPlayTime(ptime)
    }
    const onPlaybackRateChange = (e: { target: any }) => {
        // console.log("video playback rate: " + e.target.getPlaybackRate());
    }

    const onMarkerPlayClick = (marker: MarkerData) => {
        let player = videoref.current
        // console.log("on marker play button click")
        if (marker && player.playerInfo && marker.seekto) {
            // player.seekTo(seconds:Number, allowSeekAhead:Boolean):Void
            const tarr = marker.seekto.split(":");
            const seconds = parseInt(tarr[0]) * 60 + parseInt(tarr[1]);
            player.seekTo(seconds, true);
            player.playVideo();
        }
    }

    const onPostNewMarker = (marker: MarkerData) => {
        if (authService.currentUser) {
            // console.log("on post new marker")
            // console.log(marker)
            const markercomment = {
                uid: authService.currentUser?.uid,
                createdat: Date.now(),
                description: marker.description,
                position: new firebase.firestore.GeoPoint(marker.position[0], marker.position[1]),
                seekto: marker.seekto,
                title: marker.title,
                type: marker.type,
            }
            dbService.collection("videos").doc(videoId).collection("markerComments").add(markercomment).then((doc) => {
                console.log("marker added")
                marker.id = doc.id
                setMarkers([...mapmarkers, marker])
            }).catch((error) => {
                console.log(error)
            })
        }
    }

    const onEditMarker = (marker: MarkerData) => {
        if (authService.currentUser) {
            // console.log(marker)
            const markercomment = {
                uid: marker.uid,
                createdat: Date.now(),
                description: marker.description,
                position: new firebase.firestore.GeoPoint(marker.position[0], marker.position[1]),
                seekto: marker.seekto,
                title: marker.title,
                type: marker.type,
            }
            dbService.collection("videos").doc(videoId).collection("markerComments").doc(marker.id).update(markercomment).then((doc) => {
                console.log("marker updated")
                setMarkers([...mapmarkers.filter((m) => m.id !== marker.id), marker])
            }).catch((error) => {
                console.log(error)
            })
        }
    }

    const onEditVideoItem = (data: any) => {
        // console.log("on edit video item")
        // console.log(data)
        dbService.collection("videos").doc(videoId).update({
            center: new firebase.firestore.GeoPoint(data.position[0], data.position[1]),
        }).then(() => {
            console.log("video item updated")
        }).catch((error) => {
            console.log(error)
        })
    }

    const onRemoveVideoItem = () => {
        // console.log("on remove video item")
        history.push("/")
        dbService.collection("videos").doc(videoId).delete().then(() => {
            console.log("video deleted")
            history.push("/")
        }).catch((error) => {
            console.log(error)
        })
    }

    const onRemoveMarker = (marker: MarkerData) => {
        // console.log("on remove marker")
        // console.log(marker)
        dbService.collection("videos").doc(videoId).collection("markerComments").doc(marker.id).delete().then((doc) => {
            console.log("marker deleted")
            setMarkers([...mapmarkers.filter((m) => m.id !== marker.id)])
        }).catch((error) => {
            console.log(error)
        })
    }

    return (
        <div style={{ ...styles.container, width: `${clipWidth}px` }}>
            {/* <div>{Math.round(count)}</div> */}
            <Box width={clipWidth} height={405 / 720 * clipWidth} background="#444">
                <Video videoref={videoref} videoCode={videoId} width={clipWidth} height={405 / 720 * clipWidth} {...{ onReady, onPlay, onPause, onEnd, onStateChange, onPlaybackRateChange }} />
            </Box>
            <Box width={clipWidth} height="36px" background="#eee">
                {duration && <PlayMapControl width={clipWidth} height={36} markers={mapmarkers.filter((marker) => marker.type === "info")} duration={duration} playTime={playTime}
                    onMarkerClick={(marker: MarkerData) => {
                        setAnchoring({ lat: marker.position[0], lng: marker.position[1], zoom: 15, marker: marker })
                    }} />}
            </Box>
            {locationCenter && <MapView
                videoId={videoId}
                userId={authService.currentUser ? authService.currentUser.uid : ""}
                isUserOwner={authService.currentUser && authService.currentUser.uid === videodbData.uid ? true : false}
                mapCenter={locationCenter} height={`calc(100% - ${405 / 720 * clipWidth}px - 36px)`}
                markers={mapmarkers} anchoring={anchoring} playTime={playTime}
                onMarkerPlayClick={onMarkerPlayClick}
                onPostNewMarker={onPostNewMarker}
                onEditMarker={onEditMarker}
                onEditVideoItem={onEditVideoItem}
                onRemoveVideoItem={onRemoveVideoItem}
                onRemoveMarker={onRemoveMarker}
            />}
        </div>
    )
}

const styles = {
    container: css({
        height: '100%', width: '720px',
        display: "flex",
        flexDirection: "column",
        alignItems: "left"
    }),
    content: css({

    })
};


export default PlayScreen
