import {
  Button,
  HStack,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  useToast,
  VStack,
  ModalHeader,
  Flex,
  Stack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import {useFormik} from 'formik';
import menuDownArrow from '/src/images/icons/menuDownArrow.svg';
import {CustomSingleDatePicker} from '/src/components/common/Calendar/forDateAndTimePicking';

import trashIcon from '/src/images/icons/trash-icon.svg';
import fileIcon from '/src/images/icons/file-icon.svg';
import {toastForError} from '/src/utils/toastForErrors';

import {useEffect, useState} from 'react';

import {encodeFileToBase64} from '../utils';
import {useQueryClient, useMutation} from '@tanstack/react-query';
import {updateDocument} from '../apis/settings';

const UpdateId = ({isOpen, onClose, refetch}) => {
  const [files, setFiles] = useState('');

  const [dateError, setDateError] = useState({exp: '', issu: ''});
  const [docDate, setDocDate] = useState({exp: '', issu: ''});
  const [idError, setIdNumError] = useState('');
  const [docID, setDocID] = useState(null);
  const [docIDName, setDocIDName] = useState(null);
  const [idType, setIdType] = useState(null);

  const [mainDate, setmainDate] = useState('');

  const [imageSrc, setImageSrc] = useState('');

  const toast = useToast();
  const queryClient = useQueryClient();

  const IndentificationArray = [
    {
      name: 'International Passport',
      value: 'International Passport',
    },
    {name: "Driver's License", value: 'Driver License'},
    {name: 'National ID', value: 'National Identity Card'},
  ];

  const formik = useFormik({
    initialValues: {},
    onSubmit: values => {
      const base64Arr = document.map(item => item.image);
      let payload;
      if (type == 'profile') {
        payload = {document: base64Arr, ...values};
      } else {
        payload = {documents: base64Arr, ...values};
      }
      onUpload(payload);
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
    setImageSrc(URL?.createObjectURL(e.target.files[0]));
    return setFiles(result);
    setImageSrc('');
  };

  useEffect(() => {
    return () => {
      if (imageSrc) {
        URL.revokeObjectURL(imageSrc);
      }
    };
  }, [imageSrc]);

  const mutation = useMutation(formData => updateDocument(formData), {
    onSuccess: async res => {
      queryClient.invalidateQueries(['fetchDeveloperProfile']);
      await queryClient.refetchQueries(['fetchDeveloperProfile']);
      toast({
        title: 'ID updated successfully',
        status: 'success',
        duration: 8000,
        isClosable: true,
        position: 'top-right',
      });
      clearAll();
      return onClose();
    },
    onError: res => {
      return toastForError(res, true, toast);
    },
  });

  const handleDocDate = e => {
    const presentDate = new Date();
    const inputValue = new Date(e.target.value);
    const year = inputValue.getFullYear();
    const month = String(inputValue.getMonth() + 1).padStart(2, '0');
    const day = String(inputValue.getDate()).padStart(2, '0');

    const formattedDate = `${year}/${month}/${day}`;

    if (e.target.name === 'exp') {
      if (presentDate >= inputValue) {
        return setDateError({
          ...dateError,
          exp: 'hmm, selected date is expired',
        });
      } else {
        setDateError({
          ...dateError,
          exp: '',
        });
        return setDocDate({...docDate, exp: formattedDate});
      }
    }
    if (e.target.name === 'issu') {
      if (presentDate <= inputValue) {
        return setDateError({
          ...dateError,
          issu: 'hmm, selected date is invalid',
        });
      } else {
        setDateError({
          ...dateError,
          issu: '',
        });
        return setDocDate({...docDate, issu: formattedDate});
      }
    }
  };
  const isANumber = input => {
    const numericPattern = /^\d+$/;
    if (!numericPattern.test(input)) {
      setIdNumError('invalid format');
    } else {
      setIdNumError('');
    }
  };

  const clearAll = () => {
    formik.setValues({});
    setIdType(null);
    setmainDate('');
    setDocID(null);
    setDocDate({exp: '', issu: ''});
    setFiles('');
    return setImageSrc('');
  };

  const prefixRegex = /^data:(image\/(png|jpeg|gif)|application\/pdf);base64,/;

  const OnClickButton = () => {
    const year = mainDate.getFullYear();
    const month = String(mainDate.getMonth() + 1).padStart(2, '0');
    const day = String(mainDate.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;
    const data = {
      document: [docID],
      id_update: true,
      document_type: idType,
      id_number: formik.values.id_number,
      exp_date: formattedDate,
      
    };

    return mutation.mutate({...data});
  };

  const isValid = docID && idType && mainDate && formik.values.id_number;

  const handledocID = async arg => {
    const getImageBase64Str = await encodeFileToBase64(arg[0]).then(res => res);
    setDocID(getImageBase64Str.replace(prefixRegex, ''));
    setDocIDName(arg[0]?.name);
  };

  const handleSelectedDate = date => {
    return setmainDate(date);
  };

  return (
    <Modal
      motionPreset="slideInBottom"
      isOpen={isOpen}
      onClose={() => (clearAll(), onClose())}
      scrollBehavior="inside"
      blockScrollOnMount={'true'}
      size={'md'}
      h={'550px'}
    >
      <ModalOverlay bg="rgba(0,0,0,0.1)" />
      <ModalContent
        mt="18vh"
        px={'30px'}
        py={'30px'}
        pb="34px"
        shadow="lg"
        borderRadius="2xl"
        boxShadow="0px 40px 80px -1px rgba(31, 91, 242, 0.27)"
      >
        <HStack align="center" justify="space-between">
          <ModalHeader
            p="0px"
            align={'left'}
            whiteSpace="nowrap"
            fontSize={'28px'}
            color="#191919"
            fontWeight={'700'}
          >
            Update ID
          </ModalHeader>

          <ModalCloseButton
            my="auto"
            color="#000000"
            position="initial"
            onClose={() => (clearAll(), onClose())}
          />
        </HStack>
        <ModalBody px={'5px'} my={'0px'} py={'5px'}>
          <VStack w="full" spacing={'15px'} mb="28px">
            {/* <Box w="full" position="relative"> */}
            <Stack w="full" spacing="5px">
              <Text textAlign="start" fontSize="14px" fontWeight="400" color="#191919">
                ID Number
              </Text>
              <Input
                isRequired
                id="id_number"
                name="id_number"
                w="full"
                fontSize="14px"
                color={'#3d3d3d'}
                fontWeight={'400'}
                type="number"
                border="1px solid #E4E4E4"
                borderRadius="8px"
                h="50px"
                _focus={{
                  border: '1px solid #E4E4E4',
                }}
                focusBorderColor="#E4E4E4"
                onChange={formik.handleChange}
                onBlur={e => isANumber(e.target.value)}
                value={formik.values.id_number}
                placeholder="Documents Number"
                _placeholder={{
                  color: '#606060',
                  fontWeight: '400',
                  fontSize: '14px',
                }}
              />
            </Stack>
            <Stack w="full" spacing="5px">
              <Text textAlign="start" fontSize="14px" fontWeight="400" color="#191919">
                ID type
              </Text>
              <IdMenu
                setDocIDName={setIdType}
                docIDName={idType}
                IndentificationArray={IndentificationArray}
              />
            </Stack>

            <Stack w="full" spacing="5px">
              <Text textAlign="start" fontSize="14px" fontWeight="400" color="#191919">
                Document expiration date
              </Text>

              <CustomSingleDatePicker
                mainDate={mainDate}
                handleSelectedDate={handleSelectedDate}
                headerText="Expiration Date"
                btnStyle={{w: 'full', minW: 'full'}}
              />
            </Stack>

            <Stack w="full" spacing="5px">
              <Text textAlign="start" fontSize="14px" fontWeight="400" color="#191919">
                Upload
              </Text>
              {!docID ? (
                <HStack
                  spacing="20px"
                  border="1px solid #E4E4E4"
                  position="relative"
                  borderRadius="8px"
                  h="50px"
                  px="12px"
                  w="full"
                  cursor="pointer"
                >
                  <Input
                    cursor="pointer"
                    // id="file"
                    position="absolute"
                    opacity="0"
                    zIndex={2}
                    top="0px"
                    left="0px"
                    type="file"
                    borderRadius="14px"
                    name={`document`}
                    placeholder="Document file"
                    defaultValue={formik.values.document}
                    onChange={event => handledocID(event.currentTarget.files)}
                    w="full"
                    h="full"
                    // accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/pdf"
                    accept="image/*"
                  />
                  <Button
                    w="76px"
                    h="34px"
                    borderRadius="12px"
                    _hover={{
                      opacity: 1,
                    }}
                    bg="#919191"
                    color="#fff"
                    fontSize="16px"
                    fontWeight="400"
                  >
                    Upload
                  </Button>
                  <Text color="#919191" fontSize="16px" fontWeight="400">
                    No file chosen
                  </Text>
                </HStack>
              ) : (
                <VStack w="100%" spacing="3px" my={0} py={0}>
                  <HStack
                    px={'15px'}
                    py="9px"
                    justify={'space-between'}
                    width="full"
                    height="50px"
                    flexShrink="0"
                    borderRadius="8px"
                    border="1px solid #E4E4E4"
                  >
                    <Flex gap="13px" align="center">
                      <Image src={fileIcon.src} alt="" />
                      <Text noOfLines="1" fontSize="14px" color="#191919" fontWeight="400">
                        {docIDName || formik.values.document}
                      </Text>
                    </Flex>
                    <Image
                      cursor={'pointer'}
                      onClick={() => setDocID(null)}
                      src={trashIcon.src}
                      alt=""
                    />
                  </HStack>
                </VStack>
              )}
            </Stack>
          </VStack>
          <VStack w={'100%'}>
            <Button
              borderRadius="12px"
              bg={'#4545FE'}
              w={'100%'}
              color={'#FFFFFF'}
              fontWeight={'400'}
              fontSize={'18px'}
              lineHeight={'23px'}
              alignSelf="stretch"
              isDisabled={!isValid}
              isLoading={mutation.isLoading}
              onClick={OnClickButton}
              _hover={{
                shadow: 'sm',
              }}
              _active={{
                opacity: 0.8,
              }}
              minH={'55px'}
            >
              Upload
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default UpdateId;

const IdMenu = ({IndentificationArray, setDocIDName, docIDName}) => {
  return (
    <>
      <Menu autoSelect={false}>
        <MenuButton w="full" p="0px">
          <HStack
            pl="17px"
            pr="11px"
            border="1px solid #E4E4E4"
            borderRadius="8px"
            h="50px"
            justify="space-between"
            w="full"
          >
            <Text color={docIDName ? '#191919' : '#606060'} fontSize="14px" fontWeight="400">
              {docIDName || 'Select ID type'}
            </Text>
            <Image src={menuDownArrow.src} alt="down arrow" />
          </HStack>
        </MenuButton>
        <MenuList w="380px" mt="-25px" borderRadius="16px">
          {IndentificationArray.map((item, idx) => {
            return (
              <MenuItem
                fontSize="14px"
                fontWeight="400px"
                onClick={() => setDocIDName(item.value)}
                _focus={{
                  bg: 'transparent',
                }}
                _hover={{
                  bg: 'transparent',
                }}
                key={idx}
              >
                {item.name}
              </MenuItem>
            );
          })}
        </MenuList>
      </Menu>
    </>
  );
};
