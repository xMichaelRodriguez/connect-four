import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import React from 'react';

interface Props {
  children: React.ReactNode;
  onClose: () => void;
  isOpen: boolean;
  modalTitle?: string;
}

export const ModalComponent = ({
  children,
  onClose,
  isOpen,
  modalTitle = 'Matchmaking',
}: Props) => (
  <Modal
    closeOnOverlayClick={false}
    isOpen={isOpen}
    onClose={onClose}
    isCentered
    motionPreset='slideInBottom'
  >
    <ModalOverlay />
    <ModalContent
      maxH={'250px'}
      color={'white'}
      bgGradient='linear(to-b,  rgb(2, 22, 39), rgb(1, 22, 39))'
    >
      <ModalHeader>{modalTitle}</ModalHeader>
      <ModalCloseButton onClick={onClose} />
      <ModalBody display={'flex'} justifyContent={'center'} py={10}>
        {children}
      </ModalBody>

      <ModalFooter>
        <Button colorScheme='blue' mr={3} onClick={onClose}>
          Close
        </Button>
        <Button variant='unstyled' colorScheme={'telegram'}>
          Secondary Action
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
);
