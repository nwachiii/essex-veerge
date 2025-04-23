import React from 'react';

import ScrollToTop from 'utils/scrollToTop';
import {LayoutView} from '@/components/index';
import {HStack, Progress, Stack} from '@chakra-ui/react';
import {BackArrowWithText} from '@/components/assets/BackArrow';
import {useState} from 'react';
import {useEffect} from 'react';
import DisputedEquityDetails from './disputedEquityDetails';
import DisputedEquitySummary from './equitySummary';

const EditDispute = () => {
  const [tab, setTab] = useState('paymentDetails');
  const [step, setStep] = useState(0);
  const handleProgress = (value, tabName) => {
    setStep(value);
    setTab(tabName);
  };
  const handleBack = () => {
    step > 0 && setStep(step - 1);
  };

  const editAssetsTab = {
    paymentDetails: <DisputedEquityDetails setTab={setTab} />,
    summary: <DisputedEquitySummary />,
  };

  useEffect(() => {
    ScrollToTop();
  }, []);
  return (
    <LayoutView
      px={{base: '0px', xl: '30px'}}
      tabPanelStyle={{pb: '0px'}}
      pb="0px"
      activePage={'users'}
    >
      {/* <HStack mt="9.4vh">
        <BackArrowWithText handleClick={handleBack} text={step == 0 ? 'Back' : 'Previous step'} />
      </HStack> */}
      {/* <Stack
    mx="auto"
    mt="17px"
    mb="37px"
    px="42px"
    h="100px"
    bg="#FFFFFF"
    maxW="1284px"
    w="full"
    justify="center"
    borderRadius="16px"
    boxShadow="0px 4px 8px rgba(0, 0, 0, 0.02)"
  >
    <HStack spacing={6} justify="space-between">
      {links.map((link, index) => (
        <Text fontWeight={600} fontSize="18px" color="#191919" lineHeight="23px" key={index}>
          {link}
        </Text>
      ))}
    </HStack>
    <Progress colorScheme="blackAlpha" value={progressValue} {...styles.progressBar} />
  </Stack> */}

      {editAssetsTab[tab]}
    </LayoutView>
  );
};

const links = [
  'Overview',
  'Assign property',
  // 'Equity Documents',
  // 'Allocate Units',
  'Summary',
];

export default EditDispute;
