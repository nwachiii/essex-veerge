import {
  Button,
  DrawerCloseButton,
  DrawerBody,
  DrawerFooter,
  HStack,
  Heading,
  Input,
  Stack,
  Text,
  Flex,
  useToast,
} from '@chakra-ui/react';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {modifyAgentCommission} from 'apis/manageAgent';
import {useRouter} from 'next/router';
import React, {useState} from 'react';
import {IoArrowBackSharp} from 'react-icons/io5';
import {toastForError} from 'utils/toastForErrors';

const EditAgentCommission = ({handleScreen, setProject_id, project_id, customScrollbarStyles}) => {
  const toast = useToast();
  const [commPercent, setCommPercent] = useState('');
  const router = useRouter();
  const {id} = router.query;
  const queryClient = useQueryClient();

  function getDigitFromStringProp(e) {
    const digit = e.target.value;

    if (isNaN(digit)) {
      return setCommPercent(0);
    }

    const boundedDigit = Math.max(0, Math.min(100, digit)); // Use Math.max and Math.min

    return setCommPercent(boundedDigit);
  }

  const mutation = useMutation(body => modifyAgentCommission(body, id), {
    onSuccess: () => {
      queryClient.refetchQueries(['listings commission']);
      handleScreen('list of listings');
      setCommPercent('');
      setProject_id('');
      toast({
        title: 'Commission updated successfully',
        status: 'success',
        duration: 8000,
        isClosable: true,
        position: 'top-right',
      });
    },
    onError: err => {
      toastForError(err, true, toast);
    },
  });
  const navigateTo = scrn => () => {
    setCommPercent('');
    return handleScreen(scrn);
  };

  const updateCommission = () => {
    mutation.mutate({commission: commPercent, project_id});
  };

  const isValid = !commPercent && commPercent !== 0;
  return (
    <>
      <HStack
        py="7px"
        h="50px"
        bg="#fafafa"
        px="20px"
        justify="space-between"
        align="center"
        position="relative"
      >
        <Flex gap="4px">
          <IoArrowBackSharp
            fontSize="20px"
            cursor="pointer"
            onClick={navigateTo('list of listings')}
          />
          <Heading color="#18181B" fontSize="16px" fontWeight="600" lineHeight="22.4px">
            Modify Commission
          </Heading>
        </Flex>
      </HStack>

      <DrawerBody sx={customScrollbarStyles} px="20px" py="21px">
        <Stack w="full" spacing="6px">
          <Text as="label" color="#3F3F46" fontSize="13px" fontWeight="500" lineHeight="20px">
            Commission (%)
          </Text>
          <Input
            p="8px 12px"
            h="38px"
            w="full"
            rounded="8px"
            type="number"
            onChange={getDigitFromStringProp}
            border="1px solid #e4e4e7"
            _focusVisible={{boxShadow: 'none', border: '1px solid #e4e4e7'}}
            fontSize="16px"
            value={`${commPercent}`}
            fontWeight="400"
            lineHeight="22px"
            color="#18181b"
            _hover={{boxShadow: 'none', border: '1px solid #e4e4e7'}}
          />
          <Text color="#71717a" fontSize="13px" fontWeight="500" lineHeight="20px">
            When you increase or decrease the commission for this realtor, the effect is limited to
            this realtor&apos;s payout. This ensures that none of the other realtors’ compensation
            structures are altered in the process.
          </Text>
        </Stack>
      </DrawerBody>
      <DrawerFooter p="20px 30px" border="none" borderTop="0.5px solid #e4e4e7">
        <Button
          isLoading={mutation.isLoading}
          bg="#000000"
          isDisabled={isValid}
          onClick={updateCommission}
          w="full"
          h="44px"
          variant="filled-radius"
        >
          Update
        </Button>
      </DrawerFooter>
    </>
  );
};

export default EditAgentCommission;
