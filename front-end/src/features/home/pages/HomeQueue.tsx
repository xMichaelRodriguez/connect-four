import {
  Box,
  Button,
  Heading,
  Spinner,
  Tag,
  TagLabel,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useContext } from 'react';
import { ContainerComponent } from '../../../components/ContainerComponent';
import { ModalComponent } from '../../../components/ModalComponent';
import { AuthContext } from '../../../context/AuthContext';
import { ModalContext } from '../../../context/ModalContext';
import { TotalUsers } from '../components/TotalUsers';

export const HomeQueue = () => {
  const { auth } = useContext(AuthContext);
  const { onOpen, isOpen, onClose } = useContext(ModalContext);

  return (
    <>
      <ContainerComponent>
        <TotalUsers />
        <Heading>{auth && auth.userName}</Heading>
        <Tag
          my={5}
          size={'md'}
          borderRadius='md'
          colorScheme={'teal'}
          variant='outline'
        >
          <TagLabel>Rank: {auth && auth.rank}</TagLabel>
        </Tag>
        <Box>
          <Button variant={'outline'} colorScheme={'teal'} onClick={onOpen}>
            Find Match
          </Button>
          <ModalComponent isOpen={isOpen} onClose={onClose}>
            <Spinner
              thickness='6px'
              speed='0.65s'
              emptyColor='gray.200'
              color='teal'
              size='xl'
            />
          </ModalComponent>
        </Box>
      </ContainerComponent>
    </>
  );
};
``;
