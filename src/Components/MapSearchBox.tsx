import React, { useRef } from 'react'
import {
    GoogleMap, LoadScript,
    StandaloneSearchBox,
    // useGoogleMap, Marker, InfoBox, 
    // MarkerProps
} from '@react-google-maps/api';
import { googleApi } from '../googleApi.config';
import { Box, Text } from '@chakra-ui/react'

interface MapSearchBoxProps {
    width?: string;
    height?: string;
    onPlaceChanged: (place: any) => void;
    onMapCenterChanged: (center: any) => void;
}
const _libraries: ("places" | "drawing" | "geometry" | "localContext" | "visualization")[] = ["places"];

const center = {
    lat: 38.685,
    lng: -115.234
};

export default function MapSearchBox({ width, height, onPlaceChanged, onMapCenterChanged }: MapSearchBoxProps) {
    const mapApiKey = (process.env.NODE_ENV === "development") ? googleApi.local : googleApi.web
    const searchBoxRef = useRef<any>(null)
    const googlemap = useRef<any>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    const mapContainerStyle = {
        height: height || "400px",
        width: width || "800px"
    };


    const _onLoad = (ref: any) => { searchBoxRef.current = ref; }

    const _onPlacesChanged = () => {
        // console.log(searchBoxRef.current.getPlaces())
        const places = searchBoxRef.current.getPlaces();

        if (googlemap.current) {
            googlemap.current.panTo({ lat: places[0].geometry.location.lat(), lng: places[0].geometry.location.lng() })
            googlemap.current.setZoom(14)
        }
        onPlaceChanged(places)
    }
    const _onCenterChanged = () => {
        if (googlemap.current) {
            const _getCenter = googlemap.current.center
            const centerlat = _getCenter.lat()
            const centerlng = _getCenter.lng()
            if (center.lng !== centerlng && center.lat !== centerlat) {
                onMapCenterChanged({
                    lat: _getCenter.lat(),
                    lng: _getCenter.lng()
                })
            }
        }
    }

    return (
        <div ref={containerRef} style={mapContainerStyle}>
            <LoadScript googleMapsApiKey={mapApiKey} libraries={_libraries}>

                {containerRef.current && <Box
                    transform={`translate(${(containerRef.current?.clientWidth / 2 - 220)}px, ${(containerRef.current?.clientHeight / 2 - 46)}px)`}
                    width="180px" height="98px" fontSize="18px" padding="18px"
                    position="absolute" background="#444" color="#eee" borderRadius="12px" zIndex="9999"
                >
                    <Box position="absolute" width="0" height="0" border="26px solid transparent" borderLeftColor="#444" borderRight="0" top="50%" right="0" marginTop="-26px" marginRight="-26px" ></Box>
                    <Text>
                        {`This location will be the center location.`}
                    </Text>
                </Box>}
                <GoogleMap
                    id="searchbox-example"
                    mapContainerStyle={mapContainerStyle}
                    zoom={2.5}
                    center={center}
                    onLoad={(ref: any) => { googlemap.current = ref }}
                    onCenterChanged={_onCenterChanged}
                >
                    <StandaloneSearchBox
                        onLoad={_onLoad}
                        onPlacesChanged={_onPlacesChanged}
                    >
                        <input
                            type="text"
                            placeholder="Search for video's center location."
                            style={{
                                boxSizing: `border-box`,
                                border: `1px solid transparent`,
                                width: `240px`,
                                height: `56px`,
                                padding: `0 12px`,
                                borderRadius: `3px`,
                                boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                                fontSize: `14px`,
                                outline: `none`,
                                textOverflow: `ellipses`,
                                position: "absolute",
                                left: "50%",
                                marginLeft: "-120px",
                                marginTop: "20px"
                            }}
                        />
                    </StandaloneSearchBox>
                </GoogleMap>
            </LoadScript>
        </div>
    )
}
