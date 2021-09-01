import React, { useRef, useState } from 'react'
import { useDisclosure, Box, Text, IconButton, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, FormControl, FormLabel, FormErrorMessage, Input } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faTrash } from '@fortawesome/free-solid-svg-icons'
import markersvg from '../marker.svg';

interface PropType {
    position: {
        lat: number,
        lng: number
    },
    onSubmit: () => void
    onRemove?: () => void
}
export const EditVideoItemModal = ({ position, onSubmit, onRemove }: PropType) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>

            <Box>
                <IconButton icon={<FontAwesomeIcon icon={faCog} size="lg" />} aria-label="Edit Video Post" color="GrayText" rounded="full" size="lg"
                    onClick={onOpen} />
            </Box>
            {/* <Box cursor="pointer" onClick={onOpen}>
                <Box position="absolute" color="white" style={{ transform: `translate(13px, 12px)` }}><FontAwesomeIcon icon={faPlus} size="lg" /></Box>
                <Image src={markersvg} h="58px" alt="marker" />
            </Box> */}

            <Modal
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit Video Post Detail</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <Box padding="12px 0">
                            <Text>Change Map Center</Text>
                            <Text fontSize="sm">{position && `Position: ${position.lat}, ${position.lng}`}</Text>
                        </Box>
                    </ModalBody>

                    <ModalFooter>
                        <IconButton icon={<FontAwesomeIcon icon={faTrash} />} aria-label="Remove Marker" color="white" background="red.500" position="absolute" left="18px"
                            _hover={{ background: "red.700" }} _active={{ background: "red" }} onClick={() => {
                                onRemove && onRemove()
                                onClose()
                            }} />
                        <Button colorScheme="blue" mr={3} onClick={() => {
                            onSubmit()
                            onClose()
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