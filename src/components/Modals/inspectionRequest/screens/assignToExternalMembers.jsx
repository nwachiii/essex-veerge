import {
  Heading,
  HStack,
  Image,
  Spinner,
  Tag,
  TagLabel,
  Text,
  Textarea,
  useDisclosure,
  useToast,
  VStack,
  Button as ChakraButton,
  Stack,
  ModalBody,
  Input,
} from '@chakra-ui/react';
import {useFormik} from 'formik';
import React from 'react';
import {Button} from 'ui-lib';

const AssignToExternalMembers = ({setSummaryInfo, handleScreen}) => {
  const formik = useFormik({
    initialValues: {
      email: '',
      full_name: '',
      note: '',
    },
    onSubmit: (values, {resetForm}) => {
      setSummaryInfo(values);
      handleScreen(history ? 'summaryForHistoryonExternalMember' : 'summaryForExternalMember');

      resetForm();
    },
  });
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const isValid =
    emailPattern.test(formik.values.email) &&
    formik.values.email.trim() &&
    formik.values.full_name.trim() &&
    formik.values.note.trim();
  return (
    <Stack w={`640px`} py="36px" px="24px">
      <VStack align={`stretch`} gap={`4px`} mb={`20px`}>
        <Heading fontSize="24px" fontWeight="600" lineHeight={`117%`} color="#191919">
          Assign Inspection
        </Heading>
        <Text color={`#525252`} fontSize={`16px`} fontWeight={`400`} lineHeight={`125%`}>
          Who do you want to assign the inspection to ?
        </Text>
      </VStack>
      <ModalBody pb="0px" p="0">
        <VStack
          w="full"
          px="2px"
          gap="16px"
          onSubmit={e => {
            if (e.cancelable) e.preventDefault();
            return formik.handleSubmit();
          }}
          as="form"
          align={`stretch`}
        >
          <VStack align="stretch" gap="6px" w="full">
            <Text color={`#424242`} fontSize={`14px`} fontWeight={`500`} lineHeight={`143%`}>
              Email
            </Text>
            <Input
              noLabel
              placeholder="Enter assignee's email address"
              name="email"
              w="full"
              onChange={formik.handleChange}
              border="1px solid #919191"
              borderRadius="12px"
              fontSize="14px"
              fontWeight="400"
              _focusVisible={{
                borderColor: '#3182ce',
                boxShadow: '0 0 0 1px #3182ce',
              }}
              _placeholder={{
                fontSize: '14px',
                fontWeight: '400',
                color: '#919191',
              }}
              h="64px"
              value={formik.values.email}
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            />
          </VStack>
          <VStack align="stretch" gap="6px" w="full">
            <Text color={`#424242`} fontSize={`14px`} fontWeight={`500`} lineHeight={`143%`}>
              Full Name
            </Text>
            <Input
              w="100%"
              onChange={formik.handleChange}
              value={formik.values.full_name}
              noLabel
              name="full_name"
              border="1px solid #919191"
              borderRadius="12px"
              _focusVisible={{
                borderColor: '#3182ce',
                boxShadow: '0 0 0 1px #3182ce',
              }}
              fontSize="14px"
              fontWeight="400"
              _placeholder={{
                fontSize: '14px',
                fontWeight: '400',
                color: '#919191',
              }}
              h="64px"
              placeholder="Assignee's full name"
            />
          </VStack>
          <VStack align="flex-start" gap="6px" w="full">
            <Text color={`#424242`} fontSize={`14px`} fontWeight={`500`} lineHeight={`143%`}>
              Note
            </Text>
            <Textarea
              name="note"
              value={formik.values.note}
              onChange={formik.handleChange}
              resize="none"
              fontSize="14px"
              fontWeight="400"
              borderRadius="8px"
              maxLength="5000"
              w="full"
              py="24px"
              px="16px"
              border="1px solid #919191"
              _placeholder={{
                fontSize: '14px',
                fontWeight: '400',
                color: '#919191',
              }}
              h="100px"
              placeholder="Leave a note for the person you're assigning inspection to"
            />
          </VStack>
          <HStack align="end" gap="12px">
            <ChakraButton
              onClick={() => handleScreen('assignToTeamMember')}
              fontWeight="500"
              fontSize="16px"
              bg="transparent"
              _hover={{
                bg: 'transparent',
              }}
              border="1px solid"
              color="#424242"
              borderRadius="72px"
              w={`100%`}
              h={`max-content`}
              p={`16px 18px`}
              lineHeight={`150%`}
              flex={`1`}
            >
              Assign to Team Member
            </ChakraButton>
            <Button
              isDisabled={!isValid}
              onClick={null}
              type="submit"
              notes
              bg="#191919"
              color="#ffffff"
              fontSize="16px"
              fontWeight="500"
              borderRadius="72px"
              w={`100%`}
              h={`max-content`}
              p={`16px 18px`}
              lineHeight={`150%`}
              flex={`1`}
            >
              Proceed
            </Button>
          </HStack>
        </VStack>
      </ModalBody>
    </Stack>
  );
};

export default AssignToExternalMembers;
