import React from 'react';
import {
  FormControl,
  Stack,
  Box,
  Text,
  Select,
  Image,
  FormLabel,
  Flex,
  Icon,
  Button,
  DrawerBody,
  HStack,
} from '@chakra-ui/react';

import {Input} from 'ui-lib/ui-lib.components';

import {BankList} from '/src/apis/settings';
import downArrow from '/src/images/icons/dropDownBankAccount.svg';
import backIcon from '/src/images/icons/backArrowForDrawer.svg';

import {AiOutlineInfoCircle} from 'react-icons/ai';

const AddABankAccount = ({handleScreen, formik}) => {
  const isInvalid =
    formik.errors.account_bank_name || formik.errors.account_number || formik.errors.account_name;

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
            onClick={() => handleScreen('list of accounts')}
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
            Add Bank Account
          </Text>
        </HStack>
      </HStack>
      <DrawerBody p="0px" px="20px">
        <Flex mb="24px" gap="8px">
          <Icon as={AiOutlineInfoCircle} color="#4B4B4B" transform="rotate(180deg)" />
          <Text fontSize="14px" lineHeight="16px" fontWeight="300" color={'#4B4B4B'}>
            You can only link your own bank account and cannot add a third-party account.
          </Text>
        </Flex>
        <Box as="form" onSubmit={formik.handleSubmit}>
          <Stack spacing="20px">
            <FormControl>
              {/* <FormLabel
                display="inline-block"
                m="0px 0px 4.81px"
                htmlFor="account_bank_name"
                fontSize="12px"
                color="#191919"
                fontWeight="400"
              >
                Bank Name{' '}
                <Text ml="1px" as="sup" color="#FF6A6A">
                  *
                </Text>
              </FormLabel> */}
              {/* <Select
                id="account_bank_name"
                name="account_bank_name"
                required
                onChange={formik.handleChange}
                value={formik.values.account_bank_name}
                onBlur={formik.handleBlur}
                color={'#606060'}
                fontSize="12px"
                border="1px solid #e4e4e4"
                h="45px"
                borderRadius={'6.41px'}
                _focus={{
                  borderColor: '#e4e4e4',
                }}
                icon={<Image src={downArrow.src} alt="down arrow" />}
              >
                <option value="" disabled></option>
                {BankList().map(item => (
                  <option value={item.name} key={item.id}>
                    {item.name}
                  </option>
                ))}
              </Select> */}
              <Input
                required
                type="text"
                id="account_bank_name"
                name="account_bank_name"
                h="45px"
                color={'#606060'}
                fontSize="12px"
                borderRadius="6.4px"
                borderColor="#E4E4E4"
                value={formik.values.account_bank_name}
                onBlur={formik.handleBlur}
                labelStyle={{
                  color: '#191919',
                  fontSize: '12px',
                  fontWeight: '400',
                  paddingLeft: '0px',
                  margin: '0px 0px 4.81px',
                }}
                errorStyle={{
                  fontSize: '10px',
                  mt: '-1px',
                }}
                label={
                  <>
                    Bank Name
                    <Text ml="1px" as="sup" color="#FF6A6A">
                      *
                    </Text>
                  </>
                }
                _placeholder={{
                  color: 'gray.500',
                }}
                onChange={formik.handleChange}
              />
              {/* {formik.errors.account_bank_name && formik.touched.account_bank_name ? (
                <Text color={'red'} fontSize={'10px'} my={'2px'}>
                  {formik.errors.account_bank_name}
                </Text>
              ) : null} */}
            </FormControl>
            <FormControl>
              <Input
                required
                type="text"
                id="account_number"
                name="account_number"
                h="45px"
                color={'#606060'}
                fontSize="12px"
                borderRadius="6.4px"
                borderColor="#E4E4E4"
                value={formik.values.account_number}
                onBlur={formik.handleBlur}
                labelStyle={{
                  color: '#191919',
                  fontSize: '12px',
                  fontWeight: '400',
                  paddingLeft: '0px',
                  margin: '0px 0px 4.81px',
                }}
                errorStyle={{
                  fontSize: '10px',
                  mt: '-1px',
                }}
                label={
                  <>
                    Account Number
                    <Text ml="1px" as="sup" color="#FF6A6A">
                      *
                    </Text>
                  </>
                }
                _placeholder={{
                  color: 'gray.500',
                }}
                onChange={formik.handleChange}
              />
            </FormControl>
            <FormControl>
              <Input
                required
                type="text"
                id="account_name"
                name="account_name"
                h="45px"
                color={'#606060'}
                fontSize="12px"
                borderRadius="6.4px"
                borderColor="#E4E4E4"
                value={formik.values.account_name}
                onBlur={formik.handleBlur}
                labelStyle={{
                  color: '#191919',
                  fontSize: '12px',
                  fontWeight: '400',
                  paddingLeft: '0px',
                  margin: '0px 0px 4.81px',
                }}
                errorStyle={{
                  fontSize: '10px',
                  mt: '-1px',
                }}
                label={
                  <>
                    Account Name
                    <Text ml="1px" as="sup" color="#FF6A6A">
                      *
                    </Text>
                  </>
                }
                _placeholder={{
                  color: 'gray.500',
                }}
                onChange={formik.handleChange}
              />
            </FormControl>
            <Button
              mt="15px"
              color="#FFF"
              // variant={'dark'}
              fontSize="14.907px"
              fontStyle="normal"
              position="fixed"
              bottom="24px"
              maxW="352px"
              fontWeight="400"
              lineHeight="normal"
              type="submit"
              isDisabled={isInvalid}
              bg="#191919"
              h="45px"
              w="full"
              variant="md-filled-radius"
              // borderRadius="9.94px"
            >
              Proceed
            </Button>
          </Stack>
        </Box>
      </DrawerBody>
    </>
  );
};

export default AddABankAccount;
