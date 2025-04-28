import {HStack, Image, Box, Center, Text, Flex} from '@chakra-ui/react';

import edit from 'images/resident-profile/edit.svg';

const ResidentAdditionalInfo = () => {
  return (
    <Box w="full" color={'#191919'}>
      <HStack w="full" justify={'space-between'}>
        <Text fontSize="19px" fontWeight="500" lineHeight="130%">
          Resident’s Additional Information
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
        <Center
          w="37%"
          h="117px"
          flexDir={'column'}
          p="12px"
          gap={'10px'}
          border={'0.8px solid #E4E4E4'}
          bg="#FBFCFC"
          borderRadius={'12px'}
        >
          <Text fontSize="14px" fontWeight="400" color="#27272A">
            Education
          </Text>
          <Text fontSize="20px" fontWeight="600" lineHeight="normal">
            MBA
          </Text>
        </Center>
        <Center
          w="30%"
          h="117px"
          flexDir={'column'}
          p="12px"
          gap={'10px'}
          border={'0.8px solid #E4E4E4'}
          bg="#FBFCFC"
          borderRadius={'12px'}
        >
          <Text fontSize="14px" fontWeight="400" color="#27272A">
            Occupation
          </Text>
          <Text fontSize="20px" fontWeight="600" lineHeight="normal">
            Software Engineer
          </Text>
        </Center>
        <Center
          w="30%"
          h="117px"
          flexDir={'column'}
          p="12px"
          gap={'10px'}
          border={'0.8px solid #E4E4E4'}
          bg="#FBFCFC"
          borderRadius={'12px'}
        >
          <Text fontSize="14px" fontWeight="400" color="#27272A">
            Marital Status
          </Text>
          <Text fontSize="20px" fontWeight="600" lineHeight="normal">
            Single
          </Text>
        </Center>

        <Center
          w="32%"
          h="117px"
          flexDir={'column'}
          p="12px"
          gap={'10px'}
          border={'0.8px solid #E4E4E4'}
          bg="#FBFCFC"
          borderRadius={'12px'}
        >
          <Text fontSize="14px" fontWeight="400" color="#27272A">
            Company Name
          </Text>
          <Text fontSize="20px" fontWeight="600" lineHeight="normal">
            Meta
          </Text>
        </Center>
        <Center
          w="32%"
          h="117px"
          flexDir={'column'}
          p="12px"
          gap={'10px'}
          border={'0.8px solid #E4E4E4'}
          bg="#FBFCFC"
          borderRadius={'12px'}
        >
          <Text fontSize="14px" fontWeight="400" color="#27272A">
            Date of Birth
          </Text>
          <Text fontSize="20px" fontWeight="600" lineHeight="normal">
            Jan 27, 1988
          </Text>
        </Center>
        <Center
          w="33%"
          h="117px"
          flexDir={'column'}
          p="12px"
          gap={'10px'}
          border={'0.8px solid #E4E4E4'}
          bg="#FBFCFC"
          borderRadius={'12px'}
        >
          <Text fontSize="14px" fontWeight="400" color="#27272A">
            Joined Date
          </Text>
          <Text fontSize="20px" fontWeight="600" lineHeight="normal">
            Sep 04, 2021
          </Text>
        </Center>

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
            Mailing Address
          </Text>
          <Text mt="8px" fontSize="16px" fontWeight="500" lineHeight="normal">
            742 Evergreen Terrace Springfield, IL 62704
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
            4th Avenue, Roseline Close
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
            Employment Address
          </Text>
          <Text mt="8px" fontSize="16px" fontWeight="500" lineHeight="normal">
            344 Dublin Dr Mineral Wells, West Virginia(WV)
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default ResidentAdditionalInfo;
