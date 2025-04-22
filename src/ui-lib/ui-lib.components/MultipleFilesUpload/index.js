import {AddIcon, SmallCloseIcon} from '@chakra-ui/icons';
import {
  Box,
  Image,
  Icon,
  Stack,
  Text,
  VStack,
  Wrap,
  SimpleGrid,
  IconButton,
  Flex,
} from '@chakra-ui/react';
import React, {Fragment, useCallback, useEffect, useState} from 'react';
import Dropzone, {useDropzone} from 'react-dropzone';
import {encodeFileToBase64, extractBase64} from '../../../utils';
import defaultIcon from '/src/images/fallback_upload.png';

export const MultipleFileUploads = ({
  type,
  title,
  componentTitle,
  icon,
  maxFiles,
  isDocs,
  setFiles,
  files,
  index,
  values,
  setFieldValue,
  imageColumns,
  handleEditImages,
  isCustomer,
  ...rest
}) => {
  const {isDragActive, getRootProps, getInputProps, isDragReject, acceptedFiles, rejectedFiles} =
    useDropzone({
      accept: type ? type : {'image/*': ['.jpg', '.png']},
      minSize: 0,
      multiple: true,
      maxFiles: {maxFiles},
      onDrop: useCallback(acceptedFiles => {
        acceptedFiles.forEach(file =>
          encodeFileToBase64(file)
            .then(res => {
              setFiles(prevValue => [
                ...prevValue,
                Object.assign({image: res}, file, {
                  preview: URL.createObjectURL(file),
                }),
              ]);
            })
            .catch(err => {
              return err;
            })
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []),
    });

  useEffect(() => {
    handleEditImages ? handleEditImages() : console.log('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files?.length]);

  const removeFile = indx => {
    const copy = [...files];
    for (let i = 0; i < copy.length; i++) {
      if (i == indx) {
        copy?.splice(i, 1);
        i = copy?.length;
      }
    }
    setFiles(copy);
  };

  const isFileTooLarge =
    rejectedFiles && rejectedFiles.length > 0 && rejectedFiles[0].size > maxSize;

  const thumbs =
    files &&
    files?.length > 0 &&
    files?.map((file, index) => (
      <Box key={index} pos="relative" style={thumb}>
        <Icon
          bg="#F5F5F5"
          borderRadius="full"
          as={SmallCloseIcon}
          cursor="pointer"
          onClick={() => removeFile(index)}
          pos="absolute"
          right="41%"
          zIndex={1000}
          bottom="0%"
          width="26px"
          height="26px"
          alt="cancel_icon"
          color="#FF3636"
        />

        <div key={file?.name}>
          <div style={thumbInner}>
            {!type ? (
              <video style={img} controls>
                <source src={file.preview} type="video/mp4" />
                <source src={file.preview} type="video/ogg" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <Image
                alt=""
                objectFit="cover"
                src={file?.image || file}
                style={img}
                // Revoke data uri after image is loaded
                onLoad={() => {
                  URL.revokeObjectURL(file?.preview);
                }}
              />
            )}
          </div>
        </div>
      </Box>
    ));
  useEffect(() => {
    () => setFieldValue(`${values?.units[index]?.photos}`, extractBase64(files));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files]);

  useEffect(() => {
    return () => files && files?.forEach(file => URL.revokeObjectURL(file?.preview));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box w="full">
      <Stack mt="25px" mb={'5px'} w="full">
        {componentTitle}
        <VStack
          justify="center"
          minW={{base: '90%', xl: '580px'}}
          h="fit-content"
          minH="171px"
          border="1.5px solid #E5E5E5"
          borderRadius="22px"
          pos="relative"
          {...rest}
        >
          <VStack cursor="pointer" h="100%" {...getRootProps()} spacing={6} justify="center">
            {!thumbs?.length > 0 ? (
              <>
                <input {...getInputProps()} />
                <Image alt="" mt="30px" height="58px" width="58px" src={icon ?? defaultIcon.src} />
                <Text
                  color="#919191"
                  textAlign={'center'}
                  maxW="515px"
                  fontWeight={500}
                  fontSize="12px"
                  lineHeight="23px"
                >
                  {title}
                </Text>
              </>
            ) : (
              <Box bottom={3} right={7} pos="absolute">
                <input {...getInputProps()} />
                <IconButton
                  // ml="33px"
                  as={AddIcon}
                  color="#4545FE"
                  fontWeight={900}
                  fontSize="28px"
                  p="8px 13px"
                />
              </Box>
            )}
            {maxFiles ? (
              <Text
                top={1}
                right={8}
                pos="absolute"
                color="#919191"
                fontWeight={200}
                fontSize="18px"
              >
                {thumbs.length ?? '0'} / {title === 'Upload Reel' ? '1' : maxFiles}
              </Text>
            ) : null}
          </VStack>

          {/* Validation response */}
          {isDragReject && <Text color="red">File type not accepted, sorry!</Text>}
          {isFileTooLarge && <Text color="red">File is too large.</Text>}

          {!isDocs && !setFieldValue && (
            <Flex p="16px" w="full" justify={'flex-start'} flexWrap={'wrap'}>
              {index ? thumbs[index] : thumbs}
            </Flex>
          )}
        </VStack>
      </Stack>
    </Box>
  );
};

// Styles
const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  width: '100%',
};

const thumb = {
  borderRadius: 15,
  marginBottom: 8,
  width: 'fit-content',
  height: 158,
  padding: 4,
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden',
  width: 165,
  height: 158,
};

const img = {
  display: 'flex',
  width: '100%',
  height: '100%',
  background: '#606060',
  borderRadius: 15,
};
