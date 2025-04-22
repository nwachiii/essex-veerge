import {HStack, Image} from '@chakra-ui/react';
import React from 'react';
import arrowIcon from '/src/images/icons/leftAngledIcon.svg';

const BackButton = ({changeScreen}) => {
  return (
    <HStack
      position="absolute"
      top="16px"
      left="16px"
      bg="#FFFFFF33"
      justify="center"
      borderRadius="full"
      role="button"
      align="center"
      p="9.36px"
      onClick={changeScreen}
    >
      <Image src={arrowIcon.src} alt="arrow icon" boxSize="17.28px" />
    </HStack>
  );
};

export default BackButton;
