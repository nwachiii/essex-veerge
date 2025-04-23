import {
  Box,
  Flex,
  Button as ChakraBtn,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import React, {Fragment, useState} from 'react';
import {FaCaretRight} from 'react-icons/fa';
import {themeStyles} from '../../../../../../theme';
import {Button, Popup} from '../../../../../../ui-lib/ui-lib.components';

import callIcon from '/src/images/icons/callIconDark.svg';
import contactPersonIcon from '/src/images/icons/contact-person.png';
import {fetchRolesAccepted} from '../../../../../../apis/settings';
import {useQuery} from '@tanstack/react-query';
import ContactList from './ContactList';
import ContactPersonDrawer from '../../../../../../components/Drawers/listingContactPerson';
import {getAllContactPersons} from 'apis/listings';

export const ContactPersons = ({listingDetail, refetchData}) => {
  const ContactPersonsModal = useDisclosure();
  const [contactState, setContactState] = useState(false);
  const {data, isError, isLoading, refetch, isRefetching} = useQuery(
    ['fetchAcceptedRoles'],
    fetchRolesAccepted
  );
  const ALL_CONTACT_PERSONS_QUERY = useQuery(['getAllContactPersons', listingDetail?.id], () =>
    getAllContactPersons(Number(listingDetail?.id))
  );

  const admin =
    typeof window !== 'undefined' &&
    localStorage.getItem('loggedinUser') &&
    localStorage &&
    JSON.parse(localStorage.getItem('loggedinUser'));

  const roles = data?.data?.results;

  const ALL_CONTACT_PERSONS_DATA = ALL_CONTACT_PERSONS_QUERY?.data?.data?.results;

  return (
    <Fragment>
      <ChakraBtn
        variant="outline-radius"
        maxH="48px"
        fontSize="16px"
        fontWeight="400"
        fontFamily="Euclid Circular B"
        borderColor="#a3a3a3"
        h="48px"
        px="20px"
        maxW={{md: 'full', xl: '280px'}}
        iconSpacing="14.7px"
        onClick={ContactPersonsModal.onOpen}
        leftIcon={<Image alt="" src={callIcon.src} boxSize={'24px'} />}
      >
        Contact Persons
      </ChakraBtn>

      <ContactPersonDrawer
        roles={roles}
        projectId={listingDetail?.id}
        loggedinUserRole={admin?.role ?? ''}
        modalDisclosure={ContactPersonsModal}
        contacts={ALL_CONTACT_PERSONS_DATA ?? []}
        refetch={ALL_CONTACT_PERSONS_QUERY.refetch}
        isLoading={ALL_CONTACT_PERSONS_QUERY.isLoading}
      />
      <Popup minW="492px" minH="486px" pt="35px" pb="15px">
        <Stack pl="19px">
          <Image alt="" src={contactPersonIcon.src} boxSize="68px" />
          <Text fontSize="16px" fontWeight={600}>
            Contact Persons
          </Text>
        </Stack>
        <Popup.Body>
          <Flex
            spacing="24px"
            maxW="421px"
            w="full"
            h="full"
            justifyContent="space-between"
            direction="column"
          >
            <Box h="250px" overflowY="scroll">
              {!contactState ? (
                <ContactList
                  contacts={roles}
                  admin={admin}
                  data={data}
                  isLoading={isLoading}
                  isError={isError}
                />
              ) : null}
            </Box>
            <Button
              mb="10px"
              onClick={() => setContactState(!contactState)}
              w="full"
              bg="#191919"
              color="white"
              variant="tertiary"
            >
              Add Contact Person
            </Button>
          </Flex>
        </Popup.Body>
      </Popup>
    </Fragment>
  );
};

export default ContactPersons;
