import {useState} from 'react';
import {Avatar, Flex, HStack, Image, Stack, Text, useDisclosure} from '@chakra-ui/react';

import CustomerDrawer from '../../../../../components/Drawers/customerDrawer';

import avatarFallback from '/src/images/avatar.svg';
import verifiedIcon from '/src/images/icons/verifiedIcon.svg';
import {truncateLongText} from 'utils/truncateLongText';

const ColumnsCustomerDrawer = ({row, user}) => {
  const CustomerDetailsModal = useDisclosure();
  const [userId, setUserId] = useState();
  const [runQuery, setRunQuery] = useState(false);

  const OpenCustomerModal = item => {
    CustomerDetailsModal.onOpen();
    setUserId(item);
    setRunQuery(true);
  };

  const userObject = row?.response || user;
  return (
    <>
      <HStack
        textAlign={'left'}
        spacing="11px"
        cursor="pointer"
        onClick={() => OpenCustomerModal(userObject?.id)}
        maxW={`250px`}
        minW="150px"
      >
        <Avatar
          alt="customer image"
          borderRadius="full"
          height="48px"
          width="48px"
          aspectRatio="1"
          objectFit="cover"
          name={`${userObject?.name}`}
          src={userObject?.img || userObject?.img?.[0]}
        />
        <Stack>
          <Flex flex={`1`} align="center" gap="8px">
            <Text
              pr="7px"
              fontSize="14px"
              wordWrap={'break-word'}
              overflowWrap={`break-word`}
              whiteSpace="break-spaces"
              wordBreak="break-word"
              textTransform="capitalize"
              _hover={{textDecoration: 'underline'}}
            >
              {userObject?.name}
            </Text>
            {userObject?.status ? (
              <Image src={verifiedIcon.src} alt="verified icon" boxSize="18px" />
            ) : null}
          </Flex>
          <Text cursor={'pointer'} color={'#4545FE'} textAlign={'left'} fontSize={'14px'}>
            <a href={`mailto:${row?.response?.email}`}>
              {' '}
              {truncateLongText(row?.response?.email, 29).truncatedText}{' '}
            </a>
          </Text>
        </Stack>
      </HStack>

      <CustomerDrawer modalDisclosure={CustomerDetailsModal} userId={userId} runQuery={runQuery} />
    </>
  );
};

export default ColumnsCustomerDrawer;
