import {Image, Tag, TagLabel, Text} from '@chakra-ui/react';
import {Button} from '../../ui-lib';
import fallback from '/src/images/avatar.svg';
import {handleLastTwoDigits, removeLastTwoDigits} from '../../utils';
// import {showProgress} from '../../utils/showProgress';
import {themeStyles} from '../../theme';
import Link from 'next/link';

export const TRANSACTION_HISTORY_COLUMNS = data => [
  // {
  //   Header: 'No.',
  //   accessor: row => {
  //     const position = 1 + data.indexOf(row);
  //     return <Text w="18px">{position}</Text>;
  //   },
  // },
  {
    Header: 'Image',
    accessor: row => {
      return (
        <Image alt="" borderRadius="full" width="47.29px" src={row?.user?.avatar ?? fallback.src} />
      );
    },
  },
  {
    Header: 'Amount',
    accessor: row => {
      return (
        <Text
          display="flex"
          color={themeStyles.color.primary}
          fontSize="20px"
          fontWeight={700}
          lineHeight="25px"
        >
          {formatAmountWithDecimal(row?.amount || 0)}
        </Text>
      );
    },
  },
  {
    Header: 'Type',
    accessor: row => {
      let type = row.transaction_action_type.toLowerCase();
      switch (type) {
        case 'equity_outright':
          return (
            <Tag w="130px" colorScheme="green" borderRadius="full" h="36px">
              <TagLabel mx="auto">full payment</TagLabel>
            </Tag>
          );
          break;
        case 'equity_plan_initial':
          return (
            <Tag w="130px" colorScheme="purple" borderRadius="full" h="36px">
              <TagLabel mx="auto">initial deposit</TagLabel>
            </Tag>
          );
          break;
        case 'equity_plan_deposit':
          return (
            <Tag w="130px" colorScheme="blue" borderRadius="full" h="36px">
              <TagLabel mx="auto">top up</TagLabel>
            </Tag>
          );
          break;

        default:
          break;
      }
    },
  },
  {
    Header: 'Date',
    accessor: row => {
      return row?.created_at.slice(0, 10);
    },
  },
  {
    Header: 'Action',
    hideHeader: true,
    accessor: row => {
      return (
        <Link href={`/residents/manage/${row.user.id}`}>
          <Button
            // onClick={() => showProgress(true)}
            mt={0}
            variant="secondary"
            borderRadius="12px"
            w="115px"
            h="40px"
          >
            View
          </Button>
        </Link>
      );
    },
  },
];

export const TRANSACTION_HISTORY_DATA = [
  {
    id: '01.',
    amount: '₦ 800,000.00',
    type: 'Full payment',
    date: 'July 28, 2022',
  },
  {
    id: '02.',
    amount: '₦ 800,000.00',
    type: 'Initial deposit',
    date: 'July 28, 2022',
  },
  {
    id: '03.',
    amount: '₦ 800,000.00',
    type: 'Initial deposit',
    date: 'July 28, 2022',
  },
  {
    id: '04.',
    amount: '₦ 800,000.00',
    type: 'Full payment',
    date: 'July 28, 2022',
  },
  {
    id: '05.',
    amount: '₦ 800,000.00',
    type: 'Top up',
    date: 'July 28, 2022',
  },
  {
    id: '06.',
    amount: '₦ 800,000.00',
    type: 'Full payment',
    date: 'July 28, 2022',
  },
  {
    id: '07.',
    amount: '₦ 800,000.00',
    type: 'Top up',
    date: 'July 28, 2022',
  },
  {
    id: '08.',
    amount: '₦ 800,000.00',
    type: 'Top up',
    date: 'July 28, 2022',
  },
  {
    id: '09.',
    amount: '₦ 800,000.00',
    type: 'Top up',
    date: 'July 28, 2022',
  },
  {
    id: '10.',
    amount: '₦ 800,000.00',
    type: 'Initial deposit',
    date: 'July 28, 2022',
  },
];
