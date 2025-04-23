import {useState} from 'react';
import {themeStyles} from '../../../theme';
import avatar from '../../../images/avatar.svg';
import {
  Box,
  Button,
  Flex,
  Image,
  Heading,
  HStack,
  Stack,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';

import Link from 'next/link';
import {CreateToast} from 'ui-lib';
import {BsDashLg} from 'react-icons/bs';
import NotesDrawer from '../../notesDrawer';
import NotesIcon from '../../assets/NotesIcon';
import calling from '/src/images/icons/Calling.png';
import RealtorDrawer from '../../Drawers/realtorDrawer';
import HoverForPopUp from 'utils/HoverForPopUp';
import {truncateLongText} from 'utils';
import { loggedinUserStatic } from 'apis/requests';

export const CustomerBasicInfo = ({customerInfo, referral}) => {
  const toast = CreateToast();
  const modalDisclosure = useDisclosure();
  const referralDisclosure = useDisclosure();
  const agentsDrawer = useDisclosure();
  const [agentId, setAgentId] = useState();
  const [runQuery, setRunQuery] = useState(false);
  const loggedInUser = loggedinUserStatic;

  const OpenAgentModal = item => {
    agentsDrawer.onOpen();
    setAgentId(item);
    setRunQuery(true);
  };

  const placeACall = () => {
    toast('You are currently ineligible for this feature', {
      position: 'fixed',
      top: '10vh',
      right: '2vw',
      w: '480px',
    });
  };
  const handleReferralPopUpOpen = () => {
    const shouldHover = referral.type === 'Others';
    if (shouldHover) {
      return referralDisclosure.onOpen();
    }
  };
  const handleReferralPopUpClose = () => {
    referralDisclosure.onClose();
  };
  const isAconsultant = referral.type === 'agent' && !referral.id;
  const referreeName = `${isAconsultant ? `${referral?.info} (consultant)` : referral?.name}`;
  return (
    <Stack mb="2.5rem">
      <Box
        {...themeStyles.customerProfileCard}
        h="fit-content"
        pb="15px"
        w={{base: 'full', lg: 'full', xl: '371px'}}
        maxW={{base: '300px', lg: '371px'}}
      >
        <Stack spacing={13}>
          <VStack>
            <Image
              alt=""
              borderRadius="full"
              objectFit="cover"
              height={120}
              width={120}
              src={customerInfo?.avatar ?? avatar.src}
            />
            <Heading
              textTransform={'capitalize'}
              textAlign={'center'}
              {...themeStyles.textStyles.h2}
              my={0}
              ml={'0px'}
              py={2}
            >
              {' '}
              {`${customerInfo?.first_name?.toLowerCase() ?? ''} ${
                customerInfo?.last_name.toLowerCase() ?? ''
              }`}
            </Heading>
          </VStack>
          <Stack w="100%">
            <HStack justify="space-between" borderBottom="1px solid #F5F5F5" pb={2}>
              <Text
                alignSelf={'flex-start'}
                fontWeight="400"
                fontSize="14px"
                lineHeight="18px"
                textAlign="right"
                color="#191919"
              >
                Phone
              </Text>
              <VStack spacing="8px">
                <Text
                  align={'flex-start'}
                  lineHeight="17.75px"
                  as="span"
                  fontWeight="600"
                  fontSize="14px"
                >
                  {customerInfo?.phone}
                </Text>
                <Flex align="center" gap="9px">
                  <Button
                    px="8px"
                    borderRadius="48px"
                    h="23px"
                    alignSelf="flex-end"
                    onClick={placeACall}
                    bg="rgba(69, 69, 254, 0.1)"
                  >
                    <Flex gap="10px">
                      <Image src={calling.src} boxSize="12px" alt="" />
                      <Text color="#4545FE" fontSize="12px" borderRadius="48px" as="span">
                        Call now
                      </Text>
                    </Flex>
                  </Button>
                </Flex>
              </VStack>
            </HStack>
            <HStack justify="space-between" borderBottom="1px solid #F5F5F5" pb={2}>
              <Text
                fontWeight="400"
                fontSize="14px"
                lineHeight="18px"
                textAlign="right"
                color="#191919"
              >
                Email
              </Text>
              <Link href={customerInfo?.email ? `mailto:${customerInfo?.email}` : null}>
                <Text
                  fontWeight="600"
                  fontSize={{base: '10px', lg: '14px'}}
                  lineHeight={{base: '14px', lg: '18px'}}
                  textAlign="right"
                  color={customerInfo?.email ? '#4545FE' : '#191919'}
                >
                  {customerInfo?.email ? (
                    truncateLongText(customerInfo?.email, 24).truncatedText
                  ) : (
                    <BsDashLg />
                  )}
                </Text>
              </Link>
            </HStack>
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
                {customerInfo.customer_ref ?? '-'}
              </Text>
            </HStack>
            <HStack justify="space-between" borderBottom="1px solid #F5F5F5" pb={2}>
              <Text
                fontWeight="400"
                fontSize="14px"
                lineHeight="18px"
                textAlign="right"
                color="#191919"
              >
                Gender
              </Text>
              <Text
                fontWeight="600"
                fontSize="14px"
                lineHeight="18px"
                textAlign="right"
                color="#191919"
              >
                {customerInfo?.gender ?? <BsDashLg />}
              </Text>
            </HStack>

            <HStack justify="space-between" borderBottom="1px solid #F5F5F5" pb={2}>
              <Text
                fontWeight="400"
                fontSize="14px"
                lineHeight="18px"
                textAlign="right"
                color="#191919"
                whiteSpace="nowrap"
              >
                {referral?.type == 'created' ? 'Created by' : 'Referred by'}
              </Text>
              <HoverForPopUp
                isOpen={referralDisclosure.isOpen}
                handleClose={handleReferralPopUpClose}
                handleOpen={handleReferralPopUpOpen}
                popUpText={referral?.info}
              >
                <HStack
                  spacing="4px"
                  p="6px 0px"
                  align="center"
                  h="full"
                  cursor={referral?.id && referral?.id !== loggedInUser?.id ? 'pointer' : ''}
                  onClick={() => {
                    referral?.id && referral?.id !== loggedInUser?.id
                      ? OpenAgentModal(referral?.id)
                      : '';
                  }}
                  w="full"
                  justify="end"
                >
                  {referral?.avatar && !isAconsultant ? (
                    <Image
                      alt="referral avatar"
                      boxSize="18px"
                      src={referral?.avatar}
                      w="fit-content"
                      maxW="20px"
                      borderRadius="full"
                    />
                  ) : null}
                  <VStack>
                    <Text
                      fontWeight="500"
                      fontSize="14px"
                      color="#191919"
                      textTransform="capitalize"
                      whiteSpace="nowrap"
                    >
                      {referral?.name ? referreeName : <BsDashLg />}
                    </Text>
                  </VStack>
                  <RealtorDrawer
                    modalDisclosure={agentsDrawer}
                    agentId={agentId}
                    runQuery={runQuery}
                  />
                </HStack>
              </HoverForPopUp>
            </HStack>
          </Stack>
        </Stack>
        <HStack mt="18px" w="100%">
          <Button
            bg="#E7FBF5"
            onClick={modalDisclosure.onOpen}
            borderRadius="72px"
            minW="full"
            h="48px"
            _hover={{
              background: '',
            }}
          >
            <Flex gap="13px">
              <NotesIcon />
              <Text color="#064B38" as="span" fontSize={'18px'} fontWeight={'500'}>
                Notes
              </Text>
            </Flex>
          </Button>
        </HStack>
      </Box>
      <NotesDrawer modalDisclosure={modalDisclosure} />
    </Stack>
  );
};

export default CustomerBasicInfo;
