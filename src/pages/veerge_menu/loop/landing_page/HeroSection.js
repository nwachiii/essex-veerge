import React, {useEffect, useState} from 'react';
import {AbsoluteCenter, Box, Center, Image, Stack, Text, useToast} from '@chakra-ui/react';
import Carousel from 'react-elastic-carousel';
import {Button} from '../../../../ui-lib';
import heroAnim from '/src/components/assets/videos/hero-section-animation.gif';

export const LoopHeroSection = ({handleLoopAccess}) => {
  const [carouselAutoPlayState, setAutoPlayState] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setAutoPlayState(false);
    }, 6000);
    setAutoPlayState(true);
  }, [carouselAutoPlayState]);

  return (
    <Box background="#F0F6F9">
      <Center w="71%" mx="auto" justifyContent={'center'} alignItems={'center'}>
        <Stack w="full" mx="auto" pt="30px">
          <Box background="#F0F6F9">
            <Carousel
              verticalMode
              showArrows={false}
              pagination={false}
              itemPadding={[13, 0]}
              enableAutoPlay={true}
              autoPlaySpeed={1800}
              breakPoints={[{width: 1, itemsToShow: 1}]}
              easing="cubic-bezier(1,.15,.55,1.54)"
              tiltEasing="cubic-bezier(0.110, 1, 1.000, 0.210)"
              transitionMs={900}
              outerSpacing={100}
              enableTilt={true}
            >
              {carouselText.map((item, idx) => (
                <Box key={idx}>{item}</Box>
              ))}
            </Carousel>
          </Box>
          <Text
            mt={-10}
            pb="20px"
            color="#191919"
            textAlign="center"
            fontFamily="Euclid Circular B"
            fontSize="20px"
            fontStyle="normal"
            fontWeight="300"
            lineHeight="normal"
          >
            Enhance collaboration & streamline decision-making by consolidating all your work
            communications in one unified platform.
          </Text>
          <Button
            onClick={handleLoopAccess}
            mx="auto"
            variant={'dark'}
            color={'#FFFFFF'}
            width="272px"
            height="55px"
            padding="15px 70px"
            borderRadius="8px"
            background="#200E32"
          >
            SET-UP LOOP
          </Button>
        </Stack>
      </Center>
      <Stack
        w="full"
        h="778px"
        as="span"
        bgPosition="center"
        bgSize="cover"
        bgRepeat="no-repeat"
        bgImage={heroAnim.src}
        alt="hero_animation"
      />
    </Box>
  );
};

export default LoopHeroSection;

const carouselTextStyles = {
  my: 10,
  textAlign: 'center',
  color: ' #191919',
  fontFamily: 'Syne',
  fontSize: '48px',
  fontStyle: 'normal',
  fontWeight: '700',
  lineHeight: 'normal',
};

const carouselText = [
  <Text key={1} {...carouselTextStyles}>
    Bring all your work to <span style={{color: '#1D6169'}}>one place</span>
  </Text>,
  <Text key={2} {...carouselTextStyles}>
    <span style={{color: '#1D6169'}}>Connect</span> your entire company
  </Text>,
  <Text key={3} {...carouselTextStyles}>
    Choose a <span style={{color: '#1D6169'}}>better way to work</span>
  </Text>,
  <Text key={4} {...carouselTextStyles}>
    <span style={{color: '#1D6169'}}>Explore new ways</span> to collaborate
  </Text>,
  <Text key={5} {...carouselTextStyles}>
    <span style={{color: '#1D6169'}}>Unify your team</span> and work seamlessly on Loop
  </Text>,
];
