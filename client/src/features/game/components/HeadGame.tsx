import React, { useContext } from 'react';
import { Box, Flex, HStack, Tag, TagLabel, TagRightIcon, Text, VStack } from '@chakra-ui/react';
import { AiOutlineNodeIndex } from 'react-icons/ai';

import { UserPointsLeft } from '../components/UserPointsLeft';
import { UserPointsRight } from '../components/UserPointsRight';
import { GameContext } from '../context/GameContext';

export const HeadGame = () => {
  const { color } = useContext(GameContext);
  return (
    <>
      <Flex
        justifyContent={'space-around'}
        flexDir={['column', 'column', 'row']}
        gap='2'
        maxW={'full'}
        px='2'
      >
        <UserPointsLeft />
        <HStack>
          <Tag my='0.5em' variant={'subtle'} colorScheme='messenger' py={'0.5em'}>
            <TagRightIcon boxSize={'1.5em'} as={AiOutlineNodeIndex} />
            <TagLabel fontSize={'1.5em'}>Connect 4 </TagLabel>
          </Tag>
        </HStack>
        <UserPointsRight />
      </Flex>

      <VStack>
        <Text fontWeight={'bold'}>Current Player:</Text>
        <Tag m='auto' variant={'subtle'} colorScheme='blackAlpha.500' py={'0.5em'}>
          <TagLabel fontSize={'1.5em'} textAlign='center'>
            <Box display='block' bg={color} h='2em' w='2em' borderRadius={'100%'}></Box>
          </TagLabel>
        </Tag>
      </VStack>
    </>
  );
};
