import {
  Button,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerOverlay,
  Heading,
  HStack,
  VStack,
  Stack,
  Image,
  Text,
  Input,
  useToast,
} from '@chakra-ui/react';
import send from '/src/images/icons/sendIconForInspectionOnListings.svg';

import React from 'react';
import avatar from '/src/images/avatar.svg';
import {CreateToast} from '../../../ui-lib';
import {useMutation} from '@tanstack/react-query';
import {toastForError} from '../../../utils/toastForErrors';
import {changeDateFormat} from '../../../utils/formatDate';
import {respondToInspectionFeedBack} from '../../../apis/listings';
import FeedbackCard from './components/feedbackCard';
import ResponseCard from './components/responseCard';

export const FeedbackDrawer = ({refetch, info}) => {
  const feedBackDrawerDisclosure = useDisclosure();
  const [expand, setExpand] = React.useState();
  const [text, setText] = React.useState('');

  const handleChange = e => {
    return setText(e.target.value);
  };

  const customScrollbarStyles = {
    '&::-webkit-scrollbar': {
      width: '4px',
      borderRadius: '16px',
    },
    '&::-webkit-scrollbar-track': {
      borderRadius: '16px',
      WebkitBoxShadow: 'inset 0 0 6px #606060',
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '16px',
      backgroundColor: '#191919',
      // outline: "1px solid slategrey", // You can include this line if needed
    },
  };
  const toast = CreateToast();
  const formatText = text => {
    let regex = /@\w+/g;
    const words = text.split(' ');
    const formatted = words.map((word, idx) =>
      regex.test(word) ? (
        <Text key={idx} as="span" color="#4545FE" fontSize="14px" fontWeight="300">
          {word}{' '}
        </Text>
      ) : (
        <Text key={idx} as="span" fontSize="14px" fontWeight="300">
          {word}{' '}
        </Text>
      )
    );

    return formatted;
  };

  const mutation = useMutation(formData => respondToInspectionFeedBack(info?.id, formData), {
    onSuccess: async res => {
      await refetch();
    },
    onError: res => {
      return toastForError(err, true, toast);
    },
  });
  const handleSubmit = e => {
    e.preventDefault();

    return mutation.mutate({response: text});
  };

  const isValid = !!text.trim();
  return (
    <>
      <Button
        fontSize={{md: '10px', lg: '12px'}}
        lineHeight="1.4"
        fontWeight="500"
        color={info?.user_feedback ? `#4545FE` : '#242526'}
        p="12px 16px"
        bg="transparent"
        width="full"
        maxW="115px"
        h="max-content"
        onClick={feedBackDrawerDisclosure.onOpen}
        borderRadius="72px"
        border="1px solid"
        borderColor={info?.user_feedback ? `#4545FE` : '#242526'}
        _hover={{
          opacity: info?.user_feedback ? `1` : 'auto',
        }}
        _active={{
          opacity: info?.user_feedback ? `1` : 'auto',
        }}
        isDisabled={info?.user_feedback ? false : true}
      >
        {info?.user_feedback ? 'View Feedback' : 'No Feedback Yet'}
      </Button>
      <Drawer
        isOpen={feedBackDrawerDisclosure.isOpen}
        onClose={feedBackDrawerDisclosure.onClose}
        borderRadius="16px"
      >
        <DrawerOverlay bg="rgba(0,0,0,0.1)" />

        <DrawerContent
          position="relative"
          zIndex={100}
          mt="65.12px"
          // mt="112.12px"
          minW="450px"
          bg="#fff"
          p="0px"
          pr="4px"
        >
          <HStack
            boxShadow="0px 4px 8px 0px rgba(0, 0, 0, 0.02)"
            mb="20px"
            bg="#F5F5F5"
            py="12px"
            px="29px"
            h="62px"
            justify="space-between"
            align="center"
            position="relative"
          >
            <Heading fontSize="14px" fontWeight={600} as="h1">
              Feedback
            </Heading>

            <HStack spacing="15px">
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
                <DrawerCloseButton
                  right="0px"
                  left="0px"
                  my="auto"
                  color="#000"
                  top="0"
                  bottom="0"
                />
              </VStack>
            </HStack>
          </HStack>

          <DrawerBody sx={customScrollbarStyles} mb="10px" py="0px" px="24px">
            <Stack
              w="full"
              p="13px 16px"
              borderRadius="8px"
              border=".5px solid #E4E4E4"
              spacing="8px"
              bg={`#F9FAFB`}
            >
              <FeedbackCard
                formatText={formatText}
                expand={expand}
                info={info}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                text={text}
                mutation={mutation}
                isValid={isValid}
              />
              <ResponseCard
                formatText={formatText}
                expand={expand}
                info={info}
                setExpand={setExpand}
              />
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default FeedbackDrawer;
