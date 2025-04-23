import React, {useState, useEffect} from 'react';
import {CustomSelect} from 'ui-lib/ui-lib.components';

export const YearSelect = ({
  setYear,
  objectKey,
  defaultSelectedYear = '',
  constructionStatus,
  selectStyle,
  ...rest
}) => {
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState(defaultSelectedYear);

  const currentYear = new Date().getFullYear();
  const futureYears = Array.from({length: 15}, (_, index) => currentYear + index);
  const pastYears = Array.from({length: currentYear - 1899}, (_, index) => currentYear - index);

  const yearsArray =
    constructionStatus == 'Post Construction'
      ? pastYears
      : constructionStatus == 'Pre Construction'
        ? futureYears
        : constructionStatus == 'In Construction' && objectKey == 'start_year'
          ? pastYears
          : constructionStatus == 'In Construction' && objectKey == 'end_year'
            ? futureYears
            : null;

  const handleYearChange = e => {
    setSelectedYear(e.target.value);
    setYear(e.target.value);
  };

  useEffect(() => {
    setYears(yearsArray);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [constructionStatus, objectKey]);

  return (
    <div>
      <CustomSelect
        {...rest}
        h="50px"
        w="120px"
        noLabel
        id={objectKey}
        name={objectKey}
        onChange={handleYearChange}
        value={rest.placeholder || selectedYear}
        fontSize="14px"
        {...selectStyle}
      >
        <option value="" disabled>
          Year
        </option>
        {years?.map(year => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </CustomSelect>
    </div>
  );
};

export default YearSelect;
