import {HStack, Image, Tag, TagLabel, Text} from '@chakra-ui/react';
import {Button} from '../../ui-lib';
import Link from 'next/link';
import HoverText from 'ui-lib/ui-lib.components/hoverOnText/hoverOnText';
import TransactionDrawerWrapper from '@/components/Drawers/transactionDetails/transactionDrawerWrapper';
import UserDrawerRequestData from 'constants/request/UserDrawerRequestData';

export const AGENTS_PROFILE_COLUMN = [
  {
    Header: 'Subscriber',
    accessor: row => {
      return (
        <UserDrawerRequestData row={row} id={row?.owner_id}>
          <HStack spacing="12px">
            <Image
              alt=""
              borderRadius="full"
              objectFit="cover"
              height="48px"
              width="47.29px"
              src={row.img}
            />
            <Text textTransform="capitalize" fontSize="16px" fontWeight="400">
              {row.owner_name}
            </Text>
          </HStack>
        </UserDrawerRequestData>
      );
    },
  },
  {
    Header: 'Property',
    accessor: row => {
      console.log(row);
      return (
        <HStack>
          {/* <Image
            alt=""
            borderRadius="8px"
            objectFit="cover"
            // boxSize="48px"
            w="48px"
            h="48px"
            src={row.listing_img}
          /> */}
          <HoverText
            text={`${row.listing_name}, ${row.unit_name}`}
            lens="29"
            fontSize="16px"
            fontWeight="400"
          />
        </HStack>
      );
    },
  },

  {
    Header: 'Date',
    accessor: row => {
      return (
        <Text textAlign="start" fontSize="16px" fontWeight="400">
          {row.created_at}
        </Text>
      );
    },
  },
  {
    Header: 'Payment type',

    accessor: row => {
      let type = row.payment_type.toLowerCase();
      switch (type) {
        case 'full payment':
          return (
            <HStack w="full" justify="start">
              <Tag
                w="130px"
                bg="#DBFFF5"
                color="#12D8A0"
                borderRadius="full"
                fontSize="16px"
                fontWeight="500"
                h="36px"
              >
                <TagLabel mx="auto">{row.payment_type}</TagLabel>
              </Tag>
            </HStack>
          );
          break;
        case 'payment plan':
          return (
            <HStack w="full" justify="start">
              <Tag w="130px" bg="#F1ECFF" color="#4545FE" borderRadius="full" h="36px">
                <TagLabel fontSize="16px" fontWeight="500" mx="auto">
                  {row.payment_type}
                </TagLabel>
              </Tag>
            </HStack>
          );
          break;
        case 'top up':
          return (
            <HStack w="full" justify="start">
              <Tag w="130px" bg="#EFFFFA" borderRadius="full" h="36px">
                <TagLabel mx="auto">{row.payment_type}</TagLabel>
              </Tag>
            </HStack>
          );
          break;

        default:
          break;
      }
    },
  },
  {
    Header: 'Action',
    hideHeader: true,
    accessor: row => {
      return (
        <HStack alignItems="center">
          <TransactionDrawerWrapper row={row} />
        </HStack>
      );
    },
  },
];

// There are no elevators to the top; you have to take the stairs
// If it's doable, Then I made my decision already.
//Oshey... Poet isonu
