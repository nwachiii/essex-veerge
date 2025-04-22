import {Box, Center, Flex, HStack, Image, Tag, TagLabel, Text} from '@chakra-ui/react';
import defaultImage from '/src/images/image-fallback.png';
import {priceString} from '/src/utils/formatAmount';
import avatarFallback from '/src/images/avatar.svg';
import {truncateLongText} from '/src/utils';
import {handleDateFormat} from '../../utils/formatDate';
import {formatAmountWithDecimal} from '../../utils/formatAmount';

import TransactionTags from 'ui-lib/ui-lib.components/tag/transactionTags';
import TransactionDrawerContainer from '@/components/Drawers/transactionDetails/TransactionDrawerContainer';

export const DEPOSITS_BREAKDOWN_COLUMNS = data => [
  {
    Header: 'Name',
    textAlign: 'left',
    headerSpace: 'evenly',
    accessor: row => {
      const USER = row.customer || row.user;
      const equity = row?.equity;

      return (
        <TransactionDrawerContainer row={row} user_id={row?.user} unit={equity?.unit}>
          {row?.equity?.co_owners?.length && equity?.type !== 'FRACTIONAL' ? (
            <HStack textAlign={'left'} spacing="11px">
              <Box boxSize="48px" position="relative">
                <Box
                  px="5px"
                  fontSize={'10px'}
                  borderRadius={'full'}
                  bg="#4545FE"
                  color="#FFFFFF"
                  position={'absolute'}
                  right={'-1.7%'}
                >
                  {'+' + equity?.co_owners?.length}
                </Box>
                <Image
                  alt=""
                  borderRadius="full"
                  h="48px"
                  objectFit="cover"
                  aspectRatio="1"
                  src={USER?.avatar ?? avatarFallback.src}
                />
              </Box>
              <Flex pr="7px" gap="1px">
                <Text fontSize="14px" wordWrap={'break-word'}>
                  {`${USER?.first_name} &`}
                </Text>
                <Text color={'#4545FE'} fontSize="14px">
                  {` ${equity?.co_owners?.length} other${equity?.co_owners?.length > 1 ? 's' : ''}`}
                </Text>
              </Flex>
            </HStack>
          ) : (
            <HStack textAlign={'center'} mx="auto" justify={'start'} spacing="11px">
              <Image
                alt="user avatar"
                borderRadius="full"
                height="48px"
                width="47.29px"
                src={USER?.avatar ?? avatarFallback.src}
              />
              <Text pr="7px" fontSize="14px" wordWrap={'break-word'}>
                {`${USER?.first_name} ${USER?.last_name}`}
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
        <Center>
          <Text
            fontSize={'14px'}
            wordWrap="break-word"
            maxWidth={'150px'}
            whiteSpace={`nowrap`}
            overflow={`hidden`}
            textAlign={`center`}
            textOverflow={`ellipsis`}
          >
            {row?.equity?.unit?.unit_title}
          </Text>
        </Center>
      );
    },
  },
  {
    Header: 'Deposit Amount',
    accessor: row => {
      return (
        <Text
          textAlign={'center'}
          fontWeight="600"
          fontSize="14px"
          lineHeight="18px"
          color="#191919"
        >
          {formatAmountWithDecimal(row?.amount)}
        </Text>
      );
    },
  },
  {
    Header: 'Payment Type',
    accessor: row => {
      let type = row.transaction_action_type.toLowerCase();

      // switch (type) {
      //   case 'equity_outright':
      //     return (
      //       <Tag w="130px" color={'#08C48F'} bg={'#DBFFF5'} borderRadius="full" h="36px">
      //         <TagLabel mx="auto">Full Payment</TagLabel>
      //       </Tag>
      //     );
      //     break;
      //   case 'equity_plan_initial':
      //     return (
      //       <Tag
      //         w="130px"
      //         color={'#7255CB'}
      //         bg={'rgba(114, 85, 203, 0.1)'}
      //         borderRadius="full"
      //         h="36px"
      //       >
      //         <TagLabel mx="auto">Initial Deposit</TagLabel>
      //       </Tag>
      //     );
      //     break;
      //   case 'equity_plan_deposit':
      //     return (
      //       <Tag
      //         w="130px"
      //         color={'#FF9103'}
      //         bg={'rgba(255, 145, 3, 0.1)'}
      //         borderRadius="full"
      //         h="36px"
      //       >
      //         <TagLabel mx="auto">Installment</TagLabel>
      //       </Tag>
      //     );
      //     break;

      //   default:
      //     break;
      // }
      return <TransactionTags type={row?.transaction_action_type?.toLowerCase()} />;
    },
  },
  {
    Header: 'Date',
    accessor: row => {
      return (
        <Text
          textAlign={'center'}
          fontWeight="400"
          fontSize="12px"
          lineHeight="18px"
          color="#191919"
        >
          {handleDateFormat(row?.created_at)}
        </Text>
      );
    },
  },
];
