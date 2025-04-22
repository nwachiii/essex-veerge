import {Avatar, Box, Flex, HStack, Image, Tag, TagLabel, Text} from '@chakra-ui/react';
import rightArrow from '/src/images/icons/RightArrowForListingScheduledInspection.svg';

const customScrollStyle = {
  overflowX: 'auto',
  'scrollbar-width': 'none',

  '&::-webkit-scrollbar': {
    display: 'none',
  },
};

export const TrackPaidPaymentsRowComponent = ({props, setScreen}) => {
  return (
    <Flex
      sx={customScrollStyle}
      justify="space-between"
      overflowX="scroll"
      alignItems="center"
      gap="20px"
      w="full"
      p="12px 16px"
      pr="0px"
    >
      <HStack alignItems="center" spacing="10px">
        <Avatar boxSize="40px" />
        <Text wordBreak="keep-all" maxW="148px" fontSize="16px" fontWeight={400} color="#27272a">
          Olivia Okechunwku
        </Text>
      </HStack>
      <HStack maxW="128px" justify="center">
        {props == 2 ? (
          <Tag
            display="flex"
            p="6px 10px"
            w="fit-content"
            bg="#f4f4f5"
            border="0.5px solid #e4e4e5"
            borderRadius="34px"
            h="32px"
          >
            <TagLabel fontSize="14px" lineHeight="20px" fontWeight={500} color="#000000">
              Completed
            </TagLabel>
          </Tag>
        ) : (
          <Flex w="128px" alignItems="center" gap="12px">
            <Text color="#3f3f46" fontSize="14px" lineHeight="20px" fontWeight={500}>
              40%
            </Text>
            <Box w="full" bg="#e4e4e7" overflow="hidden" borderRadius="4px" h="8px">
              <Box w="40%" borderRadius="4px" bg="#22c55e" h="full" transition="0.8s ease-in-out" />
            </Box>
          </Flex>
        )}
      </HStack>
      <Box
        alignSelf="stretch"
        backdropFilter="auto"
        backdropBlur="8px"
        display="grid"
        placeContent="center"
        pos="sticky"
        right="0px"
        minW="32px"
        role="button"
        onClick={() => setScreen('customer levy profile')}
      >
        <Image mr="16px" opacity="0.5" h="16px" w="16px" src={rightArrow.src} alt="right icon" />
      </Box>
    </Flex>
  );
};
export const TrackOutstandingPaymentsRowComponent = ({props, setScreen}) => {
  return (
    <Flex
      alignItems="center"
      justify="space-between"
      overflowX="scroll"
      gap="20px"
      w="full"
      p="12px 16px"
    >
      <HStack alignItems="center" spacing="10px">
        <Avatar boxSize="40px" />
        <Text maxW="128px" fontSize="16px" fontWeight={400} color="#27272a">
          Olivia Okechunwku
        </Text>
      </HStack>

      <Text
        role="button"
        onClick={() => setScreen('update payment')}
        color="#4545fe"
        fontSize="13px"
        fontWeight={500}
      >
        Update
      </Text>
    </Flex>
  );
};
