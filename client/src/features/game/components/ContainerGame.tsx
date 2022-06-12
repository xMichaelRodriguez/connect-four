import { Center, Container } from '@chakra-ui/react';
import React, { ReactNode } from 'react';

interface Props {
  children: JSX.Element | JSX.Element[];
  maxW?: string;
  maxH?: string;
  bg?: string;
}

export const ContainerGame = ({
  children,
  bg = 'blackAlpha.800',
  maxW = '30.5em',
  maxH = '30.7em',
}: Props) => {
  return (
    <Container
      maxW={['38em', maxW]}
      w={['18em', 'full']}
      maxH={['20em', maxH]}
      h={['20em', 'full']}
      boxShadow={'md'}
      bg={bg}
      rounded={'md'}
      overflow='hidden'
      p={2}
      color='white'
      overflowY={'auto'}
    >
      <Center
      
        minH={['full', 'max-content']}
        justifyContent={'center'}
       
        alignItems='center'
        flexDirection='column'
      >
        {children}
      </Center>
    </Container>
  );
};
