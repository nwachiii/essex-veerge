import {DrawerBody, Flex, Input, Text, Textarea, useToast, VStack, Button, Image} from '@chakra-ui/react';
import {MatadorCustomToast} from 'pages/veerge_menu/loop';
import userIcon from '/src/images/icons/user.svg';
import {LuSend} from 'react-icons/lu';

export const SendScreen = ({customScrollbarStyles}) => {
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
    <DrawerBody
      sx={customScrollbarStyles}
      paddingTop="1rem"
      px="20px"
      w="400px"
      position={'relative'}
    >
      <VStack gap={8}>
        <VStack w={'full'} align={'start'}>
          <Flex
            align="center"
            gap="8px"
            border={'1px solid #E4E4E4'}
            borderRadius={'8px'}
            w={'full'}
            p="8px 12px"
            boxShadow="0px 1px 2px 0px rgba(16, 24, 40, 0.05)"
          >
            <Text color="#919191">To: </Text>
            <Flex
              align="center"
              gap="4px"
              w={'full'}
              bg="#F4F4F5"
              p="4px 8px"
              borderRadius="32px"
              maxW="max-content"
            >
              <Image src={userIcon.src} alt="user icon" boxSize="13px" />
              <Text fontSize="13p" letterSpacing="0.26px">
                Daniel Tanay
              </Text>
            </Flex>
          </Flex>
        </VStack>
        <Input
          name="emailTitle"
          border={'1px solid #E4E4E7'}
          placeholder="Email title"
          p="8px 12px"
          type="text"
          borderRadius={'8px'}
          boxShadow="0px 1px 2px 0px rgba(16, 24, 40, 0.05)"
        />
        <Textarea
          name="emailTitle"
          border={'1px solid #E4E4E7'}
          placeholder="Compose Email"
          minH={'124px'}
          p={2}
          boxShadow="0px 1px 2px 0px rgba(16, 24, 40, 0.05)"
          resize={'none'}
          fontSize="14px"
        />
        <Flex justifyContent="end" w={'full'}>
          <Button
            py={2}
            px={4}
            w="max-content"
            bg="#191919"
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
  );
};
