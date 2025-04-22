/* eslint-disable react-hooks/exhaustive-deps */
import React, {useMemo, useState} from 'react';
import {useTable, useSortBy, usePagination} from 'react-table';
import {
  Table,
  Thead,
  Tbody,
  Image,
  Tr,
  Th,
  Td,
  Text,
  Box,
  Input,
  VStack,
  HStack,
  TableContainer,
  Heading,
} from '@chakra-ui/react';
import CustomPagination from '../Pagination';
import {themeStyles} from '../../../theme';
import {ImFilesEmpty} from 'react-icons/im';
import {AnimatedLoader} from '../loaders';
import {useRouter} from 'next/router';
import emptyIcon from '/src/images/icons/emptyIcon.png';

import searchIcon from '/src/images/icons/searchIconRequest.svg';

export const MatadorCustomTable = ({
  DATA,
  teams,
  request,
  COLUMNS,
  forMemo,
  forLimit,
  expanded,
  handInput,
  searchText,
  headerSpace,
  nextPageUrl,
  handleExpand,
  isRefetching,
  number_of_pages,
  handlePagination,
  isManageAgentEmpty,
  title,
  hasEmptyStateHeader,
  emptyStateDescription,
  OpenCustomerModal,
  tableContainerStyle,
  emptyStateStyle,
  ...rest
}) => {
  const router = useRouter();
  const data = useMemo(() => DATA, forMemo && [...forMemo]);
  const pgSize = 10;
  const columns = useMemo(() => COLUMNS, [COLUMNS, pgSize]);

  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: {pageSize: forLimit?.[0] ?? pgSize},
    },
    useSortBy,
    usePagination
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    state,
    setSortBy,
    allColumns,
  } = tableInstance;

  const {pageSize, pageIndex} = state;

  const currentPage = router.query?.page;

  return (
    <>
      <Box
        my="0px"
        overflowX="auto"
        borderRadius={teams ? 'none' : 'xl'}
        border="1px solid"
        borderColor="#e4e4e4"
        mx="auto"
        {...rest}
      >
        {getTableProps ? (
          <TableContainer
            mx="auto"
            align="center"
            {...themeStyles.componentStyles.tableContainer}
            minW={{base: '90%', lg: '100%'}}
            borderRadius={'xl'}
            position="sticky"
            borderTop="none"
            zIndex="1"
            top="0px"
            {...tableContainerStyle}
          >
            <Table
              variant="simple"
              minW={isManageAgentEmpty && {base: '90%', lg: '1184px'}}
              {...getTableProps()}
              bg="white"
              overflow="hidden"
              borderTop="none"
            >
              <Thead
                p="0"
                h="56px"
                position="sticky"
                zIndex="1"
                top="0px"
                bg="#F9FAFB"
                style={{overflow: 'auto'}}
                borderRadius="0px"
                borderColor="#e5e5e5"
              >
                {page && page?.length > 0
                  ? headerGroups?.map((headerGroup, indexKey) => (
                      <Tr p="0" key={indexKey} {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column, columnIndex) => (
                          <Th
                            px="2em"
                            textAlign={
                              column.textAlign
                                ? column.textAlign
                                : headerSpace === 'evenly'
                                  ? 'left'
                                  : 'center'
                            }
                            key={columnIndex}
                            color={'#606060'}
                            fontSize={16}
                            fontWeight={'400'}
                            lineHeight="20.29px"
                            letterSpacing={'0'}
                            textTransform={'capitalize'}
                            borderBottom={'1px solid #e4e4e4'}
                            {...column.getHeaderProps()}
                          >
                            {column.hideHeader == true ? null : column.render('Header')}
                          </Th>
                        ))}
                      </Tr>
                    ))
                  : !page.length
                    ? headerGroups?.map((headerGroup, indexKey) => (
                        <Tr p="0" key={indexKey} {...headerGroup.getHeaderGroupProps()}>
                          {headerGroup.headers.map((column, columnIndex) => (
                            <Th
                              px="2em"
                              textAlign={headerSpace == 'evenly' ? 'left' : 'center'}
                              key={columnIndex}
                              color={'#606060'}
                              fontWeight={'400'}
                              fontSize={'16px'}
                              lineHeight="20.29px"
                              textTransform={'capitalize'}
                              {...column.getHeaderProps()}
                            >
                              {column.hideHeader == true ? null : column.render('Header')}
                            </Th>
                          ))}
                        </Tr>
                      ))
                    : null}
              </Thead>
              <Tbody w="full" p="1em" {...getTableBodyProps()}>
                {page && page?.length > 0
                  ? page.map((row, indx) => {
                      prepareRow(row);
                      let equityId = row?.original?.equity_id;
                      let userId = row?.original?.id;
                      return (
                        <Tr
                          cursor={nextPageUrl ? 'pointer' : ''}
                          key={indx}
                          onClick={() =>
                            nextPageUrl
                              ? router.push(
                                  `${nextPageUrl}/?id=${equityId ?? userId}${
                                    equityId ? `&user=${userId}` : ''
                                  }`
                                )
                              : console.log('')
                          }
                          className="tr1"
                          {...row.getRowProps()}
                          _hover={
                            nextPageUrl && {
                              bg: 'gray.50',
                            }
                          }
                        >
                          {row?.cells.map((cell, idx) => {
                            return (
                              <Td
                                key={idx}
                                borderBottom={
                                  page?.length === indx + 1 ? 'none' : '1px solid #f5f5f5'
                                }
                                textAlign={headerSpace == 'evenly' ? 'left' : 'center'}
                                color={'gray.600'}
                                // px="28px"
                                px="2em"
                                {...cell?.getCellProps()}
                              >
                                {cell?.render('Cell')}{' '}
                              </Td>
                            );
                          })}
                        </Tr>
                      );
                    })
                  : null}
              </Tbody>
            </Table>

            {page && !page?.length && (
              <EmptyState
                title={hasEmptyStateHeader}
                description={isManageAgentEmpty ?? emptyStateDescription}
                {...emptyStateStyle}
              />
            )}
          </TableContainer>
        ) : isRefetching == 'true' ? (
          <AnimatedLoader />
        ) : (
          <AnimatedLoader />
        )}
      </Box>

      <HStack w="full" justify={'flex-end'} gap="21px">
        {isManageAgentEmpty && page && !DATA?.length ? (
          <Box py="10px" />
        ) : DATA?.length < forLimit && !(~~number_of_pages > 1) ? (
          <Box py="10px" />
        ) : (
          <CustomPagination
            wrapper={{px: '0px'}}
            nextPage={nextPage}
            number_of_pages={number_of_pages}
            gotoPage={gotoPage}
            handlePagination={handlePagination}
            pageIndex={pageIndex}
            pageCount={pageCount}
            canNextPage={canNextPage}
            pageOptions={pageOptions}
            previousPage={previousPage}
            canPreviousPage={canPreviousPage}
          />
        )}
      </HStack>
    </>
  );
};

export const EmptyState = ({title, description, icon, iconSrc, ...rest}) => {
  return (
    <VStack spacing="none" mx="auto" w="full" h="full" py="70px" {...rest}>
      {icon || <Image alt="empty table icon" src={iconSrc ? iconSrc : emptyIcon.src} />}
      <Text fontSize={'20px'} mt="16px" color="#3D3D3D" fontWeight={'700'}>
        {title || 'Nothing Found'}
      </Text>
      <Text
        w="full"
        textAlign="center"
        fontSize="14px"
        fontWeight="400"
        mx="auto"
        color="#919191"
        mt="12px"
      >
        {description || 'You do not have any data yet...'}
      </Text>
    </VStack>
  );
};

export default MatadorCustomTable;
