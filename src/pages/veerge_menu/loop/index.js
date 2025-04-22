import {Box, Stack, Text, useToast} from '@chakra-ui/react';
import React from 'react';
import {LayoutView} from '../../../components';
import Link from 'next/link';
import Head from 'next/head';
import LoopHeroSection from './sections/HeroSection';
import LoopTeamEfficiency from './sections/TeamEfficiency';
import WorkTogetherWithLoop from './sections/WorkTogether';
import FAQForLoop from './sections/FAQ';
import LoopImproves from './sections/LoopImproves';
import DiscoverNewWay from './sections/DiscoverNewWay';
import LoopVEmail from './sections/LoopVEmail';

export const VeergeLoop = () => {
  const toast = useToast();
  const handleLoopAccess = () => {
    return toast({
      render: () => (
        <MatadorCustomToast
          description={'You are currently ineligible for this service, please contact support'}
        />
      ),
      duration: 5000,
      isClosable: true,
      position: 'top-left',
    });
  };

  return (
    <Box w="100%" className="relative" bg="#010D13" minH="100vh" pb={'70px'}>
      <LayoutView bg="#010D13" noSubNav activePage={''} />
      <Head>
        <title>Veerge | Loop</title>
        <meta name="description" content="Veerge | Upcoming payments" />
        <meta name="theme-color" content="#191919" />
        <Link prefetch={false} rel="icon" href="/favicon.ico" />
      </Head>
      <Stack position={'relative'} w="100%" mt="-100vh" maxW="1440px" mx="auto" bg="#010D13">
        <LoopHeroSection handleLoopAccess={handleLoopAccess} />
        <LoopTeamEfficiency />
        <LoopImproves />
        <WorkTogetherWithLoop />
        <DiscoverNewWay />
        <LoopVEmail />
        <FAQForLoop />
      </Stack>
    </Box>
  );
};

export default VeergeLoop;

export const MatadorCustomToast = ({title, titleStyle = {}, description, background, ...rest}) => {
  const toastTextStyles = {
    textAlign: 'left',
    color: ' #FFFFFF',
    fontFamily: 'Syne',
    // fontSize: '22px',
    fontSize: '20px',
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 'normal',
    py: 1,
  };
  return (
    <Box
      px={5}
      py={2}
      w="420px"
      color="white"
      h="fit-content"
      borderRadius="md"
      bg={background || '#191919'}
      {...rest}
    >
      {title ? (
        <Text {...toastTextStyles} style={titleStyle}>
          {title}
        </Text>
      ) : null}
      <Text
        {...toastTextStyles}
        // fontSize={title ? '16px' : '20px'}
        fontSize={'14px'}
        fontWeight={'normal'}
        fontFamily={'Euclid Circular B'}
      >
        {description}
      </Text>
    </Box>
  );
};
