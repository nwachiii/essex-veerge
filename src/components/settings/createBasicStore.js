import {
  Box,
  Button,
  HStack,
  Heading,
  Image,
  Input,
  Spinner,
  Text,
  VStack,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import React from 'react';
import orangeBulbIcon from '/src/images/icons/orange_bulb_create_store.svg';
import QrCodeForManageStoreAndOnsuccesStoreCreation from './qrCodeForManageStoreAndOnsuccesStoreCreation';
import {toastForError} from '../../utils/toastForErrors';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {useState} from 'react';
import {useEffect} from 'react';
import {createStore} from '../../apis/settings';

export const CreateBasicStore = ({business_id, onClose}) => {
  const manageStoreforQr = useDisclosure();
  const queryClient = useQueryClient();

  const [strName, setStrName] = useState('');
  const toast = useToast();

  const handleInput = e => {
    let inputValue = e.target.value.replace(/[\s\W\d]/g, '').toLowerCase();

    return setStrName(inputValue);
  };
  const mutation = useMutation(
    values => {
      return createStore(values);
    },
    {
      onSuccess: async res => {
        queryClient.invalidateQueries(['QrCode - data fetching']);

        await queryClient.refetchQueries(['QrCode - data fetching']);

        manageStoreforQr.onOpen();
      },
      onError: res => {
        toastForError(res, true, toast);
      },
    }
  );
  const handleStoreCreation = () => {
    const storeObj = {
      store_name: strName,
      business: business_id,
    };
    return mutation.mutate(storeObj);
  };

  const isValid = !!strName && strName.length <= 30;

  const manageClose = async () => {
    queryClient.invalidateQueries(['store-info']);
    await queryClient.refetchQueries(['store-info']);
    manageStoreforQr.onClose();
    onClose();
    return;
  };

  return (
    <VStack spacing="22px" mt="20px" justify="center" pb="21px">
      <Heading fontSize="24px" fontWeight="500">
        Enter Web Application URL
      </Heading>

      <HStack position="relative" w="334px" h="63px">
        <Input
          w="full"
          border="1px solid #A4A4A4"
          borderRadius="5px"
          h="full"
          pl="10px"
          fontSize="14px"
          fontWeight="400"
          maxLength="30"
          placeholder=""
          value={strName}
          onChange={handleInput}
          _placeholder={{
            color: '#000000',
            'font-size': '14px',
            'font-weight': '400',
          }}
          color="#000000"
          pr="126px"
        />
        <Box
          w="112px"
          position="absolute"
          top="7px"
          right="10px"
          px="10px"
          py="15px"
          h="49px"
          bg="#F1F1F1"
          borderRightRadius="5px"
        >
          <Text color="#686868" fontSize="14px" fontWeight="400">
            .6787878.com
          </Text>
        </Box>
      </HStack>
      <Button
        isDisabled={!isValid}
        _hover={{
          opacity: '0.4',
        }}
        h="55px"
        onClick={handleStoreCreation}
        w="241px"
        bg="#4545FE"
        color="#ffffff"
        borderRadius="12px"
      >
        {mutation.isLoading ? <Spinner /> : 'Create application'}
      </Button>
      <HStack spacing="8px">
        <Image alt="orange bulb icon" src={orangeBulbIcon.src} />

        <Text color="#FF9103" cursor="pointer" fontSize="14px" fontWeight="400">
          What is a web application url?
        </Text>
      </HStack>
      <QrCodeForManageStoreAndOnsuccesStoreCreation
        manageStore={manageStoreforQr}
        manageClose={manageClose}
        forSuccessOnStoreCreation
      />
    </VStack>
  );
};

export default CreateBasicStore;
