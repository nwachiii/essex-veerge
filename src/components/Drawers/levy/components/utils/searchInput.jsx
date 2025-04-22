import SearchIcon from '@/components/assets/searchIcon';
import {
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  useOutsideClick,
} from '@chakra-ui/react';
import React, {useEffect, useRef, useState} from 'react';
import {MdCancel} from 'react-icons/md';

const customScrollStyle = {
  overflow: 'auto',
  'scrollbar-width': 'none',

  '&::-webkit-scrollbar': {
    display: 'none',
  },
};

const SearchInput = ({inputGroupWrapper, addonStyles, inputStyles}) => {
  const [active, setActive] = useState(false);
  const [text, setText] = useState('');

  const inputRef = useRef(null);
  const inputWrapperRef = useRef(null);

  useEffect(() => {
    if (active && inputRef.current) {
      inputRef.current.focus();
    }
  }, [active]);

  useOutsideClick({
    ref: inputWrapperRef,
    handler: () => setActive(false),
  });

  const handleChange = event => {
    const {value} = event.target;
    setText(value);
  };
  const handleClear = () => {
    setText('');
    inputRef.current.focus();
  };

  return (
    <InputGroup
      w={active ? '152px' : '43px'}
      h="43px"
      overflowX="scroll"
      border="1px solid "
      bg={active ? '#fafafa' : 'transparent'}
      borderColor={active ? '#e4e4e7' : 'transparent'}
      transition="0.3s ease-in-out"
      borderRadius="8px"
      ref={inputWrapperRef}
      sx={customScrollStyle}
      {...(!inputGroupWrapper ? {} : inputGroupWrapper(active))}
    >
      <InputLeftElement onClick={() => setActive(!active)} role="button" {...addonStyles}>
        <SearchIcon
          display="flex"
          justifyConten="center"
          alignItems="center"
          border="none"
          boxSize="20px"
          p="0px"
        />
      </InputLeftElement>
      <Input
        ref={inputRef}
        pointerEvents={active ? 'default' : 'none'}
        border="none"
        value={text}
        onChange={handleChange}
        {...inputStyles}
      />

      <InputRightElement
        opacity={active ? 1 : 0}
        transition="0.4s  ease-in-out"
        pointerEvents={active ? 'default' : 'none'}
        pr="9px"
        w="fit-content"
        role="button"
        {...addonStyles}
      >
        <Icon as={MdCancel} onClick={handleClear} color="#52525b" />
      </InputRightElement>
    </InputGroup>
  );
};

export default SearchInput;
