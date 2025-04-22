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
} from '@chakra-ui/react';
import {Container3} from '../../../../components/common/containers';
import {motion} from 'framer-motion';
import {ChangePasswordModal} from './changePasswordModal';
import {AuthModal} from './auth/authModal';
import {TurnOffTwoFactor} from './auth/TurnOffTwoFactor';
import passwordIcon from '/src/images/icons/password_icon_settings.svg';
import two_auth_icon from '/src/images/icons/two_auth_settings_icon.svg';
import {useMutation} from '@tanstack/react-query';
import {updateTwoFac} from '../../../../apis/settings';
import infoCircle from '/src/images/icons/blueInfoCircle.svg';
import switchIsTrue from '/src/images/icons/switch-icon-true.svg';
import switchIsFalse from '/src/images/icons/switch-icon-off.svg';
import How2FAWorks from '../../../../components/Drawers/how2FAWorks';

export const SecurityBox = ({isMfa, refetch}) => {
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
    <Container3 titleFontSize="16px" title={'Sign in and security'} border="1px solid #EAECF0" padding="0px 27px">
      <Box pt="30px" pb="21px" borderBottom="1px solid #CBCBCB" display={'flex'}>
        <motion.button>
          <HStack spacing="22px">
            <Image src={passwordIcon.src} alt="password icon" fontSize="9px" />
            <Text onClick={onOpenChangePasswordModal} as="span" fontSize="16px" fontWeight="400">
              Change Password
            </Text>
          </HStack>
        </motion.button>
        <ChangePasswordModal
          isModalOpen={isChangePasswordModalOpen}
          onModalClose={onCloseChangePasswordModal}
        />
      </Box>
      <HStack w="full" justify="space-between" py="13px" align="center" display={'flex'}>
        <Stack spacing={'0'}>
          <HStack w="full" spacing="22px" align={'center'}>
            <Image src={two_auth_icon.src} alt="password icon" fontSize="12px" marginTop={'25px'} />
            <Text as="span" fontSize="16px" fontWeight="400">
              Two Factor Authentication
            </Text>
          </HStack>
          <HStack
            mt={'-10px'}
            cursor={'pointer'}
            pl={'40px'}
            as={'span'}
            spacing="5px"
            onClick={how2FAWorksModal.onOpen}
          >
            <Image alt="learn more icon" src={infoCircle.src} />
            <Text color="#4545FE" fontSize="14px" fontWeight="300">
              How does this work?
            </Text>
          </HStack>
        </Stack>
        <Box mt="15px" justifySelf="flex-end" onClick={onOpenAuthModal} cursor={'pointer'}>
          {/* <Image alt="" h="18px" w="34px" src={switchIsTrue.src} />  */}
          <ChakraBtn
            borderRadius="8.0px"
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
          </ChakraBtn>

          {/* // <Image
            //   alt=""
            //   onClick={onOpenAuthModal}
            //   justifySelf="flex-end"
            //   h="18px"
            //   w="34px"
            //   src={switchIsFalse.src}
            // /> */}
        </Box>
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
      <How2FAWorks drawerModal={how2FAWorksModal} />
    </Container3>
  );
};
export default SecurityBox;
