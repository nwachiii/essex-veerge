import {
  Box,
  Checkbox,
  HStack,
  Image,
  Stack,
  Text,
  VStack,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import React, {useState} from 'react';
import {Popup} from 'ui-lib/ui-lib.components';
import checkedIcon from '/src/images/icons/checked.svg';
import {AnimatedLoader} from '/src/components/common/loaders';
import uncheckedIcon from '/src/images/icons/unchecked.svg';
import {useMutation, useQuery} from '@tanstack/react-query';
import {PriceUpdateSummaryModal} from './PriceUpdateSummaryModal';
import {KeepPriceForEquities, getPendingEquities} from '/src/apis/listings';
import {formatAmount} from '../../../../../utils';
import {handleDateFormat} from '../../../../../utils/formatDate';

export const PriceUpdateModal = ({unitId, refetch, modal, unitInfo}) => {
  const toast = useToast();
  const PRICE_UPDATE_SUMMARY = useDisclosure();
  const [checkedItems, setCheckedItems] = useState([]);
  const FETCHED_PENDING_EQUITIES = useQuery(
    ['get-pending-equities', unitId],
    () => getPendingEquities(unitId),
    {enabled: !!!isNaN(unitId)}
  );
  const mutation = useMutation(body => KeepPriceForEquities(unitId, body), {
    onSuccess: res => {
      console.log(res);

      setTimeout(() => {
        refetch();
      }, 2000);
      toast({
        title: 'Successsful! Price will remain active for these equities',
        status: 'success',
        duration: 4000,
        isClosable: true,
        position: 'top-right',
      });
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

  // console.log('keee', FETCHED_PENDING_EQUITIES?.data?.data?.data);
  const handleSelectEquities = (e, equity) => {
    if (e.cancelable) e.preventDefault();
    const itemAlreadyExist =
      checkedItems?.length > 0 ? checkedItems?.find(item => item == equity?.id) : undefined;
    itemAlreadyExist == undefined || !checkedItems?.length
      ? setCheckedItems([...checkedItems, equity?.id])
      : toast({
          title: `This equity has been selected...`,
          status: 'info',
          duration: 3000,
          isClosable: true,
          position: 'bottom',
        });
  };
  const handleClear = () => {
    setCheckedItems([]);
    toast({
      title: `Cleared!`,
      status: 'info',
      duration: 2000,
      isClosable: true,
      position: 'bottom',
    });
  };
  const checkedEquities =
    checkedItems.length > 0 &&
    checkedItems?.map(item => pendingEquities.filter(entry => entry?.id == item)).map(([i]) => i);

  return (
    <div>
      <Popup
        overflowY={'scroll'}
        size="full"
        minH="662px"
        h="fit-content"
        mt="16vh"
        minW={{base: '90%', md: '551px'}}
        color="#191919"
        isOpen={modal.isOpen}
        onClose={modal.onClose}
      >
        <Text gap="12px" px="32px" fontSize="24px" fontWeight={'600'}>
          Price update
        </Text>
        <Popup.Body h="auto" px="32px">
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
            <Stack w="full" spacing={'20px'}>
              <Text
                fontSize={'16px'}
                color={'#191919'}
              >{`You have ${pendingEquities?.length} pending transactions for N${pendingEquities[0]?.total_unit_price}. Select users you would like to retain their old price.`}</Text>

              {/* map pending equities here */}
              {pendingEquities?.map((equity, index) => {
                const isItem =
                  checkedItems.length > 0 && checkedItems?.find(item => item === equity?.id);
                return (
                  <Box
                    key={index}
                    w="471px"
                    h="128px"
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
                        align="center"
                        justify={'space-between'}
                        cursor={'pointer'}
                        p="14px"
                        spacing={'11px'}
                      >
                        <Image
                          borderRadius={'full'}
                          boxSize={'48px'}
                          src={equity?.owner?.avatar}
                          alt=""
                        />
                        <Text textAlign={'left'} fontSize={'18px'} color={'#191919'}>
                          {equity?.owner?.first_name + ' ' + equity?.owner?.last_name}
                        </Text>
                        <VStack spacing="5px">
                          <Text fontWeight={'400'} fontSize={'12px'}>
                            Purchase price
                          </Text>
                          <Text fontWeight={'600'} fontSize={'18px'}>
                            {formatAmount(equity.total_unit_price)}
                          </Text>
                        </VStack>
                        {isItem ? (
                          <Image h="28px" src={checkedIcon.src} alt="" />
                        ) : (
                          <Image h="28px" src={uncheckedIcon.src} alt="" />
                        )}
                      </HStack>
                    </Checkbox>
                    <Text px="14px" fontWeight={'500'} fontSize={'14px'} color="#FF6A6A">
                      Offer expiration:{' '}
                      {equity?.offer_expires ? handleDateFormat(equity.offer_expires) : 'nil'}
                    </Text>
                  </Box>
                );
              })}
              <HStack pt={6} w="full" justify={'flex-end'}>
                {checkedItems.length > 0 && (
                  <Text
                    onClick={handleClear}
                    p="14px"
                    borderRadius="72px"
                    w="223px"
                    color={'#FF6A6A'}
                    bg="transparent"
                    border="1px solid #FF6A6A"
                    textAlign={'center'}
                  >
                    Discard
                  </Text>
                )}
                <Text
                  textAlign={'center'}
                  onClick={PRICE_UPDATE_SUMMARY.onOpen}
                  w="223px"
                  color={'#FFFFFF'}
                  bg="#4545FE"
                  p="14px"
                  borderRadius="72px"
                >
                  Proceed
                </Text>
              </HStack>
            </Stack>
          )}
        </Popup.Body>
      </Popup>
      <PriceUpdateSummaryModal
        data={checkedEquities}
        mutation={mutation}
        checkedItems={checkedItems}
        unitInfo={unitInfo}
        PRICE_UPDATE_SUMMARY={PRICE_UPDATE_SUMMARY}
      />
    </div>
  );
};

export default PriceUpdateModal;
