import {HStack, Stack, Text, VStack} from '@chakra-ui/react';
import React from 'react';
import {themeStyles} from 'theme';

const ListingContactInfo = ({listingDetail}) => {
  return (
    <Stack {...themeStyles.card_container} p="16px" spacing="16px" w="full">
      <VStack
        align="flex-start"
        justify="center"
        {...themeStyles.card_container_white}
        maxH="78px"
        p="16px"
      >
        <Text fontWeight="400" fontSize="14px" lineHeight="17.75px" color="#525252">
          Address
        </Text>
        <Text
          wordBreak="break-word"
          whiteSpace="break-spaces"
          fontWeight="500"
          fontSize="16px"
          lineHeight="20.29px"
          color="#191919"
        >
          {listingDetail?.address}
        </Text>
      </VStack>
      <VStack
        align="flex-start"
        justify="center"
        {...themeStyles.card_container_white}
        maxH="78px"
        p="16px"
      >
        <Text fontWeight="400" fontSize="14px" lineHeight="17.75px" color="#525252">
          Landmark
        </Text>
        <Text
          wordBreak="break-word"
          whiteSpace="break-spaces"
          fontWeight="500"
          fontSize="16px"
          lineHeight="20.29px"
          color="#191919"
        >
          {listingDetail?.landmark}
        </Text>
      </VStack>
      <HStack spacing="10px">
        <VStack
          w="fit-content"
          minW="164px"
          align="flex-start"
          justify="center"
          {...themeStyles.card_container_white}
          maxH="78px"
          p="16px"
        >
          <Text fontWeight="400" fontSize="14px" lineHeight="17.75px" color="#525252">
            Longitude
          </Text>
          <Text
            wordBreak="break-word"
            whiteSpace="break-spaces"
            fontWeight="500"
            fontSize="16px"
            lineHeight="20.29px"
            color="#191919"
          >
            {listingDetail?.longitude}
          </Text>
        </VStack>
        <VStack
          w="fit-content"
          minW="164px"
          align="flex-start"
          justify="center"
          {...themeStyles.card_container_white}
          maxH="78px"
          p="16px"
        >
          <Text fontWeight="400" fontSize="14px" lineHeight="17.75px" color="#525252">
            Latitude
          </Text>
          <Text
            wordBreak="break-word"
            whiteSpace="break-spaces"
            fontWeight="500"
            fontSize="16px"
            lineHeight="20.29px"
            color="#191919"
          >
            {listingDetail?.latitude}
          </Text>
        </VStack>
      </HStack>
    </Stack>
  );
};

export default ListingContactInfo;
