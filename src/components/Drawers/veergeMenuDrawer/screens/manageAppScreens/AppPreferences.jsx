import {
  DrawerBody,
  DrawerCloseButton,
  HStack,
  Icon,
  Image,
  Spinner,
  Stack,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react';
import React from 'react';

import {WhatsappURLDrawer} from '../../components/manageApp/WhatsappDrawer';
import {RealtorsPortalToggle} from '../../components/manageApp/RealtorsPortalToggle';
import {AboutUsDrawer} from '../../components/manageApp/AboutUsDrawer';
import {WalletToggle} from '../../components/manageApp/walletToggle';
import {GoArrowLeft} from 'react-icons/go';
import WalletWithdrawalToggle from '../../components/manageApp/walletWithdrawalToggle';
import { AppImageDrawer } from '../../components/manageApp/AppImageDrawer';
const AppPreferences = ({
  customScrollbarStyles,
  manageAppPatchHandler,
  storeInfo,
  handleScreen,

  mutation,
}) => {
  const storeData = storeInfo.data?.data;
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
        <HStack cursor="pointer" onClick={handleScreen('manageApp')} spacing="8px">
          <Icon boxSize="20px" as={GoArrowLeft} />
          <Text fontSize={`16px`} fontWeight="600" lineHeight="20.29px" color="#191919">
            App Preference & Features
          </Text>
        </HStack>

        {/* <VStack
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
        </VStack> */}
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
            <AppImageDrawer storeData={storeData} refetch={storeInfo?.refetch} />
            <RealtorsPortalToggle
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
            <WalletWithdrawalToggle
              hasAccessToWallet={storeData?.wallet_toggle}
              isWalletWithDrawalActive={storeData?.withdrawal_enabled}
              manageAppPatchHandler={manageAppPatchHandler}
              mutation={mutation}
            />
            <WhatsappURLDrawer url={storeData?.whatsapp_url} refetch={storeInfo.refetch} />
            <AboutUsDrawer url={storeData?.about_us} refetch={storeInfo.refetch} />
          </Stack>
        )}
      </DrawerBody>
    </>
  );
};

export default AppPreferences;
