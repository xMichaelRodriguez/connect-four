import React, { ReactNode, useMemo } from 'react';
import { useDisclosure } from '@chakra-ui/react';
import { ModalContext } from './ModalContext';

interface props {
  children: ReactNode | ReactNode[];
}

export function ModalProvider({ children }: props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const defaultValue = {
    isOpen,
    onOpen,
    onClose,
  };
  const defaultPrpops = useMemo(() => defaultValue, [isOpen, onOpen]);

  return <ModalContext.Provider value={defaultPrpops}>{children}</ModalContext.Provider>;
}
