import AnimateInput from '@/components/AnimateInput';
import {ArrowBackIcon} from '@chakra-ui/icons';
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  HStack,
  Stack,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {updateCompliance} from 'apis/settings';
import {useFormik} from 'formik';
import {useState} from 'react';
import {PiCaretDownFill} from 'react-icons/pi';
import PhoneInput from 'react-phone-input-2';
import {Button, InputPhoneNumber} from 'ui-lib/ui-lib.components';
import {formatToUrl} from 'utils/formatString';
import {toastForError} from 'utils/toastForErrors';

const inputStyles = {
  h: '55px',
  borderColor: '#919191',
  _focusVisible: {
    borderColor: '#919191',
  },
  borderWidth: '1px',
  pl: '75px',
  _placeholder: {color: '#606060', fontSize: '14px', fontWeight: '400'},
};

const dialCodeWrapper = {
  pl: '36px',
};

export const EditBusinessDrawer = ({
  disclosure,
  initialValues = {
    website: ``,
    business_mail: ``,
    phone: ``,
    cac_number: ``,
    social_links_facebook: ``,
    social_links_instagram: ``,
    social_links_linkedIn: ``,
    social_links_twitter: ``,
  },
  country,
  refetch,
}) => {
  const queryClient = useQueryClient();

  const [phone, setPhone] = useState(country ?? '');
  const toast = useToast();

  const mutation = useMutation(
    formData => {
      return updateCompliance(formData);
    },
    {
      onSuccess: async res => {
        toast({
          title: 'Updated successfully',
          description: ``,
          status: 'success',
          duration: 8000,
          isClosable: true,
          position: 'top-right',
        });
        queryClient.invalidateQueries(['settingsStatus', 'compliance']);
        await refetch();

        formik.resetForm();
        disclosure.onClose();
      },
      onError: err => {
        toastForError(err, true, toast);
      },
    }
  );

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    onSubmit: values => {
      console.log({values});
      const new_values = {
        ...values,
        website: values?.website ? formatToUrl(values?.website) : ``,
        social_links_facebook: values?.social_links_facebook
          ? formatToUrl(values?.social_links_facebook)
          : ``,
        social_links_instagram: values?.social_links_instagram
          ? formatToUrl(values?.social_links_instagram)
          : ``,
        social_links_linkedIn: values?.social_links_linkedIn
          ? formatToUrl(values?.social_links_linkedIn)
          : ``,
        social_links_twitter: values?.social_links_twitter
          ? formatToUrl(values?.social_links_twitter)
          : ``,
      };
      const formData = Object?.fromEntries([
        ...Object?.entries(initialValues)?.flatMap(([key, value]) =>
          new_values[key] !== value ? [[key, new_values[key]]] : []
        ),
        ...[['country', phone]],
      ]);

      mutation.mutate(formData);
    },
  });

  const isValid = Object.entries(initialValues).some(
    ([key, value]) => formik.values[key] !== value && formik.values[key]?.trim()
  );

  const handlePhone = val => {
    function extractNumbers(inputString) {
      const result = inputString.replace(/\D/g, '');
      return result;
    }

    const phonenumber = extractNumbers(val);

    formik.setFieldValue('phone', phonenumber);
  };

  return (
    <Drawer blockScrollOnMount={true} isOpen={disclosure?.isOpen} onClose={disclosure?.onClose}>
      <DrawerOverlay />
      <DrawerContent minW="400px" w="400px" pb="22px" pt="67px">
        <HStack
          boxShadow="4px 4px 8px 0px rgba(123, 157, 157, 0.05), -4px -4px 8px 0px rgba(123, 157, 157, 0.15)"
          // mb="30px"
          py="12px"
          px="29px"
          justify="space-between"
          align="center"
          position="relative"
          width="full"
          bg="#F5F5F5"
        >
          <HStack gap="8px">
            <ArrowBackIcon onClick={disclosure.onClose} fontSize={`20px`} cursor={`pointer`} />
            <Text textTransform={'capitalize'} fontSize="16px" fontWeight={600} color="#191919">
              Edit
            </Text>
          </HStack>
          <HStack spacing="15px">
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
        </HStack>
        <DrawerBody pt={'20px'}>
          <Stack gap={`24px`}>
            <Box>
              <Text mb={`12px`} fontWeight={`500`}>
                Company Info
              </Text>
              <VStack align={`stretch`} gap={`16px`}>
                <AnimateInput
                  w="full"
                  h="55px"
                  borderRadius="12px"
                  required
                  labelColor={'#19191966'}
                  type="email"
                  pl="15.7px"
                  borderColor="#919191"
                  borderWidth="0.8px"
                  id="business_mail"
                  name="business_mail"
                  onChange={formik.handleChange}
                  value={formik.values.business_mail}
                  placeholder="Company's Email"
                  pattern=".+@globex\.com"
                  _placeholder={{
                    fontSize: '16px',

                    color: '#19191966',
                  }}
                />
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
                  borderColor="#919191"
                  borderWidth="0.8px"
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
                  borderColor="#919191"
                  borderWidth="0.8px"
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
                <AnimateInput
                  w="full"
                  h="55px"
                  isRequired
                  pl="15.7px"
                  id="location"
                  name="location"
                  type="text"
                  borderRadius="12px"
                  borderColor="#919191"
                  borderWidth="0.8px"
                  labelColor={'#19191966'}
                  value={formik.values.location}
                  onChange={formik?.handleChange}
                  placeholder="Company's location"
                  _placeholder={{
                    fontSize: '14px',
                    fontWeight: '400',
                    color: '#19191966',
                  }}
                />
              </VStack>
            </Box>
            <Box>
              <Text mb={`12px`} fontWeight={`500`}>
                Contact
              </Text>
              <VStack align={`stretch`} gap={`16px`}>
                <HStack w="full" position="relative" spacing="none">
                  {/* <VStack
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
                      right="0"
                      left="2px"
                      w="100px"
                      h="44px"
                      py="10px"
                      pt="16px"
                      bg="#ffffff"
                      border="none"
                      spacing="5px"
                      zIndex="236789"
                      position="absolute"
                      pointerEvents="none"
                      borderRadius="12px"
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
                   
                      <PiCaretDownFill fontSize={`20px`} />
                    </HStack>
                    <Box id="ysa" position="absolute" left="5px" zIndex="56789">
                      <PhoneInput
                        id="phoneset"
                        name="phone"
                        country={'ng'}
                        type="tel"
                        inputProps={telInputProps}
                        inputStyle={telInputStyles}
                        countryCodeEditable={false}
                        defaultValue={phone ?? ''}
                        onKeyPress={e => (e.cancelable ? e.preventDefault() : console.log(''))}
                        onChange={phone => setPhone(phone)}
                      />
                    </Box>
                  </VStack> */}
                  {/* <AnimateInput
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
                    borderColor={'#919191'}
                    borderWidth="0.8px"
                    onChange={formik.handleChange}
                    value={
                      !formik.values.phone ||
                      formik.values.phone == 'null' ||
                      formik.values.phone == 'undefined'
                        ? ''
                        : formik.values.phone
                    }
                    placeholder="Company's phone number"
                    _placeholder={{
                      color: '#19191966',
                    }}
                  /> */}
                  <InputPhoneNumber
                    value={formik.values.phone}
                    countryValue={phone}
                    inputOnChange={handlePhone}
                    countryOnChange={setPhone}
                    inputStyles={inputStyles}
                    dialCodeWrapper={dialCodeWrapper}
                  />
                </HStack>
                <AnimateInput
                  w="full"
                  borderColor="#919191"
                  placeholder="Facebook URL"
                  h="56px"
                  pl="15px"
                  labLeft="15px"
                  color="#606060"
                  labelColor="#919191"
                  borderRadius="10px"
                  fontSize="14px"
                  fontWeight="400"
                  required
                  type="text"
                  id="social_links_facebook"
                  name="social_links_facebook"
                  onChange={formik.handleChange}
                  value={
                    formik.values.social_links_facebook === 'No link yet'
                      ? ''
                      : formik.values.social_links_facebook
                  }
                  _placeholder={{
                    color: '#19191966',
                  }}
                />

                <AnimateInput
                  w="full"
                  borderColor="#919191"
                  placeholder="Instagram URL"
                  h="56px"
                  pl="15px"
                  labLeft="15px"
                  color="#606060"
                  labelColor="#919191"
                  borderRadius="10px"
                  fontSize="14px"
                  fontWeight="400"
                  required
                  type="text"
                  id="social_links_instagram"
                  name="social_links_instagram"
                  onChange={formik.handleChange}
                  value={
                    formik.values.social_links_instagram === 'No link yet'
                      ? ''
                      : formik.values.social_links_instagram
                  }
                  _placeholder={{
                    color: '#19191966',
                  }}
                />

                <AnimateInput
                  w="full"
                  borderColor="#919191"
                  placeholder="LinkedIn URL"
                  h="56px"
                  pl="15px"
                  labLeft="15px"
                  color="#606060"
                  labelColor="#919191"
                  borderRadius="10px"
                  fontSize="14px"
                  fontWeight="400"
                  required
                  type="text"
                  id="social_links_linkedIn"
                  name="social_links_linkedIn"
                  onChange={formik.handleChange}
                  value={
                    formik.values.social_links_linkedIn === 'No link yet'
                      ? ''
                      : formik.values.social_links_linkedIn
                  }
                  _placeholder={{
                    color: '#19191966',
                  }}
                />

                <AnimateInput
                  w="full"
                  borderColor="#919191"
                  placeholder="X(Twitter) URL"
                  h="56px"
                  pl="15px"
                  labLeft="15px"
                  color="#606060"
                  labelColor="#919191"
                  borderRadius="10px"
                  fontSize="14px"
                  fontWeight="400"
                  required
                  type="text"
                  id="social_links_twitter"
                  name="social_links_twitter"
                  onChange={formik.handleChange}
                  value={
                    formik.values.social_links_twitter === 'No link yet'
                      ? ''
                      : formik.values.social_links_twitter
                  }
                  _placeholder={{
                    color: '#19191966',
                  }}
                />
              </VStack>
            </Box>
            <Button
              // mt={0}
              isDisabled={
                !isValid
                // || !Boolean(formikBio.values.bio)
              }
              w="100%"
              fontWeight={`400`}
              type="button"
              variant="dark"
              onClick={() => {
                formik.handleSubmit();
              }}
              isLoading={mutation.isLoading}
              fontSize={`15px`}
              borderRadius={`72px`}
              p={`13.5px`}
              h={`max-content`}
            >
              Update
            </Button>
          </Stack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

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
