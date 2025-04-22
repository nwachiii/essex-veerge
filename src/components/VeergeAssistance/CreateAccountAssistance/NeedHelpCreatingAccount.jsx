import {Box, Stack, Text} from '@chakra-ui/react';
import React from 'react';

export const NeedHelpCreatingAccount = () => {
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
      <Text>
        {` Creating an account is a breeze, and it won't take up much of your time. Just follow
        these simple steps, and you'll be up and running in no time. Before we get started, make
        sure you have the following:`}
      </Text>
      <Box>
        <Text display={'flex'} gap="4px">
          <span>1.</span>
          <span>{`Be at least 18 years old (we'll need proof).`}</span>
        </Text>
        <Text display={'flex'} gap="4px">
          <span>2.</span>
          <span>
            A government-issued photo ID (please note that passport cards are not accepted).
          </span>
        </Text>
        <Text display={'flex'} gap="4px">
          <span>3.</span>
          <span>
            {`A smartphone with a connected phone number (we'll be sending SMS text messages).`}
          </span>
        </Text>
      </Box>
      <Box>
        <Text>
          <span style={{fontWeight: '500'}}>Step 1:{` `}</span>
          <span>{`You'll be asked to provide the following information:`}</span>
        </Text>
        <Text pl={3} pr={2} display={'flex'} gap="4px">
          <span>•</span>
          <span>{`Your legal full name (we'll require proof for verification purposes)`}.</span>
        </Text>
        <Text pl={3} pr={2} display={'flex'} gap="4px">
          <span>•</span>
          <span>
            An email address that you have access to. Please use a valid and active email.
          </span>
        </Text>
      </Box>
      <Box>
        <Text>
          <span style={{fontWeight: '500'}}>Important:{` `}</span>
          <span>Enter accurate and up-to-date information to avoid any issues.</span>
        </Text>
      </Box>
      <Box>
        <Text>
          <span style={{fontWeight: '500'}}>Step 2:{` `}</span>
          <span>
            {`You'll receive an email from`}{' '}
            <a target="_blank" style={{color: '#4545FE'}} href="mailto:no-reply@myxellia.io">
              no-reply@myxellia.io
            </a>
            {`. This email will contain an OTP (One-Time Password). Please enter the OTP provided in
            the email to verify your email address. Click on "Verify" once you've entered the OTP.`}
          </span>
        </Text>
      </Box>
      <Box>
        <Text>
          <span style={{fontWeight: '500'}}>Step 3:{` `}</span>
          <span>
           {` Now it's time to create a password. Choose a memorable password that is at least 8
            characters long. We don't impose arbitrary restrictions on numbers, special characters,
            or password length. However, please note that passwords longer than 72 characters will
            be truncated.`}
          </span>
        </Text>
      </Box>
      <Box>
        <Text>
          <span style={{fontWeight: '500'}}>Step 4:{` `}</span>
          <span>Fill in the required information:</span>
        </Text>
        <Text pl={3} pr={2} display={'flex'} gap="4px">
          <span>•</span>
          <span>
            {`Select your country and provide a phone number that is connected to your smartphone.
            We'll be sending an OTP to this number.`}
          </span>
        </Text>
        <Text pl={3} pr={2} display={'flex'} gap="4px">
          <span>•</span>
          <span>Enter your legal business name (proof may be required).</span>
        </Text>
        <Text pl={3} pr={2} display={'flex'} gap="4px">
          <span>•</span>
          <span>Provide your company address (mails might be sent to this address).</span>
        </Text>
        <Text pl={3} pr={2} display={'flex'} gap="4px">
          <span>•</span>
          <span>
            Fill in your role in the company, ensuring that you have the authority to enter into
            agreements on behalf of your company.
          </span>
        </Text>
      </Box>
      <Box>
        <Text>
          <span style={{fontWeight: '500'}}>Step 5:{` `}</span>
          <span>
           {` Enter the six-digit code that was sent to your phone number via text message. In case
            you didn't receive the OTP, you might need to use the voice call OTP option.`}
          </span>
        </Text>
      </Box>
      <Box>
        <Text>
          <span style={{fontWeight: '500'}}>Step 6:{` `}</span>
          <span>
            {`You'll need to provide additional information to complete your account setup. Follow
            these sub-steps:`}
          </span>
        </Text>
        <Text pl={3} pr={2} display={'flex'} gap="4px">
          <span>•</span>
          <span>{`Select the type of ID you'll be using for verification.`}</span>
        </Text>
        <Text pl={3} pr={2} display={'flex'} gap="4px">
          <span>•</span>
          <span>Enter your ID number and its expiration date.</span>
        </Text>
        <Text pl={3} pr={2} display={'flex'} gap="4px">
          <span>•</span>
          <span>Upload a clear and legible copy of your ID document.</span>
        </Text>
      </Box>
      <Box>
        <Text>
          {`Once you've completed this step, click "Okay," and you'll be directed to the dashboard.
          However, please note that before you can fully utilize Veerge, we'll need more information
          about you and your business.`}
        </Text>
      </Box>
      <Box>
        <Text>
          <span style={{fontWeight: '500'}}>Step 7:{` `}</span>
          <span>
           {` We're eager to learn more about your company, so kindly fill in the details regarding
            your expected activities.`}
          </span>
        </Text>
      </Box>
      <Box>
        <Text>
          <span style={{fontWeight: '500'}}>Step 8:{` `}</span>
          <span>
           {` Navigate to the settings section, click on "Edit Profile", and provide your BVN (Bank
            Verification Number).`}
          </span>
        </Text>
      </Box>
      <Box>
        <Text>
          <span style={{fontWeight: '500'}}>Step 9:{` `}</span>
          <span>
           {` Proceed to the compliance section and fill in your company's phone number, company
            email, company website, a brief bio, and any relevant social media links.`}
          </span>
        </Text>
        <br />
        <Text>
          {`Once you've completed these steps, our diligent compliance team will review your
          application, and you can expect a response within 48 hours.`}
        </Text>
      </Box>
      <Box>
        <Text>
          {`Upon approval, you'll be all set to leverage the full capabilities of Veerge. We
          appreciate your patience and cooperation throughout the process. Should you have any
          questions or concerns, feel free to reach out. We're thrilled to have you join Veerge and
          look forward to supporting your business endeavors!`}
        </Text>
      </Box>
    </Stack>
  );
};

export default NeedHelpCreatingAccount;
