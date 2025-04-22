import React, {useState} from 'react';
import {OTPInput} from 'chakra-otp-input';
import {VStack, Stack, Image, Text, Flex, Box, useDisclosure} from '@chakra-ui/react';

import {Button, Form, Popup} from '../../../ui-lib/ui-lib.components';
import {blacklistCustomer} from '../../../apis/customers';
import successGif from '/src/images/check-icon.gif';
import lock from '/src/images/lock.png';

export const AddToBlacklist = ({handleBlacklist, isError}) => {
  const BlacklistInfo = useDisclosure();
  const BlacklistSuccess = useDisclosure();
  const VerifyBlacklistOTP = useDisclosure();
  const [blacklistOTP, setBlacklistOTP] = useState(null);

  const handleBlacklistRequest = () => {
    BlacklistInfo.onClose();
    VerifyBlacklistOTP.onOpen();
    // ReuestOTP function comes in here
  };

  const handleVerify = () => {
    setTimeout(() => {
      handleBlacklist();
    }, 3600);
    VerifyBlacklistOTP.onClose();
    BlacklistSuccess.onOpen();
    // TODO: Take out the above 3 functions and use mutation below instead
    // verifyBlacklisting.mutate({
    // 	email                   : developerEmail,
    // 	email_verification_code : blacklistOTP
    // });
  };
  return (
    <Box>
      <Button my="0" isDisabled={isError} variant="dark" w="100%" onClick={BlacklistInfo.onOpen}>
        Add to Blacklist
      </Button>

      {/* Modal : Blacklist Info */}
      <Popup
        minW="425px"
        minH="392px"
        pt="35px"
        pb="35px"
        isOpen={BlacklistInfo.isOpen}
        onClose={BlacklistInfo.onClose}
        isCentered
      >
        <Image alt="" src={lock.src} boxSize="88px" mt="25px" mx="auto" />

        <Popup.Body mb={8}>
          <Text fontSize="24px" fontWeight={600}>
            Add to Blacklist
          </Text>
          <VStack w="full" px={0.2} pt={4}>
            <Text fontSize="14px" textAlign="center">
              You are about to add this customer to your blacklist, customer would no longer be able
              to access your listings
            </Text>
          </VStack>
        </Popup.Body>
        <Button
          borderRadius="72px"
          onClick={handleBlacklistRequest}
          variant="primary"
          mx="auto"
          w="321px"
          h="55px"
        >
          Proceed
        </Button>
      </Popup>

      {/* Modal : Verify Blacklist Authorization */}
      <Popup
        minW="425px"
        h="392px"
        pt="35px"
        pb="15px"
        isOpen={VerifyBlacklistOTP.isOpen}
        onClose={VerifyBlacklistOTP.onClose}
      >
        <Text fontSize="24px" fontWeight={600}>
          {`Verify it's You`}{' '}
        </Text>
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
              value={blacklistOTP}
              onChange={value => setBlacklistOTP(value)}
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
					</Text> */}
          <Button disabled={!blacklistOTP} w="321px" variant="primary" onClick={handleVerify}>
            Verify
          </Button>
        </Popup.Body>
      </Popup>

      {/* Modal : Blacklist Success */}
      <Popup
        pt="45px"
        pb="15px"
        h="392px"
        isCentered
        minW="425px"
        isOpen={BlacklistSuccess.isOpen}
        onClose={BlacklistSuccess.onClose}
      >
        <Image alt="" src={successGif.src} w="108px" mb="25px" mx="auto" />
        <Text textAlign="center" fontSize="24px" fontWeight={600}>
          Customer Added to Blacklist Successfully
        </Text>
        <Popup.Body>
          <VStack w="full" px={0.2} maxW="320px">
            <Text fontSize="14px" textAlign="center">
              You have successfully added this customer to your blacklist
            </Text>
          </VStack>
          <Button onClick={BlacklistSuccess.onClose} variant="primary" mx="auto" w="321px" h="55px">
            OK
          </Button>
        </Popup.Body>
      </Popup>
    </Box>
  );
};
