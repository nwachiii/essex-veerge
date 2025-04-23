import React from 'react';
import {
  HStack,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  MenuDivider,
} from '@chakra-ui/react';

import {RxCross2} from 'react-icons/rx';
import {FcPieChart} from 'react-icons/fc';
import {AiOutlineMenu} from 'react-icons/ai';
import FractionalizationModal from './fractionalize_units/FractionalizationModal';
import EditUnit from './edit_unit';
import {MdOutlineArchive} from 'react-icons/md';
import ArchiveUnitDrawer from '../../../../components/Drawers/archiveUnitDrawer';

export const UnitMenu = ({isFraction, refetch, unitInfo, unitQty, unitPrice, bundleId}) => {
  const FractionalizeModal = useDisclosure();
  const menuItemStyles = {
    py: 0,
    h: '70px',
    borderRadius: '20px',
    _hover: {background: '#F9F9F9'},
    bg: 'transparent',
  };
  const ArchiveInfo = useDisclosure();

  return (
    <div>
      <Menu>
        {({isOpen}) => (
          <>
            <MenuButton>
              {!isOpen ? (
                <AiOutlineMenu style={{color: '#4545FE', fontSize: '44px'}} />
              ) : (
                <RxCross2 style={{color: '#4545FE', fontSize: '44px'}} />
              )}
            </MenuButton>
            <MenuList mt="24px" w="270px" p={0}>
              <MenuItem {...menuItemStyles}>
                <EditUnit refetch={refetch} unitInfo={unitInfo} bundleId={bundleId} />
              </MenuItem>
              <MenuDivider my={0} />
              <MenuItem {...menuItemStyles}>
                <HStack onClick={ArchiveInfo.onOpen} p="1.2em" spacing="20px">
                  <MdOutlineArchive style={{color: 'tomato', fontSize: '24px'}} />
                  <Text color="#4545FE" fontSize="18px" fontWeight={500}>
                    {`Archive unit(s)`}
                  </Text>
                </HStack>
                <ArchiveUnitDrawer
                  refetch={refetch}
                  modalDisclosure={ArchiveInfo}
                  unitInfo={unitInfo}
                  bundleId={bundleId}
                />
              </MenuItem>
              {isFraction == 'false' && (
                <MenuItem {...menuItemStyles}>
                  <HStack p="1.2em" spacing="20px" onClick={FractionalizeModal.onOpen}>
                    <FcPieChart style={{color: '#4545FE', fontSize: '24px'}} />
                    <Text color="#4545FE" fontSize="18px" fontWeight={500}>
                      Fractionalize
                    </Text>
                  </HStack>
                </MenuItem>
              )}
            </MenuList>
          </>
        )}
      </Menu>
      <FractionalizationModal
        unitQty={unitQty}
        bundleId={bundleId}
        unitInfo={unitInfo}
        FRACTIONALIZE_MODAL={FractionalizeModal}
      />
    </div>
  );
};

export default UnitMenu;
