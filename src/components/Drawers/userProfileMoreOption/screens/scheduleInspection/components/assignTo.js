import React from 'react';
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

import searchIcon from '/src/images/icons/searchIcon.svg';

import {useState} from 'react';
import cancelIcon from '/src/images/icons/cancelIconRequest.svg';

const AssignTo = ({formik, roles}) => {
  const modalDisclosure = useDisclosure();
  const defaultContact =
    formik?.values?.last_name && formik?.values?.first_name
      ? {
          last_name: formik?.values?.last_name ?? '',
          first_name: formik?.values?.first_name ?? '',
          avatar: formik?.values?.avatar ?? '',
        }
      : null;
  const [filteredRoles, setFilteredRoles] = useState([roles ?? []]);
  const [searchText, setSearchText] = useState('');
  const [contact, setContact] = useState(defaultContact);

  const user = loggedinUserStatic;

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

    formik.setValues({
      ...formik.values,
      first_name: `${param?.first_name.toLowerCase()}`,
      last_name: `${param?.last_name.toLowerCase()}`,
      email: param.email,
      avatar: param.avatar,
    });

    setSearchText('');
  };
  const removeContact = () => {
    setContact(null);
    formik.setValues({...formik.values, name: '', email: ''});
  };

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
    <>
      <Stack spacing="5px">
        <Text as="label" fontSize="14px" color="#191919" fontWeight="400" htmlFor="timeext">
          Assign Inspection to
        </Text>
        {contact ? (
          <Stack
            w="100%"
            spacing="8px"
            border="1px solid #E4E4E4"
            bg={`#fff`}
            minH="50px"
            justifyContent={`center`}
            p={`8px`}
          >
            <HStack
              w="max-content"
              padding="8px"
              borderRadius="4px"
              spacing="10px"
              background={`rgba(69, 69, 254, 0.05)`}
            >
              <Image
                borderRadius="full"
                src={contact?.avatar ?? ''}
                alt="team member image"
                boxSize="16px"
                objectFit="cover"
              />
              <Text fontSize="12px" color="#191919" fontWeight="500" textTransform="capitalize">
                {`${contact.first_name.toLowerCase()} ${contact.last_name.toLowerCase()}`}
              </Text>
              <Image
                cursor="pointer"
                src={cancelIcon.src}
                onClick={removeContact}
                alt="cancel icon"
                boxSize="px20"
                objectFit="cover"
              />
            </HStack>
          </Stack>
        ) : (
          <Menu
            isOpen={modalDisclosure.isOpen}
            position="relative"
            placement="bottom-start"
            flip={false}
            onClose={modalDisclosure.onClose}
          >
            <InputGroup w="full" px="0px">
              <InputLeftElement h="50px" pointerEvents="none" minW="fit-content">
                <Image src={searchIcon.src} alt="search icon" />
              </InputLeftElement>
              <Input
                fontSize="14px"
                fontWeight="300"
                value={searchText}
                w="full"
                h="50px"
                border="1px solid #E4E4E4"
                bg="transparent"
                borderRadius="8px"
                onChange={handleChange}
                placeholder="Search for teammate"
                _placeholder={{
                  color: '#919191',
                  fontSize: '14px',
                  fontWeight: '400',
                }}
                _focus={{
                  boxShadow: 'none',
                  borderColor: '#e4e4e4',
                }}
                _focusVisible={{
                  boxShadow: 'none',
                  borderColor: '#e4e4e4',
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

            <MenuList
              sx={customScrollbarStyles}
              maxH="186px"
              overflowY="scroll"
              boxShadow="4px 4px 8px 0px rgba(123, 157, 157, 0.15), -4px -4px 8px 0px rgba(123, 157, 157, 0.15)"
              minW="330px"
              mt="7px"
              w="330px"
            >
              {filteredRoles.map((item, idx) => (
                <MenuItem onClick={selectContact(item)} h="fit-content" py="8px" key={idx}>
                  <Box sx={customScrollStyle} overflowX="scroll">
                    <HStack h="30px" wrap="nowrap" spacing="8.26px" align="center" w="full">
                      <Image
                        alt="profile image icon"
                        borderRadius="full"
                        boxSize="22.226px"
                        src={item?.avatar ?? avatar.src}
                        objectFit="cover"
                        bg="transparent"
                      />
                      <Text
                        fontSize="12px"
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
                        fontSize="9px"
                        fontWeight="300"
                        color="#000"
                        whiteSpace="nowrap"
                        textTransform="capitalize"
                      >
                        {item?.role?.toLowerCase() === `agent` ? `realtor` : item?.role || ``}
                      </Text>
                      {/* <Text fontSize="9px" fontWeight="400" color="#4545FE" whiteSpace="nowrap">
                        {item?.email ?? ''}
                      </Text> */}
                    </HStack>
                  </Box>
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        )}
      </Stack>
    </>
  );
};

export default AssignTo;
