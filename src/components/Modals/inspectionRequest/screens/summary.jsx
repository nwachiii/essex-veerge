import {
  HStack,
  Heading,
  Image,
  ModalBody,
  Stack,
  Tag,
  TagLabel,
  Button as ChakraButton,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react';
import React, {useEffect, useState} from 'react';
import leftIcon from '/src/images/icons/leftIconForRequest.svg';
import {useMutation} from '@tanstack/react-query';
import {InspectionRequestResponse} from 'apis/requests';
import {Button, CreateToast} from 'ui-lib';
import {toastForError} from 'utils/toastForErrors';
import avatar from '/src/images/avatar.svg';
import {changeDateFormat} from 'utils/formatDate';
import HoverListingName from '@/components/dashboard/table/HoverListingName';
import styled from '@emotion/styled';
import {MatadorCustomDatePicker} from '@/components/common/Calendar/DatePicker';

const color = {
  'in person': {color: '#7255CB', bg: '#7255CB1A', text: 'In Person'},
  video: {
    color: '#064B38',
    bg: '#E7FBF5',
    text: 'Virtual',
  },
  virtual: {
    color: '#064B38',
    bg: '#E7FBF5',
    text: 'Virtual',
  },
};

const Summary = ({
  customerInfo,
  history,
  timeZone,
  handleClose,
  forExternal,
  summaryInfo,
  setSummaryInfo,
  proceed,
  requestId,
  row,
  refetch,
  handleDateSelection,
  handleScreen,
  rescheduledDate,
}) => {
  const toaster = CreateToast();
  const [expand, setExpand] = useState(false);

  const toast = useToast();
  const mutation = useMutation(formData => InspectionRequestResponse(requestId, formData), {
    onSuccess: res => {
      refetch();
      const closeAll = () => {
        toaster('Inspection Request Assigned');
        handleClose();
      };
      closeAll();
    },
    onError: err => {
      toastForError(err, true, toast);
    },
  });
  // const handleDateSelection = rescheduledDate => {
  //   return mutation.mutate({
  //     email: summaryInfo.email,
  //     full_name: summaryInfo.full_name,
  //     note: summaryInfo.note,
  //     supervisor: true,
  //     ...(forExternal ? {external: true} : {}),
  //     // [request.label]: request.labelInfo,
  //     ...(rescheduledDate ? rescheduledDate : {}),
  //     ...(history
  //       ? {
  //           supervisor_update: true,
  //         }
  //       : {
  //           status: 'Accepted',
  //         }),
  //   });
  // };
  const handleSummary = () => {
    return mutation.mutate({
      email: summaryInfo.email,
      full_name: summaryInfo.full_name,
      note: summaryInfo.note,
      supervisor: true,
      ...(forExternal ? {external: true} : {}),
      // [request.label]: request.labelInfo,
      ...(rescheduledDate ? rescheduledDate : {}),
      ...(history
        ? {
            supervisor_update: true,
          }
        : {
            status: 'Accepted',
          }),
    });
  };

  return (
    <Stack w={`640px`} maxH="638px" py="28.6px" px="19.1px">
      <HStack align="end" mb="19.2px" spacing="10px">
        <Image
          onClick={() => (history && !proceed ? handleClose() : handleScreen('assignToTeamMember'))}
          cursor="pointer"
          src={leftIcon.src}
          alt="left icon"
        />
        <Heading fontSize="24px" fontWeight="600" color="#191919">
          Summary
        </Heading>
      </HStack>
      <ModalBody p="0px" py="0px" my="0px">
        <VStack spacing="19.2px" w="full">
          <VStack w="full" spacing="4.5px">
            <Heading
              as="h2"
              w="full"
              textAlign="start"
              color="#424242"
              fontSize="14px"
              fontWeight="500"
              lineHeight={`143%`}
            >
              {"Client's Details"}
            </Heading>

            <Stack
              h="fit-content"
              w="full"
              borderRadius={`8px`}
              border={`1px solid`}
              borderColor={`#e5e5e5`}
              background={`#FAFAFA`}
              color={`#424242`}
              fontSize={`16px`}
              fontWeight={`400`}
              lineHeight={`150%`}
              p={`12px`}
            >
              <HStack spacing="8px">
                <Image
                  src={customerInfo[0]?.labelInfo?.image ?? avatar.src}
                  boxSize="36px"
                  objectFit="cover"
                  borderRadius="full"
                  alt="customer image"
                />
                <Text
                  as="span"
                  color="#191919"
                  textTransform="capitalize"
                  fontSize="14px"
                  fontWeight="600"
                >
                  {customerInfo[0]?.labelInfo?.name}
                </Text>
              </HStack>

              <Stack
                justify="space-around"
                w="full"
                h="fit-content"
                align="flex-start"
                gap={`12px`}
              >
                {customerInfo.map((item, idx) => {
                  if (item.label === 'profile') {
                    return null;
                  }
                  return (
                    <HStack key={idx} gap={'10px'} justify={`space-between`} w={`100%`}>
                      <Text>{item.label}</Text>
                      {item.label === 'Inspection type' ? (
                        <Tag
                          px="10.4px"
                          h="28.8px"
                          mt="-6.4px"
                          alignSelf="center"
                          bg={color[item.labelInfo]?.bg}
                          color={color[item.labelInfo]?.color}
                          fontSize="12px"
                          fontWeight="500"
                          borderRadius="48px"
                        >
                          <TagLabel textTransform="capitalize" noOfLines={1} mx="auto">
                            {color[item.labelInfo]?.text}
                          </TagLabel>
                        </Tag>
                      ) : item.label === 'Listing name' ? (
                        <HoverListingName
                          lens={30}
                          text={item.labelInfo}
                          fontWeight="500"
                          color="#191919"
                        />
                      ) : item.label === 'Date' ? (
                        <Text fontWeight="500" color="#191919">
                          {item?.labelInfo
                            ? changeDateFormat(item.labelInfo, 'timeZone offset comma', timeZone)
                            : '-'}
                        </Text>
                      ) : (
                        <Text fontWeight="500" color="#191919">
                          {item.labelInfo}
                        </Text>
                      )}
                    </HStack>
                  );
                })}
              </Stack>
            </Stack>
          </VStack>
          <VStack w="full" spacing="5.63px">
            <Heading
              as="h2"
              w="full"
              textAlign="start"
              color="#424242"
              fontSize="14px"
              fontWeight="500"
              lineHeight={`143%`}
            >
              {"Assignee's Details"}
            </Heading>
            <VStack
              // w="full"
              // border="1px solid #E4E4E4"
              // borderRadius="9.6px"
              // p="14.3px 12.7px 18.9px 19.9px"
              // spacing="20.5px"

              h="fit-content"
              w="full"
              borderRadius={`8px`}
              border={`1px solid`}
              borderColor={`#e5e5e5`}
              background={`#FAFAFA`}
              color={`#424242`}
              fontSize={`16px`}
              fontWeight={`400`}
              lineHeight={`150%`}
              p={`12px`}
            >
              <HStack w="full" spacing="8.739px" justify="flex-start">
                <Image
                  src={summaryInfo?.img || avatar.src}
                  alt="assignee image"
                  boxSize="50.844px"
                  objectFit="cover"
                  borderRadius="full"
                />
                <Stack spacing="5.561px">
                  <Text
                    fontSize="14.3px"
                    fontWeight="600"
                    color="#191919"
                    textTransform="capitalize"
                  >
                    {summaryInfo.full_name}
                  </Text>
                  <Text fontSize="12.711px" fontWeight="400" color="#4545FE">
                    {summaryInfo.email}
                  </Text>
                </Stack>
              </HStack>
              <VStack
                as="article"
                spacing="7.944px"
                w="full"
                py="9.53px"
                px="12.7px"
                bg="#F5F5F5"
                h="80px"
                borderRadius="8px"
                border={`.5px solid`}
                borderColor={`#d6d6d6`}
              >
                <Heading
                  textAlign="start"
                  w="full"
                  as="h4"
                  fontSize="11.122px"
                  fontWeight="500"
                  color="#191919"
                >
                  Note
                </Heading>
                <Wrap>
                  <Text
                    w="full"
                    textAlign="start"
                    fontSize="12px"
                    fontWeight="400"
                    color="#191919"
                    lineHeight={`140%`}
                  >
                    {expand
                      ? summaryInfo?.note
                      : summaryInfo?.note?.length <= 220
                        ? summaryInfo?.note
                        : `${summaryInfo?.note?.slice(0, 220)}`}
                    <Text
                      fontSize="8px"
                      cursor="pointer"
                      fontWeight="300"
                      color="#606060"
                      as="span"
                      onClick={() => setExpand(!expand)}
                    >
                      {summaryInfo?.note?.length <= 220
                        ? ''
                        : expand
                          ? ' ... See less'
                          : ' ... read more'}
                    </Text>
                  </Text>
                </Wrap>
              </VStack>
            </VStack>
          </VStack>

          {history && !proceed ? (
            <HStack spacing="15px" alignSelf="end">
              <ChakraButton
                onClick={() => handleScreen('assignToTeamMember')}
                fontWeight="400"
                fontSize="16px"
                bg="transparent"
                _hover={{
                  bg: 'transparent',
                }}
                border="1px solid #242526"
                borderRadius="72px"
                h="55px"
                w="256px"
                color="#242526"
              >
                Assign to someone else
              </ChakraButton>
              <MatadorCustomDatePicker
                timeZone={timeZone}
                // mutation={mutation}
                handleDateSelection={handleDateSelection}
                history={history}
              />
            </HStack>
          ) : (
            <Button
              onClick={handleSummary}
              type="button"
              alignSelf="flex-end"
              notes
              mt="0px"
              bg="#191919"
              color="#ffffff"
              fontSize="16px"
              fontWeight="500"
              w="100%"
              h={`max-content`}
              lineHeight={`150%`}
              borderRadius="72px"
              p={`16px`}
              isLoading={mutation.isLoading}
            >
              Proceed
            </Button>
          )}
        </VStack>
      </ModalBody>
    </Stack>
  );
};
export default Summary;

const Wrap = styled.div`
  overflow: auto;

  height: 39px;
  width: 100%;

  &::-webkit-scrollbar {
    width: 4px;
    border-radius: 16px;
  }
  &::-webkit-scrollbar-track {
    border-radius: 16px;

    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 16px;

    background-color: darkgrey;
  }
`;
