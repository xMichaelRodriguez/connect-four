import { Box, HStack, Tag, TagLabel, TagLeftIcon, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { GiPointySword } from 'react-icons/gi';

// hooks
import { useAuth } from '../../../hook/useAuth';
import { useGame } from '../hooks/useGame';

// interfaces
import { IGame } from '../interface';

export const UserPointsLeft = () => {
  const { authState } = useAuth();
  const { gameState } = useGame();
  const { auth } = authState;
  const { players } = gameState;
  const [localPlayer, setLocalPlayer] = useState<IGame>();

  useEffect(() => {
    const player: IGame | undefined = players.find((player) => player.id === auth.id);

    if (player !== undefined) {
      setLocalPlayer(player);
    }
  }, [players]);
  return (
    <HStack>
      <Tag py={'0.5em'} colorScheme='cyan' variant={'subtle'} my='0.5em'>
        <TagLeftIcon as={GiPointySword} boxSize={'1.5em'} />
        <TagLabel fontSize={'1.1em'} px={'0.5em'}>
          <Text>You: </Text>
          <Box
            bg={localPlayer && localPlayer.color}
            borderRadius={'100%'}
            display='block'
            h='1em'
            w='1em'
            mt={1}
          ></Box>
        </TagLabel>
      </Tag>
    </HStack>
  );
};
