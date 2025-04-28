import {
  Button as ChakraBtn,
  Image,
  useDisclosure,
} from '@chakra-ui/react';
import React, {Fragment, useState} from 'react';

import callIcon from '/src/images/icons/security-user.svg';
import {fetchRolesAccepted} from '../../../../../../apis/settings';
import {useQuery} from '@tanstack/react-query';
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
        fontSize="16px"
        fontWeight="500"
        fontFamily="Euclid Circular B"
        borderColor="#E4E4E7"
        h="65px"
        px="20px"
        w='full'
        maxW='full'
        iconSpacing="10px"
        onClick={ContactPersonsModal.onOpen}
        leftIcon={<Image alt="" src={callIcon.src} boxSize={'24px'} />}
      >
       Community Account Managers
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
    </Fragment>
  );
};

export default ContactPersons;
