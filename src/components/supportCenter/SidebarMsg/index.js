import {useEffect, useState} from 'react';
import {
  Box,
  Flex,
  InputGroup,
  Image,
  Input,
  InputRightElement,
  Text,
  useToast,
  VStack,
  Spinner,
} from '@chakra-ui/react';
import {SearchIcon} from '@chakra-ui/icons';
import {useQuery} from '@tanstack/react-query';
import {BsDashLg} from 'react-icons/bs';

import {fetchSupports} from '../../../apis/support_center';
import {formatTimestamp} from '../../../utils/formatDate';

import filter_icon from '/src/images/icons/filter_icon.svg';
import veerge_icon from '/src/images/brand/VEERGE-08.png';
import veerge_icon_2 from '/src/images/brand/new_veerge_logo.svg';
import pin_chat_icon from '/src/images/icons/chat_pin_icon.svg';
import placeholder_icon from '/src/images/icons/placeholder.svg';

const SidebarMsg = ({
  setSelectedClient,
  setNoChat,
  setRunQuery,
  selectedClient,
  setInputId,
  refreshTracker,
}) => {
  const toast = useToast();
  const {data, error, isError, isLoading, refetch} = useQuery(['get-supports'], fetchSupports, {
    refetchInterval: 5000,
  });

  const getSupports = data?.data;

  // to search through users
  const [search, setSearch] = useState('');

  const handleSearch = e => {
    setSearch(e.target.value);
  };

  const handleSelect = async (client, id) => {
    setInputId(`${id}`);
    setNoChat(false);
    setSelectedClient(client);
    await refetch();
    setRunQuery(true);
  };

  // useEffect(() => {
  //   refetch();
  // }, [refreshTracker, refetch]);

  return (
    <Box bg="#F5F5F5" py="17px" h="full" pb={'25px'}>
      <Flex gap={3} borderBottom="1px solid #E4E4E4" px="23px" pb="17px" alignItems="center">
        <InputGroup>
          <Input
            pr="3.5rem"
            color="#191919"
            _placeholder={{
              color: '#919191',
            }}
            background="#FFFFFF"
            placeholder="Search"
            borderRadius="xl"
            value={search}
            onChange={handleSearch}
          />
          <InputRightElement width="4.5rem">
            <SearchIcon cursor="pointer" color="#3D3D3D" />
          </InputRightElement>
        </InputGroup>

        <Image w="18px" h="18px" src={filter_icon.src} alt="sort by icon" fontSize="10px" />
      </Flex>

      <Box position="relative" overflowY="scroll" maxHeight="75vh">
        {isLoading ? (
          <VStack w="full" justify="center" align="center" h="50vh">
            <Spinner />
          </VStack>
        ) : isError ? (
          toast({
            title: 'Request failed',
            description: `An error occurred while fetching support chats`,
            status: 'error',
            duration: 3000,
            isClosable: true,
            position: 'top-right',
          })
        ) : (
          getSupports?.map((support, index) => {
            if (
              (support?.customer === null && 'Verge Support') ||
              (support?.customer?.customer_info?.first_name !== null &&
                support?.customer?.customer_info?.first_name
                  ?.toLowerCase()
                  .includes(search.toLowerCase())) ||
              (support?.customer?.customer_info?.last_name !== null &&
                support?.customer?.customer_info?.last_name
                  ?.toLowerCase()
                  .includes(search.toLowerCase()))
            )
              return (
                <Box
                  key={index}
                  bg={selectedClient?.id === support?.id ? '#ffffff' : 'transparent'}
                >
                  <Box
                    display="flex"
                    gap={3}
                    alignItems="center"
                    borderBottom="1px solid #E4E4E4"
                    pl="23px"
                    py="17px"
                    pr="10px"
                    cursor="pointer"
                    w="full"
                    onClick={() => handleSelect(support, support?.id)}
                    position="relative"
                  >
                    {support?.customer === null ? (
                      <Image
                        w="40px"
                        h="40px"
                        src={veerge_icon_2.src}
                        alt="veerge support icon"
                        fontSize="10px"
                        borderRadius={50}
                      />
                    ) : (
                      <Image
                        w="40px"
                        h="40px"
                        src={
                          support?.customer?.customer_info?.avatar === null
                            ? placeholder_icon.src
                            : support?.customer?.customer_info?.avatar
                        }
                        alt="customer pic"
                        fontSize="10px"
                        borderRadius={50}
                      />
                    )}

                    <Box display="flex" gap={1} justifyContent="space-between" w="80%">
                      <Box display="flex" flexDirection="column" w="full" flexWrap="wrap">
                        <Text
                          fontSize="18px"
                          fontWeight="600"
                          color="#191919"
                          textTransform="capitalize"
                        >
                          {support?.customer === null
                            ? `Veerge Support`
                            : `${support?.customer?.customer_info?.first_name} ${support?.customer?.customer_info?.last_name}`}
                        </Text>

                        <Text
                          noOfLines={1}
                          maxWidth="90%"
                          fontWeight={support?.read?.read === true ? '300' : '500'}
                        >
                          {support?.most_recent_message?.content}
                        </Text>
                      </Box>

                      <Box display="flex" flexDirection="column" justifyContent="flex-end">
                        <Text
                          fontSize="12px"
                          fontWeight="400"
                          color="#191919"
                          position="absolute"
                          right="3%"
                          top="2%"
                        >
                          {!support?.most_recent_message?.timestamp ? (
                            <BsDashLg />
                          ) : (
                            formatTimestamp(support?.most_recent_message?.timestamp)
                          )}
                        </Text>

                        {support?.read?.read === false ? (
                          <Box
                            bg="#191919"
                            borderRadius={50}
                            padding="2px 10px"
                            position="absolute"
                            right="3%"
                            bottom="20%"
                          >
                            <Text
                              textAlign="end"
                              color="#FFFFFF"
                              fontSize="13.33px"
                              fontWeight="600"
                            >
                              {support?.read?.count}
                            </Text>
                          </Box>
                        ) : null}
                      </Box>
                    </Box>

                    {support?.customer === null && (
                      <Image
                        w="16px"
                        h="16px"
                        src={pin_chat_icon.src}
                        alt="pin icon"
                        position="absolute"
                        zIndex={2}
                        top={1}
                        left={1}
                      />
                    )}
                  </Box>
                </Box>
              );
          })
        )}
      </Box>
    </Box>
  );
};

export default SidebarMsg;
