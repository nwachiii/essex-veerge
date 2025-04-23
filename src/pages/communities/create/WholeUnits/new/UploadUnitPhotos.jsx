/* eslint-disable react-hooks/exhaustive-deps */
import {AddIcon, SmallCloseIcon} from '@chakra-ui/icons';
import {Box, Flex, Icon, IconButton, Image, Spinner, Stack, Text, VStack} from '@chakra-ui/react';
import React, {useCallback, useEffect, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import {encodeFileToBase64, extractBase64} from '../../../../../utils';
import imageIcon from '/src/images/icons/image-upload.png';
import {customScrollbarStyles} from '@/components/common/Calendar/DatePicker';
import {useMutation} from '@tanstack/react-query';
import {sendBase64ForUrl} from 'apis/listings';
import Uploadalert from '@/components/common/alerts/uploadalerts';

export const UploadUnitPhotos = props => {
  const [files, setFiles] = useState([]);
  const [imgUrls, setImgUrls] = useState([]);
  const {setFieldValue, values, index, icon, maxFiles, maxSize = 10 * 1024 * 1024, ...rest} = props;

  const maxSizeInMB = maxSize / (1024 * 1024);

  const {getRootProps, getInputProps, isDragActive, fileRejections} = useDropzone({
    accept: props.type ? props.type : {'image/*': ['.jpg', '.png', '.gif', '.jpeg', '.svg']},
    multiple: true,
    maxFiles: 0,
    maxSize: maxSize,
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

  const getUrlForImageUpload = useMutation(payload => sendBase64ForUrl(payload), {
    onSuccess: res => {
      setImgUrls(res?.data?.data);
    },
    onError: err => {
      console.log('Upload images failed', err);
    },
  });

  const removeFile = fileIndex => {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== fileIndex));
    setImgUrls(prevFiles => prevFiles.filter((_, i) => i !== fileIndex));
  };

  const thumbs =
    values &&
    values.units[index].photos.map((file, index) => (
      <Flex maxW="680px" flexWrap="wrap" key={index} align="center" h="full">
        <Box pos="relative" h="full" opacity={getUrlForImageUpload?.isLoading ? 0.2 : 1}>
          {!getUrlForImageUpload?.isLoading && (
            <Icon
              right="40%"
              bottom="2%"
              zIndex={1000}
              pos="absolute"
              boxSize="26px"
              cursor="pointer"
              color="#191919"
              alt="cancel_icon"
              as={SmallCloseIcon}
              borderRadius={'full'}
              background={'#F2F2F2'}
              border={'1px solid lightgray'}
              onClick={() => removeFile(index)}
            />
          )}

          <Image
            alt=""
            boxSize={138}
            objectFit="cover"
            borderRadius="16px"
            src={file}
            lazy={getUrlForImageUpload?.isLoading}
            // Revoke data uri after image is loaded
            onLoad={() => {
              URL.revokeObjectURL(file.image);
            }}
          />
        </Box>
      </Flex>
    ));
  useEffect(() => {
    setFieldValue(`units.${index}.photos`, extractBase64(files));
  }, [files, index]);
  useEffect(() => {
    setFieldValue(`units.${index}.photo_urls`, imgUrls);
  }, [imgUrls, files, index]);

  useEffect(() => {
    return () => files && files.forEach(file => URL.revokeObjectURL(file.preview));
  }, []);

  useEffect(() => {
    files?.length > 0 && getUrlForImageUpload?.mutate({files: extractBase64(files), images: true});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files?.length]);

  const isFileTooLarge =
    fileRejections &&
    fileRejections.length > 0 &&
    fileRejections[0].errors.some(e => e.code === 'file-too-large');

  return (
    <Box
      h="201px"
      mt="67px"
      overflowY={'auto'}
      borderRadius="32px"
      position={'relative'}
      sx={customScrollbarStyles}
      border="1.5px solid #E5E5E5"
      minW={{base: '90%', xl: '580px'}}
      {...rest}
    >
      {files && files.length > 0 ? (
        <Flex maxW="1080px" w="full" flexWrap={'wrap'} gap={'25px'} align={'center'} p={6}>
          {thumbs}
          <input disabled={files.length >= maxFiles} {...getInputProps()} />
          <Box bottom={3} right={7} pos="absolute" {...getRootProps({className: 'dropzone'})}>
            {getUrlForImageUpload?.isLoading ? (
              <Spinner color={'#121212'} />
            ) : (
              <IconButton
                ml="33px"
                as={AddIcon}
                p="8px 13px"
                color="#4545FE"
                fontWeight={900}
                fontSize="28px"
                cursor={'pointer'}
              />
            )}
          </Box>
        </Flex>
      ) : (
        <VStack
          cursor="pointer"
          h="100%"
          spacing={6}
          justify="center"
          pos="relative"
          {...getRootProps({className: 'dropzone'})}
        >
          <input {...getInputProps()} />

          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <Stack spacing={4} textAlign={'center'}>
              <Image
                alt=""
                mx="auto"
                width="58px"
                height="58px"
                textAlign={'center'}
                src={icon ?? imageIcon.src}
              />

              <Text
                maxW="515px"
                fontSize="12px"
                color="#919191"
                fontWeight={500}
                lineHeight="23px"
                textAlign={'center'}
              >
                You can easily add unit images by uploading them or simply dragging & dropping.
                Please note that the maximum number of images allowed is 10
              </Text>
            </Stack>
          )}
        </VStack>
      )}
      {isFileTooLarge && (
        <Uploadalert
          alertText={`Please upload images under ${maxSizeInMB}MB for optimal performance and seamless processing.`}
        />
      )}
    </Box>
  );
};

export default UploadUnitPhotos;
