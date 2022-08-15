import React, { useEffect, useState } from 'react';
import { authService, getVideos } from '../Stores/firebase';
import { VideoItem, VideoItemBig } from '../Components/VideoItem';
import { Box, IconButton, Stack, Spinner } from '@chakra-ui/react'
import { useWindowSize } from '../Utils/WindowSIze';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from "react-router-dom";

function FeedVideoList() {
    const screensize = useWindowSize()
    const clipWidth = (screensize.width > 720) ? "720px" : `${screensize.width}px`
    const [videoItems, setVideoItems] = useState<Array<{videoId:string}>>([]);
    // console.log(authService.currentUser?.displayName)
    // console.log(authService.currentUser?.photoURL)

    useEffect(() => {
        getVideos().then((videoList) => {
            let ytvideoItem = []
            for (const doc of videoList) {
                const dbvideodata = doc
                ytvideoItem.push({
                    videoId: dbvideodata.videoId,
                    createdAt: dbvideodata.createdAt,
                })
            }
            // console.log(ytvideoItem)
            setVideoItems(ytvideoItem);
        }).catch((error:any) => {
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
            backgroundColor="#fff"
        >
            <Box
                width="100%"
                // height="100%"
                position="fixed" 
                bottom="0"
                display="flex" justifyContent="flex-end" alignItems="flex-end" paddingBottom="24px"
                zIndex="9999"
            >
                {authService.currentUser && <Box width="100%" paddingLeft="24px">
                    <Link to="/video">
                        <IconButton icon={<FontAwesomeIcon icon={faPlus} />} aria-label="Post" rounded="full" size="lg" color="white" background="red.500"
                            _hover={{ background: "red.700" }} _active={{ background: "red" }} />
                    </Link>
                </Box>}
            </Box>
            <Stack spacing="18px">
                {videoItems.length ? videoItems.map((videoItem) => {
                    if (screensize.width > 720)
                        return <VideoItem key={videoItem.videoId} {...videoItem} />;
                    else
                        return <VideoItemBig key={videoItem.videoId} {...videoItem} />;
                }) : <Box width={clipWidth} display="flex" justifyContent="center" alignItems="center" padding="24px 0">
                    <Spinner
                        thickness="4px"
                        speed="0.65s"
                        emptyColor="gray.200"
                        color="blue.500"
                        size="xl"
                    />
                </Box>}
                <Box height="64px"></Box>
            </Stack>
        </Box>
    );
}

export default FeedVideoList;