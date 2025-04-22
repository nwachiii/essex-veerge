import {HStack, Heading, Image, Text, VStack} from '@chakra-ui/react';
import React from 'react';
import {changeDateFormat} from 'utils/formatDate';

export const ResponseCard = ({formatText, expand, info, setExpand}) => {
  return info?.response ? (
    <VStack bg="#F5F5F5" borderRadius="8px" py="12px" px="16px" spacing="none">
      <HStack justify="space-between" align="start" w="full">
        <Heading as="h2" fontSize="13px" alignSelf="start" mb="12px" fontWeight="500">
          Response
        </Heading>
        <Text fontSize="10px" fontWeight={400} color="#606060" minW="fit-content">
          {info?.response_time ? changeDateFormat(info?.response_time, 'add_time') : ''}
        </Text>
      </HStack>
      <HStack pr="5px" w="full" justify="space-between">
        <HStack w="full" spacing="6px">
          <Image
            boxSize="32px"
            borderRadius="full"
            alt="notes profile picture"
            src={info?.respondent?.avatar ?? avatar.src}
          />
          <Heading fontSize="13.067px" fontWeight={500} as="h2">
            {`${info?.respondent?.first_name ?? '-'} ${info?.respondent?.last_name ?? '-'}`}
          </Heading>
        </HStack>
      </HStack>
      <VStack mt="12px" w="full">
        <Text fontSize="14px" fontWeight="300" w="full" color="#191919">
          {expand === info?.id
            ? (formatText = {formatText}(info?.response ?? ''))
            : formatText(info?.response ?? '').length <= 30
            ? formatText(info?.response ?? '')
            : formatText(info?.response ?? '').slice(
                0,
                -(formatText(info?.response ?? '').length - 30)
              )}

          <Text
            fontSize="14px"
            fontWeight="500"
            as="span"
            color="#4545FE"
            cursor="pointer"
            onClick={() =>
              formatText(info?.response ?? '').length <= 30
                ? null
                : setExpand(expand === info?.id ? '' : info?.id)
            }
          >
            {formatText(info?.response ?? '').length <= 30
              ? ''
              : expand === info?.id
              ? ' ...See less'
              : '...See more'}
          </Text>
        </Text>
      </VStack>
    </VStack>
  ) : null;
};

export default ResponseCard;
