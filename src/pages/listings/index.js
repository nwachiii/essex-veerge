import {useRouter} from 'next/router';
import {IoIosArrowUp} from 'react-icons/io';
import React, {useEffect, useState} from 'react';
import {fetchListings} from '../../apis/listings';
import {Box, HStack, Icon} from '@chakra-ui/react';
import {useInfiniteQuery} from '@tanstack/react-query';
import {useSmallerLaptopsBreakpoint} from 'ui-lib/ui-lib.hooks';
import {LayoutView} from '../../components/PageLayout/LayoutView';
import ListingOverViewHeader from './manage/ListingsTable/Header';
import ListOfListings from '@/components/listings/listOfListings';

export default function ManageListing() {
  const [limit, setLimit] = useState(10);
  const isSmallerLaptop = useSmallerLaptopsBreakpoint();

  const router = useRouter();
  const routeQueries = router.query;

  const convertToApiQuery = () => {
    const query = `${Object.entries(routeQueries)
      .flatMap(item =>
        item?.[0] === 'filter'
          ? `${item?.[1]}`
          : item?.[0] === 'page'
            ? []
            : item?.[0] === 'sort'
              ? `${item?.[1]}=true`
              : `${item?.[0]}=${item?.[1]}`
      )
      .join('&')}`;

    return query ? `&${query}` : '';
  };

  const param = convertToApiQuery();

  const [shouldScroll, setScrollDirection] = useState('down');

  const {
    data: infiniteData,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['listingss', param, limit],
    queryFn: ({pageParam = `?page=1${param}`}) => {
      return fetchListings(pageParam);
    },
    getNextPageParam: (lastPage, pages) => {
      const maxPageNumber = Math.ceil(lastPage?.data?.count / limit);
      const nextPageNumber = pages.length + 1;
      return nextPageNumber <= maxPageNumber ? `?page=${nextPageNumber}${param}` : undefined;
    },
  });

  const numberOfListings =
    infiniteData?.pages?.flatMap(projects => projects?.data?.project?.map(() => 0))?.length ?? 0;

  const projectData = infiniteData?.pages?.flatMap(projects =>
    projects?.data?.project?.map(item => item)
  );
  const handleAnimation = () => {
    const currentScrollY = document.documentElement.scrollTop;
    if (currentScrollY > 540 && numberOfListings > limit) {
      setScrollDirection('up');
    } else {
      setScrollDirection('down');
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      handleAnimation();
      if (
        !isFetchingNextPage &&
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 60
      ) {
        return hasNextPage ? fetchNextPage() : null;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);
  const scrollToTop = () => {
    document.documentElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  const forFilter = infiniteData && {
    max_price: infiniteData?.pages?.[0]?.data?.max_price,
    min_price: infiniteData?.pages?.[0]?.data?.min_price,
  };

  return (
    <Box bg="#FAFAFA" w="full" minH="100vh" h={isSmallerLaptop ? '100vh' : ''}>
      <LayoutView
        pb="0px"
        activePage={'listings'}
        tabPanelStyle={{pb: '0px'}}
        px={{base: '0px', xl: '30px'}}
      >
        <Box
          w="full"
          mx="auto"
          h="full"
          pb="20px"
          zIndex={1000}
          maxW={'full'}
          position={'relative'}
          px={{base: '0px', xl: '30px'}}
          mt="clamp(52px,calc(11.4vh + 40px),96px)"
        >
          <ListingOverViewHeader />
          <ListOfListings forFilter={forFilter} isLoading={isLoading} projects={projectData} />
        </Box>

        <ScrollToTop shouldScroll={shouldScroll} scrollToTop={scrollToTop} />
      </LayoutView>
    </Box>
  );
}

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
      zIndex={1000}
      onClick={scrollToTop}
      borderRadius="full"
      bg="rgba(255, 255, 255, 0.6)"
      boxShadow="0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)"
    >
      {/* <Image
        src={angledIcon.src}
        boxSize="20px"
        transform="rotate(90deg)"
        alt="right arrow"
      /> */}
      <Icon as={IoIosArrowUp} boxSize="20px" />
    </HStack>
  );
};
