import {Button, HStack, Heading, Image, MenuItem, Stack} from '@chakra-ui/react';
import React, {useState} from 'react';
import DatePicker from 'react-datepicker';
import styled from '@emotion/styled';
import backIcon from '/src/images/icons/backArrowForDrawer.svg';

export const FilterCalendar = ({handleScreen, selectedDate, setChoosenDate, calendarPurpose}) => {
  const [startDate, setStartDate] = useState(new Date());
  const filterPassedTime = time => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };

  const calendarHeading = {
    to: 'Pick End Date',
    from: 'Pick Start Date',
  };
  return (
    <MenuItem
      _hover={{bg: 'transparent'}}
      _active={{bg: 'transparent'}}
      _focus={{bg: 'transparent'}}
      position="relative"
      borderRadius="12.3px"
      cursor="default"
      px="18.4px"
      pr="21.9px"
      py="14px"
    >
      <Stack>
        <HStack mb="5.18px">
          <Image
            src={backIcon.src}
            onClick={handleScreen('dateRange')}
            cursor="pointer"
            boxSize="14px"
            alt="back arrow"
          />

          <Heading color="#191919" fontSize="12px" fontWeight="400">
            {calendarHeading[calendarPurpose]}
          </Heading>
        </HStack>
        <Wrap>
          <DatePicker
            inline
            showTimeSelect
            minDate={selectedDate.from || null}
            maxDate={selectedDate.to || null}
            selected={startDate}
            portalId="root-portal"
            filterTime={filterPassedTime}
            dateFormat="MMMM d, yyyy h:mm aa"
            onChange={date => setStartDate(date)}
          />
        </Wrap>
        <HStack w="full" justify="center">
          <Button
            onClick={() => setChoosenDate(startDate)}
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
      </Stack>
    </MenuItem>
  );
};

export default FilterCalendar;

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
