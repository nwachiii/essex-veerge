import React, {useState} from 'react';
import {
  Box,
  DrawerBody,
  DrawerCloseButton,
  DrawerFooter,
  FormControl,
  HStack,
  Image,
  Stack,
  Text,
  VStack,
  useToast,
  Button,
  Input,
} from '@chakra-ui/react';
import {useMutation} from '@tanstack/react-query';
import cameraIcon from '/src/images/icons/cameraIconForProfileIcon.svg';
import fallbackSrc from '/src/images/avatar.svg';

import {AddNewContactPerson} from '../../../../apis/listings';
import backArrow from '/src/images/icons/backArrowForDrawer.svg';
import {InputPhoneNumber, UploadProfilePicture} from 'ui-lib/ui-lib.components';
import AnimateInput from '@/components/AnimateInput';

const AddContactPersonScreen = ({customScrollbarStyles, handleScreen, refetch, projectId}) => {
  const toast = useToast();
  const [img, setImg] = useState(null);
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState(null);
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const resetForm = () => {
    setImg(null);
    setFullName('');
    setPhoneNumber('');
    setCountry(null);
  };

  const mutation = useMutation(formData => AddNewContactPerson(projectId, formData), {
    onSuccess: () => {
      refetch();
      resetForm();
      handleScreen('contactPerson');
      toast({
        title: 'Successfully updated',

        status: 'success',
        position: 'top-right',
        duration: 3000,
        isClosable: true,
      });
    },
    onError: err => {
      toast({
        title: 'Error',
        description: err.message || 'Something went wrong.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    },
  });

  const isInvalid = !fullName || !phone || mutation.isLoading;

  const onAvatarChange = file => {
    if (file?.[0]?.image) {
      setImg(file[0].image);
    } else {
      setImg(null);
    }
  };

  const handleSubmit = () => {
    const payload = {
      image: img ? img.split(',')[1] : null, // Ensure only Base64 data is sent
      name: fullName,
      phone_number: phone,
      country_code: country,
    };
    mutation.mutate(payload);
  };
  const handlePhone = val => {
    // setPhone(val)

    function extractNumbers(inputString) {
      const result = inputString.replace(/\D/g, '');
      return result;
    }

    const phonenumber = extractNumbers(val);

    setPhone(phonenumber);
  };
  const inputStyles = {
    placeholder: 'Phone Number',
    _placeholder: {color: '#606060', fontSize: '14px', fontWeight: '400'},
    _focusVisible: {
      borderColor: '#525252',
    },
    border: '1px solid #E4E4E4',
  };
  console.log({country, phone});
  return (
    <>
      {/* Header */}
      <HStack
        boxShadow="4px 4px 8px 0px rgba(123, 157, 157, 0.05), -4px -4px 8px 0px rgba(123, 157, 157, 0.15)"
        py="12px"
        px="29px"
        justify="space-between"
        align="center"
        bg="#F5F5F5"
        position="relative"
      >
        <HStack spacing="8px">
          <Image
            cursor="pointer"
            onClick={() => handleScreen('contactPerson')}
            src={backArrow.src}
            alt="back icon"
          />
          <Text fontSize="16px" fontWeight={600} color="#191919">
            Add Contact Person
          </Text>
        </HStack>
        <DrawerCloseButton position="absolute" top="12px" right="12px" />
      </HStack>

      <Stack w="full" spacing="none" pr="6px">
        <DrawerBody sx={customScrollbarStyles} p="24px">
          <Stack spacing={8} w="full" align="center" mx="auto" py={8}>
            <Box position="relative">
              <UploadProfilePicture
                containerStyle={{
                  width: '118px',
                  height: '118px',
                }}
                imgStyle={{
                  style: {
                    width: '118px ',
                    height: '118px ',
                    borderRadius: '100%',
                    boxSizing: 'border-box',
                    display: 'inline-flex',
                    border: '1px solid #eaeaea',
                  },
                }}
                defaultCameraIcon={cameraIcon}
                defaultCameraStyle={{
                  boxSize: '28px',
                }}
                profileFallback={fallbackSrc}
                defaultCameraWrapperStyle={{
                  top: 'initial',
                  position: 'absolute',
                  bottom: '0%',
                  display: 'grid',

                  cursor: 'pointer',
                  placeItems: 'center',
                  bg: 'rgba(0,0,0,0.2)',
                  h: '40%',
                  w: 'full',
                }}
                profileWrapper={{
                  overflow: 'hidden',

                  borderRadius: '50%',
                }}
                id="avatar"
                name="avatar"
                files={img ? [{preview: img}] : []}
                setFiles={onAvatarChange}
              />
            </Box>
            <Input
              w="full"
              required
              type="text"
              name="fullName"
              value={fullName}
              fontSize="12px"
              h="50px"
              borderRadius="8px"
              _focusVisible={{
                borderColor: '#525252',
              }}
              border="1px solid #E4E4E4"
              placeholder="Full Name"
              onChange={e => setFullName(e.target.value)}
            />
            {/* <Input
              w="full"
              required
              type="number"
              name="phoneNumber"
              value={phoneNumber}
              fontSize="12px"
              h="50px"
              borderRadius="8px"
              _focusVisible={{
                borderColor: '#525252',
              }}
              borderColor="#E4E4E4"
              placeholder="Phone Number"
              onChange={e => setPhoneNumber(e.target.value)}
            /> */}
            <InputPhoneNumber
              value={phone}
              inputOnChange={handlePhone}
              countryOnChange={setCountry}
              inputStyles={inputStyles}
              h="50px"
            />
          </Stack>
        </DrawerBody>
      </Stack>
      <DrawerFooter p={'0px'} px="24px" py="10px">
        <HStack w="full" mx="auto">
          <Button
            h="56px"
            color="#fff"
            variant="md-filled-radius"
            bg="#191919"
            isDisabled={isInvalid}
            isLoading={mutation.isLoading}
            onClick={handleSubmit}
            w="full"
          >
            Proceed
          </Button>
        </HStack>
      </DrawerFooter>
    </>
  );
};

export default AddContactPersonScreen;
