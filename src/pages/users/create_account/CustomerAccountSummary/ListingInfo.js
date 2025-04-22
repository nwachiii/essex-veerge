import {Box, Image, Heading, HStack, Stack, Text, SimpleGrid} from '@chakra-ui/react';
import React from 'react';
import astridImg from '/src/images/plaza-decan.png';
import luxuryCondo from '/src/images/luxury_condo.png';
import {formatAmountWithDecimal} from '../../../../utils/formatAmount';
import {useQuery} from '@tanstack/react-query';
import {fetchAllocationsPerUnit} from '../../../../apis/customers';
import {AssignAllocationToEquity} from '../../../listings/manage/unit_info/allocations/AssignAllocationToEquity';

export default function ListingInfo({
  listing,
  noQty,
  useAssignTo,
  equityId,
  paymentDetails,
  ...rest
}) {
  const project = listing?.project;
  const unit = listing?.unit;
  const bundleId = Number(unit?.id);
  const ALLOCATIONS_PER_UNIT = useQuery(['allocation-per-unit', bundleId], () =>
    fetchAllocationsPerUnit(bundleId)
  );

  const allocationsLength = ALLOCATIONS_PER_UNIT?.data?.data?.data?.length;

  return (
    <Box
      p={4}
      pl={useAssignTo ? '20px' : ''}
      minH={221}
      maxW={1203}
      h="fit-content"
      bg="transparent"
      borderRadius="32px"
      border="1.5px solid grey"
      my="80px"
      {...rest}
    >
      {project ? (
        <SimpleGrid
          columns={2}
          w={useAssignTo ? '' : '800px'}
          justifyContent="space-between"
          align="center"
          mx="auto"
        >
          <HStack spacing={4} align="center" w="100%" textAlign={'left'}>
            <Image
              alt=""
              borderRadius="14px"
              src={project?.photos?.[0]?.photo ?? astridImg.src}
              width={182}
              height={182}
            />
            <Stack spacing={1}>
              <Heading fontWeight="600" as="h2">
                {project?.name ?? ''}
              </Heading>
              <Text>{project?.status ?? ''}</Text>
            </Stack>
          </HStack>

          <HStack spacing={6}>
            <Image
              alt=""
              borderRadius="14px"
              src={unit?.photos[0]?.photo ?? luxuryCondo.src}
              width={186}
              height={186}
            />
            <Stack align="flex-start" spacing={8}>
              <Text fontWeight="600" fontSize="26px">
                {unit?.unit_title ?? ''}
              </Text>
              <HStack spacing="30px" w="100%">
                <Stack spacing="9px" align="center">
                  <Text color="gray.500">Unit price</Text>
                  <Text fontWeight="600">{formatAmountWithDecimal(unit?.price ?? '')}</Text>
                </Stack>

                {useAssignTo && allocationsLength > 0 ? (
                  <Stack spacing="9px" align="center">
                    <Text color="gray.500">Allocated unit</Text>
                    <AssignAllocationToEquity
                      unitInfo={unit}
                      equityId={equityId}
                      paymentDetails={paymentDetails}
                      ALLOCATIONS_PER_UNIT={ALLOCATIONS_PER_UNIT}
                    />
                  </Stack>
                ) : null}
              </HStack>
            </Stack>
          </HStack>
        </SimpleGrid>
      ) : null}
    </Box>
  );
}
