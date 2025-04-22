import {Box, Image, Link, Stack, Text} from '@chakra-ui/react';
import React from 'react';
import longAndLat from '/src/images/icons/long-and-lat.svg';

export const WhyYouNeedLongAndLat = () => {
  return (
    <Stack
      mt="15px"
      spacing="27px"
      color="#000"
      fontFamily="Euclid Circular B"
      fontSize="16px"
      fontStyle="normal"
      fontWeight="300"
    >
      <Image
        mx="auto"
        src={longAndLat.src}
        alt=""
        objectFit={'cover'}
        width="306px"
        height="127px"
      />
      <Box>
        <Text>
          {`Similar to how every physical house has its unique address, consisting of a number, street
          name, city, and more, every single point on the Earth's surface can be precisely
          identified using latitude and longitude coordinates.`}{' '}
        </Text>
      </Box>
      <Box>
        <Text>
          This makes it possible to specify virtually any location on Earth with accuracy. At
          Veerge, we leverage longitude and latitude coordinates to offer a range of location-based
          services for listings, including displaying maps, providing directions, and guiding users
          to specific destinations
        </Text>
      </Box>
      <Box>
        <Text
          color="#000"
          fontFamily="Euclid Circular B"
          fontSize="16px"
          fontStyle="normal"
          fontWeight="700"
          lineHeight="160%"
        >
          To find the longitude and latitude for a listing, follow these steps:
        </Text>
      </Box>
      <Box>
        <Text
          color="#000"
          fontFamily="Euclid Circular B"
          fontSize="16px"
          fontStyle="normal"
          fontWeight="700"
          lineHeight="160%"
        >
          Step 1:
        </Text>
        <Text>
          Visit the website{' '}
          <Link as='span' target="_blank" style={{color: '#4545FE'}} href="https://www.latlong.net/">
            latlong.net
          </Link>
        </Text>
      </Box>
      <Box>
        <Text
          color="#000"
          fontFamily="Euclid Circular B"
          fontSize="16px"
          fontStyle="normal"
          fontWeight="700"
          lineHeight="160%"
        >
          Step 2:
        </Text>
        <Text>
          {`Enter the address details in the 'Place name' field, (For enhanced accuracy, please
          provide Name, Address, City, State, and Zipcode)`}
        </Text>
      </Box>
      <Box>
        <Text
          color="#000"
          fontFamily="Euclid Circular B"
          fontSize="16px"
          fontStyle="normal"
          fontWeight="700"
          lineHeight="160%"
        >
          Step 3:
        </Text>
        <Text>
          Copy the obtained latitude and longitude values and paste them into the respective input
          fields for longitude and latitude when creating the listing.
        </Text>
      </Box>
      <Box>
        <Text>
          We hope this guide is helpful to you. If you require any further assistance, please feel
          free to contact our{' '}
          <a target="_blank" style={{color: '#4545FE'}} href="#">
            support
          </a>{' '}
          team.
        </Text>
      </Box>
    </Stack>
  );
};

export default WhyYouNeedLongAndLat;

/*


Step 1:
Step 2:
Step 3:

*/
