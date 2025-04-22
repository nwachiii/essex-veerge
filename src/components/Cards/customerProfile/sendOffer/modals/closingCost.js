import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  HStack,
  Heading,
  Stack,
  StackDivider,
  Text,
  Image,
  useMediaQuery,
} from '@chakra-ui/react';
import paymentplancardIcon from '/src/images/icons/paymentplancardIcon.svg';

import {formatToCurrency} from 'utils/formatAmount';

export const ClosingCost = ({modalDisclosure, fees, customScrollbarStyles}) => {
  const [isShortScreenHeight] = useMediaQuery('(max-height: 740px)');
  return (
    <Modal
      motionPreset="slideInBottom"
      isCentered
      scrollBehavior="inside"
      isOpen={modalDisclosure.isOpen}
      onClose={modalDisclosure.onClose}
    >
      <ModalOverlay />
      <ModalContent
        transform={isShortScreenHeight ? 'scale(0.8) !important' : 'none'}
        maxW="462px"
        maxH="400px"
        borderRadius="16px "
        p="24px"
      >
        <HStack justify="space-between" w="full">
          <Image src={paymentplancardIcon.src} alt="paymentlan icon" />
          <ModalCloseButton position="initial" transform="translateX(7px)" />
        </HStack>
        <Heading fontSize="20px" fontWeight="600" mt="16px" mb="24px" color="#191919">
          Closing Cost
        </Heading>
        <ModalBody p="0px" pr="4px" sx={customScrollbarStyles} maxH="300px">
          <Stack spacing="none" h="fit-content" divider={<StackDivider my="12px" />}>
            {!fees.length ? (
              <Text fontSize={'11px'} textAlign="center" color="#606060" fontWeight={'400'}>
                There is currently no specified fee for this unit.
              </Text>
            ) : (
              fees.map((item, idx) => {
                return (
                  <HStack justify="space-between" align="start" key={idx} w="full">
                    <Stack spacing="5px">
                      <Text
                        textTransform="capitalize"
                        fontSize={'14px'}
                        color="#606060"
                        fontWeight={'400'}
                      >
                        {item.name}
                      </Text>
                    </Stack>
                    <Text fontSize={'16px'} color="#191919" fontWeight={'500'}>
                      {item?.amount ? formatToCurrency(item?.amount) : '-'}
                    </Text>
                  </HStack>
                );
              })
            )}
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ClosingCost;
