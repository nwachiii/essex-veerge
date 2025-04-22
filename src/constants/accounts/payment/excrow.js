import {HStack, Image, Text, Box} from '@chakra-ui/react';
import {formatAmountWithDecimal} from '../../../utils/formatAmount';
import {handleDateFormat} from 'utils/formatDate';
import defaultImage from '/src/images/image-fallback.png';
import CoOwnershipPopOver from '@/components/Popovers/CoOwnershipPopOver';
import {themeStyles} from 'theme';
import {truncateLongText} from 'utils';

export const EXCROW_TXNS_COLUMNS = data => [
  // {
  //   Header: ' ',
  //   accessor: row => {
  //     return <></>;
  //   },
  // },
  {
    Header: 'Name',

    accessor: row => {
      return (
        <HStack mx="auto" spacing="11px">
          <Box position="relative">
            <Image
              alt=""
              height="48px"
              width="47.29px"
              borderRadius="12px"
              src={row?.payment_for?.customer?.avatar ?? defaultImage?.src}
            />
            <Text
              pos="absolute"
              top={0}
              right={-1}
              as="span"
              px="3px"
              bg="#4545FE"
              color="#FFFFFF"
              fontSize={'10px'}
              fontWeight={500}
              borderRadius={'xl'}
            >{`+ ${row?.payment_for?.co_owners?.length - 1}`}</Text>
          </Box>
          {row?.payment_for?.co_owners?.length > 0 ? (
            <CoOwnershipPopOver
              host={row?.payment_for?.customer}
              otherCoOwnersList={row?.payment_for?.co_owners}
            >
              <Text cursor={'pointer'} pr="2px" fontSize={'14px'}>
                {`${row?.payment_for?.owner?.first_name} & `}{' '}
                <span
                  style={{color: '#4545FE'}}
                >{` ${row?.payment_for?.co_owners?.length - 1} ${row?.payment_for?.co_owners?.length == 2 ? 'other' : 'others'}`}</span>
              </Text>
            </CoOwnershipPopOver>
          ) : (
            <Text pr="2px" fontSize={'14px'}>
              {`${row?.payment_for?.owner?.first_name} ${row?.payment_for?.owner?.last_name}`}
            </Text>
          )}
        </HStack>
      );
    },
  },
  {
    Header: 'Property',
    accessor: row => {
      const propertyName = `${row?.payment_for?.unit?.project?.name}, ${row?.payment_for?.unit?.unit_title}`;
      return (
        <Text textAlign={''} fontSize={'14px'}>
          {truncateLongText(propertyName).truncatedText}
        </Text>
      );
    },
  },
  {
    Header: 'Offer Date',
    accessor: row => {
      return (
        <Text textAlign={''} fontSize="14px" fontWeight={500}>
          {handleDateFormat(row?.payment_for?.created_at) ?? '-'}
        </Text>
      );
    },
  },
  {
    Header: 'Escrowed Amount',
    accessor: row => {
      return (
        <Text textAlign={''} fontSize="14px" fontWeight={600}>
          {formatAmountWithDecimal(row?.amount)}
        </Text>
      );
    },
  },
  {
    Header: 'Pending Amount',
    accessor: row => {
      return (
        <Text textAlign={''} fontSize="14px" fontWeight={600}>
          {formatAmountWithDecimal(row?.pending_amount)}
        </Text>
      );
    },
  },
  {
    Header: 'Expiration Date',
    accessor: row => {
      return (
        <Text textAlign={''} fontSize="14px" fontWeight={600}>
          {handleDateFormat(row?.payment_for?.offer_expires) ?? '-'}
        </Text>
      );
    },
  },
];

export const EXCROW_HISTORY_COLUMNS = data => [
  // {
  //   Header: ' ',
  //   accessor: row => {
  //     return <></>;
  //   },
  // },
  {
    Header: 'Name',
    accessor: row => {
      return (
        <HStack mx="auto" spacing="11px">
          <Box position="relative">
            <Image
              alt=""
              height="48px"
              width="47.29px"
              minW="47.29px"
              borderRadius="12px"
              src={row?.payment_for?.customer?.avatar ?? defaultImage?.src}
            />
            <Text
              pos="absolute"
              top={0}
              right={-1}
              as="span"
              px="3px"
              bg="#4545FE"
              color="#FFFFFF"
              fontSize={'10px'}
              fontWeight={500}
              borderRadius={'xl'}
            >{`+ ${row?.payment_for?.co_owners?.length - 1}`}</Text>
          </Box>
          {row?.payment_for?.co_owners?.length > 0 ? (
            <CoOwnershipPopOver
              host={row?.payment_for?.customer}
              otherCoOwnersList={row?.payment_for?.co_owners}
            >
              <Text cursor={'pointer'} pr="2px" fontSize={'14px'}>
                {`${row?.payment_for?.owner?.first_name} & `}{' '}
                <span
                  style={{color: '#4545FE'}}
                >{` ${row?.payment_for?.co_owners?.length - 1} ${row?.payment_for?.co_owners?.length == 2 ? 'other' : 'others'}`}</span>
              </Text>
            </CoOwnershipPopOver>
          ) : (
            <Text pr="2px" fontSize={'14px'}>
              {`${row?.payment_for?.owner?.first_name} ${row?.payment_for?.owner?.last_name}`}
            </Text>
          )}
        </HStack>
      );
    },
  },
  {
    Header: 'Property',
    accessor: row => {
      const propertyName = `${row?.payment_for?.unit?.project?.name}, ${row?.payment_for?.unit?.unit_title}`;
      return (
        <Text textAlign={''} fontSize={'14px'}>
          {truncateLongText(propertyName).truncatedText}
        </Text>
      );
    },
  },
  {
    Header: 'Offer Date',
    accessor: row => {
      return (
        <Text textAlign={''} fontSize="14px" fontWeight={500}>
          {handleDateFormat(row?.payment_for?.created_at) ?? '-'}
        </Text>
      );
    },
  },
  {
    Header: 'Status',
    accessor: row => {
      return (
        <Text
          bg={
            row?.status == 'paid'
              ? themeStyles.color.matador__green_tag
              : row?.status == 'reversed'
                ? themeStyles.color.matador__purple_tag
                : row?.status == 'held'
                  ? themeStyles.color.matador__yellow_tag
                  : '-'
          }
          color={
            row?.status == 'paid'
              ? themeStyles.color.matador__green
              : row?.status == 'reversed'
                ? themeStyles.color.matador__purple
                : row?.status == 'held'
                  ? themeStyles.color.matador__yellow
                  : '-'
          }
          fontSize="16px"
          minW={'120px'}
          w="fit-content"
          fontWeight={500}
          padding={'5px'}
          borderRadius={'16px'}
          textTransform={'capitalize'}
        >
          {row?.status == 'paid'
            ? 'completed'
            : row?.status == 'reversed'
              ? 'reversed'
              : row?.status == 'held'
                ? 'held'
                : '-'}
        </Text>
      );
    },
  },
  {
    Header: 'Escrowed Amount',
    accessor: row => {
      return (
        <Text textAlign={''} fontSize="14px" fontWeight={600}>
          {formatAmountWithDecimal(row?.amount)}
        </Text>
      );
    },
  },
  {
    Header: 'Expiration Date',
    accessor: row => {
      return (
        <Text textAlign={''} fontSize="14px" fontWeight={500}>
          {handleDateFormat(row?.payment_for?.offer_expires) ?? '-'}
        </Text>
      );
    },
  },
];
