import {Image, Flex, Stack, Box} from '@chakra-ui/react';

import React from 'react';
import fallbackSrc from '/src/images/avatar.svg';
import Camera from '/src/images/icons/roleBasedSignCameraIcon.svg';

const SignProfilePicture = ({handleInput, file}) => {
  return (
    <>
      <Flex w="100%" justify="center">
        <input
          hidden
          type="file"
          onChange={e => handleInput(e.target.files[0])}
          accept="image/*"
          id="file_Sign"
        />
        <label htmlFor="file_Sign">
          <Flex align={'start'}>
            <Image
              alt=" team member profile image"
              objectFit="cover"
              src={file[0]?.preview ?? fallbackSrc.src}
              height={'100px'}
              width={'100px'}
              borderRadius="full"
              cursor="pointer"
              onLoad={() => {
                URL.revokeObjectURL(file[0]?.preview);
              }}
            />
            <Box ml={'-25px'}>
              <Image alt="" borderRadius="full" src={Camera.src} height={'32px'} width={'32px'} />
            </Box>
          </Flex>
        </label>
      </Flex>
    </>
  );
};

export default SignProfilePicture;
