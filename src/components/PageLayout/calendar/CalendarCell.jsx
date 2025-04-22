import {Td} from '@chakra-ui/react';
import moment from 'moment';
import {useState} from 'react';
import {monthDayYear} from 'utils/formatDate';

export const CalendarCell = ({handle_click, day, index, cell_date, current_month, same_month}) => {
  const [todaysDate] = useState(monthDayYear(Date.now()));
  const short_months = moment.monthsShort();

  return (
    <Td
      border={'0.474px solid #242424'}
      height={'91px'}
      padding={'5px'}
      textAlign={'left'}
      textTransform={'uppercase'}
      fontSize={'9px'}
      color={!same_month ? 'rgba(187, 187, 187, 0.60)' : '#969696'}
      fontWeight={'500'}
      cursor={'pointer'}
      fontFamily={'Inter'}
      onClick={handle_click}
    >
      <span style={{display: 'flex', flex: '1', height: '100%'}}>
        <span
          style={
            cell_date === todaysDate && same_month
              ? {
                  backgroundColor: '#2525E6',
                  padding: '0px 8px',
                  borderRadius: '200px',
                  height: 'max-content',
                  color: 'white',
                }
              : {}
          }
        >
          {day == 1 && index !== 0 && current_month == 11
            ? short_months[0]
            : day == 1 && index !== 0
            ? short_months[current_month + 1]
            : ''}{' '}
          {parseInt(day) || day}
        </span>
      </span>
    </Td>
  );
};

export default CalendarCell;
