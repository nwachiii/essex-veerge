import {useRef} from 'react';
import {Box, Button, Flex, Image, Input, Link, Spinner, Stack, Text} from '@chakra-ui/react';
import TextareaAutosize from 'react-textarea-autosize';

import AttachIcon from '/src/images/icons/attach-icon.svg';
import CameraIcon from '/src/images/icons/camera-icon.svg';
import CloseIcon from '/src/images/icons/close-icon-blue.svg';
import SendIcon from '/src/images/icons/send-icon-2.svg';

const InputField = ({
  handleFileChange,
  handleImageChange,
  removeFile,
  removeImage,
  message,
  inputId,
  handleChange,
  handleKeyDown,
  uploadedFile,
  uploadedImage,
  handleSubmit,
  selectedClient,
  chatClosed,
  messageSending,
}) => {
  // attachment part
  // file part
  const inputRef = useRef(null);

  const selectFile = () => {
    if (inputRef.current !== null) {
      inputRef.current.click();
    }
  };

  // image part
  const imageRef = useRef(null);

  const selectImage = () => {
    if (imageRef.current !== null) {
      imageRef.current.click();
    }
  };

  function getBase64(file) {
    if (!file) return null;
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      console.log(reader.result);
      return reader.result;
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
      return null;
    };
  }

  const file_url = getBase64(uploadedFile?.[inputId]);
  return (
    <Box pl="23px" pr="38px" py="2px" w="full" mt={2}>
      <Flex alignItems="center" w="full" bg="#F5F5F5" borderRadius="12px" mb={2}>
        <Box
          flex={1}
          w="full"
          display="flex"
          flexDirection="column"
          background="#F5F5F5"
          borderRadius="12px"
          gap="8px"
          pl="16px"
          pt="10px"
          pb={2}
        >
          <Box flex={1} w="full" display="flex" alignItems="center">
            <Box display="flex" gap={3} pr={3} alignSelf="flex-end">
              <Stack>
                <Input
                  ref={inputRef}
                  onChange={handleFileChange}
                  type="file"
                  accept=".pdf"
                  hidden
                />
                <Image
                  w="20px"
                  h="20px"
                  src={AttachIcon.src}
                  alt="attach icon"
                  cursor="pointer"
                  color="#3D3D3D"
                  onClick={selectFile}
                />
              </Stack>

              <Stack>
                <Input
                  ref={imageRef}
                  onChange={handleImageChange}
                  type="file"
                  accept=".jpeg, .jpg, .png"
                  hidden
                />
                <Image
                  w="20px"
                  h="20px"
                  src={CameraIcon.src}
                  alt="camera icon"
                  cursor="pointer"
                  color="#3D3D3D"
                  onClick={selectImage}
                />
              </Stack>
            </Box>

            <Box bg="#F9FAFB" w="full" flex={1} display="flex" flexDirection="column" gap="8px">
              <TextareaAutosize
                cacheMeasurements
                value={message?.[inputId] ?? ''}
                onChange={e => handleChange(e)}
                placeholder="Type message..."
                style={{
                  width: '100%',
                  height: '40px',
                  // placeholder: '#919191',
                  color: '#191919',
                  background: '#F9FAFB',
                  fontSize: '14px',
                  borderRadius: '8px',
                  outline: 'transparent',
                  padding: '2px 4px',
                  alignSelf: 'center',
                  textAlign: 'start',
                }}
                maxRows={15}
                onKeyDown={handleKeyDown}
                readOnly={
                  [chatClosed, selectedClient?.status == 'closed'].includes(true) &&
                  selectedClient?.customer !== null
                }
                disabled={messageSending}
              />

              {/* section for result */}
              {(uploadedFile?.[inputId] || uploadedImage?.[inputId]) && (
                <Box alignSelf="flex-start" display="flex" gap={2} pl="16px" pb="12px">
                  {uploadedFile?.[inputId] && (
                    <Box
                      display="flex"
                      gap={1}
                      bg="rgba(69, 69, 254, 0.10)"
                      p="8px"
                      borderRadius="8.02px"
                      alignItems="center"
                    >
                      <Link
                        // href="#"
                        href={file_url}
                        target="_blank"
                        rel="noreferrer noopener"
                        color="#4545FE"
                        fontSize="9.62px"
                        fontWeight="500"
                        cursor="pointer"
                      >
                        File
                      </Link>

                      <Image
                        w="15px"
                        h="15px"
                        src={CloseIcon.src}
                        alt="attach icon"
                        cursor="pointer"
                        onClick={removeFile}
                      />
                    </Box>
                  )}

                  {uploadedImage?.[inputId] && (
                    <Box
                      display="flex"
                      gap={1}
                      bg="rgba(69, 69, 254, 0.10)"
                      p="8px"
                      borderRadius="8.02px"
                      alignItems="center"
                    >
                      <Text color="#4545FE" fontSize="9.62px" fontWeight="500">
                        Image
                      </Text>

                      <Image
                        w="15px"
                        h="15px"
                        src={CloseIcon.src}
                        alt="attach icon"
                        cursor="pointer"
                        onClick={removeImage}
                      />
                    </Box>
                  )}
                </Box>
              )}
            </Box>
          </Box>
        </Box>

        <Box alignSelf="flex-end" justifyItems="center" alignItems="center">
          <Button
            bg="transparent"
            borderRadius="16px"
            py="20px"
            _hover={{bg: 'transparent'}}
            onClick={handleSubmit}
            disabled={!message?.[inputId]?.trim() || messageSending}
            width={'70px'}
          >
            {messageSending ? (
              <Spinner width={'15px'} height={'15px'} />
            ) : (
              <Image src={SendIcon.src} alt="send icon" />
            )}
          </Button>
        </Box>
      </Flex>
    </Box>
  );
};

export default InputField;
