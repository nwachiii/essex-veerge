import {
  Box,
  HStack,
  Heading,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import {motion} from 'framer-motion';
import manualPlanIcon from '/src/images/icons/manual-icon.svg';
import customPlanIcon from '/src/images/icons/custom-plan-icon.svg';
import starIcon from '/src/images/icons/orangeStar.svg';
import bulbIcon from '/src/images/icons/bulbBlue.svg';

import btnStyles from 'ui-lib/ui-lib.components/Button/Btn.module.css';

import PaymentPlan from '../../../../../components/Drawers/paymentPlan';

export const SelectPaymentPlanType = ({
  modal,
  modal2,
  modal3,
  unit,
  setFieldValue,
  values,
  index,
  WIDGET_MODAL,
}) => {
  const handleNextModal = () => {
    modal.onClose();
    modal2.onOpen();
    // setFieldValue(`units.${index}.payment_plan.${0}.plan_type`, 'manual');
  };
  const handleCustomModal = () => {
    modal3.onOpen();
    modal.onClose();
    // setFieldValue(`units.${index}.payment_plan.${0}.plan_type`, 'custom');
    // console.log('unitkk', unit);
  };

  const paymentPlanDrawer = useDisclosure();

  return (
    <Modal isCentered h="616px" isOpen={modal.isOpen} onClose={modal.onClose}>
      <ModalOverlay />
      <ModalContent maxW="707px" borderRadius="16px">
        <HStack px="33px" w="full" mt="26px" align="start" justify="space-between">
          <Stack spacing="8px">
            <Heading as="h1" fontSize={'24px'} fontWeight="600" color="#191919" pb="0">
              Select Payment Plan
            </Heading>
          </Stack>
          <Box position="relative" bg="red">
            <ModalCloseButton top="0" bottom="0" mt="0px" w="13px" h="13px" right="0px" />
          </Box>
        </HStack>
        <ModalBody pt="20px" pb="17px">
          <Stack spacing="8px" justify={'space-between'} align={'center'} w="full" gap="23px">
            <Stack
              px="15px"
              py="16px"
              border="1px solid #E4E4E4"
              onClick={handleNextModal}
              borderRadius="12px"
              cursor="pointer"
              position="relative"
              spacing="15px"
              w="full"
            >
              <Image alt="" src={manualPlanIcon.src} width="41.325px" height="40px" />
              <Text lineHeight="33px" fontWeight="700" fontSize="26px" color="#191919">
                Quick Plan
              </Text>
              <Text fontWeight="400" fontSize="16px" lineHeight="24px" color="#191919">
                Create a payment plan for installment payment allowing for either monthly,
                quarterly, bi-annually, or annual payment options.
              </Text>

              <HStack
                position="absolute"
                top="13px"
                right="13px"
                spacing="10px"
                borderRadius="16px"
                bg="rgba(255, 145, 3, 0.10)"
                h="32px"
                px="9px"
              >
                <Image src={starIcon.src} alt="star icon" />
                <Text fontSize="12px" fontWeight="400" color="#FF9103">
                  Recommended
                </Text>
              </HStack>
            </Stack>

            <Stack
              px="15px"
              py="16px"
              spacing="15px"
              border="1px solid #E4E4E4"
              borderRadius="12px"
              onClick={handleCustomModal}
              cursor="pointer"
              w="full"
            >
              <Image alt="" src={customPlanIcon.src} width="41.325px" height="40px" />
              <Text lineHeight="33px" fontWeight="700" fontSize="26px" color="#191919">
                Custom Plan
              </Text>
              <Text fontWeight="400" fontSize="16px" lineHeight="24px" color="#191919">
                Customize the payment breakdown outlining how the installment payments should be
                made.
              </Text>
            </Stack>
          </Stack>

          <HStack
            onClick={paymentPlanDrawer.onOpen}
            align={'center'}
            justifyContent={'flex-end'}
            display={'flex'}
            gap="2px"
            mt="30px"
            cursor="pointer"
            fontSize={'16px'}
            color="#4545FE"
          >
            <Box
              as={motion.div}
              initial={{translateY: -20, rotate: 0}} // Initial position: up and no rotation
              animate={{
                translateY: [0, -20, 0], // Animate up and down slightly
                rotate: [0, 0, 45], // Animate from 0 to 45 degrees
              }}
              transition={{
                translateY: {duration: 0.6, repeat: Infinity}, // Adjust duration and repeat as needed
                rotate: {duration: 1.2, repeat: Infinity}, // Adjust duration and repeat as needed
              }}
              animation={`${btnStyles.jumpAndRotate} 2s ease-in-out infinite`}
            >
              <Image src={bulbIcon.src} alt="bulb icon" boxSize="14px" />
            </Box>
            <Text fontSize="14px" fontWeight="400" color="#4545FE" lineHeight="23px">
              Everything you need to know about payment plan
            </Text>
          </HStack>
        </ModalBody>
      </ModalContent>
      <PaymentPlan drawerModal={paymentPlanDrawer} />
    </Modal>
  );
};

export default SelectPaymentPlanType;
