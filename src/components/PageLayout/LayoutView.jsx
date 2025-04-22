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

  const developerStatusQuery = useQuery(['developerApprovalStatus'], fetchDevelopersStatus, {
    enabled: false,
  });

  // USER APPROVAL ACTIONS
  const IS_DEVELOPER_APPROVED = developerStatusQuery?.data?.data?.status;

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
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if (refetchCount < maxRefetchCount) {
        developerStatusQuery.refetch();
        setRefetchCount(prevCount => prevCount + 1);
      } else {
        clearInterval(intervalRef.current);
      }
    }, 10000); // Poll every 10 seconds

    return () => clearInterval(intervalRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [developerStatusQuery.refetch, refetchCount]);

  // USER's PENDING STATE
  const defaultUserObj = {initial_status: 'Pending'};
  const [{initial_status}] = useLocalStorage('loggedinUser', defaultUserObj);

  const IS_INITIAL_STATUS_PENDING = initial_status !== 'Accepted' ? true : false;

  // PAGE_MATCTH : THESE PAGES SHOULD BE ACCESSIBLE TO THE USER WHETHER STATUS IS PENDING OR NOT
  const matchPagesForPendingStatus = ['/veerge_menu/support_center', '/billing#', '/billing'];
  const IS_ACCESSIBLE_FOR_NEW_USERS = matchPagesForPendingStatus?.includes(router.asPath);

  const isStatusPending =
    IS_INITIAL_STATUS_PENDING && IS_ACCESSIBLE_FOR_NEW_USERS
      ? IS_INITIAL_STATUS_PENDING || IS_ACCESSIBLE_FOR_NEW_USERS
      : IS_INITIAL_STATUS_PENDING;

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
              // children={children}
              activePage={activePage}
              {...restProps}
            >
              <Stack
                maxW="1500px"
                mx="auto"
                // className="main-app"
              >
                {children}
              </Stack>
            </LayoutNavigation>
          )}
        </Box>
        <Link
          zIndex={1000}
          pos="fixed"
          right="2%"
          bottom="calc(3.2% + 65px )"
          as="a"
          href={`mailto:hello@myxellia.io`}
        >
          <IconButton
            // pos="fixed"
            // bottom="calc(3.2% + 65px )"
            variant="unstyled"
            // zIndex={2444}

            // right="2%"
            icon={<Image src={chatIcon.src} alt="chat icon" />}
          />
        </Link>

        {/* <HStack
          zIndex={2444}
          pos="fixed"
          bottom={0}
          w="full"
          borderTop="0.5px solid #e5e5e5"
          bg="#ffffff"
          h="23px"
          justify="center"
        >
          <Text color="#737373" fontSize="12px" fontWeight="400">
            Powered by Myxellia | Veerge is a product of Myxellia Inc.
          </Text>
        </HStack> */}
      </Stack>
    </>
  );
}

export default LayoutView;
