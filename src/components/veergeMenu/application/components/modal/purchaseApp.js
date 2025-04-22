import React from 'react';
import {
  Modal,
  Button,
  Image,
  Stack,
  ModalBody,
  ModalOverlay,
  useDisclosure,
  ModalContent,
  ModalCloseButton,
  VStack,
  Heading,
  Input,
  HStack,
  Text,
  useToast,
  Spinner,
  Box,
} from '@chakra-ui/react';
import bgImage from '/src/images/bgs/enterUrlModalBg.svg';
import backIcon from '/src/images/icons/backButtonForModalcreateApp.svg';

import orangeBulbIcon from '/src/images/icons/orange_bulb_create_store.svg';

import {useState} from 'react';
import themeConstant from '@/components/Drawers/veergeMenuDrawer/constant/themeConstant';

export const PurchaseApp = ({
  handleStoreCreation,
  totalAmountToBePaid,
  themeName,
  handleScreen,
  mutation,
}) => {
  const price = totalAmountToBePaid();

  return (
    <ModalBody h="full" p="0px" w="601px">
      <VStack spacing="none" w="full" position="relative">
        <HStack
          justify="center"
          onClick={() => handleScreen('createWebApplication')}
          boxSize="36px"
          cursor="pointer"
          borderRadius="full"
          bg="rgba(255, 255, 255, 0.20)"
          position="absolute"
          left="2.662%"
          top="5.7%"
          align="center"
        >
          <Image boxSize="17.28px" alt="backIcon" objectFit="cover" src={backIcon.src} />
        </HStack>
        <Stack
          borderRadius="19.308px 19.308px 0 0"
          w="full"
          h="280px"
          bg="#0C2841"
          align="center"
          justify="end"
        >
          <Image
            h="236px"
            // w="500px"
            w="385.053px"
            alt="create store image "
            objectFit="cover"
            src={bgImage.src}
          />
        </Stack>
        <VStack spacing="16px" w="full" bg="#fff" justify="center" pt="16.16px" pb="16.301">
          <Heading w="451px" textAlign="center" fontSize="18px" fontWeight="500">
            This theme requires a one-time fee of{' '}
            <Text fontWeight="500" as="span">
              {price}
            </Text>
            , which will be charged to your Veerge wallet.
          </Heading>

          <Button
            _hover={{
              opacity: '1',
            }}
            _active={{
              opacity: '1',
            }}
            _focus={{
              opacity: '1',
            }}
            h="55px"
            onClick={handleStoreCreation}
            w="241px"
            bg="#191919"
            color="#ffffff"
            borderRadius="12px"
            isLoading={mutation.isLoading}
          >
            Create application
          </Button>

          <Text fontSize="12px" color="#3D3D3D" fontWeight="400" w="520px" textAlign="center">
            By proceeding, you confirm your agreement with the{' '}
            <Text
              cursor="pointer"
              as="span"
              onClick={() => window.open(`https://veerge-support.myxellia.io/terms`, '_blank')}
              textDecoration="underline"
              color="#4545FE"
            >
              {' '}
              Terms of Service
            </Text>
            . A charge of{' '}
            <Text fontWeight="600" as="span">
              {price}
            </Text>
            , based on {"today's"} rate, will be applied. Even in the case of insufficient funds,
            the amount will be instantly deducted from your Veerge wallet.
          </Text>
        </VStack>
      </VStack>
    </ModalBody>
  );
};

export default PurchaseApp;
