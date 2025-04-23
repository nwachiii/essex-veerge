import React, {useEffect, useRef, useState} from 'react';
import {useMutation} from '@tanstack/react-query';
import {
  Checkbox,
  Container,
  extendTheme,
  Flex,
  Box,
  HStack,
  Image,
  SlideFade,
  Spinner,
  Text,
  Stack,
  useDisclosure,
  useToast,
  Heading,
} from '@chakra-ui/react';

import {Button} from '../../../../ui-lib';
import {themeStyles} from '../../../../theme';
import {AMENITIES_STORE} from '/src/constants/listings/amenities.js';
import {addAmenitiesToProject} from '../../../../apis/listings';
import {useRouter} from 'next/router';
import EditSuccessModal from '../EditSuccessModal';
import ViewOtherAmenitiesIcon, {
  ShowLessAmenitiesIcon,
} from '@/components/assets/ViewOtherAmenitiesIcon';
import {OTHER_AMENITIES_STORE} from 'constants/listings/amenities';
import {AmenitiesComponent, SearchMenu} from 'pages/communities/create/Amenities';

export default function Amenities({defaultData, handleProgress}) {
  const toast = useToast();
  const [isOtherAmenities, setisOtherAmenities] = useState(false);
  const [selectedItems, setSelectedItems] = useState(defaultData?.amenities || []);
  const router = useRouter();
  const projectId = Number(router.query.listingId);
  const [popularAmenities, setPopularAmenities] = useState([...AMENITIES_STORE]);
  const [otherAmenities, setOtherAmenities] = useState([...OTHER_AMENITIES_STORE]);
  const [filteredAmenities, setFilteredAmenities] = useState([]);
  const inputRef = useRef(null);
  const [searchName, setSearchName] = useState('');
  const searchListDisclosure = useDisclosure();
  const SHOW_PROJECT_EDIT_SUCCESFUL = useDisclosure();

  const TOTALAMENITIES = [...AMENITIES_STORE, ...OTHER_AMENITIES_STORE];

  const mutation = useMutation(formData => addAmenitiesToProject(projectId, formData), {
    onSuccess: res => {
      console.log(res);
      toast({
        title: `Successfully updated`,
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
      setTimeout(() => {
        router.push(`/listings/manage/?listingId=${projectId}`);
      }, 1000);
    },
    onError: err => {
      console.log(err);
      toast({
        title: `Adding amenities was unsuccessful...`,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    },
  });

  const handleSubmitAmenities = () => {
    localStorage.removeItem('listingInfo');
    mutation.mutate({amenities: selectedItems});
  };

  const handleClear = () => {
    setSelectedItems([]);
  };

  const toggleItemSelection = item => {
    const itemIndex = selectedItems.findIndex(selectedItem => selectedItem.name === item.name);

    if (itemIndex === -1) {
      // If item is not in the selectedItems array, add it
      setSelectedItems([...selectedItems, item]);
    } else {
      // If item is already selected, remove it
      const updatedItems = [...selectedItems];
      updatedItems.splice(itemIndex, 1);
      setSelectedItems(updatedItems);
    }
  };

  const handleSearch = event => {
    const {value} = event.target;

    if (value.trim() && !searchListDisclosure.isOpen) {
      searchListDisclosure.onOpen();
      setTimeout(() => {
        inputRef.current.focus();
      }, 0);
    }
    const filteredAmenities = TOTALAMENITIES.filter(amenities =>
      amenities.name.toLowerCase().includes(value.toLowerCase())
    );

    setSearchName(value);
    setFilteredAmenities(filteredAmenities);
  };

  const handleSearchedAmenitiesSelection = amenity => () => {
    const itemIndex = selectedItems.findIndex(selectedItem => selectedItem.name === amenity.name);
    const isFromOtherAmenities = OTHER_AMENITIES_STORE.find(item => item.name === amenity.name);
    const isFromPopularAmenities = AMENITIES_STORE.find(item => item.name === amenity.name);

    const removeFromList = prev => prev.filter(item => item.name !== amenity.name);
    const addToList = prev => [...prev, amenity];

    if (itemIndex === -1) {
      setSelectedItems([...selectedItems, amenity]);
      setOtherAmenities(removeFromList);
      if (!isFromPopularAmenities) {
        setPopularAmenities(addToList);
      }
    } else {
      const updatedItems = [...selectedItems];
      updatedItems.splice(itemIndex, 1);
      setSelectedItems(updatedItems);
      if (isFromOtherAmenities) {
        setOtherAmenities(addToList);
        setPopularAmenities(removeFromList);
      }
    }
  };

  const getItemStyle = item => {
    return selectedItems.find(selectedItem => selectedItem.name === item.name)
      ? {backgroundColor: '#4545FE', color: 'white'}
      : {backgroundColor: '#f5f5f5', color: '#3d3d3d'};
  };
  const getIconVariant = item => {
    return selectedItems.find(selectedItem => selectedItem.name === item.name) ? 'light' : 'dark';
  };

  const handleSkip = () => {
    toast({
      title: `Successfully updated`,
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: 'top-right',
    });
    setTimeout(() => {
      router.push(`/listings/manage/?listingId=${projectId}`);
    }, 1000);
  };

  const closeMenu = () => {
    setFilteredAmenities([]);
    searchListDisclosure.onClose();
  };
  return (
    <SlideFade in offsetX="100%" initialScale={1.2}>
      <Container
        p="8"
        maxW={'7xl'}
        boxShadow="0px 4px 8px rgba(0, 0, 0, 0.02)"
        color="gray.900"
        borderRadius="2xl"
        background="#FFFFFF"
        // box-shadow="0px 4px 8px rgba(0, 0, 0, 0.02)"
        border={'1px solid #E4E4E4'}
      >
        <HStack w="full" justify="space-between" mt="0" mb="30px">
          <Flex alignItems={'center'} gap="10px">
            <Heading
              color="#000"
              fontSize="24px"
              fontStyle="normal"
              fontWeight="500"
              lineHeight="normal"
            >
              Select Amenities{' '}
            </Heading>
            {selectedItems.length > 0 && (
              <Text
                pt="5px"
                color="#4545FE"
                fontSize="14px"
                fontStyle="normal"
                fontWeight="300"
                lineHeight="normal"
              >{`${selectedItems.length} selected`}</Text>
            )}
          </Flex>
          <SearchMenu
            searchListDisclosure={searchListDisclosure}
            closeMenu={closeMenu}
            inputRef={inputRef}
            searchName={searchName}
            handleSearch={handleSearch}
            filteredAmenities={filteredAmenities}
            getItemStyle={getItemStyle}
            getIconVariant={getIconVariant}
            handleSearchedAmenitiesSelection={handleSearchedAmenitiesSelection}
          />
        </HStack>

        <Flex gap="18px 30px" wrap="wrap">
          {popularAmenities.map((amenity, index) => {
            return (
              <AmenitiesComponent
                getItemStyle={getItemStyle}
                amenity={amenity}
                idx={index}
                getIconVariant={getIconVariant}
                handleSearchedAmenitiesSelection={handleSearchedAmenitiesSelection}
                key={index}
              />
            );
          })}
        </Flex>
        <Stack mt={'50px'} pb="30px">
          {isOtherAmenities ? (
            <HStack w="fit-content" onClick={() => setisOtherAmenities(false)}>
              <ShowLessAmenitiesIcon cursor={'pointer'} />
              <Text
                color="#4545FE"
                cursor={'pointer'}
                fontFamily="Euclid Circular B"
                fontSize="18px"
                fontStyle="normal"
                fontWeight="400"
                lineHeight="normal"
              >
                Show less
              </Text>
            </HStack>
          ) : (
            <HStack w="fit-content" onClick={() => setisOtherAmenities(true)}>
              <ViewOtherAmenitiesIcon cursor={'pointer'} />
              <Text
                cursor={'pointer'}
                color="#4545FE"
                fontFamily="Euclid Circular B"
                fontSize="18px"
                fontStyle="normal"
                fontWeight="400"
                lineHeight="normal"
              >
                View other amenities
              </Text>
            </HStack>
          )}
        </Stack>
        {isOtherAmenities ? (
          <div>
            <Flex gap="18px 30px" wrap="wrap">
              {otherAmenities.map((amenity, index) => {
                return (
                  <AmenitiesComponent
                    amenity={amenity}
                    idx={index}
                    getItemStyle={getItemStyle}
                    getIconVariant={getIconVariant}
                    handleSearchedAmenitiesSelection={handleSearchedAmenitiesSelection}
                    key={index}
                  />
                );
              })}
            </Flex>
          </div>
        ) : null}
        <HStack w="full" justify="flex-end" gap="12px" mt="50px">
          <Button
            variant="default"
            w="202px"
            type="button"
            cursor="pointer"
            fontWeight="400"
            align="center"
            px={4}
            mt={0}
            borderRadius="8px"
            h="55px"
            bg="red.100"
            color="red.400"
            fontSize="16px"
            onClick={handleClear}
            rounded="full"
          >
            Clear All
          </Button>
          <Button
            variant="default"
            border="1px solid rgba(69, 69, 254, 0.1)"
            w="150px"
            borderColor={themeStyles.color.primary}
            type="button"
            cursor="pointer"
            fontWeight="400"
            align="center"
            px={4}
            mt={0}
            borderRadius="8px"
            h="55px"
            color={themeStyles.color.primary}
            fontSize="16px"
            onClick={handleSkip}
            rounded="full"
          >
            Skip
          </Button>
          <Button
            mt={0}
            h="55px"
            w="202px"
            variant="primary"
            rounded="full"
            fontWeight={400}
            fontSize="16px"
            onClick={handleSubmitAmenities}
          >
            {mutation?.isLoading ? <Spinner color="#FFFFFF" /> : 'Proceed'}
          </Button>
        </HStack>
      </Container>
      {/* <EditSuccessModal modal={SHOW_PROJECT_EDIT_SUCCESFUL} projectId={projectId} /> */}
    </SlideFade>
  );
}
