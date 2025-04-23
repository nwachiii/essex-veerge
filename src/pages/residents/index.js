import {Box} from '@chakra-ui/react';
import {LayoutView} from '../../components';
import CustomerOverviewPage from './customer_overview';
import {useSmallerLaptopsBreakpoint} from 'ui-lib/ui-lib.hooks';

export default function ManageCustomers() {
  const isSmallerLaptop = useSmallerLaptopsBreakpoint();

  return (
    <Box w="full" minH="100vh" bg="#FAFAFA" h={isSmallerLaptop ? '60vh' : ''}>
      <LayoutView
        px={{base: '0px', xl: '30px'}}
        tabPanelStyle={{pb: '0px'}}
        pb="0px"
        activePage="users"
      >
        <CustomerOverviewPage />
      </LayoutView>
    </Box>
  );
}
