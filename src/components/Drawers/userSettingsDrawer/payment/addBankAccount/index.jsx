import React, {useState} from 'react';
import ListOfAccounts from './screens/listOfAccounts';
import AddABankAccount from './screens/addABankAccount';
import ConfirmRemovingAnAccount from './screens/confirmRemovingAnAccount';
import TwoFaVerifcation from '@/components/Drawers/transferownership/screens/verify2fa';
import {useMutation} from '@tanstack/react-query';
import {addABankAccount} from 'apis/settings';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {useToast} from '@chakra-ui/react';
import {toastForError} from 'utils/toastForErrors';

const AddBankAccount = ({mainScreenNav}) => {
  const [screen, setScreen] = useState('list of accounts');
  const [accoundId, setAccountId] = useState('');

  const toast = useToast();
  //   const validateForm = values => {
  //     const errors = {};

  //     if (!Boolean(values.bank_name)) {
  //       errors.bank_name = 'Please Select The Bank !';
  //     }

  //     if (!values.account_number || values.account_number.length != 10) {
  //       errors.account_number = 'Please Enter the 10 digit Account Number !';
  //     } else if (!/^[0-9]+$/.test(values.account_number)) {
  //       errors.account_number = 'Please Enter the Digit Only !';
  //     }
  //     return errors;
  //   };

  const validationSchema = Yup.object({
    bank_name: Yup.string().required('Please Select The Bank'),
    account_number: Yup.string()
      .required('Please Enter the 10 digit Account Number')
      .matches(/^\d+$/, 'Please Enter the Digit Only')
      .min(10, 'Account Number must be at least 10 digits'),
    account_name: Yup.string().required('Account Name is required'),
  });

  const formik = useFormik({
    initialValues: {
      bank_name: '',
      account_number: '',
      account_name: '',
    },
    onSubmit: values => {
      console.log(JSON.stringify(values));
      setScreen('verify 2fa');
      //   mutate(values);
    },

    validationSchema,
    validateOnMount: true,
    validateOnChange: true,
  });

  const handleScreen = scrn => {
    if (screen === 'add bank accounts') {
      formik.resetForm();
    }
    if (scrn === 'list of accounts' && screen === 'confirm account removal') {
      setAccountId('');
    }
    setScreen(scrn);
  };
  const {mutate, isLoading} = useMutation(
    values => {
      return addABankAccount(values);
    },
    {
      onSuccess: res => {
        console.log(res);
        toast({
          title: 'Bank account added successfully',

          status: 'success',
          duration: 8000,
          isClosable: true,
          position: 'top-right',
        });
        setScreen('list of accounts');
        formik.resetForm();
      },
      onError: err => {
        toastForError(err, true, toast);
      },
    }
  );
  const handleSubmit = () => {
    return mutate(formik.values);
  };

  const displayAddBankAccountScreens = scrn => {
    switch (scrn) {
      case 'list of accounts':
        return (
          <ListOfAccounts
            setAccountId={setAccountId}
            mainScreenNav={mainScreenNav}
            handleScreen={handleScreen}
          />
        );
      case 'add bank accounts':
        return <AddABankAccount formik={formik} handleScreen={handleScreen} />;
      case 'verify 2fa':
        return (
          <TwoFaVerifcation
            header="2FA"
            isLoading={isLoading}
            handleVerify={handleSubmit}
            navigateBack={() => setScreen('add bank accounts')}
          />
        );
      case 'confirm account removal':
        return <ConfirmRemovingAnAccount handleScreen={setScreen} accoundId={accoundId} />;
      default:
        return (
          <ListOfAccounts
            setAccountId={setAccountId}
            mainScreenNav={mainScreenNav}
            handleScreen={handleScreen}
          />
        );
    }
  };
  return displayAddBankAccountScreens(screen);
};

export default AddBankAccount;
