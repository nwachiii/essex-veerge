import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  HStack,
  Heading,
  Image,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react';
import backIcon from '/src/images/icons/backArrowForDrawer.svg';
import contract_icon from '/src/images/icons/contract.svg';
import {MatadorCustomToast} from 'pages/veerge_menu/loop';
import {MdBlock} from 'react-icons/md';

export const SmartContract = ({contractModal}) => {
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
  return (
    <Drawer isOpen={contractModal?.isOpen} onClose={contractModal?.onClose}>
      <DrawerOverlay bg="rgba(0,0,0,0.1)" />
      <DrawerContent mt="65px" maxW="450px" bg="#fff" py="15.23px" pt="0px">
        <HStack
          pt="15.23px"
          pb="14.47px"
          boxShadow="4px 4px 8px 0px rgba(123, 157, 157, 0.05), -4px -4px 8px 0px rgba(123, 157, 157, 0.15)"
          pl="23.25px"
          pr="15.23px"
          w="full"
          justify="space-between"
        >
          <HStack gap={1}>
            <Image
              alt="back icon"
              cursor="pointer"
              src={backIcon.src}
              onClick={contractModal.onClose}
            />
            <Heading p="0px" fontSize="16px" fontWeight="600" borderBottom="none" color="#191919">
              Smart Contract
            </Heading>
          </HStack>
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
        <DrawerBody marginTop="3rem" px={8}>
          <VStack
            align={'center'}
            justify={'center'}
            px={6}
            py={3}
            border={'1px solid #F5F5F5'}
            borderRadius={'6px'}
            gap={8}
          >
            <VStack gap={4} mt={4}>
              <Image src={contract_icon.src} alt="" />
              <Text textAlign={'center'} fontSize={18} fontWeight={600}>
                Would you like to set up Smart Contract?
              </Text>
              <Text maxW={'300px'} textAlign={'center'} fontSize={14} color={'#606060'}>
                This means the subscriber will be refunded immediately this property is sold
              </Text>
            </VStack>
            <HStack gap={4}>
              <Button
                borderRadius={'72px'}
                border="1px solid #191919"
                color="#191919"
                bg={'#fff'}
                w={'150px'}
                h={'45px'}
                onClick={handleProceed}
                fontWeight={400}
              >
                No, Proceed
              </Button>
              <Button
                borderRadius={'72px'}
                color="#FFF"
                bg="#191919"
                w={'150px'}
                h={'45px'}
                fontWeight={400}
                onClick={handleProceed}
                _hover={{
                  bg: '',
                }}
              >
                Yes
              </Button>
            </HStack>
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
