import {
  Box,
  Button,
  Flex,
  HStack,
  Image,
  SimpleGrid,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import {useState} from 'react';
// import PaymentPlanModal from './PaymentPlanModal';
import Carousel from 'react-elastic-carousel';
import PaymentPlanDeleteModal from './PaymentPlanDeleteModal';
import rightIcon from '/src/images/icons/rightArowcustomPaymentBreakdown.svg';
import paymentplancardIcon from '/src/images/icons/paymentplancardIcon.svg';
import paymentplanprivatecardIcon from '/src/images/icons/paymentplanprivatecardIcon.svg';
import lockIcon from '/src/images/icons/black-icon.svg';
import carrouselArrow from '/src/images/icons/paymentplanNavArrow.svg';
import {HoverOnAmount} from '../../../../../utils/HoverOnAmount';
import CustomPaymentModal from './CustomPaymentModal';
import CreateNewPaymentPlan from './create_new_plan';
import {formatToCurrency} from 'utils/formatAmount';
import PaymentPlanModal from './PaymentPlanModal';

const customScrollbarStyles = {
  '&::-webkit-scrollbar': {
    width: '4px',
    borderRadius: '16px',
    display: 'none',
  },
  '&::-webkit-scrollbar-track': {
    borderRadius: '16px',
    WebkitBoxShadow: 'inset 0 0 6px #fafafa',
  },
  '&::-webkit-scrollbar-thumb': {
    borderRadius: '16px',
    backgroundColor: '#cbcbcb',
  },
};

export const PaymentPlan = ({PAYMENT_PLAN_DATA, wrapper, containerStyle, refetch}) => {
  const itemsToShow = 3;
  const [unitToUse, setUnitToUse] = useState(null);
  const [planText, setPlanText] = useState('Make private');
  const [selectedPlan, setSelectedPlan] = useState();
  const [planId, setPlanId] = useState();
  const handleCustomPlanBreakdown = planInfo => () => {
    setSelectedPlan(planInfo);
    return customPlanDisclosure.onOpen();
  };
  const breakPoints = [
    {width: 1, itemsToShow: 2.5},
    {width: 1288, itemsToShow: 3},
  ];
  const customPlanDisclosure = useDisclosure();

  const {isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose} = useDisclosure();
  const {isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose} = useDisclosure();

  const openEditModal = unit => {
    setUnitToUse(unit);
    onEditOpen();
  };

  const openDeleteModal = unit => {
    setUnitToUse(unit);
    onDeleteOpen();
  };

  const handleButtonClick = unit => {
    setPlanId(unit?.id);
    openDeleteModal(unit);
  };

  return (
    <Box minH="400px" h="fit-content" position={'relative'} {...wrapper}>
      <HStack mt="80px" spacing="19px" {...containerStyle} justify={`space-between`}>
        <Text fontSize="28px" fontWeight="500" color="#191919" lineHeight="41px" pb={4}>
          Payment Plan
        </Text>
        <CreateNewPaymentPlan refetch={refetch} unitId={PAYMENT_PLAN_DATA[0]?.bundle?.id} />
      </HStack>

      <Flex
        px="0"
        justify="flex-start"
        gap="22px"
        position={'relative'}
        // flexWrap="wrap"
        overflowX="auto"
        sx={customScrollbarStyles}
        minW="420px"
        w="full"
      >
        {PAYMENT_PLAN_DATA?.length > 0 &&
          PAYMENT_PLAN_DATA.map((unit, index) => (
            <Stack
              // mr={'25px'}
              key={index}
              bg="#fff"
              py="28px"
              px="26.4px"
              maxH="385px"
              minH="385px"
              h="fit-content"
              spacing="35.2px"
              borderRadius="8px"
              border="1px solid #EAECF0"
              // w={{base: '146px', lg: '411px'}}
              w="411px"
              minW="411px"
            >
              <HStack justify="space-between" w="full" align="center">
                <Stack spacing="1.7px">
                  <Text
                    textTransform="capitalize"
                    fontSize="30.8px"
                    fontWeight="600"
                    color="#191919"
                  >
                    {unit?.payment_period_in_months} Months
                  </Text>
                  <Text fontSize="15.4px" fontWeight="400" color="#606060">
                    Duration
                  </Text>
                </Stack>
                {unit?.is_private == false ? (
                  <Image src={paymentplancardIcon.src} alt="paymentlan icon" />
                ) : (
                  <Image src={paymentplanprivatecardIcon.src} alt="paymentlanprivate icon" />
                )}
              </HStack>
              <SimpleGrid columns={2} w="full" spacing="35.2px">
                <Stack spacing="4.2px">
                  <Text fontSize="15.4px" fontWeight="400" color="#606060">
                    Purchase Price
                  </Text>

                  {/* 
                      <HoverOnAmount
                        text={unit?.purchase_price}
                        fontSize="19.8px"
                        fontWeight="500"
                        color="#191919"
                      />
                     */}
                  <Text
                    fontSize={
                      unit?.purchase_price >= 10000000
                        ? `13px`
                        : unit?.purchase_price >= 100000000
                          ? `16px`
                          : '18px'
                    }
                    fontWeight="500"
                    color="#191919"
                  >
                    {formatToCurrency(unit?.purchase_price)}
                  </Text>
                </Stack>
                <Stack spacing="4.2px">
                  <Text fontSize="15.4px" fontWeight="400" color="#606060">
                    Initial Deposit
                  </Text>

                  {/* {
                      <HoverOnAmount
                        text={unit?.initial_deposit_in_value}
                        fontSize="19.8px"
                        fontWeight="500"
                        color="#191919"
                      />
                    } */}
                  <Text
                    fontSize={
                      unit?.initial_deposit_in_value >= 10000000
                        ? `13px`
                        : unit?.initial_deposit_in_value >= 100000000
                          ? `16px`
                          : '18px'
                    }
                    fontWeight="500"
                    color="#191919"
                  >
                    {formatToCurrency(unit?.initial_deposit_in_value)}
                  </Text>
                </Stack>
                {unit?.plan_type == 'custom' ? (
                  <HStack spacing="none">
                    <Text
                      fontSize="14px"
                      color="#4545FE"
                      fontWeight="500"
                      cursor="pointer"
                      borderRadius="0px"
                      whiteSpace="nowrap"
                      borderBottom="1px solid #4545FE"
                      onClick={handleCustomPlanBreakdown(unit)}
                    >
                      View payment breakdown
                    </Text>
                    <Image src={rightIcon.src} alt="right Icon" />
                  </HStack>
                ) : (
                  <>
                    {unit?.payment_frequency?.toLowerCase() == 'flexible' ? null : (
                      <Stack spacing="4.2px">
                        <Text
                          fontSize="15.4px"
                          w="full"
                          whiteSpace="nowrap"
                          fontWeight="400"
                          color="#606060"
                        >
                          Installment
                        </Text>
                        <Text
                          fontSize={
                            unit?.periodic_payment >= 10000000
                              ? `13px`
                              : unit?.periodic_payment >= 100000000
                                ? `16px`
                                : '18px'
                          }
                          fontWeight="500"
                          color="#191919"
                        >
                          {formatToCurrency(unit?.periodic_payment)}
                        </Text>
                      </Stack>
                    )}
                    {unit?.plan_type !== 'custom' && unit?.payment_frequency !== null ? (
                      <Stack spacing="4.2px">
                        <Text
                          fontSize="15.4px"
                          whiteSpace="nowrap"
                          fontWeight="400"
                          color="#606060"
                        >
                          Payment Frequency
                        </Text>

                        <Text
                          textTransform={'capitalize'}
                          fontSize="19.8px"
                          fontWeight="500"
                          color="#191919"
                        >
                          {unit?.payment_frequency?.toLowerCase()}
                        </Text>
                      </Stack>
                    ) : null}
                  </>
                )}
              </SimpleGrid>

              <HStack spacing="19.8px" justify="start">
                <Button
                  bg="transparent"
                  fontSize="14px"
                  fontWeight="500"
                  onClick={() =>
                    window.open(`${unit?.contract?.length ? unit?.contract?.[0] : ''}`, '_blank')
                  }
                  color="#191919"
                  w="fit-content"
                  _hover={{
                    opacity: '1',
                  }}
                  padding={`8px 16px`}
                  borderRadius={`72px`}
                  border={`1px solid`}
                  borderColor={`#D6D6D6`}
                  boxShadow={`0px 1px 2px 0px rgba(16, 24, 40, 0.05)`}
                  fontFamily={'Euclid Circular B'}
                  lineHeight={`150%`}
                >
                  View Contract
                </Button>
                {!!unit?.is_private == false && (
                  <Button
                    leftIcon={
                      <Image
                        filter={'brightness(0)'}
                        src={lockIcon.src}
                        fontSize="8px"
                        alt="lock icon"
                      />
                    }
                    fontWeight="500"
                    _hover={{
                      opacity: 1,
                    }}
                    onClick={() => handleButtonClick(unit)}
                    color="#191919"
                    fontSize="14px"
                    background="transparent"
                    padding={`8px 16px`}
                    borderRadius={`72px`}
                    border={`1px solid`}
                    borderColor={`#D6D6D6`}
                    boxShadow={`0px 1px 2px 0px rgba(16, 24, 40, 0.05)`}
                    fontFamily={'Euclid Circular B'}
                    lineHeight={`150%`}
                  >
                    Make Private
                  </Button>
                )}
              </HStack>
            </Stack>
          ))}
      </Flex>
      <PaymentPlanModal
        refetch={refetch}
        isOpen={isEditOpen}
        onClose={onEditClose}
        unitToUse={unitToUse}
      />
      <PaymentPlanDeleteModal
        refetch={refetch}
        setPlanText={setPlanText}
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
        unitToUse={unitToUse}
        planId={planId}
      />
      <CustomPaymentModal selectedPlan={selectedPlan} modalDisclosure={customPlanDisclosure} />
    </Box>
  );
};

export default PaymentPlan;
