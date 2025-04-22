import React from 'react';

import check from '/src/images/icons/checkForFeedBack.svg';

import {
  Box,
  HStack,
  chakra,
  Image,
  Text,
  useRadio,
  useRadioGroup,
  VStack,
  Heading,
  SimpleGrid,
  RadioGroup,
  Stack,
  Radio,
} from '@chakra-ui/react';
import {useRouter} from 'next/router';

const RadioForInspectionTypes = ({menuDisclosure}) => {
  const router = useRouter();
  const handleFilter = value => {
    const defaultQuery = {
      filter: `${value}`,
    };

    const mergedQuery = {
      ...router.query,
      ...defaultQuery,
    };

    value === 'all' ? delete mergedQuery.filter : null;
    router.push({
      pathname: router.pathname,
      query: mergedQuery,
    });
    return menuDisclosure.onClose();
  };

  return (
    <RadioGroup onChange={handleFilter} value={router.query.filter} defaultValue="all">
      <Stack spacing="26px">
        <Radio hidden value="all">
          <HStack spacing="10px">
            <HStack
              justify="center"
              align="center"
              w="22px"
              h="22px"
              bg="#D9D9D9"
              borderRadius="4px"
            >
              <Image
                alt=""
                transition="0.2s ease-in-out"
                opacity={router.query.filter === 'all' || !router.query.filter ? 1 : 0}
                transform={
                  router.query.filter === 'all' || !router.query.filter ? 'scale(1)' : 'scale(0.2)'
                }
                src={check.src}
              />
            </HStack>
            <Text fontSize="14px" fontWeight="400" color="#000">
              All
            </Text>
          </HStack>
        </Radio>
        <Radio hidden value="video">
          <HStack spacing="10px">
            <HStack
              justify="center"
              align="center"
              w="22px"
              h="22px"
              bg="#D9D9D9"
              borderRadius="4px"
            >
              <Image
                alt=""
                transition="0.2s ease-in-out"
                opacity={router.query.filter === 'video' ? 1 : 0}
                transform={router.query.filter === 'video' ? 'scale(1)' : 'scale(0.2)'}
                src={check.src}
              />
            </HStack>
            <Text fontSize="14px" fontWeight="400" color="#000">
              Virtual
            </Text>
          </HStack>
        </Radio>
        <Radio hidden value="in_person">
          <HStack spacing="10px">
            <HStack
              justify="center"
              align="center"
              w="22px"
              h="22px"
              bg="#D9D9D9"
              borderRadius="4px"
            >
              <Image
                alt=""
                transition="0.2s ease-in-out"
                opacity={router.query.filter === 'in_person' ? 1 : 0}
                transform={router.query.filter === 'in_person' ? 'scale(1)' : 'scale(0.2)'}
                src={check.src}
              />
            </HStack>
            <Text fontSize="14px" fontWeight="400" color="#000">
              In person
            </Text>
          </HStack>
        </Radio>
      </Stack>
    </RadioGroup>
  );
};

export default RadioForInspectionTypes;
