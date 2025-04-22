import React from 'react';
import {Badge, Flex, Heading, HStack, Image, Stack, Text, VStack} from '@chakra-ui/react';
import welcomeIcon from '../../../images/icons/welcome-icon.png';

export const TopHeader = () => {
  const user = loggedinUserStatic;
  return (
    <HStack justify="space-between" mb="13px">
      <Stack zIndex={1000} gap={'0.5px'}>
        <Flex gap={2} zIndex={1000}>
          <Image alt="" src={welcomeIcon.src} width="29px" height="29px" />
          <Heading
            textTransform="capitalize"
            my="auto"
            fontSize="20px"
            fontWeight="600"
            lineHeight="25px"
            color="#191919"
          >
            Hi, {user?.first_name}
          </Heading>
          <VStack justify="center">
            {user?.initial_status == 'Pending' && (
              <Badge ml="1" colorScheme="yellow">
                New
              </Badge>
            )}
          </VStack>
        </Flex>
        <Text pl="39px" color="#3D3D3D" fontSize="10px" fontWeight="400" lineHeight="15px">
          Welcome to your dashboard
        </Text>
      </Stack>
    </HStack>
  );
};

export default TopHeader;
