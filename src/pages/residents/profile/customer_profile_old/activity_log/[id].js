import {
  Center,
  Text,
  Flex,
  Heading,
  Box,
  HStack,
  Select,
  VStack,
  Image,
  useToast,
} from '@chakra-ui/react';
import avatar from '/src/images/icons/avatar_.png';

import {themeStyles} from '/src/theme';
import backArrow from '/src/images/icons/back-arrow.png';
import shareIcon from '/src/images/icons/activity_shareIcon.png';
import projectIcon from '/src/images/icons/activity_projectIcon.png';
import offerIcon from '/src/images/icons/activity_offerIcon.png';
import feedbackIcon from '/src/images/icons/activity_feedbackIcon.png';
import paymentIcon from '/src/images/icons/activity_paymentIcon.png';
import watchlistIcon from '/src/images/icons/activity_watchlistIcon.png';
import inspectionIcon from '/src/images/icons/activity_inspectionIcon.png';
import co_ownerIcon from '/src/images/icons/activity_coownerIcon.png';
import signedinIcon from '/src/images/icons/activity_login.png';

// import ProfileCom from "./profileCom";
import {useState} from 'react';
import {motion} from 'framer-motion';
import {useRouter} from 'next/router';
import {useQuery} from '@tanstack/react-query';
import {fetchActiviy} from '/src/apis/activity_log';
import ProfileCom from '../../activity_log/ProfileCom';
import {LayoutView} from '/src/components/PageLayout/LayoutView';
import {Spinner} from '/src/components/common/loaders/AnimatedLoader';

export default function Activity_log() {
  const [filtered, setFiltered] = useState({topic: 'all', date: 'all'});

  const toast = useToast();

  const getDays = array => {
    let arr = array.map(item => {
      return item.day;
    });
    let set = new Set(arr);
    return [...set];
  };

  const router = useRouter();
  const {id} = router?.query;

  const handleOptions = e => {
    const {name, value} = e.target;
    setFiltered({...filtered, [name]: value});
  };
  console.log(filtered);
  const handleBack = () => {
    router.back(-1);
  };

  const {data, isLoading, isError} = useQuery(['activity', id], () => fetchActiviy(id));

  const activityIcons = {
    Share: shareIcon.src,
    Project: projectIcon.src,
    Offer: offerIcon.src,
    Feedback: feedbackIcon.src,
    Payment: paymentIcon.src,
    Watchlist: watchlistIcon.src,
    Inspection: inspectionIcon.src,
    'Co-ownership': co_ownerIcon.src,
    'Signed in': signedinIcon.src,
  };

  const groupByDay = (prop, fil) => {
    let groups = getDays(prop);
    const group = groups.map(item => {
      let obj = {};
      let filtered;

      const isOptionAvailable = prop => {
        const isDateAvailable = () => {
          const forMonth = (p, t) => {
            const m = new Date(p);
            m.setHours(0, 0, 0, 0);
            const now = new Date();

            const nowT = new Date(now.getFullYear(), now.getMonth() - t, now.getDate());
            return nowT <= m;
          };

          const forDay = (p, t) => {
            const nowT = new Date(p);
            const m = new Date();
            const d = new Date(m - t * 24 * 60 * 60 * 1000);
            nowT.setHours(0, 0, 0, 0);
            d.setHours(0, 0, 0, 0);
            if (t === 7) {
              return nowT >= d;
            } else {
              return nowT == d;
            }
          };

          let boo;
          switch (fil.date) {
            case 'Yesterday':
              boo = forDay(prop.time_ago, 1);
              break;
            case 'last Week':
              boo = forDay(prop.time_ago, 7);
              break;
            case 'Last 1 month':
              boo = forMonth(prop.time_ago, 1);
              break;
            case 'Last 2 month':
              boo = forMonth(prop.time_ago, 2);
              break;
            case 'Last 3 month':
              boo = forMonth(prop.time_ago, 3);
              break;
            default:
              boo = true;
              break;
          }

          return boo;
        };

        const isTopicAvailable = () => {
          if (fil.topic === 'all') {
            return true;
          } else {
            return prop.topic === fil.topic;
          }
        };
        return isDateAvailable() && isTopicAvailable();
      };

      if (fil.date === 'all' && fil.topic === 'all') {
        filtered = prop.filter(data => {
          return data.day === item;
        });

        obj.day = item;
        obj.info = filtered;
      } else {
        filtered = prop.filter(data => {
          return data.day === item && isOptionAvailable(data);
        });
        if (!filtered.length) {
          obj = null;
        } else {
          obj.day = item;
          obj.info = filtered;
        }
      }
      return obj;
    });
    return group;
  };

  const container = {
    hidden: {opacity: 0},
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  if (isError) {
    console.log(isError);
    toast({
      title: 'An error occured',
      status: 'error',
      duration: 8000,
      isClosable: true,
      position: 'top-right',
    });
  }

  return (
    <>
      <Box as={motion.div} variants={container} initial="hidden" animate="show">
        <div>
          <LayoutView activePage="listings" position="relative" />
          {isLoading ? (
            <Spinner />
          ) : isError ? (
            <Text as="span">An error while loading page</Text>
          ) : (
            <Box bg="#FAFAFA" pb="50px" mt="-80vh" mx="auto" w="100%" px="5%">
              <HStack w="100%" mt={4}>
                <HStack mt={8} onClick={handleBack} zIndex={10}>
                  <Image
                    style={{cursor: 'pointer'}}
                    mr={2}
                    boxSize="50px"
                    src={backArrow.src}
                    alt="back_arrow"
                  />
                  <Heading {...themeStyles.textStyles.h3}>Back</Heading>
                </HStack>
              </HStack>

              <VStack w="100%" mt="36px" minH="80vh">
                <HStack w="100%" mb="14px" justify="space-between">
                  <Heading as="h1">Activity log</Heading>
                  <HStack>
                    <Select name="topic" onChange={handleOptions} color="#4545FE">
                      <option value="all">Type</option>
                      <option value="inspection">inspection</option>
                      <option value="Co-ownership">Co-ownership</option>
                      <option value="Signed in">Signed in</option>
                      <option value="Payment">Payment</option>
                      <option value="Watchlist">Watchlist</option>
                      <option value="Feedback">Feedback</option>
                      <option value="Offer">Offer</option>
                      <option value="Project">Project</option>
                      <option value="Share">Share</option>
                    </Select>

                    <Select name="date" onChange={handleOptions} color="#4545FE">
                      <option value="all">Date</option>
                      <option value="Yesterday">Yesterday</option>
                      <option value="last Week">last Week</option>
                      <option value="Last 1 month">Last 1 month</option>
                      <option value="Last 2 month">Last 2 month</option>
                      <option value="Last 3 month">Last 3 month</option>
                    </Select>
                  </HStack>
                </HStack>
                <Flex w="100%" gap="25px">
                  <ProfileCom id={id} data={data.data.user_info} />
                  <VStack
                    px="24px"
                    py="24px"
                    spacing="36px"
                    bg="white"
                    borderRadius="16px"
                    w="full"
                    h="100%"
                  >
                    <VStack w="full">
                      {groupByDay(data.data.data, filtered).every(item => item === null) ? (
                        <Text as="span">no activity available.</Text>
                      ) : (
                        groupByDay(data.data.data, filtered).map((item, index) => {
                          if (item === null) {
                            return undefined;
                          }
                          return (
                            <>
                              <HStack
                                key={index}
                                spacing="38px"
                                w="100%"
                                justify="space-between"
                                align="center"
                              >
                                <Heading
                                  // wordWrap="normal"
                                  w="80px"
                                  fontSize="18px"
                                  fontWeight="500"
                                >
                                  {item.day}.
                                </Heading>
                                <hr
                                  style={{
                                    borderTop: '1px dashed black',
                                    width: '100%',
                                  }}
                                />
                              </HStack>
                              {item.info.map((info, index) => {
                                return (
                                  <HStack
                                    key={index}
                                    w="100%"
                                    spacing="31px"
                                    align="center"
                                    justify="flex-start"
                                    pl="19px"
                                  >
                                    <Text
                                      as="span"
                                      w="70px"
                                      textTransform="lowercase"
                                      fontSize="16px"
                                      fontWeight="400"
                                    >
                                      {info.time.replace(' ', '')}
                                    </Text>
                                    <HStack
                                      borderRadius="16px"
                                      bg="#FBFCFC"
                                      w="full"
                                      p="16px"
                                      spacing="19px"
                                    >
                                      <Flex
                                        justify="center"
                                        align="center"
                                        boxSize="36px"
                                        p="8px"
                                        borderRadius="full"
                                        bg="#4545FE1A"
                                      >
                                        <Image
                                          alt=""
                                          objectFit="contain"
                                          alignSelf="flex-start"
                                          src={activityIcons[info.topic]}
                                        />
                                      </Flex>
                                      <VStack w="full" align="flex-start" spacing="2px">
                                        <Text fontSize="16px" fontWeight="500" as="span">
                                          {info.topic}
                                        </Text>
                                        <Text fontSize="16px" fontWeight="400">
                                          {info.message}
                                        </Text>
                                      </VStack>
                                    </HStack>
                                  </HStack>
                                );
                              })}
                            </>
                          );
                        })
                      )}
                      {/* <HStack w="100%"  spacing= "31px" align="center"  justify="flex-start" pl="19px">
                <Text as="span" fontSize="16px" fontWeight="400" >
                  09:55am
                </Text>
                <HStack borderRadius="16px" bg="#FBFCFC" w="full"  p="16px" spacing="19px">
                  <Image alignSelf="flex-start" src={avatar.src} boxSize="36px"/>
                  <VStack w="full" align="flex-start" spacing="2px">
                  <Text  fontSize="16px" fontWeight="500" as="span">
                    Signed in
                  </Text>

                  </VStack>

                </HStack>
                

              </HStack>
              <HStack w="100%"  spacing= "31px" align="center"  justify="flex-start" pl="19px">
                <Text as="span" fontSize="16px" fontWeight="400" >
                  09:55am
                </Text>
                <HStack borderRadius="16px" bg="#FBFCFC" w="full"  p="16px" spacing="19px">
                  <Image alignSelf="flex-start" src={avatar.src} boxSize="36px"/>
                  <VStack w="full" align="flex-start" spacing="2px">
                  <Text  fontSize="16px" fontWeight="500" as="span">
                    Signed in
                  </Text>
                  <Text fontSize="16px" fontWeight="400">
                  Rejected a co-ownership invite sent by Ahmed Ali.
                  </Text>

                  </VStack>

                </HStack>
                

              </HStack> */}
                    </VStack>
                  </VStack>
                </Flex>
              </VStack>
            </Box>
          )}
          {/* </LayoutView> */}
        </div>
        {/* <EncryptionText /> */}
      </Box>
    </>
  );
}
