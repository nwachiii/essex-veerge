import {
  Box,
  HStack,
  Heading,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  StackDivider,
  Text,
  VStack,
} from '@chakra-ui/react';
// import emptyIcon from '/src/images/icons/emptyIcon.png';
import emptyIcon from '/src/images/icons/emptyIcon.svg';

import React from 'react';
import searchIcon from '/src/images/icons/searchIconRequest.svg';
import InspectionHistoryComponent from './inspection/inspectionHistoryComponent';

import PaginationComponent from './paginationComponent';
import PendingInspectionComponent from './inspection/inspectionComponent';
import {EmptyState} from '../common/Table';
import CustomPagination from '../common/Pagination';

export const RequestInfoWrapper = ({
  requestArray,
  header,
  handlePagination,
  handleChange,
  searchText,
  number_of_pages,
  requestComponent,
}) => {
  return (
    <Stack
      // w="69.5vw"
      w={`100%`}
      spacing="24px"
      maxW="1001px"
      border="1px solid #EAECF0"
      borderRadius="8px"
      py="16px"
      bg={`#fff`}
    >
      <HStack
        justify="space-between"
        borderBottom="1px solid #EAECF0"
        w="full"
        px="18.45px"
        pb="16px"
      >
        <Heading fontSize="18.448px" color="#475467" fontWeight="400">
          {/* 12 Pending Transaction */}
          {header}
        </Heading>

        <InputGroup w="fit-content" justifySelf="flex-end" alignSelf="flex-end">
          <InputRightElement pointerEvents="none">
            <Image src={searchIcon.src} alt="search icon" />
          </InputRightElement>
          <Input
            fontSize="14px"
            fontWeight="300"
            value={searchText}
            w="152px"
            h="43px"
            border="1px solid #E4E4E4"
            bg="#F5F5F5"
            color="#222222"
            borderRadius="12px"
            onChange={handleChange}
            placeholder="search"
            _focus={{
              w: '319px',
            }}
            transition="ease-in-out 0.3s"
            _placeholder={{
              color: '#606060',
              fontSize: '12px',
              fontWeight: '300',
            }}
          />
        </InputGroup>
      </HStack>
      <Stack w="full" spacing="none" divider={<StackDivider my="24px" />}>
        {!requestArray?.length ? (
          <EmptyState
            title={`Nothing Found`}
            description={`Looks like there is no inspection request at the moment`}
          />
        ) : (
          requestArray.map((item, idx) => {
            return requestComponent(item);
          })
        )}

        {!(~~number_of_pages > 1) ? null : (
          <HStack w="full" justify={'flex-end'} gap="21px">
            {/* <PaginationComponent
              number_of_pages={number_of_pages}
              handlePagination={handlePagination}
            /> */}
            <CustomPagination
              number_of_pages={number_of_pages}
              handlePagination={handlePagination}
            />
          </HStack>
        )}
      </Stack>
    </Stack>
  );
};

export default RequestInfoWrapper;
