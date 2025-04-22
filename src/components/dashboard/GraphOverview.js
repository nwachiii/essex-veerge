import {Box, Flex, Divider, HStack, Stack, Heading, Text} from '@chakra-ui/react';
import GraphState from './GraphState';
import {Button} from '../../ui-lib/ui-lib.components/Button';
import TransactionsOverview from '../../pages/dashboard/Overview/TransactionsOverview';

const GraphOverview = () => {
  return (
    <Box>
      <HStack justify="space-between" maxW="5xl">
        <Stack>
          <Heading fontSize="18px" fontWeight={600} align="left">
            Sales Overview
          </Heading>

          <Text fontSize="14px" fontWeight={400} color="grey">
            Showing overview of 1 year
          </Text>
        </Stack>
        <Button cursor={'not-allowed'} mt={2} variant="btn-outline" w="177px">
          View transactions
        </Button>
      </HStack>
      <HStack mt="17px" spacing="12px" justify="end">
        <HStack justify="center" bg="transparent" borderRadius="8px" h="33px" w="80px">
          <Text color="#3D3D3D" fontSize="14px" fontWeight="600">
            1 Week
          </Text>
        </HStack>{' '}
        <HStack justify="center" bg="transparent" borderRadius="8px" h="33px" w="80px">
          <Text color="#3D3D3D" fontSize="14px" fontWeight="600">
            1 Month
          </Text>
        </HStack>
        <HStack justify="center" bg="#F5F5F5" borderRadius="8px" h="33px" w="80px">
          <Text color="#3D3D3D" fontSize="14px" fontWeight="600">
            1 Year
          </Text>
        </HStack>
      </HStack>
      <Divider color="#E4E4E4" mt="12px" mb="16px" />
      <Flex
        direction="row"
        gap={`10px`}
        justifyContent="space-between"
        align={'flex-start'}
        h="full"
        py={0}
      >
        {' '}
        <GraphState />
        <TransactionsOverview data={[]} />
      </Flex>
    </Box>
  );
};

export default GraphOverview;
