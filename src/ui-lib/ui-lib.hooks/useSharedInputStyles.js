export const useSharedInputStyles = (isAuth, isDefault) => {
  return {
    fontSize: '1rem',
    transition: '0.3s ease-in-out',
    color: `${isDefault ? '#191919' : isAuth ? '#FFFFFF' : '#191919'}`,
    px: 4,
    pt: `${isAuth && 7}`,
    h: '55px',
    outline: 'none',
    focusBorderColor: '#FAFAFA',
    borderRadius: 'lg',
    _placeholder: {
      fontSize: '14px',
      color: `${isDefault ? 'gray' : isAuth ? 'transparent' : 'gray.500'}`,
    },
    _focus: {
      borderColor: 'grey',
    },
    _active: {
      borderColor: 'grey',
    },
    _visited: {
      borderColor: 'grey',
    },
  };
};
