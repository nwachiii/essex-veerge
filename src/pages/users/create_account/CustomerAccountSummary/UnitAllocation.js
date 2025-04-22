import {ChevronDownIcon} from '@chakra-ui/icons';
import {Box, extendTheme, Flex, HStack, Icon, Stack, Text} from '@chakra-ui/react';
import React from 'react';
import {FILLED_UNIT_ALLOCATION_DETAILS} from '../../../../constants/createCustomers';
import {theme} from '../../../../theme';

const styles = extendTheme({...theme});

export default function UnitAllocation({data}) {
  // TODO: receive unit array from data prop, and map it down instead of filled_unit_allocation_details
  return (
    <Box>
      {[FILLED_UNIT_ALLOCATION_DETAILS].map((entry, index) => (
        <Stack
          key={index}
          {...styles.componentStyles.cardOne}
          my={6}
          maxW="1203px"
          h="93px"
          bg="#F5F5F5"
        >
          <HStack key={index} spacing={4} h="93px" justify="space-between">
            <Flex columnGap={10} align="row">
              <Stack spacing="9px" align="center">
                <Text color="gray.500">Allocation title</Text>
                <Flex fontWeight="bold" fontSize="18px">
                  {entry.allocation_title}
                </Flex>
              </Stack>
              <Stack spacing="9px" align="center">
                <Text color="gray.500">Date allocated</Text>
                <Text fontWeight="bold" fontSize="18px">
                  {entry.date_allocated}
                </Text>
              </Stack>
              <Stack spacing="9px" align="center">
                <Text color="gray.500">Allocation period</Text>
                <Text fontWeight="bold" fontSize="18px">
                  {entry.allocation_period}
                </Text>
              </Stack>
            </Flex>

            <HStack spacing={4} justify="space-between" align="center">
              <Icon as={ChevronDownIcon} width="20px" height="20px" alt="arrow_down" />
            </HStack>
          </HStack>
        </Stack>
      ))}
    </Box>
  );
}
