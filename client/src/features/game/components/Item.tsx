import { Box, Td } from '@chakra-ui/react';
interface Props {
  x: number;
  y: number;
  color: string;
}

export const ItemBox = ({ x, y, color }: Props) => {
  const handleClick = () => {
    console.log({ x, y });
  };
  return (
    <Td
      transform={`translate(${x}rem,${y}rem)`}
      onClick={handleClick}
      borderRadius={'30%'}
      borderWidth={'0.1em'}
      bg='transparent'
      h='5em'
      w='5em'
    ></Td>
  );
};
