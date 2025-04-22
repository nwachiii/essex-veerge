import {Box, HStack, Image, Stack, Text, VStack} from '@chakra-ui/react';
import {Ratings} from '../../components/common/Rating';
import HoverListingName from '../../components/dashboard/table/HoverListingName';
import ActionForFeedback from '../../components/feedback/actionForFeedback';
import {changeDateFormat} from '../../utils/formatDate';
import FeedbackNameRow from './drawer_for_name_row';

export const FEEDBACK_COLUMN = [
  {
    Header: 'Name',
    accessor: row => {
      const time = changeDateFormat(row?.created_at, 'monthandtime').split('at')[1];

      const month = changeDateFormat(row?.created_at, 'monthandtime').split('at')[0].split(' ')[0];

      const day = changeDateFormat(row?.created_at, 'monthandtime')?.split('at')[0]?.split(' ')[1];

      return (
        <HStack
          spacing="10px"
          h="131px"
          px="11.2px"
          py="18.5px"
          border="0.7px solid #E4E4E4"
          borderRight="none"
          borderLeftRadius="12px"
        >
          <VStack h="full" spacing="16px" align="center" justify="center">
            <Text fontSize="14px" fontWeight="400" color="#191919">
              {month}
            </Text>
            <Text fontSize="14px" fontWeight="400" color="#191919">
              {day}
            </Text>
            <Text fontSize="14px" fontWeight="400" color="#191919">
              {time}
            </Text>
          </VStack>
        </HStack>
      );
    },
  },
  {
    Header: 'rest',
    accessor: row => {
      return <FeedbackNameRow row={row} />;
    },
  },
  {
    Header: 'here',
    accessor: row => {
      const feedBackTypeObj = {
        general: {
          bg: '#4545FE1A',
          color: '#4545FE',
        },
        purchase: {
          bg: 'rgba(18, 216, 160, 0.10)',
          color: '#12D8A0',
        },
        inspection: {
          bg: 'rgba(255, 145, 3, 0.10)',
          color: '#FF9103',
        },
        dispute: {
          bg: 'rgba(255, 106, 106, 0.10)',
          color: '#FF6A6A',
        },
        bug: {
          bg: '#E7FBF5',
          color: '#064B38',
        },
        suggestion: {
          bg: '#E7FBF5',
          color: '#064B38',
        },
      };
      return (
        <HStack
          spacing="10px"
          px="11.2px"
          py="18.5px"
          h="131px"
          border="0.7px solid #E4E4E4"
          borderRight="none"
          borderLeft="none"
        >
          <Stack spacing="5px" align="start">
            {row?.project?.name ? (
              <HoverListingName
                text={`${row?.project?.name ?? ''}${
                  row?.bundle?.unit_title ? `, ${row?.bundle?.unit_title}` : ''
                }`}
                fontSize="14px"
                fontWeight="500"
              />
            ) : null}

            <HStack
              h="25.33px"
              px="9.21px"
              borderRadius="34.014px"
              {...feedBackTypeObj[row?.feedback_type]}
            >
              <Text textTransform="capitalize" fontSize="11.338px" fontWeight="500">
                {row?.feedback_type} feedback
              </Text>
            </HStack>
          </Stack>
        </HStack>
      );
    },
  },
  {
    Header: 'was',
    accessor: row => {
      return (
        <HStack
          spacing="10px"
          px="11.2px"
          py="18.5px"
          h="131px"
          border="0.7px solid #E4E4E4"
          borderRight="none"
          borderLeft="none"
        >
          <Ratings rating={row?.star_rating} />
        </HStack>
      );
    },
  },
  {
    Header: 'now',
    accessor: row => {
      return <ActionForFeedback row={row} />;
    },
  },
];
