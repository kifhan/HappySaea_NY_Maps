import React, { useEffect, useState, useRef } from 'react'
import {
    GoogleMap, LoadScript, useGoogleMap, Marker, InfoBox,
    // MarkerProps
} from '@react-google-maps/api';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { googleMapApi } from '../googlemap.config';

export interface MarkerData {
    position: Array<any>;
    title: string;
    type: string;
    seekto: string;
    description?: string;
}

interface Props {
    markers: Array<MarkerData>;
    height?: string;
    width?: string;
    mapCenter: { lat: number, lng: number },
    anchoring?: { marker?: MarkerData, lat: number, lng: number, zoom: number };
    onMarkerPlayClick?: (marker: MarkerData) => void;
}

const MapView = ({ mapCenter, markers, anchoring, width = "100%", height = "100%", onMarkerPlayClick }: Props) => {
    const mapApiKey = (process.env.NODE_ENV === "development") ? googleMapApi.local : googleMapApi.web
    // console.log("map key is " + mapApiKey)
    const [anchor, setAnchor] = useState({ ...mapCenter, zoom: 11 })
    // const { lat, lng, zoom } = anchoring || {lat:0, lng:0, zoom:0}
    const [infomarker, setinfomarker] = useState<MarkerData>({position: [0,0], title: "", type: "", seekto: "00:00"})
    const googlemap = useRef<any>({})
    const infoWindow = useRef<any>({})

    useEffect(() => {
        if(markers.length) setinfomarker(markers[0])
        return () => {
        }
    }, [])

    useEffect(() => {
        if (anchoring) setAnchor(anchoring)
        if (anchoring?.marker) {
            setinfomarker(anchoring.marker)
            infoWindow.current.open(googlemap.current)
        }
    }, [anchoring])

    return (
        <div style={{ ...styles.container, width, height }}>
            {
                mapApiKey ?
                    <LoadScript googleMapsApiKey={mapApiKey}>
                        <GoogleMap
                            onLoad={(ref: any) => { googlemap.current = ref }}
                            mapContainerStyle={styles.container}
                            center={mapCenter}
                            zoom={12}
                        >
                            { /* Child components, such as markers, info windows, etc. */
                                markers.map((marker) => (
                                    <Marker
                                        key={marker.seekto}
                                        title={marker.title}
                                        onClick={() => {
                                            // setAnchor({
                                            //     ...anchor,
                                            //     lat: marker.position[0],
                                            //     lng: marker.position[1],
                                            // })
                                            // infoWindow.current.show()
                                            setinfomarker(marker)
                                            infoWindow.current.open(googlemap.current)
                                        }}
                                        position={{
                                            lat: marker.position[0],
                                            lng: marker.position[1],
                                        }} />
                                ))}
                            <Anchor {...{ ...anchor }} />
                            <InfoBox
                                onLoad={ref => { infoWindow.current = ref; infoWindow.current.close() }}
                                position={{ lat: infomarker.position[0], lng: infomarker.position[1] }}>
                                <div style={{
                                    width: 260, backgroundColor: 'white', opacity: 1, padding: 8, borderRadius: 8, border: "1px solid #a2a2a2",
                                    display: "flex", flexDirection: "column", justifyContent: "flex-start"
                                }}>
                                    <div style={{ fontSize: 16, color: `#08233B`, fontWeight: "bold", marginBottom: 8 }}>
                                        {infomarker.title}
                                    </div>
                                    <div style={{
                                        fontSize: 16, color: `#08233B`,
                                        display: "flex", flexDirection: "row", justifyContent: "flex-start"
                                    }}>
                                        <div style={{}}>
                                            <img width="32px" src="https://yt3.ggpht.com/ytc/AKedOLRL6Bdx5Md5D2PRXnHCS8e8qekWx8r2UmPLRTUV=s88-c-k-c0x00ffffff-no-rj" alt="happysaea said" />
                                        </div>
                                        <div style={{ paddingLeft: 12, paddingTop: 6 }}>
                                            <span>{infomarker.description || "...😊"}</span>
                                        </div>
                                        <div style={{ position: "absolute", right: 14, paddingTop: 8 }}>
                                            <FontAwesomeIcon onClick={() => {if(onMarkerPlayClick) onMarkerPlayClick(infomarker)} } icon={faPlay} size="1x" color="#d34836" style={{ width: "16px", height: "16px", cursor: "pointer" }} />
                                        </div>
                                    </div>
                                </div>
                            </InfoBox>
                            {/* <StandaloneSearchBox
                                onLoad={ref => {searchBox.current = ref}}
                                onPlacesChanged={()=>{
                                    const outer: any = searchBox.current;
                                    console.log(outer.getPlaces());
                                }}
                            >
                                <input
                                    type="text"
                                    placeholder="Customized your placeholder"
                                    style={{
                                        boxSizing: `border-box`,
                                        border: `1px solid transparent`,
                                        width: `240px`,
                                        height: `32px`,
                                        padding: `0 12px`,
                                        borderRadius: `3px`,
                                        boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                                        fontSize: `14px`,
                                        outline: `none`,
                                        textOverflow: `ellipses`,
                                        position: "absolute",
                                        left: "50%",
                                        marginLeft: "-120px"
                                    }}
                                />
                            </StandaloneSearchBox> */}
                        </GoogleMap>
                    </LoadScript>
                    : <div>somthing went wrong</div>
            }
        </div>
    )
}

const styles = {
    container: { height: '100%', width: '100%' },
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
            // console.log("is it working???? " + text)
        }, 100);
    }, [lat, lng, zoom])
    return (<div></div>)
};

export default MapView
