import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Box,
  Text,
  HStack,
  Select,
  Flex,
  Divider,
} from '@chakra-ui/react';
import {HiOutlineChevronDown} from 'react-icons/hi';
import {useState} from 'react';
import {themeStyles} from '../../../../../theme';

const Rooms = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const RangeMenu = ({label, placeholder, range, onApply, maxW, ...rest}) => {
  const [localRange, setLocalRange] = useState(range);

  const getSelctedRangeLabel = range => {
    let selectedRange;
    if (range[0]) {
      if (range[1]) {
        selectedRange = `${range[0]} - ${range[1]}`;
      } else {
        selectedRange = `${range[0]} or more `;
      }
    } else if (range[1]) {
      if (range[0]) {
        selectedRange = `Between ${range[0]} and ${range[1]}`;
      } else {
        selectedRange = `${range[1]} or less`;
      }
    } else {
      selectedRange = placeholder;
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
      <Menu closeOnSelect={false}>
        <MenuButton as={Box}>
          <HStack align={'center'} my={'8px'}>
            <Text noOfLines={1} {...themeStyles.textStyles.sl6}>
              {label}
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
          <MenuItem _hover={{backgroundColor: 'white'}} _focus={{backgroundColor: 'white'}}>
            <Text mb={'20px'} {...themeStyles.textStyles.sb6}>
              Select {label}
            </Text>
          </MenuItem>

          <Flex gap={'50px'} pb={'15px'}>
            <Select
              variant="outline"
              placeholder="No Min"
              w={'max-content'}
              border={'0.5px solid #000000 !important'}
              value={localRange[0]}
              onChange={e => setLocalRange([e.target.value, localRange[1]])}
            >
              {Rooms.map(room => (
                <option key={room} value={room} disabled={room >= localRange[1]}>
                  {room}
                </option>
              ))}
            </Select>
            <Select
              variant="outline"
              placeholder="No Max"
              w={'max-content'}
              border={'0.5px solid #000000 !important'}
              value={localRange[1]}
              onChange={e => {
                setLocalRange([localRange[0], e.target.value]);
              }}
            >
              {Rooms.map(room => (
                <option key={room} value={room} disabled={room <= localRange[0]}>
                  {room}
                </option>
              ))}
            </Select>
          </Flex>

          <MenuItem _hover={{backgroundColor: 'white'}} _focus={{backgroundColor: 'white'}}>
            <Divider />
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
