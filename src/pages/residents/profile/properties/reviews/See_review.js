import React from 'react';
import {useFormik} from 'formik';
import avatar from '/src/images/avatar.svg';
import {useMutation} from '@tanstack/react-query';
import send from '/src/images/icons/sendIcon.png';
import {Input} from '../../../../../ui-lib/ui-lib.components';
import {
  FormControl,
  HStack,
  Text,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  ModalOverlay,
  ModalContent,
  Flex,
  useDisclosure,
  Image,
  useToast,
  Button,
  Spinner,
} from '@chakra-ui/react';
import Disputecomment from '@/components/Drawers/review/disputeComments';
import SeeReviewDrawer from '@/components/Drawers/review';

const See_review = ({
  customerInfo,
  feedbacks,
  forDispute,
  equityInfo,
  customerEquities,
  refetch,
}) => {
  const drawerDisclosure = useDisclosure();

  const formik = useFormik({
    initialValues: {},
    onSubmit: values => {
      console.log(JSON.stringify(values));
      mutation.mutate(values);
    },
  });
  const [emailed, setEmailed] = React.useState('');

  const toast = useToast();
  const mutation = useMutation(
    formData => {
      // return addTeamMember(formData);
    },
    {
      onSuccess: res => {
        console.log(res);
        setEmailed(formik?.values?.email);
        formik.resetForm();
        //   refetch();
      },
      onError: err => {
        console.log(err);
        drawerDisclosure.onClose();
        formik.resetForm();
        toast({
          title: 'An error occured',
          status: 'error',
          duration: 8000,
          isClosable: true,
          position: 'top-right',
        });
      },
    }
  );

  return (
    <div>
      {forDispute || feedbacks?.length ? (
        <Button
          onClick={drawerDisclosure.onOpen}
          variant="default"
          width="205px"
          height="48px"
          border="1px solid #12D8A0"
          borderRadius="72px"
          _focus={{opacity: '1'}}
          _hover={{opacity: '1'}}
          _active={{opacity: '1'}}
          fontWeight="500"
          fontSize="14px"
          textAlign="center"
          color="#12D8A0"
        >
          {forDispute ? 'Read comment' : ' See review'}
        </Button>
      ) : null}
      {forDispute ? (
        <Disputecomment drawerDisclosure={drawerDisclosure} feedback={equityInfo?.feedback} />
      ) : (
        // <Modal
        //   isCentered
        //   h="636px"
        //   isOpen={drawerDisclosure.isOpen}
        //   onClose={drawerDisclosure.onClose}
        // >
        //   <ModalOverlay />
        //   <ModalContent maxW="644px" borderRadius="16px">
        //     <ModalHeader pt="12px" pb="0">
        //       Feedback
        //     </ModalHeader>
        //     <ModalCloseButton />
        //     <ModalBody pt="26px" pb="31px" px="31">
        //       <HStack spacing="8px" justify={'start'} align={'center'} pb={'10px'}>
        //         <Image
        //           src={avatar.src}
        //           borderRadius="full"
        //           alt="profile picture feedback"
        //           boxSize="72px"
        //         />
        //         <Text as="span" fontSize="18px" fontWeight="600">
        //           Mary Jane
        //         </Text>
        //       </HStack>
        //       <Text fontSize="16px" fontweight="300">
        //         Suspendisse potenti. Pellentesque habitant morbi tristique senectuset netus et
        //         malesuada fames ac turpis egestas. Quisque in nibh libero. Nullam feugiat turpis vel
        //         varius laoreet. Nulla volutpat leo id elit convallis
        //       </Text>
        //       <Text mt="12px" as="span" fontSize="12px" fontweight="300">
        //         22/4/2022 11:00am
        //       </Text>
        //       <FormControl
        //         as="form"
        //         mt="114px"
        //         display="flex"
        //         onSubmit={formik.handleSubmit}
        //         // flexDirection="column"
        //         gap="12px"
        //         align="center"
        //       >
        //         <Input
        //           required
        //           type="input"
        //           id="text_for_inspection_feedback"
        //           name="text"
        //           onChange={formik.handleChange}
        //           value={formik.values.text}
        //           noLabel
        //           notes
        //           placeholder="Type in your message"
        //           _placeholder={{
        //             color: 'gray.500',
        //           }}
        //         />
        //         <Button
        //           alignSelf="center"
        //           _hover={{bg: 'transparent'}}
        //           notes
        //           w="fit-content"
        //           p="0"
        //           m="0"
        //           type="submit"
        //         >
        //           {mutation.isLoading ? (
        //             <Spinner colorScheme="whitesmoke" />
        //           ) : (
        //             <Image
        //               borderRadius="full"
        //               cursor="pointer"
        //               alt="send image icon"
        //               src={send.src}
        //             />
        //           )}
        //         </Button>
        //       </FormControl>
        //     </ModalBody>
        //   </ModalContent>
        // </Modal>
        <SeeReviewDrawer
          drawerDisclosure={drawerDisclosure}
          feedbacks={feedbacks}
          refetch={refetch}
        />
      )}
    </div>
  );
};
export default See_review;
