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
  Button,
} from '@chakra-ui/react';
import {useFormik} from 'formik';

import {useMutation} from '@tanstack/react-query';
import {updateProfile} from '/src/apis/settings';
import AnimateInput from '@/components/AnimateInput';
import circeInfoBvn from '/src/images/icons/circeInfoBvn.svg';
import BlueDanger from '/src/images/icons/BlueDanger.svg';
import {toastForError} from 'utils/toastForErrors';
import backIcon from '/src/images/icons/backArrowForDrawer.svg';

const SetUpBVN = ({refetch, handleScreen, mainScreenNav}) => {
  const toast = useToast();

  const {onOpen: idOnOpen, isOpen: idIsOpen, onClose: idOnClose} = useDisclosure();

  const formik = useFormik({
    initialValues: {
      bvn: '',
      'update-profile': true,
    },
    onSubmit: values => {
      mutation.mutate({...values, 'bvn-update': true});
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
        mainScreenNav('payment config');
        toast({
          title: 'BVN updated successfully',
          status: 'success',
          duration: 8000,
          isClosable: true,
          position: 'top-right',
        });
        formik.resetForm();
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

  const isValid = formik.values.bvn.trim();
  return (
    <>
      <HStack
        boxShadow="4px 4px 8px 0px rgba(123, 157, 157, 0.05), -4px -4px 8px 0px rgba(123, 157, 157, 0.15)"
        mb="24px"
        py="12px"
        px="29px"
        h="49.699px"
        justify="space-between"
        align="center"
        position="relative"
        width="full"
        bg="#F5F5F5"
      >
        <HStack spacing="8px">
          <Image
            cursor="pointer"
            boxSize="24px"
            onClick={handleScreen('index')}
            src={backIcon.src}
            alt="back icon"
          />
          <Text textTransform={'capitalize'} fontSize="20px" fontWeight={600} color="#191919">
            Verify BVN
          </Text>
        </HStack>
      </HStack>
      <DrawerBody p="0px" px="20px">
        <Stack spacing="none">
          <HStack align="start" spacing="6px" w="full">
            <Image src={circeInfoBvn.src} alt="info icon" />
            <Text fontSize="14px" color="#4b4b4b" fontWeight="400" lineHeight={'130%'}>
              To obtain your desired 11-digits, simply dial{' '}
              <Text as="span" fontWeight={'700'}>
                *565*0#
              </Text>{' '}
              on your BVN registered phone number. The requested digits will then appear on your
              phone screen.
            </Text>
          </HStack>

          <Text fontSize={'12px'} color="#191919" mt="24px" mb="4.81px">
            Enter BVN
          </Text>

          <Input
            border="0.8px solid"
            borderColor="#e4e4e4"
            borderRadius="6.4px"
            boxShadow="0px 0.8px 1.6px 0px #1018280D"
            required
            type="text"
            p={'20px'}
            _focus={{
              bg: 'transparent',
              borderColor: '#191919',
            }}
            _hover={{
              bg: 'transparent',
            }}
            h="45px"
            pl="23.7px"
            id="bvn"
            name="bvn"
            w="100%"
            onChange={formik.handleChange}
            value={formik.values.bvn || ''}
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
            transition="0.3s ease-in-out"
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
      </DrawerBody>
      <DrawerFooter pt="0px" pb="21vh" px="20px">
        <Button
          type="submit"
          variant="filled-radius"
          fontWeight={'400'}
          _hover={{
            opacity: 1,
          }}
          onClick={formik.handleSubmit}
          isLoading={mutation.isLoading}
          disabled={!isValid}
          borderRadius="72px"
        >
          Proceed
        </Button>
      </DrawerFooter>
    </>
  );
};

export default SetUpBVN;
