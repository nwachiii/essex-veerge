import AccountRequest from '../../pages/request/account_request';
import AgentRequest from '../../pages/request/agent_request';
import AllocationRequest from '../../pages/request/allocation_request';
import CommissionRequest from '../../pages/request/commission_request';
import DeedRequest from '../../pages/request/deed_request';
import InspectionRequest from '../../pages/request/inspection_request';

export const tabs = [
  {
    tablist: 'Listing Inspection',
    component: (AllRequests, refetch, isLoading, isError) => (
      <InspectionRequest
        AllRequests={AllRequests}
        refetch={refetch}
        isError={isError}
        isLoading={isLoading}
      />
    ),
    countName: 'count_inspection',
  },
  // {
  //   tablist: "Deed Request",
  //   component: <DeedRequest />,
  // },
  // {
  //   tablist: "Allocation Request",
  //   component: <AllocationRequest />,
  // },
  // {
  // 	tablist   : 'Account Request',
  // 	component : <AccountRequest />
  // },

  {
    tablist: 'Certified Realtors ',
    component: (AllRequests, refetch, isLoading, isError) => (
      <AgentRequest
        AllRequests={AllRequests}
        refetch={refetch}
        isError={isError}
        isLoading={isLoading}
      />
    ),
    countName: 'count_agent',
  },
  {
    tablist: 'Sales commission',
    component: (AllRequests, refetch, isLoading, isError) => (
      <CommissionRequest
        AllRequests={AllRequests}
        refetch={refetch}
        isError={isError}
        isLoading={isLoading}
      />
    ),
    countName: 'count_commissions',
  },
];
