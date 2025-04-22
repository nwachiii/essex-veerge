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

export const ViewBroadcastContent = ({isOpen, onClose, channel, messageData}) => {
  function getLeftIconForFilter(filterFieldValue) {
    const matchingOption = menuOptions.find(option => option.label === filterFieldValue);

    if (matchingOption) {
      return matchingOption.leftIcon;
    }
  }

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
        <Stack p={6}>
          <HStack
            p="10.024px 12px"
            bg="#F9FAFB"
            border="0.5px solid #E4E4E4"
            rounded="4px"
            align="center"
            justify="space-between"
          >
            <Flex gap='8px' flexWrap="wrap">
              {messageData?.filter_fields?.length ? (
                Object.keys(messageData?.filter_fields)?.map(field => {
                  return (
                    <HStack key={field} p="8px">
                      <Image src={getLeftIconForFilter(field).src} alt={field} />
                      <Text key={field} fontSize="14px">
                        {field}
                      </Text>
                    </HStack>
                  );
                })
              ) : (
                <HStack p="8px">
                  <Image src={getLeftIconForFilter('Everyone').src} alt={'Everyone'} />
                  <Text fontSize="14px">Everyone</Text>
                </HStack>
              )}
            </Flex>
            <Recipents messageData={messageData} getLeftIconForFilter={getLeftIconForFilter} />
          </HStack>
          <Stack
            gap="16px"
            p="10.024px 12px"
            bg="#F9FAFB"
            border="0.5px solid #E4E4E4"
            rounded="4px"
            align="center"
          >
            <HStack align="center" justify="space-between" w="full">
              <Text fontSize="14px" fontWeight={500}>
                {messageData?.title}
              </Text>
              <Text fontSize="10px" color="#606060">
                {dayMonthYearWithTime(messageData?.created_at)}
              </Text>
            </HStack>
            <Stack w="full" align="start" maxH="70vh" overflowY="auto">
              <Text align={'start'} fontSize="12px" lineHeight="16.836px" fontWeight={400}>
                {messageData?.content}
              </Text>
            </Stack>
          </Stack>
        </Stack>
      </DrawerContent>
    </Drawer>
  );
};

const Recipents = ({messageData, getLeftIconForFilter}) => {
  return (
    <Menu>
      <MenuButton>
        <HStack gap="4px" color="#4545FE">
          <Text whiteSpace="nowrap" fontSize="14px">
            View Recipients
          </Text>
          <MdChevronRight size={20} />
        </HStack>
      </MenuButton>
      <MenuList rounded="5px" fontSize="14px" py={3}>
        <HStack justify="space-between" w="full" borderBottom="1px solid #E4E4E4" px={4} pb={4}>
          <Stack gap="2px">
            <Text fontSize="18px" fontWeight={500}>
              Recipients
            </Text>
            <Text fontWeight={300}>
              {messageData?.recipients} recipient{messageData?.recipients > 1 ? 's' : ''}
            </Text>
          </Stack>
          <CloseIcon fontSize="12px" />
        </HStack>
        <Stack divider={<Divider borderColor="#E4E4E4" />} p={4}>
          {messageData?.filter_fields ? (
            Object.entries(messageData?.filter_fields)?.map(([key, values]) => {
              return (
                <Stack key={key}>
                  <HStack>
                    <Image src={getLeftIconForFilter(key).src} boxSize="23px" alt={key} />
                    <Text color="#4B4B4B" fontSize="17px">
                      {key}
                    </Text>
                  </HStack>
                  <UnorderedList>
                    {values?.map(value => (
                      <ListItem ml={2} key={value} fontWeight={300} color="#606060" fontSize="14px">
                        {value}
                      </ListItem>
                    ))}
                  </UnorderedList>
                </Stack>
              );
            })
          ) : (
            <HStack p="8px">
              <Image src={getLeftIconForFilter('Everyone').src} alt={'Everyone'} />
              <Text fontSize="14px">Everyone</Text>
            </HStack>
          )}
        </Stack>
      </MenuList>
    </Menu>
  );
};
