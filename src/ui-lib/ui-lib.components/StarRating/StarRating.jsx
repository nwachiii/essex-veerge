import React, {useState} from 'react';
import ReactStars from 'react-rating-stars-component';

import {Box} from '@chakra-ui/react';

export const StarRating = ({ratingNumber, isFeedback}) => {
  const [stars, setStars] = useState(ratingNumber);
  var data = {
    size: 26,
    value: stars,
    onChange: newValue => {
      isFeedback ? setStars(ratingNumber) : setStars(newValue);
    },
  };

  console.log(data.value);

  return (
    <Box>
      <ReactStars {...data} />
    </Box>
  );
};
