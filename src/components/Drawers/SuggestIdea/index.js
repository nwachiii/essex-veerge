import {useState} from 'react';
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  Text,
  Box,
  Textarea,
  useToast,
  DrawerCloseButton,
  VStack,
  HStack,
  DrawerFooter,
} from '@chakra-ui/react';
import {suggestAFeature} from '../../../apis/veerge_menu';
import {useMutation} from '@tanstack/react-query';
import {scrollBarStyles} from '../../common/ScrollBarStyles';
import UploadImages from '../uploadImages';
import {Button} from 'ui-lib/ui-lib.components';

const SuggestIdea = ({suggestModal}) => {
  const [message, setMessage] = useState('');
  const toast = useToast();
  const [document, setDocument] = useState([]);

  const suggestMutation = useMutation(suggestAFeature, {
    onSuccess: async res => {
      handleResetModal();
      return toast({
        description: `We will be in touch with you if we need more information.`,
        title: 'Thank you',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    },
    onError: err => {
      toast({
        title: 'Oops...',
        description: `${
          err?.response?.data?.message ??
          err?.response?.message ??
          err?.response?.data[0] ??
          'Something went wrong'
        }`,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    },
  });

  const handleSubmit = () => {
    if (!isValid)
      return toast({
        description: `Please leave a comment`,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    const image = document.map(item => item?.image.replace('data:', '').replace(/^.+,/, ''));
    const body = {image, message, error: ''};
    return suggestMutation.mutate(body);
  };

  const handleResetModal = () => {
    setMessage('');
    setDocument([]);
    suggestMutation.reset();
    suggestModal.onClose();
  };

  const isValid = !!message.trim();

  return (
    <Drawer
      isCentered
      onCloseComplete={handleResetModal}
      blockScrollOnMount={true}
      onClose={suggestModal?.onClose}
      isOpen={suggestModal?.isOpen}
    >
      <DrawerOverlay />
      <DrawerContent
        marginTop="65px"
        maxW="400px"
        minH="437px"
        px="0"
        py="0"
        h="full"
        flex={1}
        justifyContent="space-between"
        maxH='calc(100vh - 65px)'
      >
        <Box>
          <HStack
            boxShadow="0px 3.20641px 6.41283px 0px rgba(0, 0, 0, 0.02)"
            py="12px"
            bg="#F5F5F5"
            pl="27.3px"
            pr="19.9px"
            justify="space-between"
            align="center"
            position="relative"
          >
            <HStack spacing="8px">
              <Text fontSize="20px" fontWeight={600} color="#191919">
                Suggest an idea
              </Text>
            </HStack>

            <VStack
              position="relative"
              justify="center"
              align="center"
              w="30px"
              h="30px"
              borderRadius="5px"
              transition="0.3s ease-in-out"
              _hover={{
                width: '30px',
                height: '30px',
              }}
            >
              <DrawerCloseButton right="0px" left="0px" my="auto" color="#000" top="0" bottom="0" />
            </VStack>
          </HStack>
          <Box pb="20px" h="full" overflowY={'auto'} css={scrollBarStyles} mt="16px">
            <Box px="25px">
              <Text fontSize={'14px'} fontWeight={300} color="#0D0D0D">
                Do you have any new ideas or desired enhancements for our app.
              </Text>
              <Text fontSize="12px" mb="4px" mt="24px">
                Comment
              </Text>
              <Textarea
                bg="#fff"
                onChange={e => setMessage(e.target.value)}
                value={message}
                resize="none"
                border="1px solid #E4E4E4 !important"
                borderRadius={'8px'}
                w="full"
                h="106px"
              />
              <Text fontSize="12px" color="#0D0D0D" mb="6px" mt="21px">
                Upload Image
              </Text>
              <UploadImages
                maxFiles={5}
                id="document"
                name="document"
                files={document}
                setFiles={setDocument}
                lable={'Upload image'}
                message="Upload image"
                border={'1px solid #E4E4E4'}
                w="full"
                h="78.557px"
              />
            </Box>
          </Box>
        </Box>
        <DrawerFooter mb={8}>
          <Button
            w="full"
            h="45.5px"
            fontWeight="500"
            borderRadius="4.008px"
            disabled={suggestMutation.isLoading}
            loading={suggestMutation.isLoading}
            onClick={handleSubmit}
            align="right"
            color="white"
            bg="#1d1d1d"
            rounded='full'
          >
            <Text fontSize={'14.907px'} fontWeight={400}>
              Submit
            </Text>
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default SuggestIdea;
