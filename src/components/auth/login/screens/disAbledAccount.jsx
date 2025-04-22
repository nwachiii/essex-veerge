import React from 'react';
import {Box, Center, Container, Flex, Heading, Text, VStack} from '@chakra-ui/react';

const DisabledAccount = () => {
  return (
    <Center w="full" h="full">
      <Container
        w="90vw"
        h="60vh"
        maxW="1114px"
        maxH="509px"
        border="0.5px solid #e4e4e7"
        bg="#fff"
        display="grid"
        placeContent="center"
        py={8}
      >
        <VStack spacing="16px" align="start" maxW="600px">
          <Box borderLeft="2px solid #f97316" h="36px" pl="24px">
            <Heading
              as="h1"
              fontSize="28px"
              fontWeight="500"
              color="#424242"
              textAlign="start"
              lineHeight="30px"
            >
              Account Blocked
            </Heading>
          </Box>
          <Box p="24px" maxW="538px" maxH="98px" border="1px solid #d6d6d6" w="100%">
            <Text
              fontSize="20px"
              lineHeight="25px"
              fontWeight="400"
              color="#525252"
              textAlign="start"
            >
              It looks like there's an issue with your billing, and your access has been temporarily
              restricted.
            </Text>
          </Box>
          <Flex direction="column" align="start" gap="16px">
            <Text fontSize="19px" color="#525252" textAlign="start">
              To regain access, please check your email to process payment.
            </Text>
            <Text fontSize="16px" color="#424242" textAlign="start">
              Processing may take up to{' '}
              <Text as="span" fontWeight="700">
                24 hours.
              </Text>
            </Text>
          </Flex>
        </VStack>
      </Container>
    </Center>
  );
};

export default DisabledAccount;
