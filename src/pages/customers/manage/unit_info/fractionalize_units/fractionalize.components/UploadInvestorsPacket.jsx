/* eslint-disable react-hooks/exhaustive-deps */
import {AddIcon, SmallCloseIcon} from '@chakra-ui/icons';
import {Box, Flex, Icon, Image, Text, VStack, useDisclosure} from '@chakra-ui/react';
import React, {useCallback, useEffect, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import {extractBase64, encodeFileToBase64} from '../../../../../../utils';

export const UploadInvestorsPacket = props => {
  const investorsPacketModal = useDisclosure();

  const {setInvestorsPacket, values, index, ...rest} = props;
  const [files, setFiles] = useState([]);
  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    accept: {'doc/pdf': ['.pdf']},
    onDrop: useCallback(acceptedFiles => {
      acceptedFiles.forEach(file =>
        encodeFileToBase64(file).then(res => {
          setFiles(prevValue => [
            ...prevValue,
            Object.assign({image: res}, file, {
              preview: URL.createObjectURL(file),
            }),
          ]);
        })
      );
    }),
  });
  const removeFile = index => {
    const copy = [...files];
    for (let i = 0; i < copy.length; i++) {
      if (i == index) {
        copy.splice(i, 1);
        i = copy.length;
      }
    }
    setFiles(copy);
  };

  // console.log(files);

  const thumbs =
    files &&
    files.length > 0 &&
    files.map((file, index) => (
      <Flex maxW="90%" wrap="flex-wrap" key={index} align="center" h="full">
        <Box pos="relative" h="full" mr={8}>
          <Icon
            as={SmallCloseIcon}
            cursor="pointer"
            onClick={() => removeFile(index)}
            pos="absolute"
            right="-20%"
            zIndex={1000}
            top="0"
            width="30px"
            height="30px"
            alt="cancel_icon"
            color="red"
          />

          <VStack
            px="10px"
            py={3}
            h="full"
            bg="gray.600"
            borderRadius={'lg'}
            boxSize={140}
            boxShadow={'lg'}
          >
            <Text color={'white'} wordBreak={'break-word'} fontSize={'24px'}>
              {file.length > 20 ? `${file.path.slice(0, 20)}...${file.path.slice(-3)}` : file.path}
            </Text>
          </VStack>

          {/* <Image
						boxSize={138}
						borderRadius='16px'
						src={file.image}
						// Revoke data uri after image is loaded
						onLoad={() => {
							URL.revokeObjectURL(file.image.src);
						}}
					/> */}
        </Box>
      </Flex>
    ));
  useEffect(() => {
    setInvestorsPacket(extractBase64(files));
  }, [files]);

  useEffect(() => {
    return () => files && files.forEach(file => URL.revokeObjectURL(file.preview));
  }, []);
  return (
    <Box
      minW={{base: '90%', xl: '580px'}}
      h="201px"
      border="1.5px solid #4545FE"
      borderRadius="32px"
      {...rest}
      mt="67px"
      onClick={investorsPacketModal.onOpen}
    >
      {files && files.length > 0 ? (
        <Flex align={'center'} p={6}>
          {thumbs}
          <input {...getInputProps()} />
          <div {...getRootProps({className: 'dropzone'})}>
            <Icon ml="33px" as={AddIcon} color="#4545FE" fontWeight={900} fontSize="70px" />
          </div>
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
            <p>
              Drag and drop your <b>investors packet</b> here
            </p>
          )}
        </VStack>
      )}
    </Box>
  );
};

export default UploadInvestorsPacket;
