import {useRouter} from 'next/router';
import React from 'react';
import {MatadorCustomTable} from '../../../components/common/Table';
import {
  ALLOCATION_REQUEST_COLUMN,
  ALLOCATION_REQUEST_DATA,
} from '../../../constants/request/AllocationRequest';
import {
  ALLOCATION_REQUEST_COLUMN_HISTORY,
  ALLOCATION_REQUEST_DATA_HISTORY,
} from '../../../constants/request/request_history/History.AllocationRequest';

export default function AllocationRequest() {
  const router = useRouter();
  return (
    <div>
      {router.route.slice(-7) === 'history' ? (
        <MatadorCustomTable
          isManageAgentEmpty="No allocation request yet"
          DATA={ALLOCATION_REQUEST_DATA_HISTORY}
          COLUMNS={ALLOCATION_REQUEST_COLUMN_HISTORY}
        />
      ) : (
        <MatadorCustomTable
          isManageAgentEmpty="No allocation request yet"
          DATA={[]}
          COLUMNS={ALLOCATION_REQUEST_COLUMN}
        />
      )}
    </div>
  );
}
