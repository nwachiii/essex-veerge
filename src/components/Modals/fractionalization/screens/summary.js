import React from 'react';
import {
  FormatToColorfulCurrency,
  formatAmountWithDecimal,
  formatToCurrency,
} from 'utils/formatAmount';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Flex,
  Button,
  HStack,
  Heading,
  Stack,
  useDisclosure,
  useToast,
  Spinner,
  Text,
  Center,
  Box,
  StackDivider,
} from '@chakra-ui/react';
import BackArrowIcon from '@/components/assets/BackArrowIcon';
import {changeDateFormat} from 'utils/formatDate';
import HoverText from 'ui-lib/ui-lib.components/hoverOnText/hoverOnText';
import capitalizeFirstLetterOfWords from 'utils/capitalizeFirstLetterOfWords';

const FractionalizationSummary = ({
  formik,
  mutation,
  handleScreen,
  customScrollbarStyle,
  isBuildingTypeSingleFamilyResidential,
}) => {
  const styleHStack = {
    maxH: '63px',
    w: 'full',
    py: '20px',
    px: '16px',
    justify: 'space-between',
  };
  const totalFractions = formik.values.no_of_fractions * formik.values.quantity;

  const removeUnderscores = txt => {
    return txt?.replace(/[_\s]/g, ` `);
  };

  const displayDate = () => {
    const year = formik.values.year;
    switch (formik.values.dividend_start_date) {
      case 'Q1':
        return `Q1,${year}`;
      case 'Q2':
        return `Q2,${year}`;
      case 'Q3':
        return `Q3,${year}`;
      case 'Q4':
        return `Q4,${year}`;
      default:
        //rearrange date format for safari
        const dateString = formik.values.dividend_start_date.replace(
          /(\d+),\s*(\w+),\s*(\d+)/,
          '$2 $1, $3'
        );

        return changeDateFormat(dateString, 'monthandyear');
    }
  };
  const submitFractionalizationForm = () => {
    const {
      holding_period,
      strategy,
      dividend_payout,
      deal_structure,
      packets,
      stakeholders,
      enable_dividend,
      allow_insurance,
      bundle,
      dividend_amount,
      dividend_start_date,
      quantity,
      price_per_fraction,
    } = formik.values;

    const editedStakeHolders =
      stakeholders.length === 1 &&
      !stakeholders?.[0]?.name?.trim() &&
      !stakeholders?.[0]?.type?.trim()
        ? []
        : stakeholders;
    const formData = {
      action: 'create',
      holding_period,
      strategy,
      dividend_payout,
      deal_structure,
      packets,
      stakeholders: editedStakeHolders,
      enable_dividend,
      allow_insurance,
      bundle,
      dividend_amount,
      dividend_start_date,
      quantity,
      price_per_fraction,
    };
    return mutation.mutate(formData);
  };
  return (
    <>
      <HStack my="32px" mb="16px" px="36px" pr="18px" justifyContent="space-between" w="full">
        <HStack spacing="8px">
          <BackArrowIcon onClick={handleScreen('additionalInfo')} cursor="pointer" />

          <Heading fontSize="24px" color="#191919" fontWeight="500">
            Summary
          </Heading>
        </HStack>
        <ModalCloseButton position="initial" />
      </HStack>

      <ModalBody p="0px" minW="576px" maxW="576px" px="32px" pr="0px">
        <Stack spacing="16px" w="full">
          <Stack
            spacing="16px"
            w="full"
            maxH="420px"
            overflowY="auto"
            px="0px"
            pr="14px"
            sx={customScrollbarStyle('#cbcbcb', '#fff')}
          >
            <Stack
              spacing="none"
              h="fit-content"
              w="full"
              borderRadius="8px"
              background="#F9FAFB"
              divider={<StackDivider h="2px" bg="#F5F5F5" border="none" />}
            >
              <HStack {...styleHStack}>
                <Text textAlign="start" fontSize={'16px'} fontWeight={400} color="#3d3d3d">
                  Price per fraction
                </Text>

                <FormatToColorfulCurrency
                  amount={formik.values?.price_per_fraction}
                  decimalStyle={{color: '#919191'}}
                  mainTextStyle={{
                    fontSize: '18px',

                    fontWeight: '500',
                    color: '#191919',
                  }}
                  textAlign="end"
                />
              </HStack>
              <HStack {...styleHStack}>
                <Text textAlign="start" fontSize={'16px'} fontWeight={400} color="#3d3d3d">
                  Quantity
                </Text>
                <Text textAlign="end" fontSize={'18px'} fontWeight={400} color="#191919">
                  {formik.values.quantity}
                </Text>
              </HStack>
              <HStack {...styleHStack}>
                <Text textAlign="start" fontSize={'16px'} fontWeight={400} color="#3d3d3d">
                  Total fractions
                </Text>
                <Text textAlign="end" fontSize={'18px'} fontWeight={400} color="#191919">
                  {totalFractions}
                </Text>
              </HStack>
              <HStack {...styleHStack}>
                <Text textAlign="start" fontSize={'16px'} fontWeight={400} color="#3d3d3d">
                  Strategy
                </Text>
                <Text
                  fontSize={'18px'}
                  fontWeight={400}
                  color="#191919"
                  textAlign="end"
                  textTransform={'capitalize'}
                >
                  {removeUnderscores(formik.values.strategy)}
                </Text>
              </HStack>
              <HStack {...styleHStack}>
                <Text textAlign="start" fontSize={'16px'} fontWeight={400} color="#3d3d3d">
                  Holding period
                </Text>
                <Text textAlign="end" fontSize={'18px'} fontWeight={400} color="#191919">
                  {formik.values.holding_period}
                </Text>
              </HStack>
              <HStack {...styleHStack}>
                <Text textAlign="start" fontSize={'16px'} fontWeight={400} color="#3d3d3d">
                  Deal structure
                </Text>
                <Text
                  fontSize={'18px'}
                  fontWeight={400}
                  textAlign="end"
                  color="#191919"
                  textTransform={'capitalize'}
                >
                  {formik.values.deal_structure}
                </Text>
              </HStack>
              {formik.values.stakeholders?.length
                ? formik.values.stakeholders?.map((item, key) => (
                    <HStack key={key} {...styleHStack}>
                      <Text
                        textTransform={'capitalize'}
                        fontSize={'16px'}
                        fontWeight={400}
                        color="#3d3d3d"
                        textAlign="start"
                      >
                        {removeUnderscores(item?.type)}
                      </Text>
                      <Text fontSize={'18px'} textAlign="end" fontWeight={400} color="#191919">
                        {item?.name}
                      </Text>
                    </HStack>
                  ))
                : null}
            </Stack>
            {formik.values?.enable_dividend == false ? null : (
              <HStack
                maxH="88px"
                justify={'space-between'}
                w="full"
                py="20px"
                px="24px"
                borderRadius="8px"
                background="#F9FAFB"
                align="start"
              >
                <Stack spacing="10px">
                  <Text fontSize={'12px'} fontWeight="400" color="#606060">
                    Dividend payout type
                  </Text>
                  <Text fontSize={'16px'} fontWeight={500} color="#191919">
                    {capitalizeFirstLetterOfWords(formik.values?.dividend_payout)}
                  </Text>
                </Stack>
                <Stack spacing="10px">
                  <Text fontSize={'12px'} fontWeight="400" color="#606060">
                    Dividend Amount
                  </Text>

                  <FormatToColorfulCurrency
                    amount={formik.values?.dividend_amount}
                    decimalStyle={{color: '#919191'}}
                    mainTextStyle={{fontSize: '16px', fontWeight: '500', color: '#191919'}}
                  />
                </Stack>
                <Stack spacing="10px">
                  <Text fontSize={'12px'} color="#606060">
                    Dividend commencement date
                  </Text>
                  <Text fontSize={'16px'} fontWeight={500} color="#191919">
                    {displayDate()}
                  </Text>
                </Stack>
              </HStack>
            )}
          </Stack>
          <Flex justify={'flex-end'} pr="8px" pb="32px" w="full">
            <Button
              h="48px"
              px="63.85px"
              variant="md-filled-radius"
              onClick={submitFractionalizationForm}
              isDisabled={mutation.isLoading}
              isLoading={mutation.isLoading}
              fontSize="15.961px"
              fontWeight="400"
              color="#ffffff"
              // borderRadius="10px"
              bg="#242526"
              _hover={{
                opacity: '1',
              }}
              _active={{
                opacity: '1',
              }}
              _focus={{
                opacity: '1',
              }}
            >
              Proceed
            </Button>
          </Flex>
        </Stack>
      </ModalBody>
    </>
  );
};

export default FractionalizationSummary;
