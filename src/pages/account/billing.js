import React, {useState} from 'react';
import {LayoutView} from '../../components';
import {Box, Flex} from '@chakra-ui/react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faAnglesLeft} from '@fortawesome/free-solid-svg-icons';
import {useRouter} from 'next/router';
import {Button} from '../../ui-lib';

export const Billing = () => {
  const router = useRouter();
  const [billingType, setBillingType] = useState('monthly');
  const btnStyles = {
    variant: 'secondary',
    borderRadius: 'xl',
    boxShadow: 'md',
    type: 'button',
    border: '1px solid lightgray',
    w: '179px',
  };
  return (
    <div>
      <LayoutView activePage={'account'} />
      <Box px="35px" position="relative" mt="-78vh">
        <div
          className="cursor-pointer mb-6 pl-10 flex flex-row items-center"
          onClick={() => router.back(-1)}
        >
          <Box
            zIndex="100"
            className=" w-12 h-12 rounded-full bg-[#DCDCDC] justify-center items-center flex mr-1"
          >
            <FontAwesomeIcon icon={faAnglesLeft} className="w-6 h-6" />
          </Box>
          <div className="font-medium text-lg">Back</div>
          <Flex gap="23px" mx="auto">
            <Button onClick={() => setBillingType('monthly')} {...btnStyles}>
              Monthly
            </Button>
            <Button onClick={() => setBillingType('annually ')} {...btnStyles}>
              Annualy
            </Button>
          </Flex>
        </div>
      </Box>

      {billingType == 'monthly' ? <div>Monthly billing</div> : <div>Annually</div>}
    </div>
  );
};

export default Billing;
