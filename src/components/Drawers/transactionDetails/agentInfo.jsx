import {Flex, Image, Link, Stack, Text} from '@chakra-ui/react';
import React from 'react';
import {useVerifyAgentEmail} from 'ui-lib/ui-lib.hooks/useVerifyAgentEmail';

const AgentInfo = ({agentInfo}) => {
  return (
    <Stack w="full" spacing="8px">
      <Text fontSize="12px" fontWeight="500" lineHeight="15.22px">
        Agent
      </Text>
      <Flex
        borderRadius="4px"
        border="0.5px solid #E4E4E7"
        minH="61px"
        p="12px"
        bg="#fafafa"
        gap="8px"
      >
        <Image
          borderRadius="full"
          objectFit="cover"
          src={agentInfo?.avatar}
          alt="agent image"
          boxSize="32px"
          minW="32px"
        />
        <Stack spacing="4px">
          <Text fontSize="13px" fontWeight="500" lineHeight="19.5px">
            {agentInfo?.first_name ?? ''} {agentInfo?.last_name ?? ''}
          </Text>
          <Link
            _hover={{textTransform: 'none'}}
            href={`mailto:${agentInfo?.email ?? ''}`}
            fontSize="10px"
            fontWeight="400"
            color="#4545fe"
            lineHeight="12.68px"
          >
            {agentInfo?.email ?? ''}
          </Link>
        </Stack>
      </Flex>
    </Stack>
  );
};

export default AgentInfo;
