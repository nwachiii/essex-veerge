import {
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  HStack,
  Image,
  Menu,
  MenuButton,
  MenuList,
  Button,
  MenuItem,
  Text,
  VStack,
  useToast,
  useDisclosure,
  Input,
  FormControl,
  Stack,
  Box,
  DrawerFooter,
} from '@chakra-ui/react';
import React, {useState} from 'react';
import * as Yup from 'yup';
import pendingInvitesIcon from '/src/images/icons/pendingInvitesIcon.svg';
import {toastForError} from '../../../../utils/toastForErrors';
import {addTeamMember} from '../../../../apis/settings';
import {useMutation} from '@tanstack/react-query';

import {useFormik} from 'formik';

import {InputLabel} from '../../../../ui-lib/ui-lib.components/Input/Input';
import cancelIcon from '/src/images/icons/cancelIcon.svg';
import checkIcon from '/src/images/icons/checkIcon.svg';

import SelectRole from './selectRole';

export const InviteATeamMember = ({
  refetch,
  pendingListLength,
  customScrollbarStyles,
  handleInviteScreens,
  handleScreen,
  setEmail,
}) => {
  const [selectedRole, setRole] = useState(null);

  const roleInfoObj = {
    Admin: [
      {
        hasAcess: true,
        text: 'Has all access privileges.',
      },
      {
        hasAcess: false,
        text: 'Not the account owner.',
      },
    ],
    'Directors & General Managers': [
      {
        hasAcess: false,
        text: 'Cannot create a customer account.',
      },
      {
        hasAcess: false,
        text: 'Cannot create a listing.',
      },
    ],
    'Account & Finance': [
      {
        hasAcess: false,
        text: "Can't invite team members on settings page.",
      },
    ],
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Please enter an email address'),
    // role: Yup.string().required('Please select a role'),
  });
  const formik = useFormik({
    initialValues: {email: '', role: ''},
    onSubmit: values => {
      const formdata = {role: selectedRole.name, email: values?.email};

      mutation.mutate(formdata);
    },
    validationSchema,
  });

  const toast = useToast();
  const mutation = useMutation(
    formData => {
      return addTeamMember(formData);
    },
    {
      onSuccess: async res => {
        handleScreen('pendinginvites')();
        toast({
          title: 'Invite Sent Successfully!',
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
        });
        setEmail(formik?.values?.email);
        formik.resetForm();
        await refetch();
        // handleInviteScreens('inviteSuccessful');
      },
      onError: err => {
        formik.resetForm();
        toastForError(err, true, toast);
      },
    }
  );
  //email pattern
  const email_pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const isEmailValid = formik?.values?.email.match(email_pattern);
  const isValid = !formik.errors.email && selectedRole?.value;

  return (
    <>
      <HStack
        boxShadow="0px 3.20641px 6.41283px 0px rgba(0, 0, 0, 0.02)"
        mb="20px"
        py="6.72px"
        bg="#F5F5F5"
        px="12px"
        pl="27.3px"
        justify="space-between"
        align="center"
        position="relative"
      >
        <Text fontSize="16px" fontWeight={600} color="#191919">
          Invite Team Member
        </Text>

        <HStack spacing="16.65px">
          {!pendingListLength ? null : <PendingInvitesIcon handleForMainScreen={handleScreen} />}

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
      <DrawerBody sx={customScrollbarStyles} p="0" px="29px">
        <FormControl
          h="full"
          pb="80px"
          as="form"
          display="flex"
          flexDirection="column"
          alignContent="center"
        >
          <Stack w="full" justifyContent="space-between" h="full" spacing={'none'}>
            <Stack spacing="16px">
              <Stack spacing="24px">
                <Box>
                  {/* <InputLabel
                    pl={0}
                    color="#191919"
                    fontSize="13px"
                    fontWeight="400"
                    label="Email Address"
                  /> */}

                  <Input
                    required
                    type="input"
                    id="email"
                    name="email"
                    border="0.667px solid #919191"
                    onBlur={formik.handleBlur}
                    borderRadius="8px"
                    h="55.2px"
                    w="full"
                    mt="1px"
                    bg="transparent"
                    _hover={{bg: 'tranparent'}}
                    _focus={{
                      borderColor: '#919191',
                    }}
                    _active={{
                      bg: 'transparent',
                    }}
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    placeholder="Email Address"
                    _placeholder={{
                      color: '#919191',
                    }}
                    color="#3d3d3d"
                    fontSize="12.988px"
                    fontWeight="400"
                  />
                  {formik.errors.email && formik.touched.email && (
                    <Text color="red" align="start" fontSize="12px">
                      {formik.errors.email}
                    </Text>
                  )}
                </Box>
                <Box>
                  <SelectRole
                    h="55.2px"
                    color={selectedRole ? '#3d3d3d' : '#919191'}
                    setRole={setRole}
                    borderRadius="8px"
                    fontSize="12.988px"
                    placeHolderText="Select a role"
                    selectedRole={selectedRole}
                    border="0.667px solid #919191"
                    customScrollbarStyles={customScrollbarStyles}
                  />
                </Box>
              </Stack>
              {roleInfoObj[selectedRole?.value] ? (
                <Stack p="12px 8px" w="full" borderRadius="6px" bg="#4545FE0D" spacing="12px">
                  {roleInfoObj[selectedRole?.value]?.map((item, idx) => {
                    return (
                      <HStack key={idx} spacing="8px">
                        <Image
                          src={item.hasAcess ? checkIcon.src : cancelIcon.src}
                          alt="check icon"
                          boxSize="16px"
                        />
                        <Text fontSize="12px" fontWeight="300" color="#3D3D3D">
                          {item.text}
                        </Text>
                      </HStack>
                    );
                  })}
                </Stack>
              ) : null}
            </Stack>

          </Stack>
        </FormControl>
      </DrawerBody>
      <DrawerFooter mb='15px'>
      <Button
              w="full"
              h="45px"
              borderRadius="72px"
              border="0.756px solid #0D0D0D"
              boxShadow="0px 0.75614px 1.51229px 0px rgba(16, 24, 40, 0.05)"
              fontSize="14px"
              fontWeight="400"
              bg="#0D0D0D"
              color="#fff"
              _hover={{opacity: 1}}
              // alignSelf="stretch"
              type="submit"
              onClick={formik.handleSubmit}
              isLoading={mutation.isLoading}
              isDisabled={!isValid}
            >
              Send Invite
            </Button>
      </DrawerFooter>
    </>
  );
};

export default InviteATeamMember;

const PendingInvitesIcon = ({handleForMainScreen}) => {
  const hoverForPendingInvitesDisclosure = useDisclosure();

  return (
    <Menu
      autoSelect={false}
      isOpen={hoverForPendingInvitesDisclosure.isOpen}
      onClose={hoverForPendingInvitesDisclosure.onClose}
    >
      <MenuButton
        onClick={handleForMainScreen('pendinginvites')}
        p="0px"
        onMouseEnter={hoverForPendingInvitesDisclosure.onOpen}
        onMouseLeave={hoverForPendingInvitesDisclosure.onClose}
        w="36px"
        h="36px"
        _hover={{
          background: 'transparent',
          opacity: '0.7',
        }}
        bg="transparent"
        _focus={{background: 'transparent'}}
        _active={{
          background: 'transparent',
        }}
        as={Button}
      >
        <Image src={pendingInvitesIcon.src} alt="pending invites Icon" />
      </MenuButton>
      <MenuList
        bg="#191919"
        minW="fit-content"
        borderRadius="3.624px"
        padding="7.8px 5.2px"
        mt="-8px"
      >
        <MenuItem
          m="0"
          fontSize="10.873px"
          fontWeight="400"
          color="#fff"
          p="0"
          bg="transparent"
          w="fit-content"
        >
          Pending Invites
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
