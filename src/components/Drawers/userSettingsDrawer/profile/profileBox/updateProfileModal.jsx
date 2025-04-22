import {useEffect} from 'react';
import {
  FormControl,
  HStack,
  Text,
  useToast,
  useDisclosure,
  Stack,
  Image,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  VStack,
  DrawerOverlay,
  DrawerContent,
  DrawerFooter,
  Input,
  Box,
} from '@chakra-ui/react';
import {useFormik} from 'formik';
import {Button, Popup2} from 'ui-lib/ui-lib.components';
import {useMutation} from '@tanstack/react-query';
import {updateProfile} from '/src/apis/settings';
import AnimateInput from '@/components/AnimateInput';
import circeInfoBvn from '/src/images/icons/circeInfoBvn.svg';
import BlueDanger from '/src/images/icons/BlueDanger.svg';
import {toastForError} from 'utils/toastForErrors';

export const UpdateProfileModal = ({
  isProfileModalOpen,
  onCloseProfileModal,
  initialValues,
  refetch,
}) => {
  const toast = useToast();

  const {onOpen: idOnOpen, isOpen: idIsOpen, onClose: idOnClose} = useDisclosure();

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: values => {
      mutation.mutate({...values, 'bvn-update': true, 'update-profile': true});
      localStorage.setItem(
        'loggedinUser',
        JSON.stringify({
          ...user,
          first_name: values?.first_name,
          last_name: values?.last_name,
        })
      );
    },
  });
  const mutation = useMutation(
    formData => {
      return updateProfile(formData);
    },
    {
      onSuccess: async res => {
        await refetch();
        idOnClose();
        toast({
          // title: res?.data?.message,
          title: 'BVN updated successfully',
          status: 'success',
          duration: 8000,
          isClosable: true,
          position: 'top-right',
        });
        formik.resetForm();

        return onCloseProfileModal();
      },
      onError: err => {
        idOnClose();
        return toastForError(err, true, toast);
      },
    }
  );
  useEffect(() => {
    mutation.isLoading ? idOnOpen() : null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mutation.isLoading]);

  let user;
  try {
    user =
      typeof window !== 'undefined' &&
      JSON.parse(localStorage.getItem('loggedinUser')) &&
      JSON.parse(localStorage.getItem('loggedinUser'));
  } catch (err) {
    return;
  }

  const isValid =
    formik.values.first_name.trim() &&
    formik.values.last_name.trim() &&
    formik.values.email.trim() &&
    formik.values.phone?.trim();

  return (
    <>
      <Drawer
        isOpen={isProfileModalOpen}
        onClose={() => (idOnClose(), onCloseProfileModal())}
        size={'sm'}
      >
        <DrawerOverlay />
        <DrawerContent pt="67px">
          <HStack
            boxShadow="4px 4px 8px 0px rgba(123, 157, 157, 0.05), -4px -4px 8px 0px rgba(123, 157, 157, 0.15)"
            mb="10px"
            py="12px"
            px="29px"
            justify="space-between"
            align="center"
            position="relative"
            width="full"
            bg="#F5F5F5"
          >
            <HStack spacing="8px">
              <Text textTransform={'capitalize'} fontSize="20px" fontWeight={600} color="#191919">
                {/* Update BVN */}
                Bank Verification Number{' '}
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
                <DrawerCloseButton
                  right="0px"
                  left="0px"
                  my="auto"
                  color="#000"
                  top="0"
                  bottom="0"
                />
              </VStack>
            </HStack>
          </HStack>
          <DrawerBody>
            <FormControl
              as="form"
              display="flex"
              mt="0px"
              flexDirection="column"
              alignContent="center"
            >
              {/* <HStack w="full" justify="space-between">
            <Input
              required
              type="text"
              id="first_name"
              name="first_name"
              onChange={formik.handleChange}
              value={formik.values.first_name || ""}
              placeholder="First name"
              _placeholder={{
                color: "gray.500",
              }}
            />
            <Input
              required
              type="text"
              id="last_name"
              name="last_name"
              onChange={formik.handleChange}
              value={formik.values.last_name || ""}
              placeholder="Last name"
              _placeholder={{
                color: "gray.500",
              }}
            />
          </HStack>
          <Input
            required
            type="email"
            id="email"
            name="email"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            onChange={formik.handleChange}
            value={formik.values.email}
            placeholder="Email address"
            pattern=".+@globex\.com"
            _placeholder={{
              color: "gray.500",
            }}
          />

          <Input
            required
            type="text"
            id="phone"
            name="phone"
            onChange={formik.handleChange}
            value={formik.values.phone || ""}
            placeholder="Phone"
            _placeholder={{
              color: "gray.500",
            }}
          /> */}
              {/* <Input
            required
            type="text"
            id="bvn"
            name="bvn"
            disabled={Boolean(initialValues?.bvn)}
            onChange={formik.handleChange}
            value={formik.values.bvn || ""}
            placeholder="BVN"
            _placeholder={{
              color: "gray.500",
            }}
          /> */}
              <Stack spacing="none">
                <HStack align="start" spacing="8px" w="full">
                  <Image src={circeInfoBvn.src} alt="info icon" />
                  <Text fontSize="14px" color="#4b4b4b" fontWeight="300" lineHeight={'130%'}>
                    To obtain your desired 11-digits, simply dial{' '}
                    <Box as="span" fontWeight={'700'}>
                      *565*0#
                    </Box>{' '}
                    on your BVN registered phone number. The requested digits will then appear on
                    your phone screen.
                  </Text>
                </HStack>

                <Text fontSize={'12px'} mt="24px" mb="8px">
                  Enter BVN
                </Text>
                {/* <AnimateInput */}
                <Input
                  borderColor="#606060"
                  borderRadius="6.4px"
                  // h="68px"
                  // mt="17px"
                  required
                  type="text"
                  p={'20px'}
                  pl="23.7px"
                  id="bvn"
                  name="bvn"
                  // labelFontS={'14px'}
                  // labelFontW={'14px'}
                  w="100%"
                  disabled={Boolean(initialValues?.bvn)}
                  onChange={formik.handleChange}
                  value={formik.values.bvn || ''}
                  // placeholder="BVN"
                  _placeholder={{
                    color: 'gray.500',
                  }}
                />
                <HStack
                  mt="15px"
                  align="start"
                  spacing="13px"
                  visibility={idIsOpen ? 'visible' : 'hidden'}
                  justify="start"
                  w="full"
                >
                  <Image src={BlueDanger.src} alt="info icon" />
                  <Text
                    w="345px"
                    textAlign="start"
                    fontSize="12px"
                    color="#4545FE"
                    fontWeight="300"
                    lineHeight={'16px'}
                  >
                    Please patiently wait without taking any action while we validate your BVN
                  </Text>
                </HStack>
              </Stack>
            </FormControl>
            {/* <Button
              mb="36px"
              mt="13px"
              alignSelf="strech"
              type="submit"
              variant="dark"
              fontWeight={'400'}
              _hover={{
                opacity: 1,
              }}
              onClick={formik.handleSubmit}
              isLoading={mutation.isLoading}
              isDisabled={!isValid}
            >
              Proceed
            </Button> */}
          </DrawerBody>
          <DrawerFooter>
            <Button
              mb="36px"
              mt="13px"
              alignSelf="strech"
              type="submit"
              variant="dark"
              borderRadius="72px"
              fontWeight={'400'}
              _hover={{
                opacity: 1,
              }}
              onClick={formik.handleSubmit}
              isLoading={mutation.isLoading}
              isDisabled={!isValid}
            >
              Proceed
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
export default UpdateProfileModal;
