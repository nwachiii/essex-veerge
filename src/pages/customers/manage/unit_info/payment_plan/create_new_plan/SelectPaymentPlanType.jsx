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

import PaymentPlan from '/src/components/Drawers/paymentPlan';
import cancelBlackIcon from '/src/images/icons/closeIconForFilter.svg';
import {PlanIcon} from '@/components/assets/paymentPlanPlusIcon';

const cardStyle = {
  p: '16px',
  border: '1px solid #f5f5f5',

  borderRadius: '8px',
  cursor: 'pointer',
  position: 'relative',
  bg: '#fafafa',
  spacing: '16px',
  w: 'full',
};

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
    setFieldValue(`units.${index}.payment_plan.${0}.plan_type`, 'manual');
  };
  const handleCustomModal = () => {
    modal3.onOpen();
    modal.onClose();
    setFieldValue(`units.${index}.payment_plan.${0}.plan_type`, 'custom');
  };

  const paymentPlanDrawer = useDisclosure();

  return (
    <Modal isCentered h="616px" isOpen={modal.isOpen} onClose={modal.onClose}>
      <ModalOverlay />
      <ModalContent p="24px" maxW="697px" borderRadius="16px">
        <HStack w="full" align="start" justify="space-between">
          <Heading
            as="h1"
            fontSize={'24px'}
            fontWeight="600"
            lineHeight="30.43px"
            color="#191919"
            pb="0"
          >
            Select Payment Plan
          </Heading>

          {/* <Box position="relative"> */}
          {/* <Image
              alt=""
              w="28px"
              h={'26px'}
              cursor={'pointer'}
              objectFit={'cover'}
              src={cancelBlackIcon.src}
              onClick={modal.onClose}
            /> */}
          <ModalCloseButton position="initial" onClick={modal.onClose} />
          {/* </Box> */}
        </HStack>
        <ModalBody p="24px 0px 0px">
          <HStack
            alignItems="stretch"
            spacing="16px"
            justify={'space-between'}
            align={'center'}
            w="full"
          >
            <Stack onClick={handleNextModal} {...cardStyle}>
              <PlanIcon />
              <Stack spacing="8px">
                <Text lineHeight="22.82px" fontWeight="700" fontSize="18px" color="#191919">
                  Quick Plan
                </Text>
                <Text fontWeight="400" fontSize="14px" lineHeight="17.75px" color="#606060">
                  Create a payment plan for installment payment allowing for either monthly,
                  quarterly, bi-annually, or annual payment options.
                </Text>
              </Stack>
              <HStack
                position="absolute"
                top="8px"
                right="7.5px"
                spacing="8px"
                borderRadius="16px"
                bg="rgba(255, 145, 3, 0.10)"
                h="23px"
                px="8px"
              >
                <Image boxSize="12px" src={starIcon.src} alt="star icon" />
                <Text fontSize="12px" fontWeight="400" lineHeight="15.22px" color="#FF9103">
                  Recommended
                </Text>
              </HStack>
            </Stack>

            <Stack onClick={handleCustomModal} {...cardStyle}>
              <PlanIcon baseColor="#FF9103" />

              <Stack spacing="8px">
                <Text lineHeight="22.82px" fontWeight="700" fontSize="18px" color="#191919">
                  Custom Plan
                </Text>
                <Text fontWeight="400" fontSize="14px" lineHeight="17.75px" color="#606060">
                  Customize the payment breakdown outlining how the installment payments should be
                  made.
                </Text>
              </Stack>
            </Stack>
          </HStack>

          <HStack
            onClick={paymentPlanDrawer.onOpen}
            align={'center'}
            justifyContent={'flex-end'}
            display={'flex'}
            gap="2px"
            mt="24px"
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
              <Image src={bulbIcon.src} alt="bulb icon" boxSize="20px" />
            </Box>
            <Text fontSize="16px" fontWeight="400" color="#4545FE" lineHeight="20.29px">
              Learn more
            </Text>
            <PaymentPlan drawerModal={paymentPlanDrawer} />
          </HStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SelectPaymentPlanType;
