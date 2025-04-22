import React from 'react';
import {
  Image,
  Flex,
  Text,
  useDisclosure,
  SimpleGrid,
  VStack,
  HStack,
  InputGroup,
  useToast,
  Spinner,
  Stack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Button,
  InputLeftAddon,
  InputLeftElement,
  Box,
} from '@chakra-ui/react';
import {Field, Formik} from 'formik';
import nairaIcon from '/src/images/icons/nairaIconForAccount.svg';
import downArrow from '/src/images/icons/withDrawDownArrow.svg';

import {ChevronUpIcon, ChevronDownIcon, InfoOutlineIcon} from '@chakra-ui/icons';
import withdrawIcon from '/src/images/icons/withdraw.png';
import Link from 'next/link';
import AddRecipient from '../components/addRecipient';

export const WithDrawalScreen = ({
  recipient,
  bankData,
  setWithDrawalObj,
  drawerDisclosure,
  handleScreen,
  handleChangeRecipient,
  mutation,
}) => {
  const toast = useToast();

  const MENU_DISCLOSURE = useDisclosure();
  const customScrollbarStyles = {
    '&::-webkit-scrollbar': {
      width: '4px',
      borderRadius: '16px',
    },
    '&::-webkit-scrollbar-track': {
      borderRadius: '16px',
      WebkitBoxShadow: 'inset 0 0 6px transparent',
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '16px',
      backgroundColor: '#e1e1e1',
      //   outline: '1px solid slategrey', // You can include this line if needed
    },
  };
  const handleInput = e => {
    const input = e || '';
    let val = input;

    const cleanedString = val.replace(/[^\d]/g, ''); // Remove non-numeric characters
    val = cleanedString.replace(/^0+(?=\d)/, '');

    const length = val.length;

    if (length <= 2) {
      val = '0.' + val.padStart(2, '0');
    } else {
      const integerPart = val.slice(0, length - 2);
      const decimalPart = val.slice(-2);
      val = integerPart + '.' + decimalPart;
    }

    return val;
  };

  return (
    <Formik
      initialValues={{
        amount: '',
        description: '',
      }}
      onSubmit={(values, prop) => {
        const result = {
          ...values,
          bank_id: Number(recipient?.id),
          amount: Number(values.amount?.replace(/\,/g, '')),
        };
        if (result?.amount == 0) {
          toast({
            title: `Amount is required`,
            status: 'error',
            duration: 5000,
            isClosable: true,
            position: 'top-right',
          });
        }
        if (result?.description == '') {
          toast({
            title: `Description is required`,
            status: 'error',
            duration: 5000,
            isClosable: true,
            position: 'top-right',
          });
        }
        if (result?.amount !== 0 && result?.description !== '') {
          setWithDrawalObj(result);
          handleScreen('OTP');
          prop.resetForm();
        }
      }}
    >
      {({handleChange, handleBlur, setFieldValue, handleSubmit, values, errors, touched}) => (
        <VStack width="100%" pb={'10px'} pl="19px" pr="18px">
          <SimpleGrid w="full" spacing="20px" columns={1} mt="8px">
            <div>
              <label
                htmlFor={`amount`}
                style={{
                  fontWeight: '400',
                  fontSize: '9.3px',
                }}
              >
                Amount
              </label>

              <InputGroup
                align="center"
                border="1px solid #E4E4E4"
                borderRadius={'5.33px'}
                pl="11.34px"
              >
                <Box
                  position="relative"
                  display="flex"
                  alignItems="center"
                  my="auto"
                  h="27.36px"
                  pr="6.69px"
                  borderRight="0.67px solid #E4E4E4 "
                >
                  <Image
                    src={nairaIcon.src}
                    position="relative"
                    my="auto"
                    w="15px"
                    h="14px"
                    alt="naira icon"
                  />
                </Box>

                <Field
                  style={{
                    paddingLeft: '13.3px',
                    marginTop: '0',
                    fontSize: '12px',
                    lineHeight: '15.015px',
                    fontWeight: '500',
                    borderRadius: '5.33px',

                    border: 'none',
                    height: '33px',
                  }}
                  type="text"
                  placeholder="0.00"
                  className="formik__field"
                  name={`amount`}
                  onChange={e => setFieldValue('amount', handleInput(e.target.value))}
                  value={values.amount}
                />
              </InputGroup>
            </div>
            <div>
              <label
                htmlFor={`description`}
                style={{
                  fontWeight: '400',
                  fontSize: '9.3px',
                }}
              >
                Description
              </label>

              <InputGroup
                mt="8px"
                align="center"
                border="1px solid #E4E4E4"
                overflow="hidden"
                borderRadius={'5.33px'}
              >
                <Field
                  style={{
                    paddingLeft: '.9em',
                    marginTop: '0',
                    fontSize: '12px',
                    lineHeight: '15.015px',
                    fontWeight: '400',
                    borderRadius: '5.33px',
                    // border: '0.5px solid #E4E4E4',
                    border: 'none',
                    height: '33px',
                    color: '#191919',
                  }}
                  type="text"
                  placeholder="Description"
                  className="formik__field"
                  name={`description`}
                  value={values.description}
                  rows={5}
                />
              </InputGroup>
            </div>
          </SimpleGrid>
          <AddRecipient
            bankData={bankData}
            MENU_DISCLOSURE={MENU_DISCLOSURE}
            recipient={recipient}
            handleChangeRecipient={handleChangeRecipient}
            customScrollbarStyles={customScrollbarStyles}
          />

          <HStack gap="5px" align="start">
            <InfoOutlineIcon boxSize={'17px'} color="#606060" />
            <Text
              color=" #606060"
              fontFamily="Euclid Circular B"
              fontSize="12px"
              fontStyle="normal"
              fontWeight="300"
              lineHeight="normal"
            >
              Standard processing fees will apply. While most withdrawals reflect almost
              immediately, please note that in certain cases, it may take longer for the withdrawal
              to be processed.
            </Text>
          </HStack>

          <Flex
            mt="20.4vh"
            w="full"
            direction="row"
            alignItems="center"
            // justifyContent="space-between"
            gap="15.75px"
          >
            <Button
              isDisabled={!(values.amount > 0 && values.description.trim() && recipient)}
              borderRadius="72px"
              type="submit"
              onClick={handleSubmit}
              variant="primary"
              bg="#191919"
              color="#fff"
              _hover={{
                opacity: '1',
              }}
              w="full"
              h="43px"
            >
              {'Proceed'}
            </Button>
          </Flex>
        </VStack>
      )}
    </Formik>
  );
};

export default WithDrawalScreen;
