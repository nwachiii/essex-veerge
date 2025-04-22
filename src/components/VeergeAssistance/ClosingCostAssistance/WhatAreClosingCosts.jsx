import {Box, Stack, Text} from '@chakra-ui/react';
import React from 'react';

export const WhatAreClosingCosts = () => {
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
         {` Closing costs encompass the various expenses and fees that arise during the purchase of a
          property. These costs are additional to the property's purchase price and cover various
          aspects of the transaction.`}
        </Text>
      </Box>
      <Box>
        <Text>To include closing costs on a Unit:</Text>
      </Box>
      <Box>
        <Text>
          <span style={{fontWeight: '500'}}>Step 1:{` `}</span>
          <span>
            Specify the type of closing cost. Common examples include Homeowners Association (HOA)
            fees, Attorney or Legal fees, development levy, Miscellaneous fees, property taxes, etc.
          </span>
        </Text>
      </Box>
      <Box>
        <Text>
          <span style={{fontWeight: '500'}}>Step 2:{` `}</span>
          <span>Enter the corresponding amount for each closing cost.</span>
        </Text>
      </Box>
      <Box>
        <Text>
          <span style={{fontWeight: '500'}}>Step 3:{` `}</span>
          <span>
            {' '}
           {` If there are multiple closing costs, click on the 'Add Fee' button to include them
            separately.`}
          </span>
        </Text>
      </Box>
      <Box>
        <Text>
          <span style={{fontWeight: '500'}}>Step 4:{` `}</span>
          <span>
            Once you have entered all the necessary closing costs, proceed to the next step.
          </span>
        </Text>
      </Box>
      <Box>
        <Text>
          {`If you require any assistance during this process, please don't hesitate to contact our
          support team. We are here to help.`}
        </Text>
      </Box>
    </Stack>
  );
};

export default WhatAreClosingCosts;
