import AccountRequest from '../../pages/request/account_request';
import AgentRequest from '../../pages/request/agent_request';
import AllocationRequest from '../../pages/request/allocation_request';
import CommissionRequest from '../../pages/request/commission_request';
import DeedRequest from '../../pages/request/deed_request';
import InspectionRequest from '../../pages/request/inspection_request';
import allRequestDummyData from './dummyData.js';

const AllRequests = allRequestDummyData;

export const tabs = [
  {
    tablist: 'Payment Plan Request',
    component: () => (
      <InspectionRequest
        header="Payment Plan Request"
        AllRequests={AllRequests}
        dataKey={'payment_plan'}
      />
    ),
    countName: 'count_inspection',
    countNo: 7,
  },
  {
    tablist: 'Reservation Request ',
    component: () => (
      <InspectionRequest
        header="Reservation Request"
        AllRequests={AllRequests}
        dataKey={'reservation_request'}
      />
    ),
    countName: 'count_agent',
    countNo: 7,
  },
  {
    tablist: 'Design Request',
    component: () => (
      <InspectionRequest
        header="Design Request"
        AllRequests={AllRequests}
        dataKey={'design_request'}
      />
    ),
    countName: 'count_commissions',
    countNo: 0,
  },
  {
    tablist: 'Emergency Escalations',
    component: () => (
      <InspectionRequest
        header="Emergency Escalations"
        AllRequests={AllRequests}
        dataKey={'emergency_escalations'}
      />
    ),
    countName: 'count_commissions',
    countNo: 0,
  },
];
