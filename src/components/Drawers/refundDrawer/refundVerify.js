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
import {OTPInput} from 'chakra-otp-input';
import {useState} from 'react';
import backIcon from '/src/images/icons/backArrowForDrawer.svg';
import {MatadorCustomToast} from 'pages/veerge_menu/loop';

export const RefundVerify = ({verifyModal}) => {
  const [code, setCode] = useState('');
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
    <Drawer isOpen={verifyModal?.isOpen} onClose={verifyModal?.onClose}>
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
              onClick={verifyModal.onClose}
            />
            <Heading p="0px" fontSize="16px" fontWeight="600" borderBottom="none" color="#191919">
              Refund
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
        <DrawerBody marginTop="1rem">
          <VStack justify={'center'} gap={6} px={2}>
            <VStack align={'start'}>
              <Text fontWeight={500}>Verify it&apos;s you</Text>
              <Text fontWeight={300}>
                We have sent a 6 digit OTP code from your authenticator app. Kindly input to verify
                and continue.
              </Text>
            </VStack>
            <OTPInput
              w="full"
              h="55.658px"
              value={code}
              noInputs={6}
              type="number"
              fontWeight={'300'}
              borderRadius="12px"
              fontSize={'35.621px'}
              border="1px solid #E4E4E4"
              onChange={value => setCode(value)}
              style={{color: '#3D3D3D', backgroundColor: '#E5E5E5'}}
              boxShadow={'none'}
            />
            <HStack gap={4} w={'full'} mt={40}>
              <Button
                borderRadius={'72px'}
                color="#FFF"
                bg="#191919"
                w={'full'}
                h={'50px'}
                fontWeight={400}
                onClick={handleProceed}
                _hover={{
                  bg: '',
                }}
              >
                Proceed
              </Button>
            </HStack>
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
