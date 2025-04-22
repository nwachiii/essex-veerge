import {
  AbsoluteCenter,
  Button,
  DrawerBody,
  DrawerCloseButton,
  DrawerFooter,
  HStack,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  StackDivider,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import ContactComponent from './ContactComponent';
import PlusIcon from '/src/images/icons/plusIconForListing.svg';
import editIcon from '/src/images/icons/EditIconForContactPerson.svg';
import backArrow from '/src/images/icons/backArrowForDrawer.svg';

import {useState} from 'react';
import {EmptyState} from '@/components/common/Table';
import iconSrc from '/src/images/icons/qlementine-icons_user.svg';

const ListOfContactsScreen = ({
  customScrollbarStyles,
  handleScreen,
  listOfContacts,
  refetch,
  projectId,
}) => {
  const [editMode, setEditMode] = useState(false);

  const switchToEditMode = shouldEdit => () => {
    setEditMode(shouldEdit);
  };

  return (
    <>
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
          {editMode ? (
            <Image
              cursor="pointer"
              onClick={switchToEditMode(false)}
              src={backArrow.src}
              alt="back icon"
            />
          ) : null}

          <Text fontSize="16px" fontWeight={600} color="#191919">
            {editMode ? 'Edit' : 'Contact Persons'}
          </Text>
        </HStack>

        <HStack spacing="15px">
          {!editMode && listOfContacts?.length ? (
            <EditIconWhenHovered switchToEditMode={switchToEditMode} />
          ) : null}

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
      <Stack w="full" spacing="none" h="64.4vh" pr="6px">
        <DrawerBody sx={customScrollbarStyles} p="20px 24px">
          {listOfContacts?.length ? (
            <Stack divider={<StackDivider my="10px" borderColor="#f5f5f5" />}>
              {listOfContacts.map((item, idx) => (
                <React.Fragment key={idx}>
                  <ContactComponent
                    editMode={editMode}
                    contactObj={item}
                    projectId={projectId}
                    refetch={refetch}
                    listOfContacts={listOfContacts}
                    handleScreen={handleScreen}
                  />
                </React.Fragment>
              ))}
            </Stack>
          ) : (
            <AbsoluteCenter w="full" flexDir={'column'} h="55vh">
              <EmptyState
                iconSrc={iconSrc.src}
                description="No contact person has been added yet"
              />
              {editMode ? null : (
                <HStack w="full" justify="center">
                  <Button
                    h="56px"
                    color="#fff"
                    mx="auto"
                    variant="md-filled-radius"
                    _hover={{
                      opacity: 1,
                    }}
                    fontSize="18px"
                    leftIcon={<Image src={PlusIcon.src} alt="plus icon" />}
                    bg="#191919"
                    onClick={() => handleScreen('addContactPerson')}
                    // borderRadius="16px"
                    w="85%"
                  >
                    Add contact Person
                  </Button>
                </HStack>
              )}
            </AbsoluteCenter>
          )}
        </DrawerBody>
      </Stack>
      {editMode ? (
        <DrawerFooter p={'0px'} px="34px" py="10px">
          <HStack w="full">
            <Button
              h="56px"
              color="#fff"
              mx="auto"
              variant="md-filled-radius"
              _hover={{
                opacity: 1,
              }}
              fontSize="18px"
              leftIcon={<Image src={PlusIcon.src} alt="plus icon" />}
              bg="#191919"
              onClick={() => handleScreen('addContactPerson')}
              // borderRadius="12px"
              w="full"
            >
              Add contact Person
            </Button>
          </HStack>
        </DrawerFooter>
      ) : null}
    </>
  );
};

export default ListOfContactsScreen;

const EditIconWhenHovered = ({switchToEditMode}) => {
  const hoverDisclosure = useDisclosure();

  return (
    <Menu
      autoSelect={false}
      placement="bottom"
      isOpen={hoverDisclosure.isOpen}
      onClose={hoverDisclosure.onClose}
    >
      <MenuButton
        onClick={switchToEditMode(true)}
        p="0px"
        onMouseEnter={hoverDisclosure.onOpen}
        onMouseLeave={hoverDisclosure.onClose}
        w="fit-content"
        bg="transparent"
        display="grid"
        placeItems="center"
        _focus={{background: 'transparent'}}
        _active={{
          background: 'transparent',
        }}
        boxSize="36px"
        borderRadius="8.116px"
        cursor="pointer"
        _hover={{
          bg: 'rgba(25, 25, 25, 0.10)',
          borderColor: '#919191',
        }}
        border="0.676px solid #3D3D3D"
        as={Button}
      >
        <Image src={editIcon.src} alt="edit icon" />
      </MenuButton>
      <MenuList
        bg="#191919"
        minW="30.4px"
        minH="29.6px"
        borderRadius="3.624px"
        border="none"
        padding="7.8px 5.2px"
        mt="0px"
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
          Edit
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
