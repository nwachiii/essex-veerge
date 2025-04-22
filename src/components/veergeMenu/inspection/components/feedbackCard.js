import {Button, HStack, Heading, Image, Input, Text, VStack} from '@chakra-ui/react';
import React from 'react';
import send from '/src/images/icons/sendIconForInspectionOnListings.svg';
import {VscSend} from 'react-icons/vsc';

export const FeedbackCard = ({
  formatText,
  expand,
  info,
  handleChange,
  handleSubmit,
  mutation,
  isValid,
  text,
}) => {
  return (
    <VStack bg="#F5F5F5" borderRadius="8px" py="12px" px="16px" spacing="none">
      {/* <Heading as="h2" fontSize="13px" alignSelf="start" mb="12px" fontWeight="500">
        Feedback
      </Heading> */}

      <VStack w="full">
        <Text fontSize="14px" fontWeight="300" w="full" color="#191919">
          {expand === info?.customer?.id
            ? formatText(info?.user_feedback ?? '')
            : formatText(info?.user_feedback ?? '').length <= 30
              ? formatText(info?.user_feedback ?? '')
              : formatText(info?.user_feedback ?? '').slice(
                  0,
                  -(formatText(info?.user_feedback ?? '').length - 30)
                )}

          <Text
            fontSize="14px"
            fontWeight="500"
            as="span"
            color="#4545FE"
            cursor="pointer"
            onClick={() =>
              formatText(info?.user_feedback ?? '').length <= 30
                ? null
                : setExpand(expand === info?.customer?.id ? '' : info?.customer?.id)
            }
          >
            {formatText(info?.user_feedback ?? '').length <= 30
              ? ''
              : expand === info?.customer?.id
                ? ' ...See less'
                : '...See more'}
          </Text>
        </Text>
      </VStack>
      {!info?.response ? (
        <HStack
          as="form"
          onSubmit={handleSubmit}
          mt="16px"
          spacing="8.7px"
          w="full"
          alignItems={`stretch`}
        >
          <Input
            borderRadius="4px"
            bg="#F5F5F5"
            w="full"
            value={text}
            fontSize="12px"
            fontWeight="400"
            onChange={handleChange}
            color="#000"
            placeholder="Type in your message..."
            _placeholder={{
              color: '#606060',
            }}
            border={`0.8px solid #E4E4E4`}
          />
          <Button
            bg="transparent"
            isLoading={mutation.isLoading}
            type="submit"
            _focus={{opacity: '1', bg: 'transparent'}}
            _active={{opacity: '1', bg: 'transparent'}}
            _hover={{
              bg: 'transparent',
            }}
            isDisabled={!isValid}
            fontSize={`18px`}
            border={`0.8px solid #E4E4E4`}
            p={`8px`}
          >
            {/* <Image h="47px" w="58px" src={send.src} alt="send Icon" /> */}
            <VscSend />
          </Button>
        </HStack>
      ) : null}
    </VStack>
  );
};

export default FeedbackCard;
