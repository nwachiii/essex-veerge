import {Stack} from '@chakra-ui/react';
import React, {useEffect, useState} from 'react';
// import veergeBg from '/src/images/ExpBackground.svg';
import veergeBg from '/src/images/expected_activity.png';
import {fetchDashboardData} from '../../apis';
import {useQuery} from '@tanstack/react-query';
import {ExpectedActivity} from '/src/components/expectedActivity';
import {useRouter} from 'next/router';
import {AnimatedLoader} from '../../components';

export const ExpectedActivities = () => {
  const {data, refetch} = useQuery(['dashboard', ''], () => fetchDashboardData(''));
  const [redirect, setRedirect] = useState(false);
  const router = useRouter();

  const INITIAL_STATUS = data?.data?.dashboard_data?.user?.initial_status ?? null;

  const handleRedirect = () => {
    setRedirect(!redirect);
    router.push('/dashboard');
  };
  useEffect(() => {
    !INITIAL_STATUS
      ? console.log('no status')
      : INITIAL_STATUS !== 'Pending'
        ? handleRedirect()
        : setRedirect(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [INITIAL_STATUS]);

  return (
    <Stack
      bg="#FAFAFA"
      mx="auto"
      my={0}
      w="full"
      // maxW="1500px"
      minH="100vh"
      objectFit={'contain'}
      backgroundSize={`cover`}
      backgroundImage={redirect == 'true' ? null : veergeBg.src}
      // backgroundPosition="center"
      backgroundPosition={`top`}
      backgroundRepeat="no-repeat"
    >
      {redirect == 'true' ? <AnimatedLoader /> : null}
      <ExpectedActivity
        data={data}
        refetch={refetch}
        isExpected={data?.data?.dashboard_data?.expected_activities}
      />
    </Stack>
  );
};

export default ExpectedActivities;
