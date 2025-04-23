import {HStack, Text, Menu, MenuButton, MenuList, MenuItem, Box} from '@chakra-ui/react';

import {RxCross1} from 'react-icons/rx';
import {FcDocument} from 'react-icons/fc';
import React from 'react';
import {MdOutlineArchive} from 'react-icons/md';
import PaymentPlanContract from './PaymentPlanContract';
import {BsThreeDots} from 'react-icons/bs';

export const PaymentPlanActionsMenu = ({unit, openDeleteModal}) => {
  const handleIconColor = () =>
    unit?.is_private == true ? {color: '#FFFFFF'} : {color: '#12D8A0'};
  return (
    <Box position={'absolute'} left="3%" top={'3%'}>
      <Menu>
        {({isOpen}) => (
          <>
            <MenuButton>
              {!isOpen ? (
                <BsThreeDots fontSize="34px" style={handleIconColor} />
              ) : (
                <RxCross1 style={{...handleIconColor, fontSize: '25px'}} />
              )}
            </MenuButton>
            <MenuList mt="4px" w="130px">
              <MenuItem>
                <HStack onClick={() => openDeleteModal(unit)} py=".1em" spacing="20px">
                  <MdOutlineArchive
                    style={
                      unit?.is_private == true
                        ? {color: '#191919', fontSize: '34px'}
                        : {color: 'tomato', fontSize: '34px'}
                    }
                  />
                  <Text
                    display="flex"
                    cursor="pointer"
                    fontSize="14px"
                    fontWeight={500}
                    color={unit?.is_private == true ? '#191919' : '#FF6A6A'}
                  >
                    {unit?.is_private == true ? 'Plan is private' : 'Make private'}
                  </Text>
                </HStack>
              </MenuItem>
              <MenuItem>
                <HStack py=".1em" spacing="20px">
                  <FcDocument style={{marginTop: '3px'}} fontSize="34px" />
                  <PaymentPlanContract planData={unit} />
                </HStack>
              </MenuItem>
            </MenuList>
          </>
        )}
      </Menu>
    </Box>
  );
};

export default PaymentPlanActionsMenu;
