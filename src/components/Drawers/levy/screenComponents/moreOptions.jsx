import {
  Button,
  DrawerBody,
  DrawerCloseButton,
  DrawerFooter,
  Flex,
  HStack,
  Image,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import {IoArrowBackSharp} from 'react-icons/io5';
import rightArrow from '/src/images/icons/RightArrowForListingScheduledInspection.svg';
import levyHistoryIcon from '/src/images/icons/levyHistoryIcon.svg';
import levyPastPaymentIcon from '/src/images/icons/levyPastPaymentIcon.svg';
import levyIncomingPaymentIcon from '/src/images/icons/levyIncomingPaymentIcon.svg';

const content = [
  {
    title: 'Levy History',
    description:
      'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsoloremqu.',
    icon: levyHistoryIcon.src,
    scrn: 'levy history',
  },
  {
    title: 'Past Payment',
    description:
      'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsoloremqu.',
    icon: levyPastPaymentIcon.src,
    scrn: 'past payment',
  },
  {
    title: 'Incoming Payment',
    description:
      'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsoloremqu.',
    icon: levyIncomingPaymentIcon.src,
    scrn: 'incoming payment',
  },
];

const LevyMoreOptions = ({setMainScreen, setScreen}) => {
  return (
    <>
      <HStack
        borderBottom="0.5px solid #e4e4e7"
        box-shadow=" 0px 2px 4px 0px #0000000D"
        py="7px"
        bg="#fafafa"
        h="50px"
        px="20px"
        justify="space-between"
        align="center"
        position="relative"
        width="full"
      >
        <Flex alignItems="center" gap="10px">
          <IoArrowBackSharp
            fontSize="20px"
            cursor="pointer"
            onClick={() => setMainScreen('create levy')}
          />
          <Text fontSize="16px" fontWeight={600} color="#18181b">
            More Options
          </Text>
        </Flex>
      </HStack>
      <DrawerBody pt="20px" px={'27px'}>
        <Stack spacing="20px" w="full">
          {content.map((data, index) => (
            <HStack
              cursor={'pointer'}
              border="1px solid #E4E4E7"
              padding="15px 11px"
              onClick={() => setScreen(data.scrn)}
              borderRadius="12px"
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
                    {data.description}
                  </Text>
                </Stack>
              </VStack>
              <Image opacity="0.5" src={rightArrow.src} alt="right icon" />
            </HStack>
          ))}
        </Stack>
      </DrawerBody>
    </>
  );
};

export default LevyMoreOptions;
