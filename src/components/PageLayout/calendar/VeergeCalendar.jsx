//prettier-ignore
import {
  Box, Drawer, DrawerBody, DrawerCloseButton,DrawerContent, 
  DrawerFooter, DrawerHeader, DrawerOverlay, Flex, Image, 
  Table,Tbody, Td, Text, Th,Thead, Tr, useDisclosure,
} from '@chakra-ui/react';
import back_arrow from '/src/images/icons/Iconly/Sharp/Arrow - Right.svg';
import {useRef, useState} from 'react';
import moment from 'moment';
import CalendarDateActivities from './CalendarDateActivites';
import arrow_left from '/src/images/icons/calendar_activity_icons/arrow-left.svg';
import arrow_right from '/src/images/icons/calendar_activity_icons/arrow-right.svg';
import VeergeCalendarIcon from './VeergeCalendarIcon';
import {monthDayYear} from 'utils/formatDate';
import CalendarCell from './CalendarCell';

export const VeergeCalendar = ({item, isPending}) => {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [date, setDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const btnRef = useRef();
  const weekdayshort = moment.weekdaysShort();
  // getting all months
  const months = moment.months();

  let weekdayshortname = weekdayshort.map(day => {
    return (
      <Th
        key={day}
        border={'0.474px solid #242424'}
        padding={'5px'}
        textAlign={'left'}
        fontSize={'9px'}
        color={'rgba(187, 187, 187, 0.60)'}
        fontWeight={'500'}
      >
        {day}
      </Th>
    );
  });

  const click_on_day = (day, week_index) => {
    let curr_mo = currentMonth;
    //check if we are in the first week
    if (week_index == 0 && day >= 10) {
      if (curr_mo == 0) {
        setDate(`${day}-12-${currentYear - 1}`);
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setDate(`${day}-${curr_mo}-${currentYear}`);
        setCurrentMonth(currentMonth - 1);
      }
    }
    //then check to see if we are towards the end of the month and the date is a small number
    else if (week_index > 3 && day < 20) {
      if (curr_mo == 11) {
        setDate(`${day}-1-${currentYear + 1}`);
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setDate(`${day}-${currentMonth + 2}-${currentYear}`);
        setCurrentMonth(currentMonth + 1);
      }
    }
    //else proceed as normal
    else {
      setDate(`${day}-${currentMonth + 1}-${currentYear}`);
    }
  };

  //function to get all days by week
  const get_dates = () => {
    var calendar = [];
    const startDate = moment([currentYear, currentMonth]).clone().startOf('month').startOf('week');
    const endDate = moment([currentYear, currentMonth]).clone().endOf('month');
    const day = startDate.clone().subtract(1, 'day');

    // looping a month by a week
    while (day.isBefore(endDate, 'day')) {
      calendar.push(
        Array(7)
          .fill(0)
          .map(() => day.add(1, 'day').clone().format('DD'))
      );
    }

    if (calendar.length > 0) {
      return calendar.map((week, index) => (
        <Tr key={index} display={'grid'} gridTemplateColumns={'repeat(7, 1fr)'}>
          {week.map((day, day_index) => {
            let same_month = (index == 0 && day >= 10) || (index > 3 && day < 20) ? false : true;
            let cell_year = currentYear;
            let cell_month = currentMonth + 1;
            // let cell_month = index == 0 && day >= 10 ? currentMonth :index > 3 && day < 20 ?currentMonth + 2: currentMonth + 1;
            const cell_date = monthDayYear(`${cell_year}/${cell_month}/${day}`);
            return (
              <CalendarCell
                key={day}
                day={day}
                cell_date={cell_date}
                handle_click={() => click_on_day(day, index)}
                current_month={currentMonth}
                index={index}
                same_month={same_month}
              />
            );
          })}
        </Tr>
      ));
    }
  };

  const go_back = () => {
    if (date) setDate(null);
    else onClose();
  };

  const next_month = () => {
    if (currentMonth == 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const previous_month = () => {
    if (currentMonth == 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const format_this_date = date_to_format => {
    return `${new Date(
      `${date_to_format.split('-')[2]}-${parseInt(date_to_format.split('-')[1]).toLocaleString(
        'en-US',
        {
          minimumIntegerDigits: 2,
        }
      )}-${parseInt(date_to_format.split('-')[0]).toLocaleString('en-US', {
        minimumIntegerDigits: 2,
      })}`
    ).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    })}${
      date_to_format.split('-')[0].endsWith('1') && date_to_format.split('-')[0] != '11'
        ? 'st'
        : date_to_format.split('-')[0].endsWith('2') && date_to_format.split('-')[0] != '12'
          ? 'nd'
          : date_to_format.split('-')[0].endsWith('3') && date_to_format.split('-')[0] != '13'
            ? 'rd'
            : 'th'
    }`;
  };

  return (
    <>
      <VeergeCalendarIcon isPending={isPending} btnRef={btnRef} onOpen={onOpen} item={item} />
      <>
        <Drawer
          isOpen={isOpen}
          placement="right"
          onClose={onClose}
          finalFocusRef={btnRef}
          size={'sm'}
        >
          <DrawerOverlay />
          <DrawerContent fontSize={'16px'} backgroundColor={'#0D0D0D'} color={'white'}>
            <DrawerHeader
              backgroundColor={'#171717'}
              padding={' 75px 23px 13px'}
              fontSize={'16px'}
              color={'white'}
              display={'flex'}
              gap={'8px'}
            >
              <Image
                objectFit={'cover'}
                cursor={'pointer'}
                src={back_arrow.src}
                alt="menu_icon"
                onClick={go_back}
              />
              <Text>{date ? format_this_date(date) : 'Calendar'}</Text>
            </DrawerHeader>
            <DrawerCloseButton padding={'20px'} paddingTop={'80px'} />
            <DrawerBody padding={'20px 0px'}>
              {!date ? (
                <Box padding={'0px 25px'}>
                  <Flex justify={'center'} align={'center'} gap={'30px'} mb={'25px'}>
                    <Image
                      src={arrow_left.src}
                      alt={'Back Arrow'}
                      height={'24px'}
                      width={'24px'}
                      cursor={'pointer'}
                      onClick={previous_month}
                      userSelect={'none'}
                    />
                    <Text fontWeight={'600'} fontSize={'16px'} minW={'200px'} textAlign={'center'}>
                      {months[currentMonth]} {currentYear}
                    </Text>
                    <Image
                      src={arrow_right.src}
                      alt={'Front Arrow'}
                      height={'24px'}
                      width={'24px'}
                      cursor={'pointer'}
                      onClick={next_month}
                      userSelect={'none'}
                    />
                  </Flex>
                  <Table padding={'1rem'}>
                    <Thead>
                      <Tr display={'grid'} gridTemplateColumns={'repeat(7, 1fr)'}>
                        {weekdayshortname}
                      </Tr>
                    </Thead>
                    <Tbody>{get_dates()}</Tbody>
                  </Table>
                </Box>
              ) : (
                <CalendarDateActivities date={date} />
              )}
            </DrawerBody>
            <DrawerFooter></DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
    </>
  );
};

export default VeergeCalendar;
