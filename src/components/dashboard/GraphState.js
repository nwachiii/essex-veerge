import React from 'react';
import {Box, Flex, Divider, HStack, Image, Stack, VStack, Heading, Text} from '@chakra-ui/react';
import graphRightIcon from '/src/images/icons/graphRightIcon.svg';
import graphLeftIcon from '/src/images/icons/graphLeftIcon.svg';

const GraphState = () => {
  const yAxis = ['50m', '40m', '30m', '20m', '10m', '0'];

  const xAxis = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];
  return (
    <HStack w="50%" h="150px" spacing="9px">
      {/* <HStack alignSelf="start" spacing="16px">
        <Image alt="img" src={graphLeftIcon.src} />
        <VStack
          h="130px"
          //   spacing="14px"
          justify="space-between"
          borderRight="solid 1px #E4E4E4"
        >
          {yAxis.map((item, idx) => {
            return (
              <Text fontSize="10px" fontWeight="400" color="#919191" key={idx}>
                {item}
              </Text>
            );
          })}
        </VStack>
      </HStack> */}
      <HStack
        justify="space-between"
        spacing="14px"
        alignSelf="end"
        w="full"
        borderTop="solid 3px #F5F5F5"
      >
        {xAxis.map((item, idx) => {
          return (
            <Text fontSize="10px" fontWeight="500" color="#919191" key={idx}>
              {item}
            </Text>
          );
        })}
      </HStack>
      <VStack
        w="36px"
        alignSelf="start"
        h="130px"
        boxShadow="-12px 0px 12px rgba(0, 0, 0, 0.02)"
        justify="center"
      >
        <Image alt="img" src={graphRightIcon.src} />
      </VStack>
    </HStack>
  );
};

export default GraphState;
