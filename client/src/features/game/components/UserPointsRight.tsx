import { HStack, Kbd, Tag, TagLabel, TagLeftIcon } from '@chakra-ui/react';
import React from 'react';
import { GiPointySword } from 'react-icons/gi';

interface Props {}

export const UserPointsRight = (props: Props) => {
  return (
    <HStack>
      <Tag my='0.5em' variant={'subtle'} colorScheme='teal' py={'0.5em'}>
        <TagLeftIcon boxSize={'1.5em'} as={GiPointySword} />
        <TagLabel fontSize={'1.5em'}>
          UserPointRight: {" "}
          <span>
            <Kbd>2</Kbd>
          </span>
        </TagLabel>
      </Tag>
    </HStack>
  );
};
