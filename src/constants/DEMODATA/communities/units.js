import {Button} from 'ui-lib/ui-lib.components';
import {themeStyles} from '../../../theme';
import {Box, HStack, Image, Stack, Text} from '@chakra-ui/react';
import {useRouter} from 'next/router';

export const UNIT_DATA_COLUMNS = data => [
  // {
  //   Header: ' ',
  //   accessor: row => {
  //     return <></>;
  //   },
  // },
  {
    Header: 'Name',
    accessor: row => {
      return (
        <HStack mx="auto" spacing="11px">
          <Image
            alt=""
            boxSize="40px"
            src={`https://d1x2tneac0i3nn.cloudfront.net/${row?.unit_image}`}
          />
          <Stack>
            <Text fontSize="14px" fontWeight={500} color="#191919">
              {row?.unit_name}
            </Text>
            <Text fontSize="14px" fontWeight={500} color="#52525B">
              {row?.address}
            </Text>
          </Stack>
        </HStack>
      );
    },
  },
  {
    Header: 'Occupant',
    accessor: row => {
      return (
        <HStack mx="auto" spacing="11px">
          <Image
            alt=""
            boxSize="40px"
            src={`https://d1x2tneac0i3nn.cloudfront.net/${row?.avatar}`}
          />
          <Text fontSize="16px" color="#191919">
            {row?.customer}
          </Text>
        </HStack>
      );
    },
  },
  {
    Header: 'Assessment Status',
    accessor: row => {
      return (
        <Text
          bg={
            row?.status?.toLowerCase() == 'not defaulting'
              ? themeStyles.color.matador__green_tag
              : row?.status == 'reversed'
                ? themeStyles.color.matador__purple_tag
                : row?.status?.toLowerCase() == 'defaulting'
                  ? themeStyles.color.matador__yellow_tag
                  : '-'
          }
          color={
            row?.status?.toLowerCase() == 'not defaulting'
              ? themeStyles.color.matador__green
              : row?.status == 'reversed'
                ? themeStyles.color.matador__purple
                : row?.status?.toLowerCase() == 'defaulting'
                  ? themeStyles.color.matador__yellow
                  : '-'
          }
          fontSize="14px"
          w="fit-content"
          fontWeight={500}
          padding={'4px 12px'}
          borderRadius={'16px'}
          textTransform={'capitalize'}
          fontFamily="Inter"
          textAlign="center"
        >
          {row?.status}
        </Text>
      );
    },
  },
  {
    Header: 'Action',
    hideHeader: true,
    accessor: row => {
      return <DrawerButton />;
    },
  },
];

export const OCCUPANT_DATA_COLUMNS = data => [
  // {
  //   Header: ' ',
  //   accessor: row => {
  //     return <></>;
  //   },
  // },
  {
    Header: 'Name',
    accessor: row => {
      return (
        <Text fontFamily="Inter" fontSize="14px" fontWeight={500} color="#191919">
          {row?.address}
        </Text>
      );
    },
  },
  {
    Header: 'Occupant',
    accessor: row => {
      return (
        <HStack mx="auto" align="center" spacing="11px">
          <Image alt="" boxSize="40px" src={row?.avatar} rounded="full" />
          <Stack fontFamily="Inter" gap="2px">
            <Text fontFamily="Inter" fontSize="14px" color="#191919">
              {row?.name}
            </Text>
            <Text fontFamily="Inter" fontSize="14px" color="#4545FE">
              {row?.email}
            </Text>
          </Stack>
        </HStack>
      );
    },
  },
  {
    Header: 'Phone',
    accessor: row => {
      return (
        <Text fontFamily="Inter" fontSize="14px" fontWeight={500} color="#191919">
          {row?.phoneNumber}
        </Text>
      );
    },
  },
  {
    Header: 'Status',
    accessor: row => {
      return (
        <Text
          bg={
            row?.status?.toLowerCase() == 'owner'
              ? themeStyles.color.matador__green_tag
              : row?.status == 'reversed'
                ? themeStyles.color.matador__purple_tag
                : row?.status?.toLowerCase() == 'tenant'
                  ? themeStyles.color.matador__yellow_tag
                  : '-'
          }
          color={
            row?.status?.toLowerCase() == 'owner'
              ? themeStyles.color.matador__green
              : row?.status == 'reversed'
                ? themeStyles.color.matador__purple
                : row?.status?.toLowerCase() == 'tenant'
                  ? themeStyles.color.matador__yellow
                  : '-'
          }
          fontSize="14px"
          w="fit-content"
          fontWeight={500}
          padding={'4px 12px'}
          borderRadius={'16px'}
          textTransform={'capitalize'}
          fontFamily="Inter"
          textAlign="center"
        >
          {row?.status}
        </Text>
      );
    },
  },
  {
    Header: 'Action',
    hideHeader: true,
    accessor: row => {
      return <OccupantDrawerButton />;
    },
  },
];

export const unitsData = {
  data: [
    {
      unit_image: 'Unit-Icon1.png',
      unit_name: '12-D',
      customer: 'Ralph Edwards',
      status: 'Not Defaulting',
      address: '4th Avenue, Roseline Close',
      avatar: 'Occupant-Icon1.png',
    },
    {
      unit_image: 'Unit-Icon2.png',
      unit_name: '7-A',
      customer: 'Wade Warren',
      status: 'Defaulting',
      address: 'Maple Court, Lily Lane',
      avatar: 'Occupant-Icon2.png',
    },
    {
      unit_image: 'Unit-Icon3.png',
      unit_name: 'E-14',
      customer: 'Arlene McCoy',
      status: 'Defaulting',
      address: '5th Avenue, Roseline Close',
      avatar: 'Occupant-Icon3.png',
    },
    {
      unit_image: 'Unit-Icon4.png',
      unit_name: 'B-102',
      customer: 'Savannah Nguyen',
      status: 'Not Defaulting',
      address: 'Garden Heights, Pine Hill Road',
      avatar: 'Occupant-Icon4.png',
    },
    {
      unit_image: 'Unit-Icon5.png',
      unit_name: 'D-23',
      customer: 'Courtney Henry',
      status: 'Defaulting',
      address: 'Blossom Way, Cherrywood Drive',
      avatar: 'Occupant-Icon5.png',
    },
    {
      unit_image: 'Unit-Icon6.png',
      unit_name: '45-G',
      customer: 'Jerome Bell',
      status: 'Not Defaulting',
      address: 'Sunset Drive, Willow Park Avenue',
      avatar: 'Occupant-Icon6.png',
    },
    {
      unit_image: 'Unit-Icon7.png',
      unit_name: 'A-11',
      customer: 'Jenny Wilson',
      status: 'Defaulting',
      address: 'Palm Grove, Lavender Hill',
      avatar: 'Occupant-Icon7.png',
    },
    {
      unit_image: 'Unit-Icon8.png',
      unit_name: '4-8',
      customer: 'Darlene Robertson',
      status: 'Not Defaulting',
      address: 'Silver Heights, Briarwood Lane',
      avatar: 'Occupant-Icon8.png',
    },
    {
      unit_image: 'Unit-Icon9.png',
      unit_name: '9-F',
      customer: 'Devon Lane',
      status: 'Defaulting',
      address: 'Ivy Lane, Westbrook Close',
      avatar: 'Occupant-Icon9.png',
    },
    {
      unit_image: 'Unit-Icon10.png',
      unit_name: '6-08',
      customer: 'Flora Miles',
      status: 'Defaulting',
      address: 'Laurel Heights, Riverstone Drive',
      avatar: 'Occupant-Icon10.png',
    },
  ],
};

const DrawerButton = () => {
  const router = useRouter();

  return (
    <Button
      borderRadius="72px"
      w="118px"
      h="46px"
      color="#000"
      fontWeight={'400'}
      border="1px solid"
      borderColor="#E4E4E7"
      variant="outline"
      _hover={{
        opacity: 1,
      }}
      fontSize="14px"
      onClick={() => router.push(`/communities/manage/unit_info?&unitId=1`)}
    >
      View
    </Button>
  );
};

const OccupantDrawerButton = () => {
  const router = useRouter();

  return (
    <Button
      borderRadius="72px"
      w="118px"
      h="46px"
      color="#000"
      fontWeight={'500'}
      border="1px solid"
      borderColor="#E4E4E7"
      variant="outline"
      _hover={{
        opacity: 1,
      }}
      fontSize="16px"
      onClick={() => router.push(`/residents/profile?userId=4026`)}
    >
      View
    </Button>
  );
};
