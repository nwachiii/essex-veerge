import {AddIcon, SmallCloseIcon} from '@chakra-ui/icons';
import {Box, Image, Icon, Stack, Text, VStack, IconButton, Spinner, Flex} from '@chakra-ui/react';
import React, {useCallback, useEffect} from 'react';
import {useDropzone} from 'react-dropzone';
import {encodeFileToBase64, extractBase64} from '../../../utils';
import defaultIcon from '/src/images/fallback_upload.png';
import {MyxelliaAlert} from '@/components/common/alerts';
import Uploadalert from '@/components/common/alerts/uploadalerts';

export const UploadImagesWithURL = Props => {
  const {
    maxSize = 10 * 1024 * 1024, // Default max size is 10MB
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
    getListingImagesUrl,
    ...rest
  } = Props;
  const maxSizeInMB = maxSize / (1024 * 1024);
  const FILE_TYPES = ['.jpg', '.png', '.jpeg'];

  const {isDragActive, getRootProps, getInputProps, isDragReject, acceptedFiles, fileRejections} =
    useDropzone({
      accept: {
        'image/jpg': ['.jpg'],
        'image/png': ['.png'],
        // 'image/gif': ['.gif'],
        'image/jpeg': ['.jpeg'],
        // 'image/svg+xml': ['.svg'],
      },
      minSize: 0,
      multiple: true,
      maxSize: maxSize,
      maxFiles: maxFiles,
      validator: file => {
        if (file.size > maxSize) {
          return {
            code: 'file-too-large',
            message: `Image is larger than ${maxSizeInMB} MB`,
          };
        }
        return null; // No error
      },
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
    const needsMutation = files.filter(
      item => item instanceof File || (typeof item === 'object' && typeof item !== 'string')
    );

    files?.length > 0 &&
      needsMutation.length &&
      getListingImagesUrl?.mutate({files: extractBase64(needsMutation), images: true});

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
    fileRejections &&
    fileRejections.length > 0 &&
    fileRejections[0].errors.some(e => e.code === 'file-too-large');
  const thumbs =
    files &&
    files?.length > 0 &&
    files?.map((file, index) => (
      <Box
        key={index}
        pos="relative"
        opacity={getListingImagesUrl?.isLoading ? 0.2 : 1}
        style={thumb}
      >
        {!getListingImagesUrl?.isLoading && (
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
        )}

        <div key={file?.name}>
          <div style={thumbInner}>
            <Image
              alt=""
              lazy={getListingImagesUrl?.isLoading}
              objectFit="cover"
              src={file?.image || file}
              style={img}
              // Revoke data uri after image is loaded
              onLoad={() => {
                URL.revokeObjectURL(file?.preview);
              }}
            />
          </div>
        </div>
      </Box>
    ));
  console.log({files, thumbs});

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
                {getListingImagesUrl?.isLoading ? (
                  <Spinner color={'#121212'} />
                ) : (
                  <>
                    <input {...getInputProps()} />
                    <IconButton
                      as={AddIcon}
                      color="#4545FE"
                      fontWeight={900}
                      fontSize="28px"
                      p="8px 13px"
                    />
                  </>
                )}
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

          {!isDocs && !setFieldValue && (
            <Flex p="16px" w="full" justify={'flex-start'} flexWrap={'wrap'}>
              {index ? thumbs[index] : thumbs}
            </Flex>
          )}
        </VStack>
        {/* Validation response */}
        {isDragReject && !isFileTooLarge && (
          <MyxelliaAlert
            status="error"
            variant="left-accent"
            alertTitle={'Image upload Error:'}
            alertText={`File type not accepted, use one of the following ${FILE_TYPES.map(e => e).join(', ')}`}
          />
        )}

        {isFileTooLarge && (
          // <MyxelliaAlert
          //   status="error"
          //   variant="left-accent"
          //   alertText={`Please upload images under ${maxSizeInMB} MB. This is to ensure smooth upload and faster loading times.`}
          // />
          <Uploadalert
            alertText={`Please upload images under ${maxSizeInMB}MB for optimal performance and seamless processing.`}
          />
        )}
      </Stack>
    </Box>
  );
};

// Styles
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
