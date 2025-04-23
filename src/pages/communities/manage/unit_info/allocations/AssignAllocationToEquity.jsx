import {
  Stack,
  Text,
  Drawer,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Flex,
  useDisclosure,
  AbsoluteCenter,
  HStack,
  useToast,
  DrawerContent,
  Image,
  Box,
} from '@chakra-ui/react';
import React, {useState} from 'react';
import {Button} from 'ui-lib/ui-lib.components';
import {useMutation} from '@tanstack/react-query';
import {allocateUnitToEquity, deleteAllocationFromEquity} from '../../../../../apis/customers';
import {useRouter} from 'next/router';
import {AnimatedLoader} from '../../../../../components';
import emptyIcon from '/src/images/icons/emptyIcon.png';
import RadioButton from '/src/images/icons/radio_button.svg';
import RadioButtonChecked from '/src/images/icons/radio_button_checked.svg';
import {CiCircleInfo} from 'react-icons/ci';
import {AllocationConfirmation, activeBtnStyle, inActiveBtnStyle} from './allocationConfirmation';
import {IoArrowBackSharp} from 'react-icons/io5';

export const AssignAllocationToEquity = ({
  customerInfo,
  ALLOCATIONS_PER_UNIT,
  equityId,
  unitInfo,
  paymentDetails,
  ALLOCATION_MODAL,
}) => {
  const router = useRouter();
  const toast = useToast();
  const confirmationScreen = useDisclosure();
  const [option, setOption] = useState('available');
  const UNIT_ALLOCATIONS = ALLOCATIONS_PER_UNIT?.data && ALLOCATIONS_PER_UNIT?.data?.data?.data;
  const mutation = useMutation(formData => allocateUnitToEquity(formData), {
    onSuccess: res => {
      toast({
        duration: 4000,
        isClosable: true,
        position: 'top-right',
        render: () => (
          <Box color="white" borderRadius={12} p={4} bg="#191919">
            <Flex align={'center'} gap={'.5rem'}>
              <CiCircleInfo fontSize={20} />
              <Text>The unit has been succesfully assigned</Text>
            </Flex>
          </Box>
        ),
      });
      setTimeout(() => {
        router.reload();
      }, 2000);
    },
    onError: err => {
      console.log(err);
      toast({
        title: 'Request failed',
        description: err?.response?.data?.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
    },
  });

  const deleteAllocation = useMutation(formData => deleteAllocationFromEquity(formData), {
    onSuccess: res => {
      console.log(res);
      toast({
        duration: 4000,
        isClosable: true,
        position: 'top-right',
        render: () => (
          <Box color="white" borderRadius={12} p={4} bg="#191919">
            <Flex align={'center'} gap={'.5rem'}>
              <CiCircleInfo fontSize={20} />
              <Text>{res?.data?.message}</Text>
            </Flex>
          </Box>
        ),
      });
      setTimeout(() => {
        router.reload();
      }, 2000);
    },
    onError: err => {
      console.log(err);
      toast({
        title: 'Request failed',
        description: err?.response?.data?.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
    },
  });

  const EQUITY_UNIT = UNIT_ALLOCATIONS
    ? UNIT_ALLOCATIONS.filter(item => item.allocated && item.allocated_to?.id === equityId)[0]
    : null;

  const AVAILABLE_ALLOCATIONS = UNIT_ALLOCATIONS
    ? UNIT_ALLOCATIONS?.filter(item => !item.allocated_to && !item.archived)
    : null;

  const ARCHIVED = UNIT_ALLOCATIONS
    ? UNIT_ALLOCATIONS?.filter(item => !item.allocated_to && item.archived)
    : null;
  const [selectedAllocation, setSelectedAllocation] = useState(
    EQUITY_UNIT?.name ? [EQUITY_UNIT?.name] : []
  );

  const handleAllocationSelection = allocation => {
    if (selectedAllocation.includes(allocation)) {
      setSelectedAllocation(selectedAllocation.filter(selected => selected !== allocation));
    } else if (selectedAllocation.length < 1) {
      setSelectedAllocation([allocation]);
    }
  };

  const handleSubmitAllocation = () => {
    mutation.mutate({
      allocation: selectedAllocation[0],
      equity_id: equityId,
    });
  };

  const deleteEquity = () => {
    deleteAllocation.mutate(equityId);
  };

  EQUITY_UNIT &&
    (EQUITY_UNIT?.archived ? ARCHIVED.push(EQUITY_UNIT) : AVAILABLE_ALLOCATIONS.push(EQUITY_UNIT));
  const DISPLAY_DATA = option == 'available' ? AVAILABLE_ALLOCATIONS : ARCHIVED;

  const isDisabled = EQUITY_UNIT?.name
    ? selectedAllocation[0] === EQUITY_UNIT?.name
    : !selectedAllocation.length;

  return (
    <div>
      {EQUITY_UNIT ? (
        <Text color={'#606060'} fontSize={14}>
          {EQUITY_UNIT?.name}
        </Text>
      ) : (
        <Text color="#606060" fontSize="10px" fontWeight="400">
          Allocate a property unit to a subscriber manually
        </Text>
      )}
      <Drawer isOpen={ALLOCATION_MODAL?.isOpen} onClose={ALLOCATION_MODAL?.onClose}>
        <DrawerOverlay bg="rgba(0,0,0,0.1)" />
        <DrawerContent mt="65px" maxW="450px" bg="#fff" py="15.23px" pt="0px">
          <DrawerCloseButton top={'1rem'} />
          <DrawerHeader bg="#f5f5f5">
            <Flex alignItems={'center'} gap={'1rem'}>
              <IoArrowBackSharp
                fontSize="20px"
                cursor="pointer"
                onClick={ALLOCATION_MODAL?.onClose}
              />
              <Text>Unit Allocation</Text>
            </Flex>
          </DrawerHeader>
          {ALLOCATIONS_PER_UNIT.isLoading ? (
            <AnimatedLoader />
          ) : (
            <DrawerBody maxH="1018px" h={'fit-content'} overflowY={'auto'}>
              <Text color="#191919" mb="8px">
                Assign unit from
              </Text>
              <HStack
                align="center"
                pb="20px"
                spacing="20px"
                as="div"
                role="group"
                aria-labelledby="my-radio-group"
              >
                <Button
                  onClick={() => setOption('available')}
                  mt={0}
                  variant="dark"
                  bg={'#F5F5F5'}
                  color={'#191919'}
                  borderRadius="28px"
                  display="flex"
                  gap="10px"
                  px={4}
                  w="fit-content"
                  h="39px"
                  py={0}
                >
                  <Text
                    position={'relative'}
                    fontWeight={400}
                    fontSize={'14px'}
                    display={'flex'}
                    align={'center'}
                    gap="5px"
                  >
                    Available
                  </Text>
                  <Image
                    src={option === 'available' ? RadioButtonChecked.src : RadioButton.src}
                    alt=""
                  />
                </Button>

                <Button
                  onClick={() => setOption('archive')}
                  mt={0}
                  variant="dark"
                  bg={'#F5F5F5'}
                  color={'#191919'}
                  px={4}
                  w="fit-content"
                  borderRadius="28px"
                  display="flex"
                  gap="10px"
                  h="39px"
                  py={0}
                >
                  <Text
                    position={'relative'}
                    fontWeight={400}
                    fontSize={'14px'}
                    display={'flex'}
                    align={'center'}
                    gap="5px"
                  >
                    Archived
                  </Text>
                  <Image
                    src={option === 'archive' ? RadioButtonChecked.src : RadioButton.src}
                    alt=""
                  />
                </Button>
              </HStack>

              {DISPLAY_DATA?.length ? (
                <Stack
                  spacing="15px"
                  bg="#F5F5F5"
                  p="10px 15px"
                  borderRadius={'14px'}
                  overflowY={'scroll'}
                  maxHeight={{base: '45vh', '2xl': '62.5vh'}}
                  gap={'8px'}
                >
                  <Text
                    fontWeight={'500'}
                    color="#191919"
                    pb="6px"
                    borderBottom="2px solid #E3E3E3"
                  >
                    Allocations
                  </Text>
                  {DISPLAY_DATA?.sort((a, b) => {
                    if (a?.name === EQUITY_UNIT?.name && !(b?.name === EQUITY_UNIT?.name)) {
                      return -1;
                    }

                    if (b?.name === EQUITY_UNIT?.name && !(a?.name === EQUITY_UNIT?.name)) {
                      return 1;
                    }

                    return 0;
                  })?.map((item, i) => (
                    <Flex
                      key={i}
                      w="full"
                      p="8px 2px"
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                      borderBottom="2px solid #E3E3E3"
                    >
                      <Text fontSize="14px" fontWeight="400" color="#191919">
                        {item?.name}
                      </Text>
                      {selectedAllocation.includes(item?.name) ? (
                        <Button
                          {...activeBtnStyle}
                          onClick={() => handleAllocationSelection(item?.name)}
                        >
                          Selected
                        </Button>
                      ) : (
                        <Button
                          {...inActiveBtnStyle}
                          onClick={() => handleAllocationSelection(item?.name)}
                        >
                          Select
                        </Button>
                      )}
                    </Flex>
                  ))}
                </Stack>
              ) : (
                <AbsoluteCenter>
                  <Stack spacing="none" align="center">
                    <Image alt="empty table icon" w="50px" h="60px" src={emptyIcon.src} />
                    <Text fontWeight={700} fontSize={25} color={'#606060'}>
                      Nothing Found
                    </Text>
                    <Text w="300px" mt="6px" textAlign={'center'} color={'#606060'}>
                      There{' '}
                      {option === 'available'
                        ? 'are no available allocations'
                        : 'is no unit in your archive'}
                    </Text>
                  </Stack>
                </AbsoluteCenter>
              )}
            </DrawerBody>
          )}
          <Stack>
            {DISPLAY_DATA?.length > 0 && (
              <Button
                mx="auto"
                variant="dark"
                display="flex"
                width="350px"
                padding="12.993px"
                justifyContent="center"
                alignItems="center"
                gap="8.121px"
                mb="15px"
                onClick={confirmationScreen.onOpen}
                isDisabled={isDisabled}
                borderRadius='full'
              >
                Proceed
              </Button>
            )}
            <AllocationConfirmation
              confirmationScreen={confirmationScreen}
              allocation={selectedAllocation.toString()}
              customerInfo={customerInfo}
              handleSubmitAllocation={handleSubmitAllocation}
              deleteAllocation={deleteEquity}
              mutation={mutation}
              previousAllocation={EQUITY_UNIT?.name}
            />
          </Stack>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default AssignAllocationToEquity;
