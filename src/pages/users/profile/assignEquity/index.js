import React, {useState} from 'react';
import {useMutation} from '@tanstack/react-query';
import {
  Box,
  Container,
  extendTheme,
  HStack,
  SimpleGrid,
  ButtonGroup,
  Icon,
  Text,
  Flex,
  Spinner,
  useToast,
  Button as ChakraBtn,
  AbsoluteCenter,
} from '@chakra-ui/react';

import {createCustomerEquity} from '/src/apis/customers';

import {useFetchAllListings} from 'ui-lib/ui-lib.hooks/useFetchAllListings';
import {useFetchListingBundles} from 'ui-lib/ui-lib.hooks/useFetchListingBundles';
import {AddIcon, SmallCloseIcon} from '@chakra-ui/icons';
import {Formik, Form, FieldArray} from 'formik';

import {handleEmptySubmittedValues} from '/src/utils/removeEmptyObjectValues';

import {useRouter} from 'next/router';

import PaymentPlan from 'pages/users/create_account/CustomerListingDetails/CustomerListingDetails.PaymentPlan/PaymentPlan';
import SelectAListting from 'pages/users/create_account/CustomerListingDetails/SelectAListting';
import SelectAUnit from 'pages/users/create_account/CustomerListingDetails/SelectAUnit';
import {AnimatedLoader, LayoutView} from '@/components/index';
import UploadEquityPackets from 'pages/users/create_account/CustomerListingDetails/UploadEquityPackets';
import SelectDeeductionType, {
  SelectAllocation,
} from 'pages/users/create_account/CustomerListingDetails/SelectDeeductionType';
import AddClosingCost from 'pages/users/create_account/CustomerListingDetails/closingCost';
import {BackArrowWithText} from '@/components/assets/BackArrow';
import AssignAgentInput from 'ui-lib/ui-lib.components/Input/assignAgent';

export default function ListingDetails() {
  const toast = useToast();
  const router = useRouter();

  const query = 'assign=true'; //identifier to filter sold out properties
  const {listingInfo, isLoading, isError} = useFetchAllListings(query);
  const [selectedListingId, setSelectedListingId] = useState('');
  const [equityPacket, setEquityPacket] = useState('');
  const [equityPacketName, setEquityPacketName] = useState('');
  const [isAgentEmail, setIsAgentEmail] = useState([{loading: false, available: true}]);
  const {
    listingBundles,
    isLoading: isUnitLoading,
    isError: isUnitError,
  } = useFetchListingBundles(selectedListingId, query);

  const customerID = router.query.customer_id;
  const userId = router.query.user_id;

  const handleBack = () => {
    router.back(-1);
  };
  const mutation = useMutation(formData => createCustomerEquity(formData), {
    onSuccess: res => {
      toast({
        title: `Sucessfully Updated`,
        status: 'success',
        duration: 8000,
        isClosable: true,
        position: 'top-right',
      });

      router.push(`/users/profile?userId=${userId}`);
    },
    onError: err => {
      toast({
        title: 'Oops ...',
        description: `${
          err?.response?.status === 500
            ? "Apologies for the inconvenience. We're working on it. Please try again later."
            : err?.response?.status === 401
              ? 'Authentication Timeout: For security reasons, your session has timed out. Please log in again to continue.'
              : (err?.response?.data?.message ??
                err?.response?.message ??
                err?.message ??
                'Something went wrong')
        }`,
        status: 'error',
        duration: 8000,
        isClosable: true,
        position: 'top-right',
      });
    },
  });

  // Formik
  const EQUITY_INFO = {
    project_id: '',
    agent_assigned: null,
    bundle: {
      id: '',
      payment_class: 'outright',
      outright: [
        {
          amount: '',
          payment_date: '',
          payment_type: 'outright',
        },
      ],
      paymentplan: {
        payments: [
          {
            amount: '',
            payment_date: '',
            payment_type: 'past-payment',
          },
        ],
        upcomings: [
          {
            amount: '',
            payment_date: '',
            payment_type: 'upcoming-payment',
          },
        ],
      },
      payment_period_in_months: 0,
      deduct_from: 'available',
      closing_costs: [],
    },
    packets: [],
  };
  const initialValues = {
    customer_id: customerID,
    user_id: userId,
    equities: [{...EQUITY_INFO}],
  };

  const getProject = projId => listingInfo && listingInfo?.filter(item => item?.id == projId);
  const getUnit = unitId => listingBundles && listingBundles?.filter(item => item?.id == unitId);

  const handleSelectProject = (eqty, val, index) => {
    if (eqty?.project_id !== '') {
      setSelectedListingId(val?.equities[index]?.project_id);
    }
  };

  const isValidToProceed = val => {
    if (!val?.equities?.length) return false;

    const areEquitiesValid = val.equities.every((equity, idx) => {
      const {bundle} = equity;

      // validate agent email

      const isAgentEmailValid = isAgentEmail?.[idx]?.available && !isAgentEmail?.[idx]?.loading;

      // Validate closing costs
      const closingCosts = bundle?.closing_costs || [];
      const isClosingCostInfoValid = closingCosts.length
        ? closingCosts.every(cost => cost.name?.trim() && Number(cost.amount)) ||
          (closingCosts.length === 1 &&
            !Number(closingCosts[0]?.amount) &&
            !closingCosts[0]?.name?.trim())
        : true;

      const listingHasBeenSelected = !!equity?.project_id;
      const packetHasBeenSelected = !!equity?.packets?.length;
      const unitHasBeenSelected = !!bundle?.id;
      const paymentPlanDuration =
        bundle?.payment_class === 'outright' || !!bundle?.payment_period_in_months;

      if (bundle?.payment_class === 'outright') {
        const outrightPayments = bundle?.outright || [];
        const isOutrightPaymentInfoValid = outrightPayments.every(
          payment => payment.payment_date && Number(payment.amount)
        );

        return (
          isOutrightPaymentInfoValid &&
          isClosingCostInfoValid &&
          listingHasBeenSelected &&
          unitHasBeenSelected &&
          isAgentEmailValid &&
          // packetHasBeenSelected &&
          paymentPlanDuration
        );
      }

      // Custom payment validation
      if (bundle?.payment_class === 'custom') {
        const pastPayments = bundle?.paymentplan?.payments || [];
        const upcomingPayments = bundle?.paymentplan?.upcomings || [];

        const isPastPaymentInfoValid = pastPayments.length
          ? pastPayments.every(payment => Number(payment.amount) && payment.payment_date)
          : false;

        const isIncomingPaymentInfoValid = upcomingPayments.length
          ? upcomingPayments.every(payment => Number(payment.amount) && payment.payment_date) ||
            (upcomingPayments.length === 1 &&
              !Number(upcomingPayments[0]?.amount) &&
              !upcomingPayments[0]?.payment_date)
          : true;

        return (
          isPastPaymentInfoValid &&
          isIncomingPaymentInfoValid &&
          isClosingCostInfoValid &&
          listingHasBeenSelected &&
          unitHasBeenSelected &&
          isAgentEmailValid &&
          // packetHasBeenSelected &&
          paymentPlanDuration
        );
      }

      return false;
    });

    return areEquitiesValid;
  };

  return (
    <LayoutView
      maxW="full"
      tabPanelStyle={{px: '0px', pb: '0px'}}
      px="0px"
      pb="30px"
      activePage={'users'}
    >
      <HStack
        px={{base: `16px`, xl: '0px'}}
        mx="auto"
        mt={`clamp(52px,calc(10.4vh + 40px),82px)`}
        maxW="1100px"
        w="full"
        mb="30px"
      >
        <BackArrowWithText handleClick={handleBack} text="Back" mt="2vh" />
      </HStack>
      <Box px={{base: `16px`, xl: '78px'}} mx="auto" w="full" position={'relative'}>
        {isLoading || !getProject.length ? (
          <AbsoluteCenter mt="20vh">
            <AnimatedLoader />
          </AbsoluteCenter>
        ) : isError ? (
          toast({
            title: 'Request failed',
            description: `An error occured while fetching your listings`,
            status: 'error',
            duration: 3000,
            isClosable: true,
            position: 'top-right',
          })
        ) : getProject.length ? (
          <Container
            p="36px"
            pr={{md: '60px', xl: '123.83px'}}
            pl={{md: '50px', xl: '105.62px'}}
            maxW="1100px"
            color="gray.900"
            borderRadius="16px"
            border="1px solid #E4E4E4"
            background="#FFFFFF"
          >
            <div>
              <Formik
                initialValues={initialValues}
                onSubmit={async values => {
                  // handling a situation upcoming payments isnt filled
                  const val = {
                    ...values,
                    customer_id: customerID,
                    user_id: userId,

                    equities: values.equities.map(item => {
                      return {
                        ...item,
                        bundle: {
                          ...item.bundle,
                          closing_costs:
                            item?.bundle?.closing_costs.length === 1 &&
                            !Number(item?.bundle?.closing_costs?.[0]?.amount) &&
                            !item?.bundle?.closing_costs?.[0]?.name?.trim()
                              ? []
                              : item?.bundle?.closing_costs,
                          paymentplan: {
                            ...item.bundle.paymentplan,
                            upcomings:
                              item?.bundle?.paymentplan?.upcomings.length === 1 &&
                              !Number(item?.bundle?.paymentplan?.upcomings?.[0]?.amount) &&
                              !item?.bundle?.paymentplan?.upcomings?.[0]?.payment_date
                                ? []
                                : item?.bundle?.paymentplan?.upcomings,
                          },
                        },
                      };
                    }),
                  };

                  handleEmptySubmittedValues(val.equities);
                  mutation.mutate(val);
                }}
              >
                {({values, setFieldValue}) => (
                  <Form>
                    <FieldArray name="equities">
                      {({insert, remove, push}) => (
                        <>
                          <div>
                            {values.equities.length > 0 &&
                              values?.equities?.map((equity, index) => (
                                <Box key={index} w="full" position="relative">
                                  {index > 0 && (
                                    <HStack justify="space-between" w="full" mb={5} mt={8}>
                                      <Icon
                                        position="absolute"
                                        right={-6}
                                        onClick={() => {
                                          remove(index);
                                        }}
                                        as={SmallCloseIcon}
                                        cursor="pointer"
                                        width="30px"
                                        height="30px"
                                        alt="cancel_icon"
                                        color="red"
                                      />
                                    </HStack>
                                  )}
                                  <SimpleGrid spacingX="26px" columns={2}>
                                    <SelectAListting
                                      handleSelectProject={handleSelectProject}
                                      eqty={equity}
                                      setFieldValue={setFieldValue}
                                      val={values}
                                      listingInfo={listingInfo}
                                      index={index}
                                    />
                                    <SelectAUnit
                                      isLoading={isUnitLoading}
                                      isError={isUnitError}
                                      setFieldValue={setFieldValue}
                                      listingBundles={listingBundles}
                                      index={index}
                                    />
                                  </SimpleGrid>

                                  {/* <ListingInfo
                                  isCustomerCreation
                                  mt="30px"
                                  mb="50px"
                                  listing={getProject(equity?.project_id)}
                                  units={getUnit(equity?.bundle?.id)}
                                  index={index + 1}
                                /> */}

                                  <Flex justify={'space-between'} w="full" mt="30px">
                                    {getUnit(equity?.bundle?.id)?.[index]?.total_archive ? (
                                      <SelectDeeductionType index={index} />
                                    ) : null}
                                    {getUnit(equity?.bundle?.id)?.[index]?.has_allocations ==
                                    true ? (
                                      <SelectAllocation
                                        index={index}
                                        Unit={getUnit(equity?.bundle?.id)?.[index]}
                                        allocationSrc={
                                          values?.equities?.[index]?.bundle?.deduct_from
                                        }
                                      />
                                    ) : null}
                                  </Flex>

                                  <Text
                                    fontWeight={'500'}
                                    fontSize="14px"
                                    color="#191919"
                                    ml={0}
                                    mb="8px"
                                    mt="24px"
                                  >
                                    Select payment type
                                  </Text>

                                  <PaymentPlan
                                    values={values}
                                    index={index}
                                    equity={equity}
                                    setFieldValue={setFieldValue}
                                  />

                                  <AddClosingCost
                                    index={index}
                                    equity={equity}
                                    setFieldValue={setFieldValue}
                                  />

                                  <UploadEquityPackets
                                    index={index}
                                    equity={equity}
                                    setFieldValue={setFieldValue}
                                    setEquityPacket={setEquityPacket}
                                    labelStyle={{
                                      fontSize: '11.359px',
                                      color: '#191919',
                                      marginBottom: '0px',
                                    }}
                                    docUploadStyle={{
                                      spacing: '6.49px',
                                      align: 'start',
                                    }}
                                    selectDocStyle={{
                                      wrapperStyle: {
                                        h: '40.568px',
                                        w: '390px',
                                        borderRadius: ' 6.491px',
                                      },
                                      uploadBtnStyle: {fontSize: '12px', textAlign: 'center'},
                                      emptyStateTextStyle: {
                                        fontSize: '14px',
                                      },
                                    }}
                                    selectedDocStyle={{
                                      wrapper: {
                                        h: '40.568px',
                                        w: '390px',
                                        borderRadius: ' 6.491px',
                                      },
                                      DocImgWrapper: {p: ' 6.491px'},
                                      DocImg: {boxSize: '12.98px'},
                                      text: {
                                        fontSize: '12.982px',
                                      },
                                    }}
                                    equityPacket={equityPacket}
                                    equityPacketName={equityPacketName}
                                    setEquityPacketName={setEquityPacketName}
                                  />
                                  <AssignAgentInput
                                    equity={equity}
                                    index={index}
                                    setIsAgentEmail={setIsAgentEmail}
                                    setFieldValue={setFieldValue}
                                    fieldName={`equities.${index}.agent_assigned`}
                                  />
                                </Box>
                              ))}

                            <HStack pt="79px" w="full" justify="flex-end" gap="21px">
                              <ButtonGroup isAttached variant="outline">
                                <ChakraBtn
                                  mt="0px"
                                  justify="center"
                                  h="44px"
                                  cursor="pointer"
                                  color="#4545FE"
                                  fontFamily="Euclid Circular B"
                                  fontSize="14px"
                                  fontStyle="normal"
                                  fontWeight="400"
                                  lineHeight="normal"
                                  variant="outline-radius"
                                  w="238px"
                                  // borderRadius="8px"
                                  border="1px solid #4545FE"
                                  background="rgba(69, 69, 254, 0.00)"
                                  onClick={() => {
                                    push({...EQUITY_INFO});
                                    setIsAgentEmail(prev => [
                                      ...prev,
                                      {loading: false, available: true},
                                    ]);
                                  }}
                                >
                                  <Icon alignSelf="center" as={AddIcon} mr="4px" />
                                  <Text
                                    fontSize="14px"
                                    fontStyle="normal"
                                    fontWeight="400"
                                    lineHeight="normal"
                                  >
                                    {' '}
                                    Add another unit
                                  </Text>
                                </ChakraBtn>
                              </ButtonGroup>
                              <ChakraBtn
                                isDisabled={!isValidToProceed(values) || mutation.isLoading}
                                w="239px"
                                fontSize="14px"
                                fontWeight="400"
                                bg="#4545FE"
                                h="44px"
                                color="#ffffff"
                                variant="outline-radius"
                                _focus={{opacity: 1}}
                                _hover={{
                                  opacity: 1,
                                  _disabled: {
                                    opacity: '0.4',
                                  },
                                }}
                                // borderRadius={'8px'}

                                type="submit"
                              >
                                {mutation.isLoading ? <Spinner color="white" /> : 'Proceed'}
                              </ChakraBtn>
                            </HStack>
                          </div>
                        </>
                      )}
                    </FieldArray>
                  </Form>
                )}
              </Formik>
            </div>
          </Container>
        ) : (
          <AnimatedLoader />
        )}
      </Box>
    </LayoutView>
  );
}
