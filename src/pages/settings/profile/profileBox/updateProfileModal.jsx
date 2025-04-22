import {useEffect} from 'react';
import {FormControl, HStack, Text, useToast, useDisclosure, Stack, Image} from '@chakra-ui/react';
import {useFormik} from 'formik';
import {Button, Popup2} from '../../../../ui-lib/ui-lib.components';
import {useMutation} from '@tanstack/react-query';
import {updateProfile} from '../../../../apis/settings';
import AnimateInput from '../../../../components/AnimateInput';
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
      <Popup2
        minH="fit-content"
        mt="20vh"
        maxW="451px"
        hideCloseButton
        pb="0"
        px="31px"
        pr="28px"
        scrollBehavior="none"
        overLayStyle={{background: 'rgba(0, 0, 0, 0.2)'}}
        isOpen={isProfileModalOpen}
        onClose={() => (idOnClose(), onCloseProfileModal())}
      >
        <Popup2.Header fontSize="28px" displayCloseBtn fontWeight="700" color="#191919">
          Update BVN
        </Popup2.Header>
        <Popup2.Body my="0px" pb="0" pr="0px" h="fit-content">
          <FormControl
            as="form"
            display="flex"
            mt="15px"
            flexDirection="column"
            alignContent="center"
          >
            <Stack spacing="none">
              <HStack align="start" spacing="13px" w="full">
                <Image src={circeInfoBvn.src} alt="info icon" />
                <Text fontSize="13px" color="#191919" fontWeight="300">
                  To obtain your desired 11-digits, simply dial *565*0# on your BVN registered phone
                  number. The requested digits will then appear on your phone screen.
                </Text>
              </HStack>

              <AnimateInput
                borderColor="#606060"
                borderRadius="16px"
                h="68px"
                mt="17px"
                required
                type="text"
                pl="23.7px"
                id="bvn"
                name="bvn"
                labelFontS="16px"
                laelFontH="20px"
                w="391px"
                disabled={Boolean(initialValues?.bvn)}
                onChange={formik.handleChange}
                value={formik.values.bvn || ''}
                placeholder="Bank verification number"
                labelColor={'#19191966'}
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
                  lineHeight="12px"
                  color="#4545FE"
                  fontWeight="300"
                >
                  Please patiently wait without taking any action while we validate your BVN
                </Text>
              </HStack>
            </Stack>
          </FormControl>
          <Button
            mb="36px"
            mt="13px"
            alignSelf="strech"
            type="submit"
            variant="violet"
            borderRadius="72px"
            _hover={{
              opacity: 1,
            }}
            onClick={formik.handleSubmit}
            isLoading={mutation.isLoading}
            isDisabled={!isValid}
          >
            Proceed
          </Button>
        </Popup2.Body>
      </Popup2>
    </>
  );
};
export default UpdateProfileModal;
