import {HStack, Image, Text} from '@chakra-ui/react';
import defaultImage from '/src/images/image-fallback.png';
import {formatAmountWithDecimal, priceString} from '../../utils/formatAmount';
import Link from 'next/link';
import {Button} from '../../ui-lib';
import {themeStyles} from '../../theme';
import {truncateLongText} from 'utils';

export const OUSTANDING_BALANCE_LISTING_COLUMNS = (router, limit) => [
  {
    Header: 'Listing',
    accessor: row => {
      return (
        <HStack textAlign={'left'} spacing="11px">
          <Image
            alt=""
            height="48px"
            width="47.29px"
            borderRadius="12px"
            src={row?.photos[0]?.photo ?? defaultImage?.src}
          />
          <Text pr="7px" fontSize={'14px'}>
            {truncateLongText(row?.name, 25).truncatedText}
          </Text>
        </HStack>
      );
    },
  },
  {
    Header: 'Location',
    accessor: row => {
      return (
        <Text fontSize={'14px'} textAlign={'left'} px="7px" wordBreak="break-word">
          {truncateLongText(row?.landmark).truncatedText}
        </Text>
      );
    },
  },
  {
    Header: 'Total Purchase',
    accessor: row => {
      return (
        <Text fontWeight="600" fontSize="14px" lineHeight="18px" color="#191919">
          {formatAmountWithDecimal(row?.total_purchase)}
        </Text>
      );
    },
  },
  {
    Header: 'Total Paid',
    accessor: row => {
      return (
        <Text fontWeight="600" fontSize="14px" lineHeight="18px" color="#191919">
          {formatAmountWithDecimal(row?.total_paid)}
        </Text>
      );
    },
  },
  {
    Header: 'Outstanding balance',
    accessor: row => {
      return (
        <Text fontWeight="600" fontSize="14px" lineHeight="18px" color="#191919">
          {formatAmountWithDecimal(row?.outstanding)}
        </Text>
      );
    },
  },
  {
    Header: 'View',
    hideHeader: true,
    accessor: row => {
      return (
        <Link
          href={`/dashboard/outstanding-balance/?listingId=${row?.id}&name=${row?.name}&project_id=${row?.id}&isFractional=${row?.is_fractional}`}
        >
          <Button
            mt={0}
            borderRadius="72px"
            w="115px"
            h="40px"
            color={themeStyles.color.primary}
            border={`1px solid ${themeStyles.color.primary}`}
            variant="dark"
            bg="transparent"
            fontWeight="500"
            fontSize="16px"
            lineHeight="20px"
            textAlign="center"
            py="0px"
          >
            View
          </Button>
        </Link>
      );
    },
  },
];
