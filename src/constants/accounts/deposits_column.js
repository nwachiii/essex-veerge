import {Box, HStack, Image, Tag, TagLabel, Text} from '@chakra-ui/react';
import {themeStyles} from '/src/theme';
import {formatAmountWithDecimal} from '../../utils/formatAmount';
import {CustomTag} from '../../ui-lib';
import {handleDateFormat} from '/src/utils/formatDate';
import defaultImage from '../../images/image-fallback.png';
import myxelliaLogo from '../../images/icons/myxelliaIcon.svg';
import {handleDateTime} from '../../utils/formatDate';
import TransactionTypeTags from 'ui-lib/ui-lib.components/tag';
import {truncateLongText} from 'utils';

export const ACCOUNTS_DEPOSITS_COLUMN = (router, limit) => [
  {
    Header: 'Depositor',
    accessor: row => {
      return (
        <HStack textAlign={'center'} spacing="11px">
          <Image
            alt=""
            height="48px"
            width="47.29px"
            borderRadius="full"
            src={row?.connected_transaction?.customer?.avatar ?? defaultImage?.src}
          />
          <Text pr="2px" fontSize={'14px'}>
            {`${row?.connected_transaction?.customer?.first_name ?? '-'} ${row?.connected_transaction?.customer?.last_name ?? '-'}`}
          </Text>
        </HStack>
      );
    },
  },

  {
    Header: 'Property',
    accessor: row => {
      const propertyValue = `${row?.connected_transaction?.equity?.unit?.unit_title}, ${row?.connected_transaction?.equity?.project?.name}`;
      return (
        <Box display={'flex'} flexWrap={'wrap'} px={1}>
          <Text wordBreak={'break-word'} textAlign={'center'} fontWeight={'500'}>
            {row?.connected_transaction?.equity
              ? truncateLongText(propertyValue, 25).truncatedText
              : 'no equity'}
          </Text>
        </Box>
      );
    },
  },
  {
    Header: 'Amount',
    accessor: row => {
      return (
        <Box display={'flex'}>
          <Text
            color={themeStyles.color.matador__green}
            textAlign={'center'}
            fontSize="14px"
            fontWeight={'700'}
          >
            {formatAmountWithDecimal(row.amount)}
          </Text>
        </Box>
      );
    },
  },
  {
    Header: 'Deposit Date',
    accessor: row => {
      return (
        <Text textAlign={'left'} fontWeight={'500'}>
          {`${handleDateFormat(row.created_at)} | ${handleDateTime(row.created_at)}`}
        </Text>
      );
    },
  },

  {
    Header: 'Payment type',
    accessor: row => {
      let type =
        row?.connected_transaction?.transaction_action_type?.toLowerCase() ??
        row?.transaction_type?.toLowerCase();

      // switch (type) {
      //   case 'equity_outright':
      //     return (
      //       <Box display={'flex'}>
      //         <Tag w="130px" colorScheme="green" borderRadius="full" h="36px">
      //           <TagLabel mx="auto">Outright</TagLabel>
      //         </Tag>
      //       </Box>
      //     );
      //     break;
      //   case 'outright':
      //     return (
      //       <Box display={'flex'}>
      //         <Tag w="130px" colorScheme="green" borderRadius="full" h="36px">
      //           <TagLabel mx="auto">Outright</TagLabel>
      //         </Tag>
      //       </Box>
      //     );
      //     break;
      //   case 'equity_plan_initial':
      //     return (
      //       <Box display={'flex'}>
      //         <Tag w="130px" colorScheme="purple" borderRadius="full" h="36px">
      //           <TagLabel mx="auto">Initial deposit</TagLabel>
      //         </Tag>
      //       </Box>
      //     );
      //     break;
      //   case 'installment':
      //     return (
      //       <Box display={'flex'}>
      //         <Tag w="130px" colorScheme="blue" borderRadius="full" h="36px">
      //           <TagLabel mx="auto">Top up</TagLabel>
      //         </Tag>
      //       </Box>
      //     );
      //     break;
      //   case 'equity_plan_deposit':
      //     return (
      //       <Box display={'flex'}>
      //         <Tag w="130px" colorScheme="blue" borderRadius="full" h="36px">
      //           <TagLabel mx="auto">Top up</TagLabel>
      //         </Tag>
      //       </Box>
      //     );
      //     break;
      //   case 'recurring':
      //     return (
      //       <Box display={'flex'}>
      //         <Tag w="130px" colorScheme="yellow" borderRadius="full" h="36px">
      //           <TagLabel mx="auto">Recurring</TagLabel>
      //         </Tag>
      //       </Box>
      //     );
      //     break;
      //   case 'fractional':
      //     return (
      //       <Box display={'flex'}>
      //         <Tag w="130px" colorScheme="yellow" borderRadius="full" h="36px">
      //           <TagLabel mx="auto">Fractional</TagLabel>
      //         </Tag>
      //       </Box>
      //     );
      //     break;
      //   case 'fraction':
      //     return (
      //       <Box display={'flex'}>
      //         <Tag w="130px" colorScheme="yellow" borderRadius="full" h="36px">
      //           <TagLabel mx="auto">Fractional</TagLabel>
      //         </Tag>
      //       </Box>
      //     );
      //   case 'equity_fractions':
      //     return (
      //       <Box display={'flex'}>
      //         <Tag w="130px" colorScheme="yellow" borderRadius="full" h="36px">
      //           <TagLabel mx="auto">Fractional</TagLabel>
      //         </Tag>
      //       </Box>
      //     );
      //   case undefined:
      //     return (
      //       <Box display={'flex'}>
      //         <Tag w="130px" colorScheme="brown" borderRadius="full" h="36px">
      //           <TagLabel mx="auto">other</TagLabel>
      //         </Tag>
      //       </Box>
      //     );
      //     break;
      //   case null:
      //     return (
      //       <Box display={'flex'}>
      //         <Tag w="130px" colorScheme="brown" borderRadius="full" h="36px">
      //           <TagLabel mx="auto">other</TagLabel>
      //         </Tag>
      //       </Box>
      //     );
      //     break;

      //   default:
      //     break;
      // }
      return <TransactionTypeTags type={row?.transaction_type?.toLowerCase()} />;
    },
  },
];

export const ACCOUNTS_WITHDRAWAL_COLUMN = (router, limit) => [
  {
    Header: 'Initiator',
    accessor: row => {
      return (
        <HStack>
          <Image
            alt=""
            borderRadius="full"
            height="42px"
            width="42px"
            src={
              row?.transaction_type === 'billing'
                ? myxelliaLogo.src
                : row?.owner?.avatar || row?.initiator?.avatar || defaultImage.src
            }
          />
          <Text wordWrap={'break-word'}>
            {row?.transaction_type === 'billing'
              ? 'Myxellia'
              : `${row?.initiator?.first_name} ${row?.initiator?.last_name}`}
          </Text>
        </HStack>
      );
    },
  },

  {
    Header: 'Amount',
    accessor: row => {
      return (
        <Text color={themeStyles.color.matador__red} fontWeight={'600'} px={0}>
          {formatAmountWithDecimal(row?.amount)}
        </Text>
      );
    },
  },
  {
    Header: 'Balance before payout',
    accessor: row => {
      return (
        <Text fontWeight={'600'}>{formatAmountWithDecimal(row?.balance_before_transaction)}</Text>
      );
    },
  },
  {
    Header: 'Type',
    accessor: row => {
      return (
        <HStack>
          <CustomTag w={'unset'} h={'unset'} padding={'.5rem 1rem'} text={row?.transaction_type} />
        </HStack>
      );
    },
  },
  {
    Header: 'Destination',
    accessor: row => {
      return (
        <Text textTransform={'capitalize'}>
          {row?.direction === 'debit' ? 'Myxellia' : row?.direction}
        </Text>
      );
    },
  },
  {
    Header: 'Date',
    accessor: row => {
      return <Text fontWeight={'500'}>{handleDateFormat(row?.created_at)}</Text>;
    },
  },
];
