import React from 'react';
import {useRouter} from 'next/router';
import {themeStyles} from '../../../../theme';
import {useQuery} from '@tanstack/react-query';
import backArrow from '/src/images/icons/back-arrow.png';
import {fetchListingTxns} from '../../../../apis/listings';
import {AnimatedLoader, LayoutView} from '../../../../components';
import {MatadorCustomTable} from '../../../../components/common/Table';
import {TRANSACTION_HISTORY_COLUMNS} from '../../../../constants/listings/TransactionHistoryData';
import {Heading, HStack, Image, Stack, useToast} from '@chakra-ui/react';

export default function TransactionHistory() {
  const toast = useToast();
  const router = useRouter();
  const {query} = useRouter();
  const {data, isError, isLoading} = useQuery(['listingTxns', query.id], () =>
    fetchListingTxns(query.id)
  );
  if (isLoading) {
    return <AnimatedLoader />;
  }
  if (isError) {
    return toast({
      title: 'Request failed',
      description: `An error occured while fetching`,
      status: 'error',
      duration: 3000,
      isClosable: true,
      position: 'top-right',
    });
  }

  console.log('listingTxnsss', data && data?.data);
  const listingTxns = data && data?.data;

  const handleBack = () => {
    router.back(-1);
  };

  const goToCustomerProfilePage = () => {
    showProgress(true);
    router.push(`/residents/manage/${listingTxns?.user?.id}`);
  };
  return (
    <LayoutView activePage={'customers'}>
      <HStack onClick={handleBack} my="35px">
        <Image
          style={{cursor: 'pointer'}}
          mr={2}
          height="50px"
          src={backArrow.src}
          alt="back_arrow"
        />
        <Heading {...themeStyles.textStyles.h3}>Back</Heading>
      </HStack>
      <Stack
        mx="auto"
        maxW="1284px"
        spacing={'53px'}
        justify="space-between"
        direction={{base: 'column', md: 'row'}}
      >
        {/* <Box {...themeStyles.customerProfileCard} w='371px' h='515px' p='29px'>
					<HStack w='full' align='center' mb={4} justify='space-between'>
						<Image src={avatarSm.src} boxSize='48px' />
						<Text fontWeight='500'>Daniel Tanay</Text>
						<Button variant='primary' onClick={handleBack} w='113px' h='48px' mt={0}>
							Profile
						</Button>
					</HStack>
					<Image src={avatar.src} w='314px' h='320px' />
					<Box>
						<Text fontSize='32px' fontWeight={600}>
							Astrid
						</Text>
						<Text fontSize='14px'>Construction status</Text>
					</Box>
				</Box> */}
        <MatadorCustomTable
          maxW="885px"
          minW="fit-content"
          COLUMNS={TRANSACTION_HISTORY_COLUMNS(listingTxns)}
          DATA={listingTxns}
        />
      </Stack>
    </LayoutView>
  );
}
