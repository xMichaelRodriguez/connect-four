import {
  Icon, Tag, TagLabel, Text,
} from '@chakra-ui/react';
import { FaUserAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

import { IAuth } from '../../../interfaces';

interface Props {
  user: IAuth;
}

export function UserBoxLeft({ user }: Props) {
  return (
    <motion.div
      initial={{
        x: -30,
        y: -29,
      }}
      animate={{
        x: 20,
        y: 15,
        transition: {
          duration: 1,
          ease: 'easeInOut',
          repeat: Infinity,
          repeatType: 'reverse',
        },
      }}
    >
      <Tag size="lg" variant="outline" borderRadius="50%" colorScheme="teal" h="6.5em" w="7em">
        <TagLabel
          alignItems="center"
          display="flex"
          flexDir="column"
          fontSize="md"
          mx="auto"
          justifyContent="center"
        >
          <Text noOfLines={[1, 2, 3]} my={1}>
            {user.userName}
          </Text>
          <Icon as={FaUserAlt} />
        </TagLabel>
      </Tag>
    </motion.div>
  );
}
