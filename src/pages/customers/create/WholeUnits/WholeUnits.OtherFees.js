import {DeleteIcon} from '@chakra-ui/icons';
import {
  Box,
  Flex,
  HStack,
  Stack,
  InputGroup,
  SimpleGrid,
  Text,
  useDisclosure,
  useToast,
  Button,
} from '@chakra-ui/react';

import {useEffect, useRef, useState} from 'react';
import {themeStyles} from '../../../../theme';
import {AddMoreBtn, Popup} from 'ui-lib/ui-lib.components';
import PreviewOtherFees from './PreviewOtherFees';
import {PriceInputWrapperStyle, PriceMenu} from './WholeUnits.Form';
import {FaRegLightbulb} from 'react-icons/fa';
import {AiOutlineInfoCircle} from 'react-icons/ai';
import {OTHER_FEES_INFO} from '../../../../constants/createListing';
import ClosingCost from '../../../../components/Drawers/closingCost';
import {scrollBarStyles} from '../../../../components/common/ScrollbarStyling';
import {Field, FieldArray} from 'formik';
import {formatNumberWithCommas, formatToCurrency} from 'utils/formatAmount';
import ResetWarningModal from './WholeUnits.PaymentPlan/resetWarningModal';

function WholeUnitsOtherFees({index, values, unit, setFieldValue}) {
  const bottomRef = useRef(null);
  const closingCostDrawer = useDisclosure();
  const [showUnitPreview, setShowUnitPreview] = useState('false');
  const toast = useToast();
  const FEES_MODAL = useDisclosure();
  const ABOUT_TO_CLEAR_ALL_FIELDS = useDisclosure();
  const LAST_ADDED_FEES = unit?.fees ? unit?.fees[unit?.fees?.length - 1] : [];

  const scrollToBottom = () => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({behavior: 'smooth'});
    }
  };

  const handleModalClose = () => {
    // Check for each field
    LAST_ADDED_FEES?.name == ''
      ? toast({
          title: 'Closing Cost title is required',
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        })
      : LAST_ADDED_FEES.amount == ''
        ? toast({
            title: 'Amount is required',
            status: 'error',
            duration: 3000,
            isClosable: true,
            position: 'top-right',
          })
        : '';
    // Truthy use case
    if (LAST_ADDED_FEES.amount !== '' && LAST_ADDED_FEES.name !== '') {
      FEES_MODAL?.onClose();
      setShowUnitPreview('true');
    }
  };
  const handleReset = async () => {
    await setFieldValue(`units.${index}.fees`, [...OTHER_FEES_INFO]);
    setShowUnitPreview('false');
    ABOUT_TO_CLEAR_ALL_FIELDS.onClose();
    FEES_MODAL?.onClose();
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

  const checkFeesLength = unit?.fees?.length;
  useEffect(() => {
    scrollToBottom();
  }, [checkFeesLength]);

  return (
    <>
      <HStack w="99.7%" justify="space-between" borderBottom={'1px solid #E5E5E5'} py="14px">
        <Text fontSize={'24px'} fontWeight={'500'} color="#191919" ml={0}>
          Does this unit come with{' '}
          <span onClick={closingCostDrawer.onOpen} style={{color: '#4545FE', cursor: 'pointer'}}>
            closing costs
          </span>
          ?
        </Text>
        <AddMoreBtn
          justify="flex-end"
          btnText="Add closing costs"
          clickFunction={FEES_MODAL.onOpen}
        />
      </HStack>
      {unit.fees?.length > 0 && (
        <PreviewOtherFees
          otherFees={unit.fees}
          index={index}
          showPreview={showUnitPreview}
          setFieldValue={setFieldValue}
        />
      )}

      <Popup
        closeOnOverlayClick={false}
        forModal={{blockScrollOnMount: closingCostDrawer.isOpen ? false : true}}
        hideCloseBtn
        size="full"
        minH="fit-content"
        minW={{base: '90%', md: '838px'}}
        px="30px"
        color="#191919"
        isOpen={FEES_MODAL.isOpen}
        onClose={FEES_MODAL.onClose}
      >
        <HStack w="full" justify={'space-between'}>
          <Text fontSize="24px" fontWeight={600} pl={0}>
            Closing Cost
          </Text>

          <Flex
            onClick={closingCostDrawer.onOpen}
            align={'center'}
            justifyContent={'flex-end'}
            display={'flex'}
            gap="2px"
            mt="5px"
            cursor="pointer"
            fontSize={'16px'}
            color="#4545FE"
          >
            <FaRegLightbulb
              fontSize={'18px'}
              fontWeight={'800'}
              color={themeStyles.color.matador__primary}
            />
            <Text>
              <small>Need help?</small>
            </Text>
          </Flex>
        </HStack>
        <Popup.Body overflowY="auto" css={scrollBarStyles} maxH="332px">
          <Flex
            w="full"
            h="fit-content"
            bg="#EAEAEA"
            borderRadius={'12px'}
            align={'center'}
            mx="auto"
            gap="10px"
            py="10px"
            px={'23px'}
          >
            <AiOutlineInfoCircle style={{height: '54px', width: '44px'}} />
            <Text fontSize={'16px'}>
              This is the point where closing costs are added (i.e. Development levy, legal fees
              etc). Fill in the title of the closing cost and input the amount. You can also add
              more fees
            </Text>
          </Flex>
          <FieldArray name={`units.${index}.fees`}>
            {({insert, remove, push}) => (
              <Stack spacing="none" w="full">
                {values?.units[index]?.fees?.length > 0 &&
                  values?.units[index]?.fees?.map((fees, idx) => (
                    <Box key={idx} w="full" position="relative">
                      {idx > 0 && (
                        <HStack w="full" justify={'flex-end'} className="col">
                          <Text
                            display={'flex'}
                            align="center"
                            onClick={() => remove(idx)}
                            cursor="pointer"
                            color="red"
                            position={'absolute'}
                            top="4%"
                            right={0}
                          >
                            <DeleteIcon fontSize={'20px'} color="red" />
                          </Text>
                        </HStack>
                      )}
                      <SimpleGrid
                        w="full"
                        spacing="26px"
                        mt="13px"
                        mb="20px"
                        columns={2}
                        className="row"
                        key={idx}
                      >
                        <Stack spacing="8px" w="374px">
                          <label htmlFor={`units.${index}.fees.${idx}.name`}>
                            Closing cost title
                          </label>

                          <Field
                            autoComplete={false}
                            type="text"
                            placeholder="e.g., documentation fee"
                            className="formik__field"
                            style={{
                              marginTop: '0px',
                              border: '1px solid #E4E4E4',
                            }}
                            id={`units.${index}.fees.${idx}.name`}
                            name={`units.${index}.fees.${idx}.name`}
                          />
                        </Stack>

                        <Stack spacing="8px" w="374px">
                          <label htmlFor={`units.${index}.fees.${idx}.amount`}>Amount</label>
                          <InputGroup
                            align="center"
                            border="1px solid #E4E4E4"
                            borderRadius={'10px'}
                          >
                            <PriceMenu disableMenu />
                            <Field
                              type="text"
                              style={{
                                ...PriceInputWrapperStyle,

                                border: '0px',
                                borderLeft: '1px solid #e4e4e4',
                              }}
                              placeholder="0.00"
                              className="formik__field"
                              name={`units.${index}.fees.${idx}.amount`}
                              value={formatNumberWithCommas(unit?.fees?.[idx]?.amount, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })}
                              onChange={event => handleAmount(event, setFieldValue)}
                            />
                          </InputGroup>
                        </Stack>
                      </SimpleGrid>
                    </Box>
                  ))}
                {Boolean(unit?.fees?.length >= 1) && <Box py={'.8vh'} ref={bottomRef}></Box>}{' '}
                <HStack
                  bg="#ffffff"
                  position="sticky"
                  bottom="0px"
                  justify="space-between"
                  w="full"
                >
                  <Button
                    w="202px"
                    variant="dark"
                    h="55px"
                    onClick={ABOUT_TO_CLEAR_ALL_FIELDS.onOpen}
                    mt={0}
                    borderRadius="72px"
                    bg="#FFFFFF"
                    border={`1px solid ${themeStyles.color.matador__red}`}
                    color={themeStyles.color.matador__red}
                  >
                    Cancel
                  </Button>
                  <HStack>
                    <AddMoreBtn
                      btnText="Add closing cost"
                      clickFunction={() => {
                        push({
                          name: '',
                          amount: '',
                        });
                      }}
                    />
                    <Button
                      mt={0}
                      w="159px"
                      variant="dark"
                      h="55px"
                      borderRadius="72px"
                      onClick={handleModalClose}
                      fontWeight={400}
                    >
                      Proceed
                    </Button>
                  </HStack>
                </HStack>
              </Stack>
            )}
          </FieldArray>
        </Popup.Body>
      </Popup>

      <ResetWarningModal modalDisclosure={ABOUT_TO_CLEAR_ALL_FIELDS} resetFnc={handleReset} />
      <ClosingCost drawerModal={closingCostDrawer} />
    </>
  );
}

export default WholeUnitsOtherFees;
