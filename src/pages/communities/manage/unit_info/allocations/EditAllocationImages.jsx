/* eslint-disable react-hooks/exhaustive-deps */
import {AddIcon, SmallCloseIcon} from '@chakra-ui/icons';
import {Box, Image, Icon, VStack, Center, Flex, useDisclosure, Text} from '@chakra-ui/react';
import React, {useCallback, useEffect, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import {encodeFileToBase64, extractBase64} from '/src/utils';
import {ShowEnlargedImage} from '/src/utils/ShowEnlargedImage';
import uploadImg from '/src/images/upload_diagram.png';

export const EditAllocationImages = ({
  type,
  title,
  componentTitle,
  icon,
  maxFiles,
  isDocs,
  files,
  setFiles,
  index,
  values,
  photoUrls,
  setPhotoUrl,
  photoString,
  setPhotoString,
  setFieldValue,
  imageColumns,
  ...rest
}) => {
  const IMAGE_MODAL = useDisclosure();
  const [enlargedImage, setEnlargedImage] = useState(null);
  const {isDragActive, getRootProps, getInputProps} =
    useDropzone({
      accept: {'image/*': ['.jpg', '.png']},
      minSize: 0,
      multiple: true,
      maxFiles: {maxFiles},
      onDrop: useCallback(acceptedFiles => {
        acceptedFiles.forEach(file => {
          encodeFileToBase64(file).then(res => {
            const newFile = Object.assign({image: res}, file, {
              preview: URL.createObjectURL(file),
            });
  
            setFiles(prevValue => [...prevValue, newFile]);
          });
        });
      }, []),
    });

  const removeFile = indx => {
    const copy = [...files];
    for (let i = 0; i < copy?.length; i++) {
      if (i == indx) {
        copy?.splice(i, 1);
        i = copy?.length;
      }
    }
    setFiles(copy);
  };

  useEffect(() => {
    setPhotoUrl(files?.filter(file => typeof file === 'string'));
    setPhotoString(files?.filter(file => typeof file == 'object' && extractBase64([file])));
  }, [files]);
  
  useEffect(() => {
    return () => files && files?.forEach(file => URL.revokeObjectURL(file?.preview));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const enlargeImage = index => {
    setEnlargedImage(files[index]);
    IMAGE_MODAL.onOpen();
  };

  return (
    <Box>
        <Box
          minW={{base: '90%', xl: '580px'}}
          minH="201px"
          h="fit-content"
          border="1px solid lightgray"
          borderRadius="32px"
          position={'relative'}
        >
          {files?.length > 0 ? (
            <Flex align={'center'} gap="20px" flexWrap={'wrap'} p={6}>
              <Center
                position={'absolute'}
                right={'2%'}
                bottom="7%"
                bg="#f5f5f5"
                h="30px"
                w="30px"
                borderRadius={'5px'}
                cursor={'pointer'}
                {...getRootProps({className: 'dropzone'})}
              >
                <AddIcon color="#4545FE" />
                <input {...getInputProps()} />
              </Center>
              {files.map((file, index) => (
                <Flex maxW="680px" wrap="flex-wrap" key={index} align="center" h="full">
                  <Box pos="relative" h="full" mr={8}>
                    <Flex
                      justify={'center'}
                      alignItems={'center'}
                      cursor="pointer"
                      onClick={() => removeFile(index)}
                      pos="absolute"
                      right="45%"
                      zIndex={1000}
                      bottom="5px"
                      width="20px"
                      height="20px"
                      borderRadius="20px"
                      alt="cancel_icon"
                      bg="#fff"
                    >
                      <Icon color="#000" width="10px" height="10px" as={SmallCloseIcon} />
                    </Flex>

                    <VStack
                      boxShadow={'sm'}
                      width="196px"
                      height="200px"
                      borderRadius="16px"
                      boxSize={140}
                      background={`linear-gradient(180deg, rgba(0, 0, 0, 0) 53.65%, #000000 100%)`}
                    >
                      <Image
                        alt=""
                        cursor={'pointer'}
                        onClick={() => enlargeImage(index)}
                        src={file.image || file}
                        width="full"
                        height="full"
                        borderRadius="16px"
                      />
                      <ShowEnlargedImage modalTriger={IMAGE_MODAL} imgSrc={enlargedImage} />
                    </VStack>
                  </Box>
                </Flex>
              ))}
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
              <Image alt="" mt={10} src={uploadImg.src} width="58px" height="58px" />
              {isDragActive ? (
                      <p>Drop the files here ...</p>
                    ) : (
                      <Text textAlign={'center'} maxWidth={'750px'}>You can easily add allocation layout by uploading them or simply dragging & dropping.
                      Keep in mind, you can add up to 5 images, with PNG and JPEG formats supported.</Text>
                    )}
            </VStack>
          )}
        </Box>
      </Box>
  );
};

export default EditAllocationImages;