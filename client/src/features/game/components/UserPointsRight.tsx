import { Box, HStack, Kbd, Tag, TagLabel, TagLeftIcon } from '@chakra-ui/react';
import { useContext } from 'react';
import { GiPointySword } from 'react-icons/gi';
import { AuthContext, User } from '../../../context/AuthContext';
import { GameContext, Player } from '../context/GameContext';

interface Props {}

export const UserPointsRight = (props: Props) => {
  const { users, auth } = useContext(AuthContext);
  const { players } = useContext(GameContext);
  const adversary: Player | undefined = players.users.find((user) => user.id !== auth.id);
  const valid = !!adversary;
  return (
    <HStack>
      <Tag my='0.5em' variant={'subtle'} colorScheme='teal' py={'0.5em'}>
        <TagLeftIcon boxSize={'1.2em'} as={GiPointySword} />
        <TagLabel fontSize={'1.2em'}>
          {valid && adversary.userName}:
          <Box display='block' bg={adversary && adversary.color} h='1em' w='1em' borderRadius={'100%'}></Box>
        </TagLabel>
      </Tag>
    </HStack>
  );
};
