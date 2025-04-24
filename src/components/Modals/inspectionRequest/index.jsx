import React, {useEffect, useMemo, useState} from 'react';

import AssignToExternalMembers from './screens/assignToExternalMembers';
import Summary from './screens/summary';
import {
  Box,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  HStack,
  Image,
  Modal,
  ModalContent,
  ModalOverlay,
  Text,
  useMediaQuery,
  VStack,
} from '@chakra-ui/react';
import {MatadorCustomDatePicker} from '@/components/common/Calendar/DatePicker';
import AssignToTeamMembers from './screens/assignToTeamMembers';
import {Button} from 'ui-lib';
import {ArrowBackIcon, CloseIcon} from '@chakra-ui/icons';
import {loggedinUserStatic} from 'apis/requests';

const InspectionApprovalAndRescheduling = ({
  children,
  row,
  roles,
  modalDisclosure,
  history,
  refetch,
  requestId,

  defaultScreen = 'assignToTeamMember',
}) => {
  const [screen, setScreen] = useState(defaultScreen);
  const [customerInfo, setCustomer] = useState([]);
  const [forExternal, setIsExternal] = useState(false);
  const [proceed, setProceed] = useState(false);
  const [summaryInfo, setSummaryInfo] = useState({});
  const [rescheduledDate, setRescheduledDate] = useState(null);
  const [isShortScreenHeight] = useMediaQuery('(max-height: 740px)');

  const handleDateSelection = value => {
    setRescheduledDate(value);

    setScreen('assignToTeamMember');
    modalDisclosure.onOpen();
  };

  const handleScreen = screen => {
    let scrn = screen;
    if (screen === 'summaryForExternalMember') {
      setIsExternal(true);
      setProceed(false);
      scrn = 'summary';
    } else if (screen === 'summaryForHistoryonExternalMember') {
      setIsExternal(true);
      setProceed(true);
      scrn = 'summary';
    } else if (screen === 'summaryForHistory') {
      setIsExternal(false);
      setProceed(true);
      scrn = 'summary';
    } else if (screen === 'summary') {
      setIsExternal(false);
      setProceed(false);
      scrn = 'summary';
    }

    setScreen(scrn);
  };

  useEffect(() => {
    if (rescheduledDate) {
      const filteredCustomerInfo = customerInfo.filter(item => item.label !== 'Date');

      const Date = rescheduledDate?.time;
      const newCustomerArray = [...filteredCustomerInfo, {label: 'Date', labelInfo: Date}];

      setCustomer(newCustomerArray);
    }
  }, [rescheduledDate]);

  const handleClose = () => {
    setRescheduledDate(null);
    setScreen(defaultScreen);
    modalDisclosure.onClose();
    setIsExternal(false);
    setProceed(false);
    setCustomer(prepareCustomerInfo(row, history));

    if (history) {
      setSummaryInfo(prepareSummaryInfo(row));
    } else {
      setSummaryInfo({});
    }
  };

  useEffect(() => {
    if (history) {
      setSummaryInfo(prepareSummaryInfo(row));
    }
  }, [row, history]);

  useEffect(() => {
    setCustomer(prepareCustomerInfo(row, history));
  }, [row, history]);

  const prepareSummaryInfo = row => ({
    img: row?.supervisor_avatar || row?.assigned_to?.avatar,
    full_name:
      row?.supervisor_full_name ??
      `${row?.assigned_to?.first_name ?? '-'} ${row?.assigned_to?.last_name ?? '-'}`,
    email: row?.supervisor_email ?? row?.assigned_to?.email ?? '-',
    note: row?.supervisor_notes,
  });

  const prepareCustomerInfo = (row, history) => {
    const customer = [];

    customer.push({
      label: 'profile',
      labelInfo: {
        image: row?.customer?.avatar,
        name: `${row?.customer?.first_name} ${row?.customer?.last_name}`,
      },
    });
    customer.push({label: 'Phone number', labelInfo: row?.customer?.phone ?? '-'});
    customer.push({label: 'Date', labelInfo: row?.time});
    customer.push({label: 'Listing name', labelInfo: row?.project});
    customer.push({
      label: 'Inspection type',
      labelInfo: row?.tour_method?.replace('-', ' ').toLowerCase(),
    });

    if (history) {
      customer.push({
        label: 'Approved By',
        labelInfo: `${row?.approved_by?.first_name ?? '-'} ${row?.approved_by?.last_name ?? '-'} `,
      });
    }

    return customer;
  };

  const displayRequestApprovalScreens = scrn => {
    switch (scrn) {
      case 'assignToTeamMember':
        return (
          <AssignToTeamMembers
            handleScreen={handleScreen}
            roles={roles}
            history={history}
            setSummaryInfo={setSummaryInfo}
          />
        );

      case 'assignToExternalMember':
        return (
          <AssignToExternalMembers
            history={history}
            setSummaryInfo={setSummaryInfo}
            handleScreen={handleScreen}
          />
        );

      case 'summary':
        return (
          <Summary
            customerInfo={customerInfo}
            history={history}
            timeZone={row?.timezone}
            refetch={refetch}
            requestId={requestId}
            handleClose={handleClose}
            proceed={proceed}
            forExternal={forExternal}
            handleScreen={handleScreen}
            rescheduledDate={rescheduledDate}
            handleDateSelection={handleDateSelection}
            summaryInfo={summaryInfo}
          />
        );

      default:
        return (
          <AssignToTeamMembers
            handleScreen={handleScreen}
            roles={roles}
            history={history}
            setSummaryInfo={setSummaryInfo}
          />
        );
    }
  };

  const dummyRequest = [
    {key: 'Request Date', value: '15 Apr, 2025'},
    {key: 'Payment Type', value: '3 Months'},
    {key: 'Amount', value: '$420', decimal: '.80'},
    {key: 'Monthly Payment', value: '$140', decimal: '.29'},
  ];

  return (
    <>
      {children || (
        <HStack spacing="8px" h="40px">
          <Button
            mt={0}
            w="80px"
            h="40px"
            py="0px"
            variant="primary"
            bg="transparent"
            onClick={modalDisclosure.onOpen}
            border="1px  solid #E4E4E7"
            color="#27272A"
            borderRadius="72px"
            fontSize="14px"
            fontWeight="400"
            _hover={{
              opacity: '1',
            }}
          >
            View
          </Button>
          {/* <Box boxSize="4px" borderRadius="full" bg="#D9D9D9" />

          <MatadorCustomDatePicker
            timeZone={row?.timezone}
            handleDateSelection={handleDateSelection}
          /> */}
        </HStack>
      )}
      <Drawer
        motionPreset="scale"
        isOpen={modalDisclosure.isOpen}
        onClose={handleClose}
        isCentered
        scrollBehavior="inside"
      >
        {' '}
        <DrawerOverlay bg="rgba(0,0,0,0.2)" />
        <DrawerContent pt="64px" w="100%" minW="400px">
          <HStack
            py="12px"
            px="20px"
            justify={'space-between'}
            borderBottom={'0.5px solid #E4E4E7'}
          >
            <HStack spacing={'12px'}>
              <ArrowBackIcon onClick={modalDisclosure.onClose} cursor={'pointer'} fontSize={25} />
              <Text
                color={'#18181B'}
                fontSize="16px"
                fontWeight="600"
                lineHeight="140%"
                letterSpacing="0.16px"
              >
                Request Details
              </Text>
            </HStack>
            <CloseIcon onClick={modalDisclosure.onClose} cursor={'pointer'} fontSize={18} />
          </HStack>
          <Box px="20px" w="full" mt="20px">
            <Box border={'0.5px solid #E4E4E7'} p="16px" bg="#FAFAFA" borderRadius={'4px'}>
              <HStack spacing={'8px'}>
                <Image borderRadius={'full'} boxSize="24px" src={loggedinUserStatic.avatar} />
                <Text
                  color={'#18181B'}
                  fontSize="11px"
                  fontWeight="500"
                  lineHeight="150%"
                  letterSpacing="0.33px"
                >
                  John Smith
                </Text>
              </HStack>
              <Text
                mt="8px"
                color={'#52525B'}
                fontSize="11px"
                fontWeight="500"
                lineHeight="150%"
                letterSpacing="0.33px"
              >
                12-B/Maple Glen
              </Text>
            </Box>
            <VStack
              align={'stretch'}
              spacing={'14px'}
              mt="16px"
              border={'0.5px solid #E4E4E7'}
              p="12px"
              bg="#FAFAFA"
              borderRadius={'4px'}
            >
              {dummyRequest.map(request => (
                <HStack spacing={'8px'} justify={'space-between'}>
                  <Text
                    color={'#424242'}
                    fontSize="13px"
                    fontWeight="500"
                    lineHeight="150%"
                    letterSpacing="0.26px"
                  >
                    {request.key}
                  </Text>
                  <Text
                    color={'#27272A'}
                    fontSize="16px"
                    fontWeight="500"
                    lineHeight="150%"
                    letterSpacing="0.16px"
                  >
                    {request.value}
                    <Text as="span" color={'#A3A3A3'}>
                      {request?.decimal}
                    </Text>
                  </Text>
                </HStack>
              ))}
            </VStack>

            <Box
              mt="16px"
              border={'0.5px solid #E4E4E7'}
              py="10px"
              px="16px"
              bg="#FAFAFA"
              borderRadius={'4px'}
            >
              <Text
                color={'#18181B'}
                fontSize="11px"
                fontWeight="500"
                lineHeight="150%"
                letterSpacing="0.33px"
              >
                Request Reason
              </Text>
              <Text
                mt="8px"
                color={'#52525B'}
                fontSize="11px"
                fontWeight="500"
                lineHeight="150%"
                letterSpacing="0.33px"
              >
                Job hours.
              </Text>
            </Box>
          </Box>
          {/* {displayRequestApprovalScreens(screen)} */}
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default InspectionApprovalAndRescheduling;
