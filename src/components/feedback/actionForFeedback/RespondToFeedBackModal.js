import React, {useState} from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  HStack,
  Stack,
  Image,
  Text,
  Box,
  Button,
  IconButton,
  useToast,
  Drawer,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerBody,
  VStack,
  Heading,
  DrawerContent,
} from '@chakra-ui/react';
import sendIcon from '/src/images/icons/sendIconForFeedbackPage.svg';
import send from '/src/images/icons/sendIconForInspectionOnListings.svg';

import {changeDateFormat} from '../../../utils/formatDate';
import {truncateLongText} from '../../../utils';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {respondToFeedback} from '../../../apis/veerge_menu';
import {toastForError} from '../../../utils/toastForErrors';
import FeedBackImageCarousel from './feedBackImageCarousel';

const RespondToFeedBackModal = ({modalDisclosure, allowedToBeviewed, feedbackInfo}) => {
  const [readMoreForFeedBack, setReadmoreForFeedBack] = useState('more');
  const [readMoreForResponse, setReadmoreForResponse] = useState('more');
  const [responseText, setResponse] = useState('');

  const toast = useToast();
  const queryClient = useQueryClient();

  const feedbackMutation = useMutation(formData => respondToFeedback(formData, feedbackInfo.id), {
    onSuccess: async res => {
      queryClient.invalidateQueries(['feedback_']);
      await queryClient.refetchQueries(['feedback_']);
      toast({
        description: 'Thanks for your feedback',
        status: 'success',
        duration: 3000,
        position: 'top-right',
      });
      setResponse('');
    },
    onError: err => {
      toastForError(err, true, toast);
    },
  });

  const isValid = !!responseText.trim();

  const handleResponse = e => {
    e.preventDefault();

    const responseObj = {
      response: responseText,
    };
    return feedbackMutation.mutate(responseObj);
  };

  const customScrollbarStyles = {
    '&::-webkit-scrollbar': {
      width: '4px',
      borderRadius: '16px',
    },
    '&::-webkit-scrollbar-track': {
      borderRadius: '16px',
      WebkitBoxShadow: 'inset 0 0 6px rgba(255, 255, 255, 0.1)',
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '16px',
      backgroundColor: '#CBCBCB',
      // outline: "1px solid slategrey", // You can include this line if needed
    },
  };

  return (
    <Drawer
      autoFocus={false}
      isOpen={modalDisclosure.isOpen}
      borderRadius="16px"
      onClose={modalDisclosure.onClose}
    >
      <DrawerOverlay bg="rgba(0,0,0,0.1)" />
      <DrawerContent
        position="relative"
        zIndex={100}
        mt="65.12px"
        // mt="112.12px"
        minW="450px"
        bg="#fff"
        p="0px"
      >
        <HStack
          boxShadow="0px 3.20641px 6.41283px 0px rgba(0, 0, 0, 0.02)"
          py="12px"
          bg="#F5F5F5"
          mb="20px"
          pl="27.3px"
          pr="19.9px"
          justify="space-between"
          align="center"
          position="relative"
        >
          <HStack spacing="8px">
            <Text fontSize="20px" fontWeight={600} color="#191919">
              Feedback
            </Text>
          </HStack>

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
            <DrawerCloseButton right="0px" left="0px" my="auto" color="#000" top="0" bottom="0" />
          </VStack>
        </HStack>

        <DrawerBody sx={customScrollbarStyles} mb="10px" py="0px" mr="3px" px="24px">
          <Stack
            w="full"
            p="13px 16px"
            borderRadius="12px"
            border="1px solid #E4E4E4"
            spacing="8px"
          >
            <VStack bg="#F5F5F5" borderRadius="8px" py="12px" px="16px" spacing="none">
              <Heading as="h2" fontSize="13px" alignSelf="start" mb="12px" fontWeight="500">
                Feedback
              </Heading>

              <VStack w="full" spacing="none">
                <Text fontSize="14px" fontWeight="300" w="full" color="#191919">
                  {
                    truncateLongText(
                      feedbackInfo.feedback,
                      readMoreForFeedBack === 'more' ? 200 : feedbackInfo.feedback?.length + 1
                    )?.truncatedText
                  }{' '}
                  {feedbackInfo.feedback?.length <= 200 ? (
                    ''
                  ) : (
                    <Text
                      fontSize="14px"
                      fontWeight="500"
                      as="span"
                      color="#4545FE"
                      cursor="pointer"
                      onClick={() =>
                        setReadmoreForFeedBack(readMoreForFeedBack === 'more' ? 'less' : 'more')
                      }
                    >
                      Read {readMoreForFeedBack}
                    </Text>
                  )}
                </Text>
                {feedbackInfo.images?.length ? (
                  <FeedBackImageCarousel imageArray={feedbackInfo.images} />
                ) : null}
              </VStack>
              {!feedbackInfo.respondent.response && !allowedToBeviewed('attachments') ? (
                <HStack as="form" onSubmit={handleResponse} mt="16px" spacing="8.7px" w="full">
                  <Input
                    borderRadius="12px"
                    bg="#F5F5F5"
                    h="47px"
                    w="full"
                    fontSize="12px"
                    fontWeight="400"
                    onChange={e => setResponse(e.target.value)}
                    value={responseText}
                    // onKeyDown={handleKeyDown}
                    isDisabled={feedbackInfo.respondent.response}
                    color="#000"
                    placeholder="Type in your message..."
                    _placeholder={{
                      color: '#606060',
                    }}
                  />
                  <Button
                    w="fit-content"
                    h="fit-content"
                    p="0px"
                    bg="transparent"
                    isLoading={feedbackMutation.isLoading}
                    // onClick={handleSubmit}
                    type="submit"
                    _focus={{opacity: '1', bg: 'transparent'}}
                    _active={{opacity: '1', bg: 'transparent'}}
                    _hover={{
                      bg: 'transparent',
                    }}
                    isDisabled={!isValid || feedbackMutation.isLoading}
                  >
                    <Image h="47px" w="58px" src={send.src} alt="send Icon" />
                  </Button>
                </HStack>
              ) : null}
            </VStack>
            {feedbackInfo.respondent.response ? (
              <VStack bg="#F5F5F5" borderRadius="8px" py="12px" px="16px" spacing="none">
                <HStack justify="space-between" align="start" w="full">
                  <Heading as="h2" fontSize="13px" alignSelf="start" mb="12px" fontWeight="500">
                    Response
                  </Heading>
                  <Text fontSize="10px" fontWeight={400} color="#606060" minW="fit-content">
                    {feedbackInfo.respondent?.time
                      ? changeDateFormat(feedbackInfo.respondent?.time, 'add_time')
                      : ''}
                  </Text>
                </HStack>
                <HStack pr="5px" w="full" justify="space-between">
                  <HStack w="full" spacing="6px">
                    <Image
                      boxSize="32px"
                      borderRadius="full"
                      alt="notes profile picture"
                      src={feedbackInfo.respondent.avatar}
                    />
                    <Heading fontSize="13.067px" fontWeight={500} as="h2">
                      {feedbackInfo.respondent.full_name}
                    </Heading>
                  </HStack>
                </HStack>

                {/* <HStack mb="11px" spacing="8px">
                      <Image
                        alt=""
                        objectFit="cover"
                        borderRadius="full"
                        src={feedbackInfo.respondent.avatar}
                        bg="#0d0d0d"
                        boxSize="32px"
                      />
                      <Text fontSize="16px" fontWeight="500" color="#191919">
                        {feedbackInfo.respondent.full_name}
                      </Text>
                    </HStack> */}
                <VStack mt="12px" w="full">
                  <Text fontSize="14px" fontWeight="300" w="full" color="#191919">
                    {
                      truncateLongText(
                        feedbackInfo.respondent.response,
                        readMoreForResponse === 'more'
                          ? 200
                          : feedbackInfo.respondent.response?.length + 1
                      )?.truncatedText
                    }{' '}
                    {feedbackInfo.respondent.response?.length <= 200 ? (
                      ''
                    ) : (
                      <Text
                        fontSize="14px"
                        fontWeight="500"
                        as="span"
                        color="#4545FE"
                        cursor="pointer"
                        onClick={() =>
                          setReadmoreForResponse(readMoreForResponse === 'more' ? 'less' : 'more')
                        }
                      >
                        Read {readMoreForResponse}
                      </Text>
                    )}
                  </Text>
                </VStack>
              </VStack>
            ) : null}
          </Stack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default RespondToFeedBackModal;
