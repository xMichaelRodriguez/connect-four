import { createContext } from 'react';

export interface IModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const ModalContext = createContext<IModalProps>(
  {} as IModalProps
);
