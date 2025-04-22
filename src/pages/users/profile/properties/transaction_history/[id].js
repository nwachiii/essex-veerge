import {Box, Container, Heading, HStack, Image, Stack, Text, useToast} from '@chakra-ui/react';
import React from 'react';
import {useRouter} from 'next/router';
import {useQuery} from '@tanstack/react-query';
import {themeStyles} from '../../../../../theme';
import backArrow from '../../../../../images/icons/back-arrow.png';
import {MatadorCustomTable} from '../../../../../components/common/Table';
import {TRANSACTION_HISTORY_COLUMNS} from '../../../../../constants/customers';
import {fetchCustomersEquityTxns} from '../../../../../apis/customers';
import {AnimatedLoader} from '../../../../../components/common/loaders';
import {LayoutView} from '../../../../../components/PageLayout/LayoutView';

export default function TransactionHistory() {
  const router = useRouter();
  const {query} = useRouter();
  const toast = useToast();
  const TxnData = useQuery(['customerEquityTxns', query?.id], () =>
    fetchCustomersEquityTxns(query?.userId)
  );

  // console.log('CustomerTxn', TxnData?.data?.data?.data);

  if (TxnData.isLoading) {
    return <AnimatedLoader />;
  }
  if (TxnData.isError) {
    return toast({
      title: 'An error occured',
      description: `Please try again...`,
      status: 'error',
      duration: 8000,
      isClosable: true,
      position: 'top-right',
    });
  }

  const handleBack = () => {
    router.back(-1);
  };
  return (
    <LayoutView activePage={'users'}>
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
        // mt={'14vh'}
        w="full"
        maxW="1284px"
        spacing={'53px'}
        justify="space-evenly"
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
          COLUMNS={TRANSACTION_HISTORY_COLUMNS(TxnData?.data?.data?.data)}
          DATA={TxnData?.data?.data?.data}
        />
      </Stack>
    </LayoutView>
  );
}
