import {extendTheme, Heading, HStack, Progress, Stack, Text} from '@chakra-ui/react';
import {theme} from '../../../theme';
import {LayoutView} from '../../../components';
import CustomerDetails from './CustomerDetails';
import React, {useEffect, useState} from 'react';
import ScrollToTop from '../../../utils/scrollToTop';
import CustomerAccountSummary from './CustomerAccountSummary';
import CustomerListingDetails from './CustomerListingDetails';
import {BackArrowWithText} from '/src/components/assets/BackArrow';
import {useRouter} from 'next/router';
import {isRoleRestricted} from 'ui-lib/ui-lib.hooks/isRoleRestricted';
import {useSmallerLaptopsBreakpoint} from 'ui-lib/ui-lib.hooks';

export const CreateCustomerAccount = () => {
  let subPages = [];
  const router = useRouter();
  const [step, setStep] = useState(0);
  const isSmallerLaptop = useSmallerLaptopsBreakpoint();
  const handleProgress = value => {
    setStep(value);
  };
  const handleBack = () => {
    step > 0 ? setStep(step - 1) : router.back(-1);
  };
  subPages = [
    <CustomerDetails key={1} handleProgress={handleProgress} subPages={subPages} />,
    <CustomerListingDetails key={2} handleProgress={handleProgress} subPages={subPages} />,
    <CustomerAccountSummary
      key={3}
      step={step}
      handleProgress={handleProgress}
      subPages={subPages}
    />,
  ];
  const [customerID, setCustomerID] = useState(
    typeof window !== 'undefined' && localStorage && JSON.parse(localStorage.getItem('customer'))
  );
  const progressValue = 10 + step * parseInt(150 / subPages.length - 1);

  useEffect(() => {
    isRoleRestricted('create customer accounts').check ? router.back() : null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    ScrollToTop();
  }, []);
  useEffect(() => {
    const handleStorageChange = () => {
      setCustomerID(JSON.parse(localStorage.getItem('customer')));
    };

    window.addEventListener('storage', handleStorageChange);

    // !customerID ? setStep(0) : null;
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [customerID]);

  return (
    <div>
      <LayoutView
        maxW="full"
        tabPanelStyle={{px: '0px', pb: '0px'}}
        px="0px"
        pb="30px"
        activePage={'users'}
      >
        <HStack
          px={{base: `16px`, xl: '78px'}}
          mx="auto"
          mt={`clamp(52px,calc(10.4vh + 40px),82px)`}
          maxW="1100px"
          w="full"
          mb="10px"
        >
          {/* <BackArrowWithText handleClick={handleBack} text={step == 0 ? 'Back' : 'Previous step'} /> */}
          {step == 0 ? <BackArrowWithText handleClick={handleBack} text="Back" mt="2vh" /> : null}
        </HStack>
        <Stack
          px={{base: `16px`, xl: '78px'}}
          align="center"
          maxW="1100px"
          w="full"
          mx="auto"
          h={isSmallerLaptop ? '60vh' : ''}
        >
          {subPages[step]}
        </Stack>
      </LayoutView>
    </div>
  );
};

const links = ['Overview', 'Assign property', 'Summary'];

export default CreateCustomerAccount;
