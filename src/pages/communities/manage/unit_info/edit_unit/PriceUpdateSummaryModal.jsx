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
  StackDivider,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import {formatToCurrency, priceString} from '../../../../../utils/formatAmount';
import backIcon from '/src/images/icons/backArrowForDrawer.svg';
import {handleDateFormat} from 'utils/formatDate';
import {useQueryClient} from '@tanstack/react-query';

export const PriceUpdateSummaryModal = ({
  data,
  checkedItems,
  mutation,
  priceMutation,
  unitInfo,
  PRICE_UPDATE_SUMMARY,
  price,
  unitPrice,
  doc,
}) => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const handleKeep = () => {
    mutation.mutate({
      keeps: checkedItems,
    });

    priceMutation.mutate({
      price: unitPrice,
      docs: doc ? doc[0] : '',
    });
    queryClient.invalidateQueries('payment_plan');
    toast({
      title: 'Price will remain active for selected equities',
      status: 'success',
      duration: 4000,
      isClosable: true,
      position: 'top-right',
    });
  };

  return (
    <Popup
      overflowY="auto"
      size="full"
      minH="525px"
      h="fit-content"
      mt="16vh"
      minW={{base: '90%', md: '520px'}}
      color="#191919"
      position="relative"
      isOpen={PRICE_UPDATE_SUMMARY.isOpen}
      onClose={PRICE_UPDATE_SUMMARY.onClose}
      p='24px'
    >
      <HStack>
        <Image
          alt="back icon"
          cursor="pointer"
          src={backIcon.src}
          onClick={() => PRICE_UPDATE_SUMMARY.onClose()}
        />
        <Text gap="12px" fontSize="24px" fontWeight={'600'}>
          Price update summary
        </Text>
      </HStack>

      <Popup.Body display='flex' gap='24px' align='start' justify='start' h="auto">
        {unitInfo && (
          <Flex
            p="16px"
            gap="21px"
            align="center"
            borderRadius={'15px'}
            bg="#F9FAFB"
            w='full'
            border='1px solid #E5E5E5'
          >
            <Stack gap='12px' justify={'space-around'} h="full">
              <Text fontSize={'18px'} fontWeight={'600'}>
                {unitInfo?.unit_title}
              </Text>
              <VStack align="flex-start" spacing="5px">
                <Text fontWeight={'400'} fontSize={'12px'}>
                  Unit price
                </Text>
                <Text fontWeight={'600'} fontSize={'18px'}>
                  {priceString('naira', unitPrice)}
                </Text>
              </VStack>
            </Stack>
          </Flex>
        )}
        <Text textAlign='start' fontSize={'16px'}>
          {`Users with ${formatToCurrency(price)} price offer`}
        </Text>
        {data?.length > 0 ? <VStack
          gap="20px"
          h="full"
          maxH="265px"
          px="22px"
          py="20px"
          w="full"
          border="1px solid #E5E5E5"
          rounded="15px"
          bg="#F9FAFB"
          overflowY="auto"
          divider={<StackDivider borderColor="#E4E4E4" m="0 !important" />}
        >
          {data?.map((equity, index) => {
            return (
              <Box w="full" key={index}>
                <HStack
                  justify={'space-between'}
                  cursor={'pointer'}
                  spacing={'11px'}
                  w="full"
                  align="start"
                >
                  {equity?.co_owners?.length > 0 ? (
                    <HStack gap="8px">
                      <Box w="full" minW="72px" maxW="72px" pos="relative">
                        {equity?.owner?.avatar ? (
                          <Image
                            borderRadius={'full'}
                            boxSize={'48px'}
                            src={equity?.owner?.avatar}
                            alt=""
                          />
                        ) : (
                          <Avatar />
                        )}
                        <Stack
                          boxSize="48px"
                          fontSize={'18px'}
                          borderRadius={'full'}
                          bg="#4545FE"
                          color="#FFFFFF"
                          position={'absolute'}
                          left={'2%'}
                          top={1}
                          align="center"
                          textAlign="center"
                          justify="center"
                        >
                          <Text>{equity.co_owners.length}+</Text>
                        </Stack>
                      </Box>
                      <Box lineHeight="5">
                        <Text fontSize={'18px'} fontWeight={500} color={'#191919'}>
                          {equity.owner.first_name.charAt(0).toUpperCase() +
                            equity.owner.first_name.slice(1)}{' '}
                          {equity.owner.last_name.charAt(0).toUpperCase() +
                            equity.owner.last_name.slice(1)}{' '}
                          & {equity.co_owners.length} other
                          {equity.co_owners.length > 1 ? 's' : ''}
                        </Text>
                        <Text fontSize={'14px'} color="#FF6A6A">
                          Offer expiration:{' '}
                          {equity?.offer_expires ? handleDateFormat(equity.offer_expires) : 'N/A'}
                        </Text>
                      </Box>
                    </HStack>
                  ) : (
                    <HStack>
                      {equity?.customer?.avatar ? (
                        <Image
                          borderRadius={'full'}
                          boxSize={'48px'}
                          src={equity?.customer?.avatar}
                          alt=""
                        />
                      ) : (
                        <Avatar />
                      )}
                      <Box lineHeight="5">
                        <Text fontSize={'18px'} fontWeight={500} color={'#191919'}>
                          {equity.owner.first_name.charAt(0).toUpperCase() +
                            equity.owner.first_name.slice(1)}{' '}
                          {equity.owner.last_name.charAt(0).toUpperCase() +
                            equity.owner.last_name.slice(1)}
                        </Text>
                        <Text fontSize={'14px'} color="#FF6A6A">
                          Offer expiration:{' '}
                          {equity?.offer_expires ? handleDateFormat(equity.offer_expires) : 'N/A'}
                        </Text>
                      </Box>
                    </HStack>
                  )}
                </HStack>
              </Box>
            );
          })}
        </VStack>: null}

        <Button
          textAlign={'center'}
          onClick={handleKeep}
          w="90%"
          color={'#FFFFFF'}
          bg="#4545FE"
          px="16px"
          py="7"
          position="absolute"
          bottom="10"
          borderRadius={'full'}
          _hover={{bg: '#4545FE'}}
        >
          {mutation?.isLoading ? <Spinner /> : 'Proceed'}
        </Button>
      </Popup.Body>
    </Popup>
  );
};

export default PriceUpdateSummaryModal;
