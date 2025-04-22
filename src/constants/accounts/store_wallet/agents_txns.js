import {Button, Center, HStack, Image, Tag, TagLabel, Text, useDisclosure} from '@chakra-ui/react';
import Link from 'next/link';

import {handleDateFormat} from '/src/utils/formatDate';
import avatarFallback from '/src/images/avatar.svg';
import {formatAmountWithDecimal, priceString} from '../../../utils/formatAmount';
import {RealtorDrawerWrapper} from '@/components/Drawers/realtorDrawer/RealtorDrawerWrapper';
import {themeStyles} from 'theme';

export const AGENTS_TXNS_COLUMNS = data => [
  {
    Header: 'Name',
    accessor: row => {
      return (
        <RealtorDrawerWrapper agentId={row?.agent?.id}>
          <HStack textAlign={'left'} spacing="11px">
            <Center
              w="48px"
              h="48px"
              borderRadius={'50%'}
              overflow={'hidden'}
              position={'relative'}
            >
              <Image
                alt="Profile Photo"
                minH={'100%'}
                minW={'100%'}
                objectFit={'cover'}
                src={row?.agent?.avatar || avatarFallback.src}
              />
            </Center>
            <Text pr="2px" fontSize={'14px'} textTransform="capitalize">
              {`${row?.agent?.first_name} ${row?.agent?.last_name}`}
            </Text>
          </HStack>
        </RealtorDrawerWrapper>
      );
    },
  },

  {
    Header: 'Email',
    accessor: row => {
      return (
        <Text cursor={'pointer'} color={'#4545FE'} textAlign={'left'} fontSize={'14px'}>
          <a href={`mailto:${row?.agent?.email}`}> {row?.agent?.email}</a>
        </Text>
      );
    },
  },
  {
    Header: 'Phone No.',
    accessor: row => {
      return (
        <Text textAlign={'left'} fontSize={'14px'}>
          {row?.agent?.phone}
        </Text>
      );
    },
  },

  {
    Header: 'Amount',
    accessor: row => {
      return (
        <Text textAlign={'left'} fontSize="14px" fontWeight={700}>
          {formatAmountWithDecimal(row?.naira_balance)}
        </Text>
      );
    },
  },

  {
    Header: 'Action',
    hideHeader: true,
    accessor: row => {
      return (
        <>
          {row?.agent?.id ? (
            <Link href={`/users/manage_agents/${row?.agent?.id}`}>
              <Button
                borderRadius="72px"
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
          ) : null}
        </>
      );
    },
  },
];
