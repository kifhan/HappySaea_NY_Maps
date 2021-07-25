import React from 'react'
import MapView, { MarkerData } from '../Components/MapView'
import Video from '../Components/Video'
import { YouTubeProps } from "react-youtube";

import data from '../Stores/VideoData.json'

import CSS from 'csstype';
import PlayMapControl from '../Components/PlayMapControl';
import { useWindowSize } from '../Utils/WindowSIze';
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
  const screensize = useWindowSize()
  const clipWidth = (screensize.width > 720) ? 720 : screensize.width

    const [playTime, setPlayTime] = React.useState(0)
    // const [count, setCount] = React.useState(0)
    const [anchoring, setAnchoring] = React.useState<{ marker?: MarkerData, lat: number, lng: number, zoom: number }>({ lat: 0, lng: 0, zoom: 0 })
    const videoref: { current?: YouTubeProps } | any = React.useRef(null)

    // for (var i = 0; i < data.markers.length; i++) {
    //     for (var i = 0; i < data.markers.length; i++) {
    //         const tarr = data.markers[i].seekto.split(":");
    //         const seconds = parseInt(tarr[0]) * 60 + parseInt(tarr[1]);
    //         data.markers[i].seconds = seconds
    //     }
    // }

    useAnimationFrame((deltaTime: any, framecount: any) => {
        let player = videoref.current

        if (framecount.current === 0 && player.playerInfo && player.playerInfo.playerState === 1) {
            // console.log(player.playerInfo.playerState); 
            // console.log(player)
            var ptime = Math.round(player.getCurrentTime());
            console.log("playtime is " + ptime)
            for (var i = 0; i < data.markers.length; i++) {
                const tarr = data.markers[i].seekto.split(":");
                const seconds = parseInt(tarr[0]) * 60 + parseInt(tarr[1]);
                // console.log("give"+ data.markers[i].title +" me " + seconds)
                if (seconds === ptime) {
                    // if (data.markers[i].type === 'visible') break;
                    // data.markers[i].type = 'visible';
                    //data.markers[i].marker.setMap(map);
                    // data.markers[i].marker.setIcon(icons[data.markers[i].type].icon)

                    // map.panTo(data.markers[i].position);
                    // if (map.getZoom() != 15) map.setZoom(15);
                    console.log("this you get it? " + data.markers[i].title)
                    setAnchoring({ lat: data.markers[i].position[0], lng: data.markers[i].position[1], zoom: 16, marker: data.markers[i] })
                } else {
                    //data.markers[i].marker.setMap(null);
                    // data.markers[i].marker.setIcon(icons[data.markers[i].type].icon)
                    // data.markers[i].type = 'hidden';
                    // map.setZoom(14);
                }
            }
            setPlayTime(ptime)
        }

    })

    const onReady = (e: { target: any }) => {
        console.log("video [end]: " + e.target.playerInfo.playerState);
        videoref.current = e.target
    }
    const onPlay = (e: { target: any }) => {
        console.log("video [play]: " + e.target.playerInfo.playerState);
    }
    const onPause = (e: { target: any }) => {
        console.log("video [pause]: " + e.target.playerInfo.playerState);
    }
    const onEnd = (e: { target: any }) => {
        console.log("video [end]: " + e.target.playerInfo.playerState);
    }
    const onStateChange = (e: { target: any }) => {
        console.log("video state: " + e.target.playerInfo.playerState); // -1: load, 0: end, 1: play, 2: pause, 3: ready
        // const duration = e.target.getDuration();
        // const currentTime = e.target.getCurrentTime();
        videoref.current = e.target
    }

    const onMarkerPlayClick = (marker: MarkerData) => {
        let player = videoref.current
        console.log("on marker play button clicke")
        if (marker && player.playerInfo) {
            // player.seekTo(seconds:Number, allowSeekAhead:Boolean):Void
            const tarr = marker.seekto.split(":");
            const seconds = parseInt(tarr[0]) * 60 + parseInt(tarr[1]);
            player.seekTo(seconds, true);
            player.playVideo();
        }
    }
    return (
        <div style={{...styles.container, width: `${clipWidth}px`}}>
            {/* <div>{Math.round(count)}</div> */}
            <Video videoref={videoref} videoCode={data.videoId} width={clipWidth} height={405/720*clipWidth} {...{ onReady, onPlay, onPause, onEnd, onStateChange }} />
            <PlayMapControl width={clipWidth} height={36} markers={data.markers} duration={data.duration} playTime={playTime}
                onMarkerClick={(marker: MarkerData) => {
                    setAnchoring({ lat: marker.position[0], lng: marker.position[1], zoom: 15, marker: marker })
                }} />
            <MapView mapCenter={data.center} height={`calc(100% - ${405/720*clipWidth}px - 36px)`} markers={data.markers} anchoring={anchoring} onMarkerPlayClick={onMarkerPlayClick} />
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
