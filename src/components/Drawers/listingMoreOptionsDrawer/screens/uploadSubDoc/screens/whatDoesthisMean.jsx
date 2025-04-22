import {
  Box,
  Button,
  DrawerBody,
  HStack,
  Image,
  Stack,
  Text,
  DrawerFooter,
  Icon,
} from '@chakra-ui/react';
import React from 'react';
import subInLoopIcon from '/src/images/icons/subInLoopIcon.svg';
import exclusiveAccessIcon from '/src/images/icons/exclusiveAccessIcon.svg';
import {IoArrowBackSharp} from 'react-icons/io5';

const WhatDoesThisMean = ({handleScreen, forUnits, handleClose}) => {
  return (
    <>
      <DrawerBody marginTop="16.64vh" px="28px">
        <Box>
          {' '}
          <Text
            color="#191919"
            fontSize="24px"
            fontWeight="600"
            textAlign="center"
            fontStyle="normal"
            lineHeight="normal"
            fontFamily="Euclid Circular B"
          >
            What does this mean?
          </Text>
          <Stack spacing="32px" mt="37px">
            <HStack spacing={'12px'} align="center">
              <Image src={subInLoopIcon.src} boxSize="28px" alt="subscribers loop icon" />
              <Stack spacing="4px">
                <Text {...titleStyle}>Keep Subscribers in the Loop</Text>
                <Text {...descStyle}>
                  Quickly share important documents like memos and project updates with your
                  existing subscribers, ensuring they&apos;re always up-to-date and engaged with
                  your {forUnits ? 'unit' : 'listing'}.
                </Text>
              </Stack>
            </HStack>
            <HStack spacing={'12px'} align="center">
              <Image src={exclusiveAccessIcon.src} boxSize="28px" alt="exclusive access icon" />
              <Stack spacing="4px">
                <Text {...titleStyle}>Exclusive Access</Text>
                <Text {...descStyle}>
                  These documents are only available to current subscribers, ensuring private and
                  targeted communication.
                </Text>
              </Stack>
            </HStack>
          </Stack>
        </Box>
      </DrawerBody>
      <DrawerFooter w="full" p="0px 36px 32.32px">
        <Stack w="full" spacing="16.5px">
          <Button
            borderRadius={'full'}
            color="#FFF"
            bg="#191919"
            w={'full'}
            h={'45px'}
            fontWeight={400}
            onClick={handleScreen('upload Doc')}
            _hover={{bg: '#191919'}}
          >
            Proceed
          </Button>
          <Button
            borderRadius={'full'}
            border="1px solid #FF3636"
            color="#FF3636"
            bg={'#fff'}
            w={'full'}
            h={'45px'}
            onClick={handleClose}
            fontWeight={400}
            _hover={{bg: '#fff'}}
          >
            Cancel
          </Button>
        </Stack>
      </DrawerFooter>
    </>
  );
};

export default WhatDoesThisMean;

const descStyle = {
  color: '#606060',
  fontSize: '12px',
  fontWeight: '400',
  fontStyle: 'normal',
  lineHeight: 'normal',
  fontFamily: 'Euclid Circular B',
};
const titleStyle = {
  color: '#191919',
  fontSize: '16px',
  fontWeight: '600',
  fontStyle: 'normal',
  lineHeight: 'normal',
  fontFamily: 'Euclid Circular B',
};
