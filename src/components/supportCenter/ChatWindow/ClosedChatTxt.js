import {Box, Flex, Icon, Text} from '@chakra-ui/react';
import {IoCloseOutline} from 'react-icons/io5';
import {GoCheck} from 'react-icons/go';

import {Button} from '../../../ui-lib';

const ClosedChatTxt = ({
  selectedClient,
  showCloseChatMsg,
  setShowCloseChatMsg,
  handleCloseMutation,
}) => {
  return (
    <Box>
      {selectedClient?.id === showCloseChatMsg ? (
        <Box
          id="close_chat_button"
          background="#E8EFF0"
          alignItems="center"
          justifyContent="center"
          display="flex"
          flexDirection="column"
          gap="8px"
          color="#1D6169"
          mx="auto"
          w="fit-content"
          h="fit-content"
          padding="9px"
          borderRadius="5.54px"
        >
          <Text fontWeight="500">Are you sure you want to close this chat?</Text>

          <Flex display="flex" gap={2}>
            <Button
              colorScheme="#1D6169"
              variant="outline"
              background="transparent"
              color="#1D6169"
              leftIcon={<Icon as={IoCloseOutline} color="#1D6169" />}
              border="0.50px #1D6169 solid"
              fontSize="10px"
              fontWeight="400"
              padding="8px"
              w="fit-content"
              h="fit-content"
              borderRadius="5px"
              mt="0px"
              onClick={() => setShowCloseChatMsg(false)}
            >
              NO
            </Button>

            <Button
              colorScheme="#1D6169"
              variant="outline"
              background="transparent"
              color="#1D6169"
              leftIcon={<Icon as={GoCheck} color="#1D6169" />}
              border="0.50px #1D6169 solid"
              fontSize="10px"
              fontWeight="400"
              padding="8px"
              w="fit-content"
              h="fit-content"
              borderRadius="5px"
              mt="0px"
              onClick={handleCloseMutation}
            >
              YES
            </Button>
          </Flex>
        </Box>
      ) : null}
    </Box>
  );
};

export default ClosedChatTxt;
