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
} from '@chakra-ui/react';
import backIcon from '/src/images/icons/backArrowForDrawer.svg';
import listing_bag from '/src/images/icons/listing-bag.svg';
import listing_bag2 from '/src/images/icons/bag-tick-2.svg';
import { SmartContract } from './smartContract';

export const TerminateOptions = ({terminateOptions}) => {
    const contractModal = useDisclosure()
  return (
    <Drawer isOpen={terminateOptions.isOpen} onClose={terminateOptions.onClose} borderRadius="16px">
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
              onClick={terminateOptions.onClose}
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
            onClick={contractModal.onOpen}
            cursor={'pointer'}
          >
            <Image alt="home_owners_icon" src={listing_bag.src} width="24px" height="24px" />
            <Stack display="flex" flexDirection="column" gap="8px">
              <Text color="#191919" fontSize="14px" fontWeight="600">
                Do you want to list this unit publicly?
              </Text>
              <Text color="#606060" fontSize="10px" fontWeight="400">
                Listing the unit publicly indicates that it is available for sale to all users on
                the application.
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
            onClick={contractModal.onOpen}
          >
            <Image alt="home_owners_icon" src={listing_bag2.src} width="24px" height="24px" />
            <Stack display="flex" flexDirection="column" gap="8px">
              <Text color="#191919" fontSize="14px" fontWeight="600">
                Would you rather sell the unit privately
              </Text>
              <Text color="#606060" fontSize="10px" fontWeight="400">
                You can sell this unit privately, bypassing its listing on the application.
              </Text>
            </Stack>
          </Stack>
        </Box>
      </DrawerContent>
      <SmartContract contractModal={contractModal}/>
    </Drawer>
  );
};