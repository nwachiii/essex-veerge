import {HStack, Heading, Image, Tag, TagLabel, Text, VStack} from '@chakra-ui/react';
import {Button} from '../../../ui-lib/ui-lib.components';
import {changeDateFormat} from '../../../utils/formatDate';
import HoverListingName from '../../../components/dashboard/table/HoverListingName';
import HoverText from '../../../ui-lib/ui-lib.components/hoverOnText/hoverOnText';
import CommissionAgentDrawer from './Drawer.for.commission.agents';
import CommissionCustomerDrawer from './Drawer.for.commission.customer';

export const COMMISSION_REQUEST_COLUMN_HISTORY = [
  // {
  //   Header: "No.",
  //   accessor: (_, indx) => {
  //     return `${indx <= 9 ? 0 : ""}${indx + 1}.`;
  //   },
  // },
  {
    Header: 'Realtor',
    accessor: row => {
      return <CommissionAgentDrawer row={row} />;
    },
  },
  {
    Header: 'Date Requested',
    accessor: row => (
      <Text textAlign="start" color="#191919" fontSize="16px" w="full" fontWeight="400">
        {' '}
        {changeDateFormat(row.created_at, 'monthFirst')}
      </Text>
    ),
  },

  {
    Header: 'Property',
    accessor: row => {
      return <HoverListingName text={row?.property_info ?? ''} />;
    },
  },

  {
    Header: 'Client',
    accessor: row => {
      return <CommissionCustomerDrawer row={row} />;
    },
  },
  // {
  //   Header: 'Request type',
  //   accessor: row => {
  //     // let status = row?.tour_method?.toLowerCase();
  //     // const colorScheme = status === 'in-person' ? 'purple' : 'green';
  //     return (
  //       <Tag
  //         cursor="pointer"
  //         w="95px"
  //         h="36px"
  //         size="lg"
  //         color="#7255CB"
  //         bg="#7255CB1A"
  //         fontSize="16px"
  //         fontWeight="400"
  //         textTransform="capitalize"
  //         //   colorScheme={colorScheme}
  //         borderRadius="full"
  //       >
  //         <TagLabel mx="auto">{row?.request_type}</TagLabel>
  //       </Tag>
  //     );
  //   },
  // },
  {
    Header: 'Action',
    hideHeader: true,
    accessor: row => {
      return (
        <HoverText
          pContentStyle={{mr: '4px'}}
          text={
            row?.[row.status !== 'rejected' ? 'paid_by' : 'response_note']
              ? row.status !== 'rejected'
                ? `${row?.paid_by?.first_name ?? '-'} ${row?.paid_by?.last_name ?? ''}`
                : `${row?.response_note}`
              : null
          }
          component={Comprops => (
            <HStack
              justify="center"
              borderRadius="12px"
              border={row.status !== 'rejected' ? null : 'solid 1px #FF6A6A'}
              color={row.status !== 'rejected' ? '#ffffff' : '#FF6A6A'}
              bg={row.status !== 'rejected' ? '#242526' : 'transparent'}
              fontSize="18px"
              fontWeight="400"
              cursor="default"
              w="149px"
              h="40px"
              {...Comprops}
            >
              <Text> {row.status !== 'rejected' ? 'Approved' : 'Rejected'}</Text>
            </HStack>
          )}
          popUpCom={
            row.response_note && row.status === 'rejected' ? (
              <VStack justify="start" zIndex="" p="20px" bg="#ffffff">
                <Heading w="full" textAlign="start" as="h1" fontSize="18px" fontWeight="700">
                  Reason for rejection
                </Heading>
                <Text
                  textAlign="start"
                  w="354px"
                  whiteSpace="break-spaces"
                  fontSize="16px"
                  fontWeight="400"
                >
                  {row.response_note}
                </Text>
              </VStack>
            ) : null
          }
        />
      );
    },
  },
];
