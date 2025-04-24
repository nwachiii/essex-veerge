import {BackArrowWithText} from '@/components/assets/BackArrow';
import {LayoutView} from '@/components/index';
import {
  Container,
  useToast,
  Box,
  Button,
  HStack,
  Text,
  useDisclosure,
  Stack,
  Input,
  Spinner,
} from '@chakra-ui/react';
import PaymentPlan from 'pages/residents/create_account/CustomerListingDetails/CustomerListingDetails.PaymentPlan/PaymentPlan';
import AddClosingCost from 'pages/residents/create_account/CustomerListingDetails/closingCost';
import React, {useState} from 'react';
import {Formik, Form, FieldArray, useFormik, FormikProvider} from 'formik';
import {createCustomerEquity} from '/src/apis/customers';
import {useFetchAllListings} from 'ui-lib/ui-lib.hooks/useFetchAllListings';
import {useFetchListingBundles} from 'ui-lib/ui-lib.hooks/useFetchListingBundles';
import {useRouter} from 'next/router';
import {CreateToast} from 'ui-lib/ui-lib.components';
import {useMutation, useQuery} from '@tanstack/react-query';
import UploadEquityPackets from 'pages/residents/create_account/CustomerListingDetails/UploadEquityPackets';
import Verify2fa from '@/components/transferOfOwnership/verify2fa';
import {fetchCustomerViaEmail, transferCustomerEquity} from 'apis/customers';
import Head from 'next/head';

const TransferOfOwnership = ({equity_id, unitId, project_id}) => {
  const toast = useToast();
  const router = useRouter();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const [equityPacket, setEquityPacket] = useState('');
  const [customerName, setCustomerName] = useState(null);
  const [newCustomerId, setNewCustomerId] = useState(null);
  const [equityPacketName, setEquityPacketName] = useState('');
  const [isEmailValid, setIsEmailValid] = useState('');

  const modalDisclosure = useDisclosure();

  const handleBack = () => {
    router.back(-1);
  };

  const mutation = useMutation(formData => transferCustomerEquity(formData), {
    onSuccess: res => {
      router.push(`/residents/profile?userId=${newCustomerId}`);
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
    project_id,
    bundle: {
      id: unitId,
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

      closing_costs: [],
    },
    packets: [],
  };
  const initialValues = {
    equity_id: equity_id,

    new_owner_email: '',

    equities: [{...EQUITY_INFO}],
  };

  const formikBag = useFormik({
    initialValues,
    onSubmit: async values => {
      const equityObj = values.equities?.[0];
      const val = {
        equity_id: values.equity_id,
        new_owner_email: values.new_owner_email,
        equity_data: {
          // ...equityObj,
          project_id: equityObj.project_id,
          packets: equityObj.packets,
          bundle: {
            ...equityObj.bundle,
            id: equityObj.bundle.id,
            payment_class: equityObj.bundle.payment_class,
            closing_costs:
              equityObj?.bundle?.closing_costs.length === 1 &&
              !Number(equityObj?.bundle?.closing_costs?.[0]?.amount) &&
              !equityObj?.bundle?.closing_costs?.[0]?.name?.trim()
                ? []
                : equityObj?.bundle?.closing_costs,
            paymentplan:
              equityObj.bundle.payment_class === 'outright'
                ? null
                : {
                    ...equityObj.bundle.paymentplan,
                    upcomings:
                      equityObj?.bundle?.paymentplan?.upcomings.length === 1 &&
                      !Number(equityObj?.bundle?.paymentplan?.upcomings?.[0]?.amount) &&
                      !equityObj?.bundle?.paymentplan?.upcomings?.[0]?.payment_date
                        ? []
                        : equityObj?.bundle?.paymentplan?.upcomings,
                  },
            payment_period_in_months: equityObj?.bundle?.payment_period_in_months,
          },
        },
      };
      // const updatedVal =
      // console.log({val});
      mutation.mutate(val);
    },
  });

  // formikBag
  const {values, setFieldValue, handleSubmit} = formikBag;

  console.log({values});

  const isValidToProceed = val => {
    const areEquitiesValid = val.equities.every(item => {
      const isClosingCostInfoValid = item?.bundle?.closing_costs.length
        ? item?.bundle?.closing_costs.every(item => item.name.trim() && Number(item.amount)) ||
          (item?.bundle?.closing_costs.length === 1 &&
            !Number(item?.bundle?.closing_costs?.[0]?.amount) &&
            !item?.bundle?.closing_costs?.[0]?.name?.trim())
        : true;
      const PaymentPlanDuration =
        item?.bundle?.payment_class === 'outright'
          ? true
          : !!item?.bundle?.payment_period_in_months;
      const listingHasBeenSelected = !!item?.project_id;
      const packetHasBeenSelected = !!item?.packets.length;
      const unitHasBeenSelected = !!item?.bundle.id;
      if (item?.bundle?.payment_class === 'outright') {
        const isOutrightPaymentInfoValid = item?.bundle?.outright.every(
          item => item.payment_date && Number(item.amount)
        );

        return (
          isOutrightPaymentInfoValid &&
          isClosingCostInfoValid &&
          isEmailValid &&
          packetHasBeenSelected &&
          PaymentPlanDuration
        );
      } else if (item?.bundle?.payment_class === 'custom') {
        const isPastPaymentInfoValid = item?.bundle?.paymentplan?.payments.length
          ? item?.bundle?.paymentplan?.payments.every(
              item => Number(item.amount) && item.payment_date
            )
          : false;
        const isIncomingPaymentInfoValid = item?.bundle?.paymentplan?.upcomings.length
          ? item?.bundle?.paymentplan?.upcomings.every(
              item => Number(item.amount) && item.payment_date
            ) ||
            (item?.bundle?.paymentplan?.upcomings.length === 1 &&
              !Number(item?.bundle?.paymentplan?.upcomings?.[0]?.amount) &&
              !item?.bundle?.paymentplan?.upcomings?.[0]?.payment_date)
          : true;

        return (
          isIncomingPaymentInfoValid &&
          isPastPaymentInfoValid &&
          isClosingCostInfoValid &&
          isEmailValid &&
          packetHasBeenSelected &&
          PaymentPlanDuration
        );
      }
    });

    return areEquitiesValid;
  };

  const isQueryEnabled = emailRegex.test(values.new_owner_email);

  const {data, isError, isFetching} = useQuery(
    [values.new_owner_email, 'customer-via-Email'],
    () => fetchCustomerViaEmail(values.new_owner_email),

    {
      onSuccess: res => {
        if (res?.data?.data) {
          setCustomerName(`${res?.data?.data?.first_name} ${res?.data?.data?.last_name}`);
          setNewCustomerId(res?.data?.data?.user?.id);
        }
      },
      enabled: isQueryEnabled,
    }
  );
  const isLoading = isQueryEnabled && isFetching;

  const handleEmailChange = event => {
    const {value, name} = event.target;
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    setFieldValue(name, value);
    if (regex.test(value)) {
      setIsEmailValid(true);
    } else {
      setIsEmailValid(false);
    }
  };
  return (
    <LayoutView
      maxW="full"
      tabPanelStyle={{px: '0px', pb: '0px'}}
      px="0px"
      pb="30px"
      activePage={'users'}
    >
      <Head>
        <title>Veerge | Transfer of Ownership</title>
        <meta name="description" content="Built by myxellia" />
        <meta name="theme-color" content="#191919" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <HStack
        px={{base: `16px`, xl: '0px'}}
        mx="auto"
        mt={`clamp(52px,calc(10.4vh + 40px),82px)`}
        maxW="1100px"
        w="full"
        mb="30px"
      >
        <BackArrowWithText handleClick={handleBack} text="Transfer Ownership" />
      </HStack>
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
        <FormikProvider
          value={formikBag}
          // initialValues={initialValues}
          // onSubmit={async values => {
          //   const equityObj = values.equities?.[0];
          //   // handling a situation upcoming payments isnt filled
          //   const val = {
          //     equity_id: values.equity_id,
          //     new_owner_email: values.new_owner_email,
          //     equity_data: {
          //       ...equityObj,
          //       bundle: {
          //         ...equityObj.bundle,
          //         closing_costs:
          //           equityObj?.bundle?.closing_costs.length === 1 &&
          //           !Number(equityObj?.bundle?.closing_costs?.[0]?.amount) &&
          //           !equityObj?.bundle?.closing_costs?.[0]?.name?.trim()
          //             ? []
          //             : equityObj?.bundle?.closing_costs,
          //         paymentplan: {
          //           ...equityObj.bundle.paymentplan,
          //           upcomings:
          //             equityObj?.bundle?.paymentplan?.upcomings.length === 1 &&
          //             !Number(equityObj?.bundle?.paymentplan?.upcomings?.[0]?.amount) &&
          //             !equityObj?.bundle?.paymentplan?.upcomings?.[0]?.payment_date
          //               ? []
          //               : equityObj?.bundle?.paymentplan?.upcomings,
          //         },
          //       },
          //     },
          //   };

          //   console.log({val});
          //   // mutation.mutate(val);
          // }}
        >
          <Form>
            <FieldArray name="equities">
              {({insert, remove, push}) => (
                <>
                  <div>
                    {values.equities.length > 0 &&
                      values?.equities?.map((equity, index) => (
                        <Box key={index} w="full" position="relative">
                          {/* {index > 0 && (
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
                                  )} */}
                          <Stack spacing="10.5px" position="relative" className="col">
                            <label
                              style={{fontSize: '14px', fontWeight: '500', color: '#3D3D3D'}}
                              htmlFor={`new_owner_email`}
                            >
                              Email Address
                            </label>
                            <Stack position="relative" w="fit-content">
                              <Input
                                className="formik__field"
                                type="text"
                                placeholder="Enter Email Address"
                                name={`new_owner_email`}
                                value={equity?.new_owner_email}
                                onChange={handleEmailChange}
                                style={{
                                  marginTop: '0px',
                                  width: '390px',
                                  height: '40.568px',
                                  borderRadius: ' 6.491px',
                                  borderColor: '#E4E4E4',
                                  fontSize: '14.604px',
                                  fontWeight: '500',
                                }}
                                _focus={{
                                  boxShadow: 'none',
                                }}
                              />
                              <HStack position="absolute" bottom="-20px" right="5px" justify="end">
                                {isLoading ? (
                                  <Spinner color="#e5e5e5" boxSize="15px" />
                                ) : (
                                  <Text
                                    fontSize="12px"
                                    fontWeight="400"
                                    color={
                                      isError || data?.response?.status ? '#FF6A6A' : '#191919'
                                    }
                                    textTransform={
                                      isError || data?.response?.status ? 'initial' : 'capitalize'
                                    }
                                  >
                                    {isError || data?.response?.status
                                      ? "Account doesn't exist"
                                      : isEmailValid
                                        ? customerName
                                        : null}
                                  </Text>
                                )}
                              </HStack>
                            </Stack>
                          </Stack>

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
                          {/* <Divider
                                  color="#E4E4E4"
                                  mb="10px"
                                  w="full"
                                  orientation="horizontal"
                                /> */}

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
                        </Box>
                      ))}

                    <HStack pt="79px" w="full" justify="flex-end" gap="21px">
                      <Button
                        isDisabled={!isValidToProceed(values)}
                        w="239px"
                        fontSize="14px"
                        fontWeight="400"
                        bg="#4545FE"
                        h="44px"
                        color="#ffffff"
                        _focus={{opacity: 1}}
                        //   isLoading={mutation.isLoading}
                        _hover={{opacity: 1}}
                        _disabled={{
                          opacity: 0.4,
                          cursor: 'not-allowed',
                          _hover: {
                            opacity: 0.4,
                          },
                        }}
                        borderRadius={'72px'}
                        onClick={modalDisclosure.onOpen}
                      >
                        Proceed
                      </Button>
                      <Verify2fa
                        isTransferOfOwnershipMutationLoading={mutation.isLoading}
                        modalDisclosure={modalDisclosure}
                        handleForTransferOfOwnership={handleSubmit}
                      />
                    </HStack>
                  </div>
                </>
              )}
            </FieldArray>
          </Form>
        </FormikProvider>
      </Container>
    </LayoutView>
  );
};

export default TransferOfOwnership;

export async function getServerSideProps({params, query}) {
  return {props: {equity_id: query?.id, unitId: query?.unitId, project_id: query?.projectId}};
}
