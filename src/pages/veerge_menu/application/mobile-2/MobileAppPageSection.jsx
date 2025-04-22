import {Box, Center, Flex, Heading, Image, Text} from '@chakra-ui/react';
import {useCallback, useEffect, useRef, useState} from 'react';

export const MobileAppPageSection = ({data}) => {
  const [transitionText, setTransitionText] = useState({
    // transform: 'translate(-30px, 30px)',
    opacity: '1',
    transition: '.2s',
  });
  const [textStyle, setTextStyle] = useState({opacity: '1', transition: '.2s'});
  const [transitionImage, setTransitionImage] = useState({
    // transform: 'translate(30px, -30px)',
    opacity: '1',
    transition: '.2s',
  });
  const [imageStyle, setImageStyle] = useState({opacity: '1', transition: '.2s'});
  const [info, setInfo] = useState(data);

  useEffect(() => {
    setTextStyle({opacity: '0', transition: '.2s'});
    setTransitionText({
      // transform: 'translate(0px, 0px)',
      opacity: '1',
      transition: '.2s',
    });
    setImageStyle({opacity: '0', transition: '.2s'});
    setTransitionImage({
      // transform: 'translate(0px, 0px)',
      opacity: '1',
      transition: '.2s',
    });
    setTimeout(() => {
      setInfo(data);
      setTimeout(() => {
        setTextStyle({opacity: '1', transition: 'none'});
        setImageStyle({opacity: '1', transition: 'none'});
        setTimeout(() => {
          setTransitionText({
            // transform: 'translate(-30px, 30px)',
            opacity: '0',
            transition: 'none',
          });

          setTransitionImage({
            // transform: 'translate(30px, -30px)',
            opacity: '0',
            transition: 'none',
          });
        }, 50);
      }, 50);
    }, 205);
  }, [data]);

  return (
    <Center
      gap={'157px'}
      // flex={'1'}
      position={'sticky'}
      top={'72px'}
      height={'100vh'}
      id={'page_section'}
    >
      <Center position="relative" w="570px" h="100%">
        <Center
          position={'absolute'}
          top={'0px'}
          left={'0px'}
          bottom={'0px'}
          flexDirection={'column'}
          alignItems={'flex-start'}
          gap={'24px'}
          maxW={'570px'}
          style={textStyle}
          h="100%"
        >
          <Heading fontWeight={'600'} fontSize={'56px'} fontFamily={'Syne'}>
            {info.title}
          </Heading>
          <Text textAlign={'justify'} fontSize={'18px'} maxWidth={'517px'}>
            {info.text}
          </Text>
        </Center>
        <Center
          flexDirection={'column'}
          alignItems={'flex-start'}
          gap={'24px'}
          maxW={'570px'}
          position={'absolute'}
          top={'0px'}
          left={'0px'}
          bottom={'0px'}
          h="100%"
          style={transitionText}
        >
          <Heading fontWeight={'600'} fontSize={'56px'} fontFamily={'Syne'}>
            {data.title}
          </Heading>
          <Text textAlign={'justify'} fontSize={'18px'} maxWidth={'517px'}>
            {data.text}
          </Text>
        </Center>
      </Center>
      <Box position="relative">
        <Image src={info.image_src} alt={info.title} style={imageStyle} width={'270px'} />
        <Image
          src={data.image_src}
          alt={data.title}
          style={transitionImage}
          position={'absolute'}
          top={'0px'}
          width={'270px'}
        />
      </Box>
    </Center>
  );
};

export default MobileAppPageSection;
