import {v4 as uuidv4} from 'uuid';

export const MATADOR_CREATE_LISTING_INFO = {
  name: '',
  address: '',
  status: '',

  landmark: '',
  latitude: '',
  longitude: '',
  land_size: '',
  land_title: '',
  is_unit: false,
  publish: false,
  description: '',
  youtube_url: '',
  building_type: '',
  completed_timestamp: null,
};

export const MATADOR_AMENITIES = [
  {
    name: '',
    value: '',
  },
];

export const MATADOR_INITIAL_UNITS_INFO = [
  {
    unit_title: '',
    unit_type: '',
    unit_size: '',
    quantity: 1,
    price: '',
    no_of_bedrooms: '',
    photos: [],
    status: true,
  },
];

export const NEW_LISTING_UNITS_INFO = {
  price: '',
  photos: [],
  status: true,
  quantity: '',
  unit_type: '',
  unit_size: '',
  unit_title: '',
  no_of_bedrooms: 0,
  display_price: true,
  payment_class: 'manual',
  payment_plan: [
    {
      purchase_price: '',
      periodic_payment: '',
      payment_frequency: '',
      plan_type: 'manual',
      initial_deposit_in_value: '',
      payment_period_in_months: '',
      contract: '',
      custom_payments: [
        {
          amount: '',
          period_in_months: '',
        },
      ],
    },
  ],
  fees: [
    {
      name: '',
      amount: '',
    },
  ],
};

export const OTHER_FEES_INFO = [
  {
    id: uuidv4(),
    name: '',
    amount: '',
  },
];
export const INSTALLMENT_INFO = [
  {
    amount: '',
    period_in_months: '',
  },
];

export const PAYMENT_PLAN_SCHEMA = [
  {
    purchase_price: '',
    periodic_payment: '',
    payment_frequency: '',
    plan_type: 'manual',
    initial_deposit_in_value: '',
    payment_period_in_months: '',
    contract: '',
    custom_payments: [
      {
        amount: '',
        period_in_months: '',
      },
    ],
  },
];

export const PAYMENT_PLAN_INFO = [
  {
    id: uuidv4(),
    bundle_price: '',
    initial_deposit_in_value: '',
    periodic_payment: '',
    payment_period_in_months: '',
    interest_rate: '',
    grace_period_in_months: '',
    max_duration_in_months: '',
    period_in_months: '',
    payment_class: '',
    purchase_price: '',
  },
];
export const PAST_PAYMENT_INFO = [
  {
    id: uuidv4(),
    amount: '',
    payment_date: '',
    payment_type: '',
  },
];
export const UPCOMING_PAYMENT_INFO = [
  {
    id: uuidv4(),
    amount: '',
    payment_date: '',
    payment_type: '',
  },
];
export const OUTRIGHT_PAYMENT_INFO = [
  {
    amount: '',
    payment_date: '',
    payment_type: '',
  },
];
export const EQUITY_FIELDS = [
  {
    project_id: '',
    bundle: {
      id: '',
      outright: [],
      paymentplan: {
        payments: [],
        upcomings: [],
      },
    },
  },
];

export const QUICK_PAYMENT_PLAN = [
  {
    initial_deposit_in_value: '',
    periodic_payment: '',
    payment_period_in_months: '',
    payment_frequency: '',
    purchase_price: '',
    plan_type: 'manual',
    contract: '',
    custom_payments: [
      {
        amount: '',
        period_in_months: '',
      },
    ],
  },
];

export const FILLED_PaymentPlan_FIELDS = [
  {
    key: 'Duration',
    value: '6 Months',
  },
  {
    key: 'Unit price',
    value: '#800,000.00',
  },
  {
    key: 'Initial deposit',
    value: '#200,000.00',
  },
  {
    key: 'Quaterly payment',
    value: '#80,000.00',
  },
];
