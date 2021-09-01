import React, { useRef, useState } from 'react'
import { useDisclosure, Box, Text, Image, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, FormControl, FormLabel, FormErrorMessage, Input, Select, useBoolean } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import markersvg from '../marker.svg';
import { MarkerIconType } from '../Utils/types';

interface PropType {
    position: {
        lat: number,
        lng: number
    },
    playtime: number,
    icons: MarkerIconType[];
    onSubmit: (title: string, description: string, type: MarkerIconType) => void
    onButtonHover: () => void
    onButtonHoverOut: () => void
}
export const MarkerPostModal = ({ position, playtime, icons, onSubmit, onButtonHover, onButtonHoverOut }: PropType) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const titleInputRef = useRef<any>()
    const descInputRef = useRef<any>()
    const typeSelectRef = useRef<any>()
    const [errorMessage, setErrorMessage] = useState<any>(null)

    return (
        <>
            {/* <Button onClick={onOpen}>Open Modal</Button> */}

            {/* <IconButton icon={<FontAwesomeIcon icon={faPlus} />} aria-label="Post" rounded="full" size="lg" color="white" background="red.500"
                _hover={{ background: "red.700" }} _active={{ background: "red" }} /> */}
            <Box cursor="pointer" w="58px" onClick={onOpen} onMouseOver={onButtonHover} onMouseLeave={onButtonHoverOut}>
                <Box position="absolute" color="white" style={{ transform: `translate(13px, 12px)` }}><FontAwesomeIcon icon={faPlus} size="lg" /></Box>
                <Image src={markersvg} h="58px" alt="marker" />
            </Box>

            <Modal
                initialFocusRef={titleInputRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create new marker</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl isInvalid={errorMessage ? true : false}>
                            <FormLabel>Title</FormLabel>
                            <Input ref={titleInputRef} placeholder="Place Name" />
                            <FormErrorMessage>{errorMessage}</FormErrorMessage>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Description</FormLabel>
                            <Input ref={descInputRef} placeholder="Description" />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Select Marker's Type</FormLabel>
                            <Select ref={typeSelectRef} defaultValue="info">
                                {icons.map((icon, i) => (<option key={icon} value={icon}>{icon}</option>))}
                            </Select>
                        </FormControl>
                        <Box padding="12px 0">
                            <Text fontSize="sm">{position && `Position: ${position.lat}, ${position.lng}`}</Text>
                            <Text fontSize="sm">{`Time at: ${playtime}`}</Text>
                        </Box>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={() => {
                            if (titleInputRef.current.value) {
                                onSubmit(titleInputRef.current.value, descInputRef.current.value, typeSelectRef.current.value)
                                onClose()
                            } else {
                                setErrorMessage("Please fill in all fields")
                            }
                        }}>
                            Save
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}