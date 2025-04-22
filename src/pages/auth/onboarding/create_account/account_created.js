import {Text, VStack, Image} from '@chakra-ui/react';
import React from 'react';
import {Button, Form} from 'ui-lib/ui-lib.components';
import checkIcon from '/src/images/animated_icons/purple-success-icon-unscreen.gif';

const AccountCreationSuccess = () => {
  return (
    <Form>
      <VStack>
        <Image src={checkIcon.src} alt="check_icon" h="159.67px" />
      </VStack>
      <Form.Header>
        <Text align="center">Account creation request received</Text>
      </Form.Header>
      <Form.Body>
        <Text fontSize="14px" lineHeight="17.75px" maxW={300} mx="auto">
          {`We’ll need more information about you and your business before you can start using Veerge.`}
        </Text>
      </Form.Body>
      <Form.Footer pageUrl={'/'}>
        <Button>Okay</Button>
      </Form.Footer>
    </Form>
  );
};

export default AccountCreationSuccess;
