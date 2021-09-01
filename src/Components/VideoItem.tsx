import React from 'react'
import {
    Box,
    Image,
    Text,
    Avatar,
    // Icon,
} from '@chakra-ui/react'
import { Link } from "react-router-dom";

type propType = {
    videoId: string;
    title: string;
    description: string;
    thumbnail: string;
    author: string;
    authorThumbnail: string;
}

export const VideoItem = ({ videoId, title, description, thumbnail, author, authorThumbnail }: propType) => {
    return (
        <Box
            bg="#ffffff"
            width="100%"
            display="flex"
            alignItems="stretch"
            as={Link}
            to={`/video/${videoId}`}
        >
            <Box>
                <Image
                    size="240px"
                    fallbackSrc="https://via.placeholder.com/150"
                    src={thumbnail}
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
                    {title}
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
                    <Avatar width="28px" height="28px" mr="8px" src={authorThumbnail} />
                    <Text color="gray.500" fontSize="sm" wordBreak="break-all" height="28px" overflow="hidden">
                        {author}
                    </Text>
                </Box>
                <Text fontSize="md" style={{
                    maxHeight: "50px",
                    overflow: "hidden", 
                    textOverflow: "ellipsis",
                }}>
                    {description.substring(0, 70) + '...'}
                </Text>
            </Box>
        </Box>
    )
}


export const VideoItemSmall = ({ videoId, title, description, thumbnail, author, authorThumbnail }: propType) => {
    return (
        <Box
            bg="#ffffff"
            width="100%"
            display="flex"
            alignItems="stretch"
            as={Link}
            to={`/video/${videoId}`}
        >
            <Box>
                <Image
                    size="160px"
                    fallbackSrc="https://via.placeholder.com/150"
                    src={thumbnail}
                    width="160px"
                    // height="240px"
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
                    {title}
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
                    <Avatar width="28px" height="28px" mr="8px" src={authorThumbnail} />
                    <Text color="gray.500" fontSize="sm" wordBreak="break-all" height="28px" overflow="hidden">
                        {author}
                    </Text>
                </Box>
            </Box>
        </Box>
    )
}
