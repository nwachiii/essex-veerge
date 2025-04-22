import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  HStack,
  Image,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import {useMutation} from '@tanstack/react-query';
import {useEffect, useState} from 'react';
import {IoMdArrowBack} from 'react-icons/io';
import imageIcon from '/src/images/icons/imageIcon.svg';
import infoIcon from '/src/images/icons/info-circle-orange.svg';
import {customScrollbarStyles} from '@/components/common/Calendar/DatePicker';
import {updateCompanyLogo} from 'apis/application';
import {toastForError} from 'utils/toastForErrors';
import { CompanyImageUpload } from 'ui-lib/ui-lib.components';
export const AppImageDrawer = ({storeData, refetch}) => {
  const [file, setFile] = useState({
    favicon_dark: storeData?.favicon_dark,
    favicon_light: storeData?.favicon_light,
    light_logo: storeData?.light_logo,
    dark_logo: storeData?.dark_logo,
  });
  const [loaded, setLoaded] = useState("")
  const toast = useToast();
  const disclosure = useDisclosure();

  const getCompanyImages = useMutation(payload => updateCompanyLogo(payload), {
    onSuccess: res => {
      refetch();
      toast({
        title: 'Success',
        status: 'success',
        description: 'Company logo updated!',
        position: 'top-right',
        duration: 4000,
        isClosable: true,
      });
    },
    onError: err => {
      toastForError(err, true, toast);
    },
  });

  const updateCompanyImages = async (name, file) => {
    setLoaded(name)
    getCompanyImages.mutate({ [name]: file })
  }

  const removeFile = async (name) => {
    setFile((prev) => ({
      ...prev,
      [name]: null,
    }))
  }

  useEffect(() => {
    setFile({
      favicon_dark: storeData?.favicon_dark,
      favicon_light: storeData?.favicon_light,
      light_logo: storeData?.light_logo,
      dark_logo: storeData?.dark_logo,
    });
  }, [storeData, refetch]);
  
  return (
    <>
      <HStack
        width={`100%`}
        padding={`20px 12px`}
        gap={`6px`}
        onClick={() => disclosure.onOpen()}
        borderRadius={`4px`}
        border={`1px solid #E4E4E4`}
        background={`#F9FAFB`}
        justify={`space-between`}
        color={`#191919`}
      >
        <Image src={imageIcon.src} alt="" />
        <Text flex={`1`} fontSize={`14px`} color={`#191919`}>
          App Images
        </Text>
        <Button
          p={`8px 12px`}
          borderRadius={`4px`}
          border={`0.5px solid #191919`}
          bg={`transparent`}
          _hover={{bg: `transparent`}}
          _active={{bg: `transparent`}}
          _focus={{bg: `transparent`}}
          _focusVisible={{bg: `transparent`}}
          h={`100%`}
        >
          <Text fontSize={`10px`} fontWeight={`400`} lineHeight={`100%`}>
            Update
          </Text>
        </Button>
      </HStack>
      <Drawer isOpen={disclosure.isOpen} onClose={disclosure.onClose} size="md">
        <DrawerOverlay />
        <DrawerContent mt="65px" p="0px" maxW={`400px`}>
          <DrawerHeader
            p={`14px 27.25px`}
            background={`#F5F5F5`}
            boxShadow={`0px 3.206px 6.413px 0px rgba(0, 0, 0, 0.02)`}
          >
            <HStack gap={`4px`}>
              <IoMdArrowBack onClick={disclosure.onClose} cursor={`pointer`} />
              <Text color={`#191919`} fontSize={`16px`} fontWeight={`600`}>
                App Images
              </Text>
              <DrawerCloseButton />
            </HStack>
          </DrawerHeader>
          <DrawerBody
            p={`18px 27px`}
            maxH="100vh"
            overflowY="auto"
            sx={customScrollbarStyles}
            gap="16px"
          >
            <Flex color="#EA580C" gap={2} align="center" mb="8px">
              <Image src={infoIcon.src} alt="" />

              <Text fontSize={`15px`} letterSpacing="0.26px">
                SVG Format Recommended
              </Text>
            </Flex>
            <Stack>
              <Box>
                <Text fontWeight={600} fontSize={`16px`}>
                  Company's Logo
                </Text>
                <Text color={`#52525B`} fontSize={`14px`} letterSpacing="0.33px">
                  250 x 100 pixels
                </Text>
              </Box>
              <Stack gap="16px">
                <Stack>
                  <Text color={`#52525B`} fontSize={`13px`} letterSpacing="0.33px">
                    Light Mode
                  </Text>
                  <CompanyImageUpload
                    fileWidth={250}
                    fileHeight={100}
                    name="light_logo"
                    file={file?.light_logo}
                    setFile={updateCompanyImages}
                    getCompanyImages={getCompanyImages}
                    removeFile={removeFile}
                    loaded={loaded}
                  />
                </Stack>
                <Stack>
                  <Text color={`#52525B`} fontSize={`13px`} letterSpacing="0.33px">
                    Dark Mode
                  </Text>
                  <CompanyImageUpload
                    fileWidth={250}
                    fileHeight={100}
                    name="dark_logo"
                    file={file?.dark_logo}
                    setFile={updateCompanyImages}
                    getCompanyImages={getCompanyImages}
                    removeFile={removeFile}
                    loaded={loaded}
                  />
                </Stack>
              </Stack>
            </Stack>
            <Stack mt="16px">
              <Box>
                <Text fontWeight={600} fontSize={`16px`}>
                  Favicon
                </Text>
                <Text color={`#52525B`} fontSize={`14px`} letterSpacing="0.33px">
                  64 x 64 pixels
                </Text>
              </Box>
              <Stack gap="16px">
                <Stack>
                  <Text color={`#52525B`} fontSize={`13px`} letterSpacing="0.33px">
                    Light Mode
                  </Text>
                  <CompanyImageUpload
                    fileWidth={64}
                    fileHeight={64}
                    name="favicon_light"
                    file={file?.favicon_light}
                    setFile={updateCompanyImages}
                    getCompanyImages={getCompanyImages}
                    removeFile={removeFile}
                    loaded={loaded}
                  />
                </Stack>
                <Stack>
                  <Text color={`#52525B`} fontSize={`13px`} letterSpacing="0.33px">
                    Dark Mode
                  </Text>
                   <CompanyImageUpload
                    fileWidth={64}
                    fileHeight={64}
                    name="favicon_dark"
                    file={file?.favicon_dark}
                    setFile={updateCompanyImages}
                    getCompanyImages={getCompanyImages}
                    removeFile={removeFile}
                    loaded={loaded}
                  />
                </Stack>
              </Stack>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
