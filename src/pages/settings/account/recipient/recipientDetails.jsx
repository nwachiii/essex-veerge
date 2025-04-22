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
} from '@chakra-ui/react';
import emptyIcon from '/src/images/icons/emptyIcon.png';

import {Container3} from '../../../../components/common/containers';
import Bank from '../../../../images/icons/bank.png';
import BankIcon from '/src/images/icons/bankIconSettings.svg';
import addicon from '/src/images/icons/crossforsettings.svg';
import addIcon from '/src/images/icons/addIcon.svg';
import updateIcon from '/src/images/icons/updateIcon.svg';

import {RemoveModal} from './removeModal';
import {AddModal} from './addModal';
import {useQuery} from '@tanstack/react-query';
import {fetchAccountList} from '../../../../apis/settings';
import {AnimatedLoader} from '../../../../components';

export const RecipientDetails = () => {
  const [isRemoveModalOpen, setRemoveModalOpen] = useState(false);
  const [shouldUpdate, setShouldUpdate] = useState(false);

  const [isAddModalOpen, setAddModalOpen] = useState(false);

  const onRemoveModalClose = () => {
    setRemoveModalOpen(false);
  };
  const onOpenRemoveModal = () => {
    setRemoveModalOpen(true);
  };

  const onAddModalClose = () => {
    setAddModalOpen(false);
  };
  const onOpenAddModal = () => {
    setAddModalOpen(true);
  };

  const {data, isError, isLoading, refetch} = useQuery(['fetchAccountList'], () =>
    fetchAccountList()
  );

  let bankData = data?.data?.data || [];

  return isLoading ? (
    <VStack position="relative" mt="10vh">
      <AnimatedLoader />
    </VStack>
  ) : isError ? null : (
    <>
      <HStack w="full" mt="10px" justify="space-between">
        <Heading fontSize="16px" fontWeight="500" color="#191919">
          Bank Account
        </Heading>
        {bankData.length > 0 ? (
          <UpdateBankDetailsOptions
            setShouldUpdate={setShouldUpdate}
            modalDisclosureToAddBank={onOpenAddModal}
          />
        ) : (
          <ChakraButton
            h="32px"
            px="24px"
            bg="transparent"
            leftIcon={<Image src={addIcon.src} alt="add icon" />}
            borderRadius="7.5789px"
            onClick={() => onOpenAddModal()}
            _hover={{opacity: 1}}
            display="flex"
            alignItems="center"
            border="1px solid #4545FE"
            fontSize="11.368px"
            fontWeight="400"
            color="#4545FE"
          >
            Add
          </ChakraButton>
        )}
      </HStack>

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
            <HStack key={index} justify="space-between" w="full">
              <HStack spacing="38px">
                <Image src={BankIcon.src} alt="bank icon" />
                <VStack width={'100%'} spacing="10px" alignItems={'start'}>
                  <Text textTransform="capitalize" fontWeight="600" fontSize="16px" color="#606060">
                    {account_name}
                  </Text>
                  <Text textTransform="capitalize" fontWeight="400" fontSize="14px" color="#606060">
                    {bank_name} ({account_number})
                  </Text>
                </VStack>
              </HStack>

              {shouldUpdate ? (
                <>
                  <ChakraButton
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
                  </ChakraButton>
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
        isModalOpen={isAddModalOpen}
        onModalClose={onAddModalClose}
        refetch={refetch}
        recipients={bankData}
      />
    </>
  );
};
export default RecipientDetails;

const UpdateBankDetailsOptions = ({modalDisclosureToAddBank, setShouldUpdate}) => {
  return (
    <Menu autoSelect={false}>
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
