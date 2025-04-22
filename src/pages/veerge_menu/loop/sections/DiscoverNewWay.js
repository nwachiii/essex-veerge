import React from 'react';
import { Box, Center, Flex, Image, Text, VStack } from '@chakra-ui/react';
import lock from '../../../../images/loop/lock.svg'
import more from '../../../../images/loop/more-circle.svg'

export const DiscoverNewWay = () => {

  return (
    <Box background="#010D13" py='30px'>
      <Text fontSize={'36px'} fontWeight={700} color='#fff' lineHeight={'130%'} fontFamily={'Syne'} letterSpacing={'0.96px'} textAlign={'center'}>
        Discover a <Text as='span' color={'#2ED3B7'}> new way</Text> of working
      </Text>
      <Text mt='12px' color='#FFF' fontSize={'24px'} fontWeight={300} textAlign={'center'}>
        Bring the right people and information together in channels.
      </Text>
      <Flex w='70%' mt='60px' align={'center'} mx='auto' justify={'space-between'}>
        <VStack align={'flex-start'} spacing={'22px'} w='379px'>
          <Center bg='#064B38' h='74.421px' w='74.421px' borderRadius={'24.807px'}>
            <Image alt='more' src={more.src} />
          </Center>
          <Text fontWeight={500} fontSize={'24.807px'} color='#fff'>
            Public Space
          </Text>
          <Text fontWeight={400} fontSize={'19.845px'} color='#fff'>
            These space are readily accessible for all members of your company to join, fostering transparency and enabling everyone to reap the advantages of shared knowledge and context from valuable conversations
          </Text>
        </VStack>
        <VStack align={'flex-start'} spacing={'22px'} w='379px'>
          <Center bg='#064B38' h='74.421px' w='74.421px' borderRadius={'24.807px'}>
            <Image alt='lock' src={lock.src} />
          </Center>
          <Text fontWeight={500} fontSize={'24.807px'} color='#fff'>
            Public Space
          </Text>
          <Text fontWeight={400} fontSize={'19.845px'} color='#fff'>
            These space are readily accessible for all members of your company to join, fostering transparency and enabling everyone to reap the advantages of shared knowledge and context from valuable conversations
          </Text>
        </VStack>
      </Flex>
    </Box>
  );
};

export default DiscoverNewWay;
