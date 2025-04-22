import React from 'react';
import {AnimatedLoader, LayoutView} from '../../../components';
import {Box} from '@chakra-ui/react';
import AppPageContent from '../../../components/veergeMenu/application/appPageContent';
import Footer from '@/components/veergeMenu/application/components/Footer';

const CreateAndManageApplication = () => {
  return (
    <Box
      w="full"
      bg="linear-gradient(115deg, #061520 5.77%, rgba(6, 21, 32, 0.71) 117.72%)"
      minH="100vh"
    >
      <LayoutView
        maxW="full"
        tabPanelStyle={{px: '0px', pb: '0px'}}
        px="0px"
        pb="30px"
        bg="linear-gradient(115deg, #061520 5.77%, rgba(6, 21, 32, 0.71) 117.72%)"
        noSubNav={true}
      />
      {false ? (
        <AnimatedLoader />
      ) : (
        <Box
          w="full"
          mx="auto"
          bg="linear-gradient(115deg, #061520 5.77%, rgba(6, 21, 32, 0.71) 117.72%)"
        >
          <Box
            w="full"
            px={{base: `30px`, xl: '78px'}}
            mt={`clamp(calc(52px - 100vh),calc(-80vh),calc(82px - 100vh))`}
            mx="auto"
            // bg="linear-gradient(115deg, #061520 5.77%, rgba(6, 21, 32, 0.71) 117.72%)"
          >
            <Box maxW="1440px" zIndex={700} position="relative" mx="auto" w="full" color="#fff">
              <AppPageContent />
            </Box>
          </Box>
          <Footer />
        </Box>
      )}
    </Box>
  );
};
export default CreateAndManageApplication;
