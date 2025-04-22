import {Avatar, Box, Flex, Image, Stack, StackDivider, Text} from '@chakra-ui/react';
import React, {useState} from 'react';
import profileIcon from '/src/images/icons/levyprofileIcon.svg';
import houseIcon from '/src/images/icons/houseIcon.svg';
import modernHomeIcon from '/src/images/icons/modernHomeIcon.svg';
import rightArrow from '/src/images/icons/RightArrowForListingScheduledInspection.svg';
import {motion} from 'framer-motion';
import CustomCheckBox from '../utils/CustomCheckBox';
import SourceCheck from '../checkbox/sourceCheck';

const unitDataList = [
  {
    name: 'All Units',
    value: 'all',
  },
  {
    name: '2 Bedroom shopping complex, Astrid varitaa',
    value: 2,
  },
  {
    name: '1 Bedroom, Astrid',
    value: 3,
  },
  {
    name: '5 Bedroom, Astrid',
    value: 4,
  },
  {
    name: 'Urban Prime, Astrid',
    value: 5,
  },
];
const clientDataList = [
  {
    name: 'Everyone',
    value: 'all',
  },
  {
    name: 'With asset',
    value: 1,
  },
  {
    name: 'Without asset',
    value: 3,
  },
  {
    name: 'With fractional',
    value: 4,
  },
  {
    name: 'Defaulting',
    value: 5,
  },
  {
    name: 'Non-defaulting',
    value: 6,
  },
  {
    name: 'With outstanding',
    value: 7,
  },
  {
    name: 'Completed payment',
    value: 8,
  },
];

const customScrollStyle = {
  overflow: 'auto',
  'scrollbar-width': 'none',

  '&::-webkit-scrollbar': {
    display: 'none',
  },
};

const restructureArray = arr => {
  if (arr.at(-1) == 'all') {
    return ['all'];
  } else if (arr.at(-1) !== 'all' && arr.includes('all')) {
    return arr.filter(item => item !== 'all');
  } else {
    return arr;
  }
};

const createUnitArray = (val, unitArray) => {
  let newUnit = unitArray.filter(item => val.includes(item.id));

  newUnit = newUnit.map(item => {
    return {
      id: item.id,
      name: item.name,
      avatar: item.avatar,
    };
  });
  return newUnit;
};
const setListingValues = (val, prevVal, unitArray, activeListing) => {
  if (!val.length) {
    if (prevVal.listing.hasOwnProperty(activeListing)) {
      const {activeListing, ...rest} = prevVal.listing;
      return {
        ...prevVal,
        listing: rest,
      };
    } else {
      return prevVal;
    }
  }
  let listingObj = {};
  for (const [key, value] in Object.entries(prevVal.listing)) {
    if (key !== activeListing) return (listingObj[key] = value);
    return (listing[key] = createUnitArray(val, unitArray));
  }

  return {
    ...prevVal,
    listing: listingObj,
  };
};
const SourceOptions = ({isFocus}) => {
  const [active, setActive] = useState('');
  const [activeListing, setActiveListing] = useState('');
  const [val, setVal] = useState([]);
  const [sourceObj, setSourceObj] = useState({
    client: [],
    listing: {},
  });

  let unitArray = [];
  const selectListing = prop => () => {
    setActiveListing(prop);
  };
  const handleChange = (val, type) => {
    let newArray = restructureArray(val);
    switch (type) {
      case 'client':
        setSourceObj(prev => ({...prev, client: newArray}));
        break;
      case 'unit':
        setSourceObj(prev => setListingValues(newArray, prev, unitArray, activeListing));
        break;
    }
  };
  const toggleList = type => () => {
    // setActive(prev => (prev.includes(type) ? prev.filter(el => el !== type) : [...prev, type]));
    setActive(prev => (type == prev ? '' : type));
  };
  return (
    <Stack
      as={motion.div}
      layout
      sx={customScrollStyle}
      pos="absolute"
      top="calc(100% + 9px)"
      bg="#ffffff"
      h="fit-content"
      maxH="300px"
      right="0px"
      p="8px"
      minW={'176px'}
      maxW={isFocus ? '240px' : 'fit-content'}
      borderRadius="5px"
      overflow="scroll"
      divider={<StackDivider as={motion.div} layout border="none" h="0.5px" bg="#e4e4e4" />}
      boxShadow=" 2.99px 2.99px 5.97px 0px #7B9D9D26,-2.99px -2.99px 5.97px 0px #7B9D9D26"
    >
      <Stack sx={customScrollStyle} as={motion.div} layout spacing="10px">
        <Flex
          onClick={toggleList('client')}
          cursor="pointer"
          as={motion.div}
          layout
          w="full"
          justify="space-between"
        >
          <Flex as={motion.div} gap="4px">
            <Image boxSize="16px" src={profileIcon.src} alt="profile icon" />
            <Text fontSize="12px" fontWeight="400" color="#000000">
              Client Type
            </Text>
          </Flex>
          <Image transform="rotate(90deg)" opacity="0.5" src={rightArrow.src} alt="right icon" />
        </Flex>
        {active == 'client' ? (
          <CustomCheckBox
            data={clientDataList}
            value={val}
            handleChange={val => handleChange(val, 'client')}
            Component={SourceCheck}
          />
        ) : null}
      </Stack>
      <Stack as={motion.div} sx={customScrollStyle} maxH="140px" layout spacing="10px">
        <Flex
          as={motion.div}
          layout
          cursor="pointer"
          onClick={toggleList('listing')}
          w="full"
          justify="space-between"
        >
          <Flex as={motion.div} layout gap="4px">
            <Image boxSize="16px" src={houseIcon.src} alt="profile icon" />
            <Text fontSize="12px" fontWeight="400" color="#000000">
              Listing
            </Text>
          </Flex>
          <Image transform="rotate(90deg)" opacity="0.5" src={rightArrow.src} alt="right icon" />
        </Flex>
        {active == 'listing'
          ? [1, 28, 2, 12, 22, 6, 7, 8, 78, 9, 86, 4, 5].map((item, idx) => {
              return (
                <Flex
                  as={motion.div}
                  layout
                  justify="space-between"
                  key={idx}
                  alignItems="center"
                  cursor="pointer"
                  onClick={selectListing(item)}
                >
                  <Text maxW="200px" fontSize="12px" fontWeight="300" color="#000000">
                    Astrid {item}.0
                  </Text>
                  <Box
                    display="flex"
                    transition="0.3s ease-in-out"
                    justifyContent="center"
                    alignItems="center"
                    bg="#fafafa"
                    boxSize="12px"
                    border="1px solid"
                    borderColor={activeListing == item ? '#191919' : '#d4d4d8'}
                    borderRadius="full"
                  >
                    <Box
                      borderRadius="full"
                      boxSize="6px"
                      transition="0.3s ease-in-out"
                      bg={activeListing == item ? '#191919' : '#d4d4d8'}
                      transform={`scale(${activeListing == item ? '0.7' : '0'})`}
                      opacity={activeListing == item ? '1' : '0'}
                    />
                  </Box>
                </Flex>
              );
            })
          : null}
      </Stack>
      <Stack sx={customScrollStyle} as={motion.div} maxH="140px" layout spacing="10px">
        <Flex
          cursor="pointer"
          onClick={toggleList('unit')}
          as={motion.div}
          layout
          w="full"
          justify="space-between"
        >
          <Flex as={motion.div} gap="4px">
            <Image boxSize="16px" src={modernHomeIcon.src} alt="profile icon" />
            <Text fontSize="12px" fontWeight="400" color="#000000">
              Unit
            </Text>
          </Flex>
          <Image transform="rotate(90deg)" opacity="0.5" src={rightArrow.src} alt="right icon" />
        </Flex>
        {active == 'unit' ? (
          <CustomCheckBox
            value={val}
            data={unitDataList}
            handleChange={val => handleChange(val, 'unit')}
            Component={SourceCheck}
          />
        ) : null}
      </Stack>
    </Stack>
  );
};

export default SourceOptions;
