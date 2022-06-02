import { Divider, Icon, Tag, TagLabel, Text } from '@chakra-ui/react';
import React from 'react';
import { User } from '../../../context/AuthContext';
import { FaUserAlt } from 'react-icons/fa';
interface Props {
  user: User;
}

export const UserBoxLeft = ({ user }: Props) => {
  return (
    <Tag size={'lg'} key={user.id} variant='outline' colorScheme='cyan' h={'100px'} w={'100px'}>
      <TagLabel fontSize={'md'} key={user.id}>
        <Icon as={FaUserAlt} />
        <Text>{user.userName}</Text>
        <Divider variant='dashed' my={3} />
        <Text>Rank: {user.rank}</Text>
      </TagLabel>
    </Tag>
  );
};
