import {CourtHouseIcon} from '@/components/assets/courthouse';
import {
  Divider,
  DrawerBody,
  DrawerCloseButton,
  Flex,
  HStack,
  Icon,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import {LiaAngleDownSolid} from 'react-icons/lia';
import moneyIcon from '/src/images/icons/moneyIcon.svg';
import ConfigOptions from './ConfigOptions';
import SecurityBox from '../profile/securityBox/securityBoxComponent';
import ConfigOption from './ConfigOptions';
import ChangePassword from '../profile/securityBox/changePasswordModal';
import {isRoleRestricted} from 'ui-lib/ui-lib.hooks/isRoleRestricted';

const PaymentAndSecurity = ({
  handleScreen,
  mainScreenNav,
  isAccountActive,
  refetch,
  data,
  menu_toggle,
}) => {
  const isNairaBased = () =>
    typeof window !== 'undefined' && localStorage && localStorage.getItem('baseCurrency') === 'NGN';

  return (
    <>
      <HStack
        boxShadow="4px 4px 8px 0px rgba(123, 157, 157, 0.05), -4px -4px 8px 0px rgba(123, 157, 157, 0.15)"
        mb="24px"
        py="12px"
        px="29px"
        h="49.699px"
        justify="space-between"
        align="center"
        position="relative"
        width="full"
        bg="#F5F5F5"
      >
        {menu_toggle}
        <DrawerCloseButton position="initial" />
      </HStack>
      <DrawerBody p="0px" px="20px">
        <Stack
          w="full"
          p="16px 22px"
          border="0.5px solid #e4e4e4"
          bg="#ffffff"
          borderRadius="8px"
          spacing="20px"
          divider={<Divider border="none" h="0.5px" bg="#e4e4e4" m="0" />}
        >
          <ChangePassword />
          <HStack
            justify="space-between"
            onClick={() => mainScreenNav('handle accounts')}
            role="button"
          >
            <HStack spacing="12px">
              <CourtHouseIcon baseColor="#191919" boxSize="24px" />

              <Text fontSize="14px" fontWeight="400" lineHeight="17.75px" color="#191919">
                Add bank account
              </Text>
            </HStack>
            <Icon color="#cbcbcb" as={LiaAngleDownSolid} transform="rotate(-90deg)" />
          </HStack>
          {isNairaBased() && isAccountActive() && !isRoleRestricted('input Bvn').check ? (
            <ConfigOption
              hasBvn={!!data?.data?.develoeper_info?.bvn}
              mainScreenNav={mainScreenNav}
              handleScreen={handleScreen}
            />
          ) : null}

          <SecurityBox
            isAccountActive={isAccountActive}
            isMfa={data?.data?.develoeper_info?.developer?.developer?.is_mfa}
            refetch={refetch}
          />
        </Stack>
      </DrawerBody>
    </>
  );
};

export default PaymentAndSecurity;
