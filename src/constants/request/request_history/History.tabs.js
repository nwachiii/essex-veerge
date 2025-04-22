import AccountRequest from '../../../pages/request/account_request';
import AgentRequest from '../../../pages/request/agent_request';
import AllocationRequest from '../../../pages/request/allocation_request';
import CommissionRequest from '../../../pages/request/commission_request';
import DeedRequest from '../../../pages/request/deed_request';
import InspectionRequest from '../../../pages/request/inspection_request';

export const HistoryTabs = [
  {
    tablist: 'Inspection Request',
    component: <InspectionRequest />,
    countName: 'Inspection_requests',
  },
  // {
  //   tablist: "Deed Request",
  //   component: <DeedRequest />,
  // },
  {
    tablist: 'Agent Request',
    component: <AgentRequest />,
    countName: 'agent_request',
  },
  {
    tablist: 'Commission Request',
    component: <CommissionRequest />,
    countName: 'commission_request',
  },
];
