import {HStack, Image, Stack, Text} from '@chakra-ui/react';
import React from 'react';
import rightArrow from '/src/images/icons/RightArrowForListingScheduledInspection.svg';

export const UpcomingAndHistoryComponent = ({handleScreen, info, setDetails}) => {
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
    'in-person': {
      bg: 'rgba(69, 69, 254, 0.10)',
      color: '#4545FE',
      name: 'In-Person',
    },
    default: {
      bg: 'rgba(69, 69, 254, 0.10)',
      color: '#4545FE',
      name: 'In-Person',
    },
  };

  const setInspectionDetails = () => {
    setDetails(info?.id);
    return handleScreen();
  };
  return (
    <HStack
      cursor="pointer"
      onClick={setInspectionDetails}
      py="15px"
      pl="26.5px"
      pr="19.75px"
      justify="space-between"
      w="full"
      borderRadius={`4px`}
      border={`0.5px solid`}
      borderColor={`#E4E4E4`}
      background={`#F9FAFB`}
    >
      <HStack spacing="15px">
        <Image
          alt=""
          src={info?.customer?.avatar}
          objectFit="cover"
          boxSize="52.715px"
          borderRadius="full"
        />
        <Stack spacing="8px">
          <Text textTransform="capitalize" fontSize="14px" fontWeight="500" color="#191919">
            {`${info?.customer?.first_name} ${info?.customer?.last_name}`}
          </Text>
          <Text fontSize="12px" fontWeight="400" color="#606060">
            {info?.schedule_date ? info?.schedule_date.replace('|', ' | ') : '-'}
          </Text>
          <HStack
            h="max-content"
            bg={displayObj?.[info?.tour_method?.toLowerCase()]?.bg || displayObj?.default?.bg}
            borderRadius="21px"
            p="5.5px 10.5px"
            w="fit-content"
          >
            <Text
              fontSize="10px"
              fontWeight="400"
              color={
                displayObj?.[info?.tour_method?.toLowerCase()]?.color || displayObj?.default?.color
              }
            >
              {displayObj?.[info?.tour_method?.toLowerCase()]?.name || displayObj?.default?.name}
            </Text>
          </HStack>
        </Stack>
      </HStack>
      <Image src={rightArrow.src} alt="rightArrow" />
    </HStack>
  );
};

export default UpcomingAndHistoryComponent;
