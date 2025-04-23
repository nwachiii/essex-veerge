import React from 'react';
import {
  Box,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  HStack,
  Text,
  VStack,
  Image,
  useDisclosure,
  Stack,
} from '@chakra-ui/react';
import {IoArrowBackSharp} from 'react-icons/io5';

import home_owners_icon from '/src/images/icons/home_owners_packet_icon.svg';
import suspend_icon from '/src/images/icons/suspend_transaction_icon.svg';
import terminate_icon from '/src/images/icons/terminate_transaction_icon.svg';
import updateDepositIcon from '/src/images/icons/update_deposit_transactionIcon.svg';
import transferOwnershipIcon from '/src/images/icons/transferOwnershipIcon.svg';
import additionalClosingCostIcon from '/src/images/icons/additionalClosingCostIcon.svg';

import refund_icon from '/src/images/icons/refundIcon.svg';
import more_funds_icon from '/src/images/icons/more_funds.svg';
import assignUnitIcon from '/src/images/icons/assign-unit.svg';
import assignAgentTag from '/src/images/icons/assignAgentTag.svg';
import paymentBreakdownIcon from '/src/images/icons/paymentBreakdownReceiptIcon.svg';
import restructureTransactionIcon from '/src/images/icons/restructureTransactionIcon.svg';
import HomeOwnersPacket from '../../homeownersPacket.js';
import AssignAllocationToEquity from 'pages/customers/manage/unit_info/allocations/AssignAllocationToEquity.jsx';
import {useQuery} from '@tanstack/react-query';
import {fetchAllocationsPerUnit} from 'apis/customers.js';

import {TerminateDrawer} from '../../terminateDrawer/index.js';
import {RefundDrawer} from '../../refundDrawer/index.js';
import {RequestFundsDrawer} from '../../usersTransactionDrawer/requestFunds.js';
import UpdateDeposit from '../updateDeposit/index.js';
import Link from 'next/link.js';
import TransFerOwnershipDrawer from '../../transferownership/index.jsx';
import {useRouter} from 'next/router.js';
import EquityPaymentBreakdownDrawer from '../paymentBreakdown/index.js';
import {SuspendDrawer} from '../../suspendTransaction/index.jsx';
import {AdditionalClosingCostDrawer} from '../../additionalClosingCost/index.jsx';
import SuspendIcon from '@/components/assets/suspendIcon.jsx';
import AssignAgentDrawer from '../assignAgent/index.js';

const MoreOptionsDrawer = ({
  customerInfo,
  isFractional,
  equityRefetch,
  userId,
  mainRefetch,
  leadDrawerHandleClose,
  projectId,
  equityInfo,
  unit,
  equityId,
  modalDisclosure,
  isRealtorSubscriber,
}) => {
  const handleClose = () => {
    return modalDisclosure.onClose();
  };
  const handleHomeOwners = useDisclosure();
  const assignAgentDisclosure = useDisclosure();
  const assignUnit = useDisclosure();
  const suspendModal = useDisclosure();
  const terminateModal = useDisclosure();
  const addClosingCostDisclosure = useDisclosure();
  const refundModal = useDisclosure();
  const requestFundsModal = useDisclosure();
  const updateDeposit = useDisclosure();
  const paymentBreakdownDisclosure = useDisclosure();
  const transferFractionalOwnershipDisclosure = useDisclosure();
  const router = useRouter();

  const bundleId = unit?.unit_id ? Number(unit?.unit_id) : Number(unit?.id);
  const ALLOCATIONS_PER_UNIT = useQuery(['allocation-per-unit', bundleId], () =>
    fetchAllocationsPerUnit(bundleId)
  );
  const handleNavigation = () => {
    if (isFractional) {
      transferFractionalOwnershipDisclosure.onOpen();
    } else {
      router.push(
        `/transferOfOwnership?id=${equityId}&projectId=${projectId}&unitId=${unit?.id ?? unit?.unit_id}`
      );
    }
  };
  const isSuspended = equityInfo?.status === 'SUSPENDED';
  const isTerminated = equityInfo?.status === 'TERMINATED';

  const canAccess = {
    assignAgent: equityInfo?.type !== 'FRACTIONAL' && !equityInfo?.approved_agent && equityId,
    // only for outright and payment plan transactions
    restructureTransaction: equityInfo?.type === 'WHOLE' && !equityInfo?.co_owners?.length,
    assignUnit:
      !isSuspended &&
      !isTerminated &&
      equityInfo?.type === 'WHOLE' &&
      !equityInfo?.co_owners?.length,
    suspendTransaction:
      !isTerminated && equityInfo?.type === 'WHOLE' && !equityInfo?.co_owners?.length,
    terminateTransaction: true,
    additionalClosingCost:
      !isSuspended &&
      !isTerminated &&
      equityInfo?.type === 'WHOLE' &&
      !equityInfo?.co_owners?.length,

    //only for outright and payment plan transaction
    updateDeposit:
      !isSuspended &&
      !isTerminated &&
      equityInfo?.type === 'WHOLE' &&
      !equityInfo?.co_owners?.length,
    paymentBreakdown: equityInfo?.type === 'WHOLE' && !equityInfo?.co_owners?.length,
    //only for fractional, outright and payment plan transactions
    transferOfOwnerShip:
      (!isSuspended &&
        !isTerminated &&
        equityInfo?.type === 'WHOLE' &&
        !equityInfo?.co_owners?.length) ||
      equityInfo?.type === 'FRACTIONAL',
  };
  return (
    <Drawer isOpen={modalDisclosure.isOpen} onClose={handleClose} borderRadius="16px">
      <DrawerOverlay bg="rgba(0,0,0,0.07)" />
      <DrawerContent
        position="relative"
        zIndex={100}
        mt="65.12px"
        maxW="450px"
        bg="#FBFCFC"
        p="0px"
        boxShadow="none"
      >
        <HStack
          boxShadow="4px 4px 8px 0px rgba(123, 157, 157, 0.05), -4px -4px 8px 0px rgba(123, 157, 157, 0.15)"
          mb="10px"
          py="12px"
          px="29px"
          justify="space-between"
          align="center"
          position="relative"
          width="full"
        >
          <Flex alignItems="center" gap={2}>
            <IoArrowBackSharp fontSize="20px" cursor="pointer" onClick={handleClose} />
            <Text fontSize="20px" fontWeight={600} color="#191919">
              More Options
            </Text>
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
        <Box
          display="flex"
          flexDirection="column"
          gap="20px"
          pt="0px"
          pb="20px"
          px="25px"
          overflowY="scroll"
        >
          <Stack
            py="15px"
            px="11px"
            display="flex"
            flexDirection="column"
            gap="11px"
            borderRadius="12px"
            border="1px solid #E4E4E4"
            cursor="pointer"
            onClick={handleHomeOwners.onOpen}
          >
            <Image alt="home_owners_icon" src={home_owners_icon.src} width="24px" height="24px" />
            <Stack display="flex" flexDirection="column" gap="8px">
              <Text color="#191919" fontSize="14px" fontWeight="600">
                Owners Packet
              </Text>
              <Text color="#606060" fontSize="10px" fontWeight="400">
                Access, send, and receive all property purchase-related documents here.
              </Text>
            </Stack>
            <HomeOwnersPacket equityId={equityId} Home_Onwers_Packets_Modal={handleHomeOwners} />
          </Stack>
          {canAccess.paymentBreakdown ? (
            <Stack
              py="15px"
              px="11px"
              display="flex"
              flexDirection="column"
              gap="11px"
              borderRadius="12px"
              border="1px solid #E4E4E4"
              cursor="pointer"
              onClick={paymentBreakdownDisclosure.onOpen}
            >
              <Image alt="assignUnit" src={paymentBreakdownIcon.src} width="24px" height="24px" />
              <Stack display="flex" flexDirection="column" gap="8px">
                <Text color="#191919" fontSize="14px" fontWeight="600">
                  Payment Breakdown
                </Text>
                <Text color="#606060" fontSize="10px" fontWeight="400"></Text>
              </Stack>
              <EquityPaymentBreakdownDrawer
                equityInfo={equityInfo}
                drawerDisclosure={paymentBreakdownDisclosure}
              />
              {/* <AssignAllocationToEquity
              unitInfo={unit}
              equityId={equityId}
              ALLOCATIONS_PER_UNIT={ALLOCATIONS_PER_UNIT}
              ALLOCATION_MODAL={assignUnit}
              customerInfo={customerInfo}
            /> */}
            </Stack>
          ) : null}
          {canAccess.assignUnit ? (
            <Stack
              py="15px"
              px="11px"
              display="flex"
              flexDirection="column"
              gap="11px"
              borderRadius="12px"
              border="1px solid #E4E4E4"
              cursor="pointer"
              onClick={assignUnit.onOpen}
            >
              <Image alt="assignUnit" src={assignUnitIcon.src} width="24px" height="24px" />
              <Stack display="flex" flexDirection="column" gap="8px">
                <Text color="#191919" fontSize="14px" fontWeight="600">
                  Assign Unit
                </Text>
              </Stack>
              <AssignAllocationToEquity
                unitInfo={unit}
                equityId={equityId}
                ALLOCATIONS_PER_UNIT={ALLOCATIONS_PER_UNIT}
                ALLOCATION_MODAL={assignUnit}
                customerInfo={customerInfo}
              />
            </Stack>
          ) : null}
          {canAccess.assignAgent ? (
            <Stack
              py="15px"
              px="11px"
              display="flex"
              flexDirection="column"
              gap="11px"
              borderRadius="12px"
              border="1px solid #E4E4E4"
              cursor="pointer"
              onClick={assignAgentDisclosure.onOpen}
            >
              <Image alt="assignAgent" src={assignAgentTag.src} width="24px" height="24px" />
              <Stack display="flex" flexDirection="column" gap="8px">
                <Text color="#191919" fontSize="14px" fontWeight="600">
                  Assign Agent
                </Text>
                <Text color="#606060" fontSize="10px" fontWeight="400">
                  Add details of agent that closed this sale.
                </Text>
              </Stack>
              <AssignAgentDrawer
                refetch={equityRefetch}
                equity_id={equityId}
                drawerDisclosure={assignAgentDisclosure}
                equityId={equityId}
              />
            </Stack>
          ) : null}

          {canAccess.updateDeposit ? (
            <Stack
              py="15px"
              px="11px"
              display="flex"
              flexDirection="column"
              gap="11px"
              borderRadius="12px"
              border="1px solid #E4E4E4"
              cursor="pointer"
              onClick={updateDeposit.onOpen}
            >
              <Image alt="assignUnit" src={updateDepositIcon.src} width="24px" height="24px" />
              <Stack display="flex" flexDirection="column" gap="8px">
                <Text color="#191919" fontSize="14px" fontWeight="600">
                  Update Deposit
                </Text>
                <Text color="#606060" fontSize="10px" fontWeight="400">
                  Manually update a deposit transaction.
                </Text>
              </Stack>
              <UpdateDeposit
                mainRefetch={mainRefetch}
                equityId={equityId}
                drawerDisclosure={updateDeposit}
              />
            </Stack>
          ) : null}

          {canAccess.restructureTransaction ? (
            <Link
              href={`/residents/profile/restructureTranscrion/?equityId=${equityId}&user=${userId}`}
              prefetch={true}
            >
              <Stack
                py="15px"
                px="11px"
                display="flex"
                flexDirection="column"
                gap="11px"
                borderRadius="12px"
                border="1px solid #E4E4E4"
                cursor="pointer"
              >
                <Image
                  alt="assignUnit"
                  src={restructureTransactionIcon.src}
                  width="24px"
                  height="24px"
                />
                <Stack display="flex" flexDirection="column" gap="8px">
                  <Text color="#191919" fontSize="14px" fontWeight="600">
                    Restructure Transaction
                  </Text>
                  {/* <Text color="#606060" fontSize="10px" fontWeight="400">
        
                </Text> */}
                </Stack>
              </Stack>
            </Link>
          ) : null}

          {canAccess.suspendTransaction ? (
            <Stack
              py="15px"
              px="11px"
              display="flex"
              flexDirection="column"
              gap="11px"
              borderRadius="12px"
              border="1px solid #E4E4E4"
              onClick={suspendModal.onOpen}
              cursor={'pointer'}
            >
              <SuspendIcon
                alt="suspend Icon"
                width="24px"
                height="24px"
                baseColor={isSuspended ? '#1DB968' : '#7255CB'}
              />
              <Stack display="flex" flexDirection="column" gap="8px">
                <Text color="#191919" fontSize="14px" fontWeight="600">
                  {isSuspended ? 'Reactivate Transaction' : ' Suspend Transaction'}
                </Text>
                <Text color="#606060" fontSize="10px" fontWeight="400">
                  {isSuspended
                    ? 'Reinstate transaction for this property purchase.'
                    : ' Pause future payment collection for this property purchase; this action can be reversed.'}
                </Text>
              </Stack>
              <SuspendDrawer
                isSuspended={isSuspended}
                equityRefetch={equityRefetch}
                mainRefetch={mainRefetch}
                leadDrawerHandleClose={leadDrawerHandleClose}
                equity_id={equityId}
                suspendDisclosure={suspendModal}
              />
            </Stack>
          ) : null}
          {canAccess.terminateTransaction ? (
            <Stack
              py="15px"
              px="11px"
              display="flex"
              flexDirection="column"
              gap="11px"
              borderRadius="12px"
              border="1px solid #E4E4E4"
              cursor="pointer"
              onClick={terminateModal.onOpen}
            >
              <Image alt="home_owners_icon" src={terminate_icon.src} width="24px" height="24px" />

              <Stack display="flex" flexDirection="column" gap="8px">
                <Text color="#191919" fontSize="14px" fontWeight="600">
                  Terminate Transaction
                </Text>
                <Text color="#606060" fontSize="10px" fontWeight="400">
                  This action is irreversible, and the property will either be relisted on the
                  market or saved in the archive.
                </Text>
              </Stack>
              <TerminateDrawer
                isFractional={equityInfo?.type === 'FRACTIONAL'}
                mainRefetch={mainRefetch}
                userId={userId}
                leadDrawerHandleClose={leadDrawerHandleClose}
                equity_id={equityId}
                terminateDrawerDisclosure={terminateModal}
              />
            </Stack>
          ) : null}
          {canAccess.additionalClosingCost ? (
            <Stack
              py="15px"
              px="11px"
              display="flex"
              flexDirection="column"
              gap="11px"
              borderRadius="12px"
              border="1px solid #E4E4E4"
              cursor="pointer"
              onClick={addClosingCostDisclosure.onOpen}
            >
              <Image
                alt="additional closing cost icon"
                src={additionalClosingCostIcon.src}
                width="24px"
                height="24px"
              />

              <Stack display="flex" flexDirection="column" gap="8px">
                <Text color="#191919" fontSize="14px" fontWeight="600">
                  Request Additional Closing Cost
                </Text>
                <Text color="#606060" fontSize="10px" fontWeight="400">
                  This action is used to request additional funds after the property purchase has
                  been completed or when a payment plan is already in progress.
                </Text>
              </Stack>
              <AdditionalClosingCostDrawer
                mainRefetch={mainRefetch}
                leadDrawerHandleClose={leadDrawerHandleClose}
                equity_id={equityId}
                addClosingCostDisclosure={addClosingCostDisclosure}
              />
            </Stack>
          ) : null}

          {/* <Stack
            py="15px"
            px="11px"
            display="flex"
            flexDirection="column"
            gap="11px"
            borderRadius="12px"
            border="1px solid #E4E4E4"
            cursor="pointer"
            onClick={refundModal.onOpen}
          >
            <Image alt="home_owners_icon" src={refund_icon.src} width="24px" height="24px" />
            <Stack display="flex" flexDirection="column" gap="8px">
              <Text color="#191919" fontSize="14px" fontWeight="600">
                Refund Property purchase funds
              </Text>
              <Text color="#606060" fontSize="10px" fontWeight="400"></Text>
            </Stack>
            <RefundDrawer refundModal={refundModal} />
          </Stack>

          <Stack
            py="15px"
            px="11px"
            display="flex"
            flexDirection="column"
            gap="11px"
            borderRadius="12px"
            border="1px solid #E4E4E4"
            cursor="pointer"
            onClick={requestFundsModal.onOpen}
          >
            <Image alt="home_owners_icon" src={more_funds_icon.src} width="24px" height="24px" />
            <Stack display="flex" flexDirection="column" gap="8px">
              <Text color="#191919" fontSize="14px" fontWeight="600">
                Request more Funds
              </Text>
              <Text color="#606060" fontSize="10px" fontWeight="400">
                This action is used to request additional funds after the property purchase has been
                completed or when a payment plan is already in progress.
              </Text>
            </Stack>
            <RequestFundsDrawer requestFundsModal={requestFundsModal} />
          </Stack> */}
          {canAccess.transferOfOwnerShip ? (
            <Stack
              py="15px"
              px="11px"
              display="flex"
              flexDirection="column"
              gap="11px"
              borderRadius="12px"
              border="1px solid #E4E4E4"
              cursor={projectId ? 'pointer' : 'not-allowed'}
              opacity={projectId ? 1 : 0.7}
              role="button"
              onClick={projectId ? handleNavigation : null}
            >
              <Image
                alt="transfer ownership icon"
                src={transferOwnershipIcon.src}
                width="24px"
                height="24px"
              />
              <Stack display="flex" flexDirection="column" gap="8px">
                <Text color="#191919" fontSize="14px" fontWeight="600">
                  Transfer Ownership
                </Text>
                <Text color="#606060" fontSize="10px" fontWeight="400">
                  Transfer ownership of this property to another party only after the seller has
                  confirmed receipt of payment from the buyer.
                </Text>
              </Stack>
            </Stack>
          ) : null}

          <TransFerOwnershipDrawer
            customerInfo={customerInfo}
            equityId={equityId}
            mainRefetch={mainRefetch}
            leadDrawerHandleClose={leadDrawerHandleClose}
            drawerDisclosure={transferFractionalOwnershipDisclosure}
          />
        </Box>
      </DrawerContent>
    </Drawer>
  );
};

export default MoreOptionsDrawer;
