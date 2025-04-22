import {Box, Flex, SimpleGrid, useToast} from '@chakra-ui/react';
import {useState} from 'react';
import {useQuery} from '@tanstack/react-query';
// import OverviewHeader from 'pages/dashboard/Header/OverviewHeader';
import {AccountApexChart} from './AccountApexChart';
import TransactionsOverview from './AcctTxnOverview';
import OverviewHeader from './OverviewHeader';
import {fetchGraphTransactionBoxesData} from 'apis/FetchDashboard';
import DashboardApexChart from 'pages/dashboard/Overview/GraphRepresentation';

export const Graph = ({outstandingBalance, isAccount, unprocessedTransactions}) => {
  const [filterByVal, setFilterByVal] = useState('4');

  return (
    <Box
      flex={`856`}
      w="100%"
      bg="#FFF"
      border="1px solid #e4e4e4"
      boxShadow="0px 4px 8px rgba(0, 0, 0, 0.02)"
      borderRadius="16px"
      maxH="321px"
      h="full"
      px={4}
    >
      <OverviewHeader
        filterByVal={filterByVal}
        setFilterByVal={setFilterByVal}
        showing={
          filterByVal == '4'
            ? 'All time' :
          filterByVal == '1'
            ? '1 Week'
            : filterByVal == '2'
              ? '1 Month'
              : filterByVal == '3'
                ? '1 Year'
                : null
        }
      />
      

      <DashboardApexChart
        filterValue={filterByVal}
        isAccount={isAccount}
        outstandingBalance={outstandingBalance}
        unprocessedTransactions={unprocessedTransactions}
      />
    </Box>
  );
};

export default Graph;
