import React, {useState} from 'react';
import notesEmptyIcon from '/src/images/icons/notesemtyState.svg';
import avatar from '/src/images/avatar.svg';
import {changeDateFormat} from '../../utils/formatDate';
import {TbNotes} from 'react-icons/tb';
import PlayIcon from '/src/images/icons/play-attachment.svg';

import {
  Box,
  Button,
  Center,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerOverlay,
  Flex,
  HStack,
  Heading,
  Image,
  Input,
  Link,
  Spinner,
  Stack,
  Text,
  VStack,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import InputText from '../../pages/notes/InputText';
import {fetchNotes, fetchSuggestions} from '../../apis/fetchNotes';
import {useRouter} from 'next/router';
import {useQuery} from '@tanstack/react-query';
import NotesIcon from '../assets/NotesIcon';
import {NotesEmptyState} from './NotesEmptyState';
import {EmptyState} from '../common/Table';

import AutoResizeInput from './AutoResizeInput';
import { loggedinUserStatic } from 'apis/requests';

const reStructureSuggestions = suggestions => {
  return suggestions.map(item => {
    const obj = {};
    Object.entries(item).forEach(([key, value]) => {
      if (key !== 'img' && key !== 'role') {
        obj.name = key;
        return (obj.email = value);
      }
      obj[key] = value;
    });
    return obj;
  });
};

const drawermarginTop = '65.12px';
export const NotesDrawer = ({modalDisclosure, usersId, awaitUserId}) => {
  const [expand, setExpand] = useState(false);
  const [started, setStarted] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const router = useRouter();

  const handleInputChange = text => {
    setInputValue(text);
  };

  const handleSubmit = () => {
    if (inputValue.trim()) {
      // TODO: Implement submit logic here
      setInputValue('');
    }
  };
  const userId = router?.query?.userId || usersId;

  const toast = useToast();

  const {data, isError, error, isLoading, refetch} = useQuery(
    ['notesById', userId],
    () => fetchNotes(userId),
    {
      enabled: awaitUserId,
    }
  );
  const suggestionsQuery = useQuery(['suggestions'], () => fetchSuggestions(userId), {
    enabled: modalDisclosure.isOpen,
  });

  const suggestions = reStructureSuggestions(
    suggestionsQuery.data?.data?.data?.response?.users ?? []
  );

  const user = loggedinUserStatic;

  const customScrollStyle = {
    overflow: 'auto',
    'scrollbar-width': 'none',

    '&::-webkit-scrollbar': {
      display: 'none',
    },
  };

  const renderTextSpan = (word, idx, isHighlighted = false) => (
    <Text
      key={idx}
      as="span"
      color={isHighlighted ? '#4545FE' : '#191919'}
      fontSize="14px"
      fontWeight="300"
    >
      {word}{' '}
    </Text>
  );

  const findTaggedUser = (firstName, lastName) => {
    const name = `${firstName} ${lastName}`;
    return suggestions?.find(item => item.name === name);
  };

  const formatText = text => {
    const words = text.split(' ');

    return words.map((word, idx) => {
      // Handle current word starting with @
      if (word.startsWith('@')) {
        const firstName = word.replace('@', '');
        const lastName = words[idx + 1];
        const taggedUser = findTaggedUser(firstName, lastName);
        return renderTextSpan(word, idx, !!taggedUser);
      }

      // Handle word that is part of a previous @mention
      const prevWord = words[idx - 1] ?? '';
      if (prevWord.startsWith('@')) {
        const firstName = prevWord.replace('@', '');
        const lastName = word;
        const taggedUser = findTaggedUser(firstName, lastName);
        return renderTextSpan(word, idx, !!taggedUser);
      }

      // Regular word
      return renderTextSpan(word, idx);
    });
  };

  const sx = {
    'overflow-x': 'scroll',

    ' &::-webkit-scrollbar ': {
      width: '4px',
      'border-radius': '16px',
      display: 'none',
    },
    '&::-webkit-scrollbar-track': {
      'border-radius': '16px',

      '-webkit-box-shadow': 'inset 0 0 6px rgba(0, 0, 0, 0.3)',
    },
    '&::-webkit-scrollbar-thumb ': {
      'border-radius': '16px',

      'background-color': 'darkgrey',
      // outline: 1px solid slategrey;
    },
  };

  const noted =
    'Donec consectetur vulputate nisi in  @Dan Lukves ibulum. convallis convallis commodo. Duis  dui ac ex convallis commodo. Duis consequat tempor libero, egeassa semper pretium. Sed aassa sem convallis commodo. Duis consequat tempor libero, egeassa semper pretium. Sed aassa sem Duis consequat tempor libero, egetemper pretium. Sed ac dui ac ex convallis commodo. Duis consequat tempor libero, egeassa semper pretium. Sed aassa sem  commodo. Duis consequat tempor libero, egeassa semper pretium. Sed aassa sem Duis consequat tempor libero, egetemper pretium. Sed ac dui ac ex convallis commodo. Duis consequat tempor libero, egeassa semper pretium. Sed aassa sem  Nam vel arcu quis massa semper pretium. Sed ac dui ac ex convallis commodo. Duis consequat tempor libero, egetemper pretium. Sed ac dui ac ex  @Dan Lukves @Dan Lukves consequat tempor libero, egeassa semper pretium. Sed aassa sem Duis consequat tempor libero, egetemper pretium. Sed ac sghffjk ';
  return (
    <>
      <Drawer isOpen={modalDisclosure.isOpen} onClose={modalDisclosure.onClose} borderRadius="16px">
        <DrawerOverlay bg="rgba(0,0,0,0.1)" />

        <DrawerContent
          position="relative"
          zIndex={100}
          mt={drawermarginTop}
          maxW="450px"
          bg="#fff"
          p="0px"
        >
          {isLoading ? (
            <VStack w="full" justify="center" align="center" h="20vh">
              <Spinner />
            </VStack>
          ) : isError ? (
            <VStack w="full" justify="center" align="center" h="40vh">
              <Text fontSize="14px" fontWeight="400" textAlign="center" w="300px" color="#000">
                {`${
                  error?.response?.status === 500
                    ? "Apologies for the inconvenience. We're working on it. Please try again later."
                    : error?.response?.status === 401
                      ? 'Authentication Timeout: For security reasons, your session has timed out. Please log in again to continue.'
                      : (error?.response?.data?.message ??
                        error?.response?.message ??
                        error?.message ??
                        'Something went wrong')
                }`}
              </Text>
            </VStack>
          ) : (!data?.data?.data?.length || data?.data?.data?.length === 0) && !started ? (
            <NotesEmptyState start={() => setStarted(true)} />
          ) : (
            <>
              <HStack
                boxShadow="4px 4px 8px 0px rgba(123, 157, 157, 0.05), -4px -4px 8px 0px rgba(123, 157, 157, 0.15)"
                mb="20px"
                py="12px"
                px="29px"
                justify="space-between"
                align="center"
                position="relative"
              >
                {data?.data?.customer ? (
                  <HStack w="full" spacing="10.87px">
                    {/* <Image
                  boxSize="38px"
                  borderRadius="full"
                  alt="notes profile picture"
                  src={
                    data?.data?.customer?.img ??
                    data?.data?.data[0]?.user?.avatar ??
                    avatar.src
                  }
                /> */}
                    <Stack spacing="2px">
                      {/* <Heading fontSize="14px" fontWeight={600} as="h1">
                    {data?.data?.customer
                      ? data?.data?.customer?.name
                      : `${data?.data?.data[0]?.user?.first_name ?? "-"} ${
                          data?.data?.data[0]?.user?.last_name ?? "-"
                        }`}
                  </Heading> */}
                      <Heading fontSize="18.9px" fontWeight="700">
                        Internal Note
                      </Heading>
                      {/* <Text wordBreak="break-word" color="#606060" fontSize="10px" fontWeight={400}>
                    Ensure a smooth handover by leaving concise notes for your team. This allows
                    seamless continuation of work and remains invisible to the customer.
                  </Text> */}
                      {/* <Text wordBreak="break-word" color="#606060" fontSize="10px" fontWeight={400}>
                    Leave notes for your team to keep work going smoothly without the user knowing.{' '}
                  </Text> */}
                    </Stack>
                  </HStack>
                ) : (
                  ''
                )}
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
                      //   background: "rgb(145, 145, 145,0.1)",

                      width: '30px',
                      height: '30px',
                    }}
                  >
                    <DrawerCloseButton
                      right="0px"
                      left="0px"
                      //   _hover={{
                      //     color: "#d0d0d0",
                      //   }}
                      my="auto"
                      color="#000"
                      top="0"
                      bottom="0"
                    />
                  </VStack>
                </HStack>
              </HStack>

              <DrawerBody sx={customScrollStyle} mb="5px" py="0px" px="29px">
                {!data?.data?.data?.length ? (
                  <Center minH={`50vh`}>
                    <EmptyState
                      title="Nothing Found"
                      description="You’ve not sent any message yet"
                      icon={<></>}
                    />
                  </Center>
                ) : (
                  // <VStack w="full" justify="center" spacing="14px" align="center" h="70vh">
                  //   <Image src={notesEmptyIcon.src} alt="empty icon" />
                  // </VStack>
                  // <VStack w="full" justify="center" align="center" h="70vh">
                  //   {/* <Image src={empty_icon.src} alt="empty icon" /> */}
                  //   {/* <Image src={notesEmptyIcon.src} alt="empty icon" /> */}
                  //   <Text fontSize={'20px'} mt="10px" color="#191919" fontWeight={'700'}>
                  //     Nothing Found
                  //   </Text>
                  //   <Text
                  //     w="full"
                  //     textAlign="center"
                  //     fontSize="13px"
                  //     fontWeight="400"
                  //     mt="-5px"
                  //     mx="auto"
                  //     color="#191919"
                  //   >
                  //     It appears that no notes have been left yet.
                  //   </Text>
                  // </VStack>
                  <>
                    <Stack w="full" spacing="10px">
                      {data.data.data.map((item, idx) => {
                        return (
                          <VStack
                            bg="#F5F5F5"
                            borderRadius="16px"
                            key={idx}
                            mb="10px"
                            py="10px"
                            pb="18px"
                            px="13px"
                            pr="10px"
                            spacing="none"
                          >
                            <HStack pr="5px" w="full" justify="space-between">
                              <HStack w="full" spacing="6px">
                                <Image
                                  boxSize="32px"
                                  borderRadius="full"
                                  alt="notes profile picture"
                                  src={item?.created_by?.avatar ?? avatar.src}
                                />
                                <Heading fontSize="13.067px" fontWeight={500} as="h2">
                                  {item?.created_by?.first_name ?? ''}{' '}
                                  {item?.created_by?.last_name ?? ''}
                                </Heading>
                              </HStack>

                              {/* <Icon as={BsThreeDots} /> */}
                              <Text
                                fontSize="10px"
                                fontWeight={400}
                                color="#606060"
                                minW="fit-content"
                              >
                                {item?.created_at}
                              </Text>
                            </HStack>
                            <VStack mt="13.23px" pl="9px" w="full">
                              <Text fontSize="14px" fontWeight="300" w="full" color="#191919">
                                {expand === idx
                                  ? formatText(item.note)
                                  : formatText(item.note).length <= 30
                                    ? formatText(item.note)
                                    : formatText(item.note).slice(
                                        0,
                                        -(formatText(item.note).length - 30)
                                      )}

                                <Text
                                  fontSize="14px"
                                  fontWeight="500"
                                  as="span"
                                  color="#4545FE"
                                  cursor="pointer"
                                  onClick={() =>
                                    formatText(item.note).length <= 30
                                      ? null
                                      : setExpand(expand === idx ? null : idx)
                                  }
                                >
                                  {formatText(item.note).length <= 30
                                    ? ''
                                    : expand === idx
                                      ? ' ...See less'
                                      : '...See more'}
                                </Text>
                              </Text>
                            </VStack>
                            {
                              // item.files_list && Array.isArray(item.files_list)
                              item.files_list?.length || item?.files ? (
                                <Flex overFlowX="auto" gap="10px" sx={customScrollStyle} w="full">
                                  {item?.files_list?.length ? (
                                    item?.files_list.map((item, idx) => (
                                      <Link
                                        href={item.files}
                                        key={idx}
                                        minW="fit-content"
                                        alignSelf="start"
                                        mt="5px"
                                        isExternal
                                        cursor="pointer"
                                      >
                                        <Box
                                          display="flex"
                                          gap={1}
                                          bg="rgba(69, 69, 254, 0.10)"
                                          p="8px"
                                          borderRadius="8.02px"
                                          alignItems="center"
                                        >
                                          <Text color="#4545FE" fontSize="9.62px" fontWeight="500">
                                            view attachment
                                          </Text>
                                          <Image
                                            w="15px"
                                            h="15px"
                                            src={PlayIcon.src}
                                            alt="attach icon"
                                          />
                                        </Box>
                                      </Link>
                                    ))
                                  ) : item.files ? (
                                    <Link
                                      href={item.files}
                                      minW="fit-content"
                                      alignSelf="start"
                                      mt="5px"
                                      isExternal
                                      cursor="pointer"
                                    >
                                      <Box
                                        display="flex"
                                        gap={1}
                                        bg="rgba(69, 69, 254, 0.10)"
                                        p="8px"
                                        borderRadius="8.02px"
                                        alignItems="center"
                                      >
                                        <Text color="#4545FE" fontSize="9.62px" fontWeight="500">
                                          view attachment
                                        </Text>
                                        <Image
                                          w="15px"
                                          h="15px"
                                          src={PlayIcon.src}
                                          alt="attach icon"
                                        />
                                      </Box>
                                    </Link>
                                  ) : null}
                                </Flex>
                              ) : null
                            }
                          </VStack>
                        );
                      })}
                    </Stack>
                    <Box id="endOfListRef" />
                  </>
                )}
              </DrawerBody>
              <DrawerFooter pt="0px">
                <AutoResizeInput
                  userId={userId}
                  refetch={refetch}
                  toast={toast}
                  customScrollStyle={customScrollStyle}
                  value={inputValue}
                  onChange={handleInputChange}
                  onSubmit={handleSubmit}
                  drawermarginTop={drawermarginTop}
                  suggestions={suggestions}
                />
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default NotesDrawer;
