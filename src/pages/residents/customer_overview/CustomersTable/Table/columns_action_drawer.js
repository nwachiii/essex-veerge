import {useState} from 'react';
import {Button, useDisclosure} from '@chakra-ui/react';
import CustomerDrawer from '../../../../../components/Drawers/customerDrawer';
import { useRouter } from 'next/router';

const ColumnsActionCustomerDrawer = ({row}) => {
  const CustomerDetailsModal = useDisclosure();
  const [userId, setUserId] = useState();
  const router = useRouter()
  const [runQuery, setRunQuery] = useState(false);

  const OpenCustomerModal = item => {
    CustomerDetailsModal.onOpen();
    setUserId(item);
    setRunQuery(true);
  };

  return (
    <>
      <Button
        borderRadius="72px"
        w="115px"
        h="40px"
        color={'#000000'}
        borderColor={'#E4E4E7'}
        variant="outline"
        fontWeight="500"
        onClick={() => router.push(`/residents/profile/?userId=${row?.response?.id}`)}
      >
        View
      </Button>

      <CustomerDrawer modalDisclosure={CustomerDetailsModal} userId={userId} runQuery={runQuery} />
    </>
  );
};

export default ColumnsActionCustomerDrawer;
