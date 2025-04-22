import {Box, Button, useDisclosure} from '@chakra-ui/react';
import React from 'react';
import TransactionDetailsDrawer from '.';
import {themeStyles} from 'theme';

export const TransactionDrawerWrapper = ({row, children}) => {
  const transactionDrawer = useDisclosure();
  return (
    <>
      {children ? (
        <Box as="span" onClick={transactionDrawer.onOpen} cursor={'pointer'}>
          {children}
        </Box>
      ) : (
        <Button
          borderRadius="72px"
          w="115px"
          h="40px"
          color={themeStyles.color.primary}
          fontWeight={'400'}
          fontSize="16px"
          borderColor={themeStyles.color.primary}
          variant="outline"
          onClick={transactionDrawer.onOpen}
        >
          View
        </Button>
      )}
      <TransactionDetailsDrawer
        modalDisclosure={transactionDrawer}
        runQuery={transactionDrawer.isOpen}
        equityId={row?.equity_id}
        userId={row?.owner_id}
      />
    </>
  );
};

export default TransactionDrawerWrapper;
