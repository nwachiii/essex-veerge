import {LayoutView} from '../../../components/PageLayout/LayoutView';
import {
  HStack,
  Image,
  Box,
  Center,
  VStack,
  Text,
  Flex,
  Button as ChakraButton,
  useDisclosure,
} from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import {useSmallerLaptopsBreakpoint} from '/src/ui-lib/ui-lib.hooks/useSmallerLaptopsBreakpoint.js';
import {ChevronLeftIcon} from '@chakra-ui/icons';
// import {Button} from 'ui-lib/ui-lib.components';
// import ralph from '../../../images/resident-profile/ralph.png';
import calling from '../../../images/resident-profile/calling.svg';
import plus from '../../../images/resident-profile/plus.svg';
import info from '../../../images/resident-profile/info.svg';
import basketBall from '../../../images/resident-profile/basketBall.svg';
import edit from '../../../images/resident-profile/edit.svg';
import vehicle from '../../../images/resident-profile/vehicle.svg';
import treasurer from '../../../images/resident-profile/treasurer.svg';
import clubHouse from '../../../images/resident-profile/clubHouse.svg';
import poolParty from '../../../images/resident-profile/poolParty.svg';
// import moreOption from '../../../images/resident-profile/moreOption.svg';
// import verify from '../../../images/resident-profile/verify.svg';
import pet from '../../../images/resident-profile/pet.svg';
import lease from '../../../images/resident-profile/lease.svg';
import document from '../../../images/resident-profile/document.svg';
import ppt1 from '../../../images/resident-profile/ppt1.png';
import ppt2 from '../../../images/resident-profile/ppt2.png';
import ppt3 from '../../../images/resident-profile/ppt3.png';
import {useRouter} from 'next/router';
const ResidentProfileDrawerOptions = dynamic(
  () => import('@/components/Drawers/resident/profile'),
  {ssr: false}
);
// import DataMigrationModal from '@/components/dashboard/dataMigration'
const NotesDrawer = dynamic(() => import('@/components/notesDrawer'), {
  ssr: false,
});

const Button = ({children, ...rest}) => (
  <ChakraButton _hover={{opacity: 1}} _active={{opacity: 1}} h="55px" {...rest}>
    {children}
  </ChakraButton>
);

export const SingleCustomerPage = ({userId}) => {
  const isSmallerLaptop = useSmallerLaptopsBreakpoint();
  const router = useRouter();
  const modalDisclosure = useDisclosure();

  const portfolio = [
    {
      image: ppt1.src,
      name: '12-D',
      type: 'Oak Ridge',
      tag: 'Owner-Occupied',
      color: 'green',
      balanceColor: 'black',
      balance: '-$800.00(credit)',
      openRequest: '1',
      violation: '0',
    },
    {
      image: ppt2.src,
      name: 'D23',
      type: 'Haven Estate',
      tag: 'Tenant-As Landlord',
      color: 'purple',
      balanceColor: 'red',
      balance: '$200.00(due)',
      openRequest: '0',
      violation: '1',
    },
    {
      image: ppt3.src,
      name: '3 Bedroom',
      type: 'Astrid 2.0',
      tag: 'Owner',
      color: 'green',
      balanceColor: 'black',
      balance: '$0.00',
      openRequest: '2',
      violation: '0',
    },
  ];

  const requestOrWorkOrder = [
    {
      name: 'Leaking Faucet',
      tag: 'In Progress',
      tagColor: '#92310A',
      tagBg: '#FFF7ED',
      ppt: '12-B',
      firstText: 'WO - 8831',
      secondText: 'SLA 2 hours',
    },
    {
      name: 'Patio Cover',
      tag: 'Committee vote',
      tagColor: '#3737D1',
      tagBg: '#EEF4FF',
      ppt: '14-D',
      firstText: 'WO - 8357',
      secondText: 'SLA 12 Days',
    },
  ];
  const violation = [
    {
      name: 'Trash Can',
      tag: 'Cured',
      tagColor: '#116932',
      tagBg: '#F0FDF4',
      ppt: '14-D',
      firstText: 'V - 1432',
      secondText: '20 APR',
    },
    {
      name: 'Late Night Noise',
      tag: 'Fined',
      tagColor: '#991919',
      tagBg: '#FEF2F2',
      ppt: '14-D',
      firstText: 'V - 1425',
      secondText: '22 APR',
    },
  ];
  const upcomingReserve = [
    {
      icon: basketBall.src,
      name: 'Tennis Court #12',
      tagColor: '#13618F',
      tagLeftColor: '#64C6FF',
      tagBg: 'rgba(100, 198, 255, 0.10)',
      month: 'APRIL',
      day: '22',
      firstText: 'Aspen Row, Wisteria Lane',
      secondText: '06:00PM - 07:00PM',
    },
    {
      icon: clubHouse.src,
      name: 'Clubhouse',
      tagColor: '#20751E',
      tagLeftColor: '#06D001',
      tagBg: 'rgba(6, 208, 1, 0.10)',
      month: 'MAY',
      day: '03',
      firstText: 'Pine Grove, Elm Street',
      secondText: '04:00PM - 09:00PM',
    },
    {
      icon: poolParty.src,
      name: 'Pool Party Zone',
      tagColor: '#92310A',
      tagLeftColor: '#F97316',
      tagBg: '#FFEDD5',
      month: 'MAY',
      day: '05',
      firstText: 'Pine Grove, Elm  Street',
      secondText: '01:00PM - 03:00PM',
    },
  ];

  const documents = [
    {
      name: 'Lease',
      ppt: '14-D',
      firstText: 'Expiration 21 Dec, 2025',
    },
    {
      name: 'HO-6 policy',
      ppt: '12-B',
      firstText: 'Expiration 30 Jun, 2025',
    },
  ];
  const KYC = [
    {
      name: 'Driver’s License',
      ppt: '14-D',
      firstText: 'Expiration 10 Jan, 2028',
    },
    {
      name: 'International Passport',
      ppt: '12-B',
      firstText: 'Expiration 15 May, 2029',
    },
  ];
  const pets = [
    {
      icon: pet.src,
      name: 'Pet',
      ppt: '14-D',
      firstText: '1 dog (Labrador)',
    },
    {
      icon: vehicle.src,
      name: 'Vehicles',
      ppt: '12-B',
      firstText: '8JQK321',
    },
    {
      icon: vehicle.src,
      name: 'Vehicles',
      ppt: '12-B',
      firstText: 'TXM 4827',
    },
  ];
  const board = [
    {
      name: 'Treasurer',
      ppt: 'Oak Ridge',
      firstText: 'Term End 21 Dec, 2026',
    },
    {
      name: 'ARC Member',
      ppt: 'Maple Glen',
      firstText: 'Term End 21 Dec, 2025',
    },
  ];

  return (
    <Box w="full" minH="100vh" bg="#FAFAFA" h={isSmallerLaptop ? '60vh' : ''}>
      <LayoutView
        px={{base: '0px', xl: '30px'}}
        tabPanelStyle={{pb: '0px'}}
        pb="0px"
        activePage="users"
      >
        <HStack
          mt="clamp(52px,calc(11.4vh + 40px),96px)"
          px={{base: '0px', xl: '30px'}}
          maxW="full"
          w="full"
          mx="auto"
          // mt="18px"
          spacing={'41.5px'}
          align={'flex-start'}
        >
          <VStack align={'stretch'} w="35%" position={'sticky'} top={'148px'} spacing={'28px'}>
            <HStack spacing={'12px'}>
              <Center
                w="50px"
                h="50px"
                borderRadius={'full'}
                border={'1px solid #E4E4E7'}
                cursor={'pointer'}
                onClick={() => router.back('/transactions')}
              >
                <ChevronLeftIcon color={'#000000'} fontSize={25} />
              </Center>

              <Text fontSize="20px" fontStyle="normal" fontWeight="600" lineHeight="normal">
                Profile
              </Text>
            </HStack>

            <VStack
              w="full"
              p="16px"
              spacing={'16px'}
              align={'center'}
              bg="#fff"
              border={'0.5px solid #E4E4E4'}
              borderRadius={'16px'}
            >
              <VStack spacing={'17px'}>
                <Image
                  alt=""
                  w="124px"
                  h="124px"
                  borderRadius={'full'}
                  src={'https://randomuser.me/api/portraits/men/32.jpg'}
                />
                <Text color={'#191919'} fontSize="28px" fontWeight="600" lineHeight="normal">
                  Ralph Edwards
                </Text>
              </VStack>

              <VStack
                align={'stretch'}
                w="full"
                divider={<Box w="full" borderBottom={'1px solid #F5F5F5'} />}
                spacing={'14px'}
              >
                <HStack justify={'space-between'} w="full">
                  <Text fontSize="14px" fontWeight="400" lineHeight="normal" color={'#191919'}>
                    Phone
                  </Text>

                  <VStack>
                    <Text fontSize="14px" fontWeight="600" lineHeight="normal">
                      +1 415 555 2671
                    </Text>
                    <HStack mt="7px" spacing={'9px'} align={'center'}>
                      <Button
                        borderRadius="full"
                        leftIcon={<Image boxSize={'16px'} src={calling.src} />}
                        color="#4545FE"
                        bg="rgba(69, 69, 254, 0.10)"
                        px="12px"
                        h="23px"
                        fontSize="12px"
                        fontWeight="500"
                        lineHeight="normal"
                      >
                        Call now
                      </Button>
                      <Image src={plus.src} />
                    </HStack>
                  </VStack>
                </HStack>

                <HStack justify={'space-between'} w="full">
                  <Text fontSize="14px" fontWeight="400" lineHeight="normal" color={'#191919'}>
                    Email
                  </Text>
                  <Text fontSize="14px" fontWeight="600" lineHeight="normal" color={'#4545FE'}>
                    ralpheds@gmail.com
                  </Text>
                </HStack>
                <HStack justify={'space-between'} w="full">
                  <Text fontSize="14px" fontWeight="400" lineHeight="normal" color={'#191919'}>
                    Gender
                  </Text>
                  <Text fontSize="14px" fontWeight="600" lineHeight="normal" color={'#191919'}>
                    Male
                  </Text>
                </HStack>
                <HStack justify={'space-between'} w="full">
                  <Text fontSize="14px" fontWeight="400" lineHeight="normal" color={'#191919'}>
                    Preferred Contact
                  </Text>
                  <Text fontSize="14px" fontWeight="600" lineHeight="normal" color={'#191919'}>
                    SMS
                  </Text>
                </HStack>
                <Button
                  leftIcon={<Image src={document.src} />}
                  h="49.87px"
                  px="16px"
                  bg="#E7FBF5"
                  borderRadius="full"
                  color="#064B38"
                  onClick={modalDisclosure.onOpen}
                >
                  Notes
                </Button>
              </VStack>
            </VStack>
          </VStack>

          <VStack spacing={'28px'} align={'stretch'} w="full">
            <HStack spacing={'35px'} alignSelf={'flex-end'}>
              <Button
                py="16px"
                px="40px"
                bg="#000"
                color="#fff"
                borderRadius="full"
                fontSize="16px"
                fontWeight="500"
                lineHeight="140%"
                letterSpacing="0.16px"
                onClick={() => router.push('/transactions')}
              >
                Transaction
              </Button>
              <ResidentProfileDrawerOptions />
            </HStack>

            <Box w="full" color={'#191919'}>
              <HStack w="full" justify={'space-between'}>
                <Text fontSize="19px" fontWeight="500" lineHeight="130%">
                  Portfolio
                </Text>

                {/* <HStack>
                    <Text fontSize="19px" fontWeight="500" lineHeight="130%">
                      Link New Unit
                    </Text>
                    <SmallAddIcon fontSize={25} />
                  </HStack> */}
              </HStack>
              <VStack
                mt="12px"
                p="16px"
                spacing={'16px'}
                align={'stretch'}
                border={'0.5px solid #E4E4E4'}
                bg="#fff"
                borderRadius={'16px'}
              >
                {portfolio.map(data => (
                  <HStack
                    key={data}
                    px="20px"
                    py="18px"
                    spacing={'24px'}
                    border={'0.8px solid #E4E4E4'}
                    bg="#fff"
                    borderRadius={'16px'}
                  >
                    <Image alt="" src={data.image} h="175px" w="180px" borderRadius={'15.265px'} />

                    <VStack w="full" spacing={'20px'} align={'stretch'}>
                      <HStack w="full" spacing={'24px'}>
                        <Box>
                          <Text fontSize="20px" fontWeight="600" lineHeight="normal">
                            {data.name}
                          </Text>
                          <Text fontSize="14px" fontWeight="400" lineHeight="normal">
                            {data.type}
                          </Text>
                        </Box>
                        <Center
                          px="12px"
                          py="4px"
                          fontSize="14px"
                          fontWeight="500"
                          lineHeight="20px"
                          color={data.color === 'green' ? '#116932' : '#6941C6'}
                          bg={data.color === 'green' ? '#F0FDF4' : '#F5F9FF'}
                          borderRadius={'full'}
                        >
                          Owner-Occupied
                        </Center>
                      </HStack>

                      <HStack w="full" spacing={'24px'}>
                        <Box>
                          <Text
                            fontSize="11px"
                            fontWeight="400"
                            lineHeight="150%"
                            letterSpacing={'0.33px'}
                          >
                            Balance
                          </Text>
                          <Text
                            fontSize="13px"
                            fontWeight="600"
                            lineHeight="150%"
                            letterSpacing={'0.26px'}
                            color={data.balanceColor === 'red' ? '#DC2626' : '#000'}
                          >
                            {data.balance}
                          </Text>
                        </Box>
                        <Box>
                          <Text
                            fontSize="11px"
                            fontWeight="400"
                            lineHeight="150%"
                            letterSpacing={'0.33px'}
                          >
                            Open Requests
                          </Text>
                          <Text
                            fontSize="13px"
                            fontWeight="600"
                            lineHeight="150%"
                            letterSpacing={'0.26px'}
                          >
                            {data.openRequest}
                          </Text>
                        </Box>
                        <Box>
                          <Text
                            fontSize="11px"
                            fontWeight="400"
                            lineHeight="150%"
                            letterSpacing={'0.33px'}
                          >
                            Violation
                          </Text>
                          <Text
                            fontSize="13px"
                            fontWeight="600"
                            lineHeight="150%"
                            letterSpacing={'0.26px'}
                          >
                            {data.violation}
                          </Text>
                        </Box>
                      </HStack>

                      <Button
                        h="40px"
                        w="152px"
                        borderRadius="full"
                        bg="#000"
                        color="#fff"
                        fontSize="16px"
                        fontWeight="500"
                        lineHeight="normal"
                        onClick={() => router.push('/communities/manage/unit_info?&unitId=1')}
                      >
                        View Details
                      </Button>
                    </VStack>
                  </HStack>
                ))}
              </VStack>
            </Box>

            <Box w="full" color={'#191919'}>
              <HStack w="full" justify={'space-between'}>
                <Text fontSize="19px" fontWeight="500" lineHeight="130%">
                  Requests / Work Orders
                </Text>

                {/* <HStack>
                    <Text fontSize="19px" fontWeight="500" lineHeight="130%">
                      View Work Order History
                    </Text>
                    <ChevronRightIcon fontSize={25} />
                  </HStack> */}
              </HStack>
              <HStack
                mt="12px"
                p="16px"
                spacing={'16px'}
                align={'stretch'}
                border={'0.5px solid #E4E4E4'}
                bg="#fff"
                borderRadius={'16px'}
              >
                {requestOrWorkOrder.map(data => (
                  <VStack
                    key={data}
                    align={'stretch'}
                    w="256px"
                    p="12px"
                    spacing={'12px'}
                    border={'0.8px solid #E4E4E4'}
                    bg="#FBFCFC"
                    borderRadius={'16px'}
                  >
                    <HStack spacing={'8px'}>
                      <Center
                        borderRadius={'full'}
                        boxSize={'36px'}
                        border={'1px solid #E4E4E7'}
                        bg="#FAFAFA"
                      >
                        <Image alt="" src={info.src} />
                      </Center>
                      <Text
                        fontSize="13px"
                        fontWeight="500"
                        lineHeight="150%"
                        letterSpacing="0.26px"
                      >
                        {data.name}
                      </Text>
                    </HStack>
                    <HStack spacing={'8px'}>
                      <Text fontSize="20px" fontWeight="600" lineHeight="normal">
                        {data.ppt}
                      </Text>
                      <Center
                        px="12px"
                        py="4px"
                        fontSize="14px"
                        fontWeight="500"
                        lineHeight="20px"
                        color={data.tagColor}
                        bg={data.tagBg}
                        borderRadius={'full'}
                      >
                        {data.tag}
                      </Center>
                    </HStack>

                    <HStack spacing={'8px'}>
                      <Text
                        fontSize="11px"
                        fontWeight="500"
                        lineHeight="150%"
                        letterSpacing={'0.33px'}
                        color={'#52525B'}
                      >
                        {data.firstText}
                      </Text>
                      <Box boxSize="3px" borderRadius={'full'} bg="#000" />
                      <Text
                        fontSize="11px"
                        fontWeight="500"
                        lineHeight="150%"
                        letterSpacing={'0.33px'}
                        color={'#27272A'}
                      >
                        {data.secondText}
                      </Text>
                    </HStack>
                  </VStack>
                ))}
              </HStack>
            </Box>

            <Box w="full" color={'#191919'}>
              <HStack w="full" justify={'space-between'}>
                <Text fontSize="19px" fontWeight="500" lineHeight="130%">
                  Violation
                </Text>

                {/* <HStack>
                    <Text fontSize="19px" fontWeight="500" lineHeight="130%">
                      View Violation History
                    </Text>
                    <ChevronRightIcon fontSize={25} />
                  </HStack> */}
              </HStack>
              <HStack
                mt="12px"
                p="16px"
                spacing={'16px'}
                align={'stretch'}
                border={'0.5px solid #E4E4E4'}
                bg="#fff"
                borderRadius={'16px'}
              >
                {violation.map(data => (
                  <VStack
                    align={'stretch'}
                    w="256px"
                    p="12px"
                    spacing={'12px'}
                    border={'0.8px solid #E4E4E4'}
                    bg="#FBFCFC"
                    borderRadius={'16px'}
                  >
                    <HStack spacing={'8px'}>
                      <Center
                        borderRadius={'full'}
                        boxSize={'36px'}
                        border={'1px solid #E4E4E7'}
                        bg="#FAFAFA"
                      >
                        <Image src={info.src} />
                      </Center>
                      <Text
                        fontSize="13px"
                        fontWeight="500"
                        lineHeight="150%"
                        letterSpacing="0.26px"
                      >
                        {data.name}
                      </Text>
                    </HStack>
                    <HStack spacing={'8px'}>
                      <Text fontSize="20px" fontWeight="600" lineHeight="normal">
                        {data.ppt}
                      </Text>
                      <Center
                        px="12px"
                        py="4px"
                        fontSize="14px"
                        fontWeight="500"
                        lineHeight="20px"
                        color={data.tagColor}
                        bg={data.tagBg}
                        borderRadius={'full'}
                      >
                        {data.tag}
                      </Center>
                    </HStack>

                    <HStack spacing={'8px'}>
                      <Text
                        fontSize="11px"
                        fontWeight="500"
                        lineHeight="150%"
                        letterSpacing={'0.33px'}
                        color={'#52525B'}
                      >
                        {data.firstText}
                      </Text>
                      <Box boxSize="3px" borderRadius={'full'} bg="#000" />
                      <Text
                        fontSize="11px"
                        fontWeight="500"
                        lineHeight="150%"
                        letterSpacing={'0.33px'}
                        color={'#27272A'}
                      >
                        {data.secondText}
                      </Text>
                    </HStack>
                  </VStack>
                ))}
              </HStack>
            </Box>

            <Box w="full" color={'#191919'}>
              <HStack w="full" justify={'space-between'}>
                <Text fontSize="19px" fontWeight="500" lineHeight="130%">
                  Upcoming Reservations / Events
                </Text>

                {/* <HStack>
                    <Text fontSize="19px" fontWeight="500" lineHeight="130%">
                      View Reservation History
                    </Text>
                    <ChevronRightIcon fontSize={25} />
                  </HStack> */}
              </HStack>
              <HStack
                mt="12px"
                p="16px"
                spacing={'16px'}
                align={'stretch'}
                border={'0.5px solid #E4E4E4'}
                bg="#fff"
                borderRadius={'16px'}
              >
                {upcomingReserve.map(data => (
                  <VStack
                    align={'stretch'}
                    w="256px"
                    p="12px"
                    spacing={'8px'}
                    border={'0.8px solid #E4E4E4'}
                    bg="#FBFCFC"
                    borderRadius={'16px'}
                  >
                    <HStack spacing={'8px'}>
                      <Center
                        borderRadius={'full'}
                        boxSize={'36px'}
                        border={'1px solid #E4E4E7'}
                        bg="#FAFAFA"
                      >
                        <Image src={data.icon} />
                      </Center>
                      <Text
                        fontSize="13px"
                        fontWeight="500"
                        lineHeight="150%"
                        letterSpacing="0.26px"
                      >
                        {data.name}
                      </Text>
                    </HStack>
                    <VStack spacing={'0'} w="full" align={'stretch'}>
                      <Text
                        fontSize="11px"
                        fontWeight="500"
                        lineHeight="150%"
                        letterSpacing="0.33px"
                        color={'#DC2626'}
                      >
                        {data.month}
                      </Text>
                      <Text fontSize="33px" fontWeight="500" lineHeight="130%" color={'#000'}>
                        {data.day}
                      </Text>
                    </VStack>

                    <Box bg={data.tagBg} px="5px" py="4px" maxW={'156px'}>
                      <VStack
                        spacing={'4px'}
                        align={'stretch'}
                        w="full"
                        pl="8px"
                        borderLeft={'4px solid'}
                        borderColor={data.tagLeftColor}
                      >
                        <Text
                          fontSize="13px"
                          fontWeight="500"
                          lineHeight="150%"
                          letterSpacing={'0.26px'}
                          color={data.tagColor}
                        >
                          {data.firstText}
                        </Text>
                        <Text
                          fontSize="13px"
                          fontWeight="400"
                          lineHeight="150%"
                          letterSpacing={'0.26px'}
                          color={data.tagColor}
                        >
                          {data.secondText}
                        </Text>
                      </VStack>
                    </Box>
                  </VStack>
                ))}
              </HStack>
            </Box>

            <Box w="full" color={'#191919'}>
              <Text fontSize="19px" fontWeight="500" lineHeight="130%">
                Documents & Certificates
              </Text>
              <HStack
                mt="12px"
                p="16px"
                spacing={'16px'}
                align={'stretch'}
                border={'0.5px solid #E4E4E4'}
                bg="#fff"
                borderRadius={'16px'}
              >
                {documents.map(data => (
                  <VStack
                    align={'stretch'}
                    w="256px"
                    p="12px"
                    spacing={'12px'}
                    border={'0.8px solid #E4E4E4'}
                    bg="#FBFCFC"
                    borderRadius={'16px'}
                  >
                    <HStack spacing={'8px'}>
                      <Center
                        borderRadius={'full'}
                        boxSize={'36px'}
                        border={'1px solid #E4E4E7'}
                        bg="#FAFAFA"
                      >
                        <Image src={lease.src} />
                      </Center>
                      <Text
                        fontSize="13px"
                        fontWeight="500"
                        lineHeight="150%"
                        letterSpacing="0.26px"
                      >
                        {data.name}
                      </Text>
                    </HStack>
                    <Text fontSize="20px" fontWeight="600" lineHeight="normal">
                      {data.ppt}
                    </Text>

                    <HStack
                      spacing={'8px'}
                      border={'0.5px solid #E4E4E7'}
                      w="fit-content"
                      px="6px"
                      py="4px"
                    >
                      <Box boxSize="3px" borderRadius={'full'} bg="#DC2626" />
                      <Text
                        fontSize="10px"
                        fontWeight="400"
                        lineHeight="150%"
                        letterSpacing={'0.3px'}
                        color={'#27272A'}
                      >
                        {data.firstText}
                      </Text>
                    </HStack>
                  </VStack>
                ))}
              </HStack>
            </Box>

            <Box w="full" color={'#191919'}>
              <Text fontSize="19px" fontWeight="500" lineHeight="130%">
                KYC/ID verification
              </Text>
              <HStack
                mt="12px"
                p="16px"
                spacing={'16px'}
                align={'stretch'}
                border={'0.5px solid #E4E4E4'}
                bg="#fff"
                borderRadius={'16px'}
              >
                {KYC.map(data => (
                  <VStack
                    align={'stretch'}
                    w="256px"
                    p="12px"
                    spacing={'12px'}
                    border={'0.8px solid #E4E4E4'}
                    bg="#FBFCFC"
                    borderRadius={'16px'}
                  >
                    <HStack spacing={'8px'}>
                      <Center
                        borderRadius={'full'}
                        boxSize={'36px'}
                        border={'1px solid #E4E4E7'}
                        bg="#FAFAFA"
                      >
                        <Image src={lease.src} />
                      </Center>
                      <Text
                        fontSize="13px"
                        fontWeight="500"
                        lineHeight="150%"
                        letterSpacing="0.26px"
                      >
                        {data.name}
                      </Text>
                    </HStack>
                    <Text fontSize="20px" fontWeight="600" lineHeight="normal">
                      {data.ppt}
                    </Text>

                    <HStack
                      spacing={'8px'}
                      border={'0.5px solid #E4E4E7'}
                      w="fit-content"
                      px="6px"
                      py="4px"
                    >
                      <Box boxSize="3px" borderRadius={'full'} bg="#DC2626" />
                      <Text
                        fontSize="10px"
                        fontWeight="400"
                        lineHeight="150%"
                        letterSpacing={'0.3px'}
                        color={'#27272A'}
                      >
                        {data.firstText}
                      </Text>
                    </HStack>
                  </VStack>
                ))}
              </HStack>
            </Box>

            <Box w="full" color={'#191919'}>
              <Text fontSize="19px" fontWeight="500" lineHeight="130%">
                Pet & Vehicles
              </Text>
              <HStack
                mt="12px"
                p="16px"
                spacing={'16px'}
                align={'stretch'}
                border={'0.5px solid #E4E4E4'}
                bg="#fff"
                borderRadius={'16px'}
              >
                {pets.map(data => (
                  <VStack
                    align={'stretch'}
                    w="256px"
                    p="12px"
                    spacing={'12px'}
                    border={'0.8px solid #E4E4E4'}
                    bg="#FBFCFC"
                    borderRadius={'16px'}
                  >
                    <HStack spacing={'8px'}>
                      <Center
                        borderRadius={'full'}
                        boxSize={'36px'}
                        border={'1px solid #E4E4E7'}
                        bg="#FAFAFA"
                      >
                        <Image src={data.icon} />
                      </Center>
                      <Text
                        fontSize="13px"
                        fontWeight="500"
                        lineHeight="150%"
                        letterSpacing="0.26px"
                      >
                        {data.name}
                      </Text>
                    </HStack>
                    <Text fontSize="20px" fontWeight="600" lineHeight="normal">
                      {data.ppt}
                    </Text>

                    <HStack
                      spacing={'8px'}
                      border={'0.5px solid #E4E4E7'}
                      w="fit-content"
                      px="6px"
                      py="4px"
                    >
                      <Box boxSize="3px" borderRadius={'full'} bg="#DC2626" />
                      <Text
                        fontSize="10px"
                        fontWeight="400"
                        lineHeight="150%"
                        letterSpacing={'0.3px'}
                        color={'#27272A'}
                      >
                        {data.firstText}
                      </Text>
                    </HStack>
                  </VStack>
                ))}
              </HStack>
            </Box>

            <Box w="full" color={'#191919'}>
              <Text fontSize="19px" fontWeight="500" lineHeight="130%">
                Board & Committee Roles
              </Text>
              <HStack
                mt="12px"
                p="16px"
                spacing={'16px'}
                align={'stretch'}
                border={'0.5px solid #E4E4E4'}
                bg="#fff"
                borderRadius={'16px'}
              >
                {board.map(data => (
                  <VStack
                    key={data}
                    align={'stretch'}
                    w="256px"
                    p="12px"
                    spacing={'12px'}
                    border={'0.8px solid #E4E4E4'}
                    bg="#FBFCFC"
                    borderRadius={'16px'}
                  >
                    <HStack spacing={'8px'}>
                      <Center
                        borderRadius={'full'}
                        boxSize={'36px'}
                        border={'1px solid #E4E4E7'}
                        bg="#FAFAFA"
                      >
                        <Image src={treasurer.src} />
                      </Center>
                      <Text
                        fontSize="13px"
                        fontWeight="500"
                        lineHeight="150%"
                        letterSpacing="0.26px"
                      >
                        {data.name}
                      </Text>
                    </HStack>
                    <Text fontSize="20px" fontWeight="600" lineHeight="normal">
                      {data.ppt}
                    </Text>

                    <HStack
                      spacing={'8px'}
                      border={'0.5px solid #E4E4E7'}
                      w="fit-content"
                      px="6px"
                      py="4px"
                    >
                      <Box boxSize="3px" borderRadius={'full'} bg="#DC2626" />
                      <Text
                        fontSize="10px"
                        fontWeight="400"
                        lineHeight="150%"
                        letterSpacing={'0.3px'}
                        color={'#27272A'}
                      >
                        {data.firstText}
                      </Text>
                    </HStack>
                  </VStack>
                ))}
              </HStack>
            </Box>

            <Box w="full" color={'#191919'}>
              <HStack w="full" justify={'space-between'}>
                <Text fontSize="19px" fontWeight="500" lineHeight="130%">
                  Resident’s Additional Information
                </Text>

                <HStack>
                  <Text fontSize="19px" fontWeight="500" lineHeight="130%">
                    Edit Details
                  </Text>
                  <Image src={edit.src} />
                </HStack>
              </HStack>

              <Flex
                mt="12px"
                p="16px"
                // columnGap={'24px'}
                rowGap={'16px'}
                align={'stretch'}
                border={'0.5px solid #E4E4E4'}
                bg="#fff"
                borderRadius={'16px'}
                flexWrap={'wrap'}
                justify={'space-between'}
              >
                <Center
                  w="37%"
                  h="117px"
                  flexDir={'column'}
                  p="12px"
                  gap={'10px'}
                  border={'0.8px solid #E4E4E4'}
                  bg="#FBFCFC"
                  borderRadius={'12px'}
                >
                  <Text fontSize="14px" fontWeight="400" color="#27272A">
                    Education
                  </Text>
                  <Text fontSize="20px" fontWeight="600" lineHeight="normal">
                    MBA
                  </Text>
                </Center>
                <Center
                  w="30%"
                  h="117px"
                  flexDir={'column'}
                  p="12px"
                  gap={'10px'}
                  border={'0.8px solid #E4E4E4'}
                  bg="#FBFCFC"
                  borderRadius={'12px'}
                >
                  <Text fontSize="14px" fontWeight="400" color="#27272A">
                    Occupation
                  </Text>
                  <Text fontSize="20px" fontWeight="600" lineHeight="normal">
                    Software Engineer
                  </Text>
                </Center>
                <Center
                  w="30%"
                  h="117px"
                  flexDir={'column'}
                  p="12px"
                  gap={'10px'}
                  border={'0.8px solid #E4E4E4'}
                  bg="#FBFCFC"
                  borderRadius={'12px'}
                >
                  <Text fontSize="14px" fontWeight="400" color="#27272A">
                    Marital Status
                  </Text>
                  <Text fontSize="20px" fontWeight="600" lineHeight="normal">
                    Single
                  </Text>
                </Center>

                <Center
                  w="32%"
                  h="117px"
                  flexDir={'column'}
                  p="12px"
                  gap={'10px'}
                  border={'0.8px solid #E4E4E4'}
                  bg="#FBFCFC"
                  borderRadius={'12px'}
                >
                  <Text fontSize="14px" fontWeight="400" color="#27272A">
                    Company Name
                  </Text>
                  <Text fontSize="20px" fontWeight="600" lineHeight="normal">
                    Meta
                  </Text>
                </Center>
                <Center
                  w="32%"
                  h="117px"
                  flexDir={'column'}
                  p="12px"
                  gap={'10px'}
                  border={'0.8px solid #E4E4E4'}
                  bg="#FBFCFC"
                  borderRadius={'12px'}
                >
                  <Text fontSize="14px" fontWeight="400" color="#27272A">
                    Date of Birth
                  </Text>
                  <Text fontSize="20px" fontWeight="600" lineHeight="normal">
                    Jan 27, 1988
                  </Text>
                </Center>
                <Center
                  w="33%"
                  h="117px"
                  flexDir={'column'}
                  p="12px"
                  gap={'10px'}
                  border={'0.8px solid #E4E4E4'}
                  bg="#FBFCFC"
                  borderRadius={'12px'}
                >
                  <Text fontSize="14px" fontWeight="400" color="#27272A">
                    Joined Date
                  </Text>
                  <Text fontSize="20px" fontWeight="600" lineHeight="normal">
                    Sep 04, 2021
                  </Text>
                </Center>

                <Box
                  w="100%"
                  h="80px"
                  flexDir={'column'}
                  p="16px"
                  border={'0.8px solid #E4E4E4'}
                  bg="#FBFCFC"
                  borderRadius={'12px'}
                >
                  <Text fontSize="13px" fontWeight="500" color="#52525B">
                    Mailing Address
                  </Text>
                  <Text mt="8px" fontSize="16px" fontWeight="500" lineHeight="normal">
                    742 Evergreen Terrace Springfield, IL 62704
                  </Text>
                </Box>
                <Box
                  w="100%"
                  h="80px"
                  flexDir={'column'}
                  p="16px"
                  border={'0.8px solid #E4E4E4'}
                  bg="#FBFCFC"
                  borderRadius={'12px'}
                >
                  <Text fontSize="13px" fontWeight="500" color="#52525B">
                    Residential Address
                  </Text>
                  <Text mt="8px" fontSize="16px" fontWeight="500" lineHeight="normal">
                    4th Avenue, Roseline Close
                  </Text>
                </Box>

                <Box
                  w="100%"
                  h="80px"
                  flexDir={'column'}
                  p="16px"
                  border={'0.8px solid #E4E4E4'}
                  bg="#FBFCFC"
                  borderRadius={'12px'}
                >
                  <Text fontSize="13px" fontWeight="500" color="#52525B">
                    Employment Address
                  </Text>
                  <Text mt="8px" fontSize="16px" fontWeight="500" lineHeight="normal">
                    344 Dublin Dr Mineral Wells, West Virginia(WV)
                  </Text>
                </Box>
              </Flex>
            </Box>

            <Box w="full" color={'#191919'}>
              <HStack w="full" justify={'space-between'}>
                <Text fontSize="19px" fontWeight="500" lineHeight="130%">
                  Next of Kin Details
                </Text>

                <HStack>
                  <Text fontSize="19px" fontWeight="500" lineHeight="130%">
                    Edit Details
                  </Text>
                  <Image src={edit.src} />
                </HStack>
              </HStack>

              <Flex
                mt="12px"
                p="16px"
                // columnGap={'24px'}
                rowGap={'16px'}
                align={'stretch'}
                border={'0.5px solid #E4E4E4'}
                bg="#fff"
                borderRadius={'16px'}
                flexWrap={'wrap'}
                justify={'space-between'}
              >
                <Box
                  w="49.3%"
                  h="80px"
                  flexDir={'column'}
                  p="16px"
                  border={'0.8px solid #E4E4E4'}
                  bg="#FBFCFC"
                  borderRadius={'12px'}
                >
                  <Text fontSize="13px" fontWeight="500" color="#52525B">
                    Legal First Name
                  </Text>
                  <Text mt="8px" fontSize="16px" fontWeight="500" lineHeight="normal">
                    John
                  </Text>
                </Box>
                <Box
                  w="49.3%"
                  h="80px"
                  flexDir={'column'}
                  p="16px"
                  border={'0.8px solid #E4E4E4'}
                  bg="#FBFCFC"
                  borderRadius={'12px'}
                >
                  <Text fontSize="13px" fontWeight="500" color="#52525B">
                    Legal Last Name
                  </Text>
                  <Text mt="8px" fontSize="16px" fontWeight="500" lineHeight="normal">
                    Edwards
                  </Text>
                </Box>
                <Box
                  w="33%"
                  h="80px"
                  flexDir={'column'}
                  p="16px"
                  border={'0.8px solid #E4E4E4'}
                  bg="#FBFCFC"
                  borderRadius={'12px'}
                >
                  <Text fontSize="13px" fontWeight="500" color="#52525B">
                    Relationship
                  </Text>
                  <Text mt="8px" fontSize="16px" fontWeight="500" lineHeight="normal">
                    Brother
                  </Text>
                </Box>
                <Box
                  w="32%"
                  h="80px"
                  flexDir={'column'}
                  p="16px"
                  border={'0.8px solid #E4E4E4'}
                  bg="#FBFCFC"
                  borderRadius={'12px'}
                >
                  <Text fontSize="13px" fontWeight="500" color="#52525B">
                    Email Address
                  </Text>
                  <Text mt="8px" fontSize="16px" fontWeight="500" color="#4545FE">
                    Edwarjean34@gmail.comds
                  </Text>
                </Box>
                <Box
                  w="32%"
                  h="80px"
                  flexDir={'column'}
                  p="16px"
                  border={'0.8px solid #E4E4E4'}
                  bg="#FBFCFC"
                  borderRadius={'12px'}
                >
                  <Text fontSize="13px" fontWeight="500" color="#52525B">
                    Phone
                  </Text>
                  <Text mt="8px" fontSize="16px" fontWeight="500" lineHeight="normal">
                    +1 217 555-0113
                  </Text>
                </Box>
                <Box
                  w="100%"
                  h="80px"
                  flexDir={'column'}
                  p="16px"
                  border={'0.8px solid #E4E4E4'}
                  bg="#FBFCFC"
                  borderRadius={'12px'}
                >
                  <Text fontSize="13px" fontWeight="500" color="#52525B">
                    Residential Address
                  </Text>
                  <Text mt="8px" fontSize="16px" fontWeight="500" lineHeight="normal">
                    114 Dublin Dr Mineral Wells, West Virginia(WV)
                  </Text>
                </Box>
              </Flex>
            </Box>
          </VStack>
        </HStack>

        <NotesDrawer modalDisclosure={modalDisclosure} />
      </LayoutView>
    </Box>
  );
};

export default SingleCustomerPage;

// export async function getServerSideProps(context) {
//   const {query} = context;
//   const userId = query.userId;

//   return {
//     props: {
//       userId,
//     },
//   };
// }
