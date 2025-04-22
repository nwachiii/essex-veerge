import HoverListingName from '@/components/dashboard/table/HoverListingName';
import {HStack, Heading, Image, Stack, Text} from '@chakra-ui/react';
import React from 'react';

export const ClientDetails = ({info}) => {
  const displayObj = {
    video: {
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
    <Stack
      w="full"
      padding="15px 11px 16px 16px"
      borderRadius="12px"
      border="1px solid #E4E4E4"
      spacing="15px"
    >
      <Heading fontSize="18px" fontWeight="400" color="#000" as="h2">
        Client details
      </Heading>
      <HStack w="full" align="start" spacing="15px">
        <HStack spacing="10px">
          <Image
            src={info?.customer?.avatar}
            borderRadius="full"
            boxSize="50px"
            alt="client image "
            objectFit="cover"
          />
          <Stack maxW="170px" spacing="5px">
            <Text
              whiteSpace="break-spaces"
              wordBreak="break-word"
              fontSize="18px"
              fontWeight="500"
              textTransform="capitalize"
              color="#191919"
            >
              {`${info?.customer?.first_name ?? '-'} ${info?.customer?.last_name ?? '-'}`}
            </Text>

            {
              <HoverListingName
                text={info?.customer?.email ?? ''}
                fontSize="14px"
                fontWeight="400"
                color="#4545FE"
              />
            }
            <Text fontSize="12px" fontWeight="400" color="#191919">
              {info?.customer?.phone ?? '-'}
            </Text>
          </Stack>
        </HStack>
        <Stack spacing="13px" h="full">
          <Text fontSize="14px" fontWeight="400" color="#191919">
            {info?.schedule_date ? info?.schedule_date.replace('|', ' | ') : '-'}
          </Text>
          <HStack
            h="18px"
            bg={displayObj?.[info?.tour_method]?.bg}
            borderRadius="16.042px"
            px="8.02px"
            w="fit-content"
          >
            <Text fontSize="8px" fontWeight="400" color={displayObj?.[info?.tour_method]?.color}>
              {displayObj?.[info?.tour_method]?.name ?? '-'}
            </Text>
          </HStack>
        </Stack>
      </HStack>
    </Stack>
  );
};

export default ClientDetails;
