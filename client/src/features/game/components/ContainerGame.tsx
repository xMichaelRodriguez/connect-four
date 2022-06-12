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
  maxW = '50.5em',
  maxH = '33.7em',
}: Props) => {
  return (
    <Container
      maxW={maxW}
      w='full'
      maxH={maxH}
      h='full'
      boxShadow={'md'}
      bg={bg}
      rounded={'md'}
      overflow='hidden'
      p={2}
      color='white'
      overflowY={'auto'}
    >
      <Center minH='max-content' justifyContent={'center'} m={3} alignItems='center' flexDirection='column'>
        {children}
      </Center>
    </Container>
  );
};
