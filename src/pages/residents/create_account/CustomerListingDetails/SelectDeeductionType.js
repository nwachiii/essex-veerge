/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  HStack,
  Stack,
  Text,
  useDisclosure,
  useToast,
  Image,
  Select,
  Heading,
} from '@chakra-ui/react';
import {useMutation, useQuery} from '@tanstack/react-query';
import {Field} from 'formik';
import React, {useEffect, useState} from 'react';
import {fetchAllocatedEquityInfo, fetchAllocationsPerUnit} from '../../../../apis/customers';
import {FaAngleRight, FaInfoCircle} from 'react-icons/fa';
import {GoTriangleRight} from 'react-icons/go';
import {InfoOutlineIcon} from '@chakra-ui/icons';
import {AllocationStatus} from '../../../customers/manage/unit_info/allocations/manage';
import dropDownIcon from '/src/images/icons/dropDownForRoleSelection.svg';
import InfoIcon from '@/components/assets/infoIcon';

export const SelectDeeductionType = ({index, labelStyles, selectStyles}) => {
  return (
    <Box>
      <label htmlFor={`equities.${index}.bundle.deduct_from`}>
        <Text pb="8.92px" color="#191919" fontWeight={'500'} fontSize="14px" lineHeight="22.5px">
          Assign unit from
        </Text>
      </label>
      <Box>
        <Field
          // className="formik__field"
          as={Select}
          border="1px solid #E4E4E4"
          icon={<Image src={dropDownIcon.src} alt="drop down icon" />}
          name={`equities.${index}.bundle.deduct_from`}
          placeholder=""
          fontSize="14px"
          fontWeight="500"
          color="#3D3D3D"
          maxW="390px"
          w="full"
          h="34.888px"
          borderRadius="6.491px"
        >
          <option disabled value="default">
            Select allocation from
          </option>
          <option value="available">Available units</option>
          <option value="archive">Archived units</option>
        </Field>
      </Box>
    </Box>
  );
};

export default SelectDeeductionType;

export const SelectAllocation = ({
  index,
  Unit,
  allocationSrc,
  selectStyles,
  labelStyles,
  labelSpanStyles,
  labelWrapperStyles,
  selectedAllocation,
}) => {
  const ALLOCATION_MODAL = useDisclosure();
  const [CAN_SELECT_ALLOCATIONS, setCanSelectAllocations] = useState([]);

  const FETCH_UNIT_ALLOCATION_INFO = useQuery(['allocations-per-unit'], () =>
    fetchAllocationsPerUnit(Unit?.id)
  );

  const UNIT_ALLOCATIONS =
    FETCH_UNIT_ALLOCATION_INFO?.data && FETCH_UNIT_ALLOCATION_INFO?.data?.data?.data;

  useEffect(() => {
    let allocations;
    const ARCHIVED = UNIT_ALLOCATIONS
      ? UNIT_ALLOCATIONS?.filter(item => item.archived == true && item.allocated_to == null)
      : null;
    const AVAILABLE_ALLOCATIONS = UNIT_ALLOCATIONS
      ? UNIT_ALLOCATIONS?.filter(item => item.allocated == false && !item.archived)
      : null;

    console.log({AVAILABLE_ALLOCATIONS});

    if (allocationSrc === 'available') {
      allocations = AVAILABLE_ALLOCATIONS;
    } else if (allocationSrc === 'archive') {
      allocations = ARCHIVED;
    } else {
      allocations = FETCH_UNIT_ALLOCATION_INFO?.data?.data?.data || []; //Handle potential null
    }

    setCanSelectAllocations(allocations);
  }, [allocationSrc, FETCH_UNIT_ALLOCATION_INFO.isLoading]);

  const customScrollbarStyles = {
    '&::-webkit-scrollbar': {
      width: '4px',
      borderRadius: '16px',
    },
    '&::-webkit-scrollbar-track': {
      borderRadius: '16px',
      WebkitBoxShadow: 'inset 0 0 6px #cbcbcb',
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '16px',
      backgroundColor: '#fff',
      // outline: '1px solid slategrey', // You can include this line if needed
    },
  };

  const allocationArray = [
    ...(CAN_SELECT_ALLOCATIONS?.length ? CAN_SELECT_ALLOCATIONS : []),
    ...(selectedAllocation ? [{title: 'selected allocation', name: selectedAllocation ?? ''}] : []),
  ];

  return (
    <Box position={'relative'}>
      <HStack spacing="8.7px" justify="start" pb="8.92px">
        <Text
          as="label"
          pb="0px"
          color="#191919"
          fontWeight={'500'}
          fontSize="14px"
          htmlFor={`equities.${index}.bundle.allocation`}
        >
          Allocate a unit{' '}
          <Text as="span" color="#606060" fontWeight={'500'} fontSize="14px">
            (Optional)
          </Text>
        </Text>
        <Flex color="#4545FE" align="center" onClick={ALLOCATION_MODAL.onOpen}>
          <span style={{fontSize: '14px', marginLeft: '1em', cursor: 'pointer'}}>View </span>
          <GoTriangleRight />
        </Flex>
      </HStack>
      <Box>
        <Field
          // className="formik__field"
          as={Select}
          border="1px solid #E4E4E4"
          icon={<Image src={dropDownIcon.src} alt="drop down icon" />}
          name={`equities.${index}.bundle.allocation`}
          // placeholder="Allocate a unit"
          fontSize="14px"
          fontWeight="500"
          color="#3D3D3D"
          maxW="390px"
          w="full"
          h="34.888px"
          borderRadius="6.491px"
        >
          <option disabled value="">
            {CAN_SELECT_ALLOCATIONS?.length ? `Select allocation` : 'No units found.'}
          </option>
          {
            // CAN_SELECT_ALLOCATIONS?
            allocationArray?.map((item, indx) => (
              <option key={indx} value={item?.name}>
                {item?.name}
              </option>
            ))
          }
        </Field>
      </Box>
      <Drawer isOpen={ALLOCATION_MODAL.isOpen} placement="right" onClose={ALLOCATION_MODAL.onClose}>
        <DrawerOverlay bg="rgba(0,0,0,0.1)" />
        <DrawerContent mt="65px" minW="400px">
          <Stack
            spacing="7.5px"
            p="10px 12.352px 9px 20.746px"
            bg="#FBFCFC"
            boxShadow="0px 3.206px 6.413px 0px rgba(0, 0, 0, 0.02)"
          >
            <HStack w="full" justify="space-between">
              <Heading fontSize="18px" fontWeight="500">
                Allocated Units
              </Heading>
              <DrawerCloseButton position="initial" />
            </HStack>

            <HStack spacing="4px">
              {/* <InfoOutlineIcon bg="#FFFFFF" color="gray" /> */}
              <InfoIcon />
              <Text
                fontSize={'12px'}
                fontWeight={'300'}
                color={'#606060'}
              >{`Kindly note that allocation is at ${FETCH_UNIT_ALLOCATION_INFO?.data?.data?.milestone}% payment milestone`}</Text>
            </HStack>
          </Stack>
          <DrawerBody p="20px 20.746px" mr="2px" sx={customScrollbarStyles}>
            <Stack>
              {UNIT_ALLOCATIONS?.map((item, i) => (
                <Flex
                  key={i}
                  borderBottom="1px solid #F5F5F5"
                  w="full"
                  pb="8px"
                  direction="row"
                  mb="23px"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Text
                    fontSize="12.244px"
                    fontWeight="400"
                    textTransform="capitalize"
                    color="#191919"
                  >{`${item?.name ?? ''}`}</Text>
                  <AllocationStatus allocation={item} />
                </Flex>
              ))}
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};
