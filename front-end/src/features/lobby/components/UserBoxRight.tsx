import { Divider, Icon, Tag, TagLabel, Text } from '@chakra-ui/react';
import React from 'react';
import { User } from '../../../context/AuthContext';
import { FaUserAlt } from 'react-icons/fa';
interface Props {
  user: User;
}
// FaUserAlt
export const UserBoxRight = ({ user }: Props) => {
  return (
    <Tag size={'lg'} key={user.id} variant='solid' colorScheme={'telegram'} h={'100px'} w={'100px'}>
      <TagLabel fontSize={'md'}>
        <Icon as={FaUserAlt} />
        <Text>{user.userName}</Text>
        <Divider variant='dashed' my={3} />
        <Text>Rank: {user.rank}</Text>
      </TagLabel>
    </Tag>
  );
};
