import { Box, HStack, Tag, TagLabel, TagLeftIcon, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { GiPointySword } from 'react-icons/gi';

// hooks
import { useAuth } from '../../../hook/useAuth';
import { useGame } from '../hooks/useGame';

// interfaces
import { IGame } from '../interface';

export const UserPointsRight = () => {
  const { authState } = useAuth();
  const { gameState } = useGame();
  const { auth } = authState;
  const { players } = gameState;

  const [adversaryPlayer, setAdversaryPlayer] = useState<IGame>();

  useEffect(() => {
    const player: IGame | undefined = players.find((player) => player.id !== auth.id);

    if (player !== undefined) {
      setAdversaryPlayer(player);
    }
  }, [players]);

  return (
    <HStack>
      <Tag my='0.5em' py={'0.5em'} colorScheme='teal' variant={'subtle'}>
        <TagLeftIcon as={GiPointySword} boxSize={'1.5em'} />
        <TagLabel fontSize={'1.1em'} px={'0.5em'}>
          <Text>{adversaryPlayer && adversaryPlayer.userName}:</Text>
          <Box
            bg={adversaryPlayer && adversaryPlayer.color}
            borderRadius={'100%'}
            h='1em'
            mt={1}
            w='1em'
          ></Box>
        </TagLabel>
      </Tag>
    </HStack>
  );
};
