import CopyIcon from '@/components/assets/copyIcon';
import {
  Button,
  HStack,
  Heading,
  Image,
  Spinner,
  Stack,
  StackDivider,
  Tag,
  Text,
  useClipboard,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import {formatToCurrency} from 'utils/formatAmount';
import ViewOffer from './modals';
import PaymentBreakdown from './modals/paymentBreakDown';
import ClosingCost from './modals/closingCost';
import {Fragment} from 'react';
import {changeDateFormat} from 'utils/formatDate';
import {useQuery} from '@tanstack/react-query';
import {sendAnOfferAccountDetailsAndPacket} from 'apis/customers';
import {fetchCustomPlanSummary} from 'apis/listings';

export const ViewOfferCard = ({customScrollbarStyles, info, idx}) => {
  const offerSummaryDisclosure = useDisclosure();
  const closingCostDisclosure = useDisclosure();
  const paymentBreakdownDisclosure = useDisclosure();

  const {data, isLoading, isError, error} = useQuery(
    ['offerDetails', info?.id],
    () => sendAnOfferAccountDetailsAndPacket(info?.id),
    {enabled: !!info?.id}
  );

  const {onCopy, hasCopied} = useClipboard(
    data?.data?.account_details?.data?.account_number ?? '-'
  );

  const accName = data?.data?.account_details?.data?.note
    ? `${data?.data?.account_details?.data?.note}`
    : '-';
  // const accName = data?.data?.account_details?.data?.note
  //   ? `${data?.data?.account_details?.data?.note.split('to')[1]}`
  //   : '-';

  const accountDetailsObj = {
    accName,
    accNum: data?.data?.account_details?.data?.account_number ?? '-',
    bankName: data?.data?.account_details?.data?.bank_name ?? '-',
    packet: data?.data?.packets?.[0]?.packet ?? '',
    isError,
    isLoading,
  };
  const tagState = info?.payment_plan ? 'custom' : 'outright';

  const tagStyling = {
    outright: {
      bg: '#E7FBF5',
      color: '#064B38',
      text: 'Outright',
    },
    custom: {
      bg: '#4545FE1A',
      color: '#4545FE',
      text: `${info?.payment_plan?.payment_period_in_months} Month${
        info?.payment_plan?.payment_period_in_months > 1 ? 's' : ''
      }`,
    },
  };

  const sumFeesArray = info?.unit?.fees?.length
    ? info?.unit.fees.reduce(
        (accumulator, currentValue) => accumulator + Number(currentValue.amount || 0),
        0
      )
    : 0;
  const getValueOfFee = () => {
    const amountOfFee =
      0.022 *
      Number(
        info?.payment_plan
          ? info?.payment_plan?.initial_deposit_in_value
          : (info?.total_unit_price ?? 0)
      );
    if (amountOfFee >= 5000) {
      return 5000;
    }
    return amountOfFee;
  };

  const totalPrice = Number(
    info?.payment_plan ? info?.payment_plan?.initial_deposit_in_value : info?.total_unit_price
  );
  // + getValueOfFee();

  const handleCopy = () => {
    onCopy();
  };

  return (
    <>
      <Stack
        justify="start"
        w="full"
        bg="#fff"
        borderRadius="16px"
        border=" 0.5px solid  #E4E4E4"
        p={{md: '18px 16px', lg: '18px 33px'}}
        spacing="24px"
      >
        <HStack spacing="21px">
          <Image
            src={info?.project?.photos?.[0]?.photo}
            objectFit="cover"
            alt="equity image"
            w="100px"
            h="100px"
            borderRadius="16px"
          />
          <Stack spacing="8px">
            <Text fontSize="28px" fontWeight="500" color="#191919">
              {info?.project?.name}
            </Text>
            <Text fontSize="16px" fontWeight="400" color="#606060">
              {info?.unit?.unit_title}
            </Text>
          </Stack>
        </HStack>
        <Stack spacing="12px" w="full">
          <Text fontSize="14px" fontWeight="500" color="#191919">
            {info?.payment_plan ? 'Initial deposit' : 'Amount to be paid'}
          </Text>

          <Stack
            w="full"
            px="15px"
            justify="center"
            border=" 0.5px solid #E4E4E4"
            borderRadius="12px"
            h="59.885px"
          >
            <Text fontSize="16px" fontWeight="600" color="#191919">
              {totalPrice ? formatToCurrency(totalPrice) : '-'}
            </Text>
          </Stack>
          {/* <Text fontSize="14px" fontWeight="500" color="#606060">
            <sup>*</sup>
            {totalPrice
              ? formatToCurrency(
                  info?.payment_plan
                    ? info?.payment_plan?.initial_deposit_in_value
                    : info?.total_unit_price,
                  'naira'
                )
              : '-'}{' '}
            + Transaction Fee
          </Text> */}
        </Stack>

        <Stack
          p="13.2px 13.6px 14.6px 14.6px"
          bg="#F4F4F4"
          w="full"
          borderRadius="13.2px"
          spacing="none"
          divider={<StackDivider my="13.9px" />}
        >
          <HStack w="full" justify="space-between">
            <Text fontSize="14px" fontWeight="400" color="#191919">
              Offer Date
            </Text>
            <Text fontSize="16px" fontWeight="500" color="#4545FE">
              {info?.created_at ? changeDateFormat(info?.created_at) : '-'}
            </Text>
          </HStack>
          <HStack w="full" justify="space-between">
            <Text fontSize="14px" fontWeight="400" color="#191919">
              Offer Expiration
            </Text>
            <Text fontSize="16px" fontWeight="500" color="#FF6A6A">
              {info?.offer_expires ? changeDateFormat(info?.offer_expires) : '-'}
            </Text>
          </HStack>
          <HStack w="full" justify="space-between">
            <Text fontSize="14px" fontWeight="400" color="#191919">
              Account Number
            </Text>
            {accountDetailsObj.isError ? (
              ''
            ) : accountDetailsObj.isLoading ? (
              <Spinner />
            ) : (
              <HStack spacing="16px">
                <Stack spacing="5.65px" align="end">
                  <Text textAlign="end" fontSize="11px" fontWeight="400" color="#606060">
                    {accountDetailsObj.bankName}
                    {'  '}
                    <Text as="span" pl="2px" color="#4545FE" fontWeight="500">
                      {accountDetailsObj.accNum}
                    </Text>
                  </Text>{' '}
                  <Text fontSize="13px" textAlign="end" fontWeight="500" color="#191919">
                    {accountDetailsObj.accName}
                  </Text>
                </Stack>

                <CopyIcon
                  handleCopy={() => handleCopy(idx)}
                  styleProp={{height: '17px', width: '17px'}}
                  hasBeenCopied={hasCopied}
                />
              </HStack>
            )}
          </HStack>
        </Stack>
        <HStack justify="space-between" w="full">
          <Tag
            p="8px 13px"
            borderRadius="48px"
            fontSize="16px"
            fontWeight="500"
            variant="solid"
            bg={tagStyling[tagState].bg}
            color={tagStyling[tagState].color}
          >
            {tagStyling[tagState].text}
          </Tag>

          <Button
            w="152px"
            bg="#191919"
            fontSize="16px"
            fontWeight="400"
            color="#ffffff"
            h="48px"
            onClick={offerSummaryDisclosure.onOpen}
            borderRadius="72px"
            _focus={{opacit: '1'}}
            _hover={{opacity: '1'}}
            _active={{opacity: '1'}}
          >
            View offer
          </Button>
        </HStack>
      </Stack>

      <ViewOffer
        modalDisclosure={offerSummaryDisclosure}
        accountDetailsObj={accountDetailsObj}
        handleCopy={handleCopy}
        hasCopied={hasCopied}
        customScrollbarStyles={customScrollbarStyles}
        info={info}
        paymentBreakdownDisclosure={paymentBreakdownDisclosure}
        closingCostDisclosure={closingCostDisclosure}
      />
      <PaymentBreakdown
        info={info}
        modalDisclosure={offerSummaryDisclosure}
        customScrollbarStyles={customScrollbarStyles}
        paymentBreakdownDisclosure={paymentBreakdownDisclosure}
      />
      <ClosingCost
        modalDisclosure={closingCostDisclosure}
        fees={info?.equity_fees}
        customScrollbarStyles={customScrollbarStyles}
      />
    </>
  );
};

export default ViewOfferCard;
