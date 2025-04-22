import {
  Box,
  Container,
  Flex,
  HStack,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react';
import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {useQuery} from '@tanstack/react-query';
import PaymentPlanSummary from '../../../../components/Cards/PaymentPlanSummary';
import {AnimatedLoader, LayoutView} from '../../../../components';
import PageHeader from '../../../../components/common/PageHeader';
import {BackArrowWithText} from '/src/components/assets/BackArrow';
import {getAccountPastPayments, getUserPaymentBreakdown} from '../../../../apis/account';
import ListingInfo from '../../../users/create_account/CustomerAccountSummary/ListingInfo';
import CoownershipHeader, {UpcomingPaymentsHeader, UserHeader} from './header';
import UserTransactionSummary from './userTransactionSummary';
import {Button} from '../../../../ui-lib';
import {AiOutlineMenu} from 'react-icons/ai';
// import UploadHomeOwnerPackets from './home_owner_packets/UploadHomeOwnerPackets';
import suspend_icon from '/src/images/icons/suspend_icon.svg';
import terminate_icon from '/src/images/icons/terminate_icon.svg';
import refund_icon from '/src/images/icons/refund_icon.svg';
// import project_upload_icon from '/src/images/icons/Upload.svg';
// import ViewHomeOwnerPackets from './home_owner_packets/ViewHomeOwnerPackets';
import {fetchCustomerVirtualAccountNumber} from '../../../../apis/customers';
import emptyIcon from '/src/images/icons/emptyIcon.png';
import {RxCross1} from 'react-icons/rx';
import view_packet_icon from '/src/images/icons/view_packeet.svg';

export const UserPaymentBreakDown = () => {
  const toast = useToast();
  const router = useRouter();
  const [recurring, setRecurring] = useState(false);
  const {id} = router?.query;
  const {user} = router?.query;

  const ACCOUNT_PAYMENT_DETAILS = useQuery(['get-upcoming-details', id], () =>
    getUserPaymentBreakdown(id, `?recurring=${recurring}&user=${user}`)
  );
  const ACCOUNT_PAST_PAYMENTS = useQuery(['get-past-payments', id], () =>
    getAccountPastPayments(id)
  );
  const VIRTUAL_ACCOUNT_NUMBER = useQuery(['get-account-number', id], () =>
    fetchCustomerVirtualAccountNumber(id)
  );

  const paymentData = ACCOUNT_PAYMENT_DETAILS?.data?.data?.data;
  const pastPayment = ACCOUNT_PAST_PAYMENTS?.data?.data;

  const ACCOUNT_DETAILS = VIRTUAL_ACCOUNT_NUMBER?.data?.data?.data?.details;

  console.log('Equity check =>', pastPayment, paymentData?.[0]?.equity);

  const EQUITY_DATA = pastPayment?.length ? pastPayment : paymentData;

  useEffect(() => {
    setRecurring(pastPayment && pastPayment[0]?.equity?.auto_debit);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <LayoutView>
      <PageHeader pageTitle="Outstanding Balance | customer payment breakdown" />
      {ACCOUNT_PAYMENT_DETAILS.isLoading ? (
        <Flex direction="column" w="full" h="full" justify="center" align="center">
          <VStack h="45vh">
            <AnimatedLoader />
          </VStack>
        </Flex>
      ) : ACCOUNT_PAYMENT_DETAILS.isError ? (
        toast({
          duration: 5000,
          status: 'error',
          isClosable: true,
          position: 'top-right',
          title: 'An error occured',
        })
      ) : pastPayment ? (
        <Box position="relative" mt="11vh">
          <Flex w="full" justify={'space-between'}>
            <BackArrowWithText text="Back" />

            <Menu>
              {({isOpen}) => (
                <>
                  <MenuButton mt="15px">
                    {!isOpen ? (
                      <AiOutlineMenu style={{color: '#4545FE', fontSize: '30px'}} />
                    ) : (
                      <RxCross1 style={{color: '#4545FE', fontSize: '30px'}} />
                    )}
                  </MenuButton>
                  <MenuList mt="24px">
                    <MenuItem>
                      <HStack p="1.2em" spacing="20px">
                        <Image alt="" w="20px" h="23px" src={view_packet_icon.src} />

                        <Text color="#191919" fontSize="16px" fontWeight={500}>
                          {`Home owner's packet`}
                        </Text>
                      </HStack>
                    </MenuItem>

                    {/* Ahmed asked that the two menu items below be replaced with thee above and have it open up a drawer just like it works on the web-store  */}

                    {/* <MenuItem>
											<ViewHomeOwnerPackets id={id} />
										</MenuItem>
										<MenuItem>
											<UploadHomeOwnerPackets userId={user} id={id} />
										</MenuItem> */}
                    {/* <MenuItem bg='#F4F4F4' opacity='0.3'>
											<HStack cursor={'not-allowed'} p='1.2em' spacing='20px'>
												<Image w='23px' h='24px' src={project_upload_icon.src} />
												<Text color='#191919' fontSize='16px' fontWeight={500}>
													{`Upload project report`}
												</Text>
											</HStack>
										</MenuItem> */}

                    <MenuItem bg="#F4F4F4" opacity="0.3" cursor={'not-allowed'}>
                      <HStack p="1.2em" spacing="20px">
                        <Image alt="" w="23px" h="23px" src={suspend_icon.src} />
                        <Text color="#191919" fontSize="16px" fontWeight={500}>
                          {`Suspend`}
                        </Text>
                      </HStack>
                    </MenuItem>

                    <MenuItem bg="#F4F4F4" opacity="0.3" cursor={'not-allowed'}>
                      <HStack p="1.2em" spacing="20px">
                        <Image alt="" boxSize={'23px'} src={terminate_icon.src} />
                        <Text color="#191919" fontSize="16px" fontWeight={500}>
                          {`Terminate`}
                        </Text>
                      </HStack>
                    </MenuItem>

                    <MenuItem bg="#F4F4F4" opacity="0.3" cursor={'not-allowed'}>
                      <HStack p="1.2em" spacing="20px">
                        <Image alt="" w="20px" h="23px" src={refund_icon.src} />
                        <Text color="#191919" fontSize="16px" fontWeight={500}>
                          {`Refund`}
                        </Text>
                      </HStack>
                    </MenuItem>
                  </MenuList>
                </>
              )}
            </Menu>
          </Flex>
          <Container
            mt="25px"
            p="12"
            bg="#FFFFFF"
            maxW={'7xl'}
            color="gray.900"
            borderRadius="2xl"
            boxShadow="0px 4px 8px rgba(0, 0, 0, 0.02)"
          >
            {pastPayment?.length !== 0 || paymentData?.length !== 0 ? (
              <Box w="full">
                {paymentData[0]?.equity?.co_owners?.length > 0 ||
                paymentData[0]?.equity?.co_owners?.length > 0 ? (
                  <CoownershipHeader pastPayment={EQUITY_DATA} />
                ) : (
                  <UserHeader ACCOUNT_DETAILS={ACCOUNT_DETAILS} pastPayment={EQUITY_DATA} />
                )}

                {pastPayment && <ListingInfo my="35px" noQty listing={EQUITY_DATA[0]?.equity} />}
                <UserTransactionSummary pastPayment={EQUITY_DATA} />
                <HStack spacing={'21px'} w="full" justify={'space-between'}>
                  <Text mb="15px" fontWeight={500} fontSize="xl" ml={2}>
                    Previous payments
                  </Text>
                  {paymentData[0]?.equity?.co_owners?.length > 0 ? (
                    <Button
                      mb={4}
                      mt={0}
                      onClick={() =>
                        router.push(
                          `/dashboard/outstanding-balance/user_payment/individual_payment/?id=${id}&user=${user}`
                        )
                      }
                      variant="primary"
                      w="213px"
                      h="44px"
                      borderRadius="12px"
                      bg="#4545FE"
                    >
                      View Individual Payment
                    </Button>
                  ) : null}
                </HStack>
                {pastPayment.length > 0 ? (
                  pastPayment?.map((item, index) => (
                    <div key={index}>
                      <PaymentPlanSummary my={0} data={[item]} />
                    </div>
                  ))
                ) : (
                  <VStack spacing={8} mx="auto" w="full" h="full" py="100px">
                    {/* <ImFilesEmpty style={{height: '70px', width: '75px', color: '#606060'}} /> */}
                    <Image alt="empty table icon" src={emptyIcon.src} />
                    <Text w="full" textAlign="center" fontSize="1em" mx="auto">
                      No payments made yet...
                    </Text>
                  </VStack>
                )}

                <UpcomingPaymentsHeader pastPayment={pastPayment} paymentData={paymentData} />
                {paymentData.length > 0
                  ? paymentData?.map((item, index) => (
                      <Box key={index}>
                        <PaymentPlanSummary my={0} data={[item]} />
                      </Box>
                    ))
                  : null}
              </Box>
            ) : (
              <VStack spacing={8} mx="auto" w="full" h="full" py="100px">
                {/* <ImFilesEmpty style={{height: '70px', width: '75px', color: '#606060'}} /> */}
                <Image alt="empty table icon" src={emptyIcon.src} />
                <Text
                  w="full"
                  textAlign="center"
                  mx="auto"
                  bgGradient="linear(to-r, #FF008A, #4545FE, #4545FE)"
                  bgClip="text"
                  fontSize="xl"
                  fontWeight="bold"
                >
                  This user has no active payment record
                </Text>
              </VStack>
            )}
          </Container>
        </Box>
      ) : null}
    </LayoutView>
  );
};

export default UserPaymentBreakDown;
