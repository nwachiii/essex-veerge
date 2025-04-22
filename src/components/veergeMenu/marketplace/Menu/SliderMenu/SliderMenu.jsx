import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Box,
  Text,
  HStack,
  Flex,
  Divider,
} from '@chakra-ui/react';
import {HiOutlineChevronDown} from 'react-icons/hi';
import {useState} from 'react';
import {themeStyles} from '../../../../../theme';
import {FilterSlider} from '../../Slider';
import {priceString} from '../../../../../utils/priceString';

const ps = value => priceString(value, {notation: 'compact', compactDisplay: 'short'});

export const SliderMenu = ({
  label,
  placeholder,
  range,
  onApply,
  domain,
  stepOfIncrement,
  maxW,
  ...rest
}) => {
  const [localRange, setLocalRange] = useState(range);

  const getSelctedRangeLabel = range => {
    let selectedRange;

    if (range[0] === domain[0]) {
      if (range[1] === domain[1]) {
        selectedRange = placeholder;
      } else {
        selectedRange = `${ps(range[1])} or less`;
      }
    } else if (range[1] === domain[1]) {
      if (range[0] === domain[0]) {
        selectedRange = placeholder;
      } else {
        selectedRange = `${ps(range[0])} or more`;
      }
    } else {
      selectedRange = `Between ${ps(range[0])} and ${ps(range[1])}`;
    }
    return selectedRange;
  };

  return (
    <Flex
      w={'100%'}
      mx={'10px'}
      maxW={maxW}
      cursor={'pointer'}
      justify="space-between"
      align="center"
    >
      <Menu closeOnSelect={false} width>
        <MenuButton as={Box}>
          <HStack align={'center'} my={'8px'}>
            <Text {...themeStyles.textStyles.sb4}>
              <Text {...themeStyles.textStyles.sl6}>{label}</Text>
            </Text>
            <HiOutlineChevronDown size="20" />
          </HStack>
        </MenuButton>
        <MenuList
          py={'20px'}
          shadow={'md'}
          // mt={"5px"}
          px={'20px'}
          _hover={{backgroundColor: 'white'}}
          _focus={{backgroundColor: 'white'}}
        >
          <MenuItem
            _hover={{backgroundColor: 'white'}}
            _focus={{backgroundColor: 'white'}}
            pb={'15px'}
          >
            <Box>
              <Text mb={'0px'} {...themeStyles.textStyles.sb6}>
                Select {label}
              </Text>

              <FilterSlider
                selectedRange={range}
                onRangeUpdate={setLocalRange}
                domain={domain}
                stepOfIncrement={stepOfIncrement}
              />
              <Flex gap={'140px'}>
                <Text
                  minW={'50px'}
                  w={'max-content'}
                  border={'0.5px solid #313131 !important'}
                  p={'10px'}
                  pr={'40px'}
                  borderRadius={'5px'}
                  {...themeStyles.textStyles.sl5}
                >
                  {localRange[0] === domain[0] ? ps(0) : ps(localRange[0])}
                </Text>
                <Text
                  minW={'150px'}
                  w={'max-content'}
                  border={'0.5px solid #313131 !important'}
                  p={'10px'}
                  pr={'40px'}
                  borderRadius={'5px'}
                  {...themeStyles.textStyles.sl5}
                >
                  {localRange[1] === domain[1] ? ps(50000000) : ps(localRange[1])}
                </Text>
              </Flex>
              <Divider mt="20px" />
            </Box>
          </MenuItem>

          <MenuItem
            closeOnSelect={true}
            _hover={{backgroundColor: 'white'}}
            _focus={{backgroundColor: 'white'}}
            pt={'15px'}
          >
            <Flex width={'100%'} justify={'flex-end'} align={'center'}>
              <Text
                color={'white'}
                bgColor={'#1d1d1d'}
                _hover={{backgroundColor: 'black'}}
                onClick={() => onApply(localRange)}
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
