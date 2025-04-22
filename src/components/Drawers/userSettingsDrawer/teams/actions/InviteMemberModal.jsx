import React, {useState} from 'react';
import {
  FormControl,
  HStack,
  ModalCloseButton,
  Heading,
  Text,
  ModalFooter,
  VStack,
  Flex,
  Image,
  useDisclosure,
  useToast,
  Stack,
  Box,
} from '@chakra-ui/react';
import {useFormik} from 'formik';
import {Button, Input, Popup, Popup2, Select} from 'ui-lib/ui-lib.components';
import Invite from '/src/images/icons/invite.png';
import {useMutation} from '@tanstack/react-query';
import Swal from 'sweetalert2';
import {addTeamMember} from '/src/apis/settings';
import successIcon from '/src/images/icons/check-icon-unscreen.gif';
import {FcInvite} from 'react-icons/fc';
import {InputLabel} from 'ui-lib/ui-lib.components/Input/Input';
import {toastForError} from 'utils/toastForErrors';

const SuccessOnInvite = ({open, onModalClose, setOpen, email}) => {
  const {onClose} = useDisclosure();

  return (
    <>
      <Popup2
        isOpen={open}
        onClose={onClose}
        px={'32px'}
        py={'33px'}
        pb="36px"
        maxW="449px"
        minW="fit-content"
        maxH="fit-content"
        borderRadius="18px"
        // h="fit-content"
      >
        <Popup2.Header textAlign="center">
          <VStack>
            <HStack justify="center" w="100%">
              <Image alt="" objectFit="contain" src={successIcon.src} boxSize="88px" />
            </HStack>
            <Heading as="h1" fontSize="24px" fontWeight="600">
              Successful
            </Heading>
          </VStack>
        </Popup2.Header>
        <ModalCloseButton onClick={() => setOpen(false)} />
        <Popup2.Body p="0px">
          <Text maxW="400px" textAlign="center" mt="19px" fontSize="24px" fontWeight="400">
            An email has been sent to{' '}
            <Text as="span" color={'#1919D8'}>
              {email}
            </Text>
          </Text>
        </Popup2.Body>
        <ModalFooter py="0" mt="55px" px={'0px'}>
          <VStack w={'100%'}>
            <Button
              type="submit"
              variant="dark"
              alignSelf="strech"
              onClick={() => {
                onModalClose();
                setOpen(false);
                return onClose();
              }}
            >
              Ok
            </Button>
          </VStack>
        </ModalFooter>
      </Popup2>
    </>
  );
};

export const InviteMemberModal = ({isModalOpen, onModalClose, refetch}) => {
  const formik = useFormik({
    initialValues: {email: '', role: ''},
    onSubmit: values => {
      mutation.mutate(values);
    },
  });
  const [open, setOpen] = useState(false);
  const [emailed, setEmailed] = useState('');

  const toast = useToast();
  const mutation = useMutation(
    formData => {
      return addTeamMember(formData);
    },
    {
      onSuccess: async res => {
        setEmailed(formik?.values?.email);
        formik.resetForm();
        await refetch();
        setOpen(true);
      },
      onError: err => {
        onModalClose();
        formik.resetForm();

        toastForError(err, true, toast);
      },
    }
  );
  //email pattern
  const email_pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const isEmailValid = formik?.values?.email.match(email_pattern);

  // check if fields are empty
  const isEmpty = !formik?.values?.email?.trim() && !formik?.values.role;

  return (
    <Popup
      hideCloseBtn
      maxW="486px"
      minH="508px"
      pb="43px"
      mt="22vh"
      px="33px"
      isOpen={isModalOpen}
      onClose={onModalClose}
    >
      <Popup.Header
        ml={-9}
        mt={-8}
        fontSize={'24px'}
        fontWeight={'600'}
        color="#191919"
        textAlign="left"
      >
        Invite team member
      </Popup.Header>
      <Popup.Body align="left">
        <SuccessOnInvite
          onModalClose={onModalClose}
          open={open}
          setOpen={setOpen}
          email={emailed}
        />
        <Flex justify={'center'} align={'center'}>
          {/* <Image src={Invite.src} /> */}
          <FcInvite style={{fontSize: '67px'}} />
        </Flex>
        <FormControl as="form" display="flex" flexDirection="column" alignContent="center">
          <Stack w="full" spacing={'7px'}>
            <Input
              required
              type="input"
              id="email"
              name="email"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              onChange={formik.handleChange}
              value={formik.values.email}
              placeholder="Email Address"
              _placeholder={{
                color: 'gray.500',
              }}
            />
            {formik?.values?.email.trim() !== '' && !isEmailValid && (
              <Text color="red" align="start" fontSize="12px">
                incorrect email format
              </Text>
            )}
            <Box>
              <InputLabel pl={2} label="Role" />
              <Select
                required
                type="text"
                id="role"
                name="role"
                onChange={formik.handleChange}
                value={formik.values.role}
                // placeholder='Role'
                _placeholder={{
                  color: 'gray.400',
                }}
                h="55px"
                borderRadius="10px"
                border="1px solid #EAEAEA"
                fontSize="16px"
                defaultValue={'admin'}
              >
                <option value="" disabled>
                  Role
                </option>
                <option value="finance_controller">Finance Contoller</option>
                <option value="head_of_sales">Head Of Sales</option>
                <option value="director">Director</option>
                <option value="front_desk">Front Desk Officer</option>
                <option value="accountant">Accountant</option>
              </Select>
            </Box>

            <Button
              mx="auto"
              mt="33px"
              variant="dark"
              alignSelf="stretch"
              type="submit"
              onClick={formik.handleSubmit}
              isLoading={mutation.isLoading}
              isDisabled={isEmpty || !isEmailValid}
              borderRadius='72px'
            >
              Invite
            </Button>
          </Stack>
        </FormControl>
      </Popup.Body>
    </Popup>
  );
};
export default InviteMemberModal;
