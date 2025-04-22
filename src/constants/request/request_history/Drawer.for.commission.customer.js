import {useState} from 'react';
import {Text, useDisclosure} from '@chakra-ui/react';

import CustomerDrawer from '@/components/Drawers/customerDrawer';

const CommissionCustomerDrawer = ({row}) => {
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
      <Text
        maxW="164px"
        whiteSpace="break-spaces"
        textTransform="capitalize"
        textAlign="start"
        fontSize="16px"
        fontWeight="400"
        _hover={{textDecoration: 'underline'}}
        cursor="pointer"
        onClick={() => OpenCustomerModal(row?.customer?.user?.id)}
      >
        {`${row.customer.user.first_name} ${row.customer.user.last_name}`}
      </Text>

      <CustomerDrawer modalDisclosure={CustomerDetailsModal} userId={userId} runQuery={runQuery} />
    </>
  );
};

export default CommissionCustomerDrawer;
