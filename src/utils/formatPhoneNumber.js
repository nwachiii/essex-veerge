import React from 'react';

export const formatPhoneNumber = arg => {
  let num =
    arg &&
    (arg?.length == 10
      ? '0' + arg
      : arg?.includes('+234')
      ? arg?.replace('+234', '0')
      : arg?.includes('234')
      ? arg?.replace('234', '0')
      : arg);
  return num;
};
