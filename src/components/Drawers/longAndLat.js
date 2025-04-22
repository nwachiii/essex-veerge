import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Image,
  Link,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import check from '../../images/check-circle.svg';

const LongAndLat = ({ drawerModal }) => {
  return (
    <Drawer isOpen={drawerModal?.isOpen} placement="right" onClose={drawerModal?.onClose} >
      <DrawerOverlay />
      <DrawerContent marginTop='65px' py="22px" maxW="400px" overflowY={'scroll'}>
        <DrawerCloseButton />
        {/* <DrawerBody> */}
        <Flex px={'21px'} justify="center" direction="column" gap="10px">
          <Image
            alt=""
            h="36px"
            w="36px"
            borderRadius={'21px'}
            src={check.src}
            border="6px solid rgba(69, 69, 254, 0.10)"
            bg="rgba(69, 69, 254, 0.10)"
          />
          <Text color="#191919" fontWeight={500} fontSize="18px">
            Why do you need Longitude & Latitude
          </Text>
        </Flex>
        <VStack
          px={'21px'}
          mt="20px"
          pt="20px"
          align="stretch"
          spacing={'20px'}
          color="#3D3D3D"
          fontSize={'14px'}
          fontWeight={400}
          bg="#FBFCFC"
        >
          <Text>
            {`Similar to how every physical house has its unique address, consisting of a number, street name, city, and more, every single point on the Earth's surface can be precisely identified using latitude and longitude coordinates. This makes it possible to specify virtually any location on Earth with accuracy. At Veerge, we leverage longitude and latitude coordinates to offer a range of location-based services for listings, including displaying maps, providing directions, and guiding users to specific destinations`}
          </Text>
          <Text>
            To find the longitude and latitude for a listing, follow these steps:
          </Text>
          <Text>
            <b>Step 1:</b> <br />
            Visit the website <Link target="_blank" style={{color: '#4545FE'}} href="https://www.latlong.net/">
            latlong.net
          </Link>.
          </Text>
          <Text>
            <b>Step 2:</b><br />
            {`Enter the address details in the 'Place name' field, (For enhanced accuracy, please provide Name, Address, City, State, and Zip-code)`}
          </Text>
          <Text>
            <b> Step 3:</b><br />
            Copy the obtained latitude and longitude values and paste them into the respective input fields for longitude and latitude when creating the listing.
          </Text>
          <Text>
            We hope this guide is helpful to you. If you require any further assistance, please feel free to contact our support team.
          </Text>
        </VStack>
        {/* </DrawerBody> */}
      </DrawerContent>
    </Drawer >
  );
};

export default LongAndLat;
