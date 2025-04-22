import { Box, Stack, Text, useToast } from '@chakra-ui/react';
import React from 'react';
import { LayoutView } from '../../../components';
import Link from 'next/link';
import Head from 'next/head';
import LoopHeroSection from './landing_page/HeroSection';
import LoopTeamEfficiency from './landing_page/TeamEfficiency';
import WorkTogetherWithLoop from './landing_page/WorkTogether';
import FAQForLoop from './landing_page/FAQ';

export const VeergeLoop = () => {
  const toast = useToast();
  const handleLoopAccess = () => {
    return toast({
      render: () => (
        <MatadorCustomToast
          description={'You are currently ineligible for this service, please contact support'}
        />
      ),
      duration: 4000,
      isClosable: true,
      position: 'bottom-right',
    });
  };
  return (
    <Box w="100%" className="relative" bg="#FAFAFA" minH="100vh" pb={'70px'}>
      <LayoutView activePage={''} />
      <Head>
        <title>Veerge | Loop</title>
        <meta name="description" content="Veerge | Upcoming payments" />
        <meta name="theme-color" content="#191919" />
        <Link prefetch={false} rel="icon" href="/favicon.ico" />
      </Head>
      <Stack position={'relative'} w="100%" mt="-88vh" maxW="1440px" mx="auto">
        <LoopHeroSection handleLoopAccess={handleLoopAccess} />
        <LoopTeamEfficiency />
        <WorkTogetherWithLoop />
        <FAQForLoop />
      </Stack>
    </Box>
  );
};

export default VeergeLoop;

export const MatadorCustomToast = ({ title, description, background, ...rest }) => {
  const toastTextStyles = {
    textAlign: 'left',
    color: ' #FFFFFF',
    fontFamily: 'Syne',
    fontSize: '22px',
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
      {title ? <Text {...toastTextStyles}>{title}</Text> : null}
      <Text
        {...toastTextStyles}
        fontSize={title ? '16px' : '20px'}
        fontWeight={'normal'}
        fontFamily={'Euclid Circular B'}
      >
        {description}
      </Text>
    </Box>
  );
};
