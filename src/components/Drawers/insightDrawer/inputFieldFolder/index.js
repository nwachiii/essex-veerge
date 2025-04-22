import {Box, Button, Flex, Image} from '@chakra-ui/react';
import TextareaAutosize from 'react-textarea-autosize';

import SendIcon from '/src/images/icons/send-icon-2.svg';

import {useState} from 'react';

const InputField = ({handleSubmit}) => {
  const [text, setText] = useState('');

  const submit_this_message = () => {
    handleSubmit(text);
    setText('');
  };

  // for enter key to trigger the submit button
  const handleKeyDown = e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      submit_this_message();
    }
  };

  return (
    <Box w="full">
      <Flex
        alignItems="center"
        w="full"
        bg="white"
        border="1px #D0D5DD solid"
        borderRadius="12px"
        // mb={2}
      >
        <Box
          flex={1}
          w="full"
          display="flex"
          flexDirection="column"
          background="transparent"
          borderRadius="12px"
          gap="8px"
          pl="16px"
          pt="10px"
          pb={2}
        >
          <Box flex={1} w="full" display="flex" alignItems="center">
            <Box bg="transparent" w="full" flex={1} display="flex" flexDirection="column" gap="8px">
              <TextareaAutosize
                cacheMeasurements
                value={text}
                onChange={e => setText(e.target.value)}
                placeholder="Ask me anything"
                style={{
                  width: '100%',
                  height: '40px',
                  // placeholder: '#919191',
                  color: '#667085',
                  background: 'transparent',
                  fontSize: '14px',
                  fontWeight: '400',
                  borderRadius: '8px',
                  outline: 'transparent',
                  padding: '2px 4px',
                  alignSelf: 'center',
                  textAlign: 'start',
                  resize: 'none',
                }}
                maxRows={15}
                onKeyDown={handleKeyDown}
              />
            </Box>
          </Box>
        </Box>

        <Box alignSelf="flex-end" justifyItems="center" alignItems="center">
          <Button
            bg="transparent"
            borderRadius="16px"
            py="20px"
            _hover={{bg: 'transparent'}}
            onClick={submit_this_message}
          >
            <Image src={SendIcon.src} alt="send icon" />
          </Button>
        </Box>
      </Flex>
    </Box>
  );
};

export default InputField;
