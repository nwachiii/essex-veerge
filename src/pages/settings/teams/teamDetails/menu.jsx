import React, {useState} from 'react';
import {Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text} from '@chakra-ui/react';
import {RemoveRoleModal} from './removeRoleModal';
import {ChangeRoleModal} from './ChangeRoleModal';
import {BsThreeDotsVertical} from 'react-icons/bs';

export const TeamsMenu = ({id, refetch}) => {
  const [isRemoveRoleModalOpen, setRemoveRoleModal] = useState(false);
  const [isChangeRoleModalOpen, setChangeRoleModal] = useState(false);

  const onCloseChangeRoleModal = () => {
    setChangeRoleModal(false);
  };
  const onOpenChangeRoleModal = () => {
    setChangeRoleModal(true);
  };

  const onCloseRemoveRoleModal = () => {
    setRemoveRoleModal(false);
  };

  const onOpenRemoveRoleModal = () => {
    setRemoveRoleModal(true);
  };

  return (
    <Menu closeOnSelect>
      <MenuButton aria-label="Options" variant="outline">
        <BsThreeDotsVertical size={'24Px'} />
      </MenuButton>
      <MenuList borderRadius={'16px'}>
        <MenuItem onClick={onOpenRemoveRoleModal}>
          <Text
            fontWeight="400"
            fontSize="16px"
            lineHeight="20px"
            textAlign="center"
            color="#3D3D3D"
            p={'10px'}
          >
            Remove
          </Text>
          <RemoveRoleModal
            isModalOpen={isRemoveRoleModalOpen}
            onModalClose={onCloseRemoveRoleModal}
            refetch={refetch}
            id={id}
          />
        </MenuItem>
        <MenuDivider color="#CBCBCB" />
        <MenuItem onClick={onOpenChangeRoleModal}>
          <Text
            fontWeight="400"
            fontSize="16px"
            lineHeight="20px"
            textAlign="center"
            color="#3D3D3D"
            p={'10px'}
          >
            Change
          </Text>
          <ChangeRoleModal
            isModalOpen={isChangeRoleModalOpen}
            onModalClose={onCloseChangeRoleModal}
            id={id}
            refetch={refetch}
          />
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
export default TeamsMenu;
