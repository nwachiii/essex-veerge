import React, {useState} from 'react';
import {
  Box,
  HStack,
  VStack,
  Flex,
  Text,
  Image,
  Button as ChakraButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  AbsoluteCenter,
  Stack,
  SimpleGrid,
  StackDivider,
  Heading,
  Center,
  DrawerBody,
  DrawerCloseButton,
  Tooltip,
  useDisclosure,
  Spinner,
} from '@chakra-ui/react';
import emptyIcon from '/src/images/icons/emptyIcon.png';

import {Container3} from '@/components/common/containers';
import Bank from '/src/images/icons/bank.png';
import BankIcon from '/src/images/icons/bankIconSettings.svg';
import addicon from '/src/images/icons/crossforsettings.svg';
import addIcon from '/src/images/icons/addIcon.svg';
import updateIcon from '/src/images/icons/updateIcon.svg';

import {RemoveModal} from './recipient/removeModal';
import {AddModal} from './recipient/addModal';
import {useQuery} from '@tanstack/react-query';
import {fetchAccountList} from '/src/apis/settings';
import {AnimatedLoader} from '@/components/index';
import {HiOutlinePencilSquare} from 'react-icons/hi2';
import {HiOutlinePencil} from 'react-icons/hi';
import {IoMdAdd} from 'react-icons/io';

export const AccountSettingsSection = ({menu_toggle}) => {
  const [isRemoveModalOpen, setRemoveModalOpen] = useState(false);
  const [shouldUpdate, setShouldUpdate] = useState(false);

  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const addModalDisclosure = useDisclosure();

  const onRemoveModalClose = () => {
    setRemoveModalOpen(false);
  };
  const onOpenRemoveModal = () => {
    setRemoveModalOpen(true);
  };

  const onAddModalClose = () => {
    // setAddModalOpen(false);
    addModalDisclosure.onClose();
  };
  const onOpenAddModal = () => {
    // setAddModalOpen(true);
    addModalDisclosure.onOpen();
  };

  const {data, isError, isLoading, refetch} = useQuery(['fetchAccountList'], () =>
    fetchAccountList()
  );

  let bankData = data?.data?.data || [];
  // let bankData = [
  //   {
  //     account_name: 'Mainstone International',
  //     account_number: '0011223344',
  //     bank_name: 'Zenith Bank',
  //     id: '123456',
  //   },
  //   {
  //     account_name: 'Mainstone International',
  //     account_number: '0011223344',
  //     bank_name: 'Zenith Bank',
  //     id: '123456',
  //   },
  //   {
  //     account_name: 'Mainstone International',
  //     account_number: '0011223344',
  //     bank_name: 'Zenith Bank',
  //     id: '123456',
  //   },
  // ];

  return (
    <>
      <HStack
        boxShadow="4px 4px 8px 0px rgba(123, 157, 157, 0.05), -4px -4px 8px 0px rgba(123, 157, 157, 0.15)"
        mb="10px"
        py="12px"
        px="29px"
        justify="space-between"
        align="center"
        position="relative"
        width="full"
        bg="#F5F5F5"
      >
        <Flex width="full" justifyContent="space-between" alignItems="center">
          {menu_toggle}
          <Box display="flex" flexDirection="row" alignItems="center" gap="16px">
            <Tooltip label={bankData.length > 0 ? 'Update Bank Accounts' : 'Add Bank Account'}>
              <Center
                border="0.68px solid #191919"
                p="10px"
                borderRadius="8.12px"
                _hover={{
                  background: 'rgba(25, 25, 25, 0.10)',
                }}
                cursor="pointer"
                h="max-content"
              >
                {bankData.length > 0 ? (
                  <UpdateBankDetailsOptions
                    setShouldUpdate={setShouldUpdate}
                    modalDisclosureToAddBank={onOpenAddModal}
                  >
                    <HiOutlinePencil />
                  </UpdateBankDetailsOptions>
                ) : (
                  <Box as="span" aspectRatio={'1 / 1'} onClick={() => onOpenAddModal()}>
                    <IoMdAdd />
                  </Box>
                )}
              </Center>
            </Tooltip>
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
      <DrawerBody>
        {isLoading ? (
          <Center h="80vh" position="relative">
            {/* <AnimatedLoader /> */}
            <Spinner />
          </Center>
        ) : isError ? (
          <Center h="80vh" position="relative">
            <Text>Something went wrong</Text>
          </Center>
        ) : (
          <>
            <VStack
              bg="#fff"
              mt="16px"
              borderRadius="16px"
              padding="24px 15px"
              position="relative"
              w="full"
              divider={<StackDivider my="16px" borderColor={'#E4E4E4'} />}
              border="1px solid #EAECF0"
            >
              {bankData.length > 0 ? (
                bankData.map(({account_name, account_number, bank_name, id}, index) => (
                  <HStack key={index} justify="space-between" w="full" alignItems={'flex-start'}>
                    <HStack spacing="38px">
                      <Image src={BankIcon.src} alt="bank icon" />
                      <VStack width={'100%'} spacing="10px" alignItems={'flex-start'} flex="1">
                        <Text
                          textTransform="capitalize"
                          fontWeight="600"
                          fontSize="16px"
                          color="#606060"
                        >
                          {account_name}
                        </Text>
                        <Text
                          textTransform="capitalize"
                          fontWeight="400"
                          fontSize="14px"
                          color="#606060"
                        >
                          {bank_name} ({account_number})
                        </Text>
                      </VStack>
                    </HStack>

                    {shouldUpdate ? (
                      <>
                        {/* <ChakraButton
                          onClick={onOpenRemoveModal}
                          h="32px"
                          px="24px"
                          bg="transparent"
                          borderRadius="7.5789px"
                          _hover={{opacity: 1}}
                          display="flex"
                          alignItems="center"
                          border="1px solid #FF6A6A"
                          fontSize="11.368px"
                          fontWeight="400"
                          color="#FF6A6A"
                        >
                          Remove
                        </ChakraButton> */}
                        <Flex align={'flex-start'} cursor={'pointer'} onClick={onOpenRemoveModal}>
                          <TrashIcon />
                        </Flex>
                        <RemoveModal
                          isModalOpen={isRemoveModalOpen}
                          onModalClose={onRemoveModalClose}
                          accountId={id}
                          refetch={refetch}
                        />
                      </>
                    ) : null}
                  </HStack>
                ))
              ) : (
                <Stack h="495px" w="center">
                  <AbsoluteCenter>
                    <VStack spacing="none">
                      <Image alt="empty table icon" src={emptyIcon.src} mb="16px" />
                      <Heading fontSize="20px" mb="12px" fontWeight="700" color="#3D3D3D">
                        Nothing Found
                      </Heading>
                      <Text
                        w="full"
                        textAlign="center"
                        fontSize="14px"
                        fontWeight="400"
                        color={'#919191'}
                        mx="auto"
                      >
                        No bank account added yet
                      </Text>
                    </VStack>
                    <RemoveModal
                      isModalOpen={isRemoveModalOpen}
                      onModalClose={onRemoveModalClose}
                      refetch={refetch}
                    />
                  </AbsoluteCenter>
                </Stack>
              )}
            </VStack>

            <AddModal
              isModalOpen={addModalDisclosure.isOpen}
              onModalClose={onAddModalClose}
              refetch={refetch}
              recipients={bankData}
            />
          </>
        )}
      </DrawerBody>
      ;
    </>
  );
};

const UpdateBankDetailsOptions = ({modalDisclosureToAddBank, setShouldUpdate, children}) => {
  return (
    <Menu autoSelect={false}>
      {children ? (
        <MenuButton aspectRatio={'1 / 1'} h={'max-content'} lineHeight={'1'} w="100%">
          {children}
        </MenuButton>
      ) : (
        <MenuButton
          as={ChakraButton}
          h="32px"
          _hover={{opacity: 1}}
          _active={{opacity: 1}}
          px="24px"
          leftIcon={<Image src={updateIcon.src} alt="update Icon" />}
          borderRadius="7.5789px"
          border="1px solid #4545FE"
          bg="transparent"
          fontSize="11.368px"
          fontWeight="400"
          color="#4545FE"
        >
          Update
        </MenuButton>
      )}
      <MenuList m="0px" minW="fit-content" p="26px" borderRadius="16">
        <MenuItem
          onClick={modalDisclosureToAddBank}
          p="0px"
          _hover={{bg: 'transparent'}}
          color="#3D3D3D"
          fontSize="16px"
          fontWeight="400"
        >
          Add
        </MenuItem>
        <MenuItem
          onClick={() => setShouldUpdate(true)}
          mt="24px"
          p="0px"
          _hover={{bg: 'transparent'}}
          color="#3D3D3D"
          fontSize="16px"
          fontWeight="400"
        >
          Remove
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

const TrashIcon = () => {
  return (
    <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M17.1008 5.2214C15.7945 5.09158 14.4882 4.99422 13.1738 4.92119V4.91308L12.9953 3.85831C12.8736 3.11186 12.6951 1.99219 10.7965 1.99219H8.67078C6.78032 1.99219 6.60182 3.06318 6.472 3.8502L6.30161 4.88874C5.54705 4.93742 4.79249 4.9861 4.03792 5.05912L2.38275 5.2214C2.04198 5.25385 1.79857 5.55405 1.83103 5.88671C1.86348 6.21937 2.15557 6.46278 2.49634 6.43032L4.15151 6.26805C8.40303 5.84614 12.687 6.00841 16.9872 6.43844C17.0116 6.43844 17.0278 6.43844 17.0521 6.43844C17.3604 6.43844 17.6282 6.20314 17.6606 5.88671C17.685 5.55405 17.4416 5.25385 17.1008 5.2214Z"
        fill="#FF6A6A"
      />
      <path
        d="M15.6035 7.58206C15.4088 7.37922 15.141 7.26562 14.8652 7.26562H4.60958C4.33372 7.26562 4.05786 7.37922 3.87125 7.58206C3.68463 7.7849 3.57916 8.06076 3.59538 8.34473L4.09843 16.6693C4.18768 17.9025 4.30127 19.4441 7.13291 19.4441H12.3418C15.1735 19.4441 15.2871 17.9107 15.3763 16.6693L15.8794 8.35285C15.8956 8.06076 15.7901 7.7849 15.6035 7.58206ZM11.0842 15.3792H8.3824C8.04975 15.3792 7.77388 15.1034 7.77388 14.7707C7.77388 14.438 8.04975 14.1622 8.3824 14.1622H11.0842C11.4169 14.1622 11.6927 14.438 11.6927 14.7707C11.6927 15.1034 11.4169 15.3792 11.0842 15.3792ZM11.7658 12.1338H7.70898C7.37632 12.1338 7.10046 11.8579 7.10046 11.5253C7.10046 11.1926 7.37632 10.9167 7.70898 10.9167H11.7658C12.0984 10.9167 12.3743 11.1926 12.3743 11.5253C12.3743 11.8579 12.0984 12.1338 11.7658 12.1338Z"
        fill="#FF6A6A"
      />
    </svg>
  );
};
