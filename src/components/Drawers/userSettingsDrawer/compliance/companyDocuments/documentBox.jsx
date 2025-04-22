import React, {useEffect, useRef, useState} from 'react';
import {useRouter} from 'next/router';
import {
  Box,
  Divider,
  Flex,
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
import {AddIcon} from '@chakra-ui/icons';

import successGif from '/src/images/check-icon.gif';
import imageIcon from '/src/images/icons/UploadIconSetting.svg';
import docIconForUser from '/src/images/icons/docForUserTerms.svg';
import docIconForAgent from '/src/images/icons/docForAgentTerms.svg';

import rightArrow from '/src/images/icons/right-angle.png';

import {useMutation, useQuery} from '@tanstack/react-query';

import {Container3} from '@/components/common/containers';
import {HiOutlineDocumentText, HiOutlinePlus} from 'react-icons/hi';
import {Button, CreateToast, Popup2} from 'ui-lib/ui-lib.components';
import {encodeFileToBase64} from '/src/utils';
import {uploadDeedDoc} from '/src/apis/requests';
import {
  fetchAgentTermsofUse,
  fetchTermsConditions,
  updateComplianceDocs,
  uploadTerms,
} from '/src/apis/settings';
import UpdatedDocs from '@/components/Cards/settingsDoc';
import {toastForError} from '/src/utils/toastForErrors';

export const DocumentBox = ({docs, fetchDoc}) => {
  const router = useRouter();
  const inputRef = useRef(null);

  const intitialStatus =
    typeof window !== 'undefined' &&
    JSON.parse(localStorage.getItem('loggedinUser')) &&
    JSON.parse(localStorage.getItem('loggedinUser')).initial_status;

  const {data, isError, isLoading, refetch, isRefetching} = useQuery(
    ['fetchTErmandConditions'],
    fetchTermsConditions
  );
  console.log(docs);

  // const handleUploadDocs = () => {
  //   router.push("settings/compliance/uploadDocument");
  // };
  const {onOpen: docOnOpen, isOpen: docIsOpen, onClose: docOnClose} = useDisclosure();

  // const {
  //   onOpen: idOnOpen,
  //   isOpen: idIsOpen,
  //   onClose: idOnClose,
  // } = useDisclosure();

  const toast = useToast();
  const toaster = CreateToast();

  const {
    data: agentData,
    isError: agentDocIsError,
    refetch: agentDateRefetch,
  } = useQuery(['fetchAgentTErmandConditions'], fetchAgentTermsofUse);

  console.log(agentData);

  console.log(docs);
  const agent_terms_and_condition_url = agentData?.data?.message?.document ?? '';

  const terms_and_condition_url = data?.data?.message?.document ?? '';

  const mutation = useMutation(formData => uploadTerms(formData), {
    onSuccess: async res => {
      await agentDateRefetch();
      toaster('Agent terms uploaded successfully');
      // return success.onOpen();
    },
    onError: err => {
      toastForError(err, true, toast);
    },
  });

  const handleAgentTermsUpload = async e => {
    const prefixRegex = /^data:(image\/(png|jpeg|gif)|application\/pdf);base64,/;

    const files = e.target.files?.[0];
    const result = await encodeFileToBase64(files);
    console.log(files, result.replace(prefixRegex, ''));

    return mutation.mutate({
      document: result.replace(prefixRegex, ''),
      type: 'agent',
    });
  };

  return intitialStatus != 'Pending' ? (
    <Container3
      // spacing="18px"
      // my="0"
      // title={'Business Profile'}
      border=" 1px solid #EAECF0"
      // titleFontSize="16px"
    >
      <HStack
        // px="26px"
        // py="23px"
        px="24px"
        py="25px"
        // my="15px"
        maxW="100%"
        align="start"
        background="#FFFFFF"
        borderRadius={'16px'}
      >
        <HStack w="full" justify="space-between">
          {/* <HiOutlineDocumentText size={"40px"} /> */}
          <HStack spacing="42px">
            <Image src={docIconForAgent.src} alt="doc icon" />

            <VStack spacing="8px" w="full" alignItems={'start'} align="start" textAlign={'left'}>
              <Text
                fontWeight="500"
                fontSize="18px"
                lineHeight="23px"
                textAlign="start"
                color={agent_terms_and_condition_url ? '#191919' : '#4545FE'}
              >
                {agent_terms_and_condition_url ? '' : 'Upload'} {"Agent's"} Privacy policy & Terms
                of Use for Application
              </Text>
              {agent_terms_and_condition_url ? (
                <HStack
                  cursor="pointer"
                  onClick={() => window.open(agent_terms_and_condition_url, '_blank')}
                  spacing="11px"
                >
                  <Text
                    fontWeight="500"
                    fontSize="18px"
                    lineHeight="18px"
                    textAlign="left"
                    color="#4545FE"
                  >
                    View
                  </Text>
                  <Image src={rightArrow.src} alt="doc icon" />
                </HStack>
              ) : (
                ''
              )}
            </VStack>
          </HStack>
          {/* <UploadDoc
            // document={"document"}

            terms={terms_and_condition_url}
            refetch={refetch}
            isError={isError}
          /> */}
          <Box cursor="pointer" position="relative">
            <Input
              type="file"
              w="full"
              opacity="0"
              zIndex={1}
              h="full"
              position="absolute"
              ref={inputRef}
              onChange={handleAgentTermsUpload}
              top="0"
              left="0"
              accept=".pdf"
              // isDisabled={isLoading}
              _disabled={{bg: 'transparent', opacity: '0'}}
            />

            <Button
              justifySelf="flex-end"
              variant="dark"
              w="102px"
              mt="0px"
              h="41px"
              fontSize="14px"
              fontWeight="400px"
              borderRadius="12px"
              p="0px"
            >
              {mutation.isLoading ? (
                <Spinner />
              ) : agent_terms_and_condition_url ? (
                'Update'
              ) : (
                'Upload'
              )}
            </Button>
          </Box>
        </HStack>
      </HStack>
      <Divider border=" 1px solid #EAECF0" />
      <HStack
        // px="26px"
        // py="23px"
        px="24px"
        py="25px"
        // my="15px"
        maxW="100%"
        align="start"
        background="#FFFFFF"
        borderRadius={'16px'}
      >
        <HStack justify="space-between" w="full" spacing={5}>
          {/* <HiOutlineDocumentText size={"40px"} /> */}
          <HStack spacing="42px" justify="start">
            <Image src={docIconForUser.src} alt="doc icon" />
            <VStack spacing="8px" w="full" alignItems={'start'} align="start" textAlign={'left'}>
              <Text
                fontWeight="500"
                fontSize="18px"
                lineHeight="23px"
                color={terms_and_condition_url ? '#191919' : '#4545FE'}
              >
                {terms_and_condition_url ? '' : 'Upload'} Privacy policy & Terms of Use for
                Application
              </Text>
              {terms_and_condition_url ? (
                <HStack
                  cursor="pointer"
                  onClick={() => window.open(terms_and_condition_url, '_blank')}
                  spacing="11px"
                >
                  <Text fontWeight="500" fontSize="18px" lineHeight="18px" color="#4545FE">
                    View
                  </Text>
                  <Image src={rightArrow.src} alt="doc icon" />
                </HStack>
              ) : (
                ''
              )}
            </VStack>
          </HStack>
          <UploadDoc
            // document={"document"}

            terms={terms_and_condition_url}
            refetch={refetch}
            isError={isError}
          />
        </HStack>
      </HStack>
    </Container3>
  ) : null;
};

export default DocumentBox;

function UploadDoc({terms, isError, title = 'Terms & Condition', document = '', refetch}) {
  const [files, setFiles] = useState('');
  const uploadPop = useDisclosure();
  const success = useDisclosure();
  const [imageSrc, setImageSrc] = useState('');

  const toast = useToast();
  const mutation = useMutation(formData => uploadTerms(formData), {
    onSuccess: async res => {
      await refetch();
      return success.onOpen();
    },
    onError: err => {
      toast({
        title: 'An error occured',
        description: `${err?.response?.message ?? err?.message ?? err?.code ?? 'An error occured'}`,
        status: 'error',
        duration: 8000,
        isClosable: true,
        position: 'top-right',
      });
    },
  });

  const DocUpdate = useMutation(formData => updateComplianceDocs(formData), {
    onSuccess: async res => {
      await refetch();
      return success.onOpen();
    },
    onError: err => {
      toast({
        title: 'An error occured',
        description: `${err?.response?.message ?? err?.message ?? err?.code ?? 'An error occured'}`,
        status: 'error',
        duration: 8000,
        isClosable: true,
        position: 'top-right',
      });
    },
  });

  const handleChange = async e => {
    const file = e.target.files[0];

    if (file?.size > 2000000) {
      return toast({
        title: 'hmm...',

        description: `File too large: file is larger than 2MB`,
        status: 'error',
        duration: 8000,
        isClosable: true,
        position: 'top-right',
      });
    }

    const result = e.target.files[0];
    if (result) {
      setImageSrc(URL?.createObjectURL(e.target.files[0]));
      return setFiles(result);
    }

    return;
  };

  const uploadDoc = async () => {
    const prefixRegex = /^data:(image\/(png|jpeg|gif)|application\/pdf);base64,/;
    const result = await encodeFileToBase64(files);

    if (title === 'document') {
      return DocUpdate.mutate({
        'update-documents': true,
        documents: [result.replace(prefixRegex, '')],
      });
    } else {
      mutation.mutate({
        document: result.replace(prefixRegex, ''),
      });
    }
  };

  const closeAll = () => {
    setFiles('');
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

  return (
    <>
      {title === 'document' ? (
        <AddIcon cursor={'pointer'} fontSize="24px" color="#374957" onClick={uploadPop.onOpen} />
      ) : (
        <Button
          justifySelf="flex-end"
          onClick={uploadPop.onOpen}
          variant="dark"
          w="102px"
          mt="0px"
          h="41px"
          fontSize="14px"
          fontWeight="400px"
          borderRadius="12px"
          p="0px"
        >
          {!!terms ? 'Update' : 'Upload'}
        </Button>
      )}
      <Popup2 isOpen={uploadPop.isOpen} onClose={() => (setFiles(''), uploadPop.onClose())}>
        <Popup2.Header textTransform="capitalize" fontSize="24px" mb="22px" fontWeight="600">
          {`Upload ${title}`}
        </Popup2.Header>
        <Popup2.Body pr="0">
          <VStack spacing="47px" w="full">
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
                    bg="rgba(62,62,66,0.08)"
                    position="relative"
                    spacing="9px"
                    borderRadius="5px"
                    px="20px"
                    py="10px"
                    boxShadow=" 0 0 20px rgba(0,0,0,0.03)"
                    // transform="translateY(-5px)"
                  >
                    <Image src={docIconForUser.src} alt="doc icon" />

                    <Text
                      maxW="200px"
                      fontSize="14px"
                      fontWeight="600"
                      textTransform="capitalize"
                      as="span"
                    >
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
                  <Text
                    as="span"
                    color="#919191"
                    fontWeight="400"
                    textTransform="capitalize"
                    fontSize="18px"
                  >
                    {`Upload ${document}`}
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
              onClick={uploadDoc}
              type="button"
              // mt="79px"
              mt="0px"
              notes
              // bg="#4545FE"
              variant={'dark'}
              color="#ffffff"
              fontSize="16px"
              isDisabled={mutation.isLoading || !files}
              fontWeight="400"
              borderRadius="72px"
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
              {title === 'document'
                ? 'Compliance Document Updated Successfully'
                : 'Terms and Conditions uploaded successfully'}
            </Text>
            <Button
              onClick={closeAll}
              type="button"
              borderRadius="72px"
              mt="79px"
              notes
              // bg="#4545FE"
              variant={'dark'}
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
