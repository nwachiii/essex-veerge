import {
  Flex,
  HStack,
  Heading,
  Image,
  Link,
  Stack,
  StackDivider,
  Text,
  VStack,
} from '@chakra-ui/react';
import signedinIcon from '/src/images/icons/activity_login.svg';
import offerIcon from '/src/images/icons/activity_offerIcon.svg';
import shareIcon from '/src/images/icons/activity_shareIcon.svg';
import paymentIcon from '/src/images/icons/activity_paymentIcon.svg';
import projectIcon from '/src/images/icons/activity_projectIcon.svg';
import co_ownerIcon from '/src/images/icons/activity_coownerIcon.svg';
import feedbackIcon from '/src/images/icons/activity_feedbackIcon.svg';
import watchlistIcon from '/src/images/icons/activity_watchlistIcon.svg';
import inspectionIcon from '/src/images/icons/activity_inspectionIcon.svg';
import React, {useState} from 'react';
import ActivityUserDrawer from './ActivityUserDrawer';

export const ActivityComponent = ({item, idx, USER_ID, user_drawer = true}) => {
  const limit = 10;
  const [page, setPage] = useState(1);

  const activityIcons = {
    share: shareIcon.src,
    project: projectIcon.src,
    offer: offerIcon.src,
    feedback: feedbackIcon.src,
    payment: paymentIcon.src,
    watchlist: watchlistIcon.src,
    inspection: inspectionIcon.src,
    co_ownership: co_ownerIcon.src,
    signed_in: signedinIcon.src,
    sign_up: signedinIcon.src,
  };

  const formatMessage = messageData => {
    if (!messageData?.response?.length) return messageData?.message || null;
    return messageData.response.map((messageObj, index) => {
      const {type, content, value, route} = messageObj;

      if (type === 'text') return content || value || '';
      if (type === 'redirect') {
        const userId = messageData.customer2
          ? messageData.customer2[0]?.id
          : route?.split('userId=')[1];
        const text = content || value || '';

        if (route.includes('/users/profile')) {
          if (user_drawer) {
            return <ActivityUserDrawer key={index} id={userId} text={text} />;
          } else {
            return text;
          }
        }

        return (
          <Link key={index} href={route} color={'#4545FE'}>
            {text}
          </Link>
        );
      }

      return messageObj.message || '';
    });
  };

  console.log(item);
  return (
    <Stack key={item.day} w="full" spacing="12px" align="start">
      <Heading ml="29px" as="h2" fontSize="16px" fontWeight="500">
        {item.day}
      </Heading>
      <Stack w="full" divider={<StackDivider borderColor="#F5F5F5" my="0px" />} spacing="none">
        {item.info.slice(0, limit * page).map((info, index) => (
          <HStack
            bg="#FBFCFC"
            pt={index === 0 ? '10px' : '17px'}
            pb="18px"
            pl="29.2px"
            pr="12px"
            justify="space-between"
            w="full"
            key={index}
          >
            <HStack w="full" spacing="23px">
              <Flex justify="center" align="center" boxSize="36px">
                <Image
                  alt="icon"
                  objectFit="contain"
                  alignSelf="center"
                  src={
                    activityIcons[
                      info.topic?.toLowerCase()?.split(' ')?.join('_')?.split(`-`)?.join('_')
                    ] ||
                    info.avatar ||
                    info.icon
                  }
                />
              </Flex>
              <VStack w="full" align="flex-start" spacing="4px">
                <Text fontSize="12px" w="full" fontWeight="400" color="#191919" flex={'1'}>
                  {formatMessage(info) || info.topic || 'Something happened at this time'}
                </Text>
              </VStack>
            </HStack>
            <Text
              fontSize="12px"
              whiteSpace="nowrap"
              alignSelf="start"
              fontWeight="400"
              minW="51px"
              color="#606060"
            >
              {info.time?.replace(' ', '')}
            </Text>
          </HStack>
        ))}
      </Stack>
      {item.info.length > page * limit && (
        <Flex
          padding={'10px'}
          align={'center'}
          justify={'center'}
          cursor={'pointer'}
          width={'100%'}
          onClick={() => setPage(page + 1)}
        >
          <Text fontSize={'12px'} color={'#a2a2a2'} fontWeight={'500'}>
            View More
          </Text>
        </Flex>
      )}
    </Stack>
  );
};

export default ActivityComponent;
