import React from 'react';
import {
  Button,
  Image,
  Stack,
  ModalBody,
  VStack,
  Heading,
  Text,
  StackDivider,
} from '@chakra-ui/react';
import bgImage from '/src/images/bgs/enterUrlModalBg.svg';
import BackButton from '../backButton';

const AdditionalFeatures = ({
  handleScreen,
  mutation,
  storeName,
  handleStoreCreation,
  selectedTheme,
  onClose,
}) => {
  const switchToNextScreen = scrn => () => {
    return handleScreen(scrn);
  };
  const addedFeatures = [
    {
      name: 'Auto-Pay',
      price: '$500',
    },
    {
      name: 'Fractional',
      price: '$1,350',
    },
    {
      name: 'Co-ownership',
      price: '$1,000',
    },
    {
      name: "Realtor's Portal",
      price: '$1,500',
    },
  ];
  return (
    <ModalBody h="full" p="0px" w="600px">
      <VStack spacing="none" w="full">
        <Stack
          borderRadius="19.308px 19.308px 0 0"
          w="full"
          h="200px"
          bg="#0C2841"
          align="center"
          justify="end"
        >
          <BackButton
            changeScreen={
              selectedTheme?.singleColor ? onClose : switchToNextScreen('selectThemeColorMode')
            }
          />
          <Image
            h="200px"
            w="385.053px"
            alt="create store image gif"
            objectFit="cover"
            objectPosition="0px 45px"
            src={bgImage.src}
          />
        </Stack>
        <Stack spacing="17px" w="full" bg="#fff" px="18px" pt="20px" pb="16.301">
          <Stack spacing="6px">
            <Heading fontSize="18px" color="#191919" fontWeight="500">
              Additional Features
            </Heading>
            <Text fontSize="14px" maxW="570px" fontWeight="400" color="#606060">
              If you are interested in enhancing the user experience with additional features,
              please see the pricing details below
            </Text>
            {/* <Text
              cursor="pointer"
              _before={{
                content: '""',
                position: 'absolute',
                w: '0%',
                h: '0.5px',
                bg: '#4545FE',
                bottom: '0',
                transition: 'width ease-in-out 0.2s ',
              }}
              _hover={{
                '&::before': {
                  w: '100%',
                },
              }}
              w="fit-content"
              position="relative"
              fontSize="12px"
              color="#4545FE"
              fontWeight="300"
            >
              Learn more
            </Text> */}
          </Stack>
          <Stack
            p="12px"
            bg="#F1F3F4"
            divider={
              <StackDivider
                my="12px"
                borderWidth="0.3px"
                h="0.3px"
                bg="#E4E4E4"
                borderColor="#E4E4E4"
                border="none"
              />
            }
            spacing="none"
            borderRadius="4px"
            border="0.5px solid #E4E4E4"
            w="full"
          >
            {addedFeatures.map((item, idx) => {
              return (
                <Stack spacing="4px" key={idx}>
                  <Text fontSize="14px" fontWeight="400" color="#3D3D3D">
                    {item.name}
                  </Text>
                  <Text fontSize="14px" fontWeight="600" color="#060623">
                    {item.price}
                  </Text>
                </Stack>
              );
            })}
          </Stack>

          <Button
            alignSelf="center"
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
            isLoading={storeName ? mutation.isLoading : false}
            // onClick={handleStoreCreation(strName)}
            onClick={storeName ? handleStoreCreation : switchToNextScreen('createWebApplication')}
            w="188.527px"
            bg="#191919"
            color="#ffffff"
            fontWeight="400"
            fontSize="14px"
          >
            Proceed
          </Button>
        </Stack>
      </VStack>
    </ModalBody>
  );
};

export default AdditionalFeatures;
