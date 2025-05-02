export const notesStaticData = [
  {
    id: 1,
    created_by: {
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
      first_name: 'Phoenix',
      last_name: 'Baker',
    },
    created_at: 'Apr 18, 2025 | 11:45 AM',
    note: 'Just a heads-up —Ralph has submitted another maintenance request regarding the recurring leak in his bathroom ceiling. This is the third report in the past 6 weeks. Can we confirm if Facilities followed up with the plumbing contractor after the last work order?',
  },
  {
    id: 3,
    created_by: {
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
      first_name: 'Courtney',
      last_name: 'Henry',
    },
    created_at: 'Apr 18, 2025 | 11:47 AM',
    note: `Please also check if 15-B has had any similar complaints. If it's a shared pipe, we might need to notify both units officially.
    I’ll hold off responding to Mr. Ralph until we confirm what's going on..`,
    files_list: [], // No attachments
    files: null,
  },
  {
    id: 2,
    created_by: {
      avatar: 'https://randomuser.me/api/portraits/men/41.jpg',
      first_name: 'Smith',
      last_name: 'Collins',
    },
    created_at: '1 day ago',
    note: 'Thanks for flagging. We did a temporary patch 2 weeks ago but the contractor said the issue is likely from the unit above (15-B). They were supposed to come back last Thursday — will follow up with them again today and update here.',
    files_list: [],
    files: null,
  },
];
