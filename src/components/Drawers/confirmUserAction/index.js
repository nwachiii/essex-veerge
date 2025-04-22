import AnimatedFingers from '@/components/common/loaders/AnimatedFingers';
import deleteIcon from '/src/images/icons/deleteContactIcon.svg';
import {
  AbsoluteCenter,
  Box,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Heading,
  HStack,
  Spinner,
  Stack,
  Text,
  VStack,
  Button,
  Image,
  Center,
} from '@chakra-ui/react';
import React from 'react';
// import {Button} from 'ui-lib/ui-lib.components';

export const ConfirmUserActionComponent = ({
  handleClose,
  mutation,
  handleSubmit,
  leadText,
  description,
  drawerDisclosure,
}) => {
  return (
    <Drawer isOpen={drawerDisclosure.isOpen} onClose={handleClose} borderRadius="16px">
      <DrawerOverlay bg="rgba(0,0,0,0.1)" />

      <DrawerContent position="relative" zIndex={100} mt="65.12px" minW="419px" bg="#fff" p="0px">
        <Center mt="40%">
          <VStack
            align={'center'}
            justify={'center'}
            p={10}
            border={'1px solid #F5F5F5'}
            borderRadius={'6px'}
            gap={4}
          >
            <Box>
              <Image src={deleteIcon.src} alt="contact person delete icon" />
            </Box>
            <Stack>
              <Heading fontSize={16} fontWeight={500} textAlign={'center'}>
                {leadText || 'Are you sure?'}
              </Heading>
              <Text textAlign={'center'} fontSize={14} fontWeight="400" color={'#606060'}>
                {description || 'This action is irreversible'}
              </Text>
            </Stack>
            <HStack gap={4} mt="10px">
              <Button
                variant="outline-radius"
                border="1px solid #FF3636"
                color="#FF3636"
                bg={'#fff'}
                w={'150px'}
                h={'45px'}
                fontSize="14px"
                onClick={handleClose}
                fontWeight={500}
                _hover={{bg: '#fff'}}
              >
                Cancel
              </Button>
              <Button
                h={'45px'}
                w={'150px'}
                variant="filled-radius"
                bg="#191919"
                color="#FFF"
                fontSize="14px"
                fontWeight={500}
                onClick={handleSubmit}
                _hover={{bg: '#191919'}}
                isDisabled={mutation.isLoading}
                isLoading={mutation.isLoading}
              >
                Yes
              </Button>
            </HStack>
          </VStack>
        </Center>
      </DrawerContent>
    </Drawer>
  );
};

export default ConfirmUserActionComponent;
