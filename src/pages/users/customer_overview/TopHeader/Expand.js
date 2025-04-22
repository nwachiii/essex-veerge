import React, {useState} from 'react';
import {theme} from '../../../../theme';
import {
  Box,
  Container,
  extendTheme,
  Flex,
  HStack,
  Progress,
  Stack,
  Text,
  SimpleGrid,
  RadioGroup,
  Radio,
  useDisclosure,
} from '@chakra-ui/react';
import {Button} from '../../../../ui-lib';
import Link from 'next/link';
import {handleDateFormat} from '../../../../utils/formatDate';
import CustomToolTip from '../../../../components/common/CustomToolTip';

const styles = extendTheme({...theme});

const ExpandOverview = ({setValue, value, customersFetchQuery}) => {
  const [showProgress, setShowProgress] = useState(false);
  const CREATE_USER_ACCOUNT_TOOL_TIP_MODAL = useDisclosure();

  const customerOverviewData =
    [customersFetchQuery?.data] && [customersFetchQuery?.data?.data]?.[0];

  const getDataFromJSON = data => {
    const result = [];
    for (var i = 0; i < data?.length; i++) {
      data &&
        result.push({
          name: data[i].response?.name,
          email: data[i].response?.email,
          phone: data[i].response?.phone,
          joined_date: handleDateFormat(data[i].response?.date_joined),
          status: data[i]?.response.status,
        });
    }
    return result;
  };
  return (
    <Stack>
      {showProgress && <Progress mt="-3vh" size="xs" isIndeterminate />}

      <HStack w="100%" justify="flex-end" mb="16px">
        <Flex justify="flex-end" gap={5} w="100%" maxW="292px" h="48px" align="center">
          <Box
            cursor={'default'}
            position={'relative'}
            onMouseEnter={CREATE_USER_ACCOUNT_TOOL_TIP_MODAL.onOpen}
            onMouseLeave={CREATE_USER_ACCOUNT_TOOL_TIP_MODAL.onClose}
          >
            <CustomToolTip
              w={277}
              CUSTOM_TOOL_TIP_MODAL={CREATE_USER_ACCOUNT_TOOL_TIP_MODAL}
              info={
                'Seamlessly transition your valued clients to Veerge by proactively setting up personalized accounts for each of them.'
              }
            />
          </Box>
          <Link prefetch={false} href="/users/manage_agents">
            <Button variant="primary" w="140px" h="48px">
              Manage Realtors
            </Button>
          </Link>
          {/* 
          <Link prefetch={false} href="/users/blacklist">
            <Button variant="dark" w="130px" fontWeight={'500'} fontSize="14px" h="48px">
              Blacklist
            </Button>
          </Link> */}
        </Flex>
      </HStack>
      <RadioGroup value={value} onChange={setValue}>
        <Container {...styles.containerStyles} maxW="1440px" padding="19px 26px">
          <SimpleGrid
            wrap="wrap"
            mx="auto"
            maxW="1440px"
            gap="18px 10px"
            sx={{
              '.chakra-radio,.chakra-radio__label': {
                width: '100%',
                paddingLeft: '0px',
              },
            }}
            placeItems="center"
            columns={{base: 2, xl: 3}}
            alignItems="stretch"
          >
            <Radio value="1" hidden>
              <Box
                {...styles.md_Box}
                // w={{base: '400px', xl: '290px'}}
                minW={{md: '200px', xl: '290px'}}
                w="full"
                maxW={{base: 'full', xl: 'full'}}
                h="100%"
                minH="118px"
                py={2}
                border={value == '1' ? `1px solid #4545FE` : '1px solid #ECECEC'}
              >
                <Text fontWeight="bold" fontSize={24}>
                  {customerOverviewData?.total_customers ?? 0}
                </Text>
                <Text py="17px" fontSize="14px" fontWeight={'400'} color="#606060">
                  {Number(customerOverviewData?.total_customers) < 2
                    ? 'Total Account'
                    : 'Total Accounts'}
                </Text>
              </Box>
            </Radio>
            <Radio value="2" hidden>
              <Box
                {...styles.md_Box}
                // w={{base: '400px', xl: '290px'}}
                minW={{md: '200px', xl: '290px'}}
                w="full"
                maxW={{base: 'full', xl: 'full'}}
                h="100%"
                minH="118px"
                py={2}
                border={value == '2' ? `1px solid #4545FE` : '1px solid #ECECEC'}
              >
                <Text fontWeight="bold" fontSize={24}>
                  {customerOverviewData?.total_asset_holders ?? 0}
                </Text>
                <Text
                  maxW={197}
                  mx="auto"
                  py="11px"
                  fontSize="14px"
                  color="#606060"
                  fontWeight={'400'}
                >
                  {Number(customerOverviewData?.total_asset_holders) < 2
                    ? 'Account with asssets'
                    : 'Accounts with asssets'}
                </Text>
              </Box>
            </Radio>
            <Radio value="3" hidden>
              <Box
                {...styles.md_Box}
                // w={{base: '400px', xl: '290px'}}
                minW={{md: '200px', xl: '290px'}}
                w="full"
                maxW={{base: 'full', xl: 'full'}}
                h="100%"
                minH="118px"
                py={2}
                border={value == '3' ? `1px solid #4545FE` : '1px solid #ECECEC'}
              >
                <Text fontWeight="bold" fontSize={24}>
                  {customerOverviewData?.total_defaulters ?? 0}
                </Text>
                <Text py="17px" fontSize="14px" fontWeight={'400'} color="#606060">
                  {Number(customerOverviewData?.total_defaulters) < 2
                    ? 'Defaulting Account'
                    : 'Defaulting Accounts'}
                </Text>
              </Box>
            </Radio>
            <Radio value="4" hidden>
              <Box
                {...styles.md_Box}
                // w={{base: '400px', xl: '290px'}}
                minW={{md: '200px', xl: '290px'}}
                w="full"
                maxW={{base: 'full', xl: 'full'}}
                h="100%"
                minH="118px"
                py={2}
                border={value == '4' ? `1px solid #4545FE` : '1px solid #ECECEC'}
              >
                <Text fontWeight="bold" fontSize={24}>
                  {customerOverviewData?.customers_with_outstanding ?? 0}
                </Text>
                <Text
                  maxW={197}
                  mx="auto"
                  py="11px"
                  fontSize="14px"
                  color="#606060"
                  fontWeight={'400'}
                >
                  {Number(customerOverviewData?.customers_with_outstanding) < 2
                    ? 'Account with outstanding payment'
                    : 'Accounts with outstanding payment'}
                </Text>
              </Box>
            </Radio>
            <Radio value="5" hidden>
              <Box
                {...styles.md_Box}
                // w={{base: '400px', xl: '290px'}}
                minW={{md: '200px', xl: '290px'}}
                w="full"
                maxW={{base: 'full', xl: 'full'}}
                h="100%"
                minH="118px"
                py={2}
                border={value == '5' ? `1px solid #4545FE` : '1px solid #ECECEC'}
              >
                <Text fontWeight="bold" fontSize={24}>
                  {customerOverviewData?.customers_without_outstanding ?? 0}
                </Text>
                <Text
                  maxW={215}
                  mx="auto"
                  py="11px"
                  fontSize="14px"
                  fontWeight={'400'}
                  color="#606060"
                >
                  {Number(customerOverviewData?.customers_without_outstanding) < 2
                    ? 'Account without outstanding payment'
                    : 'Accounts without outstanding payment'}
                </Text>
              </Box>
            </Radio>
            {customerOverviewData?.total_fractions_holders ? (
              <Radio value="6" hidden>
                <Box
                  {...styles.md_Box}
                  border={value == '6' ? `1px solid #4545FE` : '1px solid #ECECEC'}
                  // w={{base: '400px', xl: '290px'}}
                  minW={{md: '200px', xl: '290px'}}
                  w="full"
                  maxW={{base: 'full', xl: 'full'}}
                  h="100%"
                  minH="118px"
                  display="flex"
                  flexDir="column"
                  justifyContent="space-between"
                  py={2}
                >
                  <Text fontWeight="bold" fontSize={24}>
                    {customerOverviewData?.total_fractions_holders ?? 0}
                  </Text>
                  <Text
                    maxW={215}
                    mx="auto"
                    py="11px"
                    fontSize="14px"
                    fontWeight={'400'}
                    color="#606060"
                  >
                    {Number(customerOverviewData?.total_fractions_holders) < 2
                      ? 'Account with fractional'
                      : 'Accounts with fractional'}
                  </Text>
                </Box>
              </Radio>
            ) : null}
          </SimpleGrid>
        </Container>
      </RadioGroup>

      <Box py="3px" />
    </Stack>
  );
};

export default ExpandOverview;
