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
import refundIcon from '/src/images/icons/autoRefundIcon.svg';
import {MdBlock} from 'react-icons/md';
export const DecisionConfirmation = ({handleScreen, isFractional, terminateDrawerDisclosure}) => {
  return (
    <>
      {/* <HStack
        pt="15.23px"
        pb="14.47px"
        boxShadow="4px 4px 8px 0px rgba(123, 157, 157, 0.05), -4px -4px 8px 0px rgba(123, 157, 157, 0.15)"
        pl="23.25px"
        pr="15.23px"
        w="full"
        justify="space-between"
      >
        <HStack gap={1}>
          <Icon
            as={IoArrowBackSharp}
            fontSize="20px"
            cursor="pointer"
            onClick={terminateDrawerDisclosure.onClose}
          />
          <Heading p="0px" fontSize="16px" fontWeight="600" borderBottom="none" color="#191919">
            Terminate
          </Heading>
        </HStack>
      </HStack> */}
      <DrawerBody marginTop="132px" px="36px">
        <VStack spacing="37px">
          <Heading textAlign="center" fontSize="24px" fontWeight="600" lineHeight="30.43px">
            What does Terminate do?
          </Heading>
          <Stack spacing="24px">
            <Flex gap="12px">
              <Image
                src={restrictedaccessDocIcon.src}
                alt="access restriction icon"
                boxSize="28px"
              />
              <Stack spacing="4px">
                <Text color="#191919" fontSize={16} fontWeight={600} lineHeight="20.29px">
                  Access Restrictions
                </Text>
                <Text
                  lineHeight="
15.22px"
                  fontSize="12px"
                  fontWeight="400"
                  color={'#606060'}
                >
                  Once terminated, the client loses access to the associated transaction in their
                  portfolio.
                </Text>
              </Stack>
            </Flex>
            <Flex gap="12px">
              <Image src={refundIcon.src} alt="access restriction icon" boxSize="28px" />
              <Stack spacing="4px">
                <Text color="#191919" fontSize={16} fontWeight={600} lineHeight="20.29px">
                  Automatic Refund
                </Text>
                <Text
                  lineHeight="
15.22px"
                  fontSize="12px"
                  fontWeight="400"
                  color={'#606060'}
                >
                  Any payments made by the client after termination are automatically refunded to
                  their wallet.
                </Text>
              </Stack>
            </Flex>
          </Stack>
        </VStack>
      </DrawerBody>
      <DrawerFooter py="0px" px="36px" pb="8.8vh">
        <Stack w="full" alignItems="center" spacing="24px">
          <Text
            lineHeight="
15.22px"
            fontSize="12px"
            fontWeight="500"
            textAlign="center"
            color={'#606060'}
          >
            Important: Termination is a permanent action and cannot be reversed.
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
              onClick={handleScreen(isFractional ? 'select fractional transaction' : '2fa')}
            >
              Terminate
            </Button>
            <Button
              variant="outline-radius"
              h={'45px'}
              fontSize="14.91px"
              lineHeight="18.9px"
              w="full"
              onClick={terminateDrawerDisclosure.onClose}
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
