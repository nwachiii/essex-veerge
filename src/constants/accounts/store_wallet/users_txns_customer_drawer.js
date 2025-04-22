import {useState} from 'react';
import {Box, Center, HStack, Image, Text, useDisclosure} from '@chakra-ui/react';

import CustomerDrawer from '../../../components/Drawers/customerDrawer';

import defaultImage from '/src/images/image-fallback.png';
import avatarFallback from '/src/images/avatar.svg';

const UserWalletCustomerDrawer = ({user, row, prop_user_id, children}) => {
  const CustomerDetailsModal = useDisclosure();
  const [userId, setUserId] = useState();
  const [runQuery, setRunQuery] = useState(false);

  const OpenCustomerModal = item => {
    CustomerDetailsModal.onOpen();
    setUserId(item);
    // setRunQuery(true);
  };

  return (
    <>
      {children ? (
        <Box
          as="span"
          onClick={() => {
            CustomerDetailsModal.onOpen();
            if (user) {
              setUserId(user?.id);
            }
          }}
          cursor={'pointer'}
        >
          {children}
        </Box>
      ) : (
        <HStack
          textAlign={'left'}
          spacing="11px"
          cursor="pointer"
          onClick={() => OpenCustomerModal(user?.customer_info?.user || user?.id)}
        >
          <Center w="48px" h="48px" borderRadius={'50%'} overflow={'hidden'} position={'relative'}>
            <Image
              alt="Profile Photo"
              minH={'100%'}
              minW={'100%'}
              objectFit={'cover'}
              src={user?.customer_info?.avatar || row?.owner?.avatar || avatarFallback.src}
            />
          </Center>
          <Text
            pr="2px"
            fontSize={'14px'}
            textTransform="capitalize"
            _hover={{textDecoration: 'underline'}}
            cursor="pointer"
          >
            {`${user?.customer_info?.first_name || user?.first_name} ${
              user?.customer_info?.last_name || user?.last_name
            }`}
          </Text>
        </HStack>
      )}

      <CustomerDrawer
        userId={userId || prop_user_id}
        modalDisclosure={CustomerDetailsModal}
        runQuery={CustomerDetailsModal.isOpen}
      />
    </>
  );
};

export default UserWalletCustomerDrawer;
