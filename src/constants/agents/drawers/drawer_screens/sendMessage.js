import {
  Button,
  DrawerBody,
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
import {MatadorCustomToast} from 'pages/veerge_menu/loop';
import {LuSend} from 'react-icons/lu';

export const SendMessageDrawer = ({handleScreen, agent, customScrollbarStyles, handleClose}) => {
  const toast = useToast();
  console.log(agent);
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
          <HStack>
            <Image alt="user_avatar" cursor="pointer" src={agent?.avatar} w={'32px'} h={'32px'} />
            <Heading fontSize={16} fontWeight={700} textTransform={'capitalize'}>
              {agent?.first_name} {agent?.last_name}
            </Heading>
          </HStack>
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
        mr="2px"
        w="400px"
        position={'relative'}
        display={'flex'}
      >
        <VStack gap={8} p={4} flex={1} justify={'space-between'}>
          <VStack justify={'center'} flex={1}>
            <Heading color={'#606060'} fontSize={16} fontWeight={700}>
              Nothing Found
            </Heading>
            <Text>Looks like no one&apos;s sent a message yet!</Text>
          </VStack>
          <Flex align={'start'} gap={2} w={'full'}>
            <Input
              name="emailTitle"
              border={'1px solid #E4E4E4'}
              px={5}
              py={6}
              type="text"
              borderRadius={'8px'}
            />
            <Button
              px={2}
              w="70px"
              bg="#4545FE"
              // type="submit"
              color="#FFFFFF"
              h="50px"
              cursor={'pointer'}
              textAlign={'center'}
              borderRadius={'9px'}
              _hover={{
                background: '',
              }}
              onClick={handleProceed}
            >
              <LuSend size={15} height={'max-content'} />
            </Button>
          </Flex>
        </VStack>
      </DrawerBody>
    </>
  );
};
