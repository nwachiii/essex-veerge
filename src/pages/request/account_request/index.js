import {useRouter} from 'next/router';
import React from 'react';
import {MatadorCustomTable} from '../../../components/common/Table';
import {
  ACCOUNT_REQUEST_COLUMN,
  ACCOUNT_REQUEST_DATA,
} from '../../../constants/request/AccountRequestData';
import {
  ACCOUNT_REQUEST_COLUMN_HISTORY,
  ACCOUNT_REQUEST_DATA_HISTORY,
} from '../../../constants/request/request_history/History.AccountRequestData';

export default function AccountRequest() {
  const router = useRouter();

  return (
    <div>
      {router.route.slice(-7) === 'history' ? (
        <MatadorCustomTable
          DATA={ACCOUNT_REQUEST_DATA_HISTORY}
          COLUMNS={ACCOUNT_REQUEST_COLUMN_HISTORY}
        />
      ) : (
        <MatadorCustomTable DATA={ACCOUNT_REQUEST_DATA} COLUMNS={ACCOUNT_REQUEST_COLUMN} />
      )}
    </div>
  );
}
