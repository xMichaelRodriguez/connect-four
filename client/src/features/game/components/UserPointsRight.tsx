import { HStack, Kbd, Tag, TagLabel, TagLeftIcon } from '@chakra-ui/react';
import { useContext } from 'react';
import { GiPointySword } from 'react-icons/gi';
import { AuthContext, User } from '../../../context/AuthContext';

interface Props {}

export const UserPointsRight = (props: Props) => {
  const { users, auth } = useContext(AuthContext);
  const adversary: User | undefined | false = users.length > 0 && users.find((user) => user.id !== auth.id);
  const valid = !!adversary;
  return (
    <HStack>
      <Tag my='0.5em' variant={'subtle'} colorScheme='teal' py={'0.5em'}>
        <TagLeftIcon boxSize={'1.2em'} as={GiPointySword} />
        <TagLabel fontSize={'1.2em'}>
          {valid && adversary.userName} Points:{' '}
          <span>
            <Kbd>2</Kbd>
          </span>
        </TagLabel>
      </Tag>
    </HStack>
  );
};
