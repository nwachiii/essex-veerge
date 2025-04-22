import {
  Box,
  Button,
  HStack,
  Image,
  Menu,
  MenuButton,
  MenuDivider,
  MenuList,
  Text,
} from '@chakra-ui/react';
import {InnerMenu} from './InnerMenu';
import {menuOptions} from 'constants/veergeMenu/broadcastMenuOptions';

export const BroadcastFilters = ({selectedCategories, categoryDisclosure, options, setOptions}) => {
  
  return (
    <>
      <Box cursor='pointer' onClick={categoryDisclosure?.onOpen}>
        {options?.length ? (
          selectedCategories?.map(option => {
            return (
              <HStack
                gap="4px"
                p="8px"
                bg="#F8F8F8"
                rounded="34px"
                cursor="pointer"
                key={option.label}
              >
                <Image src={option?.leftIcon?.src} alt={option?.label} />
                <Text as="span" color="#191919" fontWeight="400" fontSize="14px">
                  {option?.label}
                </Text>
              </HStack>
            );
          })
        ) : (
          <Text color="#919191">Filter by property</Text>
        )}
      </Box>
      <Menu
        isOpen={categoryDisclosure?.isOpen}
        onClose={categoryDisclosure?.onClose}
        onOpen={categoryDisclosure?.onOpen}
        closeOnSelect
        placement="bottom"
      >
        <MenuList ml={3} mt={'14.5rem'} w="full" p="16px" borderRadius={'16px'}>
          {menuOptions.map((item, i) => {
            return (
              <>
                <InnerMenu
                  isMenuOpen={categoryDisclosure?.isOpen}
                  menuClose={categoryDisclosure?.onClose}
                  options={options}
                  setOptions={setOptions}
                  item={item}
                />
                {i !== menuOptions?.length - 1 && (
                  <MenuDivider bg="#E4E4E4" borderColor="#E4E4E4" />
                )}
              </>
            );
          })}
        </MenuList>
      </Menu>
    </>
  );
};
