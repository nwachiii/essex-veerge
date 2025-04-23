import React from 'react';
import {Box, Flex, Container, Heading, Image, Text, HStack} from '@chakra-ui/react';
import {themeStyles} from '../../../../theme';

export const ListingInfoAmenities = ({data}) => {
  return (
    <Box mt="36px" maxW="full" px={{xl: '78px', base: '20px'}} mx="auto">
      <Heading mb="20px" fontSize="28px" fontWeight="500" color="#191919" lineHeight="31px">
        Amenities
      </Heading>
      <Container {...themeStyles.containerStyles} maxW="full" padding="32px 41px">
        <Flex gap="18px 30px" wrap="wrap">
          {data.map((amenity, index) => (
            <HStack key={index} bg="#FAFAFA" borderRadius="20px" p="14px">
              <Image alt="" src={amenity?.icon?.src} fontSize="24px" />
              <Text>{amenity.name}</Text>
            </HStack>
          ))}
        </Flex>
      </Container>
    </Box>
  );
};

export default ListingInfoAmenities;
