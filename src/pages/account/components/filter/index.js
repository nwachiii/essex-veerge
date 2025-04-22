import {
  HStack,
  Image,
  Menu,
  MenuButton,
  MenuList,
  Text,
  VStack,
  Button,
  Box,
  Heading,
  InputGroup,
  Input,
  InputLeftElement,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  Checkbox,
  useDisclosure,
  RadioGroup,
  Radio,
} from '@chakra-ui/react';
import filter_icon from '/src/images/icons/filter_icon.svg';
import searchIcon from '/src/images/icons/search_icon.svg';
import selectedIcon from '/src/images/icons/mark_icon.svg';

import React, {useState} from 'react';
import OptionsToRadio from './OptionsToRadio';
import styled from '@emotion/styled';
import {
  construction_constants,
  listings_status_constants,
  listings_type_constants,
} from '/src/constants/accounts/constants';
import {useRouter} from 'next/router';

const Filter = ({setUrl, url, forFilter}) => {
  const {isOpen, onClose, onOpen} = useDisclosure();
  const [toBeFiltered, setToBeFiltered] = useState({});

  const router = useRouter();

  const handleRange = e => setToBeFiltered({...toBeFiltered, price_from: e[0], price_to: e[1]});
  const handleChange = e => {
    if (e.target?.name === 'reset') {
      return setToBeFiltered({});
    }
    if (e.target?.name?.toLowerCase() === 'number_of_bedroom') {
      return setToBeFiltered({
        ...toBeFiltered,
        [e.target.name]: e.target.textContent,
      });
    }

    return setToBeFiltered({
      ...toBeFiltered,
      [e.target.name]: e.target.value,
    });
    console.log(e.target?.name, e);
  };

  const handleRadio = e => setToBeFiltered({...toBeFiltered, equity_type: e});

  const applyFilter = () => {
    if (!Object.entries(toBeFiltered).length) {
      setUrl({...url, filter: '', param: `${url.sort && '?'}${url.sort}`});
      router.push(`${router.route}${url.sort && '?'}${url.sort}`);
      setToBeFiltered({});

      return onClose();
    }

    const filter_param = `${Object.entries(toBeFiltered)
      .map(([name, value]) => {
        if (value === 'Any') {
          return null;
        }
        return `${
          name === 'number_of_bedroom' ? (value.includes('+') ? 'bedroom_above' : name) : name
        }=${
          name === 'number_of_bedroom'
            ? value.includes('+')
              ? value.replace('+', '')
              : value
            : value
        }`;
      })
      .filter(item => item)
      .join('&')}`;

    console.log(filter_param);

    setUrl({
      ...url,
      filter: filter_param,

      param: `?${filter_param}${url.sort && '&'}${url.sort}`,
    });
    router.push(`${router.route}?${filter_param}${url.sort && '&'}${url.sort}`);
    setToBeFiltered({});
    return onClose();
  };
  return (
    <Menu isOpen={isOpen} onClose={onClose} closeOnSelect={false}>
      <MenuButton
        onClick={onOpen}
        alignSelf="flex-end"
        bg="transparent"
        fontWeight="400"
        fontSize="14px"
        lineHeight="18px"
        color="#191919"
        width="144px"
        height="48px"
        border="1px solid #E4E4E4"
        borderRadius="12px"
      >
        <HStack justify="center" spacing="9px">
          <Image w="18px" h="18px" src={filter_icon.src} alt="sort by icon" fontSize="10px" />{' '}
          <Text>filter</Text>
        </HStack>
      </MenuButton>

      <MenuList
        // w="267px"
        position="relative"
        zIndex="2"
        w="410px"
        h="465px"
        px="21px"
        py="20px"
        boxShadow="3px 20px 30px rgba(0, 0, 0, 0.1),-10px -10px 60px #ffffff"
        borderRadius="16px"
        bg="#ffffff"
      >
        <Wrap>
          <VStack align="flex-start" pl="5px" spacing="13px" w="full">
            <HStack
              borderBottom="solid 1px #E4E4E4"
              //   px="26px"
              pb="20px"
              w="full"
              align="flex-start"
              justify="space-between"
            >
              <Heading fontSize="18.9px" fontWeight="700">
                Filter
              </Heading>

              <Text
                as="button"
                color="#4545FE"
                cursor="pointer"
                fontSize="14px"
                fontWeight="300"
                border="none"
                name="reset"
                onClick={handleChange}
              >
                Reset
              </Text>
            </HStack>
            <VStack w="full" maxW="326px" spacing="6px">
              <Heading
                // mb="12px"
                alignSelf={'flex-start'}
                fontSize="14px"
                fontWeight="600"
              >
                Location
              </Heading>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Image src={searchIcon.src} alt="seacrh icon" />
                </InputLeftElement>
                <Input
                  placeholder="Search location"
                  type="text"
                  name="country"
                  border="solid 1px #606060"
                  onChange={handleChange}
                  value={toBeFiltered?.country ?? ''}
                  borderRadius="10px"
                  borderColor="#E4E4E4"
                  h="39px"
                  px="10px"
                />
              </InputGroup>
            </VStack>

            <VStack
              w="full"
              align="flex-start"
              pb="13px"
              borderBottom="1px solid #E4E4E4"
              spacing="6px"
            >
              <Heading
                // mb="12px"
                alignSelf={'flex-start'}
                fontSize="14px"
                fontWeight="600"
              >
                Number of Bedroom
              </Heading>

              <HStack maxW="326px" spacing="9.47px">
                {['Any', '1', '2', '3', '4', '5', '6', '7+'].map((item, idx) => (
                  <Button
                    borderRadius="8.1px"
                    fontSize="10.2px"
                    key={idx}
                    bg={item === toBeFiltered.number_of_bedroom ? '#191919' : '#F5F5F5'}
                    color={item === toBeFiltered.number_of_bedroom ? '#ffffff' : '#3D3D3D'}
                    px="11px"
                    w="26px"
                    minW="fit-content"
                    py="5.5px"
                    h="25px"
                    onClick={handleChange}
                    name="number_of_bedroom"
                    lineHeight="14px"
                  >
                    {item}
                  </Button>
                ))}
              </HStack>
            </VStack>

            <VStack
              w="full"
              pb="13px"
              align="flex-start"
              borderBottom="1px solid #E4E4E4"
              spacing="none"
            >
              <Heading mb="10px" alignSelf={'flex-start'} fontSize="14px" fontWeight="600">
                Price
              </Heading>

              <Box pl="10px">
                <RangeSlider
                  w="316px"
                  // eslint-disable-next-line jsx-a11y/aria-proptypes
                  aria-label={['min', 'max']}
                  min={forFilter?.min_price ?? 0}
                  max={forFilter?.max_price ?? 0}
                  value={[toBeFiltered?.price_from ?? 0, toBeFiltered?.price_to ?? 0]}
                  onChange={handleRange}
                >
                  <RangeSliderTrack bg="#E4E4E4" h="7.44px" borderRadius="8px">
                    <RangeSliderFilledTrack bg="#000000" />
                  </RangeSliderTrack>
                  <RangeSliderThumb
                    index={0}
                    bg="black"
                    boxSize="20.9px"
                    border="solid 2px white"
                  />
                  <RangeSliderThumb
                    index={1}
                    boxSize="20.9px"
                    border="solid 2px white"
                    bg="black"
                  />
                </RangeSlider>
              </Box>

              <HStack mt="10px" alignSelf="flex-start" spacing="20px">
                <Box pb="6px" borderBottom="1px solid #E4E4E4" minW="73px">
                  <Text as="span" fontSize="16px" fontWeight="400" color="#919191">
                    {toBeFiltered?.price_from ?? 'Min'}
                  </Text>
                </Box>
                <Box pb="6px" borderBottom="1px solid #E4E4E4" minW="73px">
                  <Text as="span" fontSize="16px" fontWeight="400" color="#919191">
                    {toBeFiltered?.price_to ?? 'Max'}
                  </Text>
                </Box>
              </HStack>
            </VStack>
            <VStack spacing="14px" w="full" pb="13px" borderBottom="1px solid #E4E4E4">
              <OptionsToRadio
                name="Construction Level"
                options={toBeFiltered}
                setOption={setToBeFiltered}
                constants={construction_constants}
              />
              <OptionsToRadio
                options={toBeFiltered}
                setOption={setToBeFiltered}
                name="Listing Type"
                constants={listings_type_constants}
              />{' '}
              <OptionsToRadio
                options={toBeFiltered}
                setOption={setToBeFiltered}
                name="Listing Status"
                constants={listings_status_constants}
              />
            </VStack>
            <VStack
              w="full"
              align="flex-start"
              pb="13px"
              borderBottom="1px solid #E4E4E4"
              spacing="6px"
            >
              <Heading mb="12px" alignSelf={'flex-start'} fontSize="14px" fontWeight="600">
                Equity plan
              </Heading>
              <RadioGroup onChange={handleRadio} value={toBeFiltered?.equity_type ?? ''}>
                <VStack align="flex-start" spacing="29px" w="full">
                  <HStack spacing="14px" w="full">
                    <HStack spacing position="relative" mr="12px">
                      <Radio
                        zIndex="1"
                        opacity="0"
                        _checked={{
                          opacity: '0',
                        }}
                        value="payment plan"
                      ></Radio>

                      <Box borderRadius="3px" p="3px" bg="#D9D9D9" position="absolute">
                        <Image
                          src={selectedIcon.src}
                          alt="selected equity icon "
                          left="0"
                          m="0"
                          sx={{transition: 'ease-in-out 0.5s'}}
                          opacity={toBeFiltered?.equity_type === 'payment plan' ? '1' : '0'}
                        />
                      </Box>
                    </HStack>
                    <Text as="span" fontSize="10.83px" fontWeight="600">
                      Payment plan
                    </Text>
                  </HStack>

                  <HStack spacing="14px" w="full">
                    <HStack spacing position="relative" mr="12px">
                      <Radio
                        zIndex="1"
                        opacity="0"
                        _checked={{
                          opacity: '0',
                        }}
                        value="fractional"
                      ></Radio>

                      <Box borderRadius="3px" p="3px" bg="#D9D9D9" position="absolute">
                        <Image
                          src={selectedIcon.src}
                          alt="selected equity icon "
                          left="0"
                          m="0"
                          sx={{transition: 'ease-in-out 0.5s'}}
                          opacity={toBeFiltered?.equity_type === 'fractional' ? '1' : '0'}
                        />
                      </Box>
                    </HStack>
                    <Text as="span" fontSize="10.83px" fontWeight="600">
                      Fractional
                    </Text>
                  </HStack>
                </VStack>
              </RadioGroup>
            </VStack>
          </VStack>
        </Wrap>
        <Box mt="20px" justifySelf="flex-end" px="46px">
          <Button
            onClick={applyFilter}
            w="full"
            borderRadius="72px"
            // isDisabled={!Object.entries(toBeFiltered).length}
            bg={'#4545FE'}
            color={'#FFFFFF'}
            fontWeight={'400'}
            fontSize={'18px'}
            lineHeight={'23px'}
            _hover={{
              shadow: 'md',
            }}
            _active={{
              opacity: 0.8,
            }}
            minH={'55px'}
          >
            Apply Filter
          </Button>
        </Box>
      </MenuList>
    </Menu>
  );
};

export default Filter;

const Wrap = styled.div`
  overflow: auto;
  width: 100%;
  height: 350px;

  &::-webkit-scrollbar {
    width: 9px;

    border-radius: 16px;
  }
  &::-webkit-scrollbar-track {
    border-radius: 16px;

    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 16px;

    background-color: darkgrey;
    // outline: 1px solid slategrey;
  }
`;
