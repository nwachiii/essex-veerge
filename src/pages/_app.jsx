import {theme} from '../theme';
import Head from 'next/head';
import NProgress from 'nprogress';
import {DefaultSeo} from 'next-seo';
import {useRouter} from 'next/router';
import {Suspense, useEffect, useState} from 'react';
import {Center, ChakraProvider, Image, Progress, Show, Text, useDisclosure} from '@chakra-ui/react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

import SEO from '../next-seo.config';
import {getUserLocation} from '../utils';
import {PAGE_URLS} from '../constants/routes';
import {AnimatedLoader} from '/src/components/common/loaders/AnimatedLoader';
import ErrorBoundary from '../ui-lib/ui-lib.components/ReactErrorBoundary/ReactErrorBoundary';
import LayoutMobileView from '../components/PageLayout/Layout.MobileView';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import './globalStyles.css';
import 'aos/dist/aos.css';
import InsightDrawer from '@/components/Drawers/insightDrawer';
import insightIcon from '../images/icons/insight.svg';

NProgress.configure({showSpinner: false});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 0,
    },
  },
});

function MyApp({Component, pageProps}) {
  const insightDisclosure = useDisclosure();
  const router = useRouter();
  const [pageLoader, setPageLoader] = useState(false);

  const isPageTransitionable = PAGE_URLS.some(item => item == router?.pathname);

  router?.events?.on('routeChangeStart', url => {
    NProgress.start();
    setPageLoader(true);
  });
  router?.events?.on('routeChangeComplete', url => {
    NProgress.done();
    setPageLoader(false);
  });

  useEffect(() => {
    getUserLocation();
  }, []);

  const IS_USER_TOKEN_AVAILABLE =
    (typeof window !== 'undefined' && JSON?.parse(localStorage?.getItem('devToken'))) ?? null;

  // useEffect(() => {
  //   const pathsCanBeAccessedWithOutToken = ['/auth/role-signup', '/auth/onboarding'];

  //   const isAccessibleWithOutToken = pathsCanBeAccessedWithOutToken.includes(router.pathname);

  //   if (!IS_USER_TOKEN_AVAILABLE && !isAccessibleWithOutToken) {
  //     router.push('/account');
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [IS_USER_TOKEN_AVAILABLE]);

  return (
    <ChakraProvider theme={theme}>
      <Head>
        <title>Essex HOA</title>
        <meta
          name="description"
          content="Veerge is a robust C.R.M software built to handle all edge-cases needed to run an ultra-modern, outstanding Real Estate Business"
        />
        <link rel="shortcut icon" href="/favicon.ico" />

        <link href="https://fonts.cdnfonts.com/css/euclid-circular-b" rel="stylesheet" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
      </Head>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <SafeHydrate>
          {pageProps ? (
            <ErrorBoundary>
              {!isPageTransitionable
                ? pageLoader && (
                    <Progress
                      w="full"
                      size="xs"
                      left={'0'}
                      colorScheme="gray"
                      top="6.94rem"
                      position="fixed"
                      isIndeterminate
                      zIndex={'1300'}
                    />
                  )
                : null}
              <Suspense fallback={<AnimatedLoader />}>
                <DefaultSeo {...SEO} />
                <Show above="md">
                  <Component {...pageProps} />
                </Show>
                <Show breakpoint="(max-width: 767px)">
                  <LayoutMobileView />
                </Show>

                {/* <Center>
                  <Image src={insightIcon.src} alt="insight" />
                </Center> */}
              </Suspense>

              <Center
                position={'fixed'}
                bottom="42px"
                right="78px"
                zIndex={100}
                bg="#18230F"
                p="15px"
                borderRadius="full"
                gap={'8px'}
                cursor={'pointer'}
                onClick={() => {
                  insightDisclosure.onOpen();
                }}
              >
                <Image src={insightIcon.src} alt="insight" />
                <Text fontSize="20px" fontWeight="400" lineHeight="normal" color={'#fff'}>
                  AI Assistant
                </Text>
              </Center>
              <InsightDrawer modalDisclosure={insightDisclosure} />
            </ErrorBoundary>
          ) : (
            <AnimatedLoader />
          )}
        </SafeHydrate>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default MyApp;

queryClient.clear();

function SafeHydrate({children}) {
  return <div suppressHydrationWarning>{typeof window == 'undefined' ? null : children}</div>;
}
