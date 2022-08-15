import React, { useEffect, useState } from 'react'
import {
    Box,
    Image,
    Text,
    Avatar,
    // Icon,
} from '@chakra-ui/react'
import { Link } from "react-router-dom";
import { googleApi } from '../googleApi.config';
import { videoData } from '../Utils/types';

type propType = {
    videoId: string;
    // title: string;
    // description: string;
    // thumbnail: string;
    // author: string;
    // authorThumbnail: string;
}

// Desktop View of Video Item
export const VideoItem = ({ videoId }: propType) => {
    const [videoItem, setVideoItem] = useState<videoData>();
    useEffect(() => {
        (async () => {
            // get video from youtube with the video id
            const videos = await fetch(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${googleApi.local}&part=snippet,contentDetails,statistics`)
            const videojson = await videos.json();
            // console.log(videojson);

            const channelinfo = await fetch(`https://www.googleapis.com/youtube/v3/channels?id=${videojson.items[0].snippet.channelId}&key=${googleApi.local}&part=snippet,contentDetails,statistics`)
            const channeljson = await channelinfo.json();

            setVideoItem({
                title: videojson.items[0].snippet.title,
                description: videojson.items[0].snippet.description,
                thumbnail: videojson.items[0].snippet.thumbnails.medium.url,
                author: videojson.items[0].snippet.channelTitle,
                authorThumbnail: channeljson.items[0].snippet.thumbnails.default.url,
            });
        })();
    }, [])

    return (
        <Box
            bg="#ffffff"
            width="100%"
            display="flex"
            alignItems="stretch"
            as={Link}
            to={`/video/${videoId}`}
        >
            {videoItem &&
                (<>
                    <Box>
                        <Image
                            // size="240px"
                            fallbackSrc="https://via.placeholder.com/150"
                            src={videoItem.thumbnail}
                            width="240px"
                            // height="240px"
                            alt={videoId}
                        />
                    </Box>
                    <Box
                        width="calc(100% - 240px)"
                        p="8px 14px"
                        display="flex"
                        flexDirection="column"
                        alignItems="stretch"
                        justifyContent="flex-start"
                    >
                        <Text fontWeight="bold" fontSize="xl" textOverflow="clip" overflow="hidden" height="34px">
                            {videoItem.title}
                        </Text>
                        <Box
                            display="flex"
                            justifyContent="flex-start"
                            alignItems="center"
                            mb={1}
                            flexDirection="row"
                            height="28px"
                            overflow="hidden"
                        >
                            <Avatar width="28px" height="28px" mr="8px" src={videoItem.authorThumbnail} />
                            <Text color="gray.500" fontSize="sm" wordBreak="break-all" height="28px" overflow="hidden">
                                {videoItem.author}
                            </Text>
                        </Box>
                        <Text fontSize="md" style={{
                            maxHeight: "50px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                        }}>
                            {videoItem.description.substring(0, 70) + '...'}
                        </Text>
                    </Box>
                </>)
            }
        </Box>
    )
}

// Post Preview of VideoItem
export const VideoItemSmall = ({ videoId }: propType) => {
    const [videoItem, setVideoItem] = useState<videoData>();
    useEffect(() => {
        (async () => {
            // get video from youtube with the video id
            const videos = await fetch(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${googleApi.local}&part=snippet,contentDetails,statistics`)
            const videojson = await videos.json();
            // console.log(videojson);

            const channelinfo = await fetch(`https://www.googleapis.com/youtube/v3/channels?id=${videojson.items[0].snippet.channelId}&key=${googleApi.local}&part=snippet,contentDetails,statistics`)
            const channeljson = await channelinfo.json();

            setVideoItem({
                title: videojson.items[0].snippet.title,
                description: videojson.items[0].snippet.description,
                thumbnail: videojson.items[0].snippet.thumbnails.medium.url,
                author: videojson.items[0].snippet.channelTitle,
                authorThumbnail: channeljson.items[0].snippet.thumbnails.default.url,
            });
        })();
    }, [])

    return (
        <Box
            bg="#eee"
            width="100%"
            display="flex"
            alignItems="stretch"
            // flexDir="column"
            // as={Link}
            // to={`/video/${videoId}`}
        >
            {videoItem && <>
                <Box>
                    <Image
                        fallbackSrc="https://via.placeholder.com/150"
                        src={videoItem.thumbnail}
                        width="160px"
                        alt={videoId}
                    />
                </Box>
                <Box
                    width="calc(100% - 160px)"
                    p="8px 14px"
                    display="flex"
                    flexDirection="column"
                    alignItems="stretch"
                    justifyContent="flex-start"
                >
                    <Text fontWeight="bold" fontSize="md" textOverflow="clip" overflow="hidden" height="52px">
                        {videoItem.title}
                    </Text>
                    <Box
                        display="flex"
                        justifyContent="flex-start"
                        alignItems="center"
                        mb={1}
                        flexDirection="row"
                        height="28px"
                        overflow="hidden"
                    >
                        <Avatar width="28px" height="28px" mr="8px" src={videoItem.authorThumbnail} />
                        <Text color="gray.500" fontSize="sm" wordBreak="break-all" height="28px" overflow="hidden">
                            {videoItem.author}
                        </Text>
                    </Box>
                </Box>
            </>}
        </Box>
    )
}

// Mobile View of VideoItem
export const VideoItemBig = ({ videoId }: propType) => {
    const [videoItem, setVideoItem] = useState<videoData>();
    useEffect(() => {
        (async () => {
            // get video from youtube with the video id
            const videos = await fetch(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${googleApi.local}&part=snippet,contentDetails,statistics`)
            const videojson = await videos.json();
            // console.log(videojson);

            const channelinfo = await fetch(`https://www.googleapis.com/youtube/v3/channels?id=${videojson.items[0].snippet.channelId}&key=${googleApi.local}&part=snippet,contentDetails,statistics`)
            const channeljson = await channelinfo.json();

            setVideoItem({
                title: videojson.items[0].snippet.title,
                description: videojson.items[0].snippet.description,
                thumbnail: videojson.items[0].snippet.thumbnails.medium.url,
                author: videojson.items[0].snippet.channelTitle,
                authorThumbnail: channeljson.items[0].snippet.thumbnails.default.url,
            });
        })();
    }, [])

    return (
        <Box
            bg="#ffffff"
            width="100%"
            display="flex"
            alignItems="stretch"
            flexDir="column"
            as={Link}
            to={`/video/${videoId}`}
        >
            {videoItem && <>
                <Box>
                    <Image
                        fallbackSrc="https://via.placeholder.com/150"
                        src={videoItem.thumbnail}
                        width="100%"
                        alt={videoId}
                    />
                </Box>
                <Box
                    width="100%"
                    p="8px 14px"
                    display="flex"
                    flexDirection="column"
                    alignItems="stretch"
                    justifyContent="flex-start"
                >
                    <Text fontWeight="bold" fontSize="md" textOverflow="clip" overflow="hidden" height="52px">
                        {videoItem.title}
                    </Text>
                    <Box
                        display="flex"
                        justifyContent="flex-start"
                        alignItems="center"
                        mb={1}
                        flexDirection="row"
                        height="28px"
                        overflow="hidden"
                    >
                        <Avatar width="28px" height="28px" mr="8px" src={videoItem.authorThumbnail} />
                        <Text color="gray.500" fontSize="sm" wordBreak="break-all" height="28px" overflow="hidden">
                            {videoItem.author}
                        </Text>
                    </Box>
                </Box>
            </>}
        </Box>
    )
}
