import {
  Box,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  HStack,
  Image,
  Stack,
  Text,
  VStack,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import backIcon from '/src/images/icons/backArrowForDrawer.svg';
import {MatadorCustomToast} from 'pages/veerge_menu/loop';
import terminate_archive from '/src/images/icons/archive-terminate.svg';
import terminate_list from '/src/images/icons/list-terminate.svg';
import {TerminateOptions} from './TerminateOptions';

export const TerminateTabs = ({terminateTabs}) => {
  const toast = useToast();
  const handleProceed = () => {
    toast({
      render: () => (
        <MatadorCustomToast
          description={
            'Unfortunately, you are currently not eligible to use this feature. Please contact our support team for assistance.'
          }
        />
      ),
      duration: 4000,
      isClosable: true,
      position: 'top-right',
    });
  };
  const terminateOptions = useDisclosure();
  return (
    <Drawer isOpen={terminateTabs.isOpen} onClose={terminateTabs.onClose} borderRadius="16px">
      <DrawerOverlay bg="rgba(0,0,0,0.07)" />
      <DrawerContent
        position="relative"
        zIndex={100}
        mt="65.12px"
        maxW="450px"
        bg="#FBFCFC"
        p="0px"
        boxShadow="none"
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
          <Flex alignItems="center" gap={2}>
            <Image
              alt="back icon"
              cursor="pointer"
              src={backIcon.src}
              onClick={terminateTabs.onClose}
            />
            <Text fontWeight={600} color="#191919">
              Terminate
            </Text>
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
        <Box
          display="flex"
          flexDirection="column"
          gap="20px"
          pt="0px"
          pb="20px"
          px="25px"
          overflowY="scroll"
        >
          <Stack
            py="15px"
            px="11px"
            display="flex"
            flexDirection="column"
            gap="11px"
            borderRadius="12px"
            border="1px solid #E4E4E4"
            cursor={'pointer'}
            onClick={handleProceed}
          >
            <Image alt="home_owners_icon" src={terminate_archive.src} width="24px" height="24px" />
            <Stack display="flex" flexDirection="column" gap="8px">
              <Text color="#191919" fontSize="14px" fontWeight="600">
                Do you want to terminate and archive
              </Text>
              <Text color="#606060" fontSize="10px" fontWeight="400">
                Terminating and archiving ends the transaction without relisting the unit for sale
                immediately. Instead, it moves the unit to an archive for potential sale at a later
                date.
              </Text>
            </Stack>
          </Stack>

          <Stack
            py="15px"
            px="11px"
            display="flex"
            flexDirection="column"
            gap="11px"
            borderRadius="12px"
            border="1px solid #E4E4E4"
            cursor={'pointer'}
            onClick={terminateOptions.onOpen}
          >
            <Image alt="home_owners_icon" src={terminate_list.src} width="24px" height="24px" />
            <Stack display="flex" flexDirection="column" gap="8px">
              <Text color="#191919" fontSize="14px" fontWeight="600">
                Do you want to terminate and list for sale
              </Text>
              <Text color="#606060" fontSize="10px" fontWeight="400">
                Terminating the transaction and immediately relisting the unit for sale ends the
                current agreement and makes the unit available for purchase again.
              </Text>
            </Stack>
          </Stack>
        </Box>
      </DrawerContent>
      <TerminateOptions terminateOptions={terminateOptions} />
    </Drawer>
  );
};
