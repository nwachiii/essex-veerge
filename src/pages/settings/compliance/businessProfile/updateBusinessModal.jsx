import React, {useRef, useState} from 'react';
import {
  Heading,
  FormControl,
  Stack,
  Select,
  useToast,
  Input,
  VStack,
  HStack,
  Box,
  Text,
  Modal,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Image,
  ModalOverlay,
  ModalHeader,
} from '@chakra-ui/react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import dropArrow from '/src/images/icons/downArrowsettings.svg';
import {useFormik} from 'formik';
import {Button, Popup2} from '../../../../ui-lib';
import {updateCompliance} from '../../../../apis/settings';
import {useMutation} from '@tanstack/react-query';
import Swal from 'sweetalert2';
import AnimateInput from '../../../../components/AnimateInput';
import {toastForError} from 'utils/toastForErrors';

export const UpdateProfileModal = ({
  isProfileModalOpen,
  onCloseProfileModal,
  initialValues,
  refetch,
  business_name,
}) => {
  const toast = useToast();

  const [phone, setPhone] = useState('');

  const mutation = useMutation(
    formData => {
      return updateCompliance(formData);
    },
    {
      onSuccess: async res => {
        toast({
          title: 'Profile has been updated',
          description: ``,
          status: 'success',
          duration: 8000,
          isClosable: true,
          position: 'top-right',
        });
        await refetch();
        formik.resetForm();
        onCloseProfileModal();
      },
      onError: err => {
        toastForError(err, true, toast);
        // onCloseProfileModal();
      },
    }
  );

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: values => {
      const formData = Object?.fromEntries(
        Object?.entries(initialValues)?.flatMap(([key, value]) =>
          values[key] !== value ? [[key, values[key]]] : []
        )
      );
      mutation.mutate(formData);
    },
  });

  // console.log(
  //   Object.entries(initialValues)?.flatMap(([key, value]) =>
  //     formik.values[key] !== value ? [{[key]: formik.values[key]}] : []
  //   )
  // );

  const isValid = Object.entries(initialValues).some(
    ([key, value]) => formik.values[key] !== value && formik.values[key]?.trim()
  );
  // formik.values?.cac_number?.trim() &&
  // formik.values?.business_mail?.trim() &&
  // formik.values?.phone?.trim() &&
  // formik.values?.website?.trim();

  const styleForPhone = {
    '.react-tel-input': {
      w: 'fit-content',
    },
    '.selected-flag': {
      w: '90px',

      bg: 'transparent',
    },
    '.form-control': {w: '90px', bg: 'transparent'},
  };

  return (
    <Modal isOpen={isProfileModalOpen} onClose={onCloseProfileModal}>
      <ModalOverlay />

      <ModalContent mt="15vh" minW="509px" pb="0px" borderRadius="16px">
        <HStack justify="space-between" w="full" pl="44px" pr="43px">
          <Heading fontSize="24px" fontWeight="600" pb="40px" pt="31px">
            Profile Update
          </Heading>

          <ModalCloseButton position="initial" />
        </HStack>
        <ModalBody py="0px" pl="44px" pr="43px">
          <VStack w="full" spacing="38px">
            {/* <Input
							required
							type='text'
							id='business_name'
							name='business_name'
							onChange={formik.handleChange}
							defaultValue={business_name}
							placeholder='Business Name'
							
							_placeholder={{
								color: 'gray.500',
							}}
						/> */}

            <AnimateInput
              w="full"
              h="55px"
              borderRadius="12px"
              required
              labelColor={'#19191966'}
              type="email"
              pl="15.7px"
              borderColor="#606060"
              id="business_mail"
              name="business_mail"
              onChange={formik.handleChange}
              value={formik.values.business_mail}
              placeholder="Business Email"
              pattern=".+@globex\.com"
              _placeholder={{
                fontSize: '16px',

                color: '#19191966',
              }}
            />

            <HStack w="full" position="relative" spacing="none">
              <VStack
                justify="center"
                align="end"
                w="fit-content"
                h="fit-content"
                bg="#ffffff"
                position="relative"
                top="-5px"
                sx={styleForPhone}
              >
                <HStack
                  px="10px"
                  position="absolute"
                  right="0"
                  left="2px"
                  pointerEvents="none"
                  borderRadius="12px"
                  bg="#ffffff"
                  border="none"
                  w="100px"
                  h="44px"
                  py="10px"
                  pt="16px"
                  zIndex="236789"
                  spacing="5px"
                  justify="space-between"
                >
                  <Text
                    w="100px"
                    zIndex="22"
                    fontSize="16px"
                    fontWeight="400"
                    color="#19191966"
                    pointerEvents="none"
                    textAlign="center"
                    bg="#ffffff"
                  >
                    + {phone || 234}
                  </Text>
                  <Image src={dropArrow.src} alt="drop icon" />
                </HStack>
                <Box id="ysa" position="absolute" left="5px" zIndex="56789" w="fit-content">
                  <PhoneInput
                    id="phoneset"
                    name="phone"
                    country={'ng'}
                    type="tel"
                    inputProps={telInputProps}
                    inputStyle={telInputStyles}
                    countryCodeEditable={false}
                    defaultValue={phone}
                    onKeyPress={e => (e.cancelable ? e.preventDefault() : console.log(''))}
                    onChange={phone => setPhone(phone)}
                  />
                </Box>
              </VStack>
              <AnimateInput
                h="55px"
                mb="0px"
                w="full"
                labelFontS="16px"
                labelColor="#19191966"
                noLabel
                isRequired
                pl="100px"
                id="phone"
                pt={'17px'}
                type="text"
                name="phone"
                borderRadius="12px"
                borderColor={'#606060'}
                onChange={formik.handleChange}
                value={formik.values.phone}
                placeholder="Company's phone number"
                _placeholder={{
                  color: '#19191966',
                }}
              />
            </HStack>
            <AnimateInput
              h="55px"
              w="full"
              pl="15.7px"
              isRequired
              type="text"
              id="website"
              name="website"
              borderRadius="12px"
              pattern="https?://.+"
              borderColor="#606060"
              labelColor={'#19191966'}
              title="Include https://"
              value={formik.values.website}
              onChange={formik.handleChange}
              placeholder="Company's Website"
              _placeholder={{
                fontSize: '14px',
                fontWeight: '400',
                color: '#19191966',
              }}
            />
            <AnimateInput
              w="full"
              h="55px"
              isRequired
              pl="15.7px"
              id="cac_number"
              name="cac_number"
              type="text"
              borderRadius="12px"
              borderColor="#606060"
              labelColor={'#19191966'}
              value={formik.values.cac_number}
              onChange={formik?.handleChange}
              placeholder="Company Registration number"
              _placeholder={{
                fontSize: '14px',
                fontWeight: '400',
                color: '#19191966',
              }}
            />
          </VStack>
        </ModalBody>

        <ModalFooter py="24px">
          <Button
            variant="dark"
            w="100%"
            maxW="full"
            mt="0px"
            const
            bg="#4545FE"
            isDisabled={!isValid}
            onClick={formik.handleSubmit}
            isLoading={mutation.isLoading}
          >
            Update
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default UpdateProfileModal;

const telInputStyles = {
  borderRadius: '0px',

  opacity: '0',
  border: 'none',
  color: '#19191966',
  width: '40px',
  pointerEvents: 'none',
  '-webkit-appearance': 'none',
  outline: 'none',
  alignSelf: 'flex-end',
  height: '100%',
  background: 'transparent',
};

const telInputProps = {
  required: false,
  autoFocus: true,
  placeholder: 'Enter phone number',
};
