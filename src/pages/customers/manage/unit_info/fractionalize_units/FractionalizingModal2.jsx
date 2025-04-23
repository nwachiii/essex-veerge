import {
  Box,
  Checkbox,
  Flex,
  SimpleGrid,
  Stack,
  Text,
  useDisclosure,
  HStack,
  useToast,
  Image,
} from '@chakra-ui/react';
import {useMutation} from '@tanstack/react-query';
import {Field, Formik} from 'formik';
import {useEffect, useState} from 'react';
import {createFractions} from '../../../../../apis/listings';
import {Button, Input, Popup} from '../../../../../ui-lib/ui-lib.components';
import InfoIcon from '@/components/assets/infoIcon';
import EnableDividend from './fractionalize.components/EnableDividend';
import Stakeholders from './fractionalize.components/Stakeholders';

import Strategy from '../../../../../components/Drawers/strategy';
import HoldingPeriod from '../../../../../components/Drawers/holdingPeroid';
import DealStructure from '../../../../../components/Drawers/dealStructure';
import BackArrowIcon from '@/components/assets/BackArrowIcon';
import DocInput from 'ui-lib/ui-lib.components/Input/DocInput';
import {toastForError} from 'utils/toastForErrors';
import {encodeFileToBase64} from 'utils';
import FractionalizingModal3 from './FractionalizingModal3';
import {MatadorCustomToast} from 'pages/veerge_menu/loop';
import {GoInfo} from 'react-icons/go';
import InvestorsPacket from '@/components/Drawers/investorsPacket';
import {DropDownComponent} from '@/components/Modals/send_offer/components/dropDown';

export const FractionalizingModal2 = ({
  FRACTIONALIZE_MODAL2,
  FRACTIONALIZE_MODAL3,
  refetch,
  fractionDetail,
  FRACTIONALIZE_MODAL,
  totalFractions,
}) => {
  const toast = useToast();
  const [docObj, setDocObj] = useState({name: ''});
  const [enableDividend, setEnableDividend] = useState(false);
  const [fractionDetail2, setFractionDetail2] = useState({});
  const [dividendStartDate, setDividendStartDate] = useState(null);
  const [isInsurance, setIsInsurance] = useState(false);
  const [investorsPacket, setInvestorsPacket] = useState([]);
  const [stakeholders, setStakeholders] = useState([]);
  const strategyModal = useDisclosure();
  const holdingPeriodModal = useDisclosure();
  const dealStructureModal = useDisclosure();
  const investorsPacketModal = useDisclosure();

  const dropDownArray = [
    {
      name: 'Buy to flip',
      value: 'buy_to_flip',
    },
    {name: 'Buy to hold', value: 'buy_for_hold'},
  ];

  const dropDownArrayForDeal_structure = [
    {
      name: 'Equity',
      value: 'equity',
    },
    {name: ' Debt ( contact support )', value: 'debt'},
    {name: ' Convertible debt ( contact support )', value: 'convertible_debt'},
  ];
  const disableArray = [{value: 'debt'}, {value: 'convertible_debt'}];
  const shouldDisableOption = (value, dropDownArray) => {
    const disable = dropDownArray.some(item => value === item.value);
    return disable;
  };

  const customScrollbarStyle = {
    '&::-webkit-scrollbar': {
      width: '4px',
      borderRadius: '16px',
    },
    '&::-webkit-scrollbar-track': {
      borderRadius: '16px',
      WebkitBoxShadow: 'inset 0 0 6px #cbcbcb',
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '16px',
      backgroundColor: '#fff',

      //   outline: '1px solid slategrey', // You can include this line if needed
    },
  };

  const mutation = useMutation(formData => createFractions(formData), {
    onSuccess: res => {
      toast({
        render: () => (
          <MatadorCustomToast description={'You have successfully fractionalized this unit'} />
        ),
        duration: 4000,
        isClosable: true,
        position: 'bottom-right',
      });
      refetch();
      setTimeout(() => {
        FRACTIONALIZE_MODAL3?.onClose();
      }, 500);
    },
    onError: err => {
      toastForError(err, true, toast);
    },
  });

  const handleProceed = val => {
    FRACTIONALIZE_MODAL2.onClose();
    FRACTIONALIZE_MODAL3.onOpen();
    const formBody = {
      ...val,
      stakeholders: stakeholders.flatMap(holdersObj => {
        if (holdersObj?.name?.trim() && holdersObj?.type?.trim()) {
          return holdersObj;
        } else {
          return [];
        }
      }),
    };
    setFractionDetail2(formBody);
  };

  const removeFile = () => {
    setDocObj({name: ''});
    setInvestorsPacket([]);
  };

  const handleContractUpload = async arg => {
    setDocObj(arg[0]);
    setInvestorsPacket([await encodeFileToBase64(arg[0]).then(res => res)]);
  };

  const handleBack = () => {
    FRACTIONALIZE_MODAL.onOpen();
    FRACTIONALIZE_MODAL2.onClose();
  };

  useEffect(() => {
    FRACTIONALIZE_MODAL2.isOpen && FRACTIONALIZE_MODAL3.onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const FORM_BODY = {
    ...fractionDetail2,
    packets: investorsPacket,
    stakeholders: stakeholders.flatMap(holdersObj => {
      if (holdersObj?.name?.trim() && holdersObj?.type?.trim()) {
        return holdersObj;
      } else {
        return [];
      }
    }),
    enable_dividend: enableDividend,
    allow_insurance: isInsurance,
    bundle: fractionDetail?.bundle,
    dividend_amount: fractionDetail2?.dividend_amount
      ? Number(fractionDetail2?.dividend_amount?.replaceAll(',', ''))
      : '',
    dividend_start_date: dividendStartDate,
    quantity: fractionDetail?.quantity,
    price_per_fraction: Number(fractionDetail?.price_per_fraction),
  };

  return (
    <div>
      <Popup
        overflowY="auto"
        size="full"
        mt="1rem"
        minH="fit-content"
        pb="38px"
        minW={{base: '90%', md: '894px'}}
        color="#191919"
        isOpen={FRACTIONALIZE_MODAL2.isOpen}
        forModal={{
          blockScrollOnMount: true,
        }}
        forBody={{
          maxH: '610px',
          sx: customScrollbarStyle,
        }}
        onClose={FRACTIONALIZE_MODAL2.onClose}
      >
        <HStack bg="#ffffff" zIndex={1200} px="32px" position="sticky" top="0px" spacing="10px">
          <BackArrowIcon onClick={handleBack} />
          <Text fontSize="24px" fontWeight={500}>
            Additional Information
          </Text>
        </HStack>
        <Popup.Body h="auto">
          <Stack w="full" px="32px" direction={{base: 'column'}} spacing="27px">
            <Formik
              initialValues={{
                action: 'create',
                packets: [],
                stakeholders: [
                  {
                    name: '',
                    type: '',
                  },
                ],
                holding_period: '',
                dividend_amount: 0,
                enable_dividend: false,
                allow_insurance: false,
                strategy: '',
                dividend_payout: 'monthly',
                deal_structure: 'equity',
              }}
              onSubmit={values => {
                mutation.mutate(FORM_BODY);
              }}
            >
              {props => {
                console.log({values: props.values, stakeholders});

                const isValidToProceed = val => {
                  const areEquitiesValid = () => {
                    const isStakeHoldersInfoValid = stakeholders.length
                      ? stakeholders.every(item => item?.name?.trim() && item?.type?.trim()) ||
                        (stakeholders.length === 1 &&
                          !stakeholders[0]?.name?.trim() &&
                          !stakeholders[0]?.type?.trim())
                      : true;

                    let isEnableDividendValid = true;

                    const isStrategyValid = !!val.strategy;
                    const isHoldingPeriodValue = !!val.holding_period;

                    const dealStructureIsValid = !!val.deal_structure;

                    const packetHasBeenSelected = !!investorsPacket.length;

                    if (enableDividend) {
                      isEnableDividendValid =
                        !!val.dividend_payout && !!val.dividend_amount && !!dividendStartDate;
                    }

                    return (
                      isStakeHoldersInfoValid &&
                      isEnableDividendValid &&
                      isHoldingPeriodValue &&
                      packetHasBeenSelected &&
                      dealStructureIsValid &&
                      isStrategyValid
                    );
                  };

                  return areEquitiesValid();
                };
                return (
                  <form onSubmit={props.handleSubmit}>
                    <SimpleGrid pb={8} w="full" columns={2} spacingX={10} spacingY={5}>
                      <Box>
                        {/* <HStack onClick={strategyModal.onOpen}>
                        <label htmlFor={`strategy`}>Strategy</label>
                                                   <InfoIcon borderFillColor="#919191" />

                      </HStack> */}
                        {/* <Field
                        as="select"
                        placeholder="Choose your strategy..."
                        className="formik__field"
                        name={`strategy`}
                      >
                        <option disabled mt={8} value={''}>
                          Dividend payout type
                        </option>
                        <option value={'buy_to_flip'}>Buy to flip</option>
                        <option value={'buy_for_hold'}>Buy to hold</option>
                      </Field> */}

                        <DropDownComponent
                          placeHolderText="Select"
                          header={
                            <HStack spacing="8px" onClick={strategyModal.onOpen}>
                              <Text
                                as="label"
                                color="#191919"
                                fontSize="14px"
                                fontWeight="400"
                                htmlFor={`strategy`}
                              >
                                Strategy
                              </Text>
                              <InfoIcon borderFillColor="#919191" />
                            </HStack>
                          }
                          setFieldValue={props.setFieldValue}
                          fieldName={`strategy`}
                          dropDownArray={dropDownArray}
                          dropDownValue={props.values?.strategy}
                          dropDownStyle={{
                            menuList: {
                              maxW: 'full',
                              w: 'full',
                              maxH: '400px',
                              sx: customScrollbarStyle,
                            },

                            btn: {
                              w: 'full',
                              h: '50px',
                              pl: '17px',
                              pr: '8.27px',
                              borderRadius: '8px',
                              fontSize: '12px',
                              fontWeight: '400',
                            },
                            wrapper: {
                              spacing: '6px',
                            },
                          }}
                        />
                      </Box>
                      <Box>
                        <HStack onClick={holdingPeriodModal.onOpen}>
                          <Text
                            as="label"
                            color="#191919"
                            fontSize="14px"
                            fontWeight="400"
                            htmlFor={`holding_period`}
                          >
                            Holding period
                          </Text>
                          <InfoIcon borderFillColor="#919191" />
                        </HStack>
                        <Field
                          type="text"
                          placeholder="e.g., 2 Months..."
                          className="formik__field"
                          name={`holding_period`}
                          style={{height: '50px', marginTop: '6px'}}
                        />
                        {props.errors.holding_period && (
                          <div id="feedback">{props.errors.holding_period}</div>
                        )}
                      </Box>
                      <Box>
                        {/* <HStack onClick={dealStructureModal.onOpen}>
                        <Text
                          as="label"
                          color="#191919"
                          fontSize="14px"
                          fontWeight="400"
                          htmlFor={`deal_structure`}
                        >
                          Deal structure
                        </Text>
                        <InfoIcon borderFillColor="#919191" />
                      </HStack> */}
                        {/* <Field
                        as="select"
                        placeholder="Deal structure..."
                        className="formik__field"
                        name={`deal_structure`}
                      >
                        <option disabled mt={8} value={''}>
                          Deal structure
                        </option>
                        <option mt={8} value={'equity'}>
                          Equity
                        </option>
                        <option disabled value={'debt'}>
                          Debt ( contact support )
                        </option>
                        <option disabled value={'debt_and_equity'}>
                          Debt + equity ( contact support )
                        </option>
                        <option disabled value={'convertible_debt'}>
                          Convertible debt ( contact support )
                        </option>
                      </Field> */}

                        <DropDownComponent
                          placeHolderText="Select"
                          disableOption={shouldDisableOption}
                          values={disableArray}
                          header={
                            <HStack spacing="8px" onClick={dealStructureModal.onOpen}>
                              <Text
                                as="label"
                                color="#191919"
                                fontSize="14px"
                                fontWeight="400"
                                htmlFor={`deal_structure`}
                              >
                                Deal structure
                              </Text>
                              <InfoIcon borderFillColor="#919191" />
                            </HStack>
                          }
                          setFieldValue={props.setFieldValue}
                          fieldName={`deal_structure`}
                          dropDownArray={dropDownArrayForDeal_structure}
                          defaultDropName="Equity"
                          dropDownValue={props.values?.deal_structure}
                          dropDownStyle={{
                            menuList: {
                              maxW: 'full',
                              w: 'full',
                              maxH: '400px',
                              sx: customScrollbarStyle,
                            },

                            btn: {
                              w: 'full',
                              h: '50px',
                              pl: '17px',
                              pr: '8.27px',
                              borderRadius: '8px',
                              fontSize: '12px',
                              fontWeight: '400',
                            },
                            wrapper: {
                              spacing: '6px',
                            },
                          }}
                        />
                      </Box>
                      <Stack spacing="6px">
                        <HStack onClick={investorsPacketModal.onOpen}>
                          <Text
                            as="label"
                            color="#191919"
                            fontSize="14px"
                            fontWeight="400"
                            htmlFor={`packets`}
                          >
                            {`Investor's packet`}
                          </Text>
                          <InfoIcon borderFillColor="#919191" />
                        </HStack>
                        <DocInput
                          autocapitalize="characters"
                          lengthToBeTruncated={17}
                          contract={''}
                          handleIdDoc={handleContractUpload}
                          removeFile={removeFile}
                          file={`packets`}
                          docObj={docObj}
                          selectDocStyle={{
                            uploadBtnStyle: {
                              fontSize: '9px',
                              p: '7px 10px 8px 9px',
                              bg: '#3D3D3D',
                              borderRadius: '8px',
                            },
                            wrapperStyle: {
                              h: 'full',
                            },
                            emptyStateTextStyle: {
                              fontSize: '12px',
                            },
                          }}
                          selectedDocStyle={{
                            text: {
                              fontSize: '14px',
                              fontWeight: '400',
                              color: '#191919',
                            },
                          }}
                        />
                      </Stack>

                      <Checkbox
                        onChange={e => setEnableDividend(e.target.checked)}
                        size="lg"
                        colorScheme="green"
                        isChecked={enableDividend}
                      >
                        Enable Dividend
                      </Checkbox>
                    </SimpleGrid>
                    {enableDividend && (
                      <EnableDividend props={props} setDividendStartDate={setDividendStartDate} />
                    )}
                    <Stakeholders props={props} setStakeholders={setStakeholders} />
                    <Flex pt="24px" justify={'flex-end'} w="full">
                      <Button
                        w="170px"
                        onClick={() => handleProceed(props.values)}
                        type="button"
                        variant="dark"
                        borderRadius="72px"
                        mt="0px"
                        isDisabled={!isValidToProceed(props.values)}
                      >
                        {'Proceed'}
                      </Button>
                    </Flex>
                  </form>
                );
              }}
            </Formik>
            <Strategy drawerModal={strategyModal} />
            <HoldingPeriod drawerModal={holdingPeriodModal} />
            <DealStructure drawerModal={dealStructureModal} />
            <InvestorsPacket drawerModal={investorsPacketModal} />
          </Stack>
        </Popup.Body>
      </Popup>
      <FractionalizingModal3
        mutation={mutation}
        FORM_BODY={FORM_BODY}
        totalFractions={totalFractions}
        FRACTIONALIZE_MODAL2={FRACTIONALIZE_MODAL2}
        FRACTIONALIZE_MODAL3={FRACTIONALIZE_MODAL3}
      />
    </div>
  );
};
export default FractionalizingModal2;
