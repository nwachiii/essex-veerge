import {Box, Flex, Image, Stack, Text, VStack} from '@chakra-ui/react';
import React, {Fragment, useState} from 'react';
import uploadIcon from '/src/images/icons/uploadDataIcon.svg';
import fileIcon from '/src/images/icons/bluefileIcon.svg';
import check from '/src/images/icons/bluecheck.svg';
import {useDropzone} from 'react-dropzone';
import {encodeFileToBase64} from 'utils';

const UploadDataCsv = ({setPayload}) => {
  const [fileData, setFileData] = useState({name: '', size: ''});

  const formatFileSize = sizeInBytes => {
    if (sizeInBytes >= 1024 * 1024 * 1024) {
      return `${(sizeInBytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
    } else if (sizeInBytes >= 1024 * 1024) {
      return `${(sizeInBytes / (1024 * 1024)).toFixed(2)} MB`;
    } else if (sizeInBytes >= 1024) {
      return `${(sizeInBytes / 1024).toFixed(2)} KB`;
    } else {
      return `${sizeInBytes} Bytes`;
    }
  };

  const onDrop = async acceptedFiles => {
    const file = acceptedFiles[0];

    if (file && file.type === 'text/csv') {
      setFileData({
        name: file.name,
        size: formatFileSize(file.size),
      });
      try {
        const newFile = await encodeFileToBase64(file);
        const payload = {file: newFile};
        // mutate(newFile);
        console.log(newFile);
        setPayload(payload);
      } catch (error) {
        toast({
          title: 'Oops...',
          description: 'An issue occurred while converting the file',
          status: 'error',
        });
      }
    } else {
      toast({
        title: 'Invalid file format',
        description: 'Only CSV files are allowed',
        status: 'error',
      });
    }
  };

  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    onDrop,
    multiple: false,
    accept: '.csv',
  });

  return (
    <Box w="full" cursor="pointer" {...getRootProps()}>
      <input {...getInputProps()} accept=".csv" />

      {!fileData.name ? (
        <VStack
          maxH="126px"
          p="16px 24px"
          border="1px solid #eaecf0"
          borderRadius="12px"
          w="full"
          bg={isDragActive ? '#f0f4ff' : 'white'}
        >
          <Image h="46px" w="46px" src={uploadIcon.src} alt="upload icon" />
          <VStack spacing="4px">
            <Text fontSize="14px" fontWeight="400" lineHeight="19.6px" color="#475467">
              <Text as="span" fontWeight="600" color="#4545fe">
                Click to upload
              </Text>{' '}
              or drag and drop
            </Text>
            <Text fontSize="12px" fontWeight="400" lineHeight="18px" color="#ff9103">
              CSV format only
            </Text>
          </VStack>
        </VStack>
      ) : (
        <Flex
          justifyContent="space-between"
          gap="21px"
          p="21px"
          borderRadius="15.75px"
          border="1px solid #d6d6d6"
        >
          <Image alignSelf="start" src={fileIcon.src} alt="file icon" />
          <Stack w="full" spacing="0px">
            <Flex justify="space-between" w="full">
              <Text
                fontSize="16px"
                maxW="280px"
                wordBreak="break-all"
                whiteSpace="break-spaces"
                fontWeight="500"
                lineHeight="26.25px"
                color="#344054"
              >
                {fileData.name}
              </Text>
              <Image src={check.src} alt="check icon" />
            </Flex>
            <Text fontSize="16px" fontWeight="400" lineHeight="26.25px" color="#475467">
              {fileData.size}
            </Text>
            <Flex align="center" gap="15.75px" h="27px" w="full">
              <Box w="full" h="10.5px" overflow="hidden" borderRadius="10.5px">
                <Box w="full" bg="#4545fe" h="full" />
              </Box>
              <Text fontSize="14px" fontWeight="500" lineHeight="26.25px" color="#344054">
                100%
              </Text>
            </Flex>
          </Stack>
        </Flex>
      )}
    </Box>
  );
};

export default UploadDataCsv;
