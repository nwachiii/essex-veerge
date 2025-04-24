import {themeStyles} from 'theme';
import {FormatToColorfulAdaptiveCurrency} from 'utils/formatAmount';

const {Button, Badge, Text} = require('@chakra-ui/react');
const {changeDateFormat} = require('utils/formatDate');

const TRANSACTIONPAGE_COLUMN = [
  {
    Header: 'Date',
    accessor: row => {
      return (
        <Text fontSize={'16px'} fontWeight="400" color="#191919">
          {row.date}
        </Text>
      );
    },
  },
  {
    Header: 'Description',
    accessor: row => {
      return (
        <Text fontSize={'16px'} fontWeight="400" color="#191919">
          {row.description}
        </Text>
      );
    },
  },
  {
    Header: 'Reference',
    accessor: row => {
      return (
        <Text fontSize={'16px'} fontWeight="400" color="#191919">
          {row.reference}
        </Text>
      );
    },
  },
  {
    Header: 'Deposit',
    accessor: row => {
      return !row.deposit ? (
        <Text fontSize="16px" fontWeight="500" color={themeStyles.color.matador__green}>
          _
        </Text>
      ) : (
        <FormatToColorfulAdaptiveCurrency
          amount={row?.deposit}
          lens={13}
          color={themeStyles.color.matador__green}
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
    Header: 'Debit',
    accessor: row => {
      return !row.debit ? (
        <Text fontSize="16px" fontWeight="500" color={'#f04438'}>
          _
        </Text>
      ) : (
        <FormatToColorfulAdaptiveCurrency
          amount={row?.debit}
          lens={13}
          color={'#f04438'}
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
    Header: 'Net Transaction',

    accessor: row => {
      return !row.netTransaction ? (
        <Text fontSize="16px" fontWeight="500" color={themeStyles.color.primary}>
          _
        </Text>
      ) : (
        <FormatToColorfulAdaptiveCurrency
          amount={row?.netTransaction}
          lens={13}
          color={themeStyles.color.primary}
          maxSize={16}
          minSize={10}
          pow={0.92}
          fontWeight="500"
          decimalStyle={{fontWeight: '500', color: '#606060'}}
        />
      );
    },
  },
];

export default TRANSACTIONPAGE_COLUMN;