import {Box, Flex, Grid, GridItem, Heading, Stack, Text} from '@chakra-ui/react';
import React from 'react';
import ListingsDetailsCard from './component/listingsDetailsCard';
import {useRouter} from 'next/router';
import Image from 'next/image';

const ListingOverViewHeader = ({listingData}) => {
  const router = useRouter();
  return (
    <Grid
      mb="32px"
      templateColumns={{base: 'repeat(2, 1fr)', xl: 'repeat(3, 1fr)'}}
      w="full"
      gap={{base: '16px', xl: '24px'}}
    >
      <GridItem colSpan={1}>
        {' '}
        <Stack
          overflow="hidden"
          w="full"
          h="176px"
          spacing="none"
          borderRadius="12px"
          border="0.5px solid #E4E4E7"
          bg="#ffffff"
          justify="center"
          align="center"
        >
          <Flex w="full" p="16px 24px 14px" justifyContent="space-between" alignItems="center">
            <Stack spacing="8px">
              <Heading fontSize="16px" fontWeight="500" color="#525252" lineHeight="25px">
                Total Communities
              </Heading>
              <Text fontSize="36px" fontWeight="600" color="#141414" lineHeight="44px">
                35
              </Text>
            </Stack>
          </Flex>
        </Stack>
      </GridItem>
      <GridItem colSpan={1}>
        {' '}
        <ListingsDetailsCard total={2420} heading="Total Unit" soldOut={1620} available={800} />
      </GridItem>
      <GridItem colSpan={{base: 2, xl: 1}} borderRadius="19.712px">
        <Stack cursor="pointer" pos="relative" h="176px" w="full" borderRadius="19.712px"
        
          onClick={() => router.push(`/communities/manage/?listingId=1`)}>
          <Box pos="relative" w="full" h="176px" overflow="hidden" borderRadius="19.712px">
            <Image
              src={listingData?.[1]?.photos?.photo}
              alt={listingData?.[1]?.name || "listing's" + 'image'}
              fill
              style={{objectFit: 'cover'}}
            />
            <Box
              pos="absolute"
              left="0"
              w="full"
              h="full"
              bg=" linear-gradient(183.45deg, rgba(0, 0, 0, 0.1) 47.65%, rgba(0, 0, 0, 0.8) 100.3%)"
            />
          </Box>

          <Stack zIndex={1} px="16px" color="#ffffff" pos="absolute" bottom="24.2px" spacing="none">
            <Text textTransform="uppercase" fontSize="14px" lineHeight="17.75px" fontWeight="500">
              most populated
            </Text>
            <Text textTransform="capitalize" fontSize="18px" lineHeight="22.82px" fontWeight="600">
              {listingData?.[1]?.name}
            </Text>
          </Stack>
        </Stack>
      </GridItem>
    </Grid>
  );
};

export default ListingOverViewHeader;
