import {Box, Button, HStack, Image, Input, Spinner, Text} from '@chakra-ui/react';
import trashIcon from '/src/images/icons/trashIcon.svg';
import authTrashIcon from '/src/images/icons/authTrashIcon.svg';
import docIcon from '/src/images/icons/fileIcon.svg';
import authDocIcon from '/src/images/icons/authFileIcon.svg';
import {truncateLongText} from 'utils';
import HoverText from '../hoverOnText/hoverOnText';

export const DocInput = ({
  useAuthStyle,
  docName,
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
  inputPropObj,
  lengthToBeTruncated = 41,
  removeFile,
  handleIdDoc,
  file,
  contract,
  component,
  loading,
}) => {
  const isMultipleDocumentActive = contract
    ? docObj?.name !== '' && contract !== ''
    : docObj?.name !== '' || contract !== '';

  return (!docObj?.name || docObj?.name == '' || contract == '') && component ? (
    component
  ) : isMultipleDocumentActive ? (
    <HStack
      w="full"
      px="15px"
      maxH={useAuthStyle ? '55px' : '50px'}
      h="fit-content"
      py={useAuthStyle ? 4 : '9px'}
      border={useAuthStyle ? '1px solid #3F3F3F' : '1px solid #E4E4E4'}
      borderRadius="8px"
      justify="space-between"
      {...selectedDocStyle.wrapper}
      bg={useAuthStyle ? '#1A1A1A' : ''}
    >
      {loading ? (
        <Spinner />
      ) : (
        <HStack justify={'space-between'} w={'full'}>
          <HStack spacing="13px">
            <HStack
              p="8px"
              borderRadius="full"
              bg={useAuthStyle ? 'rgba(255, 255, 0, 0.25);' : 'rgba(69, 69, 254, 0.08)'}
              border={
                useAuthStyle
                  ? '4px solid rgba(255, 255, 0, 0.12)'
                  : '4px solid rgba(69, 69, 254, 0.04)'
              }
              {...selectedDocStyle.DocImgWrapper}
            >
              <Image
                src={useAuthStyle ? authDocIcon.src : docIcon.src}
                alt="doc icon"
                {...selectedDocStyle.DocImg}
              />
            </HStack>
            <Text {...selectedDocStyle.text} pr={'7px'} fontWeight={500}>
              {truncateLongText((docName || docObj?.name) ?? '', 20)?.truncatedText}
            </Text>
          </HStack>
          <Image
            src={useAuthStyle ? authTrashIcon.src : trashIcon.src}
            cursor="pointer"
            onClick={removeFile}
            alt="trash icon"
            {...selectedDocStyle.trashImg}
          />
        </HStack>
      )}
    </HStack>
  ) : (
    <HStack
      border="1px solid #E4E4E4"
      spacing="20px"
      borderRadius="8px"
      w="full"
      p="8px 12px"
      position="relative"
      maxH="50px"
      {...selectDocStyle.wrapperStyle}
    >
      <Box h="fit-content" overflow="hidden" display="inline-block">
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
          autocapitalize="characters"
          {...inputPropObj}
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
          padding="8px 12px"
          h="full"
          display="inline-block"
          cursor="pointer"
          fontSize="14px"
          fontWeight="400"
          rounded='full'
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

export default DocInput;
