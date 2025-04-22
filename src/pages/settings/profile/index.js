import {useRouter} from 'next/router';
import React, {useEffect} from 'react';
import {ProfileBox} from './profileBox/profileBoxComponent';
import {IdBox} from './idbox/idBoxComponent';
import {SecurityBox} from './securityBox/securityBoxComponent';
import {useQuery} from '@tanstack/react-query';
import {fetchDeveloperProfile} from '../../../apis/settings.js';
import {AnimatedLoader} from '../../../components';
import AnimateInput from '../../../components/AnimateInput';
import {Box, Heading, Stack, VStack} from '@chakra-ui/react';

export default function Profile() {
  const router = useRouter();
  const {data, isError, isLoading, refetch} = useQuery(
    ['fetchDeveloperProfile'],
    fetchDeveloperProfile
  );

  if (isError) {
    return <div>something went wrong!</div>;
  }

  return (
    <Stack position={'relative'}>
      {/* <Heading
        m="0px"
        w="full"
        color="#191919"
        fontSize={'16px'}
        fontWeight={'500'}
        textAlign={'left'}
      >
        Profile
      </Heading> */}
      {isLoading || !data ? (
        <VStack position="relative" mt="10vh">
          <AnimatedLoader />
        </VStack>
      ) : (
        <>
          <ProfileBox
            user={{
              role: data?.data?.role,
              ...data?.data?.develoeper_info,
            }}
            refetch={refetch}
          />

          <IdBox idInfo={data?.data?.Id_info} />

          <SecurityBox
            isMfa={data?.data?.develoeper_info?.developer?.developer?.is_mfa}
            refetch={refetch}
          />
        </>
      )}
    </Stack>
  );
}
