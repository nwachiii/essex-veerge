import {EmptyState} from '@/components/common/Table';
import {
  Divider,
  DrawerBody,
  Flex,
  HStack,
  Image,
  SlideFade,
  Spinner,
  Stack,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import {menuOptions} from 'constants/veergeMenu/broadcastMenuOptions';
import {truncateLongText} from 'utils';
import {formatTimestamp} from 'utils/formatDate';
import {ViewBroadcastContent} from '../drawers/ViewBroadcastContent';
import {useState} from 'react';
import {useInfiniteQuery} from '@tanstack/react-query';
import {getBroadcastHistory} from 'apis/veerge_menu';
import {IoChevronUpSharp} from 'react-icons/io5';

export const TabComponentForBroadcast = ({channel}) => {
  const [shouldScroll, setScrollDirection] = useState('down');
  const [messageData, setMessageData] = useState(null);
  function getLeftIconForFilter(filterFieldValue) {
    const matchingOption = menuOptions.find(option => option.label === filterFieldValue);

    if (matchingOption) {
      return matchingOption.leftIcon;
    }
  }
  const dataChannel = channel === 'push notification' ? 'notification' : channel;
  const {
    data: infiniteData,
    isError,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['broadcastData', dataChannel],
    queryFn: ({pageParam = `${dataChannel}&page=1`}) => {
      return getBroadcastHistory(pageParam);
    },
    getNextPageParam: (lastPage, pages) => {
      const maxPageNumber = Math.ceil(lastPage?.data?.page_count / 10);
      const nextPageNumber = pages.length + 1;
      return nextPageNumber <= maxPageNumber ? `${dataChannel}&page=${nextPageNumber}` : undefined;
    },
  });
  const {isOpen, onOpen, onClose} = useDisclosure();
  const wrap = document?.getElementById('assetsWrap');
  const scrollToTop = () => {
    wrap.scrollTop = 0;
  };
  const arrayData = infiniteData?.pages?.flatMap(assetsData =>
    assetsData?.data?.data?.map(item => item)
  );
  const numberOfAssets =
    infiniteData?.pages?.flatMap(assetsData => assetsData?.data?.data?.map(() => 0))?.length ?? 0;
  const handleAnimation = () => {
    const currentScrollY = wrap?.scrollTop;

    if (currentScrollY > 540 && numberOfAssets > 10) {
      setScrollDirection('up');
    } else {
      setScrollDirection('down');
    }
  };

  const handleScroll = () => {
    const wrap = document?.getElementById('assetsWrap');

    handleAnimation();

    if (!isFetchingNextPage && wrap?.clientHeight + wrap?.scrollTop >= wrap?.scrollHeight) {
      return hasNextPage ? fetchNextPage() : null;
    }
  };

  const customScrollbarStyles = (trackColor = '#fff', thumbColor = '#cbcbcb') => ({
    '&::-webkit-scrollbar': {
      width: '4px',
      borderRadius: '16px',
    },
    '&::-webkit-scrollbar-track': {
      borderRadius: '16px',
      WebkitBoxShadow: `inset 0 0 6px ${trackColor}`,
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '16px',
      backgroundColor: thumbColor,
    },
  });

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : isError ? null : (
        <DrawerBody
          mr="8px"
          sx={customScrollbarStyles()}
          id="assetsWrap"
          scrollBehavior="smooth"
          onScroll={handleScroll}
          p="0px"
          mb="20px"
          maxH="90%"
          overflowY="auto"
        >
          {arrayData?.length > 0 ? (
            <VStack divider={<Divider borderColor="#F5F5F5" />}>
              {(arrayData || [])?.map(info => {
                return (
                  <Stack
                    cursor="pointer"
                    onClick={() => {
                      onOpen();
                      setMessageData(info);
                    }}
                    key={info}
                    align="start"
                    w="full"
                    px="27px"
                  >
                    <HStack align="center" justify="space-between" w="full">
                      <HStack align="center">
                        <Text>To:</Text>
                        <Flex gap="8px" flexWrap="wrap">
                          {Object.keys(info?.filter_fields).length ? (
                            Object.keys(info?.filter_fields)?.map(field => {
                              return (
                                <HStack rounded="full" key={field} p="8px" bg="#F8F8F8">
                                  <Image src={getLeftIconForFilter(field)?.src} alt={field} />
                                  <Text key={field} fontSize="14px">
                                    {field}
                                  </Text>
                                </HStack>
                              );
                            })
                          ) : (
                            <HStack rounded="full" p="8px" bg="#F8F8F8">
                              <Image src={getLeftIconForFilter('Everyone').src} alt={'Everyone'} />
                              <Text fontSize="14px">Everyone</Text>
                            </HStack>
                          )}
                        </Flex>
                      </HStack>
                      <Text textAlign="right" whiteSpace="nowrap" fontSize="14px" color="#606060">
                        {formatTimestamp(info?.created_at)}
                      </Text>
                    </HStack>
                    <Text fontSize="14px" color="#4B4B4B">
                      {info?.title}
                    </Text>
                    <Text align="start" fontSize="14px" color="#606060">
                      {truncateLongText(info?.content, 45).truncatedText}
                    </Text>
                  </Stack>
                );
              })}
              <SlideFade in={isFetchingNextPage}>
                <Text color="#191919" fontSize="10px" textAlign="center">
                  Just a sec ...
                </Text>
              </SlideFade>
              <ScrollToTop shouldScroll={shouldScroll} scrollToTop={scrollToTop} />
              <ViewBroadcastContent
                isOpen={isOpen}
                onClose={onClose}
                messageData={messageData}
                channel={channel}
              />
            </VStack>
          ) : (
            <EmptyState description="You have not sent any broadcast yet" />
          )}
        </DrawerBody>
      )}
    </>
  );
};

export const ScrollToTop = ({shouldScroll, scrollToTop}) => {
  return (
    <HStack
      justify="center"
      opacity={shouldScroll === 'up' ? 1 : 0}
      visibility={shouldScroll === 'up' ? 'visible' : 'hidden'}
      transition="ease-in-out 0.3s"
      transform={`translateY(${shouldScroll === 'up' ? '0px' : '20px'}) scale(${
        shouldScroll === 'up' ? 1 : 0.8
      })`}
      position="fixed"
      bottom="10"
      right={{base: '3%', md: '10'}}
      align="center"
      p="5px"
      role="button"
      onClick={scrollToTop}
      borderRadius="full"
      bg="rgba(255, 255, 255, 0.6)"
      boxShadow="0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)"
    >
      <IoChevronUpSharp />
    </HStack>
  );
};
