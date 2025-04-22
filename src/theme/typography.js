export const typography = {
  fonts: {
    body: 'Euclid Circular B',
    heading: 'Euclid Circular B',
    mono: `Euclid Circular B, sans-serif`,
  },
  textStyles: {
    h1: {
      color: '#191919',
      fontWeight: 800,
      textAlign: 'center',
      fontSize: '40px',
      lineHeight: '55px',
      paddingTop: '1.5rem',
      paddingBottom: '0.7rem',
      // '.chakra-ui-dark &': { color: 'white' },
    },
    'h2-lg': {
      color: '#191919',
      fontWeight: 800,
      align: 'center',
      fontSize: '32px',
      lineHeight: '40px',
      paddingBottom: '1.5rem',
      paddingTop: '1rem',
      // '.chakra-ui-dark &': { color: 'white' },
    },
    h2: {
      color: '#191919',
      fontWeight: 500,
      fontSize: '32px',
      lineHeight: '41px',
      my: '1em',
      ml: '1.2em',
      // '.chakra-ui-dark &': { color: 'white' },
    },
    h3: {
      color: '#191919',
      fontWeight: 800,
      fontSize: '19px',
      lineHeight: '26px',
      paddingBottom: '0.6rem',
      paddingTop: '0.8rem',
      // '.chakra-ui-dark &': { color: 'rgb(201, 209, 217)' },
    },
    h4: {
      color: '#191919',
      fontWeight: 800,
      fontSize: '17px',
      lineHeight: '24px',
      paddingBottom: '0.3rem',
      paddingTop: '0.5rem',
      // '.chakra-ui-dark &': { color: 'rgb(201, 209, 217)' },
    },
    h5: {
      color: '#191919',
      fontWeight: 700,
      fontSize: '16px',
      lineHeight: '21px',
      paddingBottom: '0.2rem',
      paddingTop: '0.3rem',
      // '.chakra-ui-dark &': { color: 'rgb(201, 209, 217)' },
    },
    p: {
      fontWeight: 400,
      color: '#191919',
      margin: '0.4rem 0',
      fontSize: '15px',
      // '.chakra-ui-dark &': { color: 'rgb(201, 209, 217)' },
    },
    'p-strong': {
      fontWeight: 800,
      color: '#191919',
      margin: '0.4rem 0',
      fontSize: '15px',
      // '.chakra-ui-dark &': { color: 'rgb(201, 209, 217)' },
    },
    'p-lg': {
      fontWeight: 400,
      fontSize: '16px',
      color: '#191919',
      margin: '1.2rem 0',
      // '.chakra-ui-dark &': { color: 'rgb(201, 209, 217)' },
    },
    p_lg_strong: {
      fontWeight: 700,
      fontSize: '20px',
      color: '#191919',
      lineHeight: '25px',
      // '.chakra-ui-dark &': { color: 'rgb(201, 209, 217)' },
    },
    'p-sm': {
      fontWeight: 400,
      fontSize: '14px',
      color: '#4A5568',
      margin: '0.4rem 0',
      // '.chakra-ui-dark &': { color: 'rgb(201, 209, 217)' },
    },
    'p-sm-strong': {
      fontWeight: 800,
      fontSize: '14px',
      color: '#4A5568',
      margin: '0.4rem 0',
      lineHeight: '19px',
      // '.chakra-ui-dark &': { color: 'rgb(201, 209, 217)' },
    },
    'p-xs': {
      fontWeight: 400,
      fontSize: '12px',
      color: '#4A5568',
      // '.chakra-ui-dark &': { color: 'rgb(201, 209, 217)' },
    },
    'p-xs-strong': {
      fontWeight: 800,
      fontSize: '12px',
      color: '#4A5568',
      // '.chakra-ui-dark &': { color: 'rgb(201, 209, 217)' },
    },
    mono: {
      color: 'orange',
      fontFamily: 'mono',
      fontWeight: 700,
    },
    a: {
      fontWeight: 600,
      fontSize: ['16px', '14px'],
      color: '#191919',
      cursor: 'pointer',
    },
    input: {
      fontSize: '16px',
      fontWeight: 400,
      color: '#191919',
    },
    lg_Heading: {
      color: '#191919',
      fontWeight: '600',
      fontSize: '28px',
      lineHeight: '36px',
    },
  },
  //styleName: Type-face/B2 bold;
  b2: {
    fontSize: '28px',
    fontWeight: 700,
    lineHeight: '35px',
    letterSpacing: '0em',
    textAlign: 'left',
  },
  //styleName: Type-face/B2 Semibold;
  sb2: {
    fontSize: '32px',
    fontWeight: 600,
    lineHeight: '41px',
    letterSpacing: '0em',
    textAlign: 'left',
  },
  sb3: {
    //styleName: Type-face/B3 Semibold;
    fontSize: '24px',
    fontWeight: 600,
    lineHeight: '30px',
    letterSpacing: '0em',
    textAlign: 'left',
  },
  sb4: {
    //styleName: Type-face/B4 Semibold;
    fontSize: '20px',
    fontWeight: 600,
    lineHeight: '25px',
    letterSpacing: '0em',
    textAlign: 'left',
  },
  sb5: {
    //styleName: Type-face/B5 Semibold;
    fontSize: '16px',
    fontWeight: 600,
    lineHeight: '20px',
    letterSpacing: '0em',
    textAlign: 'left',
  },
  sb6: {
    //styleName: Type-face/B6 Semibold;
    fontSize: '14px',
    fontWeight: 600,
    lineHeight: '18px',
    letterSpacing: '0em',
    textAlign: 'left',
  },
  r4: {
    //styleName: Type-face/r4 Regular;
    fontSize: '20px',
    fontWeight: 500,
    lineHeight: '25px',
    letterSpacing: '0em',
    textAlign: 'left',
  },
  r5: {
    //styleName: Type-face/r5 Regular;
    fontSize: '16px',
    fontWeight: 500,
    lineHeight: '20px',
    letterSpacing: '0em',
    textAlign: 'left',
  },
  r7: {
    //styleName: Type-face/r7 Regular;
    fontSize: '12px',
    fontWeight: 500,
    lineHeight: '16px',
    letterSpacing: '0em',
    textAlign: 'left',
  },

  sl2: {
    //styleName: Type-face/B2 SemiLight;
    fontSize: '32px',
    fontWeight: 400,
    lineHeight: '41px',
    letterSpacing: '0em',
    textAlign: 'left',
  },
  sl3: {
    //styleName: Type-face/B3 SemiLight;
    fontSize: '24px',
    fontWeight: 400,
    lineHeight: '30px',
    letterSpacing: '0em',
    textAlign: 'left',
  },
  sl4: {
    //styleName: Type-face/B4 SemiLight;
    fontSize: '20px',
    fontWeight: 400,
    lineHeight: '25px',
    letterSpacing: '0em',
    textAlign: 'left',
  },
  sl5: {
    //styleName: Type-face/B5 SemiLight;
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '20px',
    letterSpacing: '0em',
    textAlign: 'left',
  },
  sl6: {
    //styleName: Type-face/B6 SemiLight;
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '18px',
    letterSpacing: '0em',
    textAlign: 'left',
  },

  l2: {
    //styleName: Type-face/B2 Light;
    fontSize: '32px',
    fontWeight: 300,
    lineHeight: '41px',
    letterSpacing: '0em',
    textAlign: 'left',
  },
  l3: {
    //styleName: Type-face/B3 Light;
    fontSize: '24px',
    fontWeight: 300,
    lineHeight: '30px',
    letterSpacing: '0em',
    textAlign: 'left',
  },
  l4: {
    //styleName: Type-face/B4 Light;
    fontSize: '20px',
    fontWeight: 300,
    lineHeight: '25px',
    letterSpacing: '0em',
    textAlign: 'left',
  },
  l5: {
    //styleName: Type-face/B5 Light;
    fontSize: '16px',
    fontWeight: 300,
    lineHeight: '20px',
    letterSpacing: '0em',
    textAlign: 'left',
  },
  l6: {
    //styleName: Type-face/B6 Light;
    fontSize: '14px',
    fontWeight: 300,
    lineHeight: '18px',
    letterSpacing: '0em',
    textAlign: 'left',
  },
};
