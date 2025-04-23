import {Text} from '@chakra-ui/react';
import {useQuery} from '@tanstack/react-query';
import React from 'react';
import {fetchPaymentPlanContract} from '../../../../../apis/listings';

export const PaymentPlanContract = planData => {
  const PAYMENT_PLAN_CONTRACT_QUERY = useQuery(['payment_plan_contract'], () =>
    fetchPaymentPlanContract(planData?.planData?.id)
  );

  const PAYMENT_PLAN_CONTRACT = PAYMENT_PLAN_CONTRACT_QUERY?.data?.data?.results[0]?.document_file;

  return (
    <div>
      <Text
        as={'a'}
        href={PAYMENT_PLAN_CONTRACT}
        target="_blank"
        display="flex"
        mt="3px"
        cursor="pointer"
        fontSize="14px"
        fontWeight={500}
        color={'#191919'}
      >
        View purchase agreement
        {/* <FaCaretRight style={{marginTop: '3px'}} fontSize='18px' color='#191919' /> */}
      </Text>
    </div>
  );
};

export default PaymentPlanContract;
