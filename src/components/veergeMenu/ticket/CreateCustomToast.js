import React from 'react';
import {Heading, Stack, Text, useToast} from '@chakra-ui/react';
import {Box} from '@chakra-ui/react';
import {MdClose} from 'react-icons/md';

import {themeStyles} from '../../../theme';

export const CreateCustomToast = ({heading, position = 'bottom-right', duration = '3000'}) => {
  const toast = useToast();
  const toastIdRef = React.useRef();

  const close = () => {
    if (toastIdRef.current) {
      toast.close(toastIdRef.current);
    }
  };

  const addToast = (msg, obj, toastPropObj) => {
    toastIdRef.current = toast({
      position,
      duration,
      render: () => (
        <Box
          color="white"
          p={'20px'}
          bg="black"
          {...themeStyles.textStyles.sl5}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'space-between'}
          pl={'40px'}
          pr={'25px'}
          {...obj}
        >
          <Stack>
            {heading ? (
              <Heading fontSize="18px" fontWeight="500" color="#fff" textTransform={'capitalize'}>
                {heading}
              </Heading>
            ) : null}
            <Text>{msg}</Text>
          </Stack>

          <Box ml={'30px'}>
            <MdClose size={'20px'} onClick={close} cursor={'pointer'} />
          </Box>
        </Box>
      ),

      ...toastPropObj,
    });
  };

  return addToast;
};
