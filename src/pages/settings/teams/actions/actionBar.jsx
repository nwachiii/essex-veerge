import React from 'react';
import {Flex, Button, Text} from '@chakra-ui/react';
import {useRouter} from 'next/router';
import InviteTeamMemberDrawer from '../../../../components/Drawers/inviteTeamMemberDrawer';
import {isRoleRestricted} from 'ui-lib/ui-lib.hooks/isRoleRestricted';

export const ActionBar = ({refetch}) => {
  const router = useRouter();

  return (
    <Flex align={'center'} justify={'space-between'} mt="10px">
      <Text fontSize="16px" fontWeight={500}>
        Team Members
      </Text>
      <Flex justify={'flex-end'} gap={4}>
        <Button
          _hover={{bg: 'transparent'}}
          _active={{bg: 'transparent'}}
          _focus={{bg: 'transparent'}}
          fontSize="14px"
          fontWeight="400"
          color="#191919"
          borderRadius="12px"
          bg="transparent"
          border="1.6px solid #191919"
          h="41px"
          w="176px"
          onClick={() => router.push('/manageroles')}
          p="12px"
        >
          Manage roles
        </Button>
        {isRoleRestricted('invite teams members').check ? null : (
          <InviteTeamMemberDrawer refetchTeamTab={refetch} />
        )}
      </Flex>
    </Flex>
  );
};
export default ActionBar;
