import defaultImg from '../../images/avatar.svg';
import {
  Box,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Spinner,
  Stack,
  Text,
  Textarea,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import React, {useState} from 'react';
import {Button} from '../../ui-lib';
import {useMutation, useQuery} from '@tanstack/react-query';
import expandImgIcon from '/src/images/icons/expandImgIcon.svg';
import {fetchAgentDetails, verifyAgent} from '../../apis/requests';
import {changeDateFormat} from '../../utils/formatDate';
import {toastForError} from '../../utils/toastForErrors';
import HoverListingName from '../../components/dashboard/table/HoverListingName';
import {IoArrowBack} from 'react-icons/io5';
import {MatadorCustomToast} from 'pages/veerge_menu/loop';

export const AgentApprovalModal = ({isVideo, refetch, accountId}) => {
  const toast = useToast();
  const RejectRequest = useDisclosure();
  const AgentRequestDrawer = useDisclosure();
  const documentDisclosure = useDisclosure();
  const [isClicked, setIsClicked] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);

  const {
    data: agentDetails,
    isLoading: detailisLoading,
    isError: detailsHasError,
    error: detailsError,
  } = useQuery(['agentsRequest', accountId], () => fetchAgentDetails(accountId), {
    enabled: AgentRequestDrawer.isOpen,
  });

  const mutation = useMutation(body => verifyAgent(accountId, body), {
    onSuccess: res => {
      setIsClicked(false);
      setReason('');
      refetch();
      toast({
        title: isAccepted ? `Application Approved` : `Application Rejected`,
        status: 'success',
        duration: 4000,
        isClosable: true,
        position: 'top-right',
      });
      handleClose();
      AgentRequestDrawer.onClose();
    },
    onError: err => {
      setIsClicked(false);
      toastForError(err, true, toast);
    },
  });
  const handleVerify = () => {
    setIsAccepted(true);
    return mutation.mutate({
      action: 'Accepted',
    });
  };

  const [reason, setReason] = React.useState('');

  const handleSubmit = e => {
    if (e.cancelable) e.preventDefault();
    setIsAccepted(false);

    return mutation.mutate({
      action: 'Rejected',
      reason,
    });
  };

  const handleClose = () => {
    setReason('');
    return RejectRequest.onClose();
  };

  const isValid = !reason.trim();

  return (
    <>
      <Button
        mt={0}
        w="80px"
        h="40px"
        py="0px"
        variant="primary"
        bg="transparent"
        // onClick={AgentRequestDrawer.onOpen}
        border="1px  solid #E4E4E7"
        color="#27272A"
        borderRadius="72px"
        fontSize="14px"
        fontWeight="400"
        _hover={{
          opacity: '1',
        }}
      >
        View
      </Button>

      <Drawer isOpen={AgentRequestDrawer.isOpen} onClose={AgentRequestDrawer.onClose}>
        <DrawerOverlay />
        <DrawerContent mt="65px" maxW={`400px`}>
          <DrawerHeader
            p="12px 27px"
            bg={`#F5F5F5`}
            fontSize={`16px`}
            fontWeight={`600`}
            color="#191919"
          >
            Realtor&apos;s Application
          </DrawerHeader>
          <DrawerCloseButton />
          {detailisLoading ? (
            <HStack w="full" justify="center" align="center" minH="300px" position="relative">
              <Spinner />
            </HStack>
          ) : detailsHasError ? (
            <HStack w="full" justify="center" align="center" minH="300px">
              <Text fontWeight="500" fontSize="18px" color="#191919">
                {detailsError?.response?.status === 500
                  ? "Apologies for the inconvenience. We're working on it. Please try again later."
                  : (detailsError?.response?.data?.message ??
                    detailsError?.response?.message ??
                    detailsError?.message ??
                    'Something went wrong, we are working on resolving it.')}
              </Text>
            </HStack>
          ) : (
            <>
              <DrawerBody px={`24px`} py={`0px`}>
                <Stack
                  gap="14px"
                  mt={`24px`}
                  w={`100%`}
                  alignItems={`flex-start`}
                  divider={<Divider borderColor={`#F5F5F5`} my={`0px !important`} />}
                >
                  <HStack gap={`10px`} justifyContent={`space-between`} w={`100%`}>
                    <Text fontWeight="400" fontSize="14px" color="#4B4B4B">
                      Name
                    </Text>
                    <Text
                      textTransform="capitalize"
                      fontWeight="600"
                      fontSize="14px"
                      color="#191919"
                    >
                      {agentDetails?.data?.first_name ?? '--'}{' '}
                      {agentDetails?.data?.last_name ?? '--'}
                    </Text>
                  </HStack>
                  <HStack gap={`10px`} justifyContent={`space-between`} w={`100%`}>
                    <Text fontWeight="400" fontSize="14px" color="#4B4B4B">
                      Email Address
                    </Text>
                    <Text
                      fontWeight="600"
                      whiteSpace="break-spaces"
                      wordBreak="break-word"
                      fontSize="14px"
                      color="#4545FE"
                    >
                      {agentDetails?.data?.email ?? 'N/A'}
                    </Text>
                  </HStack>
                  <HStack gap={`10px`} justifyContent={`space-between`} w={`100%`}>
                    <Text fontWeight="400" fontSize="14px" color="#4B4B4B">
                      Gender
                    </Text>
                    <Text
                      fontWeight="600"
                      fontSize="14px"
                      color="#191919"
                      textTransform={`capitalize`}
                    >
                      {agentDetails?.data?.gender ?? `N/A`}
                    </Text>
                  </HStack>
                  <HStack gap={`10px`} justifyContent={`space-between`} w={`100%`}>
                    <Text fontWeight="400" fontSize="14px" color="#4B4B4B">
                      Phone number
                    </Text>
                    <Text fontWeight="600" fontSize="14px" color="#191919">
                      {agentDetails?.data?.phone ?? 'N/A'}
                    </Text>
                  </HStack>
                  <HStack gap={`10px`} justifyContent={`space-between`} w={`100%`}>
                    <Text fontWeight="400" fontSize="14px" color="#4B4B4B">
                      D.O.B
                    </Text>
                    <Text fontWeight="600" fontSize="14px" color="#191919">
                      {agentDetails?.data?.date_of_birth
                        ? changeDateFormat(agentDetails?.data?.date_of_birth, 'monthFirst')
                        : 'N/A'}
                    </Text>
                  </HStack>
                  <HStack gap={`10px`} justifyContent={`space-between`} w={`100%`}>
                    <Text fontWeight="400" fontSize="14px" color="#4B4B4B">
                      Level of Education
                    </Text>
                    <Text fontWeight="600" fontSize="14px" color="#191919">
                      {agentDetails?.data?.highest_education ?? 'N/A'}
                    </Text>
                  </HStack>
                  <HStack gap={`10px`} justifyContent={`space-between`} w={`100%`}>
                    <Text fontWeight="400" fontSize="14px" color="#4B4B4B">
                      Marital Status
                    </Text>
                    <Text fontWeight="600" fontSize="14px" color="#191919">
                      {agentDetails?.data?.marital_status === 'marital_status'
                        ? 'N/A'
                        : (agentDetails?.data?.marital_status ?? 'N/A')}
                    </Text>
                  </HStack>
                  <Stack
                    gap={`13px`}
                    justifyContent={`space-between`}
                    w={`100%`}
                    borderRadius={`6.648px`}
                    background={`#F5F5F5`}
                    padding={`11px 13px`}
                  >
                    <Text fontWeight="400" fontSize="14px" color="#4B4B4B">
                      Residential address
                    </Text>
                    <Text
                      fontWeight="500"
                      fontSize="13px"
                      whiteSpace="break-spaces"
                      wordBreak="break-word"
                      color="#191919"
                      textTransform={'capitalize'}
                    >
                      {agentDetails?.data?.address || `N/A`}
                    </Text>
                  </Stack>
                  <Stack spacing="10px">
                    <Text fontWeight="400" fontSize="14px" color="#4B4B4B">
                      Uploaded picture
                    </Text>
                    <Box position="relative">
                      <ExpandImage img={agentDetails?.data?.avatar} />
                      <Image
                        w="130px"
                        h="130px"
                        borderRadius="20px"
                        bg="whitesmoke"
                        src={agentDetails?.data?.avatar}
                        objectFit="cover"
                        alt="image"
                      />
                    </Box>
                  </Stack>
                  <Stack spacing="10px">
                    <Text fontWeight="400" fontSize="14px" color="#4B4B4B">
                      Uploaded ID
                    </Text>
                    <Box position="relative">
                      <ExpandImage img={agentDetails?.data?.uploaded_id[0]?.document} />
                      <Image
                        w="130px"
                        h="130px"
                        borderRadius="20px"
                        bg="whitesmoke"
                        src={agentDetails?.data?.uploaded_id[0]?.document}
                        cursor="zoom-in"
                        onClick={documentDisclosure?.onOpen}
                        alt="image"
                      />
                    </Box>
                  </Stack>
                </Stack>
              </DrawerBody>

              <DrawerFooter px={`24px`} py={`10px`}>
                <Stack flexDirection="column-reverse" gap="12px" w={`100%`}>
                  <Button
                    border="1px solid #FF6A6A"
                    borderRadius={`72px`}
                    fontWeight="400"
                    w="100%"
                    _hover={{
                      opacity: '1',
                    }}
                    onClick={RejectRequest.onOpen}
                    fontSize="15px"
                    h="45px"
                    color="#FF6A6A"
                    p={`12.8px`}
                    mt={0}
                  >
                    Reject
                  </Button>
                  <Button
                    borderRadius={`72px`}
                    background={`#191919`}
                    fontWeight="400"
                    onClick={handleVerify}
                    isLoading={mutation.isLoading}
                    _hover={{
                      opacity: '1',
                    }}
                    fontSize="15px"
                    h="45px"
                    color="#ffffff"
                    w="100%"
                    p={`12.8px`}
                  >
                    Approve
                  </Button>
                </Stack>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
      <Drawer
        isCentered
        isOpen={RejectRequest.isOpen}
        onClose={handleClose}
        position={`relative`}
        zIndex={`2`}
      >
        <DrawerOverlay zIndex={`2`} />
        <DrawerContent mt="65px" maxW={`400px`}>
          <DrawerCloseButton />
          <DrawerHeader
            p="12px 27px"
            bg={`#F5F5F5`}
            fontSize={`16px`}
            fontWeight={`600`}
            color="#191919"
          >
            <HStack gap={`8px`}>
              <IoArrowBack fontSize={`20px`} onClick={() => handleClose()} cursor={`pointer`} />
              <Text>Reason Rejection</Text>
            </HStack>
          </DrawerHeader>
          <DrawerBody p="24px">
            <Text
              as="span"
              color="#191919"
              textAlign="start"
              w="full"
              fontSize="14px"
              fontWeight="400"
            >
              Why are you rejecting this request?
            </Text>
            {/* <Box
              w="full"
              position="relative"
              // pb="34px"
              borderRadius={`8px`}
              border={`1px solid #E4E4E4`}
            > */}
            <Textarea
              mt={`10px`}
              maxLength="250"
              name="reason"
              onChange={e => setReason(e.target.value)}
              value={reason}
              resize="none"
              width="full"
              height="168px"
              outline={`none`}
              _focusVisible={{
                outline: 'none',
              }}
              // border={`none`}
              borderRadius={`8px`}
              border={`1px solid #E4E4E4`}
            />
            {/* <HStack justify={`flex-end`}>
                <Text
                  as="span"
                  fontSize="14px"
                  textAlign={`right`}
                  w={`100%`}
                  p={`5px`}
                  // position="absolute"
                  // bottom="0"
                  // right="5px"
                  fontWeight="300"
                  color="#CBCBCB"
                >
                  {reason.length}/250
                </Text>
              </HStack> */}
            {/* </Box> */}
          </DrawerBody>
          <DrawerFooter px={`24px`} py={`10px`}>
            <Button
              notes
              onClick={handleSubmit}
              isLoading={mutation.isLoading}
              isDisabled={isValid || mutation.isLoading}
              // variant="violet"
              // alignSelf="end"
              borderRadius={`72px`}
              background={`#191919`}
              fontWeight="400"
              _hover={{
                opacity: '1',
              }}
              fontSize="14.5px"
              h="100%"
              color="#ffffff"
              w="100%"
              p={`12.8px`}
              mt={`0px`}
            >
              Proceed
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

const ExpandImage = ({img, vid}) => {
  const {isOpen: imgIsOpen, onOpen: imgOnOpen, onClose: imgOnClose} = useDisclosure();
  const [zoomLevel, setZoomLevel] = useState(100);

  var container = document.getElementById('container' + img);
  var imageContainer = document.getElementById('image-container');
  var image = document.getElementById('scaled-image' + img);

  container?.addEventListener('mousemove', function (event) {
    let containerWidth = container.offsetWidth;
    let containerHeight = container.offsetHeight;
    let imageWidth = image.offsetWidth;

    let imageHeight = image.offsetHeight;
    let mouseX = event.pageX - container.offsetLeft;
    let mouseY = event.pageY - container.offsetTop;
    let maxTranslateX = (imageWidth - containerWidth) / 2;
    let maxTranslateY = (imageHeight - containerHeight) / 2;
    let translateX = ((mouseX / containerWidth) * 2 - 1) * maxTranslateX;
    let translateY = ((mouseY / containerHeight) * 2 - 1) * maxTranslateY;

    image.style.transform = 'translate(-' + translateX + 'px, -' + translateY + 'px)';
  });

  return (
    <>
      <Image
        src={expandImgIcon.src}
        fontSize="7px"
        onClick={imgOnOpen}
        right="4.05%"
        cursor="pointer"
        zIndex={1999}
        top="5.66%"
        position="absolute"
        objectFit="cover"
        alt="expand image icon"
      />

      <Modal isOpen={imgIsOpen} onClose={imgOnClose}>
        <ModalOverlay />
        <ModalContent
          minW="fit-content"
          minH="fit-content"
          mt="150px"
          borderRadius="16px"
          px="22px"
          py="57px"
          pb="20px"
          position={`relative`}
          zIndex={`20000`}
        >
          <ModalCloseButton zIndex={60} onClick={imgOnClose} />
          <ModalBody px="0px" py="0px">
            <Stack
              overflow="hidden"
              w={vid ? 'fit-content' : '995.92px'}
              h={vid ? 'fit-content' : '583.86px'}
              id={'container' + img}
              position="relative"
            >
              {vid ? (
                <video
                  controls
                  width="995.92px"
                  controlsList="nodownload"
                  style={{height: '583.86px', objectFit: 'cover'}}
                >
                  <source src={vid} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <Image
                  position="absolute"
                  top="0"
                  left="0"
                  src={img}
                  objectFit="contain"
                  id={'scaled-image' + img}
                  bg="whitesmoke"
                  w={995.92 * (zoomLevel / 100) + 'px'}
                  h={583.86 * (zoomLevel / 100) + 'px'}
                  // transform={`scale(${zoomLevel / 100})`}
                  transition="transform 0.2s"
                  alt="expanded image"
                />
              )}
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export const AGENT_REQUEST_COLUMN = refetch => [
  {
    Header: 'Name',
    accessor: row => {
      return (
        <HStack maxW="250px" justify="start" spacing="10px">
          <Image
            alt="avatar"
            borderRadius="full"
            boxSize="47.29px"
            src={row?.avatar ?? defaultImg.src}
          />
          <Text
            as="span"
            color="#191919"
            textTransform="capitalize"
            w="164px"
            textAlign="start"
            whiteSpace="break-spaces"
            fontSize="16px"
            fontWeight="400"
          >
            {`${row?.first_name} ${row?.last_name} `}
          </Text>
        </HStack>
      );
    },
  },
  {
    Header: 'Request Date',
    accessor: row => {
      return (
        <Text textAlign="start" color="#191919" fontSize="16px" w="full" fontWeight="400">
          {changeDateFormat(row?.sign_up_time, 'monthFirst')}
        </Text>
      );
    },
  },
  {
    Header: 'Phone number',
    accessor: row => {
      return (
        <Text textAlign="start" color="#191919" fontSize="16px" w="full" fontWeight="400">
          {row?.phone}
        </Text>
      );
    },
  },
  {
    Header: 'Email Address',
    accessor: row => <HoverListingName text={row.email} color="#4545fe" />,
  },
  {
    Header: 'Gender',
    accessor: row => {
      return (
        <Text textAlign="start" color="#191919" fontSize="16px" w="full" fontWeight="400">
          {row?.gender}
        </Text>
      );
    },
  },
  {
    Header: 'Action',
    hideHeader: true,
    accessor: row => {
      return <AgentApprovalModal refetch={refetch} accountId={row?.id} />;
    },
  },
];
