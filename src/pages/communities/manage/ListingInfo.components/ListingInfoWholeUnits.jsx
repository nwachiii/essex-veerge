import {
  Box,
  Flex,
  HStack,
  Heading,
  Image,
  Stack,
  StackDivider,
  Tag,
  TagLabel,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react';
import {useRouter} from 'next/router';
import {FaCaretRight} from 'react-icons/fa';
import {themeStyles} from '../../../../theme';
import Carousel from 'react-elastic-carousel';
import {useQuery} from '@tanstack/react-query';
import fallback from '/src/images/image-fallback.png';
import fractionTag from '/src/images/icons/halfCircleFractionalIcon.svg';

import {fetchAllListingBundles} from '../../../../apis/listings';
import {
  formatAmountWithDecimal,
  formatNumberWithCommas,
  formatToCurrency,
} from '../../../../utils/formatAmount';
import UnitSkeletons from './UnitsSkeleton';
import {AddMoreBtn} from 'ui-lib/ui-lib.components';
import MatadorCustomTable from '@/components/common/Table';
import {useState} from 'react';
import {UNIT_DATA_COLUMNS, unitsData} from 'constants/DEMODATA/communities/units';

const customScrollbarStyles = {
  '&::-webkit-scrollbar': {
    width: '4px',
    borderRadius: '16px',
    display: 'none',
  },
  '&::-webkit-scrollbar-track': {
    borderRadius: '16px',
    WebkitBoxShadow: 'inset 0 0 6px #fafafa',
  },
  '&::-webkit-scrollbar-thumb': {
    borderRadius: '16px',
    backgroundColor: '#cbcbcb',
  },
};

export const ListingInfoWholeUnits = () => {
  const [expand, setExpand] = useState(true);
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePagination = page => {
    setCurrentPage(page);
  };

  const handleExpand = () => {
    setExpand(!expand);
    setLimit(prev => (prev === 10 ? 20 : 10));
  };

  const number_of_pages = Math.ceil(~~unitsData?.data?.length / ~~limit);

  return (
    <Box mt="36px" maxW="full" px={{xl: '78px', base: '20px'}} mx="auto">
      <MatadorCustomTable
        forMemo={[]}
        forLimit={[limit]}
        expanded={expand}
        headerSpace="evenly"
        handleExpand={handleExpand}
        DATA={unitsData?.data}
        number_of_pages={150}
        handlePagination={handlePagination}
        COLUMNS={UNIT_DATA_COLUMNS(unitsData?.data)}
      />
    </Box>
  );
};

export default ListingInfoWholeUnits;


