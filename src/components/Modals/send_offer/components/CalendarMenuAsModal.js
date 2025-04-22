import {
  Button,
  HStack,
  Heading,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from '@emotion/styled';

import calendarIcon from '/src/images/icons/calendarIconForCreateStore.svg';

import {useState} from 'react';
import {changeDateFormat} from 'utils/formatDate';

export const CalenderMenuAsModal = ({
  handleSelectedDate,
  datePickerObj,
  mainDate,
  headerText,
  btnStyle,
  imageStyles,
  btnTextStyle,
  menuBtnStyle,
}) => {
  const [startDate, setStartDate] = useState(new Date());
  const presentDay = new Date();

  const ShowCalendar = useDisclosure();
  const dateMenuDisclosure = useDisclosure();

  const filterPassedTime = time => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };

  const selectDate = date => {
    setStartDate(date);
    handleSelectedDate(date);
    dateMenuDisclosure.onClose();
  };

  return (
    <>
      <Button
        _hover={{
          bg: 'transparent',
          opacity: '1',
          p: '0px',
        }}
        _focus={{
          bg: 'transparent',
          opacity: '1',
          p: '0px',
        }}
        _active={{
          bg: 'transparent',
          opacity: '1',
          p: '0px',
        }}
        bg="transparent"
        w="full"
        p="0px"
        h="full"
        onClick={e => (e.preventDefault(), dateMenuDisclosure.onOpen())}
        {...menuBtnStyle}
      >
        <HStack
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
          <Text fontSize="14px" color="#606060" fontWeight="400" {...btnTextStyle}>
            {mainDate ? changeDateFormat(mainDate) : headerText || 'Select Date'}
          </Text>
          <Image alt="calendar Icon" src={calendarIcon.src} {...imageStyles} />
        </HStack>
      </Button>
      <Modal
        isOpen={dateMenuDisclosure.isOpen}
        onClose={dateMenuDisclosure.onClose}
        // closeOnSelect={false}
        // flip={false}
        // autoSelect={false}

        position="relative"
        isCentered
      >
        <ModalOverlay zIndex={9999} bg="rgba(0,0,0,0.1)">
          <ModalContent w={`max-content`} borderRadius={`10px`}>
            <HStack px="17px" pt="15px" w="full" justify="space-between">
              <Heading
                // mb="5.18px"
                color="#191919"
                fontSize="10.423px"
                fontWeight="400"
              >
                {headerText || ' Select Date'}
              </Heading>
              <ModalCloseButton position="initial" fontSize="10px" p="5px" />
            </HStack>
            <ModalBody padding={`15px 17px`} pt="5.18px">
              {/* <MenuItem
            _hover={{bg: 'transparent'}}
            _focus={{bg: 'transparent'}}
            p="10px"
            w="fit-content"
          > */}
              <Stack>
                {/* <Heading mb="5.18px" color="#191919" fontSize="10.423px" fontWeight="400">
                  {headerText || ' Select Date'}
                </Heading> */}

                <Wrap>
                  <DatePicker
                    inline
                    showTimeSelect
                    minDate={presentDay}
                    selected={startDate}
                    portalId="root-portal"
                    filterTime={filterPassedTime}
                    dateFormat="MMMM d, yyyy h:mm aa"
                    // onChange={date => setStartDate(date)}
                    onChange={selectDate}
                    {...datePickerObj}
                  />
                </Wrap>
                {/* <HStack w="full" justify="center">
                  <Button
                    onClick={() => (handleSelectedDate(startDate), dateMenuDisclosure.onClose())}
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
                    w="100%"
                  >
                    Set
                  </Button>
                </HStack> */}
              </Stack>
            </ModalBody>
            {/* </MenuItem> */}
          </ModalContent>
        </ModalOverlay>
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
      background-color: #f0f0f0;
    }
  }
  .react-datepicker__day--today {
    border-radius: 100%;
    color: #000;
    background: transparent;
  }
  .react-datepicker__day--selected {
    width: 25px;
    height: 25px;
    color: #fff;
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
