import {
  Button, Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay, HStack,
  Text,
  Textarea,
  useDisclosure,
  useToast
} from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { updateWhatsappUrl } from 'apis/settings';
import { MatadorCustomToast } from 'pages/veerge_menu/loop';
import { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { IoMdArrowBack } from 'react-icons/io';

export const WhatsappURLDrawer = ({url, refetch}) => {
  const [url_value, set_url_value] = useState(url || '');
  const toast = useToast();
  const disclosure = useDisclosure();

  const mutation = useMutation(formData => updateWhatsappUrl(formData), {
    onSuccess: async res => {
      disclosure.onClose();
      refetch();
      return toast({
        render: () => (
          <MatadorCustomToast description={`Whatsapp url ${url ? `updated` : `added`}!`} />
        ),
        duration: 4000,
        isClosable: true,
        position: 'top-right',
      });
    },
    onError: err => {
      toastForError(err, true, toast);
    },
  });

  const update_whatsapp_url = async url => {
    mutation.mutate({whatsapp: url_value});
  };

  const isValidURL = (url) => {
    const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    return urlPattern.test(url);
  }

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
        <FaWhatsapp fontSize={`20px`} />
        <Text flex={`1`} fontSize={`14px`} color={`#191919`}>
          WhatsApp
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
            {url ? `Update` : `Add`} URL
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
                WhatsApp URL
              </Text>
              <DrawerCloseButton />
            </HStack>
          </DrawerHeader>
          <DrawerBody p={`24px 27px`}>
            <Text color={`#3D3D3D`} fontSize={`12px`} fontWeight={`300`} mb={`12px`}>
              Enter your WhatsApp URL
            </Text>
            <Textarea
              bg={`#F5F5F5`}
              border={`1px solid #E4E4E4`}
              resize={`none`}
              h={`120px`}
              value={url_value}
              onChange={e => set_url_value(e.target.value)}
            />
          </DrawerBody>
          <DrawerFooter p={`30px 28px`}>
            <Button
              w={`100%`}
              p={`13px`}
              color={`#FFF`}
              fontFamily={`"Euclid Circular B"`}
              fontSize={`14px`}
              lineHeight={`130%`}
              border-radius={`10px`}
              border={`0.756px solid #0D0D0D`}
              background={`#0D0D0D`}
              boxShadow={`0px 0.756px 1.512px 0px rgba(16, 24, 40, 0.05)`}
              _hover={{bg: `#0D0D0D`}}
              _focus={{bg: `#0D0D0D`}}
              _focusVisible={{bg: `#0D0D0D`}}
              _active={{bg: `#0D0D0D`}}
              onClick={update_whatsapp_url}
              isLoading={mutation.isLoading}
              isDisabled={!isValidURL(url_value)}
              rounded='72px'
            >
              <Text fontWeight={`400`}>{url ? `Update` : `Submit`}</Text>
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
