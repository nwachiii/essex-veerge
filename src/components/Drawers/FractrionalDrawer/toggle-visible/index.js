import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  HStack,
  Heading,
  Image,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react';
import backIcon from '/src/images/icons/backArrowForDrawer.svg';
import fractionLockIcon from '/src/images/icons/lockFraction.svg';
import {MatadorCustomToast} from 'pages/veerge_menu/loop';

export const FractionVisibility = ({handleScreen, customScrollbarStyles, handleClose}) => {
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
    <DrawerContent
      p="0px"
      bg="#fff"
      zIndex={100}
      mt="65.12px"
      position="relative"
      minW="fit-content"
      sx={customScrollbarStyles}
    >
      <HStack
        py="30px"
        h="49.699px"
        bg="#F5F5F5"
        px="25px"
        justify="space-between"
        align="center"
        position="relative"
      >
        <Flex gap={'5px'} align={'center'}>
          <Image
            alt="back icon"
            cursor="pointer"
            src={backIcon.src}
            onClick={handleScreen('options')}
          />
          <Heading fontSize="18.9px" fontWeight="700">
            Make Private
          </Heading>
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
      <DrawerBody w={'400px'} marginTop="3rem" px={8}>
        <VStack
          align={'center'}
          justify={'center'}
          px={6}
          py={3}
          border={'1px solid #F5F5F5'}
          borderRadius={'6px'}
          gap={8}
        >
          <Image src={fractionLockIcon.src} alt="" mt={10} />
          <VStack gap={4}>
            <Text fontSize={18} fontWeight={600}>
              Are you sure?
            </Text>
            <Text textAlign={'center'} fontSize={14} color={'#606060'}>
              Setting this fractional unit to private will hide it from potential buyers on your
              application. You&apos;ll need to grant them access individually to view it.
            </Text>
          </VStack>
          <HStack gap={4}>
            <Button
              borderRadius="72px"
              border="1px solid #FF3636"
              color="#FF3636"
              bg={'#fff'}
              w={'150px'}
              h={'45px'}
              onClick={handleScreen('options')}
              fontWeight={400}
            >
              Cancel
            </Button>
            <Button
              borderRadius="72px"
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
  );
};
