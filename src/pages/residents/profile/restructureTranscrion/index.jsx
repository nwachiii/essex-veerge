import {useState} from 'react';
import {useMutation, useQuery} from '@tanstack/react-query';
import {
  Box,
  Icon,
  Text,
  Flex,
  HStack,
  Spinner,
  Divider,
  useToast,
  Container,
  SimpleGrid,
  VStack,
  Image,
  Button,
  AbsoluteCenter,
  Center,
} from '@chakra-ui/react';

import {useFetchAllListings} from 'ui-lib/ui-lib.hooks/useFetchAllListings';
import {useFetchListingBundles} from 'ui-lib/ui-lib.hooks/useFetchListingBundles';
import {SmallCloseIcon} from '@chakra-ui/icons';

import {Formik, Form, FieldArray} from 'formik';

import {handleEmptySubmittedValues} from '/src/utils/removeEmptyObjectValues';

import {useRouter} from 'next/router';

import trashIcon from '/src/images/icons/trash-icon.svg';
import fileIcon from '/src/images/icons/file-icon.svg';

import AddClosingCost from 'pages/residents/create_account/CustomerListingDetails/closingCost';
import {changeDateFormat} from 'utils/formatDate';
import AssignAgentInput from 'ui-lib/ui-lib.components/Input/assignAgent';
import {AnimatedLoader, LayoutView} from '@/components/index';
import PaymentPlan from 'pages/residents/create_account/CustomerListingDetails/CustomerListingDetails.PaymentPlan/PaymentPlan';
import SelectAListting from 'pages/residents/create_account/CustomerListingDetails/SelectAListting';
import SelectAUnit from 'pages/residents/create_account/CustomerListingDetails/SelectAUnit';
import UploadEquityPackets from 'pages/residents/create_account/CustomerListingDetails/UploadEquityPackets';
import SelectDeeductionType, {
  SelectAllocation,
} from 'pages/residents/create_account/CustomerListingDetails/SelectDeeductionType';
import BackBtn from 'pages/account/components/BackBtn';
import {fetchSingleEquityInfo, updateCustomerEquityInfo} from 'apis/customers';
import {InputLabel} from 'ui-lib/ui-lib.components/Input/Input';
import {truncateLongText} from 'utils';

export default function RestructureTrnsaction() {
  const toast = useToast();
  const router = useRouter();
  const {user, equityId} = router?.query;
  const query = `assign=true&equity_id=${equityId}`; //identifier to filter sold out properties

  const [selectedListingId, setSelectedListingId] = useState('');
  const [equityPacket, setEquityPacket] = useState('');
  const [packetView, setPacketView] = useState(Boolean);
  const [equityPacketName, setEquityPacketName] = useState('');
  const {listingInfo, isLoading, isError} = useFetchAllListings(query);
  const [isAgentEmail, setIsAgentEmail] = useState([{loading: false, available: true}]);

  const {
    listingBundles,
    isLoading: isUnitLoading,
    isError: isUnitError,
  } = useFetchListingBundles(selectedListingId, query);
  const EquityID = Number(equityId);
  const SINGLE_EQUITY_QUERY = useQuery(['fetch-equity-info', EquityID], () =>
    fetchSingleEquityInfo(EquityID)
  );

  const SINGLE_EQUITY_INFO = SINGLE_EQUITY_QUERY?.data?.data?.data;

  const customerID = Number(SINGLE_EQUITY_INFO?.equity?.customer?.id);

  const mutation = useMutation(formData => updateCustomerEquityInfo(EquityID, formData), {
    onSuccess: res => {
      // setTimeout(() => {
      //   handleProgress(val => val + 1);

      // }, 2300);
      // localStorage.setItem('equity', JSON.stringify(res.data.data.map(item => item.id)));
      // localStorage.setItem('equityDetails', JSON.stringify(res.data.data));
      toast({
        title: 'Updated successfully',

        status: 'success',
        duration: 8000,
        isClosable: true,
        position: 'top-right',
      });
      router.push(`/residents/profile?userId=${SINGLE_EQUITY_INFO?.equity?.owner?.id}`);
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

  // const incomingpaymentArray = SINGLE_EQUITY_INFO?.upcomings
  //   ? SINGLE_EQUITY_INFO?.upcomings.map((item, idx) => ({
  //       ...item,
  //       payment_date: item.due_date ? changeDateFormat(item.due_date, 'yyyy-mm-dd') : '',
  //       payment_type: 'upcoming-payment',
  //     }))
  //   : []

  // take out fees from the list of upcoming payments .
  const incomingpaymentArray =
    SINGLE_EQUITY_INFO?.upcomings?.flatMap(item => {
      if (!item?.is_fees) {
        return {
          ...item,
          payment_date: item?.due_date ? changeDateFormat(item.due_date, 'yyyy-mm-dd') : '',
          payment_type: 'upcoming-payment',
        };
      }
      return [];
    }) || [];

  const pastPaymentArray = SINGLE_EQUITY_INFO?.transactions
    ? SINGLE_EQUITY_INFO?.transactions?.reverse()?.map((item, idx) => ({
        ...item,
        payment_date: item.created_at ? changeDateFormat(item.created_at, 'yyyy-mm-dd') : '',
        payment_type: 'past-payment',
      }))
    : [];
  // Formik

  const defaultAgentName = `${SINGLE_EQUITY_INFO?.equity?.approved_agent?.first_name ?? ''} ${SINGLE_EQUITY_INFO?.equity?.approved_agent?.last_name ?? ''}`;
  const defaultAgentEmail = SINGLE_EQUITY_INFO?.equity?.approved_agent?.email ?? '';
  const defaultAgentId = SINGLE_EQUITY_INFO?.equity?.approved_agent?.id ?? null;

  const EQUITY_INFO = {
    project_id: SINGLE_EQUITY_INFO?.equity?.project?.id,
    agent_assigned: defaultAgentId,

    bundle: {
      deduct_from: SINGLE_EQUITY_INFO?.allocations?.[0]?.archived ? 'archive' : 'available',
      allocation: SINGLE_EQUITY_INFO?.allocations?.[0]?.name,
      id: SINGLE_EQUITY_INFO?.equity?.unit?.id,
      payment_class:
        // SINGLE_EQUITY_INFO?.equity?.payment_complete
        !SINGLE_EQUITY_INFO?.equity?.payment_plan ? 'outright' : 'custom',
      outright: [
        {
          ...SINGLE_EQUITY_INFO?.transactions?.[0],
          payment_date: SINGLE_EQUITY_INFO?.transactions?.[0]?.created_at
            ? changeDateFormat(SINGLE_EQUITY_INFO?.transactions?.[0]?.created_at, 'yyyy-mm-dd')
            : '',
        },
      ],
      paymentplan: {
        payments: pastPaymentArray,
        upcomings: incomingpaymentArray,
      },
      closing_costs: SINGLE_EQUITY_INFO?.closing_cost,
      payment_period_in_months:
        SINGLE_EQUITY_INFO?.equity?.payment_plan?.payment_period_in_months ?? 0,
    },
    packets: [SINGLE_EQUITY_INFO?.packets[0]?.packet ?? ''],
  };
  const initialValues = {
    customer_id: customerID,

    equities: [{...EQUITY_INFO, equity_id: EquityID}],
  };

  const getProject = projId => listingInfo && listingInfo?.filter(item => item?.id == projId);
  const getUnit = unitId => listingBundles && listingBundles?.filter(item => item?.id == unitId);

  const handleSelectProject = (eqty, val, index) => {
    if (eqty?.project_id !== '') {
      setSelectedListingId(val?.equities[index]?.project_id);
    }
  };

  const isValidToProceed = val => {
    // validate agent email

    const isAgentEmailValid = isAgentEmail?.[0]?.available && !isAgentEmail?.[0]?.loading;
    const isClosingCostInfoValid = val?.equities?.[0]?.bundle?.closing_costs?.length
      ? val?.equities?.[0]?.bundle?.closing_costs.every(
          item => item.name.trim() && Number(item.amount)
        ) ||
        (val?.equities?.[0]?.bundle?.closing_costs.length === 1 &&
          !Number(val?.equities?.[0]?.bundle?.closing_costs?.[0]?.amount) &&
          !val?.equities?.[0]?.bundle?.closing_costs?.[0]?.name?.trim())
      : true;
    const listingHasBeenSelected = !!val?.equities?.[0]?.project_id;
    const unitHasBeenSelected = !!val?.equities?.[0]?.bundle.id;

    const PaymentPlanDuration =
      val?.equities?.[0]?.bundle?.payment_class === 'outright'
        ? true
        : !!val?.equities?.[0]?.bundle?.payment_period_in_months;

    const packetHasBeenSelected = !!val?.equities?.[0]?.packets.length;

    if (val?.equities?.[0]?.bundle?.payment_class === 'outright') {
      const isOutrightPaymentInfoValid = val?.equities?.[0]?.bundle?.outright.every(
        item => item.payment_date && Number(item.amount)
      );
      return (
        isOutrightPaymentInfoValid &&
        isClosingCostInfoValid &&
        listingHasBeenSelected &&
        unitHasBeenSelected &&
        isAgentEmailValid &&
        PaymentPlanDuration
      );
    }
    if (val?.equities?.[0]?.bundle?.payment_class === 'custom') {
      const isPastPaymentInfoValid = val?.equities?.[0]?.bundle?.paymentplan?.payments.length
        ? val?.equities?.[0]?.bundle?.paymentplan?.payments.every(
            item => Number(item.amount) && item.payment_date
          )
        : false;
      const isIncomingPaymentInfoValid = val?.equities?.[0]?.bundle?.paymentplan?.upcomings.length
        ? val?.equities?.[0]?.bundle?.paymentplan?.upcomings.every(
            item => Number(item.amount) && item.payment_date
          ) ||
          (val?.equities?.[0]?.bundle?.paymentplan?.upcomings.length === 1 &&
            !Number(val?.equities?.[0]?.bundle?.paymentplan?.upcomings?.[0]?.amount) &&
            !val?.equities?.[0]?.bundle?.paymentplan?.upcomings?.[0]?.payment_date)
        : true;
      return (
        isIncomingPaymentInfoValid &&
        isPastPaymentInfoValid &&
        isClosingCostInfoValid &&
        listingHasBeenSelected &&
        unitHasBeenSelected &&
        isAgentEmailValid &&
        PaymentPlanDuration
      );
    }
  };
  return (
    <LayoutView
      px={{base: '0px', xl: '30px'}}
      tabPanelStyle={{pb: '0px'}}
      pb="0px"
      activePage={'residents'}
    >
      {SINGLE_EQUITY_QUERY?.isLoading ? (
        <Center mt="40.4vh">
          <AnimatedLoader />
        </Center>
      ) : (
        <Box
          mt="clamp(52px,calc(11.4vh + 40px),96px)"
          px={{base: '0px', xl: '30px'}}
          maxW="full"
          w="full"
          pb="20px"
          mx="auto"
        >
          <Flex maxW="1100px" w="full" mx="auto" px={{base: '16px', xl: '0px'}}>
            <BackBtn name="Edit Transaction" />
          </Flex>
          {isLoading ? (
            <Center mt="40.4vh">
              <AnimatedLoader />
            </Center>
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
              mt="16px"
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
                    const val = {
                      ...values,
                      equities: [
                        {
                          ...values?.equities?.[0],
                          bundle: {
                            ...values?.equities?.[0].bundle,
                            closing_costs:
                              values?.equities?.[0]?.bundle?.closing_costs.length === 1 &&
                              !Number(values?.equities?.[0]?.bundle?.closing_costs?.[0]?.amount) &&
                              !values?.equities?.[0]?.bundle?.closing_costs?.[0]?.name?.trim()
                                ? []
                                : values?.equities?.[0]?.bundle?.closing_costs,
                            paymentplan: {
                              ...values?.equities?.[0].bundle.paymentplan,
                              upcomings:
                                values?.equities?.[0]?.bundle?.paymentplan?.upcomings.length ===
                                  1 &&
                                !Number(
                                  values?.equities?.[0]?.bundle?.paymentplan?.upcomings?.[0]?.amount
                                ) &&
                                !values?.equities?.[0]?.bundle?.paymentplan?.upcomings?.[0]
                                  ?.payment_date
                                  ? []
                                  : values?.equities?.[0]?.bundle?.paymentplan?.upcomings,
                            },
                          },
                        },
                      ],
                    };

                    await new Promise(r => setTimeout(r, 500));

                    handleEmptySubmittedValues(val.equities);

                    setTimeout(() => {
                      mutation.mutate({...val, customer_id: customerID});
                    }, 300);
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
                                          onClick={() => remove(index)}
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
                                        val={values}
                                        setFieldValue={setFieldValue}
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
                                    <Flex mt="20px" justify={'space-between'} w="full">
                                      {getUnit(equity?.bundle?.id)?.[0]?.total_archive ? (
                                        <SelectDeeductionType index={0} />
                                      ) : null}
                                      {getUnit(equity?.bundle?.id)?.[0]?.has_allocations == true ? (
                                        <SelectAllocation
                                          index={index}
                                          Unit={getUnit(equity?.bundle?.id)?.[0]}
                                          allocationSrc={
                                            values?.equities?.[index]?.bundle?.deduct_from
                                          }
                                          // selectStyles={selectStyles}
                                          // labelStyles={labelStylesForAllocation}
                                          // labelWrapperStyles={labelWrapperStyles}
                                          // labelSpanStyles={labelSpanStyles}
                                          selectedAllocation={
                                            SINGLE_EQUITY_INFO?.allocations?.[0]?.name
                                          }
                                        />
                                      ) : null}
                                    </Flex>
                                    <Text
                                      fontWeight={'500'}
                                      fontSize="22px"
                                      lineHeight="22.5px"
                                      ml={0}
                                      mb={2}
                                      mt="50px"
                                    >
                                      Select payment type
                                    </Text>
                                    <Divider
                                      color="#E4E4E4"
                                      mb="10px"
                                      w="full"
                                      orientation="horizontal"
                                    />
                                    <PaymentPlan
                                      values={values}
                                      index={index}
                                      equity={equity}
                                      forDispute={true}
                                      setFieldValue={setFieldValue}
                                    />
                                    <AddClosingCost
                                      index={index}
                                      equity={equity}
                                      setFieldValue={setFieldValue}
                                    />

                                    {
                                      // packetView
                                      false ? (
                                        <VStack alignItems="stretch" w="100%" spacing="3px">
                                          <InputLabel
                                            fontSize="22px"
                                            fontWeight={'500'}
                                            lineHeight="22.5px"
                                            as="label"
                                            label={'Equity packet'}
                                          />
                                          <HStack
                                            px={'15px'}
                                            py="9px"
                                            justify={'space-between'}
                                            width="441px"
                                            height="50px"
                                            flexShrink="0"
                                            borderRadius="8px"
                                            border="1px solid #E4E4E4"
                                          >
                                            <Flex gap="13px" align="center">
                                              <Image src={fileIcon.src} alt="" />
                                              <Text fontSize="16px" fontWeight="400">
                                                {
                                                  truncateLongText(equity?.packets, 35)
                                                    ?.truncatedText
                                                }
                                              </Text>
                                            </Flex>
                                            <Image
                                              cursor={'pointer'}
                                              onClick={() => setPacketView(!packetView)}
                                              src={trashIcon.src}
                                              alt=""
                                            />
                                          </HStack>
                                        </VStack>
                                      ) : (
                                        <UploadEquityPackets
                                          index={index}
                                          equity={equity}
                                          defaultDocObj={{
                                            ...SINGLE_EQUITY_INFO?.packets,
                                            name: !!SINGLE_EQUITY_INFO?.packets?.length
                                              ? 'Terms of agreement'
                                              : '',
                                          }}
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
                                            uploadBtnStyle: {
                                              fontSize: '12px',
                                              textAlign: 'center',
                                            },
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
                                          setFieldValue={setFieldValue}
                                          setEquityPacket={setEquityPacket}
                                          equityPacketName={equityPacketName}
                                          setEquityPacketName={setEquityPacketName}
                                        />
                                      )
                                    }
                                    <AssignAgentInput
                                      equity={equity}
                                      defaultName={defaultAgentName}
                                      defaultEmail={defaultAgentEmail}
                                      index={index}
                                      setIsAgentEmail={setIsAgentEmail}
                                      setFieldValue={setFieldValue}
                                      fieldName={`equities.${index}.agent_assigned`}
                                    />
                                  </Box>
                                ))}
                              <HStack pt="49px" w="full" justify="flex-end" gap="21px">
                                <Button
                                  isDisabled={!isValidToProceed(values) || mutation.isLoading}
                                  w="217px"
                                  variant="filled-radius"
                                  fontSize="18px"
                                  fontWeight="400"
                                  bg="#4545FE"
                                  h="44px"
                                  color="#ffffff"
                                  _focus={{opacity: 1}}
                                  // borderRadius={'8px'}
                                  _hover={{_disabled: {opacity: 0.4}}}
                                  type="submit"
                                >
                                  {mutation.isLoading ? <Spinner color="white" /> : 'Update'}
                                </Button>
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
      )}
    </LayoutView>
  );
}
