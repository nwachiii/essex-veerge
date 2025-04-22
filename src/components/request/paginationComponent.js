import {ChevronLeftIcon, ChevronRightIcon} from '@chakra-ui/icons';
import {Box, Flex, IconButton, Input, Text} from '@chakra-ui/react';
import React from 'react';
import {useRouter} from 'next/router';

export default function PaginationComponent({
  handlePagination,

  number_of_pages,
}) {
  const router = useRouter();

  const currentPage = router.query?.page ?? '1';
  const canDisplayPreviousPage = ~~currentPage > 1;
  const canDisplayNextPage = ~~currentPage < ~~number_of_pages;

  return (
    <>
      {number_of_pages > 1 ? (
        <Flex px="20px" justifyContent="flex-end" bg="#FFFFFF">
          <Flex align="center" columnGap={4}>
            <Text fontSize="15px" fontWeight="400" color="#606060" m="0" alignSelf="center">
              Showing {currentPage} of {number_of_pages > 0 ? number_of_pages : 1}{' '}
            </Text>
            <IconButton
              _focus={{boxShadow: ''}}
              _hover={{backgroundColor: ''}}
              _active={{backgroundColor: ''}}
              color="gray.800"
              bg="white"
              boxShadow="md"
              fontSize="30px"
              borderRadius="full"
              icon={<ChevronLeftIcon />}
              isDisabled={!canDisplayPreviousPage}
              onClick={() => handlePagination('prev')}
            />

            <IconButton
              _focus={{boxShadow: ''}}
              _hover={{backgroundColor: ''}}
              _active={{backgroundColor: ''}}
              color="gray.800"
              bg="white"
              boxShadow="md"
              fontSize="30px"
              borderRadius="full"
              icon={<ChevronRightIcon />}
              isDisabled={!canDisplayNextPage}
              onClick={() => handlePagination('next')}
            />
          </Flex>
        </Flex>
      ) : (
        <Box py={8} />
      )}
    </>
  );
}
