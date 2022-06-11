import { Tr } from '@chakra-ui/react';
import { RowComp } from './RowComp';

interface Props {
  rows: number[];
  colIndex: number;
}

export const ColComp = ({ rows, colIndex }: Props) => {
  return (
    <Tr borderRadius={'20%'} borderWidth={'0.1em'}>
      {rows.map((rowIndex, index) => (
        <RowComp key={index} colIndex={colIndex} rowIndex={index} />
      ))}
    </Tr>
  );
};
