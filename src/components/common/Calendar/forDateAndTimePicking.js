import {
  Box,
  Button,
  HStack,
  Heading,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import {Popup} from '../../../ui-lib/ui-lib.components';
import 'react-datepicker/dist/react-datepicker.css';
import styled from '@emotion/styled';

import calendarIcon from '/src/images/icons/calendarIconForCreateStore.svg';
import timeIcon from '/src/images/icons/timeIconforcreateStore.svg';

import {useState} from 'react';
import {changeDateFormat} from '../../../utils/formatDate';

export const CustomSingleDatePicker = ({handleSelectedDate, mainDate, headerText, btnStyle}) => {
  const [startDate, setStartDate] = useState(new Date());
  const presentDay = new Date();

  console.log(new Date(), 0, 9, startDate);
  const ShowCalendar = useDisclosure();

  const filterPassedTime = time => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };

  return (
    <>
      <HStack
        onClick={ShowCalendar.onOpen}
        h="50px"
        cursor="pointer"
        w="321px"
        pl="17px"
        justify="space-between"
        pr="11px"
        borderRadius="8px"
        border="solid 1px #E4E4E4"
        {...btnStyle}
      >
        <Text fontSize="14px" color="#606060" fontWeight="400">
          {mainDate ? changeDateFormat(mainDate) : headerText || 'Select Date'}
        </Text>
        <Image alt="calendar Icon" src={calendarIcon.src} />
      </HStack>
      {/* Initial Calendar screen */}
      <Modal
        p="0"
        motionPreset="slideInBottom"
        isCentered={false}
        top="60px"
        overflow="scroll"
        // minW="327.4px"
        isOpen={ShowCalendar.isOpen}
        onClose={ShowCalendar.onClose}
      >
        <ModalOverlay />
        <ModalContent
          pt="14.8px"
          pb="31.9px"
          px="16.91px"
          mt="25vh"
          minW="fit-content"
          w="fit-content"
          borderRadius="16px"
        >
          <ModalCloseButton
            _hover={{
              opacity: '0.7',
              background: 'transparent',
            }}
            top="10.6"
            right="16.9px"
            w="16px"
            h="16px"
          />

          <ModalBody p="0" w="fit-content">
            <Heading mb="5.18px" color="#191919" fontSize="10.423px" fontWeight="400">
              {headerText || ' Select Date'}
            </Heading>

            <Wrap>
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
            </Wrap>
            <HStack w="full" justify="center">
              <Button
                onClick={() => (handleSelectedDate(startDate), ShowCalendar.onClose())}
                m="0 auto"
                bg="#191919"
                fontSize="12px"
                fontWeight="400"
                h="31.785px"
                py="9.39px"
                color="#ffffff"
                _hover={{
                  opacity: '0.8',
                }}
                borderRadius="7.04px"
                w="243.546px"
              >
                Set
              </Button>
            </HStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

const Wrap = styled.div`
  .react-datepicker {
    border: none;
    border-bottom: #f5f5f5 solid 1px;
  }
  .react-datepicker__time-container {
    display: none;
  }
  .react-datepicker__month-container {
    max-width: 250.723px;
    width: 300px;
  }

  .react-datepicker__day-names {
    width: 214px;
    margin: 0 auto;
  }

  .react-datepicker__day-name {
    // width: calc(100% / 8);
    font-size: 7px;
    width: 25px;
    height: 25px;
    font-weight: 500;
  }
  .react-datepicker__month {
    display: flex;
    flex-direction: column;
    width: 210px;
    margin: 0 auto;
  }
  .react-datepicker__day {
    width: calc(100% / 8);
    font-size: 9.26px;
    font-weight: 600;
    width: 25px;
    height: 25px;
    transition: 0.3s ease-in-out;
    :hover {
      width: 25px;
      height: 25px;
      border-radius: 100%;
    }
  }
  .react-datepicker__day--selected {
    width: 25px;
    height: 25px;
    border-radius: 100%;
    background: #12d8a0;
  }
  .react-datepicker__navigation--next--with-time:not(
      .react-datepicker__navigation--next--with-today-button
    ) {
    right: 2px;
    top: 14.98px;
  }

  .react-datepicker__navigation-icon--previous::before,
  .react-datepicker__navigation-icon--next::before {
    border-color: #ffffff;
  }
  .react-datepicker__navigation--previous {
    left: 2px;
    top: 14.98px;
  }
  .react-datepicker__current-month {
    position: relative;
    // height: 81px;
    height: 46.9px;
    border-radius: 7px;
    // margin: 0 auto;
    background: #4545fe;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    font-family: Euclid Circular B;
    font-size: 11.581px;
    font-weight: 700;
    letter-spacing: 1px;
    width: 100%;
  }
  .react-datepicker__header {
    background: #ffffff;
    border: none;
    padding-top: 0;
  }
`;

export const SelectTime = ({setTime, time, suffix, setSuffix}) => {
  const timeSlots = {
    AM: [
      '09:00',
      '09:15',
      '09:30',
      '09:45',
      '10:00',
      '10:15',
      '10:30',
      '10:45',
      '11:00',
      '11:15',
      '11:30',
      '11:45',
    ],
    PM: [
      '12:00',
      '12:15',
      '12:30',
      '12:45',
      '01:00',
      '01:15',
      '01:30',
      '01:45',
      '02:00',
      '02:15',
      '02:30',
      '02:45',
      '03:00',
      '03:15',
      '03:30',
      '03:45',
      '04:00',
      '04:15',
      '04:30',
      '04:45',
      '05:00',
      '05:15',
      '05:30',
      '05:45',
      '06:00',
    ],
  };
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
      backgroundColor: '#000',
      // outline: "1px solid slategrey", // You can include this line if needed
    },
  };
  return (
    <Menu autoSelect={false} placement="bottom-start">
      <MenuButton
        as={Button}
        _hover={{opacity: '1'}}
        bg="transparent"
        px="0"
        h="full"
        _active={{
          background: 'transparent',
          opacity: '0.4',
        }}
      >
        <HStack
          h="50px"
          justify="space-between"
          pl="17px"
          pr="11px"
          borderRadius="8px"
          border="solid 1px #E4E4E4"
        >
          <Text fontSize="14px" color={time ? '#000000' : '#606060'} fontWeight="400">
            {time ? `${time} ${suffix}` : 'Select Time'}
          </Text>
          <Image alt="calendar Icon" src={timeIcon.src} />
        </HStack>
      </MenuButton>
      <MenuList
        boxShadow="4px 4px 8px 0px rgba(123, 157, 157, 0.15), -4px -4px 8px 0px rgba(123, 157, 157, 0.15)"
        borderColor="transparent"
        borderRadius="0px"
        py="0"
        minW="80px"
      >
        <HStack spacing="8px" pt="11px" pb="10px" pr="5px" align="start">
          <VStack sx={customScrollbarStyles} h="138px" spacing="15px" overflowY="scroll">
            {timeSlots[suffix].map((item, idx) => (
              <MenuItem py="0" key={idx} onClick={() => setTime(item)}>
                <Text w="full" fontSize="14px" fontWeight="400" color="#000000">
                  {item}
                </Text>
              </MenuItem>
            ))}
          </VStack>
          <VStack
            w="33px"
            h="57px"
            spacing="none"
            border="0.3px solid var(--semi-grey, #919191)"
            borderRadius="4px"
          >
            <HStack
              borderBottom="0.3px solid #919191"
              align="center"
              w="full"
              h="full"
              justify="center"
              cursor="pointer"
              bg={suffix === 'AM' ? 'rgba(69, 69, 254, 0.1)' : null}
              onClick={() => setSuffix('AM')}
            >
              <Text fontSize="14px" fontWeight="400">
                AM
              </Text>
            </HStack>
            <HStack
              cursor="pointer"
              justify="center"
              align="center"
              w="full"
              h="full"
              bg={suffix === 'PM' ? 'rgba(69, 69, 254, 0.1)' : null}
              onClick={() => setSuffix('PM')}
            >
              <Text fontSize="14px" fontWeight="400">
                PM
              </Text>
            </HStack>
          </VStack>
        </HStack>
      </MenuList>
    </Menu>
  );
};
