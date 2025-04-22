import {HStack, Text} from '@chakra-ui/react';
import countries from 'constants/auth/country';
import React from 'react';
import HoverText from 'ui-lib/ui-lib.components/hoverOnText/hoverOnText';

export const formatAmount = str => {
  return str && typeof str == 'string'
    ? `${Number(str?.replace(/\,/g, '')).toLocaleString('en-US')}`
    : Number(str?.toString()?.replace(/\,/g, '')).toLocaleString('en-US') == 'NaN' || str == ''
      ? ''
      : `${Number.parseFloat(str?.toString()?.replace(/\,/g, '')).toLocaleString('en-US')}`;
};

export const abbrevNum = value => {
  if (value === null || value === undefined || isNaN(value) || value === 0) return value;

  const suffixes = ['', 'K', 'M', 'B', 'T'];
  let tier = Math.floor(Math.log10(Math.abs(value)) / 3);

  if (tier === 0) return value.toString();

  tier = Math.min(tier, suffixes.length - 1);

  const scaled = value / Math.pow(10, tier * 3);
  const formatted = scaled.toFixed(1);
  console.log({value, formatted, tier});

  return `${formatted}${suffixes[tier]}`;
};

// export const formatAmount = input => {
//   // Check if the input is null, undefined, or an empty string, and return "0.00" in such cases
//   if (input === null || input === undefined || input === '') {
//     return '0.00';
//   }

//   // Convert the input to a string if it's not already one
//   let str = typeof input === 'string' ? input : input.toString();

//   // Remove any commas and convert the string to a number
//   const number = parseFloat(str.replace(/,/g, ''));

//   // Check if the conversion results in a valid number
//   if (isNaN(number)) {
//     return '0.00';
//   }

//   // Format the number as a US currency string without the currency symbol
//   return number.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
// };

export const formatAmountInputs = (inputValue, cursorPosition) => {
  // Remove non-numeric characters
  let plainNumber = inputValue.replace(/[^0-9]/g, '');

  // Format the number with commas
  let formattedNumber = plainNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  // Calculate the difference in length between the new and old value
  let diff = formattedNumber.length - inputValue.length;

  return {
    formattedValue: formattedNumber,
    newCursorPosition: cursorPosition + diff,
  };
};

export const updateAmountInputChange = (e, setState) => {
  let cursorPosition = e.target.selectionStart;
  const inputElement = e.target;

  const {formattedValue, newCursorPosition} = formatAmountInputs(e.target.value, cursorPosition);

  // Your state setter comes in here
  setState(formattedValue);

  // Use a timeout to ensure the cursor position is updated after the state change is applied
  setTimeout(() => {
    inputElement.setSelectionRange(newCursorPosition, newCursorPosition);
  }, 0);
};

export const formatAmountWithDecimal = (amount, symb) => {
  // const formattedAmount = Number(arg).toFixed(2).toString();

  if (typeof window === 'undefined') return;
  const defaultCurrency =
    localStorage.getItem('baseCurrency') !== 'undefined' && localStorage.getItem('baseCurrency')
      ? localStorage.getItem('baseCurrency')
      : 'USD';

  const defaultCountry =
    localStorage.getItem('baseCountry') !== 'undefined' && localStorage.getItem('baseCurrency')
      ? localStorage.getItem('baseCountry')
      : 'United States Of America';
  const defaultLocale = countries.find(item => item.name === defaultCountry)?.locale || 'en-US';
  const formatCurrency = value => {
    const formatter = new Intl.NumberFormat(defaultLocale, {
      style: 'currency',
      currency: defaultCurrency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    const parts = formatter.formatToParts(value);
    let result = [];
    parts.forEach(item => {
      if (item.type === 'currency') {
        result[0] = item.value;
      } else if (item.type === 'integer' || item.type === 'group') {
        result[1] = item.value;
      }
    });

    let integerPart = `${result[0]}${result[1]}`;

    const decimalPart = parts.find(part => part.type === 'fraction')?.value || '00';
    const decimalSeparator = parts.find(part => part.type === 'decimal')?.value || '.';

    let formattedString = formatter.format(value);

    return [integerPart, decimalPart, decimalSeparator, formattedString];
  };
  const escapeRegExp = string => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  };

  try {
    const formattedAmount =
      amount && typeof amount === 'string'
        ? Number(amount.replace(/\,/g, ''))
        : Number(amount?.toString()?.replace(/\,/g, ''));
    if (isNaN(formattedAmount)) throw new Error('Invalid amount');

    const [integerPart, decimalPart, decimalSeparator, formattedString] =
      formatCurrency(formattedAmount);

    const separatorRegex = new RegExp(`(${escapeRegExp(decimalSeparator)}\\d{2})`);
    const parts = formattedString.split(separatorRegex).filter(Boolean);
    const decimalSeparatorRegex = new RegExp(`^${escapeRegExp(decimalSeparator)}\\d{2}$`);

    return (
      <Text whiteSpace={'nowrap'}>
        {parts.map((part, index) => {
          if (decimalSeparatorRegex.test(part)) {
            return (
              <Text key={index} as="span" color="lightgrey">
                {part}
              </Text>
            );
          } else {
            return <React.Fragment key={index}>{part}</React.Fragment>;
          }
        })}
      </Text>
    );
  } catch (error) {
    console.log(error);
    const [integerPart, decimalPart, decimalSeparator, formattedString] = formatCurrency(0);

    const separatorRegex = new RegExp(`(${escapeRegExp(decimalSeparator)}\\d{2})`);
    const parts = formattedString.split(separatorRegex).filter(Boolean);
    const decimalSeparatorRegex = new RegExp(`^${escapeRegExp(decimalSeparator)}\\d{2}$`);

    return (
      <Text whiteSpace={'nowrap'}>
        {parts.map((part, index) => {
          if (decimalSeparatorRegex.test(part)) {
            return (
              <Text key={index} as="span" color="lightgrey">
                {part}
              </Text>
            );
          } else {
            return <React.Fragment key={index}>{part}</React.Fragment>;
          }
        })}
      </Text>
    );
  }
};

export const formatNumberWithCommas = (prop, options = {}) => {
  const number = parseFloat(prop);

  if (!isNaN(number) && isFinite(number)) {
    return number.toLocaleString('en-US', options);
  }
  return '';
};

export const formatToCurrency = (amount, curr) => {
  if (typeof window === 'undefined') return;
  const defaultCurrency =
    curr ||
    (localStorage.getItem('baseCurrency') !== 'undefined' && localStorage.getItem('baseCurrency'))
      ? localStorage.getItem('baseCurrency')
      : 'USD';

  const defaultCountry =
    localStorage.getItem('baseCountry') !== 'undefined' && localStorage.getItem('baseCurrency')
      ? localStorage.getItem('baseCountry')
      : 'United States Of America';
  const locale = countries.find(item => item.name === defaultCountry)?.locale || 'en-US';

  try {
    const formattedAmount =
      amount && typeof amount === 'string'
        ? Number(amount.replace(/\,/g, ''))
        : Number(amount?.toString()?.replace(/\,/g, ''));

    let formattedString = formattedAmount.toLocaleString(locale, {
      style: 'currency',
      currency: defaultCurrency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    if (formattedString.includes('NaN')) {
      throw new Error('-');
    }
    return formattedString;
  } catch (error) {
    console.error(error);
    return '-';
  }
};

export const FormatToColorfulCurrency = ({
  amount,
  curr = 'naira',
  decimalStyle,
  condition,
  excludeCurrency,
  wrapper,
  lens = 17,
  fontSize,
  fontWeight,
  lineHeight,
  ...rest
}) => {
  if (typeof window === 'undefined') return;
  const defaultCurrency =
    localStorage.getItem('baseCurrency') !== 'undefined' && localStorage.getItem('baseCurrency')
      ? localStorage.getItem('baseCurrency')
      : 'USD';

  const defaultCountry =
    localStorage.getItem('baseCountry') !== 'undefined' && localStorage.getItem('baseCurrency')
      ? localStorage.getItem('baseCountry')
      : 'United States Of America';
  const locale = countries.find(item => item.name === defaultCountry)?.locale || 'en-US';
  const formatCurrency = value => {
    const formatter = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: defaultCurrency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    const parts = formatter.formatToParts(value);
    let result = [];
    parts.forEach(item => {
      if (item.type === 'currency') {
        result[0] = item.value;
      } else if (item.type === 'integer' || item.type === 'group') {
        result[1] = item.value;
      }
    });

    let integerPart = `${result[0]}${result[1]}`;

    const decimalPart = parts.find(part => part.type === 'fraction')?.value || '00';
    const decimalSeparator = parts.find(part => part.type === 'decimal')?.value || '.';

    let formattedString = formatter.format(value);
    // if (condition !== 'no space') {
    //   formattedString = formattedString.replace(/(\D)(\d)/, '$1 $2');
    //   integerPart = integerPart.replace(/(\D)(\d)/, '$1 $2');
    // }
    if (excludeCurrency) {
      formattedString = formattedString.replace(/^[^\d]+/, '').trim();
      integerPart = integerPart.replace(/^[^\d]+/, '').trim();
    }

    return [integerPart, decimalPart, decimalSeparator, formattedString];
  };
  const escapeRegExp = string => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  };

  try {
    const formattedAmount =
      amount && typeof amount === 'string'
        ? Number(amount.replace(/\,/g, ''))
        : Number(amount?.toString()?.replace(/\,/g, ''));
    if (isNaN(formattedAmount)) throw new Error('Invalid amount');

    const [integerPart, decimalPart, decimalSeparator, formattedString] =
      formatCurrency(formattedAmount);

    const separatorRegex = new RegExp(`(${escapeRegExp(decimalSeparator)}\\d{2})`);
    const parts = formattedString.split(separatorRegex).filter(Boolean);
    const decimalSeparatorRegex = new RegExp(`^${escapeRegExp(decimalSeparator)}\\d{2}$`);
    return (
      <HStack alignItems="center" spacing="none" {...wrapper}>
        <HoverText
          text={formattedString.length > lens ? formattedString : parts?.[0]}
          lens={lens}
          as="span"
          pr="0px"
          fontSize={fontSize}
          fontWeight={fontWeight}
          lineHeight={lineHeight}
          {...rest}
        />
        {formattedString.length > lens ? null : (
          <Text
            as="span"
            color="lightgrey"
            fontSize={fontSize}
            fontWeight={fontWeight}
            lineHeight={lineHeight}
            {...decimalStyle}
          >
            {parts?.[1]}
          </Text>
        )}
      </HStack>
    );
  } catch (error) {
    const [integerPart, decimalPart, decimalSeparator, formattedString] = formatCurrency(0);

    const separatorRegex = new RegExp(`(${escapeRegExp(decimalSeparator)}\\d{2})`);
    const parts = formattedString.split(separatorRegex).filter(Boolean);
    const decimalSeparatorRegex = new RegExp(`^${escapeRegExp(decimalSeparator)}\\d{2}$`);

    console.log({amount, error, parts}, formatCurrency(0));

    return (
      <Text fontSize={fontSize} fontWeight={fontWeight} lineHeight={lineHeight} {...rest}>
        {parts.map((part, index) => {
          if (decimalSeparatorRegex.test(part)) {
            return (
              <Text
                key={index}
                as="span"
                color="lightgrey"
                fontSize={fontSize}
                fontWeight={fontWeight}
                lineHeight={lineHeight}
                {...decimalStyle}
              >
                {part}
              </Text>
            );
          } else {
            return (
              <Text key={index} as="span">
                {part}
              </Text>
            );
          }
        })}
      </Text>
    );
  }
};

export const FormatToColorfulAdaptiveCurrency = ({
  amount,
  curr = 'naira',
  decimalStyle,
  condition,
  excludeCurrency,
  wrapper,
  lens = 17,
  baseSize = 24,
  minSize = 12,
  maxSize = 36,
  pow = 0.9,
  ...rest
}) => {
  if (typeof window === 'undefined') return;
  const defaultCurrency =
    localStorage.getItem('baseCurrency') !== 'undefined' && localStorage.getItem('baseCurrency')
      ? localStorage.getItem('baseCurrency')
      : 'USD';

  const defaultCountry =
    localStorage.getItem('baseCountry') !== 'undefined' && localStorage.getItem('baseCurrency')
      ? localStorage.getItem('baseCountry')
      : 'United States Of America';
  const defaultLocale = countries.find(item => item.name === defaultCountry)?.locale || 'en-US';
  const formatCurrency = value => {
    const formatter = new Intl.NumberFormat(defaultLocale, {
      style: 'currency',
      currency: defaultCurrency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    const parts = formatter.formatToParts(value);
    let result = [];
    parts.forEach(item => {
      if (item.type === 'currency') {
        result[0] = item.value;
      } else if (item.type === 'integer' || item.type === 'group') {
        result[1] = item.value;
      }
    });

    let integerPart = `${result[0]}${result[1]}`;

    const decimalPart = parts.find(part => part.type === 'fraction')?.value || '00';
    const decimalSeparator = parts.find(part => part.type === 'decimal')?.value || '.';

    let formattedString = formatter.format(value);
    // if (condition !== 'no space') {
    //   formattedString = formattedString.replace(/(\D)(\d)/, '$1 $2');
    //   integerPart = integerPart.replace(/(\D)(\d)/, '$1 $2');
    // }
    if (excludeCurrency) {
      formattedString = formattedString.replace(/^[^\d]+/, '').trim();
      integerPart = integerPart.replace(/^[^\d]+/, '').trim();
    }

    return [integerPart, decimalPart, decimalSeparator, formattedString];
  };
  const escapeRegExp = string => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  };

  try {
    const formattedAmount =
      amount && typeof amount === 'string'
        ? Number(amount.replace(/\,/g, ''))
        : Number(amount?.toString()?.replace(/\,/g, ''));
    if (isNaN(formattedAmount)) throw new Error('Invalid amount');

    const [integerPart, decimalPart, decimalSeparator, formattedString] =
      formatCurrency(formattedAmount);
    const dynamicFontSize = Math.min(
      Math.max(minSize, baseSize * Math.pow(pow, formattedString.length - lens)),
      maxSize
    );

    const separatorRegex = new RegExp(`(${escapeRegExp(decimalSeparator)}\\d{2})`);
    const parts = formattedString.split(separatorRegex).filter(Boolean);
    const decimalSeparatorRegex = new RegExp(`^${escapeRegExp(decimalSeparator)}\\d{2}$`);

    return (
      <HStack spacing="none" {...wrapper}>
        <Text as="span" fontSize={`${dynamicFontSize}px`} fontWeight="bold" {...rest}>
          {parts.map((part, index) => {
            if (decimalSeparatorRegex.test(part)) {
              return (
                <Text
                  key={index}
                  as="span"
                  color="lightgrey"
                  fontSize={`${dynamicFontSize}px`}
                  {...decimalStyle}
                >
                  {part}
                </Text>
              );
            } else {
              return (
                <Text
                  key={index}
                  as="span"
                  fontSize={`${dynamicFontSize}px`}
                  fontWeight="bold"
                  {...rest}
                >
                  {part}
                </Text>
              );
            }
          })}
        </Text>
      </HStack>
    );
  } catch (error) {
    console.log(error);
    const [integerPart, decimalPart, decimalSeparator, formattedString] = formatCurrency(0);
    const dynamicFontSize = Math.min(
      Math.max(minSize, baseSize * Math.pow(pow, formattedString.length - lens)),
      maxSize
    );

    const separatorRegex = new RegExp(`(${escapeRegExp(decimalSeparator)}\\d{2})`);
    const parts = formattedString.split(separatorRegex).filter(Boolean);
    const decimalSeparatorRegex = new RegExp(`^${escapeRegExp(decimalSeparator)}\\d{2}$`);

    return (
      <HStack spacing="none" {...wrapper}>
        <Text as="span" fontSize={`${dynamicFontSize}px`} fontWeight="bold" {...rest}>
          {parts.map((part, index) => {
            if (decimalSeparatorRegex.test(part)) {
              return (
                <Text
                  key={index}
                  as="span"
                  color="lightgrey"
                  fontSize={`${dynamicFontSize}px`}
                  {...decimalStyle}
                >
                  {part}
                </Text>
              );
            } else {
              return (
                <Text
                  key={index}
                  as="span"
                  fontSize={`${dynamicFontSize}px`}
                  fontWeight="bold"
                  {...rest}
                >
                  {part}
                </Text>
              );
            }
          })}
        </Text>
      </HStack>
    );
  }
};

export const priceString = (curr, amount, option) => {
  if (typeof window === 'undefined') return;
  const defaultCurrency =
    localStorage.getItem('baseCurrency') !== 'undefined' && localStorage.getItem('baseCurrency')
      ? localStorage.getItem('baseCurrency')
      : 'USD';

  const defaultCountry =
    localStorage.getItem('baseCountry') !== 'undefined' && localStorage.getItem('baseCurrency')
      ? localStorage.getItem('baseCountry')
      : 'United States Of America';
  const locale = countries.find(item => item.name === defaultCountry)?.locale || 'en-US';

  try {
    const formattedAmount =
      amount && typeof amount === 'string'
        ? Number(amount.replace(/\,/g, ''))
        : Number(amount?.toString()?.replace(/\,/g, ''));

    let formattedString = formattedAmount.toLocaleString(locale, {
      style: 'currency',
      currency: defaultCurrency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    if (formattedString.includes('NaN')) {
      throw new Error('-');
    }
    return formattedString;
  } catch (error) {
    return '-';
  }
};

export const formatNumAbbrev = amount => {
  if (amount >= 1000000) {
    return (amount % 1000000 === 0 ? amount / 1000000 : (amount / 1000000).toFixed(1)) + 'M';
  } else if (amount >= 1000) {
    return (amount % 1000 === 0 ? amount / 1000 : (amount / 1000).toFixed(1)) + 'K';
  } else {
    return amount.toString();
  }
};

/**
 * legacy format file
 */

// import {HStack, Text} from '@chakra-ui/react';
// import countries from 'constants/auth/country';
// import HoverText from 'ui-lib/ui-lib.components/hoverOnText/hoverOnText';

// export const formatAmount = str => {
//   return str && typeof str == 'string'
//     ? `${Number(str?.replace(/\,/g, '')).toLocaleString('en-US')}`
//     : Number(str?.toString()?.replace(/\,/g, '')).toLocaleString('en-US') == 'NaN' || str == ''
//       ? ''
//       : `${Number.parseFloat(str?.toString()?.replace(/\,/g, '')).toLocaleString('en-US')}`;
// };

// export const abbrevNum = value => {
//   if (value === null || value === undefined || isNaN(value) || value === 0) return value;

//   const suffixes = ['', 'K', 'M', 'B', 'T'];
//   let tier = Math.floor(Math.log10(Math.abs(value)) / 3);

//   if (tier === 0) return value.toString();

//   tier = Math.min(tier, suffixes.length - 1);

//   const scaled = value / Math.pow(10, tier * 3);
//   const formatted = scaled.toFixed(1);
//   console.log({value, formatted, tier});

//   return `${formatted}${suffixes[tier]}`;
// };

// // export const formatAmount = input => {
// //   // Check if the input is null, undefined, or an empty string, and return "0.00" in such cases
// //   if (input === null || input === undefined || input === '') {
// //     return '0.00';
// //   }

// //   // Convert the input to a string if it's not already one
// //   let str = typeof input === 'string' ? input : input.toString();

// //   // Remove any commas and convert the string to a number
// //   const number = parseFloat(str.replace(/,/g, ''));

// //   // Check if the conversion results in a valid number
// //   if (isNaN(number)) {
// //     return '0.00';
// //   }

// //   // Format the number as a US currency string without the currency symbol
// //   return number.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
// // };

// export const formatAmountInputs = (inputValue, cursorPosition) => {
//   // Remove non-numeric characters
//   let plainNumber = inputValue.replace(/[^0-9]/g, '');

//   // Format the number with commas
//   let formattedNumber = plainNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

//   // Calculate the difference in length between the new and old value
//   let diff = formattedNumber.length - inputValue.length;

//   return {
//     formattedValue: formattedNumber,
//     newCursorPosition: cursorPosition + diff,
//   };
// };

// export const updateAmountInputChange = (e, setState) => {
//   let cursorPosition = e.target.selectionStart;
//   const inputElement = e.target;

//   const {formattedValue, newCursorPosition} = formatAmountInputs(e.target.value, cursorPosition);

//   // Your state setter comes in here
//   setState(formattedValue);

//   // Use a timeout to ensure the cursor position is updated after the state change is applied
//   setTimeout(() => {
//     inputElement.setSelectionRange(newCursorPosition, newCursorPosition);
//   }, 0);
// };

// export const formatAmountWithDecimal = (arg, symb) => {
//   const formattedAmount = Number(arg).toFixed(2).toString();

//   if (typeof window === 'undefined') return;
//   const defaultCurrency = localStorage.getItem('baseCurrency') || 'USD';
//   const defaultCountry = localStorage.getItem('baseCountry') || 'United States Of America';
//   const locale = countries.find(item => item.name === defaultCountry)?.locale;

//   let [whole, decimal] = formattedAmount.split('.');
//   let result = decimal
//     ? [
//         Number(whole).toLocaleString(locale, {
//           currency: defaultCurrency,
//           style: 'currency',
//           minimumFractionDigits: 0,
//           maximumFractionDigits: 0,
//         }),
//         decimal,
//       ].join('.')
//     : Number(whole).toLocaleString(locale, {
//         currency: defaultCurrency,
//         style: 'currency',
//         minimumFractionDigits: 0,
//         maximumFractionDigits: 0,
//       });

//   return (
//     <Text whiteSpace={'nowrap'}>
//       {`

//       ${result.toString().slice(0, -3)}`}
//       <Text as="span" color="lightgrey">
//         {result.toString().slice(-3)}
//       </Text>
//     </Text>
//   );
// };

// export const formatNumberWithCommas = (prop, options = {}) => {
//   const number = parseFloat(prop);

//   if (!isNaN(number) && isFinite(number)) {
//     console.log({prop, number, options}, number.toLocaleString('en-US'));
//     return number.toLocaleString('en-US', options);
//   }
//   return '';
// };

// export const formatToCurrency = (amount, curr = 'naira', condition, excludeCurrency) => {
//   const currency = {
//     naira: ['en-NG', 'NGN'],
//     dollar: ['en-US', 'USD'],
//     pound: ['en-GB', 'GBP'],
//     yen: ['ja-JP', 'JPY'],
//     canadianDollar: ['en-CA', 'CAD'],
//   };

//   if (typeof window === 'undefined') return;
//   const defaultCurrency = localStorage.getItem('baseCurrency') || 'USD';
//   const defaultCountry = localStorage.getItem('baseCountry') || 'United States Of America';
//   const locale = countries.find(item => item.name === defaultCountry)?.locale;
//   console.log({defaultCountry, defaultCurrency, locale, countries});
//   try {
//     const formattedAmount =
//       amount && typeof amount === 'string'
//         ? Number(amount.replace(/\,/g, ''))
//         : Number(amount?.toString()?.replace(/\,/g, ''));
//     let formattedString = formattedAmount.toLocaleString(locale, {
//       style: 'currency',
//       currency: defaultCurrency,
//       minimumFractionDigits: 2,
//       maximumFractionDigits: 2,
//     });

//     // Add space if condition is not 'no space'
//     if (condition !== 'no space') {
//       formattedString = formattedString.replace(/(.)(.*)/, '$1 $2');
//     }
//     if (excludeCurrency) {
//       // If excludeCurrency is true, remove currency symbol using regex
//       formattedString = formattedString.substring(1).trim();
//     }
//     if (formattedString.includes('NaN')) {
//       throw new Error('-');
//     }
//     return formattedString;
//   } catch (error) {
//     console.error(error);
//     return '-';
//   }
// };

// export const FormatToColorfulCurrency = ({
//   amount,
//   curr = 'naira',
//   decimalStyle,
//   condition,
//   excludeCurrency,
//   wrapper,
//   lens = 17,
//   fontSize,
//   fontWeight,
//   lineHeight,
//   ...rest
// }) => {
//   const currency = {
//     naira: ['en-NG', 'NGN'],
//     dollar: ['en-US', 'USD'],
//     pound: ['en-GB', 'GBP'],
//     yen: ['ja-JP', 'JPY'],
//     canadianDollar: ['en-CA', 'CAD'],
//   };
//   if (typeof window === 'undefined') return;
//   const defaultCurrency = localStorage.getItem('baseCurrency') || 'USD';
//   const defaultCountry = localStorage.getItem('baseCountry') || 'United States Of America';
//   const locale = countries.find(item => item.name === defaultCountry)?.locale;
//   try {
//     const formattedAmount =
//       amount && typeof amount === 'string'
//         ? Number(amount.replace(/\,/g, ''))
//         : Number(amount?.toString()?.replace(/\,/g, ''));
//     let formattedString = formattedAmount.toLocaleString(locale, {
//       style: 'currency',
//       currency: defaultCurrency,
//       minimumFractionDigits: 2,
//       maximumFractionDigits: 2,
//     });

//     // Add space if condition is not 'no space'
//     if (condition !== 'no space') {
//       formattedString = formattedString.replace(/(.)(.*)/, '$1 $2');
//     }
//     if (excludeCurrency) {
//       // If excludeCurrency is true, remove currency symbol using regex
//       formattedString = formattedString.substring(1).trim();
//     }

//     const [integerPart, decimalPart] = formattedString.split('.');
//     if (formattedString.includes('NaN')) {
//       throw new Error('-');
//     }
//     return (
//       <HStack spacing="none" {...wrapper}>
//         <HoverText
//           text={formattedString.length > lens ? formattedString : integerPart}
//           lens={lens}
//           as="span"
//           pr="0px"
//           fontSize={fontSize}
//           fontWeight={fontWeight}
//           lineHeight={lineHeight}
//           {...rest}
//         />
//         {formattedString.length > lens ? null : (
//           <Text
//             as="span"
//             color="lightgrey"
//             fontSize={fontSize}
//             fontWeight={fontWeight}
//             lineHeight={lineHeight}
//             {...decimalStyle}
//           >
//             .{decimalPart}
//           </Text>
//         )}
//       </HStack>
//     );
//   } catch (error) {
//     return (
//       <Text fontSize={fontSize} fontWeight={fontWeight} lineHeight={lineHeight} {...rest}>
//         <Text as="span">₦0</Text>
//         <Text
//           as="span"
//           color="lightgrey"
//           fontSize={fontSize}
//           fontWeight={fontWeight}
//           lineHeight={lineHeight}
//           {...decimalStyle}
//         >
//           .00
//         </Text>
//       </Text>
//     );
//   }
// };

// export const FormatToColorfulAdaptiveCurrency = ({
//   amount,
//   curr = 'naira',
//   decimalStyle,
//   condition,
//   excludeCurrency,
//   wrapper,
//   lens = 17,
//   baseSize = 24, // base fontSize
//   minSize = 12,
//   maxSize = 36,
//   pow = 0.9,
//   ...rest
// }) => {
//   const currency = {
//     naira: ['en-NG', 'NGN'],
//     dollar: ['en-US', 'USD'],
//     pound: ['en-GB', 'GBP'],
//     yen: ['ja-JP', 'JPY'],
//     canadianDollar: ['en-CA', 'CAD'],
//   };
//   if (typeof window === 'undefined') return;
//   const defaultCurrency = localStorage.getItem('baseCurrency') || 'USD';
//   const defaultCountry = localStorage.getItem('baseCountry') || 'United States Of America';
//   const locale = countries.find(item => item.name === defaultCountry)?.locale || 'en-US';
//   try {
//     const formattedAmount =
//       amount && typeof amount === 'string'
//         ? Number(amount.replace(/\,/g, ''))
//         : Number(amount?.toString()?.replace(/\,/g, ''));

//     let formattedString = formattedAmount.toLocaleString(locale, {
//       style: 'currency',
//       currency: defaultCurrency,
//       minimumFractionDigits: 2,
//       maximumFractionDigits: 2,
//     });

//     if (condition !== 'no space') {
//       formattedString = formattedString.replace(/(.)(.*)/, '$1 $2');
//     }

//     if (excludeCurrency) {
//       formattedString = formattedString.substring(1).trim();
//     }

//     const [integerPart, decimalPart] = formattedString.split('.');

//     if (formattedString.includes('NaN')) {
//       throw new Error('-');
//     }

//     const dynamicFontSize = Math.min(
//       Math.max(minSize, baseSize * Math.pow(pow, formattedString.length - lens)),
//       maxSize
//     );
//     // formattedString.length > lens
//     //   ? Math.max(minSize, baseSize * Math.pow(pow, formattedString.length - lens))
//     //   : maxSize;

//     return (
//       <HStack spacing="none" {...wrapper}>
//         <Text as="span" fontSize={`${dynamicFontSize}px`} fontWeight="bold" {...rest}>
//           {integerPart}
//         </Text>
//         {
//           <Text as="span" color="lightgrey" fontSize={`${dynamicFontSize}px`} {...decimalStyle}>
//             .{decimalPart}
//           </Text>
//         }
//       </HStack>
//     );
//   } catch (error) {
//     // Fallback for error handling (e.g., NaN or empty values)
//     return (
//       <HStack spacing="none" {...wrapper}>
//         <Text as="span" fontSize={`${baseSize}px`} fontWeight="bold" {...rest}>
//           ₦ 0
//         </Text>
//         <Text as="span" color="lightgrey" fontSize={`${baseSize}px`} {...decimalStyle}>
//           .00
//         </Text>
//       </HStack>
//     );
//   }
// };

// export const priceString = (curr, price, option) =>
//   price &&
//   `${curr == 'naira' ? '₦' : ''} ${parseInt(price)?.toLocaleString(undefined, {
//     maximumFractionDigits: 2,
//     ...option,
//   })}.00`;

// export const formatNumAbbrev = amount => {
//   if (amount >= 1000000) {
//     return (amount % 1000000 === 0 ? amount / 1000000 : (amount / 1000000).toFixed(1)) + 'M';
//   } else if (amount >= 1000) {
//     return (amount % 1000 === 0 ? amount / 1000 : (amount / 1000).toFixed(1)) + 'K';
//   } else {
//     return amount.toString();
//   }
// };
