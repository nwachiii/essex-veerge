import {
  Box,
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  HStack,
  Image,
  Input,
  InputGroup,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import {IoArrowBackSharp} from 'react-icons/io5';
import historyIcon from '/src/images/icons/historyIcon.svg';
import {formatNumberWithCommas, formatToCurrency} from 'utils/formatAmount';
import {PriceMenu} from 'pages/customers/create/WholeUnits/WholeUnits.Form';
import {CalenderMenuAsModal} from '@/components/Modals/send_offer/components/CalendarMenuAsModal';
import infoIcon from '/src/images/icons/infoIconGrey.svg';
import {CalenderMenu} from '@/components/common/Calendar/CalenderMenu';
import UploadEquityPackets from 'pages/residents/create_account/UploadEquityPackets';

const formatNumberObj = {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
};

const InputTransactionInfo = ({
  handleClose,
  manualTransactions,
  payloadObj,
  setPayLoadObj,
  handleScreen,
}) => {
  const customScrollbarStyles = {
    '&::-webkit-scrollbar': {
      width: '4px',
      borderRadius: '16px',
    },
    '&::-webkit-scrollbar-track': {
      borderRadius: '16px',
      WebkitBoxShadow: 'inset 0 0 6px transparent',
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '16px',
      backgroundColor: '#e1e1e1',
      // outline: '1px solid #f5f5f5',
    },
  };
  const handleAmount = event => {
    const input = event.target.value || '';
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
    setPayLoadObj(prev => ({...prev, amount: val}));
  };

  const handleSelectedDate = selectedDate => {
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
    const day = String(selectedDate.getDate()).padStart(2, '0');

    const depositDate = `${year}-${month}-${day}`;

    return setPayLoadObj(prev => ({...prev, depositDate}));
  };

  const handleDoc = (name, value) => {
    const extractBase64 = dataUri => {
      return dataUri ? dataUri.split(',')[1] : null;
    };
    return setPayLoadObj(prev => ({...prev, [name]: extractBase64(value?.[0] ?? '')}));
  };

  const isValid = payloadObj?.amount && payloadObj?.depositDate && payloadObj?.doc;
  return (
    <>
      <HStack
        boxShadow="0px 3.206px 6.413px 0px rgba(0, 0, 0, 0.02)"
        mb="10px"
        py="12px"
        bg="#F5F5F5"
        h="49.7px"
        px="23.2px"
        justify="space-between"
        align="center"
        position="relative"
        width="full"
      >
        <Flex alignItems="center" gap={2}>
          <IoArrowBackSharp fontSize="20px" cursor="pointer" onClick={handleClose} />
          <Text fontSize="20px" fontWeight={600} color="#191919">
            Update Deposit
          </Text>
        </Flex>
        <HStack spacing="15px">
          {manualTransactions?.length ? (
            <Image
              alt="history Icon"
              src={historyIcon.src}
              role="button"
              onClick={handleScreen('update deposit history')}
              boxSize="37px"
            />
          ) : null}

          <VStack
            position="relative"
            justify="center"
            align="center"
            w="30px"
            h="30px"
            borderRadius="5px"
            transition="0.3s ease-in-out"
            _hover={{
              width: '30px',
              height: '30px',
            }}
          >
            <DrawerCloseButton position="initial" />
          </VStack>
        </HStack>
      </HStack>
      <DrawerBody pb="10px" mb="10px" sx={customScrollbarStyles} px="28px" pr="17px" mr="8px">
        <Stack spacing="24px" w="full">
          <Stack gap={`10px`} w={`100%`}>
            <Text
              fontFamily="Euclid Circular B"
              ml={0}
              mb="0px"
              fontWeight="400"
              color="#4b4b4b"
              fontSize="12px"
            >
              Amount
            </Text>
            <InputGroup
              align="center"
              border="1px solid #E4E4E4"
              h="50px"
              w="full"
              borderRadius={'8px'}
              py="4px"
            >
              <PriceMenu
                styleForIcon={{transform: 'scale(1)'}}
                fillForNairaSvgIcon="#000000"
                disableMenu
              />
              <Divider orientation="vertical" ml="4px" height="full" />

              <Input
                borderColor="transparent"
                borderLeft="none"
                boxShadow="none"
                marginBottom="0px"
                border="none"
                _focusVisible={{
                  border: 'none',
                }}
                fontWeight="500"
                fontSize="14px"
                w="full"
                height="100%"
                color="#606060"
                onChange={handleAmount}
                placeholder="0.00"
                type="text"
                value={
                  Number(payloadObj.amount || 0)
                    ? formatNumberWithCommas(payloadObj.amount, formatNumberObj)
                    : ''
                }
              />
            </InputGroup>
          </Stack>
          <Stack
            spacing="2.1px"
            position="relative"
            justifySelf="flex-end"
            className="col"
            gap="8px"
            w={`100%`}
          >
            <label
              htmlFor={`offer_expiration`}
              style={{fontWeight: '400', color: '#4b4b4b', fontSize: '12px'}}
            >
              Deposit Date
            </label>

            <CalenderMenu
              mainDate={payloadObj?.depositDate}
              handleSelectedDate={startDate => handleSelectedDate(startDate)}
              imageStyles={{boxSize: '24px'}}
              menuBtnStyle={{w: '100%', h: '50px'}}
              btnTextStyle={{fontSize: '10.722px', fontWeight: '500'}}
              btnStyle={{w: '100%', h: '50px', borderRadius: '8px'}}
              datePickerObj={{maxDate: new Date(), minDate: new Date(0)}}
            />
            {/* 
            <CalenderMenuAsModal
              mainDate={payloadObj?.depositDate}
              handleSelectedDate={startDate => handleSelectedDate(startDate)}
              imageStyles={{boxSize: '24px'}}
              menuBtnStyle={{w: '100%', h: '50px'}}
              btnTextStyle={{fontSize: '10.722px', fontWeight: '500'}}
              btnStyle={{w: '100%', h: '50px', borderRadius: '8px'}}
              datePickerObj={{maxDate: new Date(), minDate: new Date(0)}}
            /> */}
          </Stack>
          <Stack gap={`10px`} w={`100%`}>
            <Text
              fontFamily="Euclid Circular B"
              ml={0}
              mb="0px"
              fontWeight="400"
              color="#4b4b4b"
              fontSize="12px"
            >
              Upload Receipt
            </Text>
            <Box>
              <UploadEquityPackets
                fieldName={`doc`}
                labelStyle={{
                  fontWeight: '400',
                  fontSize: '12px',
                  display: 'none',
                }}
                docUploadStyle={{
                  w: 'full',
                  alignSelf: 'end',
                }}
                selectDocStyle={{
                  wrapperStyle: {
                    h: '50px',
                    w: 'full',
                    borderRadius: '8px',
                  },
                  uploadBtnStyle: {
                    p: '6.282px 8.974px',

                    bg: '#919191',
                    fontSize: '10.769px',
                    textAlign: 'center',
                  },
                  emptyStateTextStyle: {
                    fontSize: '10.715px',
                  },
                }}
                selectedDocStyle={{
                  wrapper: {h: '50px', w: 'full', borderRadius: '8px'},
                  DocImg: {boxSize: '10.615px'},
                  DocImgWrapper: {
                    boxSize: '30.23px',
                    p: '0px',
                    justify: 'center',
                  },
                  text: {fontSize: '10.715px', fontWeight: 400},
                  trashImg: {boxSize: '18px'},
                }}
                inputPropObj={{
                  accept:
                    '.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf,image/*',
                }}
                setFieldValue={handleDoc}
              />
            </Box>
          </Stack>
        </Stack>
        <Stack mt="8.04px" spacing="34px">
          <HStack spacing="8px" align="start">
            <Image src={infoIcon.src} alt="info icon" />
            <Text fontSize="12px" fontWeight="300">
              Ensure you upload the payment receipt for future reference. The receipt can be easily
              accessed in the Owners Packet section, where both you and the subscriber have access
              to it. Additionally, you can add a short note in the Notes section as a reminder when
              needed.
            </Text>
          </HStack>
          <Button
            w="full"
            h="45px"
            borderRadius="72px"
            isDisabled={!isValid}
            bg="#191919"
            color="#fff"
            fontSize="14.617px"
            fontWeight="400"
            _hover={{
              opacity: '1',
            }}
            onClick={handleScreen('2fa')}
            _focus={{opacity: '1'}}
            _active={{opacity: '1'}}
          >
            Proceed
          </Button>
        </Stack>
      </DrawerBody>
    </>
  );
};

export default InputTransactionInfo;
