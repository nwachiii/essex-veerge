import {useState} from 'react';
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
  Stack,
  Input,
} from '@chakra-ui/react';
import {motion} from 'framer-motion';

import {useRouter} from 'next/router';
import {ProfileCom} from './ProfileCom';
import {useQuery} from '@tanstack/react-query';
import {FilterForActivityLog} from './options';
import {fetchActiviy} from '/src/apis/activity_log';
import {LayoutView} from '/src/components/PageLayout/LayoutView';
import {Spinner} from '/src/components/common/loaders/AnimatedLoader';

// Images
import backArrow from '/src/images/icons/back-arrow.png';
import signedinIcon from '/src/images/icons/activity_login.png';
import offerIcon from '/src/images/icons/activity_offerIcon.png';
import shareIcon from '/src/images/icons/activity_shareIcon.png';
import paymentIcon from '/src/images/icons/activity_paymentIcon.png';
import projectIcon from '/src/images/icons/activity_projectIcon.png';
import co_ownerIcon from '/src/images/icons/activity_coownerIcon.png';
import feedbackIcon from '/src/images/icons/activity_feedbackIcon.png';
import watchlistIcon from '/src/images/icons/activity_watchlistIcon.png';
import inspectionIcon from '/src/images/icons/activity_inspectionIcon.png';
import emptyIcon from '/src/images/icons/emptyIcon.png';

export const Activity_log = () => {
  const [filtered, setFiltered] = useState({topic: 'all', date: 'all'});
  const [count, setCount] = useState(1);

  const toast = useToast();

  const getDays = array => {
    let arr = array?.map(item => {
      return item?.day;
    });
    let set = new Set(arr);
    return [...set];
  };

  const router = useRouter();
  const {id} = router?.query;

  const handleOptions = (e, filType) => {
    // const { name, value } = e.target;
    // setFiltered({ ...filtered, [name]: value });

    const {name} = e.target;
    setFiltered({...filtered, [filType]: name});
  };

  console.log(filtered);
  const handleBack = () => {
    router.back(-1);
  };

  const {data, isLoading, isError, error} = useQuery(['activity', id], () => fetchActiviy(id));

  console.log(data);
  const activityIcons = {
    Share: shareIcon.src,
    Project: projectIcon.src,
    Offer: offerIcon.src,
    Feedback: feedbackIcon.src,
    Payment: paymentIcon.src,
    Watchlist: watchlistIcon.src,
    Inspection: inspectionIcon.src,
    'Co-ownership': co_ownerIcon.src,
    'Signed In': signedinIcon.src,
    'Sign up': signedinIcon.src,
  };

  const groupByDay = (prop, fil) => {
    let groups = getDays(prop);
    const group = groups?.map(item => {
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
        if (filtered.length < 1) {
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

  console.log(error);
  if (isError) {
    toast({
      title: error.message,
      status: 'error',
      duration: 8000,
      isClosable: true,
      position: 'top-right',
    });
  }

  const paginate = (data, itemsInPage) => {
    const numOfPage = Math.ceil(data.length / itemsInPage);
    const paginatedArray = Array.from({length: numOfPage}, (_, index) => {
      const start = index * numOfPage;
      return data.slice(start, start + itemsInPage);
    });
    return paginatedArray;
  };

  const handleArrow = (e, direct) => {
    let add = ~~count + 1 > paginate(data?.data?.data, 10).length ? null : setCount(~~count + 1);

    if (e) {
      return ~~e.target.value > paginate(data?.data?.data, 10).length
        ? setCount(paginate(data?.data?.data, 10).length)
        : e.target.value === ''
        ? setCount(e.target.value)
        : ~~e.target.value < 1
        ? setCount(1)
        : setCount(e.target.value);
    }

    if (direct === 'left') {
      let sub = count - 1 < 1 ? null : setCount(count - 1);
      return sub;
    }
    return add;
  };

  const arrayForType = [
    {value: 'all', content: 'Type'},
    {value: 'inspection', content: 'inspection'},
    {value: 'Watchlist', content: 'Watchlist'},
    {value: 'Feedback', content: 'Feedback'},
    {value: 'Offer', content: 'Offer'},
    {value: 'Project', content: 'Project'},
    {
      value: 'Share',
      content: 'Share',
    },
  ];

  const arrayForDate = [
    {value: 'all', content: 'Date'},
    {value: 'Yesterday', content: 'Yesterday'},
    {value: 'last Week', content: 'last Week'},
    {value: 'Last 1 month', content: 'Last 1 month'},
    {value: 'Last 2 month', content: 'Last 2 month'},
    {value: 'Last 3 month', content: 'Last 3 month'},
  ];

  return (
    <>
      <Box as={motion.div} variants={container} initial="hidden" animate="show">
        <div>
          <LayoutView activePage="users" position="relative" />
          {isLoading ? (
            <Spinner />
          ) : (
            <Box bg="#FAFAFA" mt="-88vh" mx="auto" w="100%" px="7%" pb="50px">
              {/* <HStack w="100%" mt={4}>
                <HStack mt={8} zIndex={10}>
                  <Image
                    style={{ cursor: "pointer" }}
                    mr={2}
                    onClick={handleBack}
                    boxSize="50px"
                    src={backArrow.src}
                    alt="back_arrow"
                  />
                  <Heading as="h1" fontSize="24px" fontWeight="600">
                    Activity log
                  </Heading>
                </HStack>
              </HStack> */}

              <VStack w="100%" mt="36px" minH="80vh">
                <HStack w="100%" mb="14px" justify="space-between">
                  <HStack zIndex={10}>
                    <Image
                      style={{cursor: 'pointer'}}
                      mr={2}
                      onClick={handleBack}
                      boxSize="50px"
                      src={backArrow.src}
                      alt="back_arrow"
                    />
                    <Heading as="h1" fontSize="24px" fontWeight="600">
                      Activity log
                    </Heading>
                  </HStack>

                  {isError ? null : (
                    <HStack>
                      {/* <Select
                        name="topic"
                        onChange={handleOptions}
                        borderRadius="16px"
                        color="#4545FE"
                        bg="#ffffff"
                      >
                        <option value="all">Type</option>
                        <option value="inspection">inspection</option>
                        <option value="Watchlist">Watchlist</option>
                        <option value="Feedback">Feedback</option>
                        <option value="Offer">Offer</option>
                        <option value="Project">Project</option>
                        <option value="Share">Share</option>
                      </Select> */}

                      <FilterForActivityLog
                        handleOptions={handleOptions}
                        optionArray={arrayForType}
                        filType="topic"
                        filtered={filtered.topic}
                      />

                      <FilterForActivityLog
                        handleOptions={handleOptions}
                        optionArray={arrayForDate}
                        filType="date"
                        filtered={filtered.date}
                      />

                      {/* <Select
                        name="date"
                        bg="#ffffff"
                        onChange={handleOptions}
                        borderRadius="16px"
                        color="#4545FE"
                      >
                        <option value="all">Date</option>
                        <option value="Yesterday">Yesterday</option>
                        <option value="last Week">last Week</option>
                        <option value="Last 1 month">Last 1 month</option>
                        <option value="Last 2 month">Last 2 month</option>
                        <option value="Last 3 month">Last 3 month</option>
                      </Select> */}
                    </HStack>
                  )}
                </HStack>

                {isError ? null : (
                  <Flex w="100%" gap="25px">
                    <ProfileCom data={data?.data?.user_info} />
                    <Stack w="full" spacing="22px">
                      <VStack
                        px="24px"
                        py="24px"
                        spacing="36px"
                        bg="white"
                        borderRadius="16px"
                        w="full"
                        h="fit-content"
                      >
                        <VStack w="full">
                          {groupByDay(paginate(data?.data?.data, 10)[~~count - 1], filtered).every(
                            item => item === null
                          ) ? (
                            <Stack
                              spacing="14px"
                              justify="center"
                              align="center"
                              w="full"
                              h="500px"
                            >
                              <Image alt="no data icon" src={emptyIcon.src} />
                              <Text as="span" color="#606060" fontSize="14px">
                                No data yet.
                              </Text>
                            </Stack>
                          ) : (
                            groupByDay(paginate(data?.data?.data, 10)[~~count - 1], filtered).map(
                              (item, index) => {
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
                                        wordWrap="normal"
                                        w="79px"
                                        fontSize="18px"
                                        fontWeight="500"
                                      >
                                        {item?.day}.
                                      </Heading>
                                      <hr
                                        style={{
                                          borderTop: '1px dashed black',
                                          width: '100%',
                                        }}
                                      />
                                    </HStack>
                                    {item?.info?.map((info, index) => {
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
                                            w="72px"
                                            textTransform="lowercase"
                                            fontSize="16px"
                                            fontWeight="400"
                                          >
                                            {info?.time?.replace(' ', '')}
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
                                                {info?.topic}
                                              </Text>
                                              <Text fontSize="16px" fontWeight="400">
                                                {info?.message}
                                              </Text>
                                            </VStack>
                                          </HStack>
                                        </HStack>
                                      );
                                    })}
                                  </>
                                );
                              }
                            )
                          )}
                        </VStack>
                      </VStack>
                      {paginate(data?.data?.data, 10).length > 1 && (
                        <HStack alignSelf="end">
                          <Text fontSize="16px" mr="29px" color="#606060" fontWeight="400">
                            Showing {count} of {paginate(data?.data?.data, 10).length}
                          </Text>
                          <HStack w="fit-content" onClick={() => handleArrow('', 'left')}>
                            <Image
                              zIndex={1000}
                              style={{cursor: 'pointer'}}
                              height="50px"
                              w="50px"
                              borderRadius="full"
                              filter={`brightness(${~~count === 1 ? '106%' : '100%'})`}
                              src={backArrow.src}
                              alt="left_arrow"
                            />
                          </HStack>
                          <Input
                            type="text"
                            value={count}
                            // disabled={count === paginate(data?.data?.data, 10).length}
                            w="44px"
                            onChange={e => handleArrow(e, '')}
                            onBlur={e => e.target.value === '' && setCount(1)}
                            borderRadius="16px"
                            px="10px"
                            h="50px"
                            textAlign="center"
                            fontSize="16px"
                            fontWeight="500"
                            color="#191919"
                          />
                          <HStack w="fit-content" onClick={() => handleArrow('', '')}>
                            <Image
                              borderRadius="full"
                              zIndex={1000}
                              style={{
                                cursor: 'pointer',
                                transform: 'rotate(180deg)',
                              }}
                              height="50px"
                              w="50px"
                              filter={`brightness(${
                                ~~count === paginate(data?.data?.data, 10).length ? '106%' : '100%'
                              })`}
                              src={backArrow.src}
                              bg="#E4E4E4"
                              alt="left_arrow"
                            />
                          </HStack>
                          <Text as="span" fontSize="16px" fontWeight="400">
                            {paginate(data?.data?.data, 10).length}
                          </Text>
                        </HStack>
                      )}
                    </Stack>
                  </Flex>
                )}
              </VStack>
            </Box>
          )}
        </div>
      </Box>
    </>
  );
};

export default Activity_log;
