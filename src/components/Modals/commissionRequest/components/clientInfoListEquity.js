import {
  HStack,
  Heading,
  Image,
  Badge,
  Radio,
  Box,
  RadioGroup,
  Stack,
  Text,
  VStack,
  Center,
  Skeleton,
} from '@chakra-ui/react';
import React from 'react';
import avatar from '/src/images/avatar.svg';
import arrow from '/src/images/icons/right_arrow.png';
import suspicionIcon from '/src/images/icons/Paper_Fail.svg';

import selectedIcon from '/src/images/icons/mark_icon.svg';
import {useState} from 'react';
import SelectEquityRadio from './selectEquityRadio';

export const ClientInfoAndListOfEquity = ({
  equityListObj: {data: equityData, isLoading, isError},
  commissionRequestObj: {data},
  submitInfo,
  setClientData,
  handleSubScreens,
  customScrollbarStyles,
  selectedEquityId,
  setSelectedEquityId,
}) => {
  return (
    <Stack
      flex={`1`}
      p={`12px`}
      border="0.5px solid #E4E4E4"
      borderRadius="12px"
      spacing="15px"
      background={`#FBFCFC`}
    >
      <Heading
        as="h1"
        fontSize="12px"
        color="#606060"
        fontWeight="400"
        m={`0px`}
        lineHeight={`100%`}
      >
        Client Information
      </Heading>
      <HStack gap={`8px`}>
        <Center
          h={`40px`}
          w={`40px`}
          minWidth={`40px`}
          borderRadius={`50%`}
          overflow={`hidden`}
          position={`relative`}
        >
          <Skeleton
            h={`40px`}
            w={`40px`}
            minWidth={`40px`}
            startColor="#F5F5F5"
            endColor="#F5F5F5"
            isLoaded={data?.customer?.avatar}
          >
            <Image
              src={data?.customer?.avatar ?? avatar.src}
              alt="client image"
              objectFit="cover"
              minW={`100%`}
              minH={`100%`}
            />
          </Skeleton>
        </Center>
        <VStack align="start" gap="4px">
          <Text
            color="#191919"
            textTransform="capitalize"
            as="span"
            fontSize="12px"
            fontWeight="500"
            m={`0px`}
          >
            {`${data?.customer?.first_name ?? '-'} ${data?.customer?.last_name ?? '-'}`}
          </Text>
          <Text color="#4545FE" as="span" fontSize="10px" fontWeight="400" m={`0px`}>
            {data?.customer?.email ?? '-'}
          </Text>
        </VStack>
      </HStack>
      {isLoading || isError ? null : equityData?.suspicious && !equityData?.data?.length ? (
        <VStack
          borderRadius="10px"
          spacing="none"
          justify="center"
          w="full"
          bg="#F5F5F5"
          h="247px"
          color="#3D3D3D"
        >
          <Image mt="15px" mb="13px" src={suspicionIcon.src} alt="suspicious activity icon" />
          <Text as="span" fontSize="15px" fontWeight="400">
            Nothing Found
          </Text>
          <Text as="span" fontSize="12px" fontWeight="400">
            No listing matches the criteria
          </Text>
        </VStack>
      ) : (
        <VStack spacing="10px" w="full" flex={`1`}>
          <Heading
            as="h3"
            fontSize="12px"
            textAlign="start"
            w="full"
            fontWeight="400"
            color={`#606060`}
          >
            Kindly select property that matches the request
          </Heading>
          <Stack
            bg="#F5F5F5"
            borderRadius="4px"
            overflowY="hidden"
            minH="227px"
            h={`100%`}
            w="full"
            p={`10px`}
          >
            <Stack sx={customScrollbarStyles} pr="17px" w="full" overflowY="scroll" h="227px">
              <SelectEquityRadio
                handleSubScreens={handleSubScreens}
                setSelectedEquityId={setSelectedEquityId}
                setClientData={setClientData}
                agentId={data?.agent?.agentId}
                selectedEquityId={selectedEquityId}
                equityList={equityData?.data}
              />
            </Stack>
          </Stack>
        </VStack>
      )}
    </Stack>
  );
};

export default ClientInfoAndListOfEquity;
