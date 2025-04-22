import {useState} from 'react';
import {useMutation, useQuery} from '@tanstack/react-query';
import {Box, useToast} from '@chakra-ui/react';

import {sendMessage, fetchEvents} from '../../../apis/support_center';
import {encodeFileToBase64} from '../../../utils';
import ClientMsg from './ClientMsg';
import NoChat from '../NoChat';
import {toastForError} from '../../../utils/toastForErrors';

const ChatWindow = ({noChat, selectedClient, runQuery, inputId, setRefreshTracker}) => {
  const toast = useToast();

  const [message, setMessage] = useState({});

  // useState for upload result
  const [uploadedFile, setUploadedFile] = useState(null || undefined);
  const [uploadedImage, setUploadedImage] = useState(null || undefined);
  const [messageSending, setMessageSending] = useState(false);

  // fetch events
  const {data, error, isError, isLoading, refetch} = useQuery(
    ['get-events', selectedClient?.id],
    () => fetchEvents(selectedClient?.id),
    {
      enabled: runQuery,
      refetchInterval: 5000,
    }
  );

  const chatEvents = data?.data?.data;

  // get logged in user
  const loggedInUserObject =
    typeof window !== 'undefined' &&
    localStorage.getItem('loggedinUser') !== 'undefined' &&
    JSON?.parse(localStorage.getItem('loggedinUser'));

  const loggedInUserId = loggedInUserObject?.id;
  const loggedinUserFirstName = loggedInUserObject?.first_name;

  // send new message
  const messageMutation = useMutation(formData => sendMessage(selectedClient?.id, formData), {
    onSuccess: async res => {
      await refetch();
      setRefreshTracker(Math.round(Math.random() * 1000000));
      clearFields();
    },
    onError: err => {
      setMessageSending(false);
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

  const handleChange = e => {
    e.preventDefault();
    let obj = {...message, [inputId]: e.target.value};

    setMessage(obj);
  };

  // submit functionality
  const handleSubmit = async () => {
    //only proceed if you currently don't have a message being sent
    if (messageSending) return;
    setMessageSending(true);
    const trimmedMessage = message?.[inputId]?.trim();

    if (!trimmedMessage) {
      return toast({
        title: 'Empty Message',
        description: 'Message cannot be empty',
        status: 'error',
        duration: 8000,
        isClosable: true,
        position: 'top-right',
      });
    }

    const body = {
      content: trimmedMessage,
    };

    // Check if an uploaded file exists
    if (uploadedFile) {
      try {
        // Encode the uploaded file to base64
        const fileBase64 = await encodeFileToBase64(uploadedFile?.[inputId]);
        body.attachment = fileBase64;
      } catch (error) {
        toastForError(error, true, toast);
      }
    }

    // Check if an uploaded image exists
    if (uploadedImage) {
      try {
        // Encode the uploaded image to base64
        const ImageBase64 = await encodeFileToBase64(uploadedImage?.[inputId]);
        body.image = ImageBase64;
      } catch (error) {
        toastForError(error, true, toast);
      }
    }

    messageMutation.mutate(body);
  };

  const clearFields = () => {
    setMessage({});
    setUploadedFile(null);
    setUploadedImage(null);
    setMessageSending(false);
  };

  // for enter key to trigger the submit button
  const handleKeyDown = e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <Box bg="#FFFFFF" h="full">
      {noChat ? (
        <NoChat loggedinUserFirstName={loggedinUserFirstName} />
      ) : (
        <Box h="100%">
          <ClientMsg
            selectedClient={selectedClient}
            loggedInUserId={loggedInUserId}
            isLoading={isLoading}
            setUploadedFile={setUploadedFile}
            uploadedFile={uploadedFile}
            message={message}
            handleSubmit={handleSubmit}
            setUploadedImage={setUploadedImage}
            uploadedImage={uploadedImage}
            handleChange={handleChange}
            handleKeyDown={handleKeyDown}
            chatEvents={chatEvents}
            inputId={inputId}
            refetch={refetch}
            messageSending={messageSending}
          />
        </Box>
      )}
    </Box>
  );
};

export default ChatWindow;
