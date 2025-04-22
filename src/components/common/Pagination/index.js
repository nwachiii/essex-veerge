import {ChevronLeftIcon, ChevronRightIcon} from '@chakra-ui/icons';
import {Box, Flex, IconButton, Input, Text} from '@chakra-ui/react';
import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/router';

export default function CustomPagination({
  gotoPage,
  nextPage,
  pageIndex,
  pageCount,
  canNextPage,
  canPreviousPage,
  handlePagination,
  previousPage,
  number_of_pages,
  wrapper,
  pageOptions,
}) {
  const router = useRouter();

  const limit = 10;

  const currentPage = router.query?.page ?? 1;
  const [pageNumber, setPageNumber] = useState(currentPage);
  const canDisplayPreviousPage = ~~currentPage > 1;
  const canDisplayNextPage = ~~currentPage < ~~number_of_pages;

  const handleInputPagination = e => {
    if (e.key !== 'Enter') return;

    const page = Math.max(1, Math.min(pageNumber, Math.floor(number_of_pages)));
    setPageNumber(page);
    const defaultQuery = {
      page,
      limit,
    };

    const mergedQuery = {
      ...router.query,
      ...defaultQuery,
    };
    return router.push({
      pathname: router.pathname,
      query: mergedQuery,
    });
  };

  const handleInput = e => {
    const {value} = e.target;
    return setPageNumber(value);
  };

  useEffect(() => {
    setPageNumber(currentPage);
  }, [currentPage]);
  return (
    <>
      {number_of_pages > 1 ? (
        <Flex py={6} px="40px" justifyContent="flex-end" {...wrapper}>
          <Flex align="center" gap={`8px`}>
            <Text
              m="0"
              color="#606060"
              fontSize="16px"
              fontWeight="400"
              lineHeight="20.29px"
              alignSelf="center"
              mr={`20px`}
            >
              Showing{' '}
              {
                //   pageIndex + 1
                currentPage
              }{' '}
              of{' '}
              {
                //   pageOptions.length
                // number_of_pages ?? 1
                number_of_pages > 0 ? number_of_pages : 1
              }{' '}
            </Text>
            <IconButton
              _focus={{boxShadow: ''}}
              _hover={{backgroundColor: ''}}
              _active={{backgroundColor: ''}}
              color="gray.800"
              // bg="white"
              bg="#E4E4E4"
              // boxShadow="md"
              fontSize="30px"
              boxSize="50px"
              borderRadius="full"
              icon={<ChevronLeftIcon />}
              //   isDisabled={!canPreviousPage}
              isDisabled={!canDisplayPreviousPage}
              // onClick={() => previousPage()}
              onClick={() => handlePagination('prev')}
            />
            <Input
              mx="3px"
              alignSelf="center"
              textAlign="center"
              border="1px solid"
              h="50px"
              type="number"
              pattern="^\d*\.?\d*$"
              borderRadius="30%"
              borderColor="#e4e4e4"
              _focus={{outline: `none`}}
              _focusVisible={{outline: `none`}}
              onKeyDown={handleInputPagination}
              onChange={handleInput}
              // disabled
              // onChange={e => {
              //   let pageNumber = e.target.value ? Number(e.target.value) - 1 : 0;
              //   gotoPage(pageNumber);
              // }}
              // w="10%"
              value={pageNumber}
              w={`44px`}
              size="sm"
              fontSize="16px"
              fontWeight="500"
              color="#191919"
              lineHeight="20.29px"
            />
            <IconButton
              _focus={{boxShadow: ''}}
              _hover={{backgroundColor: ''}}
              _active={{backgroundColor: ''}}
              color="gray.800"
              // bg="white"
              bg="#E4E4E4"
              // boxShadow="md"
              fontSize="30px"
              boxSize="50px"
              borderRadius="full"
              icon={<ChevronRightIcon />}
              //   isDisabled={!canNextPage}
              isDisabled={!canDisplayNextPage}
              // onClick={() => nextPage()}
              onClick={() => handlePagination('next')}
            />
          </Flex>
        </Flex>
      ) : (
        <Box py="10px" />
      )}
    </>
  );
}
