import React from 'react';
import ViewOfferCard from './viewOfferCard';
import {Heading, Stack} from '@chakra-ui/react';

export const Offers = ({offers}) => {
  const customScrollbarStyles = {
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
    },
  };

  return offers?.length ? (
    <Stack spacing="28px">
      <Heading fontSize="18px" color="#191919" fontWeight="500">
        Offers
      </Heading>
      <Stack spacing="23px">
        {offers.map((item, idx) => (
          <ViewOfferCard
            key={idx}
            info={item}
            idx={idx}
            customScrollbarStyles={customScrollbarStyles}
          />
        ))}
      </Stack>
    </Stack>
  ) : null;
};

export default Offers;
