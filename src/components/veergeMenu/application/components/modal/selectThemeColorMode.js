import React from 'react';
import {
  AbsoluteCenter,
  HStack,
  Heading,
  Image,
  ModalBody,
  ModalCloseButton,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react';

import {AngledArrowIcon} from '@/components/assets/angledArrow';
import Link from 'next/link';
import {motion} from 'framer-motion';
import {CreateToast} from 'ui-lib/ui-lib.components';

const SelectThemeColorMode = ({
  selectedTheme,
  isCurrentThemeMode,
  setSelectedTheme,
  handleScreen,
  setColorMode,
}) => {
  const toaster = CreateToast(true);

  const selectColorMode = mode => () => {
    // if (isCurrentThemeMode(mode)) {
    //   return toaster('Your app is currently using this theme.');
    // }
    setColorMode(mode);

    return handleScreen('additionalFeatures');
  };
  return (
    <Stack spacing="11.4px" p="18.13px 20px" minW="680px" minH="400px" maxW="680px">
      <HStack py="0px" w="full" justify="space-between" px="0px">
        <Heading fontSize="24px" color="#FFFFFF" fontWeight="700">
          Select a theme
        </Heading>
        <ModalCloseButton color="#ffffff" position="initial" />
      </HStack>
      <ModalBody p="0px" m="0px" py="0px" px="0px" bg="transparent" h="fit-content">
        <SimpleGrid columns={2} spacing="18.13px">
          {selectedTheme?.themeColorModes?.length ? (
            selectedTheme?.themeColorModes?.map((mode, idx) => (
              <Stack
                as={motion.div}
                whileTap={{scale: 0.99}}
                opacity={
                  // isCurrentThemeMode(mode.key) ? 0.4 :
                  1
                }
                whileHover={{scale: 1}}
                transition="box-shadow ease-in-out 0.3s"
                _hover={{
                  boxShadow: '0 4px 15px 3px rgba(0,0,0,0.15)',
                }}
                w="full"
                key={idx}
                h="full"
                p="18.133px 15.867px"
                borderRadius="9.067px"
                onClick={selectColorMode(mode.key)}
                cursor={
                  // isCurrentThemeMode(mode.key)
                  //  ? 'not-allowed' :
                  'pointer'
                }
                bg="#031B2E"
                spacing="20.4px"
              >
                <Image
                  src={mode.thumb_nail}
                  bg="#0C2841"
                  objectFit="cover"
                  objectPosition="0px 0px"
                  borderRadius="6.8px"
                  alt="theme mode image"
                  h="156.825px"
                  w="278.8px"
                />
                <HStack w="full" justify="space-between">
                  <Stack spacing="4.53px" alignItems="start">
                    <Text fontSize="13.6px" fontWeight="400" color="#747474">
                      Starting From
                    </Text>
                    <Text fontSize="13.6px" fontWeight="600" color="#FF9103">
                      {mode.starting_price}
                      {/* {selectedTheme?.price} */}
                    </Text>
                  </Stack>
                  <Stack spacing="4.53px" alignSelf="start" alignItems="end">
                    <Text fontSize="13.6px" fontWeight="400" color="#ffffff">
                      {mode.mode}
                    </Text>
                  </Stack>
                </HStack>
              </Stack>
            ))
          ) : (
            <AbsoluteCenter>
              <Text
                fontSize="14px"
                maxW="250px"
                fontWeight="400"
                color="#747474"
                textAlign="center"
              >
                You {"haven't"} selected a theme yet. Please choose a theme to proceed.
              </Text>
            </AbsoluteCenter>
          )}
        </SimpleGrid>
      </ModalBody>
    </Stack>
  );
};

export default SelectThemeColorMode;
