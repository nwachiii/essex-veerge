import React, { useEffect, useState } from 'react';
import { AbsoluteCenter, Box, Center, Flex, Image, Stack, Text, VStack, useToast } from '@chakra-ui/react';
import orbit from '../../../../images/loop/orbit.gif'

export const LoopImproves = () => {

  return (
    <Box background="#010D13" mt='170px' w='85%' mx='auto' position={'relative'}>
      <Image alt='orbit' h='321px' w='auto' position={'absolute'} right='-40px' top='-130px' src={orbit.src} />
      <Text fontSize={'48px'} fontWeight={700} color='#fff' lineHeight={'130%'} fontFamily={'Syne'} letterSpacing={'0.96px'} maxW={'974px'}>
        Loop improves team <Text color={'#2ED3B7'}>collaboration & communication</Text>
      </Text>
      <Text mt='12px' color='#FFF' fontSize={'20px'} fontWeight={300} maxW={'566px'}>
        Stay on the same page and make decisions faster by bringing all of your work communication into one place.
      </Text>
      <Flex mt='50px' direction={'row'} align={'stretch'} justify={'space-between'}>
        <VStack spacing={'60px'}>
          <Box maxW={'260px'}>
            <Text color={'#2ED3B7'} fontSize={'56.049px'} fontWeight={700} lineHeight={'147.4%'} letterSpacing={'1.121px'} fontFamily={'Syne'}>57%</Text>
            <Text mt='12px' color='#FFF' fontSize={'20px'} fontWeight={500}>of teams that use Loop are more productive</Text>
          </Box>
          <Box maxW={'260px'}>
            <Text color={'#2ED3B7'} fontSize={'56.049px'} fontWeight={700} lineHeight={'147.4%'} letterSpacing={'1.121px'} fontFamily={'Syne'}>75%</Text>
            <Text mt='12px' color='#FFF' fontSize={'20px'} fontWeight={500}>feel more connected to their teams</Text>
          </Box>
        </VStack>
        <VStack spacing={'60px'}>
          <Box maxW={'260px'}>
            <Text color={'#2ED3B7'} fontSize={'56.049px'} fontWeight={700} lineHeight={'147.4%'} letterSpacing={'1.121px'} fontFamily={'Syne'}>62%</Text>
            <Text mt='12px' color='#FFF' fontSize={'20px'} fontWeight={500}>say Loop has improved communication</Text>
          </Box>
          <Box maxW={'260px'}>
            <Text color={'#2ED3B7'} fontSize={'56.049px'} fontWeight={700} lineHeight={'147.4%'} letterSpacing={'1.121px'} fontFamily={'Syne'}>76%</Text>
            <Text mt='12px' color='#FFF' fontSize={'20px'} fontWeight={500}>feel their ability to work remotely has improved</Text>
          </Box>
        </VStack>
        <VStack justify={'center'}>
          <Box maxW={'260px'}>
            <Text color={'#2ED3B7'} fontSize={'56.049px'} fontWeight={700} lineHeight={'147.4%'} letterSpacing={'1.121px'} fontFamily={'Syne'}>52%</Text>
            <Text mt='12px' color='#FFF' fontSize={'20px'} fontWeight={500}>faster customer support case resolution</Text>
          </Box>
        </VStack>
      </Flex>
    </Box>
  );
};

export default LoopImproves;
