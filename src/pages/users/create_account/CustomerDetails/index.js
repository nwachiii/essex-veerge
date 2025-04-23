import {useFormik} from 'formik';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';

import {useMutation} from '@tanstack/react-query';
import {toastForError} from 'utils/toastForErrors';
import CustomerDetailsForm from './CustomerDetailsForm';
import {UploadProfilePicture, useSmallerLaptopsBreakpoint} from '../../../../ui-lib';
import {createCustomer} from '../../../../apis/customers';
import {MatadorCustomToast} from '../../../veerge_menu/loop';
import {encodeFileToBase64, extractBase64} from '../../../../utils';
import {CUSTOMER_DETAILS} from '../../../../constants/createCustomers';
import {Box, Button, Container, HStack, Spinner, useToast} from '@chakra-ui/react';
import {PHONEPREFIX} from 'constants/PHONEPREFIX';
import capitalizeFirstLetterOfWords from 'utils/capitalizeFirstLetterOfWords';

export default function CustomerDetails({handleProgress}) {
  const toast = useToast();
  const isSmallerLaptop = useSmallerLaptopsBreakpoint();

  const router = useRouter();
  const [arg, setArg] = useState('');
  const [file, setFile] = useState([]);
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('Nigeria');
  const [avatar, setAvatar] = useState([]);
  const [docObj, setDocObj] = useState({name: ''});
  const [fieldValidity, setFieldValidity] = useState(true);
  const user = loggedinUserStatic;

  useEffect(() => {
    window.localStorage.removeItem('customerDetails');
    window.localStorage.removeItem('customer');
    window.localStorage.removeItem('equityDetails');
    window.localStorage.removeItem('allocationDetails');
    window.localStorage.removeItem('payments');
    window.localStorage.removeItem('userId');
  }, []);

  const mutation = useMutation(formData => createCustomer(formData), {
    onSuccess: res => {
      const customerDetails =
        typeof window !== 'undefined' && JSON.parse(localStorage.getItem('customerDetails'));
      localStorage.setItem('customer', JSON.stringify(res?.data?.data?.id));
      localStorage.setItem('userId', JSON.stringify(res?.data?.data?.user?.id));

      setTimeout(() => {
        arg == 'isLead'
          ? router.push(`/users/profile?userId=${res?.data?.data?.user?.id}`)
          : handleProgress(val => val + 1);
      }, 2000);
      toast({
        title: `Account Created Successfully`,
        status: 'success',
        duration: 8000,
        isClosable: true,
        position: 'top-right',
      });
      setArg('');
    },
    onError: err => {
      toastForError(err, true, toast);
      setArg('');
    },
  });
  const createLeadMutation = useMutation(formData => createCustomer(formData), {
    onSuccess: res => {
      localStorage.setItem('customer', JSON.stringify(res.data.data.id));
      setTimeout(() => {
        arg == 'isLead'
          ? (formik.resetForm(), router.push(`/users/profile?userId=${res?.data?.data?.user?.id}`))
          : handleProgress(val => val + 1);
      }, 2000);
      toast({
        title: `Account Created Successfully`,
        status: 'success',
        duration: 8000,
        isClosable: true,
        position: 'top-right',
      });
      setArg('');
    },
    onError: err => {
      toastForError(err, true, toast);
      setArg('');
    },
  });

  const formik = useFormik({
    initialValues: CUSTOMER_DETAILS,
    onSubmit: values => {
      const countryCode = PHONEPREFIX.find(item => item.name === country)?.code;

      const REQUEST_BODY = {
        ...values,
        phone_number: phone,
        country,
        avatar: extractBase64(avatar).toString(),
        id_doc: file.toString(),
        last_name: capitalizeFirstLetterOfWords(values?.last_name),
        first_name: capitalizeFirstLetterOfWords(values?.first_name),
        middle_name: capitalizeFirstLetterOfWords(values?.middle_name),
        notes: values?.notes,
      };
      if (user?.initial_status !== 'Accepted') {
        alert(
          'Your developer account is yet to be verified, Kindly contact support for more enquiry'
        );
      }
      if (fieldValidity == 'true') {
        toast({
          render: () => (
            <MatadorCustomToast description={'Some fields are either empty or invalid'} />
          ),
          duration: 4000,
          isClosable: true,
          position: 'bottom-right',
        });
      } else {
        mutation.mutate(REQUEST_BODY);
        localStorage.setItem(
          'customerDetails',
          JSON.stringify({...REQUEST_BODY, phone_number: `${countryCode}${phone}`})
        );
      }
    },
  });

  const handleCreateLead = () => {
    setArg('isLead');
    const CREATE_LEAD_BODY = {
      ...formik.values,
      phone_number: phone,
      country,
      avatar: extractBase64(avatar)?.toString(),
      id_doc: file?.toString(),
      last_name: capitalizeFirstLetterOfWords(formik.values?.last_name),
      first_name: capitalizeFirstLetterOfWords(formik.values?.first_name),
      middle_name: capitalizeFirstLetterOfWords(formik.values?.middle_name),

      notes: formik?.values?.notes,
    };

    if (fieldValidity == 'true') {
      return toast({
        render: () => (
          <MatadorCustomToast description={'Some fields are either empty or invalid'} />
        ),
        duration: 4000,
        isClosable: true,
        position: 'bottom-right',
      });
    } else {
      return createLeadMutation.mutate(CREATE_LEAD_BODY);
    }
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const isFieldValid =
    !formik.values.email ||
    !emailRegex.test(formik.values.email) ||
    !formik.values.first_name.trim() ||
    !formik.values.last_name.trim() ||
    !phone.replace('+', '');
  useEffect(() => {
    setFieldValidity(isFieldValid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, isFieldValid);

  const handleIdDoc = async arg => {
    setDocObj(arg[0]);
    setFile([await encodeFileToBase64(arg[0]).then(res => res)]);
  };

  console.log({phone, country});

  return (
    <Box w="full">
      <Container
        py="36px"
        pr={{md: '55px', xl: '116px'}}
        pl={{md: '55px', xl: '116px'}}
        w="full"
        maxW={'1100px'}
        color="gray.900"
        borderRadius="16px"
        background="transparent"
        border="1px solid #E4E4E4"
      >
        <Box as="form" onSubmit={formik.handleSubmit} w="full">
          <Box>
            <UploadProfilePicture
              mb="36px"
              mx="auto"
              id="avatar"
              name="avatar"
              files={avatar}
              justify="center"
              setFiles={setAvatar}
            />

            <CustomerDetailsForm
              file={file}
              phone={phone}
              formik={formik}
              docObj={docObj}
              setFile={setFile}
              setPhone={setPhone}
              setDocObj={setDocObj}
              country={country}
              setCountry={setCountry}
              handleIdDoc={handleIdDoc}
            />
          </Box>

          <HStack spacing="24px" mt="36px" ml="auto" maxW="500px" align="center" justify="flex-end">
            <Button
              h="50px"
              w="217px"
              type="button"
              color="#4545FE"
              fontSize="14px"
              fontStyle="normal"
              fontWeight="400"
              lineHeight="normal"
              // borderRadius="12px"
              _hover={{_disabled: {opacity: 0.4}}}
              background="transparent"
              variant="outline-radius"
              isDisabled={isFieldValid}
              onClick={handleCreateLead}
              border="1px solid #4545FE"
              fontFamily="Euclid Circular B"
            >
              {createLeadMutation.isLoading && arg == 'isLead' ? (
                <Spinner color={'#4545FE'} />
              ) : (
                'Create account'
              )}
            </Button>
            <Button
              isDisabled={isFieldValid}
              type="submit"
              _hover={{_disabled: {opacity: 0.4}}}
              h="50px"
              color="#FFFFFF"
              fontFamily="Euclid Circular B"
              fontSize="14px"
              fontStyle="normal"
              fontWeight="400"
              lineHeight="normal"
              variant={'filled-radius'}
              w="217px"
              _active={{opacity: '1'}}
              _focus={{opacity: '1'}}
              // borderRadius="12px"
              background="#4545FE"
            >
              {mutation.isLoading && arg == '' ? <Spinner color={'#FFFFFF'} /> : 'Assign Property'}
            </Button>
          </HStack>
        </Box>
      </Container>
    </Box>
  );
}
