import React from 'react';
import ViolationDetailsCard from './violationDetialsCard';
import {Flex, Grid, GridItem, Stack, Text} from '@chakra-ui/react';

const ViolationOverviewHeader = () => {
  const overview = [
    {
      name: 'Fined',
      value: '718',
    },
    {
      name: 'Avg Cure Days',
      value: '7.3',
    },
    {
      name: 'Closed',
      value: '12',
    },
  ];
  return (
    <Grid
      mb="32px"
      templateColumns={{base: 'repeat(2, 1fr)', xl: 'repeat(3, 1fr)'}}
      w="full"
      gap="11px"
    >
      <GridItem colSpan={1}>
        {' '}
        <ViolationDetailsCard
          total={75}
          heading="Total Open Violations"
          inCure={45}
          lateToCure={32}
          escalated={2}
        />
      </GridItem>
      <GridItem colSpan={2}>
        {' '}
        <Flex
          h="full"
          alignItems="center"
          bg="#ffffff"
          p="12px 37px"
          rounded="12px"
          border="0.5px solid #e4e4e7"
          w="full"
          justifyContent="space-between"
        >
          {overview.map((item, idx) => (
            <Stack key={idx} spacing="none">
              <Text fontSize="16px" fontWeight="500" color="#52525b">
                {item.name}
              </Text>
              <Text fontSize="33px" fontWeight="600" color="#18181b">
                {item.value}
              </Text>
            </Stack>
          ))}
        </Flex>
      </GridItem>
    </Grid>
  );
};

export default ViolationOverviewHeader;
