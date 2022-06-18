import { Icon, Tag, TagLabel, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaUserAlt } from 'react-icons/fa';

import { IAuth } from '../../../interfaces';

interface Props {
  user: IAuth;
}
// FaUserAlt
export const UserBoxRight = ({ user }: Props) => {
  return (
    <motion.div
      initial={{
        x: -30,
        y:-20
      }}
      animate={{
        x: 30,
        y:10,
        transition: {
          duration: 1,
          ease: 'easeInOut',
          repeat: Infinity,
          repeatType: 'reverse',
        },
      }}
    >
      <Tag size={'lg'} variant='outline' colorScheme={'teal'} borderRadius={'50%'} h={'6.5em'} w={'7em'}>
        <TagLabel
          alignItems={'center'}
          display='flex'
          flexDir={'column'}
          fontSize={'md'}
          mx='auto'
          justifyContent='center'
        >
          <Text noOfLines={[1, 2, 3]} my={1}>
            {user.userName}
          </Text>
          <Icon as={FaUserAlt} textAlign='center' />
        </TagLabel>
      </Tag>
    </motion.div>
  );
};
