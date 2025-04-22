import React from 'react';
import {VStack, Image, Text, Box, Spinner, Stack} from '@chakra-ui/react';

import emptyIcon from '/src/images/icons/emptyIcon.png';

const EmptyState = () => {
  return (
    <VStack spacing="none" mx="auto" w="full" h="full" py="15px" mt="60px">
      <Image alt="empty table icon" src={emptyIcon.src} />
      <Text fontSize={'20px'} mt="16px" color="#3D3D3D" fontWeight={'700'}>
        Nothing Found
      </Text>
      <Text
        w="full"
        textAlign="center"
        fontSize="14px"
        fontWeight="400"
        mx="auto"
        color="#919191"
        mt="12px"
      >
        No property has been sold yet.
      </Text>
    </VStack>
  );
};

const Property = ({data}) => {
  const agentProperty = data?.data

  return (
    <>
      {agentProperty?.listings?.length === 0 ? (
        <EmptyState />
      ) : (
        <Box display="flex" flexDirection="column" gap="14px" alignItems="center">
          <Box
            display="flex"
            flexDirection="row"
            gap="24px"
            justifyContent="space-between"
            width="full"
          >
            <Box
              bgColor="#ffffff"
              boxShadow="0px 4px 8px rgba(0, 0, 0, 0.02)"
              borderRadius="12px"
              border="0.50px solid #E4E4E4"
              p="16px"
              width="full"
              display="flex"
              flexDirection="column"
              gap="8px"
              alignItems="center"
              justifyContent="center"
            >
              <Text>{agentProperty?.number_of_units_sold}</Text>
              <Text>
                {Number(agentProperty?.number_of_units_sold) < 2 ? 'Unit sold' : 'Units sold'}
              </Text>
            </Box>
            <Box
              bgColor="#ffffff"
              boxShadow="0px 4px 8px rgba(0, 0, 0, 0.02)"
              borderRadius="12px"
              border="0.50px solid #E4E4E4"
              p="16px"
              width="full"
              display="flex"
              flexDirection="column"
              gap="8px"
              alignItems="center"
              justifyContent="center"
            >
              <Text>{agentProperty?.customers}</Text>
              <Text>{Number(agentProperty?.customers < 2) ? 'Subscriber' : 'Subscribers'}</Text>
            </Box>
          </Box>

          {agentProperty?.listings && <Box
            py="16px"
            bgColor="#ffffff"
            boxShadow="0px 4px 8px rgba(0, 0, 0, 0.02)"
            borderRadius="12px"
            border="0.50px solid #E4E4E4"
            width="full"
            display="flex"
            flexDirection="column"
            gap="5px"
          >
            {agentProperty?.listings?.map((single, index) => (
              <Box
                key={index}
                display="flex"
                flexDirection="row"
                alignItems="center"
                gap="12px"
                borderBottom="0.50px #E4E4E4 solid"
                px="10.47px"
                pb="10px"
              >
                <Image
                  src={single?.listing_img}
                  alt="ppty img"
                  w="43px"
                  h="43px"
                  alignSelf="center"
                  borderRadius="2.74px"
                />
                <Box display="flex" flexDirection="column" gap="8px">
                  <Text color="#0D0D0D" fontSize="12.77px" fontWeight={'400'}>
                    {single?.listing_name}
                  </Text>
                  <Box display="flex" flexDirection="row" alignItems="center" gap="4px">
                    <Image
                      src={single?.img}
                      alt="img"
                      w="20px"
                      h="20px"
                      borderRadius={50}
                      alignSelf="center"
                    />
                    <Text
                      textTransform="capitalize"
                      color="#191919"
                      fontSize="10.95px"
                      fontWeight={'500'}
                    >
                      {single?.owner_name}
                    </Text>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>}
        </Box>
      )}
    </>
  );
};

export default Property;
