import {SmallCloseIcon} from '@chakra-ui/icons';
import {
  Box,
  Image,
  Icon,
  Stack,
  Text,
  VStack,
  Spinner,
  useToast,
} from '@chakra-ui/react';
import React, {useCallback, useEffect} from 'react';
import {useDropzone} from 'react-dropzone';
import {encodeFileToBase64} from '../../../utils';
import defaultIcon from '/src/images/icons/fileUploadIcon.svg';
import {toastForError} from 'utils/toastForErrors';

export const CompanyImageUpload = Props => {
  const toast = useToast();
  const {
    maxSize = 1024 * 1024, // Default max size is 1MB
    maxFiles,
    setFile,
    file,
    getCompanyImages,
    fileWidth,
    fileHeight,
    removeFile,
    loaded,
    name,
    ...rest
  } = Props;
  const maxSizeInMB = maxSize / (1024 * 1024);
  const isLoading = loaded === name && getCompanyImages?.isLoading
  const {getRootProps, getInputProps, fileRejections} = useDropzone({
    accept: {
      'image/jpg': ['.jpg'],
      'image/png': ['.png'],
      'image/gif': ['.gif'],
      'image/jpeg': ['.jpeg'],
      'image/svg+xml': ['.svg'],
    },
    minSize: 0,
    multiple: false,
    maxSize: maxSize,
    maxFiles: 1,
    validator: file => {
      if (file.size > maxSize) {
        return {
          code: 'file-too-large',
          message: `Image is larger than ${maxSizeInMB} MB`,
        };
      }

      if (file.width > fileWidth || file.height > fileHeight) {
        return {
          code: 'image-dimensions-too-large',
          message: `Image dimensions should not exceed ${fileWidth}x${fileHeight} pixels`,
        };
      }
    },
    onDrop: useCallback(
      acceptedFiles => {
        const file = acceptedFiles[0]; // Only one file is allowed
        if (!file) return;

        // Asynchronous validation (e.g., image dimensions)
        const img = new window.Image();
        img.src = URL.createObjectURL(file);
        img.onload = () => {
          if (img.width > fileWidth || img.height > fileHeight) {
            // Show toast for invalid dimensions
            toast({
              title: 'Invalid Image Dimensions',
              description: `Image dimensions should not exceed ${fileWidth}x${fileHeight} pixels`,
              status: 'error',
              duration: 5000,
              isClosable: true,
            });
          } else {
            // If dimensions are valid, process the file
            encodeFileToBase64(file)
              .then(res => {
                setFile(name, res);
              })
              .catch(err => {
                console.error('Error encoding file to base64:', err);
              });
          }
        };
        img.onerror = () => {
          // Show toast if the image fails to load
          toast({
            title: 'Error Loading Image',
            description: 'Failed to load image',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        };
      },
      [setFile, name, fileWidth, fileHeight, toast]
    ),
  });

  useEffect(() => {
    if (fileRejections.length > 0) {
      fileRejections.forEach(({errors}) => {
        errors.forEach(error => {
          toastForError(error, true, toast);
        });
      });
    }
  }, [fileRejections, toast]);

  const thumbs = file && (
    <Box pos="relative" opacity={isLoading ? 0.2 : 1} style={thumb}>
      {!getCompanyImages?.isLoading && (
        <Icon
          bg="#F5F5F5"
          borderRadius="full"
          as={SmallCloseIcon}
          cursor="pointer"
          onClick={() => removeFile(name)}
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
      <div style={thumbInner}>
        <Image
          alt=""
          lazy={getCompanyImages?.isLoading}
          objectFit="cover"
          src={file}
          style={img}
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file?.preview);
          }}
        />
      </div>
    </Box>
  );

  useEffect(() => {
    return () => file && URL.revokeObjectURL(file?.preview);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box w="full">
      <Stack w="full">
        <VStack
          justify="center"
          w="full"
          align="center"
          p="16px 24px"
          h="full"
          minH="125px"
          border="1px solid #E4E4E7"
          borderRadius="12px"
          pos="relative"
          {...rest}
        >
          <VStack cursor="pointer" h="100%" {...getRootProps()} gap="12px" justify="center">
            {isLoading ? (
              <Spinner color={'#121212'} />
            ) : file ? (
              thumbs
            ) : (
              <>
                <input {...getInputProps()} />
                <Image alt="" height="58px" width="58px" src={defaultIcon.src} />
                <VStack>
                  <Text color="#919191" fontSize="13px">
                    <Text as="span" fontWeight={600} color="#3737D1">
                      Click here to upload
                    </Text>{' '}
                    or drag and drop
                  </Text>
                  <Text color="#919191" fontSize="13px" fontWeight={400}>
                    SVG, PNG, JPG or GIF (max. {fileWidth}x{fileHeight}px)
                  </Text>
                </VStack>
              </>
            )}
          </VStack>
        </VStack>
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
