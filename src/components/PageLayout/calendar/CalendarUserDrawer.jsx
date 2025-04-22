import CustomerDrawer from '@/components/Drawers/customerDrawer';
import {useDisclosure} from '@chakra-ui/react';
import {useState} from 'react';

export const CalendarUserDrawer = ({id, text}) => {
  const [runQuery, setRunQuery] = useState(false);

  const UserDetailsModal = useDisclosure();

  const open_user_drawer = () => {
    UserDetailsModal.onOpen();
    setRunQuery(true);
  };

  return (
    <>
      <CustomerDrawer modalDisclosure={UserDetailsModal} userId={id} runQuery={runQuery} />

      <span
        style={{
          color: '#B8B8FF',
          cursor: 'pointer',
          textTransform: 'capitalize'
        }}
        onClick={open_user_drawer}
      >
        {text}{' '}
      </span>
    </>
  );
};

export default CalendarUserDrawer;
