import React, { ReactElement } from 'react'
import CSS from 'csstype';
import { MarkerData } from './MapView';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapPin, faStreetView } from '@fortawesome/free-solid-svg-icons'

const css = (style: CSS.Properties) => { return style };

interface Props {
    markers: Array<MarkerData>;
    width: number;
    height: number;
    duration: string;
    playTime: number;
    onMarkerClick?: (marker: MarkerData) => void
}

export default function PlayMapControl({ markers, width, height, duration, playTime, onMarkerClick }: Props): ReactElement {
    const darr = duration.split(":")
    const total = parseInt(darr[0]) * 60 + parseInt(darr[1]);
    const barMarginRight = 30

    return (
        <div style={{ ...styles.container, height }}>
            <div style={{position:"absolute", width: width, height: "13px", backgroundColor:"#1db954", marginTop: height - 13}}></div>

            {markers.map((value) => {
                const tarr = value.seekto.split(":");
                const seconds = parseInt(tarr[0]) * 60 + parseInt(tarr[1]);
                return (
                    <div style={{ ...styles.markers, transform: `translate(${(seconds / total) * (width - barMarginRight) + 9}px, ${height / 2}px)` }}>
                        <div onClick={() => { if (onMarkerClick) onMarkerClick(value) }}
                            style={{
                                // width: "10px", height: "10px", borderRadius: "5px", backgroundColor: "#f4b400",
                                color: "#f4b400", transform: `translate(5px, -10px)`, cursor: "pointer"
                            }}>
                            <FontAwesomeIcon icon={faMapPin} size="1x"  />
                        </div>
                    </div>
                )
            })}

            <div style={{ ...styles.playDot, transform: `translate(${(playTime / total) * (width - barMarginRight)}px, ${height / 2}px)` }}>
                <div style={{
                    // width: "10px", height: "10px", 
                    // backgroundColor: "#e53238",
                    transform: `translate(5px, -9px)`
                }}>
                    <FontAwesomeIcon icon={faStreetView} size="2x" color="#d34836" style={{width:"24px",height:"24px"}}/>
                </div>
            </div>

        </div>
    )
}

const styles = {
    container: css({
        height: '80px', width: '100%',
        backgroundColor: "#ecfbe9"
    }),
    markers: css({
        position: "absolute",
    }),
    playDot: css({
        position: "absolute",
    }),
};