import {Box, HStack, Image, Stack, Text} from '@chakra-ui/react';
import UserDrawerRequestData from 'constants/request/UserDrawerRequestData';
import React from 'react';
import {Button} from 'ui-lib/ui-lib.components';
import {dateOrTimeAgo} from 'utils/formatDate';
import CheckoutButton from '../checkoutButton';
import FeedbackDrawer from '../feedbackDrawer';

export const VeergeMenuInspectionComponent = ({info, refetch, history = false}) => {
  let status = info?.tour_method?.toLowerCase();

  const tagObj = {
    'in-person': {text: 'In person'},
    video: {
      text: 'Virtual',
    },
  };

  return (
    <HStack justify="space-between" px="16px" pr="20px" w="full">
      <HStack spacing="8px">
        <Image
          src={info?.customer?.avatar ?? ''}
          fontSize="7px"
          boxSize="48px"
          objectFit="cover"
          borderRadius="full"
          bg="#f5f5f5"
          alt="customer profile picture"
        />
        <Stack spacing="3px">
          <Text
            maxW="611px"
            w="full"
            color="#475467"
            fontSize="14px"
            textAlign="start"
            fontWeight="400"
          >
            <UserDrawerRequestData row={info} id={info?.user} /> scheduled{' '}
            {tagObj[status]?.text === 'Virtual' ? 'a' : 'an'}{' '}
            <Text as="span" color="#475467">
              {tagObj[status]?.text}
            </Text>{' '}
            inspection for{' '}
            <Text as="span" fontWeight="600" color="#475467">
              {info?.project?.name || info?.project}
            </Text>{' '}
            for{' '}
            <Text as="span" fontWeight="600" color="#475467">
              {`${info?.request_time.split(' ')[1]} ${info?.request_time.split(' ')[2]} ${
                info?.request_time.split(' ')[3]
              }`}
            </Text>{' '}
            at
            <Text as="span" fontWeight="600" color="#475467">
              {' '}
              {`${info?.request_time.split(' ')[0]} ${info?.request_time.split(' ')[4]} ${info?.request_time.split(' ')[5]}`}
            </Text>
          </Text>
          <HStack spacing="8px">
            <Box boxSize="4px" borderRadius="full" bg="#D9D9D9" />

            <Text fontSize="14px" fontWeight="400" color="#475467">
              {info?.created_at ? dateOrTimeAgo(info?.created_at) : '-'}
            </Text>
          </HStack>
        </Stack>
      </HStack>
      {history ? (
        <FeedbackDrawer refetch={refetch} info={info} />
      ) : (
        <CheckoutButton REQUESTID={info?.id} refetch={refetch}>
          <Button
            mt="0"
            type="button"
            notes
            bg={'#191919'}
            color={'#ffffff'}
            fontSize={'12px'}
            fontWeight={'500'}
            minW={'65px'}
            h={'26px'}
            borderRadius={'72px'}
            _hover={{opacity: '1'}}
          >
            Check Out
          </Button>
        </CheckoutButton>
      )}
    </HStack>
  );
};
