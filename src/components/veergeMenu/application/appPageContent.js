/* eslint-disable react/jsx-key */
import {
  Button,
  Grid,
  GridItem,
  HStack,
  Heading,
  Image,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import phoneIcon from '/src/images/icons/IphoneIconCreateApp.svg';
import ThemeCards from './components/ThemeCards';
import CreateAppModal from './components/modal';
import {useState} from 'react';
import themeConstant from '../../Drawers/veergeMenuDrawer/constant/themeConstant';
import {useRouter} from 'next/router';
import {fetchcreateStoreInfo} from '../../../apis/settings';
import {useQuery} from '@tanstack/react-query';
import {useEffect} from 'react';

let hasPoppedForWeb = false;

const availableThemes = [
  'modernMinimalism',
  'nordicHygge',
  'urbanChic',
  'Terracotta',
  'retroRevival',
  'brochure',
  'artDecoGem',
  'suburbanSerenity',
  'portfolioModernMin',
  'portfolioTerracotta',
  'mountainLodge',
  'bohemianHideaway',
  'newRetroRevival',
  'coastalRetreat',
  'scandinavianElegance',
  'rusticCharm',
  'industrialLoft',
  'vintageCharmMonochrome',
  'vintageCharm',
];

export const AppPageContent = () => {
  const createAppDisclosure = useDisclosure();
  const [screen, setScreen] = useState('selectOption');
  const [selectedTheme, setSelectedTheme] = useState({});

  const openAppcreationModal = defaultValue => {
    setScreen(defaultValue);
    return createAppDisclosure.onOpen();
  };

  const router = useRouter();
  const baseColor = router.query?.baseColor;

  const themes = themeConstant(baseColor).sort((a, b) => {
    const aComingSoon = a.tag?.some(tag => tag.name === 'Coming Soon') ? 1 : 0;
    const bComingSoon = b.tag?.some(tag => tag.name === 'Coming Soon') ? 1 : 0;
    return aComingSoon - bComingSoon;
  });

  const storeInfo = useQuery(['store-info'], fetchcreateStoreInfo);

  useEffect(() => {
    if (!router) return;
    if (router?.query?.web && !hasPoppedForWeb) {
      setScreen('selectColor');
      createAppDisclosure.onOpen();
      hasPoppedForWeb = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  useEffect(() => {
    const handleRouteChangeStart = nextPathName => {
      const nextPath = nextPathName.split('?')[0];

      if (nextPath !== router.pathname) hasPoppedForWeb = false;
    };

    router?.events?.on('routeChangeStart', handleRouteChangeStart);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  return (
    <>
      <HStack justify="space-between" w="full" align="center">
        <Stack spacing="16px">
          <Heading fontSize="32px" fontWeight="600">
            Web Application Templates
          </Heading>
          <Text fontSize="20px" fontWeight="300">
            Select a template that fits your style and publish it in minutes-no coding required!
          </Text>
        </Stack>

        <Button
          fontSize={{md: '12px', lg: '14px'}}
          bg="#fff"
          fontWeight="400"
          borderRadius="72px"
          onClick={() => openAppcreationModal('selectOption')}
          _hover={{
            opacity: 1,
          }}
          h="46px"
          w="177px"
          leftIcon={<Image alt="phoneIcon Create appp" src={phoneIcon.src} />}
        >
          Create Mobile App
        </Button>
      </HStack>

      <Grid w="full" templateColumns={{md: '1fr', lg: 'repeat(2, 1fr)'}} mt="36px" gap="24px">
        {themes.map((item, idx) => (
          <GridItem key={idx} w="full" mx="auto">
            <ThemeCards
              key={idx}
              index={idx}
              themeObj={item}
              setSelectedTheme={setSelectedTheme}
              availableThemes={availableThemes}
              openAppcreationModal={openAppcreationModal}
              storeName={storeInfo.data?.data?.store_name}
              storeThemeColor={storeInfo?.data?.data?.theme_color}
              storeThemeName={storeInfo?.data?.data?.theme_name}
              subTheme={storeInfo?.data?.data?.sub_theme}
              isOpen={createAppDisclosure.isOpen}
            />
          </GridItem>
        ))}
      </Grid>
      <CreateAppModal
        screen={screen}
        selectedTheme={selectedTheme}
        setSelectedTheme={setSelectedTheme}
        themes={themes}
        placeHolder={storeInfo.data?.data?.store_name ?? ''}
        storeInfo={storeInfo}
        setScreen={setScreen}
        modalDisclosure={createAppDisclosure}
      />
    </>
  );
};

export default AppPageContent;
