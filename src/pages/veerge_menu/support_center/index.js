import {useState} from 'react';
import {LayoutView} from '../../../components';
import {Box, Flex, Stack} from '@chakra-ui/react';

import SidebarMsg from '../../../components/supportCenter/SidebarMsg';
import ChatWindow from '../../../components/supportCenter/ChatWindow';

const VeergeMenuSupportCenter = () => {
  const [noChat, setNoChat] = useState(true);
  const [selectedClient, setSelectedClient] = useState();
  const [runQuery, setRunQuery] = useState(false);
  const [inputId, setInputId] = useState('');
  const [refreshTracker, setRefreshTracker] = useState(Math.round(Math.random() * 1000000));

  return (
    <Stack h="100vh" bg="#fafafa" pb="20px" w="100%">
      <LayoutView />
      <Box
        color="#191919"
        fontFamily="Euclid Circular B"
        w="100%"
        px="10px"
        h="100%"
        minH="calc(100vh - 110px)"
        backgroundColor={'white'}
        transform={'translateY(-100%)'}
      >
        <Flex w="full" h="100%">
          <Box w="410px">
            <SidebarMsg
              setSelectedClient={setSelectedClient}
              setNoChat={setNoChat}
              setRunQuery={setRunQuery}
              selectedClient={selectedClient}
              setInputId={setInputId}
              refreshTracker={refreshTracker}
            />
          </Box>

          <Box flex={1} pb={'10px'}>
            <ChatWindow
              noChat={noChat}
              selectedClient={selectedClient}
              runQuery={runQuery}
              inputId={inputId}
              setRefreshTracker={setRefreshTracker}
            />
          </Box>
        </Flex>
      </Box>
    </Stack>
  );
};

export default VeergeMenuSupportCenter;
