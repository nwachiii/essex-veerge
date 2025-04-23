// import { customScrollbarStyles } from "@/components/common/Calendar/DatePicker"
import {AnimatedLoader} from '@/components/common/loaders';
import {
  AbsoluteCenter,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  Flex,
  HStack,
  Heading,
  Image,
  Stack,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import emptyIcon from '/src/images/icons/emptyIcon.png';

import {useQuery} from '@tanstack/react-query';
import {fetchAllocationsPerUnit} from 'apis/customers';
import {fetchFractionalGrouping} from 'apis/listings';
import AssignAllocationToEquity from 'pages/customers/manage/unit_info/allocations/AssignAllocationToEquity';
import {useState} from 'react';
import {IoArrowBackSharp} from 'react-icons/io5';
import backIcon from '/src/images/icons/backArrowForDrawer.svg';

export const UnitAllocationDrawer = ({
  unitInfo,
  handleScreen,
  fractionalInfo,
  customScrollbarStyles,
}) => {
  const [selectedGroup, setSelectedGroup] = useState({});
  const UnitAllocation = useDisclosure();
  const FRACTIONAL_GROUPING_QUERY = useQuery(['fractional-grouping ?purchased=true'], () =>
    fetchFractionalGrouping(`${Number(unitInfo?.id)}?purchased=true`)
  );

  const ALLOCATIONS_PER_UNIT = useQuery(['allocation-per-unit', Number(unitInfo?.id)], () =>
    fetchAllocationsPerUnit(Number(unitInfo?.id))
  );

  const FRACTIONAL_GROUPING_DATA =
    FRACTIONAL_GROUPING_QUERY?.data && FRACTIONAL_GROUPING_QUERY?.data?.data?.data?.length
      ? FRACTIONAL_GROUPING_QUERY?.data?.data?.data
      : [];

  const serialNumbering = arg => {
    return `${arg <= 9 ? 0 : ''}${arg}`;
  };

  const handleSelectGroup = (indx, grp) => {
    const copy = [...FRACTIONAL_GROUPING_DATA];
    for (let i = 0; i < copy.length; i++) {
      if (i == indx) {
        setSelectedGroup({id: `Unit ${serialNumbering(indx + 1)}`, group: grp});
      }
    }
    UnitAllocation.onOpen();
  };
  // console.log(selectedGroup);
  return (
    <>
      <DrawerContent
        p="0px"
        bg="#fff"
        zIndex={100}
        mt="65.12px"
        position="relative"
        minW="fit-content"
        sx={customScrollbarStyles}
      >
        {/* <DrawerCloseButton top={'1rem'} />
        <DrawerHeader bg="#f5f5f5">Unit Allocation</DrawerHeader> */}
        <HStack
          py="30px"
          h="49.699px"
          bg="#F5F5F5"
          px="25px"
          justify="space-between"
          align="center"
          position="relative"
        >
          <Flex gap={'5px'} align={'center'}>
            <Image
              alt="back icon"
              cursor="pointer"
              src={backIcon.src}
              onClick={handleScreen('options')}
            />
            <Heading fontSize="18.9px" fontWeight="700">
              Unit Allocation
            </Heading>
          </Flex>
          <HStack spacing="15px">
            <VStack
              position="relative"
              justify="center"
              align="center"
              w="30px"
              h="30px"
              borderRadius="5px"
              transition="0.3s ease-in-out"
              _hover={{
                width: '30px',
                height: '30px',
              }}
            >
              <DrawerCloseButton right="0px" left="0px" my="auto" color="#000" top="0" bottom="0" />
            </VStack>
          </HStack>
        </HStack>
        <DrawerBody sx={customScrollbarStyles} paddingTop="1rem" mr="2px" w="400px">
          {FRACTIONAL_GROUPING_QUERY?.isLoading ? (
            <AnimatedLoader />
          ) : FRACTIONAL_GROUPING_QUERY?.isError ? (
            err => toastForError(err, true, toast)
          ) : FRACTIONAL_GROUPING_DATA ? (
            <Stack>
              {FRACTIONAL_GROUPING_DATA.length ? (
                FRACTIONAL_GROUPING_DATA.map((item, idx) => (
                  <Flex
                    key={idx}
                    width="350px"
                    padding="24px"
                    cursor={'pointer'}
                    alignItems="center"
                    borderRadius="8px"
                    background="#F8F8F8"
                    justify="space-between"
                    onClick={() => handleSelectGroup(idx, item?.id)}
                  >
                    <Text
                      color="#191919"
                      fontSize="14px"
                      fontWeight="500"
                      fontStyle="normal"
                      lineHeight="normal"
                    >{`Unit ${serialNumbering(idx + 1)}`}</Text>
                    <Text
                      color="#3D3D3D"
                      fontSize="14px"
                      fontWeight="400"
                      fontStyle="normal"
                      lineHeight="normal"
                    >
                      {item?.allocation ? item.allocation : 'Not Allocated Yet'}
                    </Text>
                  </Flex>
                ))
              ) : (
                <VStack w="full" justify="center" align="center" h="70vh">
                  <Image src={emptyIcon.src} alt="empty icon" />
                  <Text fontSize={'20px'} mt="10px" color={'#606060'} fontWeight={'700'}>
                    Nothing Found
                  </Text>
                  <Text
                    w="full"
                    textAlign="center"
                    fontSize="13px"
                    fontWeight="400"
                    mt="-5px"
                    mx="auto"
                    color={'#606060'}
                  >
                    No units qualify for allocation.
                  </Text>
                </VStack>
              )}
            </Stack>
          ) : null}
        </DrawerBody>
      </DrawerContent>
      <AssignAllocationToEquity
        ALLOCATIONS_PER_UNIT={ALLOCATIONS_PER_UNIT}
        ALLOCATION_MODAL={UnitAllocation}
        equityId={selectedGroup?.group}
        customerInfo={selectedGroup?.id}
      />
    </>
  );
};
