import { Button, ButtonGroup } from '@chakra-ui/react';
import { FaceUpAnimateComponent } from '../../../components/FaceUpAnimateComponent';

interface Props {}

export const FooterGame = (props: Props) => {
  return (
    <ButtonGroup
      alignItems={'center'}
      variant={'outline'}
      colorScheme='teal'
      position={'absolute'}
      bottom={0}
      top='85%'
    >
      <FaceUpAnimateComponent>
        <Button size={'lg'} variant={'outline'} colorScheme='purple'>
          Restart Game
        </Button>
      </FaceUpAnimateComponent>
      <FaceUpAnimateComponent>
        <Button size={'lg'} variant={'outline'} colorScheme='red'>
          EndGame
        </Button>
      </FaceUpAnimateComponent>
    </ButtonGroup>
  );
};
