import {useQuery} from '@tanstack/react-query';
import {fetchAllArchivedUnits} from '../../apis/listings';
import {AnimatedLoader} from '../../components';
import {SwalError} from '../ui-lib.components';
import {useToast} from '@chakra-ui/react';

export const useFetchArchivedUnits = () => {
  const toast = useToast();
  const {data, isError, isLoading} = useQuery(['archived_units'], fetchAllArchivedUnits);
  if (isLoading) {
    return <AnimatedLoader />;
  }
  if (isError) {
    return toast({
      title: ` Kindly refresh the page' `,
      status: 'error',
      duration: 5000,
      isClosable: true,
      position: 'top-right',
    });
  }

  // console.log(data);

  // return {
  // 	archivedUnits : data.data.project,
  // 	isLoading,
  // 	isError
  // };
};
