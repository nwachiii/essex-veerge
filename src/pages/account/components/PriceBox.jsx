import {Flex, Text} from '@chakra-ui/react';
import React from 'react';

const PriceBox = ({price}) => {
  return (
    <Flex
      width={{base: '70%', md: '50%'}}
      height="120px"
      borderRadius="10px"
      border="1px solid #edf2f7"
      mx="auto"
      bg="white"
      justifyContent="center"
      alignItems="center"
      mb="23px"
      direction="column"
    >
      <Text color="#191919" fontSize="24px" fontWeight="600">
        {price}
        {/* <span style={{ color: '#edf2f7' }}>.00</span> */}
      </Text>
      <Text>Total Purchase</Text>
    </Flex>
  );
};

export default PriceBox;
