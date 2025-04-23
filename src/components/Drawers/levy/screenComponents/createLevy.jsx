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
  useToast,
} from '@chakra-ui/react';
import {PriceMenu} from 'pages/customers/create/WholeUnits/WholeUnits.Form';
import React, {useState} from 'react';
import {formatNumberWithCommas} from 'utils/formatAmount';
import {changeDateFormat} from 'utils/formatDate';
import moreOptionsIcon from '/src/images/icons/levyMoreOptionsIcons.svg';
import SelectLevyGroup from '../components/levyGroupMenu';
import {useMutation} from '@tanstack/react-query';
import {toastForError} from 'utils/toastForErrors';

const formatNumberObj = {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
};

const CreateLevy = ({setScreen}) => {
  const [matDate, setMatDate] = useState('');
  const [amount, setAmount] = useState('');
  const [source, setSource] = useState('');
  const [text, setText] = useState({
    title: '',
    description: '',
  });

  const toast = useToast();

  const handleChange = e => {
    const {value, name} = e.target;
    setText(prev => ({
      ...prev,
      [name]: value,
    }));
  };
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

  const mutation = useMutation(formData => {}, {
    onSuccess: async res => {},
    onError: err => {
      toastForError(err, true, toast);
    },
  });

  const isValid = amount && text.title.trim() && source;
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
        <Text fontSize="16px" fontWeight={600} color="#18181b">
          Levy
        </Text>

        <HStack spacing="13px">
          <Image
            alt="more options icon"
            role="button"
            onClick={() => setScreen('more options')}
            src={moreOptionsIcon.src}
            _hover={{
              opacity: 0.8,
            }}
          />
          <DrawerCloseButton position="initial" />
        </HStack>
      </HStack>
      <DrawerBody pt="24px" px={'20px'}>
        <Stack spacing="24px" w="full">
          <SelectLevyGroup />
          <Stack spacing="6px" w="full" justifySelf="end" position="relative">
            <Text id="title" as="label" fontSize="13px" fontWeight="500" color="#3f3f46">
              Levy Title
            </Text>
            <Input
              name="title"
              h="40px"
              p="8px 12px"
              _hover={{bg: 'transparent'}}
              _focusVisible={{
                borderColor: '#a1a1a1',
              }}
              value={text.title}
              onChange={handleChange}
              border="1px solid #e4e4e7"
              borderRadius="8px"
              w="full"
            />
          </Stack>
          <Stack spacing="6px" w="full" justifySelf="end" position="relative">
            <Text as="label" fontSize="13px" fontWeight="500" color="#3f3f46">
              Amount
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
          <Stack spacing="6px" w="full" justifySelf="end" position="relative">
            <Text id="description" as="label" fontSize="13px" fontWeight="500" color="#3f3f46">
              Levy Description (optional)
            </Text>
            <Textarea
              h="78px"
              name="description"
              p="8px 12px"
              _focusVisible={{
                borderColor: '#a1a1a1',
              }}
              value={text.description}
              onChange={handleChange}
              border="1px solid #e4e4e7"
              borderRadius="8px"
              w="full"
              resize="none"
            />
          </Stack>
          <Stack spacing="5px" w="full" justifySelf="end" position="relative">
            <Text as="label" fontSize="13px" fontWeight="500" color="#3f3f46">
              Due Date (optional)
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
        </Stack>
      </DrawerBody>
      <DrawerFooter p="20px 30px" borderTop="0.5px solid #e4e4e7">
        <Button
          isLoading={mutation.isLoading}
          isDisabled={!isValid}
          variant="md-filled-radius"
          w="full"
        >
          Create Levy
        </Button>
      </DrawerFooter>
    </>
  );
};

export default CreateLevy;
