// Deprecated: Please use a different file in the right directory instead
import { Box, Flex, useToast } from '@chakra-ui/react';
import {useState} from 'react';
import {useQuery} from '@tanstack/react-query';
import {OverviewHeader} from '../dashboard/Header/OverviewHeader';
import {DashboardApexChart} from '../dashboard/Overview/GraphRepresentation';
import {TransactionsOverview} from '../dashboard/Overview/TransactionsOverview';
import {fetchGraphTransactionBoxesData} from '../../apis/FetchDashboard';

const Graph = ({outstandingBalance, isAccount, unprocessedTransactions}) => {
  const [filterByVal, setFilterByVal] = useState('1');

  return (
    <Box
      w="100%"
      bg="#FFF"
      border="1px solid #e4e4e4"
      boxShadow="0px 4px 8px rgba(0, 0, 0, 0.02)"
      borderRadius="16px"
      p={4}
      minH={`325px`}
    >
      <OverviewHeader
        filterByVal={filterByVal}
        setFilterByVal={setFilterByVal}
        showing={
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
