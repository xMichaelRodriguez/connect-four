import { HStack, Kbd, Tag, TagLabel, TagLeftIcon } from '@chakra-ui/react';
import { GiPointySword } from 'react-icons/gi';

interface Props {}

export const UserPointsRight = (props: Props) => {
  return (
    <HStack>
      <Tag my='0.5em' variant={'subtle'} colorScheme='teal' py={'0.5em'}>
        <TagLeftIcon boxSize={'1.2em'} as={GiPointySword} />
        <TagLabel fontSize={'1.2em'}>
          UserPointRight: {" "}
          <span>
            <Kbd>2</Kbd>
          </span>
        </TagLabel>
      </Tag>
    </HStack>
  );
};
