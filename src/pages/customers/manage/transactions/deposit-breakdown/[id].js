import React, {useEffect, useState} from 'react';
import {AnimatedLoader} from '../../../../../components/common/loaders';
import {LayoutView} from '../../../../../components/PageLayout/LayoutView';
import PageHeader from '../../../../../components/common/PageHeader';
import {BackArrowWithText} from '../../../../../components/assets/BackArrow';
import {Box, Flex, HStack, Image, Text, VStack, useToast} from '@chakra-ui/react';
import {useQuery} from '@tanstack/react-query';
import {fetchListingTxns} from '../../../../../apis/listings';
import {useRouter} from 'next/router';
import {CSVLink} from 'react-csv';
import {Button} from '../../../../../ui-lib/ui-lib.components';
import downloadIcon from '/src/images/icons/download-icon.svg';
import {themeStyles} from '../../../../../theme';
import {formatAmountWithDecimal} from '../../../../../utils/formatAmount';
import {DEPOSITS_BREAKDOWN_COLUMNS} from '../../../../../constants/listings/deposit-breakdown';
import {MatadorCustomTable} from '../../../../../components/common/Table';
import SortBy from '../../../../../components/SortBy';

const TransactionDepositBreakdown = () => {
  const toast = useToast();
  const {query} = useRouter();

  const [addedParam, setAddedParam] = useState('');

  const TRANSACTIONS = useQuery(['listingTxnss', query.id + '/' + addedParam], () =>
    fetchListingTxns(query.id + '/' + addedParam)
  );

  const listingTxns = TRANSACTIONS && TRANSACTIONS?.data?.data;

  const getDataFromJSON = data => {
    const result = [];
    for (var i = 0; i < data?.length; i++) {
      data &&
        result.push({
          name: `${data[i].user?.first_name} ${data[i].user.last_name}`,
          unit: data[i].equity?.unit?.unit_title,
          deposit_amount: data[i].amount,
        });
    }
    return result;
  };

  const getTotalDeposits = () => {
    let result = 0;
    for (let index = 0; index < listingTxns.length; index++) {
      result += listingTxns[index]?.amount;
    }
    return result;
  };

  const sort_params = [
    'A-Z',
    'Z-A',
    'Date joined oldest to newest',
    'Date joined newest to oldest',
  ];

  // console.log('listingTxnsss', TRANSACTIONS && TRANSACTIONS?.data?.data);
  return (
    <div>
      <LayoutView>
        {TRANSACTIONS?.isError ? (
          toast({
            title: 'An error occured',
            status: 'error',
            duration: 5000,
            isClosable: true,
            position: 'top-right',
          })
        ) : TRANSACTIONS?.isFetching ? (
          <VStack h="50vh">
            <AnimatedLoader />
          </VStack>
        ) : (
          <>
            <PageHeader pageTitle="Transactions | deposit-breakdown" />
            <Box h="full" mt="10.6vh">
              <BackArrowWithText pl={4} mb={4} text={'Deposit Breakdown'} />
              <Flex
                {...themeStyles.containerStyles}
                w="full"
                padding="19px 26px"
                justifyContent={'center'}
                mx="auto"
              >
                <Box {...themeStyles.md_Box} border={`1px solid gray`} w="380px" h="125px" py={2}>
                  <Text color="#191919" fontWeight="600" fontSize={'24px'}>
                    {formatAmountWithDecimal(getTotalDeposits())}
                  </Text>
                  <Text py="17px" fontSize="12px" fontWeight={'400'} color="#606060">
                    Total Deposit
                  </Text>
                </Box>
              </Flex>
              <HStack mb="18px" mt="25px" w="full" justify="flex-end" gap="12px" align={'center'}>
                <CSVLink data={getDataFromJSON(listingTxns)}>
                  <Button
                    mt={0}
                    display="flex"
                    gap="3px"
                    w="177px"
                    height="46px"
                    border="1px solid #4545FE"
                    borderRadius="12px"
                    fontWeight="500"
                    fontSize="12px"
                    lineHeight="15px"
                    textAlign="center"
                    color="#4545FE"
                    bg="transparent"
                  >
                    <Image w="18px" h="18px" src={downloadIcon.src} alt="" />
                    Download as CSV
                  </Button>
                </CSVLink>
                <SortBy
                  sort_params={sort_params}
                  sortFor="deposit_breakdown"
                  url={addedParam}
                  setUrl={setAddedParam}
                />
              </HStack>
              <MatadorCustomTable
                minW="full"
                headerSpace=""
                DATA={listingTxns}
                COLUMNS={DEPOSITS_BREAKDOWN_COLUMNS(listingTxns)}
              />
            </Box>
          </>
        )}
      </LayoutView>
    </div>
  );
};

export default TransactionDepositBreakdown;
