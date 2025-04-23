import React, {useState} from 'react';
import PageHeader from '../../../../../components/common/PageHeader';
import {AnimatedLoader} from '../../../../../components/common/loaders';
import {LayoutView} from '../../../../../components/PageLayout/LayoutView';
import {BackArrowWithText} from '../../../../../components/assets/BackArrow';
import {Box, Flex, HStack, Image, Text, VStack, useToast} from '@chakra-ui/react';
import {useQuery} from '@tanstack/react-query';
import {fetchFractionalListingTxns, fetchListingTxns} from '../../../../../apis/listings';
import {useRouter} from 'next/router';
import {Button} from '../../../../../ui-lib/ui-lib.components';
import downloadIcon from '/src/images/icons/download-icon.svg';
import {MatadorCustomTable} from '../../../../../components/common/Table';
import {FRACTIONAL_TXNS_COLUMNS} from '../../../../../constants/listings/fractional-transactions';
import FractionalTxnHeader from './Header';
import SortBy from '../../../../../components/SortBy';

const TransactionFractionalBreakdown = () => {
  const toast = useToast();
  const {query} = useRouter();
  const [addedParam, setAddedParam] = useState('');

  const param = query.id + '/' + addedParam;

  // console.log(param);

  // const TRANSACTIONS = useQuery(['listingTxns', query.id], () => fetchListingTxns(query.id));
  const TRANSACTIONS = useQuery(['listingTxns_fractional', param], () =>
    fetchFractionalListingTxns(param)
  );

  const FractionalTxns = TRANSACTIONS && TRANSACTIONS?.data?.data?.data;

  // const getDataFromJSON = (data) => {
  // 	const result = [];
  // 	for (var i = 0; i < data?.length; i++) {
  // 		data && result.push({name: `${data[i].user?.first_name} ${data[i].user.last_name}`, unit: data[i].equity?.unit?.unit_title, deposit_amount: data[i].amount});
  // 	}
  // 	return result;
  // };

  console.log('FractionalTxnsss', TRANSACTIONS && TRANSACTIONS?.data?.data);

  const sort_params = [
    'Total Purchase Highest to Lowest',
    'Total Purchase Lowest to Highest',
    'Highest no. of Fractions to Lowest',
    'Lowest no. of Fractions to Highest',
  ];

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
            <PageHeader pageTitle="Transactions | Fractional" />
            <Box h="full" mt="10.6vh">
              <BackArrowWithText
                pl={2}
                mb={4}
                text={FractionalTxns?.equity?.project?.name ?? 'Back'}
              />
              <FractionalTxnHeader data={TRANSACTIONS?.data?.data?.overview} />
              <HStack mb="18px" mt="25px" w="full" justify="flex-end" gap="12px" align={'center'}>
                {/* <CSVLink data={getDataFromJSON(FractionalTxns)}> */}
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
                {/* </CSVLink> */}
                {/* <Button
                  bg="transparent"
                  fontWeight="400"
                  fontSize="14px"
                  lineHeight="18px"
                  color="#191919"
                  display="flex"
                  gap="3px"
                  width="144px"
                  height="46px"
                  border="1px solid #191919"
                  borderRadius="12px"
                >
                  <Image w="18px" h="18px" src={sortByIcon.src} alt="" /> Sort
                  By
                </Button> */}
                <SortBy
                  sort_params={sort_params}
                  url={addedParam}
                  setUrl={setAddedParam}
                  sortFor="fractional"
                />
              </HStack>
              <MatadorCustomTable
                isManageAgentEmpty
                minW="full"
                headerSpace="evenly"
                DATA={FractionalTxns}
                COLUMNS={FRACTIONAL_TXNS_COLUMNS(FractionalTxns)}
              />
            </Box>
          </>
        )}
      </LayoutView>
    </div>
  );
};

export default TransactionFractionalBreakdown;
