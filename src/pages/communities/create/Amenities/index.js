import {useRef, useState} from 'react';
import {useMutation} from '@tanstack/react-query';
import {
  Box,
  Container,
  Flex,
  Heading,
  HStack,
  Image,
  SlideFade,
  Spinner,
  Stack,
  Text,
  useToast,
  Button as ChakraBtn,
  InputGroup,
  InputRightElement,
  Input,
  Menu,
  MenuButton,
  MenuList,
  InputLeftElement,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import searchIcon from '/src/images/icons/searchIconRequest.svg';
import emptyIcon from '/src/images/icons/emptyIcon.svg';
import {Button} from '../../../../ui-lib';
import {AMENITIES_STORE} from '/src/constants/listings/amenities.js';
import {addAmenitiesToProject} from '../../../../apis/listings';
import {useRouter} from 'next/router';
import ViewOtherAmenitiesIcon, {
  ShowLessAmenitiesIcon,
} from '../../../../components/assets/ViewOtherAmenitiesIcon';
import {OTHER_AMENITIES_STORE} from '../../../../constants/listings/amenities';
const scrollBar = {
  scrollbarWidth: 'none',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
};
export default function Amenities() {
  const toast = useToast();
  const router = useRouter();
  const [isOtherAmenities, setisOtherAmenities] = useState(false);
  const projectId = JSON.parse(localStorage.getItem('newProjectId'));
  const [popularAmenities, setPopularAmenities] = useState([...AMENITIES_STORE]);
  const [otherAmenities, setOtherAmenities] = useState([...OTHER_AMENITIES_STORE]);
  const [filteredAmenities, setFilteredAmenities] = useState([]);
  const inputRef = useRef(null);
  const [searchName, setSearchName] = useState('');
  const searchListDisclosure = useDisclosure();

  const TOTALAMENITIES = [...AMENITIES_STORE, ...OTHER_AMENITIES_STORE];

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

  const listingInfoFromLocalStorage =
    typeof window !== 'undefined' &&
    localStorage.getItem('listingInfo') !== 'undefined' &&
    JSON.parse(localStorage.getItem('listingInfo'));

  // Maintain a state variable for selected items
  const [selectedItems, setSelectedItems] = useState([]);

  // Toggle item selection
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

  const getItemStyle = item => {
    return selectedItems.find(selectedItem => selectedItem.name === item.name)
      ? {backgroundColor: '#4545FE', color: 'white'}
      : {backgroundColor: '#f5f5f5', color: '#3d3d3d'};
  };
  const getIconVariant = item => {
    return selectedItems.find(selectedItem => selectedItem.name === item.name) ? 'light' : 'dark';
  };

  const mutation = useMutation(formData => addAmenitiesToProject(projectId, formData), {
    onSuccess: res => {
      // console.log(res);
      setTimeout(() => {
        router.push(`/listings/manage/?listingId=${projectId}&isCreate=true`);
      }, 1000);
      localStorage.setItem('AmenitiesHaveBeenAdded', 'true');
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
    mutation.mutate({amenities: selectedItems});
    localStorage.setItem(
      'listingInfo',
      JSON.stringify({...listingInfoFromLocalStorage, amenities: selectedItems})
    );
  };
  const closeMenu = () => {
    // setSearchName('');
    setFilteredAmenities([]);
    searchListDisclosure.onClose();
  };
  const handleClear = () => {
    setSelectedItems([]);
  };

  return (
    <SlideFade in offsetX="100%" initialScale={1.2}>
      <Container
        px="12"
        pt="4"
        pb="10"
        maxW={'7xl'}
        boxShadow="0px 4px 8px rgba(0, 0, 0, 0.02)"
        color="gray.900"
        borderRadius="2xl"
        background="#FFFFFF"
        border={'1px solid #E9E9E9'}
        fontFamily="Euclid Circular B"
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
              Select amenities{' '}
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

        <div>
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
        </div>

        <Stack mt={'50px'} pb="30px">
          {isOtherAmenities ? (
            <HStack onClick={() => setisOtherAmenities(false)}>
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
            <HStack onClick={() => setisOtherAmenities(true)}>
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

        <HStack w="full" justify="flex-end" spacing="14px" mb={4} mt={'55px'}>
          <ChakraBtn
            cursor="pointer"
            variant="outline-radius"
            h="55px"
            w="202px"
            borderColor="#EF4444"
            borderRadius="full"
            p="8px 15px"
            onClick={handleClear}
            color="#EF4444"
          >
            Clear all
          </ChakraBtn>
          <Button
            rounded="full"
            h="55px"
            w="202px"
            mt="0px"
            variant="primary"
            fontSize="16px"
            fontWeight={400}
            onClick={handleSubmitAmenities}
          >
            {mutation?.isLoading ? <Spinner color="white" /> : 'Proceed'}
          </Button>
        </HStack>
      </Container>
    </SlideFade>
  );
}

export const AmenitiesComponent = ({
  idx,
  handleSearchedAmenitiesSelection,
  getItemStyle,
  amenity,
  getIconVariant,
}) => {
  return (
    <Box key={idx} onClick={handleSearchedAmenitiesSelection(amenity)}>
      <HStack
        w="fit-content"
        cursor={'pointer'}
        style={getItemStyle(amenity)}
        borderRadius="20px"
        p="14px"
        maxH="40px"
      >
        <Image
          alt=""
          filter={getIconVariant(amenity) == 'dark' ? '' : 'brightness(0) invert(1)'}
          src={amenity.icon.src}
          baxSize="24px"
        />
        <Text fontSize="16px" fontWeight="400">
          {amenity.name}
        </Text>
      </HStack>
    </Box>
  );
};

export const SearchMenu = ({
  searchListDisclosure,
  closeMenu,
  inputRef,
  searchName,
  handleSearch,
  filteredAmenities,
  getItemStyle,
  getIconVariant,
  handleSearchedAmenitiesSelection,
}) => {
  return (
    <Menu
      isLazy={true}
      initialFocusRef={inputRef}
      placement="bottom-end"
      isOpen={searchListDisclosure.isOpen}
      onClose={closeMenu}
    >
      <Box pos="relative">
        <MenuButton
          pos="absolute"
          w="full"
          h="full"
          pointerEvents="none"
          as={ChakraBtn}
          variant="unstyled"
        ></MenuButton>
        <InputGroup w="fit-content" justifySelf="flex-end" alignSelf="flex-end">
          <InputLeftElement pointerEvents="none">
            <Image src={searchIcon.src} alt="search icon" />
          </InputLeftElement>
          <Input
            autoComplete={false}
            fontSize="14px"
            fontWeight="300"
            ref={inputRef}
            value={searchName}
            w="152px"
            h="43px"
            border="1px solid #E4E4E7"
            bg="#transparent"
            _focusVisible={{
              borderColor: '#606060',
            }}
            _hover={{
              borderColor: '#E4E4E7',
              bg: 'transparent',
              _focusVisible: {
                borderColor: '#606060',
              },
            }}
            color="#222222"
            borderRadius="12px"
            onChange={handleSearch}
            placeholder="search"
            _focus={{
              w: '319px',
            }}
            transition="ease-in-out 0.3s"
            _placeholder={{
              color: '#606060',
              fontSize: '12px',
              fontWeight: '300',
            }}
          />
        </InputGroup>
      </Box>

      <MenuList
        as={Stack}
        spacing="8px"
        sx={scrollBar}
        maxH="280px"
        minW="200px"
        overflowY="auto"
        p="10px"
      >
        {!filteredAmenities.length ? (
          <VStack p="10px" spacing="8px">
            <Image w="20px" height="23px" src={emptyIcon.src} alt="empty icon" />
            <Text color="#606060" fontSize="11px" fontWeight="400">
              Amenity not available, try another keyword...
            </Text>
          </VStack>
        ) : (
          filteredAmenities.map((amenity, idx) => {
            return (
              <AmenitiesComponent
                getItemStyle={getItemStyle}
                amenity={amenity}
                idx={idx}
                getIconVariant={getIconVariant}
                handleSearchedAmenitiesSelection={handleSearchedAmenitiesSelection}
                key={idx}
              />
            );
          })
        )}
      </MenuList>
    </Menu>
  );
};
