import { HStack, Kbd, Tag, TagLabel, TagLeftIcon } from '@chakra-ui/react';
import { useContext } from 'react';
import { GiPointySword } from 'react-icons/gi';
import { AuthContext } from '../../../context/AuthContext';

export const UserPointsLeft = () => {
  const { auth } = useContext(AuthContext);
  return (
    <HStack>
      <Tag my='0.5em' variant={'subtle'} colorScheme='cyan' py={'0.5em'}>
        <TagLeftIcon boxSize={'1.2em'} as={GiPointySword} />
        <TagLabel fontSize={'1.2em'}>
          {auth?.userName && auth.userName} Points:{' '}
          <span>
            <Kbd>1</Kbd>
          </span>
        </TagLabel>
      </Tag>
    </HStack>
  );
};
