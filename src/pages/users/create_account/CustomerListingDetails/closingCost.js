import {
  Box,
  Button,
  Divider,
  HStack,
  Icon,
  Image,
  InputGroup,
  SimpleGrid,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import {AddIcon} from '@chakra-ui/icons';
import trashIcon from '/src/images/icons/redTrashIcon.svg';
import {PriceMenu, PriceInputWrapperStyle} from 'pages/listings/create/WholeUnits/WholeUnits.Form';
import {Field, FieldArray} from 'formik';
import {useState} from 'react';
import {formatNumberWithCommas, formatToCurrency} from 'utils/formatAmount';
import ClosingCost from '@/components/Drawers/closingCost';

export const AddClosingCost = ({index, equity, setFieldValue}) => {
  const closingCostDisclosure = useDisclosure();
  const [shouldIncudeClosingCost, setShouldIncludeClosingCost] = useState(
    !!equity?.bundle?.closing_costs?.[0]?.name ? true : false
  );

  const handleAmount = (event, name) => {
    const input = event.target.value || '';
    let val = input.toString();

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

    setFieldValue(name, parseFloat(val).toFixed(2));
  };

  return (
    <>
      {!shouldIncudeClosingCost ? (
        <HStack justify="space-between" w="full">
          <Text fontSize="16px" fontWeight="500" color="#191919">
            Does this unit come with{' '}
            <Text as="span" onClick={closingCostDisclosure.onOpen} role="button" color="#4545FE">
              {equity?.bundle?.payment_class == 'outright' ? ' a paid' : ' an upcoming'} closing
              cost
            </Text>{' '}
            option?
          </Text>

          <Button
            h="47px"
            px="8.11px"
            variant="outline-radius"
            border="1px solid #a3a3a3"
            // borderRadius="9.73px"
            fontSize="14.604px"
            fontWeight="400"
            w="172px"
            _hover={{
              opacity: '1',
            }}
            _focus={{
              opacity: '1',
            }}
            _active={{
              opacity: '1',
            }}
            onClick={() => (
              setShouldIncludeClosingCost(true),
              setFieldValue(`equities.${index}.bundle.closing_costs`, [
                {
                  name: '',
                  amount: '',
                },
              ])
            )}
            leftIcon={<Icon as={AddIcon} />}
            iconSpacing="16.2px"
          >
            Add closing costs
          </Button>
        </HStack>
      ) : (
        <FieldArray name={`equities.${index}.bundle.closing_costs`}>
          {({insert, remove, push}) => (
            <Stack w="full" spacing="12px">
              <HStack w="full" justify="space-between">
                <Text fontSize="16px" fontWeight="500" color="#3D3D3D">
                  Closing Costs
                </Text>
                <Button
                  h="46.247px"
                  w="106.264px"
                  border="1px solid #a3a3a3"
                  // borderRadius="9.736px"
                  variant="outline-radius"
                  fontSize="14.604px"
                  fontWeight="400"
                  px="10px"
                  _hover={{
                    opacity: '1',
                  }}
                  _focus={{
                    opacity: '1',
                  }}
                  _active={{
                    opacity: '1',
                  }}
                  leftIcon={<Icon as={AddIcon} />}
                  iconSpacing="8.3px"
                  onClick={() =>
                    push({
                      name: '',
                      amount: '',
                    })
                  }
                >
                  Add
                </Button>
              </HStack>
              {equity?.bundle?.closing_costs?.length > 0 &&
                equity?.bundle?.closing_costs.map((payments, idx) => (
                  <SimpleGrid
                    key={idx}
                    spacing="26px"
                    // my="16px"
                    mt="0px"
                    columns={2}
                    className="row"
                  >
                    <Stack spacing="5px" position="relative" className="col">
                      <label
                        style={{fontSize: '11.359px', fontWeight: '400', color: '#191919'}}
                        htmlFor={`equities.${index}.bundle.closing_costs.${idx}.name`}
                      >
                        Title
                      </label>
                      <Box position="relative">
                        <Field
                          className="formik__field"
                          name={`equities.${index}.bundle.closing_costs.${idx}.name`}
                          type="text"
                          placeholder="Closing Cost Name"
                          value={equity.bundle.closing_costs[idx].name}
                          style={{
                            marginTop: '0px',
                            height: '50px',
                            borderColor: '#E4E4E4',
                            color: '#606060',
                            fontWeight: '500',
                            fontSize: '12px',
                            maxW: '390px',
                            w: '100%',
                            height: '40.568px',
                            borderRadius: '6.491px',
                          }}
                        />
                      </Box>
                    </Stack>{' '}
                    <Stack
                      spacing="5px"
                      maxW="390px"
                      w="full"
                      position="relative"
                      justifySelf="end"
                      className="col"
                    >
                      <label
                        style={{fontSize: '11.359px', fontWeight: '400', color: '#191919'}}
                        htmlFor={`equities.${index}.bundle.closing_costs.${idx}.amount`}
                      >
                        {/* {isOffer ? 'Offer price' : idx === 0 ? 'Initial deposit' : ' Amount'} */}
                        Amount
                      </label>
                      <Box position="relative">
                        <InputGroup
                          align="center"
                          border="1px solid #E4E4E4"
                          pl="7px"
                          h="40.568px"
                          borderRadius={'6.491px'}
                          maxW="390px"
                          w="full"
                        >
                          <PriceMenu fillForNairaSvgIcon="#000000" disableMenu />
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
                              fontSize: '12px',
                              maxW: '390px',
                              w: '100%',
                            }}
                            value={formatNumberWithCommas(equity.bundle.closing_costs[idx].amount, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                            onChange={event =>
                              handleAmount(
                                event,
                                `equities.${index}.bundle.closing_costs.${idx}.amount`
                              )
                            }
                            name={`equities.${index}.bundle.closing_costs.${idx}.amount`}
                            placeholder="Enter amount..."
                            type="text"
                            // value={
                            //   formatAmount(equity.bundle.paymentplan.payments[idx].amount) ==
                            //   'NaN'
                            //     ? ''
                            //     : formatAmount(equity.bundle.paymentplan.payments[idx].amount)
                            // }
                          />
                        </InputGroup>
                        {idx > 0 ? (
                          <Image
                            src={trashIcon.src}
                            alt="trash icon"
                            position="absolute"
                            my="auto"
                            top="0px"
                            bottom="0px"
                            right="-9%"
                            onClick={() => remove(idx)}
                            cursor="pointer"
                          />
                        ) : null}
                      </Box>
                    </Stack>
                  </SimpleGrid>
                ))}
            </Stack>
          )}
        </FieldArray>
      )}
      <Divider
        color="#E4E4E4"
        bg="#E4E4E4"
        border="none"
        h="1px"
        mt="25.96px"
        mb="19.47px"
        w="full"
        orientation="horizontal"
      />
      <ClosingCost drawerModal={closingCostDisclosure} />
    </>
  );
};

export default AddClosingCost;
