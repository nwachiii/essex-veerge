import {CalenderMenu} from '@/components/common/Calendar/CalenderMenu';
import {
  Button,
  Divider,
  DrawerBody,
  DrawerCloseButton,
  DrawerFooter,
  Flex,
  HStack,
  Image,
  Input,
  InputGroup,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react';
import {PriceMenu} from 'pages/listings/create/WholeUnits/WholeUnits.Form';
import React, {useState} from 'react';
import {formatNumberWithCommas, formatToCurrency} from 'utils/formatAmount';
import {changeDateFormat} from 'utils/formatDate';
import moreOptionsIcon from '/src/images/icons/levyMoreOptionsIcons.svg';
import {IoArrowBackSharp} from 'react-icons/io5';

const formatNumberObj = {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
};
const UpdatePayment = ({setMainScreen}) => {
  const [matDate, setMatDate] = useState('');
  const [amount, setAmount] = useState('');

  const handleSelectedDate = setDate => {
    setMatDate(changeDateFormat(setDate, 'yyyy-mm-dd'));
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
    setAmount(val);
  };
  return (
    <>
      <HStack
        borderBottom="0.5px solid #e4e4e7"
        box-shadow=" 0px 2px 4px 0px #0000000D"
        py="7px"
        bg="#fafafa"
        h="50px"
        px="20px"
        justify="space-between"
        align="center"
        position="relative"
        width="full"
      >
        <Flex alignItems="center" gap="10px">
          <IoArrowBackSharp
            fontSize="20px"
            cursor="pointer"
            onClick={() => setMainScreen('track payment')}
          />
          <Text fontSize="16px" fontWeight={600} color="#18181b">
            Levy
          </Text>
        </Flex>
      </HStack>
      <DrawerBody pt="24px" px={'20px'}>
        <Stack spacing="24px" w="full">
          <Stack spacing="5px" w="full" justifySelf="end" position="relative">
            <Text as="label" fontSize="13px" fontWeight="500" color="#3f3f46">
              Payment Date
            </Text>

            <CalenderMenu
              mainDate={matDate}
              handleSelectedDate={startDate => handleSelectedDate(startDate)}
              imageStyles={{boxSize: '19.473px'}}
              menuBtnStyle={{width: '100%', h: '40px', _focus: {borderColor: '#a1a1a1'}}}
              btnTextStyle={{fontSize: '16px', color: '#71717a', fontWeight: '400'}}
              btnStyle={{width: '100%', h: '40.568px', borderRadius: '6.491px'}}
              datePickerObj={{minDate: new Date(), maxDate: false}}
            />
          </Stack>
          <Stack spacing="6px" w="full" justifySelf="end" position="relative">
            <Text as="label" fontSize="13px" fontWeight="500" color="#3f3f46">
              Amount Paid
            </Text>
            <InputGroup h="40px" border="1px solid #e4e4e7" borderRadius={'8px'}>
              <PriceMenu
                styleForIcon={{transform: 'scale(1)'}}
                fillForNairaSvgIcon="#191919"
                disableMenu
              />
              <Divider orientation="vertical" ml="4px" height="full" />
              <Input
                h="40px"
                p="8px 12px"
                onChange={handleAmount}
                value={formatNumberWithCommas(amount, formatNumberObj)}
                name="amount"
                border="none"
                _focus={{
                  borderColor: 'transparent',
                  bg: 'transparent',
                }}
                _hover={{bg: 'transparent'}}
                _focusVisible={{
                  outline: 'none',
                  borderColor: '#a1a1a1',
                }}
                borderRadius="8px"
                w="full"
              />
            </InputGroup>
          </Stack>
        </Stack>
      </DrawerBody>
      <DrawerFooter p="20px 30px" borderTop="0.5px solid #e4e4e7">
        <Button variant="md-filled-radius" w="full">
          Proceed
        </Button>
      </DrawerFooter>
    </>
  );
};

export default UpdatePayment;
