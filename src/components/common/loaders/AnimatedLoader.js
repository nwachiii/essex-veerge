import {
  VStack,
  AbsoluteCenter,
  Spinner as DSpinner,
  Box,
  Text,
  Center,
  Flex,
  Image,
  Stack,
} from '@chakra-ui/react';
import React, {useRef} from 'react';
import {Oval, InfinitySpin, ThreeCircles, ProgressBar} from 'react-loader-spinner';
import {useAnimationFrame, motion} from 'framer-motion';

import infographicGif from '/src/images/animated_icons/infographic.gif';

export const AnimatedLoader = ({noAbsolute, size, ...rest}) => {
  return noAbsolute ? (
    <Oval
      height={size == 'sm' ? 25 : 80}
      width={80}
      color="#000000"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
      ariaLabel="oval-loading"
      secondaryColor="#191919"
      strokeWidth={2}
      strokeWidthSecondary={2}
    />
  ) : (
    <OvalLoader {...rest} />
  );
};

export const InfoGraphicLoader = ({...rest}) => {
  return (
    <AbsoluteCenter {...rest}>
      <Image h="70px" borderRadius={'100%'} src={infographicGif.src} alt="infographic_gif" />
    </AbsoluteCenter>
  );
};
export const OvalLoader = ({...rest}) => {
  return (
    <AbsoluteCenter as={Stack} spacing={4} align="center">
      <Oval
        height={80}
        width={80}
        color="#000000"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="#191919"
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
      {rest.showText ? (
        <Text fontWeight={400} color={'#191919'} fontSize={'14px'}>
          {rest.showText}
        </Text>
      ) : null}
    </AbsoluteCenter>
  );
};
export const InfinityLoader = ({...rest}) => {
  return (
    <AbsoluteCenter {...rest}>
      <InfinitySpin width="200" color="#191919" />
    </AbsoluteCenter>
  );
};
export const ProgressLoader = ({...rest}) => {
  return (
    <AbsoluteCenter {...rest}>
      <ProgressBar
        height="80"
        width="80"
        ariaLabel="progress-bar-loading"
        wrapperStyle={{}}
        wrapperClass="progress-bar-wrapper"
        borderColor="#191919"
        barColor="#333"
      />
    </AbsoluteCenter>
  );
};
export const ThreeCirclesLoader = ({...rest}) => {
  return (
    <AbsoluteCenter {...rest}>
      <ThreeCircles
        height="100"
        width="60"
        color="#222222"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="three-circles-rotating"
        outerCircleColor=""
        innerCircleColor=""
        middleCircleColor=""
      />
    </AbsoluteCenter>
  );
};

export const Spinner = () => (
  <AbsoluteCenter>
    <DSpinner thickness="10px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="600px" />
  </AbsoluteCenter>
);

export const VeergeLoader = () => {
  const ref = useRef(null);

  useAnimationFrame((time, delta) => {
    const rotate = Math.sin(time / 900) * 200;
    const y = (1 + Math.sin(time / 200)) * 30;
    const z = (1 + Math.sin(time / 200)) * -30;
    const g = (1 + Math.sin(time / 800)) * -80;
    ref.current.style.transform = `translateY(${z}px) rotateX(${rotate}deg) translateX(${y}px) rotateX(${rotate}deg) translateX(${g}px) `;
  });
  const loaderVariants = {
    hidden: {opacity: 1},
    visible: {
      opacity: 1,
      transition: {
        delay: 0.5,
        staggerChildren: 0.08,
      },
    },
  };

  const loaderText = {
    hidden: {opacity: 0, y: 50},
    visible: {opacity: 1, y: 0},
  };
  const lineOne = 'Veerge';
  const lineTwo = 'powered by Myxellia';

  return (
    <AbsoluteCenter>
      <Flex ref={ref}>
        <motion.h3 variants={loaderVariants} initial="hidden" animate="visible">
          <Flex>
            {lineOne.split('').map((char, index) => (
              <Text
                key={char + '-' + index}
                lineHeight={'49px'}
                fontFamily={'Syne'}
                fontSize={'57px'}
                fontWeight={'700'}
                textAlign={'left'}
                color="inherit"
              >
                <motion.span variants={loaderText}>{char}</motion.span>
              </Text>
            ))}
          </Flex>
        </motion.h3>
      </Flex>
      {/* <motion.h3 variants={loaderVariants} initial='hidden' animate='visible'>
					<Flex>
						{lineTwo.split('').map((char, index) => (
							<Text key={char + '-' + index} pl={3} mt={-2} fontStyle={'italic'} color='#191919' fontSize='12px' fontWeight='400'>
								<motion.span variants={loaderText}>{char}</motion.span>
							</Text>
						))}
					</Flex>
				</motion.h3> */}
    </AbsoluteCenter>
  );
};
