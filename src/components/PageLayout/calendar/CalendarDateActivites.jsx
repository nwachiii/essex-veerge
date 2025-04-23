import {
  Box,
  Flex,
  Image,
  Link,
  List,
  ListIcon,
  ListItem,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react';
import {useQuery} from '@tanstack/react-query';
import {fetchCalendarEvents} from 'apis/fetchCalendarEvents';
import payment_icon from '/src/images/icons/calendar_activity_icons/Payment.svg';
import feedback_icon from '/src/images/icons/calendar_activity_icons/FeedBack.svg';
import coownership_icon from '/src/images/icons/calendar_activity_icons/Coownership.svg';
import offer_icon from '/src/images/icons/calendar_activity_icons/Offer.svg';
import signup_icon from '/src/images/icons/calendar_activity_icons/SignUpCompletion.svg';
import viewed_listing_icon from '/src/images/icons/calendar_activity_icons/ViewedListing.svg';
import inspection_icon from '/src/images/icons/calendar_activity_icons/Inspection.svg';
import empty_icon from '/src/images/icons/emptyIcon.png';
import {monthDayYear} from 'utils/formatDate';
import CalendarUserDrawer from './CalendarUserDrawer';

export const CalendarDateActivities = ({date}) => {
  const {data, isError, error, isLoading, refetch} = useQuery([date], () =>
    fetchCalendarEvents(date)
  );

  const formatted_date = `${date.split('-')[2]}-${parseInt(date.split('-')[1]).toLocaleString(
    'en-US',
    {
      minimumIntegerDigits: 2,
    }
  )}-${parseInt(date.split('-')[0]).toLocaleString('en-US', {
    minimumIntegerDigits: 2,
  })}`;

  const event_data = {
    feedback: {icon: feedback_icon.src},
    inspection: {icon: inspection_icon.src},
    inspection_request: {icon: inspection_icon.src},
    signed_in: {icon: signup_icon.src},
    sign_up: {icon: signup_icon.src},
    payment: {icon: payment_icon.src},
    deposit: {icon: payment_icon.src},
    withdrawal: {icon: payment_icon.src},
    offer: {icon: offer_icon.src},
    co_ownership: {icon: coownership_icon.src},
    viewed_listing: {icon: viewed_listing_icon.src},
    shared_listing: {icon: viewed_listing_icon.src},
    check: {icon: viewed_listing_icon.src},
    watchlist: {icon: viewed_listing_icon.src},
    default: {icon: inspection_icon.src},
  };

  const slugify = string_el => {
    return string_el ? string_el.toLowerCase().split(' ').join('_').split('-').join('_') : '';
  };

  const formatted_message = message_data => {
    try {
      if (message_data?.response && message_data.response?.length) {
        return message_data?.response?.map((message_obj, index) => {
          if (message_obj?.type === 'text') {
            return message_obj?.content || message_obj?.value || '';
          } else if (message_obj?.type === 'redirect') {
            if (message_obj.route?.includes('/residents/profile')) {
              return (
                <CalendarUserDrawer
                  key={index}
                  id={message_obj?.route?.split('userId=')[1]}
                  text={message_obj?.content || message_obj?.value || ''}
                />
              );
            } else
              return (
                <Link key={index} href={message_obj?.route} color={'#4545FE'}>
                  {message_obj?.content || message_obj?.value || ''}
                </Link>
              );
          } else {
            return message_obj?.message || '';
          }
        });
        //the below else if block is for older calendar activities,
        //could be removed from the code in the future
      } else if (
        message_data?.format &&
        message_data.format?.split(', ').find(el => el === 'message')
      ) {
        return message_data.format.split(', ').map(el => {
          if (el === 'name') {
            return (
              <CalendarUserDrawer
                key={el}
                id={message_data.customer?.id}
                text={message_data.customer?.name || ''}
              />
            );
          } else if (el === 'listing') {
            return (
              <Link
                key={el}
                href={`/listings/manage?listingId=${message_data.listing.id}`}
                color={'#B8B8FF'}
              >
                {message_data.listing?.name || ''}{' '}
              </Link>
            );
          } else if (message_data[el]?.name) {
            return (
              <Link key={el} href={`#`} color={'#B8B8FF'}>
                {message_data[el].name || ''}
                {el === 'unit' ? ', ' : ' '}
              </Link>
            );
          } else {
            return message_data[el] ? message_data[el] + ' ' : '';
          }
        });
      } else {
        return message_data?.message || null;
      }
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  if (isLoading) {
    return (
      <VStack w="full" justify="center" align="center" h="20vh">
        <Spinner />
      </VStack>
    );
  } else if (isError) {
    return (
      <VStack w="full" justify="center" spacing="14px" align="center" h="70vh">
        <Text fontSize="14px" fontWeight="400" color="white">
          Error Fetching Results
        </Text>
      </VStack>
    );
  } else if (data?.data?.data?.length === 0 || !data?.data?.data?.length) {
    return (
      <VStack w="full" justify="center" align="center" h="70vh">
        <Image src={empty_icon.src} alt="empty icon" />
        <Text fontSize={'20px'} mt="10px" color="white" fontWeight={'700'}>
          Nothing Found
        </Text>
        <Text
          w="full"
          textAlign="center"
          fontSize="13px"
          fontWeight="400"
          mt="-5px"
          mx="auto"
          color="#f5f5f5"
        >
          {Date.now() < Date.parse(formatted_date)
            ? 'No activity yet'
            : 'Nothing happened on this day'}
        </Text>
      </VStack>
    );
  } else {
    return (
      <List spacing={3} backgroundColor={'#121212'}>
        {data?.data?.data
          ?.sort((a, b) => b.time_ago - a.time_ago)
          ?.map((item, i) => (
            <ListItem
              display={'flex'}
              alignItems={'center'}
              gap={'18.47px'}
              borderBottom={'1px solid #212130'}
              padding={'12px 25px'}
              key={i}
            >
              <Image
                src={
                  event_data[slugify(item.topic)]?.icon ||
                  item.avatar ||
                  item.icon ||
                  event_data.default.icon
                }
                alt="Icon"
                width={'32px'}
                height={'32px'}
              />
              <Text fontSize={'10px'} fontWeight={'400'} flex={'1'}>
                {formatted_message(item) || item.topic || 'Something happened at this time'}
              </Text>
              <Text
                textAlign={'right'}
                alignSelf={'flex-start'}
                fontSize={'10px'}
                color={'#c7c7c7'}
              >
                {Date.parse(`${formatted_date}T${item.time.split(' ')[0]}:00.000Z`) > Date.now()
                  ? ''
                  : item.time}
              </Text>
            </ListItem>
          ))}
      </List>
    );
  }
};

export default CalendarDateActivities;
