import { motion } from 'framer-motion';
import React, { ReactNode } from 'react';

interface IProps {
  children: ReactNode;
}

export function FaceUpAnimateComponent({ children }: IProps) {
  return (
    <motion.div
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -10, opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
}
