import React from 'react';
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
  StackDivider,
} from '@chakra-ui/react';
import bgImage from '/src/images/bgs/enterUrlModalBg.svg';
import BackButton from '../backButton';
import {formatToCurrency} from 'utils/formatAmount';

const AppPurchaseSummary = ({selectedTheme, totalAmountToBePaid, handleScreen}) => {
  const switchToNextScreen = scrn => () => {
    return handleScreen(scrn);
  };

  const totalPrice = totalAmountToBePaid();

  return (
    <ModalBody h="full" p="0px" w="601px">
      <VStack spacing="none" w="full">
        <Stack
          borderRadius="19.308px 19.308px 0 0"
          w="full"
          h="200px"
          bg="#0C2841"
          align="center"
          justify="end"
        >
          <BackButton changeScreen={switchToNextScreen('additionalFeatures')} />
          <Image
            h="200px"
            w="385.053px"
            alt="create store image gif"
            objectFit="cover"
            objectPosition="0px 45px"
            src={bgImage.src}
          />
        </Stack>
        <Stack spacing="16px" w="full" bg="#fff" px="18px" pt="24px" pb="28.97">
          <Stack
            p="12px 16px"
            bg="#F1F3F4"
            spacing="12px"
            borderRadius="4px"
            border="0.5px solid #E4E4E4"
            w="full"
          >
            <HStack w="full" justify="space-between">
              <Text fontSize="14px" fontWeight="400" color="#3D3D3D">
                {selectedTheme?.name}
              </Text>
              <Text fontSize="14px" fontWeight="600" color="#3D3D3D">
                {selectedTheme?.price}
              </Text>
            </HStack>
            <HStack w="full" justify="space-between">
              <Text fontSize="14px" fontWeight="400" color="#3D3D3D">
                VAT
              </Text>
              <Text fontSize="14px" fontWeight="400" color="#3D3D3D">
                {formatToCurrency(undefined)}
              </Text>
            </HStack>
            <HStack w="full" justify="space-between">
              <Text fontSize="14px" fontWeight="600" color="#191919">
                Total
              </Text>
              <Text fontSize="14px" fontWeight="600" color="#191919">
                {formatToCurrency(totalPrice)}
              </Text>
            </HStack>
          </Stack>

          <Button
            alignSelf="center"
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
            // onClick={handleStoreCreation(strName)}
            onClick={switchToNextScreen('createWebApplication')}
            w="188.527px"
            bg="#191919"
            color="#ffffff"
            fontWeight="400"
            fontSize="14px"
            borderRadius=" 72px"
          >
            Proceed
          </Button>
          <Text alignSelf="center" textAlign="center" maxW="520px" fontSize="12px" fontWeight="400">
            By proceeding, you confirm your agreement with the{' '}
            <Text
              cursor="pointer"
              as="span"
              onClick={() => window.open(`https://veerge-support.myxellia.io/terms`, '_blank')}
              textDecoration="underline"
              color="#4545FE"
            >
              {' '}
              Terms of Service.
            </Text>{' '}
            A charge of{' '}
            <Text as="span" fontWeight="600">
              {formatToCurrency(totalPrice)}
            </Text>
            , based on today&aspos;s rate, will be applied. Even in the case of insufficient funds,
            the amount will be instantly deducted from your Veerge wallet.
          </Text>
        </Stack>
      </VStack>
    </ModalBody>
  );
};

export default AppPurchaseSummary;
