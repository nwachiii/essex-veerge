import {useRouter} from 'next/router';
import {useQuery} from '@tanstack/react-query';
import React from 'react';
import {BusinessProfile} from './businessProfile/businessprofile';
import VeergeCompanyProfile from './VeergeCompanyProfile';
import {DocumentBox} from './companyDocuments/documentBox';
import {fetchDeveloperComplaince} from '/src/apis/settings.js';
import {AnimatedLoader} from '/src/components';
import {
  Box,
  Center,
  DrawerBody,
  DrawerCloseButton,
  Flex,
  HStack,
  Spinner,
  Stack,
  Text,
  Tooltip,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import {isRoleRestricted} from 'ui-lib/ui-lib.components';
import {IsRoleRestricted} from 'ui-lib/ui-lib.components/IsRoleRestricted';
import {HiOutlinePencil} from 'react-icons/hi';
import Image from 'next/image';

export const ComplianceSettingsSection = ({menu_toggle}) => {
  const router = useRouter();

  const {data, isError, isLoading, refetch} = useQuery(
    ['developerCompliance'],
    fetchDeveloperComplaince
  );

  const businessProfileDisclosure = useDisclosure();

  // localStorage.setItem(
  //   "compliance_isCompleted",
  //   JSON.stringify(data?.data?.completed)
  // );

  const user =
    typeof window !== 'undefined' &&
    localStorage &&
    JSON?.parse(localStorage.getItem('loggedinUser')) !== undefined &&
    JSON?.parse(localStorage.getItem('loggedinUser'));

  // if (isRoleRestricted(user?.role, 'compliance')) {
  //   return <IsRoleRestricted />;
  // }

  // if (isError) {
  //   return;
  // }

  // if (data) {
  const dev = data?.data.developer;
  console.log('dev_compliance', dev);
  localStorage.setItem(
    'loggedinUser',
    JSON.stringify({...user, company_image: dev?.company_image})
  );
  // }

  return (
    <>
      <HStack
        boxShadow="4px 4px 8px 0px rgba(123, 157, 157, 0.05), -4px -4px 8px 0px rgba(123, 157, 157, 0.15)"
        py="12px"
        h="49.699px"
        px="29px"
        justify="space-between"
        align="center"
        position="relative"
        width="full"
        bg="#F5F5F5"
      >
        <Flex width="full" justifyContent="space-between" alignItems="center">
          {menu_toggle}
          {isError ? null : (
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              gap="16px"
              onClick={businessProfileDisclosure.onOpen}
            >
              <Tooltip label="Edit Profile">
                <Box
                  border="0.68px solid #191919"
                  p="10px"
                  borderRadius="8.12px"
                  _hover={{
                    background: 'rgba(25, 25, 25, 0.10)',
                  }}
                  cursor="pointer"
                >
                  <HiOutlinePencil />
                </Box>
              </Tooltip>
            </Box>
          )}
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
            <BusinessProfile
              bio={dev?.bio}
              refetch={refetch}
              website={dev?.website}
              img={dev?.company_image}
              location={dev?.location}
              name={dev?.business_name}
              type={dev?.business_type}
              lastName={dev?.last_name}
              email={dev?.business_mail}
              cacNumber={dev?.cac_number}
              firstName={dev?.first_name}
              phoneWithCode={dev?.phone ? `${dev?.phone?.code}${dev?.phone?.number}` : ''}
              phoneNumber={dev?.phone ? `${dev?.phone?.number}` : ''}
              phoneCode={dev?.phone ? `${dev?.phone?.code}` : ''}
              businessProfileDisclosure={businessProfileDisclosure}
            />

            <VeergeCompanyProfile
              bio={dev?.bio}
              refetch={refetch}
              fb={dev?.social_links_facebook}
              ins={dev?.social_links_instagram}
              li={dev?.social_links_linkedIn}
              tw={dev?.social_links_twitter}
            />
          </>
        )}
      </DrawerBody>
    </>
  );
};
