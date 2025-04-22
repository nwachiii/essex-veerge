import React, {useEffect, useMemo, useState} from 'react';

import AssignToExternalMembers from './screens/assignToExternalMembers';
import Summary from './screens/summary';
import {Box, HStack, Modal, ModalContent, ModalOverlay, useMediaQuery} from '@chakra-ui/react';
import {MatadorCustomDatePicker} from '@/components/common/Calendar/DatePicker';
import AssignToTeamMembers from './screens/assignToTeamMembers';
import {Button} from 'ui-lib';

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

  return (
    <>
      {children || (
        <HStack spacing="8px" h="40px">
          <Button
            onClick={modalDisclosure.onOpen}
            mt="0"
            type="button"
            notes
            bg={'#191919'}
            color={'#ffffff'}
            fontSize={'12px'}
            fontWeight={'500'}
            w={'65px'}
            h={'26px'}
            borderRadius={'72px'}
            _hover={{
              opacity: '1',
            }}
          >
            Approve
          </Button>
          <Box boxSize="4px" borderRadius="full" bg="#D9D9D9" />

          <MatadorCustomDatePicker
            timeZone={row?.timezone}
            handleDateSelection={handleDateSelection}
          />
        </HStack>
      )}
      <Modal
        motionPreset="scale"
        isOpen={modalDisclosure.isOpen}
        onClose={handleClose}
        isCentered
        scrollBehavior="inside"
      >
        {' '}
        <ModalOverlay bg="rgba(0,0,0,0.2)" />
        <ModalContent
          borderRadius="16px"
          minW="fit-content"
          w={`100%`}
          minH="fit-content"
          transform={isShortScreenHeight ? 'scale(0.7) !important' : 'none'}
        >
          {displayRequestApprovalScreens(screen)}
        </ModalContent>
      </Modal>
    </>
  );
};

export default InspectionApprovalAndRescheduling;
