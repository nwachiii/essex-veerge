import {
  Flex,
  Image,
  Heading,
  HStack,
  Box,
  Text,
  Container,
  Stack,
  VStack,
  Link,
  Grid,
} from '@chakra-ui/react';
import React from 'react';
import {themeStyles} from '../../../theme';
import agentImage from '/src/images/avatar.svg';
import Referrals from './Referrals';

export const AgentsProfile = ({
  info,
  isError,
  customer_sold,
  refetch,
  units_sold,
  referrals,
  referral,
}) => {
  const DATE_SIGNED_UP = new Date(info?.sign_up_time).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Container {...themeStyles.containerStyles} maxW="full" w="full" padding="19px 46px" mt={6}>
      {/* <HStack justify="space-between"  spacing="none"> */}

      <Grid
        templateColumns={{base: 'repeat(2, 1fr)', xl: 'repeat(3, 1fr)'}} // 2 columns for small screens, 3 for large
        templateRows={{base: 'repeat(2, auto)', xl: '1fr'}} // 2 rows for small screens, 1 row for large
        gap="10px"
        w="full"
      >
        <VStack h="full" justify="center" spacing="none" w="full">
          <VStack>
            <Image
              alt=""
              src={info?.avatar ?? agentImage.src}
              objectFit="cover"
              borderRadius="full"
              boxSize="148px"
            />
            <VStack w="full" align="start">
              <Heading
                fontSize="28px"
                color="#191919"
                textTransform="capitalize"
                textAlign="center"
                fontWeight="600"
                mb={3}
              >
                {`${info?.first_name ?? '-'} ${info?.last_name ?? '-'}`}
              </Heading>
            </VStack>
          </VStack>
        </VStack>
        <Stack
          {...themeStyles.customerProfileCard}
          gridArea={{base: '2/1/span 2/ span 2', xl: '1/2'}}
          // maxW="600px"
          w={{base: 'full', xl: '400px'}}
          minW={{base: 'full', xl: '400'}}
          h="fit-content"
          // gridColumn={{base: '1 / span 2', lg: 'auto'}}
          borderColor="transparent"
        >
          <HStack justify="space-between" borderBottom="1px solid #F5F5F5" pb={6}>
            <Text fontSize="14px" fontWeight="400" color="#191919">
              Phone
            </Text>
            <Text as="span" fontSize="14px" maxW="170px" fontWeight="600">
              {info?.phone ?? '-'}
            </Text>
          </HStack>
          <HStack justify="space-between" borderBottom="1px solid #F5F5F5" pb={6}>
            <Text fontSize="14px" fontWeight="400" color="#191919">
              Email
            </Text>
            <Link href={info?.email ? `mailto:${info?.email}` : null}>
              <Text as="span" fontSize="14px" maxW="170px" fontWeight="600" color="#4545FE">
                {info?.email ?? '-'}
              </Text>
            </Link>
          </HStack>
          <HStack justify="space-between" borderBottom="1px solid #F5F5F5" pb={6}>
            <Text fontSize="14px" fontWeight="400" color="#191919">
              Gender
            </Text>
            <Text as="span" fontSize="14px" maxW="170px" fontWeight="600">
              {info?.gender ?? '-'}
            </Text>
          </HStack>
          <HStack justify="space-between" borderBottom="1px solid #F5F5F5" pb={6}>
            <Text fontSize="14px" fontWeight="400" color="#191919">
              Location
            </Text>
            <Text as="span" fontSize="14px" maxW="170px" fontWeight="600">
              {info?.country ?? '-'}
            </Text>
          </HStack>
          <HStack justify="space-between" pb={2} borderBottom="none">
            <Text fontSize="14px" fontWeight="400" color="#191919">
              Date Added
            </Text>
            <Text as="span" fontSize="14px" maxW="170px" fontWeight="600">
              {info?.sign_up_time ? DATE_SIGNED_UP : '-'}
            </Text>
          </HStack>
        </Stack>
        <Flex
          ml={{base: '0px', xl: '40px'}}
          w="full"
          maxW={{base: 'full', xl: '430px'}}
          direction="column"
          justify="space-between"
          gap="10px"
        >
          <Box
            h="fit-content"
            {...themeStyles.md_Box}
            width={{base: 'full', xl: '400px'}}
            flex={0.5}
          >
            <Text my="15px" fontWeight="600" fontSize={24}>
              {units_sold ?? '-'}
            </Text>
            <Text maxW={197} mx="auto" mb="15px">
              {Number(units_sold < 2) ? 'Unit sold' : 'Units sold'}
            </Text>
          </Box>
          <Box
            h="fit-content"
            {...themeStyles.md_Box}
            width={{base: 'full', xl: '400px'}}
            flex={0.5}
          >
            <Text my="15px" fontWeight="600" fontSize={24}>
              {customer_sold ?? '-'}
            </Text>
            <Text mb="15px">{customer_sold > 1 ? 'Subscribers' : 'Subscriber'}</Text>
          </Box>
          <Box
            h="fit-content"
            {...themeStyles.md_Box}
            width={{base: 'full', xl: '400px'}}
            flex={0.5}
          >
            <Text my="10px" fontWeight="600" fontSize={24}>
              {referral ?? '-'}
            </Text>
            <Text mb="10px">{referrals > 1 ? 'Referrals' : 'Referral'}</Text>
            {referrals > 1 ? <Referrals referrals={referrals} /> : null}
          </Box>
        </Flex>
      </Grid>

      {/* </HStack> */}
    </Container>
  );
};

export default AgentsProfile;
