import {
  Box,
  Button,
  DrawerBody,
  DrawerCloseButton,
  Flex,
  HStack,
  Heading,
  Image,
  Input,
  Text,
  Textarea,
  Tooltip,
  VStack,
  useToast,
} from '@chakra-ui/react';
import backIcon from '/src/images/icons/backArrowForDrawer.svg';
import clockIcon from '/src/images/icons/clock.svg';
import {MatadorCustomToast} from 'pages/veerge_menu/loop';
import {LuSend} from 'react-icons/lu';

export const PushNotificationDrawer = ({handleScreen, customScrollbarStyles, handleClose}) => {
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
    <>
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
            onClick={handleScreen('options')}
          />
          <Heading fontSize="18.9px" fontWeight="700">
            Send Push Notification
          </Heading>
        </Flex>
        <HStack spacing="15px">
          <Tooltip label="History">
            <Box
              border="0.68px solid #191919"
              p="10px"
              borderRadius="8.12px"
              _hover={{
                background: 'rgba(25, 25, 25, 0.10)',
              }}
              cursor="pointer"
            >
              <Image src={clockIcon.src} alt="log" w="16px" h="16px" alignSelf="center" />
            </Box>
          </Tooltip>
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
        mr="2px"
        w="400px"
        position={'relative'}
      >
        <VStack gap={6} p={2}>
          <Input
            name="emailTitle"
            border={'1px solid #E4E4E4'}
            placeholder="Notification title"
            px={5}
            py={7}
            type="text"
            borderRadius={'8px'}
          />
          <Box w={'full'}>
            <Textarea
              name="emailTitle"
              border={'1px solid #E4E4E4'}
              placeholder="Compose message"
              minH={'165px'}
              p={2}
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
      </DrawerBody>
    </>
  );
};
