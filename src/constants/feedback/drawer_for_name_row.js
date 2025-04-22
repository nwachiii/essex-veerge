import {useState} from 'react';
import {HStack, Stack, Image, Text, useDisclosure} from '@chakra-ui/react';

import CustomerDrawer from '@/components/Drawers/customerDrawer';
import HoverListingName from '@/components/dashboard/table/HoverListingName';
import RealtorDrawer from '@/components/Drawers/realtorDrawer';

const FeedbackNameRow = ({row}) => {
  const CustomerDetailsModal = useDisclosure();
  const AgentDetailsModal = useDisclosure();
  const [userId, setUserId] = useState();
  const [runQuery, setRunQuery] = useState(false);

  const OpenCustomerModal = item => {
    if (row?.account_type !== 'AGENT') {
      CustomerDetailsModal.onOpen();
    } else {
      AgentDetailsModal.onOpen();
    }
    setUserId(item);
    setRunQuery(true);
  };

  return (
    <>
      <HStack
        spacing="10px"
        h="131px"
        px="11.2px"
        py="18.5px"
        border="0.7px solid #E4E4E4"
        borderRight="none"
        borderLeft="none"
      >
        <HStack pl="15.7px" borderLeft="0.7px solid #E4E4E4" spacing="15.7px" pr="40px">
          <Image
            borderRadius="full"
            alt="profile image"
            // bg="#0d0d0d"
            src={row.user.avatar}
            objectFit="cover"
            boxSize="50px"
            cursor="pointer"
            onClick={() => OpenCustomerModal(row?.user?.id)}
          />
          <Stack align="start" spacing="4.19px">
            <Text
              fontSize="14px"
              textAlign="start"
              fontWeight="500"
              maxW="150px"
              whiteSpace="break-spaces"
              color="#191919"
              textTransform="capitalize"
              _hover={{textDecoration: 'underline'}}
              cursor="pointer"
              onClick={() => OpenCustomerModal(row?.user?.id)}
            >
              {row?.user?.full_name}
            </Text>

            <HoverListingName
              text={row?.user?.email}
              fontSize="12px"
              fontWeight="300"
              color="#4545FE"
              textTransform="lowercase"
            />
          </Stack>
        </HStack>
      </HStack>

      <CustomerDrawer modalDisclosure={CustomerDetailsModal} userId={userId} runQuery={runQuery} />
      <RealtorDrawer modalDisclosure={AgentDetailsModal} agentId={userId} runQuery={runQuery} />
    </>
  );
};

export default FeedbackNameRow;
