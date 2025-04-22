import {useQuery} from '@tanstack/react-query';
import {fetchListings} from '/src/apis/listings';
import {useToast} from '@chakra-ui/react';
import {AnimatedLoader} from '../../components/common/loaders';
import {getListings} from 'apis/listings';

export const useFetchAllListings = (query = null) => {
  const queryString = query ? `?${query}` : '';

  const toast = useToast();
  const {data, isError, isLoading} = useQuery(['listing-data', queryString], () =>
    getListings(queryString)
  );
  if (isLoading) {
    return <AnimatedLoader />;
  }
  if (isError) {
    return toast({
      title: 'An error occured',
      status: 'error',
      duration: 3500,
      isClosable: true,
      position: 'top-right',
    });
  }

  return {
    listingInfo: data && data?.data?.data,
    isLoading,
    isError,
  };
};
