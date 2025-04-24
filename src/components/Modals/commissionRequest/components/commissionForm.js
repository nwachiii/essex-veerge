import {
  Box,
  Center,
  Checkbox,
  Divider,
  HStack,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  NumberInputField,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react';
import React from 'react';
import nairaIcon from '/src/images/icons/nairaIconForAccount.svg';
import {useState} from 'react';
import selectedIcon from '/src/images/icons/mark_icon.svg';
import {formatToCurrency} from 'utils/formatAmount';
// import UploadEquityPackets from 'pages/residents/create_account/CustomerListingDetails/UploadEquityPackets';
import {PriceMenu} from 'pages/customers/create/WholeUnits/WholeUnits.Form';
import UploadEquityPackets from 'pages/residents/create_account/UploadEquityPackets';

export const CommissionForm = ({
  amount,
  setAmount,
  viewInfo: {
    data: {agent, customer},
  },
  setNote,
  pastPayment,
  setGiveAccess,
  note,
  giveAccess,
  commissionAmountError,
  setCommissionAmountError,
  receipt,
  setReceipt,
}) => {
  const [equityPacketName, setEquityPacketName] = useState('');
  const setFieldValue = (name, val) => {
    setReceipt({name, val: val?.[0] ?? ''});
  };

  const handleInput = e => {
    const totalPaid = pastPayment
      ? pastPayment.reduce((acc, currentValue) => acc + Number(currentValue.amount), 0)
      : 0;
    const input = e || '';
    let val = input;

    const cleanedString = val.replace(/[^\d]/g, ''); // Remove non-numeric characters
    val = cleanedString.replace(/^0+(?=\d)/, '');

    const length = val.length;

    if (length <= 2) {
      val = '0.' + val.padStart(2, '0');
    } else {
      const integerPart = val.slice(0, length - 2);
      const decimalPart = val.slice(-2);
      val = integerPart + '.' + decimalPart;
    }

    return Number(val) >= Number(totalPaid)
      ? (setCommissionAmountError('commission amount can not exceed the paid amount'), val)
      : (setCommissionAmountError(''), val);
  };
  const handleChange = e => {
    const {type, value, checked} = e.target;

    switch (type) {
      case 'number':
        return setAmount(handleInput(value));
        break;
      case 'checkbox':
        return setGiveAccess(checked);
        break;
      case 'textarea':
        return setNote(value);
        break;
      default:
        break;
    }
  };
  return (
    <Stack
      flex={`1`}
      p={`12px`}
      border="0.5px solid #E4E4E4"
      borderRadius="12px"
      gap="8px"
      background={`#FBFCFC`}
    >
      <Stack spacing="6.525px">
        <Text as="label" fontSize="12px" color="#606060" fontWeight="400">
          Commission amount
        </Text>
        <HStack mb="10px" w="full">
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              {/* <Center borderRight={`1px solid #e4e4e4`} px={`8px`} h={`100%`}>
                <Image src={nairaIcon.src} alt="naira icon" boxSize={`20px`} />
              </Center> */}
              <PriceMenu
                styleForIcon={{transform: 'scale(0.7)'}}
                fillForNairaSvgIcon="#12D8A0"
                disableMenu
              />
            </InputLeftElement>
            <Input
              h="100%"
              py="13px"
              px="30px"
              borderRadius="4px"
              border="1px solid #E4E4E4"
              placeholder=""
              type="number"
              value={amount}
              fontSize={`12px`}
              onChange={handleChange}
              _focus={{outline: `none`}}
              _focusVisible={{outline: `none`}}
              _active={{outline: `none`}}
              w="full"
            />
          </InputGroup>
        </HStack>
        {commissionAmountError ? (
          <Text color="red.400" fontSize="12px" mt="-8px" fontWeight="400">
            {commissionAmountError}
          </Text>
        ) : null}
      </Stack>
      <Stack spacing="6.525px">
        <Text as="label" fontSize="12px" color="#606060" fontWeight="400">
          Upload Receipt (optional)
        </Text>
        <UploadEquityPackets
          fieldName={`receipt`}
          labelStyle={{
            display: 'none',
          }}
          inputPropObj={{
            accept: '.pdf, image/jpeg, image/png',
          }}
          docUploadStyle={{
            w: 'full',
            alignSelf: 'end',
          }}
          selectDocStyle={{
            wrapperStyle: {
              h: '48px',
              w: 'full',
              borderRadius: '8px',
            },
            uploadBtnStyle: {
              p: '5.56px 7.94px',

              bg: '#191919',
              fontSize: '10.715px',
              textAlign: 'center',
            },
            emptyStateTextStyle: {
              fontSize: '10.715px',
            },
          }}
          selectedDocStyle={{
            wrapper: {h: '48px', w: 'full', borderRadius: '8px'},
            DocImg: {boxSize: '10.615px'},
            DocImgWrapper: {
              boxSize: '21.23px',
              p: '0px',
              justify: 'center',
            },
            text: {fontSize: '10.715px', fontWeight: 400},
            trashImg: {boxSize: '13px'},
          }}
          setFieldValue={setFieldValue}
          equityPacketName={equityPacketName}
          defaultDocObj={{name: ''}}
          setEquityPacketName={setEquityPacketName}
        />
      </Stack>
      <Stack gap="3px">
        <Text as="label" fontSize="12px" color="#606060" fontWeight="400">
          Note
        </Text>{' '}
        <Textarea
          onChange={handleChange}
          value={note}
          resize="none"
          borderRadius="4px"
          border="1px solid #e4e4e4"
          fontSize="11.419px"
          fontWeight="400"
          _placeholder={{
            color: '#919191',
          }}
          placeholder="Leave a note..."
          p="13px"
          w="full"
          h="178px"
          _focus={{outline: `none`}}
          _focusVisible={{outline: `none`}}
          _active={{outline: `none`}}
        />
      </Stack>
      {/* <HStack spacing="8.157px" onClick={handleChange} align="start">
        <Checkbox
          onChange={handleChange}
          _focus={{
            border: 'none',
            outline: 'none',
          }}
          _active={{
            border: 'none',
            outline: 'none',
          }}
          border="none"
          icon={
            <HStack align="center" justify="center" borderRadius="3px" p="1px" bg="#D9D9D9">
              <Box w="15.498px" h="15.498px">
                <Image
                  src={selectedIcon.src}
                  alt="selected equity icon "
                  m="0"
                  w="full"
                  h="full"
                  sx={{transition: 'ease-in-out 0.5s'}}
                  opacity={giveAccess ? '1' : '0'}
                />
              </Box>
            </HStack>
          }
          value={giveAccess}
        />{' '}
        <Text fontSize="11.419px" fontWeight="400">
          By checking this box,{' '}
          <Text as="span" textTransform="capitalize" color="#4545FE">
            {agent?.first_name ?? '-'} {agent?.last_name ?? '-'}
          </Text>{' '}
          will be granted access to view the transaction details, and she will receive notifications
          whenever{' '}
          <Text as="span" color="#4545FE" textTransform="capitalize">
            {`${customer?.first_name ?? '-'} ${customer?.last_name ?? '-'} `}
          </Text>
          makes a payment or defaults.
        </Text>
      </HStack> */}
    </Stack>
  );
};

export default CommissionForm;
