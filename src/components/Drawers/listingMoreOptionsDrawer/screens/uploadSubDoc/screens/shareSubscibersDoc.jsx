import React, {useState} from 'react';
import {
  Button,
  DrawerBody,
  DrawerFooter,
  Flex,
  HStack,
  Image,
  Input,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import {IoArrowBackSharp} from 'react-icons/io5';
import uploadIcon from '/src/images/icons/uploadForHomeOwnerPacket.svg';
import DocInput from 'ui-lib/ui-lib.components/Input/DocInput';
import {encodeFileToBase64} from 'utils';
import {uploadSubscribersDoc} from 'apis/customers';
import {useMutation} from '@tanstack/react-query';
import {useRouter} from 'next/router';

const ShareSubscibersDoc = ({handleScreen, handleClose, forUnits}) => {
  const [docObj, setDocObj] = useState({name: ''});
  const [payload, setPayload] = useState({doc: '', doc_name: ''});
  const toast = useToast();
  const selectedDocStyle = {};
  const selectDocStyle = {
    uploadBtnStyle: {
      bg: '#919191',
    },
  };
  const removeFile = () => {
    setDocObj({name: ''});
    setPayload(prev => ({...prev, doc: ''}));
  };
  const router = useRouter();

  const listingId = router.query.listingId;
  const unitId = router.query.unitId;

  const requestedId = listingId || unitId;

  const handleDocSelection = async arg => {
    setDocObj(arg[0]);
    const doc = await encodeFileToBase64(arg[0]).then(res => res);
    setPayload(prev => ({...prev, doc}));
  };
  const handleInput = e => {
    const {name, value} = e.target;
    return setPayload(prev => ({...prev, [name]: value}));
  };

  const {mutate, isLoading} = useMutation(
    values => {
      return uploadSubscribersDoc(requestedId, values);
    },
    {
      onSuccess: async res => {
        toast({
          title: `Document Shared Successfully`,
          status: 'success',
          duration: 8000,
          isClosable: true,
          position: 'top-right',
        });
        setDocObj({name: ''});
        setPayload({doc: '', doc_name: ''});
        return handleClose();
      },
      onError: error => {
        return toast({
          title: 'Oops ...',
          description: `${
            error?.response?.status === 500
              ? "Apologies for the inconvenience. We're working on it. Please try again later."
              : error?.response?.status === 401
                ? 'Authentication Timeout: For security reasons, your session has timed out. Please log in again to continue.'
                : (error?.response?.data?.message ??
                  error?.response?.message ??
                  error?.message ??
                  'Something went wrong')
          }`,
          status: 'error',
          duration: 8000,
          isClosable: true,
          position: 'top-right',
        });
      },
    }
  );

  //   v2/developers/upload-packets/:listing_ID OR :UNIT_ID"
  // {
  //   "document":"",
  //   "project": TRUE OR "unit": TRUE
  // }
  // POST
  const handleSubmit = () => {
    const body = {
      document_name: payload.doc_name,
      document: payload.doc,
      [forUnits ? 'unit' : 'project']: true,
    };
    // console.log({body});
    mutate(body);
  };

  const isValid = !!payload.doc.length && !!payload.doc_name.trim();

  return (
    <>
      <HStack
        boxShadow="0px 3.206px 6.413px 0px rgba(0, 0, 0, 0.02)"
        mb="10px"
        py="12px"
        bg="#F5F5F5"
        h="49.7px"
        px="23.2px"
        justify="start"
        align="center"
        position="relative"
        width="full"
      >
        <Flex alignItems="center" gap={2}>
          <IoArrowBackSharp
            fontSize="20px"
            cursor="pointer"
            onClick={handleScreen('what does this mean')}
          />
          <Text fontSize="16.032px" fontWeight={600} color="#191919">
            Share {forUnits ? 'Unit' : 'Listing'} Document
          </Text>
        </Flex>
      </HStack>
      <DrawerBody p="24px">
        <Stack spacing="24.46px">
          <Stack spacing="5px" w={`100%`}>
            <Text fontFamily="Euclid Circular B" fontWeight="400" color="#191919" fontSize="14px">
              Document Name
            </Text>

            <Input
              placeholder="Enter Document Name"
              fontWeight="400"
              fontSize="14px"
              w="full"
              color="#191919"
              _placeholder={{
                color: '#606060',
              }}
              border="1px solid #E4E4E4"
              h="50px"
              name="doc_name"
              onChange={handleInput}
              type="text"
              value={payload.doc_name}
            />
          </Stack>
          <Stack spacing="5px" w={`100%`}>
            <Text fontFamily="Euclid Circular B" fontWeight="400" color="#191919" fontSize="14px">
              Upload Document
            </Text>

            <DocInput
              selectedDocStyle={selectedDocStyle}
              selectDocStyle={selectDocStyle}
              file={`document`}
              removeFile={removeFile}
              contract={''}
              docObj={docObj}
              handleIdDoc={handleDocSelection}
            />
          </Stack>
        </Stack>
      </DrawerBody>
      <DrawerFooter w="full" p="0px 26.75px 70.54px 27.76px">
        <Button
          borderRadius={'72px'}
          color="#FFF"
          bg="#191919"
          w={'full'}
          h={'45px'}
          fontWeight={400}
          isLoading={isLoading}
          isDisabled={!isValid}
          onClick={handleSubmit}
          leftIcon={<Image boxSize="19.238px" src={uploadIcon.src} alt="upload icon" />}
          _hover={{bg: '#191919'}}
        >
          Upload
        </Button>
      </DrawerFooter>
    </>
  );
};

export default ShareSubscibersDoc;
