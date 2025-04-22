import {Box, HStack, Heading, Image, Stack, Text, VStack} from '@chakra-ui/react';
import React from 'react';

export const AssigneesDetails = ({formik}) => {
  const customScrollbarStyles = {
    '&::-webkit-scrollbar': {
      width: '4px',
      borderRadius: '16px',
    },
    '&::-webkit-scrollbar-track': {
      borderRadius: '16px',
      WebkitBoxShadow: 'inset 0 0 6px #606060',
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '16px',
      backgroundColor: '#191919',
      // outline: "1px solid slategrey", // You can include this line if needed
    },
  };

  const user = loggedinUserStatic;

  const [expand, setExpand] = React.useState(false);

  return (
    <Stack spacing="15px" w="full">
      <Heading fontSize="12px" fontWeight="400" color="#4B4B4B" as="h2">
        {" Assignee's details"}
      </Heading>

      <Stack spacing="10px" w="full">
        <HStack spacing="8.02px">
          <Image
            src={formik?.values.avatar}
            borderRadius="full"
            boxSize="40.8px"
            alt="client image "
            objectFit="cover"
          />
          <Stack spacing="5px">
            <Text
              whiteSpace="break-spaces"
              wordBreak="break-word"
              textTransform="capitalize"
              fontSize="18px"
              fontWeight="500"
              color="#191919"
            >
              {`${formik.values?.first_name ?? '-'} ${formik.values?.last_name ?? '-'} ${
                formik.values?.id === user?.id ? '(you)' : ''
              }`}{' '}
            </Text>
            <Text
              as="a"
              href={`mailto:${formik.values?.email}`}
              fontSize="14px"
              fontWeight="400"
              color="#4545FE"
            >
              {formik.values?.email ?? '-'}
            </Text>{' '}
          </Stack>
        </HStack>
        <Stack py="9.62px" spacing="9.68px" px="10.83px" bg="#F5F5F5" borderRadius="8px">
          <Heading
            as="h3"
            fontSize="10.423px"
            textTransform="capitalize"
            fontWeight="500"
            color="#191919"
          >
            Note
          </Heading>
          <VStack
            maxH="151px"
            minH="70px"
            overflow="auto"
            sx={customScrollbarStyles}
            pr="2px"
            spacing="none"
            align="start"
          >
            <VStack align="start" w="full">
              <Text fontSize="9.69px" fontWeight="300" w="full" color="#191919">
                {expand
                  ? formik.values.note
                  : formik.values.note?.length <= 200
                    ? formik.values.note
                    : formik.values.note?.slice(0, -(formik.values.note?.length - 200))}

                <Text
                  fontSize="14px"
                  fontWeight="500"
                  as="span"
                  color="#4545FE"
                  cursor="pointer"
                  onClick={() =>
                    !formik.values.note?.length
                      ? null
                      : formik.values.note?.length <= 200
                        ? null
                        : setExpand(!expand)
                  }
                >
                  {!formik.values.note?.length
                    ? null
                    : formik.values.note?.length <= 200
                      ? ''
                      : expand
                        ? ' ...See less'
                        : '...See more'}
                </Text>
              </Text>
            </VStack>
          </VStack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default AssigneesDetails;
