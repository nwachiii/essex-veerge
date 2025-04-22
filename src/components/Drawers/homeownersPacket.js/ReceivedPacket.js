import {
  AbsoluteCenter,
  DrawerBody,
  HStack,
  Image,
  Spinner,
  Stack,
  StackDivider,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import emptyIcon from '/src/images/icons/emptyIcon.svg';

import warning_icon from '/src/images/icons/warning-alert.svg';
import packetDocIcon from '/src/images/icons/homeOwnerpackDocIcon.svg';
import {changeDateFormat} from '../../../utils/formatDate';
import rightArrow from '/src/images/icons/homePacketRightArrowIcon.svg';

export const ReceivedPacket = ({HOME__OWNERS__PACKETS}) => {
  const customScrollbarStyles = {
    '&::-webkit-scrollbar': {
      width: '4px',
      borderRadius: '16px',
    },
    '&::-webkit-scrollbar-track': {
      borderRadius: '16px',
      WebkitBoxShadow: 'inset 0 0 6px rgba(25, 25, 25, 0.6)',
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '16px',
      backgroundColor: '#d0d0d0',
      // outline: "1px solid slategrey", // You can include this line if needed
    },
  };

  return (
    <>
      {HOME__OWNERS__PACKETS?.isLoading ? (
        <AbsoluteCenter>
          <Spinner color="#191919" />
        </AbsoluteCenter>
      ) : HOME__OWNERS__PACKETS?.isError ? (
        <AbsoluteCenter w="full">
          <Stack mb="40px" align="center" spacing={'14px'} direction={'column'} w="full" h="full">
            <Image boxSize="68px" src={warning_icon.src} alt=" warning icon" />
            <Text fontWeight="600" fontSize="28px" lineHeight="36px" color="rgba(25, 25, 25, 0.6)">
              {`No Documents found`}
            </Text>
            <Text
              px="10px"
              textAlign="center"
              fontWeight="400"
              fontSize="16px"
              lineHeight="20px"
              color="#d0d0d0"
            >
              {`An error occurred while retrieving the document.`}
            </Text>
          </Stack>
        </AbsoluteCenter>
      ) : HOME__OWNERS__PACKETS?.data?.data?.received?.length ? (
        <Stack
          spacing="0px"
          overflow="auto"
          sx={customScrollbarStyles}
          h="full"
          divider={<StackDivider borderColor="#E4E4E4" />}
        >
          {
            //   HOME__OWNERS__PACKETS?.data?.data?.data
            HOME__OWNERS__PACKETS?.data?.data?.received?.map((item, index) => (
              <HStack
                key={index}
                h="91px"
                w="full"
                justify="space-between"
                pl="18px"
                //   border="1px solid #282828"

                pr="30px"
                py="28.88px"
                pb="20.85px"
              >
                <HStack spacing="10px">
                  <Image boxSize="38.5px" src={packetDocIcon.src} alt="packectDoc icon" />

                  <Stack
                    w="full"
                    color="#191919"
                    borderRadius={'8px'}
                    spacing="0px"
                    justify={'start'}
                    align="start"
                  >
                    <Text
                      fontSize={'14.429px'}
                      color="#191919"
                      textTransform="capitalize"
                      textAlign="leftt"
                      whiteSpace="normal"
                      fontWeight={500}
                    >
                      {item?.packet_name ? item?.packet_name : 'Document'}
                    </Text>
                    <Text color="#191919" textAlign="start" fontSize="11.22px" fontWeight="400">
                      Uploaded: {item?.added_at ? changeDateFormat(item?.added_at) : '-'}
                    </Text>
                  </Stack>
                </HStack>
                <HStack
                  cursor="pointer"
                  onClick={() => window.open(`${item?.packet ? item?.packet : ''}`, '_blank')}
                  spacing="4px"
                >
                  <Text color="#191919" fontSize="14.429px" fontWeight="500">
                    View
                  </Text>
                  <Image src={rightArrow.src} alt="right  arrow" />
                </HStack>
              </HStack>
            ))
          }
        </Stack>
      ) : (
        <AbsoluteCenter w="full">
          <Stack mb="40px" align="center" spacing={'14px'} direction={'column'} w="full" h="full">
            <Image boxSize="58px" src={emptyIcon.src} alt="" />
            <Text fontWeight="600" fontSize="18px" lineHeight="36px" color="#191919">
              {`Nothing found`}
            </Text>
            <Text
              px="10px"
              textAlign="center"
              fontWeight="400"
              fontSize="14px"
              lineHeight="20px"
              color="rgba(25, 25, 25, 0.6)"
            >
              {`It appears no document has been uploaded. Kindly notify the subscriber to upload a signed copy.`}
            </Text>
          </Stack>
        </AbsoluteCenter>
      )}
    </>
  );
};

export default ReceivedPacket;
