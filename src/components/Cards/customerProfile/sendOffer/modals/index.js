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
  Image,
  Text,
  StackDivider,
  Button,
  useClipboard,
  Spinner,
  useMediaQuery,
} from '@chakra-ui/react';
import {formatToCurrency} from 'utils/formatAmount';
import RightArrowIcon from '@/components/assets/rightArrowIcon';
import CopyIcon from '@/components/assets/copyIcon';
import {changeDateFormat} from 'utils/formatDate';
import HoverText from 'ui-lib/ui-lib.components/hoverOnText/hoverOnText';

export const ViewOffer = ({
  accountDetailsObj,
  info,
  modalDisclosure,
  customScrollbarStyles,
  closingCostDisclosure,
  paymentBreakdownDisclosure,
}) => {
  const {onCopy, hasCopied} = useClipboard(accountDetailsObj.accNum);
  const handleCopy = () => {
    onCopy();
  };
  const [isShortScreenHeight] = useMediaQuery('(max-height: 740px)');

  return (
    <Modal
      scrollBehavior={'inside'}
      motionPreset="slideInBottom"
      isOpen={modalDisclosure.isOpen}
      onClose={modalDisclosure.onClose}
      blockScrollOnMount={
        closingCostDisclosure.isOpen || paymentBreakdownDisclosure.isOpen ? false : true
      }
      isCentered
    >
      <ModalOverlay />
      <ModalContent
        transform={isShortScreenHeight ? 'scale(0.8) !important' : 'none'}
        p="24px"
        minW="456px"
        // mt="15vh"
        // mb="3vh"
        maxH="560px"
        borderRadius="16px"
      >
        <HStack justify="space-between" w="full" mb="16px">
          <Heading fontSize="24.872px" fontWeight="600" color="#191919">
            Offer Summary
          </Heading>
          <ModalCloseButton position="initial" />
        </HStack>
        <ModalBody p="0px" pr="2px" sx={customScrollbarStyles}>
          <Stack spacing="16px" w="full">
            <HStack spacing="19.43px" p="14px" bg="#F4F4F4" borderRadius="8px">
              <Text fontSize="14px" textTransform="capitalize" fontWeight="500" color="#191919">
                {info?.unit?.unit_title},
                <Text as="span" color="#191919">
                  {info?.project?.name}
                </Text>
              </Text>
            </HStack>
            <Stack
              bg="#F4F4F4"
              p="14px"
              borderRadius="8px"
              spacing="none"
              divider={<StackDivider my="16px" bg="#E4E4E4" />}
            >
              {info?.payment_plan ? (
                <HStack w="full" justify="space-between">
                  <Text fontSize="14px" fontWeight="400" color="#191919">
                    Duration
                  </Text>
                  <Text fontSize="14px" fontWeight="500" color="#191919">
                    {`${info?.payment_plan?.payment_period_in_months} Month${
                      info?.payment_plan?.payment_period_in_months > 1 ? 's' : ''
                    }`}
                  </Text>
                </HStack>
              ) : null}

              <HStack w="full" justify="space-between">
                <Text fontSize="14px" fontWeight="400" color="#191919">
                  Offer Price
                </Text>
                <Text fontSize="14px" fontWeight="500" color="#191919">
                  {info?.offer_price ? formatToCurrency(info?.offer_price, 'naira') : '-'}
                </Text>
              </HStack>

              {info?.payment_plan ? (
                <HStack w="full" justify="space-between">
                  <Text fontSize="14px" fontWeight="400" color="#191919">
                    Initial deposit
                  </Text>
                  <Text fontSize="14px" fontWeight="500" color="#191919">
                    {info?.payment_plan?.initial_deposit_in_value
                      ? formatToCurrency(info?.payment_plan?.initial_deposit_in_value)
                      : '-'}
                  </Text>
                </HStack>
              ) : null}
              {info?.payment_plan ? (
                <HStack w="full" justify="space-between">
                  <Text fontSize="14px" fontWeight="400" color="#191919">
                    Payment Breakdown
                  </Text>
                  <Button
                    fontSize="14px"
                    fontWeight="500"
                    p="0px"
                    h="fit-content"
                    _hover={{bg: 'transparent'}}
                    _active={{bg: 'transparent'}}
                    _focus={{bg: 'transparent'}}
                    color="#4545FE"
                    variant="ghost"
                    onClick={paymentBreakdownDisclosure.onOpen}
                    rightIcon={<RightArrowIcon />}
                  >
                    View
                  </Button>
                </HStack>
              ) : null}
              <HStack w="full" justify="space-between">
                <Text fontSize="14px" fontWeight="400" color="#191919">
                  Offer Contract
                </Text>
                <Button
                  fontSize="14px"
                  fontWeight="500"
                  p="0px"
                  h="fit-content"
                  _hover={{bg: 'transparent'}}
                  _active={{bg: 'transparent'}}
                  _focus={{bg: 'transparent'}}
                  color="#4545FE"
                  variant="ghost"
                  onClick={() => window.open(accountDetailsObj.packet, '_blank')}
                  rightIcon={<RightArrowIcon />}
                >
                  View
                </Button>
              </HStack>
              {info?.equity_fees?.length ? (
                <HStack w="full" justify="space-between">
                  <Text fontSize="14px" fontWeight="400" color="#191919">
                    Closing Cost
                  </Text>
                  <Button
                    fontSize="14px"
                    fontWeight="500"
                    p="0px"
                    h="fit-content"
                    _hover={{bg: 'transparent'}}
                    _active={{bg: 'transparent'}}
                    _focus={{bg: 'transparent'}}
                    color="#4545FE"
                    variant="ghost"
                    onClick={() => closingCostDisclosure.onOpen()}
                    rightIcon={<RightArrowIcon />}
                  >
                    View
                  </Button>
                </HStack>
              ) : null}

              <HStack w="full" justify="space-between">
                <Text fontSize="14px" fontWeight="400" color="#191919">
                  Offer Date
                </Text>
                <Text fontSize="14px" fontWeight="500" color="#4545FE">
                  {info?.created_at ? changeDateFormat(info?.created_at) : '-'}
                </Text>
              </HStack>
              <HStack w="full" justify="space-between">
                <Text fontSize="14px" fontWeight="400" color="#191919">
                  Offer Expiration
                </Text>
                <Text fontSize="14px" fontWeight="500" color="#FF6A6A">
                  {info?.offer_expires ? changeDateFormat(info?.offer_expires) : '-'}
                </Text>
              </HStack>
              <HStack w="full" justify="space-between">
                <Text fontSize="14px" fontWeight="400" color="#191919">
                  Account Number
                </Text>
                {accountDetailsObj.isError ? (
                  ''
                ) : accountDetailsObj.isLoading ? (
                  <Spinner />
                ) : (
                  <HStack spacing="16px">
                    <Stack spacing="5.65px" align="end">
                      <Text fontSize="11px" fontWeight="400" color="#606060">
                        {accountDetailsObj.bankName}
                        {'  '}
                        <Text as="span" pl="2px" color="#4545FE" fontWeight="500">
                          {accountDetailsObj.accNum}
                        </Text>
                      </Text>{' '}
                      {/* <Text textAlign="end" fontSize="13px" fontWeight="500" color="#191919">
                        {accountDetailsObj.accName}
                      </Text> */}
                      <HoverText
                        textAlign="end"
                        fontSize="13px"
                        fontWeight="500"
                        color="#191919"
                        forPopUp={{fontSize: '14px', fontWeight: '400'}}
                        text={accountDetailsObj.accName}
                      />
                    </Stack>

                    <CopyIcon
                      handleCopy={handleCopy}
                      styleProp={{height: '17px', width: '17px'}}
                      hasBeenCopied={hasCopied}
                    />
                  </HStack>
                )}
              </HStack>
              <HStack w="full" justify="space-between">
                <Text fontSize="14px" fontWeight="400" color="#191919">
                  Sent By
                </Text>
                <Text fontSize="14px" fontWeight="500" textTransform="capitalize" color="#191919">
                  {info?.offer_by
                    ? `${info?.offer_by?.first_name} ${info?.offer_by?.last_name}`
                    : '-'}
                </Text>
              </HStack>
            </Stack>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ViewOffer;
