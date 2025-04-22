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
  ModalBody,
} from '@chakra-ui/react';
import React from 'react';

import avatar from '/src/images/avatar.svg';

import searchIcon from '/src/images/icons/contactPersonSearchicon.svg';
import {useFormik} from 'formik';
import {useState} from 'react';
import cancelIcon from '/src/images/icons/cancelIconRequest.svg';

const AssignToTeamMembers = ({setSummaryInfo, history, handleScreen, roles}) => {
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
      handleScreen(history ? 'summaryForHistory' : 'summary');
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
    <Stack py="36px" px="24px" w={`640px`}>
      <VStack align={`stretch`} gap={`4px`} mb={`20px`}>
        <Heading fontSize="24px" fontWeight="600" lineHeight={`117%`} color="#191919">
          Assign Inspection
        </Heading>
        <Text color={`#525252`} fontSize={`16px`} fontWeight={`400`} lineHeight={`125%`}>
          Who do you want to assign the inspection to ?
        </Text>
      </VStack>
      <ModalBody p="0px" py="0px" my="0px">
        <VStack
          w="full"
          spacing="24px"
          px="2px"
          onSubmit={e => {
            if (e.cancelable) e.preventDefault();
            return formik.handleSubmit();
          }}
          as="form"
          align={`stretch`}
        >
          {contact ? (
            <Stack
              w="full"
              spacing="8px"
              p={`6px 12px `}
              borderRadius={`8px`}
              border={`1px solid`}
              borderColor={`#D6D6D6`}
            >
              <HStack
                w="max-content"
                padding="9px 17px"
                borderRadius="4px"
                border="0.5px solid #E4E4E4"
                borderColor={`#E5E5E5`}
                spacing="10px"
                bg={`#FAFAFA`}
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
            <Box w="full" position="relative">
              <Menu
                isOpen={modalDisclosure.isOpen}
                // isOpen={true}
                onClose={modalDisclosure.onClose}
              >
                <InputGroup w="full" position="relative">
                  <InputLeftElement pointerEvents="none">
                    <Image src={searchIcon.src} alt="search icon" />
                  </InputLeftElement>
                  <Input
                    fontSize="16px"
                    fontWeight="400"
                    value={searchText}
                    w="full"
                    border="1px solid #E4E4E4"
                    borderColor={`#d6d6d6`}
                    borderRadius="8px"
                    onChange={handleChange}
                    placeholder="Search for teamate"
                    _placeholder={{
                      color: '#737373',
                      fontSize: '16px',
                      fontWeight: '400',
                      opacity: `1`,
                      lineHeight: `150%`,
                    }}
                    color="#191919"
                    lineHeight={`150%`}
                    py={`12px`}
                    boxShadow={`0px 1px 2px 0px rgba(16, 24, 40, 0.05)`}
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

                <MenuList
                  sx={customScrollbarStyles}
                  maxH="186px"
                  overflowY="scroll"
                  minW="459px"
                  mt="-20px"
                  w="585px"
                >
                  {filteredRoles.map((item, idx) => (
                    <MenuItem onClick={selectContact(item)} h="fit-content" py="8px" key={idx}>
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

          <VStack align="flex-start" gap="6px" w="full">
            <Text color={`#424242`} fontSize={`14px`} fontWeight={`500`} lineHeight={`143%`}>
              Note
            </Text>
            <Textarea
              name="note"
              value={formik.values.note}
              onChange={formik.handleChange}
              resize="none"
              border="1px solid #919191"
              borderRadius="8px"
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
              h="100px"
            />
          </VStack>
          <HStack w={`100%`} gap="12px">
            <Button
              onClick={() => handleScreen('assignToExternalMember')}
              fontWeight="500"
              fontSize="16px"
              bg="transparent"
              _hover={{
                bg: 'transparent',
              }}
              border="1px solid"
              color="#424242"
              borderRadius="72px"
              w={`100%`}
              h={`max-content`}
              p={`16px 18px`}
              lineHeight={`150%`}
              flex={`1`}
            >
              Assign to External Member
            </Button>

            <Button
              isDisabled={!isValid}
              type="submit"
              bg="#191919"
              _hover={{
                _disabled: {
                  opacity: '0.4',
                },
                opacity: 1,
              }}
              color="#ffffff"
              fontSize="16px"
              fontWeight="500"
              borderRadius="72px"
              w={`100%`}
              h={`max-content`}
              p={`16px 18px`}
              lineHeight={`150%`}
              flex={`1`}
            >
              Proceed
            </Button>
          </HStack>
        </VStack>
      </ModalBody>
    </Stack>
  );
};

export default AssignToTeamMembers;
