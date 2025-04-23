import {
  Box,
  Button,
  HStack,
  Image,
  Input,
  InputGroup,
  ModalBody,
  ModalFooter,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react';
import trashIcon from '/src/images/icons/redTrashIcon.svg';
import backIcon from '/src/images/icons/backArrowForDrawer.svg';
import infoIcon from '/src/images/icons/infoIcionForSendOffer.svg';
import addIcon from '/src/images/icons/addIcon.svg';
import bulbIcon from '/src/images/icons/bulbBlue.svg';
import {PriceMenu, PriceInputWrapperStyle} from 'pages/communities/create/WholeUnits/WholeUnits.Form';
import {Field, FieldArray, Form, Formik} from 'formik';
import {formatNumberWithCommas, formatToCurrency} from 'utils/formatAmount';

export const ClosingCostScreen = ({
  index,
  closingCosts,
  customScrollbarStyles,
  handleClose,
  handleScreen,
  drawerModal,
  setFieldValue: payloadSetFieldValue,
  values: payloadValues,
}) => {
  const currDate = new Date();
  const secs = Math.floor(currDate.getTime() / 1000);
  const initialValues = {
    closing_costs: [{name: '', amount: '', id: 1 + secs}],
  };

  const handleAmount = (event, setFieldValue) => {
    const input = event.target.value || '';
    const {name} = event.target;

    let val = input;

    const cleanedString = val.replace(/[^\d]/g, '');

    val = cleanedString.replace(/^0+(?=\d)/, '');

    const length = val.length;

    if (length === 0) {
      val = '0.00';
    } else if (length === 1) {
      val = '0.0' + val;
    } else if (length === 2) {
      val = '0.' + val.padStart(2, '0');
    } else {
      const integerPart = val.slice(0, length - 2);
      const decimalPart = val.slice(-2);
      val = integerPart + '.' + decimalPart;
    }
    setFieldValue(name, val);
  };

  const setClosingCost = (event, setFieldValue) => {
    const {name, value} = event.target;

    setFieldValue(name, value);
  };

  const canProceed = values => {
    return !values.closing_costs.every(item => item.name && item.amount);
  };

  const attachmentClosingCostArrayToPayloadForm = values => {
    const newPayloadFormClosingCostArray = [
      ...payloadValues.closing_costs,
      ...values.closing_costs,
    ];

    payloadSetFieldValue('closing_costs', newPayloadFormClosingCostArray);
    console.log(newPayloadFormClosingCostArray, values.closing_costs);
    handleScreen('defineEquityAndSendAnOffer');
  };

  return (
    <Formik initialValues={initialValues}>
      {({values, setFieldValue}) => (
        <Form>
          <HStack mb="12.41px" w="full" justify={'space-between'}>
            <HStack>
              <Image
                onClick={() => handleScreen('defineEquityAndSendAnOffer')}
                src={backIcon.src}
                cursor="pointer"
                alt="back icon"
                h="16.185px"
                w="16.185px"
              />
              <Text fontSize="18.667px" fontWeight={600}>
                Closing cost
              </Text>
            </HStack>

            <Button
              p="0px"
              iconSpacing="7px"
              h="fit-content"
              color="#4545FE"
              fontSize="13.487px"
              fontWeight="400"
              _hover={{
                bg: 'transparent',
                boxShadow: 'none',
              }}
              _focus={{
                bg: 'transparent',
              }}
              _active={{
                bg: 'transparent',
              }}
              leftIcon={<Image src={bulbIcon.src} boxSize="16.185px" alt="bulb" />}
              variant="ghost"
              onClick={drawerModal.onOpen}
            >
              Need help?
            </Button>
          </HStack>

          <HStack spacing="16px" p="9px" borderRadius="7px" bg="#D9D9D9" mb="24px">
            <Image src={infoIcon.src} boxSize="12.813px" alt="info icon" />
            <Text fontSize="11.667px" fontWeight="300" color="#000000">
              This is the point where closing costs are added (i.e Development levy, legal fees
              etc.). Fill in the title of the closing cost and input the amount. You can also add
              more fees.
            </Text>
          </HStack>
          <FieldArray name={`closing_costs`}>
            {({insert, remove, push}) => (
              <>
                <ModalBody sx={customScrollbarStyles} p={`0px`} maxH="280px">
                  <Stack w="full" spacing="10px">
                    {values.closing_costs.map((payments, idx) => (
                      <SimpleGrid
                        key={idx}
                        gap="20px"
                        // my="16px"
                        mb="16px"
                        columns={2}
                        className="row"
                      >
                        <Stack
                          spacing="5px"
                          position="relative"
                          alignSelf="end"
                          className="col"
                          gap={`0px`}
                          w={`100%`}
                        >
                          <Text
                            fontFamily="Euclid Circular B"
                            ml={0}
                            mb="0px"
                            // mt="18.92px"
                            fontWeight="400"
                            color="#4b4b4b"
                            fontSize="12px"
                          >
                            Closing Cost Title
                          </Text>
                          <Box position="relative">
                            <Field
                              className="formik__field"
                              as={Input}
                              name={`closing_costs.${idx}.name`}
                              type="text"
                              placeholder=" e.g development fee"
                              _placeholder={{
                                fontSize: '10.79px',
                                fontWeight: '400',
                                color: '#919191',
                              }}
                              value={values.closing_costs?.[idx]?.name}
                              onChange={event => setClosingCost(event, setFieldValue)}
                              style={{
                                marginTop: '0px',
                                width: '100%',
                                borderColor: '#E4E4E4',
                                fontSize: '10.79px',
                                fontWeight: '400',
                                color: '#191919',
                                height: '33.7px',
                                borderRadius: '5.394px',
                              }}
                            />
                          </Box>
                        </Stack>{' '}
                        <Stack spacing="1.18px" position="relative" className="col">
                          <label
                            style={{fontSize: '11.667px', fontWeight: '400'}}
                            htmlFor={`closing_costs.${idx}.amount`}
                          >
                            Amount
                          </label>
                          <Box display="flex" gap="5px" position="relative">
                            <InputGroup
                              align="center"
                              border="1px solid #E4E4E4"
                              pl="7px"
                              h="33.7px"
                              borderRadius={'5.395px'}
                              w="full"
                            >
                              <PriceMenu
                                styleForIcon={{transform: 'scale(0.7)'}}
                                fillForNairaSvgIcon="#12D8A0"
                                disableMenu
                              />
                              <Field
                                className="formik__field"
                                style={{
                                  ...PriceInputWrapperStyle,
                                  borderColor: 'transparent',
                                  borderLeft: '1px solid #E4E4E4',
                                  boxShadow: 'none',
                                  marginTop: '4px',
                                  marginBottom: '4px',
                                  marginLeft: '14.04px',
                                  color: '#606060',
                                  fontWeight: '500',
                                  fontSize: '9.441px',
                                }}
                                value={formatNumberWithCommas(values.closing_costs?.[idx]?.amount, {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                })}
                                onChange={event => handleAmount(event, setFieldValue)}
                                name={`closing_costs.${idx}.amount`}
                                placeholder="Enter amount..."
                                type="text"
                              />
                            </InputGroup>
                            {idx > 0 ? (
                              <Image
                                src={trashIcon.src}
                                alt="trash icon"
                                // position="absolute"
                                my="auto"
                                top="0px"
                                boxSize="18.919px"
                                bottom="0px"
                                right={idx > 0 ? '-3%' : '-6%'}
                                onClick={() => remove(idx)}
                                cursor="pointer"
                              />
                            ) : null}
                          </Box>
                        </Stack>
                      </SimpleGrid>
                    ))}
                  </Stack>
                </ModalBody>
                <ModalFooter p="0px">
                  <HStack w="full" justify="end" spacing="16px" align="end" mt="4px">
                    <Button
                      variant="outline-radius"
                      borderColor="#FF3636"
                      _hover={{
                        opacity: '1',
                        boxShadow: 'none',
                      }}
                      _focus={{
                        opacity: '1',
                      }}
                      _active={{
                        opacity: '1',
                      }}
                      // borderRadius=" 8.092px"
                      color="#FF3636"
                      fontSize="12.139px"
                      fontWeight="500"
                      py="10.8"
                      w="150px"
                      h="44px"
                      // onClick={handleClose}
                      onClick={() => handleScreen('defineEquityAndSendAnOffer')}
                    >
                      Cancel
                    </Button>

                    <Stack spacing="30px" alignItems={'flex-end'}>
                      <Button
                        bg="#FFFFFF"
                        border="1px solid #4545FE"
                        color="#4545FE"
                        fontSize="12.139px"
                        variant="md-outline-radius"
                        fontWeight="400"
                        // borderRadius="8.092px"
                        w="max-content"
                        type="button"
                        h="44px"
                        p="10px 12px"
                        _hover={{
                          opacity: '1',
                          boxShadow: 'none',
                        }}
                        _focus={{
                          opacity: '1',
                        }}
                        _active={{
                          opacity: '1',
                        }}
                        onClick={() => {
                          const currentDate = new Date();
                          const seconds = Math.floor(currentDate.getTime() / 1000);
                          return push({
                            name: '',
                            amount: '',
                            id: values.closing_costs.length + 1 + seconds,
                          });
                        }}
                        leftIcon={
                          <Image
                            alt="add icon"
                            alignSelf="center"
                            src={addIcon.src}
                            boxSize="16.185px"
                          />
                        }
                        iconSpacing="13.49px"
                      >
                        Add
                      </Button>
                      <Button
                        bg="#191919"
                        // borderRadius=" 8.092px"
                        w="150px"
                        variant="filled-radius"
                        py="10.8px"
                        h="44px"
                        color="#ffffff"
                        fontSize="12.139px"
                        fontWeight="400"
                        isDisabled={canProceed(values)}
                        _disabled={{opacity: '0.7'}}
                        onClick={() => attachmentClosingCostArrayToPayloadForm(values)}
                        _hover={{
                          opacity: '1',
                          boxShadow: 'none',
                        }}
                        _focus={{
                          opacity: '1',
                        }}
                        _active={{
                          opacity: '1',
                        }}
                      >
                        Proceed
                      </Button>
                    </Stack>
                  </HStack>
                </ModalFooter>
              </>
            )}
          </FieldArray>
        </Form>
      )}
    </Formik>
  );
};

export default ClosingCostScreen;
