import React, {useState} from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Heading,
  OrderedList,
  ListItem,
  Stack,
  Image,
  Box,
  Text,
  Button,
  ModalFooter,
  useToast,
  Link,
  useDisclosure,
} from '@chakra-ui/react';
import headerImage from '/src/images/dataMigrationHeaderImage.svg';
import dataMigrationSample from '/src/images/dataMigrationSample.png';
import UploadDataCsv from './components/uploadDataCsv';
import {useMutation} from '@tanstack/react-query';
import {CSVLink} from 'react-csv';
import {uploadUsersInformation} from 'apis/customers';
import ViewDataSample from './components/viewDataSample';

const DataMigrationModal = ({modalDisclosure}) => {
  const toast = useToast();
  const [payload, setPayload] = useState(null);
  const viewSampleDisclosure = useDisclosure();

  const handleClose = () => {
    setPayload(null);
    return modalDisclosure.onClose();
  };
  const mutation = useMutation(
    formData => {
      return uploadUsersInformation(formData);
    },
    {
      onSuccess: res => {
        toast({
          title: 'Import in progress',
          description: "you'll be notified when it's done.",
          status: 'success',
          duration: 8000,
          isClosable: true,
          position: 'top-right',
        });
        handleClose();
      },
      onError: error => {
        toast({
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

  const getDataFromJSON = () => {
    const result = [
      {
        'FIRST NAME': '',
        'MIDDLE NAME': '',
        'LAST NAME': '',
        EMAIL: '',
        'COUNTRY CODE': '',
        PHONE: '',
        // GENDER: '',
      },
    ];

    return result;
  };

  const uploadUsersInfo = () => {
    mutation.mutate(payload);
  };

  return (
    <>
      <Modal
        autoFocus={false}
        isOpen={modalDisclosure.isOpen}
        onClose={handleClose}
        motionPreset="scale"
      >
        <ModalOverlay
          bg={'linear-gradient(0deg, rgba(0, 0, 0, 0.70) 0%, rgba(0, 0, 0, 0.70) 100%)'}
        />
        <ModalContent
          overflow="hidden"
          mt="10vh"
          mb="2vh"
          // bg="#0C2841"
          minW="fit-content"
          minH="fit-content"
          maxW="480px"
          borderRadius="12px"
          p="0px"
        >
          <ModalBody w="480px" p="0px">
            <Stack w="full">
              <Box overflow="hidden" bg="#0C2841" w="full" h="278px">
                <Image src={headerImage.src} w="full" h="auto" />
              </Box>
              <Stack spacing="20px" p="24px" pb="0px">
                <Stack w="full">
                  <Heading fontSize="18px" fontWeight="500" lineHeight="28px">
                    Import your entire client base at once
                  </Heading>
                  <OrderedList color="#475467">
                    <ListItem fontSize="14px" fontWeight="400" lineHeight="19.6px">
                      Click here to{' '}
                      <Text
                        minW="fit-content"
                        alignSelf="start"
                        cursor="pointer"
                        onClick={viewSampleDisclosure.onOpen}
                        textDecoration="underline"
                        as="span"
                        color="#FF9103"
                      >
                        view the template{' '}
                      </Text>
                      or
                      <CSVLink data={getDataFromJSON()} filename="Data migration template">
                        <Text textDecoration="underline" as="span" color="#FF9103">
                          {' '}
                          download the template
                        </Text>
                      </CSVLink>{' '}
                      for properly formatting your data before import.
                    </ListItem>
                    <ListItem fontSize="14px" fontWeight="400" lineHeight="19.6px">
                      Required fields are First Name, Last Name, Email Address, and Phone Number.{' '}
                    </ListItem>
                    <ListItem fontSize="14px" fontWeight="400" lineHeight="19.6px">
                      The Middle Name field is optional; if it&apos;s not applicable, leave it
                      blank.{' '}
                    </ListItem>
                  </OrderedList>
                </Stack>
                <UploadDataCsv setPayload={setPayload} />
              </Stack>
            </Stack>
          </ModalBody>
          <ModalFooter p="32px 24px 24px">
            <Button
              variant="filled-radius"
              fontSize="14px"
              fontWeight="400"
              bg="#191919"
              py="12.52px"
              // borderRadius="9.39px"
              isLoading={mutation.isLoading}
              onClick={uploadUsersInfo}
              h="48px"
              lineHeight="17px"
              isDisabled={!payload}
              w="full"
              color="#fff"
            >
              Upload CSV
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <ViewDataSample modalDisclosure={viewSampleDisclosure} />
    </>
  );
};

export default DataMigrationModal;
