import {ViewBroadcastContent} from '@/components/Drawers/broadcastDrawer/drawers/ViewBroadcastContent';
import {DrawerBody, HStack, Image, Stack, Text, useDisclosure, VStack} from '@chakra-ui/react';
import {useState} from 'react';
import {truncateLongText} from 'utils/truncateLongText';
import PersonIcon from '/src/images/icons/person-icon.svg';

export const EmailHistory = ({emailHistory}) => {
  const [messageData, setMessageData] = useState(arrayData?.[0]);
  const {isOpen, onOpen, onClose} = useDisclosure();
  return (
    <DrawerBody
      id="assetsWrap"
      scrollBehavior="smooth"
      p="24px 20px"
      mb="20px"
      maxH="90%"
      overflowY="auto"
    >
      <VStack gap='16px'>
        {(arrayData || [])?.map(info => {
          return (
            <Stack
              cursor="pointer"
              onClick={() => {
                onOpen();
                setMessageData(arrayData?.[0]);
              }}
              key={info}
              align="start"
              w="full"
              p='20px 12px'
              border='0.5px solid #E4E4E7'
              bg='#FBFCFC'
              gap='12px'
            >
              <HStack align="center" justify="space-between" w="full">
                <HStack align="center">
                  <Text>To:</Text>
                  <HStack>
                    <Image src={PersonIcon.src} alt={'Everyone'} />
                    <Text fontSize="14px">{info?.user}</Text>
                  </HStack>
                </HStack>
                <Text textAlign="right" whiteSpace="nowrap" fontSize="12px" fontWeight={300} color="#606060">
                  {info?.date}
                </Text>
              </HStack>
              <Text fontSize="14px" fontWeight={600}>
                {info?.title}
              </Text>
              <Text align="start" fontSize="14px" color="#606060">
                {truncateLongText(info?.content, 45).truncatedText}
              </Text>
            </Stack>
          );
        })}
        <ViewBroadcastContent
          isOpen={isOpen}
          onClose={onClose}
          messageData={messageData}
          channel={'email'}
        />
      </VStack>
    </DrawerBody>
  );
};

const arrayData = [
  {
    user: 'Daniel Tracy',
    date: 'Oct. 12, 2025 | 09:45PM',
    title: 'Maintenance Follow-up',
    content: `Hello Daniel,

This is to inform you that the maintenance request for "leaking bathroom faucet" has been successfully resolved today, May 3, 2025.

Please check and confirm everything is now in good working condition. If the issue persists or you notice anything else, don’t hesitate to reach out.

Thanks for your patience.`,
  },
  {
    user: 'Angel Smith',
    date: 'Oct. 12, 2025 | 09:45PM',
    title: 'Payment Reminder',
    content: `This is a gentle reminder that your rent payment ....`,
  },
  {
    user: 'Jane Austin',
    date: 'Oct. 12, 2025 | 09:45PM',
    title: 'Rent Payment Summary',
    content: `Please find below the rent collection summary for ...`,
  },
];
