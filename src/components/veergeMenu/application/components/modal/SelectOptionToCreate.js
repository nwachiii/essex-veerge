import React from 'react';
import orangeBulbIcon from '/src/images/icons/orange_bulb_create_store.svg';
import {Button, HStack, Heading, Image, ModalBody, Stack, Text, VStack} from '@chakra-ui/react';
import bgImage from '/src/images/bgs/createModalAppBg.svg';

import Link from 'next/link';
import {useRouter} from 'next/router';

export const SelectOptionToCreate = ({handleScreen}) => {
  const router = useRouter();
  return (
    <ModalBody h="full" p="0px" w="767px">
      <VStack spacing="none" w="full">
        <Stack
          borderRadius="19.308px 19.308px 0 0"
          w="full"
          h="287px"
          bg="#191919"
          align="center"
          justify="end"
        >
          <Image
            h="267px"
            // h="full"
            // w="500px"
            w="575px"
            alt="create store image gif"
            objectFit="cover"
            // objectPosition="0px 38%"
            src={bgImage.src}
          />
        </Stack>
        <VStack w="full" bg="#fff" pt="35.44px" spacing="22px" h="full" pb="27.56px" align="center">
          <Heading fontSize="24px" fontWeight="700">
            Create Mobile App
          </Heading>
          <Text h="40px" fontSize="16px" fontWeight="400" w="570px" color="#606060">
            Empower users with a seamless experience that requires only a few clicks, eliminating
            coding. Seamlessly accept payments from around the world
          </Text>

          <Button
            _hover={{
              opacity: '1',
            }}
            h="55px"
            onClick={() => router.push('/veerge_menu/application/mobile')}
            w="241px"
            bg="#191919"
            fontSize="18px"
            fontWeight="400"
            color="#ffffff"
            borderRadius="72px"
          >
            Create a Mobile App
          </Button>

          <Text
            onClick={handleScreen('selectColorOnly')}
            color="#191919"
            cursor="pointer"
            fontSize="14px"
            fontWeight="400"
          >
            Create an instant Web Application
          </Text>
          {/* <HStack spacing="8px">
            <Image alt="orange bulb icon" src={orangeBulbIcon.src} />

            <Text
              onClick={() => window.open(`/veerge_plus/basic_vs_custom_app`, '_blank')}
              color="#FF9103"
              cursor="pointer"
              fontSize="14px"
              fontWeight="400"
            >
              What is the difference between Web & Mobile application ?
            </Text>
          </HStack> */}
        </VStack>
      </VStack>
    </ModalBody>
  );
};

export default SelectOptionToCreate;
