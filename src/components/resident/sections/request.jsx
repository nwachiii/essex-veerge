import {HStack, Image, Box, Center, VStack, Text} from '@chakra-ui/react';

import info from 'images/resident-profile/info.svg';
import {requestOrWorkOrder} from 'constants/resident';

const Request = () => {
  return (
    <Box w="full" color={'#191919'}>
      <HStack w="full" justify={'space-between'}>
        <Text fontSize="19px" fontWeight="500" lineHeight="130%">
          Requests / Work Orders
        </Text>

        {/* <HStack>
               <Text fontSize="19px" fontWeight="500" lineHeight="130%">
                 View Work Order History
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
        {requestOrWorkOrder.map(data => (
          <VStack
            key={data.name}
            align={'stretch'}
            w="256px"
            p="12px"
            spacing={'12px'}
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
                <Image alt="info icon" src={info.src} />
              </Center>
              <Text fontSize="13px" fontWeight="500" lineHeight="150%" letterSpacing="0.26px">
                {data.name}
              </Text>
            </HStack>
            <HStack spacing={'8px'}>
              <Text fontSize="20px" fontWeight="600" lineHeight="normal">
                {data.ppt}
              </Text>
              <Center
                px="12px"
                py="4px"
                fontSize="14px"
                fontWeight="500"
                lineHeight="20px"
                color={data.tagColor}
                bg={data.tagBg}
                borderRadius={'full'}
              >
                {data.tag}
              </Center>
            </HStack>

            <HStack spacing={'8px'}>
              <Text
                fontSize="11px"
                fontWeight="500"
                lineHeight="150%"
                letterSpacing={'0.33px'}
                color={'#52525B'}
              >
                {data.firstText}
              </Text>
              <Box boxSize="3px" borderRadius={'full'} bg="#000" />
              <Text
                fontSize="11px"
                fontWeight="500"
                lineHeight="150%"
                letterSpacing={'0.33px'}
                color={'#27272A'}
              >
                {data.secondText}
              </Text>
            </HStack>
          </VStack>
        ))}
      </HStack>
    </Box>
  );
};

export default Request;
