import {useToast} from '@chakra-ui/react';
import {useQuery} from '@tanstack/react-query';
import {fetchAllListingBundles} from '../../apis/listings';
import {AnimatedLoader} from '../../components/common/loaders';

export const useFetchListingBundles = (id, query) => {
  const toast = useToast();
  const queryString = query ? `&${query}` : '';

  const {data, isError, isLoading} = useQuery(['listingBundles', id, queryString], () =>
    fetchAllListingBundles(id, queryString)
  );
  // if (isLoading) {
  //   return <AnimatedLoader />;
  // }
  // if (isError) {
  // 	return toast({
  // 		title: `An error occured `,
  // 		status: 'error',
  // 		duration: 5000,
  // 		isClosable: true,
  // 		position: 'top-right',
  // 	});
  // }
  // console.log(data.data.results)
  return {
    listingBundles: data?.data?.results,
    isLoading,
    isError,
  };
};
