import {Box, HStack, Text, Icon, useDisclosure} from '@chakra-ui/react';
import React, {useState} from 'react';

import ActionMenu from './ActionMenu';
import RespondToFeedBackModal from './RespondToFeedBackModal';
import {truncateLongText} from '../../../utils';
import {changeDateFormat} from 'utils/formatDate';
import ClipBoardIcon from '@/components/assets/clipboardIcon';

export const ActionForFeedback = ({row}) => {
  const feedbackInfo = {
    name: row?.user?.full_name,
    time: changeDateFormat(row.created_at, 'add_time'),
    image: row?.user?.avatar,
    feedback: row.feedback,
    id: row.id,
    images: row?.images,
    respondent: {
      ...row.respondent,
      response: row.response,
      time: row.response_time,
    },
    feedback_type: row?.feedback_type,
  };

  const respondDisclosure = useDisclosure();
  const [readMoreForFeedBack, setReadmoreForFeedBack] = useState('more');

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

  const allowedToBeviewed = typeOfArray => {
    const acceptedArray =
      typeOfArray === 'attachments'
        ? ['bug', 'suggestion']
        : ['general', 'purchase', 'inspection', 'suggestion', 'bug'];
    return acceptedArray.includes(feedbackInfo?.feedback_type);
  };

  return (
    <HStack
      spacing="10px"
      h="131px"
      px="11.2px"
      pr="22.75px"
      py="18.5px"
      border="0.7px solid #E4E4E4"
      justify="space-between"
      borderRightRadius="12px"
      borderLeft="none"
    >
      <Box
        position="relative"
        pt="10px"
        pr="10px"
        border=" 0.7px solid #E4E4E4"
        pb="5px"
        borderRadius="8px"
      >
        <HStack
          w="553px"
          h="94px"
          pr="11px"
          pl="14px"
          align="start"
          sx={customScrollbarStyles}
          overflowY="auto"
        >
          <Text
            fontSize="14px"
            maxW="553px"
            whiteSpace="break-spaces"
            textAlign="start"
            wordBreak="break-all"
            fontWeight="300"
          >
            {
              truncateLongText(
                feedbackInfo.feedback,
                readMoreForFeedBack === 'more' ? 270 : feedbackInfo.feedback?.length + 1
              )?.truncatedText
            }{' '}
            {feedbackInfo.feedback?.length <= 270 ? (
              ''
            ) : (
              <Text
                color="#4545FE"
                fontWeight="500"
                fontSize="14px"
                as="span"
                cursor="pointer"
                onClick={() =>
                  setReadmoreForFeedBack(readMoreForFeedBack === 'more' ? 'less' : 'more')
                }
              >
                Read {readMoreForFeedBack}
              </Text>
            )}
          </Text>
        </HStack>
        {row?.images?.length > 0 ? (
          <ClipBoardIcon position="absolute" top="9.51px" right="8.89px" />
        ) : null}
      </Box>

      {allowedToBeviewed() ? <ActionMenu respondDisclosure={respondDisclosure} /> : null}
      <RespondToFeedBackModal
        allowedToBeviewed={allowedToBeviewed}
        feedbackInfo={feedbackInfo}
        customScrollbarStyles={customScrollbarStyles}
        modalDisclosure={respondDisclosure}
      />
    </HStack>
  );
};

export default ActionForFeedback;
