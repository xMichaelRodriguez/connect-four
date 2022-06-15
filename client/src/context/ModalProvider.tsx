import { useDisclosure } from '@chakra-ui/react';
import React, { ReactNode, useState } from 'react';
import { ModalContext } from './ModalContext';
interface props {
  children: ReactNode | ReactNode[];
}

export const ModalProvider = ({ children }: props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        onOpen,
        onClose,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
