import {useState} from 'react';
import {HStack, Image, Text, useDisclosure} from '@chakra-ui/react';

import CustomerDrawer from '@/components/Drawers/customerDrawer';

const InspectionNameRow = ({row}) => {
  const CustomerDetailsModal = useDisclosure();
  const [userId, setUserId] = useState();
  const [runQuery, setRunQuery] = useState(false);

  const OpenCustomerModal = item => {
    CustomerDetailsModal.onOpen();
    setUserId(item);
    setRunQuery(true);
  };

  return (
    <>
      <HStack
        spacing="20px"
        justify="start"
        cursor="pointer"
        onClick={() => OpenCustomerModal(row?.user)}
      >
        <Image
          alt="avatar"
          borderRadius="full"
          objectFit="cover"
          aspectRatio="1"
          boxSize="48px"
          src={row?.customer?.avatar ?? ''}
        />
        <Text
          maxW="256px"
          minW="98px"
          whiteSpace="break-spaces"
          as="span"
          // wordBreak="break-all"
          textAlign="start"
          color="#191919"
          fontSize="16px"
          fontWeight="400"
          textTransform="capitalize"
          _hover={{textDecoration: 'underline'}}
        >
          {`${row?.customer?.first_name ?? '-'} ${row?.customer?.last_name ?? '-'} `}
        </Text>
      </HStack>

      <CustomerDrawer modalDisclosure={CustomerDetailsModal} userId={userId} runQuery={runQuery} />
    </>
  );
};

export default InspectionNameRow;
