import {Container, Flex, Heading, Image, Text, VStack} from '@chakra-ui/react';
import React from 'react';
import {LayoutView} from '../../components';
import EncryptionText from '../../components/common/EncryptionText';
import {themeStyles} from '../../theme';
import insightOne from '/src/images/Insight-3.svg';
import insightTwo from '/src/images/Insight-1.svg';
import insightThree from '/src/images/Insight-2.svg';

export default function Insight() {
  return (
    <div>
      <LayoutView activePage="insight">
        <Heading fontWeight={'500'} fontSize="2vw" mt="10vh" alignSelf="flex-end">
          Insight Overview
        </Heading>
        <Container
          mt="20px"
          mb="32px"
          {...themeStyles.containerStyles}
          maxW="1284px"
          w="full"
          minHeight="297px"
          h="fit-content"
        >
          <VStack my="auto" w="full" h="full" spacing="6.95px">
            <Image alt="" w="208.37px" h="137.65px" src={insightOne.src} />
            <Text fontSize="18px" fontWeight={400} color="#606060">
              You currently do not have enough data
            </Text>
          </VStack>
        </Container>
        <Flex direction={{base: 'column', lg: 'row'}} gap="26px">
          <Image alt="" w="full" maxW="720px" h="325px" src={insightTwo.src} />
          <Image alt="" w="full" maxW="538px" h="325px" src={insightThree.src} />
        </Flex>
      </LayoutView>
      {/* <EncryptionText /> */}
    </div>
  );
}
