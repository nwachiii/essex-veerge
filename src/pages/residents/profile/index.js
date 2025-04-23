import {useRouter} from 'next/router';
import backArrow from '../../../images/icons/back-arrow.png';
import {AnimatedLoader} from '../../../components/common/loaders/AnimatedLoader';
import {LayoutView} from '../../../components/PageLayout/LayoutView';
import {Heading, HStack, Stack, Image, Box, useToast, Flex} from '@chakra-ui/react';

import {themeStyles} from '../../../theme';
import {CustomerProperties} from './properties';
import {useQuery} from '@tanstack/react-query';
import {scrollBarStyles} from '../../../components/common/ScrollbarStyling';
import {fetchOneCustomer} from '../../../apis/customers';
import {CustomerBasicInfo} from '../../../components/Customers/BasicInfo';
import PageLoader from '../../../components/PageLayout/PageLoader';
import {useSmallerLaptopsBreakpoint} from 'ui-lib/ui-lib.hooks';

const customScroll = {
  '&::-webkit-scrollbar': {
    display: 'none',
  },

  scrollbarWidth: 'none',
};
export const SingleCustomerPage = ({userId}) => {
  const router = useRouter();
  const toast = useToast();
  const UniqueCustomer = useQuery(
    ['individual-customer-profile', userId],
    async () => await fetchOneCustomer(userId)
  );
  const isSmallerLaptop = useSmallerLaptopsBreakpoint();

  const handleBack = () => {
    router.back(-1);
  };

  if (router.isFallback) {
    return <PageLoader />;
  }

  return (
    <Box bg="#FAFAFA" mx="auto" minH="100vh" h={isSmallerLaptop ? '60vh' : ''}>
      <LayoutView
        px={{base: '0px', xl: '30px'}}
        tabPanelStyle={{pb: '0px'}}
        pb="0px"
        activePage={'users'}
        position="relative"
      >
        <Box
          mt="clamp(52px,calc(11.4vh + 40px),96px)"
          px={{base: '0px', xl: '30px'}}
          maxW="full"
          w="full"
          mx="auto"
        >
          {UniqueCustomer?.isLoading ? (
            <Box position="relative" display="grid" placeItems="center" mx="auto" mt="10vh">
              <AnimatedLoader />
            </Box>
          ) : UniqueCustomer?.isError ? (
            toast({
              title: 'An error occured fetching user profile',
              status: 'error',
              duration: 5000,
              isClosable: true,
              position: 'top-right',
            })
          ) : (
            <Stack
              mx="auto"
              columns={2}
              zIndex={700}
              justify="flex-end"
              align="start"
              position={'relative'}
              spacing={{base: '20px', xl: '56px'}}
              direction={{base: 'column', md: 'row'}}
            >
              <Box
                css={customScroll}
                w="full"
                maxW={{base: '300px', lg: '371px'}}
                mx={'auto'}
                top="calc(clamp(52px,calc(11.4vh + 40px),96px) + 44px)"
                position={'sticky'}
                overflowY="auto"
                h="calc(100vh - calc(clamp(52px,calc(11.4vh + 40px),96px) + 44px)) "
              >
                <HStack onClick={handleBack} mb={4}>
                  <Image
                    style={{cursor: 'pointer'}}
                    mr={2}
                    height="50px"
                    src={backArrow.src}
                    alt="back_arrow"
                    zIndex={1200}
                  />
                  <Heading {...themeStyles.textStyles.h3}>Back</Heading>
                </HStack>
                <CustomerBasicInfo
                  referral={UniqueCustomer?.data?.data?.referred_by}
                  customerInfo={UniqueCustomer?.data?.data?.user_info}
                />
              </Box>
              <Box w="full" maxW={{base: '60vw', xl: '888px'}} minH="100vh">
                <CustomerProperties
                  id={UniqueCustomer?.id}
                  refetch={UniqueCustomer.refetch}
                  customerInfo={UniqueCustomer?.data?.data}
                />
              </Box>
            </Stack>
          )}
        </Box>
      </LayoutView>
    </Box>
  );
};

export default SingleCustomerPage;

export async function getServerSideProps(context) {
  const {query} = context;
  const userId = query.userId;

  return {
    props: {
      userId,
    },
  };
}
