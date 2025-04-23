import {
  Box,
  Heading,
  HStack,
  Image,
  Input,
  Spinner,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react';
import React, {useState, useEffect} from 'react';
import successGif from '/src/images/check-icon.gif';

import {Button, Popup2} from '../../../ui-lib/ui-lib.components';
import uploadIcon from '/src/images/icons/uploadIconReq.svg';
import imageIcon from '/src/images/icons/image-upload.png';

import {encodeFileToBase64} from '../../../utils';
import {useMutation} from '@tanstack/react-query';
import {uploadDeedDoc} from '../../../apis/requests';

export default function UploadDoc({id, refetch}) {
  const [files, setFiles] = useState('');
  const [progress, setProgress] = useState(0);
  const uploadPop = useDisclosure();
  const success = useDisclosure();
  const [imageSrc, setImageSrc] = useState('');
  console.log(refetch);
  console.log(files);

  console.log(progress);
  const toast = useToast();
  const mutation = useMutation(formData => uploadDeedDoc(id, formData), {
    onSuccess: res => {
      // console.log('response', res);
      return success.onOpen();
    },
    onError: err => {
      toast({
        title: 'An error occured',
        description: `${err?.code} : ${err?.message}`,
        status: 'error',
        duration: 8000,
        isClosable: true,
        position: 'top-right',
      });
    },
  });

  const handleChange = async e => {
    console.log(e.target.files[0]);
    const result = e.target.files[0];
    setImageSrc(URL?.createObjectURL(e.target.files[0]));
    return setFiles(result);
  };

  const uploadDeed = async () => {
    const prefixRegex = /^data:(image\/(png|jpeg|gif)|application\/pdf);base64,/;
    const result = await encodeFileToBase64(files);

    return mutation.mutate(
      {
        deed_file: result.replace(prefixRegex, ''),
        deed_title: '',
      }
      // ,
      // {
      //   onDownloadProgress: (progressEvent) => {
      //     const percentCompleted = Math.round(
      //       (progressEvent.loaded * 100) / progressEvent.total
      //     );

      //     console.log(percentCompleted);
      //     setProgress(percentCompleted);
      //   },
      // }
    );
  };

  const closeAll = async () => {
    await refetch();

    uploadPop.onClose();
    return success.onClose();
  };

  useEffect(() => {
    return () => {
      if (imageSrc) {
        URL.revokeObjectURL(imageSrc);
      }
    };
  }, [imageSrc]);

  // console.log(files.split(",")[0].split(":")[1]?.includes("application"));

  return (
    <>
      <Button
        onClick={uploadPop.onOpen}
        variant="primary"
        _hover={{
          opacity: '0.4',
        }}
        py="0px"
        mt="0px"
        w="149px"
        h="40px"
      >
        <Image alt="" src={uploadIcon.src} mr={2} /> Upload
      </Button>
      <Popup2 isOpen={uploadPop.isOpen} onClose={uploadPop.onClose}>
        <Popup2.Header fontSize="24px" mb="22px" fontWeight="600">
          Upload Deed
        </Popup2.Header>
        <Popup2.Body pr="0">
          <VStack spacing="47px" w="full">
            {/* <FileUploads
              w="full"
              minW="fit-content"
              imageColumns={3}
              title={`Upload/Drag 'n' drop Image`}
              icon={imageIcon.src}
              type={{ "image/*": [".jpg", ".png"] }}
              files={files}
              setFiles={setFiles}
              maxFiles={3}
            /> */}
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              h="219px"
              w="full"
              position="relative"
              borderRadius="32px"
              border="1px solid #4545FE"
            >
              {files ? (
                files.type.includes('application') ? (
                  <HStack
                    minW="150px"
                    px="10px"
                    height="150px"
                    bg="#636e72"
                    justify="center"
                    boxShadow=" 0 0 20px rgba(0,0,0,0.03)"
                    borderRadius="12px"
                    // transform="translateY(-5px)"
                    border="1px solid #e4e4e4"
                  >
                    <Text maxW="250px" color="#ffffff" textTransform="capitalize" as="span">
                      {files.name}
                    </Text>
                  </HStack>
                ) : (
                  <HStack borderRadius="12px" border="1px solid #e4e4e4">
                    <Image
                      alt=""
                      boxShadow=" 0 0 20px rgba(0,0,0,0.2)"
                      borderRadius="12px"
                      src={imageSrc}
                      boxSize="150px"
                      objectFit="cover"
                    />
                  </HStack>
                )
              ) : (
                <VStack spacing="14px">
                  <Image src={imageIcon.src} alt="uplaod" />
                  <Text as="span" color="#919191" fontWeight="400" fontSize="18px">
                    Upload Deed
                  </Text>
                </VStack>
              )}
              <Input
                onChange={handleChange}
                opacity="0"
                position="absolute"
                top="0"
                left="0"
                w="100%"
                h="100%"
                type="file"
                accept="application/pdf"
                multiple={false}
              />
            </Box>
            <Button
              onClick={uploadDeed}
              type="button"
              mt="0px"
              notes
              bg="#4545FE"
              color="#ffffff"
              fontSize="16px"
              borderRadius="72px"
              fontWeight="400"
              isDisabled={!files}
              w="full"
            >
              {mutation.isLoading ? <Spinner color="black" /> : 'Proceed'}
            </Button>
          </VStack>
        </Popup2.Body>
      </Popup2>
      <Popup2 isOpen={success.isOpen} onClose={closeAll}>
        <Popup2.Body pr="0">
          <VStack w="full" spacing="none">
            <Image src={successGif.src} w="88px" mb="23px" alt="success image" fontSize="10px" />
            <Heading as="h2" fontSize="24px" fontWeight="600">
              Successful
            </Heading>
            <Text as="span" mt="15px" fontSize="16px" fontWeight="300">
              Deed uploaded successfully
            </Text>
            <Button
              onClick={closeAll}
              type="button"
              mt="79px"
              notes
              bg="#4545FE"
              borderRadius="72px"
              color="#ffffff"
              fontSize="16px"
              fontWeight="400"
              w="full"
            >
              Proceed
            </Button>
          </VStack>
        </Popup2.Body>
      </Popup2>
    </>
  );
}
