import {Box, HStack, Image, Text, useDisclosure} from '@chakra-ui/react';
import {useState} from 'react';

import RealtorDrawer from '../../components/Drawers/realtorDrawer';

import avatar from '/src/images/avatar.svg';

const AgentsNameDrawer = ({row, id, children}) => {
  const AgentDetailsModal = useDisclosure();
  const [agentId, setAgentId] = useState();
  const [runQuery, setRunQuery] = useState(false);

  const OpenAgentModal = item => {
    AgentDetailsModal.onOpen();
    setAgentId(item);
    setRunQuery(true);
  };

  return (
    <>
      {children ? (
        <Box as="span" cursor={'pointer'} onClick={() => OpenAgentModal(id || row?.id)}>
          {children}
        </Box>
      ) : (
        <HStack spacing="10px" cursor="pointer" onClick={() => OpenAgentModal(id || row?.id)}>
          <Image
            alt=""
            borderRadius="full"
            objectFit="cover"
            boxSize="38px"
            src={row?.avatar ?? avatar.src}
          />
          <Text
            fontSize="14px"
            fontWeight="400"
            as="span"
            textTransform="capitalize"
            _hover={{textDecoration: 'underline'}}
            width={'250px'}
            whiteSpace={`nowrap`}
            overflow={`hidden`}
            textOverflow={`ellipsis`}
          >
            {row.name}
          </Text>
        </HStack>
      )}

      <RealtorDrawer modalDisclosure={AgentDetailsModal} agentId={agentId} runQuery={runQuery} />
    </>
  );
};

export default AgentsNameDrawer;
