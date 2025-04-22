import {useState} from 'react';
import {HStack, Image, Text, useDisclosure} from '@chakra-ui/react';

import CustomerDrawer from '@/components/Drawers/customerDrawer';

const HistoryDrawerClosed = ({row}) => {
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
      {/* <HStack spacing="10px" cursor="pointer" onClick={() => OpenCustomerModal(row?.user)}>
        <Image
          alt="avatar"
          borderRadius="full"
          objectFit="cover"
          boxSize="47.29px"
          src={row?.customer?.avatar ?? femaleImg.src}
        />
        <Text
          maxW="156px"
          w="fit-content"
          whiteSpace="break-spaces"
          textTransform="capitalize"
          as="span"
          // wordBreak="break-all"
          textAlign="start"
          color="#191919"
          fontSize="16px"
          fontWeight="400"
          _hover={{textDecoration: 'underline'}}
          cursor="pointer"
        >
          {`${row?.customer.first_name} ${row?.customer.last_name}`}
        </Text>
      </HStack> */}
      <Text
        as="span"
        textTransform="capitalize"
        color="#4545FE"
        cursor="pointer"
        onClick={() => OpenCustomerModal(row?.customer?.id)}
        _hover={{textDecoration: 'underline'}}
      >
        {`${row?.customer.first_name} ${row?.customer.last_name}`}
        {"'s"}
      </Text>

      <CustomerDrawer modalDisclosure={CustomerDetailsModal} userId={userId} runQuery={runQuery} />
    </>
  );
};

export default HistoryDrawerClosed;
