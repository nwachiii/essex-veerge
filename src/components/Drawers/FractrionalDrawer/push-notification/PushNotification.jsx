import {
  Box,
  Button,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  Flex,
  HStack,
  Heading,
  Image,
  Input,
  Text,
  Textarea,
  VStack,
  useToast,
} from '@chakra-ui/react';
import backIcon from '/src/images/icons/backArrowForDrawer.svg';
import groupIcon from '/src/images/icons/groupUsers.svg';
import {MatadorCustomToast} from 'pages/veerge_menu/loop';
import {LuSend} from 'react-icons/lu';

export const NotificationDrawer = ({isOpen, onClose}) => {
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
    <Drawer isOpen={isOpen} onClose={onClose}>
      <DrawerContent position="relative" zIndex={100} mt="65.12px" minW="400px" bg="#fff">
        <HStack
          py="30px"
          px="25px"
          h="49.699px"
          bg="#F5F5F5"
          align="center"
          position="relative"
          justify="space-between"
        >
          <Flex gap="5px" align={'center'}>
            <Image alt="back icon" cursor="pointer" src={backIcon.src} onClick={onClose} />
            <Heading fontSize="18.9px" fontWeight="700">
              Send Push Notification
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
        <VStack gap={8} p={4}>
          <VStack w={'full'} align={'start'}>
            <Text>To</Text>
            <Box border={'1px solid #E4E4E4'} borderRadius={'8px'} w={'full'} p={2}>
              <HStack background={'#F8F8F8'} borderRadius={'32px'} py={2} px={4} w={'max-content'}>
                <Image src={groupIcon.src} alt="" />
                <Text fontWeight={500}>Everyone</Text>
              </HStack>
            </Box>
          </VStack>
          <Input
            name="emailTitle"
            border={'1px solid #E4E4E4'}
            placeholder="Email title"
            px={5}
            py={7}
            type="text"
            borderRadius={'8px'}
          />
          <Box w={'full'}>
            <Textarea
              name="emailTitle"
              border={'1px solid #E4E4E4'}
              placeholder="Compose email"
              minH={'165px'}
              p={4}
              resize={'none'}
            />
            <Text
              color={'#919191'}
              fontSize={14}
              pos={'relative'}
              left={'55%'}
              bottom={8}
              fontWeight={300}
            >
              Max 300 characters
            </Text>
          </Box>
          <Flex justifyContent="end" w={'full'}>
            <Button
              py={2}
              px={4}
              w="max-content"
              bg="#191919"
              // type="submit"
              color="#FFFFFF"
              h="fit-content"
              cursor={'pointer'}
              textAlign={'center'}
              borderRadius={'8px'}
              _hover={{
                background: '',
              }}
              onClick={handleProceed}
            >
              <LuSend />
            </Button>
          </Flex>
        </VStack>
      </DrawerContent>
    </Drawer>
  );
};
