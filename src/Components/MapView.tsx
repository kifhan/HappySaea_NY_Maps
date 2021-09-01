import React, { useEffect, useState, useRef } from 'react'
import {
    GoogleMap, LoadScript, useGoogleMap, Marker, StandaloneSearchBox, InfoWindow
    // MarkerProps
} from '@react-google-maps/api';
import { Box, Text, useBoolean } from '@chakra-ui/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { googleApi } from '../googleApi.config';
import { useWindowSize } from '../Utils/WindowSIze';
import { MarkerPostModal } from './MarkerPostModal';
import moment from 'moment';
import { EditVideoItemModal } from './EditVideoItemModal';
import { MarkerEditModal } from './MarkerEditModal';
// import markersvg from '../marker.svg';
// import { Link } from 'react-router-dom';
import { MarkerData, MarkerIconType } from '../Utils/types'

var iconBase = '/images/';
var icons = {
    info: {
        icon: iconBase + 'info.png'
    },
    me: {
        icon: iconBase + 'happy_person.png'
    },
    jellyfish: {
        icon: iconBase + 'jellyfish.png'
    },
    jellyfishJump: {
        icon: iconBase + 'jellyfish_jump.png'
    },
    alien: {
        icon: iconBase + 'alien.png'
    },
    devil: {
        icon: iconBase + 'devil.png'
    },
    exploding: {
        icon: iconBase + 'exploding.png'
    },
    ghost: {
        icon: iconBase + 'ghost.png'
    },
    poo: {
        icon: iconBase + 'poo.png'
    },
    robot: {
        icon: iconBase + 'robot.png'
    },
    // cycling: {
    //     icon: iconBase + 'info.png'
    // },
    // walking: {
    //     icon: iconBase + 'info.png'
    // },
    // driving: {
    //     icon: iconBase + 'info.png'
    // },
    // flying: {
    //     icon: iconBase + 'info.png'
    // }
};

const _libraries: ("places" | "drawing" | "geometry" | "localContext" | "visualization")[] = ["places"];

interface Props {
    markers: Array<MarkerData>;
    height?: string;
    width?: string;
    mapCenter: { lat: number, lng: number },
    anchoring?: { marker: MarkerData, lat: number, lng: number, zoom: number };
    playTime: number;
    userId: string;
    isUserOwner: boolean;
    videoId: string;
    onMarkerPlayClick?: (marker: MarkerData) => void;
    onPostNewMarker: (marker: MarkerData) => void;
    onEditMarker: (marker: MarkerData) => void;
    onEditVideoItem: (data: any) => void;
    onRemoveVideoItem: () => void;
    onRemoveMarker: (marker: MarkerData) => void;
}

const MapView = ({ userId, videoId, isUserOwner, mapCenter, markers, anchoring, width = "100%", height = "100%", playTime, onMarkerPlayClick, onPostNewMarker, onEditMarker, onEditVideoItem, onRemoveVideoItem, onRemoveMarker }: Props) => {
    const screensize = useWindowSize()
    // const clipWidth = (screensize.width > 720) ? "720px" : `${screensize.width}px`
    const clipWidthNum = (screensize.width > 720) ? 720 : screensize.width
    const mapApiKey = (process.env.NODE_ENV === "development") ? googleApi.local : googleApi.web
    // console.log("map key is " + mapApiKey)
    const [anchor, setAnchor] = useState({ ...mapCenter, zoom: 11 })
    // const { lat, lng, zoom } = anchoring || {lat:0, lng:0, zoom:0}
    const [infomarker, setinfomarker] = useState<MarkerData>({ position: [0, 0], title: "", type: "info", seekto: "00:00" })
    const searchBox = useRef<any>(null)
    const googlemap = useRef<any>(null)
    const infoWindow = useRef<any>({})
    const [currentMapCenter, setCurrentMapCenter] = useState({ lat: 0, lng: 0 })
    const [markerPostButtonHover, setMarkerPostButtonHover] = useBoolean(false)
    const containerRef = useRef<HTMLDivElement>(null)

    // useEffect(() => {
    //     // if (markers.length) setinfomarker(markers[0])
    //     console.log(mapCenter)
    //     return () => {}
    // }, [])

    useEffect(() => {
        if (anchoring?.marker) {
            setAnchor(anchoring)
            setinfomarker(anchoring.marker)
            infoWindow.current.open(googlemap.current)
        }
    }, [anchoring])

    return (
        <div ref={containerRef} style={{ ...styles.container, width, height }}>
            <Box
                width="120px"
                position="absolute" bottom="0" left="0" right="0"
                display="flex" justifyContent="center" alignItems="center" paddingBottom="24px"
                zIndex="9999"
            >
                {userId && <Box width="120px" transform={`translate(${(screensize.width / 2) - (clipWidthNum / 2)}px, 0)`}
                    paddingLeft="24px" display="flex" flexDir="row" alignItems="center" justifyContent="flex-start" >
                    {isUserOwner && <Box marginRight="8px"><EditVideoItemModal
                        position={{
                            lat: currentMapCenter.lat,
                            lng: currentMapCenter.lng
                        }} onSubmit={() => {
                            onEditVideoItem({
                                position: [currentMapCenter.lat, currentMapCenter.lng]
                            })
                        }} onRemove={() => {
                            onRemoveVideoItem()
                        }} /></Box>}
                    <Box><MarkerPostModal
                        position={{
                            lat: currentMapCenter.lat,
                            lng: currentMapCenter.lng
                        }}
                        playtime={playTime}
                        icons={Object.keys(icons) as MarkerIconType[]}
                        onSubmit={(title, description, type) => {
                            let markerPlayTime: any = moment.duration(playTime, "seconds")
                            markerPlayTime = (markerPlayTime.hours() ? markerPlayTime.hours() + ":" : "") + markerPlayTime.minutes() + ":" + markerPlayTime.seconds()
                            onPostNewMarker({
                                position: [currentMapCenter.lat, currentMapCenter.lng],
                                title,
                                description,
                                seekto: markerPlayTime,
                                type: type,
                                uid: userId
                            })
                        }}
                        onButtonHover={() => {
                            setMarkerPostButtonHover.on()
                        }}
                        onButtonHoverOut={() => {
                            setMarkerPostButtonHover.off()
                        }} /></Box>
                    {(markerPostButtonHover && containerRef.current) && <Box
                        transform={`translate(${(clipWidthNum / 2) - 234}px, ${(containerRef.current?.clientHeight / -2 + 46)}px)`}
                        width="180px" height="98px" fontSize="18px" padding="18px"
                        position="absolute" background="#444" color="#eee" borderRadius="12px" _after={styles.speechBubblePointer}
                    >
                        <Box position="absolute" width="0" height="0" border="26px solid transparent" borderLeftColor="#444" borderRight="0" top="50%" right="0" marginTop="-26px" marginRight="-26px" ></Box>
                        <Text>
                            {`Insert new marker at this location.`}
                        </Text>
                    </Box>}
                </Box>}
            </Box>
            <LoadScript googleMapsApiKey={mapApiKey} libraries={_libraries}>
                <GoogleMap
                    onLoad={(ref: any) => { googlemap.current = ref }}
                    // ref={googlemap} // not working
                    mapContainerStyle={styles.container}
                    center={mapCenter}
                    // center={{lat: 0, lng: 0}}
                    zoom={12}
                    onCenterChanged={() => {
                        if (googlemap.current) {
                            // console.log("map center: " + googlemap.current.center.lat() + ", " + googlemap.current.center.lng())
                            setCurrentMapCenter({ lat: googlemap.current.center.lat(), lng: googlemap.current.center.lng() })
                        }
                    }}
                >
                    { /* Child components, such as markers, info windows, etc. */
                        markers.map((marker, i) => (
                            <Marker
                                key={`${videoId}.${i}.${marker.seekto}`}
                                title={marker.title}
                                icon={icons[marker.type].icon}
                                options={{ map: googlemap.current }}
                                onClick={() => {
                                    if (googlemap.current && infoWindow.current) {
                                        // console.log("marker clicked: " + marker.title)
                                        setinfomarker(marker)
                                        infoWindow.current.open(googlemap.current)
                                    }
                                }}
                                position={{
                                    lat: marker.position[0],
                                    lng: marker.position[1],
                                }} />
                        ))}
                    <Anchor {...anchor} />
                    <InfoWindow
                        onLoad={ref => {
                            infoWindow.current = ref;
                            if (!infomarker.title) infoWindow.current.close()
                        }}
                        position={{ lat: infomarker.position[0], lng: infomarker.position[1] }}
                    >
                        <div style={{
                            width: 260, 
                            // backgroundColor: 'white', opacity: 1, padding: 8, borderRadius: 8, border: "1px solid #a2a2a2",
                            display: "flex", flexDirection: "column", justifyContent: "flex-start"
                        }}>
                            <div className={`infomarker ${infomarker.id} ${infomarker.uid}`} style={{ fontSize: 16, color: `#08233B`, fontWeight: "bold", marginBottom: 8 }}>
                                {infomarker.title}
                            </div>
                            {(userId && userId === infomarker.uid) && <div style={{ position: "absolute", right: 10, paddingTop: 2 }}>
                                <MarkerEditModal
                                    marker={infomarker}
                                    icons={Object.keys(icons) as MarkerIconType[]}
                                    onSubmit={(marker, title, description, type) => {
                                        onEditMarker({
                                            id: marker.id,
                                            uid: marker.uid,
                                            position: marker.position,
                                            seekto: marker.seekto,
                                            type: type,
                                            title,
                                            description,
                                        })
                                    }} onRemove={onRemoveMarker} />
                            </div>}
                            <div style={{
                                fontSize: 16, color: `#08233B`,
                                display: "flex", flexDirection: "row", justifyContent: "flex-start"
                            }}>
                                {/* <div style={{}}>
                                            <img width="32px" src="https://yt3.ggpht.com/ytc/AKedOLRL6Bdx5Md5D2PRXnHCS8e8qekWx8r2UmPLRTUV=s88-c-k-c0x00ffffff-no-rj" alt="happysaea said" />
                                        </div> */}
                                <div style={{ paddingLeft: 12, paddingTop: 6 }}>
                                    <span>{infomarker.description || "_"}</span>
                                </div>
                                <div style={{ position: "absolute", right: 14, paddingTop: 8 }}>
                                    {infomarker.type === "info" && <FontAwesomeIcon onClick={() => { if (onMarkerPlayClick) onMarkerPlayClick(infomarker) }} icon={faPlay} size="1x" color="#d34836" style={{ width: "16px", height: "16px", cursor: "pointer" }} />}
                                </div>
                            </div>
                        </div>
                    </InfoWindow>
                    <StandaloneSearchBox
                        onLoad={ref => { searchBox.current = ref }}
                        onPlacesChanged={() => {
                            const outer: any = searchBox.current;
                            const places = outer.getPlaces();
                            // console.log(outer.getPlaces());
                            if (places.length) googlemap.current.panTo({
                                lat: places[0].geometry.location.lat(),
                                lng: places[0].geometry.location.lng()
                            })
                        }}
                    >
                        <input
                            type="text"
                            placeholder="Search a place for set the center of map."
                            style={{
                                boxSizing: `border-box`,
                                border: `1px solid transparent`,
                                width: `280px`,
                                height: `50px`,
                                padding: `0 12px`,
                                borderRadius: `3px`,
                                boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                                fontSize: `14px`,
                                outline: `none`,
                                textOverflow: `ellipses`,
                                position: "absolute",
                                left: "50%",
                                marginLeft: "-140px",
                                marginTop: "10px",
                            }}
                        />
                    </StandaloneSearchBox>
                </GoogleMap>
            </LoadScript>
        </div>
    )
}

const styles = {
    container: { height: '100%', width: '100%' },
    speechBubble: {
        position: 'absolute',
        backgroundColor: '#fff',
        borderRadius: '8px',
    },
    speechBubblePointer: {
        position: 'absolute',
        width: 0,
        height: 0,
        border: '26px solid transparent',
        borderLeftColor: '#fff',
        borderRight: 0,
        top: '50%',
        right: '0',
        marginTop: '-26px',
        marginRight: '-26px',
    },
};

interface AnchorProps {
    text?: string;
    lat?: number;
    lng?: number;
    zoom?: number;
}
const Anchor = ({ lat, lng, zoom }: AnchorProps) => {
    const googleMap = useGoogleMap()
    useEffect(() => {
        setTimeout(() => {
            if (lat && lng) googleMap.panTo({ lat, lng })
            if (zoom) googleMap.setZoom(zoom)
        }, 100);
    }, [googleMap, lat, lng, zoom])
    return (<></>)
};

export default MapView
