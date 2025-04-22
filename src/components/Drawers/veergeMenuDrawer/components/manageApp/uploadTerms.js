import React, {useRef, useState, useEffect} from 'react';
import rightArrow from '/src/images/icons/right-angle.png';
import docIcon from '/src/images/icons/docForUserTerms.svg';
import infoCircle from '/src/images/icons/blueInfoCircleManagaApp.svg';
import uploadIcon from '/src/images/icons/manageappUploadIcon.svg';
import {
  Box,
  Flex,
  Heading,
  HStack,
  Image,
  Input,
  Spinner,
  Text,
  Button,
  useDisclosure,
  useToast,
  VStack,
  StackDivider,
} from '@chakra-ui/react';
import {encodeFileToBase64} from '../../../../../utils';

export const UploadTerms = ({
  agent_terms_and_condition_url,
  agent_privacy_policy,
  mutation,
  user_terms_and_condition_url,
  user_privacy_policy,
  manageAppPatchHandler,
}) => {
  const inputUserRef = useRef(null);
  const inputAgentRef = useRef(null);

  const [isUserLoading, setIsUserLoading] = useState(false);
  const [isUserPPLoading, setIsUserPPLoading] = useState(false);
  const [isAgentLoading, setIsAgentLoading] = useState(false);
  const [isAgentPPLoading, setIsAgentPPLoading] = useState(false);

  const toast = useToast();

  useEffect(() => {
    if (!mutation.isLoading) {
      setIsUserLoading(false);
      setIsUserPPLoading(false);
      setIsAgentLoading(false);
      setIsAgentPPLoading(false);
    }
  }, [mutation.isLoading]);

  const handleTermsUpload = async (e, param, type, setIsLoading) => {
    const file = e.target.files?.[0];

    // Validate file type
    if (file?.type !== 'application/pdf') {
      toast({
        title: 'Invalid File Type',
        description: 'Please upload a valid PDF file.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      e.target.value = '';
      return;
    }
    const FILE_SIZE_LIMIT = 10;

    // Validate file size
    const maxSize = FILE_SIZE_LIMIT * 1024 * 1024; // FILE_SIZE_LIMIT in bytes

    if (file.size > maxSize) {
      toast({
        title: 'File Too Large',
        description: `File size must be less than ${FILE_SIZE_LIMIT}MB.`,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      e.target.value = '';
      return;
    }

    setIsLoading(true);

    try {
      const prefixRegex = /^data:(image\/(png|jpeg|gif)|application\/pdf);base64,/;
      const result = await encodeFileToBase64(file);
      const body = {
        document: result.replace(prefixRegex, ''),
        type,
      };
      const prop = {
        body,
        param,
      };
      await mutation.mutateAsync(prop);
    } catch (error) {
      toast({
        title: 'Upload Failed',
        description: 'An error occurred while uploading the file.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderUploadSection = (title, url, ref, isLoading, setIsLoading, param, type) => (
    <HStack w="full" justify="space-between" px="12px">
      <VStack spacing="8px" alignItems="start">
        <HStack spacing="8px" align="center">
          <Image src={docIcon.src} alt="doc icon" />
          <Text fontWeight="400" fontSize="14px" color="#191919">
            {title}
          </Text>
        </HStack>
        {url && (
          <HStack cursor="pointer" onClick={() => window.open(url, '_blank')} spacing="11px">
            <Text fontWeight="500" fontSize="12px" color="#4545FE">
              View
            </Text>
            <Image src={rightArrow.src} alt="doc icon" />
          </HStack>
        )}
      </VStack>
      <Box cursor="pointer" position="relative">
        <Input
          type="file"
          w="full"
          opacity="0"
          zIndex={2}
          h="full"
          position="absolute"
          ref={ref}
          onChange={e => handleTermsUpload(e, param, type, setIsLoading)}
          top="0"
          left="0"
          accept=".pdf"
          isDisabled={isLoading}
          cursor="pointer"
          _disabled={{bg: 'transparent', opacity: '0'}}
        />
        {isLoading ? <Spinner /> : <Image src={uploadIcon.src} alt="upload icon" />}
      </Box>
    </HStack>
  );

  return (
    <VStack
      bg="#F9FAFB"
      borderRadius="4px"
      border="1px solid #E4E4E4"
      justify="start"
      w="full"
      p="12px"
      px="0px"
      divider={<StackDivider borderColor="#E4E4E4" my="12px !important" />}
    >
      {renderUploadSection(
        "User's Terms of Use",
        user_terms_and_condition_url,
        inputUserRef,
        isUserLoading,
        setIsUserLoading,
        '?customer_document=true',
        'customer'
      )}
      {renderUploadSection(
        "User's Privacy Policy",
        user_privacy_policy,
        inputUserRef,
        isUserPPLoading,
        setIsUserPPLoading,
        '?customer_document=true',
        'customerprivacypolicy'
      )}
      {renderUploadSection(
        "Realtor's Terms of Use",
        agent_terms_and_condition_url,
        inputAgentRef,
        isAgentLoading,
        setIsAgentLoading,
        '?agent_document=true',
        'agent'
      )}
      {renderUploadSection(
        "Realtor's Privacy Policy",
        agent_privacy_policy,
        inputAgentRef,
        isAgentPPLoading,
        setIsAgentPPLoading,
        '?agent_document=true',
        'agentprivacypolicy'
      )}
    </VStack>
  );
};

export default UploadTerms;
