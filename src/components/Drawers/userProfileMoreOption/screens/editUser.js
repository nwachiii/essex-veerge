import {
  Box,
  Button,
  DrawerBody,
  DrawerCloseButton,
  Flex,
  Heading,
  HStack,
  Image,
  Input,
  Spinner,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import {useMutation} from '@tanstack/react-query';
import {updateCustomerName} from 'apis/customers';
import {useFormik} from 'formik';
import {useState} from 'react';
import editUserIcon from '/src/images/icons/editUserIcon.svg';
import {toastForError} from 'utils/toastForErrors';
import backIcon from '/src/images/icons/backArrowForDrawer.svg';
import useLocalStorage from 'utils/useLocalStorage';
import {OTPInput} from 'chakra-otp-input';
import axios from 'axios';
import {BaseURL_ONE} from 'constants/routes';
import {updateTwoFac} from 'apis/settings';

export const EditUserDrawer = ({
  handleScreen,
  customScrollbarStyles,
  handleClose,
  customerInfo,
  refetch,
}) => {
  const toast = useToast();
  const [emailOTP, setEmailOTP] = useState(null);
  const [developer] = useLocalStorage('loggedinUser');
  const [screen, setScreen] = useState('info');

  const mutation = useMutation(formData => updateTwoFac(formData), {
    onSuccess: async res => {
      toast({
        title: 'Email Verified!',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
      await formik.handleSubmit();
      handleClose();
    },
    onError: err => {
      console.log(err);
      toastForError(err, true, toast);
    },
  });

  const validateForm = values => {
    const errors = {};
    if (!values.first_name) {
      errors.first_name = 'First name is required';
    }
    if (!values.last_name) {
      errors.last_name = 'Last name is required';
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      first_name: customerInfo?.first_name,
      last_name: customerInfo?.last_name,
      middle_name: customerInfo?.middle_name,
    },
    onSubmit: values => {
      mutate(values);
    },
    validate: validateForm,
    validateOnBlur: true,
    validateOnChange: true,
    validateOnMount: true,
  });

  const {mutate, isLoading} = useMutation({
    mutationFn: async values => {
      try {
        await updateCustomerName(customerInfo?.user?.id, values);
        refetch();
        toast({
          title: 'Success',
          position: 'top-right',
          description: 'User details updated successfully',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        handleClose();
      } catch (error) {
        toastForError(error, true, toast);
      }
    },
  });

  const handleVerify = () => {
    mutation.mutate({
      code: emailOTP,
      update: true,
    });
  };

  return (
    <>
      <HStack
        py="30px"
        px="25px"
        h="49.699px"
        bg="#F5F5F5"
        align="center"
        position="relative"
        justify="space-between"
      >
        <Flex gap="5px">
          {screen !== 'submit' && (
            <Image
              alt="back icon"
              cursor="pointer"
              src={backIcon.src}
              onClick={screen === 'otp' ? () => setScreen('info') : handleScreen('options')}
            />
          )}
          <Heading fontSize="18.9px" fontWeight="700">
            Edit Name
          </Heading>
        </Flex>
      </HStack>
      {screen === 'info' && (
        <>
          <DrawerBody
            sx={customScrollbarStyles}
            display="flex"
            flexDirection="column"
            paddingTop="1rem"
            mr="2px"
            w="400px"
            position={'relative'}
            h="full"
            flex={1}
            justifyContent="space-between"
          >
            <VStack w="full" gap="24px" p={2}>
              <VStack align="start" w="full">
                <Text fontSize="14px" fontWeight={500} letterSpacing="0.26px" color="#3F3F46">
                  First Name
                </Text>
                <Input
                  value={formik.values.first_name}
                  onChange={formik.handleChange('first_name')}
                  border={'1px solid #E4E4E4'}
                  placeholder="Enter First Name"
                  p="8px 12px"
                  boxShadow="0px 1px 2px 0px rgba(16, 24, 40, 0.05)"
                  type="text"
                  borderRadius={'8px'}
                  isInvalid={formik.errors.first_name && formik.touched.first_name}
                  onBlur={formik.handleBlur('first_name')}
                />
              </VStack>
              <VStack align="start" w="full">
                <Text fontSize="14px" fontWeight={500} letterSpacing="0.26px" color="#3F3F46">
                  Last Name
                </Text>
                <Input
                  value={formik.values.last_name}
                  onChange={formik.handleChange('last_name')}
                  border={'1px solid #E4E4E4'}
                  placeholder="Enter Last Name"
                  p="8px 12px"
                  boxShadow="0px 1px 2px 0px rgba(16, 24, 40, 0.05)"
                  type="text"
                  borderRadius={'8px'}
                />
              </VStack>
              <VStack align="start" w="full">
                <Text fontSize="14px" fontWeight={500} letterSpacing="0.26px" color="#3F3F46">
                  Middle name (optional)
                </Text>
                <Input
                  value={formik.values.middle_name}
                  onChange={formik.handleChange('middle_name')}
                  border={'1px solid #E4E4E4'}
                  placeholder="Enter Middle Name"
                  p="8px 12px"
                  boxShadow="0px 1px 2px 0px rgba(16, 24, 40, 0.05)"
                  type="text"
                  borderRadius={'8px'}
                />
              </VStack>
            </VStack>
            <Button
              bg={'#000'}
              w="full"
              h="45px"
              color={'#FFFFFF'}
              borderRadius={'72px'}
              _hover={{background: '#121212'}}
              _active={{background: '#121212'}}
              _focus={{background: '#121212'}}
              fontWeight={400}
              mb="20px"
              onClick={() => setScreen('submit')}
              isDisabled={!formik.isValid || !formik.dirty}
            >
              Proceed
            </Button>
          </DrawerBody>
        </>
      )}
      {screen === 'otp' && (
        <>
          <DrawerBody
            sx={customScrollbarStyles}
            display="flex"
            flexDirection="column"
            paddingTop=".5rem"
            w="400px"
            position={'relative'}
            h="full"
            flex={1}
            justifyContent="space-between"
          >
            <VStack align="start" w="full" gap="16px" p={2}>
              <Box>
                <Text fontSize="16px" fontWeight={500} textAlign="start">
                  Verify it's you
                </Text>
                <Text fontSize="14px" fontWeight={300} w="330px">
                  We have sent a 6 digit OTP code from your authenticator app. Kindly input to
                  verify and continue.
                </Text>
              </Box>
              <OTPInput
                style={{
                  color: '#191919',
                  background: '#E5E5E5',
                  boxShadow: 'none',
                  fontWeight: 400,
                }}
                value={emailOTP}
                type="number"
                noInputs={6}
                onChange={value => setEmailOTP(value)}
              />
            </VStack>
            <Button
              bg={'#000'}
              w="full"
              h="45px"
              color={'#FFFFFF'}
              borderRadius={'72px'}
              _hover={{background: '#121212'}}
              _active={{background: '#121212'}}
              _focus={{background: '#121212'}}
              fontWeight={400}
              mb="20px"
              onClick={handleVerify}
              isDisabled={emailOTP?.length < 6}
            >
              Proceed
            </Button>
          </DrawerBody>
        </>
      )}
      {screen === 'submit' && (
        <>
          <DrawerBody
            sx={customScrollbarStyles}
            display="flex"
            flexDirection="column"
            paddingTop="1rem"
            mr="2px"
            w="400px"
            position={'relative'}
            h="full"
            flex={1}
            justifyContent="space-between"
            mt="52px"
          >
            <VStack textAlign="center" justify="center" align="center" w="full" gap="16px" p={2}>
              <Image src={editUserIcon.src} altt="edit user icon" boxSize="36px" />
              <Text fontSize="16px" fontWeight={500}>
                Are you sure you want to update this user’s name?
              </Text>
              <HStack fontFamily="Euclid Circular B" gap={4} mt="10px">
                <Button
                  border="1px solid #FF3636"
                  color="#FF3636"
                  bg={'#fff'}
                  w={'150px'}
                  h={'45px'}
                  fontSize="14px"
                  onClick={() => setScreen('info')}
                  fontWeight={400}
                  _hover={{bg: '#fff'}}
                  rounded="72px"
                >
                  Cancel
                </Button>
                <Button
                  h={'45px'}
                  w={'150px'}
                  bg="#191919"
                  color="#FFF"
                  fontSize="14px"
                  fontWeight={400}
                  onClick={() => setScreen('otp')}
                  _hover={{bg: '#191919'}}
                  isLoading={isLoading}
                  rounded="72px"
                >
                  Yes
                </Button>
              </HStack>
            </VStack>
          </DrawerBody>
        </>
      )}
    </>
  );
};
