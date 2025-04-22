import React, {useEffect, useRef} from 'react';
import {
  Button,
  Image,
  Stack,
  ModalBody,
  VStack,
  Heading,
  Input,
  HStack,
  Text,
  useToast,
  Box,
  useDisclosure,
} from '@chakra-ui/react';
import bgImage from '/src/images/bgs/enterUrlModalBg.svg';
import orangeBulbIcon from '/src/images/icons/orange_bulb_create_store.svg';
import WebApplication from '@/components/Drawers/webApplication';
import BackButton from '../backButton';

export const EnterWebApplicationUrl = ({
  handleStoreCreation,
  mutation,
  storeInfo,
  placeHolder,
  strName,
  setStrName,
  handleScreen,
}) => {
  const toast = useToast();
  const initialRef = useRef(null);
  useEffect(() => {
    if (initialRef?.current) {
      initialRef?.current?.focus();
    }
  }, [initialRef]);
  const handleInput = e => {
    let inputValue = e.target.value.replace(/[\s\W\d_]/g, '').toLowerCase();

    return setStrName(inputValue);
  };
  const switchToNextScreen = scrn => () => {
    return handleScreen(scrn);
  };

  const isValid = !!strName && strName.length <= 30;
  const webApplicationModal = useDisclosure();

  return (
    <ModalBody h="full" p="0px" w="601px">
      <VStack spacing="none" w="full">
        <Stack
          borderRadius="19.308px 19.308px 0 0"
          w="full"
          h="280px"
          bg="#0C2841"
          align="center"
          justify="end"
        >
          <BackButton changeScreen={switchToNextScreen('additionalFeatures')} />
          <Image
            h="236px"
            // w="500px"
            w="385.053px"
            alt="create store image gif."
            objectFit="cover"
            objectPosition="0px 34%"
            src={bgImage.src}
          />
        </Stack>
        <VStack spacing="17.2px" w="full" bg="#fff" justify="center" pt="16.16px" pb="16.301">
          <Heading fontSize="18.774px" fontWeight="500">
            Enter Web Application URL
          </Heading>

          <HStack position="relative" w="261.278px" h="49.283px">
            <Input
              w="full"
              border="1px solid #A4A4A4"
              borderRadius="5px"
              h="full"
              pl="10px"
              fontSize="10.952px"
              fontWeight="400"
              maxLength="30"
              placeholder={placeHolder}
              value={strName}
              ref={initialRef}
              onChange={handleInput}
              _focusVisible={{
                boxShadow: 'none',
              }}
              _placeholder={{
                color: '#A4A4A4',
                'font-size': '10.952px',
                'font-weight': '400',
              }}
              color="#000000"
              pr="100px"
            />
            <HStack
              align="center"
              justify="center"
              w="84.485px"
              position="absolute"
              my="auto"
              right="7.82px"
              px="7px"
              py="11px"
              h="38.331px"
              bg="#F1F1F1"
              borderRightRadius="5px"
            >
              <Text color="#686868" fontSize="10.952px" fontWeight="400">
                .6787878.com
              </Text>
            </HStack>
          </HStack>
          <Button
            isDisabled={!isValid}
            variant="md-filled-radius"
            _hover={{
              opacity: '1',
            }}
            _active={{
              opacity: '1',
            }}
            _focus={{
              opacity: '1',
            }}
            h="43px"
            onClick={handleStoreCreation}
            w="188.527px"
            bg="#191919"
            color="#ffffff"
            isLoading={mutation.isLoading}
            fontWeight="400"
            fontSize="14px"
          >
            Create Application
          </Button>
          <HStack spacing="8px" onClick={webApplicationModal.onOpen}>
            <Image alt="orange bulb icon" src={orangeBulbIcon.src} />

            <Text color="#FF9103" cursor="pointer" fontSize="10.952px" fontWeight="400">
              What is a web application url?
            </Text>
          </HStack>
          <WebApplication drawerModal={webApplicationModal} />
        </VStack>
      </VStack>
    </ModalBody>
  );
};

export default EnterWebApplicationUrl;
