import {
  Box,
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  HStack,
  Heading,
  Image,
  Input,
  InputGroup,
  Text,
  Textarea,
  Tooltip,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import backIcon from '/src/images/icons/backArrowForDrawer.svg';
import clockIcon from '/src/images/icons/clock.svg';
import {PriceMenu} from 'pages/communities/create/WholeUnits/WholeUnits.Form';
import {RefundVerify} from './refundVerify';
import {useState} from 'react';

export const RefundDrawer = ({refundModal}) => {
  const verifyModal = useDisclosure();
  const [amount, setAmount] = useState('');

  const handleChange = event => {
    let value = event.target.value;
    value = value.replace(/[^0-9]/g, '');
    setAmount(value);
  };

  return (
    <Drawer isOpen={refundModal?.isOpen} onClose={refundModal?.onClose}>
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
          <HStack gap={1} alignItems={'center'}>
            <Image
              alt="back icon"
              cursor="pointer"
              src={backIcon.src}
              onClick={refundModal.onClose}
            />
            <Heading p="0px" fontSize="16px" fontWeight="600" borderBottom="none" color="#191919">
              Refund
            </Heading>
          </HStack>
          <HStack spacing={'15px'}>
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
        <DrawerBody marginTop="1rem">
          <VStack align={'start'} justify={'center'} gap={8}>
            <VStack align={'start'} w={'full'}>
              <Text fontSize={12}>Amount to refund</Text>
              <InputGroup
                alignItems={'center'}
                border="1px solid #E4E4E4"
                py={2}
                h="50px"
                borderRadius={'8px'}
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
              placeholder="Add note..."
              minH={'165px'}
              p={4}
              resize={'none'}
            />
            <HStack gap={4} w={'full'} mt={40}>
              <Button
                borderRadius={'72px'}
                color="#FFF"
                bg="#191919"
                w={'full'}
                h={'45px'}
                fontWeight={400}
                onClick={verifyModal.onOpen}
                _hover={{
                  bg: '',
                }}
                isDisabled={amount === ''}
              >
                Proceed
              </Button>
            </HStack>
          </VStack>
        </DrawerBody>
      </DrawerContent>
      <RefundVerify verifyModal={verifyModal} />
    </Drawer>
  );
};
