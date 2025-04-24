import {
  Box,
  Center,
  Flex,
  HStack,
  Image,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  SimpleGrid,
  Stack,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import menuIcon from '/src/images/icons/Iconly/Light/Iconly/Bulk/Category.svg';
import calendarIcon from '/src/images/icons/menu-calendar-icon.svg';
import levyIcon from '/src/images/icons/levyIcon.svg';
import appIcon from '/src/images/icons/menu-app-icon.svg';
import loopIcon from '/src/images/icons/menu-loop-icon.svg';
import driveIcon from '/src/images/icons/menu-drive-icon.svg';
import ticketIcon from '/src/images/icons/menu-ticket-icon2.svg';
import paymentPlanIcon from '/src/images/icons/menu-paymentPlanCalculator-icon.svg';
import feedbackIcon from '/src/images/icons/menu-feedback-icon.svg';
import inspectionIcon from '/src/images/icons/menu-inspection-icon.svg';
import notesIcon from '/src/images/icons/menu-notes-icon.svg';
import insightIcon from '/src/images/icons/menu-insight-icon-2.svg';
import manageAgentsIcon from '/src/images/icons/manageAgentsIcon.svg';
import marketPlaceIcon from '/src/images/icons/menu-marketplace-icon.svg';
import internalTestIcon from '/src/images/icons/menu-settings-icon.svg';
import billingIcon from '/src/images/icons/billing_icon.svg';
import supportIcon from '/src/images/icons/menu-support-icon.svg';
import broadcastIcon from '/src/images/icons/menu-broadcast-icon.svg';
import Link from 'next/link';
import QuestionMarkIcon from '../assets/QuestionMark';
import BlogIcon from '../assets/BlogIcon';
import RoadMapIcon from '../assets/RoadMap';
import ExternalLinkIcon from '../assets/ExternalLinkIcon';
import {fetchCount, fetchcreateStoreInfo} from '../../apis/settings';
import VeergeMenuDrawer from '../Drawers/veergeMenuDrawer';
import {useQuery} from '@tanstack/react-query';
import {useEffect} from 'react';
import InsightDrawer from '../Drawers/insightDrawer';
import VeergeCalendar from './calendar/VeergeCalendar';
import useLocalStorage from 'utils/useLocalStorage';
import {BroadcastDrawer} from '../Drawers/broadcastDrawer';
import {VeergeFeatureMenuIcon} from './navbar/svgs';
import {PolicyIcon} from '../assets/policyIcon';
import {keyframes} from '@emotion/react';
import ManageLevy from '../Drawers/levy/screens';

const fadeIn = keyframes`
0% { opacity: 0;scale:0 },
  

100% { opacity: 1 }
`;

const fadeOut = keyframes`
  from { opacity: 1;  }
  to { opacity: 0;  }
`;

export const STOREINFOQUERYKEY = ['store-info'];
export const VeergeFeatureMenu = ({openmanageApp, isPending}) => {
  const headerStyles = {
    color: '#191919',
    fontFamily: 'Euclid Circular B',
    fontSize: '16px',
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 'normal',
  };

  const typographyStyles = {
    color: '#4545FE',
    fontFamily: 'Euclid Circular B',
    fontSize: '14px',
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 'normal',
    position: 'relative',
    width: 'fit-content',
  };
  const manageAppDisclosure = useDisclosure();
  const insightDisclosure = useDisclosure();
  const levyDisclosure = useDisclosure();
  const {isOpen, onClose, onOpen} = useDisclosure();
  const [business_id] = useLocalStorage('business_id');
  const storeInfo = useQuery(STOREINFOQUERYKEY, fetchcreateStoreInfo);
  const storeName = storeInfo.data?.data?.store_name;

  //store business id
  business_id
    ? null
    : localStorage.setItem('business_id', JSON.stringify(storeInfo.data?.data?.business_id));

  const veergeMenuCount = useQuery(['countVeergeMenu'], fetchCount);

  useEffect(() => {
    openmanageApp === 'true' ? manageAppDisclosure.onOpen() : null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const count = {support: veergeMenuCount?.data?.data?.support};
  // const defaultUserObj = {initial_status: 'Pending'};
  // const [{initial_status}] = useLocalStorage('loggedinUser', defaultUserObj);

  // const isPending = initial_status !== 'Accepted' ? true : false;
  const showAppsTrayData = isPending
    ? appsData(
        storeName,
        manageAppDisclosure,
        count,
        insightDisclosure,
        levyDisclosure,
        onOpen
      ).reverse()
    : appsData(storeName, manageAppDisclosure, count, insightDisclosure, levyDisclosure, onOpen);
  return (
    <Box>
      <Menu placement="bottom" autoSelect={false}>
        {({isOpen, onClose}) => (
          <>
            <MenuButton position={'relative'} h={`max-content`}>
              {showAppsTrayData.find(el => el.count > 0) && (
                <Flex
                  position="absolute"
                  top="0px"
                  right="-9px"
                  align={'center'}
                  justify={'center'}
                  color="#fff"
                  minW="18px"
                  h="18px"
                  bg="#FE2822"
                  padding={'.1rem'}
                  borderRadius={'16px'}
                >
                  <Text fontSize="10px" color="#fff" fontWeight="600">
                    {showAppsTrayData.map(el => el.count || 0).reduce((a, b) => a + b)}
                  </Text>
                </Flex>
              )}
              <Box
                position={'absolute'}
                zIndex={20000}
                bottom={'calc(-100% + 0.8rem)'}
                mx="auto"
                right="0"
                left="0"
                width="0"
                height="0"
                borderLeft="16px solid transparent"
                borderRight="16px solid transparent"
                borderBottom="20px solid #FFFFFF"
                opacity={isOpen ? '1' : '0'}
                pointerEvents={'none'}
                transformOrigin="bottom"
                transitionDuration={isOpen ? '0.6s' : '0s'}
                animation={`${isOpen ? fadeIn : fadeOut} ${isOpen ? '0.6s' : '0s'}  ease`}
              />
              <VeergeFeatureMenuIcon color={isOpen ? 'gray' : '#FFFFFF'} mt="6px" />
            </MenuButton>

            <MenuList
              mt="8px"
              minH="620px"
              mr="20px"
              h="fit-content"
              // position={'absolute'}
              // right={'-14.5rem'}
              w={{base: '90%', md: 418}}
              borderRadius={'lg'}
              borderColor={'#e4e4e4'}
              boxShadow={'xl'}
              sx={{transition: 'opacity 0.001s  ease, transform 0.1s ease'}}
            >
              {/* <Box
                position={'absolute'}
                zIndex={-100}
                top={'-.8rem'}
                right={'9.1rem'}
                width="0"
                height="0"
                borderLeft="70px solid transparent"
                borderRight="70px solid transparent"
                borderBottom="80px solid #FFFFFF"
              /> */}
              <MenuItem bg={''} px="10px" py={'20px'} cursor={'unset'}>
                <Stack w="full">
                  <Text {...headerStyles} pl={4}>
                    Apps
                  </Text>

                  <SimpleGrid spacing={'27px 12px'} columns={4} w="full" mt="15px">
                    {showAppsTrayData.map((item, idx) =>
                      item?.func ? (
                        <Box
                          key={idx}
                          opacity={isPending ? 0.4 : 1}
                          onClick={isPending ? null : item?.func}
                        >
                          <VStack>
                            <Image
                              cursor={isPending ? 'not-allowed' : 'pointer'}
                              h={'71.211px'}
                              objectFit={'cover'}
                              src={item?.image.src}
                              alt={item?.text}
                            />
                            <Text
                              color="#606060"
                              textAlign="center"
                              fontFamily="Euclid Circular B"
                              fontSize="12px"
                              fontStyle="normal"
                              fontWeight="400"
                              lineHeight="normal"
                            >
                              {item?.text}
                            </Text>
                          </VStack>
                        </Box>
                      ) : item.text === 'Calendar' ? (
                        <VeergeCalendar isPending={isPending} item={item} />
                      ) : (
                        <Link
                          href={
                            isPending && item.text !== 'Support Center'
                              ? '#'
                              : `${item?.link || '#'}`
                          }
                          target={item.text == `Internal Test` ? '_blank' : ``}
                          rel={item.text == `Internal Test` ? 'noreferrer' : ``}
                          key={idx}
                        >
                          <VStack position="relative">
                            {item?.count > 0 ? (
                              <Flex
                                position="absolute"
                                top="0%"
                                right="10%"
                                align={'center'}
                                justify={'center'}
                                color="#fff"
                                minW="18px"
                                h="18px"
                                bg="#FE2828"
                                padding={'.1rem'}
                                borderRadius={'16px'}
                              >
                                <Text fontSize="10px" color="#fff" fontWeight="500">
                                  {item?.count}
                                </Text>
                              </Flex>
                            ) : null}
                            <Image
                              h={'71.211px'}
                              objectFit={'cover'}
                              src={item?.image.src}
                              alt={item?.text}
                              cursor={
                                isPending && item?.text !== 'Support Center'
                                  ? 'not-allowed'
                                  : 'pointer'
                              }
                              opacity={isPending && item?.text !== 'Support Center' ? 0.4 : 1}
                            />
                            <Text
                              color="#606060"
                              textAlign="center"
                              fontFamily="Euclid Circular B"
                              fontSize="12px"
                              fontStyle="normal"
                              fontWeight="400"
                              lineHeight="normal"
                              cursor={
                                isPending && item?.text !== 'Support Center'
                                  ? 'not-allowed'
                                  : 'pointer'
                              }
                            >
                              {item?.text}
                            </Text>
                          </VStack>
                        </Link>
                      )
                    )}
                  </SimpleGrid>
                </Stack>
              </MenuItem>
              {/* <MenuDivider /> */}
              <MenuItem
                display="flex"
                flexDir="column"
                alignItems="start"
                gap="16px"
                bg={''}
                px="25px"
                py={'10px'}
                cursor={'unset'}
              >
                <Text textAlign="start" {...headerStyles}>
                  More
                </Text>
                <Stack as={'ul'} w="full" spacing={'13px'}>
                  <Link
                    target="_blank"
                    rel="noreferrer"
                    href={'https://veerge-support.myxellia.io'}
                  >
                    <HStack gap="15px" {...typographyStyles}>
                      <QuestionMarkIcon />
                      <Text> Veerge Guide</Text>
                      <ExternalLinkIcon isAbsolute />
                    </HStack>
                  </Link>
                  <Link
                    target="_blank"
                    rel="noreferrer"
                    href={'https://veerge-support.myxellia.io/terms'}
                  >
                    <HStack gap="15px" {...typographyStyles}>
                      <PolicyIcon />
                      <Text>Terms of Service</Text>
                      <ExternalLinkIcon isAbsolute />
                    </HStack>
                  </Link>
                  <Link
                    target="_blank"
                    rel="noreferrer"
                    href={'https://veerge-support.myxellia.io/privacy'}
                  >
                    <HStack gap="15px" {...typographyStyles}>
                      <PolicyIcon />
                      <Text>Privacy Policy</Text>
                      <ExternalLinkIcon isAbsolute />
                    </HStack>
                  </Link>
                  <Link
                    target="_blank"
                    rel="noreferrer"
                    href={'https://veerge-support.myxellia.io/blog'}
                  >
                    <HStack gap="15px" {...typographyStyles}>
                      <BlogIcon />
                      <Text color="#191919">Blog</Text>
                    </HStack>
                  </Link>
                </Stack>
              </MenuItem>
            </MenuList>
          </>
        )}
      </Menu>
      <VeergeMenuDrawer modalDisclosure={manageAppDisclosure} />
      <ManageLevy drawerDisclosure={levyDisclosure} />
      <InsightDrawer modalDisclosure={insightDisclosure} />
      <BroadcastDrawer isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default VeergeFeatureMenu;

const appsData = (
  storeName,
  manageAppDisclosure,
  count,
  insightDisclosure,
  levyDisclosure,
  onOpen
) => [
  {
    image: appIcon,
    text: 'Application',
    ...(storeName !== 'undefined' && storeName
      ? {func: manageAppDisclosure.onOpen}
      : {link: '/veerge_menu/application'}),
  },
  {image: calendarIcon, text: 'Calendar'},
  {image: loopIcon, text: 'Loop', link: '/veerge_menu/loop'},
  // {image: levyIcon, text: 'Levy', func: levyDisclosure.onOpen},
  {image: ticketIcon, text: 'Ticket', link: '/veerge_menu/ticket'},
  // {
  //   image: driveIcon,
  //   text: 'Drive',
  // },
  {image: inspectionIcon, text: 'Inspection', link: '/veerge_menu/inspection'},
  {image: feedbackIcon, text: 'Feedback', link: '/veerge_menu/feedback'},

  {image: insightIcon, text: 'Insight', func: insightDisclosure.onOpen},
  {image: manageAgentsIcon, text: 'Realtors', link: '/residents/manage_agents'},
  // {
  //   image: notesIcon,
  //   text: 'Notes',
  //   // link: '/veerge_menu/notes',
  // },
  {image: internalTestIcon, text: 'Internal Test', link: 'https://test-veerge.myxellia.io'},
  {image: marketPlaceIcon, text: 'Secondary Market', link: '/veerge_menu/market_place'},
  {
    image: supportIcon,
    text: 'Support Center',
    link: '/veerge_menu/support_center',
    count: count.support,
  },
  {image: broadcastIcon, text: 'Broadcast', func: onOpen},
];
