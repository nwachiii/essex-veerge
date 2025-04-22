import React, {useState} from 'react';
import Link from 'next/link';
import {OTPInput} from 'chakra-otp-input';
import {
  VStack,
  Textarea,
  Image,
  Tag,
  TagLabel,
  Flex,
  Text,
  Stack,
  useDisclosure,
  Box,
  Divider,
} from '@chakra-ui/react';

import {themeStyles} from '../../../../../theme';
import {Button, Popup} from '../../../../../ui-lib/ui-lib.components';
import refundIcon from '/src/images/refund-image.png';
import SuccessGif from '/src/images/icons/purple-success-icon.gif';

export const RefundModal = () => {
  const RefundAmount = useDisclosure();
  const VerifyRefund = useDisclosure();
  const RefundSuccess = useDisclosure();
  const RefundAndTerminate = useDisclosure();

  const [note, setNote] = useState('');
  const [value, setValue] = useState('');
  const [verifyOTP, setVerifyOTP] = useState(null);

  let handleInputChange = e => {
    let inputValue = e.target.value;
    setValue(inputValue);
  };
  const handleVerify = () => {
    RefundSuccess.onOpen();
  };
  return (
    <div>
      <Button
        onClick={() => RefundAndTerminate.onOpen()}
        mt={0}
        variant="secondary"
        borderRadius="12px"
        w="115px"
        h="40px"
      >
        View
      </Button>

      {/* Refund and Terminate */}
      <Popup
        // p='45px'
        pb="15px"
        h="max-content"
        minH="683px"
        minW={{base: '90%', md: '478px'}}
        isOpen={RefundAndTerminate.isOpen}
        onClose={RefundAndTerminate.onClose}
        isCentered
      >
        <Popup.Body>
          <VStack w="full" px={0.2} spacing={8}>
            <Image alt="" src={refundIcon.src} mx="auto" boxSize="150px" />
            <Stack textAlign="center" spacing="2px">
              <Text fontSize="24px" color="#191919" fontWeight={600}>
                Astrid 2.0
              </Text>
              <Text fontSize="16px">Jul 28, 2022 | 12:34 PM</Text>
            </Stack>
            <Stack textAlign="center" spacing="2px">
              <Text fontSize="14px">Transacted amount</Text>
              <Text color={themeStyles.color.primary} fontSize="24px" fontWeight={600}>
                ₦ 800,000.00
              </Text>
            </Stack>
            <Stack textAlign="center" spacing="2px">
              <Text fontSize="14px">Transaction type</Text>
              <Tag w="130px" bg="#DBFFF5" color="#12D8A0" borderRadius="full" h="36px">
                <TagLabel mx="auto">Full payment</TagLabel>
              </Tag>
            </Stack>
            <Stack textAlign="center" spacing="2px">
              <Text fontSize="14px">Ref</Text>
              <Text fontSize="14px" color="#191919" fontWeight={600}>
                NX0993391144677o8712345
              </Text>
            </Stack>
            <Button onClick={RefundAmount.onOpen} variant="primary" mx="auto" w="391px" h="55px">
              Refund and Terminate
            </Button>
          </VStack>
        </Popup.Body>
      </Popup>

      {/* Modal : Refund Amount  */}
      <Popup
        p="36px"
        minH="562px"
        isOpen={RefundAmount.isOpen}
        onClose={RefundAmount.onClose}
        minW={{base: '90%', md: '752px'}}
        isCentered
      >
        <Popup.Body>
          <Flex
            direction={{base: 'column', md: 'row'}}
            justify="space-between"
            w="full"
            px={0.2}
            align="center"
            columnGap="24px"
          >
            <Image alt="" src={refundIcon.src} boxSize="118px" mx="auto" />
            <Stack textAlign="center" align="center">
              <Text fontSize="24px" color="#191919" fontWeight={600}>
                Astrid 2.0
              </Text>
              <Text fontSize="16px">Jul 28, 2022 | 12:34 PM</Text>
            </Stack>
            <Stack textAlign="center" align="center" mt={3}>
              <Text fontSize="14px">Transacted amount</Text>
              <Text color={themeStyles.color.primary} fontSize="24px" fontWeight={600}>
                ₦ 800,000.00
              </Text>
            </Stack>
            <Stack textAlign="center" mt={3}>
              <Text fontSize="14px">Transaction type</Text>
              <Tag w="130px" bg="#DBFFF5" color="#12D8A0" borderRadius="full" h="36px">
                <TagLabel mx="auto">Full payment</TagLabel>
              </Tag>
            </Stack>
          </Flex>
          <Box py="10px" />
          <Divider color="gray.700" direction="horizontal" w="full" border="2px solid" />
          <Box py="10px" />

          <VStack spacing={6} w="full">
            <Box w="full">
              <Text mb="8px">Amount to refund: {value}</Text>
              <Textarea
                size="md"
                value={value}
                borderRadius="16px"
                onChange={handleInputChange}
                placeholder="Enter refundable amount"
              />
            </Box>
            <Box w="full">
              <Text mb="8px">Note</Text>
              <Textarea
                size="md"
                value={note}
                borderRadius="16px"
                onChange={e => setNote(e.target.value)}
                placeholder="Enter reason for refund"
              />
            </Box>
          </VStack>
          <Button
            borderRadius="72px"
            onClick={VerifyRefund.onOpen}
            variant="primary"
            ml="auto"
            w="234px"
            h="55px"
          >
            Proceed
          </Button>
        </Popup.Body>
      </Popup>

      {/* Modal : Verify Refund Modal */}
      <Popup
        minW="425px"
        h="392px"
        pt="35px"
        pb="15px"
        isOpen={VerifyRefund.isOpen}
        onClose={VerifyRefund.onClose}
      >
        <Popup.Header fontSize="24px" fontWeight={600}>
          {`Verify it's You`}{' '}
        </Popup.Header>
        <Popup.Description>
          <Text align="left">
            we have sent a six (6) digit OTP to your email address. Kindly input to verify.
          </Text>
        </Popup.Description>
        <Popup.Body>
          <Flex py="8" justify="center" align="center" w="full">
            <OTPInput
              noInputs={6}
              type="number"
              value={verifyOTP}
              onChange={value => setVerifyOTP(value)}
            />
          </Flex>
          {/* <Text fontSize='12px' align='center' w='full'>
						Didn't receive an OTP?{' '}
						<Text cursor='pointer' as='span' fontWeight='bold' color='#4545FE'>
							resend in{' '}
							<Text as='span' color='#4545FE'>
								0: 30 secs
							</Text>
						</Text>
					</Text>{' '} */}
          <Button
            borderRadius="72px"
            disabled={!verifyOTP}
            w="321px"
            variant="primary"
            onClick={handleVerify}
          >
            Confirm and Proceed
          </Button>
        </Popup.Body>
      </Popup>

      {/* Modal : Blacklist Success */}
      <Popup
        pt="35px"
        pb="15px"
        minH="424px"
        minW={{base: '90%', md: '451px'}}
        isOpen={RefundSuccess.isOpen}
        onClose={RefundSuccess.onClose}
        isCentered
      >
        <Image alt="" src={SuccessGif.src} w="161px" mx="auto" />
        <Popup.Header>
          <Text textAlign="center" fontSize="28px" fontWeight={600}>
            Refund and termination Successful
          </Text>
        </Popup.Header>

        <Popup.Body>
          <VStack w="full" px={0.2} maxW="320px">
            <Text fontSize="14px" textAlign="center">
              You have successfully refunded and terminated this transaction
            </Text>
          </VStack>
          <Link prefetch={false} href="/account">
            <Button variant="primary" mx="auto" w="391px" h="55px">
              View details
            </Button>
          </Link>
        </Popup.Body>
      </Popup>
    </div>
  );
};

export default RefundModal;
