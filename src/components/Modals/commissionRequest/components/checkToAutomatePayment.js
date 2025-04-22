import {Box, Checkbox, HStack, Image, Text} from '@chakra-ui/react';
import React from 'react';
import selectedIcon from '/src/images/icons/mark_icon.svg';

import {useState} from 'react';

export const CheckToAutomatePayment = ({setGiveAccess, giveAccess}) => {
  const handleChange = e => {
    const {checked} = e.target;

    setGiveAccess(checked);
  };
  return (
    <HStack spacing="8.157px" onClick={handleChange} align="start">
      <Checkbox
        onChange={handleChange}
        _focus={{
          border: 'none',
          outline: 'none',
        }}
        _active={{
          border: 'none',
          outline: 'none',
        }}
        border="none"
        icon={
          <HStack align="center" justify="center" borderRadius="3px" p="1px" bg="#D9D9D9">
            <Box w="15.498px" h="15.498px">
              <Image
                src={selectedIcon.src}
                alt="selected equity icon "
                m="0"
                w="full"
                h="full"
                sx={{transition: 'ease-in-out 0.5s'}}
                opacity={giveAccess ? '1' : '0'}
              />
            </Box>
          </HStack>
        }
        value={giveAccess}
      />{' '}
      <Text fontSize="12.367px" color="#000" fontWeight="400">
        Check if you want to automate the commission for upcoming payments.
      </Text>
    </HStack>
  );
};

export default CheckToAutomatePayment;
