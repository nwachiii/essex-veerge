import React from 'react';
import {Popup2} from '../../ui-lib';
import {
  Box,
  Button,
  HStack,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Textarea,
  VStack,
  Text,
  useDisclosure,
  Stack,
  Heading,
} from '@chakra-ui/react';
import avatar from '/src/images/avatar.svg';

import searchIcon from '/src/images/icons/contactPersonSearchicon.svg';
import {useFormik} from 'formik';
import {useState} from 'react';
import cancelIcon from '/src/images/icons/cancelIconRequest.svg';

export const AssignInspectionToTeamMember = ({
  roles,
  summaryInfo,
  setSummaryInfo,
  Summary,
  toTeamMember,
  moveToExternalMemberModal,
}) => {
  const modalDisclosure = useDisclosure();
  const [filteredRoles, setFilteredRoles] = useState([roles ?? []]);
  const [searchText, setSearchText] = useState('');
  const [contact, setContact] = useState(null);

  const user =
    typeof window !== 'undefined' &&
    localStorage &&
    JSON.parse(localStorage.getItem('loggedinUser'));
  const formik = useFormik({
    initialValues: {
      email: contact?.email || '',
      full_name: contact?.name || '',
      note: '',
    },
    onSubmit: values => {
      const obj = {
        ...values,
        email: contact?.email || '',
        full_name: `${contact?.first_name?.toLowerCase() ?? ''} ${
          contact?.last_name?.toLowerCase() ?? ''
        }`,
        img: contact?.avatar || '',
      };
      setSummaryInfo(obj);
      setContact(null);
      formik.resetForm();
    },
  });
  const customScrollStyle = {
    overflow: 'auto',
    'scrollbar-width': 'none',

    '&::-webkit-scrollbar': {
      display: 'none',
    },
  };
  const customScrollbarStyles = {
    '&::-webkit-scrollbar': {
      width: '4px',
      borderRadius: '16px',
    },
    '&::-webkit-scrollbar-track': {
      borderRadius: '16px',
      WebkitBoxShadow: 'inset 0 0 6px transparent',
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '16px',
      backgroundColor: '#606060',
      // outline: "1px solid slategrey", // You can include this line if needed
    },
  };

  const selectContact = param => () => {
    setContact(param);
    setSearchText('');
  };

  const isValid = formik.values.note.trim() && contact;

  const handleChange = e => {
    const txt = e.target.value;
    setSearchText(txt);

    const newfilteredRoles = roles.filter(
      item =>
        `${item.first_name.toLowerCase()} ${item.last_name.toLowerCase()}`.includes(
          txt.toLowerCase()
        ) || item.email.toLowerCase().includes(txt.toLowerCase())
    );
    if (!txt.trim() || !newfilteredRoles.length) {
      return modalDisclosure.onClose();
    }
    modalDisclosure.onOpen();
    setFilteredRoles(newfilteredRoles);
  };
  return (
    <Popup2
      py="36px"
      px="24px"
      minW="665px"
      overLayStyle={{background: 'rgba(0, 0, 0, 0.2)'}}
      isOpen={toTeamMember.isOpen}
      onClose={() => (formik.resetForm(), setSearchText(''), toTeamMember.onClose())}
    >
      <Heading fontSize="24px" mb="24px" fontWeight="600" color="#191919">
        Who do you want to assign the inspection to ?
      </Heading>
      <Popup2.Body pr="0" py="0px" my="0px">
        <VStack
          w="full"
          spacing="24px"
          px="2px"
          onSubmit={e => {
            if (e.cancelable) e.preventDefault();
            return formik.handleSubmit();
          }}
          as="form"
        >
          {contact ? (
            <Stack w="full" spacing="8px">
              <HStack
                w="full"
                padding="9px 17px"
                borderRadius="12px"
                border="1px solid #E4E4E4"
                spacing="10px"
              >
                <Image
                  borderRadius="full"
                  src={contact?.avatar ?? avatar.src}
                  alt="team member image"
                  boxSize="28px"
                  objectFit="cover"
                />
                <Text fontSize="16px" color="#191919" fontWeight="400">
                  {`${contact.first_name.toLowerCase()} ${contact.last_name.toLowerCase()}`}
                </Text>
                <Image
                  cursor="pointer"
                  src={cancelIcon.src}
                  onClick={() => setContact(null)}
                  alt="cancel icon"
                />
              </HStack>
            </Stack>
          ) : (
            <Box w="full" px="8px" position="relative">
              <Menu
                isOpen={modalDisclosure.isOpen}
                // isOpen={true}
                onClose={modalDisclosure.onClose}
              >
                <Stack spacing="39.48px">
                  <InputGroup w="full" position="relative">
                    <InputLeftElement pointerEvents="none">
                      <Image src={searchIcon.src} alt="search icon" />
                    </InputLeftElement>
                    <Input
                      mt="2px"
                      fontSize="14px"
                      fontWeight="300"
                      value={searchText}
                      w="full"
                      border="1px solid #E4E4E4"
                      bg="#F5F5F5"
                      borderRadius="12px"
                      onChange={handleChange}
                      // padding="10px 20px"
                      placeholder="Search for teamate"
                      _placeholder={{
                        color: '#919191',
                        fontSize: '12px',
                        fontWeight: '300',
                      }}
                      color="#191919"
                    />
                    <MenuButton
                      w="full"
                      opacity="0"
                      left="0"
                      visibility="hidden"
                      position="absolute"
                      as={Button}
                    ></MenuButton>
                  </InputGroup>
                </Stack>

                <MenuList
                  sx={customScrollbarStyles}
                  maxH="186px"
                  overflowY="scroll"
                  //   maxW="569px"
                  minW="459px"
                  //   minH="100px"
                  mt="-20px"
                  w="585px"
                >
                  {filteredRoles.map((item, idx) => (
                    <MenuItem
                      onClick={selectContact(item)}
                      h="fit-content"
                      py="8px"
                      //   mb="16.2px"
                      key={idx}
                    >
                      <Box sx={customScrollStyle} overflowX="scroll">
                        <HStack h="30px" wrap="nowrap" spacing="8.26px" align="center" w="full">
                          <Image
                            alt="profile image icon"
                            borderRadius="full"
                            boxSize="30.226px"
                            src={item?.avatar ?? avatar.src}
                            objectFit="cover"
                            bg="transparent"
                          />
                          <Text
                            fontSize="15.113px"
                            fontWeight="400"
                            color="#000"
                            whiteSpace="nowrap"
                            textTransform="capitalize"
                          >
                            {`${item?.first_name?.toLowerCase() ?? ''} ${
                              item?.last_name?.toLowerCase() ?? ''
                            }` ?? ''}
                            {item?.id === user?.id ? ' (You)' : ''}
                          </Text>
                          <Text
                            fontSize="13.215px"
                            fontWeight="300"
                            color="#000"
                            whiteSpace="nowrap"
                            textTransform="capitalize"
                          >
                            {item?.role ?? ''}
                          </Text>
                          <Text
                            fontSize="13.215px"
                            fontWeight="400"
                            color="#4545FE"
                            whiteSpace="nowrap"
                          >
                            {item?.email ?? ''}
                          </Text>
                        </HStack>
                      </Box>
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
            </Box>
          )}

          <VStack align="flex-start" spacing="8px" w="full">
            <Textarea
              name="note"
              value={formik.values.note}
              onChange={formik.handleChange}
              resize="none"
              border="1px solid #919191"
              borderRadius="12px"
              fontSize="14px"
              fontWeight="400"
              placeholder="Leave a note for the person you're assigning inspection to"
              _placeholder={{
                fontSize: '14px',
                fontWeight: '400',
                color: '#919191',
              }}
              maxLength="5000"
              w="full"
              mt=""
              h="161px"
            />
          </VStack>
          <HStack align="end" w="full" justify="end" pr="66.5px" spacing="15px">
            <Button
              onClick={moveToExternalMemberModal}
              fontWeight="400"
              fontSize="16px"
              bg="transparent"
              _hover={{
                bg: 'transparent',
              }}
              border="1px solid #242526"
              borderRadius="12px"
              color="#242526"
              h="55px"
              w="244px"
            >
              Assign to External Member
            </Button>

            {Summary({isValid})}
          </HStack>
        </VStack>
      </Popup2.Body>
    </Popup2>
  );
};

export default AssignInspectionToTeamMember;
