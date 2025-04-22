import {Button, useDisclosure} from '@chakra-ui/react';
import {useState} from 'react';

import RealtorDrawer from '../../components/Drawers/realtorDrawer';
// import {Button} from '../../ui-lib';
import {themeStyles} from 'theme';

const ActionAgentDrawer = ({row}) => {
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
      <Button
        borderRadius="72px"
        w="115px"
        h="40px"
        color={themeStyles.color.primary}
        fontWeight={'400'}
        fontSize="16px"
        borderColor={themeStyles.color.primary}
        variant="outline"
        onClick={() => OpenAgentModal(row?.id)}
      >
        View
      </Button>

      <RealtorDrawer modalDisclosure={AgentDetailsModal} agentId={agentId} runQuery={runQuery} />
    </>
  );
};

export default ActionAgentDrawer;
