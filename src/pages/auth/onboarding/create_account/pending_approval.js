import {Image, Text, VStack, useToast} from '@chakra-ui/react';
import React, {useEffect} from 'react';

import {Button, Form} from 'ui-lib/ui-lib.components';
import airplane from '../../../../images/icons/airplane.png';
import {useRouter} from 'next/router';

const PendingApproval = () => {
  const router = useRouter();
  const toast = useToast();
  const handleClearStorage = () => {
    localStorage.clear('SignUpData');
    setTimeout(() => {
      router.push('/');
    }, 1600);
    toast({
      title: `Registration Successful!`,
      status: 'success',
      duration: 5000,
      isClosable: true,
      position: 'top-right',
    });
  };

  return (
    <Form>
      <VStack>
        <Image src={airplane.src} alt="check_icon" w="161px" h="159.67px" />
      </VStack>
      <Form.Header>
        <Text align="center">Pending Approval</Text>
      </Form.Header>
      <Form.Body>
        <Text fontSize="14px" lineHeight="17.75px" maxW={300} mx="auto">
          You account is undergoing approval. We will notifiy you once your account is approved!
        </Text>
      </Form.Body>
      <Form.Footer>
        <Button onClick={handleClearStorage}>Okay</Button>
      </Form.Footer>
    </Form>
  );
};

export default PendingApproval;
