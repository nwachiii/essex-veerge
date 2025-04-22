import React from 'react';
import {themeStyles} from '../../../../theme';
import emptyIcon from '/src/images/icons/emptyIcon.png';
import femaleAvatar from '../.../../../../../images/avatar.svg';
import {Box, HStack, Image, Stack, Text, VStack} from '@chakra-ui/react';

export const CustomerReferrals = ({refData}) => {
  // console.log('refData', refData);
  return (
    <Stack pt="50px">
      <Text fontSize={'18px'} color={'#3D3D3D'} fontWeight={400}>
        {refData?.type == 'created' ? 'Created by' : 'Referred by'}
      </Text>
      <Box
        {...themeStyles.boxStyles}
        w="full"
        minW="271px"
        minH="65px"
        h="fit-content"
        boxShadow="sm"
        border="1px solid #F3F3F3"
      >
        {refData ? (
          <HStack spacing="14px" p="16px 25px" align="center" h="full">
            <Image
              alt=""
              boxSize="38px"
              src={refData?.avatar ?? femaleAvatar.src}
              w="fit-content"
              maxW="40px"
              borderRadius="full"
            />
            <VStack>
              <Text fontWeight="500" fontSize="20px" lineHeight="25px" color="#191919">
                {refData?.name}
              </Text>
            </VStack>
          </HStack>
        ) : (
          <VStack spacing={4} justify="center" h="full">
            <Image alt="" src={emptyIcon.src} />
            <Text fontSize="14px">No referral</Text>
          </VStack>
        )}
      </Box>
    </Stack>
  );
};
