import countries from 'constants/auth/country';

export const priceString = (price, option = {}) => {
  if (typeof window === 'undefined') {
    return price ? `${price}` : '';
  }

  const defaultCurrency = localStorage.getItem('baseCurrency') || 'USD';
  const defaultCountry = localStorage.getItem('baseCountry') || 'United States Of America';
  const locale = countries.find(item => item.name === defaultCountry)?.locale || 'en-US';

  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: defaultCurrency,
    maximumFractionDigits: 2,
    ...option,
  });

  try {
    if (!price) return formatter.format(0);
    return formatter.format(parseFloat(price));
  } catch (error) {
    console.error('Error formatting price:', error);
    return formatter.format(0);
  }
};
