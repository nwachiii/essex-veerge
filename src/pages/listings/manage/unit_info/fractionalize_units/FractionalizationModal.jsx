import {
  Box,
  Flex,
  Stack,
  Text,
  useDisclosure,
  useToast,
  InputGroup,
  Divider,
  Spinner,
} from '@chakra-ui/react';
import {useMutation} from '@tanstack/react-query';
import {Field, Formik} from 'formik';
import {useState} from 'react';
import {calculateTotalFractions} from '../../../../../apis/listings';
import {Button, Popup} from '../../../../../ui-lib/ui-lib.components';
import {formatAmount, formatAmountWithDecimal} from '../../../../../utils';
import {FractionalizingModal2} from './FractionalizingModal2';
import {PriceInputWrapperStyle, PriceMenu} from 'pages/listings/create/WholeUnits/WholeUnits.Form';
import {NumberInputField} from 'ui-lib/ui-lib.components/Input/NumberInputField';

export const FractionalizationModal = ({
  unitQty,
  refetch,
  unitInfo,
  bundleId,
  FRACTIONALIZE_MODAL,
}) => {
  const toast = useToast();
  const FRACTIONALIZE_MODAL2 = useDisclosure();
  const FRACTIONALIZE_MODAL3 = useDisclosure();
  const FRACTIONALIZE_SUCCESS = useDisclosure();
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [fractionDetail, setFractionDetail] = useState({});
  const [fractionDetail2, setFractionDetail2] = useState({});
  const [totalFractions, setTotalFractions] = useState(null);
  const [numberOfFractions, setNumberOfFractions] = useState(null);
  const [pricePerFraction, setPricePerFraction] = useState(null);
  const [qtyToBeFractionalized, setQtyToBeFractionalized] = useState(Number(unitQty));

  const mutation = useMutation(formData => calculateTotalFractions(formData), {
    onSuccess: res => {
      console.log('response', res);
      handleProceed();
    },
    onError: err => {
      console.log(err);
      toast({
        title: 'An error occured',
        status: 'error',
        duration: 8000,
        isClosable: true,
        position: 'top-right',
      });
    },
  });

  const handleProceed = () => {
    FRACTIONALIZE_MODAL2.onOpen();
    setTimeout(() => {
      FRACTIONALIZE_MODAL.onClose();
    }, 1200);
  };

  const isFieldError =
    isError ||
    totalFractions?.toString()?.includes('.') ||
    errorMsg.length > 3 ||
    qtyToBeFractionalized >= unitQty ||
    fractionDetail.quantity == 0 ||
    unitQty == 0 ||
    totalFractions == 0;

  const UNIT_PRICE_WITH_FEES =
    parseFloat(unitInfo?.price) +
    unitInfo?.fees.reduce((total, current) => total + parseFloat(current.amount), 0);

  const handleNumberOfFractions = e => {
    e.preventDefault();
    const userInput = e.target.value;
    const newPricePerfraction =
      (UNIT_PRICE_WITH_FEES / Number(userInput)) * Number(qtyToBeFractionalized);
    setNumberOfFractions(userInput);
    setPricePerFraction(Number(newPricePerfraction?.toFixed(2)));
  };

  const handleFractionsQuantity = e => {
    e.preventDefault();
    const userInput = e.target.value;
    const newPricePerfraction =
      (UNIT_PRICE_WITH_FEES / Number(userInput)) * Number(qtyToBeFractionalized);
    setQtyToBeFractionalized(userInput);
    setPricePerFraction(Number(newPricePerfraction?.toFixed(2)));
  };

  return (
    <div>
      <Popup
        pt="25px"
        pb="21px"
        px="28px"
        isCentered
        minH="fit-content"
        h="fit-content"
        color="#191919"
        minW={{base: '90%', md: '458px'}}
        // isOpen={FRACTIONALIZE_MODAL.isOpen}
        isOpen={true}
        onClose={FRACTIONALIZE_MODAL.onClose}
      >
        <Text fontSize="24px" fontWeight={600}>
          Fractionalize
        </Text>
        <Popup.Body>
          <Stack direction={{base: 'column'}} w="full" spacing="27px">
            <Formik
              initialValues={{
                action: 'calculate',
                bundle: Number(bundleId),
                quantity: unitQty,
                price_per_fraction: 10000,
              }}
              onSubmit={(values, actions) => {
                const payLoadFromValues = {
                  ...values,
                  no_of_fractions: numberOfFractions,
                  price_per_fraction: Number(pricePerFraction),
                  quantity: Number(qtyToBeFractionalized),
                };
                // setFractionDetail(payLoadFromValues);
                console.log({payLoadFromValues});
                // mutation.mutate(payLoadFromValues);
              }}
            >
              {props => (
                <form onSubmit={props.handleSubmit}>
                  {/* <Stack>
                    <label htmlFor={`price_per_fraction`}>
                      <Text
                        color="#606060"
                        fontFamily='"Euclid Circular B"'
                        fontSize="14px"
                        fontStyle="normal"
                        fontWeight="400"
                        lineHeight="normal"
                      >
                        Price per fraction
                      </Text>
                    </label>

                    <InputGroup
                      align="center"
                      border="1px solid #E4E4E4"
                      py="4px"
                      h="42.5px"
                      borderRadius={'8px'}
                    >
                      <PriceMenu fillForNairaSvgIcon="#12D8A0" disableMenu />
                      <Divider orientation="vertical" ml="4px" height="full" />

                      <Field
                        style={{
                          ...PriceInputWrapperStyle,
                          paddingLeft: '.85em',
                          fontSize: '14px',
                          fontWeight: '500',
                          border: 'none',
                        }}
                        type="text"
                        onChange={props?.handleChange}
                        onBlur={props?.handleBlur}
                        placeholder="Enter price per fraction"
                        className="formik__field"
                        name={`price_per_fraction`}
                        value={
                          formatAmount(props.values.price_per_fraction) == 'NaN'
                            ? ''
                            : formatAmount(props.values.price_per_fraction)
                        }
                      />
                      {props.errors.price_per_fraction && (
                        <div id="feedback">{props.errors.price_per_fraction}</div>
                      )}
                    </InputGroup>
                    <div
                      style={{
                        width: '100%',
                        paddingLeft: '10px',

                        color: 'red',
                        fontSize: '10px',
                      }}
                    >
                      {totalFractions?.toString()?.includes('.') &&
                        `We recommend you use a value divisible by the total unit price ( ₦ ${UNIT_PRICE_WITH_FEES} )`}
                    </div>
                  </Stack> */}
                  <NumberInputField
                    numberInputLabel="Total number of Fractions"
                    placeholder="e.g, 100"
                    value={numberOfFractions}
                    onChange={handleNumberOfFractions}
                  />
                  {unitQty == 1 ? null : (
                    // <Box mt={6}>
                    //   <label htmlFor={`quantity`}>
                    //     <Text
                    //       color="#606060"
                    //       fontFamily='"Euclid Circular B"'
                    //       fontSize="14px"
                    //       fontStyle="normal"
                    //       fontWeight="400"
                    //       lineHeight="normal"
                    //     >
                    //       How many units do you want to fractionalize?
                    //     </Text>
                    //   </label>
                    //   <Field
                    //     type="number"
                    //     placeholder="Quantity of unit..."
                    //     className="formik__field"
                    //     name={`quantity`}
                    //   />
                    //   {props.errors.quantity && <div id="feedback">{props.errors.quantity}</div>}
                    //   {props.values.quantity > unitQty || props.values.quantity == 0
                    //     ? setIsError(true)
                    //     : setIsError(false)}
                    // </Box>
                    <Box mt={4}>
                      <NumberInputField
                        w="390px"
                        numberInputLabel="How many units do you want to fractionalize?"
                        placeholder="e.g, 3"
                        value={qtyToBeFractionalized}
                        onChange={handleFractionsQuantity}
                      />
                    </Box>
                  )}

                  {numberOfFractions && (
                    <Box
                      mt={8}
                      px="17px"
                      pt="12px"
                      border="1px solid lightgray"
                      borderRadius={'12px'}
                      w="full"
                    >
                      <Text
                        color="#606060"
                        fontFamily='"Euclid Circular B"'
                        fontSize="14px"
                        fontStyle="normal"
                        fontWeight="400"
                        lineHeight="normal"
                      >
                        Price per fraction
                      </Text>
                      <Text fontWeight={600} py={2} fontSize={'24px'} color="#191919">
                        {formatAmountWithDecimal(pricePerFraction)}
                      </Text>
                    </Box>
                  )}
                  <Flex pt="20px" w="full" justify="center">
                    <Button
                      borderRadius="72px"
                      isDisabled={isFieldError}
                      type="submit"
                      variant="dark"
                    >
                      {mutation?.isLoading ? <Spinner color="#FFFFFF" /> : 'Proceed'}
                    </Button>
                  </Flex>
                </form>
              )}
            </Formik>
          </Stack>
        </Popup.Body>
      </Popup>
      <FractionalizingModal2
        refetch={refetch}
        fractionDetail={fractionDetail}
        totalFractions={totalFractions}
        fractionDetail2={fractionDetail2}
        setFractionDetail2={setFractionDetail2}
        FRACTIONALIZE_MODAL={FRACTIONALIZE_MODAL}
        FRACTIONALIZE_MODAL2={FRACTIONALIZE_MODAL2}
        FRACTIONALIZE_MODAL3={FRACTIONALIZE_MODAL3}
        FRACTIONALIZE_SUCCESS={FRACTIONALIZE_SUCCESS}
      />
    </div>
  );
};

export default FractionalizationModal;
