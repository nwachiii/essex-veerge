import {
  Divider,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  HStack,
  Heading,
  Image,
  ListItem,
  Menu,
  MenuButton,
  MenuList,
  Stack,
  Text,
  UnorderedList,
} from '@chakra-ui/react';
import backIcon from '/src/images/icons/backArrowForDrawer.svg';
import {menuOptions} from 'constants/veergeMenu/broadcastMenuOptions';
import {dayMonthYearWithTime} from 'utils/formatDate';
import {MdChevronRight} from 'react-icons/md';
import {CloseIcon} from '@chakra-ui/icons';
import PersonIcon from '/src/images/icons/person-icon.svg';

export const ViewBroadcastContent = ({isOpen, onClose, channel, messageData}) => {
  return (
    <Drawer isOpen={isOpen} onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent position="relative" zIndex={100} mt="65.12px" minW="400px" bg="#fff">
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
            <Image alt="back icon" cursor="pointer" src={backIcon.src} onClick={onClose} />
            <Heading textTransform="capitalize" fontSize="18.9px" fontWeight="700">
              {channel} history
            </Heading>
          </Flex>
          <Stack
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
          </Stack>
        </HStack>
        <Stack gap="24px" p={6}>
          <HStack
            p="10.024px 12px"
            bg="#FBFCFC"
            border="0.5px solid #E4E4E7"
            rounded="4px"
            align="center"
            justify="space-between"
          >
            <HStack>
              <Image src={PersonIcon.src} alt={'Everyone'} />
              <Text fontSize="14px">{messageData?.user}</Text>
            </HStack>
          </HStack>
          <Stack
            gap="16px"
            p="10.024px 12px"
            bg="#FBFCFC"
            border="0.5px solid #E4E4E7"
            rounded="4px"
            align="center"
          >
            <HStack align="center" justify="space-between" w="full">
              <Text fontSize="14px" fontWeight={600}>
                {messageData?.title}
              </Text>
              <Text fontSize="10px" color="#606060">
                {messageData?.date}
              </Text>
            </HStack>
            <Stack w="full" align="start">
              <Text
                align={'start'}
                whiteSpace="pre-wrap"
                fontSize="13px"
                lineHeight="19.5px"
                fontWeight={400}
                letterSpacing='0.26px'
              >
                {messageData?.content}
              </Text>
            </Stack>
          </Stack>
        </Stack>
      </DrawerContent>
    </Drawer>
  );
};
