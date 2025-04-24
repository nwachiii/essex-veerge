const {Button, Badge, Text} = require('@chakra-ui/react');
const {changeDateFormat} = require('utils/formatDate');

export const VIOLATION_COLUMN = [
  {
    Header: 'ID',
    accessor: row => {
      return (
        <Text fontSize={'16px'} fontWeight="500" color="#27272a">
          {row.id}
        </Text>
      );
    },
  },
  {
    Header: 'Date',
    accessor: row => {
      return (
        <Text fontSize={'16px'} fontWeight="500" color="#27272a">
          {changeDateFormat(row.date)}
        </Text>
      );
    },
  },
  {
    Header: 'Unit/Resident',
    accessor: row => {
      return (
        <Text fontSize={'16px'} fontWeight="500" color="#27272a">
          {row.unitResident}
        </Text>
      );
    },
  },
  {
    Header: 'Issue',
    accessor: row => {
      return (
        <Text maxW="213px" noOfLines={1} fontSize={'16px'} fontWeight="500" color="#27272a">
          {row?.issue}
        </Text>
      );
    },
  },

  {
    Header: 'Status',
    accessor: row => {
      const badge = {
        Fined: {
          color: '#991919',
          bg: '#fef2f2',
        },
        'Late to cure': {
          color: '#991919',
          bg: '#fef2f2',
        },
        Closed: {
          color: '#116932',
          bg: '#f0fdf4',
        },
        Escalated: {
          color: '#ea580c',
          bg: '#fff7ed',
        },
        'In Cure': {
          color: '#4545fe',
          bg: '#f5f9ff',
        },
      };
      return (
        <Badge
          p="4px 12px"
          fontSize="14px"
          fontWeight="500"
          lineHeight="20px"
          borderRadius="16px"
          color={badge[row.status].color}
          bg={badge[row.status].bg}
          textTransform="capitalize"
        >
          {row.status}
        </Badge>
      );
    },
  },

  {
    Header: 'Action',
    hideHeader: true,
    accessor: row => {
      return (
        <Button
          borderRadius="72px"
          w="118px"
          h="46px"
          fontWeight={'500'}
          color="#000000"
          fontSize="16px"
          borderColor={'#e4e4e7'}
          variant="outline"
          _hover={{
            bg: 'rgba(0,0,0,0.03)',
          }}
        >
          View
        </Button>
      );
    },
  },
];

const ViolationColumnPage = () => {
  return null;
};

export default ViolationColumnPage;