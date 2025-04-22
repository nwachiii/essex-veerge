import {useQuery} from '@tanstack/react-query';
import React from 'react';
import {fetchCustomerEquityPackets} from '../../../../../apis/customers';
import {useRouter} from 'next/router';
import {Flex, HStack, Image, Text, useDisclosure, useToast} from '@chakra-ui/react';
import view_packet_icon from '/src/images/icons/view_packeet.svg';
import {Popup} from '../../../../../ui-lib';
import {FaRegLightbulb} from 'react-icons/fa';
import {themeStyles} from '../../../../../theme';

export const ViewHomeOwnerPackets = ({id}) => {
  const router = useRouter();
  const VIEW_PACKETS_MODAL = useDisclosure();

  const GET_HOME_OWNER_PACKETS = useQuery(['fetch-home-owner-packets', id], () =>
    fetchCustomerEquityPackets(id)
  );
  return (
    <div>
      <HStack p="1.2em" spacing="20px" onClick={VIEW_PACKETS_MODAL.onOpen}>
        <Image alt="" w="20px" h="23px" src={view_packet_icon.src} />

        <Text color="#191919" fontSize="16px" fontWeight={500}>
          {`View home owner's packet`}
        </Text>
      </HStack>
      <Popup
        hideCloseBtn
        overflowY="auto"
        size="full"
        minH="392px"
        mt="16vh"
        minW={{base: '90%', md: '344px'}}
        color="#191919"
        isOpen={VIEW_PACKETS_MODAL.isOpen}
        onClose={VIEW_PACKETS_MODAL.onClose}
      >
        <HStack w="full" justify={'space-between'}>
          <Text fontSize="24px" fontWeight={600}>
            View Packets
          </Text>
          <Flex
            align={'center'}
            justifyContent={'flex-end'}
            display={'flex'}
            gap="2px"
            mt="5px"
            cursor="pointer"
            fontSize={'16px'}
            color="#4545FE"
          >
            <FaRegLightbulb
              fontSize={'18px'}
              fontWeight={'800'}
              color={themeStyles.color.matador__primary}
            />
            <Text>
              <small>Need clarity?</small>
            </Text>
          </Flex>
        </HStack>
        <Popup.Body h="auto">
          <Text>No packets found...</Text>
        </Popup.Body>
      </Popup>
    </div>
  );
};

export default ViewHomeOwnerPackets;
