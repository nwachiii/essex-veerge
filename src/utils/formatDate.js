import moment from 'moment';
import {format, parseISO} from 'date-fns';
import {formatInTimeZone, format as formatTz} from 'date-fns-tz';

export const formatDate = (date, endInt) => {
  return new Date(date).toDateString().slice(3, endInt ?? -1);
};

export const formatLongDate = str => {
  const [day, month, year] = str?.split('/');

  console.log(day); // 👉️ 22
  console.log(month); // 👉️ 04
  console.log(str, ' '); // 👉️ 2022

  return new Date(+year, month - 1, +day);
  //  date 👉️ Fri Apr 22 2022
};

export const handleDateFormat = str => {
  const date = new Date(str).toDateString().slice(3, 10);
  const year = new Date(str).toDateString().slice(-5);
  const result = date + ',' + year;
  return result;
};
export const handleDateTime = str => {
  const time = new Date(str).toLocaleTimeString();
  return time;
};
//legacy changeDateFormat

// export const changeDateFormat = (string, extra) => {
//   const date = new Date(string);
//   let options = {
//     month: 'short',
//     year: 'numeric',
//   };

//   let addedInfo = '';

//   try {
//     if (extra === 'add_time') {
//       options = {...options, hour: 'numeric', minute: 'numeric', hour12: true};
//     }

//     if (extra === 'monthandyear') {
//       const formatter = new Intl.DateTimeFormat('en-US', options);
//       return formatter.format(date).replace(' ', ', ');
//     }

//     if (extra === 'monthandtime') {
//       const optionset = {
//         month: 'long',
//         day: 'numeric',
//         hour: 'numeric',
//         minute: 'numeric',
//         hour12: true,
//       };

//       const formattedString = new Intl.DateTimeFormat('en-US', optionset).format(date);
//       return formattedString;
//     }

//     if (extra === 'mm/dd/yyyy') {
//       options = {month: '2-digit', day: '2-digit', year: 'numeric'};
//       let convertedDate = date.toLocaleDateString(undefined, options);
//       return convertedDate;
//     }

//     if (extra === 'mm-dd-yyyy') {
//       options = {month: '2-digit', day: '2-digit', year: 'numeric'};
//       let convertedDate = date.toLocaleDateString(undefined, options);
//       return convertedDate?.replaceAll('/', '-');
//     }

//     if (extra === 'yyyy-mm-dd') {
//       const options = {year: 'numeric', month: '2-digit', day: '2-digit'};
//       const formatter = new Intl.DateTimeFormat('en-US', options);
//       const parts = formatter.formatToParts(date);

//       const year = parts.find(part => part.type === 'year').value;
//       const month = parts.find(part => part.type === 'month').value;
//       const day = parts.find(part => part.type === 'day').value;

//       return `${year}-${month}-${day}`;
//     }

//     const formatter = new Intl.DateTimeFormat('en-US', options);
//     const formattedDate = formatter.format(date).replace(',', ' |');

//     const day = date.getDate();
//     const suffix = day > 3 && day < 21 ? 'th' : ['st', 'nd', 'rd'][(day % 10) - 1] || 'th';
//     const formattedDay = day + suffix;

//     let finalFormattedDate = formattedDay + ' ' + formattedDate.replace(' ', ', ');

//     if (extra === 'monthFirst') {
//       return (finalFormattedDate =
//         formattedDate.split(' ')[0] + ' ' + formattedDay + ', ' + formattedDate.split(' ')[1]);
//     }
//     return finalFormattedDate;
//   } catch (err) {
//     return '-';
//   }
// };

const defaultTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone; // Get user's local timezone as default

// export const changeDateFormat = (string, extra, timezone = defaultTimezone) => {
//   try {
//     if (!string) {
//       return '-'; // Handle empty or null input strings gracefully
//     }

//     const date = parseISO(string); // Parse using ISO 8601 format
//     if (isNaN(date.getTime())) {
//       return '-'; // Handle invalid date strings gracefully
//     }

//     const zonedDate =
//       timezone === Intl.DateTimeFormat().resolvedOptions().timeZone
//         ? date
//         : utcToZonedTime(date, timezone);

//     switch (extra) {
//       case 'add_time':
//         return formatTz(zonedDate, 'MMM yyyy, h:mm a', {timeZone: timezone});
//       case 'monthandyear':
//         return formatTz(zonedDate, 'MMM, yyyy', {timeZone: timezone});
//       case 'monthandtime':
//         return formatTz(zonedDate, 'MMMM d, h:mm a', {timeZone: timezone});
//       case 'mm/dd/yyyy':
//         return formatTz(zonedDate, 'MM/dd/yyyy', {timeZone: timezone});
//       case 'mm-dd-yyyy':
//         return formatTz(zonedDate, 'MM-dd-yyyy', {timeZone: timezone});
//       case 'yyyy-mm-dd':
//         return formatTz(zonedDate, 'yyyy-MM-dd', {timeZone: timezone});
//       case 'monthFirst': {
//         const day = zonedDate.getDate();
//         const suffix = day > 3 && day < 21 ? 'th' : ['st', 'nd', 'rd'][(day % 10) - 1] || 'th';
//         return formatTz(zonedDate, `MMM ${day}'${suffix}, yyyy`, {timeZone: timezone}); // using template literals
//       }
//       default: {
//         const day = zonedDate.getDate();
//         const suffix = day > 3 && day < 21 ? 'th' : ['st', 'nd', 'rd'][(day % 10) - 1] || 'th';
//         return formatTz(zonedDate, `d'${suffix} MMM, yyyy`, {timeZone: timezone}); //using template literals
//       }
//     }
//   } catch (err) {
//     console.error('Error formatting date:', err); // Log the error for debugging
//     return '-';
//   }
// };

// revised changeDateFormat
export const changeDateFormat = (string, extra, timezone = defaultTimezone) => {
  try {
    if (!string) {
      return '-';
    }

    const date = new Date(string);
    //  parseISO(string);

    if (isNaN(date.getTime())) {
      return '-';
    }

    // if (string.includes('+')) {
    //   const timezoneOffset = string.slice(string.lastIndexOf('+') + 1);
    //   extractedTimezone = `Etc/GMT${timezoneOffset[0] === '+' ? '-' : '+'}${timezoneOffset.slice(1, 3)}`;
    // }

    let formatString = "d'th' MMM, yyyy"; // Default format
    const getSuffix = () => {
      const day = date.getDate();

      let suffix = 'th';

      if (day === 1 || day === 21 || day === 31) {
        suffix = 'st';
      } else if (day === 2 || day === 22) {
        suffix = 'nd';
      } else if (day === 3 || day === 23) {
        suffix = 'rd';
      }

      return suffix;
    };
    const suffix = getSuffix();
    switch (extra) {
      case 'add_time':
        formatString = 'MMM yyyy, h:mm a';
        break;
      case 'monthandyear':
        formatString = 'MMM, yyyy';
        break;
      case 'monthandtime':
        formatString = 'MMMM d, h:mm a';
        break;
      case 'mm/dd/yyyy':
        formatString = 'MM/dd/yyyy';
        break;
      case 'mm-dd-yyyy':
        formatString = 'MM-dd-yyyy';
        break;
      case 'yyyy-mm-dd':
        formatString = 'yyyy-MM-dd';
        break;
      case 'timeZone offset':
        formatString = 'dd MMM yyyy | hh:mmaaa (OOOO) ';
        break;
      case 'timeZone offset comma':
        formatString = 'dd MMM yyyy, hh:mmaaa (OOOO) ';
        break;
      case 'monthFirst':
        formatString = `MMM d'${suffix}', yyyy`;
        break;
      default:
        formatString = `d'${suffix}' MMM, yyyy`;
        break;
    }

    let formattedDate;

    if (extra === 'timeZone offset comma' || extra === 'timeZone offset') {
      const formatString =
        extra === 'timeZone offset'
          ? 'dd MMM yyyy | hh:mmaaa (OOOO)'
          : 'dd MMM yyyy, hh:mmaaa (OOOO)';
      formattedDate = formatInTimeZone(string, timezone, formatString);

      formattedDate;
    } else if (extra == 'monthandtime') {
      const preFormattedDate = formatTz(date, formatString, {timeZone: timezone}).replace(
        ',',
        ' at'
      );
      formattedDate = preFormattedDate;
    } else {
      formattedDate = formatTz(date, formatString, {timeZone: timezone});
    }

    return formattedDate;
  } catch (err) {
    console.error('Error formatting date:', err);
    return '-';
  }
};

export const formatDateString = value => {
  const numericValue = value.replace(/\D/g, '');
  const month = numericValue.substr(0, 2);
  const day = numericValue.substr(2, 2);
  const year = numericValue.substr(4);

  let formattedDate = `${month}`;

  if (day.length > 0) {
    formattedDate += `/${day}`;
  }

  if (year.length > 0) {
    formattedDate += `/${year}`;
  }

  return formattedDate;
};

export const formatTimeInput = input => {
  const sanitizedInput = input.replace(/\D/g, '');

  const limitedInput = sanitizedInput.slice(0, 4);

  if (!limitedInput) return '';

  let hours = limitedInput.slice(0, 2);
  let minutes = limitedInput.slice(2);

  let formattedTime = `${hours}`;

  if (minutes.length > 0) {
    formattedTime += `:${minutes}`;
  }

  return formattedTime;
};

export const dateOrTimeAgo = (time, extra) => {
  const d = new Date(); // Gets the current time
  const ts = Math.floor(new Date(time).getTime() / 1000);
  const nowTs = Math.floor(d.getTime() / 1000); // getTime() returns milliseconds, and we need seconds, hence the Math.floor and division by 1000
  const seconds = nowTs - ts;

  // more that two days
  if (seconds >= 2 * 24 * 3600) {
    return changeDateFormat(time, extra);
  }
  // a day
  if (seconds > 24 * 3600) {
    return 'yesterday';
  }

  if (seconds > 3600) {
    const h = seconds / 3600;
    return `${Math.floor(h)} hour${h > 1 ? 's' : ''} ago`;
  }

  if (seconds > 60) {
    const m = seconds / 60;
    return `${Math.floor(m)} minute${m >= 2 ? 's' : ''} ago`;
  }
  if (seconds < 60) {
    return `now`;
  }
};

export const formatTimestamp = timestamp => {
  const date = new Date(timestamp);
  const currentDate = new Date();
  const isToday =
    date.getDate() === currentDate.getDate() &&
    date.getMonth() === currentDate.getMonth() &&
    date.getFullYear() === currentDate.getFullYear();

  if (isToday) {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedTime =
      hours >= 12
        ? `${hours % 12 || 12}:${minutes.toString().padStart(2, '0')} PM`
        : `${hours}:${minutes.toString().padStart(2, '0')} AM`;
    return formattedTime;
  } else {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }
};

/* For this date format: June 2nd 2023 */

export const monthDayYear = date => {
  return moment(date).format('MMMM Do YYYY');
};

/* For this time format: 11:47AM  */

export const hourMinute = date => {
  return moment(date).format('h:mmA');
};

/* For this date format: 15-06-2023  */

export const dayMonthYear = date => {
  return moment(date).format('DD-MM-YYYY');
};

/* For this date format: 15-06-2023  */

export const dayMonthYearDashed = date => {
  return moment(date).format('DD/MM/YYYY');
};

/* For dates like this 2023-02-17 */

export const reversedDayMonthYear = dateString => {
  // Parse the input date string using moment
  const parsedDate = moment(dateString);

  // Format the date in the desired format
  const formattedDate = parsedDate.format('YYYY-MM-DD');

  return formattedDate;
};

/* For this date format: 15-06-2023  12:30 */

export const dayMonthYearWithTime = date => {
  return moment(date).format('MMM DD, YYYY | HH:mm A');
};

/* For time like this 15-06-2023 09:27:04 plus 1 hour added to its time */

export const addOneHour = date => {
  return moment(date).add(1, 'hours').format('DD-MM-YYYY h:mmA');
};

export const addOneNoDate = date => {
  return moment(date).add(1, 'hours').format('h:mmA');
};

/* For this time format: 11:47AM  plus 1 hour added to its time */

export const addOneHourToTime = date => {
  return moment(date).add(1, 'hours').format('h:mmA');
};

/* For dates like this Jul 20, 2023 | 08:30 AM */

export const demarcatedDateTime = date => {
  return moment(date).format('MMM DD, YYYY | hh:mm A');
};

export function formatDaysPeriod(timestamp) {
  const now = new Date();
  const date = new Date(timestamp);

  const timeDifference = now - date;
  const seconds = Math.floor(timeDifference / 1000);

  if (seconds < 60) {
    return 'Just now';
  } else if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60);
    return minutes === 1 ? '1 min ago' : `${minutes} mins ago`;
  } else if (seconds < 86400) {
    const hours = Math.floor(seconds / 3600);
    return hours === 1 ? '1 hour ago' : `${hours} hours ago`;
  } else {
    const days = Math.floor(seconds / 86400);
    return days === 1 ? '1 day ago' : `${days} days ago`;
  }
}

/* Date for past continuous */

export const pastContinuous = dateTimeString => {
  const now = moment();
  const inputDate = moment(dateTimeString);

  // If the date is today
  if (now.isSame(inputDate, 'day')) {
    return inputDate.format('HH:mm A');
  }

  // If the date was yesterday
  if (now.isSame(inputDate.clone().subtract(1, 'day'), 'day')) {
    return 'Yesterday';
  }

  // If the date was the day before yesterday
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const inputDayOfWeek = inputDate.format('dddd');
  const daysAgo = now.diff(inputDate, 'days');

  if (daysAgo <= 4 && daysOfWeek.includes(inputDayOfWeek)) {
    return inputDayOfWeek;
  }

  // If the date is older than those 4 days
  return inputDate.format('DD/MM/YYYY');
};

export const formatDateStringDayFirst = value => {
  const numericValue = value.replace(/\D/g, '');
  const day = numericValue.substr(0, 2);
  const month = numericValue.substr(2, 2);
  const year = numericValue.substr(4);

  let formattedDate = parseInt(day) >= 31 ? `31` : `${day}`;

  if (month.length > 0) {
    formattedDate += parseInt(month) >= 12 ? `/12` : `/${month}`;
  }

  if (year.length > 0) {
    formattedDate += `/${year}`;
  }

  return formattedDate;
};
