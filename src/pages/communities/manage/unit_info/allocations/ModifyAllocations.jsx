import React, {useState} from 'react';
import {Button, Input} from '../../../../../ui-lib';
import {
  Box,
  Flex,
  Image,
  Spinner,
  Stack,
  Text,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  useToast,
  VStack,
  Center,
  HStack,
} from '@chakra-ui/react';
import infoIcon from '/src/images/icons/Info-circle.svg';
import {AnimatedLoader} from '../../../../../components';
import {useMutation, useQuery} from '@tanstack/react-query';
import {updatePaymentMilestone} from '../../../../../apis/customers';
import {fetchAllBundlePaymentPlan} from '../../../../../apis/listings';
import smartAllocationIcon from '/src/images/icons/cloud-change.svg';
import assignUnitIcon from '/src/images/icons/assign-unit.svg';
import changeMilestoneIcon from '/src/images/icons/convert-card.svg';

import modifyIcon from '/src/images/icons/modify-icon.svg';
import {ChevronRightIcon} from '@chakra-ui/icons';
import BackArrowIcon from '../../../../../components/assets/BackArrowIcon';
import {useRouter} from 'next/router';
import {MatadorCustomToast} from 'pages/veerge_menu/loop';
import {formatToCurrency} from 'utils/formatAmount';

export const ModifyAllocations = ({unitId}) => {
  const toast = useToast();
  const router = useRouter();
  const MODIFY_DRAWER = useDisclosure();
  const SWITCH_ALLOCATION_DRAWER = useDisclosure();
  const CHANGE_MILESTONE = useDisclosure();
  const FETCH_UNIT_INFO = useQuery(['fetch-unit-info', unitId], () =>
    fetchAllBundlePaymentPlan(unitId)
  );
  const unitInfo = FETCH_UNIT_INFO?.data && FETCH_UNIT_INFO?.data?.data?.results[0]?.bundle;
  const [mileStone, setMileStone] = useState(unitInfo?.allocation_milestone);

  // console.log('CHEECK HEEREE', unitInfo, mileStone);

  const modifyAllocationMutation = useMutation(data => updatePaymentMilestone(data), {
    onSuccess: res => {
      console.log(res);
      toast({
        title: `Updated Successfully`,
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
      setTimeout(() => {
        router.reload();
      }, 1400);
    },
    onError: err => {
      console.log(err);
      toast({
        title: `${err.response.data.message ?? err.response.data.email[0] ?? 'An error occured'}`,
        status: 'error',
        duration: 8000,
        isClosable: true,
        position: 'top-right',
      });
    },
  });

  const showAllocationMessage = () => {
    toast({
      render: () => (
        <MatadorCustomToast
          width="100%"
          background={'black'}
          description={
            <Text fontWeight={300} fontSize={16}>
              To allocate a unit to a subscriber, navigate to the overview page. In the portfolio
              section, select the specific property, and proceed to assign the unit.
            </Text>
          }
        />
      ),
      duration: 2500,
      isClosable: true,
      position: 'top-right',
    });
  };

  const handleEditMilestone = () => {
    modifyAllocationMutation.mutate({
      milestone: Number(mileStone),
      unit: Number(unitInfo?.id),
    });
  };
  return (
    <div>
      <Button
        onClick={() => MODIFY_DRAWER.onOpen()}
        mt={0}
        variant="primary"
        w="158px"
        h="48px"
        borderRadius="72px"
        leftIcon={<Image src={modifyIcon.src} alt="modify-allocations-icon" />}
      >
        Modify
      </Button>

      <Drawer isOpen={MODIFY_DRAWER.isOpen} placement="right" onClose={MODIFY_DRAWER.onClose}>
        <DrawerOverlay />
        <DrawerContent mt="65.12px" minW="410px">
          <DrawerCloseButton />
          <DrawerHeader>Modify allocation</DrawerHeader>
          <DrawerBody>
            <VStack w="full" spacing={'25px'}>
              <SwitchAllocationType
                isOpen={SWITCH_ALLOCATION_DRAWER.isOpen}
                onOpen={SWITCH_ALLOCATION_DRAWER.onOpen}
                onClose={SWITCH_ALLOCATION_DRAWER.onClose}
                switchAllocationMutation={modifyAllocationMutation}
                unitId={unitInfo?.id}
                unitAllocationType={unitInfo?.allocation_type?.toLowerCase()}
              />
              <ChangeMilestone
                isOpen={CHANGE_MILESTONE.isOpen}
                onOpen={CHANGE_MILESTONE.onOpen}
                onClose={CHANGE_MILESTONE.onClose}
                unitInfo={unitInfo}
                mileStone={mileStone}
                setMileStone={setMileStone}
                EditMilestoneMutation={modifyAllocationMutation}
                handleEditMilestone={handleEditMilestone}
                FETCH_UNIT_INFO={FETCH_UNIT_INFO}
                unitAllocationType={unitInfo?.allocation_type?.toLowerCase()}
              />
              <Box
                onClick={showAllocationMessage}
                cursor={'pointer'}
                borderRadius="12px"
                border="1px solid #E4E4E4"
                background="#FFF"
                display="flex"
                width="346px"
                padding="15px 11px"
                alignItems="flex-start"
                alignContent="flex-start"
                gap="11px"
                flexWrap="wrap"
              >
                <Image src={assignUnitIcon.src} alt="" />
                <Text
                  color="#191919"
                  fontFamily="Euclid Circular B"
                  fontSize="14px"
                  fontStyle="normal"
                  fontWeight="600"
                >
                  Assign a Unit
                </Text>
                <Text
                  color="#606060"
                  fontFamily="Euclid Circular B"
                  fontSize="10px"
                  fontStyle="normal"
                  fontWeight="400"
                >
                  Allocate a property unit to a subscriber manually
                </Text>
              </Box>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default ModifyAllocations;

// Switch Allocation Type
function SwitchAllocationType({
  isOpen,
  onOpen,
  onClose,
  unitId,
  unitAllocationType,
  switchAllocationMutation,
}) {
  const newType = unitAllocationType == 'manual' ? 'auto' : 'manual';
  const handleSwitchType = () => {
    switchAllocationMutation.mutate({
      allocation_type: newType,
      unit: Number(unitId),
    });
  };
  return (
    <>
      <Box
        cursor={'pointer'}
        onClick={onOpen}
        borderRadius="12px"
        border="1px solid #E4E4E4"
        background="#FFF"
        display="flex"
        width="346px"
        padding="15px 11px"
        alignItems="flex-start"
        alignContent="flex-start"
        gap="11px"
        flexWrap="wrap"
        position="relative"
      >
        <Image src={smartAllocationIcon.src} alt="" />
        <Text
          color="#191919"
          fontFamily="Euclid Circular B"
          fontSize="14px"
          fontStyle="normal"
          fontWeight="600"
        >
          {`Switch to ${unitAllocationType == 'manual' ? 'Smart' : 'Manual'} Allocation`}
        </Text>
        <Text
          color="#606060"
          fontFamily="Euclid Circular B"
          fontSize="10px"
          fontStyle="normal"
          fontWeight="400"
        >
          {`${
            unitAllocationType == 'manual'
              ? 'Transition from manual allocation to smart allocation, enabling subscribers to choose a unit in real-time.'
              : `Transition from smart allocation to manual allocation, subscribers won't have the capability to self-allocate units.`
          }`}
        </Text>
        <ChevronRightIcon
          fontSize="30px"
          color={'#E5E5E5'}
          position={'absolute'}
          top="14%"
          right="3%"
        />
      </Box>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        {/* <DrawerOverlay /> */}
        <DrawerContent minW="408px" mt="65.12px">
          <DrawerCloseButton mt={2} />
          <DrawerHeader bg="#F5F5F5" as={Flex} align="center" gap="10px">
            <BackArrowIcon cursor="pointer" onClick={onClose} />
            Switch Allocation Type
          </DrawerHeader>

          <DrawerBody>
            <Center width="366px" height="270px" mx="auto" mt="52px">
              <Stack
                align={'center'}
                justify={'center'}
                w="full"
                borderRadius="5px"
                border="1px solid #e5e5e5"
                h="full"
                px="15px"
              >
                <Text
                  color="#0D0D0D"
                  textAlign="center"
                  fontFamily="Euclid Circular B"
                  fontSize="16px"
                  fontStyle="normal"
                  fontWeight="500"
                  w="277px"
                >
                  {`Are you sure you want to switch to ${
                    unitAllocationType == 'manual' ? 'Smart' : 'Manual'
                  } Allocation?`}
                </Text>
                <Text
                  color="#606060"
                  textAlign="center"
                  fontFamily="Euclid Circular B"
                  fontSize="12px"
                  fontStyle="normal"
                  fontWeight="300"
                >
                  {`${
                    unitAllocationType == 'manual'
                      ? `This implies that you won't have the capability to allocate units.`
                      : `This implies that subscribers won't have the capability to self-allocate units, and manual allocation will be necessary on your part.`
                  }`}
                </Text>
                <HStack mt="18px" mx="auto" spacing={'18px'}>
                  <Button
                    onClick={onclose}
                    fontSize={'16px'}
                    fontWeight={'400'}
                    color="#FF6A6A"
                    display="flex"
                    width="150px"
                    padding="12.826px"
                    justifyContent="center"
                    alignItems="center"
                    gap="8.016px"
                    border="1px solid #FF6A6A"
                    borderRadius="72px"
                    background="#FFFFFF"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSwitchType}
                    fontSize={'16px'}
                    fontWeight={'400'}
                    color="#FFFFFF"
                    display="flex"
                    width="150px"
                    padding="12.826px"
                    justifyContent="center"
                    alignItems="center"
                    gap="8.016px"
                    borderRadius="72px"
                    background="#191919"
                  >
                    {switchAllocationMutation?.isLoading ? <Spinner color="#FFFFFF" /> : 'Yes'}
                  </Button>
                </HStack>
              </Stack>
            </Center>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

// Change Milestone component
function ChangeMilestone({
  isOpen,
  onOpen,
  onClose,
  unitInfo,
  mileStone,
  setMileStone,
  EditMilestoneMutation,
  handleEditMilestone,
  FETCH_UNIT_INFO,
}) {
  const MILESTONE_TARGET_AMOUNT = unitInfo
    ? formatToCurrency(Number((mileStone / 100) * unitInfo?.price))
    : null;

  const UNIT_PRICE = unitInfo ? formatToCurrency(Number(unitInfo?.price)) : 'unit price';
  return (
    <>
      <Box
        cursor={'pointer'}
        onClick={onOpen}
        borderRadius="12px"
        border="1px solid #E4E4E4"
        background="#FFF"
        display="flex"
        width="346px"
        padding="15px 11px"
        alignItems="flex-start"
        alignContent="flex-start"
        gap="11px"
        flexWrap="wrap"
        position="relative"
      >
        <Image src={changeMilestoneIcon.src} alt="" />
        <Text
          color="#191919"
          fontFamily="Euclid Circular B"
          fontSize="14px"
          fontStyle="normal"
          fontWeight="600"
        >
          Change Milestone
        </Text>
        <Text
          color="#606060"
          fontFamily="Euclid Circular B"
          fontSize="10px"
          fontStyle="normal"
          fontWeight="400"
        >
          Adjust the payment milestone, impacting only subscribers who have not yet been allocated.
        </Text>
        <ChevronRightIcon
          fontSize="30px"
          color={'#E5E5E5'}
          position={'absolute'}
          top="14%"
          right="3%"
        />
      </Box>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        {/* <DrawerOverlay /> */}
        <DrawerContent minW="410px" mt="65.12px">
          <DrawerCloseButton mt={2} />
          <DrawerHeader bg="#F5F5F5" as={Flex} align="center" gap="10px">
            <BackArrowIcon cursor="pointer" onClick={onClose} />
            Change Milestone
          </DrawerHeader>

          <DrawerBody>
            {FETCH_UNIT_INFO?.isLoading ? (
              <AnimatedLoader />
            ) : (
              <Stack h={'full'} justify={'space-between'} align="center">
                <Box mt="20px">
                  <Text
                    color="#191919"
                    fontFamily="Euclid Circular B"
                    fontSize="12px"
                    fontStyle="normal"
                    fontWeight="300"
                  >
                    At what payment milestone do you want allocation to take place?
                  </Text>
                  <Input
                    color="#191919"
                    mb={4}
                    mt={2}
                    w="full"
                    borderRadius="10px"
                    type="input"
                    id="allocation_milestone"
                    name="allocation_milestone"
                    onChange={e => {
                      const value = e.target.value;
                      if (value === '' || (value <= 100 && value >= 1)) {
                        setMileStone(value);
                      }
                    }}
                    value={mileStone}
                    fontSize={'16px'}
                  />

                  <Flex gap="4px">
                    <Image alt="" filter="brightness(0) invert(0.65)" src={infoIcon.src} />
                    <Text
                      color="#606060"
                      fontFamily="Euclid Circular B"
                      fontSize="12px"
                      fontWeight="400"
                    >
                      This means when {`${mileStone}%`} (
                      <Text as="span" fontWeight={600}>
                        {MILESTONE_TARGET_AMOUNT}
                      </Text>
                      ) out of{' '}
                      <Text as="span" fontWeight={600}>
                        {UNIT_PRICE}
                      </Text>{' '}
                      has been paid for{' '}
                      <Text as="span" fontWeight={600}>
                        {unitInfo?.unit_title}
                      </Text>
                      , a property subscriber will be eligible for allocation.
                    </Text>
                  </Flex>
                </Box>
                <Button
                  mt="30px"
                  onClick={handleEditMilestone}
                  variant="primary"
                  padding="16px"
                  borderRadius="72px"
                  background="#191919"
                  w="full"
                  alignSelf="flex-end"
                  h="55px"
                >
                  {EditMilestoneMutation.isLoading ? <Spinner color="#FFFFFF" /> : `Proceed`}
                </Button>
              </Stack>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
