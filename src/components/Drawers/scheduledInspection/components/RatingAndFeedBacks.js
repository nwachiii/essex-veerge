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
import {Ratings} from '../../../common/Rating';
import send from '/src/images/icons/sendIconForInspectionOnListings.svg';
import {respondToInspectionFeedBack} from '../../../../apis/listings';
import {useMutation} from '@tanstack/react-query';
import {useRouter} from 'next/router';
import {toastForError} from '../../../../utils/toastForErrors';
import {changeDateFormat} from 'utils/formatDate';

export const RatingAndFeedBacks = ({info, refetch}) => {
  const [expand, setExpand] = React.useState(false);
  const [expandForResponse, setExpandForResponse] = React.useState(false);

  const [response, setResponse] = React.useState('');
  const [shouldRespond, setShouldRespond] = React.useState('');
  const router = useRouter();
  const toast = useToast();
  const routeQueries = router.query;
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

  console.log(info);
  const mutation = useMutation(formData => respondToInspectionFeedBack(info?.id, formData), {
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

  const isValid = response.trim();

  const handleSubmit = e => {
    e.preventDefault();
    if (!isValid) {
      return;
    }

    return mutation.mutate({response});
  };

  return (
    <Stack w="full" gap="8px">
      <Heading fontSize="14px" fontWeight="400" color="#000" as="h2">
        Rating & Feedback
      </Heading>
      <Stack
        gap="15px"
        borderRadius={`4px`}
        border={`0.5px solid`}
        borderColor={` #E4E4E4`}
        background={` #F9FAFB`}
        p={`12px`}
      >
        <Text fontSize="12.888px" fontWeight="400" color="#191919">
          {info?.created_at ? changeDateFormat(info?.created_at, 'add_time') : null}
        </Text>
        <Ratings rating={info?.star_rating} starStyle={{h: '24px', w: '24px'}} />
        <Box
          p="8px"
          borderRadius={`6.413px`}
          border={`0.5px solid`}
          borderColor={`#E5E5E5`}
          background={` #F5F5F5`}
        >
          <Heading
            as="h3"
            mb="8px"
            fontSize="12px"
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
                  ? info?.user_feedback
                  : info?.user_feedback?.length <= 200
                    ? info?.user_feedback
                    : info?.user_feedback?.slice(0, -(info?.user_feedback?.length - 200))}

                <Text
                  fontSize="14px"
                  fontWeight="500"
                  as="span"
                  color="#4545FE"
                  cursor="pointer"
                  onClick={() => (info?.user_feedback?.length <= 200 ? null : setExpand(!expand))}
                >
                  {info?.user_feedback?.length <= 200
                    ? ''
                    : expand
                      ? ' ...See less'
                      : ' ...See more'}
                </Text>
              </Text>
            </VStack>
          </VStack>
          {info?.response ? null : shouldRespond ? (
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
                isDisabled={!isValid}
                p="0px"
              >
                {mutation.isLoading ? (
                  <Spinner colorScheme="whitesmoke" />
                ) : (
                  <Image cursor="pointer" src={send.src} alt="sendicon" w="40.9px" h="39px" />
                )}
              </Button>
            </HStack>
          ) : (
            <HStack mt="10.2px" justify="end" w="full">
              <Button
                w="115.4px"
                borderRadius="6.656px"
                bg="#191919"
                fontSize="10px"
                onClick={() => setShouldRespond(true)}
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
        {info?.response ? (
          <Stack gap={`12px`} py="12px" px="16px" bg="#F5F5F5" borderRadius="8px">
            <Stack justify="space-between" w="full" align="start" gap={`12px`}>
              <Heading
                as="h3"
                fontSize="12px"
                textTransform="capitalize"
                fontWeight="500"
                color="#191919"
              >
                Response
              </Heading>
              <Text fontSize="10px" fontWeight="400" color="#606060">
                {info?.response_time ? changeDateFormat(info?.response_time, 'add_time') : null}
              </Text>
            </Stack>
            <HStack spacing="8px" mb="12.07px">
              <Image
                src={info?.respondent?.avatar}
                alt="profile image"
                bg="#F5F5F5"
                boxSize="30px"
                objectFit="cover"
                borderRadius="full"
              />
              <Stack>
                <Text fontSize="14px" fontWeight="400" textTransform="capitalize" color="#191919">
                  {info?.respondent?.first_name ?? '-'} {info?.respondent?.last_name ?? '-'}
                </Text>
                <Text fontSize="12px" fontWeight="400" color="#4545FE">
                  {info?.respondent?.email ?? ''}
                </Text>
              </Stack>
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
                </Text>
              </VStack>
            </VStack>
          </Stack>
        ) : null}
      </Stack>
    </Stack>
  );
};

export default RatingAndFeedBacks;
