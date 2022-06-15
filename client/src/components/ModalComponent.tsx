import {
  Modal,
  ModalBody,
  ModalContent,
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

export const ModalComponent = ({ children, onClose, isOpen, modalTitle = 'Matchmaking' }: Props) => (
  <Modal
    closeOnOverlayClick={false}
    isOpen={isOpen}
    onClose={onClose}
    isCentered
    motionPreset='slideInBottom'
  >
    <ModalOverlay />
    <ModalContent maxH={'250px'} color={'white'} bgGradient='linear(to-b,  rgb(2, 22, 39), rgb(1, 22, 39))'>
      <ModalHeader>{modalTitle}</ModalHeader>

      <ModalBody display={'flex'} justifyContent={'center'} py={10}>
        {children}
      </ModalBody>
    </ModalContent>
  </Modal>
);
