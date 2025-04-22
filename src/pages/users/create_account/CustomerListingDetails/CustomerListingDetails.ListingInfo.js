import React, {useState} from 'react';
import {
  Box,
  Divider,
  Image,
  Heading,
  HStack,
  Stack,
  Text,
  VStack,
  SimpleGrid,
  Flex,
} from '@chakra-ui/react';
import {formatAmount} from '../../../../utils';
import SelectDeeductionType, {SelectAllocation} from './SelectDeeductionType';
import {formatToCurrency} from 'utils/formatAmount';

export default function ListingInfo({isCustomerCreation, listing, units, index, ...rest}) {
  const Unit = units ? units[0] : null;
  const List = listing ? listing[0] : null;
  const [isUnits, setIsUnits] = useState(false);
  const [isListing, setIsListing] = useState(false);

  const toggleListing = () => {
    List ? setIsListing(!isListing) : setIsListing(false);
  };
  const toggleUnits = () => {
    Unit ? setIsUnits(!isUnits) : setIsUnits(false);
  };
  // console.log('Unit', Unit);
  return (
    <div>
      <Box
        p={4}
        minH={221}
        maxW={1203}
        h="fit-content"
        bg="transparent"
        borderRadius="32px"
        border="1px solid #3d3d3d7a"
        my="80px"
        {...rest}
      >
        <Stack
          direction={{base: 'column', md: 'row'}}
          w="full"
          justifyContent="space-between"
          align="center"
          mx="auto"
        >
          {List ? (
            <ListingInfoView
              listing={List && List}
              toggleListing={toggleListing}
              isCustomerCreation={isCustomerCreation}
            />
          ) : (
            <VStack flex="40%" spacing={4}>
              <Text fontWeight="bold" fontSize="18px" color="#3D3D3D">
                Pick a listing above
              </Text>
              <Text>Your selected listing would display here</Text>
            </VStack>
          )}
          <Divider h="191px" orientation="vertical" color="#E4E4E4" />
          {Unit && Unit?.quantity !== 0 ? (
            <UnitInfoView
              unitInfo={Unit && Unit}
              toggleUnits={toggleUnits}
              isCustomerCreation={isCustomerCreation}
            />
          ) : Unit && Unit?.quantity === 0 ? (
            <VStack flex="20%">
              <Text textAlign="center" fontSize="18px" color="#3D3D3D">
                <b>{Unit.unit_title}</b> is <br />
                <b>SOLD OUT!</b>
              </Text>
            </VStack>
          ) : (
            <VStack flex="50%" spacing={4}>
              <Text fontSize="18px" color="#3D3D3D">
                Pick a unit above from <b>{List?.name} </b>
              </Text>
              <Text>Your selected unit would display in this section</Text>
            </VStack>
          )}
        </Stack>
      </Box>
    </div>
  );
}

const ListingInfoView = ({listing, isCustomerCreation}) => {
  return (
    <HStack flex="40%" spacing={4} align="center">
      <Image alt="" src={listing?.photos[0]?.photo} borderRadius="14px" width={182} height={182} />
      <Stack spacing={1}>
        <Heading fontWeight="600" fontSize={'2em'}>
          {listing?.name}
        </Heading>
        <Text>{listing?.status}</Text>
      </Stack>
    </HStack>
  );
};

const UnitInfoView = ({unitInfo, isCustomerCreation}) => {
  return (
    <HStack flex="45%" spacing={6}>
      <Image
        alt=""
        src={unitInfo?.photos[unitInfo.photos.length - 1]?.photo}
        borderRadius="14px"
        width={186}
        height={186}
      />
      <Stack align="flex-start" spacing={8}>
        <Text fontWeight="600" fontSize="1.5rem">
          {unitInfo.unit_title}
        </Text>
        <HStack spacing="30px" w="100%">
          <Stack spacing="9px" align="center">
            <Text color="gray.500">Unit size</Text>
            <Text fontWeight="600">{unitInfo.unit_size}</Text>
          </Stack>
          <Stack spacing="9px" align="center">
            <Text color="gray.500">Unit price</Text>
            <Text fontWeight="600">{formatToCurrency(unitInfo.price)}</Text>
          </Stack>
          {isCustomerCreation ? null : (
            <Stack spacing="9px" align="center">
              <Text color="gray.500">Unit quantity</Text>
              <Text fontWeight="600">{unitInfo.quantity}</Text>
            </Stack>
          )}
        </HStack>
      </Stack>
    </HStack>
  );
};
