import Head from 'next/head';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {useQuery} from '@tanstack/react-query';
import {themeStyles} from '../../../../../theme';
import backArrow from '/src/images/icons/back-arrow.png';
import React, {Fragment, useState} from 'react';
import {LayoutView} from '/src/components/PageLayout/LayoutView';
import {fetchAllocationsImages, fetchAllocationsPerUnit} from '../../../../../apis/customers';
import {
  Box,
  Flex,
  HStack,
  Heading,
  Image,
  StackDivider,
  Tag,
  TagLabel,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react';
import {AnimatedLoader} from '../../../../../components/common/loaders';
import {ModifyAllocations} from './ModifyAllocations';
import {fetchAllBundlePaymentPlan} from '../../../../../apis/listings';
import UnitInfoForAllocation from '../../allocations/manage_allocated_units/UnitInfoForAllocation';
import AllocationImageGallery from '../../allocations/manage_allocated_units/Gallery';

export const ManageAllocations = () => {
  const router = useRouter();
  const toast = useToast();
  const bundleId = Number(router?.query?.id);
  const ALLOCATIONS_PER_UNIT = useQuery(['allocation-per-unit', bundleId], () =>
    fetchAllocationsPerUnit(bundleId)
  );

  const FETCH_ALLOCATIONS_IMAGES = useQuery(['fetch-allocation-images', bundleId], () =>
    fetchAllocationsImages(bundleId)
  );

  const FETCH_UNIT_INFO = useQuery(['fetch-unit-info', bundleId], () =>
    fetchAllBundlePaymentPlan(bundleId)
  );

  const ALLOCATIONS_IMAGES =
    FETCH_ALLOCATIONS_IMAGES?.data &&
    FETCH_ALLOCATIONS_IMAGES?.data?.data?.map(item => item.image_file);

  const [activeImg, setActiveImg] = useState(null);
  const UNIT_INFO = FETCH_UNIT_INFO?.data && FETCH_UNIT_INFO?.data?.data?.results[0]?.bundle;

  const UNIT_ALLOCATIONS = ALLOCATIONS_PER_UNIT?.data && ALLOCATIONS_PER_UNIT?.data?.data?.data;

  return (
    <Box bg="#FAFAFA" minH="100vh" h="fit-content">
      <Head>
        <title>Unit | Manage Allocations</title>
        <meta name="description" content="Unit | Manage Allocations" />
        <meta name="theme-color" content="#FFFFFF" />
        <Link rel="icon" href="/favicon.ico" />
      </Head>
      <LayoutView activePage="listings" />
      <Box mt="-85.3vh" maxW="1280px" mx="auto" pb="80px">
        {ALLOCATIONS_PER_UNIT?.isLoading ||
        FETCH_ALLOCATIONS_IMAGES?.isLoading ||
        !bundleId ||
        FETCH_UNIT_INFO?.isLoading ? (
          <AnimatedLoader />
        ) : ALLOCATIONS_PER_UNIT?.isError ? (
          toast({
            title: 'Request failed',
            description: `An error occured while fetching`,
            status: 'error',
            duration: 3000,
            isClosable: true,
            position: 'top-right',
          })
        ) : (
          <Fragment>
            <HStack w="100%" justify="space-between" mt={6}>
              <HStack onClick={() => router.back(-1)}>
                <Image
                  style={{cursor: 'pointer'}}
                  mr={2}
                  height="50px"
                  w="50px"
                  src={backArrow.src}
                  alt="back_arrow"
                />
                <Heading {...themeStyles.textStyles.h3}>Manage allocated units</Heading>
              </HStack>
              <ModifyAllocations unitId={bundleId} />
            </HStack>
            <Box
              p={'25px'}
              borderRadius="16px"
              border={'1px solid #E4E4E4'}
              mt={'30px'}
              maxW={'1100px'}
              mx="auto"
            >
              <HStack align={'flex-start'} gap={'50px'}>
                <VStack align={'flex-start'} gap={'16px'}>
                  <UnitInfoForAllocation
                    isUnitView
                    unitInfo={UNIT_INFO}
                    allocations={UNIT_ALLOCATIONS}
                  />
                  <AllocationImageGallery
                    activeImg={activeImg}
                    uploads={ALLOCATIONS_IMAGES}
                    setActiveImg={setActiveImg}
                  />
                </VStack>
                <VStack
                  w={'full'}
                  h={'fit-content'}
                  overflowY={'auto'}
                  p={'20px 24px'}
                  bg="#F5F5F5"
                  borderRadius={'16px'}
                  position={'relative'}
                  align={'flex-start'}
                >
                  <Text
                    position={'sticky'}
                    borderBottom="1px solid #E4E4E4"
                    fontSize="18px"
                    fontWeight="500"
                    pb="17.5px"
                    // lineHeight="23px"
                    w={'full'}
                  >
                    Unit Allocation
                  </Text>
                  <VStack
                    w={'full'}
                    // maxH="75vh"
                    // overflowY={'auto'}
                    mt="10px"
                    divider={<StackDivider color={'#E4E4E4'} />}
                    sx={{
                      '&::-webkit-scrollbar': {
                        width: '10px',
                      },
                      '&::-webkit-scrollbar-track': {
                        backgroundColor: '#f5f5f5',
                      },
                      '&::-webkit-scrollbar-thumb': {
                        backgroundColor: 'rgba(25, 25, 25, 0.30)',
                        borderRadius: '32px',
                      },
                    }}
                  >
                    {UNIT_ALLOCATIONS.map((check, i) => (
                      <Flex
                        key={i}
                        // borderBottom="2px solid #E3E3E3"
                        w="full"
                        py="24px"
                        direction="row"
                        // mb="23px"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Text
                          fontSize="14px"
                          fontWeight="400"
                          color="#191919"
                        >{`${UNIT_ALLOCATIONS[i]?.name}`}</Text>
                        <AllocationStatus allocation={UNIT_ALLOCATIONS[i]} />
                      </Flex>
                    ))}
                  </VStack>
                </VStack>
              </HStack>
            </Box>
          </Fragment>
        )}
      </Box>
    </Box>
  );
};

export default ManageAllocations;

export const AllocationStatus = ({allocation}) => {
  const ALLOCATION_OWNER = allocation?.allocated_to?.customer;

  return (
    <Fragment>
      {allocation?.allocated == true ? (
        <HStack textAlign={'left'} spacing="11px">
          <Image
            alt=""
            borderRadius="full"
            height="29.079px"
            width="29.079px"
            src={ALLOCATION_OWNER?.avatar}
          />
          <Text pr="7px" fontSize="10.713px" wordwrap={'break-word'}>
            {`${ALLOCATION_OWNER?.first_name ?? ''} ${ALLOCATION_OWNER?.last_name ?? ''}`}
          </Text>
        </HStack>
      ) : allocation?.archived == false ? (
        <Text
          color="#4545FE"
          fontFamily="Euclid Circular B"
          fontSize="12.244px"
          fontStyle="normal"
          fontWeight="400"
        >
          Available
        </Text>
      ) : allocation?.archived == true ? (
        <Text
          color="#919191"
          fontFamily="Euclid Circular B"
          fontSize="12.244px"
          fontStyle="normal"
          fontWeight="400"
        >
          Archived
        </Text>
      ) : allocation?.allocated_to?.equity?.type === 'FRACTIONAL' ? (
        <Tag
          padding="6.122px 9.948px"
          bg="#FF91031A"
          borderRadius="full"
          variant="solid"
          color="#1D6169"
          h="28.24px"
          fontSize="12.244px"
          fontWeight="500"
        >
          <TagLabel>Fractional</TagLabel>
        </Tag>
      ) : null}
    </Fragment>
  );
};
