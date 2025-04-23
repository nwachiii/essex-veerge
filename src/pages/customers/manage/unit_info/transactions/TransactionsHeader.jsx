import React from 'react';
import {
  useToast,
  Box,
  Container,
  Flex,
  Image,
  Heading,
  HStack,
  Progress,
  Stack,
  Text,
  Button,
  VStack,
  RadioGroup,
  Radio,
  SimpleGrid,
} from '@chakra-ui/react';
import {themeStyles} from '/src/theme';
import {handleLastTwoDigits, removeLastTwoDigits} from '/src/utils';
import {formatAmountWithDecimal} from 'utils';

export const UnitTransactionsHeader = ({unitMetaData, value, setValue}) => {
  // console.log(unitMetaData);
  return (
    <Flex
      {...themeStyles.containerStyles}
      w="full"
      padding="19px 26px"
      justifyContent={'center'}
      mx="auto"
    >
      <RadioGroup w="full" onChange={setValue} value={value}>
        <Flex align="stretch" justify={'space-between'} w="full" gap="18px 24px">
          <SimpleGrid columns={2} gap="30px">
            <Radio value="1" hidden>
              <Box
                {...themeStyles.md_Box}
                border={`2px solid ${value == '1' ? '#4545FE' : '#F5F5F5'}`}
                w="380px"
                h="125px"
                py={2}
              >
                <Text fontWeight="600" fontSize={'24px'}>
                  {unitMetaData?.total_customers ?? 0}
                </Text>
                <Text py="17px" fontSize="12px" fontWeight={'400'} color="#606060">
                  Total Number of customers
                </Text>
              </Box>
            </Radio>
            <Radio value="2" hidden>
              <Box
                {...themeStyles.md_Box}
                border={`2px solid ${value == '2' ? '#4545FE' : '#F5F5F5'}`}
                w="380px"
                h="125px"
                py={2}
              >
                <Text fontWeight="600" fontSize={'24px'}>
                  {unitMetaData?.customer_with_outstanding ?? 0}
                </Text>
                <Text
                  maxW={197}
                  mx="auto"
                  py="17px"
                  fontSize="12px"
                  fontWeight={'400'}
                  color="#606060"
                >
                  Numbers of customers with outstanding payment
                </Text>
              </Box>
            </Radio>
            <Radio value="3" hidden>
              <Box
                {...themeStyles.md_Box}
                border={`2px solid ${value == '3' ? '#4545FE' : '#F5F5F5'}`}
                w="380px"
                h="125px"
                py={2}
              >
                <Text fontWeight="600" fontSize={'24px'}>
                  {unitMetaData?.customer_without_outstanding ?? 0}
                </Text>
                <Text
                  maxW={215}
                  mx="auto"
                  py="17px"
                  fontSize="12px"
                  fontWeight={'400'}
                  color="#606060"
                >
                  Numbers of customers with completed payment
                </Text>
              </Box>
            </Radio>
            <Radio value="4" hidden>
              <Box
                {...themeStyles.md_Box}
                border={`2px solid ${value == '4' ? '#4545FE' : '#F5F5F5'}`}
                w="380px"
                h="125px"
                py={2}
              >
                <Text fontWeight="600" fontSize={'24px'}>
                  {unitMetaData?.defaulting_customers ?? 0}
                </Text>
                <Text py="17px" fontSize="12px" fontWeight={'400'} color="#606060">
                  Number of defaulters
                </Text>
              </Box>
            </Radio>
          </SimpleGrid>
        </Flex>
      </RadioGroup>
      <VStack spacing="4px">
        <Box {...themeStyles.md_Box} border={`2px solid #F5F5F5`} w="380px" h="90px" py={2}>
          <Text color={'#4545FE'} fontWeight="600" fontSize={'24px'}>
            {`${formatAmountWithDecimal(unitMetaData?.total_purchases || 0)}`}
          </Text>
          <Text py="10px" fontSize="12px" fontWeight={'400'} color="#606060">
            Total Purchase Price
          </Text>
        </Box>
        <Box {...themeStyles.md_Box} border={`2px solid #F5F5F5`} w="380px" h="90px" py={2}>
          <Text color={'#12D8A0'} fontWeight="600" fontSize={'24px'}>
            {`${formatAmountWithDecimal(unitMetaData?.total_paid || 0)}`}
          </Text>
          <Text py="10px" fontSize="12px" fontWeight={'400'} color="#606060">
            Total Paid
          </Text>
        </Box>
        <Box {...themeStyles.md_Box} border={`2px solid #F5F5F5`} w="380px" h="90px" py={2}>
          <Text color={'#FF6A6A'} fontWeight="600" fontSize={'24px'}>
            {` ${formatAmountWithDecimal(unitMetaData?.total_outstanding || 0)}`}
          </Text>
          <Text py="10px" fontSize="12px" fontWeight={'400'} color="#606060">
            Total Outstanding Balance
          </Text>
        </Box>
      </VStack>
    </Flex>
  );
};

export default UnitTransactionsHeader;
