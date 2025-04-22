import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Icon,
  IconButton,
  Image,
  Link,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import {handleDateFormat} from '/src/utils/formatDate';

import emptyStateHouseIcon from '/src/images/icons/emptyStateHouseIcon.svg';
import {useRouter} from 'next/router';
import {isRoleRestricted} from 'ui-lib/ui-lib.hooks/isRoleRestricted';
import ListingCard from './components/listingCard';
import ListingCardLoadingState from './components/listingCardEmptyState';
import downloadIcon from '/src/images/icons/download-icon.svg';
import {FiHome} from 'react-icons/fi';
import {CSVLink} from 'react-csv';
import SortBy from '../SortBy';
import Filter from '/src/pages/listings/manage/ListingsTable/Header/filter/index.js';
import DownloadCsv from 'ui-lib/ui-lib.components/Button/downloadCsv';
const sort_params = [
  'A-Z',
  'Z-A',
  'Most sold to least sold',
  'Least sold  to most sold',
  'Highest price to lowest price',
  'Lowest price to highest price',
  'Highest unit to lowest unit',
  'Lowest unit to highest unit',
  'Oldest to Newest',
  'Newest to oldest',
];

const ListOfListings = ({projects, forFilter, isLoading}) => {
  const router = useRouter();
  const getDataFromJSON = obj => {
    const result = [];
    for (var i = 0; i < obj?.length; i++) {
      const sold = obj[i]?.units_sold;
      const total = obj[i]?.total_units;
      projects &&
        result.push({
          name: obj[i]?.name,
          location: obj[i]?.location_description ?? obj[i]?.landmark,
          created_date: handleDateFormat(obj[i]?.created_at),
          total_units: total,
          remaining_units: total - sold,
        });
    }
    return result;
  };
  return (
    <Stack h="full" spacing="32px" w="full">
      {' '}
      <Flex w="full" justifyContent="space-between">
        <Heading fontSize="28px" fontWeight="600" lineHeight="24px" color="#191919">
          Overview
        </Heading>
        <Flex pos="relative" zIndex={1} gap="32px">
          {isRoleRestricted('create listings').check ? null : (
            <Link
              display="flex"
              pos="relative"
              zIndex={1}
              _hover={{textDecor: 'none'}}
              gap="8px"
              alignItems="center"
              justifyContent="center"
              borderRadius="12px"
              fontSize="14px"
              fontWeight="400"
              color="#191919"
              w="144px"
              border="0.5px solid #e4e4e4"
              h="36px"
              lineHeight="17.75px"
              href="/listings/create"
              bg="#ffffff"
            >
              <Icon boxSize={'16px'} as={FiHome} />
              New Listing
            </Link>
          )}
          <Flex gap="16px">
            <Filter forFilter={forFilter} />

            <SortBy sortFor="listing" btnStyle={{bg: '#fff'}} sort_params={sort_params} />

            <DownloadCsv data={getDataFromJSON(projects)} />
          </Flex>
        </Flex>
      </Flex>
      {isLoading ? (
        <Grid templateColumns={{base: 'repeat(3, 1fr)', lg: 'repeat(3, 1fr)'}} w="full" gap="20px">
          {[1, 1, 1, 1, 2].map((_, idx) => (
            <ListingCardLoadingState key={idx} />
          ))}
        </Grid>
      ) : !projects?.length ? (
        <VStack mt="100px" alignItems="center" spacing="8px">
          <Image
            src={emptyStateHouseIcon.src}
            alt="listing empty state house icon"
            boxSize="32px"
          />
          <Heading as="h2" fontSize="16px" fontWeight="700" lineHeight="20.29px" color="#3d3d3d">
            Nothing Found
          </Heading>
          <Text fontSize="14px" fontWeight="400" lineHeight="17.75px" color="#919191">
            Looks like no listing has been added yet
          </Text>
          {isRoleRestricted('create listings').check ? null : (
            <Button
              w="fit-content"
              fontFamily="Euclid Circular B"
              px="25px"
              h="46px"
              fontSize="14px"
              fontWeight="400"
              lineHeight="17.75px"
              onClick={() => router.push('/listings/create')}
              variant="filled-radius"
            >
              Create Community
            </Button>
          )}
        </VStack>
      ) : (
        <Grid
          overflowY="hidden"
          templateColumns={{base: 'repeat(3, 1fr)', lg: 'repeat(3, 1fr)'}}
          w="full"
          gap="20px"
        >
          {projects.map((project, idx) => (
            <ListingCard key={idx} project={project} />
          ))}
        </Grid>
      )}
    </Stack>
  );
};

export default ListOfListings;
