import HoverListingName from '@/components/dashboard/table/HoverListingName';
import {HStack, Heading, Image, Stack, Text} from '@chakra-ui/react';
import {fromZonedTime} from 'date-fns-tz';
import React from 'react';
import HoverText from 'ui-lib/ui-lib.components/hoverOnText/hoverOnText';
import {changeDateFormat} from 'utils/formatDate';

export const InspectionInfo = ({formik, timeZone, convertToISOString}) => {
  const isoString = convertToISOString(
    formik.values.date,
    formik.values.time,
    formik.values.meridiem
  );
  const utcDate = fromZonedTime(isoString, timeZone).toISOString();

  const inspection_time = utcDate ? changeDateFormat(utcDate, 'timeZone offset comma') : '-';
  const displayObj = {
    Video: {
      bg: '#12D8A01A',
      color: '#12D8A0',
      name: 'Virtual',
    },
    'In-Person': {
      bg: '#4545FE1A',
      color: '#4545FE',
      name: 'In-Person',
    },
  };
  return (
    <HStack w="full" align="start" spacing="20px" justifyContent="space-between">
      <Stack maxW="170px" spacing="9.6px">
        <Text
          whiteSpace="break-spaces"
          wordBreak="break-word"
          fontSize="10px"
          fontWeight="400"
          textTransform="capitalize"
          color="#606060"
        >
          Listing
        </Text>

        <HoverText
          text={formik.values.listingName ?? '-'}
          fontSize="10px"
          lens={14}
          fontWeight="400"
          color="#191919"
        />
      </Stack>
      <Stack spacing="9.6px">
        <Text
          whiteSpace="break-spaces"
          wordBreak="break-word"
          fontSize="10px"
          fontWeight="400"
          textTransform="capitalize"
          color="#606060"
        >
          Date
        </Text>

        <Text fontSize="10px" fontWeight="400" color="#191919">
          {inspection_time}
        </Text>
      </Stack>

      <Stack spacing="3.2px" h="full">
        <Text fontSize="10px" fontWeight="400" color="#606060">
          Inspection type
        </Text>
        <HStack
          maxH="25.8px"
          bg={displayObj?.[formik.values.type ?? '']?.bg}
          borderRadius="38.4px"
          px="10.4px"
          py="6.4px"
          w="fit-content"
        >
          <Text
            fontSize="10px"
            fontWeight="400"
            color={displayObj?.[formik.values.type ?? '']?.color}
          >
            {displayObj?.[formik.values.type ?? '']?.name ?? '-'}
          </Text>
        </HStack>
      </Stack>
    </HStack>
  );
};

export default InspectionInfo;
