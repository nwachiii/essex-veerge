import {Box, Divider, Table, TableContainer, Tbody, Td, Text, Tr} from '@chakra-ui/react';
import React from 'react';
import {formatAmount} from '../../../../../utils';
import {formatToCurrency} from 'utils/formatAmount';
export const FractionsData = ({bundle, FRACTIONS_DATA}) => {
  return (
    <Box mt="30px">
      <Text fontSize={'22px'} fontWeight={600} color="#4545EE">
        Data
      </Text>
      <TableContainer border={'1px solid lightgray'} py={3} borderRadius="12px">
        <Table size="sm">
          <Tbody>
            {!FRACTIONS_DATA ? null : (
              <>
                <Tr>
                  <Td>
                    <b>INFO</b>
                  </Td>
                  <Divider orientation="vertical" h="40px" color="gray" />
                  <Td>
                    <b>VALUE</b>
                  </Td>
                </Tr>

                <Tr>
                  <Td>Total fractionalized units</Td>
                  <Divider orientation="vertical" h="40px" color="gray" />
                  <Td>
                    <b>{bundle?.total_fractionalized_units}</b>
                  </Td>
                </Tr>

                <Tr>
                  <Td>Price per fraction</Td>
                  <Divider orientation="vertical" h="40px" color="gray" />
                  <Td>
                    <b> {formatToCurrency(bundle?.price_per_fraction)}</b>
                  </Td>
                </Tr>
                <Tr>
                  <Td>Total unit price</Td>
                  <Divider orientation="vertical" h="40px" color="gray" />
                  <Td>
                    <b>{formatToCurrency(FRACTIONS_DATA?.total_unit_price)}</b>
                  </Td>
                </Tr>
                <Tr>
                  <Td>Total fractions</Td>
                  <Divider orientation="vertical" h="40px" color="gray" />
                  <Td>
                    <b>{bundle?.total_fractions + bundle?.total_purchased_fractions}</b>
                  </Td>
                </Tr>
                <Tr>
                  <Td>Sold Fractions</Td>
                  <Divider orientation="vertical" h="40px" color="gray" />
                  <Td>
                    <b>{bundle?.total_purchased_fractions}</b>
                  </Td>
                </Tr>
                <Tr>
                  <Td>Remaining Fractions</Td>
                  <Divider orientation="vertical" h="40px" color="gray" />
                  <Td>
                    <b>{bundle?.total_fractions}</b>
                  </Td>
                </Tr>
                <Tr>
                  <Td>Total fraction owners</Td>
                  <Divider orientation="vertical" h="40px" color="gray" />
                  <Td>
                    <b>{bundle?.invested_users?.length}</b>
                  </Td>
                </Tr>
              </>
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default FractionsData;
