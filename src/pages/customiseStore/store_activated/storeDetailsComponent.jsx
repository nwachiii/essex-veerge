import React from 'react';
import {Box, Flex, Stack, HStack, Heading, Link, Text, VStack} from '@chakra-ui/react';

import {themeStyles} from '/src/theme';
import {LeftComponent} from './leftComponent';
import {useRouter} from 'next/router';
import {RightComponent} from './rightComponent';

export const StoreDetails = () => {
  const router = useRouter();
  const {domain} = router?.query;
  return (
    <Stack w="full" h="100vh" justify="center">
      {domain ? (
        <Flex mx={'125px'} shadow={'0px 8px 48px 0px #0000000A'} h={'628px'}>
          <LeftComponent domainUrl={domain} />
          <RightComponent domainUrl={domain} />
        </Flex>
      ) : (
        <VStack
          bg={'#F5F5F5'}
          gap={'36px'}
          justify={'center'}
          w={'100%'}
          borderRadius={'0px 38px 38px 0px'}
        >
          <Heading>You do not have an active store domain 🥹</Heading>
        </VStack>
      )}
      <Box w="100vw">
        <Text
          mx="auto"
          textAlign="center"
          {...themeStyles.textStyles.l6}
          pt={'35px'}
          color={'#191919'}
          w={'max-content'}
        >
          Want a Custom Design or Store URL?{' '}
          <Link color="blue.500" href="mailto:matadortrust@gmail.com" target="_blank">
            Contact us
          </Link>
        </Text>
      </Box>
    </Stack>
  );
};

export default StoreDetails;
