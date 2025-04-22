import React, {useCallback} from 'react';
import {useDropzone} from 'react-dropzone';
import {Input as ChakraInput, Text, Flex, Image} from '@chakra-ui/react';
import {VStack} from '@chakra-ui/react';
import {themeStyles} from '../../../theme';
import Upload from '/src/images/icons/image-upload.png';
import {encodeFileToBase64} from '/src/utils';

export const UploadStoreDocument = ({lable, message, isError, onFileUpload, ...rest}) => {
  const onDrop = useCallback(
    acceptedFiles => {
      acceptedFiles.forEach(file =>
        encodeFileToBase64(file)
          .then(res => {
            onFileUpload(
              Object.assign(
                {image: res},
                {
                  preview: URL.createObjectURL(file),
                }
              )
            );
          })
          .catch(err => {
            return err;
          })
      );
    },
    [onFileUpload]
  );

  const {getRootProps, getInputProps} = useDropzone({
    onDrop,
    accept: {
      'image/*': [],
    },
  });

  return (
    <VStack w={'100%'} alignItems={'start'} cursor="pointer">
      <Text {...themeStyles.textStyles.sl6} mb={'5px'}>
        {lable}
      </Text>
      <Flex
        {...getRootProps()}
        p={'10px'}
        pl={'18px'}
        borderColor={
          message
            ? isError
              ? themeStyles.color.matador__red
              : themeStyles.color.matador__green
            : 'lightgray'
        }
        w={'100%'}
        flexDir={'column'}
        borderRadius={'9px'}
        alignItems={'center'}
        border={'1px solid lightgray'}
        bg={themeStyles.color.matador__white}
        {...rest}
        justify={'center'}
      >
        <ChakraInput {...getInputProps()} />
        <Image src={Upload.src} alt={'doc'} />
        <Text {...themeStyles.textStyles.r7}> Upload Image</Text>
      </Flex>
      <Text
        {...themeStyles.textStyles.l6}
        color={isError ? themeStyles.color.matador__red : themeStyles.color.matador__green}
      >
        {message}
      </Text>
    </VStack>
  );
};

export default UploadStoreDocument;
