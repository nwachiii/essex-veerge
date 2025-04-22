import React, {useState} from 'react';
import {Container3} from '../../../../components/common/containers';
import {useFormik} from 'formik';
import {Text, HStack, Image, useDisclosure, useToast, Textarea} from '@chakra-ui/react';
import {Button} from '../../../../ui-lib';
import {updateCompliance} from '../../../../apis/settings';
import {useMutation} from '@tanstack/react-query';

export const BioBox = ({bio, refetch}) => {
  const toast = useToast();
  const mutation = useMutation(
    formData => {
      return updateCompliance(formData);
    },
    {
      onSuccess: async res => {
        toast({
          title: 'Bio has been updated',
          description: ``,
          status: 'success',
          duration: 8000,
          isClosable: true,
          position: 'top-right',
        });
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

  const formik = useFormik({
    initialValues: {bio: bio},
    onSubmit: values => {
      mutation.mutate(values);
    },
  });
  return (
    <Container3
      spacing="15px"
      pt="14px"
      mt="34px"
      my="0"
      title="Company Bio"
      isUpdated={bio}
      minH={'200px'}
      h="fit-content"
      isRequired
    >
      <HStack align="start" justify={'space-between'}>
        <HStack position={'relative'} w="70%">
          <Textarea
            required
            maxLength="750"
            rows={8}
            name="bio"
            onChange={formik.handleChange}
            value={formik.values.bio}
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
            title="Your bio should be 750 characters which is between 107 words and 188 words"
          />
          {/* <Text
            position={'absolute'}
            textAlign="end"
            fontSize="12px"
            fontWeight="400"
            color="gray.500"
            right={'3%'}
            bottom={'1.7%'}
            //   mt={"-50px"}
          >
            Max. 188 words
          </Text> */}
        </HStack>
        <Button
          h="48px"
          w="140px"
          px="1em"
          variant="dark"
          onClick={formik.handleSubmit}
          isLoading={mutation.isLoading}
          isDisabled={!Boolean(formik.values.bio)}
        >
          Update
        </Button>
      </HStack>
    </Container3>
  );
};
export default BioBox;
