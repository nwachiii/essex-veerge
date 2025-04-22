import React from 'react';
import {
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  HStack,
  Image,
  Menu,
  MenuButton,
  Heading,
  Text,
  MenuList,
  VStack,
  useDisclosure,
  Button,
} from '@chakra-ui/react';
import successIcon from '/src/images/animated_icons/successIcon.gif';

export const InviteSuccesful = ({email, handleScreen}) => {
  return (
    <>
      <HStack
        boxShadow="0px 3.20641px 6.41283px 0px rgba(0, 0, 0, 0.02)"
        mb="20px"
        py="6.72px"
        bg="#fff"
        px="12px"
        pl="27.3px"
        justify="space-between"
        align="center"
        position="relative"
      >
        <Text fontSize="16px" fontWeight={600} color="#191919">
          Pending Invites
        </Text>

        <VStack
          position="relative"
          justify="center"
          align="center"
          w="30px"
          h="30px"
          borderRadius="5px"
          transition="0.3s ease-in-out"
          _hover={{
            //   background: "rgb(145, 145, 145,0.1)",

            width: '30px',
            height: '30px',
          }}
        >
          <DrawerCloseButton
            right="0px"
            left="0px"
            //   _hover={{
            //     color: "#d0d0d0",
            //   }}
            my="auto"
            color="#000"
            top="0"
            bottom="0"
          />
        </VStack>
      </HStack>
      <DrawerBody p="0" pt="20.3px" px="10px">
        <VStack
          padding="44.709px 23.234px 0px 22.891px"
          justify="start"
          spacing="11px"
          border="0.756px solid #DBDFE5"
          borderRadius="5px"
          w="full"
          h="377.3px"
        >
          <Image src={successIcon.src} h="88px" alt="success icon" />
          <Heading fontSize="18.147px" fontWeight="600" color="#0D0D0D">
            Successful
          </Heading>
          <Text w="273px" textAlign="center" fontSize="16px" fontWeight="300" color="#191919">
            An invitation email has been sent to{' '}
            <Text as="span" color="#4545FE">
              {' '}
              {email}.
            </Text>
          </Text>
          <Button
            mt="26.95px"
            _hover={{opacity: 1}}
            fontSize="14px"
            fontWeight="400"
            color="#fff"
            borderRadius="10px"
            onClick={handleScreen('pendinginvites')}
            bg="#0D0D0D"
            border="0.756px solid #0D0D0D"
            boxShadow="0px 0.75614px 1.51229px 0px rgba(16, 24, 40, 0.05)"
            h="45px"
            w="full"
          >
            Ok
          </Button>
        </VStack>
      </DrawerBody>
    </>
  );
};

export default InviteSuccesful;
