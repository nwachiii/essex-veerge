import {Box} from '@chakra-ui/react';
import CustomerOverviewPage from './customer_overview';
import {useSmallerLaptopsBreakpoint} from 'ui-lib/ui-lib.hooks';
import {LayoutView} from '@/components/index';

export default function ManageCustomers() {
  const isSmallerLaptop = useSmallerLaptopsBreakpoint();

  return (
    <Box w="full" minH="100vh" bg="#FAFAFA" h={isSmallerLaptop ? '60vh' : ''}>
      <LayoutView
        px={{base: '0px', xl: '30px'}}
        tabPanelStyle={{pb: '0px'}}
        pb="0px"
        activePage="communities"
      >
        <CustomerOverviewPage />
      </LayoutView>
    </Box>
  );
}
