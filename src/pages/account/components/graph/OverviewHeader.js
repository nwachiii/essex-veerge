import React from 'react';
import {
  Box,
  Divider,
  Flex,
  Heading,
  HStack,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from '@chakra-ui/react';
import Link from 'next/link';
import {Button} from 'ui-lib/ui-lib.components';

export const OverviewHeader = ({filterByVal, setFilterByVal, showing}) => {
  return (
    <Box>
      <HStack
        justify="space-between"
        // maxW="5xl"
        py="10px"
      >
        <Stack>
          <Heading fontSize="18px" fontWeight={600} align="left">
            Overview
          </Heading>
          {showing && (
            <Text fontSize="14px" fontWeight={400} color="grey">
              Showing overview - {showing}
            </Text>
          )}
        </Stack>

        <Button rounded="full" variant="btn-outline" w="177px">
          View transactions
        </Button>
      </HStack>
      <RadioGroup w="full" onChange={setFilterByVal} value={filterByVal}>
        <Flex justify="flex-end" mt={1} align="center">
          <HStack spacing={4} align="center" h="35px">
            <Radio
              _active={{
                bg: 'transparent',
              }}
              value="1"
              hidden
            >
              <Text
                py="5px"
                textAlign="center"
                borderRadius="8px"
                w="80px"
                fontWeight={filterByVal == '1' ? '500' : '400'}
                bg={filterByVal == '1' ? '#F5F5F5' : 'transparent'}
              >
                1 Week
              </Text>
            </Radio>

            <Radio value="2" hidden>
              <Text
                py="5px"
                textAlign="center"
                borderRadius="8px"
                w="80px"
                fontWeight={filterByVal == '2' ? '500' : '400'}
                bg={filterByVal == '2' ? '#F5F5F5' : 'transparent'}
              >
                1 Month
              </Text>
            </Radio>
            <Radio value="3" hidden>
              <Text
                py="5px"
                textAlign="center"
                borderRadius="8px"
                w="80px"
                fontWeight={filterByVal == '3' ? '500' : '400'}
                bg={filterByVal == '3' ? '#F5F5F5' : 'transparent'}
              >
                1 Year
              </Text>
            </Radio>
            {/* <Radio value="4" hidden>
              <Text
                py="5px"
                textAlign="center"
                borderRadius="8px"
                w="80px"
                fontWeight={filterByVal == '4' ? '500' : '400'}
                bg={filterByVal == '4' ? '#faf4f4' : 'transparent'}
              >
                All time
              </Text>
            </Radio> */}
          </HStack>
        </Flex>
      </RadioGroup>
      <Divider color="#E4E4E4" my={2} mt={1} />
    </Box>
  );
};

export default OverviewHeader;
