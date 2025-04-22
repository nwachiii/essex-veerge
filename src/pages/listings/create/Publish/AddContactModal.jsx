import React, {useState} from 'react';
import {Button, Popup} from '../../../../ui-lib';
import {Box, Center, Checkbox, HStack, Image, Text, useToast} from '@chakra-ui/react';
import checkedIcon from '/src/images/icons/checked.svg';
import uncheckedIcon from '/src/images/icons/unchecked.svg';

export const AddContactModal = ({
  checkedItems,
  setCheckedItems,
  ADD_CONTACT_PERSONS,
  FETCH_ROLES__RESULTS,
}) => {
  const toast = useToast();
  const handleSelectContact = (e, contact) => {
    if (e.cancelable) e.preventDefault();
    const itemAlreadyExist =
      checkedItems.length > 0 ? checkedItems?.find(item => item == contact?.id) : undefined;
    itemAlreadyExist == undefined || !checkedItems?.length
      ? setCheckedItems([...checkedItems, contact?.id])
      : toast({
          title: `This contact has been selected...`,
          status: 'info',
          duration: 3000,
          isClosable: true,
          position: 'bottom',
        });
  };

  const handleRemove = arg => {
    const copy = [...checkedItems];
    for (let index = 0; index < checkedItems.length; index++) {
      if (copy[index] === arg?.id) {
        copy.splice(index, 1);
        index = copy.length;
      }
      setCheckedItems(copy);
    }
  };

  const toggleItemSelection = item => {
    const itemIndex = checkedItems.findIndex(selectedItem => selectedItem === item.id);

    if (itemIndex === -1) {
      // If item is not in the checkedItems array, add it
      setCheckedItems([...checkedItems, item?.id]);
    } else {
      // If item is already selected, remove it
      handleRemove(item);
    }
  };

  const getIconVariant = item => {
    return checkedItems.find(arg => arg === item.id) ? 'checked' : 'unchecked';
  };

  return (
    <Popup
      overflowY="auto"
      size="full"
      minH="fit-content"
      mt="16vh"
      minW={{base: '90%', md: '415px'}}
      color="#191919"
      isOpen={ADD_CONTACT_PERSONS.isOpen}
      onClose={ADD_CONTACT_PERSONS.onClose}
      p="22px 18px 18px"
      borderRadius="14px"
    >
      {/* <Text px="32px" fontSize="24px" fontWeight={600}>
        Select Contact Person
      </Text> */}
      <Text fontSize="24px" fontWeight={600}>
        Select Contact Person
      </Text>
      <Popup.Body h="auto">
        <Box width={'100%'} maxH="450px" overflowY="auto" h={'auto'}>
          {FETCH_ROLES__RESULTS?.map((contact, index) => {
            const isItem =
              checkedItems.length > 0 && checkedItems?.find(item => item === contact?.id);
            return (
              // <Checkbox
              //   w="full"
              //   isChecked={false}
              //   border={'none'}
              //   spacing={0}
              //   onChange={() => toggleItemSelection(contact)}
              //   width={'100%'}
              //   >
              <HStack
                key={index}
                align="center"
                justify={'flex-start'}
                cursor={'pointer'}
                p="14px 4px"
                spacing={'11px'}
                onClick={() => toggleItemSelection(contact)}
                borderBottom={'1px solid #e4e4e4'}
              >
                <Center border={'1px solid lightgray'} borderRadius={'4px'} w="24px" h="24px">
                  {getIconVariant(contact) == 'checked' && <Image src={checkedIcon.src} alt="" />}
                </Center>
                <Image borderRadius={'full'} boxSize={'48px'} src={contact?.img} alt="" />
                <Text textAlign={'left'} fontSize={'18px'} color={'#191919'}>
                  {contact?.name}
                </Text>
              </HStack>
              // </Checkbox>
            );
          })}
        </Box>
        <HStack pt={'10px'} w={'100%'}>
          <Button
            cursor={'pointer'}
            textAlign={'center'}
            onClick={ADD_CONTACT_PERSONS.onClose}
            color={'#FFFFFF'}
            bg="#191919"
            _active={{backgroundColor: '#191919'}}
            _hover={{backgroundColor: '#191919'}}
            p="13.3px"
            borderRadius={'10px'}
            w={'90%'}
            mx="auto"
            fontSize={18}
            isDisabled={checkedItems.length <= 0}
            fontWeight="400"
          >
            Add
          </Button>
        </HStack>
      </Popup.Body>
    </Popup>
  );
};

export default AddContactModal;
