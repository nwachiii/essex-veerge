import {Center, Flex, Image} from '@chakra-ui/react';
import React from 'react';
import {Button} from '../../ui-lib';
import blueDiscountIcon from '/src/images/icons/blue-billing-discount.svg';
import orangeDiscountIcon from '/src/images/icons/billing-annual-discount.svg';

const BillingFreqency = ({setBillingFreq, billingFreq}) => {
  const styles = {
    width: '145px',
    height: '48px',
    color: '#FFF',
    fontSize: '14px',
    fontWeight: '500',
    borderRadius: '12px',
    position: 'relative',
    // background: '#4545FE',
    background: '#242526',
    border: '1px solid #E4E4E4',
    fontFamily: 'Euclid Circular B',
  };

  return (
    <Flex w="700px" mx="auto" justify="center" gap="90px" mt="15px">
      <Button
        {...styles}
        // background={billingFreq == 'monthly' ? '#4545FE' : '#FFF'}
        background={billingFreq == 'monthly' ? '#242526' : '#FFF'}
        // color={billingFreq == 'monthly' ? '#FFF' : '#4545FE'}
        color={billingFreq == 'monthly' ? '#FFF' : '#242526'}
        onClick={() => setBillingFreq('monthly')}
      >
        Monthly
      </Button>
      <Button
        {...styles}
        // background={billingFreq == 'six-months' ? '#4545FE' : '#FFF'}
        background={billingFreq == 'six-months' ? '#242526' : '#FFF'}
        // color={billingFreq == 'six-months' ? '#FFF' : '#4545FE'}
        color={billingFreq == 'six-months' ? '#FFF' : '#242526'}
        onClick={() => setBillingFreq('six-months')}
      >
        6 Months{' '}
        {/* <Image
          alt=""
          position={'absolute'}
          top={'-18%'}
          right={'-5%'}
          src={blueDiscountIcon.src}
          boxSize={'22px'}
        /> */}
        <Center
          position={'absolute'}
          top={'-18%'}
          right={'-5%'}
          bg="#242526"
          color="#fff"
          h="27px"
          w="27px"
          borderRadius="50%"
          fontSize={'10px'}
          fontWeight={'700'}
        >
          -5%
        </Center>
      </Button>
      <Button
        {...styles}
        // background={billingFreq == 'annually' ? '#4545FE' : '#FFF'}
        background={billingFreq == 'annually' ? '#242526' : '#FFF'}
        // color={billingFreq == 'annually' ? '#FFF' : '#4545FE'}
        color={billingFreq == 'annually' ? '#FFF' : '#242526'}
        onClick={() => setBillingFreq('annually')}
      >
        Annually{' '}
        {/* <Image
          alt=""
          position={'absolute'}
          top={'-18%'}
          right={'-5%'}
          src={orangeDiscountIcon.src}
          boxSize={'22px'}
        /> */}
        <Center
          position={'absolute'}
          top={'-18%'}
          right={'-5%'}
          bg="#FF9103"
          color="#fff"
          h="27px"
          w="27px"
          borderRadius="50%"
          fontSize={'10px'}
          fontWeight={'700'}
        >
          -10%
        </Center>
      </Button>
    </Flex>
  );
};

export default BillingFreqency;
