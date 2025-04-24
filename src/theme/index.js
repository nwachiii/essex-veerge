import {color} from './colors';
import {shadows} from './shadows';
import {typography} from './typography';
import {extendTheme} from '@chakra-ui/react';
import {MultiSelectTheme} from 'chakra-multiselect';

export const theme = extendTheme({
  color,
  shadows,
  useSystemColorMode: true,
  initialColorMode: 'light',
  fonts: typography.fonts,

  textStyles: typography.textStyles,
  layerStyles: {
    button: {
      bg: '#4545FE',
      fontSize: ['14px', '16px'],
      borderRadius: '10px',
      textAlign: 'center',
      color: 'white',
      padding: '1rem',
      margin: '1rem 0',
      height: 'auto',
    },
  },
  componentStyles: {
    cardOne: {
      pb: '.5em',
      mx: 'auto',
      my: '47px',
      px: '42px',
      h: '185px',
      bg: '#FFFFFF',
      spacing: 15,
      maxW: '1284px',
      justify: 'center',
      borderRadius: '16px',
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.02)',
    },
    imageFallback: {
      h: '110px',
      w: '114.06px',
      borderRadius: '14px',
      cursor: 'pointer',
    },
    bigContainer: {
      p: '12',
      marginBottom: '5em',
      maxW: '7xl',
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.02)',
      color: 'gray.900',
      borderRadius: '2xl',
      background: '#FFFFFF',
    },
    tableContainer: {
      maxW: 'fit-content',
      background: '#FFFFFF',
      color: 'gray.900',
      borderRadius: '16px',
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.02)',
      display: 'table',
      tableLayout: 'fixed',
      width: 'max-content',
    },
  },
  customerProfileCard: {
    spacing: 4,
    w: '100%',
    maxW: 371,
    h: 604,
    borderRadius: '16px',
    px: 17,
    boxShadow: 'sm',
    pt: 35,
    bg: '#FFFFFF',
    border: '1px solid #e4e4e4',
  },
  progressBar: {
    bg: '#F5F5F5',
    borderRadius: '32px',
    margin: '1rem 0',
    height: '10px',
    minWidth: '134px',
  },
  transactionBox: {
    bg: '#FFF',
    borderRadius: '12px',
    height: '82px',
    // width: '211px',

    textAlign: 'left',
    paddingX: '10px',
    paddingY: '8px',
    border: '1px solid #E4E4E4',
  },
  containerStyles: {
    p: '12',
    maxW: '7xl',
    color: 'gray.900',
    borderRadius: '2xl',
    background: '#FFFFFF',
    border: '1px solid #E4E4E7',
  },
  xs_Box: {
    bg: '#FFF',
    align: 'start',

    // height: '79px',
    display: 'flex',
    maxWidth: '117px',

    flexDirection: 'column',
    justifyContent: 'center',
  },
  card_container: {
    p: '16px',
    borderRadius: '8px',
    border: '0.5px solid #E4E4E7',
    bg: '#FBFCFC',
  },
  card_container_white: {
    p: '16px',
    borderRadius: '8px',
    border: '0.73px solid #e4e4e4',
    bg: '#ffffff',
  },
  md_Box: {
    bg: '#FFF',
    align: 'center',
    color: '#191919',
    borderRadius: '12px',
    height: '120px',
    minWidth: '290px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    border: '1px solid #E4E4E4',
  },
  boxStyles: {
    boxShadow: 'sm',
    borderRadius: '16px',
    border: '1px solid #F5F5F5',
    align: 'center',
    h: 117,
    justify: 'center',
  },
  menu_btn: {
    px: 3,
    borderRadius: 12,
    h: '48px',
    w: '144px',
    colorScheme: '#4545FE',
    variant: 'outline',
    bg: 'transparent',
    border: '1px solid #E4E4E4',
  },
  lg_Box: {
    bg: '#FFF',
    borderRadius: '16px',
    minH: '287px',
    height: 'fit-content',
    maxWidth: '475px',
    border: '1px solid #e5e5e5',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.02)',
  },
  components: {
    Button: {
      baseStyle: {
        outline: `none`,
        _hover: {
          opacity: `1`,
        },
        _active: {
          opacity: `1`,
        },
        _focus: {
          outline: `none`,
        },
        _focusVisible: {
          outline: `none`,
        },
      },
      variants: {
        'filled-radius': {
          bg: '#242526',
          fontFamily: 'Neue Haas Grotesk Display Pro',

          height: '54px',
          w: '400px',
          borderRadius: '72px',
          fontSize: '18px',
          fontWeight: '500',
          lineHeight: '21.6px',
          color: '#ffffff',
          _hover: {
            _disabled: {
              opacity: 0.6,
              bg: '#242526',
            },
          },
        },
        'outline-radius': {
          fontFamily: 'Proxima Nova',
          border: '1px solid',
          borderColor: '#d6d6d6',
          height: '54px',
          w: '400px',
          borderRadius: '72px',
          fontSize: '18px',
          fontWeight: '500',
          lineHeight: '21.6px',
          color: '#191919',
        },
        'md-filled-radius': {
          bg: '#191919',
          fontFamily: 'Euclid Circular B',

          height: '45.5px',
          // w: '400px',
          borderRadius: '72px',
          fontSize: '14.91px',
          fontWeight: '400',
          lineHeight: '18.9px',
          color: '#ffffff',
          _hover: {
            _disabled: {
              opacity: 0.6,
              bg: '#242526',
            },
          },
        },
        'md-outline-radius': {
          border: '1px solid',
          borderColor: '#424242',
          fontFamily: 'Euclid Circular B',

          height: '45.5px',
          // w: '400px',
          borderRadius: '72px',
          fontSize: '14.91px',
          fontWeight: '400',
          lineHeight: '18.9px',
          color: '#191919',
        },
      },
    },
    Input: {
      baseStyle: {
        field: {
          fontFamily: 'Euclid Circular B',
          _focus: {
            boxShadow: 'none',
            outline: 'none',
            borderColor: '#525252',
            backgroundColor: '#fafafa',
            color: '#141414',
          },
          _active: {
            boxShadow: 'none',
            outline: 'none',
            borderColor: '#525252',
            backgroundColor: '#fafafa',
            color: '#141414',
          },
          _hover: {
            backgroundColor: '#fafafa',
            color: '#141414',
          },
          _placeholder: {
            color: '#606060',
            fontSize: '14px',
            fontWeight: '400',
          },
          _autofill: {
            boxShadow: '0 0 0px 1000px #fafafa inset',
            transition: 'background-color 5000s ease-in-out 0s',
            color: '#141414',
          },
        },
      },

      variants: {
        auth: {
          field: {
            border: '1px solid #e5e5e5',
            padding: '15px 17px',
            backgroundColor: '#fafafa',
            color: '#141414',
            fontWeight: '400',
            borderRadius: '8px',
            height: '50px',
            width: '100%',
            _focus: {
              backgroundColor: '#fafafa',
              color: '#141414',
              borderColor: '#525252',
            },
            _hover: {
              backgroundColor: '#fafafa',
              color: '#141414',
            },
            _autofill: {
              boxShadow: '0 0 0px 1000px #fafafa inset',
              transition: 'background-color 5000s ease-in-out 0s',
              color: '#141414',
            },
          },
        },
      },
    },

    Select: {
      variants: {
        auth: {
          field: {
            border: '1px solid #e5e5e5',
            padding: '15px 17px',
            backgroundColor: '#fafafa',
            color: '#141414',

            fontSize: '14px',
            fontWeight: '400',
            borderRadius: '8px',
            height: '50px',
            width: '100%',
            _placeholder: {
              color: '#606060',
            },
          },
        },
      },
    },
    MultiSelect: MultiSelectTheme,
    Progress: {
      baseStyle: {
        filledTrack: {
          bg: 'black',
        },
      },
    },
  },
  zIndices: {
    hide: -1,
    auto: 'auto',
    base: 0,
    docked: 10,
    dropdown: 1000,
    sticky: 1100,
    banner: 1200,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    skipLink: 1600,
    toast: 1700,
    tooltip: 1800,
  },
});

export const customSelectStyles = {
  option: (provided, state) => ({
    ...provided,
    border: 'none',
    width: '100%',
  }),
  control: () => ({
    display: 'flex',
    height: '55px',
    width: '100%',
    borderRadius: '8px',
    border: '1px solid #ddd',
    justifyContent: 'space-between',
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';

    return {...provided, opacity, transition};
  },
};

export const themeStyles = extendTheme({...theme});
