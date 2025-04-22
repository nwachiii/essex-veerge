import {Box, Stack, Text} from '@chakra-ui/react';
import React from 'react';

export const TransferOwnership = () => {
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
      <Text>
        To facilitate a smooth transition of ownership for a Veerge account, it is important to
        follow a specific process. This ensures a secure transfer and effective management of the
        account. Here are the steps to proceed:{' '}
      </Text>
      <Box>
        <Text display={'flex'} gap="4px">
          <span>1. </span>
          <span>
           {` Verify the Company Representative's Personally Identifiable Information (PII) and Obtain
            Authorization:`}
          </span>
        </Text>
        <Text pl={3} pr={2} display={'flex'} gap="4px">
          <span>•</span>
          <span>
            Contact the Company Representative via phone to verify their identity and gather the
            necessary information.
          </span>
        </Text>
      </Box>
      <Box>
        <Text display={'flex'} gap="4px">
          <span>2. </span>
          <span>Prepare a Letter from a Company Signatory:</span>
        </Text>
        <Text pl={3} pr={2} display={'flex'} gap="4px">
          <span>•</span>
          <span>{`The letter should be on your company's official letterhead.`}</span>
        </Text>
        <Text pl={3} pr={2} display={'flex'} gap="4px">
          <span>•</span>
          <span>
            Explicitly authorize the appointment of the new Company Representative and the transfer
            of ownership to a specified user.
          </span>
        </Text>
      </Box>
      <Box>
        <Text display={'flex'} gap="4px">
          <span>3. </span>
          <span>Include the following information in the letter:</span>
        </Text>
        <Text pl={3} pr={2} display={'flex'} gap="4px">
          <span>•</span>
          <span>Business name</span>
        </Text>
        <Text pl={3} pr={2} display={'flex'} gap="4px">
          <span>•</span>
          <span>Business tax ID</span>
        </Text>
        <Text pl={3} pr={2} display={'flex'} gap="4px">
          <span>•</span>
          <span>Business address</span>
        </Text>
        <Text pl={3} pr={2} display={'flex'} gap="4px">
          <span>•</span>
          <span>{`Previous Company Representative's name and date of birth (if available)`}</span>
        </Text>
        <Text pl={3} pr={2} display={'flex'} gap="4px">
          <span>•</span>
          <span>{`New Company Representative's name and date of birth`}</span>
        </Text>
        <Text pl={3} pr={2} display={'flex'} gap="4px">
          <span>•</span>
          <span>
            {`New Owner Administrator's email address (the one they use to log in to Veerge)`}
          </span>
        </Text>
        <Text pl={3} pr={2} display={'flex'} gap="4px">
          <span>•</span>
          <span>
            The signatory on this letter should not be the same person being appointed as the new
            Company Representative. For example, if the CEO is becoming the Company Representative,
            another board member or a member of the C-suite should sign and authorize the letter.
          </span>
        </Text>
      </Box>
      <Box>
        <Text display={'flex'} gap="4px">
          <span>4. </span>
          <span>Ensure Owner Administrator Login Control:</span>
        </Text>
        <Text pl={3} pr={2} display={'flex'} gap="4px">
          <span>•</span>
          <span>
            It is strongly recommended for the person who holds the title of Company Representative
            to also control the Owner Administrator login for the Veerge account. This ensures
            smoother management and avoids complications in the future.
          </span>
        </Text>
      </Box>
      <Box>
        <Text>
          By following these steps, you can facilitate a secure and successful transfer of ownership
          for the Veerge account, ensuring that it is properly managed by the designated individual
          or entity.
        </Text>
      </Box>
    </Stack>
  );
};

export default TransferOwnership;
