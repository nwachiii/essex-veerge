import {useSharedInputStyles} from '../../ui-lib.hooks';
import {
  Input as InputBase,
  SlideFade,
  VStack,
  Text,
  HStack,
  useNumberInput,
  Button,
  Flex,
  FormLabel,
} from '@chakra-ui/react';
import {useState} from 'react';
import PhoneInput from 'react-phone-input-2';
import AnimateInput from '../../../components/AnimateInput';

export const InputLabel = ({label, isAuth, ...rest}) => {
  return (
    <Text
      className={isAuth ? 'auth__inputLabel' : ''}
      color={isAuth ? '#FFFFFF' : '#191919'}
      textStyle="p"
      textAlign="left"
      opacity={0.9}
      w="100%"
      fontWeight={'600'}
      {...rest}
    >
      {label}
    </Text>
  );
};

export const Input = ({
  isAuth,
  isDefault,
  noLabel,
  error,
  label,
  labelStyle,
  notes,
  hideErrorMsg,
  errorStyle,
  inputwrapperStyle,
  ...restProps
}) => {
  const inputCommonStyles = useSharedInputStyles(isAuth, isDefault);
  const [showLabel, setShowLabel] = useState(false);

  const handleLabel = () => {
    setShowLabel(!showLabel);
  };

  const numberInputOnWheelPreventChange = e => {
    const inputValue = e.target.value;
    const regex = /^[0-9]*$/; // Regular expression to match only positive numbers

    if (!regex.test(inputValue)) {
      e.preventDefault();
      return;
    }

    e.target.blur();
    // Prevent the page/container scrolling
    e.stopPropagation();

    setTimeout(() => {
      e.target.focus();
    }, 0);
  };

  function handleKeyDown(event) {
    // Prevent '-' character
    if (event.key === '-') {
      event.preventDefault();
    }
  }

  function handlePaste(event) {
    const pasteData = (event.clipboardData || window.clipboardData).getData('text');
    if (pasteData.startsWith('-')) {
      event.preventDefault();
    }
  }

  return (
    <>
      {isAuth ? (
        <VStack my={2} w="100%" position={'relative'}>
          <InputBase
            w="full"
            bg="#1a1a1a"
            border="none"
            color="#FFFFFF"
            as="input"
            {...restProps}
            {...inputCommonStyles}
            className={
              isDefault
                ? 'defaultInputField authInputField'
                : isAuth
                  ? 'authInputField'
                  : 'inputField'
            }
            outline="none"
            transition="0.1s ease-out"
            onPaste={handlePaste}
            onKeyDown={handleKeyDown}
            onWheel={numberInputOnWheelPreventChange}
          />

          <FormLabel
            fontSize={'1rem'}
            className={'auth__inputLabel'}
            bg={`${!isAuth ? '#FFFFFF' : 'transparent'}`}
            color={isAuth ? 'lightgray' : '#191919'}
            {...restProps._placeholder}
          >
            {restProps.placeholder}
          </FormLabel>

          {!notes && (
            <SlideFade in={!!error} offsetY="20px">
              <Text textStyle="p-sm" color="red">
                {error}
              </Text>
            </SlideFade>
          )}
        </VStack>
      ) : (
        <VStack alignItems="stretch" w="100%" spacing={'2px'} {...inputwrapperStyle}>
          {noLabel ? null : (
            <InputLabel
              fontSize="14px"
              pl="7px"
              isAuth={isAuth}
              as="label"
              label={label ?? restProps.placeholder}
              {...labelStyle}
            />
          )}

          <InputBase
            as="input"
            {...inputCommonStyles}
            {...restProps}
            onClick={handleLabel}
            borderColor={error ? 'red !important' : inputCommonStyles.borderColor}
            variant={'outline'}
            onWheel={numberInputOnWheelPreventChange}
          />

          {hideErrorMsg ? null : (
            <SlideFade in={!!error} offsetY="20px">
              <Text textStyle="p-sm" color="red" {...errorStyle}>
                {error}
              </Text>
            </SlideFade>
          )}
        </VStack>
      )}
    </>
  );
};

export function CustomNumberInput({placeholder, ...restProps}) {
  const {getInputProps, getIncrementButtonProps, getDecrementButtonProps} = useNumberInput({
    step: 0.01,
    min: 1,
    precision: 2,
    placeholder: placeholder,
  });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();

  return (
    <HStack w="full" pos="relative">
      <AnimateInput labelColor={'#19191966'} {...input} {...restProps} />
    </HStack>
  );
}

export function CustomPhoneNumberInput({id, name, phoneState, setPhoneState, ...restProps}) {
  const telInputStyles = {
    width: '100%',
    height: '55px',
    padding: '1em',
    marginTop: '1.5em',
    borderRadius: '12px',
    border: '0.5px lightgrey solid',
  };

  const telInputProps = {
    required: true,
    autoFocus: true,
    placeholder: 'Enter phone number',
  };

  return (
    <PhoneInput
      id={id}
      name={name}
      type="tel"
      country={'ng'}
      inputProps={telInputProps}
      inputStyle={telInputStyles}
      defaultValue={phoneState}
      {...restProps}
      onKeyPress={e => (e.cancelable ? e.preventDefault() : console.log(''))}
      onChange={phone => setPhoneState(phone)}
    />
  );
}

Input.Label = InputLabel;
