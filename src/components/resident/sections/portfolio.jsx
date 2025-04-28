import {HStack, Image, Box, Center, VStack, Text, Button as ChakraButton} from '@chakra-ui/react';

import {portfolio} from 'constants/resident';

const Button = ({children, ...rest}) => (
  <ChakraButton _hover={{opacity: 1}} _active={{opacity: 1}} h="55px" {...rest}>
    {children}
  </ChakraButton>
);

const Portfolio = () => {
  return (
    <Box w="full" color={'#191919'}>
      <HStack w="full" justify={'space-between'}>
        <Text fontSize="19px" fontWeight="500" lineHeight="130%">
          Portfolio
        </Text>

        {/* <HStack>
            <Text fontSize="19px" fontWeight="500" lineHeight="130%">
              Link New Unit
            </Text>
            <SmallAddIcon fontSize={25} />
          </HStack> */}
      </HStack>
      <VStack
        mt="12px"
        p="16px"
        spacing={'16px'}
        align={'stretch'}
        border={'0.5px solid #E4E4E4'}
        bg="#fff"
        borderRadius={'16px'}
      >
        {portfolio.map(data => (
          <HStack
            key={data.name}
            px="20px"
            py="18px"
            spacing={'24px'}
            border={'0.8px solid #E4E4E4'}
            bg="#fff"
            borderRadius={'16px'}
          >
            <Image
              alt="data image"
              src={data.image}
              h="175px"
              w="180px"
              borderRadius={'15.265px'}
            />

            <VStack w="full" spacing={'20px'} align={'stretch'}>
              <HStack w="full" spacing={'24px'}>
                <Box>
                  <Text fontSize="20px" fontWeight="600" lineHeight="normal">
                    {data.name}
                  </Text>
                  <Text fontSize="14px" fontWeight="400" lineHeight="normal">
                    {data.type}
                  </Text>
                </Box>
                <Center
                  px="12px"
                  py="4px"
                  fontSize="14px"
                  fontWeight="500"
                  lineHeight="20px"
                  color={data.color === 'green' ? '#116932' : '#6941C6'}
                  bg={data.color === 'green' ? '#F0FDF4' : '#F5F9FF'}
                  borderRadius={'full'}
                >
                  Owner-Occupied
                </Center>
              </HStack>

              <HStack w="full" spacing={'24px'}>
                <Box>
                  <Text fontSize="11px" fontWeight="400" lineHeight="150%" letterSpacing={'0.33px'}>
                    Balance
                  </Text>
                  <Text
                    fontSize="13px"
                    fontWeight="600"
                    lineHeight="150%"
                    letterSpacing={'0.26px'}
                    color={data.balanceColor === 'red' ? '#DC2626' : '#000'}
                  >
                    {data.balance}
                  </Text>
                </Box>
                <Box>
                  <Text fontSize="11px" fontWeight="400" lineHeight="150%" letterSpacing={'0.33px'}>
                    Open Requests
                  </Text>
                  <Text fontSize="13px" fontWeight="600" lineHeight="150%" letterSpacing={'0.26px'}>
                    {data.openRequest}
                  </Text>
                </Box>
                <Box>
                  <Text fontSize="11px" fontWeight="400" lineHeight="150%" letterSpacing={'0.33px'}>
                    Violation
                  </Text>
                  <Text fontSize="13px" fontWeight="600" lineHeight="150%" letterSpacing={'0.26px'}>
                    {data.violation}
                  </Text>
                </Box>
              </HStack>

              <Button
                h="40px"
                w="152px"
                borderRadius="full"
                bg="#000"
                color="#fff"
                fontSize="16px"
                fontWeight="500"
                lineHeight="normal"
                onClick={() => router.push('/communities/manage?listingId=1')}
              >
                View Details
              </Button>
            </VStack>
          </HStack>
        ))}
      </VStack>
    </Box>
  );
};

export default Portfolio;
