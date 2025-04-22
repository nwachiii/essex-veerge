import {
  Heading,
  HStack,
  Stack,
  Text,
  useDisclosure,
  Image,
  VStack,
  Tag,
  TagLabel,
} from '@chakra-ui/react';
import React, {useEffect, useState} from 'react';
import {MatadorCustomDatePicker} from '../../../components/common/Calendar/DatePicker';
import {AssignToSomeelse} from '../../../constants/request/HandleInspectionRequestApproval';
import {Button, Popup2} from '../../../ui-lib/ui-lib.components';
import styled from '@emotion/styled';
import avatar from '/src/images/avatar.svg';
import HoverListingName from '../../../components/dashboard/table/HoverListingName';
import {changeDateFormat} from 'utils/formatDate';
import HoverText from 'ui-lib/ui-lib.components/hoverOnText/hoverOnText';

const View = ({refetch, requestId, roles, row}) => {
  const assign = useDisclosure();
  const toTeamMember = useDisclosure();
  const [expand, setExpand] = useState(false);

  const [customer, setCustomer] = useState([]);
  const request = {
    label: 'supervisor_update',
    labelInfo: true,
  };

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
      const monthName = date.toLocaleString('en-US', {month: 'short'});
      const dateFormatted = `${monthName} ${dayOfMonth}, ${time}`;
      return customerInfo.push({
        label: 'Date',
        labelInfo: changeDateFormat(isoString, 'add_time').replace('|', ' '),
      });
      // return customerInfo.push({label: 'Time', labelInfo: time});
    }
    customerInfo.push({
      label: 'profile',
      labelInfo: {
        image: row?.customer?.avatar,
        name: `${row?.customer?.first_name} ${row?.customer?.last_name} `,
      },
    });

    customerInfo.push({label: 'Phone number', labelInfo: row?.customer?.phone ?? '-'});
    // formatDateTime(row?.time);
    customerInfo.push({
      label: 'Date',
      labelInfo: row?.time,
    });
    customerInfo.push({label: 'Listing name', labelInfo: row?.project});
    customerInfo.push({
      label: 'Inspection type',
      labelInfo: row?.tour_method?.replace('-', ' ').toLowerCase(),
    });
    customerInfo.push({
      label: 'Approved By',
      labelInfo: `${row?.approved_by?.first_name ?? '-'} ${row?.approved_by?.last_name ?? '-'} `,
    });

    setCustomer(customerInfo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [row]);

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
        onClick={assign.onOpen}
        mt="0"
        type="button"
        border="1px solid #4545FE"
        notes
        bg="trnasparent"
        color="#4545FE"
        fontSize="14px"
        fontWeight="500"
        borderRadius="8.87px"
        w="80px"
        h="30px"
      >
        View
      </Button>
      <Popup2
        overLayStyle={{background: 'rgba(0, 0, 0, 0.2)'}}
        mt="15vh"
        isOpen={assign.isOpen}
        py="28.8px"
        px="19.2px"
        minW="800px"
        maxW="800px"
        onClose={assign.onClose}
        scrollBehavior={'outside'}
      >
        <Heading fontSize="24px" fontWeight="700" color="#191919">
          Inspection Details
        </Heading>
        <Popup2.Body mt="20.7px" mb="0px" pr="0">
          <VStack w="full" h="full" spacing="19.2px">
            <VStack w="full" spacing="11.3px">
              <Heading as="h2" w="full" textAlign="start" fontSize="16px" fontWeight={500}>
                {"Client's Details"}
              </Heading>
              <HStack
                w="full"
                border="1px solid #CBCBCB"
                borderRadius="9.6px"
                h="112px"
                spacing="26px"
                pl="16.8px"
                pr="15.2px"
                py="16px"
                pb="17px"
                justify="space-between"
              >
                <HStack spacing="8px">
                  <Image
                    src={customer[0]?.labelInfo?.image ?? avatar.src}
                    boxSize="36px"
                    objectFit="cover"
                    borderRadius="full"
                    alt="customer image"
                  />
                  <Text textTransform="capitalize" as="span" fontSize="14px" fontWeight="600">
                    {customer[0]?.labelInfo?.name}
                  </Text>
                </HStack>

                <HStack justify="space-around" w="full" spacing="20px" align="flex-start">
                  {customer.map((item, idx) => {
                    if (item.label === 'profile') {
                      return null;
                    }
                    return (
                      <VStack key={idx} spacing={'9.6px'} alignSelf="flex-start" align="start">
                        <Heading as="h3" fontSize="12px" color="#606060" fontWeight="400">
                          {item.label}
                        </Heading>
                        {item.label === 'Inspection type' ? (
                          <Tag
                            px="10.4px"
                            h="28.8px"
                            mt="-6.4px"
                            fontSize="12px"
                            fontWeight="500"
                            alignSelf="center"
                            bg={color[item.labelInfo]?.bg}
                            color={color[item.labelInfo]?.color}
                            borderRadius="48px"
                          >
                            <TagLabel textTransform="capitalize" noOfLines={1} mx="auto">
                              {color[item.labelInfo]?.text}
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
                        ) : item.label === 'Approved By' ? (
                          <HoverText
                            pContentStyle={{mr: '10px'}}
                            lens={10}
                            text={item.labelInfo}
                            fontSize="12px"
                            fontWeight="500"
                            color="#191919"
                          />
                        ) : (
                          <Text as="span" color="#191919" fontSize="12px" fontWeight="500">
                            {item.labelInfo}
                          </Text>
                        )}
                      </VStack>
                    );
                  })}
                </HStack>
              </HStack>
            </VStack>
            <VStack w="full" spacing="12.2px">
              <Heading as="h2" w="full" textAlign="start" fontSize="16px" fontWeight="500">
                {"Assignee's Details"}
              </Heading>
              <VStack
                w="full"
                border="1px solid #E4E4E4"
                spacing="16.4px"
                borderRadius="9.6px"
                p="14.4px 12.8px 19.4px 20px"
              >
                <HStack w="full" spacing="8.8px" justify="flex-start">
                  <Image
                    src={row?.supervisor_avatar || row?.assigned_to?.avatar || avatar.src}
                    alt="assignee image"
                    objectFit="cover"
                    bg="#fff"
                    boxSize="51.2px"
                    borderRadius="full"
                  />
                  <Stack spacing="5.561px">
                    <Text
                      fontSize="18px"
                      fontWeight="600"
                      color="#191919"
                      textTransform="capitalize"
                    >
                      {row?.supervisor_full_name ??
                        `${row?.assigned_to?.first_name ?? '-'} ${
                          row?.assigned_to?.last_name ?? '-'
                        }`}
                    </Text>
                    <Text fontSize="12.711px" fontWeight="400" color="#4545FE">
                      {row?.supervisor_email ?? row?.assigned_to?.email ?? '-'}
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
                      as="p"
                      textAlign="start"
                      fontSize="9.533px"
                      fontWeight="300"
                      color="#191919"
                    >
                      {/* {modalInfo.notes} */}
                      {expand
                        ? row?.supervisor_notes
                        : row?.supervisor_notes?.length <= 350
                          ? row?.supervisor_notes
                          : `${(row?.supervisor_notes ?? '')?.slice(0, 350)}`}
                      <Text
                        fontSize="8px"
                        cursor="pointer"
                        fontWeight="300"
                        color="#606060"
                        as="span"
                        onClick={() => setExpand(!expand)}
                      >
                        {row?.supervisor_notes?.length <= 350
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

            <HStack justify="flex-end" spacing="14px" w="full">
              <AssignToSomeelse
                history
                request={request}
                roles={roles}
                requestId={requestId}
                customerInfo={customer}
                assign={assign}
                toTeamMember={toTeamMember}
                refetch={refetch}
              />
              <MatadorCustomDatePicker history refetch={refetch} id={requestId} />
            </HStack>
          </VStack>
        </Popup2.Body>
      </Popup2>
    </>
  );
};

export default View;

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
