import {Box, Text, Flex} from '@chakra-ui/react';
import ToggleButton from 'react-toggle-button';
import {themeStyles} from '../../../../theme';

const trackStyle = {
  height: '12px',
  width: '40px',
  p: '0',
  // boxShadow: "-1px 1px 10px 0px #0000001A",
};
const thumbStyle = {
  height: '20px',
  width: '20px',
};

export const Toggle = ({maxW, value, onChange, label}) => {
  return (
    <Flex
      w={'100%'}
      maxW={maxW}
      mx={'10px'}
      cursor={'pointer'}
      justify="space-between"
      align="center"
      gap="10px"
    >
      <Text {...themeStyles.textStyles.sl6}>{label}</Text>
      <Box my={'8px'}>
        <ToggleButton
          inactiveLabel={''}
          activeLabel={''}
          colors={{
            activeThumb: {
              base: '#009900',
            },
            inactiveThumb: {
              base: '#191919',
            },
            active: {
              base: '#D9D9D9',
            },
            inactive: {
              base: '#D9D9D9',
            },
          }}
          trackStyle={trackStyle}
          thumbStyle={thumbStyle}
          thumbAnimateRange={[0, 20]}
          value={value}
          onToggle={value => onChange(!value)}
        />
      </Box>
    </Flex>
  );
};
