import { Box, HStack, Kbd, Tag, TagLabel, TagLeftIcon, Text } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { GiPointySword } from 'react-icons/gi';
import { useAuth } from '../../../hook/useAuth';
import { useGame } from '../hooks/useGame';
import { IGame } from '../interface';

interface Props {}

export const UserPointsRight = (props: Props) => {
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
    return () => {
      setAdversaryPlayer({} as IGame);
    };
  }, []);

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
