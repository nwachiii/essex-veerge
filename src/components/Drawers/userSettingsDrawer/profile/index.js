import {useRouter} from 'next/router';
import React, {useEffect} from 'react';
import {ProfileBox} from './profileBox/profileBoxComponent';
import {IdBox} from './idbox/idBoxComponent';
import {SecurityBox} from './securityBox/securityBoxComponent';
import {useQuery} from '@tanstack/react-query';
import {fetchDeveloperProfile} from '/src/apis/settings.js';
import {AnimatedLoader} from '@/components/index';
import AnimateInput from '@/components/AnimateInput';
import {
  Box,
  Center,
  DrawerBody,
  DrawerCloseButton,
  Flex,
  HStack,
  Heading,
  Image,
  Spinner,
  Stack,
  Text,
  Tooltip,
  VStack,
} from '@chakra-ui/react';
import {HiOutlinePencilSquare} from 'react-icons/hi2';
import {HiOutlinePencil} from 'react-icons/hi';

export const ProfileSettingsSection = ({isAccountActive, menu_toggle}) => {
  const router = useRouter();
  const {data, isError, isLoading, refetch} = useQuery(
    ['fetchDeveloperProfile'],
    fetchDeveloperProfile
  );

  return (
    <>
      <HStack
        boxShadow="4px 4px 8px 0px rgba(123, 157, 157, 0.05), -4px -4px 8px 0px rgba(123, 157, 157, 0.15)"
        py="12px"
        px="29px"
        justify="space-between"
        align="center"
        position="relative"
        h="49.699px"
        width="full"
        bg="#F5F5F5"
      >
        <Flex width="full" justifyContent="space-between" alignItems="center">
          {menu_toggle}
        </Flex>
        <HStack spacing="15px">
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
      <DrawerBody>
        {isLoading ? (
          <Center h="80vh" position="relative">
            {/* <AnimatedLoader /> */}
            <Spinner />
          </Center>
        ) : isError ? (
          <Center h="80vh" position="relative">
            <Text>Something went wrong</Text>
          </Center>
        ) : (
          <>
            <ProfileBox
              user={{
                role: data?.data?.role,
                ...data?.data?.develoeper_info,
              }}
              refetch={refetch}
            />

            <SecurityBox
              isAccountActive={isAccountActive}
              isMfa={data?.data?.develoeper_info?.developer?.developer?.is_mfa}
              refetch={refetch}
            />
          </>
        )}
      </DrawerBody>
    </>
  );
};
