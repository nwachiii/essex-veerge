import {HStack, Image, Box, Text, Flex} from '@chakra-ui/react';

import edit from 'images/resident-profile/edit.svg';

const NextOfKin = () => {
  return (
    <Box w="full" color={'#191919'}>
      <HStack w="full" justify={'space-between'}>
        <Text fontSize="19px" fontWeight="500" lineHeight="130%">
          Next of Kin Details
        </Text>

        <HStack>
          <Text fontSize="19px" fontWeight="500" lineHeight="130%">
            Edit Details
          </Text>
          <Image alt="edit icon" src={edit.src} />
        </HStack>
      </HStack>

      <Flex
        mt="12px"
        p="16px"
        // columnGap={'24px'}
        rowGap={'16px'}
        align={'stretch'}
        border={'0.5px solid #E4E4E4'}
        bg="#fff"
        borderRadius={'16px'}
        flexWrap={'wrap'}
        justify={'space-between'}
      >
        <Box
          w="49.3%"
          h="80px"
          flexDir={'column'}
          p="16px"
          border={'0.8px solid #E4E4E4'}
          bg="#FBFCFC"
          borderRadius={'12px'}
        >
          <Text fontSize="13px" fontWeight="500" color="#52525B">
            Legal First Name
          </Text>
          <Text mt="8px" fontSize="16px" fontWeight="500" lineHeight="normal">
            John
          </Text>
        </Box>
        <Box
          w="49.3%"
          h="80px"
          flexDir={'column'}
          p="16px"
          border={'0.8px solid #E4E4E4'}
          bg="#FBFCFC"
          borderRadius={'12px'}
        >
          <Text fontSize="13px" fontWeight="500" color="#52525B">
            Legal Last Name
          </Text>
          <Text mt="8px" fontSize="16px" fontWeight="500" lineHeight="normal">
            Edwards
          </Text>
        </Box>
        <Box
          w="33%"
          h="80px"
          flexDir={'column'}
          p="16px"
          border={'0.8px solid #E4E4E4'}
          bg="#FBFCFC"
          borderRadius={'12px'}
        >
          <Text fontSize="13px" fontWeight="500" color="#52525B">
            Relationship
          </Text>
          <Text mt="8px" fontSize="16px" fontWeight="500" lineHeight="normal">
            Brother
          </Text>
        </Box>
        <Box
          w="32%"
          h="80px"
          flexDir={'column'}
          p="16px"
          border={'0.8px solid #E4E4E4'}
          bg="#FBFCFC"
          borderRadius={'12px'}
        >
          <Text fontSize="13px" fontWeight="500" color="#52525B">
            Email Address
          </Text>
          <Text mt="8px" fontSize="16px" fontWeight="500" color="#4545FE">
            Edwarjean34@gmail.comds
          </Text>
        </Box>
        <Box
          w="32%"
          h="80px"
          flexDir={'column'}
          p="16px"
          border={'0.8px solid #E4E4E4'}
          bg="#FBFCFC"
          borderRadius={'12px'}
        >
          <Text fontSize="13px" fontWeight="500" color="#52525B">
            Phone
          </Text>
          <Text mt="8px" fontSize="16px" fontWeight="500" lineHeight="normal">
            +1 217 555-0113
          </Text>
        </Box>
        <Box
          w="100%"
          h="80px"
          flexDir={'column'}
          p="16px"
          border={'0.8px solid #E4E4E4'}
          bg="#FBFCFC"
          borderRadius={'12px'}
        >
          <Text fontSize="13px" fontWeight="500" color="#52525B">
            Residential Address
          </Text>
          <Text mt="8px" fontSize="16px" fontWeight="500" lineHeight="normal">
            114 Dublin Dr Mineral Wells, West Virginia(WV)
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default NextOfKin;
