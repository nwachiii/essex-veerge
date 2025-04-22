import {Stack, Text} from '@chakra-ui/react';
import React from 'react';
import {useEffect} from 'react';
import {useState} from 'react';

const defaultDir = 'down';
export const Footer = () => {
  const [scrollDirection, setScrollDirection] = useState(defaultDir);
  const [prevScrollY, setPrevScrollY] = useState(0);
  let scrollingTimer;
  let threshold = 2000;
  function showContainer() {
    setScrollDirection('up');
  }

  function hideContainer() {
    setScrollDirection('down');
  }

  const handleScroll = () => {
    // const currentScrollY = window.scrollY;

    // if (currentScrollY === 0) {
    //   setScrollDirection('down');
    // } else if (currentScrollY > prevScrollY) {
    //   setScrollDirection('down');
    // } else {
    //   setScrollDirection('up');
    // }

    // setPrevScrollY(currentScrollY);

    showContainer();
    clearTimeout(scrollingTimer);
    scrollingTimer = setTimeout(hideContainer, threshold);
  };

  // useEffect(() => {
  //   window.addEventListener('scroll', handleScroll);

  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [prevScrollY, scrollDirection]);

  return (
    <Stack
      bg="linear-gradient(195deg, #061520 5.77%, rgba(6, 21, 32, 0.71) 117.72%)"
      left={0}
      w="full"
      backdropFilter="blur(2px)"
      zIndex="100"
      opacity={scrollDirection === 'down' ? 1 : 0}
      visibility={scrollDirection === 'down' ? 'visible' : 'hidden'}
      transition="ease-in-out 0.3s"
      borderTop="1.053px solid #0C2841"
      p="24px 78px"
      mt="20px"
      position="relative"
      // position="sticky"
      // bottom="0px"
      // position="fixed"
      // bottom="0"
      // transform={`translateY(${scrollDirection === 'up' ? '0px' : '20px'})`}
    >
      <Text fontSize="12px" fontWeight="400" color="rgba(194, 194, 194, 0.80)">
        The fee for purchasing a theme is a one-time payment. Every theme comes with a built-in
        portfolio and smart allocation system. Please note that not all themes include features such
        as self-service purchase, fractional ownership, or co-ownership. Certain themes are
        designated as exclusive, meaning only one development company per region may access them.
      </Text>
      <Text fontSize="12px" fontWeight="400" color="rgba(194, 194, 194, 0.80)">
        All themes are mobile-responsive by default. If {"you're"} interested in deploying a
        dedicated mobile app for both the Google Play Store and the Apple App Store, get in touch
        with our support team. {"We'll"} be happy to discuss your specific needs and set up a
        personalized demo.
      </Text>
    </Stack>
  );
};

export default Footer;
