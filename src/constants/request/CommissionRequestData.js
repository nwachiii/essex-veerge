import {
  Box,
  Heading,
  HStack,
  Image,
  Menu,
  MenuButton,
  MenuList,
  Stack,
  Tag,
  TagLabel,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react';
import HoverText from '/src/components/common/Hovertext/HoverText';
import {changeDateFormat} from '../../utils/formatDate';
import {HandleCommissionRequest} from './HandleCommissionRequest';
import avatar from '/src/images/avatar.svg';
import HoverListingName from '../../components/dashboard/table/HoverListingName';
import CommissionAgentDrawer from './request_history/Drawer.for.commission.agents';
import CommissionCustomerDrawer from './request_history/Drawer.for.commission.customer';

export const COMMISSION_REQUEST_COLUMN = (refetch, handleHover) => {
  return [
    {
      Header: 'Agent',
      accessor: row => {
        return <CommissionAgentDrawer row={row} />;
      },
    },
    {
      Header: 'Date Requested',
      accessor: row => (
        <Text textAlign="start" color="#191919" fontSize="16px" w="full" fontWeight="400">
          {' '}
          {changeDateFormat(row.created_at)}
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

    {
      Header: 'Action',
      hideHeader: true,
      accessor: row => {
        return <HandleCommissionRequest refetch={refetch} requestId={row?.id} />;
      },
    },
  ];
};
