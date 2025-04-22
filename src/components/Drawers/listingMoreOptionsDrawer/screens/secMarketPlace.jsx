import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  HStack,
  Heading,
  Image,
  StackDivider,
  Text,
  Tooltip,
  VStack,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import backIcon from '/src/images/icons/backArrowForDrawer.svg';
import editEligbleIcon from '/src/images/icons/editEligibility.svg';
import {MatadorCustomToast} from 'pages/veerge_menu/loop';
import {EditEligibility} from './drawer/editEligibility';

export const SecondaryMP = ({isOpen, onClose, handleBack}) => {
  const editEligibility = useDisclosure();

  const handleExit = () => {
    onClose();
    handleBack();
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose}>
      <DrawerOverlay bg="rgba(0,0,0,0.1)" />
      <DrawerContent position="relative" zIndex={100} mt="65.12px" minW="400px" bg="#fff" p="0px">
        <HStack
          py="30px"
          h="49.699px"
          bg="#F5F5F5"
          px="25px"
          justify="space-between"
          align="center"
          position="relative"
        >
          <HStack alignItems={'center'}>
            <Image alt="back icon" cursor="pointer" src={backIcon.src} onClick={handleExit} />
            <Heading fontSize="18.9px" fontWeight="700">
              Secondary Market
            </Heading>
          </HStack>
          <HStack spacing="15px">
            <Tooltip label="Edit Eligibility">
              <Box
                border="0.68px solid #191919"
                p="10px"
                borderRadius="8.12px"
                _hover={{
                  background: 'rgba(25, 25, 25, 0.10)',
                }}
                cursor="pointer"
                onClick={editEligibility.onOpen}
              >
                <Image src={editEligbleIcon.src} alt="log" w="16px" h="16px" alignSelf="center" />
              </Box>
            </Tooltip>
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
        <DrawerBody p="23px">
          <VStack
            align={'start'}
            p={'14px 10px'}
            divider={<StackDivider my="10px" />}
            border={'1px solid #E4E4E4'}
            borderRadius={'8px'}
            gap={2}
          >
            <VStack align={'start'} gap={1}>
              <Text color={'#606060'} fontSize={14}>
                Who can sell their property?
              </Text>
              <Text fontWeight={600}>Subscribers that have completed payment only</Text>
            </VStack>
            <VStack align={'start'} gap={1}>
              <Text color={'#606060'} fontSize={14}>
                What milestone can they sell?
              </Text>
              <Text fontWeight={600}>100%</Text>
            </VStack>
          </VStack>
        </DrawerBody>
      </DrawerContent>
      <EditEligibility isOpen={editEligibility.isOpen} onClose={editEligibility.onClose} />
    </Drawer>
  );
};
