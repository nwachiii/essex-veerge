import React from 'react';
import {
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  HStack,
  Image,
  Menu,
  MenuButton,
  MenuList,
  Text,
  VStack,
  Spinner,
  Stack,
  Center,
  Button,
  StackDivider,
  AbsoluteCenter,
  useDisclosure,
} from '@chakra-ui/react';
import leftArrow from '/src/images/icons/leftArrow.svg';
import paper from '/src/images/icons/Paper_Negative.png';
import {changeDateFormat} from '../../../../utils/formatDate';

export const ListOfPendingInvites = ({
  setPendingInviteId,
  refetch,
  pendingList,
  isLoading,
  customScrollbarStyles,
  handlePendingInviteScreens,
  handleScreen,
}) => {
  const handleCancel = id => () => {
    setPendingInviteId(id);
    return handlePendingInviteScreens('cancelInvite');
  };

  console.log(pendingList);
  return (
    <>
      <HStack
        boxShadow="0px 3.20641px 6.41283px 0px rgba(0, 0, 0, 0.02)"
        mb="20px"
        py="6.72px"
        bg="#F5F5F5"
        px="12px"
        pl="27.3px"
        justify="space-between"
        align="center"
        position="relative"
      >
        <HStack spacing="10px">
          <Image
            cursor="pointer"
            src={leftArrow.src}
            onClick={handleScreen('inviteToTeam')}
            alt="left arrow"
          />
          <Text fontSize="16px" fontWeight={600} color="#191919">
            Pending Invites
          </Text>
        </HStack>

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
      <DrawerBody sx={customScrollbarStyles} p="0">
        <Stack
          w="full"
          spacing="none"
          divider={<StackDivider mt="19px" mb="10px" borderColor="#F5F5F5" />}
        >
          {isLoading ? (
            <AbsoluteCenter>
              <Spinner />
            </AbsoluteCenter>
          ) : pendingList?.length < 1 ? (
            <AbsoluteCenter h="314px" w="full">
              <VStack w="100%" spacing="22">
                <Image alt="" bg="#fff" src={paper.src} w="45px" h="52px" />
                <Text fontSize="18px" fontWeight={400} color="#000" as="span">
                  There are no pending invitation
                </Text>
              </VStack>
            </AbsoluteCenter>
          ) : (
            pendingList.map((info, idx) => (
              <HStack key={info?.id} px="29px" w="full" justify="space-between">
                <HStack spacing="11px">
                  {/* <Image
                    src={info?.img ?? ''}
                    fontSize="9px"
                    borderRadius="full"
                    objectFit="cover"
                    boxSize="48px"
                    alt="role image"
                  /> */}
                  <Stack spacing="3px">
                    <Text
                      fontSize="16px"
                      wordBreak="break-all"
                      whiteSpace="break-spaces"
                      fontWeight="500"
                      color="#4545FE"
                    >
                      {info?.email ?? '-'}
                    </Text>
                    <Text fontSize="12px" fontWeight="400" color="#191919">
                      {info?.role ?? '-'}
                    </Text>
                    <Text fontSize="10px" fontWeight="400" color="#191919">
                      {info?.invited_on ? changeDateFormat(info?.invited_on, 'add_time') : '-'}
                    </Text>
                  </Stack>
                </HStack>
                <Button
                  _hover={{bg: 'transparent'}}
                  _active={{bg: 'transparent'}}
                  _focus={{bg: 'transparent'}}
                  fontSize="7.655px"
                  fontWeight="400"
                  color="#191919"
                  borderRadius="6.562px"
                  onClick={handleCancel(info?.id)}
                  bg="transparent"
                  border="0.547px solid #191919"
                  h="19.138px"
                  w="50.306px"
                >
                  Cancel
                </Button>
              </HStack>
            ))
          )}
        </Stack>
      </DrawerBody>
    </>
  );
};

export default ListOfPendingInvites;
