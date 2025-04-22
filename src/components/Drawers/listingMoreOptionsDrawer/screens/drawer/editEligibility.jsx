import {
  Box,
  Button,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  Flex,
  HStack,
  Image,
  Input,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react';
import backIcon from '/src/images/icons/backArrowForDrawer.svg';
import {useState} from 'react';
import {MatadorCustomToast} from 'pages/veerge_menu/loop';

export const EditEligibility = ({isOpen, onClose}) => {
  const [milestoneInput, setMilestoneInput] = useState();
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

    if ((!isNaN(value) && value === '') || (value <= 100 && value >= 1)) {
      setMilestoneInput(value);
    }
  };
  return (
    <Drawer isOpen={isOpen} onClose={onClose}>
      <DrawerContent position="relative" zIndex={100} mt="65.12px" minW="400px" bg="#fff">
        <HStack
          py="12px"
          px="29px"
          bg="#F5F5F5"
          align="center"
          position="relative"
          justify="space-between"
          boxShadow="0px 4px 8px 0px rgba(0, 0, 0, 0.02)"
        >
          <HStack>
            <Image alt="back icon" cursor="pointer" src={backIcon.src} onClick={onClose} />
            <Text fontSize="20px" fontWeight={600} color="#191919">
              Edit Eligibility
            </Text>
          </HStack>
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
        <Box>
          <VStack align="flex-start" px="8" mt="5">
            <Text fontSize={12}>At what milestone should subscribers be able to sell?</Text>
            <Input
              w="full"
              h="44px"
              borderRadius="6px"
              id="quantity"
              name="quantity"
              color="#191919"
              pl="3"
              _focus={{
                outline: 'none',
                border: '0.8px solid #191919',
                boxShadow: '0px 0.802px 1.603px 0px rgba(16, 24, 40, 0.05)',
              }}
              _hover={{outline: 'none', border: '0.8px solid #191919'}}
              border="0.8px solid #191919"
              boxShadow="0px 0.802px 1.603px 0px rgba(16, 24, 40, 0.05)"
              onChange={handleChange}
              value={milestoneInput}
              maxLength={3}
            />
          </VStack>
          <Flex justifyContent="center" mt="10" px="8">
            <Button
              py={4}
              w="full"
              bg="#191919"
              color="#FFFFFF"
              h="45.5px"
              cursor={'pointer'}
              textAlign={'center'}
              borderRadius={'full'}
              _hover={{
                background: '',
              }}
              fontWeight={400}
              disabled={!milestoneInput}
              onClick={handleProceed}
            >
              Proceed
            </Button>
          </Flex>
        </Box>
      </DrawerContent>
    </Drawer>
  );
};
