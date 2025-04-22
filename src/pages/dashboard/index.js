import {AbsoluteCenter, Box, Stack} from '@chakra-ui/react';
import {LayoutView} from '../../components';
import {DashboardOverview} from './Overview';
import {fetchDashboardData} from '/src/apis';
import {useQuery} from '@tanstack/react-query';
import {PendingDashBoardState} from '../../components/dashboard';
import {ExpectedActivity} from '/src/components/expectedActivity';
import {useRouter} from 'next/router';
import {AnimatedLoader} from '@/components/common/loaders';
import {useSmallerLaptopsBreakpoint} from 'ui-lib/ui-lib.hooks';

export default function Dashboard() {
  const {data, error, isError, isLoading, refetch} = useQuery(['dashboard', ''], () =>
    fetchDashboardData('')
  );
  const isSmallerLaptop = useSmallerLaptopsBreakpoint();

  const router = useRouter();

  const {manageApp} = router.query;

  if (data?.data?.dashboard_data) {
    localStorage.setItem('quickStart', JSON.stringify(data?.data?.dashboard_data?.quick_start));

    localStorage.setItem('loggedinUser', JSON.stringify(data?.data?.dashboard_data?.user));

    localStorage.setItem('in_review', JSON.stringify(data?.data?.dashboard_data?.in_review));

    localStorage.setItem(
      'account_trial_Info',
      JSON.stringify({
        trial_days: data?.data?.dashboard_data?.trial_days,
        trial_display: data?.data?.dashboard_data?.trial_display,
      })
    );
  }

  const INITIAL_STATUS = data?.data?.dashboard_data?.user?.initial_status;

  return (
    <Box bg="#FAFAFA" w="full" h={isSmallerLaptop ? '60vh' : ''}>
      <LayoutView
        maxW="full"
        tabPanelStyle={{px: '0px', pb: '0px'}}
        px="0px"
        pb="30px"
        activePage="dashboard"
        openmanageApp={manageApp}
        initial_status={INITIAL_STATUS}
      >
        <>
          <ExpectedActivity
            data={data}
            refetch={refetch}
            isExpected={data?.data?.dashboard_data?.expected_activities}
          />
          {!INITIAL_STATUS || isLoading ? (
            <AbsoluteCenter mt="17rem">
              <AnimatedLoader />
            </AbsoluteCenter>
          ) : INITIAL_STATUS !== 'Accepted' ? (
            <PendingDashBoardState data={data} mx="auto" />
          ) : (
            <>
              <DashboardOverview
                mx="auto"
                mt={`clamp(52px,calc(10.4vh + 40px),82px)`}
                maxW="full"
                w="full"
                data={data}
                error={error}
                isError={isError}
                isLoading={isLoading}
                refetch={refetch}
              />
            </>
          )}
        </>
      </LayoutView>
    </Box>
  );
}
