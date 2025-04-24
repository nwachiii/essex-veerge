import React from 'react';
import {LayoutView} from '../../components';
import {
  Center,
  Text,
  Flex,
  Heading,
  Box,
  HStack,
  Spinner,
  Select,
  VStack,
  Badge,
  Image,
  useToast,
  Tag,
  TagCloseButton,
  TagLabel,
  useDisclosure,
} from '@chakra-ui/react';
import {Button, Form, Input} from '../../ui-lib';
import {motion} from 'framer-motion';
import {BackArrowWithText} from '../../components/assets/BackArrow';
import {useRouter} from 'next/router';
import backArrow from '/src/images/icons/back-arrow.png';
import avatar from '/src/images/avatar.svg';
import {useFormik} from 'formik';

import notesIcon from '/src/images/icons/notefornotes.png';
import Empty from '/src/images/empty_state_image.svg';
import {Icon} from '@chakra-ui/react';
import {BsThreeDots} from 'react-icons/bs';
import styled from '@emotion/styled';
import {useQuery, useMutation} from '@tanstack/react-query';
import {themeStyles} from '../../theme';
import {fetchNotes, fetchSuggestions, UpdateNotes} from '../../apis/fetchNotes';
import {Spinner as Loader} from '../../components/common/loaders/AnimatedLoader';
import InputText from './InputText';
import Scrolll from './Scrolll';
import { loggedinUserStatic } from 'apis/requests';

export default function Notes() {
  const user = loggedinUserStatic;
  const toast = useToast();
  console.log(user);
  const container = {
    hidden: {opacity: 0},
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };
  const [isOpen, setIsOpen] = React.useState(true);
  const [expand, setExpand] = React.useState(false);

  const onClose = () => setIsOpen(false);
  const wrapRef = React.useRef(null);
  const coverRef = React.useRef(null);

  const inputRef = React.useRef(null);

  React.useEffect(() => {
    const styl = () =>
      (wrapRef.current.style.height = `${
        coverRef?.current?.offsetHeight - inputRef?.current?.offsetHeight
      }px`);
    wrapRef?.current?.style && styl();
    // console.log(
    //   wrapRef.current.offsetHeight,
    //   inputRef.current.offsetHeight,
    //   coverRef?.current?.offsetHeight
    // );
  });

  React.useEffect(() => {
    // console.log(wrapRef.current.style.height);
    //
    !!wrapRef?.current &&
      !!inputRef?.current &&
      !!coverRef?.current &&
      window.addEventListener(
        'resize',
        () =>
          (wrapRef.current.style.height = `${
            coverRef?.current?.offsetHeight - inputRef?.current?.offsetHeight
          }px`)
      );
  });

  const router = useRouter();
  const {id} = router?.query;
  console.log(id);

  const {data, isError, isLoading, refetch} = useQuery(['notesById', id], () => fetchNotes(id));

  console.log(data);

  const formatText = text => {
    let regex = /@\w+/g;
    const words = text.split(' ');
    const formatted = words.map((word, idx) =>
      regex.test(word) ? (
        <Text key={idx} as="span" color="#4545FE" fontSize="14px" fontWeight="300">
          {word}{' '}
        </Text>
      ) : (
        <Text key={idx} as="span" fontSize="14px" fontWeight="300">
          {word}{' '}
        </Text>
      )
    );
    console.log(formatted);
    return formatted;
  };

  // const mutation = useMutation((data) => UpdateNotes(data), {
  //     onSuccess: (res) => {
  //       console.log(res);
  //       formik.resetForm()
  //       return refetch();
  //     },
  //     onError: (err) => {
  //       console.log(err);
  //       return toast({
  //         title: "An error occured",
  //         status: "error",
  //         duration: 8000,
  //         isClosable: true,
  //         position: "top-right",
  //       });
  //     },
  //   });

  const handleError = () => {
    console.log('err id');
    return toast({
      title: 'Oops an error while fetching notes ',
      status: 'error',
      duration: 6000,
      isClosable: true,
      position: 'top-right',
    });
  };

  return (
    <>
      <Box
        position="relative"
        as={motion.div}
        variants={container}
        initial="hidden"
        animate="show"
        bg="#FAFAFA"
      >
        <div>
          <LayoutView />

          <VStack
            w="full"
            // pt="70px"
            position="fixed"
            // bg="red"
            px="78px"
            // h="calc(100vh-142px)"
            h="100vh"
            justify="end"
            bottom="0px"
            pt="142px"
            // mt="-62vh"
            // mt="calc(-100vh + 142px)"
            // w="100%"
            // bottom="0px"
            // h="full"
            // minH="75vh"
            spacing="none"
            // position="relative"
            // zIndex="123456754321345675432"
          >
            <HStack
              zIndex={10000}
              position="fixed"
              top="calc(142px + 20px)"
              left="78px"
              spacing="none"
              onClick={() => router.back(-1)}
            >
              <Image
                style={{cursor: 'pointer'}}
                mr="21px"
                height="50px"
                w="50px"
                src={backArrow.src}
                alt="back_arrow"
              />
              <Heading
                color="#191919"
                // {...themeStyles.textStyles.h3}
                fontSize="20px"
                fontWeight="500"
              >
                Notes
              </Heading>
            </HStack>
            {/* <Heading
              as="h1"
              textAlign="start"
              w="full"
              fontSize="32px"
              color="#191919"
              fontWeight={500}
            >
              Notes
            </Heading> */}

            <VStack w="full" h="75vh">
              {/* {isOpen && !data?.data?.data?.length && (
                <Tag
                  w="full"
                  // mt="80px"
                  px="35px"
                  bg="#EDF7FB"
                  py="26px"
                  borderRadius="8px"
                >
                  <TagLabel w="full">
                    <HStack w="full" justify="center" spacing="15px">
                      <Image src={notesIcon.src} alt="notes icon" />
                      <Text
                        maxW="1073px"
                        fontSize="18px"
                        textTransform="lowercase"
                        fontWeight="400"
                        color="#191919"
                      >
                        You can add multiple notes or simple jottings. This will
                        make it easy for anyone to pickup where a sales was left
                        off, if need be.
                      </Text>
                    </HStack>
                  </TagLabel>
                  <TagCloseButton onClick={onClose} />
                </Tag>
              )} */}
              <HStack
                h="87px"
                zIndex="-1"
                w="full"
                position="fixed"
                bottom="0px"
                bg="#ffffff"
              ></HStack>
              <VStack
                h="100%"
                mt="10px"
                w="full"
                borderTopRightRadius="16px"
                borderTopLeftRadius="16px"
                bg="#FFFFFF"
              >
                <HStack
                  marginBottom="20px"
                  w="full"
                  h="73px"
                  p="23px"
                  py="12px"
                  borderBottom="solid 1px whitesmoke"
                  justify="space-between"
                >
                  {data?.data?.customer ? (
                    <HStack spacing="16px">
                      <Image
                        alt=""
                        bg="whitesmoke"
                        borderRadius="full"
                        h="48px"
                        w="48px"
                        objectFit="cover"
                        src={
                          data?.data?.customer?.img ??
                          data?.data?.data[0]?.user?.avatar ??
                          avatar.src
                        }
                      />

                      <Heading fontSize="20px" fontWeight={600} as="h1">
                        {data?.data?.customer
                          ? data?.data?.customer?.name
                          : `${data?.data?.data[0]?.user?.first_name ?? 'N/A'} ${
                              data?.data?.data[0]?.user?.last_name ?? 'N/A'
                            }`}
                      </Heading>
                    </HStack>
                  ) : (
                    ''
                  )}
                  {/* <Icon as={BsThreeDots} /> */}
                </HStack>
                <VStack
                  h="full"
                  spacing="none"
                  ref={coverRef}
                  // justify="space-between"
                  justify="end"
                  // bg="blue"
                  position="relative"
                  w="full"
                  px="16px"
                  // py="30px"
                  pb="10px"
                >
                  {isLoading ? (
                    <Loader />
                  ) : isError ? (
                    handleError()
                  ) : !data?.data?.data?.length ? (
                    <VStack
                      // ref={wrapRef}
                      position="absolute"
                      top="0px"
                      h="full"
                      pt="67px"
                      w="full"
                    >
                      <Image
                        // w="67px"
                        // minH="151px"
                        alt="empty notes image"
                        src={Empty.src}
                      />
                      <Text textAlign="center" as="span" w="250px" fontSize="16px" fontWeight="400">
                        Jot here, so anyone can pick things up from where you left it
                      </Text>
                    </VStack>
                  ) : (
                    <NoteWrapper ref={wrapRef}>
                      {data.data.data.map((item, idx) => (
                        <VStack
                          bg="#F5F5F5"
                          borderRadius="16px"
                          key={idx}
                          mb="10px"
                          py="13px"
                          px="31px"
                          spacing="none"
                        >
                          <HStack pl="9px" w="full" justify="space-between">
                            <HStack w="full" spacing="6px">
                              <Image
                                boxSize="32px"
                                borderRadius="full"
                                alt="notes profile picture"
                                src={item.created_by.avatar ?? avatar.src}
                              />
                              <Heading fontSize="16px" fontWeight={500} as="h2">
                                {item.created_by.first_name} {item.created_by.last_name}
                              </Heading>
                            </HStack>

                            {/* <Icon as={BsThreeDots} /> */}
                          </HStack>
                          <VStack mt="7px" pl="9px" w="full">
                            <Text fontSize="14px" fontWeight="300" w="full" color="#191919">
                              {expand
                                ? formatText(item.note)
                                : item.note.length <= 300
                                  ? formatText(item.note)
                                  : `${formatText(item.note).slice(0, 300)}...`}

                              <Text
                                fontSize="14px"
                                fontWeight="300"
                                as="span"
                                onClick={() => setExpand(!expand)}
                              >
                                {item.note.length <= 300
                                  ? ''
                                  : expand
                                    ? ' ...See less'
                                    : 'See more'}
                              </Text>
                            </Text>
                            <Text
                              mt="10px"
                              pr="9px"
                              alignSelf="flex-end"
                              as="span"
                              fontSize="12px"
                              fontWeight={400}
                              color="#606060"
                            >
                              {item.created_at}
                            </Text>
                          </VStack>
                        </VStack>
                      ))}
                    </NoteWrapper>
                  )}
                  <InputText Ref={inputRef} id={id} toast={toast} refetch={refetch} />
                </VStack>
                {/* <Scrolll /> */}
              </VStack>
            </VStack>
          </VStack>
          {/* </LayoutView> */}
        </div>
      </Box>
    </>
  );
}

const NoteWrapper = styled.div`
  width: 100%;
  overflow: auto;
  // margin-bottom: 10px;
  padding-left: 8px;
  padding-right: 8px;

  position: absolute;
  top: 0px;

  &::-webkit-scrollbar {
    width: 5px;
    border-radius: 16px;
  }
  &::-webkit-scrollbar-track {
    border-radius: 16px;

    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 16px;

    // background-color: darkgrey;
    background-color: #191919;
    // outline: 1px solid slategrey;
  }
`;
