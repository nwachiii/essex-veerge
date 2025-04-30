import {Box, Text, Flex, Stack, Image} from '@chakra-ui/react';
import {themeStyles} from '../../../../theme';
import defaultAvatar from '/src/images/default-avatar.png';
import Avatar1 from '/src/images/avatar-1.png';
import Avatar2 from '/src/images/avatar-2.png';
import Avatar3 from '/src/images/avatar-3.png';
import Avatar4 from '/src/images/avatar-4.png';
import Avatar5 from '/src/images/avatar-5.png';
import {lightenHex} from 'utils/lightenHEx';
import { ChevronRightIcon } from '@chakra-ui/icons';

const ListingInfoReservations = () => {
  return (
    <Stack gap='16px' mt="36px">
      <Flex w="full" justify="space-between">
        <Text
          gap="15px"
          fontSize="33px"
          color="#191919"
          fontWeight={500}
          lineHeight="30.43px"
          alignContent="center"
          mb="20px"
        >
          Reservation
        </Text>
        <Flex fontWeight={500} align='center' gap='8px' color='#191919' fontSize='16px' cursor='not-allowed'>
            <Text >View Reservation History</Text>
            <ChevronRightIcon fontSize='24px' />
        </Flex>
      </Flex>
      <Flex
        {...themeStyles.containerStyles}
        padding="13px 20px"
        maxW="100%"
        gap={{base: '16px', xl: '24px'}}
       alignItems='stretch'
      >
        {listReservations.map((reservation, index) => {
          const date = reservation?.date?.split(' ');
          const month = date[0];
          const day = date[1];

          return (
            <Stack
              key={index}
              border="0.5px solid #E4E4E7"
              bg="#FBFCFC"
              p="12px"
              rounded="8px"
              maxW="max-content"
              justify='space-between'
              flexGrow={1}
              flexBasis={0}
            >
              <Flex gap="8px" alignItems="center">
                <Flex
                  align="center"
                  justify="center"
                  p="10px"
                  boxSize="36px"
                  border="0.5px solid #E4E4E7"
                  bg="#FFF"
                  rounded="full"
                >
                  <Image src={reservation.icon} alt={reservation.name} />
                </Flex>
                <Text fontSize="15px" fontWeight={500}>
                  {reservation.name}
                </Text>
              </Flex>
              <Flex direction="column">
                <Text textTransform="uppercase" fontSize="12px" color="#DC2626" fontWeight={500}>
                  {month}
                </Text>
                <Text fontSize="33px" color="#000" fontWeight={500}>
                  {day}
                </Text>
              </Flex>

              <Flex bg={lightenHex(90, reservation.venue.color)} p="10px" rounded="8px" gap='8px'>
                <Box w="4px" h="67px" rounded="16px" bg={reservation.venue.color} />
                <Stack color={reservation.venue.textColor ?? reservation.venue.color} gap="4px">
                  <Text fontSize="14px" fontWeight={500} letterSpacing="0.26px">
                    {reservation.venue.address}
                  </Text>
                  <Text fontSize="14px" letterSpacing="0.26px">
                    {reservation.venue.time}
                  </Text>
                </Stack>
              </Flex>
              <Flex gap="10px">
                <Image src={reservation.avatar} alt={reservation.user} />
                <Text fontSize="14px" fontWeight={500} color="#000">
                  {reservation.user}
                </Text>
              </Flex>
            </Stack>
          );
        })}
      </Flex>
    </Stack>
  );
};

export default ListingInfoReservations

const listReservations = [
  {
    icon: 'https://tests-veerge.myxellia.io/_next/static/media/tennis-court.8373bad7.svg',
    name: 'Tennis Court #12',
    date: 'April 22',
    venue: {
      address: 'Aspen Row, Wisteria Lane',
      time: '06:00PM - 07:00PM',
      color: '#64C6FF',
      textColor: '#13618F',
    },
    user: 'Emily Johnson',
    avatar: defaultAvatar.src,
  },
  {
    icon: 'https://tests-veerge.myxellia.io/_next/static/media/guidance_conference_room.8cfe6896.svg',
    name: 'Conference Room',
    date: 'April 24',
    venue: {
      address: 'Pine Grove, Elm Street',
      time: '10:00AM - 12:00PM',
      color: '#991919',
    },
    user: 'Jessica Wilson',
    avatar: Avatar1.src,
  },
  {
    icon: 'https://tests-veerge.myxellia.io/_next/static/media/mdi_grill_outline.33938295.svg',
    name: 'BBQ Pavillion',
    date: 'April 27',
    venue: {
      address: '395 PRIME GROOVE',
      time: '12:00PM - 04:00PM',
      color: '#0C5D56',
    },
    user: 'Sarah Davis',
    avatar: Avatar2.src,
  },
  {
    icon: 'https://tests-veerge.myxellia.io/_next/static/media/mdi_cinema.96e97442.svg',
    name: 'Clubhouse',
    date: 'May 03',
    venue: {
      address: 'Brookline Court, Jasmine Crescent',
      time: '04:00PM - 09:00PM',
      color: '#20751E',
    },
    user: 'John Smith',
    avatar: Avatar3.src,
  },
  {
    icon: 'https://tests-veerge.myxellia.io/_next/static/media/swimming-pool.7341183d.svg',
    name: 'Pool Party Zone',
    date: 'May 05',
    venue: {
      address: 'Fernhill Row, Bluebell Avenue',
      time: '01:00PM - 03:00PM',
      color: '#F97316',
    },
    user: 'Kevin Brown',
    avatar: Avatar4.src,
  },
  {
    icon: 'https://tests-veerge.myxellia.io/_next/static/media/swimming-pool.7341183d.svg',
    name: 'Guest Suite #1',
    date: 'May 10-15',
    venue: {
      address: 'Chestnut Court, Lavender Crescent',
      time: '11:00AM - 12:00AM',
      color: '#F97316',
    },
    user: 'Jason Miller',
    avatar: Avatar5.src,
  },
];
