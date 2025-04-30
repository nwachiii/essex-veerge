import woman1 from '/src/images/avatar/woman1.png';
import woman2 from '/src/images/avatar/woman2.png';
import woman3 from '/src/images/avatar/woman3.png';
import man1 from '/src/images/avatar/man1.png';
import man2 from '/src/images/avatar/man2.png';
import man3 from '/src/images/avatar/man3.png';
import man4 from '/src/images/avatar/man4.png';
import man5 from '/src/images/avatar/man5.png';
import man6 from '/src/images/avatar/man6.png';
import man7 from '/src/images/avatar/man7.png';
import man8 from '/src/images/avatar/man8.png';
import man9 from '/src/images/avatar/man9.png';

export const demoAccountPageTableData = {
  page1: [
    {
      avatar: woman1.src,
      name: 'Eleanor Vance',
      unit: '12-D',
      location: 'Oak Ridge',
      description: 'Club House',
      amount: 248.9,
      date: '2025-05-01T00:00:00.000Z', // Tomorrow (Satisfies: By Tomorrow, 3 Days, 1 Week, 1 Month, All Time)
    },
    {
      avatar: man1.src,
      name: 'Marcus Chen',
      unit: '7-A',
      location: 'Maple Glen',
      description: 'Pool party',
      amount: 312.0,
      date: '2025-05-03T00:00:00.000Z', // In 3 Days (Satisfies: 3 Days, 1 Week, 1 Month, All Time)
    },
    {
      avatar: woman2.src,
      name: 'Sophia Rossi',
      unit: 'E-14',
      location: 'Crystal Lake Manor',
      description: 'Club House',
      amount: 504.34,
      date: '2025-05-07T00:00:00.000Z', // In 1 Week (Satisfies: 1 Week, 1 Month, All Time)
    },
    {
      avatar: man2.src,
      name: 'Liam Patel',
      unit: 'B-102',
      location: 'Garden Heights',
      description: 'Construction Compliance Deposit',
      amount: 126.0,
      date: '2025-05-30T00:00:00.000Z', // In 1 Month (Satisfies: 1 Month, All Time)
    },
    {
      avatar: man3.src,
      name: 'Noah Williams',
      unit: 'D-23',
      location: 'Maple Glen',
      description: 'Club House',
      amount: 295.1,
      date: '2025-04-30T00:00:00.000Z', // Today (Satisfies: By Tomorrow, 3 Days, 1 Week, 1 Month, All Time)
    },
    {
      avatar: man5.src,
      name: 'Ethan Jones',
      unit: '45-G',
      location: 'Pine Hall',
      description: 'Pool party',
      amount: 489.45,
      date: '2025-10-30T00:00:00.000Z', // Far Future (Satisfies: All Time)
    },
    {
      // Added Item 1 (Replaces Cole Brown conceptually)
      avatar: man4.src, // Reusing avatar for simplicity
      name: 'Kevin Moore', // New name
      unit: 'A-11', // Reusing unit
      location: 'Oak Ridge',
      description: 'Gym Booking',
      amount: 55.0,
      date: '2025-06-15T00:00:00.000Z', // Future Date > 1 Month (Satisfies: All Time)
    },
    {
      avatar: man6.src,
      name: 'Alex Garcia',
      unit: '4-8',
      location: 'Silver Heights',
      description: 'Construction Compliance Deposit',
      amount: 300.0,
      date: '2025-05-02T00:00:00.000Z', // In 3 Days (Satisfies: 3 Days, 1 Week, 1 Month, All Time)
    },
    {
      avatar: woman3.src,
      name: 'Isabella Nguyen',
      unit: '9-F',
      location: 'Crystal Lake Manor',
      description: 'Pool party',
      amount: 389.6,
      date: '2025-05-06T00:00:00.000Z', // In 1 Week (Satisfies: 1 Week, 1 Month, All Time)
    },
    {
      // Added Item 2
      avatar: man8.src, // Reusing avatar
      name: 'Lucas Davis',
      unit: '6-08',
      location: 'Laurel Heights',
      description: 'Construction Compliance Deposit',
      amount: 218.34,
      date: '2025-05-20T00:00:00.000Z', // In 1 Month (Satisfies: 1 Month, All Time)
    },
  ],
  page2: [
    {
      // Added Item 3 (Replaces Aiden Hernandez conceptually)
      avatar: man9.src, // Reusing avatar
      name: 'David Wilson', // New name
      unit: 'C-5', // Reusing unit
      location: 'Maple Glen',
      description: 'Tennis Court',
      amount: 75.0,
      date: '2025-05-12T00:00:00.000Z', // Future Date (In 1 Month category)
    },
    {
      avatar: woman3.src,
      name: 'Isabella Nguyen', // Same name, different record
      unit: '10-B',
      location: 'Oak Ridge',
      description: 'Parking Fee',
      amount: 75.5,
      date: '2025-05-10T00:00:00.000Z', // In 1 Month (Satisfies: 1 Month, All Time)
    },
    {
      avatar: man7.src,
      name: 'Logan Miller',
      unit: 'F-11',
      location: 'Crystal Lake Manor',
      description: 'Pool party',
      amount: 255.0,
      date: '2025-05-05T00:00:00.000Z', // In 1 Week (Satisfies: 1 Week, 1 Month, All Time)
    },
  ],
};

export const demoCapFeePageTableData = {
  page1: [
    {
      avatar: woman1.src,
      name: 'Eleanor Vance',
      unit: '12-D',
      location: 'Oak Ridge',
      description: 'CAP Fee',
      amount: 248.9,
      date: '17 Feb, 2025',
    },
    {
      avatar: man1.src,
      name: 'Marcus Chen',
      unit: '7-A',
      location: 'Maple Glen',
      description: 'CAP Fee',
      amount: 312.0,
      date: '16 Feb, 2025',
    },
    {
      avatar: woman2.src,
      name: 'Sophia Rossi',
      unit: 'E-14',
      location: 'Crystal Lake Manor',
      description: 'CAP Fee',
      amount: 504.34,
      date: '14 Feb, 2025',
    },
    {
      avatar: man2.src,
      name: 'Liam Patel',
      unit: 'B-102',
      location: 'Garden Heights',
      description: 'CAP Fee',
      amount: 126.0,
      date: '14 Feb, 2025',
    },
    {
      avatar: man3.src,
      name: 'Noah Williams',
      unit: 'D-23',
      location: 'Maple Glen',
      description: 'CAP Fee',
      amount: 295.1,
      date: '13 Feb, 2025',
    },
    {
      avatar: man5.src,
      name: 'Ethan Jones',
      unit: '45-G',
      location: 'Pine Hall',
      description: 'CAP Fee',
      amount: 489.45,
      date: '13 Feb, 2025',
    },
    {
      avatar: man4.src,
      name: 'Cole Brown',
      unit: 'A-11',
      location: 'Oak Ridge',
      description: 'CAP Fee',
      amount: 122.76,
      date: '13 Feb, 2025',
    },
    {
      avatar: man6.src,
      name: 'Alex Garcia',
      unit: '4-8',
      location: 'Silver Heights',
      description: 'CAP Fee',
      amount: 300.0,
      date: '13 Feb, 2025',
    },
    {
      avatar: woman3.src,
      name: 'Isabella Nguyen',
      unit: '9-F',
      location: 'Crystal Lake Manor',
      description: 'CAP Fee',
      amount: 389.6,
      date: '12 Feb, 2025',
    },
    {
      avatar: man8.src,
      name: 'Lucas Davis',
      unit: '6-08',
      location: 'Laurel Heights',
      description: 'CAP Fee',
      amount: 218.34,
      date: '10 Feb, 2025',
    },
  ],
  page2: [
    {
      avatar: man9.src,
      name: 'Aiden Hernandez',
      unit: 'C-5',
      location: 'Maple Glen',
      description: 'CAP Fee',
      amount: 150.0,
      date: '10 Feb, 2025',
    },
    {
      avatar: woman3.src,
      name: 'Isabella Nguyen',
      unit: '10-B',
      location: 'Oak Ridge',
      description: 'CAP Fee',
      amount: 75.5,
      date: '09 Feb, 2025',
    },
    {
      avatar: man7.src,
      name: 'Logan Miller',
      unit: 'F-11',
      location: 'Crystal Lake Manor',
      description: 'CAP Fee',
      amount: 255.0,
      date: '09 Feb, 2025',
    },
  ],
};
export const demoTotalAmenitiesFeesPageTableData = {
  page1: [
    {
      avatar: woman1.src,
      name: 'Ralph Edwards',
      unit: '12-D',
      location: 'Oak Ridge',
      description: 'Club House', // Original description preserved
      type: 'Club House', // Updated from new image
      amount: 248.9,
      date: '17 Jul, 2025',
    },
    {
      avatar: man1.src,
      name: 'Brooklyn Simmons',
      unit: '7-A',
      location: 'Maple Glen',
      description: 'Pool party', // Original description preserved
      type: 'Pool Party Zone', // Updated from new image
      amount: 312.0,
      date: '16 Jul, 2025',
    },
    {
      avatar: woman2.src,
      name: 'Wade Warren',
      unit: 'E-14',
      location: 'Crystal Lake Manor',
      description: 'Club House', // Original description preserved
      type: 'Club House', // Updated from new image
      amount: 504.34,
      date: '14 Jul, 2025',
    },
    {
      avatar: man2.src,
      name: 'Jenny Wilson',
      unit: 'B-102',
      location: 'Garden Heights',
      description: 'Construction Compliance Deposit', // Original description preserved
      type: 'Tennis Court', // Updated from new image
      amount: 126.0,
      date: '14 Jul, 2025',
    },
    {
      avatar: man3.src,
      name: 'Arlene McCoy',
      unit: 'D-23',
      location: 'Maple Glen',
      description: 'Club House', // Original description preserved
      type: 'Club House', // Updated from new image
      amount: 295.1,
      date: '13 Jul, 2025',
    },
    {
      avatar: man5.src,
      name: 'Guy Hawkins',
      unit: '45-G',
      location: 'Pine Hall',
      description: 'Pool party', // Original description preserved
      type: 'Pool Party Zone', // Updated from new image
      amount: 489.45,
      date: '13 Jul, 2025',
    },
    {
      avatar: man4.src,
      name: 'Courtney Henry',
      unit: 'A-11',
      location: 'Oak Ridge',
      description: 'Pool party', // Original description preserved
      type: 'Conference Room', // Updated from new image
      amount: 122.76,
      date: '13 Jul, 2025',
    },
    {
      avatar: man6.src,
      name: 'Alex Garcia',
      unit: '4-8',
      location: 'Silver Heights',
      description: 'Construction Compliance Deposit', // Original description preserved
      type: 'Gym', // Updated from new image
      amount: 300.0,
      date: '13 Jul, 2025',
    },
    {
      avatar: woman3.src,
      name: 'Savannah Nguyen',
      unit: '9-F',
      location: 'Crystal Lake Manor',
      description: 'Pool party', // Original description preserved
      type: 'Pool Party Zone', // Updated from new image
      amount: 389.6,
      date: '12 Jul, 2025',
    },
    {
      avatar: man8.src,
      name: 'Darlene Robertson',
      unit: '6-08',
      location: 'Laurel Heights',
      description: 'Construction Compliance Deposit', // Original description preserved
      type: 'Tennis Court', // Updated from new image
      amount: 218.34,
      date: '10 Jul, 2025',
    },
  ],
  page2: [
    {
      avatar: man9.src,
      name: 'Aiden Hernandez',
      unit: 'C-5',
      location: 'Maple Glen',
      description: 'Maintenance Fee', // Original description preserved
      type: 'BBQ Pit', // Updated to realistic facility type
      amount: 150.0,
      date: '10 Jan, 2025',
    },
    {
      avatar: woman2.src,
      name: 'Sophia Rossi',
      unit: '10-B',
      location: 'Oak Ridge',
      description: 'Parking Fee', // Original description preserved
      type: 'Guest Suite', // Updated to realistic facility type
      amount: 75.5,
      date: '09 Jan, 2025',
    },
    {
      avatar: man7.src,
      name: 'Logan Miller',
      unit: 'F-11',
      location: 'Crystal Lake Manor',
      description: 'Pool party', // Original description preserved
      type: 'Club House', // Updated to realistic facility type
      amount: 255.0,
      date: '09 Jan, 2025',
    },
  ],
};
export const demoTotalAssessmentPageTableData = {
  page1: [
    {
      avatar: woman1.src,
      name: 'Eleanor Vance',
      unit: '12-D',
      location: 'Oak Ridge',
      description: 'CAP Fee',
      amount: 248.9,
      date: '17 Feb, 2025',
    },
    {
      avatar: man1.src,
      name: 'Marcus Chen',
      unit: '7-A',
      location: 'Maple Glen',
      description: 'CAP Fee',
      amount: 312.0,
      date: '16 Feb, 2025',
    },
    {
      avatar: woman2.src,
      name: 'Sophia Rossi',
      unit: 'E-14',
      location: 'Crystal Lake Manor',
      description: 'CAP Fee',
      amount: 504.34,
      date: '14 Feb, 2025',
    },
    {
      avatar: man2.src,
      name: 'Liam Patel',
      unit: 'B-102',
      location: 'Garden Heights',
      description: 'CAP Fee',
      amount: 126.0,
      date: '14 Feb, 2025',
    },
    {
      avatar: man3.src,
      name: 'Noah Williams',
      unit: 'D-23',
      location: 'Maple Glen',
      description: 'CAP Fee',
      amount: 295.1,
      date: '13 Feb, 2025',
    },
    {
      avatar: man5.src,
      name: 'Ethan Jones',
      unit: '45-G',
      location: 'Pine Hall',
      description: 'CAP Fee',
      amount: 489.45,
      date: '13 Feb, 2025',
    },
    {
      avatar: man4.src,
      name: 'Cole Brown',
      unit: 'A-11',
      location: 'Oak Ridge',
      description: 'CAP Fee',
      amount: 122.76,
      date: '13 Feb, 2025',
    },
    {
      avatar: man6.src,
      name: 'Alex Garcia',
      unit: '4-8',
      location: 'Silver Heights',
      description: 'CAP Fee',
      amount: 300.0,
      date: '13 Feb, 2025',
    },
    {
      avatar: woman3.src,
      name: 'Isabella Nguyen',
      unit: '9-F',
      location: 'Crystal Lake Manor',
      description: 'CAP Fee',
      amount: 389.6,
      date: '12 Feb, 2025',
    },
    {
      avatar: man8.src,
      name: 'Lucas Davis',
      unit: '6-08',
      location: 'Laurel Heights',
      description: 'CAP Fee',
      amount: 218.34,
      date: '10 Feb, 2025',
    },
  ],
  page2: [
    {
      avatar: man9.src,
      name: 'Aiden Hernandez',
      unit: 'C-5',
      location: 'Maple Glen',
      description: 'CAP Fee',
      amount: 150.0,
      date: '10 Feb, 2025',
    },
    {
      avatar: woman3.src,
      name: 'Isabella Nguyen',
      unit: '10-B',
      location: 'Oak Ridge',
      description: 'CAP Fee',
      amount: 75.5,
      date: '09 Feb, 2025',
    },
    {
      avatar: man7.src,
      name: 'Logan Miller',
      unit: 'F-11',
      location: 'Crystal Lake Manor',
      description: 'CAP Fee',
      amount: 255.0,
      date: '09 Feb, 2025',
    },
  ],
};
export const demoViolationAndFinePaymentsPageTableData = {
  page1: [
    {
      avatar: woman1.src,
      name: 'Ralph Edwards',
      unit: '12-D',
      location: 'Oak Ridge',
      description: 'Club House',
      type: 'Trash Can', // Key changed
      amount: 248.9,
      date: '17 Jul, 2025',
    },
    {
      avatar: man1.src,
      name: 'Brooklyn Simmons',
      unit: '7-A',
      location: 'Maple Glen',
      description: 'Pool party',
      type: 'Unauthorised Paint Colour', // Key changed
      amount: 312.0,
      date: '16 Jul, 2025',
    },
    {
      avatar: woman2.src,
      name: 'Wade Warren',
      unit: 'E-14',
      location: 'Crystal Lake Manor',
      description: 'Club House',
      type: 'Trash Can', // Key changed
      amount: 504.34,
      date: '14 Jul, 2025',
    },
    {
      avatar: man2.src,
      name: 'Jenny Wilson',
      unit: 'B-102',
      location: 'Garden Heights',
      description: 'Construction Compliance Deposit',
      type: 'Parking', // Key changed
      amount: 126.0,
      date: '14 Jul, 2025',
    },
    {
      avatar: man3.src,
      name: 'Arlene McCoy',
      unit: 'D-23',
      location: 'Maple Glen',
      description: 'Club House',
      type: 'Trash Can', // Key changed
      amount: 295.1,
      date: '13 Jul, 2025',
    },
    {
      avatar: man5.src,
      name: 'Guy Hawkins',
      unit: '45-G',
      location: 'Pine Hall',
      description: 'Pool party',
      type: 'Late Night Noise', // Key changed
      amount: 489.45,
      date: '13 Jul, 2025',
    },
    {
      avatar: man4.src,
      name: 'Courtney Henry',
      unit: 'A-11',
      location: 'Oak Ridge',
      description: 'Pool party',
      type: 'Trash Can', // Key changed
      amount: 122.76,
      date: '13 Jul, 2025',
    },
    {
      avatar: man6.src,
      name: 'James Cooper',
      unit: '4-8',
      location: 'Silver Heights',
      description: 'Construction Compliance Deposit',
      type: 'Parking', // Key changed
      amount: 300.0,
      date: '13 Jul, 2025',
    },
    {
      avatar: woman3.src,
      name: 'Savannah Nguyen',
      unit: '9-F',
      location: 'Crystal Lake Manor',
      description: 'Pool party',
      type: 'Late Night Noise', // Key changed
      amount: 389.6,
      date: '12 Jul, 2025',
    },
    {
      avatar: man8.src,
      name: 'Darlene Robertson',
      unit: '6-08',
      location: 'Laurel Heights',
      description: 'Construction Compliance Deposit',
      type: 'Late Night Noise', // Key changed
      amount: 218.34,
      date: '10 Jul, 2025',
    },
  ],
  page2: [
    {
      avatar: man9.src,
      name: 'Aiden Hernandez',
      unit: 'C-5',
      location: 'Maple Glen',
      description: 'Maintenance Fee',
      type: 'Maintenance Violation', // Key changed
      amount: 150.0,
      date: '10 Jan, 2025',
    },
    {
      avatar: woman2.src,
      name: 'Sophia Rossi',
      unit: '10-B',
      location: 'Oak Ridge',
      description: 'Parking Fee',
      type: 'Parking', // Key changed
      amount: 75.5,
      date: '09 Jan, 2025',
    },
    {
      avatar: man7.src,
      name: 'Logan Miller',
      unit: 'F-11',
      location: 'Crystal Lake Manor',
      description: 'Pool party',
      type: 'Facility Misuse', // Key changed
      amount: 255.0,
      date: '09 Jan, 2025',
    },
  ],
};

export const demoRefundableTableData = {
  page1: [
    {
      avatar: woman1.src,
      name: 'Eleanor Vance',
      unit: '12-D',
      location: 'Oak Ridge',
      description: 'Club House', // Original Description
      amount: 248.9,
      date: '17 Jan, 2025', // Past date
    },
    {
      avatar: man1.src,
      name: 'Marcus Chen',
      unit: '7-A',
      location: 'Maple Glen',
      description: 'Pool party', // Original Description
      amount: 312.0,
      date: '16 Jan, 2025', // Past date
    },
    {
      avatar: woman2.src,
      name: 'Sophia Rossi',
      unit: 'E-14',
      location: 'Crystal Lake Manor',
      description: 'Club House', // Original Description
      amount: 504.34,
      date: '14 Jan, 2025', // Past date
    },
    {
      avatar: man2.src,
      name: 'Liam Patel',
      unit: 'B-102',
      location: 'Garden Heights',
      description: 'Construction Compliance Deposit', // Original Description
      amount: 126.0,
      date: '14 Jan, 2025', // Past date
    },
    {
      avatar: man3.src,
      name: 'Noah Williams',
      unit: 'D-23',
      location: 'Maple Glen',
      description: 'Club House', // Original Description
      amount: 295.1,
      date: '13 Jan, 2025', // Past date
    },
    {
      avatar: man5.src,
      name: 'Ethan Jones',
      unit: '45-G',
      location: 'Pine Hall',
      description: 'Pool party', // Original Description
      amount: 489.45,
      date: '13 Jan, 2025', // Past date
    },
    {
      avatar: man4.src,
      name: 'Cole Brown',
      unit: 'A-11',
      location: 'Oak Ridge',
      description: 'Pool party', // Original Description
      amount: 122.76,
      date: '13 Jan, 2025', // Past date
    },
    {
      avatar: man6.src,
      name: 'Alex Garcia',
      unit: '4-8',
      location: 'Silver Heights',
      description: 'Construction Compliance Deposit', // Original Description
      amount: 300.0,
      date: '13 Jan, 2025', // Past date
    },
    {
      avatar: woman3.src,
      name: 'Isabella Nguyen',
      unit: '9-F',
      location: 'Crystal Lake Manor',
      description: 'Pool party', // Original Description
      amount: 389.6,
      date: '12 Jan, 2025', // Past date
    },
    {
      avatar: man8.src,
      name: 'Lucas Davis',
      unit: '6-08',
      location: 'Laurel Heights',
      description: 'Construction Compliance Deposit', // Original Description
      amount: 218.34,
      date: '10 Jan, 2025', // Past date
    },
  ],
  page2: [
    {
      avatar: man9.src,
      name: 'Aiden Hernandez',
      unit: 'C-5',
      location: 'Maple Glen',
      description: 'Maintenance Fee', // Original Description
      amount: 150.0,
      date: '10 Jan, 2025', // Past date
    },
    {
      avatar: woman2.src,
      name: 'Sophia Rossi',
      unit: '10-B',
      location: 'Oak Ridge',
      description: 'Parking Fee', // Original Description
      amount: 75.5,
      date: '09 Jan, 2025', // Past date
    },
    {
      avatar: man7.src,
      name: 'Logan Miller',
      unit: 'F-11',
      location: 'Crystal Lake Manor',
      description: 'Pool party', // Original Description
      amount: 255.0,
      date: '09 Jan, 2025', // Past date
    },
  ],
};
export const demoRecenteTransactionTableData = {
  page1: [
    {
      avatar: woman1.src,
      name: 'Eleanor Vance',
      unit: '12-D',
      location: 'Oak Ridge',
      description: 'Club House',
      payment_type: 'Assessment', // Added
      amount: 248.9,
      date: '17 Jan, 2025',
    },
    {
      avatar: man1.src,
      name: 'Marcus Chen',
      unit: '7-A',
      location: 'Maple Glen',
      description: 'Pool party',
      payment_type: 'Assessment', // Added (Could also be 'Fee')
      amount: 312.0,
      date: '16 Jan, 2025',
    },
    {
      avatar: woman2.src,
      name: 'Sophia Rossi',
      unit: 'E-14',
      location: 'Crystal Lake Manor',
      description: 'Club House',
      payment_type: 'Assessment', // Added
      amount: 504.34,
      date: '14 Jan, 2025',
    },
    {
      avatar: man2.src,
      name: 'Liam Patel',
      unit: 'B-102',
      location: 'Garden Heights',
      description: 'Construction Compliance Deposit',
      payment_type: 'Violation', // Added
      amount: 126.0,
      date: '14 Jan, 2025',
    },
    {
      avatar: man3.src,
      name: 'Noah Williams',
      unit: 'D-23',
      location: 'Maple Glen',
      description: 'Club House',
      payment_type: 'Assessment', // Added
      amount: 295.1,
      date: '13 Jan, 2025',
    },
    {
      avatar: man5.src,
      name: 'Ethan Jones',
      unit: '45-G',
      location: 'Pine Hall',
      description: 'Pool party',
      payment_type: 'Assessment', // Added (Could also be 'Violation' if unauthorized)
      amount: 489.45,
      date: '13 Jan, 2025',
    },
    {
      avatar: man4.src,
      name: 'Cole Brown',
      unit: 'A-11',
      location: 'Oak Ridge',
      description: 'Pool party',
      payment_type: 'Assessment', // Added
      amount: 122.76,
      date: '13 Jan, 2025',
    },
    {
      avatar: man6.src,
      name: 'Alex Garcia',
      unit: '4-8',
      location: 'Silver Heights',
      description: 'Construction Compliance Deposit',
      payment_type: 'Violation', // Added
      amount: 300.0,
      date: '13 Jan, 2025',
    },
    {
      avatar: woman3.src,
      name: 'Isabella Nguyen',
      unit: '9-F',
      location: 'Crystal Lake Manor',
      description: 'Pool party',
      payment_type: 'Assessment', // Added
      amount: 389.6,
      date: '12 Jan, 2025',
    },
    {
      avatar: man8.src,
      name: 'Lucas Davis',
      unit: '6-08',
      location: 'Laurel Heights',
      description: 'Construction Compliance Deposit',
      payment_type: 'Violation', // Added
      amount: 218.34,
      date: '10 Jan, 2025',
    },
  ],
  page2: [
    {
      avatar: man9.src,
      name: 'Aiden Hernandez',
      unit: 'C-5',
      location: 'Maple Glen',
      description: 'Maintenance Fee',
      payment_type: 'Fee', // Added
      amount: 150.0,
      date: '10 Jan, 2025',
    },
    {
      avatar: woman2.src,
      name: 'Sophia Rossi',
      unit: '10-B',
      location: 'Oak Ridge',
      description: 'Parking Fee',
      payment_type: 'Fee', // Added
      amount: 75.5,
      date: '09 Jan, 2025',
    },
    {
      avatar: man7.src,
      name: 'Logan Miller',
      unit: 'F-11',
      location: 'Crystal Lake Manor',
      description: 'Pool party',
      payment_type: 'Assessment', // Added (Could also be 'Violation')
      amount: 255.0,
      date: '09 Jan, 2025',
    },
  ],
};
