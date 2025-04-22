import React, {useEffect, useState} from 'react';
import {
  Box,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  HStack,
  Text,
  VStack,
  Image,
  useToast,
  DrawerBody,
  DrawerFooter,
} from '@chakra-ui/react';
import {RepeatIcon} from '@chakra-ui/icons';
import {IoMdStopwatch} from 'react-icons/io';

import InputField from './inputFieldFolder';
import BodySection from './contentSection';

import veerge_ai from '/src/images/icons/veerge_ai.svg';

const testSamples = [
  'Help me draft an email response.',
  'What is the age distribution of subscribers?',
  'What are buyers saying about properties and services?',
  'How are sales team performing in different regions?',
  'What is the projected sales revenue for the next quarter/year?',
  'How satisfied are customers with their purchase experience?',
  'What geographical areas shows the most potential for expansion?',
  'How often do customers delay instalment payments?',
  'What property features are most sought after by customers?',
  'What is the profitability of different property types (e.g residential, commercial)?',
  'What is the potential of expanding operations into new market?',
  'Are there opportunities to cross-sell additional services or properties to existing customers?',
  'Are there underserved niches or segments in the property market?',
];

const InsightDrawer = ({modalDisclosure}) => {
  const toast = useToast();
  const [inputMsg, setInputMsg] = useState('');
  const [listOptions, setListOptions] = useState(true);
  const [messages, setMessages] = useState([]);

  const handleClose = () => {
    modalDisclosure.onClose();
    setListOptions(true);
    setInputMsg('');
    setMessages([]);
    return;
  };

  // submit functionality
  const handleSubmit = async () => {
    setListOptions(false);
    setMessages([
      ...messages,
      {sender: 'user', message: inputMsg},
      {
        sender: 'veerge_ai',
        message:
          'Hi there! You are currently ineligible for this feature, you will have to upgrade to experience it',
      },
    ]);
    // if (inputMsg?.trim() === '') {
    //   return setResponseMsg(
    //     'Hi there! You are currently ineligible for this feature, you will have to upgrade to experience it'
    //   );
    // }

    const body = {
      content: inputMsg.trim(),
    };

    // try {
    //   return setResponseMsg(
    //     'Hi there! You are currently ineligible for this feature, you will have to upgrade to experience it'
    //   );
    // } catch (error) {
    //   return setResponseMsg(
    //     'Hi there! You are currently ineligible for this feature, you will have to upgrade to experience it'
    //   );
    // }
  };

  useEffect(() => {
    if (inputMsg) {
      handleSubmit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputMsg]);

  return (
    <Drawer isOpen={modalDisclosure.isOpen} onClose={handleClose} borderRadius="16px">
      <DrawerOverlay bg="rgba(0,0,0,0.07)" />

      <DrawerContent
        position="relative"
        zIndex={100}
        mt="65.12px"
        maxW="478px"
        bg="#fff"
        p="0px"
        boxShadow="none"
        display="flex"
        flexDirection="column"
      >
        <HStack
          boxShadow="4px 4px 8px 0px rgba(123, 157, 157, 0.05), -4px -4px 8px 0px rgba(123, 157, 157, 0.15)"
          mb="10px"
          py="12px"
          px="29px"
          justify="space-between"
          align="center"
          position="relative"
          width="full"
        >
          <Flex width="full" justifyContent="space-between" alignItems="center" mr="10px">
            <Box display="flex" alignItems="center" gap="8px">
              <Image w="20px" h="20px" src={veerge_ai.src} alt="icon" />
              <Text fontSize="16px" fontWeight={500} color="#344054">
                Veerge AI
              </Text>
              <Box
                px="14px"
                borderRadius="20px"
                bg="#D1FADF"
                color="#12B76A"
                fontSize="14px"
                fontWeight={400}
              >
                Beta
              </Box>
            </Box>

            {/* <Box display="flex" flexDirection="row" alignItems="center" gap="29px">
              <RepeatIcon cursor="pointer" />
            </Box> */}
          </Flex>
          <HStack spacing="15px">
            <VStack
              position="relative"
              justify="center"
              align="center"
              w="30px"
              h="30px"
              borderRadius="5px"
              transition="0.3s ease-in-out"
              _hover={{
                width: '30px',
                height: '30px',
              }}
            >
              <DrawerCloseButton right="0px" left="0px" my="auto" color="#000" top="0" bottom="0" />
            </VStack>
          </HStack>
        </HStack>

        <DrawerBody position="relative">
          <Flex direction={'column'} pt="10px" gap="16px" w="100%">
            <BodySection
              testSamples={testSamples}
              setInputMsg={setInputMsg}
              inputMsg={inputMsg}
              listOptions={listOptions}
              setListOptions={setListOptions}
              messages={messages}
            />
          </Flex>
        </DrawerBody>

        <DrawerFooter justifySelf="flex-end" zIndex={1} w="full" bg="white">
          <InputField handleSubmit={el => setInputMsg(el)} />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default InsightDrawer;
