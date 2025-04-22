import {Stack, Heading, Box, HStack, Text, Divider, Image} from '@chakra-ui/react';
import mostSharedImg from '/src/images/image-fallback.png';
import watchlistIcon from '/src/images/icons/watchlist-icon.svg';

import React from 'react';

const ListingOverviewState = () => {
  return (
    <Stack
      bg="#ffffff"
      borderRadius="16px"
      w={{base: '100%', md: 475}}
      py="13px"
      px="22px"
      spacing="none"
      border="1px solid #e4e4e4"
    >
      <Heading fontSize={'18px'} fontWeight={600} mb="18px">
        Listing Overview
      </Heading>
      <HStack mb="15px" justify="space-between">
        <Stack>
          <Text fontSize={'10px'} fontWeight={400}>
            Most viewed
          </Text>
          <Divider w="206px" mt="4px" mb="10px" />
          <HStack>
            <Image
              alt=""
              border={`1px solid #12D8A0`}
              src={mostSharedImg.src}
              width="67px"
              height="68px"
              borderRadius="xl"
            />
            <Text fontSize={'16px'} fontWeight={600}>
              None
            </Text>
          </HStack>
        </Stack>
        <Stack>
          <Text fontSize={'10px'} fontWeight={400}>
            Most viewed
          </Text>
          <Divider w="206px" mt="4px" mb="10px" />
          <HStack>
            <Image
              alt=""
              border={`1px solid #4545FE`}
              src={mostSharedImg.src}
              width="67px"
              height="68px"
              borderRadius="xl"
            />
            <Text fontSize={'16px'} fontWeight={600}>
              None
            </Text>
          </HStack>
        </Stack>
      </HStack>
      <HStack px="17px" py="10px" align="end" borderRadius="12px" bg="#F5F5F5">
        <Stack>
          <Text fontSize={'10px'} fontWeight={400}>
            Most watchlisted
          </Text>

          <HStack w="206px">
            <Image
              alt=""
              border={`1px solid #FF9103`}
              src={mostSharedImg.src}
              width="67px"
              height="68px"
              borderRadius="xl"
            />
            <Text fontSize={'16px'} fontWeight={600}>
              None
            </Text>
          </HStack>
        </Stack>
        <Box
          position={'relative'}
          p="11px 15px"
          width="189px"
          height="68px"
          background="#FFFFFF"
          border="1px solid #E4E4E4"
          borderRadius="12px"
        >
          <Text fontWeight="400" fontSize="24px" lineHeight="30px" color="#191919">
            0
          </Text>
          <Text fontWeight="500" fontSize="10px" lineHeight="13px" color="#3D3D3D">
            Number of watchlists
          </Text>
          <Image
            right="3.5%"
            top="8%"
            position={'absolute'}
            boxSize={'24px'}
            src={watchlistIcon.src}
            alt=""
          />
        </Box>
      </HStack>
    </Stack>
  );
};

export default ListingOverviewState;
