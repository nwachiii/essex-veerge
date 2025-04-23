import React from 'react';
import {Popup} from 'ui-lib/ui-lib.components';
import {Text, Box, Flex, HStack, Image, ModalCloseButton} from '@chakra-ui/react';
import {scrollBarStyles} from '@/components/common/ScrollbarStyling';
import paymentplancardIcon from '/src/images/icons/paymentplancardIcon.svg';
import {formatAmountWithDecimal} from 'utils';

export const ViewPaymentBreakdownModal = ({modal, plan}) => {
  //   console.log('HKKH', plan);

  const monthTense = item => (item?.period_in_months == '1' ? 'month ' : 'months ');

  function getOrdinalSuffix(number) {
    const suffixes = ['th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'];

    const remainderTen = number % 10;
    const remainderHundred = number % 100;

    return number + (suffixes[number % 100] || suffixes[remainderTen] || suffixes[0]);
  }

  return (
    <div>
      <Popup
        mt="2vh"
        // px="20px"
        size="full"
        minH="341px"
        hideCloseBtn
        color="#191919"
        isOpen={modal?.isOpen}
        onClose={modal?.onClose}
        closeOnOverlayClick={false}
        minW={{base: '90%', md: '420px'}}
      >
        <HStack align="start" justify="space-between">
          <Image src={paymentplancardIcon.src} alt="paymentlan icon" />

          <ModalCloseButton color="#000000" position="initial" />
        </HStack>

        <Popup.Body overflowY="auto" style={scrollBarStyles} h="341px" px="20px">
          <Text align={'left'} w="full" fontSize="20px" fontWeight={600}>
            Payment Breakdown
          </Text>
          <Flex justify={'space-between'} w="full" borderBottom={'1px solid #f5f5f5'} py="14px">
            <Text style={leadTextStyles}>Initial deposit</Text>
            <Text style={amountStyles}>
              {formatAmountWithDecimal(plan?.initial_deposit_in_value)}
            </Text>
          </Flex>
          {plan?.custom_payments?.map((item, idx) => (
            <Flex
              key={idx}
              justify={'space-between'}
              w="full"
              borderBottom={'1px solid #f5f5f5'}
              py="14px"
            >
              <Box>
                <Text style={leadTextStyles}>{`${getOrdinalSuffix(idx + 1)} installment`}</Text>
                <Text style={smallTextStyles}>{`${item?.period_in_months} ${monthTense(
                  item
                )}after initial deposit`}</Text>
              </Box>
              <Text style={amountStyles}>{formatAmountWithDecimal(item?.amount)}</Text>
            </Flex>
          ))}
        </Popup.Body>
      </Popup>
    </div>
  );
};

export default ViewPaymentBreakdownModal;

const amountStyles = {
  color: '#191919',
  fontSize: '16px',
  fontStyle: 'normal',
  fontWeight: '500',
  lineHeight: 'normal',
  fontFamily: 'Euclid Circular B',
};

const leadTextStyles = {
  color: '#3D3D3D',
  fontSize: '14px',
  fontWeight: '400',
  fontStyle: 'normal',
  lineHeight: 'normal',
  fontFamily: 'Euclid Circular B',
};

const smallTextStyles = {
  color: '#606060',
  fontFamily: 'Euclid Circular B',
  fontSize: '10px',
  fontStyle: 'normal',
  fontWeight: '400',
  lineHeight: 'normal',
};
