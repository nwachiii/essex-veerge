import React, {useEffect} from 'react';
import {useRouter} from 'next/router';
import backArrow from '../../../images/icons/back-arrow.png';
import {AnimatedLoader} from '../../../components/common/loaders/AnimatedLoader';
import {LayoutView} from '../../../components/PageLayout/LayoutView';
import {
  Heading,
  HStack,
  Stack,
  Image,
  Box,
  useToast,
  Flex,
  Center,
  Text,
  AbsoluteCenter,
} from '@chakra-ui/react';
import {themeStyles} from '../../../theme';
import {CustomerProperties} from './properties';
import {useQuery} from '@tanstack/react-query';
import {scrollBarStyles} from '../../../components/common/ScrollbarStyling';
import {fetchAllCustomers, fetchOneCustomer} from '../../../apis/customers';
import {CustomerBasicInfo} from '../../../components/Customers/BasicInfo';
import {BaseURL_TWO} from '../../../constants/routes';
import PageLoader from '../../../components/PageLayout/PageLoader';
import axios from 'utils/axiosInstance';

export const SingleCustomerPage = ({abc}) => {
  // console.log('HEEYY THERE', abc);
  const router = useRouter();
  const toast = useToast();
  // const {id} = router?.query;
  // const UniqueCustomer = useQuery(['customer-profile', id], async () => await fetchOneCustomer(id));

  // const handleBack = () => {
  // 	router.back(-1);
  // };

  // if (router.isFallback) {
  // 	return <PageLoader />;
  // }

  // useEffect(() => {}, [id]);

  // console.log('ffff', customer);

  return (
    <Box bg="#FAFAFA" mx="auto" minH="100vh">
      {/* <LayoutView activePage={'users'} position='relative' />
			<Box mt='-82vh'>
				{UniqueCustomer?.isLoading ? (
					<AnimatedLoader />
				) : UniqueCustomer?.isError ? (
					toast({
						title: 'An error occured fetching user profile',
						status: 'error',
						duration: 5000,
						isClosable: true,
						position: 'top-right',
					})
				) : (
					<Stack position={'relative'} zIndex={1200} mx='auto' mt={'54px'} columns={2} maxW='1284px' spacing={'56px'} justify='flex-end' direction={{base: 'column', md: 'row'}}>
						<Box pr={3} pb='67px' top='16%' position={'fixed'} left='6%' overflowY={'scroll'} css={scrollBarStyles} bottom='0'>
							<HStack onClick={handleBack} mb={4}>
								<Image style={{cursor: 'pointer'}} mr={2} height='50px' src={backArrow.src} alt='back_arrow' zIndex={1200} />
								<Heading {...themeStyles.textStyles.h3}>Back</Heading>
							</HStack>
							<CustomerBasicInfo referral={UniqueCustomer?.data?.data?.referred_by} customerInfo={UniqueCustomer?.data?.data?.user_info} />
						</Box>
						<Flex maxW='888px' pl='31px' minH='100vh'>
							<CustomerProperties id={UniqueCustomer?.id} customerInfo={UniqueCustomer?.data?.data} />
						</Flex>
					</Stack>
				)}
			</Box> */}
      <AbsoluteCenter maxW="750px" mx="auto" w="full" h="45%">
        <Text fontSize={'43px'} textAlign={'center'}>
          This page is currently undergoing maintenance... Would be back up in less than an hour.
          Thanks for your patience!
        </Text>
      </AbsoluteCenter>
    </Box>
  );
};

export default SingleCustomerPage;

async function getData() {
  const res = await fetch('https://api.matadortrust.com/v2/developers/customers/', {
    cache: 'no-store',
  });
  return res.json();
}

// export async function getStaticProps() {
// 	const res = await fetchAllCustomers();
// 	const abc = await res.json();

// 	return {props: {abc}};
// }
