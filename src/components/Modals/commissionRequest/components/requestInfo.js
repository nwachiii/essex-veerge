import {
  VStack,
  SimpleGrid,
  Heading,
  HStack,
  Text,
  Image,
  Stack,
  Center,
  Skeleton,
} from '@chakra-ui/react';
import React, {useState} from 'react';

import avatar from '/src/images/avatar.svg';
import {formatToCurrency} from '../../../../utils/formatAmount';

export const RequestInfo = ({commissionRequestObj: {data}, customScrollbarStyles}) => {
  const [expand, setExpand] = useState(false);

  return (
    <Stack
      flex={`1`}
      p={`12px`}
      w="full"
      border="0.5px solid #E4E4E4"
      borderRadius="12px"
      gap="12px"
      background={`#FBFCFC`}
    >
      <VStack h="full" spacing="15px" w="full">
        <Heading as="h2" color="#606060" fontSize="12px" fontWeight="400" w="full">
          Request Summary
        </Heading>

        <VStack w="full" align="start" spacing="27.5px">
          <HStack spacing="8px">
            <Center
              h={`80px`}
              w={`89.5px`}
              minW={`89.5px`}
              overflow={`hidden`}
              borderRadius={`7.8px`}
              bg="#F5F5F5"
            >
              <Skeleton
                h={`80px`}
                w={`89.5px`}
                startColor="#F5F5F5"
                endColor="#F5F5F5"
                minW={`89.5px`}
                isLoaded={data?.unit_photo}
              >
                <Image
                  src={data?.unit_photo ?? ''}
                  bg="#606060"
                  alt="requested listing image"
                  fontSize="5px"
                  objectFit="cover"
                  minW={`100%`}
                  minH={`100%`}
                />
              </Skeleton>
            </Center>
            <VStack align="start" gap={`6px`}>
              <Heading
                as="h3"
                w="full"
                textAlign="start"
                fontSize="18px"
                fontWeight="500"
                color="#191919"
                m={`0px`}
              >
                {data?.project_name ?? '-'}
              </Heading>
              <Text
                w="full"
                textAlign="start"
                as="span"
                fontSize="14px"
                fontWeight="400"
                color="#191919"
                m={`0px`}
              >
                {data?.unit_title ?? '-'}
              </Text>
              {/* <SimpleGrid
                alignSelf="start"
                justifyItems="start"
                mt="17.5px"
                columns={2}
                spacing="21px"
              >
                <VStack align="start" spacing="4px">
                  <Text fontSize="11px" fontWeight="400" color="#606060">
                    Unit size
                  </Text>
                  <Text fontSize="14px" fontWeight="500" color="#191919">
                    {data?.unit_size ?? '-'}sqm
                  </Text>
                </VStack>
                <VStack align="start" spacing="4px">
                  <Text fontSize="11px" fontWeight="400" color="#606060">
                    Unit price
                  </Text>
                  <Text fontSize="14px" fontWeight="500" color="#191919">
                    {data?.unit_price ? formatToCurrency(data?.unit_price) : '-'}
                  </Text>
                </VStack>
              </SimpleGrid> */}
            </VStack>
          </HStack>
          <HStack
            justify="start"
            spacing="20.5px"
            p={`8px 12px`}
            bg={`#F5F5F5`}
            borderRadius={`4px`}
            w={`100%`}
            justifyContent={`space-between`}
          >
            <VStack align="start" gap={`6px`}>
              <Text fontSize="12px" fontWeight="400" color="#606060" m={`0px`}>
                Request Date
              </Text>
              <Text fontSize="12px" fontWeight="500" color="#191919" m={`0px`}>
                {data?.requestDate ?? '-'}
              </Text>
            </VStack>
            <VStack align="start" gap={`6px`}>
              <Text fontSize="12px" fontWeight="400" color="#606060" m={`0px`}>
                Date sold
              </Text>
              <Text fontSize="12px" fontWeight="500" color="#191919" m={`0px`}>
                {data?.dateSold ?? '-'}
              </Text>
            </VStack>
          </HStack>
        </VStack>

        <VStack
          as="article"
          spacing="4px"
          // h="98px"
          h="full"
          w="full"
          borderRadius="10px"
          px="11px"
          pt="5px"
          pb="7px"
          pr="44px"
          bg="#F5F5F5"
          maxW="393px"
          justifySelf="start"
          alignSelf="start"
        >
          <Heading
            textAlign="start"
            w="full"
            as="h4"
            fontSize="11px"
            fontWeight="400"
            color="#606060"
          >
            {'Notes'}
          </Heading>
          <Stack
            sx={customScrollbarStyles}
            w="full"
            align="start"
            justify="start"
            overflowY="scroll"
          >
            <Text
              w="full"
              maxW="338px"
              whiteSpace="break-spaces"
              textAlign="start"
              fontSize="14px"
              fontWeight="400"
              color="#000000"
            >
              {expand
                ? (data?.notes ?? '-')
                : (data?.notes ?? '-')?.length <= 80
                  ? (data?.notes ?? '-')
                  : `${(data?.notes ?? '-')?.slice(0, 80)}`}
              <Text
                fontSize="12px"
                cursor="pointer"
                fontWeight="400"
                color="#606060"
                as="span"
                onClick={() => setExpand(!expand)}
              >
                {(data?.notes ?? '-')?.length <= 80
                  ? ''
                  : expand
                    ? ' ... See less'
                    : ' ... read more'}
              </Text>
            </Text>
          </Stack>
        </VStack>
      </VStack>
    </Stack>
  );
};

export default RequestInfo;
