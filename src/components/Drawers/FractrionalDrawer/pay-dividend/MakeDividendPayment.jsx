import {
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  HStack,
  Heading,
  VStack,
  DrawerOverlay,
  Drawer,
  Text,
  Flex,
  InputGroup,
  Stack,
  Image,
  Box,
  Divider,
  Textarea,
  Spinner,
} from '@chakra-ui/react';
import {useFormik} from 'formik';
import {Button, Input} from 'ui-lib/ui-lib.components';
import groupIcon from '/src/images/icons/groupIcon.svg';
import backIcon from '/src/images/icons/backArrowForDrawer.svg';
import {customScrollbarStyles} from '@/components/common/Calendar/DatePicker';
import {PriceInputWrapperStyle, PriceMenu} from 'pages/customers/create/WholeUnits/WholeUnits.Form';
import {formatAmount} from 'utils';
import {useState} from 'react';
import VerifyUserViaOTP from './VerifyUserViaOTP';

export const MakeDividendPayment = ({
  paymentSource,
  DrawerDisclosure,
  initiatePaymentOnSubmit,
  mutation,
  handleScreen,
  payload,
}) => {
  // paymentSource - group | individual
  // initiatePaymentOnSubmit - onclick function, which collects the payload as an argument
  // mutation - onmutation function to check forr loading and error states
  const [dividendPayloadOnSubmit, setDividendPayloadOnSubmit] = useState({});
  const [showVerifyComponent, setShowVerifyComponent] = useState('false');
  const dividendInitialPayload = {
    note: '',
    amount: '',
    unit_id: payload?.unitId || 0,
    equity_group: payload?.equityId,
  };
  const formik = useFormik({
    initialValues: {...dividendInitialPayload},
    onSubmit: values => {
      const formatToInteger = arg => Number(arg?.toString()?.replace(/,/g, ''));
      setShowVerifyComponent('true');
      setDividendPayloadOnSubmit({...values, amount: formatToInteger(values.amount)});
    },
  });

  const areAllFieldsFilled = formik?.values?.amount !== '' && formik?.values?.note !== '';

  return (
    <div>
      <Drawer
        autoFocus={false}
        borderRadius="16px"
        onClose={DrawerDisclosure.onClose}
        isOpen={DrawerDisclosure.isOpen}
      >
        <DrawerOverlay bg="rgba(0,0,0,0.1)" />
        <DrawerContent
          p="0px"
          mt="65.12px"
          w="400px"
          position="relative"
          minW="fit-content"
          sx={customScrollbarStyles}
        >
          <HStack
            py="30px"
            px="25px"
            h="49.699px"
            bg="#F5F5F5"
            align="center"
            position="relative"
            justify="space-between"
            fontFamily="Euclid Circular B"
          >
            <Flex gaap="5px">
              <Image
                alt="back icon"
                cursor="pointer"
                src={backIcon.src}
                onClick={DrawerDisclosure.onClose}
              />
              <Heading fontSize="18.9px" fontWeight="700">
                Pay Dividend
              </Heading>
            </Flex>
          </HStack>
          <DrawerBody sx={customScrollbarStyles} py="1rem">
            {showVerifyComponent == 'false' ? (
              <Stack as="form" onSubmit={formik?.handleSubmit} spacing="18px">
                <Box>
                  <label style={{fontSize: '12px', paddingBottom: '3px'}}>To</label>
                  <Box p="12px 8px" border="1px solid lightgray" borderRadius={'12px'}>
                    <Flex
                      gap="5px"
                      p="4px 7px"
                      bg="#F5F5F5"
                      align="center"
                      w={'fit-content'}
                      borderRadius={'14px'}
                    >
                      <Image src={groupIcon.src} alt="group icon" boxSize={'16px'} />
                      <Text fontSize={'12px'} fontWeight={'400'}>
                        {paymentSource}
                      </Text>
                    </Flex>
                  </Box>
                </Box>
                <Stack w="full" align="flex-start">
                  <label style={{fontSize: '12px'}}>Dividend per unit</label>
                  <InputGroup
                    align="center"
                    border="1px solid #E4E4E4"
                    h="45.5px"
                    borderRadius={'8px'}
                  >
                    <PriceMenu fillForNairaSvgIcon="#191919" disableMenu />
                    <Divider orientation="vertical" ml="4px" height="full" />
                    <Input
                      w="full"
                      type="text"
                      className="formik__field"
                      style={{
                        color: '#606060',
                        fontWeight: '500',
                        ...PriceInputWrapperStyle,
                        padding: '0 8px',
                        borderColor: 'transparent',
                      }}
                      name={`amount`}
                      onChange={formik.handleChange}
                      value={
                        formatAmount(formik.values.amount) == 'NaN'
                          ? ''
                          : formatAmount(formik.values.amount)
                      }
                    />
                  </InputGroup>
                  <Text color="#606060" fontSize={'8px'}>
                    Amount Per Fraction: <span style={{fontWeight: '600'}}>{'#50,000,000'}</span>
                  </Text>
                </Stack>
                <Box position="relative">
                  <Textarea
                    sx={customScrollbarStyles}
                    h="146px"
                    w="full"
                    id="note"
                    resize="none"
                    fontSize="14px"
                    color="#606060"
                    fontWeight="400"
                    maxLength={4500}
                    borderRadius="8px"
                    p="10px 17px 23px"
                    placeholder="Add note..."
                    focusBorderColor="#E5E5E5"
                    value={formik.values.note}
                    onChange={formik.handleChange}
                    _placeholder={{color: '#60606073', fontSize: '12px', fontWeight: '400'}}
                  />
                  {formik.values?.note?.length > 263 ? null : (
                    <Text
                      position="absolute"
                      bottom="5px"
                      right="9px"
                      fontSize="12px"
                      fontWeight="400"
                      color="#919191"
                    >
                      Max 5000 words
                    </Text>
                  )}
                </Box>
                <Button
                  width="350px"
                  fontWeight="400"
                  fontStyle="normal"
                  fontSize="16px"
                  variant={'dark'}
                  borderRadius="full"
                  border="1px solid #000"
                  fontFamily="Euclid Circular B"
                  type="submit"
                  isDisabled={!areAllFieldsFilled}
                  h='45.5px'
                >
                  {mutation.isLoading ? <Spinner color="#FFFFFF" /> : 'Proceed'}
                </Button>
              </Stack>
            ) : (
              <VerifyUserViaOTP
                showVerifyComponent={showVerifyComponent}
                initiatePaymentOnSubmit={initiatePaymentOnSubmit}
                setShowVerifyComponent={setShowVerifyComponent}
                dividendPayloadOnSubmit={dividendPayloadOnSubmit}
              />
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default MakeDividendPayment;
