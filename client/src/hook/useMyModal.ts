import { useContext } from 'react';
import { ModalContext } from '../context/ModalContext'
export const useMyModal = () => {
    const { isOpen, onOpen, onClose } = useContext(ModalContext)

    return {
        isOpen,
        onClose,
        onOpen
    }
}