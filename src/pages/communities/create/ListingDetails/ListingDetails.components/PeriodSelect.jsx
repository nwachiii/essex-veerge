import React, {useState} from 'react';
import {CustomSelect} from 'ui-lib/ui-lib.components';

export const PeriodSelect = ({
  setPeriod,
  defaultSelectedPeriod = '',
  objectKey,
  selectStyle,
  noQuarter,
  ...rest
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState(defaultSelectedPeriod);
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const quarters = ['Q1', 'Q2', 'Q3', 'Q4'];

  const options = noQuarter ? [...months] : [...months, ...quarters];

  const handlePeriodChange = e => {
    setSelectedPeriod(e.target.value);
    setPeriod(e.target.value);
    // Perform actions with the selected year as needed
  };
  return (
    <div>
      <CustomSelect
        {...rest}
        h="50px"
        w="130px"
        noLabel
        px={0.5}
        id={objectKey}
        name={objectKey}
        onChange={handlePeriodChange}
        value={rest.placeholder || selectedPeriod}
        fontSize="14px"
        {...selectStyle}
      >
        <option value="" disabled>
          {noQuarter ? `Month` : `Period`}
        </option>{' '}
        {options.map((option, index) => (
          <option key={`option-${index}`} value={option}>
            {option}
          </option>
        ))}
      </CustomSelect>
    </div>
  );
};

export default PeriodSelect;
