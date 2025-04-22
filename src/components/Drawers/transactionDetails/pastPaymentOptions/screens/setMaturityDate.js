import {CalenderMenu} from '@/components/common/Calendar/CalenderMenu';
import {
  Avatar,
  Badge,
  Box,
  Button,
  Center,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerOverlay,
  Flex,
  HStack,
  Icon,
  Input,
  Spinner,
  Stack,
  Text,
  Textarea,
  useOutsideClick,
  useToast,
} from '@chakra-ui/react';
import {useMutation, useQuery} from '@tanstack/react-query';
import {addMaturityDate} from 'apis/customers';
import {fetchTeammember} from 'apis/settings';
import {motion} from 'framer-motion';
import React, {useEffect, useRef, useState} from 'react';
import {IoArrowBackSharp} from 'react-icons/io5';
import {RxCross2} from 'react-icons/rx';
import {changeDateFormat} from 'utils/formatDate';
import {toastForError} from 'utils/toastForErrors';

const customScrollStyle = {
  overflow: 'auto',
  'scrollbar-width': 'none',

  '&::-webkit-scrollbar': {
    display: 'none',
  },
};

const SetMaturityDate = ({
  refetch,
  transactionID,
  drawerDisclosure,
  maturity_date,
  maturity_assigned_to,
}) => {
  const [matDate, setMatDate] = useState(maturity_date || '');
  const [isOpen, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [mentions, setMentions] = useState([]);
  const [showMentions, setShowMentions] = useState(false);
  const focusComp = useRef(null);
  const inputRef = useRef(null);
  const toast = useToast();

  const {
    data: roleData,
    isLoading: roleIsloaading,
    isError: roleHasError,
    error: roleError,
  } = useQuery(['fetchAcceptedRoles'], fetchTeammember);

  const roles = roleData?.data?.data ?? [];

  const [filteredRoles, setFilteredRoles] = useState([]);

  const mutation = useMutation(data => addMaturityDate(transactionID, data), {
    onSuccess: async res => {
      refetch();
      toast({
        title: 'Updated successfully',

        status: 'success',
        duration: 8000,
        isClosable: true,
        position: 'top-right',
      });

      drawerDisclosure.onClose();
    },
    onError: err => {
      return toastForError(err, true, toast);
    },
  });

  useEffect(() => {
    const teamMembers = roles?.filter(item => {
      return item?.team_id !== null;
    });
    if (teamMembers.length) {
      const assignedMembers = teamMembers?.filter(item => {
        return maturity_assigned_to.includes(item?.team_id);
      });
      setFilteredRoles(teamMembers);
      setMentions(assignedMembers);
    }
  }, [roleIsloaading]);

  useEffect(() => {
    if (!isOpen) return;
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSelectedDate = setDate => {
    setMatDate(changeDateFormat(setDate, 'yyyy-mm-dd'));
  };

  const tagsArray = () => {
    if (isOpen) return mentions;
    let tagArray = [];
    const text = mentions.length
      ? `${mentions?.[0]?.first_name?.toLowerCase()} ${mentions?.[0]?.last_name?.toLowerCase()}${mentions.length > 1 ? '...' : ''}`
      : '';

    const obj = {
      text,
      avatar: mentions?.[0]?.avatar,
      noOfTags: mentions.length - 1,
    };
    tagArray.push(obj);
    return tagArray;
  };

  const handleSubmit = () => {
    const taggedUsersIds = mentions.map(user => user.team_id);
    const payload = {
      maturity: matDate,
      team_member_ids: taggedUsersIds,
    };
    mutation.mutate(payload);
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 150)}px`;
    }
  }, [inputValue]);

  useOutsideClick({
    ref: focusComp,
    handler: () => {
      const teamMembers = roles?.filter(item => {
        return item?.team_id !== null;
      });
      setShowMentions(false);
      setInputValue('');
      setOpen(false);
      setFilteredRoles(teamMembers);
      focusComp.current.style.border = '1px solid #E4E4E4';
    },
  });

  const isValid = matDate && mentions.length;

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
      >
        <Flex alignItems="center" gap={2}>
          <IoArrowBackSharp fontSize="20px" cursor="pointer" onClick={drawerDisclosure.onClose} />
          <Text fontSize="20px" fontWeight={600} color="#191919">
            Maturity Date
          </Text>
        </Flex>
      </HStack>
      <DrawerBody p="24px 20px">
        <Stack spacing="24px" w="full">
          <Stack spacing="5px" w="full" justifySelf="end" position="relative">
            <Text as="label" fontSize="13px" fontWeight="500" color="#3f3f46">
              Set Maturity Date
            </Text>

            <CalenderMenu
              mainDate={matDate}
              handleSelectedDate={startDate => handleSelectedDate(startDate)}
              imageStyles={{boxSize: '19.473px'}}
              menuBtnStyle={{width: '100%', h: '40.568px'}}
              btnTextStyle={{fontSize: '16px', color: '#71717a', fontWeight: '400'}}
              btnStyle={{width: '100%', h: '40.568px', borderRadius: '6.491px'}}
              datePickerObj={{minDate: new Date(), maxDate: false}}
            />
          </Stack>
          <Stack spacing="5px" w="full" justifySelf="end" position="relative">
            <Text as="label" fontSize="13px" fontWeight="500" color="#3f3f46">
              Assign To:
            </Text>
            <Flex
              py="5px"
              borderRadius="6.491px"
              border={'solid 1px #E4E4E4'}
              h="fit-content"
              minH="40px"
              cursor={isOpen ? 'default' : 'pointer'}
              onClick={() => (isOpen ? null : setOpen(true))}
              ref={focusComp}
              w="full"
              px="10px"
              flexFlow="wrap"
              gap="5px"
              rowGap="8px"
            >
              {mentions.length
                ? tagsArray().map((item, idx) => (
                    <HStack
                      key={idx}
                      alignItems="center"
                      gap="8px"
                      borderRadius="34px"
                      bg="#f4f4f5"
                      border="0.5px solid #e4e4e7"
                      maxH={'28px'}
                      maxW="118px"
                      p="4px 8px"
                    >
                      <Box pos="relative" maxW="24px" display="flex">
                        <Avatar boxSize="18px" src={item.avatar} />
                        {!isOpen && mentions.length > 1 ? (
                          <Box
                            display="flex"
                            bg="#000000"
                            pos="relative"
                            top="0px"
                            border="0.5px solid #f4f4f5"
                            p="1px 3px"
                            minW="18px"
                            minH="18px"
                            zIndex={2}
                            transform="translateX(-50%)"
                            justifyContent="center"
                            alignItems="center"
                            borderRadius="full"
                          >
                            <Text
                              color="#ffffff"
                              textAlign="center"
                              fontSize="8px"
                              fontWeight="400"
                            >
                              +{item?.noOfTags}
                            </Text>
                          </Box>
                        ) : null}
                      </Box>
                      <Text noOfLines={1} fontSize="12px" fontWeight="400">
                        {item?.text ??
                          `${item?.first_name?.toLowerCase()} ${item?.last_name?.toLowerCase()}uiiui iuiui`}
                      </Text>

                      {isOpen ? (
                        <Icon
                          cursor="pointer"
                          boxSize="12px"
                          color="#dc2626"
                          onClick={() =>
                            setMentions(prev => prev.filter(contact => contact.id !== item.id))
                          }
                          as={RxCross2}
                        />
                      ) : null}
                    </HStack>
                  ))
                : null}
              {isOpen ? (
                <Box position="relative" h="fit-content" w="full">
                  <Textarea
                    ref={inputRef}
                    value={inputValue}
                    resize="none"
                    maxH="150px"
                    onChange={e => {
                      const teamMembers = roles?.filter(item => {
                        return item?.team_id !== null;
                      });
                      const newValue = e.target.value;
                      const newfilteredRoles = teamMembers.filter(
                        item =>
                          `${item.first_name.toLowerCase()} ${item.last_name.toLowerCase()}`.includes(
                            newValue.toLowerCase()
                          ) || item.email.toLowerCase().includes(newValue.toLowerCase())
                      );
                      setFilteredRoles(newfilteredRoles);
                      setInputValue(newValue);
                      if (!newfilteredRoles.length) {
                        return setShowMentions(false);
                      }
                      setShowMentions(true);
                    }}
                    bg="transparent"
                    p="0px"
                    w="full"
                    minW="full"
                    border="none"
                    outline="none"
                    _hover={{
                      bg: 'transparent',
                      outline: 'none',
                      border: 'none',
                    }}
                    onFocus={() => {
                      setShowMentions(true);
                      focusComp.current.style.border = '1px solid #a1a1a1';
                    }}
                    _focus={{
                      bg: 'transparent',
                      outline: 'none',
                      border: 'none',
                    }}
                    h="28px"
                    minH="28px"
                  />
                  {showMentions && (
                    <Box
                      position="absolute"
                      top="100%"
                      left="0"
                      zIndex="10"
                      bg="white"
                      boxShadow="md"
                      borderRadius="md"
                      maxH="180px"
                      sx={customScrollStyle}
                      w="full"
                      mt="-2px"
                    >
                      {roleIsloaading ? (
                        <Flex justify="center" w="full" h="100px">
                          <Center>
                            <Spinner />
                          </Center>
                        </Flex>
                      ) : roleHasError ? (
                        <Flex justify="center" w="full" h="100px">
                          <Center>
                            <Text fontSize="12px" fontWeight="400">
                              {`${
                                roleError?.message === 'Network Error'
                                  ? 'Please check your network connection'
                                  : roleError?.response?.status === 500
                                    ? // || roleError?.response?.status === 400
                                      "Apologies for the inconvenience. We're working on it. Please try again later."
                                    : roleError?.response?.status === 401
                                      ? 'Authentication Timeout: For security reasons, your session has timed out. Please log in again to continue.'
                                      : (roleError?.response?.data?.message ??
                                        roleError?.response?.message ??
                                        roleError?.message ??
                                        'Something went wrong')
                              }`}
                            </Text>
                          </Center>
                        </Flex>
                      ) : (
                        filteredRoles.map(contact => (
                          <HStack
                            key={contact?.id}
                            p="2"
                            cursor="pointer"
                            _hover={{bg: '#f4f4f5'}}
                            onClick={e => {
                              if (mentions.find(item => item.id === contact.id)) return;
                              setMentions(prev => {
                                return [...prev, contact];
                              });
                              setInputValue('');
                              inputRef.current.focus();
                            }}
                          >
                            <Avatar size="sm" src={contact.avatar} />
                            <Text fontSize="sm">
                              {' '}
                              {`${contact?.first_name?.toLowerCase()} ${contact?.last_name?.toLowerCase()}`}
                            </Text>
                          </HStack>
                        ))
                      )}
                    </Box>
                  )}
                </Box>
              ) : null}
            </Flex>
          </Stack>
        </Stack>
      </DrawerBody>
      <DrawerFooter borderTop="0.5px solid #e4e4e7" p="20px 30px">
        <Button
          bg="#18181b"
          borderRadius="72px"
          h="46px"
          w="full"
          _hover={{
            opacity: 1,
          }}
          onClick={handleSubmit}
          isDisabled={!isValid}
          isLoading={mutation.isLoading}
          _focusVisible={{
            opacity: 1,
          }}
          fontSize="16px"
          fontWeight="500"
          color="#ffffff"
        >
          Update
        </Button>
      </DrawerFooter>
    </>
  );
};

export default SetMaturityDate;
