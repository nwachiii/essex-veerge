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
} from '@chakra-ui/react';
import CustomPagination from '../Pagination';
import {themeStyles} from '../../../theme';
import {ImFilesEmpty} from 'react-icons/im';
import {AnimatedLoader} from '../loaders';
import {useRouter} from 'next/router';
import emptyIcon from '/src/images/icons/emptyIcon.png';

import searchIcon from '/src/images/icons/searchIconRequest.svg';

export const TableForFeedBack = ({
  headerSpace,
  isManageAgentEmpty,
  teams,
  handleExpand,
  expanded,
  nextPageUrl,
  forMemo,
  searchText,
  isRefetching,
  request,
  DATA,
  handInput,
  COLUMNS,
  number_of_pages,
  handlePagination,
  ...rest
}) => {
  const router = useRouter();
  const [pgSize, setPgSize] = useState(10);
  const data = useMemo(() => DATA, [forMemo]);
  const columns = useMemo(() => COLUMNS, []);

  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: {pageSize: pgSize},
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

  const {q} = router.query;

  return (
    <Box
      my="0px"
      mb="30px"
      overflow="auto"
      borderRadius={'16px'}
      mx="auto"
      border={`0.7px solid #E4E4E4`}
    >
      {request ? (
        <HStack position="relative" mt="1px" w="full" mb="20px" justify="end" pr="5px">
          <Input
            type="text"
            bg="#F5F5F5"
            px="16px"
            color="#222222"
            value={searchText ?? ''}
            _placeholder={{color: '#606060'}}
            placeholder="search"
            borderRadius="12px"
            border="1px solid #E4E4E4"
            onChange={handInput}
            w="319px"
            h="43px"
          />
          <Image
            right="2%"
            zIndex="10"
            top="50%"
            transform="translateY(-50%)"
            src={searchIcon.src}
            alt="search icon"
            position="absolute"
          />
        </HStack>
      ) : null}

      {getTableProps ? (
        <TableContainer
          mx="auto"
          align="center"
          {...themeStyles.componentStyles.tableContainer}
          minW={{base: '90%', lg: '1184px'}}
          {...rest}
          minH={teams ? '492px' : 'initial'}
          px="20px"
          p={`20px`}
          pb="0px"
        >
          <Table
            minW={isManageAgentEmpty && {base: '90%', lg: '1184px'}}
            {...getTableProps()}
            colorScheme="gray"
            variant="unstyled"
            bg="white"
            px="20px"
          >
            {/* <Thead
              p="0"
              h="56px"
              position="sticky"
              zIndex="1"
              top="0px"
              style={{ overflow: "scroll" }}
            >
              {page && page?.length > 0
                ? headerGroups?.map((headerGroup, indexKey) => (
                    <Tr
                      p="0"
                      key={indexKey}
                      {...headerGroup.getHeaderGroupProps()}
                    >
                      {headerGroup.headers.map((column, columnIndex) => (
                        <Th
                          px="2em"
                          textAlign={
                            headerSpace == "evenly" ? "left" : "center"
                          }
                          key={columnIndex}
                          color={"#606060"}
                          fontWeight={"400"}
                          fontSize={"14px"}
                          textTransform={"capitalize"}
                          {...column.getHeaderProps()}
                        >
                          {column.hideHeader == true
                            ? null
                            : column.render("Header")}
                        </Th>
                      ))}
                    </Tr>
                  ))
                : isManageAgentEmpty
                ? headerGroups?.map((headerGroup, indexKey) => (
                    <Tr
                      p="0"
                      key={indexKey}
                      {...headerGroup.getHeaderGroupProps()}
                    >
                      {headerGroup.headers.map((column, columnIndex) => (
                        <Th
                          px="2em"
                          textAlign={
                            headerSpace == "evenly" ? "left" : "center"
                          }
                          key={columnIndex}
                          color={"#606060"}
                          fontWeight={"400"}
                          fontSize={"14px"}
                          textTransform={"capitalize"}
                          {...column.getHeaderProps()}
                        >
                          {column.hideHeader == true
                            ? null
                            : column.render("Header")}
                        </Th>
                      ))}
                    </Tr>
                  ))
                : null}
            </Thead> */}

            <Tbody w="full" p="1em" {...getTableBodyProps()}>
              {page && page?.length > 0
                ? page.map((row, indx) => {
                    prepareRow(row);

                    return (
                      <Tr
                        cursor={nextPageUrl ? 'pointer' : ''}
                        key={indx}
                        className="tr1"
                        {...row.getRowProps()}
                      >
                        {row?.cells.map((cell, idx) => {
                          return (
                            <Td
                              key={idx}
                              textAlign="center"
                              color={'gray.600'}
                              {...cell?.getCellProps()}
                              px="0px"
                              py="10px"
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

          {isManageAgentEmpty && page && !page?.length && (
            <VStack
              spacing="none"
              mx="auto"
              w="full"
              minW={{base: '90%', lg: '1184px'}}
              h="full"
              py="100px"
            >
              <Image alt="empty table icon" src={emptyIcon.src} />

              <Text fontSize={'20px'} mt="16px" color="#3D3D3D" fontWeight={'700'}>
                Nothing Found
              </Text>

              <Text
                w="full"
                textAlign="center"
                fontSize="14px"
                mt="12px"
                fontWeight="400"
                color="#606060"
                mx="auto"
              >
                {isManageAgentEmpty}
              </Text>
            </VStack>
          )}

          <HStack w="full" justify={'flex-end'} gap="21px">
            {isManageAgentEmpty && page && !DATA?.length ? null : DATA?.length < 10 &&
              !(~~number_of_pages > 1) ? (
              <Box py={6} />
            ) : (
              <CustomPagination
                nextPage={nextPage}
                gotoPage={gotoPage}
                number_of_pages={number_of_pages}
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
        </TableContainer>
      ) : isRefetching == 'true' ? (
        <AnimatedLoader />
      ) : (
        <AnimatedLoader />
      )}
    </Box>
  );
};
