import {
  Heading,
  HStack,
  Image,
  Spinner,
  Tag,
  TagLabel,
  Text,
  Textarea,
  useDisclosure,
  useToast,
  VStack,
  Button as ChakraButton,
  Stack,
} from '@chakra-ui/react';
import successGif from '/src/images/check-icon.gif';
import leftIcon from '/src/images/icons/leftIconForRequest.svg';
import avatar from '/src/images/avatar.svg';

import {useMutation, useQueryClient} from '@tanstack/react-query';
import React, {useEffect, useState} from 'react';
import {InspectionRequestResponse} from '../../apis/requests';
import {Button, CreateToast, Input, Popup2} from '../../ui-lib';
import to_selfIcon from '/src/images/icons/to_self_insepectionIcon.svg';
import _usersIcon from '/src/images/icons/3_users_inspectionIcon.svg';
import {useFormik} from 'formik';
import styled from '@emotion/styled';
import HoverListingName from '../../components/dashboard/table/HoverListingName';
import {toastForError} from '../../utils/toastForErrors';
import AssignInspectionToTeamMember from '../../components/Modals/AssignInspectionToTeamMember';
import {useRouter} from 'next/router';
import {changeDateFormat} from '../../utils/formatDate';

export const HandleInspectionRequestApproval = ({
  requestId,
  toTeamMember,
  supervisorId,
  refetch,
  row,
  roles,
}) => {
  const approved = useDisclosure();
  const [customer, setCustomer] = useState({});

  const toast = useToast();
  const mutation = useMutation(formData => InspectionRequestResponse(requestId, formData), {
    onSuccess: res => {
      return approved.onOpen();
    },
    onError: err => {
      toastForError(err, true, toast);
    },
  });

  const customerInfo = [];

  useEffect(() => {
    function formatDateTime(isoString) {
      const date = new Date(isoString);

      const time = date.toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      });

      const dayOfMonth = date.getDate();
      const ordinalSuffix =
        dayOfMonth > 3 && dayOfMonth < 21
          ? 'th'
          : ['st', 'nd', 'rd'][(dayOfMonth % 10) - 1] || 'th';
      const monthName = date.toLocaleString('en-US', {month: 'long'});
      const dateFormatted = `${dayOfMonth}${ordinalSuffix} ${monthName}`;
      customerInfo.push({label: 'Date', labelInfo: dateFormatted});
      return customerInfo.push({label: 'Time', labelInfo: time});
    }
    customerInfo.push({
      label: 'profile',
      labelInfo: {
        image: row?.customer?.avatar,
        name: `${row?.customer?.first_name} ${row?.customer?.last_name} `,
      },
    });

    customerInfo.push({
      label: 'Phone number',
      labelInfo: row?.customer?.phone,
    });
    customerInfo.push({
      label: 'Date',
      labelInfo: row?.time,
    });
    // formatDateTime(row?.time);
    customerInfo.push({label: 'Listing name', labelInfo: row?.project});
    customerInfo.push({
      label: 'Inspection type',
      labelInfo: row?.tour_method?.replace('-', ' ').toLowerCase(),
    });

    setCustomer(customerInfo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [row]);

  const handleTourRequest = () => {
    mutation.mutate({
      status: 'Accepted',
      // supervisor: supervisorId,
    });
  };
  return (
    <div>
      {/* <Button mt={0} onClick={handleTourRequest} variant="primary" w="139px">
        {isLoading ? <Spinner color="whitesmoke" /> : "Accept"}
      </Button> */}
      <AssignInspection
        roles={roles}
        requestId={requestId}
        customerInfo={customer}
        handleTourRequest={handleTourRequest}
        isLoading={mutation.isLoading}
        refetch={refetch}
        toTeamMember={toTeamMember}
        approved={approved}
      />
    </div>
  );
};

const AssignInspection = ({
  handleTourRequest,
  refetch,
  requestId,
  roles,
  isLoading,
  customerInfo,
  approved,
  toTeamMember,
}) => {
  const assign = useDisclosure();

  const request = {
    label: 'status',
    labelInfo: 'Accepted',
  };

  return (
    <>
      <AssignToSomeelse
        roles={roles}
        request={request}
        refetch={refetch}
        toTeamMember={toTeamMember}
        assign={assign}
        requestId={requestId}
        customerInfo={customerInfo}
      />
      {/* <Button
        onClick={assign.onOpen}
        mt="0"
        type="button"
        notes
        bg="#4545FE"
        color="#ffffff"
        fontSize="18px"
        fontWeight="400"
        w="149px"
        h="40px"
        _hover={{
          opacity: "1",
        }}
      >
        Accept
      </Button> */}
      {/* <Popup2
        isOpen={assign.isOpen}
        onClose={assign.onClose}
        minW="fit-content"
      >
        <Popup2.Header>Assign Inspection</Popup2.Header>

        <Popup2.Body pr="0px">
          <Text
            as="span"
            textAlign="start"
            w="full"
            fontSize="16px"
            fontWeight={400}
          >
            Who do you want to assign the inspection to ?
          </Text>
          <HStack justify="center" spacing="24px">
            <VStack
              border="solid 1px #e4e4e4"
              borderRadius="12px"
              w="350px"
              p="33px"
              spacing="none"
              align="start-flex"
            >
              <Image
                boxSize="64px"
                mb="25px"
                src={to_selfIcon.src}
                alt="to self icon"
              />
              <Heading as="h2" fontSize="28px" color="#191919" fontWeight={700}>
                To self
              </Heading>
              <Button
                // variant="violet"
                onClick={handleTourRequest}
                bg={"#4545fe"}
                border={"1px solid #4545fe"}
                mt={"37px"}
                color={"#ffffff"}
                fontSize="16px"
                fontWeight="400"
                w="217px"
                _hover={{
                  opacity: "1",
                }}
                h="40px"
              >
                {isLoading ? <Spinner color="whitesmoke" /> : "Proceed"}
              </Button>
              <SuccessModal
                success={approved}
                refetch={refetch}
                assign={assign}
              />
            </VStack>
            <VStack
              justifySelf="flex-end"
              border="solid 1px #e4e4e4"
              borderRadius="12px"
              w="350px"
              p="33px"
              spacing="none"
              align="start-flex"
            >
              <Image
                boxSize="64px"
                mb="25px"
                src={_usersIcon.src}
                alt="to self icon"
              />
              <Heading as="h2" fontSize="28px" color="#191919" fontWeight={700}>
                To someone else
              </Heading>

              <AssignToSomeelse
			  roles={roles}
                request={request}
                refetch={refetch}
                assign={assign}
                requestId={requestId}
                customerInfo={customerInfo}
              />
            </VStack>
            <VStack></VStack>
          </HStack>
        </Popup2.Body>
      </Popup2> */}
    </>
  );
};

export const AssignToSomeelse = ({
  history,
  request,
  roles,
  customerInfo,
  refetch,
  assign,
  requestId,
  toTeamMember,
}) => {
  const toSomeelse = useDisclosure();

  const [summaryInfo, setSummaryInfo] = useState({});
  const moveToTeamMemeberModal = () => {
    toSomeelse.onClose();
    return toTeamMember.onOpen();
  };
  const moveToExternalMemberModal = () => {
    toTeamMember.onClose();
    return toSomeelse.onOpen();
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      full_name: '',
      note: '',
    },
    onSubmit: values => {
      setSummaryInfo(values);
      formik.resetForm();
    },
  });
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const isValid =
    emailPattern.test(formik.values.email) &&
    formik.values.email.trim() &&
    formik.values.full_name.trim() &&
    formik.values.note.trim();

  return (
    <>
      <Button
        onClick={
          // history ? toSomeelse.onOpen :
          toTeamMember.onOpen
        }
        mt="0"
        type="button"
        notes
        border={history && '1px solid #242526'}
        bg={history ? 'transparent' : '#191919'}
        color={history ? '#242526' : '#ffffff'}
        fontSize={history ? '16px' : '12px'}
        fontWeight={history ? '400' : '500'}
        w={history ? '208.4px' : '65px'}
        h={history ? '55px' : '26px'}
        borderRadius={!history ? '4px' : '12px'}
        _hover={{
          opacity: '1',
        }}
      >
        {history ? 'Assign to someone else' : 'Accept'}
      </Button>
      <Popup2
        minW="657px"
        isOpen={toSomeelse.isOpen}
        overLayStyle={{background: 'rgba(0, 0, 0, 0.2)'}}
        py="36px"
        px="24px"
        onClose={() => (formik.resetForm(), toSomeelse.onClose())}
      >
        <Stack spacing="5px">
          <Heading fontSize="24px" fontWeight="600" color="#191919">
            Who do you want to assign the inspection to ?
          </Heading>
        </Stack>
        <Popup2.Body my="24px" mb="0px" pb="0px" pr="0">
          <VStack
            w="full"
            px="2px"
            spacing="28px"
            onSubmit={e => {
              if (e.cancelable) e.preventDefault();
              return formik.handleSubmit();
            }}
            as="form"
          >
            <Input
              noLabel
              placeholder="Enter assignee's email address"
              name="email"
              w="full"
              onChange={formik.handleChange}
              border="1px solid #919191"
              borderRadius="12px"
              fontSize="14px"
              fontWeight="400"
              _focusVisible={{
                borderColor: '#3182ce',
                boxShadow: '0 0 0 1px #3182ce',
              }}
              _placeholder={{
                fontSize: '14px',
                fontWeight: '400',
                color: '#919191',
              }}
              h="64px"
              value={formik.values.email}
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            />

            <Input
              w="100%"
              onChange={formik.handleChange}
              value={formik.values.full_name}
              noLabel
              name="full_name"
              border="1px solid #919191"
              borderRadius="12px"
              _focusVisible={{
                borderColor: '#3182ce',
                boxShadow: '0 0 0 1px #3182ce',
              }}
              fontSize="14px"
              fontWeight="400"
              _placeholder={{
                fontSize: '14px',
                fontWeight: '400',
                color: '#919191',
              }}
              h="64px"
              placeholder="Assignee's full name"
            />

            <VStack align="flex-start" spacing="8px" w="full">
              <Textarea
                name="note"
                value={formik.values.note}
                onChange={formik.handleChange}
                resize="none"
                fontSize="14px"
                fontWeight="400"
                borderRadius="12px"
                maxLength="5000"
                w="full"
                py="24px"
                px="16px"
                border="1px solid #919191"
                _placeholder={{
                  fontSize: '14px',
                  fontWeight: '400',
                  color: '#919191',
                }}
                h="160px"
                placeholder="Leave a note for the person you're assigning inspection to"
              />
            </VStack>

            <HStack align="end" w="full" justify="end" spacing="15px">
              <ChakraButton
                onClick={moveToTeamMemeberModal}
                fontWeight="400"
                fontSize="16px"
                bg="transparent"
                _hover={{
                  bg: 'transparent',
                }}
                border="1px solid #242526"
                borderRadius="12px"
                h="55px"
                w="256px"
                color="#242526"
              >
                Assign to Team Member
              </ChakraButton>

              <Summary
                request={request}
                isValid={isValid}
                refetch={refetch}
                forExternal
                assign={assign}
                toSomeelse={toSomeelse}
                requestId={requestId}
                summaryInfo={summaryInfo}
                customerInfo={customerInfo}
              />
            </HStack>
          </VStack>
        </Popup2.Body>
      </Popup2>
      <AssignInspectionToTeamMember
        moveToExternalMemberModal={moveToExternalMemberModal}
        roles={roles}
        toTeamMember={toTeamMember}
        setSummaryInfo={setSummaryInfo}
        Summary={obj => (
          <Summary
            request={request}
            // isValid={isValid}
            refetch={refetch}
            assign={assign}
            toSomeelse={toTeamMember}
            requestId={requestId}
            summaryInfo={summaryInfo}
            customerInfo={customerInfo}
            {...obj}
          />
        )}
        summaryInfo={summaryInfo}
      />
    </>
  );
};

const Summary = ({
  refetch,
  isValid,
  assign,
  toSomeelse,
  customerInfo,
  forExternal,
  requestId,
  summaryInfo,
  request,
}) => {
  const summary = useDisclosure();
  const success = useDisclosure();
  const toaster = CreateToast();

  const [expand, setExpand] = useState(false);

  const toast = useToast();
  const mutation = useMutation(formData => InspectionRequestResponse(requestId, formData), {
    onSuccess: res => {
      const closeAll = async () => {
        success && success.onClose();
        toSomeelse && toSomeelse.onClose();
        assign && assign.onClose();
        toaster('Inspection Request Assigned');
        await refetch();
        summary && summary.onClose();
      };
      closeAll();
    },
    onError: err => {
      toastForError(err, true, toast);
    },
  });

  const handleSummary = () => {
    return mutation.mutate({
      email: summaryInfo.email,
      full_name: summaryInfo.full_name,
      note: summaryInfo.note,
      ...(forExternal ? {external: true} : {}),
      supervisor: true,
      [request.label]: request.labelInfo,
    });
  };

  const color = {
    'in person': {color: '#7255CB', bg: '#7255CB1A', text: 'In Person'},
    video: {
      color: '#064B38',
      bg: '#E7FBF5',
      text: 'Virtual',
    },
  };

  return (
    <>
      <Button
        isDisabled={!isValid}
        onClick={summary.onOpen}
        type="submit"
        alignSelf="flex-end"
        mt="0px"
        notes
        bg="#242526"
        color="#ffffff"
        borderRadius="72px"
        fontSize="16px"
        fontWeight="400"
        w="217px"
      >
        Proceed
      </Button>
      <Popup2
        mt="15vh"
        isOpen={summary.isOpen}
        onClose={summary.onClose}
        minW="800px"
        maxW="800px"
        overLayStyle={{background: 'rgba(0, 0, 0, 0.2)'}}
        maxH="638px"
        py="28.6px"
        px="19.1px"
        scrollBehavior={'outside'}
      >
        <HStack align="end" mb="19.2px" spacing="10px">
          <Image onClick={summary.onClose} cursor="pointer" src={leftIcon.src} alt="left icon" />
          <Heading fontSize="24px" fontWeight="600" color="#191919">
            Summary
          </Heading>
        </HStack>
        <Popup2.Body pr="0" py="0px" my="0px">
          <VStack spacing="19.2px" w="full">
            <VStack w="full" spacing="4.5px">
              <Heading
                as="h2"
                w="full"
                textAlign="start"
                color="#191919"
                fontSize="16px"
                fontWeight="500"
              >
                {"Customer's Details"}
              </Heading>
              <HStack
                w="full"
                border="1px solid #CBCBCB"
                borderRadius="9.53px"
                h="112px"
                pl="16px"
                pr="11.13px"
                py="16px"
                pt="17px"
                mx="auto"
              >
                <HStack h="fit-content" align="center" w="full" spacing="46px">
                  <HStack spacing="8px" mr="14px">
                    <Image
                      src={customerInfo[0]?.labelInfo?.image ?? avatar.src}
                      boxSize="36px"
                      objectFit="cover"
                      borderRadius="full"
                      alt="customer image"
                    />
                    <Text
                      as="span"
                      maxW="100px"
                      color="#191919"
                      textTransform="capitalize"
                      fontSize="14px"
                      fontWeight="600"
                    >
                      {customerInfo[0]?.labelInfo?.name}
                    </Text>
                  </HStack>

                  <HStack
                    justify="space-around"
                    w="full"
                    spacing="30px"
                    h="fit-content"
                    align="flex-start"
                  >
                    {customerInfo.map((item, idx) => {
                      if (item.label === 'profile') {
                        return null;
                      }
                      return (
                        <VStack key={idx} spacing={'9.6px'} align="start">
                          <Heading as="h3" fontSize="12px" color="#606060" fontWeight="400">
                            {item.label}
                          </Heading>
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
                                {color[item.labelInfo].text}
                              </TagLabel>
                            </Tag>
                          ) : item.label === 'Listing name' ? (
                            <HoverListingName
                              lens={10}
                              text={item.labelInfo}
                              fontSize="12px"
                              fontWeight="500"
                              color="#191919"
                            />
                          ) : item.label === 'Date' ? (
                            <Text as="span" fontSize="12px" fontWeight="500" color="#191919">
                              {item?.labelInfo
                                ? changeDateFormat(item.labelInfo, 'add_time').replace('|', ' ')
                                : '-'}
                            </Text>
                          ) : (
                            <Text as="span" fontSize="12px" fontWeight="500" color="#191919">
                              {item.labelInfo}
                            </Text>
                          )}
                        </VStack>
                      );
                    })}
                  </HStack>
                </HStack>
              </HStack>
            </VStack>
            <VStack w="full" spacing="5.63px">
              <Heading
                as="h2"
                w="full"
                textAlign="start"
                color="#191919"
                fontSize="16px"
                fontWeight="500"
              >
                {"Assignee's Details"}
              </Heading>
              <VStack
                w="full"
                border="1px solid #E4E4E4"
                borderRadius="9.6px"
                p="14.3px 12.7px 18.9px 19.9px"
                spacing="20.5px"
              >
                <HStack w="full" spacing="8.739px" justify="flex-start">
                  <Image
                    src={summaryInfo?.img || avatar.src}
                    alt="assignee image"
                    boxSize="50.844px"
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
                  borderRadius="6.4px"
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
                      fontSize="9.533px"
                      fontWeight="300"
                      color="#191919"
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
            <Button
              onClick={handleSummary}
              type="button"
              alignSelf="flex-end"
              notes
              mt="0px"
              h="48px"
              bg="#242526"
              color="#ffffff"
              fontSize="16px"
              fontWeight="400"
              w="234px"
            >
              {mutation.isLoading ? <Spinner color="whitesmoke" /> : 'Proceed'}
            </Button>
            <SuccessModal
              refetch={refetch}
              success={success}
              toSomeelse={toSomeelse}
              assign={assign}
              summary={summary}
            />
          </VStack>
        </Popup2.Body>
      </Popup2>
    </>
  );
};

const SuccessModal = ({success, toSomeelse, refetch, assign, summary}) => {
  const closeAll = async () => {
    await refetch();
    success && success.onClose();
    toSomeelse && toSomeelse.onClose();
    assign && assign.onClose();
    return summary && summary.onClose();
  };

  return (
    <Popup2 isOpen={success.isOpen} onClose={closeAll}>
      <Popup2.Body pr="0">
        <VStack w="full" spacing="none">
          <Image src={successGif.src} w="88px" mb="23px" alt="success image" fontSize="10px" />
          <Heading as="h2" fontSize="24px" fontWeight="600">
            Successful
          </Heading>
          <Text as="span" mt="15px" fontSize="16px" fontWeight="300">
            Tour request has been approved!
          </Text>
          <Button
            onClick={closeAll}
            type="button"
            mt="49px"
            notes
            bg="#242526"
            color="#ffffff"
            fontSize="16px"
            fontWeight="400"
            borderRadius="72px"
            w="full"
          >
            Proceed
          </Button>
        </VStack>
      </Popup2.Body>
    </Popup2>
  );
};

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
    // outline: 1px solid slategrey;
  }
`;
