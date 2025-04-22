import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  HStack,
  Heading,
  Image,
  Spinner,
  Stack,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react';
import React from 'react';
import FilterMenu from './FilterMenu';
import {useState} from 'react';
import ActivityComponent from './ActivityComponent';
import {fetchActiviy} from '/src/apis/activity_log';
import {useQuery} from '@tanstack/react-query';
import emptyIcon from '/src/images/icons/emptyIcon.svg';
import {useRouter} from 'next/router';
import backIcon from '/src/images/icons/backArrowForDrawer.svg';
import ActivityLogList from './ActivityLogList';

const ActivityLogDrawer = ({
  handleScreen,
  notForMoreOptions,
  customScrollbarStyles,
  userId,
  user_drawer,
}) => {
  const [forFilter, setFilter] = useState('');
  const {query} = useRouter();

  const id = query?.userId ?? userId;

  const getDays = array => {
    let arr = array?.map(item => {
      return item?.day;
    });
    let set = new Set(arr);
    return [...set];
  };

  const param = `${parseInt(id)}${forFilter ? '?filter=' : ''}${forFilter}`;

  const groupByDay = prop => {
    let groups = getDays(prop);
    const group = groups?.map(item => {
      let obj = {};
      let filtered;

      filtered = prop.filter(data => data.day === item);

      obj.day = item;
      obj.info = filtered;

      return obj;
    });
    return group;
  };
  const {data, isLoading, isError, error} = useQuery(['activity', param], () =>
    fetchActiviy(param)
  );

  const handleOptions = e => {
    const name = e.target.name;
    return setFilter(name === 'all' ? '' : name);
  };

  return (
    <>
      <HStack
        boxShadow="0px 3.20641px 6.41283px 0px rgba(0, 0, 0, 0.02)"
        py="13px"
        pl="29px"
        bg="#F5F5F5"
        h="50px"
        pr="12px"
        justify="space-between"
        align="center"
        position="relative"
      >
        <HStack>
          <Image
            src={backIcon.src}
            cursor="pointer"
            onClick={handleScreen('options')}
            alt="back icon"
          />
          <Heading p="0px" fontSize="20px" fontWeight="600" borderBottom="none" color="#191919">
            Activity Log
          </Heading>
        </HStack>
        <HStack spacing="15px">
          <FilterMenu forFilter={forFilter} handleOptions={handleOptions} />
          <VStack
            position="relative"
            justify="center"
            align="center"
            w="30px"
            h="30px"
            borderRadius="5px"
            transition="0.3s ease-in-out"
            _hover={{
              width: '30px',
              height: '30px',
            }}
          >
            <DrawerCloseButton right="0px" left="0px" my="auto" color="#000" top="0" bottom="0" />
          </VStack>
        </HStack>
      </HStack>

      <DrawerBody
        pt="10px"
        sx={customScrollbarStyles}
        maxW="450px"
        minW="450px"
        mr="4px"
        p="0px"
        pr="2px"
      >
        <ActivityLogList
          data={data}
          error={error}
          isError={isError}
          isLoading={isLoading}
          user_drawer={user_drawer}
        />
      </DrawerBody>
    </>
  );
};

export default ActivityLogDrawer;
