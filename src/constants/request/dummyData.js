import ppRequest1 from '../../images/requests/pp-request1.png';
import ppRequest2 from '../../images/requests/pp-request2.png';
import ppRequest3 from '../../images/requests/pp-request3.png';
import ppRequest4 from '../../images/requests/pp-request4.png';
import ppRequest5 from '../../images/requests/pp-request5.png';
import ppRequest6 from '../../images/requests/pp-request6.png';
import ppRequest7 from '../../images/requests/pp-request7.png';

import rRequest1 from '../../images/requests/r-request1.png';
import rRequest2 from '../../images/requests/r-request2.png';
import rRequest3 from '../../images/requests/r-request3.png';
import rRequest4 from '../../images/requests/r-request4.png';
import rRequest5 from '../../images/requests/r-request5.png';
import rRequest6 from '../../images/requests/r-request6.png';
import rRequest7 from '../../images/requests/r-request7.png';

const allRequestDummyData = {
  Inspection_requests_closed: [],
  commission_requests: [],
  commission_requests_closed: [],
  agent_request_closed: [],
  total_pending: 5,
  total: 7,
  total_closed: 2,
  payment_plan: [
    {
      id: 1,
      image: ppRequest1.src,
      name: 'John Smith',
      project: '12-B/Maple Glen',
      first_amount: '$420.80',
      second_amount: '$140.29',
      date: '01 May 2025',
      time: '2 mins ago',
      periodic: 'three monthly',
    },
    {
      id: 2,
      image: ppRequest2.src,
      name: 'Emily Johnson',
      project: '7-A/Maple Glen',
      first_amount: '$640.29',
      second_amount: '$100.71',
      date: '15 May 2025',
      time: 'Yesterday',
      periodic: '6 monthly',
      inReview: true,
    },
    {
      id: 3,
      image: ppRequest3.src,
      name: 'Kevin Brown',
      project: '3-14/OakRidge',
      first_amount: '$320.14',
      second_amount: '$100.71',
      date: '03 May 2025',
      time: '13 Apr, 2025',
      periodic: '3 bi-weekly',
    },
    {
      id: 4,
      image: ppRequest4.src,
      name: 'Sarah Davis',
      project: 'B-102/Evergreen Hills',
      first_amount: '$850.71',
      second_amount: '$210.43',
      date: '01 May 2025',
      time: '11 Apr, 2025',
      periodic: '4 monthly',
    },
    {
      id: 5,
      image: ppRequest5.src,
      name: 'Jason Miller',
      project: '21-C/Nova Ridge',
      first_amount: '$1,700.86',
      second_amount: '$300.57',
      date: '26 Apr 2025',
      time: '11 Apr, 2025',
      periodic: ' 5 weekly',
    },
    {
      id: 6,
      image: ppRequest6.src,
      name: 'Jessica Wilson',
      project: '5-D/Bayside Heights',
      first_amount: '$1,420.86',
      second_amount: '$170.86',
      date: '01 Jun 2025',
      time: '09 Apr, 2025',
      periodic: '8 monthly',
    },
    {
      id: 7,
      image: ppRequest7.src,
      name: 'Devon Lane',
      project: '8-11Evergreen Hills',
      first_amount: '$250.00',
      second_amount: '$100.71',
      date: '30 Apr 2025',
      time: '05 Apr, 2025',
      periodic: '10 monthly ',
    },
  ],
  reservation_request: [
    {
      id: 1,
      image: rRequest1.src,
      name: 'Brian King',
      project: '9-F/Oak Ridge',
      date: 'Tuesday, April 23, 2025',
      for: 'his Tesla Model Y',
      access: 'EV-Charging Bay',
      request: 'the access code.',
      time: 'Yesterday',
      from: '2 PM to 4 PM',
    },
    {
      id: 2,
      image: rRequest2.src,
      name: 'Jason Miller',
      project: '21-C/Nova Ridge',
      date: 'Sunday, May 10–12, 2025',
      for: 'parents visiting',
      access: 'Guest Suite #1',
      request: 'fresh linens.',
      time: '13 Apr, 2025',
      from: 'Friday through Sunday',
    },
    {
      id: 3,
      image: rRequest3.src,
      name: 'Sarah Davis',
      project: 'B-102/Evergreen Hills',
      date: 'Saturday, April 27, 2025',
      for: 'a family reunion ',
      access: 'the BBQ Pavilion',
      request: 'two extra tables.',
      time: '11 Apr, 2025',
      from: 'Noon to 4 PM',
    },
    {
      id: 4,
      image: rRequest4.src,
      name: 'Kevin Brown',
      project: '3-14/Oak Ridge',
      date: 'Sunday, May 5, 202',
      for: '12 kids; deposit has been paid.',
      access: 'the Pool Party Zone',
      time: '10 Apr, 2025',
      from: '1 PM to 3 PM',
    },
    {
      id: 5,
      image: rRequest5.src,
      name: 'Emily Johnson',
      project: '7-A/Maple Glen',
      date: 'Tuesday, April 22, 2025',
      for: 'a weekly doubles match.',
      access: 'Tennis Court #2',
      time: '09 Apr, 2025',
      from: '6 PM to 7 PM',
    },
    {
      id: 6,
      image: rRequest6.src,
      name: 'Rachel Hall',
      project: '4-A/Bayside Heights',
      date: 'Saturday, May 11, 2025',
      for: 'a bridal shower',
      access: 'the Gazebo',
      request: 'approval for floral décor.',
      time: '09 Apr, 2025',
      from: '10 AM to Noon',
    },
    {
      id: 7,
      image: rRequest7.src,
      name: 'John Smith',
      project: '12-B/Maple Glen',
      date: 'Saturday, May 3, 2025',
      for: 'a 35-guest birthday party',
      access: 'the Clubhouse',
      request: 'requests a projector.',
      time: '09 Apr, 2025',
      from: '4 PM to 9 PM',
    },
  ],
  design_request: [],
  emergency_escalations: [],
  count_agent: 3,
  count_inspection: 2,
  count_commissions: 0,
  count_closed_agent: 1,
  count_closed_inspection: 1,
  count_closed_commissions: 0,
};

export default allRequestDummyData;
