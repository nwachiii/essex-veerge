import {Text, VStack, Image} from '@chakra-ui/react';
import React, {useEffect} from 'react';
import {Button, Form} from 'ui-lib/ui-lib.components';
import checkIcon from '../../../../images/animated_icons/purple-success-icon-unscreen.gif';

const EmailVerified = () => {
  const nextPage = 'createNewPassword';

  return (
    <Form>
      <VStack>
        <Image src={checkIcon.src} alt="check_icon" w="211px" h="159.67px" />
      </VStack>
      <Form.Header>
        <Text mx="auto">Email verification successful!</Text>
      </Form.Header>
      <Form.Body>
        <Text fontSize="14px" lineHeight="17.75px" maxW={300} mx="auto">
          You have successfully verified your mailing address.
        </Text>
      </Form.Body>
      <Form.Footer pageUrl={nextPage}>
        <Button>Proceed</Button>
      </Form.Footer>
    </Form>
  );
};

export default EmailVerified;
