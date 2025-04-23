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
  extendTheme,
  Image,
  Flex,
} from '@chakra-ui/react';
import {theme} from '../../../../theme';
import {Button} from '../../../../ui-lib/ui-lib.components';

import filterBars from '/src/images/icons/filter-bars.png';

const styles = extendTheme({...theme});
export const Filter = () => {
  const {isOpen, onOpen, onClose} = useDisclosure();

  return (
    <div>
      <Button
        variant="secondary"
        onClick={onOpen}
        w="96px"
        h="48px"
        borderColor="#E5E5E5"
        mt={0}
        px={0}
      >
        <Flex gap={3} color="#4545FE">
          Filter <Image alt="" src={filterBars.src} />
        </Flex>
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
        color="#4545FE"
        as={Button}
        rightIcon={<TriangleDownIcon h="10px" mt="2.8px" />}
      >
        <Text fontSize="14px"> Filter by status</Text>
      </MenuButton>
      <MenuList pos="absolute" zIndex={100} boxShadow="lg">
        <MenuItem>Active</MenuItem>
        <MenuItem>Inactive</MenuItem>
      </MenuList>
    </Menu>
  );
};
export const FilterByDate = () => {
  return (
    <Menu pos="relative">
      <MenuButton
        {...styles.menu_btn}
        color="#4545FE"
        as={Button}
        rightIcon={<TriangleDownIcon h="10px" mt="2.8px" />}
      >
        <Text fontSize="14px"> Filter by date</Text>
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

export default Filter;
