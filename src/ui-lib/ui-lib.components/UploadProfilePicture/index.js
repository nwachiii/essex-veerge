import {useDropzone} from 'react-dropzone';
import React, {useCallback, useEffect, useState} from 'react';
import {Image, Flex, Stack, Box, Button, Text} from '@chakra-ui/react';
import fallbackSrc from '../../../images/avatar.svg';
import Camera from '../../../images/icons/camera.svg';
import CameraIcon from '../../../images/icons/login-camera-icon.svg';

import {encodeFileToBase64} from '../../../utils';
import {SpinnerIcon} from '@chakra-ui/icons';

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  // marginTop     : 16
};

const thumb = {
  borderRadius: '50%',
  marginBottom: 8,
  marginRight: 8,
  width: 130,
  height: 130,
  padding: 4,
  boxSizing: 'border-box',
  display: 'inline-flex',
  border: '1px solid #eaeaea',
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden',
  width: '-webkit-fill-available',
};

const img = {
  display: 'block',
  height: '100%',
  objectFit: 'cover',
  borderRadius: '50%',
  width: '-webkit-fill-available',
};

export const UploadProfilePicture = ({
  files,
  setFiles,
  profileFallback,
  containerStyle,
  isLoading,
  isAuth,
  sign,
  profileWrapper,
  defaultCameraWrapperStyle,
  defaultCameraStyle,
  forTheNewIcon,
  defaultCameraIcon,
  imgStyle,
  children,
  ...restProps
}) => {
  const {getRootProps, getInputProps} = useDropzone({
    accept: {
      'image/*': [],
    },
    onDrop: useCallback(acceptedFiles => {
      acceptedFiles.forEach(file =>
        encodeFileToBase64(file)
          .then(res => {
            setFiles([
              Object.assign(
                {image: res},
                {
                  preview: URL.createObjectURL(file),
                }
              ),
            ]);
          })
          .catch(err => {
            return err;
          })
      );
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  });

  const thumbs = files
    ? files[0]?.preview
      ? files.map((file, index) => {
          return (
            <div style={thumb} {...imgStyle} key={index}>
              <div style={thumbInner}>
                <Image
                  alt=""
                  src={file.preview}
                  style={img}
                  // Revoke data uri after image is loaded
                  onLoad={() => {
                    URL.revokeObjectURL(file.preview);
                  }}
                />
              </div>
            </div>
          );
        })
      : null
    : null;

  return (
    <section className={!children && 'container'} style={containerStyle}>
      <Stack align="center" justify={'center'} direction="row" as="div" {...restProps}>
        {isLoading && !children ? (
          <SpinnerIcon />
        ) : !thumbs?.length ? (
          <Flex
            flexDirection={isAuth ? 'column' : 'row'}
            gap={isAuth ? 4 : 0}
            align={isAuth ? 'center' : 'start'}
            {...getRootProps({className: 'dropzone'})}
            position="relative"
            {...profileWrapper}
          >
            <Image
              alt=""
              src={profileFallback?.src || fallbackSrc.src}
              height={forTheNewIcon ? '128px' : '100px'}
              width={forTheNewIcon ? '128px' : '100px'}
              borderRadius="full"
              cursor="pointer"
              {...imgStyle}
            />

            {isAuth ? (
              <Stack gap={1}>
                <Button
                  gap={2}
                  rounded={'16px'}
                  bg="#1A1A1A"
                  border="1px solid #3F3F3F"
                  _hover={{
                    bg: 'transparent',
                  }}
                >
                  <Image
                    alt=""
                    cursor="pointer"
                    borderRadius={'full'}
                    src={(forTheNewIcon ? CameraIcon : defaultCameraIcon || Camera).src}
                    boxSize={'20px'}
                  />
                  <Text fontWeight={400} color="#FFFFFF">
                    Upload Photo
                  </Text>
                </Button>
                <Text color="#FF6A6A" fontSize={12}>
                  *This is compulsory
                </Text>
              </Stack>
            ) : (
              <Box ml={'-25px'} right=".5%" top={'15%'} {...defaultCameraWrapperStyle}>
                <Image
                  alt=""
                  cursor="pointer"
                  borderRadius={'full'}
                  src={(defaultCameraIcon || Camera).src}
                  height={'46px'}
                  width={'46px'}
                  {...defaultCameraStyle}
                />
              </Box>
            )}
            <input {...getInputProps()} />
          </Flex>
        ) : (
          <Flex
            align={'start'}
            {...getRootProps({className: 'dropzone'})}
            position={'relative'}
            {...profileWrapper}
          >
            {children ? (
              children
            ) : (
              <>
                <aside style={thumbsContainer}>{thumbs}</aside>
                <Box position={'absolute'} right=".5%" top={'2%'} {...defaultCameraWrapperStyle}>
                  <Image
                    alt=""
                    cursor="pointer"
                    borderRadius={'full'}
                    src={(forTheNewIcon ? CameraIcon : defaultCameraIcon || Camera).src}
                    height={'46px'}
                    width={'46px'}
                    {...defaultCameraStyle}
                  />
                </Box>
              </>
            )}
            <input {...getInputProps()} />
          </Flex>
        )}
        {/* <input {...getInputProps()} /> */}
      </Stack>
    </section>
  );
};
