import {Box, Flex, Image, Stack, Text, Button} from '@chakra-ui/react';
import React, {useState} from 'react';
import minus from '../../../../../../images/contact-person-minus.png';
import add from '../../../../../../images/contact-person-add.png';
import {AnimatedLoader} from '../../../../../../components';
import {formatPhoneNumber} from '../../../../../../utils';

const ContactList = ({contacts, isLoading, isError}) => {
  return (
    <Stack py="6" spacing="24px">
      {isLoading ? (
        <AnimatedLoader />
      ) : isError ? (
        <div>Error!</div>
      ) : (
        contacts?.map((member, indx) => (
          <>
            {/* {member.role.toLowerCase() == 'director' && ( */}
            <Member member={member} indx={indx} />
            {/* )} */}
          </>
        ))
      )}
    </Stack>
  );
};

const Member = ({indx, member}) => {
  const [aboutToDelete, setAboutToDelete] = useState(false);
  return (
    <Flex
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      key={indx}
      pb="18px"
      bg="#E4E4E4"
      px="10px"
      py="8px"
      borderRadius="12px"
    >
      <Box>
        <Text fontWeight="400" fontSize="16px" lineHeight="20px">
          {member?.name}
        </Text>
        <Text fontWeight="400" fontSize="24px" lineHeight="30px">
          {formatPhoneNumber(member?.phone_number)}
        </Text>
      </Box>
      {aboutToDelete ? (
        <Flex direction="row" justifyContent="center" alignItems="center">
          <Image alt="" src={add.src} />
          <Button
            ml="10px"
            borderRadius="13px"
            color="rgb(255, 106, 106)"
            bg="rgba(255, 106, 106, 0.1)"
            p="11px"
          >
            Confirm
          </Button>
        </Flex>
      ) : (
        <Image alt="" onClick={() => setAboutToDelete(true)} src={minus.src} />
      )}
    </Flex>
  );
};

export default ContactList;
