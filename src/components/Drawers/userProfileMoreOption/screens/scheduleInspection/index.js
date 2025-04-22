import React, {useState} from 'react';
import AssignInspection from './screens/assignInspection';
import InspectionSummary from './screens/inspectionSummary';
import {useMutation, useQuery} from '@tanstack/react-query';
import {fetchTeammember} from 'apis/settings';
import {useFormik} from 'formik';
import DateValidator from 'utils/validateDateClass';
import {toastForError} from 'utils/toastForErrors';
import {useToast} from '@chakra-ui/react';
import {CreateToast} from 'ui-lib/ui-lib.components';
import {useRouter} from 'next/router';
import {changeDateFormat} from 'utils/formatDate';
import {scheduleInspectionForACustomer} from 'apis/fetchInspection';
import {fromZonedTime} from 'date-fns-tz';

const ScheduleCustomerInspection = ({refetch, navigateMainDrawer}) => {
  const {data: roleData, isError: roleHasError} = useQuery(['fetchAcceptedRoles'], fetchTeammember);
  const roles = roleData?.data?.data;
  const defaultScreen = 'setInspection';
  const [screen, setScreen] = useState(defaultScreen);
  const [timeZone, setTimeZone] = useState(defaultScreen);
  const toast = useToast();
  const toaster = CreateToast();
  const router = useRouter();

  const handleScreen = scrn => () => {
    setScreen(scrn);
  };

  const handleClose = () => {
    setScreen(defaultScreen);
  };

  const initialValues = {
    project: '',
    developer: true,
    type: '',
    date: '',
    time: '',
    meridiem: 'am',
    note: '',
    email: '',
    listingName: '',
    listingImg: '',
  };

  const isValidTime = timeString => {
    const [hoursStr, minutesStr] = timeString.split(':');
    const hours = parseInt(hoursStr, 10);
    const minutes = parseInt(minutesStr, 10);

    return hours > 0 && hours <= 12 && minutes >= 0 && minutes <= 59;
  };

  const validate = values => {
    const dateValidate = new DateValidator(values.date);
    const currentTime = new Date().getHours() + ':' + new Date().getMinutes();

    const earlierThanCurrentTime = values => {
      const parseDateWithMeridiem = (dateStr, meridiem) => {
        if (!dateStr || !meridiem) return false;

        const datePart = values.date;
        const timePart = values.time;
        let [day, month, year] = datePart?.split('/');
        let [hours, minutes] = timePart?.split(':');

        hours = parseInt(hours);
        minutes = parseInt(minutes);
        if (meridiem === 'pm' && hours !== 12) {
          hours += 12;
        } else if (meridiem === 'am' && hours === 12) {
          hours = 0;
        }

        return new Date(
          `${year}-${month}-${day}T${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
        );
      };

      const newDate = parseDateWithMeridiem(values?.time, values?.meridiem);
      const currentTime = new Date();

      return newDate <= currentTime;
    };

    const errors = {};

    if (!values.time) {
      errors.time = 'Required';
    } else if (!isValidTime(values.time)) {
      errors.time = 'Invalid time format';
    } else if (earlierThanCurrentTime(values)) {
      errors.time = 'You cannot enter a time earlier than the current time';
    }

    if (!values.date) {
      errors.date = 'Required';
    } else if (!dateValidate.isLeapYear()) {
      errors.date = `Invalid date, this year isn't a leap year`;
    } else if (!dateValidate.isValidDate()) {
      errors.date = 'Invalid date';
    } else if (dateValidate.isInThePast()) {
      errors.date = `You cannot input a date earlier than today's date.`;
    }

    return errors;
  };

  const convertToISOString = (dateString, timeString, meridiem, forFormData) => {
    const [day, month, year] = dateString.split('/').map(Number);

    const [hoursStr, minutesStr] = timeString.split(':');
    let hours = parseInt(hoursStr, 10);
    const minutes = parseInt(minutesStr, 10);

    if (meridiem === 'pm' && hours !== 12) {
      hours += 12;
    } else if (meridiem === 'am' && hours === 12) {
      hours = 0;
    }

    const timestamp = new Date(year, month - 1, day, hours, minutes);

    const isoLikeString = `${timestamp.getFullYear()}-${(timestamp.getMonth() + 1).toString().padStart(2, '0')}-${timestamp.getDate().toString().padStart(2, '0')}T${timestamp.getHours().toString().padStart(2, '0')}:${timestamp.getMinutes().toString().padStart(2, '0')}:${timestamp.getSeconds().toString().padStart(2, '0')}.${timestamp.getMilliseconds().toString().padStart(3, '0')}Z`;
    const utcDate = fromZonedTime(timestamp, timeZone).toISOString();

    return utcDate;
    // if (forFormData) {
    //   return isoLikeString;
    // }
    // return timestamp?.toISOString();
  };

  const onSubmit = values => {
    const {developer, note: notes, email, type, time, date, meridiem} = values;

    const isoString = convertToISOString(date, time, meridiem, true);

    const formData = {
      user_id: router.query?.userId,
      developer,
      time: isoString,
      type,
      notes,
      email,
    };

    mutation.mutate(formData);
  };

  const formik = useFormik({
    initialValues,
    validate,
    onSubmit,
    validateOnChange: true,
  });

  const mutation = useMutation(
    formData => scheduleInspectionForACustomer(formData, formik.values.project),
    {
      onSuccess: async res => {
        refetch();
        toaster('Inspection scheduled successfully');
        navigateMainDrawer();
      },
      onError: err => {
        toastForError(err, true, toast);
      },
    }
  );

  const customScrollbarStyles = (trackColor = '#fff', thumbColor = '#cbcbcb') => ({
    '&::-webkit-scrollbar': {
      width: '4px',
      borderRadius: '16px',
    },
    '&::-webkit-scrollbar-track': {
      borderRadius: '16px',
      WebkitBoxShadow: `inset 0 0 6px ${trackColor}`,
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '16px',
      backgroundColor: thumbColor,
    },
  });

  const isValid = () => {
    const isListingValid = !!formik.values.project;
    const isTypeValid = !!formik.values.type;
    const isDateValid = !formik.errors.date;
    const isTimeValid = !formik.errors.time;
    const isAssigneeValid = !!formik.values.email;

    return isAssigneeValid && isTypeValid && isDateValid && isTimeValid && isListingValid;
  };

  const displayScheduleInspectionScreens = key => {
    switch (key) {
      case 'setInspection':
        return (
          <AssignInspection
            setTimeZone={setTimeZone}
            customScrollbarStyles={customScrollbarStyles}
            handleScreen={handleScreen}
            formik={formik}
            navigateMainDrawer={navigateMainDrawer}
            isValid={isValid}
            handleClose={handleClose}
            roles={roles}
          />
        );

      case 'summary':
        return (
          <InspectionSummary
            timeZone={timeZone}
            convertToISOString={convertToISOString}
            isValid={isValid}
            formik={formik}
            mutation={mutation}
            customScrollbarStyles={customScrollbarStyles}
            handleScreen={handleScreen}
          />
        );
      default:
        <AssignInspection
          setTimeZone={setTimeZone}
          customScrollbarStyles={customScrollbarStyles}
          handleScreen={handleScreen}
          handleClose={handleClose}
        />;
    }
  };
  return displayScheduleInspectionScreens(screen);
};

export default ScheduleCustomerInspection;
