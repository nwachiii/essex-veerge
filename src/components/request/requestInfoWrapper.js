import {
  Box,
  Center,
  HStack,
  Heading,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
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
import filterIcon from '/src/images/icons/filterIconRequest.svg';
import InspectionHistoryComponent from './inspection/inspectionHistoryComponent';

import PaginationComponent from './paginationComponent';
import PendingInspectionComponent from './inspection/inspectionComponent';
import {EmptyState} from '../common/Table';
import CustomPagination from '../common/Pagination';

export const RequestInfoWrapper = ({
  requestArray,
  handlePagination,
  handleChange,
  searchText,
  number_of_pages,
  requestComponent,
  header,
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
          {header}
        </Heading>

        <HStack justifySelf="flex-end" alignSelf="flex-end" spacing={'16px'}>
          <InputGroup w="fit-content">
            <InputLeftElement pointerEvents="none">
              <Image src={searchIcon.src} alt="search icon" />
            </InputLeftElement>
            <Input
              fontSize="14px"
              fontWeight="300"
              value={searchText}
              w="152px"
              h="43px"
              border="1px solid #E4E4E7"
              bg="#FAFAFA"
              color="#222222"
              borderRadius="8px"
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

          <Center w="43px" h="43px" borderRadius={'9.694px'} border={'0.597px solid #E4E4E7'}>
            <Image src={filterIcon.src} alt="filter icom" />
          </Center>
        </HStack>
      </HStack>
      <Stack w="full" spacing="none" divider={<StackDivider my="24px" />}>
        {!requestArray?.length ? (
          <EmptyState
            title={`Nothing Found`}
            description={`Looks like there is no ${header} at the moment`}
          />
        ) : (
          requestArray.map((item, idx) => {
            return requestComponent(item);
          })
        )}
      </Stack>
    </Stack>
  );
};

export default RequestInfoWrapper;
