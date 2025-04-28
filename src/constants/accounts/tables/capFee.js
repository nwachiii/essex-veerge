import {FormatToColorfulAdaptiveCurrency} from 'utils/formatAmount';

const {Text, Avatar, Flex} = require('@chakra-ui/react');

export const CAPFEE_COLUMN = [
  {
    Header: 'Residents',
    accessor: row => {
      return (
        <Flex gap="12px" alignItems="center">
          <Avatar src={row?.avatar} boxSize="40px" />
          <Text fontSize="14px" fontWeight="400" color="#18181b">
            {row?.name ?? '-'}
          </Text>
        </Flex>
      );
    },
  },
  {
    Header: 'Unit',
    accessor: row => {
      return (
        <Text fontSize={'13px'} fontWeight="500" color="#18181b">
          {row.unit}
          <br />
          <Text as="span" fontSize="14px" fontWeight="400" color="#52525b">
            {row.location}
          </Text>
        </Text>
      );
    },
  },

  {
    Header: 'Amount',
    accessor: row => {
      return !row.amount ? (
        <Text fontSize="16px" fontWeight="500" color={'#22c55e'}>
          _
        </Text>
      ) : (
        <FormatToColorfulAdaptiveCurrency
          amount={row?.amount}
          lens={13}
          color={'#22c55e'}
          maxSize={16}
          minSize={10}
          pow={0.92}
          fontWeight="500"
          decimalStyle={{fontWeight: '500', color: '#606060'}}
        />
      );
    },
  },
  {
    Header: 'Date',
    accessor: row => {
      return (
        <Text fontSize={'16px'} fontWeight="400" color="#000000">
          {row.date}
        </Text>
      );
    },
  },
];
