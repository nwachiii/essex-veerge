import React from 'react';
import {useRouter} from 'next/router';
import {useQuery} from '@tanstack/react-query';
import {InspectionDetails} from './InspectionDetails';
import PropertyProfileAside from './PropertyProfileAside';
import {LayoutView} from '/src/components/PageLayout/LayoutView';
import {fetchInspectionHistory} from '/src/apis/fetchInspection';
import {BackArrowWithText} from '/src/components/assets/BackArrow';
import {Box, HStack, Text, useToast, VStack} from '@chakra-ui/react';
import {Spinner} from '/src/components/common/loaders/AnimatedLoader';

const InspectionHistory = () => {
  const router = useRouter();
  const {id} = router.query;

  console.log(id);
  const toast = useToast();

  const {data, isLoading, isError, error} = useQuery(['inspectionHistory', id], () =>
    fetchInspectionHistory(id)
  );

  console.log('data:', data, 'err:', isError, error);

  console.log(
    !isLoading &&
      data.data.message[0]?.time.split(' ')[2] + data.data.message[0]?.time.split(' ')[3]
  );
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
          <Spinner />
        ) : isError ? (
          <div></div>
        ) : !data.data.message.length ? (
          <Text>no inspection History available</Text>
        ) : (
          <HStack w="full" spacing="25px" align="start" justify="center">
            <PropertyProfileAside />

            <InspectionDetails isLoading={isLoading} isError={isError} data={data.data.message} />
          </HStack>
        )}
      </VStack>
    </LayoutView>
  );
};

export default InspectionHistory;
