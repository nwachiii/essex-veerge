import {ChevronDownIcon, TriangleDownIcon} from '@chakra-ui/icons';
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
  Button,
  extendTheme,
} from '@chakra-ui/react';
import {theme} from '../../../../theme';

const styles = extendTheme({...theme});
export const DrawerComponent = () => {
  const {isOpen, onOpen, onClose} = useDisclosure();

  return (
    <div>
      <Button variant="secondary" onClick={onOpen}>
        Filter by status
      </Button>
      <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Filter by Status</DrawerHeader>
          <DrawerBody>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export const FilterByStatus = () => {
  return (
    <Menu pos="relative">
      <MenuButton
        {...styles.menu_btn}
        w="fit-content"
        as={Button}
        rightIcon={<TriangleDownIcon h="10px" mt="2.8px" />}
      >
        <Text fontSize="14px"> Filter by Status</Text>
      </MenuButton>
      <MenuList pos="absolute" zIndex={100} boxShadow="lg">
        <MenuItem>Active</MenuItem>
        <MenuItem>Inactive</MenuItem>
      </MenuList>
    </Menu>
  );
};
export const FilterByPaymentType = () => {
  return (
    <Menu pos="relative">
      <MenuButton
        {...styles.menu_btn}
        w="fit-content"
        as={Button}
        rightIcon={<TriangleDownIcon h="10px" mt="2.8px" />}
      >
        <Text fontSize="14px"> Filter by Payment type</Text>
      </MenuButton>
      <MenuList pos="absolute" zIndex={100} boxShadow="lg">
        <MenuItem>Payment type</MenuItem>
        <MenuItem>Payment type</MenuItem>
      </MenuList>
    </Menu>
  );
};
export const FilterByDate = () => {
  return (
    <Menu pos="relative">
      <MenuButton
        {...styles.menu_btn}
        as={Button}
        rightIcon={<TriangleDownIcon h="10px" mt="2.8px" />}
      >
        <Text fontSize="14px"> Filter by Date</Text>
      </MenuButton>
      <MenuList pos="absolute" zIndex={100} boxShadow="lg">
        <MenuItem>July</MenuItem>
        <MenuItem>June</MenuItem>
        <MenuItem>May</MenuItem>
        <MenuItem>April</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default FilterByPaymentType;
