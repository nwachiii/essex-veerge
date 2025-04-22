import {Box, Button, Heading, Stack} from '@chakra-ui/react';
import React, {useEffect, useState} from 'react';
import CountryListItems from '../components/countryListItem';
import {motion} from 'framer-motion';

const customScrollbarStyles = {
  '&::-webkit-scrollbar': {width: '4px', borderRadius: '16px', display: 'none'},
  '&::-webkit-scrollbar-track': {borderRadius: '16px', WebkitBoxShadow: 'inset 0 0 6px #fafafa'},
  '&::-webkit-scrollbar-thumb': {borderRadius: '16px', backgroundColor: '#cbcbcb'},
};

const SelectARegion = ({handleScreen, formik}) => {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [timeZone, setTimeZone] = useState('');

  const selectCountry = (name, timeZone) => () => {
    setTimeZone(timeZone);
    return setSelectedCountry(name);
  };
  const setCountry = () => {
    formik.setFieldValue('country', selectedCountry);
    formik.setFieldValue('default_timezone', timeZone);
    return handleScreen('personal info');
  };

  return (
    <Stack
      as={motion.div}
      animate={{opacity: 1, transition: {delay: 0.1}}}
      initial={{opacity: 0}}
      spacing="24px"
    >
      <Heading
        textAlign="center"
        fontSize="48px"
        fontWeight="600"
        color="#191919"
        fontFamily="Neue Haas Grotesk Display Pro"
      >
        Select region
      </Heading>
      <Box borderRadius="8px" overflow="hidden" border="1px solid #e5e5e5">
        <Stack
          as={'ul'}
          spacing="none"
          w="400px"
          h="369px"
          bg="#fafafa"
          overflowY="auto"
          scrollBehavior="smooth"
          sx={customScrollbarStyles}
        >
          <CountryListItems
            onSelect={selectCountry}
            timeZone={timeZone}
            selectedCountry={selectedCountry}
          />
        </Stack>
      </Box>
      <Button isDisabled={!selectedCountry} onClick={setCountry} variant="filled-radius">
        Proceed
      </Button>
    </Stack>
  );
};

export default SelectARegion;
