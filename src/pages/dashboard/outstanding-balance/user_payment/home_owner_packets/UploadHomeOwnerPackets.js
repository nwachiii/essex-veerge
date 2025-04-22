import {
  Box,
  Flex,
  HStack,
  Input,
  SimpleGrid,
  Spinner,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import {FaRegLightbulb} from 'react-icons/fa';
import {themeStyles} from '../../../../../theme';
import {useMutation} from '@tanstack/react-query';
import {addCustomerEquityPackets} from '../../../../../apis/customers';
import {AddMoreBtn, Button, Popup} from 'ui-lib/ui-lib.components';
import {Field, FieldArray, Form, Formik} from 'formik';
import {encodeFileToBase64} from '../../../../../utils';
import {AiOutlineInfoCircle} from 'react-icons/ai';
import {DeleteIcon} from '@chakra-ui/icons';
import {BsCloudUploadFill} from 'react-icons/bs';
import {scrollBarStyles} from '../../../../../components/common/ScrollbarStyling';

export const UploadHomeOwnerPackets = ({userId, id}) => {
  const toast = useToast();

  const UPLOAD_PACKETS_MODAL = useDisclosure();

  const mutation = useMutation(data => addCustomerEquityPackets(id, data), {
    onSuccess: res => {
      console.log(res);
      // router.push('/auth/forgot_password/reset_password');
      toast({
        title: `Upload Succesful`,
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
      setTimeout(() => {
        UPLOAD_PACKETS_MODAL.onClose();
      }, 3000);
    },
    onError: err => {
      console.log(err);
      toast({
        title: `Failed to upload to server`,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    },
  });

  return (
    <div>
      <HStack p="1.2em" spacing="20px" onClick={UPLOAD_PACKETS_MODAL.onOpen}>
        {/* <Image boxSize={'23px'} src={home_owner_packet_icon.src} /> */}
        <BsCloudUploadFill fontSize={24} style={{color: 'teal'}} />

        <Text color="#191919" fontSize="16px" fontWeight={500}>
          {`Upload home owner's packets`}
        </Text>
      </HStack>
      <Popup
        hideCloseBtn
        overflowY="auto"
        size="full"
        minH="fit-content"
        h="422px"
        mt="6vh"
        minW={{base: '90%', md: '838px'}}
        px="30px"
        color="#191919"
        isOpen={UPLOAD_PACKETS_MODAL.isOpen}
        onClose={UPLOAD_PACKETS_MODAL.onClose}
      >
        <HStack w="full" justify={'space-between'}>
          <Text fontSize="24px" fontWeight={600}>
            Upload Packets
          </Text>
          <Flex
            align={'center'}
            justifyContent={'flex-end'}
            display={'flex'}
            gap="2px"
            mt="5px"
            cursor="pointer"
            fontSize={'16px'}
            color="#4545FE"
          >
            <FaRegLightbulb
              fontSize={'18px'}
              fontWeight={'800'}
              color={themeStyles.color.matador__primary}
            />
            <Text>
              <small>Need clarity?</small>
            </Text>
          </Flex>
        </HStack>
        <Popup.Body overflowY="auto" css={scrollBarStyles}>
          <Flex
            w="full"
            h="fit-content"
            py={4}
            bg="#EAEAEA"
            borderRadius={'12px'}
            align={'center'}
            mx="auto"
            gap="10px"
            px={4}
          >
            <AiOutlineInfoCircle style={{height: '54px', width: '44px'}} />
            <Text
              fontSize={'16px'}
            >{`This is the point where home owner's packets are added. Fill in the title of the closing cost and input the amount. You can also add more home owner's packets`}</Text>
          </Flex>
          <Formik
            initialValues={{
              owners_packets: [
                {
                  equity: parseInt(id),
                  packet_name: '',
                  packet: '',
                },
              ],
            }}
            onSubmit={values => {
              // console.log({...values});
              mutation.mutate({...values.owners_packets});
            }}
          >
            {({values, isSubmitting, setFieldValue}) => (
              <>
                <Form>
                  <FieldArray name={`owners_packets`}>
                    {({insert, remove, push}) => (
                      <div>
                        {values?.owners_packets?.length > 0 &&
                          values?.owners_packets?.map((packet, idx) => (
                            <Box
                              key={idx}
                              id="#"
                              w="full"
                              position="relative"
                              borderBottom={
                                idx == values?.owners_packets?.length - 1
                                  ? null
                                  : '1px solid #E5E5E5'
                              }
                            >
                              {idx > 0 && (
                                <HStack
                                  onClick={() => remove(idx)}
                                  pt={2}
                                  cursor="pointer"
                                  w="full"
                                  justify={'flex-end'}
                                  className="col"
                                  align="center"
                                >
                                  <DeleteIcon color={themeStyles.color.matador__red} />
                                  <Text gap={4} fontSize={'12px'} color="red">
                                    Delete
                                  </Text>
                                </HStack>
                              )}
                              <SimpleGrid
                                w="full"
                                spacing="26px"
                                mt="6px"
                                mb="16px"
                                columns={2}
                                className="row"
                                key={idx}
                              >
                                <Box w="full">
                                  <label
                                    style={{
                                      fontWeight: '600',
                                    }}
                                    htmlFor={`owners_packets.${idx}.packet_name`}
                                  >
                                    Document title
                                  </label>

                                  <Field
                                    type="text"
                                    placeholder="Enter the title of the document..."
                                    className="formik__field"
                                    name={`owners_packets.${idx}.packet_name`}
                                  />
                                </Box>

                                <div>
                                  <label
                                    style={{
                                      fontWeight: '600',
                                    }}
                                    htmlFor={`owners_packets.${idx}.packet`}
                                  >
                                    Document
                                  </label>

                                  <Input
                                    id="file"
                                    name={`owners_packets.${idx}.packet`}
                                    type="file"
                                    onChange={async event => {
                                      setFieldValue(
                                        `owners_packets.${idx}.packet`,
                                        [
                                          await encodeFileToBase64(
                                            event.currentTarget.files[0]
                                          ).then(res => res),
                                        ][0]
                                      );
                                    }}
                                    className=""
                                    maxW="450px"
                                    w="full"
                                    py="10px"
                                    mt="7px"
                                    h="fit-content"
                                    borderRadius="14px"
                                    accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/pdf"
                                  />
                                </div>
                              </SimpleGrid>
                            </Box>
                          ))}
                        <HStack w="full" justify={'flex-end'} mt="40px" mb="20px">
                          <AddMoreBtn
                            btnText="Add document"
                            clickFunction={() =>
                              push({
                                equity: parseInt(id),
                                packet_name: '',
                                packet: '',
                              })
                            }
                          />
                          <Button type="submit" mt={0} w="117px" variant="dark">
                            {mutation?.isLoading ? <Spinner /> : 'Save'}
                          </Button>
                        </HStack>
                      </div>
                    )}
                  </FieldArray>
                </Form>
              </>
            )}
          </Formik>
        </Popup.Body>
      </Popup>
    </div>
  );
};

export default UploadHomeOwnerPackets;
