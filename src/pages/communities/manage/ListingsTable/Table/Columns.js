import {
  Button,
  Box,
  Flex,
  HStack,
  Image,
  Progress,
  Tag,
  TagLabel,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import Link from 'next/link';
import {themeStyles} from '../../../../../theme';
import {handleDateFormat} from '../../../../../utils/formatDate';
import defaultImage from '/src/images/image-fallback.png';
import DeleteProject from './DeleteProject';
import {truncateLongText} from '../../../../../utils';

export const COLUMNS = data => {
  return [
    {
      Header: () => (
        <Text textAlign="start" color={'#606060'} fontSize={16} fontWeight={'400'}>
          Listings
        </Text>
      ),
      // Header: 'Listings',
      id: 'listings',
      accessor: row => {
        return (
          <HStack mx="auto" spacing="21px">
            <Image
              alt=""
              height="48px"
              width="47.29px"
              borderRadius="12px"
              src={row?.photo_urls?.[0] ?? row?.photos[0]?.photo ?? defaultImage?.src}
            />
            <Tooltip label={row?.name} aria-label="A tooltip" placement="top">
              {truncateLongText(row?.name, 18)?.truncatedText}
            </Tooltip>
          </HStack>
        );
      },
    },

    {
      Header: 'Location',
      accessor: row => {
        return (
          <Tooltip
            label={row?.location_description ?? row.landmark}
            aria-label="A tooltip"
            placement="top"
            textAlign={'left'}
            pr={3}
          >
            {truncateLongText(row?.location_description ?? row.landmark, 18)?.truncatedText}
          </Tooltip>
        );
      },
    },
    {
      Header: 'Status',
      accessor: row => {
        let status = row?.is_sold_out;
        let isArchived = row?.project_archived;
        let isPrivate = row?.is_private;
        const colorScheme = status ? 'red' : isPrivate ? 'purple' : 'teal';
        return (
          <Tag p={3} w="99px" size="lg" colorScheme={colorScheme} borderRadius="full">
            {isArchived ? (
              <TagLabel mx="auto">Sold out</TagLabel>
            ) : (
              <TagLabel mx="auto">
                {status ? 'Sold out' : isPrivate ? 'Private' : 'Public'}
              </TagLabel>
            )}
          </Tag>
        );
      },
    },
    {
      Header: 'Units sold',
      accessor: row => {
        const sold = row?.units_sold;
        const noSoldOutUnits = sold == 0;
        const total_available_units = row?.units_available;
        const noAvailableUnits = total_available_units == sold;
        const soldPercentage = row ? (sold / total_available_units) * 100 : 0;
        const totalPercentage = 100 - soldPercentage;

        return (
          <Flex direction="column" gap="11px" align="center">
            <Text
              fontWeight="400"
              fontSize="14px"
              lineHeight="20px"
              color="#191919"
            >{`${sold}/${total_available_units}`}</Text>
            <HStack mx="auto" w="157px" gap={'0.8px'} spacing={0} borderRadius={'30px'}>
              <Box
                w={`${soldPercentage}%`}
                borderRadius={noAvailableUnits ? '30px' : '30px 0 0 30px'}
                h="10px"
                bg={themeStyles.color.matador__red}
              />
              <Box
                w={`${totalPercentage}%`}
                borderRadius={noSoldOutUnits ? '30px' : '0 30px 30px 0'}
                h="10px"
                bg={'teal.400'}
              />
            </HStack>
          </Flex>
        );
      },
    },
    {
      Header: 'Created Date',
      accessor: row => {
        return (
          <Text fontWeight="400" fontSize="14px" lineHeight="20px" color="#191919">
            {handleDateFormat(row?.created_at)}
          </Text>
        );
      },
    },
    {
      Header: 'View',
      hideHeader: true,
      accessor: row => {
        return (
          <Link href={`/listings/manage/?listingId=${row.id}`} prefetch={true}>
            <Button
              borderRadius="12px"
              w="115px"
              h="40px"
              color={themeStyles.color.primary}
              fontWeight={'400'}
              fontSize="16px"
              borderColor={themeStyles.color.primary}
              variant="outline"
            >
              View
            </Button>
          </Link>
        );
      },
    },
  ];
};

export const DRAFTS_COLUMNS = data => [
  {
    Header: 'Listings',
    accessor: row => {
      return (
        <HStack mx="auto" spacing="21px">
          <Image
            alt=""
            height="48px"
            width="47.29px"
            borderRadius="12px"
            src={row?.photos[0]?.photo ?? defaultImage?.src}
          />
          <Text>{row?.name}</Text>
        </HStack>
      );
    },
  },

  {
    Header: 'Location',
    accessor: row => {
      return (
        <Text textAlign={'left'} w="189px" wordBreak="break-word">
          {row?.location_description ?? row.landmark}
        </Text>
      );
    },
  },
  {
    Header: 'Created Date',
    accessor: row => {
      return (
        <Text textAlign={'left'} w="169px" wordBreak="break-word">
          {handleDateFormat(row?.created_at)}
        </Text>
      );
    },
  },

  {
    Header: 'View',
    hideHeader: true,
    accessor: row => {
      return (
        <HStack spacing="30px">
          <Link href={`/listings/manage/?listingId=${row.id}`}>
            <Button
              borderRadius="12px"
              w="115px"
              h="40px"
              color={themeStyles.color.primary}
              fontWeight={'400'}
              fontSize="16px"
              borderColor={themeStyles.color.primary}
              variant="outline"
            >
              View
            </Button>
          </Link>
          <DeleteProject project={row} />
        </HStack>
      );
    },
  },
];
export default COLUMNS;
