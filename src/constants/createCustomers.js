export const CUSTOMER_DETAILS = {
  email: '',
  avatar: '',
  first_name: '',
  last_name: '',
  id_doc: [],
  phone_number: '',
  notes: '',
};
export const CUSTOMER_PAYMENT_PLAN = [
  {
    init_deposit: '',
    next_due_date: '',
    total_duration: '',
    payment_cycle: '',
    payment_amount: '',
    payment_date: '',
  },
];

export const PAYMENT_TYPE = [
  {
    payment_amount: '₦800,000',
    payment_type: 'Past payment',
    payment_date: 'Jul 15, 2022',
  },
  {
    payment_amount: '₦200,000',
    payment_type: 'Top ups',
    payment_date: 'Jul 15, 2022',
  },
];

export const CUSTOMERS_ALLOCATION_DETAILS = {
  date_allocated: '',
  allocation_title: '',
  allocation_period: '',
  allocation_note: '',
};
export const FILLED_UNIT_ALLOCATION_DETAILS = {
  date_allocated: 'Jul 15, 2022',
  allocation_title: 'Plot B4 U',
  allocation_period: '6 Months',
  allocation_note: '',
};

export const FILLED_CUSTOMERS_ACCOUNT_SUMMARY = [
  {
    avatar: '',
    first_name: 'Daniel',
    last_name: 'Tanay',
    phone_number: '+2348166111593',
    email: 'pearlana@matadortrust.com',
    listing_details: [
      {
        listing_image: '',
        listing_name: 'Astrid 2.0',
        construction_status: 'Under construction',
        listing_unit: [
          {
            unit_name: 'luxury_condo',
            unit_size: '400sqm',
            unit_price: '₦3,200,000',
            unit_quantity: 1,
          },
        ],
      },
    ],
  },
];
