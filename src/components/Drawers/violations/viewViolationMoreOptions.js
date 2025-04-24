import courtesyReminderIcon from '/src/images/icons/courtesyReminderIcon.svg';

import issueFineIcon from '/src/images/icons/issueFineIcon.svg';
import rightArrow from '/src/images/icons/RightArrowForListingScheduledInspection.svg';

import escalateToBoardIcon from '/src/images/icons/escalateToBoardIcon.svg';
import exportCsvIcon from '/src/images/icons/exportCsvIcon.svg';

import {
  DrawerBody,
  DrawerCloseButton,
  Flex,
  HStack,
  Heading,
  Image,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import {IoArrowBackSharp} from 'react-icons/io5';

export const ViolationDrawerOptions = ({
  handleScreen,

  customScrollbarStyles,
}) => {
  const List = [
    {
      title: 'Send Courtesy Reminder',
      icon: courtesyReminderIcon.src,
      message: 'Send a gentle nudge to resident about this issue.',
    },
    {
      icon: issueFineIcon.src,
      title: 'Issue Fine',
      message:
        'Issue a fine for policy violations. Set the amount, reason, and due date—residents are instantly notified with a clear record.',
    },
    {
      icon: escalateToBoardIcon.src,
      title: `Escalate to Board`,
      message: `Flag issue as critical  for board-level attention. Automatically attach related notes, documents, and history for informed decision-making.`,
    },
    {
      icon: exportCsvIcon.src,
      title: 'Export CSV / PDF',
      message:
        'Download reports this issue in CSV or PDF format—perfect for audits, board reviews, or external sharing.',
    },
  ];

  return (
    <>
      <HStack
        py="7px"
        h="50px"
        bg="#fafafa"
        boxShadow=" 0px 2px 4px 0px #0000000D"
        px="20px"
        justify="space-between"
        align="center"
        position="relative"
      >
        <Flex alignItems="center" gap="10px">
          <IoArrowBackSharp
            fontSize="20px"
            cursor="pointer"
            onClick={handleScreen('issue details')}
          />
          <Heading fontSize="16px" fontWeight="600" color="#18181b">
            More Options
          </Heading>
        </Flex>
        {/* <HStack spacing="15px">
          <VStack
            position="relative"
            justify="center"
            align="center"
            w="30px"
            h="30px"
            borderRadius="5px"
            transition="0.3s ease-in-out"
            _hover={{
              width: '30px',
              height: '30px',
            }}
          >
            <DrawerCloseButton right="0px" left="0px" my="auto" color="#000" top="0" bottom="0" />
          </VStack>
        </HStack> */}
      </HStack>
      <DrawerBody sx={customScrollbarStyles} paddingTop="20px" px="27px" w="400px">
        {List.flatMap((data, index) =>
          data
            ? [
                <HStack
                  cursor="pointer"
                  border="1px solid #E4E4E7"
                  padding="15px 22px 15px 11px "
                  borderRadius="12px"
                  marginBottom="16px"
                  key={index}
                  justify={'space-between'}
                >
                  <VStack spacing="11px" alignItems="start">
                    <HStack spacing="15px">
                      <Image boxSize="24px" src={data.icon} alt="icons" />
                    </HStack>
                    <Stack spacing="8px">
                      <Text fontSize="14px" color="#18181b" fontWeight="600">
                        {data.title}
                      </Text>
                      <Text fontWeight="400" color="#52525b" fontSize="10px">
                        {data.message}
                      </Text>
                    </Stack>
                  </VStack>
                  <Image src={rightArrow.src} alt="right icon" />
                </HStack>,
              ]
            : []
        )}
      </DrawerBody>
    </>
  );
};

export default ViolationDrawerOptions;
