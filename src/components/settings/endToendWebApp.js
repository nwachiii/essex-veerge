import {Button, HStack, Heading, Image, Text, VStack} from '@chakra-ui/react';
import orangeBulbIcon from '/src/images/icons/orange_bulb_create_store.svg';
import React from 'react';
import viewIcon from '/src/images/icons/viewIconForAfterSchedule.svg';
import Link from 'next/link';

export const EndToEndWebApp = ({setCreateStoreTab, hasBeenSchedule}) => {
  return (
    <VStack w="full" mt="35.44px" spacing="22px" h="full" pb="27.56px" align="center">
      <Heading fontSize="24px" fontWeight="700">
        Create an End-to-End Web App
      </Heading>
      <Text h="40px" fontSize="16px" fontWeight="400" w="570px" color="#606060">
        Empower users with a seamless experience that requires only a few clicks, eliminating
        coding. Seamlessly accept payments from around the world
      </Text>
      {!hasBeenSchedule ? (
        <Button
          _hover={{
            opacity: '1',
          }}
          h="55px"
          onClick={() => setCreateStoreTab('scheduleMeeting')}
          w="241px"
          bg="#4545FE"
          fontSize="18px"
          fontWeight="400"
          color="#ffffff"
          borderRadius="12px"
        >
          Create a Custom App
        </Button>
      ) : (
        <HStack
          bg="#4545FE"
          px="13px"
          cursor="pointer"
          borderRadius="12px"
          h="56px"
          minW="265px"
          spacing="10px"
        >
          <Image src={viewIcon.src} alt="view icon" />
          <Text fontSize="18px" fontWeight="400" color="#ffffff">
            View Custom App Demo
          </Text>
        </HStack>
      )}
      <Text
        onClick={() => setCreateStoreTab('createBasicStore')}
        color="#4545FE"
        cursor="pointer"
        fontSize="14px"
        fontWeight="400"
      >
        Create Basic App Instead
      </Text>
      <HStack spacing="8px">
        <Image alt="orange bulb icon" src={orangeBulbIcon.src} />

        <Text
          as={Link}
          href="/veerge_plus/basic_vs_custom_app"
          color="#FF9103"
          cursor="pointer"
          fontSize="14px"
          fontWeight="400"
        >
          What is the difference between Basic & Custom Web app ?
        </Text>
      </HStack>
    </VStack>
  );
};

export default EndToEndWebApp;
