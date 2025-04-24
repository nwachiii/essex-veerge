import {AspectRatio, Box, Flex, HStack, Image, Stack, Text} from '@chakra-ui/react';
import {useRouter} from 'next/router';
import React from 'react';
import {themeStyles} from 'theme';
import {formatNumberWithCommas} from 'utils/formatAmount';

const ListingCard = ({project}) => {
  const router = useRouter();
  const sold = project?.units_sold;
  const total_available_units = project?.units_available;
  const soldPercentage = project ? (sold / total_available_units) * 100 : 0;
  const CURRENT_DISPLAY_PICTURE = project?.photos?.photo
  return (
    <AspectRatio ratio={1.49} maxH="280px" w="full">
      <Stack
        spacing="none"
        bg="#f5f5f5"
        borderRadius="12px"
        overflow="hidden"
        cursor="pointer"
        onClick={() => router.push(`/listings/manage/?listingId=1`)}
        h="full"
        pos="relative"
      >
        <Image
          src={CURRENT_DISPLAY_PICTURE}
          alt={project?.name || "listing's" + 'image'}
          objectFit="cover"
          pos="absolute"
          loading="lazy"
          w="full"
          h="full"
        />
        <Box
          pos="absolute"
          left="0"
          w="full"
          h="full"
          bg=" linear-gradient(183.45deg, rgba(0, 0, 0, 0.1) 47.65%, rgba(0, 0, 0, 0.8) 100.3%)"
        />

        <Stack
          alignItems="start"
          px="16px"
          color="#ffffff"
          pos="absolute"
          bottom="24.2px"
          left="0"
          spacing="none"
        >
          <Text
            textTransform="capitalize"
            fontSize={{base: '16px', lg: '20px'}}
            lineHeight="25.36px"
            fontWeight="500"
          >
            {project?.name}
          </Text>
          <Flex alignItems="center" gap="12px">
            <Text
              fontSize={{base: '14px', lg: '16px'}}
              lineHeight="20.29px"
              fontWeight="400"
              color="#ffffff"
            >
              {`${formatNumberWithCommas(sold)}/${formatNumberWithCommas(total_available_units)}`}
            </Text>

            <Box
              pos="relative"
              h="8px"
              bg={'#ffffff'}
              overflow="hidden"
              w="157px"
              borderRadius={'12px'}
            >
              <Box
                pos="absolute"
                left="0"
                transition="0.3s ease-in-out"
                w={`${soldPercentage}%`}
                borderRadius="12px"
                h="8px"
                bg={'teal.400'}
              />
            </Box>
          </Flex>
        </Stack>
      </Stack>
    </AspectRatio>
  );
};

export default ListingCard;
