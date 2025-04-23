import {
  Box,
  Image,
  Stack,
  Text,
  Icon,
  Button,
  useDisclosure,
  HStack,
  Link,
  Center,
} from '@chakra-ui/react';
import {useState} from 'react';
import {BsDashLg} from 'react-icons/bs';
import {IoIosArrowDown} from 'react-icons/io';

import RealtorDrawer from '../realtorDrawer';

import CallIcon from '/src/images/icons/call-icon-blue.svg';
import avatarFallback from '/src/images/avatar.svg';
import expand from '/src/images/icons/expand_icon.svg';
import {CreateToast} from 'ui-lib';
import HoverForPopUp from 'utils/HoverForPopUp';
import {truncateLongText} from 'utils';

const ContactCard = ({data, userId}) => {
  const agentsDrawer = useDisclosure();
  const [agentId, setAgentId] = useState();
  const [runQuery, setRunQuery] = useState(false);
  const referralDisclosure = useDisclosure();

  const toast = CreateToast();
  const placeACall = () => {
    toast('You are currently ineligible for this feature', {
      position: 'fixed',
      top: '10vh',
      right: '2vw',
    });
  };
  const OpenAgentModal = item => {
    agentsDrawer.onOpen();
    setAgentId(item);
    setRunQuery(true);
  };

  const handleReferralPopUpOpen = () => {
    const shouldHover = data?.data?.referred_by.type === 'Others';
    if (shouldHover) {
      return referralDisclosure.onOpen();
    }
  };
  const handleReferralPopUpClose = () => {
    referralDisclosure.onClose();
  };

  // console.log(data?.data?.referred_by);
  const isAconsultant = data?.data?.referred_by.type === 'agent' && !data?.data?.referred_by.id;
  const referreeName = `${isAconsultant ? `${data?.data?.referred_by?.info} (consultant)` : data?.data?.referred_by?.name}`;
  return (
    <Box
      bgColor="#ffffff"
      p="15.28px"
      boxShadow="0px 4px 8px rgba(0, 0, 0, 0.02)"
      borderRadius="12px"
      border="0.50px solid #E4E4E4"
      display="flex"
      flexDirection="column"
      gap="10px"
    >
      <Box display="flex" flexDirection="column" gap="15.28px" width="full">
        <Stack
          display="flex"
          flexDirection="column"
          gap="16.24px"
          alignContent="center"
          justifyContent="center"
          mx="auto"
        >
          <Center w="full">
            <Center
              position={'relative'}
              w="118px"
              h={'118px'}
              borderRadius={'50%'}
              overflow={'hidden'}
            >
              <Image
                src={data?.data?.user_info?.avatar ?? avatarFallback.src}
                alt="user img"
                fill
                objectFit={'cover'}
                minH={'118px'}
                minW={'118px'}
              />
            </Center>
          </Center>
          <Text
            color="#191919"
            fontSize="28px"
            fontWeight="600"
            alignItems="center"
            textTransform="capitalize"
            textAlign="center"
          >{`${data?.data?.user_info?.first_name} ${data?.data?.user_info?.last_name}`}</Text>
        </Stack>

        <Box display="flex" flexDirection="column" width="full" gap="13.37px">
          <Stack
            borderBottom="1px solid #F5F5F5"
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            width="full"
            pb="13.37px"
            wordBreak="break-word"
            fontSize="14px"
          >
            <Text color="#191919" fontWeight={'400'}>
              Phone
            </Text>
            <Stack display="flex" flexDirection="column">
              <Stack display="flex" flexDirection="row" color="#191919" alignItems="center">
                <Text fontWeight={'600'}>{data?.data?.user_info?.phone ?? <BsDashLg />}</Text>
                {/* <Icon as={IoIosArrowDown} w="15px" h="15px" /> */}
              </Stack>

              <Stack
                display="flex"
                px="7.64px"
                py="2px"
                cursor="pointer"
                flexDirection="row"
                alignItems="center"
                alignSelf="flex-end"
                onClick={placeACall}
                borderRadius="45.85px"
                justifyContent="center"
                bg="rgba(69, 69, 254, 0.10)"
              >
                <Image w="15px" h="15px" src={CallIcon.src} alt="call icon" objectFit="contain" />
                <Text color="#4545FE" fontSize="11.46px" fontWeight={'500'} textAlign="center">
                  Call now
                </Text>
              </Stack>
            </Stack>
          </Stack>

          <Stack
            borderBottom="1px solid #F5F5F5"
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            width="full"
            pb="13.37px"
            wordBreak="break-word"
            fontSize="14px"
          >
            <Text color="#191919" fontWeight={'400'}>
              Email
            </Text>
            <Link
              href={data?.data?.user_info?.email ? `mailto:${data?.data?.user_info?.email}` : null}
            >
              <Text color="#4545FE" fontWeight={'600'}>
                {data?.data?.user_info?.email ? (
                  truncateLongText(data?.data?.user_info?.email, 24).truncatedText
                ) : (
                  <BsDashLg />
                )}
              </Text>
            </Link>
          </Stack>
          <HStack justify="space-between" borderBottom="1px solid #F5F5F5" pb={2}>
            <Text
              fontWeight="400"
              fontSize="14px"
              lineHeight="18px"
              textAlign="right"
              color="#191919"
            >
              Ref no.
            </Text>
            <Text
              fontWeight="600"
              fontSize="14px"
              lineHeight="18px"
              textAlign="right"
              color="#191919"
            >
              {data?.data?.user_info?.customer_ref ?? '-'}
            </Text>
          </HStack>
          <Stack
            width="full"
            pb="13.37px"
            display="flex"
            fontSize="14px"
            flexDirection="row"
            wordBreak="break-word"
            justifyContent="space-between"
            borderBottom="1px solid #F5F5F5"
          >
            <Text color="#191919" fontWeight={'400'}>
              Gender
            </Text>
            <Text color="#191919" fontWeight={'600'}>
              {data?.data?.user_info?.gender ?? <BsDashLg />}
            </Text>
          </Stack>
          <Stack
            borderBottom="1px solid #F5F5F5"
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            width="full"
            pb="13.37px"
            wordBreak="break-word"
            fontSize="14px"
          >
            <Text color="#191919" fontWeight={'400'}>
              {data?.data?.referred_by?.type === 'created' ? 'Created by' : 'Referred by'}
            </Text>
            <HoverForPopUp
              isOpen={referralDisclosure.isOpen}
              handleClose={handleReferralPopUpClose}
              handleOpen={handleReferralPopUpOpen}
              popUpText={data?.data?.referred_by?.info}
            >
              <HStack spacing="4px" p="6px 0px" align="center" h="full">
                {data?.data?.referred_by?.avatar && !isAconsultant ? (
                  <Image
                    alt="referral avatar"
                    boxSize="18px"
                    src={data?.data?.referred_by?.avatar}
                    w="fit-content"
                    maxW="20px"
                    borderRadius="full"
                  />
                ) : null}
                <Text
                  color="#191919"
                  fontWeight={'600'}
                  textTransform="capitalize"
                  cursor={data?.data?.referred_by?.id ? 'pointer' : ''}
                  onClick={() => {
                    agentId ? OpenAgentModal(data?.data?.referred_by?.id) : '';
                  }}
                >
                  {data?.data?.referred_by?.name ? referreeName : <BsDashLg />}
                </Text>
              </HStack>
            </HoverForPopUp>
            <RealtorDrawer modalDisclosure={agentsDrawer} agentId={agentId} runQuery={runQuery} />
          </Stack>
        </Box>
      </Box>

      <Link href={`/residents/profile/?userId=${userId}`}>
        <Button
          bg="#F5F5F5"
          alignSelf="center"
          fontWeight="400"
          fontSize="14px"
          lineHeight="18px"
          _hover={{
            bg: '',
          }}
          _active={{
            bg: '',
          }}
          color="#191919"
          width="full"
          height="48px"
          border="1px solid #E4E4E4 "
          borderRadius="full"
        >
          <HStack justify="center" spacing="9px">
            <Image w="15px" h="15px" src={expand.src} alt="expand icon" fontSize="10px" />
            <Text fontSize="17.20px" fontWeight={'500'}>
              View details
            </Text>
          </HStack>
        </Button>
      </Link>
    </Box>
  );
};

export default ContactCard;
