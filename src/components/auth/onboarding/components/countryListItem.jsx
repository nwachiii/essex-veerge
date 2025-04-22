import {
  Flex,
  Icon,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
  useDisclosure,
  useOutsideClick,
} from '@chakra-ui/react';
import countries from 'constants/auth/country';
import {motion} from 'framer-motion';
import React, {useState, useEffect, useRef, useCallback} from 'react';
import {LiaAngleDownSolid} from 'react-icons/lia';
const CountryListItems = ({onSelect, timeZone, selectedCountry}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState(countries);
  const [searchIndex, setSearchIndex] = useState(null);
  const timeoutRef = useRef(null);
  const menuRef = useRef(null);

  // Handle key presses to build the search term
  const handleKeyPress = useCallback(event => {
    event.preventDefault();
    setSearchTerm(prevSearchTerm => prevSearchTerm + event.key);
  }, []);

  useEffect(() => {
    window.addEventListener('keypress', handleKeyPress);
    return () => {
      window.removeEventListener('keypress', handleKeyPress);
    };
  }, [handleKeyPress]);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => clearTimeout(timeoutRef.current);
  }, [searchTerm]);

  // Perform the actual search when the debounced search term changes
  useEffect(() => {
    if (debouncedSearchTerm) {
      const results = countries.filter(country =>
        country.name.toLowerCase().startsWith(debouncedSearchTerm.toLowerCase())
      );

      if (results.length > 0) {
        const firstResultIndex = countries.findIndex(country => country.code === results[0].code);
        setSearchIndex(firstResultIndex);
      } else {
        setSearchIndex(null);
      }

      setSearchResults(results);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        setSearchTerm('');
        setDebouncedSearchTerm('');
        setSearchResults(countries);
        setSearchIndex(null);
      }, 1000);
    } else {
      setSearchResults(countries);
      setSearchIndex(null);
    }

    return () => clearTimeout(timeoutRef.current);
  }, [debouncedSearchTerm]);

  // Scroll to found index
  useEffect(() => {
    if (searchIndex !== null) {
      const element = document.getElementById(searchIndex);
      if (element) {
        element.scrollIntoView({behavior: 'smooth', block: 'center'});
      }
    }
  }, [searchIndex]);

  const [active, setActive] = useState('');

  const openTimeZoneOptions = idx => () => {
    active == idx ? setActive(null) : setActive(idx);
  };
  return countries.map(({name, code, timezones}, idx) => (
    <Stack ref={menuRef} as={motion.div} layout="position">
      <Flex
        as={motion.li}
        ref={menuRef}
        layout
        justifyContent="space-between"
        pos="relative"
        onClick={timezones.length > 1 ? openTimeZoneOptions(idx) : onSelect(name, timezones[0])}
        id={idx}
        p="16.5px 18px"
        cursor="pointer"
        _hover={{bg: selectedCountry === name ? '#191919' : '#f5f5f5'}}
        transition="0.2s ease-in-out"
        bg={
          idx === searchIndex || (active === idx && selectedCountry !== name)
            ? '#f5f5f5'
            : selectedCountry === name
              ? '#191919'
              : '#fafafa'
        }
        color={selectedCountry === name ? '#ffffff' : '#141414'}
        gap="8px"
        key={code}
      >
        <Flex gap="8px">
          <Image
            src={`https://flagcdn.com/w40/${code.toLowerCase()}.png`}
            alt={`${name}'s flag`}
            boxSize="18px"
            borderRadius="20px"
          />
          <Text
            ref={menuRef}
            fontFamily="Neue Haas Grotesk Display Pro"
            fontSize="16px"
            fontWeight="500"
          >
            {name} {timeZone && name === selectedCountry ? `(${timeZone})` : ''}
          </Text>
        </Flex>
        {timezones.length > 1 ? (
          <Icon
            as={LiaAngleDownSolid}
            transition="0.3s ease-in-out"
            transform={`rotate(${active === idx ? '-180deg' : '0deg'})`}
            color="#cbcbcb"
          />
        ) : null}
      </Flex>
      {active === idx ? (
        <Stack ref={menuRef} p="0px 18px 16.5px">
          {timezones.map((timezone, idx) => (
            <Text
              _hover={{color: '#191919'}}
              cursor="pointer"
              transition="0.3s ease-in-out"
              onClick={onSelect(name, timezone)}
              color={timeZone === timezone ? '#191919' : '#919191'}
              fontSize="14px"
              fontWeight="400"
              key={idx}
            >
              {timezone}
            </Text>
          ))}
        </Stack>
      ) : null}
    </Stack>
  ));
};

export default CountryListItems;
