import {Flex, Icon, Image, Stack, Text} from '@chakra-ui/react';
import React from 'react';
import {FaChevronLeft, FaChevronRight} from 'react-icons/fa';
import video from '/src/images/issueDetails/video.png';
import img from '/src/images/issueDetails/Img.png';
import img2 from '/src/images/issueDetails/Img2.png';
import img3 from '/src/images/issueDetails/Img3.png';
const images = [img.src, img2.src, img3.src, video.src];
const AdditionalInfo = () => {
  return (
    <Stack
      bg="#fafafa"
      border="0.5px solid #e4e4e7"
      rounded="4px"
      p="12px 16px"
      minH="81px"
      spacing="8px"
    >
      <Text fontSize="13px" fontWeight="500" color="#000000">
        Additional Info
      </Text>
      <Flex w="full" gap="8px" alignItems="center" justifyContent="space-between">
        <Icon as={FaChevronLeft} color="#606060" />
        {images.map((item, idx) => (
          <Image
            src={item}
            key={idx}
            minW="64px"
            rounded="10px"
            w="64px"
            h="61px"
            objectFit="cover"
          />
        ))}
        <Icon as={FaChevronRight} color="#606060" />
      </Flex>
    </Stack>
  );
};

export default AdditionalInfo;
