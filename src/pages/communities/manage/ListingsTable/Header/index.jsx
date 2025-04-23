import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import ListingsDetailsCard from './component/listingsDetailsCard';
import {IoEyeOutline} from 'react-icons/io5';
import Image from 'next/image';

const ListingOverViewHeader = ({listingData}) => {
  console.log(listingData?.[0]?.photos?.photo?.[0])

  return (
    <Grid
      mb="32px"
      templateColumns={{base: 'repeat(2, 1fr)', xl: 'repeat(3, 1fr)'}}
      w="full"
      gap="11px"
    >
      <GridItem colSpan={1}>
        {' '}
        <Stack
          overflow="hidden"
          w="full"
          h="176px"
          spacing="none"
          borderRadius="12px"
          border="0.5px solid #e4e4e4"
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
                {2000}
              </Text>
            </Stack>
          </Flex>
        </Stack>
      </GridItem>
      <GridItem colSpan={1}>
        {' '}
        <ListingsDetailsCard total={1200} heading="Total Unit" soldOut={820} available={400} />
      </GridItem>
      <GridItem colSpan={{base: 2, xl: 1}} borderRadius='19.712px'>
      <Stack w="full" gap="13.32px" rounded='19.712px'>
      <Stack
        justify="end"
        w="full"
        pos="relative"
        h='176px'
        className="image-container"
        overflow='hidden'
      >
        <Image
          src={listingData?.[0]?.photos?.[0]?.photo}
          w="full"
          fill
          loading="lazy"
          style={{
            objectFit: "cover",
            borderRadius: "19.712px",
          }}
          className="zoom-image"
        />
        <Box
          pos="absolute"
          bg="linear-gradient(0deg, rgba(0, 0, 0, 0.30) 0%, rgba(0, 0, 0, 0.30) 100%)"
          h="full"
          w="full"
          borderRadius="19.712px"
        />
        <Stack
          pos="relative"
          zIndex={5}
          pb="24px"
          color="#FFF"
        >
          <Text
            fontSize="30.46px"
            fontWeight={600}
            textTransform={`capitalize`}
            lineHeight="36.664px"
          >
            {`Unit`}
          </Text>
   
        </Stack>
      </Stack>
    </Stack>
      </GridItem>
    </Grid>
  );
};

export default ListingOverViewHeader;
