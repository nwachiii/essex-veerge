import {Box, Stack, Text} from '@chakra-ui/react';
import React from 'react';

export const UnauthorizedLoginAttempt = () => {
  return (
    <Stack
      mt="15px"
      spacing="27px"
      color="#000"
      fontFamily="Euclid Circular B"
      fontSize="16px"
      fontStyle="normal"
      fontWeight="300"
    >
      <Box>
        <Text>
          If you have received a notification from Veerge regarding an unauthorized attempt to log
          in to your Veerge account, it is possible that your login credentials have been
          compromised, and a malicious third party is attempting to gain access to your Veerge
          dashboard.
        </Text>
      </Box>
      <Box>
        <Text>
          {' '}
          In order to protect your account and secure your information, we recommend taking the
          following actions immediately:
        </Text>
      </Box>
      <Box>
        <Text style={{fontWeight: '500'}}>1. Update Your Login Credentials:</Text>
        <Text display={'flex'} gap="4px" pl={3}>
          <span>
            It is
            important to choose a strong, unique password that is not used for any other online
            accounts. Additionally, consider updating the passwords for any other online accounts
            that share the same or similar login details to ensure comprehensive security.
          </span>
        </Text>
      </Box>
      <Box>
        <Text style={{fontWeight: '500'}}>2. Enable Two-Step Authentication:</Text>
        <Text display={'flex'} gap="4px" pl={'0.85rem'}>
          {/* <span>•</span> */}
          <span>
            Activate two-step authentication for your Veerge account. This extra layer of security
            will require a confirmation code to be entered from an Authenticator App, further
            safeguarding your account against unauthorized access. If you have any additional
            questions or concerns about the security of your account, do not hesitate to reach out
            to Veerge Support. We will provide guidance, assistance and further information to help you secure
your account effectively
          </span>
        </Text>
      </Box>

      <Box>
        <Text>
          By following these steps, you can promptly address the unauthorized login attempt, enhance
          the security of your Veerge account, and minimize the risk of unauthorized access to your
          dashboard and sensitive information.
        </Text>
      </Box>
    </Stack>
  );
};

export default UnauthorizedLoginAttempt;
