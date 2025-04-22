import React from 'react';
import {
  Text,
  Popover,
  Portal,
  PopoverBody,
  PopoverArrow,
  PopoverTrigger,
  PopoverContent,
  PopoverCloseButton,
  Stack,
  HStack,
  Flex,
  Avatar,
} from '@chakra-ui/react';

const CoOwnershipPopOver = ({otherCoOwnersList,host, children}) => {
  // console.log('otherCoOwnersList', otherCoOwnersList, host?.last_name);
  return (
    <div>
      <Popover>
        <PopoverTrigger>{children}</PopoverTrigger>
        <Portal>
          <PopoverContent w="230px" p="10px 6px">
            <PopoverArrow />
            <Flex w="full" justify={'space-between'} borderBottom={'1px solid #F3F3F3'}>
              <Text fontWeight={500} color="#121212">
                {otherCoOwnersList?.length > 2 ? 'Co-owners' : `Co-owner`}
              </Text>
              <PopoverCloseButton />
            </Flex>
            <PopoverBody>
              <Stack>
                {otherCoOwnersList.filter(item=> item?.email !== host?.email).map((item, idx) => (
                  <HStack pb={1} key={idx} spacing={'10px'} fontSize={'14px'}>
                    <Avatar
                      border={'1px solid #F5F5F5'}
                      name={`${item?.first_name} ${item?.last_name}`}
                      src={item?.avatar}
                    />
                    <Text>{`${item?.first_name} ${item?.last_name}`}</Text>
                  </HStack>
                ))}
              </Stack>
            </PopoverBody>
          </PopoverContent>
        </Portal>
      </Popover>
    </div>
  );
};

export default CoOwnershipPopOver;
