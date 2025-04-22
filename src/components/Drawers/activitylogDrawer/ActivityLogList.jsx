import React from 'react';
import ActivityComponent from './ActivityComponent';
import {Image, Spinner, Stack, Text, VStack} from '@chakra-ui/react';
import emptyIcon from '/src/images/icons/emptyIcon.png';

export const ActivityLogList = ({isLoading, isError, data, error, user_drawer, type = ''}) => {
  const getDays = array => {
    let arr = array?.map(item => {
      return item?.day;
    });
    let set = new Set(arr);
    return [...set];
  };

  const groupByDay = prop => {
    let groups = getDays(prop);
    const group = groups?.map(item => {
      let obj = {};
      let filtered;

      filtered = prop.filter(data => data.day === item);

      obj.day = item;
      obj.info = filtered;

      return obj;
    });
    return group;
  };
  return (
    <>
      {isLoading ? (
        <VStack w="full" justify="center" align="center" h="20vh">
          <Spinner />
        </VStack>
      ) : isError ? (
        <VStack w="full" justify="center" align="center" h="40vh">
          <Text fontSize="14px" fontWeight="400" textAlign="center" w="300px" color="#000">
            {`${
              error?.response?.status === 500
                ? "Apologies for the inconvenience. We're working on it. Please try again later."
                : error?.response?.status === 401
                  ? 'Authentication Timeout: For security reasons, your session has timed out. Please log in again to continue.'
                  : error?.response?.data?.message ??
                    error?.response?.message ??
                    error?.message ??
                    'Something went wrong'
            }`}
          </Text>
        </VStack>
      ) : !groupByDay(data?.data?.data)?.length ? (
        <VStack w="full" justify="center" spacing="14px" align="center" h="70vh">
          <Image src={emptyIcon.src} alt="empty icon" />
          <Text fontSize="14px" fontWeight="400" color="#606060">
            No activity yet
          </Text>
        </VStack>
      ) : (
        <Stack spacing="17px" mt="7.7px">
          {groupByDay(data?.data?.data).map((item, index) => {
            if (item === null) {
              return undefined;
            }
            return (
              <React.Fragment key={index}>
                <ActivityComponent item={item} user_drawer={user_drawer} />
              </React.Fragment>
            );
          })}
        </Stack>
      )}
    </>
  );
};

export default ActivityLogList;
