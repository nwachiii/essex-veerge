import {HStack, Heading, Image, Stack, Text} from '@chakra-ui/react';
import React from 'react';
import HoverText from '../../../common/Hovertext/HoverText';
import HoverListingName from '../../../dashboard/table/HoverListingName';

export const ClientDetails = ({info}) => {
  const displayObj = {
    video: {
      bg: '#E7FBF5',
      color: '#064B38',
      name: 'Virtual',
    },
    virtual: {
      bg: '#E7FBF5',
      color: '#064B38',
      name: 'Virtual',
    },
    'in-person': {
      bg: 'rgba(69, 69, 254, 0.10)',
      color: '#4545FE',
      name: 'In-Person',
    },
  };
  return (
    <Stack w="full" gap="8px">
      <Heading fontSize="14px" fontWeight="400" color="#000" as="h2">
        Client details
      </Heading>
      <HStack
        w="full"
        gap="8px"
        borderRadius={`4px`}
        border={`0.5px solid`}
        borderColor={` #E4E4E4`}
        background={` #F9FAFB`}
        p={`12px 16px`}
      >
        <Image
          src={info?.customer?.avatar}
          borderRadius="full"
          boxSize="40px"
          alt="client image "
          objectFit="cover"
        />
        <Stack w={`100%`}>
          <Text
            whiteSpace="break-spaces"
            wordBreak="break-word"
            fontSize="14px"
            fontWeight="500"
            textTransform="capitalize"
            color="#191919"
          >
            {`${info?.customer?.first_name ?? '-'} ${info?.customer?.last_name ?? '-'}`}
          </Text>

          {/* <HoverListingName
              text={info?.customer?.email ?? ''}
              fontSize="12px"
              fontWeight="400"
              color="#4545FE"
              textTransform={`lowercase`}
            /> */}
          <Text fontSize="12px" fontWeight="400" color="#4545FE">
            {info?.customer?.email ?? ''}
          </Text>

          <Text fontSize="12px" fontWeight="400" color="#606060">
            {info?.schedule_date ? info?.schedule_date.replace('|', ' | ') : '-'}
          </Text>
        </Stack>

        <HStack
          // h="max-content"
          bg={displayObj?.[info?.tour_method?.toLowerCase()]?.bg}
          borderRadius="21px"
          p="5.5px 10.5px"
          w="fit-content"
          minW="68px"
          justify="center"
        >
          <Text fontSize="10px" fontWeight="400" color={displayObj?.[info?.tour_method]?.color}>
            {displayObj?.[info?.tour_method?.toLowerCase()]?.name ?? '-'}
          </Text>
        </HStack>
      </HStack>
    </Stack>
  );
};

export default ClientDetails;
