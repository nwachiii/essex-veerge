import {Image, Text, Flex} from '@chakra-ui/react';
import fallback from '/src/images/avatar.svg';
import {themeStyles} from '/src/theme';
import {priceString} from '../../../utils/formatAmount';
import Link from 'next/link';
import {Button} from '../../../ui-lib';
import {formatDate, formatLongDate} from '../../../utils/formatDate';

export const PAYMENT_COLUMN = data => [
  // {
  //   Header: 'No.',
  //   accessor: row => {
  //     const position = 1 + data?.indexOf(row);
  //     return <Text w="18px">{position}</Text>;
  //   },
  // },
  {
    Header: 'Deposit Date',
    accessor: row => {
      return (
        <Text fontSize="16px" fontWeight={500}>
          {formatDate(row?.depositDate)}
        </Text>
      );
    },
  },
  {
    Header: "Depositor's Name",
    accessor: row => {
      return (
        <Flex direction="row" justifyContent="center" alignItems="center">
          <Image alt="" mr="5px" borderRadius="full" width="47.29px" src={row?.image ?? fallback.src} />
          <Text color="#191919" fontSize="16px" lineHeight="25px">
            {`${row?.depositorsName} ${row?.depositorsName} `}
          </Text>
        </Flex>
      );
    },
  },
  {
    Header: 'Amount',
    accessor: row => {
      return <Text>{row?.amount}</Text>;
    },
  },

  {
    Header: 'Availability Date',
    accessor: row => {
      return (
        <Text fontSize="16px" fontWeight={500}>
          {formatDate(row?.availabilityDate)}
        </Text>
      );
    },
  },
];
