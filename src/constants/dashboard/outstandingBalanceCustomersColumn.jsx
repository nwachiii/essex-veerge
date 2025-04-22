import {Box, Flex, HStack, Image, Tag, TagLabel, Text, useDisclosure} from '@chakra-ui/react';
import defaultImage from '/src/images/image-fallback.png';
import {formatAmountWithDecimal, priceString} from '../../utils/formatAmount';
import Link from 'next/link';
import {Button} from '../../ui-lib';
import {themeStyles} from '../../theme';
import avatarFallback from '/src/images/avatar.svg';
import {truncateLongText} from '../../utils';
import {handleDateFormat} from '../../utils/formatDate';
import TransactionDrawerContainer from '@/components/Drawers/transactionDetails/TransactionDrawerContainer';

export const OUSTANDING_BALANCE_CUSTOMERS_COLUMNS = (router, limit) => {
  return [
    {
      Header: 'Subscriber',
      accessor: row => {
        return (
          <TransactionDrawerContainer row={row} unit={row?.unit}>
            {row?.co_owners?.length ? (
              <HStack textAlign={'left'} spacing="11px">
                <Box position="relative">
                  <Box
                    px="5px"
                    fontSize={'10px'}
                    borderRadius={'full'}
                    bg="#4545FE"
                    color="#FFFFFF"
                    position={'absolute'}
                    right={'-1.7%'}
                  >
                    {'+' + row?.co_owners?.length}
                  </Box>
                  <Image
                    alt=""
                    borderRadius="full"
                    boxSize="48px"
                    objectFit="cover"
                    aspectRatio="1"
                    src={row.avatar ?? avatarFallback.src}
                  />
                </Box>
                <Flex pr="7px">
                  <Text fontSize="14px" wordWrap={'break-word'}>
                    {row?.name?.split(' ')[0] + ' & '}
                  </Text>
                  <Text color={'#4545FE'} fontSize="14px">
                    {` ${row?.co_owners?.length} other${row?.co_owners?.length > 1 ? 's' : ''}`}
                  </Text>
                </Flex>
              </HStack>
            ) : (
              <HStack textAlign={'left'} spacing="11px">
                <Image
                  alt=""
                  borderRadius="full"
                  boxSize="48px"
                  objectFit="cover"
                  aspectRatio="1"
                  src={row.avatar ?? avatarFallback.src}
                />
                <Text pr="7px" fontSize="14px" wordWrap={'break-word'}>
                  {row?.name}
                </Text>
              </HStack>
            )}
          </TransactionDrawerContainer>
        );
      },
    },
    {
      Header: 'Unit',
      accessor: row => {
        return (
          <TransactionDrawerContainer row={row} unit={row?.unit}>
            <Text fontSize={'14px'} textAlign={'left'} pr="7px" wordWrap="break-word">
              {truncateLongText(row?.unit?.title)?.truncatedText}
            </Text>
          </TransactionDrawerContainer>
        );
      },
    },
    {
      Header: 'Purchase Price',
      accessor: row => {
        return (
          <TransactionDrawerContainer row={row} unit={row?.unit}>
            <Text fontWeight="600" fontSize="14px" lineHeight="18px" color="#191919">
              {formatAmountWithDecimal(row?.purchase_price)}
            </Text>
          </TransactionDrawerContainer>
        );
      },
    },
    {
      Header: 'Total Paid',
      accessor: row => {
        return (
          <TransactionDrawerContainer row={row} unit={row?.unit}>
            <Text fontWeight="600" fontSize="14px" lineHeight="18px" color="#191919">
              {formatAmountWithDecimal(row?.total_paid)}
            </Text>
          </TransactionDrawerContainer>
        );
      },
    },
    {
      Header: 'Outstanding balance',
      accessor: row => {
        return (
          <TransactionDrawerContainer row={row} unit={row?.unit}>
            <Text fontWeight="600" fontSize="14px" lineHeight="18px" color="#191919">
              {formatAmountWithDecimal(row?.outstanding_balance)}
            </Text>
          </TransactionDrawerContainer>
        );
      },
    },
    {
      Header: 'Date',
      accessor: row => {
        const date = row?.created_at;
        const a = date.slice(0, 6);
        const year = date.slice(-6);
        return (
          <TransactionDrawerContainer row={row} unit={row?.unit}>
            <Text
              textAlign={'left'}
              fontWeight="400"
              fontSize="12px"
              lineHeight="18px"
              color="#191919"
            >
              {a + year}
            </Text>
          </TransactionDrawerContainer>
        );
      },
    },
    {
      Header: 'Status',
      accessor: row => {
        let statusValue = row?.status?.toLowerCase();
        let color =
          statusValue == 'completed'
            ? '#381E87'
            : statusValue == 'defaulting'
              ? '#FF9103'
              : statusValue == 'suspended'
                ? '#FF3636'
                : statusValue == 'not defaulting'
                  ? '#064B38' //'#08C48F'
                  : statusValue == 'transferred'
                    ? '#606060'
                    : '#191919';
        let bg =
          statusValue == 'completed'
            ? 'rgba(103, 169, 210, 0.2)'
            : statusValue == 'defaulting'
              ? 'rgba(255, 145, 3, 0.1)'
              : statusValue == 'suspended'
                ? 'rgba(255, 54, 54, 0.1)'
                : statusValue == 'not defaulting'
                  ? '#E7FBF5' //'#DBFFF5'
                  : statusValue == 'transferred'
                    ? '#F5F5F5'
                    : 'lightgray';
        return (
          <TransactionDrawerContainer row={row} unit={row?.unit}>
            <Tag p={'8px 13px'} w="fit-content" color={color} bg={bg} borderRadius="48px">
              <TagLabel mx="auto">{row?.status}</TagLabel>
            </Tag>
          </TransactionDrawerContainer>
        );
      },
    },
  ];
};

export const UNIT_TXN_COLUMNS = (router, limit) => [
  {
    Header: 'Name',
    accessor: row => {
      console.log(row);
      return (
        <>
          <TransactionDrawerContainer unit={row?.unit} row={row} equity_id={row?.id}>
            {row?.co_owners?.length ? (
              <HStack textAlign={'left'} spacing="11px">
                <Box position="relative">
                  <Box
                    px="5px"
                    fontSize={'10px'}
                    borderRadius={'full'}
                    bg="#4545FE"
                    color="#FFFFFF"
                    position={'absolute'}
                    right={'-1.7%'}
                  >
                    {'+' + row?.co_owners?.length}
                  </Box>
                  <Image
                    alt=""
                    borderRadius="full"
                    height="48px"
                    width="47.29px"
                    src={row?.avatar ?? avatarFallback.src}
                  />
                </Box>
                <Text fontSize="14px" wordWrap={'break-word'} pr="7px">
                  {`${row?.owner?.first_name} &  `}

                  <Text color={'#4545FE'} as="span">
                    {`${row?.co_owners?.length} other${row?.co_owners?.length === 1 ? '' : 's'}`}
                  </Text>
                </Text>
              </HStack>
            ) : (
              <HStack textAlign={'left'} spacing="11px">
                <Image
                  alt=""
                  borderRadius="full"
                  height="48px"
                  width="47.29px"
                  src={row?.customer?.avatar ?? avatarFallback.src}
                />
                <Text pr="7px" fontSize="14px" wordWrap={'break-word'}>
                  {`${row?.customer?.first_name} ${row?.customer?.last_name}`}
                </Text>
              </HStack>
            )}
          </TransactionDrawerContainer>
        </>
      );
    },
  },
  {
    Header: 'Purchase Price',
    accessor: row => {
      return (
        <Text fontWeight="600" fontSize="14px" lineHeight="18px" color="#191919">
          {formatAmountWithDecimal(row?.total_unit_price)}
        </Text>
      );
    },
  },
  {
    Header: 'Total Paid',
    accessor: row => {
      return (
        <Text fontWeight="600" fontSize="14px" lineHeight="18px" color="#191919">
          {formatAmountWithDecimal(row?.amount_paid)}
        </Text>
      );
    },
  },
  {
    Header: 'Outstanding balance',
    accessor: row => {
      return (
        <Text fontWeight="600" fontSize="14px" lineHeight="18px" color="#191919">
          {formatAmountWithDecimal(row?.current_outstanding_balance)}
        </Text>
      );
    },
  },
  {
    Header: 'Date',
    accessor: row => {
      const date = row?.purchase_date;

      return (
        <Text textAlign={'left'} fontWeight="400" fontSize="12px" lineHeight="18px" color="#191919">
          {handleDateFormat(date)}
        </Text>
      );
    },
  },
  {
    Header: 'Status',
    accessor: row => {
      let statusValue = row?.payment_status?.toLowerCase();

      const statusObj = {
        completed: {color: '#381E87', bg: '#67A9D233', text: 'Completed'},
        defaulting: {color: '#FF9103', bg: '#FF91031A', text: 'Defaulting'},
        suspended: {color: 'FF3636', bg: 'FF36361A', text: 'Suspended'},
        'non defaulting': {color: '#08C38F', bg: '#DBFFF5', text: 'Not defaulting'},
        'non-defaulting': {color: '#08C38F', bg: '#DBFFF5', text: 'Not defaulting'},
        transfered: {color: '#606060', bg: '#F5F5F5', text: 'Transfered'},
        fractional: {
          color: '#606060',
          bg: '#F5F5F5',
        },
      };

      return (
        <Tag
          p={'8px 13px'}
          maxH="36px"
          w="fit-content"
          color={statusObj?.[statusValue]?.color}
          bg={statusObj?.[statusValue]?.bg}
          borderRadius="48px"
        >
          <TagLabel mx="auto">{statusObj?.[statusValue]?.text}</TagLabel>
        </Tag>
      );
    },
  },
];
