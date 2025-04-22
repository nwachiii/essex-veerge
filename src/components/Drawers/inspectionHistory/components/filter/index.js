import {
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  Image,
  Modal,
  ModalOverlay,
  useDisclosure,
  Tooltip,
  Box,
} from '@chakra-ui/react';
import React, {useState} from 'react';
import SelectFilterOption from './screens/selectFilterOption';
import filterIcon from '/src/images/icons/filter_icon.svg';
import FilterCalendar from './screens/filterCalendar';
import SelectDateRange from './screens/selectDateRange';

export const FilterInspectionHistory = ({setAddedParam}) => {
  const [screen, setScreen] = useState('index screen');
  const [selectedDate, setDate] = useState({from: '', to: ''});
  const [calendarPurpose, setCalendarPurpose] = useState('');
  const [statusType, setStatustype] = useState([]);
  const menuDisclosure = useDisclosure();

  const setChoosenDate = date => {
    setDate({...selectedDate, [calendarPurpose]: date});
    setScreen('dateRange');
  };

  const customScrollbarStyles = {
    '&::-webkit-scrollbar': {
      width: '4px',
      borderRadius: '16px',
    },
    '&::-webkit-scrollbar-track': {
      borderRadius: '16px',
      WebkitBoxShadow: 'inset 0 0 6px #cbcbcb',
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '16px',
      backgroundColor: '#fff',
      // outline: '1px solid slategrey', // You can include this line if needed
    },
  };
  const handleClose = () => {
    setScreen('index screen');
    setDate({from: '', to: ''});
    setStatustype([]);
    return menuDisclosure.onClose();
  };

  const handleScreen = screen => () => setScreen(screen);

  const displayFilterScreens = key => {
    switch (key) {
      case 'index screen':
        return (
          <SelectFilterOption
            customScrollbarStyles={customScrollbarStyles}
            handleScreen={handleScreen}
            selectedDate={selectedDate}
            setDate={setDate}
            setStatustype={setStatustype}
            statusType={statusType}
            handleClose={handleClose}
            setAddedParam={setAddedParam}
          />
        );
        break;
      case 'dateRange':
        return (
          <SelectDateRange
            handleClose={handleClose}
            setCalendarType={setCalendarPurpose}
            customScrollbarStyles={customScrollbarStyles}
            handleScreen={setScreen}
            setDate={setDate}
            selectedDate={selectedDate}
          />
        );
        break;
      case 'calendar':
        return (
          <FilterCalendar
            selectedDate={selectedDate}
            setChoosenDate={setChoosenDate}
            calendarPurpose={calendarPurpose}
            customScrollbarStyles={customScrollbarStyles}
            handleScreen={handleScreen}
          />
        );
        break;

      default:
        return (
          <SelectFilterOption
            customScrollbarStyles={customScrollbarStyles}
            handleScreen={handleScreen}
            selectedDate={selectedDate}
            setDate={setDate}
            handleClose={handleClose}
            setAddedParam={setAddedParam}
          />
        );

        break;
    }
  };

  return (
    <Menu
      isOpen={menuDisclosure.isOpen}
      closeOnSelect={false}
      autoSelect={false}
      onClose={handleClose}
      borderRadius="16px"
    >
      <MenuButton
        as={IconButton}
        border=" 0.676px solid #3d3d3d"
        borderRadius="8px"
        position="relative"
        minW="36px"
        px="10px"
        boxSize="36px"
        bg="transparent"
        cursor="pointer"
        _hover={{
          bg: 'rgba(25, 25, 25, 0.10)',
          borderColor: '#919191',
          opacity: '0.7',
        }}
        _active={{
          bg: 'rgba(25, 25, 25, 0.10)',
          borderColor: '#919191',
          opacity: '0.7',
        }}
        onClick={menuDisclosure.onOpen}
        icon={
          <Tooltip
            label="Filter"
            w="36px"
            h="29.6px"
            bg="#191919"
            fontSize="10.87px"
            whiteSpace="nowrap"
            p="7.8px 5.2px"
            fontWeight="400"
            borderRadius="3.62px"
            aria-label="filter tooltip"
          >
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              minW="36px"
              px="10px"
              boxSize="36px"
            >
              <Image src={filterIcon.src} boxSize="16px" alt="filter icon" />
            </Box>
          </Tooltip>
        }
      ></MenuButton>

      <MenuList p="0px" borderRadius="12.3px">
        {displayFilterScreens(screen)}
      </MenuList>
    </Menu>
  );
};

export default FilterInspectionHistory;
