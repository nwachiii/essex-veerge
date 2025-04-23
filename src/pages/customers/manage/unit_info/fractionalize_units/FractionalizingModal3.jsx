/* eslint-disable react-hooks/exhaustive-deps */
import {
  Image,
  SimpleGrid,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tr,
  HStack,
  Flex,
  Stack,
  Box,
} from '@chakra-ui/react';
import {formatAmount, formatAmountWithDecimal} from '../../../../../utils';
import allianzLogo from '/src/images/brand/allianz-logo 1.svg';
import {Button, Popup} from '../../../../../ui-lib/ui-lib.components';
import BackArrowIcon from '@/components/assets/BackArrowIcon';
import {IoMdCloseCircleOutline} from 'react-icons/io';
import {FcCancel} from 'react-icons/fc';
import {BiCross} from 'react-icons/bi';
import {RxCross2} from 'react-icons/rx';
import {useEffect} from 'react';

export const FractionalizingModal3 = ({
  mutation,
  totalFractions,
  FRACTIONALIZE_MODAL3,
  FRACTIONALIZE_MODAL2,
  FORM_BODY,
}) => {
  const handleBack = () => {
    FRACTIONALIZE_MODAL2.onOpen();
    FRACTIONALIZE_MODAL3.onClose();
  };
  // console.log(FORM_BODY);
  const handleSubmitAllFractionsPayload = () => {
    mutation.mutate({...FORM_BODY});
  };

  const STAKEHOLDERS = FORM_BODY?.stakeholders?.length > 0 ? FORM_BODY?.stakeholders : [];

  const styleHStack = {
    h: '63px',
    w: 'full',
    py: '20px',

    justify: 'space-between',
    borderBottom: '1px solid #F5F5F5',
  };

  const removeUnderscores = txt => {
    return txt?.replace(/[_\s]/g, ` `);
  };

  const customScrollbarStyle = {
    '&::-webkit-scrollbar': {
      width: '4px',
      borderRadius: '16px',
    },
    '&::-webkit-scrollbar-track': {
      borderRadius: '16px',
      WebkitBoxShadow: 'inset 0 0 6px #cbcbcb',
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '16px',
      backgroundColor: '#fff',

      //   outline: '1px solid slategrey', // You can include this line if needed
    },
  };

  useEffect(() => {
    FRACTIONALIZE_MODAL2.onClose();
  }, []);

  return (
    <div>
      <Popup
        // overflowX="hidden"

        pt="32px"
        pb="22px"
        px="32px"
        pr="28px"
        hideCloseBtn
        color="#191919"
        minW={{base: '90%', md: '594px'}}
        maxW="594px"
        isOpen={FRACTIONALIZE_MODAL3.isOpen}
        overlayStyle={{
          bg: 'rgba(0,0,0,0.4)',
        }}
        onClose={FRACTIONALIZE_MODAL3.onClose}
        mt="15vh"
      >
        <Flex w="full" align="center" mb="16px" justify={'space-between'}>
          <HStack spacing="10px">
            <BackArrowIcon onClick={handleBack} />
            <Text fontSize="24px" fontWeight={500}>
              Summary
            </Text>
          </HStack>
          <RxCross2 style={{cursor: 'pointer'}} onClick={FRACTIONALIZE_MODAL3.onClose} />
        </Flex>
        <Popup.Body p="0px" my="0px" spacing="16px">
          <Stack overflowY="auto" w="full" maxH="420px" pr="4px" sx={customScrollbarStyle}>
            <Stack h="fit-content" w="full" px="32px" borderRadius="8px" background="#F9FAFB">
              <HStack {...styleHStack}>
                <Text>Price per fraction</Text>
                <Text fontSize={'18px'} fontWeight={600}>
                  {formatAmountWithDecimal(FORM_BODY.price_per_fraction)}
                </Text>
              </HStack>
              <HStack {...styleHStack}>
                <Text>Quantity</Text>
                <Text fontSize={'18px'}>{FORM_BODY.quantity}</Text>
              </HStack>
              <HStack {...styleHStack}>
                <Text>Total fractions</Text>
                <Text fontSize={'18px'}>{totalFractions}</Text>
              </HStack>
              <HStack {...styleHStack}>
                <Text>Strategy</Text>
                <Text fontSize={'18px'} textTransform={'capitalize'}>
                  {removeUnderscores(FORM_BODY.strategy)}
                </Text>
              </HStack>
              <HStack {...styleHStack}>
                <Text>Holding period</Text>
                <Text fontSize={'18px'}>{FORM_BODY.holding_period}</Text>
              </HStack>
              <HStack {...styleHStack}>
                <Text>Deal structure</Text>
                <Text fontSize={'18px'} textTransform={'capitalize'}>
                  {FORM_BODY.deal_structure}
                </Text>
              </HStack>
              {STAKEHOLDERS?.length
                ? STAKEHOLDERS?.map((item, key) => (
                    <HStack key={key} {...styleHStack}>
                      <Text textTransform={'capitalize'}>{removeUnderscores(item?.type)}</Text>
                      <Text fontSize={'18px'}>{item?.name}</Text>
                    </HStack>
                  ))
                : null}
            </Stack>
            {FORM_BODY?.enable_dividend == false ? null : (
              <Stack
                maxH="88px"
                w="full"
                py="20px"
                px="32px"
                borderRadius="8px"
                background="#F9FAFB"
                mt="16px"
              >
                <Flex justify={'space-between'} w="full">
                  <Box>
                    <Text fontSize={'12px'} color="#606060">
                      Dividend payout type
                    </Text>
                    <Text fontSize={'18px'} fontWeight={600}>
                      {FORM_BODY?.dividend_payout}
                    </Text>
                  </Box>
                  <Box>
                    <Text fontSize={'12px'} color="#606060">
                      Dividend Amount
                    </Text>
                    <Text fontSize={'18px'} fontWeight={600}>
                      {formatAmountWithDecimal(FORM_BODY?.dividend_amount)}
                    </Text>
                  </Box>
                  <Box>
                    <Text fontSize={'12px'} color="#606060">
                      Dividend commencement date
                    </Text>
                    <Text fontSize={'18px'} fontWeight={600}>
                      {FORM_BODY?.dividend_start_date?.slice(4)}
                    </Text>
                  </Box>
                </Flex>
              </Stack>
            )}
          </Stack>
          <Button
            onClick={handleSubmitAllFractionsPayload}
            isDisabled={mutation?.isLoading}
            _focusVisible={{
              boxShadow: 'none',
              border: 'none',
            }}
            type="submit"
            variant="dark"
            mt="0px"
            alignSelf="end"
            borderRadius="72px"
            h="55px"
            w="177px"
            mb="1px"
            isLoading={mutation?.isLoading}
          >
            Proceed
          </Button>
        </Popup.Body>
      </Popup>
    </div>
  );
};
export default FractionalizingModal3;
