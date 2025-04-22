import {Box, Center, Flex, Heading, Image, Text} from '@chakra-ui/react';
import {useCallback, useEffect, useRef, useState} from 'react';

export const MobileAppPageSection = ({data, get_section}) => {
  const [transitionText, setTransitionText] = useState({
    transform: 'translate(-30px, 30px)',
    opacity: '1',
    transition: '.2s',
  });
  const [textStyle, setTextStyle] = useState({opacity: '1'});
  const [inView, setInView] = useState(false);

  //to get the posts on scroll
  const observer = useRef();
  const section_ref = useCallback(
    node => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        entries => {
          if (entries[0].isIntersecting) {
            setInView(true);
            console.log('In View');
            setTextStyle({opacity: '1'});
            get_section();
          } else {
            setInView(false);
            console.log('out of View');
            setTextStyle({opacity: '.4'});
          }
        },
        {
          rootMargin: '50%',
        }
      );
      if (node) observer.current.observe(node);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [inView]
  );

  return (
    <Center
      // gap={'157px'}
      // flex={'1'}
      // position={'sticky'}
      // top={'72px'}
      // height={'100vh'}
      py="200px"
      id={'page_section'}
    >
      <Box position="relative">
        <Flex
          direction={'column'}
          gap={'24px'}
          maxW={'570px'}
          style={textStyle}
          transition=".3s"
          opacity={'.5'}
          // visibility={'hidden'}
          ref={section_ref}
        >
          <Heading fontWeight={'600'} fontSize={'56px'} fontFamily={'Syne'}>
            {data.title}
          </Heading>
          <Text textAlign={'justify'} fontSize={'18px'} maxWidth={'517px'}>
            {data.text}
          </Text>
        </Flex>
      </Box>
    </Center>
  );
};

export default MobileAppPageSection;
