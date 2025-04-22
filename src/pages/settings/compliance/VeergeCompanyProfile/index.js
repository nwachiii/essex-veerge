import React from 'react';
import {
  HStack,
  FormControl,
  Text,
  useToast,
  SimpleGrid,
  Stack,
  Textarea,
  Image,
} from '@chakra-ui/react';
import {Container3} from '../../../../components/common/containers';
import {FaFacebook, FaInstagram, FaLinkedinIn, FaTwitter} from 'react-icons/fa';
import {useFormik} from 'formik';
import {useMutation} from '@tanstack/react-query';
import {updateCompliance, updateDeveloperComplaince} from '../../../../apis/settings';
import AnimateInput from '../../../../components/AnimateInput';
import {Button} from '../../../../ui-lib';
import {RiHomeOfficeFill} from 'react-icons/ri';
import underReviewBanner from '/src/images/brand/under-review.svg';

export const VeergeCompanyProfile = ({fb, ins, li, tw, refetch, bio}) => {
  const defaultLinks = [
    {type: 'fb', logo: <FaFacebook />, handle: fb || 'No link yet'},
    {type: 'tw', logo: <FaTwitter />, handle: tw || 'No link yet'},
    {type: 'ins', logo: <FaInstagram />, handle: ins || 'No link yet'},
    {type: 'li', logo: <FaLinkedinIn />, handle: li || 'No link yet'},
  ];
  const toast = useToast();

  const user =
    typeof window !== 'undefined' &&
    localStorage &&
    JSON?.parse(localStorage.getItem('loggedinUser')) !== undefined &&
    JSON?.parse(localStorage.getItem('loggedinUser'));
  const mutation = useMutation(
    formData => {
      return updateDeveloperComplaince(formData);
    },
    {
      onSuccess: async res => {
        // console.log('socials response', res);

        toast({
          title: 'Company information has been updated',
          description: ``,
          status: 'success',
          duration: 8000,
          isClosable: true,
          position: 'top-right',
        });
        await refetch();
        addSocialsModal.onClose();
      },
      onError: err => {
        console.log(err);
        addSocialsModal.onClose();

        toast({
          title: 'An error occured',
          description: err.response?.data?.message
            ? err.response?.data?.message
            : err.response?.statusText,
          status: 'error',
          duration: 8000,
          isClosable: true,
          position: 'top-right',
        });
      },
    }
  );
  const mutationBio = useMutation(
    formData => {
      return updateCompliance(formData);
    },
    {
      onSuccess: async res => {
        // toast({
        // 	title: 'Company information has been updated',
        // 	description: ``,
        // 	status: 'success',
        // 	duration: 8000,
        // 	isClosable: true,
        // 	position: 'top-right',
        // });
        await refetch();
        onCloseBioModal();
      },
      onError: err => {
        console.log(err);
        onCloseBioModal();
        toast({
          title: 'An error occured',
          description:
            err?.response?.data?.message ??
            err?.response?.message ??
            err?.message ??
            'Something went wrong, we are working on resolving it.',
          status: 'error',
          duration: 8000,
          isClosable: true,
          position: 'top-right',
        });
      },
    }
  );

  const initialValues = {
    social_links_facebook: defaultLinks[0].handle,
    social_links_instagram: defaultLinks[2].handle,
    social_links_linkedIn: defaultLinks[1].handle,
    social_links_twitter: defaultLinks[3].handle,
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: values => {
      // console.log('valuessss', values);
      mutation.mutate({...values, 'update-profile': false});
      localStorage.setItem('loggedinUser', JSON.stringify({...user, ...values}));
    },
  });
  const formikBio = useFormik({
    initialValues: {bio: bio},
    onSubmit: values => {
      mutationBio.mutate(values);
    },
  });
  const isValid =
    formik.values.social_links_facebook.trim() &&
    formik.values.social_links_instagram.trim() &&
    formik.values.social_links_linkedIn.trim() &&
    formik.values.social_links_twitter.trim();
  return (
    <Container3
      pb="48px"
      spacing="9px"
      my="0px"
      isUpdated={defaultLinks.every(item => item.handle !== 'No link yet')}
      title=""
      isRequired
      border=" 1px solid #EAECF0"
    >
      <Stack align={'flex-start'}>
        <HStack w="full" justify={'space-between'} mb="20px">
          <Text
            align={'center'}
            display={'flex'}
            textAlign={'left'}
            fontWeight={'500'}
            fontSize={'18px'}
            lineHeight={'23px'}
            color={'#191919'}
          >
            <RiHomeOfficeFill style={{marginTop: '.1em', marginRight: '10px'}} />
            Tell us about Your Company
          </Text>
          <Button
            // mt={0}
            isDisabled={!isValid || !Boolean(formikBio.values.bio)}
            w="140px"
            h="48px"
            type="submit"
            variant="dark"
            onClick={() => {
              formik.handleSubmit();
              formikBio.handleSubmit();
            }}
            isLoading={mutation.isLoading || mutationBio.isLoading}
          >
            Update
          </Button>
        </HStack>

        <FormControl
          as="form"
          display="flex"
          flexDirection="column"
          alignContent="center"
          w="80%"
          mx="auto"
        >
          <Text
            mb="15px"
            textAlign={'left'}
            fontWeight={'500'}
            fontSize={'14px'}
            lineHeight={'23px'}
            color={'#4545FE'}
          >
            Social Media Links
          </Text>
          <SimpleGrid columns={2} w="full" spacing="32px">
            <AnimateInput
              w="full"
              borderColor="lightgray"
              placeholder="Facebook"
              h="68px"
              pl="23.6px"
              labLeft="23.6px"
              borderRadius="12px"
              required
              type="text"
              id="social_links_facebook"
              name="social_links_facebook"
              onChange={formik.handleChange}
              value={
                formik.values.social_links_facebook === 'No link yet'
                  ? ''
                  : formik.values.social_links_facebook
              }
              _placeholder={{
                color: '#19191966',
              }}
            />

            <AnimateInput
              w="full"
              borderColor="lightgray"
              placeholder="Instagram"
              h="68px"
              pl="23.6px"
              labLeft="23.6px"
              borderRadius="12px"
              required
              type="text"
              id="social_links_instagram"
              name="social_links_instagram"
              onChange={formik.handleChange}
              value={
                formik.values.social_links_instagram === 'No link yet'
                  ? ''
                  : formik.values.social_links_instagram
              }
              _placeholder={{
                color: '#19191966',
              }}
            />

            <AnimateInput
              w="full"
              borderColor="lightgray"
              placeholder="LinkedIn"
              h="68px"
              pl="23.6px"
              labLeft="23.6px"
              borderRadius="12px"
              required
              type="text"
              id="social_links_linkedIn"
              name="social_links_linkedIn"
              onChange={formik.handleChange}
              value={
                formik.values.social_links_linkedIn === 'No link yet'
                  ? ''
                  : formik.values.social_links_linkedIn
              }
              _placeholder={{
                color: '#19191966',
              }}
            />

            <AnimateInput
              w="full"
              borderColor="lightgray"
              placeholder="Twitter"
              h="68px"
              pl="23.6px"
              labLeft="23.6px"
              borderRadius="12px"
              required
              type="text"
              id="social_links_twitter"
              name="social_links_twitter"
              onChange={formik.handleChange}
              value={
                formik.values.social_links_twitter === 'No link yet'
                  ? ''
                  : formik.values.social_links_twitter
              }
              _placeholder={{
                color: '#19191966',
              }}
            />
          </SimpleGrid>
          <Text
            mt="40px"
            mb="10px"
            textAlign={'left'}
            fontWeight={'500'}
            fontSize={'14px'}
            lineHeight={'23px'}
            color={'#4545FE'}
          >
            Company Bio
          </Text>
          <HStack position={'relative'}>
            <Textarea
              required
              maxLength="750"
              rows={8}
              name="bio"
              onChange={formikBio.handleChange}
              value={formikBio.values.bio}
              resize="none"
              placeholder="How would you describe your business in a concise manner?"
              _placeholder={{
                color: '#919191',
              }}
              style={{
                outline: 0,
                width: '100%',
                padding: '20px 16px',
                fontSize: '16px',
                borderRadius: '12px',
                background: 'transparent',
                border: '1px solid #E5E5E5',
              }}
              title="Your bio should be less than 750 characters"
            />
            {/* <Text
              position={'absolute'}
              textAlign="end"
              fontSize="12px"
              fontWeight="400"
              color="gray.500"
              right={'3%'}
              bottom={'1.7%'}
            >
              Max. 750 characters
            </Text> */}
          </HStack>
        </FormControl>
      </Stack>
    </Container3>
  );
};
export default VeergeCompanyProfile;
