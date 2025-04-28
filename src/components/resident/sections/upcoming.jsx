import {HStack, Image, Box, Center, VStack, Text} from '@chakra-ui/react';

import {upcomingReserve} from 'constants/resident';

const UpcomingReserve = () => {
  return (
    <Box w="full" color={'#191919'}>
      <HStack w="full" justify={'space-between'}>
        <Text fontSize="19px" fontWeight="500" lineHeight="130%">
          Upcoming Reservations / Events
        </Text>

        {/* <HStack>
        <Text fontSize="19px" fontWeight="500" lineHeight="130%">
          View Reservation History
        </Text>
        <ChevronRightIcon fontSize={25} />
      </HStack> */}
      </HStack>
      <HStack
        mt="12px"
        p="16px"
        spacing={'16px'}
        align={'stretch'}
        border={'0.5px solid #E4E4E4'}
        bg="#fff"
        borderRadius={'16px'}
      >
        {upcomingReserve.map(data => (
          <VStack
            key={data.name}
            align={'stretch'}
            w="256px"
            p="12px"
            spacing={'8px'}
            border={'0.8px solid #E4E4E4'}
            bg="#FBFCFC"
            borderRadius={'16px'}
          >
            <HStack spacing={'8px'}>
              <Center
                borderRadius={'full'}
                boxSize={'36px'}
                border={'1px solid #E4E4E7'}
                bg="#FAFAFA"
              >
                <Image alt="data icon" src={data.icon} />
              </Center>
              <Text fontSize="13px" fontWeight="500" lineHeight="150%" letterSpacing="0.26px">
                {data.name}
              </Text>
            </HStack>
            <VStack spacing={'0'} w="full" align={'stretch'}>
              <Text
                fontSize="11px"
                fontWeight="500"
                lineHeight="150%"
                letterSpacing="0.33px"
                color={'#DC2626'}
              >
                {data.month}
              </Text>
              <Text fontSize="33px" fontWeight="500" lineHeight="130%" color={'#000'}>
                {data.day}
              </Text>
            </VStack>

            <Box bg={data.tagBg} px="5px" py="4px" maxW={'156px'}>
              <VStack
                spacing={'4px'}
                align={'stretch'}
                w="full"
                pl="8px"
                borderLeft={'4px solid'}
                borderColor={data.tagLeftColor}
              >
                <Text
                  fontSize="13px"
                  fontWeight="500"
                  lineHeight="150%"
                  letterSpacing={'0.26px'}
                  color={data.tagColor}
                >
                  {data.firstText}
                </Text>
                <Text
                  fontSize="13px"
                  fontWeight="400"
                  lineHeight="150%"
                  letterSpacing={'0.26px'}
                  color={data.tagColor}
                >
                  {data.secondText}
                </Text>
              </VStack>
            </Box>
          </VStack>
        ))}
      </HStack>
    </Box>
  );
};

export default UpcomingReserve;
