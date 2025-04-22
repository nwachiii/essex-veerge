import {DropDownComponent} from '@/components/Modals/send_offer/components/dropDown';
import {Input, InputGroup, InputRightElement} from '@chakra-ui/react';
import React from 'react';
import {formatTimeInput} from 'utils/formatDate';
const customScrollbarStyles = (trackColor = '#fff', thumbColor = '#cbcbcb') => ({
  '&::-webkit-scrollbar': {
    width: '4px',
    borderRadius: '16px',
  },
  '&::-webkit-scrollbar-track': {
    borderRadius: '16px',
    WebkitBoxShadow: `inset 0 0 6px ${trackColor}`,
  },
  '&::-webkit-scrollbar-thumb': {
    borderRadius: '16px',
    backgroundColor: thumbColor,
  },
});

const timePeriod = [
  {name: 'AM', value: 'am'},
  {name: 'PM', value: 'pm'},
];
const inputStyle = {
  _focus: {boxShadow: 'none', borderColor: '#e4e4e4'},
  _focusVisible: {
    boxShadow: 'none',
    borderColor: '#e4e4e4',
  },
};

const TimeInput = ({name, meridiem, setTime, time, handleMeridiem}) => {
  const displayDropDownDefaultName = (dropDownArray, valueOfdropDown) => {
    return dropDownArray.find(item => item.value === valueOfdropDown)?.name ?? '';
  };
  const handleTime = e => {
    const input = e.target.value;

    // Format the input as "hh:mm"
    const formattedTime = formatTimeInput(input);

    return setTime(name, formattedTime);
  };

  return (
    <InputGroup h="50px" position="relative">
      <Input
        id="time"
        placeholder="HH:MM"
        _placeholder={{
          fontSize: '14px',
          fontWeight: '400px',
        }}
        type="text"
        h="full"
        w="full"
        name="time"
        borderRadius="8px"
        value={time}
        onChange={handleTime}
        {...inputStyle}
      />
      <InputRightElement minW="fit-content" minH="50px" right="0px">
        <DropDownComponent
          setFieldValue={handleMeridiem}
          fieldName={`meridiem`}
          defaultDropName={displayDropDownDefaultName(timePeriod, meridiem)}
          dropDownArray={timePeriod}
          dropDownValue={meridiem}
          dropDownStyle={{
            btn: {
              w: '60px',
              h: '50px',
              mt: '0px',
              p: '0px',
              pl: '5px',
              borderLeftRadius: '0px',
              borderRight: 'none',
              borderTop: 'none',
              borderBottom: 'none',
            },

            label: {
              display: 'none',
            },
            menuList: {
              w: '50px',
              position: 'relative',
              zIndex: 20000,
              sx: customScrollbarStyles(),
            },
          }}
          dropDownIconStyle={{boxSize: '24px'}}
          dropDownMenuStyle={{
            flip: false,
            placement: 'top-start',
          }}
        />
      </InputRightElement>
    </InputGroup>
  );
};

export default TimeInput;
