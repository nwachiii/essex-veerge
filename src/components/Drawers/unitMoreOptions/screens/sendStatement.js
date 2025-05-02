import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerOverlay,
  Flex,
  Heading,
  HStack,
  Image,
  Input,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import {MatadorCustomToast} from 'pages/veerge_menu/loop';
import {useState} from 'react';
import backIcon from '/src/images/icons/backArrowForDrawer.svg';
import UnitDateRange from './dateRange';
import checkIcon from '/src/images/icons/check-mark.svg';

export const SendStatementDrawer = ({handleScreen, customScrollbarStyles, drawerDisclosure}) => {
  const [type, setType] = useState(null);
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
    <Drawer isOpen={drawerDisclosure.isOpen} onClose={drawerDisclosure.onClose} autoFocus={false}>
      <DrawerOverlay bg="rgba(0,0,0,0.1)" />
      <DrawerContent
        position="relative"
        zIndex={100}
        mt="65.12px"
        sx={customScrollbarStyles}
        // mt="112.12px"
        minW="fit-content"
        bg="#fff"
        p="0px"
        maxW="400px"
        //   pr="3px"
      >
        <HStack
          py="30px"
          px="25px"
          h="49.699px"
          bg="#F5F5F5"
          align="center"
          position="relative"
          justify="space-between"
        >
          <Flex gap="5px">
            <Image
              alt="back icon"
              cursor="pointer"
              src={backIcon.src}
              onClick={drawerDisclosure.onClose}
            />
            <Heading fontSize="18.9px" fontWeight="700">
              Send Statement
            </Heading>
          </Flex>
          <HStack spacing="15px">
            <VStack
              w="30px"
              h="30px"
              _hover={{
                width: '30px',
                height: '30px',
              }}
              align="center"
              justify="center"
              position="relative"
              borderRadius="5px"
              transition="0.3s ease-in-out"
            >
              <DrawerCloseButton right="0px" left="0px" my="auto" color="#000" top="0" bottom="0" />
            </VStack>
          </HStack>
        </HStack>
        <DrawerBody
          sx={customScrollbarStyles}
          paddingTop="1rem"
          px="20px"
          w="400px"
          position={'relative'}
        >
          <VStack gap={8}>
            <UnitDateRange />

            <VStack align="start" w='full'>
              <Text fontSize='14px' fontWeight={500} color='#3F3F46'>Recipent</Text>
              <HStack w='full'>
                <HStack
                  bg="#f5f5f5"
                  borderRadius={'24px'}
                  padding="12px"
                  w="full"
                  cursor="pointer"
                  onClick={() => setType('personal')}
                  maxW='max-content'
                >
                  <Text fontSize="14px">Personal Email</Text>
                  {type === 'personal' ? (
                    <HStack
                      boxSize="16px"
                      border="1px solid #4545FE"
                      rounded="full"
                      align="center"
                      justify="center"
                    >
                      <Image boxSize="12px" src={checkIcon.src} alt="check icon" />
                    </HStack>
                  ) : (
                    <Box boxSize="16px" border="1px solid #CBCBCB" rounded="full" />
                  )}
                </HStack>
                <HStack
                  bg="#f5f5f5"
                  borderRadius={'24px'}
                  padding="12px"
                  w="full"
                  cursor="pointer"
                  onClick={() => setType('third-party')}
                  maxW='max-content'
                >
                  <Text fontSize="13px">3rd Party Email</Text>
                  {type === 'third-party' ? (
                    <HStack
                      boxSize="16px"
                      border="1px solid #4545FE"
                      rounded="full"
                      align="center"
                      justify="center"
                    >
                      <Image boxSize="12px" src={checkIcon.src} alt="check icon" />
                    </HStack>
                  ) : (
                    <Box boxSize="16px" border="1px solid #CBCBCB" rounded="full" />
                  )}
                </HStack>
              </HStack>
            </VStack>
            {type === 'third-party' && (
              <Input
                name="emailTitle"
                border={'1px solid #E4E4E7'}
                placeholder="3rd party email address"
                p="8px 12px"
                type="text"
                borderRadius={'8px'}
                boxShadow="0px 1px 2px 0px rgba(16, 24, 40, 0.05)"
              />
            )}
          </VStack>
        </DrawerBody>
        <DrawerFooter borderTop="0.5px solid #e4e4e7" p="20px 30px" w={'full'}>
          <Button
            p="12px 20px"
            w="full"
            bg="#191919"
            color="#FFFFFF"
            h="46px"
            cursor={'pointer'}
            textAlign={'center'}
            borderRadius={'8px'}
            _hover={{
              background: '',
            }}
            letterSpacing="0.16px"
            rounded="72px"
            onClick={handleProceed}
          >
            Send Statement
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
