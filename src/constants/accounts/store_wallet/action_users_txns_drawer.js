import {useState} from 'react';
import {Button, useDisclosure} from '@chakra-ui/react';

import CustomerDrawer from '../../../components/Drawers/customerDrawer';
import {themeStyles} from 'theme';

const UserActionCustomerDrawer = ({row}) => {
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
      {row?.owner?.id ? (
        <Button
          borderRadius="72px"
          w="115px"
          h="40px"
          color={themeStyles.color.primary}
          fontWeight={'400'}
          fontSize="16px"
          borderColor={themeStyles.color.primary}
          variant="outline"
          onClick={() => OpenCustomerModal(row?.owner?.id)}
        >
          View
        </Button>
      ) : null}

      <CustomerDrawer modalDisclosure={CustomerDetailsModal} userId={userId} runQuery={runQuery} />
    </>
  );
};

export default UserActionCustomerDrawer;
