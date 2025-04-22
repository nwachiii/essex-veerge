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
} from '@chakra-ui/react';
import {Button, Form, Input} from '../../ui-lib/ui-lib.components';
import {motion} from 'framer-motion';
import {BackArrowWithText} from '../../components/assets/BackArrow';
import {useRouter} from 'next/router';
import backArrow from '/src/images/icons/back-arrow.png';
import avatar from '/src/images/icons/avatar-sm.png';
import send from '/src/images/icons/sendIcon.png';
import female from '/src/images/icons/female-avatar.png';
import {useFormik} from 'formik';

import notesIcon from '/src/images/icons/notefornotes.png';
import {Icon} from '@chakra-ui/react';
import {BsThreeDots} from 'react-icons/bs';
import styled from '@emotion/styled';
import {useQuery, useMutation} from '@tanstack/react-query';
import Empty from '/src/images/bubble-gum-empty-mailbox 1.png';

import {themeStyles} from '../../theme';
import {Spinner as Loader} from '../../components/common/loaders/AnimatedLoader';
import InputText from '../notes/InputText';
import MessageBox from './MessageBox';
import Scrolll from '../notes/Scrolll';
import {fetchMessages, UpdateMessages} from '../../apis/fetchMessage';

export const Messages = () => {
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

  const router = useRouter();
  const {id} = router?.query;
  // console.log(id)

  const {data, isError, isLoading, refetch} = useQuery(['messagesById', id], () =>
    fetchMessages(id)
  );

  // console.log(data)

  const mutation = useMutation(data => UpdateMessages(data), {
    onSuccess: res => {
      console.log(res);
      formik.resetForm();
      return refetch();
    },
    onError: err => {
      console.log(err);
      return toast({
        title: 'An error occured',
        status: 'error',
        duration: 8000,
        isClosable: true,
        position: 'top-right',
      });
    },
  });

  const formik = useFormik({
    initialValues: {message: ''},
    onSubmit: values => {
      values.notes.trim() &&
        mutation.mutate({
          id: user.id,
          ...values,
        });
    },
  });

  const handleError = () => {
    return toast({
      title: 'Oops an error while fetching messages ',
      status: 'error',
      duration: 6000,
      isClosable: true,
      position: 'top-right',
    });
  };

  return (
    <>
      <Box as={motion.div} variants={container} initial="hidden" animate="show" bg="#FAFAFA">
        <div>
          <LayoutView activePage="listings" position="relative" />
          <Scrolll />
          <VStack px="78px" pb="78px" mt="-62vh" w="100%" minH="75vh">
            <HStack
              zIndex={10000}
              position="fixed"
              top="27vh"
              left="78px"
              onClick={() => router.back(-1)}
            >
              <Image
                style={{cursor: 'pointer'}}
                mr={2}
                height="50px"
                w="50px"
                src={backArrow.src}
                alt="back_arrow"
              />
              <Heading {...themeStyles.textStyles.h3}>Back</Heading>
            </HStack>
            <VStack w="full" bg="#FFFFFF" borderRadius="16px">
              <HStack w="full" p="23px" borderBottom="solid 1px whitesmoke" justify="space-between">
                <HStack spacing="16px">
                  <Image
                    alt=""
                    objectFit="cover"
                    borderRadius="100%"
                    boxSize="48px"
                    src={user.avatar}
                  />
                  <Heading fontSize="20px" fontWeight={600} as="h1">
                    {`${user.first_name} ${user.last_name}`}
                  </Heading>
                </HStack>
                <Icon as={BsThreeDots} />
              </HStack>
              <VStack w="full" px="46px" py="30px">
                {isLoading ? (
                  <Loader />
                ) : isError ? (
                  handleError()
                ) : !data.data.data.length ? (
                  <VStack w="full">
                    <Image alt="" w="67px" h="151px" src={Empty.src} />
                    <Text as="span" fontSize="18px" fontWeight="400">
                      No messages yet
                    </Text>
                  </VStack>
                ) : (
                  <MsgWrapper>
                    {data.data.data.map((data, idx) => (
                      <MessageBox key={idx} direction={data.direction} data={data} />
                    ))}
                  </MsgWrapper>
                )}
                <InputText id={user.id} toast={toast} pge="messages" />
              </VStack>
            </VStack>
          </VStack>
        </div>
      </Box>{' '}
    </>
  );
};
export default Messages;

const MsgWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: auto;
  // height: 450px;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;
