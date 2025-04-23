import React from 'react';
import {
  Box,
  Flex,
  HStack,
  Heading,
  Image,
  Stack,
  StackDivider,
  Tag,
  TagLabel,
  Text,
  Toast,
  VStack,
  useToast,
  Skeleton,
} from '@chakra-ui/react';
import {themeStyles} from 'theme';
import Carousel from 'react-elastic-carousel';

export const UnitSkeletons = () => {
  const breakPoints = [{width: 1, itemsToShow: 3}];

  return (
    <Carousel
      pagination={false}
      itemPadding={[0, 1]}
      autoPlaySpeed={1500}
      showEmptySlots={true}
      enableAutoPlay={false}
      breakPoints={breakPoints}
      showArrows={false}
    >
      {Array(parseInt(3))
        .fill(1)
        .map((item, i) => (
          <UnitSkeleton index={i} key={i} />
        ))}
    </Carousel>
  );
};

export default UnitSkeletons;

const UnitSkeleton = ({...rest}) => {
  const duration = [1.3, 0.8, 1.3];
  return (
    <VStack
      mr={10}
      w="full"
      position={'relative'}
      bg="#FFFFFF"
      minW="312px"
      p="10px"
      minH="462px"
      boxShadow="sm"
      spacing="24px"
      align="flex-start"
      h="fit-content"
      borderRadius="16px"
    >
      <Skeleton startColor='gray.50' endColor='gray.200' speed={duration[rest.index]} w="full" h="319px" borderRadius="28px" />

      <Stack w="full" px={3} pb={4}>
        <Skeleton isLoaded={false}>
          <Text fontSize="24px" fontWeight="600" color="#191919" lineHeight="30px" />
        </Skeleton>

        <HStack
          divider={<StackDivider borderColor={'gray.200'} mx={6} />}
          w="full"
          borderRadius={'6px'}
          bg="#F8F8F8"
          justifyContent={'space-between'}
          py={4}
          px={2}
        >
          <Stack w="full">
            <Skeleton isLoaded={false}>
              <Text fontSize="14px" fontWeight="400" color="#606060" lineHeight="18px">
                dummy text
              </Text>
            </Skeleton>{' '}
            <Skeleton isLoaded={false}>
              <Text fontSize="18px" fontWeight="500" color="#191919" lineHeight="23px">
             
                dummy text
              </Text>
            </Skeleton>
          </Stack>
          <Stack w="full" ml="4">
            <Skeleton isLoaded={false}>
              <Text fontSize="14px" fontWeight="400" color="#606060" lineHeight="18px">
                Unit price
              </Text>
            </Skeleton>
            <Skeleton isLoaded={false}>
              <Text fontSize="18px" fontWeight="600" color="#191919" lineHeight="23px">
                Unit price
              </Text>
            </Skeleton>
          </Stack>
        </HStack>
        <HStack w="full" justify={'space-between'} py={2}>
          <Skeleton isLoaded={false}>
            <Tag p={3} w="112px" size="md" colorScheme={'green'} borderRadius="32px">
              <TagLabel mx="auto"> units left</TagLabel>
            </Tag>
          </Skeleton>
          <Skeleton isLoaded={false}>
            <Text
              cursor="pointer"
              display="flex"
              fontSize="14px"
              fontWeight={500}
              color={themeStyles.color.primary}
            >
              Manage
            </Text>
          </Skeleton>
        </HStack>
      </Stack>
    </VStack>
  );
};
