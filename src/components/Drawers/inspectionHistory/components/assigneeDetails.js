import {Box, HStack, Heading, Image, Stack, Text, VStack} from '@chakra-ui/react';
import React from 'react';

export const AssigneesDetails = ({info}) => {
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
      // outline: "1px solid slategrey", // You can include this line if needed
    },
  };

  const user =
    typeof window !== 'undefined' &&
    localStorage &&
    JSON.parse(localStorage.getItem('loggedinUser'));

  const [expand, setExpand] = React.useState(false);
  const noted =
    'Donec consectetur vulputate nisi in  @Dan Lukves ibulum. convallis convallis commodo. Duis  dui ac ex convallis commodo. Duis consequat tempor libero, egeassa semper pretium. Sed aassa sem convallis commodo. Duis consequat tempor libero, egeassa semper pretium. Sed aassa sem Duis consequat tempor libero, egetemper pretium. Sed ac dui ac ex convallis commodo. Duis consequat tempor libero, egeassa semper pretium. Sed aassa sem  commodo. Duis consequat tempor libero, egeassa semper pretium. Sed aassa sem Duis consequat tempor libero, egetemper pretium. Sed ac dui ac ex convallis commodo. Duis consequat tempor libero, egeassa semper pretium. Sed aassa sem  Nam vel arcu quis massa semper pretium. Sed ac dui ac ex convallis commodo. Duis consequat tempor libero, egetemper pretium. Sed ac dui ac ex  @Dan Lukves @Dan Lukves consequat tempor libero, egeassa semper pretium. Sed aassa sem Duis consequat tempor libero, egetemper pretium. Sed ac sghffjk ';

  return (
    <Stack w="full" gap="8px">
      <Heading fontSize="14px" fontWeight="400" color="#000" as="h2">
        {" Assignee's details"}
      </Heading>

      <Stack
        w="full"
        gap="8px"
        borderRadius={`4px`}
        border={`0.5px solid`}
        borderColor={` #E4E4E4`}
        background={` #F9FAFB`}
        p={`12px`}
      >
        {' '}
        <HStack spacing="10px">
          <Image
            src={info?.supervisor_avatar ?? info?.assigned_to?.avatar}
            borderRadius="full"
            boxSize="40px"
            alt="client image "
            objectFit="cover"
          />
          <Stack spacing="5px">
            <Text
              whiteSpace="break-spaces"
              wordBreak="break-word"
              fontSize="14px"
              fontWeight="500"
              textTransform="capitalize"
              color="#191919"
            >
              {info?.supervisor_full_name ??
                `${info?.assigned_to?.first_name ?? '-'} ${info?.assigned_to?.last_name ?? '-'} ${
                  info?.assigned_to?.id === user?.id ? '(you)' : ''
                }`}{' '}
            </Text>
            <Text fontSize="12px" fontWeight="400" color="#4545FE">
              {info?.supervisor_email ?? info?.assigned_to?.email ?? '-'}
            </Text>{' '}
          </Stack>
        </HStack>
        <Box
          mb="10px"
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
            Note
          </Heading>
          <VStack
            maxH="151px"
            minH="fit-content"
            overflowY="auto"
            sx={customScrollbarStyles}
            pr="7px"
            spacing="none"
            align="start"
          >
            <VStack align="start" w="full">
              <Text fontSize="14px" fontWeight="300" w="full" color="#191919">
                {expand
                  ? info?.supervisor_notes
                  : info?.supervisor_notes?.length <= 200
                    ? info?.supervisor_notes
                    : info?.supervisor_notes?.slice(0, -(info?.supervisor_notes?.length - 200))}

                <Text
                  fontSize="14px"
                  fontWeight="500"
                  as="span"
                  color="#4545FE"
                  cursor="pointer"
                  onClick={() =>
                    !info?.supervisor_notes?.length
                      ? null
                      : info?.supervisor_notes?.length <= 200
                        ? null
                        : setExpand(!expand)
                  }
                >
                  {!info?.supervisor_notes?.length
                    ? null
                    : info?.supervisor_notes?.length <= 200
                      ? ''
                      : expand
                        ? ' ...See less'
                        : '...See more'}
                </Text>
              </Text>
            </VStack>
          </VStack>
        </Box>
      </Stack>
    </Stack>
  );
};

export default AssigneesDetails;
