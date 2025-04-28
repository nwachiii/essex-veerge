import React, {useState} from 'react';
import {
  Box,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  HStack,
  Text,
  VStack,
  Image as ChakraImage,
  useDisclosure,
  Spinner,
  Tooltip,
  Center,
  Stack,
} from '@chakra-ui/react';
import {useQuery} from '@tanstack/react-query';
import {HiOutlinePencilSquare} from 'react-icons/hi2';

import ContactCard from './ContactCard';
import PortfolioCard from './PortfolioCard';
import NotesDrawer from '../../notesDrawer';
import ActivityLogDrawerFile from '../activitylogDrawer/DrawerFile';

import activity from '/src/images/icons/activity-icon.svg';
import {fetchOneCustomer} from 'apis/customers';
import avatarFallback from '/src/images/avatar.svg';
import Image from 'next/image';
import Link from 'next/link';
import {customers} from 'pages/residents/customer_overview';

const CustomerDrawer = ({modalDisclosure, userId, runQuery, handleCloseDrawer = () => {}}) => {
  const ACTIVITY_LOG_DRAWER = useDisclosure();
  const notesDisclosure = useDisclosure();
  const [awaitUserId, setAwaitUserId] = useState(false);
  const handleClose = () => {
    return (() => {
      handleCloseDrawer();
      modalDisclosure.onClose();
    })();
  };

  const {data} = customers.data.filter(e => e.response.id == userId);

  return (
    <Drawer isOpen={modalDisclosure.isOpen} onClose={handleClose} borderRadius="16px">
      <DrawerOverlay bg="rgba(0,0,0,0.07)" />

      <DrawerContent
        position="relative"
        zIndex={100}
        mt="65.12px"
        maxW="450px"
        bg="#FBFCFC"
        p="0px"
        boxShadow="none"
      >
        <HStack
          boxShadow="4px 4px 8px 0px rgba(123, 157, 157, 0.05), -4px -4px 8px 0px rgba(123, 157, 157, 0.15)"
          mb="10px"
          py="12px"
          px="29px"
          justify="space-between"
          align="center"
          position="relative"
          width="full"
        >
          <Flex width="full" justifyContent="space-between" alignItems="center">
            <Text fontSize="20px" fontWeight={600} color="#191919">
              Profile
            </Text>

            <Box display="flex" flexDirection="row" alignItems="center" gap="16px">
              <Tooltip label="Activity Log">
                <Box
                  border="0.68px solid #191919"
                  p="10px"
                  borderRadius="8.12px"
                  _hover={{
                    background: 'rgba(25, 25, 25, 0.10)',
                  }}
                  cursor="pointer"
                  onClick={ACTIVITY_LOG_DRAWER.onOpen}
                >
                  <ChakraImage src={activity.src} alt="log" w="16px" h="16px" alignSelf="center" />
                </Box>
              </Tooltip>
              <Tooltip label="Notes">
                <Box
                  border="0.68px solid #191919"
                  p="10px"
                  borderRadius="8.12px"
                  _hover={{
                    background: 'rgba(25, 25, 25, 0.10)',
                  }}
                  onClick={() => {
                    notesDisclosure.onOpen();
                    setAwaitUserId(true);
                  }}
                  cursor="pointer"
                >
                  <HiOutlinePencilSquare />
                </Box>
              </Tooltip>
              <ActivityLogDrawerFile id={userId} modalDisclosure={ACTIVITY_LOG_DRAWER} />
              <NotesDrawer
                modalDisclosure={notesDisclosure}
                usersId={userId}
                awaitUserId={awaitUserId}
              />
            </Box>
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

        <Box
          display="flex"
          flexDirection="column"
          gap="12px"
          py="24px"
          px="26px"
          overflowY={'auto'}
        >
          <>
            {/* <ContactCard data={data} userId={userId} /> */}
            <HStack
              p={`15px`}
              gap={`8px`}
              borderRadius={`8px`}
              border={`0.5px solid`}
              borderColor={`#E4E4E4`}
              background={`#FFF`}
              as={Link}
              prefetch={true}
              href={`/residents/profile/?userId=${userId}`}
            >
              <Center boxSize={`56px`} position="relative">
                <Image
                  src={data?.data?.user_info?.avatar ?? avatarFallback.src}
                  // src={avatarFallback.src}
                  alt="user img"
                  fill
                  style={{objectFit: `cover`}}
                />
              </Center>
              <Stack gap={`8px`}>
                <Text
                  color={`#191919`}
                  fontSize={`18px`}
                  fontWeight={`600`}
                  lineHeight={`normal`}
                  textTransform={`capitalize`}
                >
                  {data?.data?.user_info?.first_name} {data?.data?.user_info?.last_name}
                </Text>
                <Text color={`#4545FE`} fontSize={`14px`} fontWeight={`400`} lineHeight={`normal`}>
                  view profile
                </Text>
              </Stack>
            </HStack>
            <PortfolioCard data={data} />
          </>
        </Box>
      </DrawerContent>
    </Drawer>
  );
};

export default CustomerDrawer;
