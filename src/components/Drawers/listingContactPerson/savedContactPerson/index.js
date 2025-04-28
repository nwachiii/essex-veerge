import {
  DrawerBody,
  DrawerCloseButton,
  HStack,
  Image,
  Stack,
  StackDivider,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import ContactComponent from './ContactComponent';
import backArrow from '/src/images/icons/backArrowForDrawer.svg';

import {useState} from 'react';
import Avatar1 from '/src/images/avatar-11.png';
import Avatar2 from '/src/images/avatar-12.png';
import Avatar3 from '/src/images/avatar-13.png';
import Avatar4 from '/src/images/avatar-14.png';

const ListOfContactsScreen = ({
  customScrollbarStyles,
  handleScreen,
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
          Community Account Managers

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
            <DrawerCloseButton right="0px" left="0px" my="auto" color="#000" top="0" bottom="0" />
          </VStack>
        </HStack>
      </HStack>
      <Stack w="full" spacing="none" h="64.4vh" pr="6px">
        <DrawerBody sx={customScrollbarStyles} p="20px 24px">
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
        </DrawerBody>
      </Stack>
    </>
  );
};

export default ListOfContactsScreen;

const listOfContacts = [
  {
    image: Avatar1.src,
    name: 'Olivia Parker',
    email: 'olivia.parker@gmail.com',
    title: 'Resident Relation Officer',
  },
  {
    image: Avatar2.src,
    name: 'Ethan Brooks',
    email: 'ethan.brooks@gmail.com    ',
    title: 'Community Lead',
  },
  {
    image: Avatar3.src,
    name: 'Property Operations Manager',
    email: 'ava359@gmail.com    ',
    title: 'Ava Mitchell',
  },
  {
    image: Avatar4.src,
    name: 'Noah Carter',
    email: 'noahcartie@gmail.com    ',
    title: 'Resident Experience Manager',
  },
]

