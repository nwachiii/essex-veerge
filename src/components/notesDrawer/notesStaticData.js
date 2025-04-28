    export const notesStaticData = [
    {
        id: 1,
        created_by: {
        avatar: './public_image/notes-img1.png',
        first_name: 'Phoenix',
        last_name: 'baker',
        },
        created_at: '2 hours ago',
        note: 'Just a heads-up —Ralph has submitted another maintenance request regarding the recurring leak in his bathroom ceiling. This is the third report in the past 6 weeks. Can we confirm if Facilities followed up with the plumbing contractor after the last work order?',
        // files_list: [
        // {
        //     files: 'path/to/attachment1.pdf',
        // },
        // {
        //     files: 'path/to/attachment2.jpg',
        // },
        // ],
        // files: 'path/to/alternative-attachment.pdf',
    },
    {
        id: 2,
        created_by: {
        avatar: './public_image/notes-img2.png',
        first_name: 'Smith',
        last_name: 'Collins',
        },
        created_at: '1 day ago',
        note: 'Thanks for flagging. We did a temporary patch 2 weeks ago but the contractor said the issue is likely from the unit above (15-B). They were supposed to come back last Thursday — will follow up with them again today and update here.',
        files_list: [], 
        files: null,
    },
    {
        id: 3,
        created_by: {
        avatar: './public_image/notes-img3.png',
        first_name: 'Mary',
        last_name: 'Jane',
        },
        created_at: '6 days ago',
        note: `Please also check if 15-B has had any similar complaints. If it's a shared pipe, we might need to notify both units officially.
    I’ll hold off responding to Mr. Ralph until we confirm what's going on..`,
        files_list: [], // No attachments
        files: null,
    },
    ];
