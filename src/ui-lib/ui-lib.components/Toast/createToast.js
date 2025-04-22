import React from 'react';
import {HStack, Heading, Image, Stack, Text, position, useToast} from '@chakra-ui/react';
import {Box} from '@chakra-ui/react';
import {MdClose} from 'react-icons/md';
import checkIcon from '/src/images/icons/toastCheckIcon.svg';
import {themeStyles} from '../../../theme';

export const CreateToast = (hasHeading, type) => {
  const toast = useToast();
  const toastIdRef = React.useRef();

  const close = () => {
    if (toastIdRef.current) {
      toast.close(toastIdRef.current);
    }
  };
  const renderToast = (
    obj,

    msg
  ) => {
    switch (type) {
      case 'success':
        return {
          pos: 'top-right',
          comp: (
            <Box
              display={'flex'}
              alignItems={'center'}
              justifyContent={'space-between'}
              bg="#23E57F"
              p="30px"
              py="15px"
              {...obj}
            >
              <Image mr="8px" src={checkIcon.src} alt="checkicon" />

              <Text fontSize="16px" fontWeight="400" color="#fff">
                {msg}
              </Text>
              <Box ml={'30px'}>
                <MdClose size={'20px'} onClick={close} cursor={'pointer'} color="#fff" />
              </Box>
            </Box>
          ),
        };
      default:
        return {
          pos: 'bottom-right',
          comp: (
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
                {hasHeading ? (
                  <Heading fontSize="18px" fontWeight="500" color="#fff">
                    Theme unavailable
                  </Heading>
                ) : null}
                <Text>{msg}</Text>
              </Stack>

              <Box ml={'30px'}>
                <MdClose size={'20px'} onClick={close} cursor={'pointer'} />
              </Box>
            </Box>
          ),
        };
    }
  };

  const addToast = (msg, obj, toastPropObj) => {
    toastIdRef.current = toast({
      position: renderToast().pos,
      duration: '3000',
      containerStyle: {
        maxWidth: 'fit-content',
      },
      render: () => renderToast(obj, msg).comp,

      ...toastPropObj,
    });
  };

  return addToast;
};
