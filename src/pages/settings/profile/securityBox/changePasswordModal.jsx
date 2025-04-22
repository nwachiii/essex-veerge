import React, {useState} from 'react';
import {
  Heading,
  FormControl,
  Stack,
  Link,
  Text,
  Input,
  Flex,
  HStack,
  useToast,
} from '@chakra-ui/react';
import {useFormik} from 'formik';
import {Button, CreateToast, Popup2} from '../../../../ui-lib/ui-lib.components';
import {useMutation} from '@tanstack/react-query';
import Swal from 'sweetalert2';
import {updatePassword} from '../../../../apis/settings';
import PasswordStrengthBar from 'react-password-strength-bar';

export const ChangePasswordModal = ({isModalOpen, onModalClose}) => {
  const [score, setScore] = useState(0);
  const toaster = CreateToast();
  const toast = useToast();
  const validateForm = values => {
    const errors = {};

    if (!values.old_password) errors.old_password = 'Please enter the current Password';

    if (!values.password) errors.password = 'Please enter the New Password';

    if (!values.retype_password) errors.retype_password = 'Please re-enter the Password';

    if (values.password !== values.retype_password) {
      errors.retype_password = 'Password is not matched with new password';
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      password: '',
      retype_password: '',
      old_password: '',
    },
    onSubmit: values => {
      mutation.mutate({
        password: values.password,
        old_password: values.old_password,
      });
    },
    validate: validateForm,
    validateOnBlur: true,
  });

  const isValid =
    score >= 3 &&
    formik.values.password === formik.values.retype_password &&
    formik.values.old_password.trim() &&
    formik.values.retype_password.trim() &&
    formik.values.password.trim();

  const mutation = useMutation(
    formData => {
      return updatePassword(formData);
    },
    {
      onSuccess: res => {
        console.log('password updated', res);
        formik.resetForm();
        onModalClose();
        // toast({
        //   title: 'Password Updated Successfully',
        //   status: 'success',
        //   duration: 8000,
        //   isClosable: true,
        //   position: 'top-right',
        // });
        toaster('Password Updated Successfully');
      },
      onError: err => {
        console.log(err);
        toast({
          title: 'Oops',
          description:
            err?.response?.status === 500
              ? "Apologies for the inconvenience. We're working on it. Please try again later."
              : err?.response?.status === 401
              ? 'Authentication Timeout: For security reasons, your session has timed out. Please log in again to continue.'
              : err?.response?.data?.message ??
                err?.response?.message ??
                err?.message ??
                'Something went wrong',
          status: 'error',
          duration: 8000,
          isClosable: true,
          position: 'top-right',
        });

        if (err?.response?.data?.message === 'Incorrect password') {
          formik.setFieldValue('old_password', '');
        }
        // onModalClose();
      },
    }
  );

  return (
    <Popup2
      isOpen={isModalOpen}
      onClose={() => {
        formik.resetForm();
        onModalClose();
      }}
      h="fit-content"
    >
      <Popup2.Header lineHeight="normal">Update password</Popup2.Header>
      <Popup2.Description color="#3D3D3D">
      Use a password with a minimum of 8 characters, including 
uppercase,  lowercase letters, a number, & a special character.
      </Popup2.Description>
      <Popup2.Body pr="0">
        <FormControl
          as="form"
          display="flex"
          gap="31px"
          flexDirection="column"
          alignContent="center"
        >
          <Input
            required
            type="password"
            id="old_password"
            name="old_password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.old_password}
            border="1px solid #E4E4E4"
            borderRadius="8px"
            p={'1.5rem 1rem'}
            fontSize="16px"
            w="100%"
            color="#919191"
            fontWeight="400"
            _focusVisible={{
              boxShadow: 'none',
            }}
            placeholder="Current Password"
            _placeholder={{
              color: 'gray.500',
            }}
            error={formik.touched.old_password && formik.errors.old_password}
          />
          <Input
            required
            type="password"
            id="password"
            name="password"
            p={'1.5rem 1rem'}
            w="100%"
            border="1px solid #E4E4E4"
            borderRadius="8px"
            _focusVisible={{
              boxShadow: 'none',
            }}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            placeholder="New Password"
            _placeholder={{
              color: 'gray.500',
            }}
          />
          <Input
            required
            type="password"
            id="retype_password"
            p={'1.5rem 1rem'}
            w="100%"
            name="retype_password"
            onChange={formik.handleChange}
            border="1px solid #E4E4E4"
            borderRadius="8px"
            _focusVisible={{
              boxShadow: 'none',
            }}
            onBlur={formik.handleBlur}
            value={formik.values.retype_password}
            placeholder="Retype Password"
            _placeholder={{
              color: 'gray.500',
            }}
            error={formik.touched.retype_password && formik.errors.retype_password}
          />
          {formik.values.retype_password !== '' &&
            formik?.values?.password !== formik.values.retype_password && (
              <Text mt={-4} fontSize={'12px'} align="left" color="red">
                Passwords do not match!
              </Text>
            )}
        </FormControl>
        {formik?.values?.password ? (<Stack
          spacing={-3}
          w="full"
          overflow="hidden"
          h={formik.values.password.trim() ? '33px' : '0px'}
          transition="ease-in-out 0.3s"
          mt={4}
        >
          <PasswordStrengthBar onChangeScore={setScore} password={formik?.values?.password} />
          <Text fontSize={'12px'} mt={'-5'} as="small" align="left">
            Password strength
          </Text>
        </Stack>): null}
        <Button
          type="submit"
          variant="dark"
          maxW="full"
          bg="#4545FE"
          alignSelf="strech"
          isDisabled={!isValid}
          disabled={formik.isSubmitting}
          isLoading={mutation.isLoading}
          onClick={formik.handleSubmit}
          fontWeight={400}
        >
          Update
        </Button>
      </Popup2.Body>

      {/* <Popup2.Footer>
      </Popup2.Footer> */}
    </Popup2>
  );
};
export default ChangePasswordModal;
