import React from 'react';
import {
  Box,
  Button,
  HStack,
  Heading,
  Image,
  ModalBody,
  ModalCloseButton,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import bgImage from '/src/images/create_app_gif.gif';
import viewIcon from '/src/images/icons/viewIconForAppcreation.svg';
import leftArrow from '/src/images/icons/leftArrowAppcreation.svg';

import Link from 'next/link';

export const CreateMobileApp = ({handleScreen}) => {
  return (
    <Box position="relative">
      <HStack
        align="center"
        w="full"
        justify="space-between"
        position="absolute"
        top="30px"
        px="30px"
      >
        <Image
          cursor="pointer"
          onClick={handleScreen('selectOption')}
          src={leftArrow.src}
          alt="left Arrow icon"
        />
        <ModalCloseButton position="initial" color="#fff" w="24px" h="24px" />
      </HStack>
      <ModalBody h="full" p="0px" w="767px">
        <VStack spacing="none" w="full">
          <Stack
            borderRadius="19.308px 19.308px 0 0"
            w="full"
            h="287px"
            bg="#191919"
            align="center"
            justify="center"
          >
            <Image
              h="287px"
              // h="full"
              // w="500px"
              w="700px"
              alt="create store image gif"
              objectFit="cover"
              objectPosition="0px 38%"
              src={bgImage.src}
            />
          </Stack>
          <VStack w="full" bg="#fff" pt="54px" spacing="32px" h="full" pb="27.56px" align="center">
            <Heading fontSize="24px" fontWeight="500">
              Contact support to discuss your business needs
            </Heading>

            <Button
              _hover={{
                opacity: '1',
              }}
              h="55px"
              onClick={handleScreen('createMobileApp')}
              w="241px"
              bg="#191919"
              fontSize="18px"
              fontWeight="400"
              color="#ffffff"
              borderRadius="72px"
            >
              Contact Support
            </Button>

            <HStack cursor="pointer" spacing="7px">
              <Image src={viewIcon.src} alt="view icon" />
              <Text fontSize="18px" fontWeight="400" color="#191919">
                View Demo
              </Text>
            </HStack>
          </VStack>
        </VStack>
      </ModalBody>
    </Box>
  );
};

export default CreateMobileApp;
