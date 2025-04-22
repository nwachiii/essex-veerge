import {Box, Flex, Icon, Input, Stack, StackDivider, Text, useDisclosure} from '@chakra-ui/react';
import {useQuery} from '@tanstack/react-query';
import {verifyAgentEmail} from 'apis/manageAgent';
import {useState, useRef, useEffect} from 'react';
import {FaCheck} from 'react-icons/fa6';
import {useVerifyAgentEmail} from 'ui-lib/ui-lib.hooks/useVerifyAgentEmail';
const AssignAgentInput = ({
  index,
  equity,
  fieldName,
  isAgentEmail,
  setFieldValue,
  defaultName = '',
  defaultEmail = '',
  setIsAgentEmail,
  stackDividerStyle,
}) => {
  const {agentName, email, onOpen, handleInput, toggleAgentEmail, isOpen, isError} =
    useVerifyAgentEmail({
      setIsAgentEmail,
      fieldName,
      setFieldValue,
      index,
      defaultEmail,
      defaultName,
    });

  useEffect(() => {
    if (defaultEmail) {
      onOpen();
    }
  }, [defaultEmail]);

  return (
    <>
      <StackDivider border="none" my="24px" h="1px" bg="#f4f4f5" {...stackDividerStyle} />
      <Flex w="full" maxW="390px" alignItems="start" gap="12px">
        <CheckBox toggleCheckBox={toggleAgentEmail} isOpen={isOpen} />
        <Stack w="full" spacing="12px">
          <Stack spacing="4px">
            <Text fontSize="16px" fontWeight="600" color="#27272a" lineHeight="22.4px">
              Assign Agent (optional)
            </Text>
            <Text fontSize="13px" fontWeight="400" color="#3f3f46" lineHeight="19.5px">
              Add the agent that closed this sale.
            </Text>
          </Stack>
          {isOpen ? (
            <Stack w="full" spacing="6px">
              <Input
                borderRadius="8px"
                border="1px solid #e4e4e7"
                h="38px"
                _focusVisible={{
                  boxShadow: ' 0px 1px 2px 0px #1018280D',
                  outline: 'none',
                  border: '1px solid #e4e4e7',

                  bg: 'transparent',
                }}
                _hover={{
                  boxShadow: ' 0px 1px 2px 0px #1018280D',
                  outline: 'none',
                  border: '1px solid #e4e4e7',
                  bg: 'transparent',
                }}
                boxShadow=" 0px 1px 2px 0px #1018280D"
                fontSize="16px"
                fontWeight="400"
                color="#27272a"
                lineHeight="22.4px"
                placeholder="Enter agent's email address"
                _placeholder={{color: '#71717a'}}
                maxW="402px"
                w="full"
                type="email"
                value={email}
                name="email"
                onChange={handleInput}
              />
              {isError ? (
                <Text
                  letterSpacing="2%"
                  fontSize="13px"
                  color="#71717a"
                  fontWeight="400"
                  lineHeight="19.5px"
                >
                  Agent doesn&apos;t exist,
                  <Text as="span" color="#ea580c">
                    {' '}
                    uncheck this option to proceed.
                  </Text>
                </Text>
              ) : agentName ? (
                <Text
                  letterSpacing="2%"
                  fontSize="13px"
                  textTransform="capitalize"
                  fontWeight="400"
                  lineHeight="19.5px"
                >
                  {agentName}
                </Text>
              ) : null}
            </Stack>
          ) : null}
        </Stack>
      </Flex>
    </>
  );
};

export default AssignAgentInput;

const CheckBox = ({toggleCheckBox, isOpen}) => {
  return (
    <Box
      role="checkbox"
      cursor="pointer"
      aria-description="toggle add agent check box"
      display="grid"
      placeContent="center"
      onClick={toggleCheckBox}
      bg={'#f4f4f5'}
      boxSize="20px"
      minW="20px"
      border="1px solid #4545fe"
      borderRadius="6px"
    >
      <Icon
        transform={`scale(${isOpen ? 0.8 : 0})`}
        color="#4545fe"
        transition="0.3s ease-in-out"
        opacity={isOpen ? 1 : 0}
        as={FaCheck}
      />
    </Box>
  );
};
