import {
  Menu,
  MenuButton,
  Button as ChakraButton,
  MenuList,
  MenuItem,
  Tooltip,
  HStack,
  Text,
  Center,
  Image,
  Stack,
  StackDivider,
  Box,
  Flex,
  DrawerBody,
  AbsoluteCenter,
  Spinner,
  useToast,
} from '@chakra-ui/react';
import React, {useState} from 'react';
import {HiOutlinePencil} from 'react-icons/hi2';
import backIcon from '/src/images/icons/backArrowForDrawer.svg';
import {CourtHouseIcon} from '@/components/assets/courthouse';
import Trash from '/src/images/icons/big_red_trash_icon.svg';
import {useQuery} from '@tanstack/react-query';
import {fetchBankAccounts} from 'apis/settings';
import {toastForError} from 'utils/toastForErrors';

const ListOfAccounts = ({handleScreen, setAccountId, mainScreenNav}) => {
  const [shouldRemove, setShouldRemove] = useState(false);

  const handleHeaderClicks = () => {
    if (shouldRemove) return setShouldRemove(false);
    return mainScreenNav('options');
  };

  const {data, isLoading, isError, error} = useQuery(['bank accounts'], fetchBankAccounts);

  const deleteAccount = id => () => {
    setAccountId(id);
    handleScreen('confirm account removal');
  };

  return (
    <>
      <HStack
        boxShadow="4px 4px 8px 0px rgba(123, 157, 157, 0.05), -4px -4px 8px 0px rgba(123, 157, 157, 0.15)"
        mb="24px"
        py="12px"
        px="29px"
        h="49.699px"
        justify="space-between"
        align="center"
        position="relative"
        width="full"
        bg="#F5F5F5"
      >
        <HStack spacing="8px">
          <Image
            cursor="pointer"
            boxSize="24px"
            onClick={handleHeaderClicks}
            src={backIcon.src}
            alt="back icon"
          />
          <Text
            transition="ease-in-out 0.3s"
            textTransform={'capitalize'}
            fontSize="16px"
            fontWeight={600}
            color="#191919"
          >
            {shouldRemove ? 'Remove' : ''} Bank Account
          </Text>
        </HStack>
        {shouldRemove ? null : (
          <UpdateBankDetailsOptions
            mainScreenNav={mainScreenNav}
            handleScreen={handleScreen}
            setShouldRemove={setShouldRemove}
          />
        )}
      </HStack>
      <DrawerBody p="0px" px="20px">
        {isLoading ? (
          <AbsoluteCenter>
            <Spinner />
          </AbsoluteCenter>
        ) : isError ? (
          <AbsoluteCenter>
            <Text textAlign="center" color="#919191" fontSize="14px" fontWeight="400">
              {`${
                error?.response?.status === 500 || error?.response?.status === 400
                  ? "Apologies for the inconvenience. We're working on it. Please try again later."
                  : error?.response?.status === 401
                    ? 'Authentication Timeout: For security reasons, your session has timed out. Please log in again to continue.'
                    : (error?.response?.data?.message ??
                      error?.response?.message ??
                      error?.message ??
                      'Something went wrong')
              }`}
            </Text>
          </AbsoluteCenter>
        ) : data?.data?.account.length ? (
          <Stack
            divider={<StackDivider border="none" h="1px" bg="#EAECF0" />}
            border="1px solid #EAECf0"
            spacing="16px"
            borderRadius="16px"
            py="24px"
          >
            {data?.data?.account.map((item, idx) => (
              <Flex key={idx} w="full" justify="space-between" pl="24px" pr="16.53px">
                <HStack justify="center" bg="#4545FE1A" boxSize="40px" borderRadius="full">
                  <CourtHouseIcon baseColor="#4545FE" boxSize="24px" />
                </HStack>
                <Stack spacing="10px" color="#606060">
                  <Text fontSize="16px" fontWeight="600">
                    {item?.account_name}
                  </Text>
                  <Text fontSize="14px" fontWeight="400">
                    {item?.bank_name}
                  </Text>
                </Stack>
                <Box
                  role="button"
                  onClick={deleteAccount(item?.id)}
                  opacity={shouldRemove ? 1 : 0}
                  transition="ease-in-out 0.3s "
                >
                  <Image alt="image" src={Trash.src} boxSize="19.47px" />
                </Box>
              </Flex>
            ))}
          </Stack>
        ) : (
          <AbsoluteCenter>
            <Stack align="center" spacing="8px">
              <CourtHouseIcon boxSize="32px" />
              <Text fontSize="16px" color="#3d3d3d" fontWeight="700">
                Nothing Found
              </Text>
              <Text w="296px" textAlign="center" color="#919191" fontSize="14px" fontWeight="400">
                No bank account details has been added yet
              </Text>
            </Stack>
          </AbsoluteCenter>
        )}
      </DrawerBody>
    </>
  );
};

export default ListOfAccounts;

const UpdateBankDetailsOptions = ({handleScreen, setShouldRemove}) => {
  return (
    <Menu placement="bottom-start" autoSelect={false}>
      <Tooltip
        fontSize="11px"
        px="5px"
        py="5px"
        borderRadius="3px"
        w="fit-content"
        bg="#191919"
        label={true ? 'Update' : 'Add'}
      >
        <MenuButton
          as={ChakraButton}
          _hover={{
            bg: 'rgba(0,0,0,0.08)',
            opacity: 1,
          }}
          _active={{opacity: 1}}
          borderRadius="8.12px"
          boxSize="36px"
          border="0.5px solid #3d3d3d"
          bg="transparent"
          display="grid"
          placeItems="center"
        >
          <HiOutlinePencil />
        </MenuButton>
      </Tooltip>

      <MenuList
        boxShadow="0px 2px 4px -2px #1018280F, 0px 4px 8px -2px #1018281A"
        m="0px"
        minW="fit-content"
        overflow="hidden"
        _hover={{
          boxShadow: '0px 2px 4px -2px #1018280F, 0px 4px 8px -2px #1018281A',
        }}
        p="0px"
        borderRadius="16px"
      >
        <MenuItem
          onClick={() => handleScreen('add bank accounts')}
          p="20px 24px"
          _hover={{bg: 'transparent'}}
          color="#3D3D3D"
          fontSize="16px"
          fontWeight="400"
        >
          Add
        </MenuItem>
        <MenuItem
          onClick={() => setShouldRemove(true)}
          p="20px 24px"
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
