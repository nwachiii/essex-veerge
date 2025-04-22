import {useEffect, useState} from 'react';
import {useMutation} from '@tanstack/react-query';
import {Box, Image, Spinner, Text, VStack, useToast} from '@chakra-ui/react';

import {Button} from '../../../ui-lib';
import {closeChat} from '../../../apis/support_center';
import ClosedChatTxt from './ClosedChatTxt';
import MsgBody from './MsgBody';
import {formatTimestamp} from '../../../utils/formatDate';
import InputField from '../InputField';

import messageIcon from '/src/images/icons/msg-icon.svg';
import placeholder_icon from '/src/images/icons/placeholder.svg';
import veerge_icon from '/src/images/brand/VEERGE-08.png';
import veerge_icon_2 from '/src/images/brand/new_veerge_logo.svg';

const ClientMsg = ({
  selectedClient,
  loggedInUserId,
  isLoading,
  setUploadedFile,
  uploadedFile,
  message,
  handleSubmit,
  uploadedImage,
  setUploadedImage,
  handleChange,
  handleKeyDown,
  chatEvents,
  inputId,
  refetch,
  messageSending,
}) => {
  const toast = useToast();
  const [showCloseChatMsg, setShowCloseChatMsg] = useState();
  const [chatClosed, setChatClosed] = useState(false);
  // file part
  const addFile = file => {
    let fileType = file.type;
    let validExtensions = ['application/pdf'];

    if (validExtensions.includes(fileType)) {
      let obj = {...uploadedFile, [inputId]: file};
      setUploadedFile(obj);
    }
  };

  const handleFileChange = e => {
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
    addFile(result);
  };

  const removeFile = () => {
    setUploadedFile(null);
  };

  // image part
  const addImage = image => {
    let imageType = image.type;
    let validExtensions = ['image/jpeg', 'image/jpg', 'image/png'];

    if (validExtensions.includes(imageType)) {
      let img_obj = {...uploadedImage, [inputId]: image};
      setUploadedImage(img_obj);
    }
  };

  const handleImageChange = e => {
    if (e.target.files !== null) {
      let image = e.target.files[0];
      addImage(image);
    }
  };

  const removeImage = () => {
    setUploadedImage(null);
  };

  // close chat query
  const closeMutation = useMutation(data => closeChat(data), {
    onSuccess: async res => {
      refetch();
      setShowCloseChatMsg(false);
      setChatClosed(true);
    },
    onError: err => {
      return toast({
        title: err?.message === 'Network Error' ? 'Network Error' : 'Oops something went wrong',
        description: `${
          err?.response?.data?.message ??
          err?.response?.message ??
          err?.message ??
          'Something went wrong,we are working on resolving it.'
        }`,
        status: 'error',
        duration: 8000,
        isClosable: true,
        position: 'top-right',
      });
    },
  });

  const handleCloseChat = () => {
    setShowCloseChatMsg(selectedClient?.id);
  };

  // on click yes for close chat
  const handleCloseMutation = () => {
    closeMutation.mutate(selectedClient?.id);
  };

  useEffect(() => {
    const closeChatElement = document.getElementById('close_chat_button');
    closeChatElement?.scrollIntoView({
      behavior: 'smooth',
    });
  }, [showCloseChatMsg]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      h="full"
      position="relative"
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        borderBottom="1px solid #E4E4E4"
        py="17px"
        position="relative"
      >
        <Box display="flex" gap={3} alignItems="center" px="23px">
          <Image
            w="40px"
            h="40px"
            src={
              (selectedClient?.customer === null
                ? veerge_icon_2.src
                : selectedClient?.customer?.customer_info?.avatar === null
                  ? placeholder_icon.src
                  : selectedClient?.customer?.customer_info?.avatar) || placeholder_icon.src
            }
            alt="client pic"
            fontSize="10px"
            borderRadius={50}
          />
          <Text fontSize="18px" fontWeight="600" color="#191919" textTransform="capitalize">
            {selectedClient?.customer === null
              ? `Veerge Support`
              : `${selectedClient?.customer?.customer_info?.first_name} ${selectedClient?.customer?.customer_info?.last_name}`}
          </Text>
        </Box>

        {(selectedClient?.customer !== null && selectedClient?.status == 'open') ||
        (!chatClosed && selectedClient?.customer !== null) ? (
          <Box pr="23px">
            <Button
              variant="dark"
              leftIcon={<Image src={messageIcon.src} alt="msg icon" />}
              onClick={handleCloseChat}
              m="0px"
              h="40px"
              py="15px"
              px="18px"
            >
              Close Chat
            </Button>
          </Box>
        ) : null}
      </Box>

      <Box
        width="full"
        top="75px"
        px="20px"
        overflowY="scroll"
        maxHeight="70vh"
        py={5}
        flex={1}
        display="flex"
        flexDirection="column"
        gap="16px"
        position="absolute"
      >
        {isLoading ? (
          <VStack w="full" justify="center" align="center" h="20vh">
            <Spinner />
          </VStack>
        ) : (
          chatEvents?.map((event, index) => {
            return (
              <Box key={index} display="flex" flexDirection="column" gap="16px">
                {event?.event_type === 'close_chat' ? (
                  <Box
                    background="#FFF1F1"
                    color="#FF6A6A"
                    mx="auto"
                    w="fit-content"
                    h="fit-content"
                    padding="9.23px"
                    borderRadius="5.54px"
                    fontSize="12px"
                  >
                    This chat has been closed
                  </Box>
                ) : event?.event_type === 'open_chat' ? (
                  <>
                    <Box
                      background="#F0F3F7"
                      color="#000000"
                      mx="auto"
                      w="fit-content"
                      h="fit-content"
                      padding="9.23px"
                      borderRadius="5.54px"
                      fontSize="12px"
                    >
                      {formatTimestamp(event?.created_at)}
                    </Box>

                    {event?.current_chat_title && (
                      <Box
                        background="#F0F3F7"
                        color="#026AA2"
                        mx="auto"
                        w="fit-content"
                        h="fit-content"
                        padding="9.23px"
                        borderRadius="5.54px"
                        fontSize="12px"
                      >
                        {event?.current_chat_title === 'transaction_issues'
                          ? 'Transaction Issues'
                          : event?.current_chat_title === 'bug_report'
                            ? 'Bug Report'
                            : event?.current_chat_title === 'enquiries'
                              ? 'Enquiries'
                              : event?.current_chat_title === 'something_else'
                                ? 'Something Else'
                                : null}
                      </Box>
                    )}
                  </>
                ) : (
                  <MsgBody
                    message={event?.message}
                    loggedInUserId={loggedInUserId}
                    admin={event?.is_from_admin}
                  />
                )}
              </Box>
            );
          })
        )}
        <ClosedChatTxt
          selectedClient={selectedClient}
          showCloseChatMsg={showCloseChatMsg}
          setShowCloseChatMsg={setShowCloseChatMsg}
          handleCloseMutation={handleCloseMutation}
        />
      </Box>

      <Box justifySelf="flex-end" zIndex={1} position="relative">
        <InputField
          handleFileChange={handleFileChange}
          handleImageChange={handleImageChange}
          removeFile={removeFile}
          removeImage={removeImage}
          message={message}
          inputId={inputId}
          handleChange={handleChange}
          handleKeyDown={handleKeyDown}
          uploadedFile={uploadedFile}
          uploadedImage={uploadedImage}
          handleSubmit={handleSubmit}
          selectedClient={selectedClient}
          chatClosed={chatClosed}
          messageSending={messageSending}
        />
      </Box>
    </Box>
  );
};

export default ClientMsg;
