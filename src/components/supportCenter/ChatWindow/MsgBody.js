import {useEffect, useRef} from 'react';
import {Box, Icon, Image, Link, Text} from '@chakra-ui/react';
import {AiFillFile} from 'react-icons/ai';

import {formatTimestamp} from '../../../utils/formatDate';

import placeholder_icon from '/src/images/icons/placeholder.svg';
import veerge_icon from '/src/images/brand/VEERGE-08.png';
import veerge_icon_2 from '/src/images/brand/new_veerge_logo.svg';
import PlayIcon from '/src/images/icons/play-attachment.svg';

const MsgBody = ({message, loggedInUserId, admin}) => {
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({behavior: 'smooth'});
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  return (
    <Box
      ref={chatContainerRef}
      // mb="16.75px"
      maxWidth="520px"
      display="flex"
      flexDirection="column"
      align={loggedInUserId === message?.author?.id ? 'flex-end' : 'flex-start'}
      ml={loggedInUserId === message?.author?.id ? 'auto' : ''}
    >
      <Box
        display="flex"
        gap={2}
        alignSelf={loggedInUserId === message?.author?.id ? 'flex-end' : 'flex-start'}
        w="fit-content"
      >
        {loggedInUserId !== message?.author?.id && (
          <Box mt={8}>
            <Image
              w="25px"
              h="25px"
              src={
                admin
                  ? veerge_icon_2.src
                  : message?.author?.customer_info?.avatar
                    ? message?.author?.customer_info?.avatar
                    : message?.author?.avatar
                      ? message?.author?.avatar
                      : placeholder_icon.src
              }
              alt="client pic"
              fontSize="10px"
              borderRadius={50}
              objectFit="contain"
            />
          </Box>
        )}

        <Box
          display="flex"
          flexDirection="column"
          gap="6.83px"
          w="fit-content"
          alignSelf={
            loggedInUserId === message?.author?.customer_info?.user ||
            loggedInUserId === message?.author?.id
              ? 'flex-end'
              : 'flex-start'
          }
        >
          <Box
            display="flex"
            alignItems="center"
            alignSelf={
              loggedInUserId === message?.author?.customer_info?.user ||
              loggedInUserId === message?.author?.id
                ? 'flex-end'
                : 'flex-start'
            }
            gap={2}
            color="#191919"
          >
            {loggedInUserId !== message?.author?.customer_info?.user &&
              loggedInUserId !== message?.author?.id && (
                <Text fontSize="16px" fontWeight="500" textTransform={'capitalize'}>
                  {admin
                    ? 'Veerge Support'
                    : `${
                        message?.author?.customer_info?.first_name || message?.author?.first_name
                      } ${message?.author?.customer_info?.last_name || message?.author?.last_name}`}
                </Text>
              )}
            <Text fontSize="12px" fontWeight="400" lineHeight="3" whiteSpace="nowrap">
              {formatTimestamp(message?.timestamp)}
            </Text>
          </Box>

          <Box
            bg={
              loggedInUserId === message?.author?.customer_info?.user ||
              loggedInUserId === message?.author?.id
                ? '#F5F5F5'
                : loggedInUserId !== message?.author?.customer_info?.user &&
                    loggedInUserId !== message?.author?.id &&
                    message?.client_message === true
                  ? '#F3FDFA'
                  : loggedInUserId !== message?.author?.customer_info?.user &&
                      loggedInUserId !== message?.author?.id &&
                      admin
                    ? '#F3FDFA'
                    : '#F0F3F7'
            }
            alignSelf={
              loggedInUserId === message?.author?.customer_info?.user ||
              loggedInUserId === message?.author?.id
                ? 'flex-end'
                : 'flex-start'
            }
            p="8.02px"
            borderBottomRadius="6.41px"
            borderTopLeftRadius={
              loggedInUserId === message?.author?.customer_info?.user ||
              loggedInUserId === message?.author?.id
                ? '6.41px'
                : ''
            }
            borderTopRightRadius={
              loggedInUserId === message?.author?.customer_info?.user ||
              loggedInUserId === message?.author?.id
                ? ''
                : '6.41px'
            }
          >
            <Text
              fontSize="14px"
              fontWeight="300"
              flexWrap="wrap"
              maxWidth="620px"
              whiteSpace="pre-line"
            >
              {message?.content}
            </Text>

            <Box
              display="flex"
              gap={2}
              alignSelf={
                loggedInUserId === message?.author?.customer_info?.user ||
                loggedInUserId === message?.author?.id
                  ? 'flex-end'
                  : 'flex-start'
              }
            >
              {message?.attachment && (
                <Link href={message.attachment} isExternal cursor="pointer">
                  <Box
                    display="flex"
                    gap={1}
                    bg="rgba(69, 69, 254, 0.10)"
                    p="8px"
                    borderRadius="8.02px"
                    alignItems="center"
                  >
                    <Text color="#4545FE" fontSize="9.62px" fontWeight="500">
                      view attachment
                    </Text>

                    <Icon as={AiFillFile} w="15px" h="15px" color="#4545FE" />
                  </Box>
                </Link>
              )}

              {message?.image && (
                <Link href={message.image} isExternal cursor="pointer">
                  <Box
                    display="flex"
                    gap={1}
                    bg="rgba(69, 69, 254, 0.10)"
                    p="8px"
                    borderRadius="8.02px"
                    alignItems="center"
                  >
                    <Text color="#4545FE" fontSize="9.62px" fontWeight="500">
                      view attachment
                    </Text>
                    <Image w="15px" h="15px" src={PlayIcon.src} alt="attach icon" />
                  </Box>
                </Link>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
      <Box ref={messagesEndRef} />
    </Box>
  );
};

export default MsgBody;
