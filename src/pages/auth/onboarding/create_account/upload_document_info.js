import {useState} from 'react';
import axios from 'utils/axiosInstance';
import {useFormik} from 'formik';
import {useRouter} from 'next/router';
import {encodeFileToBase64, extractBase64} from '../../../../utils';
import {useMutation} from '@tanstack/react-query';
import {Button, CustomSelect, Form, Input, UploadProfilePicture} from 'ui-lib/ui-lib.components';
import {
  SimpleGrid,
  Spinner,
  Stack,
  Box,
  useDisclosure,
  useToast,
  HStack,
  Button as ChakraButton,
  Text,
} from '@chakra-ui/react';
import 'react-datepicker/dist/react-datepicker.css';
import {BaseURL_ONE} from '../../../../constants/routes';
import CreateAccountAssistance from '../../../../components/VeergeAssistance/CreateAccountAssistance';
import DocInput from 'ui-lib/ui-lib.components/Input/DocInput';
import {formatDateStringDayFirst} from 'utils/formatDate';

const nextPage = '/expected_activities';

export default function Upload_document_info() {
  const router = useRouter();
  const toast = useToast();
  const [avatar, setAvatar] = useState([]);
  const [document, setDocument] = useState([]);
  const country = 1;
  const WIDGET_MODAL = useDisclosure();
  const [docObj, setDocObj] = useState({name: ''});

  const currentSignUpData = JSON.parse(localStorage.getItem('SignUpData'));

  const mutation = useMutation(
    formData => {
      return axios.post(`${BaseURL_ONE}/user/developer`, formData);
    },
    {
      onSuccess: res => {
        // console.log(res);
        setTimeout(() => {
          router.push(nextPage);
        }, 1500);
        localStorage.setItem('devToken', JSON.stringify(res?.data?.token));
        localStorage.setItem('loggedinUser', JSON.stringify(res?.data?.user));
        localStorage.setItem('DEVELOPER_PLAN', JSON.stringify(res?.data?.plan));
      },
      onError: err => {
        // console.log(err);
        toast({
          title: `${err?.response?.data?.message ?? err?.response?.data}`,
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
        });
      },
    }
  );

  const formik = useFormik({
    initialValues: currentSignUpData,
    onSubmit: values => {
      const [d, m, y] = values?.exp_date?.split('/');
      const payload = {
        ...values,
        avatar: extractBase64(avatar)?.toString(),
        document: document,
        country,
        exp_date: y == undefined ? null : `${y}-${m}-${d}`,
      };
      mutation.mutate({...payload});
      localStorage.setItem('SignUpData', JSON.stringify({...payload}));
    },
  });

  const isFieldEmpty = !formik?.values?.document_type || !document?.length || !avatar?.length;

  const removeFile = () => {
    setDocObj({});
  };

  const handleUploadIDFxn = async event => {
    setDocObj(event?.currentTarget?.files[0]);
    setDocument([await encodeFileToBase64(event?.currentTarget?.files[0]).then(res => res)]);
  };

  const handleDate = e => {
    const inputValue = e.target.value;

    const formattedValue = formatDateStringDayFirst(inputValue);

    if (!e.target.value.trim()) {
      const {exp_date, ...rest} = formik.values;
      return formik.setValues(rest);
    }
    formik.setValues({...formik.values, exp_date: formattedValue});
    formik.setErrors({...formik.errors, exp_date: ''});
  };
  return (
    <>
      <Form as="form">
        <Form.Header fontSize="32px" fontWeight="600">
          Almost done!
        </Form.Header>

        <Form.Body>
          <Stack mb={-3}>
            <Stack justify={'center'}>
              <UploadProfilePicture
                isAuth
                id="avatar"
                name="avatar"
                files={avatar}
                setFiles={setAvatar}
              />
            </Stack>
            <CustomSelect
              isAuth
              style={{color: '#FFFFFF', backgroundColor: '#1A1A1A'}}
              id="document_type"
              name="document_type"
              onChange={formik?.handleChange}
              value={formik?.values?.document_type}
              border={'1px solid #3F3F3F'}
              outline={'none'}
              _focus={{outline: `none`, border: '1px solid #fff'}}
              _focusVisible={{outline: `none`, border: '1px solid #fff'}}
              sx={{'> option': {background: '#1A1A1A', color: '#FFFFFF'}}}
            >
              <option value="Select ID Type" hidden>
                Select ID Type
              </option>
              <option value={'Driver License'}>{`Driver's License`}</option>
              <option value={'International Passport'}>International Passport</option>
              <option value={'National Identity Card'}>National Identity Card</option>
            </CustomSelect>
            <SimpleGrid columns={1} spacing="3px" mt="1em" mb={-3}>
              <Input
                isAuth
                noLabel
                id="id_number"
                name="id_number"
                onChange={formik?.handleChange}
                value={formik?.values?.id_number}
                placeholder="Valid ID number"
                color="#FFFFFF"
                type="text"
                isRequired
                border={'1px solid #3F3F3F'}
              />

              {formik?.values?.document_type !== 'National Identity Card' ? (
                <Input
                  isAuth
                  noLabel
                  type="text"
                  id="exp_date"
                  name="exp_date"
                  color="#FFFFFF"
                  // placeholder="ID expiry date ( e.g., 2023-07-05 )"
                  placeholder="ID expiry date ( DD/MM/YYYY )"
                  onChange={handleDate}
                  value={formik?.values?.exp_date}
                  pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
                  // min={'2023-07-05'}
                />
              ) : null}
            </SimpleGrid>

            <DocInput
              contract={null}
              docObj={docObj}
              removeFile={removeFile}
              useAuthStyle
              component={
                <Box
                  border={'1px solid #3F3F3F'}
                  bg="#1A1A1A"
                  borderRadius="12px"
                  py="3px"
                  position="relative"
                >
                  <HStack p={`10px`}>
                    <label for="document">
                      <ChakraButton
                        bg={`#fff`}
                        color={`#191919`}
                        borderRadius={`8px`}
                        fontSize={`16px`}
                        w={`max-content`}
                        p={`10px !important`}
                        fontWeight={`400`}
                        h={`max-content`}
                        m={`0px`}
                      >
                        Choose File
                      </ChakraButton>
                    </label>
                    <Text>Upload ID</Text>
                  </HStack>
                  <input
                    type="file"
                    id="document"
                    name="document"
                    color="#FFFFFF"
                    className={'upload_Style'}
                    onChange={e => handleUploadIDFxn(e)}
                    accept="image/png, image/gif, image/jpeg"
                    autocapitalize="characters"
                    style={{
                      opacity: `0`,
                      position: `absolute`,
                      top: `0px`,
                      left: `0px`,
                      bottom: `0px`,
                      right: `0px`,
                      cursor: `pointer`,
                    }}
                  />
                </Box>
              }
            />
          </Stack>
        </Form.Body>
        <Form.Footer>
          <Button
            withoutLoader
            fontSize={'18px'}
            fontWeight="500"
            type="button"
            onClick={formik.handleSubmit}
            isDisabled={isFieldEmpty || mutation?.isLoading}
          >
            {mutation?.isLoading ? <Spinner color="#191919" /> : 'Create Account'}
          </Button>
        </Form.Footer>
      </Form>
      <CreateAccountAssistance WIDGET_MODAL={WIDGET_MODAL} />
    </>
  );
}
