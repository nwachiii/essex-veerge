import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Image,
  Box,
  Text,
  HStack,
  Flex,
} from '@chakra-ui/react';
import {HiOutlineChevronDown} from 'react-icons/hi';
import {useState} from 'react';
import {themeStyles} from '../../../../../theme';
import Circle from '../../../../../images/icons/circle.png';
import CircleChecked from '../../../../../images/icons/circleChecked.png';

export const SelectMenu = ({label, placeholder, options, selected, onApply, maxW, ...rest}) => {
  const [selectedOption, setSelectedOption] = useState(selected);

  const getSelectedLabel = () => {
    // if (selected) {
    //   const selectedLabel = options.find(({ value }) => value === selected);
    //   return selectedLabel.label;
    // } else {
    return placeholder;
    // }
  };

  return (
    <Flex w={'100%'} maxW={maxW} cursor={'pointer'} justify="space-between" align="center">
      <Menu closeOnSelect={false}>
        <MenuButton as={Box}>
          <HStack align={'center'} my={'8px'}>
            <Text {...themeStyles.textStyles.sb4}>
              <Text noOfLines={1} {...themeStyles.textStyles.sl6}>
                {label}
              </Text>
              {/* {getSelectedLabel()} */}
            </Text>
            <HiOutlineChevronDown size="20" />
          </HStack>
        </MenuButton>
        <MenuList
          py={'20px'}
          shadow={'md'}
          // mt={"5px"}
          _hover={{backgroundColor: 'white'}}
          _focus={{backgroundColor: 'white'}}
        >
          <Text {...themeStyles.textStyles.sb6} px={'20px'} mb={'20px'} cursor={'pointer'}>
            Select {label}
          </Text>
          {options?.map(option => (
            <MenuItem
              _hover={{backgroundColor: 'white'}}
              _focus={{backgroundColor: 'white'}}
              key={option.value}
              value={option.value}
              px={'20px'}
              icon={
                <Image
                  src={selectedOption == option.value ? CircleChecked.src : Circle.src}
                  hight={'16px'}
                  width={'15px'}
                  alt={'checkbox'}
                />
              }
              iconSpacing={'15px'}
              onClick={() => {
                setSelectedOption(option.value);
              }}
            >
              <Text {...themeStyles.textStyles.sl5} color={'#494949'}>
                {option.label}
              </Text>
            </MenuItem>
          ))}
          <MenuItem
            my={'10px'}
            closeOnSelect={true}
            _hover={{backgroundColor: 'white'}}
            _focus={{backgroundColor: 'white'}}
          >
            <Flex width={'100%'} justify={'end'} pr={'5px'}>
              <Text
                color={'white'}
                bgColor={'#1d1d1d'}
                _hover={{backgroundColor: 'black'}}
                onClick={() => {
                  onApply(selectedOption);
                }}
                {...themeStyles.textStyles.sl6}
                px={'12px'}
                py={'6px'}
                borderRadius={'5px'}
              >
                Apply
              </Text>
            </Flex>
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};
