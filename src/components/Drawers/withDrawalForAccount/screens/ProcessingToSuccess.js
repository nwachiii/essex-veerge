import React from 'react';
import processingIcon from '/src/images/animated_icons/processingTransactionWhiteMode.gif';
import successicon from '/src/images/animated_icons/successIcon.gif';
import failedIcon from '/src/images/icons/x-close.svg';

import {Button, Heading, Image, Text, VStack} from '@chakra-ui/react';

export const ProcessingToSuccess = ({mutation, close}) => {
  const toBeDisplayed = {
    processing: {
      icon: processingIcon.src,
      header: 'Processing Transaction',
      component: (
        <Text fontSize="16px" mt="11px" color="#606060" fontWeight="400">
          Wait a moment
        </Text>
      ),
    },
    success: {
      icon: successicon.src,
      header: 'Withdrawal Successful',
      component: (
        <Button
          _hover={{opacity: 1}}
          bg="#0D0D0D"
          border="0.756px solid #0D0D0D"
          borderRadius="10px"
          boxShadow="0px 0.75614px 1.51229px 0px rgba(16, 24, 40, 0.05)"
          mt="31px"
          color="#ffffff"
          w="full"
          fontSize="14px"
          onClick={close()}
          fontWeight="400"
        >
          Ok
        </Button>
      ),
    },
    failed: {
      icon: failedIcon.src,
      header: 'Failed!',
      component: (
        <Text
          color="#606060"
          textAlign="center"
          mt="11px"
          w="376px"
          fontSize="16px"
          fontWeight="400"
        >
          {mutation?.error?.response?.status === 500
            ? "Apologies for the inconvenience. We're working on it. Please try again later."
            : mutation?.error?.response?.data?.message ??
              mutation?.error?.response?.message ??
              mutation?.error?.message ??
              'Something went wrong'}
        </Text>
      ),
    },
  };

  const mutationState = mutation.isLoading
    ? 'processing'
    : mutation?.isError
    ? 'failed'
    : 'success';
  return (
    <VStack
      spacing="none"
      justify="center"
      px="23.45px"
      h="377px"
      align="center"
      border="0.756px solid #DBDFE5"
      borderRadius="5px"
    >
      <Image
        h="88px"
        mb="11px"
        filter={mutationState == 'failed' ? 'invert(100%)' : ''}
        src={toBeDisplayed[mutationState].icon}
        alt={mutationState}
      />
      <Heading fontSize="18.147px" fontWeight="600" color="#0D0D0D">
        {toBeDisplayed[mutationState].header}
      </Heading>
      {toBeDisplayed[mutationState].component}
    </VStack>
  );
};

export default ProcessingToSuccess;
