import {Box, Stack, Text} from '@chakra-ui/react';
import React from 'react';

export const WhatIsPaymentPlan = () => {
  return (
    <Stack
      mt="15px"
      spacing="27px"
      color="#000"
      fontFamily="Euclid Circular B"
      fontSize="16px"
      fontStyle="normal"
      fontWeight="300"
    >
      <Box>
        <Text>
          {' '}
          In real estate, a Payment Plan refers to an arrangement made between a buyer and a seller
          for the purchase of a property, allowing the buyer to pay for the property over an
          extended period of time, typically in installments, instead of making a lump sum payment
          upfront.{' '}
        </Text>
        <Text>
          <b style={{fontWeight: '600'}}>Payment Plans</b> are also known as installment plans,
          seller financing, or seller carry-back.
        </Text>
      </Box>
      <Box>
        <Text>
          On Veerge, there are two types of payment plans available: the{' '}
          <b style={{fontWeight: '600'}}>Quick Payment Plan</b> and the{' '}
          <b style={{fontWeight: '600'}}>Custom Payment Plan</b>.
        </Text>
      </Box>
      <Box>
        <Text>
          {`For example, let's consider a property listed for sale at 100 million Naira outright. To
          provide buyers with convenience, the seller offers payment plan options. Under the quick
          payment plan, buyers can choose to pay an initial 20 million Naira and spread the
          remaining amount over 1 year.`}
        </Text>
      </Box>
      <Box>
        <Text>
          {' '}
          The payment structures can be set as fixed amounts in weekly, monthly, or quarterly
          installments. For instance, the buyer could opt for 1.6 million Naira weekly, 6.8 million
          Naira monthly, or 20.5 million Naira quarterly (interest inclusive).{' '}
        </Text>
      </Box>
      <Box>
        <Text>
          {' '}
          These payment plan types are all considered quick payment plans, including flexible
          payment plans.{' '}
        </Text>
      </Box>
      <Box>
        <Text>
          {' '}
          A <b style={{fontWeight: '600'}}>Flexible Payment Plan</b> is also a type of quick payment
          plan. In this case, the buyer can make payments at their convenience without following a
          specific instalment schedule, as long as it is within the agreed-upon payment plan period.{' '}
        </Text>
      </Box>
      <Box>
        <Text>
          {' '}
          On the other hand, a <b style={{fontWeight: '600'}}>Custom Payment Plan </b> differs
          slightly. Suppose the property is listed for 100 million Naira outright, but the payment
          plan structure involves an initial deposit of 20 million Naira, followed by subsequent
          payments of 30 million Naira after 3 months, 25 million Naira after another 3 months, 20
          million Naira after an additional 3 months, and finally 10 million Naira after a final 3
          months.{' '}
        </Text>
      </Box>
      <Box>
        <Text>
          In a <b style={{fontWeight: '600'}}>Custom Payment Plan</b> {`on Veerge, the amounts and
          intervals of payments are not fixed and can vary.It's important to note that for every
          payment plan created on Veerge, a contract must be uploaded. This contract serves as the
          purchase agreement, and buyers are required to agree to its terms before completing the
          purchase.`}
        </Text>
      </Box>
      <Box>
        <Text>
          If you need any assistance kindly contact{' '}
          <a target="_blank" style={{color: '#4545FE'}} href="#">
            support.
          </a>
        </Text>
      </Box>
    </Stack>
  );
};

export default WhatIsPaymentPlan;

/*













    */
