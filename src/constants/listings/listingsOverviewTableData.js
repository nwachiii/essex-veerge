import {ChevronDownIcon} from '@chakra-ui/icons';
import {Button, HStack, Image, Progress, Tag, TagLabel, Text} from '@chakra-ui/react';
import Link from 'next/link';

export const LISTINGS_OVERVIEW_COLUMNS = [
  // {
  //   Header: 'No.',
  //   accessor: 'id',
  // },
  {
    Header: 'Image',
    accessor: row => {
      return <Image alt="" borderRadius="full" height="48px" width="47.29px" src={row.image.src} />;
    },
  },
  {
    Header: 'Name',
    accessor: 'name',
  },
  {
    Header: 'Location',
    accessor: 'location',
  },
  {
    Header: 'No. of units',
    accessor: row => {
      const units = row.units;
      const value = units.substring(0, units.search('/'));
      const total = units.substring(units.search('/') + 1, units.length);
      const percentage = (value / total) * 100;
      let status = row.status.toLowerCase();
      const colorScheme = status === 'inactive' ? 'gray' : status === 'active' ? 'green' : 'red';
      return (
        <div>
          <Text mb={2}>{row.units}</Text>
          <Progress borderRadius="full" value={percentage} size="sm" colorScheme={colorScheme} />
        </div>
      );
    },
  },
  {
    Header: 'Created Date',
    accessor: 'created_date',
  },
  {
    Header: 'Status',
    accessor: row => {
      let status = row.status.toLowerCase();
      const colorScheme = status === 'inactive' ? 'gray' : status === 'active' ? 'green' : 'red';
      return (
        <Tag p={3} w="93px" size="lg" colorScheme={colorScheme} borderRadius="full">
          <TagLabel mx="auto">{row.status}</TagLabel>
        </Tag>
      );
    },
  },
  {
    Header: 'Action',
    hideHeader: true,
    accessor: row => {
      return (
        <Link href={`/residents/profile/?userId=${row.id}`}>
          <Button
            borderRadius="12px"
            w="115px"
            h="40px"
            color={themeStyles.color.primary}
            fontWeight={'400'}
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
