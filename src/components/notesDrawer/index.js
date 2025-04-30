import React, {useState} from 'react';
import notesEmptyIcon from '/src/images/icons/notesemtyState.svg';
import avatar from '/src/images/avatar.svg';
import {changeDateFormat} from '../../utils/formatDate';
import {TbNotes} from 'react-icons/tb';
import PlayIcon from '/src/images/icons/play-attachment.svg';

import {
  Avatar,
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
import {loggedinUserStatic} from 'apis/requests';
import {notesStaticData} from './notesStaticData';
import {suggestionsQueryStaticData} from './suggestionsQueryStaticData';

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
  const [expand, setExpand] = useState(true);
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

  const {data, isError, error, isLoading, refetch} = [];

  const suggestions = reStructureSuggestions(suggestionsQueryStaticData?.response?.users ?? []);

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
              <HStack w="full" spacing="10.87px">
                <Stack spacing="2px">
                  <Heading fontSize="18.9px" fontWeight="700">
                    Internal Note
                  </Heading>
                </Stack>
              </HStack>

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
                  <DrawerCloseButton
                    right="0px"
                    left="0px"
                    my="auto"
                    color="#000"
                    top="0"
                    bottom="0"
                  />
                </VStack>
              </HStack>
            </HStack>

            <DrawerBody sx={customScrollStyle} mb="5px" py="0px" px="29px">
              <>
                <Stack w="full" spacing="10px">
                  {notesStaticData.map((item, idx) => {
                    return (
                      <VStack key={idx} spacing="none">
                        <Flex gap={3}>
                          <Avatar
                            boxSize="40px"
                            // p={2}
                            borderRadius="full"
                            alt="notes profile picture"
                            name={`${item?.created_by?.first_name} ${item?.created_by?.last_name}`}
                            src={item?.created_by?.avatar ?? avatar.src}
                          />
                          <Stack>
                            <HStack pr="5px" w="full" justify="space-between" align={'flex-end'}>
                              <HStack w="full" spacing="6px">
                                <Heading fontSize="13.067px" fontWeight={500} as="h2">
                                  {item?.created_by?.first_name ?? ''}{' '}
                                  {item?.created_by?.last_name ?? ''}
                                </Heading>
                              </HStack>

            
                              <Text
                                fontSize="10px"
                                fontWeight={400}
                                color="#606060"
                                minW="fit-content"
                              >
                                {item?.created_at}
                              </Text>
                            </HStack>
                            <VStack
                              
                              pl="9px"
                              w="full"
                              bg="#F5F5F5"
                              mb="10px"
                              pt={'5px'}
                              pb="18px"
                              px="13px"
                              pr="10px"
                              borderRadius="16px"
                            >
                              <Text fontSize="14px" fontWeight="300" w="full" color="#191919">
                                {expand === idx
                                  ? formatText(item.note)
                                  : formatText(item.note).length <= 30
                                    ? formatText(item.note)
                                    : formatText(item.note).slice(
                                        0,
                                        -(formatText(item.note).length - 30)
                                      )}

                                {/* <Text
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
                                </Text> */}
                              </Text>
                            </VStack>
                          </Stack>
                        </Flex>
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
                                    <Image w="15px" h="15px" src={PlayIcon.src} alt="attach icon" />
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
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default NotesDrawer;
