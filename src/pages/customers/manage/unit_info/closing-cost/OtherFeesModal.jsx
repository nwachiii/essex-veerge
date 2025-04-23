import {
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  VStack,
  useToast,
  SimpleGrid,
  Spinner,
} from '@chakra-ui/react';
import React from 'react';
import modalImg from '../../../../../images/edit_plan_modal.png';
import {Button, SwalSuccess} from '../../../../../ui-lib/ui-lib.components';
import {useMutation} from '@tanstack/react-query';
import {Formik} from 'formik';
import * as Yup from 'yup';
import axios from 'utils/axiosInstance';
import {BaseURL_TWO} from '../../../../../constants/routes';
import {Field} from 'formik';

const SubmitSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  cost: Yup.string().required('Required'),
});

const OtherFeesModal = ({isOpen, onClose, fee, refetch}) => {
  // console.log('fee', fee);
  const toast = useToast();
  const token = JSON.parse(localStorage.getItem('devToken'));
  const mutation = useMutation({
    mutationFn: values => {
      // console.log('fee', fee?.id);
      return axios.patch(
        `${BaseURL_TWO}/investment/fees/${fee?.id}/`,
        {name: values.name, cost: parseInt(values.cost)},
        {headers: {Authorization: `Bearer ${token}`}}
      );
    },
    onSuccess: res => {
      // console.log(res);
      onClose();
      toast({
        title: 'Request success!',
        description: `Fees edited successfully`,
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
      refetch();
    },
    onError: err => {
      console.log(err);
      toast({
        title: 'An error occured',
        description: `${err?.code} : ${err?.message}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    },
  });

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxW="383px" borderRadius="16px">
        <ModalCloseButton />
        <ModalBody px="25px" w="100%" mt="22px" pb="31px">
          <Formik
            initialValues={{name: fee?.name || '', cost: fee?.amount || '0'}}
            validationSchema={SubmitSchema}
            onSubmit={values => {
              mutation.mutate(values);
            }}
          >
            {({handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
              <VStack width="100%" pb={'10px'}>
                <Image
                  alt=""
                  mt="19px"
                  src={modalImg.src}
                  boxSize="72px"
                  width="68px"
                  height="68px"
                />
                <Text
                  mt="15px"
                  textAlign="center"
                  maxW="235px"
                  fontSize="24px"
                  fontWeight="600"
                  lineHeight="30px"
                >
                  Edit Closing Cost
                </Text>
                <SimpleGrid w="full" spacing="20px" mt="20px" columns={1}>
                  <Field
                    className="formik__field"
                    color="#CBCBCB"
                    mx={1}
                    required
                    type="text"
                    id="name"
                    name="name"
                    _placeholder={{color: 'gray.500'}}
                    defaultValue={values.name}
                    onBlur={handleBlur('name')}
                    onChange={handleChange('name')}
                    borderBottom={errors.name && touched.name ? 'red' : '1px solid #CBCBCB'}
                    isAuth
                    placeholder="Name"
                  />
                  <Field
                    className="formik__field"
                    color="#CBCBCB"
                    mx={1}
                    required
                    type="text"
                    id="cost"
                    name="cost"
                    _placeholder={{color: 'gray.500'}}
                    defaultValue={values.cost}
                    onBlur={handleBlur('cost')}
                    onChange={handleChange('cost')}
                    borderBottom={errors.cost && touched.cost ? 'red' : '1px solid #CBCBCB'}
                    isAuth
                    placeholder="Initial deposit"
                  />
                </SimpleGrid>
                <Button
                  disabled={mutation.isLoading}
                  loading={mutation.isLoading}
                  onClick={() => handleSubmit()}
                  mt="33px"
                  variant="primary"
                  w={{base: 'full', lg: '325px'}}
                  h="48px"
                >
                  {mutation.isLoading ? <Spinner color="#FFF" /> : 'Save'}
                </Button>
              </VStack>
            )}
          </Formik>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default OtherFeesModal;
