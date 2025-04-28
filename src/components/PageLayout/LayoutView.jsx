import {Box, HStack, IconButton, Image, Link, Stack, Text, useToast} from '@chakra-ui/react';
import {LayoutNavbar} from './Layout.Navbar';
import {LayoutNavigation} from './Layout.Navigation';
import {useRouter} from 'next/router';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {fetchDevelopersStatus} from 'apis/settings';
import {useEffect, useRef, useState} from 'react';
import useLocalStorage from 'utils/useLocalStorage';
import chatIcon from '/src/images/icons/chatMessageIcon.svg';
export function LayoutView({
  bg,
  children,
  noSubNav,
  activePage,
  manageroles,
  isPending,
  openmanageApp,
  tabPanelStyle,
  ...restProps
}) {
  const router = useRouter();
  const toast = useToast();
  const queryClient = useQueryClient();
  const [refetchCount, setRefetchCount] = useState(0);
  const maxRefetchCount = 5; // Number of times to refetch
  const intervalRef = useRef(null);

  // const developerStatusQuery = useQuery(['developerApprovalStatus'], fetchDevelopersStatus, {
  //   enabled: false,
  // });

  // USER APPROVAL ACTIONS
  // const IS_DEVELOPER_APPROVED = developerStatusQuery?.data?.data?.status;

  // if (IS_DEVELOPER_APPROVED == false) {
  //   typeof window !== 'undefined' &&
  //     localStorage.setItem(
  //       'IS_DEVELOPER_APPROVED',
  //       JSON.stringify({IS_DEVELOPER_APPROVED: IS_DEVELOPER_APPROVED})
  //     );
  //   queryClient.clear();
  //   toast({
  //     title:
  //       'Your registration was not approved. Please check your email for details regarding the rejection',
  //     status: 'error',
  //     duration: 2500,
  //     isClosable: true,
  //     position: 'top-right',
  //   });
  //   router.push('/auth/onboarding');
  // }


  return (
    <>
      <Stack w="100%" minH="100vh" spacing={10} bg={bg || '#FAFAFA'} h="full">
        <Box w="full">
          <LayoutNavbar
            openmanageApp={openmanageApp}
            isPending={false}
            activePage={activePage}
          />
          {noSubNav ? null : (
            <LayoutNavigation
              tabPanelStyle={tabPanelStyle}
              isPending={false}
              manageroles
              activePage={activePage}
              {...restProps}
            >
              <Stack
                maxW="1500px"
                mx="auto"
              >
                {children}
              </Stack>
            </LayoutNavigation>
          )}
        </Box>
      </Stack>
    </>
  );
}

export default LayoutView;
