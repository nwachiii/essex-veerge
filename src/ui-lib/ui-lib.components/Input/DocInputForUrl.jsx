import {useEffect, useState} from 'react';
import HoverText from '../hoverOnText/hoverOnText';
import docIcon from '/src/images/icons/fileIcon.svg';
import trashIcon from '/src/images/icons/trashIcon.svg';
import {Box, Button, HStack, Progress, Image, Input, Text} from '@chakra-ui/react';

export const DocInputForUrl = ({
  useAuthStyle,
  docName,
  isFileUploadProgress,
  selectedDocStyle = {
    wrapper: {},
    DocImg: {},
    DocImgWrapper: {},
    text: {},
    trashImg: {},
  },
  selectDocStyle = {
    wrapperStyle: {},
    uploadBtnStyle: {},
    emptyStateTextStyle: {},
  },
  docObj,
  lengthToBeTruncated = 41,
  removeFile,
  handleIdDoc,
  file,
  contract,
  component,
}) => {
  const isMultipleDocumentActive = contract
    ? docObj?.name !== '' && contract !== ''
    : docObj?.name !== '' || contract !== '';

  return (!docObj?.name || docObj?.name == '' || contract == '') && component ? (
    component
  ) : isMultipleDocumentActive ? (
    <Box>
      <HStack
        w="full"
        px="15px"
        maxH="50px"
        h="fit-content"
        py="9px"
        border="1px solid #E4E4E4"
        borderRadius="8px"
        justify="space-between"
        {...selectedDocStyle.wrapper}
        bg={useAuthStyle ? '#1A1A1A' : ''}
        opacity={isFileUploadProgress ? 0.3 : 1}
      >
        <HStack spacing="13px">
          <HStack
            p="8px"
            borderRadius="full"
            bg="rgba(69, 69, 254, 0.08)"
            border="4px solid rgba(69, 69, 254, 0.04)"
            {...selectedDocStyle.DocImgWrapper}
          >
            <Image src={docIcon.src} alt="doc icon" {...selectedDocStyle.DocImg} />
          </HStack>

          <HoverText
            lens={lengthToBeTruncated}
            text={(docName || docObj?.name) ?? ''}
            {...selectedDocStyle.text}
          />
        </HStack>
        <Image
          cursor="pointer"
          alt="trash icon"
          src={trashIcon.src}
          onClick={removeFile}
          {...selectedDocStyle.trashImg}
        />
      </HStack>
      {isFileUploadProgress && (
        <Progress hasStripe isIndeterminate value={100} size="xs" rounded={'md'} />
      )}
    </Box>
  ) : (
    <HStack
      border="1px solid #E4E4E4"
      spacing="20px"
      borderRadius="8px"
      w="full"
      p="8px 12px"
      maxH="50px"
      {...selectDocStyle.wrapperStyle}
    >
      <Box position="relative" h="fit-content" overflow="hidden" display="inline-block">
        <Input
          type="file"
          onChange={event => handleIdDoc(event.currentTarget.files)}
          id="file"
          name={file}
          opacity={0}
          position="absolute"
          top={0}
          right={0}
          m={0}
          p={0}
          fontSize="20px"
          cursor="pointer"
          accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/pdf"
        />
        <Button
          as="label"
          htmlFor="file"
          backgroundColor="#000"
          color="#ffffff"
          _hover={{
            opacity: '1',
          }}
          _active={{
            opacity: '1',
          }}
          _focus={{
            opacity: '1',
          }}
          padding="7px 10px"
          h="full"
          borderRadius="10px"
          display="inline-block"
          cursor="pointer"
          fontSize="16px"
          fontWeight="400"
          {...selectDocStyle.uploadBtnStyle}
        >
          Upload
        </Button>
      </Box>
      <Text
        color="#919191"
        fontSize="16px"
        fontWeight="400"
        {...selectDocStyle.emptyStateTextStyle}
      >
        No file chosen
      </Text>
    </HStack>
  );
};

export default DocInputForUrl;
