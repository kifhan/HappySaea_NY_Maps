// Import FirebaseAuth and firebase.
import React, { useEffect, useRef, useState } from 'react';
import { authService, dbService, firebaseInstance as firebase } from '../Stores/firebase';
import {
    Box,
    Button,
    FormLabel,
    Input,
    FormErrorMessage,
    FormControl,
    Text
} from '@chakra-ui/react'
// import { EmailIcon, AtSignIcon } from '@chakra-ui/icons'
import { googleApi } from '../googleApi.config';
import { useWindowSize } from '../Utils/WindowSIze';
// import { videoData } from '../Utils/types'

import CSS from 'csstype';
import MapSearchBox from '../Components/MapSearchBox';
import { VideoItemSmall } from '../Components/VideoItem';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
const css = (style: CSS.Properties) => { return style };


function PostVideoScreen() {
    const screensize = useWindowSize()
    const clipWidth = (screensize.width > 720) ? "720px" : `${screensize.width}px`
    const clipWidthNum = (screensize.width > 720) ? 720 : screensize.width
    const [videoItem, setVideoItem] = useState<any>(null);
    const [videoId, setvideoId] = useState("")
    const videoidInputRef = useRef<any>(null)
    const [postUploading, setpostUploading] = useState(false)
    const [mapCenter, setmapCenter] = useState({ lat: 0, lng: 0 })
    const [targetplace, settargetplace] = useState<any>(null)
    const [errorMessage, setErrorMessage] = useState<any>(null)
    let history = useHistory();

    useEffect(() => {
        if (videoId)
            (async () => {
                const videos = await fetch(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${googleApi.local}&part=snippet,contentDetails,statistics`)
                const videojson = await videos.json();

                const channelinfo = await fetch(`https://www.googleapis.com/youtube/v3/channels?id=${videojson.items[0].snippet.channelId}&key=${googleApi.local}&part=snippet,contentDetails,statistics`)
                const channeljson = await channelinfo.json();

                let videoduration: any = moment.duration(videojson.items[0].contentDetails.duration)
                videoduration = (videoduration.hours() ? videoduration.hours() + ":" : "") + videoduration.minutes() + ":" + videoduration.seconds()

                setVideoItem({
                    videoId: videoId,
                    title: videojson.items[0].snippet.title,
                    description: videojson.items[0].snippet.description,
                    duration: videoduration,
                    thumbnail: videojson.items[0].snippet.thumbnails.medium.url,
                    author: videojson.items[0].snippet.channelTitle,
                    channelId: videojson.items[0].snippet.channelId,
                    authorThumbnail: channeljson.items[0].snippet.thumbnails.default.url,
                })
            })()
        return () => { }
    }, [videoId]);

    const _uploadPost = () => {
        setErrorMessage(null)
        setpostUploading(true)

        if (videoItem && (mapCenter.lat !== 0 && mapCenter.lng !== 0)) {
            dbService.collection("videos").doc(videoItem.videoId).set({
                videoId: videoItem.videoId,
                center: new firebase.firestore.GeoPoint(mapCenter.lat, mapCenter.lng),
                duration: videoItem.duration,
                uid: authService.currentUser?.uid,
                title: videoItem.title,
                description: videoItem.description,
                thumbnail: videoItem.thumbnail,
                author: videoItem.author,
                channelId: videoItem.channelId,
                authorThumbnail: videoItem.authorThumbnail,
                createdAt: firebase.firestore.Timestamp.now(),
            }).then(() => {
                setpostUploading(false)
                history.push("/")
            }).catch((err) => {
                setErrorMessage(err.message)
                console.log(err);
                setpostUploading(false)
            })
        } else {
            setErrorMessage("Please set the place and video.")
            setpostUploading(false)
        }
    }

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="flex-start"
            p="10px"
            width={clipWidth}
            height="100%"
            backgroundColor="#eee"
        >
            <Box width="100%" backgroundColor="white" p="12px">
                <FormControl isInvalid={errorMessage ? true : false}>
                    <FormLabel>Post YouTube Video with URL</FormLabel>
                    <FormErrorMessage>{errorMessage}</FormErrorMessage>
                    <Box display="flex" justifyContent="space-between">
                        <Box width="calc(100% - 80px)" >
                            <Input ref={videoidInputRef} />
                        </Box>
                        <Box>
                            <Button variant="solid" size="md" onClick={() => {
                                const _videoidurl = videoidInputRef.current.value
                                // get video id from videoidurl
                                const idpattern = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
                                if (idpattern.test(_videoidurl)) {
                                    const _videoid = _videoidurl.match(idpattern)
                                    // console.log(_videoid[2])
                                    setvideoId(_videoid[2])
                                    setErrorMessage(null)
                                } else {
                                    setErrorMessage("Invalid URL")
                                }
                            }}>
                                Find
                            </Button>
                        </Box>
                    </Box>
                    <Box paddingTop="8px">{videoItem && <VideoItemSmall {...videoItem} />}</Box>
                    {targetplace ?
                        (<Box width="100%" >
                            <Text height="30px" overflow="hidden" textOverflow="clip">{targetplace.name} @: {targetplace.formatted_address}</Text>
                        </Box>) :
                        (<Box width="100%" ><Text height="30px" overflow="hidden" textOverflow="clip">Search the place or move a map to set the center.</Text></Box>)
                    }
                    <Box>
                        <Text height="30px" overflow="hidden" textOverflow="clip">{`coordinate: ${mapCenter.lat}, ${mapCenter.lng}`}</Text>
                    </Box>
                </FormControl>
                <MapSearchBox
                    width={String(clipWidthNum - 44).concat("px")}
                    height="320px"
                    onPlaceChanged={(places) => {
                        // console.log(places)
                        settargetplace(places[0])
                    }}
                    onMapCenterChanged={(center) => {
                        if (!(center.lat === mapCenter.lat && center.lng === mapCenter.lng)) {
                            setmapCenter(center)
                        }
                    }}
                />
            </Box>
            <Box width="100%">
                <Button isLoading={postUploading} width="100%" variant="solid" size="md" bgColor="blue.400" color="white" onClick={_uploadPost}>
                    Post
                </Button>
            </Box>
        </Box>
    );
}

const styles = {
    // container: css({
    //     height: '100%', width: '720px',
    //     display: "flex",
    //     flexDirection: "column",
    //     alignItems: "left"
    // }),
    content: css({

    })
};

export default PostVideoScreen;