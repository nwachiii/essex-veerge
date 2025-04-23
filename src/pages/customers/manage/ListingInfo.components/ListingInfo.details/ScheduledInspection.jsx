import {
  Box,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useDisclosure,
  HStack,
  VStack,
  Button as ChakraBtn,
} from '@chakra-ui/react';
import React, {Fragment, useState} from 'react';
import DatePicker from 'react-datepicker';
import {FaCaretRight} from 'react-icons/fa';
import 'react-datepicker/dist/react-datepicker.css';

import {themeStyles} from '../../../../../theme';
import {Button, Popup} from '../../../../../ui-lib';

import {FcCalendar} from 'react-icons/fc';
import scheduleIcon from '/src/images/icons/scheduleInspectionIcon.svg';
import ScheduledInspectionDrawer from '../../../../../components/Drawers/scheduledInspection';

export const ScheduledInspection = () => {
  const modalDisclosure = useDisclosure();
  const [startDate, setStartDate] = useState(new Date(), 0, 9);
  const selectedMonthAndDay = startDate.toDateString().toString().slice(4, 10);
  const selectedYear = startDate.toDateString().toString().slice(11, 15);

  const filterPassedTime = time => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };
  return (
    <Fragment>
      <ChakraBtn
        variant="outline-radius"
        maxH="48px"
        fontSize="16px"
        fontWeight="400"
        fontFamily="Euclid Circular B"
        borderColor="#a3a3a3"
        h="48px"
        px="20px"
        maxW={{md: 'full', xl: '280px'}}
        iconSpacing="14.7px"
        onClick={modalDisclosure.onOpen}
        leftIcon={<Image alt="" src={scheduleIcon.src} boxSize={'24px'} />}
      >
        Scheduled Inspection
      </ChakraBtn>
      <ScheduledInspectionDrawer modalDisclosure={modalDisclosure} />
      {/* <Popup isOpen={ShowCalendar.isOpen} onClose={ShowCalendar.onClose} mt="11vh">
				<Popup.Body maxW='857px' >
						<HStack mb={4} align='center' spacing='15px' w='full'>
						<FcCalendar style={{color: '#4545FE', fontSize: '54px'}} />
						<Box>
							<Text fontSize='28px' fontWeight={700}>
								Scheduled Inspection
							</Text>
							<Text fontSize='14px' pt={-4}>
								Available inspection days for this month
							</Text>
						</Box>
					</HStack>
					<Box
						px='30px'
						w='full'
						maxW='433px'
						h='81px'
						py='18px'
						bg={themeStyles.color.primary}
						borderRadius='14px'>
						<VStack color='#FFFFFF'>
							<Text fontWeight={500} fontSize='12px'>
								{selectedYear}
							</Text>
							<Text fontWeight={700} fontSize='20px' lineHeight='24px'>
								{selectedMonthAndDay}
							</Text>
						</VStack>
					</Box>
					<Box mt="17px">
						<DatePicker
							inline
							showTimeSelect
							selected={startDate}
							filterTime={filterPassedTime}
							dateFormat='MMMM d, yyyy h:mm aa'
							onChange={(date) => setStartDate(date)}
						/>
					</Box>
					<Button onClick={ShowCalendar.onClose} variant='dark' mx='auto' w='421px' h='55px'>
						Inspection Manager
					</Button>
				</Popup.Body>
			</Popup> */}
    </Fragment>
  );
};

export default ScheduledInspection;
