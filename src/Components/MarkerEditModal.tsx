import React, { useRef, useState } from 'react'
import { useDisclosure, Box, Text, IconButton, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, FormControl, FormLabel, FormErrorMessage, Input, Select } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faTrash } from '@fortawesome/free-solid-svg-icons'
import { MarkerData, MarkerIconType } from '../Utils/types'

interface PropType {
    marker: MarkerData;
    icons: MarkerIconType[];
    onSubmit: (marker: MarkerData, title: string, description: string, type: MarkerIconType, imgurl: string) => void
    onRemove?: (marker: MarkerData) => void
}
export const MarkerEditModal = ({ marker, icons, onSubmit, onRemove }: PropType) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const titleInputRef = useRef<any>()
    const descInputRef = useRef<any>()
    const typeSelectRef = useRef<any>()
    const imgurlRef = useRef<any>()
    const [errorMessage, setErrorMessage] = useState<any>(null)

    return (
        <>
            <IconButton icon={<FontAwesomeIcon icon={faCog} />} aria-label="Post" rounded="full" size="xs" color="black" background="transparent" 
                _hover={{ background: "grey" }} _active={{ background: "red" }} 
                onClick={onOpen} />
            {/* <Box cursor="pointer" onClick={onOpen}>
                <Box position="absolute" color="white" style={{ transform: `translate(13px, 12px)` }}><FontAwesomeIcon icon={faPlus} size="lg" /></Box>
                <Image src={markersvg} h="58px" alt="marker" />
            </Box> */}

            <Modal
                initialFocusRef={titleInputRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit marker infomation</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl isInvalid={errorMessage ? true : false}>
                            <FormLabel>Title</FormLabel>
                            <Input ref={titleInputRef} placeholder="Place Name" defaultValue={marker.title} />
                            <FormErrorMessage>{errorMessage}</FormErrorMessage>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Description</FormLabel>
                            <Input ref={descInputRef} placeholder="Description" defaultValue={marker.description} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Image Url</FormLabel>
                            <Input ref={imgurlRef} placeholder="Image Url" defaultValue={marker.imgurl} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Select Marker's Type</FormLabel>
                            <Select ref={typeSelectRef} defaultValue={marker.type}>
                                {icons.map((icon, i) => (<option key={icon} value={icon}>{icon}</option>))}
                            </Select>
                        </FormControl>
                        <Box padding="12px 0">
                            <Text fontSize="sm">{marker.position && `Position: ${marker.position[0]}, ${marker.position[1]}`}</Text>
                            <Text fontSize="sm">{`Time at: ${marker.seekto}`}</Text>
                        </Box>
                    </ModalBody>

                    <ModalFooter>
                        <IconButton icon={<FontAwesomeIcon icon={faTrash} />} aria-label="Remove Marker" color="white" background="red.500" position="absolute" left="18px"
                            _hover={{ background: "red.700" }} _active={{ background: "red" }} onClick={() => {
                                onRemove && onRemove(marker)
                                onClose()
                            }} />
                        <Button colorScheme="blue" mr={3} onClick={() => {
                            if (titleInputRef.current.value) {
                                onSubmit(marker, titleInputRef.current.value, descInputRef.current.value, typeSelectRef.current.value, imgurlRef.current.value)
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