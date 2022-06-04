import { HStack, Kbd, Tag, TagLabel, TagLeftIcon } from '@chakra-ui/react';
import React from 'react';
import { GiPointySword } from 'react-icons/gi';

export const UserPointsLeft = () => {
  return (
    <HStack>
      <Tag my='0.5em' variant={'subtle'} colorScheme='cyan' py={'0.5em'}>
        <TagLeftIcon boxSize={'1.5em'} as={GiPointySword} />
        <TagLabel fontSize={'1.5em'}>
          UserPointLeft: {" "}
          <span>
            <Kbd>1</Kbd>
          </span>
        </TagLabel>
      </Tag>
    </HStack>
  );
};
