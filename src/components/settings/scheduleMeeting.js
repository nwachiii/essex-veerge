import {
  Button,
  HStack,
  Heading,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Spinner,
  Stack,
  Text,
  VStack,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import successGif from '/src/images/check-icon.gif';

import React from 'react';
import calendarIcon from '/src/images/icons/calendarIconForCreateStore.svg';
import timeIcon from '/src/images/icons/timeIconforcreateStore.svg';
import viewIcon from '/src/images/icons/viewforcreateStore.svg';
import {useState} from 'react';
import {CustomSingleDatePicker, SelectTime} from '../common/Calendar/forDateAndTimePicking';
import {toastForError} from '../../utils/toastForErrors';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {requestAcallForCustomStore} from '../../apis/settings';
import {changeDateFormat} from '../../utils/formatDate';

export const ScheduleMeeting = ({onClose, demo_link, setCreateStoreTab}) => {
  const successmsg = {
    head: 'Thank You',
    desc: ' We will contact you using the contact information associated with your account',
  };
  const success = useDisclosure();
  const [suffix, setSuffix] = useState('AM');

  const [time, setTime] = useState('');
  const [mainDate, setmainDate] = useState('');
  const toast = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation(
    values => {
      return requestAcallForCustomStore(values);
    },
    {
      onSuccess: async res => {
        // queryClient.invalidateQueries(["store-info"]);

        // await queryClient.refetchQueries(["store-info"]);

        success.onOpen();
        // setTimeout(() => (setCreateStoreTab("endToEnd"), onClose()), 3000);
      },

      onError: res => {
        // toast({
        //   title: res?.message === "Network Error" ? "Network Error" : "Oops...",
        //   description: `${
        //     res?.response?.data?.message ??
        //     res?.response?.message ??
        //     res?.message ??
        //     "Something went wrong, we are working on resolving it"
        //   }`,
        //   status: "error",
        //   duration: 8000,
        //   isClosable: true,
        //   position: "top-right",
        // });
        toastForError(res, true, toast);
      },
    }
  );

  const handleScheduling = () => {
    const HourandMinute = time.split(':');
    mainDate.setHours(
      suffix === 'PM'
        ? ~~HourandMinute[0] == 12
          ? ~~HourandMinute[0]
          : 12 + ~~HourandMinute[0]
        : ~~HourandMinute[0]
    );
    mainDate.setMinutes(HourandMinute[1]);
    const iso = mainDate.toISOString();

    return mutation.mutate({
      time: iso,
      developer_request: 'true',
    });
  };

  const handleSelectedDate = date => {
    return setmainDate(date);
  };

  const isValid = time && mainDate;

  return (
    <VStack pb="21.5px" spacing="none" mt="13px">
      <Heading fontSize="24px" fontWeight="500" color="#191919">
        Schedule a call to discuss your business needs
      </Heading>
      <Stack mt="19px" spacing="10px">
        <Text fontSize="17.198px" fontWeight="400" justifySelf="start">
          Best time to call?
        </Text>
        <HStack spacing="19px">
          <CustomSingleDatePicker mainDate={mainDate} handleSelectedDate={handleSelectedDate} />

          <SelectTime suffix={suffix} setSuffix={setSuffix} setTime={setTime} time={time} />
        </HStack>
      </Stack>
      <Button
        mt="22px"
        _hover={{
          opacity: '1',
        }}
        h="55px"
        onClick={handleScheduling}
        isDisabled={!isValid}
        w="241px"
        bg="#4545FE"
        color="#ffffff"
        borderRadius="12px"
      >
        {mutation.isLoading ? <Spinner /> : 'Schedule'}
      </Button>
      <HStack mt="20px" spacing="7px">
        <Image alt="calendar Icon" src={viewIcon.src} />

        <Text
          // onClick={() => window.open(`https://${demo_link}`, "_blank")}
          color="#4545FE"
          cursor="pointer"
          fontSize="14px"
          fontWeight="400"
        >
          View Demo
        </Text>
      </HStack>
      <Success
        queryClient={queryClient}
        success={success}
        setCreateStoreTab={setCreateStoreTab}
        onClose={onClose}
        {...successmsg}
      />
    </VStack>
  );
};

export default ScheduleMeeting;

export const Success = ({success, onClose, setCreateStoreTab, head, queryClient, desc}) => (
  <Modal
    onClose={async () => (
      queryClient.invalidateQueries(['store-info']),
      await queryClient.refetchQueries(['store-info']),
      success.onClose(),
      setCreateStoreTab('endToEnd'),
      onClose()
    )}
    isOpen={success.isOpen}
  >
    <ModalOverlay />
    <ModalContent mt="25vh" minW="fit-content" borderRadius="16px" p="0">
      <ModalBody p="0">
        <VStack p="42px" py="76px" spacing="15px">
          <Image
            width="100px"
            height="100px"
            objectFit="contain"
            src={successGif.src}
            alt="success image"
          />
          <Heading as="h1" color="#191919" fontSize="24px" fontWeight="700">
            {head}
          </Heading>
          <Text maxW="497px" textAlign="center" fontSize="16px" fontWeight="400">
            {desc}
          </Text>
          <Button
            onClick={() => (success.onClose(), onClose())}
            w="425px"
            _hover={{
              opacity: '0.4',
            }}
            _active={{
              opacity: '0.4',
            }}
            h="55px"
            bg="#4545FE"
            borderRadius="12px"
            color="#ffffff"
          >
            Ok
          </Button>
        </VStack>
      </ModalBody>
    </ModalContent>
  </Modal>
);
