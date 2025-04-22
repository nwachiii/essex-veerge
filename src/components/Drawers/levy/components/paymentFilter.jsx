import {
  Button,
  Heading,
  MenuItem,
  Menu,
  MenuButton,
  MenuList,
  Stack,
  Icon,
  Text,
} from '@chakra-ui/react';
import React, {useState} from 'react';
import CustomRadio from './utils/CustomRadio';
import PaymentFilerRadio from './paymentFilerRadio';
import {CalenderMenu} from '@/components/common/Calendar/CalenderMenu';
import {changeDateFormat} from 'utils/formatDate';
import {FaChevronDown} from 'react-icons/fa';

const pastPaymentRadioList = [
  {
    name: 'All Time',
    value: 'all',
  },
  {
    name: '3 Days Ago',
    value: '3',
  },
  {
    name: '1 Week Ago',
    value: '1 week',
  },
  {
    name: '1 Month Ago',
    value: '1 month',
  },
];
const incomingPaymentRadioList = [
  {
    name: 'All Time',
    value: 'all',
  },
  {
    name: '3 Days',
    value: '3',
  },
  {
    name: '1 Week',
    value: '1 week',
  },
  {
    name: '1 Month',
    value: '1 month',
  },
];

const listObj = {
  incoming: incomingPaymentRadioList,
  past: pastPaymentRadioList,
};

const PaymentFilter = ({type}) => {
  const [matDate, setMatDate] = useState('');

  const handleSelectedDate = setDate => {
    setMatDate(changeDateFormat(setDate, 'yyyy-mm-dd'));
  };
  const handleChange = value => {};
  return (
    <Menu autoSelect={false} autoFocus={false}>
      <MenuButton
        minW={'fit-content'}
        p="8px 16px"
        borderRadius="6px"
        border="1px solid #e4e4e7"
        _focus={{
          bg: 'transparent',
        }}
        _hover={{
          bg: 'transparent',
        }}
        _active={{
          bg: 'transparent',
        }}
        iconSpacing="10px"
        rightIcon={<Icon as={FaChevronDown} boxSize="16px" color="#18181b" />}
        fontSize="13px"
        fontWeight="500"
        bg="transparent"
        color="#18181b"
        as={Button}
      >
        All Time
      </MenuButton>

      <MenuList
        p="20px 8px 8px"
        // boxShadow="none"
        boxShadow="2px 5px 17px 6px #e5e5e5 !important"
        _focus={{
          boxShadow: '2px 5px 17px 6px #e5e5e5 !important',
        }}
        _active={{
          boxShadow: '2px 5px 17px 6px #e5e5e5 !important',
        }}
        _focusVisible={{
          boxShadow: '2px 5px 17px 6px #e5e5e5 !important',
        }}
        minW="176px"
        minH="fit-content"
        borderRadius="4px"
        border="0.5px solid #e4e4e7"
      >
        <Stack h="full" w="full" spacing="20px">
          <Stack spacing="16px">
            <Heading fontSize="13px" fontWeight="500" color="#3f3f46">
              Payment Type
            </Heading>
            <CustomRadio
              data={listObj[type]}
              handleChange={handleChange}
              Component={PaymentFilerRadio}
            />
          </Stack>
          <Stack spacing="16px">
            <Heading fontSize="13px" fontWeight="500" color="#3f3f46">
              Date Range
            </Heading>
            <Stack spacing="5px" w="full" justifySelf="end" position="relative">
              <Text as="label" fontSize="13px" fontWeight="400" color="#3f3f46">
                From
              </Text>

              <CalenderMenu
                mainDate={matDate}
                headerText="Select"
                menuWrapperStyles={{
                  placement: 'left',
                }}
                handleSelectedDate={startDate => handleSelectedDate(startDate)}
                imageStyles={{boxSize: '19.473px'}}
                menuBtnStyle={{width: '100%', h: '36px', _focus: {borderColor: '#a1a1a1'}}}
                btnTextStyle={{fontSize: '16px', color: '#71717a', fontWeight: '400'}}
                btnStyle={{width: '100%', h: '36px', borderRadius: '8px'}}
                datePickerObj={{minDate: false, maxDate: new Date()}}
              />
            </Stack>
            <Stack spacing="5px" w="full" justifySelf="end" position="relative">
              <Text as="label" fontSize="13px" fontWeight="400" color="#3f3f46">
                To
              </Text>

              <CalenderMenu
                mainDate={matDate}
                menuWrapperStyles={{
                  placement: 'left',
                }}
                headerText="Select"
                handleSelectedDate={startDate => handleSelectedDate(startDate)}
                imageStyles={{boxSize: '19.473px'}}
                menuBtnStyle={{width: '100%', h: '36px', _focus: {borderColor: '#a1a1a1'}}}
                btnTextStyle={{fontSize: '16px', color: '#71717a', fontWeight: '400'}}
                btnStyle={{width: '100%', h: '36px', borderRadius: '8px'}}
                datePickerObj={{minDate: new Date(), maxDate: false}}
              />
            </Stack>
          </Stack>
          <Button h="44px" variant="md-filled-radius" w="full">
            Apply Filter
          </Button>
        </Stack>
      </MenuList>
    </Menu>
  );
};

export default PaymentFilter;
