import {useState} from 'react';
import {Box, Text, useDisclosure} from '@chakra-ui/react';

import CustomerDrawer from '@/components/Drawers/customerDrawer';

const UserDrawerRequestData = ({row, id, children}) => {
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
      {/* <HStack spacing="10px" cursor="pointer" onClick={() => OpenCustomerModal(row?.user)}> */}
      {children ? (
        <Box as="span" cursor="pointer" onClick={() => OpenCustomerModal(id || row?.user)}>
          {children}
        </Box>
      ) : (
        <Text
          as="span"
          textTransform="capitalize"
          color="#4545FE"
          cursor="pointer"
          _hover={{textDecoration: 'underline'}}
          onClick={() => OpenCustomerModal(id || row?.customer?.id)}
        >
          {`${row?.customer.first_name} ${row?.customer.last_name} `}
        </Text>
      )}
      {/* <Image
          alt=""
          borderRadius="full"
          objectFit="cover"
          boxSize="47.29px"
          src={row?.customer?.avatar ?? avatar.src}
        />
        <Text
          maxW="156px"
          minW="98px"
          whiteSpace="break-spaces"
          as="span"
          // wordBreak="break-all"
          textTransform="capitalize"
          textAlign="start"
          color="#191919"
          fontSize="16px"
          fontWeight="400"
          _hover={{textDecoration: 'underline'}}
          cursor="pointer"
        >
          {`${row?.customer.first_name} ${row?.customer.last_name} `}
        </Text> */}
      {/* </HStack> */}

      <CustomerDrawer modalDisclosure={CustomerDetailsModal} userId={userId} runQuery={runQuery} />
    </>
  );
};

export default UserDrawerRequestData;
