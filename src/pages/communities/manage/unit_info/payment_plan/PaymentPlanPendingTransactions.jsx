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
} from '@chakra-ui/react';
import {Popup} from 'ui-lib/ui-lib.components';
import checkedIcon from '/src/images/icons/checked.svg';
import {AnimatedLoader} from '/src/components/common/loaders';
import uncheckedIcon from '/src/images/icons/unchecked.svg';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {KeepPriceForEquities, getPendingEquities} from '/src/apis/listings';
import {handleDateFormat} from '../../../../../utils/formatDate';
import tooltipIcon from '/src/images/icons/tooltipIcon.svg';
import PriceUpdateSummaryModal from './PaymentPlanPriceUpdateSummaryModal';

export const PendingTransactionsModal = ({
  unitId,
  refetch,
  modal,
  paymentPlanMutation,
  deleteClose,
  unitInfo,
}) => {
  const toast = useToast();
  const PRICE_UPDATE_SUMMARY = useDisclosure();
  const [checkedItems, setCheckedItems] = useState([]);
  const queryClient = useQueryClient();
  const FETCHED_PENDING_EQUITIES = useQuery(
    ['get-pending-equities', Number(unitId)],
    () => getPendingEquities(Number(unitId)),
    {enabled: !!!isNaN(Number(unitId))}
  );

  const mutation = useMutation(body => KeepPriceForEquities(unitId, body), {
    onSuccess: res => {
      // console.log(res);
      setTimeout(() => {
        refetch();
      }, 2000);
      PRICE_UPDATE_SUMMARY.onClose();
      modal.onClose();
      queryClient.invalidateQueries('get-pending-equities');
    },
    onError: err => {
      console.log(err);
      toast({
        title: 'Request failed',
        status: 'error',
        duration: 4000,
        isClosable: true,
        position: 'top-right',
      });
    },
  });

  const pendingEquities = FETCHED_PENDING_EQUITIES?.data?.data?.data;

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
    deleteClose();
    mutation.mutate({
      keeps: checkedItems,
    });
    paymentPlanMutation.mutate();
    queryClient.invalidateQueries('payment_plan');
    modal.onClose();
  };

  return (
    <>
      <Popup
        size="full"
        minH="600px"
        h="fit-content"
        // mt="16vh"
        minW={{base: '90%', md: '551px'}}
        color="#191919"
        isOpen={modal.isOpen}
        onClose={modal.onClose}
        zIndex="1000"
        position="relative"
        isCentered
      >
        <HStack>
          <Text gap="12px" ml="2" fontSize="24px" fontWeight={'600'}>
            Pending Transaction
          </Text>
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

        <Popup.Body h="auto">
          {FETCHED_PENDING_EQUITIES?.isLoading ? (
            <VStack justify="center" h="full">
              <AnimatedLoader />
            </VStack>
          ) : FETCHED_PENDING_EQUITIES?.isError ? (
            toast({
              title: 'Request failed',
              status: 'error',
              duration: 4000,
              isClosable: true,
              position: 'top-right',
            })
          ) : (
            <>
              <Box w="full" spacing={'20px'} px="25px" h="auto">
                <Text
                  fontSize={'16px'}
                  color={'#191919'}
                >{`You have ${pendingEquities?.length} pending transactions for N${pendingEquities[0]?.total_unit_price}. Select users you would like to retain their old price.`}</Text>
              </Box>

              <VStack gap="5" h="auto" p="2" w="full" overflowY="auto">
                {pendingEquities?.map((equity, index) => {
                  const isItem =
                    checkedItems.length > 0 && checkedItems?.find(item => item === equity?.id);
                  return (
                    <Box
                      key={index}
                      w="471px"
                      h="108px"
                      borderRadius={'15px'}
                      border="1px solid #E4E4E4"
                    >
                      <Checkbox
                        w="full"
                        isChecked={false}
                        border={'none'}
                        spacing={0}
                        onChange={e => handleSelectEquities(e, equity)}
                      >
                        <HStack
                          w="451px"
                          justify={'space-between'}
                          cursor={'pointer'}
                          spacing={'11px'}
                          mt="6"
                          pr="5"
                        >
                          <HStack>
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
                            <Box lineHeight="5">
                              <Text fontSize={'18px'} color={'#191919'}>
                                {equity.owner.first_name.charAt(0).toUpperCase() +
                                  equity.owner.first_name.slice(1)}{' '}
                                {equity.owner.last_name.charAt(0).toUpperCase() +
                                  equity.owner.last_name.slice(1)}
                              </Text>
                              <Text fontWeight={'500'} fontSize={'14px'} color="#FF6A6A">
                                Offer expiration:{' '}
                                {equity?.offer_expires
                                  ? handleDateFormat(equity.offer_expires)
                                  : 'N/A'}
                              </Text>
                            </Box>
                          </HStack>

                          {isItem ? (
                            <Image h="20px" mt="3" src={checkedIcon.src} alt="" />
                          ) : (
                            <Image h="20px" mt="3" src={uncheckedIcon.src} alt="" />
                          )}
                        </HStack>
                      </Checkbox>
                    </Box>
                  );
                })}
              </VStack>
              <HStack pt={6} w="full" justifyContent={'center'} position="absolute" bottom="10">
                <Button
                  onClick={() => modal.onClose()}
                  px="16px"
                  py="6"
                  borderRadius="72px"
                  w="223px"
                  color={'#FF6A6A'}
                  bg="transparent"
                  border="1px solid #FF6A6A"
                  textAlign={'center'}
                  _hover={{bg: 'transparent'}}
                  fontWeight={'500'}
                >
                  Discard
                </Button>
                {/* // )} */}
                <Button
                  textAlign={'center'}
                  onClick={
                    checkedEquities.length > 0
                      ? PRICE_UPDATE_SUMMARY.onOpen
                      : handleNoSelectedEquity
                  }
                  w="223px"
                  color={'#FFFFFF'}
                  bg="#4545FE"
                  px="16px"
                  py="6"
                  borderRadius="72px"
                  _hover={{bg: '#4545FE'}}
                  fontWeight={'500'}
                >
                  Proceed
                </Button>
              </HStack>
            </>
          )}
        </Popup.Body>
      </Popup>
      <PriceUpdateSummaryModal
        data={checkedEquities}
        mutation={mutation}
        checkedItems={checkedItems}
        PRICE_UPDATE_SUMMARY={PRICE_UPDATE_SUMMARY}
        unitInfo={unitInfo}
        paymentPlanMutation={paymentPlanMutation}
        deleteClose={deleteClose}
      />
    </>
  );
};

export default PendingTransactionsModal;
