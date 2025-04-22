import {Text, Box} from '@chakra-ui/react';
import {Input} from 'ui-lib';

export const NumberInputField = ({labelText, numberInputLabel, onChange, ...rest}) => {
  const numberInputOnWheelPreventChange = e => {
    const inputValue = e.target.value;
    const regex = !/^[0-9]+(\.[0-9]+)?$/; // Regular expression to match only positive numbers

    if (
      !regex.test(inputValue) ||
      parseFloat(inputValue) < 0 ||
      /[+\-*/^%]/.test(inputValue) ||
      /[+\-]/.test(inputValue)
    ) {
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
    <Box w="full" maxW="390px">
      <Text pb={2} fontSize="12px" fontWeight="400" {...labelText}>
        {numberInputLabel}
      </Text>
      <Input
        mx={1}
        noLabel
        min="0"
        type="number"
        pattern="^[0-9]*$"
        onChange={onChange}
        onPaste={handlePaste}
        onKeyDown={handleKeyDown}
        border="1px solid lightgray"
        onWheel={numberInputOnWheelPreventChange}
        placeholder="Enter number"
        _placeholder={{
          color: 'gray.500',
        }}
        {...rest}
      />
    </Box>
  );
};
