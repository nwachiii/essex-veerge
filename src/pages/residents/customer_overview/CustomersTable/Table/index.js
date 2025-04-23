import React, {useMemo, useState} from 'react';
import {Box, HStack, Button, Heading, Image, Text, VStack, useDisclosure} from '@chakra-ui/react';
import {useRouter} from 'next/router';
import createCustomerIcon from '/src/images/icons/create-customer-acct-icon.svg';

import {COLUMNS} from './Columns';
import {MatadorCustomTable} from '../../../../../components/common/Table';
import {isRoleRestricted} from 'ui-lib/ui-lib.hooks/isRoleRestricted';
import DataMigrationModal from '@/components/dashboard/dataMigration';

export default function CustomersTable({
  customerData,
  handlePagination,
  handleExpand,
  expanded,
  forMemo,
  forLimit,
  number_of_pages,
}) {
  //   console.log(customerData);
  const columns = useMemo(() => COLUMNS, []);
  const router = useRouter();
  const limit = forLimit;

  return (
    <Box borderRadius="xl">
      {customerData && customerData?.length ? (
        <MatadorCustomTable
          minW="full"
          forMemo={forMemo}
          forLimit={forLimit}
          expanded={expanded}
          headerSpace="evenly"
          handleExpand={handleExpand}
          COLUMNS={columns(router, limit)}
          number_of_pages={number_of_pages}
          handlePagination={handlePagination}
          DATA={customerData && customerData}
          isManageAgentEmpty="No account has been added yet"
        />
      ) : (
        <CustomerTableEmptyState router={router} />
      )}
    </Box>
  );
}

const CustomerTableEmptyState = ({router}) => {
  const dataMigrationDisclosure = useDisclosure();
  return (
    <>
      <VStack mt="100px" pb="30px" alignItems="center" spacing="8px">
        <Image src={createCustomerIcon.src} alt="customer empty state house icon" boxSize="32px" />
        <Heading as="h2" fontSize="16px" fontWeight="700" lineHeight="20.29px" color="#3d3d3d">
          Nothing Found
        </Heading>
        <Text fontSize="14px" fontWeight="400" lineHeight="17.75px" color="#919191">
          Looks like no user has been added yet
        </Text>
        <HStack mt="8px" justify="space-between" w="fit-content">
          {isRoleRestricted('create customer accounts').check ? null : (
            <Button
              w="full"
              h="46px"
              fontSize="14px"
              fontWeight="400"
              lineHeight="17.75px"
              fontFamily="Euclid Circular B"
              onClick={() => router.push('/users/create_account')}
              variant="filled-radius"
            >
              Create User Account
            </Button>
          )}
          <Button
            w="full"
            h="46px"
            fontSize="14px"
            fontWeight="400"
            lineHeight="17.75px"
            fontFamily="Euclid Circular B"
            onClick={dataMigrationDisclosure.onOpen}
            variant="outline-radius"
          >
            Import User Account
          </Button>
        </HStack>
      </VStack>
      <DataMigrationModal modalDisclosure={dataMigrationDisclosure} />
    </>
  );
};
