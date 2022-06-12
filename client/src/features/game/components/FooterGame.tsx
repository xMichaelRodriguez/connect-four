import { Button, ButtonGroup } from '@chakra-ui/react';

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
      <Button size={'lg'} variant={'outline'} colorScheme='purple'>
        Reset Game
      </Button>
      <Button size={'lg'} variant={'outline'} colorScheme='red'>
        End Game
      </Button>
    </ButtonGroup>
  );
};
