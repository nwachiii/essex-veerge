import React, {useEffect, useState} from 'react';
import {useFormik} from 'formik';
import {useMutation, useQuery} from '@tanstack/react-query';
import {extendTheme, useDisclosure} from '@chakra-ui/react';

import {theme} from '/src/theme';
import {MATADOR_CREATE_LISTING_INFO} from '/src/constants/createListing';
import axios from 'utils/axiosInstance';
import {fetchRolesAccepted} from '/src/apis/settings.js';
import {useRouter} from 'next/router';

export default function Publish() {
  const ADD_CONTACT_PERSONS = useDisclosure();
  const router = useRouter();
  const [checkedItems, setCheckedItems] = useState([]);
  const [internalCommission, setInternalCommission] = useState(null);
  const [externalCommission, setExternalCommission] = useState(null);
  const {
    data: FETCH_ROLES_DATA,
    isError: FETCH_ROLES_ERROR,
    isLoading: FETCH_ROLES_LOADING,
    refetch,
    isRefetching,
  } = useQuery(['fetchAcceptedRoles'], fetchRolesAccepted);

  const FETCH_ROLES__RESULTS =
    FETCH_ROLES_DATA && FETCH_ROLES_DATA?.data?.results?.map(item => item);
  const listingInfo = JSON.parse(localStorage.getItem('listingInfo'));

  const mutation = useMutation(formData => {
    return axios.post('/api', formData);
  });
  const formik = useFormik({
    initialValues: MATADOR_CREATE_LISTING_INFO,
    onSubmit: values => {
      mutation.mutate(JSON.stringify(values, null, 2));
      // console.log('data: ', {...MATADOR_CREATE_LISTING_INFO, ...values});
      formData.push(JSON.stringify(values));
    },
  });

  const checkedContacts = checkedItems
    .map(item => FETCH_ROLES__RESULTS.filter(entry => entry?.id == item))
    .map(([i]) => i);

  const handleRemove = arg => {
    const copy = [...checkedItems];
    for (let index = 0; index < checkedItems.length; index++) {
      if (copy[index] === arg?.id) {
        copy.splice(index, 1);
        index = copy.length;
      }
      setCheckedItems(copy);
    }
  };

  useEffect(() => {
    router.reload();
  }, [router]);

  return <div></div>;
}
