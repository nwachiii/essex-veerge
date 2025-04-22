import {Box, Link, Stack, Text} from '@chakra-ui/react';
import React from 'react';

export const HavingTroublesSigningIn = () => {
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
          {`We understand how frustrating it can be when you can't access your Veerge account. But
          don't worry, we're here to help you regain access and get you back on track. Here's what
          you can do`}{' '}
        </Text>
      </Box>
      <Box>
        <Text pl={3} pr={2} display={'flex'} gap="4px">
          <span>•</span>
          <span>
            <b style={{fontWeight: '500'}}>
              Forgotten Email Address{` `}: {` `}
            </b>{' '}
            {` If you're not sure which email address you used to sign up for Veerge, start by checking your inbox for any Veerge emails. These messages can help you confirm the email address
            associated with your account. Once you have that information, you're one step closer to
            regaining access.`}
          </span>
        </Text>
      </Box>
      <Box>
        <Text pl={3} pr={2} display={'flex'} gap="4px">
          <span>•</span>
          <Text>
            <b style={{fontWeight: '500'}}>
              Forgotten Password{` `}: {` `}
            </b>{' '}
            {` If you've forgotten your password, don't panic. We've got you covered. Simply head over
            to`}
            <Link
              target='_blank'
              color= '#4545FE'
              href="https://veerge.myxellia.io/auth/forgot_password "
            >
              <Text wordBreak={'break-word'}>https://veerge.myxellia.io/auth/forgot_password</Text>
            </Link>{' '}
            {` to initiate the password reset process. Follow the instructions provided, and you'll be
            prompted to enter your new password. Keep in mind that if you have two-step
            authentication enabled, you'll need to complete that process as well, ensuring an extra
            layer of security. Once you've successfully reset your password, we'll send you a
            confirmation email to let you know.`}
          </Text>
        </Text>
      </Box>
      <Box>
        <Text pl={3} pr={2} display={'flex'} gap="4px">
          <span>•</span>
          <span>
            <b style={{fontWeight: '500'}}>
              {`Still Can't Sign In`}
              {` `}: {` `}
            </b>{' '}
            {`In the rare instance that you've tried the steps mentioned above and you're still unable
            to sign in, our dedicated support team is ready to assist you. Just reach out to us by
            selecting the most relevant question for your issue from the dropdown menu. To help us
            locate your account more easily, please provide the email address that you used to sign
            up with. Our team will work diligently to resolve the problem and help you regain access
            to your Veerge account.`}
          </span>
        </Text>
      </Box>
      <Box>
        <Text>
          {`Remember, we're here to support you every step of the way. So, take a deep breath, follow
          the instructions, and let's get you back into your Veerge account where you belong.`}
        </Text>
      </Box>
    </Stack>
  );
};

export default HavingTroublesSigningIn;
