import {HStack, Image, Box, Center, VStack, Text} from '@chakra-ui/react';

import treasurer from 'images/resident-profile/treasurer.svg';
import {board} from 'constants/resident';

const Board = () => {
  return (
    <Box w="full" color={'#191919'}>
      <Text fontSize="19px" fontWeight="500" lineHeight="130%">
        Board & Committee Roles
      </Text>
      <HStack
        mt="12px"
        p="16px"
        spacing={'16px'}
        align={'stretch'}
        border={'0.5px solid #E4E4E4'}
        bg="#fff"
        borderRadius={'16px'}
      >
        {board.map(data => (
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
                <Image alt="treasurer" src={treasurer.src} />
              </Center>
              <Text fontSize="13px" fontWeight="500" lineHeight="150%" letterSpacing="0.26px">
                {data.name}
              </Text>
            </HStack>
            <Text fontSize="20px" fontWeight="600" lineHeight="normal">
              {data.ppt}
            </Text>

            <HStack
              spacing={'8px'}
              border={'0.5px solid #E4E4E7'}
              w="fit-content"
              px="6px"
              py="4px"
            >
              <Box boxSize="3px" borderRadius={'full'} bg="#DC2626" />
              <Text
                fontSize="10px"
                fontWeight="400"
                lineHeight="150%"
                letterSpacing={'0.3px'}
                color={'#27272A'}
              >
                {data.firstText}
              </Text>
            </HStack>
          </VStack>
        ))}
      </HStack>
    </Box>
  );
};

export default Board;
