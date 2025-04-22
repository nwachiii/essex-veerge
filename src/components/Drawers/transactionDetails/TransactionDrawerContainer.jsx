import {Box, useDisclosure} from '@chakra-ui/react';
import React from 'react';
import TransactionDetailsDrawer from '.';

export const TransactionDrawerContainer = ({row, equity_id, user_id, unit, children}) => {
  const transactionDrawer = useDisclosure();

  return (
    <>
      <Box cursor={'pointer'} onClick={transactionDrawer.onOpen}>
        {children}
      </Box>
      <TransactionDetailsDrawer
        modalDisclosure={transactionDrawer}
        runQuery={transactionDrawer.isOpen}
        isCoownership={!!row?.co_owners?.length}
        equityId={equity_id || row?.equity_id || row?.equity?.id}
        userId={user_id || row?.owner_id || row?.owner?.id || row?.id}
        unit={unit || row?.unit}
      />
    </>
  );
};

export default TransactionDrawerContainer;
