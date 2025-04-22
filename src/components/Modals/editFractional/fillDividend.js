import React, {useState} from 'react';
import {Box, Text, HStack, SimpleGrid, InputGroup, Divider, Stack, Input} from '@chakra-ui/react';
import {PriceMenu} from 'pages/listings/create/WholeUnits/WholeUnits.Form';
import PeriodSelect from 'pages/listings/create/ListingDetails/ListingDetails.components/PeriodSelect';
import YearSelect from 'pages/listings/create/ListingDetails/ListingDetails.components/YearSelect';
import {DropDownComponent} from '../send_offer/components/dropDown';
import {useEffect} from 'react';
import {formatNumberWithCommas, formatToCurrency} from 'utils/formatAmount';

const formatNumberObj = {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
};
export const FillDividend = ({
  formik,
  handleAmount,
  displayDropDownDefaultName,
  customScrollbarStyle,
}) => {
  const extractDividendStartDate = startDate => {
    if (!startDate) {
      return ['', ''];
    }
    const dateArray = startDate.split(',');

    const month = dateArray[1]?.trim() ?? dateArray[0];
    const year = dateArray?.[2]?.trim() ?? formik.values.year;
    return [month, year];
  };

  const [defaultMonth, defaultYear] = extractDividendStartDate(formik.values.dividend_start_date);

  const [month, setMonth] = useState(defaultMonth);
  const [year, setYear] = useState(defaultYear);

  const dropDownArrayForDividend_payout = [
    // {
    //   name: 'Daily',
    //   value: 'daily',
    // },
    // {
    //   name: 'Weekly',
    //   value: 'weekly',
    // },
    {
      name: 'Monthly',
      value: 'monthly',
    },
    // {
    //   name: 'Quarterly',
    //   value: 'quarterly',
    // },
    {name: 'Annual', value: 'Annual'},
    {name: 'Bi-annual', value: 'Bi-annual'},
  ];

  useEffect(() => {
    if (year && month) {
      let startDate = `01, ${month}, ${year}`;
      if (month === 'Q1' || month === 'Q2' || month === 'Q3' || month === 'Q4') {
        startDate = month;
      }
      formik.setFieldValue('dividend_start_date', startDate);
      formik.setFieldValue('year', year);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [month, year]);

  return (
    <Box>
      <SimpleGrid w="full" columns={2} spacingX="33.33px" spacingY="19px">
        <Stack spacing="6px" h="fit-content">
          <Text
            as="label"
            color="#191919"
            fontSize="14px"
            lineHeight="24px"
            fontWeight="400"
            htmlFor={`dividend_amount`}
          >
            Dividend amount
          </Text>
          <InputGroup align="center" border="1px solid #E4E4E4" h="50px" borderRadius={'8px'}>
            <PriceMenu fillForNairaSvgIcon="#12D8A0" disableMenu />
            <Divider orientation="vertical" ml="4px" height="full" />

            <Input
              type="text"
              placeholder="Enter dividend amount"
              h="50px"
              border="none"
              borderRadius="8px"
              onChange={event => handleAmount(event, 'dividend_amount')}
              name={`dividend_amount`}
              value={formatNumberWithCommas(formik.values.dividend_amount, formatNumberObj)}
              _focusVisible={{
                borderColor: 'transparent',
                boxShadow: 'none',
              }}
              _focus={{
                borderColor: 'transparent',
                boxShadow: 'none',
              }}
              _active={{
                borderColor: 'transparent',
                boxShadow: 'none',
              }}
            />
          </InputGroup>
        </Stack>

        <DropDownComponent
          placeHolderText="Select"
          header={
            <Text
              as="label"
              color="#191919"
              fontSize="14px"
              fontWeight="400"
              htmlFor={`dividend_payout`}
            >
              Pay out
            </Text>
          }
          setFieldValue={formik.setFieldValue}
          fieldName={`dividend_payout`}
          dropDownArray={dropDownArrayForDividend_payout}
          defaultDropName={displayDropDownDefaultName(
            dropDownArrayForDividend_payout,
            formik.values.dividend_payout
          )}
          dropDownValue={formik.values?.dividend_payout}
          dropDownStyle={{
            menuList: {
              w: '200px',
              maxH: '200px',

              sx: customScrollbarStyle(),
            },

            btn: {
              w: 'full',
              h: '50px',
              pl: '17px',
              pr: '8.27px',
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: '400',
              border: '1px solid #E4E4E4',
            },
            wrapper: {
              spacing: '6px',
            },
          }}
        />
        <Stack spacing="6px">
          <Text color="#191919" fontWeight={'400'} fontSize="14px">
            {'Dividend commencement date'}
          </Text>

          <HStack spacing="24px" align={'center'}>
            <PeriodSelect
              defaultSelectedPeriod={defaultMonth}
              setPeriod={setMonth}
              objectKey={'start_period'}
              noQuarter
              selectStyle={{
                w: '140px',
              }}
            />
            <YearSelect
              formik={formik}
              objectKey={'start_year'}
              defaultSelectedYear={defaultYear}
              setYear={setYear}
              constructionStatus={'Pre Construction'}
              selectStyle={{
                w: '130px',
              }}
            />
          </HStack>
        </Stack>
      </SimpleGrid>
    </Box>
  );
};

export default FillDividend;
