'use client';
import React from 'react';
import {useState} from 'react';
import {motion} from 'framer-motion';
import {Button} from 'ui-lib/ui-lib.components';
import {Text, Stack, HStack, Box, Container, Image} from '@chakra-ui/react';
import {RiCheckboxBlankCircleLine, RiCheckboxCircleFill} from 'react-icons/ri';

export const SelectPropertyType = ({setPropertyType}) => {
  const [selectedProperty, setSelectedProperty] = useState(null);

  return (
    <Container
      mt="5vh"
      p={0}
      maxW={'7xl'}
      color="gray.900"
      borderRadius="20px"
      background="#FFFFFF"
      border={'1px solid #E9E9E9'}
      fontFamily="Euclid Circular B"
      boxShadow="0px 4px 8px rgba(0, 0, 0, 0.02)"
    >
      <Box bg={'#F9FAFB'} w="full" borderBottom={'1px solid #E9E9E9'} borderRadius="18px 18px 0 0">
        <Stack px="8" py={4}>
          <Text
            color={'#191919'}
            fontSize="16px"
            fontWeight="600"
            lineHeight="20.29px"
            fontFamily="Euclid Circular B"
          >
            Create Listing
          </Text>
          <Text>Select the type of listing you would like to create </Text>
        </Stack>
      </Box>

      <Box px="8" py="8">
        <Stack spacing={'30px 10px'} direction="row" flexWrap="wrap" justify={'space-between'}>
          {propertyOptions.map(property => (
            <MotionBox
              key={property.id}
              onClick={() => setSelectedProperty(property.value)}
              isSelected={selectedProperty === property.value}
              title={property.option}
              iconUrl={property.iconUrl}
              description={property.description}
            />
          ))}
        </Stack>

        <HStack spacing="28px" mt={10} ml="auto" maxW="500px" align="center" justify="flex-end">
          <Button
            variant="dark"
            w="202px"
            h="55px"
            type="button"
            _hover={{
              background: '',
            }}
            bg={'#4545FE'}
            rounded="full"
            fontWeight={400}
            color={'#FFFFFF'}
            borderRadius="72px"
            borderColor={'#4545FE'}
            isDisabled={!selectedProperty}
            onClick={() => setPropertyType(selectedProperty)}
          >
            {'Proceed'}
          </Button>
        </HStack>
      </Box>
    </Container>
  );
};

const MotionBox = ({isSelected, iconUrl, title, description, onClick}) => {
  return (
    <Stack
      p={4}
      bg={isSelected ? '#F9FAFB' : '#FFFFFF'}
      as={motion.div}
      cursor="pointer"
      onClick={onClick}
      borderWidth="1px"
      minH={'164px'}
      spacing={'15px'}
      textAlign="left"
      h={'fit-content'}
      borderRadius="12px"
      justify={'center'}
      transition="all 0.3s"
      position={'relative'}
      _hover={{
        background: '#FBFBFB',
      }}
      whileTap={{scale: 0.97}}
      width={{base: '100%', sm: '384px'}}
      boxShadow={isSelected ? 'md' : 'sm'}
      borderColor={isSelected ? '#191919' : 'gray.200'}
    >
      <Box top="28px" right="18px" position="absolute" fontSize={'25px'}>
        {isSelected ? (
          <RiCheckboxCircleFill transition="background 0.3s ease-in-out" />
        ) : (
          <RiCheckboxBlankCircleLine transition="background 0.3s ease-in-out" color="#E5E5E5" />
        )}
      </Box>

      <HStack spacing={2}>
        <Image boxSize={'48px'} src={iconUrl} alt={title} />
        <Text fontSize="16px" fontWeight="500" lineHeight="20.29px" color="#191919">
          {title}
        </Text>
      </HStack>
      <Text fontSize="14px" fontWeight="300" lineHeight="17.75px" color="#606060">
        {description}
      </Text>
    </Stack>
  );
};

export default SelectPropertyType;

const propertyOptions = [
  {
    id: 1,
    iconUrl: '/icons/apartment-complex.svg',
    value: 'Apartment Complex',
    option: 'Apartment Complex',
    description:
      'A residential building with multiple self-contained units, shared amenities, and communal spaces.',
  },
  {
    id: 2,
    value: 'Parcel of Land',
    option: 'Parcel of Land',
    iconUrl: '/icons/parcel-of-land.svg',
    description: 'Large property divided into separate plots or acres.',
  },
  {
    id: 3,
    value: 'Land',
    option: 'Land',
    iconUrl: '/icons/land.svg',
    description: 'Full parcel - no multiple plots to manage.',
  },
  {
    id: 4,
    value: 'Detached',
    option: 'Detached',
    iconUrl: '/icons/detached.svg',
    description: 'A standalone house with no shared walls, offering privacy.',
  },
  {
    id: 5,
    value: 'Semi Detached',
    option: 'Semi-detached',
    iconUrl: '/icons/semi-detached.svg',
    description: 'A house sharing one side wall with another, balancing space and affordability.',
  },
  {
    id: 6,
    value: 'Terraces',
    option: 'Terraces',
    iconUrl: '/icons/terraces.svg',
    description: 'Rows of connected houses with similar designs, sharing side walls.',
  },
  {
    id: 7,
    value: 'Mixed Use',
    option: 'Mixed-Use',
    iconUrl: '/icons/mixed-use.svg',
    description: 'A property with spaces for living, shopping, and businesses in one location.',
  },
  {
    id: 8,
    value: 'Estate',
    option: 'Estate',
    iconUrl: '/icons/estate.svg',
    description:
      'A gated community with multiple homes and shared amenities like parks or security.',
  },

  {
    id: 9,
    value: 'Mall',
    option: 'Mall',
    iconUrl: '/icons/mall.svg',
    description: 'A large building with shops, restaurants, and entertainment all in one place.',
  },
];
