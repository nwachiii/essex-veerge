import React from 'react';
import {AspectRatio, Box, Flex, Image, Stack, Text} from '@chakra-ui/react';
import {keyframes, css} from '@emotion/react';

const ListingCardLoadingState = () => {
  const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;
  const loadingAnimation = css`
    animation: ${shimmer} 2s infinite alternate;
  `;
  return (
    <AspectRatio ratio={1.49} maxH="280px" w="full">
      <Stack
        spacing="none"
        bg="#f5f5f5"
        borderRadius="12px"
        border="0.5px solid #e4e4e4"
        overflow="hidden"
        h="full"
        w="full"
        bgGradient="linear(to-r, #f5f5f5 25%, #f8f8f8 50%, #f5f5f5 75%)"
        bgSize="200% 100%"
        css={loadingAnimation}
        pos="relative"
      >
        {/* <Box
          pos="absolute"
          left="0"
          w="full"
          h="full"
          bg=" linear-gradient(183.45deg, rgba(0, 0, 0, 0.1) 47.65%, rgba(0, 0, 0, 0.8) 100.3%)"
        /> */}

        <Stack
          alignItems="start"
          px="16px"
          color="#ffffff"
          pos="absolute"
          bottom="24.2px"
          zIndex={2}
          left="0"
          w="full"
          spacing="4px"
        >
          <Box bg="#eeeeee" w="25%" h="25.36px" />

          <Box bg="#eeeeee" w="40%" h="20.29px" />
        </Stack>
      </Stack>
    </AspectRatio>
  );
};

export default ListingCardLoadingState;
