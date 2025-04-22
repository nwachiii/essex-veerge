import {
  AbsoluteCenter,
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import {useRouter} from 'next/router';
import Link from 'next/link';
import ChakraBox from './chakraBtn';
import {CreateToast} from '/src/ui-lib';

export const ThemeCards = ({
  themeObj,
  availableThemes,
  storeThemeName,
  index,
  storeName,
  setSelectedTheme,
  openAppcreationModal,
  subTheme,
  isOpen,
}) => {
  const toaster = CreateToast(true);
  const router = useRouter();
  const {baseColor: theme_color} = router.query;
  const themeName = themeObj?.subTheme ? themeObj?.subTheme : themeObj?.themeName;

  const canBeSelected = availableThemes.includes(themeName);

  const defaultName = subTheme ? subTheme : storeThemeName;
  const isCurrentTheme = defaultName === themeName && storeName;

  const handleCardClick = e => {
    if (canBeSelected) {
      setSelectedTheme(themeObj);
      const nextScreen = themeObj.singleColor
        ? 'additionalFeatures'
        : theme_color
          ? 'selectThemeColorMode'
          : 'selectColor';
      return openAppcreationModal(nextScreen);
    } else {
      return toaster(
        'Unfortunately, the web theme you are trying to access is currently unavailable',
        {w: 'fit-content', whiteSpace: 'nowrap', right: '1vw', position: 'relative'}
      );
    }
  };

  const handleColorArray = (e, idx) => {
    if (idx === 0) {
      openAppcreationModal('selectColorOnly');
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    e.preventDefault();
    e.stopPropagation();
  };

  const displayBg = (idx, bg) => () => {
    if (themeObj.price === 'Free') {
      return bg;
    }
    if (idx === 0 && themeObj.price !== 'Free') {
      return router.query?.baseColor || bg;
    }

    return bg;
  };

  const displayBorder = idx => () => {
    if (idx === 0 && themeObj.price !== 'Free') {
      return '1px solid #4545FE';
    }

    return 'none';
  };
  const insertQuery = () => {
    const mergedQuery = {
      ...router.query,
      themeName: themeObj.themeName,
      ...(themeObj.subTheme && {subTheme: themeObj.subTheme}),
      ...(themeObj.singleColor ? {baseColor: '#000000'} : {}),
    };

    return {
      pathname: router.pathname,
      query: mergedQuery,
    };
  };

  return (
    <>
      <Link href={canBeSelected ? insertQuery() : ''} scroll={false}>
        <ChakraBox
          initial={{
            y: '100px',
            opacity: 0,
          }}
          w="full"
          // maxW="630px"
          maxW="708px"
          mx="auto"
          minH="432px"
          bg="#031B2E"
          spacing="24px"
          padding="24px"
          borderRadius="8px"
          whileHover={{scale: 1}}
          whileTap={{scale: 0.995}}
          onClick={canBeSelected ? handleCardClick : null}
          border="1.053px solid #0C2841"
          animate={{
            y: '0px',
            opacity: 1,
          }}
          cursor={canBeSelected ? 'pointer' : 'not-allowed'}
          transition={{duration: 2, type: 'tween', ease: [0.16, 1, 0.3, 1], delay: index * 0.39}}
        >
          <ThemeImageWithOverLay
            canBeSelected={canBeSelected}
            isCurrentTheme={isCurrentTheme}
            img={themeObj.image}
          />

          <HStack w="full" justify="space-between" h="fit-content" alignItems="stretch">
            <Stack spacing="8px" justify="start" alignItems="start">
              <Text fontSize="24px" lineHeight="26px" fontWeight="400" color="#747474">
                Starting From
              </Text>

              <Text fontSize="24px" lineHeight="26px" fontWeight="600" color={'#FF9103'}>
                {themeObj.price}
              </Text>
            </Stack>

            <Stack alignItems="end" justify="space-between" minH="full">
              <Text fontSize="18px" lineHeight="23px" color="#E4E4E4" fontWeight="400">
                {themeObj.name}
              </Text>

              <HStack gap="10px" h="26px" align="center">
                {themeObj?.tag?.map((item, idx) => {
                  return (
                    <Flex
                      key={idx}
                      align="center"
                      bg={item.bg}
                      color={item.color}
                      py="8px"
                      px="14px"
                      gap="4px"
                      border="1px solid"
                      borderColor={item.borderColor}
                      borderRadius="24px"
                      h="32.5px"
                    >
                      <Image src={item.icon.src} alt={item.name} boxSize="11px" />
                      <Text fontSize="12px" lineHeight="20px" fontWeight="400">
                        {item.name}
                      </Text>
                    </Flex>
                  );
                })}
                {themeObj.themeColorArray.map((item, idx) => {
                  return (
                    <Box
                      key={idx}
                      border={displayBorder(idx)}
                      onClick={e => handleColorArray(e, idx)}
                      _hover={{
                        filter: 'brightness(40%)',
                      }}
                      cursor={'pointer'}
                      transition="ease-in-out 0.3s"
                      boxSize="25px"
                      bg={displayBg(idx, item)}
                      borderRadius="8px"
                    ></Box>
                  );
                })}
              </HStack>
            </Stack>
          </HStack>
        </ChakraBox>
      </Link>
    </>
  );
};

export default ThemeCards;

const ThemeImageWithOverLay = ({img, isCurrentTheme, canBeSelected}) => {
  return (
    <Box
      position="relative"
      w="full"
      cursor={canBeSelected ? 'pointer' : 'not-allowed'}
      _hover={{
        '#overlayForPreview': {
          opacity: '1',
        },
      }}
      mb="24px"
    >
      <VStack
        id="overlayForPreview"
        opacity="0"
        transition="opacity ease-in-out 0.3s"
        position="absolute"
        bg="linear-gradient(0deg, rgba(0, 0, 0, 0.70) 0%, rgba(0, 0, 0, 0.70) 100%)"
        top="0px"
        w="full"
        h="full"
      >
        <AbsoluteCenter>
          <Button
            fontSize="18px"
            bg="transparent"
            fontWeight="400"
            borderRadius="72px"
            border="1px solid #fff"
            color="#fff"
            cursor={canBeSelected ? 'pointer' : 'not-allowed'}
            _hover={{
              opacity: 1,
            }}
            _active={{
              bg: 'transparent',
            }}
            _focus={{
              bg: 'transparent',
            }}
            h="55px"
            p="16px 30px"
          >
            {isCurrentTheme
              ? 'Current Template'
              : !canBeSelected
                ? 'Coming Soon'
                : 'Select Template'}
          </Button>
        </AbsoluteCenter>
      </VStack>

      <Image
        src={img}
        loading="lazy"
        bg="rgba(243, 244, 246, 0.08)"
        alt="theme image"
        objectFit="cover"
        objectPosition="0px 0px"
        w="full"
        h="297px"
      />
    </Box>
  );
};
