import {Text, VStack, Image} from '@chakra-ui/react';
import {Button, Form} from '../../../../ui-lib';
import checkIcon from '../../../../images/icons/check-icon-unscreen.gif';
import Link from 'next/link';

const PasswordResetSuccess = () => {
  return (
    <Form p={'32px'}>
      <VStack>
        <Image src={checkIcon.src} alt="check_icon" h="129.67px" />
      </VStack>
      <Form.Header>
        <Text fontSize={32} fontWeight={600} textAlign="center" mx="auto">
          Password reset successful
        </Text>
      </Form.Header>
      <Form.Body>
        <Text
          fontFamily="Proxima Nova"
          color="#DDDDDD"
          fontSize="14px"
          lineHeight="24.75px"
          maxW={300}
          mx="auto"
        >
          You have successfully reset your password. Proceed to Log In
        </Text>
        <Link href="/account">
          <Button fontSize="18px" fontWeight="400" mt="20px" withoutLoader>
            Login
          </Button>
        </Link>
      </Form.Body>
    </Form>
  );
};

export default PasswordResetSuccess;
