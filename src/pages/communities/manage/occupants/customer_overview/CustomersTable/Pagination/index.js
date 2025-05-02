import {ArrowLeftIcon, ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon} from '@chakra-ui/icons';
import {Flex, IconButton, Input, Image, Text} from '@chakra-ui/react';
import React from 'react';
import {Button} from '../../../../../ui-lib';
import expandIcon from '/src/images/icons/expand-icon.svg';

export default function CustomersPagination({
  gotoPage,
  nextPage,
  pageIndex,
  pageCount,
  canNextPage,
  canPreviousPage,
  previousPage,
  pageOptions,
  handleExpand,
  expand,
}) {
  return (
    <Flex
      py={6}
      borderTop="1.5px solid"
      borderColor="gray.200"
      justifyContent="flex-end"
      bg="#FFFFFF"
    >
      <Flex align="center" columnGap={4}>
        <Text m="0" alignSelf="center">
          Showing {pageIndex + 1} of {pageOptions.length}{' '}
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
          disabled={!canPreviousPage}
          onClick={() => previousPage()}
        />
        <Input
          mx="3px"
          alignSelf="center"
          textAlign="center"
          border="1px solid"
          borderRadius="full"
          borderColor="gray.200"
          onChange={e => {
            let pageNumber = e.target.value ? Number(e.target.value) - 1 : 0;
            gotoPage(pageNumber);
          }}
          w="10%"
          size="sm"
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
          disabled={!canNextPage}
          onClick={() => nextPage()}
        />
        {expand && (
          <Button
            h="48px"
            mb={3}
            variant="primary"
            bg="transparent"
            border="1px solid #e4e4e4"
            color="#191919"
            onClick={handleExpand}
          >
            {/* <Image src={expandIcon.src} styles={{ marginRight: '5px' }} width='20px' /> */}
            Expand List
          </Button>
        )}
      </Flex>
    </Flex>
  );
}
