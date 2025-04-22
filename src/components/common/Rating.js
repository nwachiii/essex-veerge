import React from 'react';
import EmptyStarIcon from '/src/images/icons/emptyStarForFeedback.svg';
import starIcon from '/src/images/icons/starForFeedBack.svg';
import {HStack, Image} from '@chakra-ui/react';

export const Ratings = ({rating, starStyle, ...rest}) => {
  return (
    <HStack spacing="4px" {...rest}>
      {[1, 2, 3, 4, 5].map((item, idx) => {
        return (
          <HStack key={idx} h="17px" align="center" justify="center" w="17px" {...starStyle}>
            {item <= ~~rating ? (
              <Image
                w="17px"
                h="17px"
                src={starIcon.src}
                alt="selected star icon"
                fontSize="3px"
                {...starStyle}
              />
            ) : (
              <Image
                w="17px"
                h="17px"
                src={EmptyStarIcon.src}
                alt="selected star icon"
                fontSize="3px"
                {...starStyle}
              />
            )}
          </HStack>
        );
      })}
    </HStack>
  );
};
