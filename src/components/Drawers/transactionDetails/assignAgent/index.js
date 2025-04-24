import {
  Button, Drawer,
  DrawerBody, DrawerContent,
  DrawerFooter,
  DrawerOverlay,
  Flex,
  HStack,
  Image,
  Input, Stack,
  Text, useToast
} from '@chakra-ui/react';
import { useState } from 'react';
import infoIcon from '/src/images/icons/infoIconGrey.svg';
import { useVerifyAgentEmail } from 'ui-lib/ui-lib.hooks/useVerifyAgentEmail';
import { useMutation } from '@tanstack/react-query';
import { assignAgentToEquity } from 'apis/manageAgent';

const customScrollbarStyles = {
  '&::-webkit-scrollbar': {
    width: '4px',
    borderRadius: '16px',
  },
  '&::-webkit-scrollbar-track': {
    borderRadius: '16px',
    WebkitBoxShadow: 'inset 0 0 6px transparent',
  },
  '&::-webkit-scrollbar-thumb': {
    borderRadius: '16px',
    backgroundColor: '#e1e1e1',
    // outline: '1px solid #f5f5f5',
  },
};
// wevad90938@sectorid.com
const AssignAgentDrawer = ({equity_id, refetch, drawerDisclosure}) => {
  const [isAgentEmail, setIsAgentEmail] = useState({loading: false, available: false});
  const [payload, setPayload] = useState({equity_id: '', agent_id: ''});

  const toast = useToast();

  const setFieldValue = (name, value) => {
    setPayload({equity_id, [name]: value});
  };

  const mutation = useMutation(formData => assignAgentToEquity(formData), {
    onSuccess: async res => {
      await refetch();

      toast({
        title: `Agent assigned successfully`,
        status: 'success',
        duration: 8000,
        isClosable: true,
        position: 'top-right',
      });
      handleClose();
    },
    onError: err => {
      toast({
        title: 'Oops ...',
        description: `${
          err?.response?.status === 500
            ? "Apologies for the inconvenience. We're working on it. Please try again later."
            : err?.response?.status === 401
              ? 'Authentication Timeout: For security reasons, your session has timed out. Please log in again to continue.'
              : (err?.response?.data?.message ??
                err?.response?.message ??
                err?.message ??
                'Something went wrong')
        }`,
        status: 'error',
        duration: 8000,
        isClosable: true,
        position: 'top-right',
      });
    },
  });

  const {handleInput, handleReset, email, agentName, isError} = useVerifyAgentEmail({
    setFieldValue,
    setIsAgentEmail,
    index: null,
    fieldName: 'agent_id',
    setIsAgentEmail,
    preventSubmissionWhenEmpty: true,
  });
  const handleClose = () => {
    drawerDisclosure.onClose();
    handleReset();
  };
  console.log({payload});
  const isValid = isAgentEmail?.available && !isAgentEmail?.loading;

  const handleSubmit = e => {
    e.preventDefault();
    if (!isValid) return;

    mutation.mutate(payload);
  };
  return (
    <Drawer isOpen={drawerDisclosure.isOpen} onClose={handleClose} borderRadius="16px">
      <DrawerOverlay bg="rgba(0,0,0,0.07)" />
      <DrawerContent
        position="relative"
        zIndex={100}
        mt="65.12px"
        maxW="450px"
        bg="#FBFCFC"
        p="0px"
        boxShadow="none"
      >
        <>
          <HStack
            boxShadow="0px 2px 4px 0px #0000000D"
            py="12px"
            bg="#fafafa"
            h="49.7px"
            px="23.2px"
            justify="space-between"
            align="center"
            position="relative"
            width="full"
          >
            <Flex alignItems="center" gap={2}>
              {/* <IoArrowBackSharp fontSize="20px" cursor="pointer" onClick={handleClose} /> */}
              <Text fontSize="20px" fontWeight={600} color="#191919">
                Assign Agent
              </Text>
            </Flex>
          </HStack>

          <DrawerBody
            mt="24px"
            mb="10px"
            sx={customScrollbarStyles}
            px="28px"
            py="0px"
            pr="17px"
            mr="8px"
          >
            <Stack gap={`6px`} w={`100%`}>
              <Text
                fontFamily="Euclid Circular B"
                color="#3f3f46"
                fontSize="13px"
                fontWeight="500"
                lineHeight="19.5px"
              >
                Agent Email Address
              </Text>
              <Stack as="form" onSubmit={handleSubmit} spacing="6px">
                <Input
                  boxShadow="none"
                  marginBottom="0px"
                  _focusVisible={{
                    border: 'none',
                  }}
                  w="full"
                  color="#52525b"
                  type="text"
                  placeholder="Enter Email Address"
                  name={`email`}
                  height="38px"
                  borderRadius="8px"
                  borderColor="#E4E4E7"
                  fontSize="16px"
                  fontWeight="400"
                  lineHeight="22.4px"
                  _focus={{
                    boxShadow: 'none',
                    border: '1px solid #E4E4E7',
                  }}
                  _placeholder={{
                    color: '#606060',
                    fontSize: '16px',
                    fontWeight: '400',
                  }}
                  value={email}
                  onChange={handleInput}
                />

                <Text
                  display={isAgentEmail.loading || !email ? 'none' : 'initial'}
                  fontSize="13px"
                  fontWeight="400"
                  color="#71717A"
                  lineHeight="19.5px"
                >
                  {agentName ? `${agentName}` : isError ? " Agent doesn't exist." : null}
                </Text>
              </Stack>
            </Stack>

            <HStack mt="20px" spacing="8px" align="start">
              <Image src={infoIcon.src} alt="info icon" />
              <Text maxW="350px" mt="-1px" fontSize="12px" fontWeight="300">
                Agents earn a commission on every successful property sale. The agent can request
                commission if it has not been paid yet.
              </Text>
            </HStack>
          </DrawerBody>
          <DrawerFooter p="0px" borderTop="1px solid #e4e4e7" px="28px" py="20px">
            <HStack w="full" justifyContent="space-between">
              <Button
                w="full"
                variant="md-outline-radius"
                h="45px"
                borderColor="#ef4444"
                color="#ef4444"
                fontSize="16px"
                fontWeight="400"
                lineHeight="22.4px"
                _hover={{
                  opacity: '1',
                }}
                onClick={handleClose}
                _focus={{opacity: '1'}}
                _active={{opacity: '1'}}
              >
                Discard
              </Button>{' '}
              <Button
                w="full"
                variant="md-filled-radius"
                h="45px"
                isDisabled={!isValid}
                isLoading={mutation.isLoading}
                bg="#191919"
                type="submit"
                color="#fff"
                fontSize="16px"
                fontWeight="400"
                lineHeight="22.4px"
                onClick={handleSubmit}
                _hover={{
                  opacity: '1',
                }}
                _focus={{opacity: '1'}}
                _active={{opacity: '1'}}
              >
                Proceed
              </Button>
            </HStack>
          </DrawerFooter>
        </>
      </DrawerContent>
    </Drawer>
  );
};

export default AssignAgentDrawer;
