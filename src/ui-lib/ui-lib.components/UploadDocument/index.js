import {useDropzone} from 'react-dropzone';
import React, {useCallback, useEffect} from 'react';
import {Box, Image, Text, VStack} from '@chakra-ui/react';
import fallbackUpload from '../../../images/fallback_upload.png';
import {encodeFileToBase64} from '../../../utils';

const fileContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: '16px 0',
};

const thumb = {
  borderRadius: 2,
  marginBottom: 8,
  marginRight: 8,
  padding: 4,
  boxSizing: 'border-box',
  display: 'inline-flex',
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden',
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%',
};

export const UploadDocument = ({files, setFiles, maxNum}) => {
  const {getRootProps, getInputProps} = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.png'],
    },
    maxFiles: maxNum || 1,
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

  const thumbs = files?.map(file => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <li key={file.path}>
          {file.path} - {file.size} bytes
        </li>
      </div>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files?.forEach(file => URL.revokeObjectURL(file.preview));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <VStack
      my={4}
      as="div"
      type="file"
      cursor="pointer"
      borderRadius={'xl'}
      border="1px #dee solid"
      h="fit-content"
      minH={!thumbs.length ? '96px' : '50px'}
      justify={!thumbs.length ? 'flex-end' : 'center'}
      {...getRootProps({className: 'dropzone'})}
    >
      {!thumbs.length ? (
        <Box>
          <VStack py={5}>
            <Image alt="" src={fallbackUpload.src} />
            <input {...getInputProps()} />
            <Text color={'#FFFFFF'} variant="outline" w="130px" h="38px">
              Upload valid ID
            </Text>
            <small style={{color: 'gray'}}>only images are allowed</small>
          </VStack>
        </Box>
      ) : (
        <aside style={fileContainer}>{maxNum == 1 ? thumbs[thumbs.length-1] : thumbs}</aside>
      )}
    </VStack>
  );
};
export default UploadDocument;
export {UploadStoreDocument} from './uploadDocument2';
