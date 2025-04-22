import React from 'react';
import {Stack, Text, Image, Heading, VStack, Container, HStack} from '@chakra-ui/react';
import moneybag from '/src/images/animated_icons/money-bag.gif';
import socialCare from '/src/images/animated_icons/social-care.gif';
import target from '/src/images/animated_icons/target.gif';
import briefcase from '/src/images/animated_icons/briefcase.gif';
import infographic from '/src/images/animated_icons/infographic.gif';
import calculator from '/src/images/animated_icons/calculator.gif';
import {themeStyles} from '../../theme';

export const AccountComingSoon = () => {
  return (
    <VStack mt="-68vh">
      <Heading fontSize="24px" fontWeight="500" color="#191919" lineHeight="41px">
        {`In the next update, you'll be able to :`}
      </Heading>
      <Container
        {...(themeStyles = {}.containerStyles)}
        maxW="584px"
        padding="32px 36px"
        mt="25px"
        bg="#FFFFFF"
        boxShadow="md"
      >
        <Stack spacing={3}>
          <HStack spacing="19px">
            <Image src={moneybag.src} boxSize="30px" alt="animated_account_icon" />
            <Text>View and Manage all Money Transactions </Text>
          </HStack>
          <HStack spacing="19px">
            <Image src={briefcase.src} boxSize="30px" alt="animated_account_icon" />
            <Text>Experience our AI powered record keeping of accounts 🧾</Text>
          </HStack>
          <HStack spacing="19px">
            <Image src={socialCare.src} boxSize="30px" alt="animated_account_icon" />
            <Text>Track all outright and recurring client payments </Text>
          </HStack>
          <HStack spacing="19px">
            <Image src={infographic.src} boxSize="30px" alt="animated_account_icon" />{' '}
            <Text>Handle commisions with a few clicks 💰</Text>
          </HStack>
          <HStack spacing="19px">
            <Image src={calculator.src} boxSize="30px" alt="animated_account_icon" />{' '}
            <Text>Issue refunds painlessly 💃</Text>
          </HStack>
          <HStack spacing="19px">
            <Image src={target.src} boxSize="30px" alt="animated_account_icon" />{' '}
            <Text>Reach your Business goals 10x faster</Text>
          </HStack>
        </Stack>
      </Container>
    </VStack>
  );
};
