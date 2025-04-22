import {Field} from 'formik';
import React, {useEffect, useState} from 'react';
import {
  Box,
  Text,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SimpleGrid,
  InputGroup,
  Divider,
  Stack,
} from '@chakra-ui/react';
import {TbCurrencyDollar, TbCurrencyEuro, TbCurrencyNaira} from 'react-icons/tb';
import {formatAmount} from '../../../../../../utils';
import {PriceInputWrapperStyle, PriceMenu} from 'pages/listings/create/WholeUnits/WholeUnits.Form';
import PeriodSelect from 'pages/listings/create/ListingDetails/ListingDetails.components/PeriodSelect';
import YearSelect from 'pages/listings/create/ListingDetails/ListingDetails.components/YearSelect';
import {DropDownComponent} from '@/components/Modals/send_offer/components/dropDown';

export const EnableDividend = ({props, setDividendStartDate}) => {
  const [month, setMonth] = useState(null);
  const [year, setYear] = useState(null);

  const isNull = month == null && year == null;

  const customScrollbarStyle = {
    '&::-webkit-scrollbar': {
      width: '4px',
      borderRadius: '16px',
    },
    '&::-webkit-scrollbar-track': {
      borderRadius: '16px',
      WebkitBoxShadow: `inset 0 0 6px #fff`,
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '16px',
      backgroundColor: '#cbcbcb',
    },
  };

  const dropDownArrayForDividend_payout = [
    {
      name: 'Monthly',
      value: 'monthly',
    },
    {name: 'Annual', value: 'annual'},
    {name: 'Bi-annual', value: 'bi-annual'},
  ];

  // if (!isNull) {
  //   setDividendStartDate(`01, ${month}, ${year}`);
  // }
  useEffect(() => {
    if (year && month) {
      setDividendStartDate(`01, ${month}, ${year}`);
    }
  }, [month, year, setDividendStartDate]);

  return (
    <Box>
      <Text fontSize={'24px'} color="#191919" fontWeight={500} pb={3}>
        Dividend Info
      </Text>
      <SimpleGrid w="full" columns={2} spacingX={10} spacingY={5} pb={'45px'}>
        {/* <Box>
          <label htmlFor={`property_management_company`}>Property management company</label>
          <Field
            type="text"
            placeholder="Property mgt. company..."
            className="formik__field"
            name={`property_management_company`}
          />
          {props.errors.property_management_company && (
            <div id="feedback">{props.errors.property_management_company}</div>
          )}
        </Box> */}

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

          <InputGroup
            align="center"
            border="1px solid #E4E4E4"
            py="4px"
            h="49.5px"
            borderRadius={'8px'}
          >
            <PriceMenu fillForNairaSvgIcon="#12D8A0" disableMenu />
            <Divider orientation="vertical" ml="4px" height="full" />
            <Field
              style={{
                ...PriceInputWrapperStyle,
                paddingLeft: '.85em',
                fontSize: '14px',
                fontWeight: '500',
                border: 'none',
              }}
              type="text"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              placeholder="Enter dividend amount"
              className="formik__field"
              name={`dividend_amount`}
              value={
                formatAmount(props.values.dividend_amount) == 'NaN'
                  ? ''
                  : formatAmount(props.values.dividend_amount)
              }
            />
            {props.errors.dividend_amount && (
              <div id="feedback">{props.errors.dividend_amount}</div>
            )}
          </InputGroup>
        </Stack>
        <Box>
          {/* <label htmlFor={`dividend_payout`}>Payout Type</label> */}
          {/* <Field
            as="select"
            placeholder="Choose type..."
            className="formik__field"
            name={`dividend_payout`}
          >
            <option value={'monthly'}>Monthly</option>
            <option value={'Annual'}>Annual</option>
            <option value={'Bi-annual'}>Bi-annual</option>
          </Field> */}
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
            setFieldValue={props.setFieldValue}
            fieldName={`dividend_payout`}
            dropDownArray={dropDownArrayForDividend_payout}
            defaultDropName={props.values.dividend_payout}
            dropDownValue={props.values?.dividend_payout}
            dropDownStyle={{
              menuList: {
                maxW: 'full',
                w: 'full',
                maxH: '400px',
                sx: customScrollbarStyle,
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
                textTransform: 'capitalize',
              },
              wrapper: {
                spacing: '6px',
              },
            }}
          />
        </Box>
        <Box pos={'relative'}>
          <Text ml={1} mb={3} fontWeight={'400'} fontSize="14px">
            {'Dividend commencement date'}
          </Text>

          <HStack gap="10px" align={'center'}>
            <PeriodSelect noQuarter setPeriod={setMonth} objectKey={'start_period'} />
            <YearSelect
              formik={props}
              objectKey={'start_year'}
              setYear={setYear}
              constructionStatus={'Pre Construction'}
              selectStyle={{w: '130px'}}
            />
          </HStack>
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default EnableDividend;
