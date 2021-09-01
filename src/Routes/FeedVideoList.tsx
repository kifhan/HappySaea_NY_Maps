// Import FirebaseAuth and firebase.
import React, { useEffect, useState } from 'react';
import { authService, dbService } from '../Stores/firebase';
import { VideoItem } from '../Components/VideoItem';
import { Box, IconButton, Stack, Spinner } from '@chakra-ui/react'
import { googleApi } from '../googleApi.config';
import { useWindowSize } from '../Utils/WindowSIze';
import { videoData } from '../Utils/types'

// import CSS from 'csstype';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from "react-router-dom";

// const css = (style: CSS.Properties) => { return style };


function FeedVideoList() {
    const screensize = useWindowSize()
    const clipWidth = (screensize.width > 720) ? "720px" : `${screensize.width}px`
    const [videoItems, setVideoItems] = useState<Array<videoData>>([]);
    // console.log(authService.currentUser?.displayName)
    // console.log(authService.currentUser?.photoURL)

    useEffect(() => {
        dbService.collection("videos").get().then((querySnapshot) => {
            (async () => {
                const ytvideoItem = []
                for (const doc of querySnapshot.docs) {
                    // console.log(`${doc.id} => ${doc.data()}`);
                    const dbvideodata = doc.data()

                    // get video from youtube with the video id
                    const videos = await fetch(`https://www.googleapis.com/youtube/v3/videos?id=${dbvideodata.videoId}&key=${googleApi.local}&part=snippet,contentDetails,statistics`)
                    const videojson = await videos.json();
                    // console.log(videojson);

                    const channelinfo = await fetch(`https://www.googleapis.com/youtube/v3/channels?id=${videojson.items[0].snippet.channelId}&key=${googleApi.local}&part=snippet,contentDetails,statistics`)
                    const channeljson = await channelinfo.json();

                    ytvideoItem.push({
                        videoId: dbvideodata.videoId,
                        title: videojson.items[0].snippet.title,
                        description: videojson.items[0].snippet.description,
                        thumbnail: videojson.items[0].snippet.thumbnails.medium.url,
                        author: videojson.items[0].snippet.channelTitle,
                        authorThumbnail: channeljson.items[0].snippet.thumbnails.default.url,
                    })
                }
                setVideoItems(ytvideoItem);
            })()
        }).catch((error) => {
            console.log(error);
        });
        return () => { }
    }, []);

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
            <Box
                width="100%"
                position="absolute" bottom="0" left="0" right="0"
                display="flex" justifyContent="center" alignItems="center" paddingBottom="24px"
                zIndex="9999"
            >
                {authService.currentUser && <Box width={clipWidth} paddingLeft="24px">
                    <Link to="/video">
                        <IconButton icon={<FontAwesomeIcon icon={faPlus} />} aria-label="Post" rounded="full" size="lg" color="white" background="red.500"
                            _hover={{ background: "red.700" }} _active={{ background: "red" }} />
                    </Link>
                </Box>}
            </Box>
            <Stack spacing="18px">
                {videoItems.length ? videoItems.map((videoItem) => {
                    return <VideoItem key={videoItem.videoId} {...videoItem} />;
                }) : <Box width={clipWidth} display="flex" justifyContent="center" alignItems="center" padding="24px 0">
                    <Spinner
                        thickness="4px"
                        speed="0.65s"
                        emptyColor="gray.200"
                        color="blue.500"
                        size="xl"
                    />
                </Box>}
            </Stack>
        </Box>
    );
}

// const styles = {
//     // container: css({
//     //     height: '100%', width: '720px',
//     //     display: "flex",
//     //     flexDirection: "column",
//     //     alignItems: "left"
//     // }),
//     content: css({

//     })
// };

export default FeedVideoList;