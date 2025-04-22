import React, {useState} from 'react';
import {LayoutView} from '../../../../../../components/PageLayout/LayoutView';
import {Box, Button, HStack, Spinner, Text, useToast} from '@chakra-ui/react';
import {BackArrowWithText} from '../../../../../../components/assets/BackArrow';
import {MultipleFileUploads} from '../../../../../../ui-lib/ui-lib.components';
import {useMutation} from '@tanstack/react-query';
import {uploadAllocationsDiagram} from '../../../../../../apis/listings';

export const UploadAllocationDiagram = ({unitInfo}) => {
  const toast = useToast();
  const [files, setFiles] = useState([]);
  const mutation = useMutation(body => uploadAllocationsDiagram(unitInfo?.id, body), {
    onSuccess: res => {
      console.log(res);
      toast({
        title: 'Success',
        status: 'success',
        duration: 4000,
        isClosable: true,
        position: 'top-right',
      });
    },
    onError: err => {
      console.log(err);
      toast({
        title: `${err?.response?.data?.message || 'Upload failed'}`,
        status: 'error',
        duration: 4000,
        isClosable: true,
        position: 'top-right',
      });
    },
  });
  const handleProceed = () => {
    console.log('proceed');
  };
  return (
    <div style={{background: '#FAFAFA'}}>
      <LayoutView activePage="listings" />
      <Box mt="-85.3vh" maxW="1280px" mx="auto" pb="80px">
        <BackArrowWithText pl={4} mb={4} text={'Back'} />
        <Text py="34px" fontSize={'32px'} fontWeight={'500'}>
          Upload Allocation Diagram
        </Text>
        <Box>
          <MultipleFileUploads
            title={`Upload/Drag 'n' drop Image`}
            icon={imageIcon.src}
            files={files}
            setFiles={setFiles}
            type="image/*"
            maxFiles={10}
          />
        </Box>
        <HStack w="full" justify="flex-end" p="38px 26px 34px">
          <Button borderRadius="72px" variant="primary" w="202px" h="55px" onClick={handleProceed}>
            {mutation.isLoading ? <Spinner color="whitesmoke" /> : 'Proceed'}
          </Button>
        </HStack>
      </Box>
    </div>
  );
};

export default UploadAllocationDiagram;
