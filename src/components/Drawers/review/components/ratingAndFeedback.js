import {
  Box,
  Button,
  HStack,
  Heading,
  Image,
  Input,
  Spinner,
  Stack,
  Text,
  Textarea,
  VStack,
  useToast,
} from '@chakra-ui/react';
import React from 'react';

import send from '/src/images/icons/sendIconForInspectionOnListings.svg';
import {useMutation} from '@tanstack/react-query';
import {useRouter} from 'next/router';
import {changeDateFormat} from 'utils/formatDate';
import {Ratings} from '@/components/common/Rating';
import {respondToInspectionFeedBack} from 'apis/listings';
import {toastForError} from 'utils/toastForErrors';
import {respondToFeedback} from 'apis/veerge_menu';

export const RatingAndFeedBacks = ({info, screen, handleScreen, setFeedbackDetailId, refetch}) => {
  const [expand, setExpand] = React.useState(false);
  const [expandForResponse, setExpandForResponse] = React.useState(false);
  const [response, setResponse] = React.useState('');
  const toast = useToast();

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
      backgroundColor: '#cbcbcb',
      // outline: '1px solid slategrey', // You can include this line if needed
    },
  };

  const mutation = useMutation(formData => respondToFeedback(formData, info?.id), {
    onSuccess: async res => {
      await refetch();
    },
    onError: res => {
      toastForError(err, true, toast);
    },
  });

  const handleInput = e => {
    setResponse(e.target.value);
  };

  const isValid = !!response.trim();

  const handleSubmit = e => {
    e.preventDefault();
    if (!isValid) {
      return;
    }

    return mutation.mutate({response});
  };

  const navigateToReviewDetails = () => {
    setFeedbackDetailId(info?.id);
    return handleScreen('reviewDetails');
  };

  return (
    <Stack
      spacing="20px"
      w="full"
      padding="15px 11px 13px 16px"
      borderRadius="12px"
      border="1px solid #E4E4E4"
    >
      <HStack w="full" align="start" justify="space-between">
        <Heading fontSize="18px" fontWeight="400" color="#000" as="h2">
          Rating & Feedback
        </Heading>
        <Text fontSize="12.888px" fontWeight="400" color="#191919">
          {info?.created_at ? changeDateFormat(info?.created_at, 'add_time') : null}
        </Text>
      </HStack>
      <Stack spacing="none">
        <Ratings rating={info?.star_rating} starStyle={{h: '24px', w: '24px'}} />
        <Box mt="20px" mb="8px" py="12px" px="16px" bg="#F5F5F5" borderRadius="8px">
          <Heading
            as="h3"
            mt="8px"
            mb="12.07px"
            fontSize="13.002px"
            textTransform="capitalize"
            fontWeight="500"
            color="#191919"
          >
            Feedback
          </Heading>
          <VStack
            maxH="151px"
            minH="fit-content"
            overflow="auto"
            sx={customScrollbarStyles}
            pr="7px"
            spacing="none"
            align="start"
          >
            <VStack align="start" w="full">
              <Text fontSize="14px" fontWeight="300" w="full" color="#191919">
                {expand
                  ? info?.feedback
                  : info?.feedback?.length <= 200
                  ? info?.feedback
                  : info?.feedback?.slice(0, -(info?.feedback?.length - 200))}

                {info?.response?.length ? (
                  <Text
                    fontSize="14px"
                    fontWeight="500"
                    as="span"
                    color="#4545FE"
                    cursor="pointer"
                    onClick={() => (info?.feedback?.length <= 200 ? null : setExpand(!expand))}
                  >
                    {info?.feedback?.length <= 200 ? '' : expand ? ' ...See less' : ' ...See more'}
                  </Text>
                ) : null}
              </Text>
            </VStack>
          </VStack>
          {screen === 'reviewDetails' ? (
            info?.response ? null : (
              <HStack mt="20px" as="form" onSubmit={handleSubmit} spacing="8px" w="full">
                <Input
                  w="full"
                  onChange={handleInput}
                  border="0.3px solid #919191"
                  _placeholder={{color: '#606060'}}
                  placeholder="Type in your message..."
                  fontSize="12px"
                  fontWeight="300"
                />
                <Button
                  _hover={{
                    background: 'transparent',
                  }}
                  _active={{
                    bg: 'transparent',
                  }}
                  _focus={{
                    bg: 'transparent',
                  }}
                  type="submit"
                  isDisabled={!isValid || mutation.isLoading}
                  p="0px"
                >
                  {mutation.isLoading ? (
                    <Spinner colorScheme="whitesmoke" />
                  ) : (
                    <Image cursor="pointer" src={send.src} alt="sendicon" w="40.9px" h="39px" />
                  )}
                </Button>
              </HStack>
            )
          ) : info?.response ? (
            <HStack mt="10.2px" justify="end" w="full">
              <Button
                px="6.21px"
                borderRadius="6.656px"
                bg="#191919"
                fontSize="10px"
                //   onClick={() => setShouldRespond(info?.response)}
                onClick={navigateToReviewDetails}
                color="#fff"
                _hover={{
                  opacity: '1',
                }}
                fontWeight="300"
                h="26px"
              >
                View Response
              </Button>
            </HStack>
          ) : (
            <HStack mt="10.2px" justify="end" w="full">
              <Button
                px="6.21px"
                borderRadius="6.656px"
                bg="#191919"
                fontSize="10px"
                onClick={navigateToReviewDetails}
                color="#fff"
                _hover={{
                  opacity: '1',
                }}
                fontWeight="300"
                h="26px"
              >
                Respond to Feedback
              </Button>
            </HStack>
          )}
        </Box>
        {screen === 'reviewDetails' && info?.response ? (
          <Box py="12px" px="16px" bg="#F5F5F5" borderRadius="8px">
            <HStack justify="space-between" w="full" align="start">
              <Heading
                as="h3"
                mb="12.07px"
                fontSize="13.002px"
                textTransform="capitalize"
                fontWeight="500"
                color="#191919"
              >
                Response
              </Heading>
              <Text fontSize="10px" fontWeight="400" color="#606060">
                {info?.response_time ? changeDateFormat(info?.response_time, 'add_time') : null}
              </Text>
            </HStack>
            <HStack spacing="8px" mb="12.07px">
              <Image
                src={info?.respondent?.avatar}
                alt="profile image"
                fontSize="8px"
                bg="#F5F5F5"
                boxSize="30px"
                objectFit="cover"
                borderRadius="full"
              />
              <Text fontSize="14px" fontWeight="400" textTransform="capitalize" color="#191919">
                {info?.respondent?.full_name ?? '-'}
              </Text>
            </HStack>
            <VStack
              maxH="151px"
              minH="fit-content"
              overflow="auto"
              sx={customScrollbarStyles}
              pr="7px"
              spacing="none"
              align="start"
            >
              <VStack align="start" w="full">
                <Text fontSize="14px" fontWeight="300" w="full" color="#191919">
                  {expandForResponse
                    ? info?.response
                    : info?.response?.length <= 200
                    ? info?.response
                    : info?.response?.slice(0, -(info?.response?.length - 200))}

                  {info?.response?.length ? (
                    <Text
                      fontSize="14px"
                      fontWeight="500"
                      as="span"
                      color="#4545FE"
                      cursor="pointer"
                      onClick={() =>
                        info?.response?.length <= 200
                          ? null
                          : setExpandForResponse(!expandForResponse)
                      }
                    >
                      {info?.response?.length <= 200
                        ? ''
                        : expandForResponse
                        ? ' ...See less'
                        : '...See more'}
                    </Text>
                  ) : null}
                </Text>
              </VStack>
            </VStack>
          </Box>
        ) : null}
      </Stack>
    </Stack>
  );
};

export default RatingAndFeedBacks;
