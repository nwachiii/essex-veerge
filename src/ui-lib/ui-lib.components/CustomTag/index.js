import {themeStyles} from '/src/theme';
import React from 'react';
import {Tag} from '@chakra-ui/react';

export const CustomTag = ({text, variant, borderRadius, padding, w, h}) => {
  const sharedStyles = {
    w: w || '109px',
    h: h || '36px',
    display: 'flex',
    justifyContent: 'center',
    borderRadius: borderRadius || 'full',
    variant: 'subtle',
    border: '1px solid #F5F5F5',
    padding: padding || '',
    fontSize: '16px'
  };
  switch (variant) {
    case 'purple':
      return (
        <Tag color="#4545FE" bg="purple.50" {...sharedStyles}>
          {text}
        </Tag>
      );

    case 'green':
      return (
        <Tag color="#12D8A0" bg="teal.50" {...sharedStyles}>
          {text}
        </Tag>
      );

    case 'orange':
      return (
        <Tag color={themeStyles.color.matador__yellow} bg="orange.50" {...sharedStyles}>
          {text}
        </Tag>
      );

    
    default:
      return (
        <Tag textTransform={'capitalize'} color="#0C344D" bg="rgba(12, 52, 77, 0.10)" {...sharedStyles}>
          {text}
        </Tag>
      );
      break;
  }
};
