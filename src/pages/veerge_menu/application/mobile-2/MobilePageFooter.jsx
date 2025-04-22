import {CloseIcon} from '@chakra-ui/icons';
import {Box, Flex, Text} from '@chakra-ui/react';
import {useEffect, useState} from 'react';

export const MobilePageFooter = () => {
  const [showFooter, setShowFooter] = useState(false);
  const [showPopup, setShowPopup] = useState(true);

  useEffect(() => {
    if (!showPopup) return;
    let oldScroll;
    window.onscroll = function (e) {
      setShowFooter(oldScroll > window.scrollY && window.scrollY > 500);
      oldScroll = window.scrollY;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Flex
        position={'fixed'}
        bottom={'0px'}
        left={'0px'}
        transform={showFooter && showPopup ? 'translateY(0%)' : 'translateY(100%)'}
        transition={'.2s'}
        // background={'#031B2E'}
        // background={'rgb(0, 0, 0)'}
        background={'rgba(3, 27, 46, .7)'}
        zIndex={'2'}
        justify={'center'}
        width={'100%'}
        display={'none'}
      >
        <CloseIcon
          position={'absolute'}
          top={'20px'}
          right={'20px'}
          cursor={'pointer'}
          height={'15px'}
          width={'15px'}
          onClick={() => setShowPopup(false)}
        />
        <Box
          padding={'24px 78px 50px'}
          maxWidth={'1284px'}
          margin={'0px auto'}
          boxSizing="content-box"
        >
          <Text fontSize={'12px'} color={'rgba(194, 194, 194, 0.80)'}>
            The purchase of a theme on our platform is a simple, one-time payment process. Each
            theme intricately covers the complete homebuyer&apos;s journey, from the initial
            purchase to the management of installment payments. Our expansive services are available
            in over 50 countries and support more than 150 currencies, ensuring global reach and
            accessibility. Furthermore, each theme showcased here integrates our innovative Smart
            Allocation System. This feature allows homebuyers to select their preferred units in
            real-time, aligning with the payment milestones set by the development company.
            Additionally, all themes are equipped with fractional ownership and co-ownership
            functionalities, and they remain exclusive to the purchasing development company.
            It&apos;s important to note that deploying a mobile application takes slightly longer
            compared to web applications, due to the necessary approvals from the Apple Store and
            Google Play Store. However, with our platform, managing either application type is
            seamless and requires no coding. This service is exclusively available to subscribers of
            Veerge Plus.
          </Text>
        </Box>
      </Flex>
      <Box
        padding={'24px 78px 50px'}
        maxWidth={'1284px'}
        margin={'0px auto'}
        boxSizing="content-box"
        // opacity={showFooter ? '0' : '1'}
        opacity={'1'}
      >
        <Text fontSize={'12px'} color={'rgba(194, 194, 194, 0.80)'}>
          The purchase of a theme on our platform is a simple, one-time payment process. Each theme
          intricately covers the complete homebuyer&apos;s journey, from the initial purchase to the
          management of installment payments. Our expansive services are available in over 50
          countries and support more than 150 currencies, ensuring global reach and accessibility.
          Furthermore, each theme showcased here integrates our innovative Smart Allocation System.
          This feature allows homebuyers to select their preferred units in real-time, aligning with
          the payment milestones set by the development company. Additionally, all themes are
          equipped with fractional ownership and co-ownership functionalities, and they remain
          exclusive to the purchasing development company. It&apos;s important to note that
          deploying a mobile application takes slightly longer compared to web applications, due to
          the necessary approvals from the Apple Store and Google Play Store. However, with our
          platform, managing either application type is seamless and requires no coding. This
          service is exclusively available to subscribers of Veerge Plus.
        </Text>
      </Box>
    </>
  );
};

export default MobilePageFooter;
