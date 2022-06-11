import React from 'react';
import { Divider, Icon, Tag, TagLabel, Text } from '@chakra-ui/react';
import { FaUserAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

import { User } from '../../../context/AuthContext';
interface Props {
  user: User;
}

export const UserBoxLeft = ({ user }: Props) => {
  return (
    <motion.div
      initial={{
        x: -20,
      }}
      animate={{
        x: 30,
        transition: {
          duration: 1,
          ease: 'easeInOut',
          repeat: Infinity,
          repeatType: 'reverse',
        },
      }}
    >
      <Tag size={'lg'}  variant='outline' colorScheme='teal' h={'100px'} w={'110px'}>
        <TagLabel fontSize={'md'} >
          <Text  noOfLines={[1, 2, 3]} my={1}>
            {user.userName}
          </Text>

          <Icon as={FaUserAlt}  />
        </TagLabel>
      </Tag>
    </motion.div>
  );
};
