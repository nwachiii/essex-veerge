import {Box, HStack, Text, useToast, VStack} from '@chakra-ui/react';
import {useQuery} from '@tanstack/react-query';
import {useRouter} from 'next/router';
import React from 'react';
import {fetchInspectionHistory} from '../../../../apis/fetchInspection';
import {LayoutView} from '../../../../components/PageLayout/LayoutView';
import {BackArrowWithText} from '../../../../components/assets/BackArrow';
import {AnimatedLoader, Spinner} from '../../../../components/common/loaders/AnimatedLoader';
import {InspectionDetails} from './InspectionDetails';

export const InspectionHistory = () => {
  const router = useRouter();
  const {id} = router.query;
  const [addedParam, setAddedParam] = React.useState('');

  const param = {addedParam, id};

  console.log(id);
  const toast = useToast();

  const {data, isLoading, isError, error} = useQuery(['inspectionHistory', param], () =>
    fetchInspectionHistory(param)
  );

  // console.log('data:', data, 'err:', isError, error);

  if (isError) {
    toast({
      title: 'An error occured',
      status: 'error',
      duration: 8000,
      isClosable: true,
      position: 'top-right',
    });
    return (
      <LayoutView>
        <Box mt="20px">
          <BackArrowWithText text="Back" />
        </Box>
        <Text mt="50px">Oops something went wrong</Text>
      </LayoutView>
    );
  }
  return (
    <LayoutView>
      <Box mt="20px">
        <BackArrowWithText text="Back" />
      </Box>

      <VStack mt="23px" minH="80vh" w="full" pb="50px">
        {isLoading ? (
          <AnimatedLoader />
        ) : isError ? (
          <div></div>
        ) : !data.data.message.length ? (
          <Text>no Inspection History available</Text>
        ) : (
          <HStack w="full" spacing="25px" align="start" justify="center">
            {/* <PropertyProfileAside data={data.data.user} /> */}

            <InspectionDetails
              user={data.data.user}
              isLoading={isLoading}
              addedParam={addedParam}
              setAddedParam={setAddedParam}
              isError={isError}
              data={data.data.message}
            />
          </HStack>
        )}
      </VStack>
    </LayoutView>
  );
};

export default InspectionHistory;
