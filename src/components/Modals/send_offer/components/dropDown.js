import {
  Button,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Select,
  Stack,
  Text,
} from '@chakra-ui/react';
import {Field} from 'formik';
import React, {useEffect} from 'react';
import dropDownIcon from '/src/images/icons/dropDownForRoleSelection.svg';
import {useState} from 'react';

export const DropDownComponent = ({
  placeHolderText,
  header,
  dropDownValue,
  resetDropName,
  setFieldValue,
  additionalFunc,
  fieldName,
  dropDownArray,
  values,
  val,
  dropDownIconStyle,
  defaultDropName,
  disableOption,
  dropDownMenuStyle,
  dropDownStyle = {
    wrapper: {},
    label: {},
    btn: {},
    menuList: {},
  },
}) => {
  const [dropDownName, setDropDownName] = useState(defaultDropName);

  useEffect(() => {
    dropDownName && !defaultDropName ? setDropDownName('') : null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...(resetDropName ? resetDropName : [])]);

  const customScrollbarStyles = {
    '&::-webkit-scrollbar': {
      width: '4px',
      borderRadius: '16px',
    },
    '&::-webkit-scrollbar-track': {
      borderRadius: '16px',
      WebkitBoxShadow: 'inset 0 0 6px #cbcbcb',
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '16px',
      backgroundColor: '#fff',
      //   outline: '1px solid slategrey', // You can include this line if needed
    },
  };
  const setDropDownValue = (val, name) => {
    setFieldValue(fieldName, val);
    setDropDownName(name);
    additionalFunc ? additionalFunc(val) : null;
  };

  return (
    <Stack spacing="10.36px" maxW="376.14px" {...dropDownStyle.wrapper}>
      <Text color="#3d3d3d" fontSize="16px" fontWeight="500px" {...dropDownStyle.label}>
        {header}
      </Text>
      <Menu autoSelect={false} {...dropDownMenuStyle}>
        <MenuButton
          as={Button}
          bg="transparent"
          _hover={{bg: 'transparent'}}
          _active={{bg: 'transparent'}}
          _focus={{bg: 'transparent'}}
          border="0.843px solid #e4e4e4"
          borderRadius="10.12px"
          h="36.26px"
          textAlign="start"
          padding="7.59px 11.807px 8.434px 18.03px"
          w="376.14px"
          color={dropDownName ? '#191919' : '#606060'}
          fontSize={dropDownName ? '13.49px' : '12px'}
          fontWeight="400px"
          rightIcon={<Image src={dropDownIcon.src} alt="drop down icon" {...dropDownIconStyle} />}
          {...dropDownStyle.btn}
        >
          {dropDownName || placeHolderText}
        </MenuButton>
        <MenuList maxH="fit-content" p="0px" minW="fit-content" w="fit-content" overflowY="hidden">
          <Stack
            overflowY="scroll"
            my="2px"
            maxH="350px"
            w="full"
            sx={customScrollbarStyles}
            {...dropDownStyle.menuList}
          >
            {dropDownArray.length ? (
              dropDownArray.map((item, idx) => (
                <MenuItem
                  value={item.value}
                  key={idx}
                  isDisabled={
                    disableOption ? disableOption(dropDownArray[idx].value, values) : false
                  }
                  onClick={() => setDropDownValue(item.value, item.name)}
                  color="#606060"
                  fontSize="13.49px"
                  fontWeight="400px"
                >
                  {item.name}
                </MenuItem>
              ))
            ) : (
              <MenuItem isDisabled={true} color="#606060" fontSize="13.49px" fontWeight="400px">
                please select a listing
              </MenuItem>
            )}
          </Stack>
        </MenuList>
      </Menu>
    </Stack>
  );
};
