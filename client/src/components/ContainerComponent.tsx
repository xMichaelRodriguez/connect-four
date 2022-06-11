import { Center, Container } from '@chakra-ui/react';
import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export const ContainerComponent = ({ children }: Props) => {
  return (
    <Container
      maxW={'370px'}
      w='full'
      maxH={'400px'}
      h='full'
      boxShadow={'2xl'}
      bg='blackAlpha.800'
      rounded={'md'}
      overflow='hidden'
      p={3}
      color="white"
    >
      <Center
        h='full'
        justifyContent={'center'}
        alignItems='center'
        flexDirection='column'
      >
        {children}
      </Center>
    </Container>
  );
};
