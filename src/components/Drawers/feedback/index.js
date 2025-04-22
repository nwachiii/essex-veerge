import {useState} from 'react';
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  Flex,
  Text,
  Box,
  Image,
  Center,
  Textarea,
  HStack,
  useToast,
  VStack,
  DrawerCloseButton,
  DrawerFooter,
} from '@chakra-ui/react';
import {feedback} from '../../../apis/veerge_menu';
import {useMutation} from '@tanstack/react-query';
import {scrollBarStyles} from '../../common/ScrollBarStyles';

import terrible from '../../../images/feedbacks/terrible.svg';
import bad from '../../../images/feedbacks/bad.svg';
import okay from '../../../images/feedbacks/okay.svg';
import good from '../../../images/feedbacks/good.svg';
import awesome from '../../../images/feedbacks/awesome.svg';

import terribleSelect from '../../../images/feedbacks-select/terrible.svg';
import badSelect from '../../../images/feedbacks-select/bad.svg';
import okaySelect from '../../../images/feedbacks-select/okay.svg';
import goodSelect from '../../../images/feedbacks-select/good.svg';
import awesomeSelect from '../../../images/feedbacks-select/awesome.svg';
import {Button} from 'ui-lib/ui-lib.components';

const Feedback = ({feedModal}) => {
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(0);
  const toast = useToast();

  const submitFeedback = useMutation(feedback, {
    onSuccess: async res => {
      handleResetModal();
      return toast({
        description: `We appreciate your feedback`,
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
    const body = {
      feedback: message,
      rating: rating.toFixed(1),
    };
    return submitFeedback.mutate(body);
  };

  const handleResetModal = () => {
    setMessage('');
    setRating(0);
    submitFeedback.reset();
    feedModal.onClose();
  };

  const isValid = !!message.trim();

  const reactions = [
    {
      img: terrible.src,
      imgSelect: terribleSelect.src,
      text: 'Terrible',
    },
    {
      img: bad.src,
      imgSelect: badSelect.src,
      text: 'Bad',
    },
    {
      img: okay.src,
      imgSelect: okaySelect.src,
      text: 'Okay',
    },
    {
      img: good.src,
      imgSelect: goodSelect.src,
      text: 'Good',
    },
    {
      img: awesome.src,
      imgSelect: awesomeSelect.src,
      text: 'Awesome',
    },
  ];

  return (
    <Drawer
      isCentered
      onCloseComplete={handleResetModal}
      blockScrollOnMount={true}
      onClose={feedModal?.onClose}
      isOpen={feedModal?.isOpen}
    >
      <DrawerOverlay />
      <DrawerContent
        marginTop="65px"
        maxW="450px"
        minH="437px"
        px="0"
        py="0"
        maxH="calc(100vh - 65px)"
        flex={1}
        justifyContent="space-between"
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
                Feedback
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
          <Box pb="20px" overflowY={'auto'} css={scrollBarStyles} mt='21px'>
            <Box px="25px">
              <Text fontSize={'14px'} fontWeight={300} color="#0D0D0D">
                Thank you for using Veerge! Help us improve our service by providing some feedback.
              </Text>

              <Flex gap='12px' mt="17px">
                {reactions.map((reaction, index) => (
                  <>
                    {rating === index + 1 ? (
                      <Center
                        onClick={() => setRating(index + 1)}
                        cursor={'pointer'}
                        bg="#3D3D3D"
                        w="58px"
                        h="48px"
                        alignItems={'center'}
                        justifyContent={'center'}
                        key={reaction.text}
                        gap="auto"
                        flexDirection={'column'}
                        border={'1px solid #E4E4E4'}
                      >
                        <Image alt="reaction" w="24px" h="24px" src={reaction.imgSelect} />
                        <Text fontSize={'10px'} fontWeight={400} color={'#fff'}>
                          {reaction.text}
                        </Text>
                      </Center>
                    ) : (
                      <Center
                        onClick={() => setRating(index + 1)}
                        cursor={'pointer'}
                        bg="#FBFCFC"
                        w="58px"
                        h="48px"
                        alignItems={'center'}
                        justifyContent={'center'}
                        key={reaction.text}
                        gap="auto"
                        flexDirection={'column'}
                        border={'1px solid #E4E4E4'}
                      >
                        <Image alt="reaction" w="24px" h="24px" src={reaction.img} />
                        <Text fontSize={'10px'} fontWeight={400} color={'#606060'}>
                          {reaction.text}
                        </Text>
                      </Center>
                    )}
                  </>
                ))}
              </Flex>
              <Text fontSize="12px" color="#0D0D0D" mb="10px" mt="29px">
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
            </Box>
          </Box>
        </Box>
        <DrawerFooter mb={10}>
          <Button
            w="full"
            h="45.5px"
            fontWeight="500"
            borderRadius="full"
            disabled={submitFeedback.isLoading}
            loading={submitFeedback.isLoading}
            onClick={handleSubmit}
            align="right"
            color="white"
            bg="#1d1d1d"
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

export default Feedback;
