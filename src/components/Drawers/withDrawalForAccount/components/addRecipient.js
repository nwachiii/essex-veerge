import {
  Button,
  HStack,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Stack,
  Text,
  Flex,
  Image,
} from '@chakra-ui/react';
import Link from 'next/link';
import downArrow from '/src/images/icons/withDrawDownArrow.svg';
import React from 'react';

export const AddRecipient = ({
  bankData,
  MENU_DISCLOSURE,
  recipient,
  handleChangeRecipient,
  customScrollbarStyles,
}) => {
  return (
    <>
      {bankData?.length ? (
        <Stack mt="20px" pb="2px" w="full" justify={'space-between'}>
          <Text w="full" color="#191919" fontWeight="400" fontSize="9.3px" textAlign="left">
            Recipient
          </Text>
          <Menu
            isOpen={MENU_DISCLOSURE.isOpen}
            onClose={MENU_DISCLOSURE.onClose}
            closeOnSelect={true}
            placement="bottom-start"
          >
            <MenuButton
              as={Button}
              minH="33px"
              h="fit-content"
              pt="11.34px"
              pb="10.01px"
              w="full"
              px={4}
              borderRadius="5.33px"
              border="1px solid #E4E4E4"
              textAlign="left"
              transition="all 0.2s"
              _hover={{bg: 'transparent'}}
              _expanded={{bg: ''}}
              _focus={{boxShadow: '', bg: 'transparent'}}
              _active={{bg: '#fff'}}
              bg="transparent"
              onClick={MENU_DISCLOSURE.onOpen}
              rightIcon={
                <Image
                  src={downArrow.src}
                  alt="down arrow"
                  transition="ease-in-out 0.3s"
                  transform={MENU_DISCLOSURE.isOpen ? 'rotate(180deg)' : 'rotate(0deg)'}
                />
              }
            >
              {recipient ? (
                <Text fontWeight="400" color="#191919" whiteSpace="break-spaces" fontSize={'12px'}>
                  {recipient?.account_name + '/' + recipient?.bank_name}
                </Text>
              ) : (
                <Text fontWeight="400" color="gray" fontSize={'9.3px'}>
                  Recipient
                </Text>
              )}
            </MenuButton>

            <MenuList
              w="full"
              minW="343px"
              maxW="343px"
              as={Stack}
              sx={customScrollbarStyles}
              maxH="137px"
              borderRadius="10.30px"
              py="13px"
              overflowY="scroll"
              spacing="none"
              divider={<MenuDivider borderColor={'#F5F5F5'} my="6px" />}
            >
              {bankData?.map((item, idx) => (
                <>
                  <MenuItem
                    cursor={'pointer'}
                    pr="3px"
                    py="0px"
                    h="fit-content"
                    onClick={() => handleChangeRecipient(idx)}
                    key={idx}
                  >
                    <Flex
                      w="full"
                      direction="column"
                      alignItems="flex-start"
                      justifyContent="center"
                      gap="6.44px"
                    >
                      <Text fontWeight="400" fontSize="12px" color="#000">
                        {item?.account_name}
                      </Text>
                      <HStack gap="5px">
                        <Text fontWeight="400" fontSize="8px" color="#3D3D3D">
                          {item?.bank_name}
                        </Text>
                        <Text fontWeight="400" fontSize="8px" color="#3D3D3D">
                          {item?.account_number.slice(0, 6)}

                          <sup>****</sup>
                        </Text>
                      </HStack>
                    </Flex>
                  </MenuItem>
                </>
              ))}
            </MenuList>
          </Menu>
        </Stack>
      ) : (
        <Text textAlign="start" my="10px" w="full" fontSize="10px" fontWeight="400" color="#FF6A6A">
          No recipient has been added yet.
          <Link href="/settings">
            <Text as="span" borderBottom="solid 1px #4545FE" fontSize="8px" color="#4545FE">
              {' '}
              Add recipient in settings.
            </Text>
          </Link>
        </Text>
      )}
    </>
  );
};

export default AddRecipient;
