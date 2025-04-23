import {useState} from 'react';
import {useMutation} from '@tanstack/react-query';
import {
  Box,
  Container,
  HStack,
  SimpleGrid,
  ButtonGroup,
  Icon,
  Text,
  Flex,
  Spinner,
  useToast,
  Button as ChakraBtn,
  useDisclosure,
} from '@chakra-ui/react';

import {createCustomerEquity} from '/src/apis/customers';
import {useFetchAllListings} from 'ui-lib/ui-lib.hooks/useFetchAllListings';
import {useFetchListingBundles} from 'ui-lib/ui-lib.hooks/useFetchListingBundles';
import {AddIcon, SmallCloseIcon} from '@chakra-ui/icons';
import {Formik, Form, FieldArray} from 'formik';
import {handleEmptySubmittedValues} from '/src/utils/removeEmptyObjectValues';
import PaymentPlan from './CustomerListingDetails.PaymentPlan/PaymentPlan';
import SelectAListting from './SelectAListting';
import SelectAUnit from './SelectAUnit';
import {AnimatedLoader} from '../../../../components/common/loaders';
import UploadEquityPackets from './UploadEquityPackets';
import SelectDeeductionType, {SelectAllocation} from './SelectDeeductionType';
import {AddClosingCost} from './closingCost';
import {useRouter} from 'next/router';
import {CreateToast} from 'ui-lib/ui-lib.components';
import LeaveEquityAssignment from './leaveEquityAssignment';
import {useSmallerLaptopsBreakpoint} from 'ui-lib/ui-lib.hooks';
import AssignAgentInput from 'ui-lib/ui-lib.components/Input/assignAgent';

export default function ListingDetails({subPages, handleProgress}) {
  const toast = useToast();
  const router = useRouter();
  const toaster = CreateToast('', 'success');
  const isSmallerLaptop = useSmallerLaptopsBreakpoint();

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

  const customerID =
    typeof window !== 'undefined' && localStorage && JSON.parse(localStorage.getItem('customer'));
  const userId =
    typeof window !== 'undefined' && localStorage && JSON.parse(localStorage.getItem('userId'));

  const modalDisclosure = useDisclosure();

  const mutation = useMutation(formData => createCustomerEquity(formData), {
    onSuccess: res => {
      toast({
        title: `Successfully updated`,
        status: 'success',
        duration: 8000,
        isClosable: true,
        position: 'top-right',
      });

      router.push(`/users/profile?userId=${userId}`);

      window.localStorage.removeItem('customerDetails');
      window.localStorage.removeItem('customer');
      window.localStorage.removeItem('allocationDetails');
      window.localStorage.removeItem('userId');
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
    const areEquitiesValid = val.equities.every((item, idx) => {
      // validate agent email

      const isAgentEmailValid = isAgentEmail?.[idx]?.available && !isAgentEmail?.[idx]?.loading;
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
          listingHasBeenSelected &&
          unitHasBeenSelected &&
          isAgentEmailValid &&
          // packetHasBeenSelected &&
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
          listingHasBeenSelected &&
          unitHasBeenSelected &&
          isAgentEmailValid &&
          // packetHasBeenSelected &&
          PaymentPlanDuration
        );
      }
    });
    // console.log(areEquitiesValid);
    return areEquitiesValid;
  };

  return (
    <>
      <LeaveEquityAssignment modalDisclosure={modalDisclosure} />
      <Box maxW="1100px" w="full" position={'relative'} pb={isSmallerLaptop ? '3em' : ''}>
        {isLoading ? (
          <AnimatedLoader />
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

                  // setTimeout(() => {
                  // }, 2000);
                  // console.log('EQUITIES', val);
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
                                      setFieldValue={setFieldValue}
                                      val={values}
                                      listingInfo={listingInfo}
                                      index={index}
                                    />
                                    <SelectAUnit
                                      setFieldValue={setFieldValue}
                                      isLoading={isUnitLoading}
                                      isError={isUnitError}
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
                                  as="div"
                                  type="button"
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
                                  w="238px"
                                  // borderRadius="8px"
                                  variant="outline-radius"
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
                                    Add another listing
                                  </Text>
                                </ChakraBtn>
                              </ButtonGroup>
                              <ChakraBtn
                                isDisabled={!isValidToProceed(values) || mutation.isLoading}
                                w="239px"
                                fontSize="14px"
                                variant="filled-radius"
                                fontWeight="400"
                                bg="#4545FE"
                                h="44px"
                                color="#ffffff"
                                _focus={{opacity: 1}}
                                _hover={{opacity: 1}}
                                _disabled={{
                                  opacity: 0.4,
                                  cursor: 'not-allowed',
                                  _hover: {
                                    opacity: 0.4,
                                  },
                                }}
                                borderRadius={'72px'}
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
    </>
  );
}
