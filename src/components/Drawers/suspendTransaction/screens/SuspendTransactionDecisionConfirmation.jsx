import {
  Button,
  DrawerBody,
  DrawerFooter,
  Flex,
  HStack,
  Heading,
  Icon,
  Image,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import {IoArrowBackSharp} from 'react-icons/io5';
import restrictedaccessDocIcon from '/src/images/icons/restrictedaccessDocIcon.svg';
import haltActivityIcon from '/src/images/icons/haltActivityIcon.svg';
import haltMoneyIcon from '/src/images/icons/haltMoneyIcon.svg';
import reverseIcon from '/src/images/icons/reverseIcon.svg';
import refundIcon from '/src/images/icons/autoRefundIcon.svg';
import {MdBlock} from 'react-icons/md';
export const SuspendTransactionDecisionConfirmation = ({handleScreen, suspendDisclosure}) => {
  return (
    <>
      <DrawerBody marginTop="132px" px="36px">
        <VStack spacing="37px">
          <Heading textAlign="center" fontSize="24px" fontWeight="600" lineHeight="30.43px">
            What does Suspension do?
          </Heading>
          <Stack spacing="24px">
            <Flex gap="12px">
              <Image src={haltActivityIcon.src} alt="access restriction icon" boxSize="28px" />
              <Stack spacing="4px">
                <Text color="#191919" fontSize={16} fontWeight={600} lineHeight="20.29px">
                  Halt Activities
                </Text>
                <Text
                  lineHeight="
15.22px"
                  fontSize="12px"
                  fontWeight="400"
                  color={'#606060'}
                >
                  Suspension temporarily halts all activities.
                </Text>
              </Stack>
            </Flex>
            <Flex gap="12px">
              <Image src={haltMoneyIcon.src} alt="access restriction icon" boxSize="28px" />
              <Stack spacing="4px">
                <Text color="#191919" fontSize={16} fontWeight={600} lineHeight="20.29px">
                  Halt Transactions
                </Text>
                <Text
                  lineHeight="
15.22px"
                  fontSize="12px"
                  fontWeight="400"
                  color={'#606060'}
                >
                  Payments made during suspension are automatically refunded to the wallet.
                </Text>
              </Stack>
            </Flex>
            <Flex gap="12px">
              <Image src={reverseIcon.src} alt="access restriction icon" boxSize="28px" />
              <Stack spacing="4px">
                <Text color="#191919" fontSize={16} fontWeight={600} lineHeight="20.29px">
                  Reversible
                </Text>
                <Text
                  lineHeight="
15.22px"
                  fontSize="12px"
                  fontWeight="400"
                  color={'#606060'}
                >
                  The suspension status remains until manually reversed.
                </Text>
              </Stack>
            </Flex>
            {/* <Flex gap="12px">
              <Image src={refundIcon.src} alt="access restriction icon" boxSize="28px" />
              <Stack spacing="4px">
                <Text color="#191919" fontSize={16} fontWeight={600} lineHeight="20.29px">
                  Automatic Refund
                </Text>
                <Text lineHeight="15.22px" fontSize="12px" fontWeight="400" color={'#606060'}>
                  Payments made during suspension are automatically refunded to the wallet.
                </Text>
              </Stack>
            </Flex> */}
          </Stack>
        </VStack>
      </DrawerBody>
      <DrawerFooter py="0px" px="36px" pb="8.8vh">
        <Stack w="full" alignItems="center" spacing="15px">
          <Text
            lineHeight="
15.22px"
            fontSize="12px"
            fontWeight="500"
            textAlign="center"
            color={'#606060'}
          >
            It is intended as a temporary measure.
          </Text>
          <Stack w="full" spacing="16.5px">
            <Button
              variant="filled-radius"
              h={'45px'}
              fontWeight={400}
              w="full
"
              fontSize="14.91px"
              lineHeight="18.9px"
              // onClick={terminateTabs.onOpen}
              onClick={handleScreen('2fa')}
            >
              Suspend
            </Button>
            <Button
              variant="outline-radius"
              h={'45px'}
              fontSize="14.91px"
              lineHeight="18.9px"
              w="full"
              onClick={suspendDisclosure.onClose}
              fontWeight={400}
            >
              Cancel
            </Button>
          </Stack>
        </Stack>
      </DrawerFooter>
    </>
  );
};
