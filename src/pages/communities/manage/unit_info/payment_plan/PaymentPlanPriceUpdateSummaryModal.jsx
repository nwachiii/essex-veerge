import React from 'react';
import {Popup} from '../../../../../ui-lib/ui-lib.components';
import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Spinner,
  Stack,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import {priceString} from '../../../../../utils/formatAmount';
import backIcon from '/src/images/icons/backArrowForDrawer.svg';
import {handleDateFormat} from 'utils/formatDate';

export const PriceUpdateSummaryModal = ({
  data,
  checkedItems,
  mutation,
  PRICE_UPDATE_SUMMARY,
  unitInfo,
  paymentPlanMutation,
  deleteClose,
}) => {
  const toast = useToast();
  const handleKeep = () => {
    deleteClose();
    paymentPlanMutation.mutate();
    mutation.mutate({
      keeps: checkedItems,
    });
  };

  return (
    <Popup
      overflowY="auto"
      size="full"
      minH="622px"
      h="fit-content"
      mt="16vh"
      minW={{base: '90%', md: '551px'}}
      color="#191919"
      position="relative"
      isOpen={PRICE_UPDATE_SUMMARY.isOpen}
      onClose={PRICE_UPDATE_SUMMARY.onClose}
    >
      <HStack>
        <Image
          alt="back icon"
          cursor="pointer"
          src={backIcon.src}
          onClick={() => PRICE_UPDATE_SUMMARY.onClose()}
        />
        <Text gap="12px" ml="2" fontSize="24px" fontWeight={'600'}>
          Price update summary
        </Text>
      </HStack>

      <Popup.Body h="auto" px="20px">
        {unitInfo && (
          <Flex
            px="15px"
            w="90%"
            gap="21px"
            align="center"
            h="128px"
            borderRadius={'15px'}
            bg="#F5F5F5"
          >
            <Image alt="" src={unitInfo?.photos[0]?.photo} boxSize="100px" borderRadius={'14px'} />
            <Stack justify={'space-around'} h="full">
              <Text fontSize={'18px'} fontWeight={'600'}>
                {unitInfo?.unit_title}
              </Text>
              <VStack align="flex-start" spacing="5px">
                <Text fontWeight={'400'} fontSize={'12px'}>
                  Unit price
                </Text>
                <Text fontWeight={'600'} fontSize={'18px'}>
                  {priceString('naira', unitInfo?.price)}
                </Text>
              </VStack>
            </Stack>
          </Flex>
        )}
        {/* <Text w="90%" textAlign={'left'} pt={2} fontSize={'16px'} fontWeight="600">
          {`Users with N${price} price offer`}
        </Text> */}
        {data?.length &&
          data?.map((equity, index) => (
            <HStack
              key={index}
              w="90%"
              spacing={'11px'}
              px="5"
              h="100px"
              borderRadius="15px"
              border="1px solid #E4E4E4"
            >
              {equity?.owner?.avatar ? (
                <Image borderRadius={'full'} boxSize={'48px'} src={equity?.owner?.avatar} alt="" />
              ) : (
                <Avatar />
              )}
              <Box lineHeight="5">
                <Text fontSize={'18px'} color={'#191919'}>
                  {equity?.owner?.first_name.charAt(0).toUpperCase() +
                    equity?.owner?.first_name.slice(1)}{' '}
                  {equity?.owner?.last_name.charAt(0).toUpperCase() +
                    equity?.owner?.last_name.slice(1)}
                </Text>
                <Text fontWeight={'500'} fontSize={'14px'} color="#FF6A6A">
                  Offer expiration:{' '}
                  {equity?.offer_expires ? handleDateFormat(equity?.offer_expires) : 'N/A'}
                </Text>
              </Box>
            </HStack>
          ))}

        <Button
          textAlign={'center'}
          onClick={handleKeep}
          w="85%"
          color={'#FFFFFF'}
          bg="#4545FE"
          px="16px"
          py="7"
          position="absolute"
          bottom="10"
          borderRadius="72px"
          _hover={{bg: '#4545FE'}}
        >
          {mutation?.isLoading ? <Spinner /> : 'Proceed'}
        </Button>
      </Popup.Body>
    </Popup>
  );
};

export default PriceUpdateSummaryModal;
