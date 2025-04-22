import React, { useEffect, useRef, useState } from 'react';
import { Box, Flex, Image, Button, Text, useToast } from '@chakra-ui/react';
import heroImg from '../../../../images/loop/loop-people.png'
import Carousel from 'react-elastic-carousel';
import { MatadorCustomToast } from '..';

export const LoopHeroSection = () => {
  const [carouselAutoPlayState, setAutoPlayState] = useState(true);
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
  }

  useEffect(() => {
    setTimeout(() => {
      setAutoPlayState(false);
    }, 6000);
    setAutoPlayState(true);
  }, [carouselAutoPlayState]);

  const carouselTextStyles = {
    mt: 10,
    // textAlign: 'center',
    color: ' #fff',
    fontFamily: 'Syne',
    fontSize: '45px',
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 'normal',
  };


  const carouselText = [
    <Text key={1} {...carouselTextStyles}>
      Bring all your work to <span style={{ color: '#2ED3B7' }}>one place</span>
    </Text>,
    <Text key={2} {...carouselTextStyles}>
      <span style={{ color: '#2ED3B7' }}>Connect</span> your entire company
    </Text>,
    <Text key={3} {...carouselTextStyles}>
      Choose a <span style={{ color: '#2ED3B7' }}>better way to work</span>
    </Text>,
    <Text key={4} {...carouselTextStyles}>
      <span style={{ color: '#2ED3B7' }}>Explore new ways</span> to collaborate
    </Text>,
    <Text key={5} {...carouselTextStyles}>
      <span style={{ color: '#2ED3B7' }}>Unify your team</span> and work seamlessly on Loop
    </Text>,
  ];

  const totalPages = Math.ceil(carouselText.length / 1)
  let resetTimeout;
  const carouselRef = useRef(null);


  return (
    <Box background="#010D13">
      <Flex w='89%' h='90vh' align={'center'} mx='auto' justify={'space-between'}>
        <Box w='45%'>
          <Carousel
            ref={carouselRef}
            onNextEnd={({ index }) => {
              clearTimeout(resetTimeout)
              if (index + 1 === totalPages) {
                resetTimeout = setTimeout(() => {
                  carouselRef?.current?.goTo(0)
                }, 4000)
              }
            }}

            verticalMode
            showArrows={false}
            pagination={false}
            itemPadding={[13, 0]}
            enableAutoPlay={true}
            autoPlaySpeed={2800}
            breakPoints={[{ width: 1, itemsToShow: 1 }]}
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
          <Text color='#919191' fontSize={'20px'} fontWeight={300} mt='5px'>
            Enhance collaboration & streamline decision-making by consolidating all your work communications in one unified platform.
          </Text>
          <Flex gap='39px' mt='30px'>
            <Button onClick={handleLoopAccess} h='55px' w='50%' bg='white' border=' 1px solid #FFF'>
              <Text fontWeight={600} fontSize={'20px'} color={'#191919'}>SET-UP LOOP</Text>
            </Button>
            <Button h='55px' w='50%' bg='#191919' _hover={{ bg: '#191919' }} border=' 1px solid #FFF'>
              <a href='https://veerge-support.myxellia.io/' target='_blank' rel='noreferral'>
                <Text fontWeight={600} fontSize={'20px'} color={'white'}>CONTACT SUPPORT</Text>
              </a>
            </Button>
          </Flex>
        </Box>
        <Box w='55%'>
          <Image alt='hero' w='full' mr='-20px' h='auto' src={heroImg.src} />
        </Box>
      </Flex>
    </Box>
  );
};

export default LoopHeroSection;
