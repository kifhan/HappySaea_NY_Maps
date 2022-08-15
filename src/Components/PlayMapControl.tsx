import React, { CSSProperties, ReactElement } from 'react'
import { MarkerData } from '../Utils/types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapPin, faStreetView } from '@fortawesome/free-solid-svg-icons'
import { Image } from '@chakra-ui/react';

const css = (style: CSSProperties) => { return style };

interface Props {
    markers: Array<MarkerData>;
    width: number;
    height: number;
    duration: number;
    playTime: number;
    playState?: number;
    onMarkerClick?: (marker: MarkerData) => void
}

export default function PlayMapControl({ markers, width, height, duration, playTime, playState, onMarkerClick }: Props): ReactElement {
    
    const barMarginRight = 30
    // console.log("duration total: " + duration)

    return (
        <div style={{ ...styles.container, height }}>
            <div style={{position:"absolute", width: width, height: "13px", backgroundColor:"#1db954", marginTop: height - 13}}></div>

            {markers.map((value) => {
                const seconds : any = value.seekAsSeconds
                return (
                    <div key={value.id} style={{ ...styles.markers, transform: `translate(${(seconds / duration) * (width - barMarginRight) + 9}px, ${height / 2}px)` }}>
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

            <div style={{ ...styles.playDot, transform: `translate(${(playTime / duration) * (width - barMarginRight)}px, ${height / 2}px)` }}>
                <div style={{
                    // width: "10px", height: "10px", 
                    // backgroundColor: "#e53238",
                    transform: `translate(5px, -9px)`
                }}>
                    {/* <FontAwesomeIcon icon={faStreetView} size="2x" color="#d34836" style={{width:"24px",height:"24px"}}/> */}
                    {playState === 1 ? <Image src="/images/saea01_walk_right.gif" width="24px" /> : <Image src="/images/saea01.png" width="24px" />}
                </div>
            </div>

        </div>
    )
}

const styles = {
    container: css({
        // height: '80px', width: '100%',
        backgroundColor: "#ecfbe9"
    }),
    markers: css({
        position: "absolute",
    }),
    playDot: css({
        position: "absolute",
    }),
};