import React, {useState} from 'react';
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
} from '@chakra-ui/react';
import {Field, Formik} from 'formik';
import {formatAmount} from '../../../utils';
import {fetchAccountList} from '../../../apis/settings';
import {initiateWithdrawal} from '../../../apis/account';
import withdrawIcon from '/src/images/icons/withdraw.png';
import {useMutation, useQuery} from '@tanstack/react-query';
import {Button, Popup} from 'ui-lib/ui-lib.components';
import {ChevronUpIcon, ChevronDownIcon, InfoOutlineIcon} from '@chakra-ui/icons';
import {PageLoader} from '../../../components/PageLayout/PageLoader';
// import {PriceMenu} from '../../listings/create/WholeUnits/WholeUnits.Form';

// const PriceMenu = dynamic(() => import('../../listings/create/WholeUnits/WholeUnits.Form'), {
// 	ssr: false,
// 	loading: () => <PageLoader />,
// });

export const WithdrawalsModal = () => {
  const toast = useToast();
  const {isOpen, onClose, onOpen} = useDisclosure();
  const MENU_DISCLOSURE = useDisclosure();
  const FETCH_ACCOUNT_DETAILS = useQuery(['fetchAccountList'], () => fetchAccountList());
  const [recipient, setRecipient] = useState(null);

  const mutation = useMutation(formData => initiateWithdrawal(formData), {
    onSuccess: res => {
      console.log(res);
      onClose();
      toast({
        title: `Withdrawal initiated successfully, it may take up to 24 hours for complete verification`,
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
      setRecipient(null);
    },
    onError: err => {
      console.log(err);
      toast({
        title: `${
          err?.response?.data?.message ??
          err?.response?.statusText ??
          err.message ??
          err ??
          'Request failed, try again later'
        }`,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    },
  });

  let bankData = FETCH_ACCOUNT_DETAILS?.data?.data?.data || [];

  const handleChangeRecipient = idx => {
    setRecipient(bankData[idx]);
    // CHANGE_RECIPIENT_MODAL.onClose();
  };

  // console.log('bankData', bankData, recipient);

  return (
    <>
      <Button
        border="1px solid #4545FE"
        py={0}
        h="42px"
        mt={0}
        w="120px"
        variant="secondary"
        onClick={onOpen}
        fontSize="14px"
        fontWeight="500"
      >
        <Flex w="full" align="center" gap="5px" justify="space-around">
          <Image alt="" src={withdrawIcon.src} className="w-4 mr-2 h-4" /> Withdraw
        </Flex>
      </Button>

      <Popup
        minW="570px"
        h="fit-content"
        minH="340px"
        pt="21px"
        px="31px"
        mt="20vh"
        isOpen={isOpen}
        onClose={onClose}
      >
        <Text
          color="#191919"
          fontFamily="Euclid Circular B"
          fontSize="24px"
          fontStyle="normal"
          fontWeight="600"
          lineHeight="normal"
        >
          Withdrawal
        </Text>

        <Popup.Body>
          <Formik
            initialValues={{
              amount: '',
              description: '',
            }}
            onSubmit={values => {
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
                mutation.mutate(result);
              }
              // console.log(result);
            }}
          >
            {({handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
              <VStack width="100%" pb={'10px'} pl={1}>
                <SimpleGrid w="full" spacing="20px" columns={1} mt="8px">
                  <div>
                    <label
                      htmlFor={`amount`}
                      style={{
                        fontWeight: '400',
                        fontSize: '14px',
                      }}
                    >
                      Amount
                    </label>

                    <InputGroup
                      mt="8px"
                      align="center"
                      border="1px solid #E4E4E4"
                      borderRadius={'10px'}
                    >
                      {/* <PriceMenu disableMenu /> */}
                      <Field
                        style={{
                          paddingLeft: '.9em',
                          marginTop: '0',
                          fontSize: '18px',
                          fontWeight: '500',
                          borderRadius: '8px',
                          border: '0.5px solid #E4E4E4',
                        }}
                        type="text"
                        placeholder="Enter amount..."
                        className="formik__field"
                        name={`amount`}
                        value={
                          formatAmount(values.amount) == 'NaN' ? '' : formatAmount(values.amount)
                        }
                      />
                    </InputGroup>
                  </div>
                  <div>
                    <label
                      htmlFor={`description`}
                      style={{
                        fontWeight: '400',
                        fontSize: '14px',
                      }}
                    >
                      Description
                    </label>

                    <InputGroup
                      mt="8px"
                      align="center"
                      border="1px solid #E4E4E4"
                      borderRadius={'10px'}
                    >
                      <Field
                        style={{
                          paddingLeft: '.9em',
                          marginTop: '0',
                          fontSize: '14px',
                          fontWeight: '400',
                          borderRadius: '8px',
                          border: '0.5px solid #E4E4E4',
                        }}
                        type="text"
                        placeholder="Enter description..."
                        className="formik__field"
                        name={`description`}
                        value={values.description}
                        rows={5}
                      />
                    </InputGroup>
                  </div>
                </SimpleGrid>
                <Stack mt="20px" pb="2px" w="full" justify={'space-between'}>
                  <Text w="full" color="#191919" fontWeight="400" fontSize="14px" textAlign="left">
                    Recipient
                  </Text>
                  <Menu
                    isOpen={MENU_DISCLOSURE.isOpen}
                    onClose={MENU_DISCLOSURE.onClose}
                    closeOnSelect={true}
                  >
                    <MenuButton
                      h="50px"
                      w="full"
                      px={4}
                      borderRadius="8px"
                      border="1px solid #E4E4E4"
                      textAlign="left"
                      transition="all 0.2s"
                      _hover={{bg: ''}}
                      _expanded={{bg: ''}}
                      _focus={{boxShadow: ''}}
                      onClick={MENU_DISCLOSURE.onOpen}
                      rightIcon={
                        MENU_DISCLOSURE.isOpen ? (
                          <ChevronUpIcon color={'#191919'} fontSize="25px" />
                        ) : (
                          <ChevronDownIcon color={'#191919'} />
                        )
                      }
                    >
                      {recipient ? (
                        <Text>
                          {recipient?.bank_name +
                            ' , ' +
                            recipient?.account_number.slice(0, 7) +
                            '***'}
                        </Text>
                      ) : (
                        <Text color="gray" fontSize={'14px'}>
                          Recipient
                        </Text>
                      )}
                    </MenuButton>

                    <MenuList w="498px" MenuDivider={<MenuDivider color={'#E9E9E9'} />}>
                      {bankData?.map((item, idx) => (
                        <MenuItem
                          cursor={'pointer'}
                          onClick={() => handleChangeRecipient(idx)}
                          key={idx}
                          border="1px solid #EAEAEA"
                        >
                          <Flex
                            w="full"
                            direction="column"
                            alignItems="flex-start"
                            justifyContent="center"
                          >
                            <Text fontWeight="400" fontSize="16px" clor="#606060">
                              {item?.account_name}
                            </Text>
                            <HStack gap="5px">
                              <Text fontWeight="400" fontSize="10px" clor="#606060" mt="10px">
                                {item?.bank_name}
                              </Text>
                              <Text fontWeight="400" fontSize="10px" clor="#606060" mt="10px">
                                {item?.account_number.slice(0, 6)}
                                <sup>****</sup>
                              </Text>
                            </HStack>
                          </Flex>
                        </MenuItem>
                      ))}
                    </MenuList>
                  </Menu>
                </Stack>

                <HStack gap="5px">
                  <InfoOutlineIcon boxSize={'17px'} color="#606060" />
                  <Text
                    color=" #606060"
                    fontFamily="Euclid Circular B"
                    fontSize="14.071px"
                    fontStyle="normal"
                    fontWeight="300"
                    lineHeight="normal"
                  >
                    Standard processing fees will apply. While most withdrawals reflect almost
                    immediately, please note that in certain cases, it may take longer for the
                    withdrawal to be processed.
                  </Text>
                </HStack>

                <Flex
                  mt="20px"
                  w="full"
                  direction="row"
                  alignItems="center"
                  justifyContent="flex-end"
                >
                  <Button
                    type="button"
                    variant="primary"
                    mr="28px"
                    w="202px"
                    h="53px"
                    borderRadius="72px"
                    onClick={onClose}
                    border="1px solid #FF3636"
                    bg="#FFFFFF"
                    color="#FF3636"
                  >
                    Discard
                  </Button>
                  <Button
                    isDisabled={!recipient}
                    type="submit"
                    onClick={handleSubmit}
                    variant="primary"
                    w="202px"
                    borderRadius="72px"
                    h="55px"
                  >
                    {mutation?.isLoading ? <Spinner color="#FFFFFF" /> : 'Proceed'}
                  </Button>
                </Flex>
              </VStack>
            )}
          </Formik>
        </Popup.Body>
      </Popup>
    </>
  );
};

export default WithdrawalsModal;
