import {
  DrawerBody,
  DrawerCloseButton,
  HStack,
  Image,
  Spinner,
  Stack,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react';
import React from 'react';
import Qrcode from '../../components/manageApp/qrcode';
import CustomiseApp from '../../components/manageApp/customiseApp';
import UploadTerms from '../../components/manageApp/uploadTerms';
import ChangeTheme from '../../components/manageApp/changeTheme';
import {WhatsappURLDrawer} from '../../components/manageApp/WhatsappDrawer';
import {RealtorsPortalToggle} from '../../components/manageApp/RealtorsPortalToggle';
import {AboutUsDrawer} from '../../components/manageApp/AboutUsDrawer';
import {WalletToggle} from '../../components/manageApp/walletToggle';
import AppPreferenceComponent from '../../components/manageApp/appPreference';

export const ManageApp = ({
  customScrollbarStyles,
  manageAppPatchHandler,
  storeInfo,
  handleScreen,
  closeDrawer,
  mutation,
  navToTermsOfService,
}) => {
  const storeData = storeInfo.data?.data;
  console.log({storeData});
  return (
    <>
      <HStack
        boxShadow="0px 3.20641px 6.41283px 0px rgba(0, 0, 0, 0.02)"
        py="12px"
        bg="#F5F5F5"
        pl="27.3px"
        pr="19.9px"
        justify="space-between"
        align="center"
        position="relative"
      >
        <HStack spacing="8px">
          <Text fontSize={`16px`} fontWeight="600" lineHeight="20.29px" color="#191919">
            Manage Application
          </Text>
        </HStack>

        <VStack
          position="relative"
          justify="center"
          align="center"
          w="30px"
          h="30px"
          borderRadius="5px"
          transition="0.3s ease-in-out"
          _hover={{
            width: '30px',
            height: '30px',
          }}
        >
          <DrawerCloseButton right="0px" left="0px" my="auto" color="#000" top="0" bottom="0" />
        </VStack>
      </HStack>
      <DrawerBody
        maxH="90rem"
        overflowY="auto"
        sx={customScrollbarStyles}
        m="0px"
        pl="27.3px"
        pr="11.9px"
        mr="8px"
        py="20px"
      >
        {storeInfo.isLoading ? (
          <VStack w="full" h="full" justify={'center'}>
            <Spinner />
          </VStack>
        ) : storeInfo.isError ? (
          <VStack w="full" h="full" justify={'center'}>
            <Text w="80%" textAlign="center" fontSize="14px" fontWeight="400" color="#191919">
              {` We encountered an issue while retrieving your web app's details,kindly refresh the page`}
            </Text>
          </VStack>
        ) : (
          <Stack spacing="12px" w="full">
            <ChangeTheme
              closeDrawer={closeDrawer}
              themeColor={storeData?.theme_color}
              themeName={storeData?.sub_theme || storeData?.theme_name}
            />
            <Qrcode domainUrl={storeData?.store_link} />
            <AppPreferenceComponent handleScreen={handleScreen} />
            {/* <RealtorsPortalToggle
              _isAgentPortalActive={storeData?.agent_features}
              _hasAccessToAgents={storeData?.agent_status}
              manageAppPatchHandler={manageAppPatchHandler}
              mutation={mutation}
            />
            <WalletToggle
              hasAccessToWallet={storeData?.wallet_toggle}
              isWalletActive={storeData?.wallet_features}
              manageAppPatchHandler={manageAppPatchHandler}
              mutation={mutation}
            />
            <WhatsappURLDrawer url={storeData?.whatsapp_url} refetch={storeInfo.refetch} />
            <AboutUsDrawer url={storeData?.about_us} refetch={storeInfo.refetch} /> */}
            <UploadTerms
              mutation={mutation}
              agent_terms_and_condition_url={storeData?.agent_document}
              agent_privacy_policy={storeData?.agent_privacy_policy}
              user_terms_and_condition_url={storeData?.customer_document}
              user_privacy_policy={storeData?.customer_privacy_policy}
              manageAppPatchHandler={manageAppPatchHandler}
            />
          </Stack>
        )}
      </DrawerBody>
    </>
  );
};

export default ManageApp;
