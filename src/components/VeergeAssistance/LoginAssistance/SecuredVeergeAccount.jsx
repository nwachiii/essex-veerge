import {Box, Link, Stack, Text} from '@chakra-ui/react';
import React from 'react';

export const SecuredVeergeAccount = () => {
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
        Keeping your Veerge account secure is crucial for safeguarding your data and maintaining
        peace of mind. Here are some essential tips to enhance the security of your account:
      </Text>
      <Box>
        <Text display={'flex'} gap="4px">
          <span>1. </span>
          <span>Enable Two-Step Authentication.</span>
        </Text>

        <Text pl={3} pt={2} display={'flex'} gap="4px">
          <span>
            Protect your account by enabling two-step authentication. This adds an extra layer of
            security, ensuring that even if your password is compromised, unauthorized individuals
            cannot gain access. It typically involves entering a verification code sent to your
            registered phone number or using an authentication app.
          </span>
        </Text>
      </Box>
      <Box>
        <Text display={'flex'} gap="4px">
          <span>2.</span>
          <span>Never Share Your Veerge Credentials.</span>
        </Text>

        <Text pl={3} pt={2} display={'flex'} gap="4px">
          <span>
            Avoid sharing your Veerge login credentials with anyone. Instead, invite team members to
            access your account by adding them as authorized members through the Settings section.
            This allows you to maintain control over who can access and manage your account.
          </span>
        </Text>
      </Box>
      <Box>
        <Text display={'flex'} gap="4px">
          <span>3.</span>
          <span>Utilize Touch ID/Windows Hello.</span>
        </Text>

        <Text pl={3} pt={2} display={'flex'} gap="4px">
          <span>
            If your device supports it, take advantage of biometric authentication methods like
            Touch ID or Windows Hello. By using your fingerprint or facial recognition, you can sign
            in to Veerge quickly and securely.
          </span>
        </Text>
      </Box>
      <Box>
        <Text display={'flex'} gap="4px">
          <span>4.</span>
          <span>Protect Against Phishing Attacks.</span>
        </Text>

        <Text pl={3} pt={2} display={'flex'} gap="4px">
          <span>
            {`Phishing attacks can be detrimental, so it's essential to take precautions. Follow these
            steps to protect yourself:`}
          </span>
        </Text>

        <Text pl={3} pr={2} pt={2} display={'flex'} gap="4px">
          <span>•</span>
          <span>
            {` Use a bookmarked link to access the Veerge login page. Phishing websites may attempt to
            mimic legitimate sites, so by using a bookmark, you can ensure you're accessing the
            authentic Veerge platform.`}
          </span>
        </Text>
        <Text pl={3} pr={2} display={'flex'} gap="4px">
          <span>•</span>
          <span>
            Be cautious of suspicious emails and avoid clicking on any links they contain. If an
            email appears suspicious, cross-check the provided link with your bookmarked Veerge
            login page.
          </span>
        </Text>
        <Text pl={3} pr={2} display={'flex'} gap="4px">
          <span>•</span>
          <span>
            {`Double-check the URL to confirm you're signing in to`}{' '}
            <Link target="_blank" color='#4545FE' href="https://veerge.myxellia.io">
              <Text>https://veerge.myxellia.io</Text>
            </Link>
            Phishing attempts often use deceptive URLs that resemble the original but include slight
            variations or misspellings.
          </span>
        </Text>
        <Text pl={3} pr={2} display={'flex'} gap="4px">
          <span>•</span>
          <span>
            When using a shared computer, always sign out of your Veerge account to prevent
            unauthorized access by others.
          </span>
        </Text>
      </Box>
      <Box>
        {/* <Text display={'flex'} gap='4px'>
					<span>1.</span>
					<span>Trustworthy Browser Extensions.</span>
				</Text> */}
        <Text display={'flex'} gap="4px">
          <span>5.</span>
          <span>Only install browser extensions from reputable and trusted companies.</span>
        </Text>

        <Text pl={3} py={2}>
          Malicious browser extensions can compromise your account security by potentially accessing
          and reading your passwords. Be cautious and verify the credibility of any extensions
          before installation.
        </Text>
        <Text pl={3}>
          By implementing these security measures, you can significantly enhance the protection of
          your Veerge account and ensure the safety of your valuable data. Stay vigilant and
          proactive in maintaining a secure online presence.
        </Text>
      </Box>
    </Stack>
  );
};

export default SecuredVeergeAccount;
