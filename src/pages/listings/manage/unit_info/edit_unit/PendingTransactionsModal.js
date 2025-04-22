import React, {useState} from 'react';
import {
  Box,
  Checkbox,
  HStack,
  Image,
  Text,
  VStack,
  useDisclosure,
  useToast,
  Avatar,
  Button,
  Tooltip,
  StackDivider,
  Stack,
  ModalFooter,
} from '@chakra-ui/react';
import {Popup} from 'ui-lib/ui-lib.components';
import checkedIcon from '/src/images/icons/checked.svg';
import {AnimatedLoader} from '/src/components/common/loaders';
import uncheckedIcon from '/src/images/icons/unchecked.svg';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {PriceUpdateSummaryModal} from './PriceUpdateSummaryModal';
import {KeepPriceForEquities} from '/src/apis/listings';
import {handleDateFormat} from '../../../../../utils/formatDate';
import tooltipIcon from '/src/images/icons/tooltipIcon.svg';
import {Spinner} from '@/components/common/loaders/AnimatedLoader';
import {formatToCurrency} from 'utils/formatAmount';
import backIcon from '/src/images/icons/backArrowForDrawer.svg';

export const PendingTransactionsModal = ({
  unitId,
  refetch,
  modal,
  unitInfo,
  priceMutation,
  unitPrice,
  doc,
  pendingEquities,
  isLoading,
  isError,
  equityRefetch,
}) => {
  const toast = useToast();
  const PRICE_UPDATE_SUMMARY = useDisclosure();
  const [checkedItems, setCheckedItems] = useState([]);
  const queryClient = useQueryClient();

  const mutation = useMutation(body => KeepPriceForEquities(unitId, body), {
    onSuccess: res => {
      console.log(res);
      PRICE_UPDATE_SUMMARY.onClose();
      modal.onClose();
      queryClient.invalidateQueries('get-pending-equities');
    },
    onError: err => {
      console.log(err);
      toast({
        title: 'Re',
        status: 'error',
        duration: 4000,
        isClosable: true,
        position: 'top-right',
      });
    },
  });

  const handleSelectEquities = (e, equity) => {
    if (e.cancelable) e.preventDefault();
    const itemAlreadyExist = checkedItems?.includes(equity?.id);
    if (itemAlreadyExist) {
      const updatedCheckedItems = checkedItems.filter(item => item !== equity?.id);
      setCheckedItems(updatedCheckedItems);
    } else {
      setCheckedItems([...checkedItems, equity?.id]);
    }
  };
  const checkedEquities =
    checkedItems.length > 0 &&
    checkedItems?.map(item => pendingEquities.filter(entry => entry?.id == item)).map(([i]) => i);

  const handleNoSelectedEquity = () => {
    mutation.mutate({
      keeps: checkedItems,
    });
    priceMutation.mutate({
      price: unitPrice,
      docs: doc ? doc[0] : '',
    });
    queryClient.invalidateQueries('payment_plan');
    modal.onClose();
  };

  return (
    <>
      <Popup
        size="full"
        h="fit-content"
        minH="495px"
        mt="16vh"
        minW={{base: '90%', md: '520px'}}
        color="#191919"
        isOpen={modal.isOpen}
        onClose={modal.onClose}
        zIndex="1000"
        position="relative"
        p="24px"
        hideCloseBtn
        display="flex"
      >
        <Stack minH="471px" flex={1} justify="space-between">
          <Box w="full">
            <HStack>
              <HStack>
                <Image
                  alt="back icon"
                  cursor="pointer"
                  src={backIcon.src}
                  onClick={() => modal.onClose()}
                />
                <Text gap="12px" ml="2" fontSize="24px" fontWeight={'600'}>
                  Pending Transaction
                </Text>
              </HStack>
              <Tooltip
                bg="#fff"
                color="#191919"
                borderRadius="16px"
                p="15px"
                label="Checked transactions will keep the old price, unchecked transactions will be terminated."
              >
                <Image alt="back icon" cursor="pointer" src={tooltipIcon.src} mt="1" />
              </Tooltip>
            </HStack>
            <Popup.Body display="flex" gap={0} mt="8px" mb="0px" h="auto">
              {isLoading ? (
                <VStack justify="center" h="full">
                  <AnimatedLoader />
                </VStack>
              ) : isError ? null : (
                <>
                  <Box w="full" spacing={'20px'} px="10px" h="auto" mb="24px">
                    <Text fontSize={'16px'} color={'#191919'}>
                      You have{' '}
                      <Text as="span" color="#4545FE">
                        {pendingEquities?.length} pending transaction
                        {pendingEquities?.length > 1 ? 's' : ''}
                      </Text>{' '}
                      for
                      <Text as="span" fontWeight={500}>
                        {formatToCurrency(pendingEquities[0]?.total_unit_price)}
                      </Text>
                      . Select users you would like to retain their old price.
                    </Text>
                  </Box>
                  <VStack
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
                    {pendingEquities?.map((equity, index) => {
                      const isItem =
                        checkedItems.length > 0 && checkedItems?.find(item => item === equity?.id);
                      return (
                        <Box w="full" key={index}>
                          <HStack
                            justify={'space-between'}
                            cursor={'pointer'}
                            spacing={'11px'}
                            w="full"
                            align='start'
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
                                    {equity?.offer_expires
                                      ? handleDateFormat(equity.offer_expires)
                                      : 'N/A'}
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
                                    {equity?.offer_expires
                                      ? handleDateFormat(equity.offer_expires)
                                      : 'N/A'}
                                  </Text>
                                </Box>
                              </HStack>
                            )}
                            <Box onClick={e => handleSelectEquities(e, equity)}>
                              {isItem ? (
                                <Image h="20px" mt="3" src={checkedIcon.src} alt="" />
                              ) : (
                                <Image h="20px" mt="3" src={uncheckedIcon.src} alt="" />
                              )}
                            </Box>
                          </HStack>
                        </Box>
                      );
                    })}
                  </VStack>
                </>
              )}
            </Popup.Body>
          </Box>
          <ModalFooter pt="24px" px={0} gap="16px" w="full" justifyContent={'space-between'}>
            <Button
              onClick={() => modal.onClose()}
              h="55px"
              borderRadius={'full'}
              w="full"
              color={'#FF6A6A'}
              bg="transparent"
              border="1px solid #FF6A6A"
              textAlign={'center'}
              _hover={{bg: 'transparent'}}
              fontSize="18px"
              fontWeight={500}
            >
              Discard
            </Button>
            <Button
              textAlign={'center'}
              onClick={
                checkedEquities.length > 0 ? PRICE_UPDATE_SUMMARY.onOpen : handleNoSelectedEquity
              }
              w="full"
              color={'#FFFFFF'}
              bg="#4545FE"
              h="55px"
              fontSize="18px"
              borderRadius={'full'}
              _hover={{bg: '#4545FE'}}
            >
              {mutation?.isLoading ? <Spinner /> : 'Proceed'}
            </Button>
          </ModalFooter>
        </Stack>
      </Popup>
      <PriceUpdateSummaryModal
        price={pendingEquities && pendingEquities[0]?.total_unit_price}
        data={checkedEquities}
        mutation={mutation}
        checkedItems={checkedItems}
        unitInfo={unitInfo}
        PRICE_UPDATE_SUMMARY={PRICE_UPDATE_SUMMARY}
        unitPrice={unitPrice}
        priceMutation={priceMutation}
        doc={doc}
      />
    </>
  );
};

export default PendingTransactionsModal;
