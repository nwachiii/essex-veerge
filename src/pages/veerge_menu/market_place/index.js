import React from 'react';
import {LayoutView} from '../../../components';
import {Box, HStack, Image, Stack, Text, VStack, useToast} from '@chakra-ui/react';

import {MatadorCustomToast} from '../loop';
import FilterList from '../../../components/veergeMenu/marketplace/filters';
import empty_icon from '/src/images/icons/emptyIcon.png';
import {SecondaryMarketInfoDrawer} from '@/components/veergeMenu/marketplace/SecondaryMarketInfoDrawer';

const VeergeMenuMarketPlace = () => {
  const toast = useToast();
  const handleCreateTicket = () => {
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
  };

  return (
    <Stack minH="100vh" bg="#fafafa" pb="60px">
      <LayoutView>
        <VStack
          color="#191919"
          fontFamily="Euclid Circular B"
          // w="1283px"
          // mx="auto"
          spacing={'32px'}
          width={'100%'}
          maxW={'1283px'}
          margin={'0px auto'}
          pt={'100px'}
        >
          <HStack w="full" justify="space-between">
            <Text pl={4} fontSize="32px" fontStyle="normal" fontWeight="700" lineHeight="normal">
              Secondary Market
            </Text>
            <SecondaryMarketInfoDrawer />
          </HStack>
          <FilterList />
          <Box
            border={'1px solid #e4e4e4'}
            borderRadius={'12px'}
            bg={'#ffffff'}
            color="#3D3D3D"
            width={'100%'}
          >
            <VStack
              w="full"
              textAlign="center"
              justify="center"
              align="center"
              h="508px"
              display={'flex'}
              gap={'20px'}
            >
              <Image src={empty_icon.src} alt="empty icon" />
              <VStack gap="0px">
                <Text fontSize={'25px'} fontWeight={'700'}>
                  Nothing Found
                </Text>
                <Text fontSize="20px">There is no secondary sale at this moment</Text>
              </VStack>
            </VStack>
          </Box>
        </VStack>
      </LayoutView>
    </Stack>
  );
};

export default VeergeMenuMarketPlace;
