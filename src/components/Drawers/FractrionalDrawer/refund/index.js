import {
  Box,
  Divider,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  Flex,
  HStack,
  Heading,
  Image,
  Input,
  InputGroup,
  Text,
  Textarea,
  VStack,
  useToast,
} from '@chakra-ui/react';
import {Button} from 'ui-lib/ui-lib.components';
import backIcon from '/src/images/icons/backArrowForDrawer.svg';
import groupIcon from '/src/images/icons/groupUsers.svg';
import {MatadorCustomToast} from 'pages/veerge_menu/loop';
import {PriceMenu} from 'pages/listings/create/WholeUnits/WholeUnits.Form';
import {LuSend} from 'react-icons/lu';
import {useState} from 'react';

export const RefundDrawer = ({handleScreen, customScrollbarStyles, unitInfo}) => {
  const [amount, setAmount] = useState('');
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

  const handleChange = event => {
    let value = event.target.value;
    value = value.replace(/[^0-9]/g, '');
    setAmount(value);
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
        px="25px"
        h="49.699px"
        bg="#F5F5F5"
        align="center"
        position="relative"
        justify="space-between"
      >
        <Flex gap="5px" align={'center'}>
          <Image
            alt="back icon"
            cursor="pointer"
            src={backIcon.src}
            onClick={handleScreen('options')}
          />
          <Heading fontSize="18.9px" fontWeight="700">
            Refund
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
      <DrawerBody sx={customScrollbarStyles} paddingTop="1rem" w="400px" position={'relative'}>
        <VStack gap={6} p={2}>
          <VStack w={'full'} align={'start'}>
            <Text fontSize={14}>To</Text>
            <Box border={'1px solid #E4E4E4'} borderRadius={'8px'} w={'full'} p={2}>
              <HStack background={'#F8F8F8'} borderRadius={'32px'} py={2} px={4} w={'max-content'}>
                <Image src={groupIcon.src} alt="" />
                <Text fontWeight={500}>Everyone</Text>
              </HStack>
            </Box>
          </VStack>
          <VStack align={'start'} w={'full'}>
            <Text fontSize={14}>Amount to refund</Text>
            <InputGroup
              alignItems={'center'}
              border="1px solid #E4E4E4"
              h="50px"
              borderRadius={'8px'}
              p={2}
            >
              <PriceMenu fillForNairaSvgIcon="#191919" disableMenu />
              <Divider orientation="vertical" ml="4px" height="full" />
              <Input
                border={0}
                p={4}
                mt="0px"
                type="text"
                placeholder="0.00"
                className="formik__field"
                name={`price_per_fraction`}
                _focus={{
                  borderColor: 'transparent',
                }}
                _focusVisible={{
                  outline: 'none',
                }}
                onChange={handleChange}
                value={amount}
              />
            </InputGroup>
          </VStack>
          <Textarea
            name="emailTitle"
            border={'1px solid #E4E4E4'}
            placeholder="Add a note..."
            minH={'165px'}
            p={4}
            resize={'none'}
            _placeholder={{
              fontSize: '12px',
            }}
          />
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
              isDisabled={amount === ''}
            >
              <LuSend />
            </Button>
          </Flex>
        </VStack>
      </DrawerBody>
    </DrawerContent>
  );
};

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: {stiffness: 1000, velocity: -100},
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: {stiffness: 1000},
    },
  },
};
