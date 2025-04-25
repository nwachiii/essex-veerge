import {Button, Drawer, DrawerOverlay, HStack, Image, Text} from '@chakra-ui/react';
import React from 'react';
import {ListOfDrawerOptions} from './screens/listOfDrawerOption';
import mo from '/src/images/icons/moreoptions.svg';

const UnitMoreOption = ({drawerDisclosure}) => {
  return (
    <>
      <Button
        variant="outline-radius"
        borderColor="#E4E4E7"
        color="#242526"
        fontWeight="500"
        maxW={'215px'}
        fontFamily="Euclid Circular B"
        onClick={drawerDisclosure.onOpen}
        bg="#FFF"
        _hover={{
          opacity: 1,
        }}
      >
        <HStack gap={'8px'}>
          <Image src={mo.src} alt="more options" />
          <Text>More Options</Text>
        </HStack>
      </Button>
      <Drawer
        autoFocus={false}
        isOpen={drawerDisclosure.isOpen}
        onClose={drawerDisclosure.onClose}
        borderRadius="16px"
      >
        <DrawerOverlay bg="rgba(0,0,0,0.1)" />
        <ListOfDrawerOptions />
      </Drawer>
    </>
  );
};

export default UnitMoreOption;
