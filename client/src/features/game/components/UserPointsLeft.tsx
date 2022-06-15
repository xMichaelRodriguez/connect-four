import { Box, HStack, Kbd, Tag, TagLabel, TagLeftIcon } from '@chakra-ui/react';
import { useContext } from 'react';
import { GiPointySword } from 'react-icons/gi';
import { AuthContext } from '../../../context/AuthContext';
import { GameContext, Player } from '../context/GameContext';

export const UserPointsLeft = () => {
  const { auth } = useContext(AuthContext);
  const { players } = useContext(GameContext);
  const activePlayer: Player | undefined = players.users.find((user) => user.id === auth.id);
  return (
    <HStack>
      <Tag my='0.5em' variant={'subtle'} colorScheme='cyan' py={'0.5em'}>
        <TagLeftIcon boxSize={'1.2em'} as={GiPointySword} />
        <TagLabel fontSize={'1.2em'}>
          {auth?.userName && auth.userName}:{'(You) '}
          <Box
            display='block'
            bg={activePlayer && activePlayer.color}
            h='1em'
            w='1em'
            borderRadius={'100%'}
          ></Box>
        </TagLabel>
      </Tag>
    </HStack>
  );
};
