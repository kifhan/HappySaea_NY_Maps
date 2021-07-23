import React, { useEffect, useState } from 'react'
import {
    GoogleMap, LoadScript, useGoogleMap, Marker,
    // MarkerProps
} from '@react-google-maps/api';

export interface MarkerData {
    position: Array<any>;
    title: string;
    type: string;
    seekto: string;
}

interface Props {
    markers: Array<MarkerData>;
    height?: string;
    width?: string;
    mapCenter: {lat: number, lng: number},
    anchoring?: { lat: number, lng: number, zoom: number };
}

const MapView = ({ mapCenter, markers, anchoring, width = "100%", height = "100%" }: Props) => {
    const mapApiKey = process.env.REACT_APP_GOOGLE_MAP_API_KEY
    // console.log("map key is " + mapApiKey)
    const [anchor, setAnchor] = useState({ lat: markers[0].position[0], lng: markers[0].position[1], zoom: 11 })
    // const { lat, lng, zoom } = anchoring || {lat:0, lng:0, zoom:0}


    useEffect(() => {
        if (anchoring) setAnchor(anchoring)
        console.log("did you get any of that?")
    }, [anchoring])

    return (
        <div style={{ ...styles.container, width, height }}>
            {
                mapApiKey ?
                    <LoadScript googleMapsApiKey={mapApiKey} >
                        <GoogleMap
                            mapContainerStyle={styles.container}
                            center={mapCenter}
                            zoom={11}
                        >
                            { /* Child components, such as markers, info windows, etc. */
                                markers.map((marker) => (
                                    <Marker
                                        title={marker.title}
                                        position={{
                                            lat: marker.position[0],
                                            lng: marker.position[1],
                                        }} />
                                ))}
                            <Anchor {...{ ...anchor }} />
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
