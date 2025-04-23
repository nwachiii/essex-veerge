import {
  Box,
  Divider,
  HStack,
  Input,
  InputGroup,
  ModalBody,
  ModalFooter, Stack,
  Image,
  Text,
  Link,
  Button as ChakraButton,
  ModalCloseButton
} from '@chakra-ui/react';
import { useState } from 'react';
import { useFetchAllListings, useFetchListingBundles } from '../../../../ui-lib';
import bulbIcon from '/src/images/icons/bulbBlue.svg';
import { Field, Form } from 'formik';
import { DropDownComponent } from '../components/dropDown';
import { EquityFillingComponent } from '../components/equityFillingComponent';
import { PriceMenu, PriceInputWrapperStyle } from 'pages/customers/create/WholeUnits/WholeUnits.Form';
import DisplayClosingCost from '../components/displayClosingCost';
import { formatNumberWithCommas } from 'utils/formatAmount';
import AssignAgentInput from 'ui-lib/ui-lib.components/Input/assignAgent';
import UploadEquityPackets from 'pages/residents/create_account/UploadEquityPackets';

const formatWithCommaOptions = {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
};

export const SendAnOfferScreen = ({
  SEND_OFFER_MODAL,
  customScrollbarStyles,
  handleScreen,
  mutation,
  setEquityPacketName,
  equityPacketName,
  setFieldValue,
  values,
  scrollStyle,
  selectedListingId,
  setSelectedListingId,
}) => {
  const query = 'assign=true'; //identifier to filter sold out properties

  const {listingInfo, isLoading, isError} = useFetchAllListings(query);
  const [equityPacket, setEquityPacket] = useState('');
  const {listingBundles} = useFetchListingBundles(selectedListingId, query);
  const [isAgentEmail, setIsAgentEmail] = useState({loading: false, available: true});

  const getProject = projId => listingInfo && listingInfo?.filter(item => item?.id == projId);
  const getUnit = unitId => listingBundles && listingBundles?.filter(item => item?.id == unitId);

  const isValidToProceed = val => {
    const isNotEmptyString = str => str && str.trim() !== '';
    const isValidNumber = num => !isNaN(num) && num > 0;
    const isAgentEmailValid = isAgentEmail?.available && !isAgentEmail?.loading;
    console.log({isAgentEmailValid});
    const isClosingCostInfoValid = () =>
      val.closing_costs.length
        ? val.closing_costs.every(item => isNotEmptyString(item.name) && isValidNumber(item.amount))
        : true;

    const isDeductedFromValid = () => !!val.deduct_from;
    const isOfferExpirationValid = () => !!val.offer_expiration;
    const isListingSelected = () => !!val.project;
    const isPacketSelected = () => val.contracts.length > 0;
    const isUnitSelected = () => !!val.unit;

    const isOutrightPaymentInfoValid = () =>
      val.payment_type === 'outright' && isValidNumber(val.offer_price) && isOfferExpirationValid();

    const isCustomPaymentInfoValid = () => {
      const customPaymentsValid = val.plan_info?.custom_payments.length
        ? val.plan_info.custom_payments.every(
            item => isValidNumber(item.amount) && isValidNumber(item.period_in_months)
          )
        : false;

      const initialDepositValid =
        isValidNumber(val.plan_info?.initial_deposit) &&
        isValidNumber(val.plan_info?.duration_in_months);

      return customPaymentsValid && initialDepositValid;
    };

    const validateOutright = () =>
      isOutrightPaymentInfoValid() &&
      isClosingCostInfoValid() &&
      isListingSelected() &&
      isUnitSelected() &&
      isAgentEmailValid &&
      // isPacketSelected() &&
      isDeductedFromValid();

    const validateCustom = () =>
      isCustomPaymentInfoValid() &&
      isClosingCostInfoValid() &&
      isListingSelected() &&
      isUnitSelected() &&
      isAgentEmailValid &&
      // isPacketSelected() &&
      isDeductedFromValid();

    const isValid = () => {
      if (val.payment_type === 'outright') return validateOutright();
      if (val.payment_type === 'custom') return validateCustom();
      return false;
    };

    return isValid();
  };

  const deductFromArray = [
    {
      name: 'Available',
      value: 'available',
    },
    {
      name: 'Archive',
      value: 'archive',
    },
  ];

  const handleSelectProject = (val, index) => {
    if (val !== '') {
      setSelectedListingId(val);
    }

    setFieldValue('unit', '');
  };
  return (
    <Form>
      <HStack w="full" justify={'space-between'} pb={`16px`}>
        <Text fontSize="18.667px" fontWeight={600}>
          Give an Offer
        </Text>
        <HStack gap={2} pr={4} pt={'20px'}>
          <Link
            href={`https://veerge-support.myxellia.io/lead/send_an_offer`}
            target="_blank"
            textDecoration={'none'}
            _hover={{
              textDecoration: 'none',
            }}
          >
            <HStack
              p="0px"
              gap="7px"
              h="fit-content"
              color="#4545FE"
              fontSize="15px"
              fontWeight="400"
              m={0}
              textDecoration={'none'}
            >
              <Image src={bulbIcon.src} boxSize="16.185px" alt="bulb" />
              <Text textDecoration={'none'}>Need help?</Text>
            </HStack>
          </Link>
        </HStack>
      </HStack>
      <ModalCloseButton />

      <ModalBody sx={customScrollbarStyles} maxH="400px" p={`0px`}>
        <Stack w="full" spacing="none" px="0px" gap={`16px`}>
          <HStack w="full" justify="space-between" gap={`20px`}>
            <DropDownComponent
              placeHolderText="Select a listing"
              header="Select a listing"
              setFieldValue={setFieldValue}
              fieldName={`project`}
              defaultDropName={
                listingInfo
                  ? (listingInfo.find(item => item.id === values.project)?.name ?? '')
                  : ''
              }
              dropDownArray={
                listingInfo ? listingInfo.map(item => ({...item, value: item.id})) : []
              }
              dropDownValue={values?.project}
              additionalFunc={id => handleSelectProject(id)}
              dropDownStyle={{
                menuList: {
                  maxW: '300px',
                  w: '300px',
                  maxH: '300px',
                  sx: scrollStyle,
                },
                label: {
                  fontWeight: '400',
                  color: '#4b4b4b',
                  fontSize: '12px',
                },
                btn: {
                  w: `100%`,
                  padding: `6px 14px`,
                  h: '100%',
                  borderRadius: '8px',
                  fontSize: '11px',
                },
                wrapper: {
                  spacing: '5.63px',
                  w: `100%`,
                },
              }}
            />

            <DropDownComponent
              placeHolderText="Select a Unit"
              header="Select a Unit"
              setFieldValue={setFieldValue}
              resetDropName={[values.project]}
              fieldName={`unit`}
              defaultDropName={
                listingBundles
                  ? (listingBundles.find(item => item.id === values.unit)?.unit_title ?? '')
                  : ''
              }
              dropDownArray={
                listingBundles
                  ? listingBundles.map(item => ({
                      ...item,
                      name: item.unit_title,
                      value: item.id,
                    }))
                  : []
              }
              dropDownStyle={{
                menuList: {
                  maxW: '300px',
                  w: '300px',
                  maxH: '300px',
                  sx: scrollStyle,
                },
                label: {
                  fontWeight: '400',
                  color: '#4b4b4b',
                  fontSize: '12px',
                },
                btn: {
                  w: `100%`,
                  padding: `6px 14px`,
                  h: '100%',
                  borderRadius: '8px',
                  fontSize: '11px',
                },
                wrapper: {
                  spacing: '5.63px',
                  w: `100%`,
                },
              }}
              dropDownValue={values?.unit}
            />
          </HStack>

          {listingBundles && listingBundles.find(item => item.id === values.unit)?.total_archive ? (
            <DropDownComponent
              placeHolderText="Select source"
              header="Offer Source"
              setFieldValue={setFieldValue}
              fieldName={`deduct_from`}
              defaultDropName={
                deductFromArray
                  ? (deductFromArray.find(item => item.value === values.deduct_from)?.name ?? '')
                  : ''
              }
              dropDownArray={deductFromArray}
              dropDownStyle={{
                menuList: {
                  maxW: '321.6px',
                  w: '321.6px',
                  maxH: '400px',
                  sx: scrollStyle,
                },
                wrapper: {
                  spacing: '5.63px',
                  mt: '24px',
                  w: `100%`,
                },
                label: {
                  fontWeight: '400',
                  color: '#4b4b4b',
                  fontSize: '12px',
                },
                btn: {
                  w: '321.6px',
                  padding: `6px 14px`,
                  h: '100%',
                  borderRadius: '8px',
                  fontSize: '11px',
                },
              }}
              dropDownValue={values?.deduct_from}
            />
          ) : null}

          <EquityFillingComponent values={values} setFieldValue={setFieldValue} />
          <HStack w="full" justify="space-between">
            {values?.payment_type === 'custom' ? (
              <Stack gap={`10px`} w={`100%`}>
                <Text
                  fontFamily="Euclid Circular B"
                  ml={0}
                  mb="0px"
                  // mt="18.92px"
                  fontWeight="400"
                  color="#4b4b4b"
                  fontSize="12px"
                >
                  Offer Price
                </Text>
                <InputGroup
                  align="center"
                  border="1px solid #E4E4E4"
                  h="33.5px"
                  w="321.6px"
                  borderRadius={'5.366px'}
                  py="4px"
                >
                  <PriceMenu
                    styleForIcon={{transform: 'scale(0.7)'}}
                    fillForNairaSvgIcon="#12D8A0"
                    disableMenu
                  />
                  <Divider orientation="vertical" ml="4px" height="full" />

                  <Field
                    as={Input}
                    className="formik__field"
                    isReadOnly
                    style={{
                      ...PriceInputWrapperStyle,
                      borderColor: 'transparent',
                      borderLeft: 'none',
                      boxShadow: 'none',
                      marginLeft: '14.04px',

                      marginBottom: '0px',
                      fontWeight: '500',
                      fontSize: '10.5px',
                      width: '321.6px',

                      height: '100%',
                      color: '#919191',
                    }}
                    // name={`offer_price`}
                    placeholder="Enter amount..."
                    type="text"
                    value={formatNumberWithCommas(
                      values?.payment_type == 'outright'
                        ? values.offer_price
                        : values.plan_info.offer_price,
                      formatWithCommaOptions
                    )}
                  />
                </InputGroup>
              </Stack>
            ) : null}
            <Stack gap={`10px`} w={`100%`}>
              <Text
                fontFamily="Euclid Circular B"
                ml={0}
                mb="0px"
                // mt="18.92px"
                fontWeight="400"
                color="#4b4b4b"
                fontSize="12px"
              >
                Offer Contract
              </Text>
              <Box>
                <UploadEquityPackets
                  equity={values}
                  fieldName={`contracts`}
                  labelStyle={{
                    fontWeight: '400',
                    fontSize: '12px',
                    display: 'none',
                  }}
                  docUploadStyle={{
                    w: '321.6px',
                    alignSelf: 'end',
                  }}
                  selectDocStyle={{
                    wrapperStyle: {
                      h: '33.5px',
                      w: '321.6px',
                      borderRadius: '5.366px',
                    },
                    uploadBtnStyle: {
                      p: '4.96px 5.51px',

                      bg: '#191919',
                      fontSize: '10.715px',
                      textAlign: 'center',
                    },
                    emptyStateTextStyle: {
                      fontSize: '10.715px',
                    },
                  }}
                  selectedDocStyle={{
                    wrapper: {h: '33.5px', w: '321.6px', borderRadius: '5.366px'},
                    DocImg: {boxSize: '10.615px'},
                    DocImgWrapper: {
                      boxSize: '21.23px',
                      p: '0px',
                      justify: 'center',
                    },
                    text: {fontSize: '10.715px', fontWeight: 400},
                    trashImg: {boxSize: '13px'},
                  }}
                  isOffer
                  setFieldValue={setFieldValue}
                  setEquityPacket={setEquityPacket}
                  equityPacketName={equityPacketName}
                  defaultDocObj={{name: equityPacketName}}
                  setEquityPacketName={setEquityPacketName}
                />
              </Box>
            </Stack>
          </HStack>
          <DisplayClosingCost
            values={values}
            customScrollbarStyles={customScrollbarStyles}
            handleScreen={handleScreen}
            scrollStyle={scrollStyle}
            setFieldValue={setFieldValue}
          />

          <AssignAgentInput
            equity={values}
            index={null}
            setIsAgentEmail={setIsAgentEmail}
            setFieldValue={setFieldValue}
            stackDividerStyle={{my: '-4px'}}
            fieldName={`agent_assigned`}
          />
          {/* </Box> */}
        </Stack>
      </ModalBody>
      <ModalFooter p="0px">
        <HStack w="full" justify="flex-end" gap="14.2px" pt={`16px`}>
          <ChakraButton
            // type="reset"
            color="#FF3636"
            fontSize="14.189px"
            bg="transparent"
            padding={`12.5px`}
            borderColor={'#FF3636'}
            border="1px solid #FF3636"
            _hover={{bg: 'transparent'}}
            _focus={{bg: 'transparent'}}
            _active={{bg: 'transparent'}}
            onClick={SEND_OFFER_MODAL.onClose}
            variant="outline-radius"
            w="175px"
            mt={`0px`}
            h="43px"
            fontWeight="600"
          >
            Discard
          </ChakraButton>
          <ChakraButton
            fontFamily="Proxima Nova"
            isDisabled={!isValidToProceed(values) || mutation.isLoading}
            w="175px"
            fontSize="14.189px"
            h="43px"
            bg="#4545fe"
            fontWeight="600"
            variant="filled-radius"
            color="#ffffff"
            type="submit"
            mt={`0px`}
            _hover={{opacity: '1', _disabled: {opacity: 0.4}}}
            _focus={{opacity: '1'}}
            _active={{opacity: '1'}}
            isLoading={mutation.isLoading}
          >
            Proceed
          </ChakraButton>
        </HStack>
      </ModalFooter>
    </Form>
  );
};

export default SendAnOfferScreen;
