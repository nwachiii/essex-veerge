import React, {useState} from 'react';
import {
  Box,
  HStack,
  Image,
  Spinner,
  Stack,
  Button as ChakraBtn,
  Switch,
  Text,
  useDisclosure,
  useToast,
  Icon,
} from '@chakra-ui/react';
import {Container3} from '@/components/common/containers';
import {motion} from 'framer-motion';
import {ChangePasswordModal} from './changePasswordModal';
import {AuthModal} from './auth/authModal';
import {TurnOffTwoFactor} from './auth/TurnOffTwoFactor';
import passwordIcon from '/src/images/icons/password_icon_settings.svg';
import two_auth_icon from '/src/images/icons/two_auth_settings_icon.svg';
import {useMutation} from '@tanstack/react-query';
import {updateTwoFac} from '/src/apis/settings';
import infoCircle from '/src/images/icons/blueInfoCircle.svg';
import switchIsTrue from '/src/images/icons/switch-icon-true.svg';
import switchIsFalse from '/src/images/icons/switch-icon-off.svg';
import How2FAWorks from '@/components/Drawers/how2FAWorks';
import {LiaAngleDownSolid} from 'react-icons/lia';

export const SecurityBox = ({isMfa, isAccountActive, refetch}) => {
  const [isAuthModalOpen, setAuthModal] = useState(false);
  const how2FAWorksModal = useDisclosure();
  const [isChangePasswordModalOpen, setChangePasswordModal] = useState(false);
  const [twoFac, setTwoFac] = useState(isMfa);
  const {
    isOpen: turnOffModalIsOpen,
    onClose: turnOffModalOnClose,
    onOpen: turnOffModalOnOpen,
  } = useDisclosure();

  console.log(isMfa, 'isMfa', isAuthModalOpen);

  const onCloseChangePasswordModal = () => {
    setChangePasswordModal(false);
  };
  const onOpenChangePasswordModal = () => {
    setChangePasswordModal(true);
  };

  const onCloseAuthModal = () => {
    setAuthModal(false);
  };

  const onOpenAuthModal = () => {
    if (isMfa) {
      return turnOffModalOnOpen();
    }
    setAuthModal(true);
  };
  return (
    <>
      {isAccountActive() ? (
        <HStack cursor="pointer" justifyContent="space-between" onClick={onOpenAuthModal}>
          <HStack spacing="12px">
            <Image src={two_auth_icon.src} boxSize="24px" alt="lock icon" fontSize="12px" />
            <Stack spacing={'0'} flex={'1'}>
              <HStack w="full" spacing="14px" align={'center'}>
                <Text fontSize="14px" fontWeight="400" lineHeight="17.75px" color="#191919">
                  2-factor authentication
                </Text>
              </HStack>
              {/* <HStack
              // mt={'-10px'}
              cursor={'pointer'}
              // pl={'40px'}
              as={'span'}
              spacing="5px"
              onClick={how2FAWorksModal.onOpen}
            >
              <Image alt="learn more icon" src={infoCircle.src} />
              <Text color="#4545FE" fontWeight="300">
                How does this work?
              </Text>
            </HStack> */}
            </Stack>
          </HStack>

          <Icon color="#cbcbcb" as={LiaAngleDownSolid} transform="rotate(-90deg)" />

          {/* <Box  cursor={'pointer'}> */}
          {/* <Image alt="" h="18px" w="34px" src={switchIsTrue.src} />  */}
          {/* <ChakraBtn
              borderRadius="72px"
              px="20px"
              border={isMfa ? '1px solid #FF6A6A' : 'none'}
              py="10px"
              fontSize="14px"
              color={isMfa ? '#FF6A6A' : '#fff'}
              _hover={{
                opacity: 1,
              }}
              fontWeight="400"
              bg={isMfa ? 'rgba(255, 106, 106, 0.20)' : '#4545FE'}
            >
              {!isMfa ? 'Enable' : 'Disable'}
            </ChakraBtn> */}

          {/* // <Image
            //   alt=""
            //   onClick={onOpenAuthModal}
            //   justifySelf="flex-end"
            //   h="18px"
            //   w="34px"
            //   src={switchIsFalse.src}
            // /> */}
          {/* </Box> */}
          {/* {<Switch size='md' name='twoFac' colorScheme='blue' justifySelf='flex-end' isChecked={isMfa} onChange={onOpenAuthModal} />} */}
          <AuthModal
            isModalOpen={isAuthModalOpen}
            onModalClose={onCloseAuthModal}
            refetch={refetch}
          />
          <TurnOffTwoFactor
            isModalOpen={turnOffModalIsOpen}
            onModalClose={turnOffModalOnClose}
            refetch={refetch}
          />
        </HStack>
      ) : null}
      <How2FAWorks drawerModal={how2FAWorksModal} />
    </>
  );
};
export default SecurityBox;
