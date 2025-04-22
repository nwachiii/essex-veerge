import {Box, Center, HStack, Image, Stack, Text} from '@chakra-ui/react';
import React, {useEffect} from 'react';
import channelsAnimation from '/src/images/veerge_loop/channels-animation.gif';
import publicChannelIcon from '/src/images/veerge_loop/public-channel.svg';
import privateChannelIcon from '/src/images/veerge_loop/private-channels.svg';
import emailAnimation from '/src/images/veerge_loop/email-animation.gif';
import {Button} from '../../../../ui-lib';
import AOS from 'aos';
import 'aos/dist/aos.css';
// import btnStyles from 'ui-lib/Button/

export const WorkTogetherWithLoop = ({handleLoopAccess}) => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <Box w="full" h="fit-content">
      <Stack
        w="84%"
        direction={'row'}
        justify={'center'}
        align={'center'}
        spacing={'30px'}
        mx="auto"
        h="650px"
      >
        <Box>
          <Text
            color="#919191"
            fontFamily="Euclid Circular B"
            fontSize="24px"
            fontStyle="normal"
            fontWeight="500"
            lineHeight="normal"
          >
            Channels
          </Text>
          <Text
            w="649px"
            color="#191919"
            fontFamily="Syne"
            fontSize="48px"
            fontStyle="normal"
            fontWeight="700"
            lineHeight="110%"
            letterSpacing="1.44px"
          >
            <span style={{color: '#1D6169'}}>Work together</span>, no matter how you work
          </Text>
          <Text
            py="23px"
            w="543px"
            color="#191919"
            fontFamily="Euclid Circular B"
            fontSize="20px"
            fontStyle="normal"
            fontWeight="300"
            lineHeight="32px"
          >
            Channels bring order and clarity to work — you can create them for every project, topic,
            or team. This helps focus on the conversations and work that matters most to you.
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
            Get Started
          </Button>
        </Box>
        <Stack
          w="800px"
          h="450px"
          as="span"
          bgPosition="center"
          bgSize="contain"
          bgRepeat="no-repeat"
          bgImage={channelsAnimation.src}
          alt="channels_section"
        />
      </Stack>

      {/* Discover a new way of working */}
      <Box w="full" mx="auto" bg="#F0F6F9" py="85.5px">
        <Center w="full" maxW="984px" mx="auto">
          <Stack w="100%" align="center">
            <Box w="705px" textAlign={'center'} color="#191919">
              <Text fontFamily="Syne" fontSize="36px" fontStyle="normal" fontWeight="700">
                {' '}
                Discover a <span style={{color: '#1D6169'}}>new way </span> of working
              </Text>
              <Text
                textAlign="center"
                fontFamily="Euclid Circular B"
                fontSize="24px"
                fontStyle="normal"
                fontWeight="300"
                lineHeight="normal"
              >
                Bring the right people and information together in channels.
              </Text>
            </Box>
            <HStack w="85%" justify={'center'} spacing={'225px'} mt="60px" mx="auto">
              <Box
                w="379px"
                data-aos="fade-left"
                data-aos-offset="100"
                data-aos-easing="ease-in-sine"
              >
                <Image w="74px" h="74px" src={publicChannelIcon.src} alt="publicChannelIcon" />
                <Text
                  py={2}
                  color="#191919"
                  textAlign="left"
                  fontFamily="Euclid Circular B"
                  fontSize="24.807px"
                  fontStyle="normal"
                  fontWeight="500"
                  lineHeight="normal"
                >
                  Public Channels
                </Text>
                <Text
                  color=" #191919"
                  fontFamily="Euclid Circular B"
                  fontFize="19.845px"
                  fontStyle="normal"
                  fontWeight="400"
                >
                  These channels are readily accessible for all members of your company to join,
                  fostering transparency and enabling everyone to reap the advantages of shared
                  knowledge and context from valuable conversations
                </Text>
              </Box>
              <Box
                w="379px"
                data-aos="fade-right"
                data-aos-offset="200"
                data-aos-easing="ease-in-sine"
              >
                <Image w="74px" h="74px" src={privateChannelIcon.src} alt="privateChannelIcon" />
                <Text
                  py={2}
                  color="#191919"
                  textAlign="left"
                  fontFamily="Euclid Circular B"
                  fontSize="24.807px"
                  fontStyle="normal"
                  fontWeight="500"
                  lineHeight="normal"
                >
                  Private Channels
                </Text>
                <Text
                  color=" #191919"
                  fontFamily="Euclid Circular B"
                  fontFize="19.845px"
                  fontStyle="normal"
                  fontWeight="400"
                >
                  {`For discussions of a sensitive or confidential nature, private channels can be
                  utilised. These channels limit access to invited participants, ensuring that only
                  authorized individuals can view the channel's content or locate it through search`}
                </Text>
              </Box>
            </HStack>
          </Stack>
        </Center>
      </Box>

      {/* Emails Vs Loop */}
      <Stack
        w="84%"
        direction={'row'}
        justify={'center'}
        align={'center'}
        spacing={'0px'}
        mx="auto"
        h="650px"
      >
        <Box>
          <Text
            color="#191919"
            fontFamily="Syne"
            fontSize="48px"
            fontStyle="normal"
            fontWeight="700"
            lineHeight="110%"
            letterSpacing="1.44px"
          >
            <span style={{color: '#1D6169'}}>Loop</span> Vs Email
          </Text>
          <Text
            py="23px"
            w="493px"
            color="#606060"
            fontFamily="Euclid Circular B"
            fontSize="16px"
            fontStyle="normal"
            fontWeight="400"
            lineHeight="32px"
          >
            {` The inbox had its prime, but contemporary work requires an evolution beyond the
            ordinary. It's not that email is ineffective, but rather, it has its limitations. Just
            as we have transitioned from landlines to smartphones for enhanced efficiency, Loop
            provides similar advantages in the workplace, we can accelerate our pace, achieve more,
            and connect effortlessly. Loop empowers seamless communication and collaboration, while
            the conventional inbox remains ensnared in a loop of refresh and reply.`}
          </Text>
        </Box>
        <Image w="fit-content" h="553px" src={emailAnimation.src} alt="email_section" />
      </Stack>
    </Box>
  );
};

export default WorkTogetherWithLoop;
