import {
  Button,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from '@chakra-ui/react';
import React, {useState} from 'react';
import {SlOptionsVertical} from 'react-icons/sl';
import PastPaymentOptionsDrawer from '../pastPaymentOptions';
import optionIcon from '/src/images/icons/optionIcon.svg';

const menuOptions = [
  {
    name: 'Maturity Date',
    isActive: true,
    open: (setDefaultScreen, optionsDrawerDisclosure) => () => {
      setDefaultScreen('maturityDate');
      optionsDrawerDisclosure.onOpen();
    },
  },
  {
    name: 'Terminate Transaction',
    isActive: false,

    open: (setDefaultScreen, optionsDrawerDisclosure) => () => {
      setDefaultScreen('terminateTransaction');
      optionsDrawerDisclosure.onOpen();
    },
  },
];

const PrevPaymentMenu = ({fracRefetch, id, maturity_date, maturity_assigned_to}) => {
  const [defaultScreen, setDefaultScreen] = useState('maturityDate');
  const optionsDrawerDisclosure = useDisclosure();
  return (
    <>
      <Menu autoSelect={false}>
        <MenuButton
          //   w="fit-content"
          h="fit-content"
          minW="fit-content"
          p="0px"
          _hover={{bg: 'transparent'}}
          variant="unstyled"
          as={Button}
        >
          <Image src={optionIcon.src} alt="option icon" />
        </MenuButton>
        <MenuList
          overflow="hidden"
          w="138px"
          minW="138px"
          borderRadius="4px"
          border="0.5px solid #e4e4e7"
          p="0px"
          bg="#ffffff"
        >
          {menuOptions.map((menuObj, idx) => (
            <MenuItem
              onClick={menuObj.open(setDefaultScreen, optionsDrawerDisclosure)}
              key={idx}
              isDisabled={!menuObj.isActive}
              p="8px"
              transition="0.3s ease-in-out"
              _hover={{
                // bg: '#f5f5f5',

                opacity: 0.6,
              }}
              fontSize="11px"
              fontWeight="400"
              color="#27272a"
            >
              {menuObj.name}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
      <PastPaymentOptionsDrawer
        defaultScreen={defaultScreen}
        refetch={fracRefetch}
        maturity_date={maturity_date}
        maturity_assigned_to={maturity_assigned_to}
        transactionID={id}
        drawerDisclosure={optionsDrawerDisclosure}
      />
    </>
  );
};

export default PrevPaymentMenu;
