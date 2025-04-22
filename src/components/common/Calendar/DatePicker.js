import {
  Box,
  HStack,
  Image,
  Spinner,
  Stack,
  Button as ChakraBtn,
  Text,
  useDisclosure,
  useToast,
  VStack,
  Divider,
} from '@chakra-ui/react';
import React from 'react';
import {useState, forwardRef} from 'react';
import DatePicker from 'react-datepicker';
import {Button, CreateToast, Popup} from '../../../ui-lib/ui-lib.components';
import 'react-datepicker/dist/react-datepicker.css';
import successGif from '/src/images/check-icon.gif';
import {FcCalendar} from 'react-icons/fc';
import calenderIcon from '/src/images/icons/Calendar_request_icon.svg';

import styled from '@emotion/styled';
import TimeComponent from './TimeComponent';
import {useMutation} from '@tanstack/react-query';
import {InspectionRequestResponse} from '../../../apis/requests';
import {toastForError} from '../../../utils/toastForErrors';
import {CloseIcon} from '@/components/assets/closeIcon';
import {format, fromZonedTime, getTimezoneOffset} from 'date-fns-tz';

export const MatadorCustomDatePicker = ({
  handleDateSelection,
  id,
  assignDisclosure,
  timeZone,
  refetch,
  mutation,
  history,
}) => {
  const defaultTime = {time: '09:30 AM', displayTime: '09:30 AM', indicator: 'AM'};

  const ShowCalendar = useDisclosure();
  const RescheduleSuccess = useDisclosure();
  const [time, setTime] = useState(defaultTime);
  const [startDate, setStartDate] = useState(new Date(), 0, 9);
  const toaster = CreateToast();

  const handleClose = () => {
    setStartDate(new Date(), 0, 9);
    setTime(defaultTime);
    return ShowCalendar.onClose();
  };

  const presentDay = new Date();
  const filterPassedTime = time => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };

  // const toast = useToast();
  // const mutation = useMutation(formData => InspectionRequestResponse(id, formData), {
  //   onSuccess: async res => {
  //     ShowCalendar.onClose();
  //     toaster('Reschedule Successful');
  //     history ? null : assignDisclosure.onOpen();
  //     await refetch();
  //     return;
  //   },
  //   onError: err => {
  //     toastForError(err, true, toast);
  //   },
  // });

  const handleRescheduling = () => {
    const HourandMinute = time.time.split(' ')[0].split(':');
    startDate.setUTCHours(HourandMinute[0]);
    startDate.setUTCMinutes(HourandMinute[1]);
    const iso = startDate.toISOString().replace('Z', '');

    // const timezone = 'America/Los_Angeles';
    const utcDate = fromZonedTime(iso, timeZone).toISOString();

    handleDateSelection({
      time: utcDate,
      time_update: true,
    });
    ShowCalendar.onClose();
    // return mutation.mutate({
    //   time: iso,
    //   time_update: true,
    // });
  };

  const formatString = 'OO';
  const offset = `(${format(new Date(), formatString, {timeZone})}, ${timeZone})`;

  return (
    <>
      <Button
        mt={0}
        onClick={ShowCalendar.onOpen}
        variant={'secondary'}
        bg={history ? '#242526' : 'transparent'}
        border={history ? 'none' : '1px solid #a3a3a3'}
        color={history ? '#ffffff' : '#242526'}
        w={history ? '143.7px' : '82px'}
        _hover={{
          opacity: '1',
        }}
        h={history ? '55px' : '26px'}
        fontWeight={!history && '500'}
        borderRadius={'72px'}
        fontSize={!history && '12px'}
        p="0"
        notes
        isLoading={mutation?.isLoading}
      >
        {'Reschedule'}
      </Button>

      <Popup
        h="fit-content"
        forModal={{
          isCentered: false,
        }}
        forBody={{
          sx: customScrollbarStyles,
          pr: '4px',
          w: 'fit-content',
          overflowX: 'hidden',
        }}
        top="0px"
        mt="14vh"
        p="24px"
        width="fit-content"
        minW="319px"
        hideCloseBtn
        isOpen={ShowCalendar.isOpen}
        onClose={handleClose}
      >
        <Popup.Body spacing="none" w="271px" my="0px">
          <HStack mb="16px" justify="space-between" align="flex-Start" spacing="none" w="full">
            <Stack>
              <Text fontSize="15.345px" color="#191919" fontWeight={600}>
                Reschedule Inspection
              </Text>
              <Text fontSize=" 11.509px" color="#606060" fontWeight={400}>
                Select Date and Time {offset}
              </Text>
            </Stack>
            <CloseIcon
              p="3px"
              borderRadius="5px"
              _hover={{bg: 'rgba(0,0,0,0.04)', opacity: '0.8'}}
              transition="0.3s ease-in-out"
              cursor="pointer"
              onClick={ShowCalendar.onClose}
            />
          </HStack>

          <Stack as={Wrap}>
            <DatePicker
              inline
              showTimeSelect
              minDate={presentDay}
              selected={startDate}
              portalId="root-portal"
              filterTime={filterPassedTime}
              dateFormat="MMMM d, yyyy h:mm aa"
              onChange={date => setStartDate(date)}
            />
          </Stack>
          <Divider my="16px" mt="5.51px" border="none" h="0.639px" bg="#F5F5F5" w="241.688px" />
          <TimeComponent setTime={setTime} time={time} />
          <ChakraBtn
            mt="16.46px"
            onClick={handleRescheduling}
            color="#ffffff"
            fontSize="11.509px"
            fontWeight="400"
            mx="auto"
            w="269px"
            height="40px"
            _hover={{
              opacity: 1,
            }}
            _active={{opacity: 1}}
            _focus={{
              opacity: 1,
            }}
            bg="#191919"
            borderRadius="72px"
          >
            {
              // mutation.isLoading ? <Spinner color="whitesmoke" /> :
              'Proceed'
            }
          </ChakraBtn>
        </Popup.Body>
      </Popup>

      {/* Reschedule Success */}
      <Popup
        minW="425px"
        pt="45px"
        pb="15px"
        isOpen={RescheduleSuccess.isOpen}
        onClose={RescheduleSuccess.onClose}
        isCentered
      >
        <Image alt="" src={successGif.src} w="108px" mb="25px" mx="auto" />
        <Text textAlign="center" fontSize="24px" fontWeight={600}>
          Reschedule Successful
        </Text>

        <Popup.Body>
          <Button
            onClick={async () => (await refetch(), RescheduleSuccess.onClose())}
            variant="primary"
            mx="auto"
            w="321px"
            h="55px"
          >
            OK
          </Button>
        </Popup.Body>
      </Popup>
    </>
  );
};

const Wrap = styled.div`
  .react-datepicker {
    border: none;
    // border-bottom: #f5f5f5 solid 1px;
  }
  .react-datepicker__time-container {
    display: none;
  }
  .react-datepicker__month-container {
    max-width: 271px;
    width: 271px;
    display: grid;
    place-items: center;
  }
  .react-datepicker__day-names {
    margin-top: 31.91px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .react-datepicker__day-name {
    max-width: 23.911px;
    margin-top: 0px;
    color: #0d0d0d;
    text-align: center;
    font-family: Montserrat;
    font-size: 10px;
    line-height: 10px;
    font-weight: 500;
  }
  .react-datepicker__month {
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: 15.39px;
    margin-bottom: 0px;
  }
  .react-datepicker__day {
    width: 23.911px;
    line-height: 23.911px;
    color: #191919;
    text-align: center;
    font-family: Montserrat;
    position: relative;
    font-size: 11.956px;
    font-style: normal;
    font-weight: 600;
    border-radius: 100%;
    transition: 0.4s ease-in-out;
  }

  .react-datepicker__day:hover {
    opacity: 0.6;
  }

  .react-datepicker__day--disabled {
    cursor: default;
    color: #cfcfcf;
  }
  .react-datepicker__week {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
  }
  .react-datepicker__day--selected {
    background: #4545fe;
    color: #ffffff;
  }

  .react-datepicker__navigation {
    height: 20px;
    width: 20px;
  }
  .react-datepicker__navigation-icon::before {
    top: 10px;
    border-width: 2px;
    height: 10px;
    border-color: #667085;
    width: 10px;
    border-width: 2px 2px 0 0;
  }

  .react-datepicker__navigation--next--with-time:not(
      .react-datepicker__navigation--next--with-today-button
    ) {
    right: 2px;
    top: 8px;
  }
  .react-datepicker__navigation--previous {
    left: 2px;
    top: 8px;
  }
  .react-datepicker__current-month {
    height: 36px;
    border-radius: 8px;
    margin: 0 auto;
    background: #f8f8f8;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #344054;
    font-family: Euclid Circular B;
    letter-spacing: 1px;
    width: 213px;
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
  }
  .react-datepicker__header {
    background: #ffffff;
    padding: 0px;
    width: 100%;
    height: fit-content;
    max-height: fit-content;
    padding-bottom: 16px;
    border: none;
  }
`;

export const customScrollbarStyles = {
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
    backgroundColor: '#e1e1e1',
    outline: '1px solid slategrey', // You can include this line if needed
  },
};
