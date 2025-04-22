import React from 'react';
import gearIcon from '/src/images/icons/appPreferenceGear.svg';
import {HStack, IconButton, Image, Text} from '@chakra-ui/react';
import {FaAngleRight} from 'react-icons/fa6';

const AppPreferenceComponent = ({handleScreen}) => {
  return (
    <HStack
      width={`100%`}
      padding={`20px 12px`}
      gap={`6px`}
      borderRadius={`4px`}
      border={`1px solid #E4E4E4`}
      background={`#F9FAFB`}
      justify={`space-between`}
      color={`#191919`}
      cursor="pointer"
      onClick={handleScreen('preferences')}
    >
      <Image src={gearIcon.src} boxSize="24px" alt=" app preference gear icon" />

      <Text flex={`1`} fontSize={`14px`} color={`#191919`}>
        App Preference & Features
      </Text>
      <IconButton
        icon={<FaAngleRight color="#cbcbcb" />}
        bg={`transparent`}
        w="fit-content"
        h="fit-content"
        minW="fit-content"
        p="0px"
        _hover={{bg: `transparent`}}
        _active={{bg: `transparent`}}
        _focus={{bg: `transparent`}}
        _focusVisible={{bg: `transparent`}}
      />
    </HStack>
  );
};

export default AppPreferenceComponent;
