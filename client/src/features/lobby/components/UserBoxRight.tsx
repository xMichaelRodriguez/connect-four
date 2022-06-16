import {  Icon, Tag, TagLabel, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaUserAlt } from 'react-icons/fa';

import { IGame } from '../../game/interface';



interface Props {
  user: IGame;
}
// FaUserAlt
export const UserBoxRight = ({ user }: Props) => {
  return (
    <motion.div
      initial={{
        x: 20,
      }}
      animate={{
        x: -30,
        transition: {
          duration: 1,
          ease: 'easeInOut',
          repeat: Infinity,
          repeatType: 'reverse',
        },
      }}
    >
      <Tag size={'lg'} variant='outline' colorScheme={'teal'} h={'100px'} w={'100px'}>
        <TagLabel fontSize={'md'} textAlign='center'>
          <Text noOfLines={[1, 2, 3]} my={1} >{user.userName}</Text>
          <Icon as={FaUserAlt} textAlign='center' />
        </TagLabel>
      </Tag>
    </motion.div>
  );
};
