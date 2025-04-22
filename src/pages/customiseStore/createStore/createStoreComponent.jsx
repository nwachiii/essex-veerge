import Link from 'next/link';
import Editor from './editor';
import Swal from 'sweetalert2';
import {useRouter} from 'next/router';
import {useDebounce} from 'ui-lib';
import PreviewStore from './previewStore';
import React, {useEffect, useState} from 'react';
import logo from '/src/images/brand/verge-logo.svg';
import {useQuery, useMutation} from '@tanstack/react-query';
import {Box, HStack, Image, Text, VStack} from '@chakra-ui/react';
import {checkStoreNameAvailability, createStore} from '/src/apis/store';

export const CreateStore = () => {
  const router = useRouter();
  const [storeName, setStoreName] = useState();
  const [storeImage, setStoreImage] = useState();
  const [headerText, setHeaderText] = useState('');
  const [isStoreNameAvailable, setStoreNameAvailable] = useState(false);

  const user =
    typeof window !== 'undefined' &&
    localStorage &&
    JSON?.parse(localStorage.getItem('loggedinUser')) !== undefined &&
    JSON?.parse(localStorage.getItem('loggedinUser'));
  const storeDetails =
    typeof window !== 'undefined' &&
    localStorage &&
    JSON?.parse(localStorage.getItem('storeDetails')) !== undefined &&
    JSON?.parse(localStorage.getItem('storeDetails'));

  const mutation = useMutation(
    formData => {
      return createStore(formData);
    },
    {
      onSuccess: res => {
        if (res?.data?.store) {
          localStorage.setItem('storeDetails', JSON.stringify(res?.data?.store));
          router.push(`/customiseStore/store_activated?domain=${res?.data?.domain}`);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'something went wrong',
            showClass: {
              popup: 'animate__animated animate__fadeInDown',
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp',
            },
          });
        }
      },
      onError: err => {
        Swal.fire({
          icon: 'error',
          title: err.response.data.resolve ?? 'Oops...',
          text: err.response.data.message ?? err,
          showClass: {
            popup: 'animate__animated animate__fadeInDown',
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp',
          },
        });
      },
    }
  );

  const handlePublish = () => {
    mutation.mutate({
      store_name: storeName,
      header_image: storeImage.image.split(',')[1],
      header_text: headerText,
    });
  };

  const handleStoreNameChange = value => {
    setStoreName(value);
  };

  const debouncedStoreName = useDebounce(storeName, 500);

  const {data, isError, isLoading, error} = useQuery(
    ['checkStoreNameAvailiability', debouncedStoreName],
    () => checkStoreNameAvailability(debouncedStoreName),
    {enabled: Boolean(debouncedStoreName)}
  );

  useEffect(() => {
    storeName && storeName?.length >= 2 && setStoreNameAvailable(data?.data?.status || false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const isPublishable = isStoreNameAvailable && storeImage;

  return (
    <Box w="full" px="48px" pt="15px" pb="80px">
      <HStack justify="space-between" w="full" alignItems={'center'}>
        <Link prefetch={false} href="/dashboard">
          {user?.company_image ? (
            <Image
              h="60px"
              w="80px"
              border="2px solid lightgray"
              borderRadius={'xl'}
              src={user?.company_image}
              alt="logo"
            />
          ) : (
            <Box
              cursor={'pointer'}
              color="#FFF"
              bg="#373737"
              p={3}
              mb="30px"
              borderRadius="16px"
              w="200px"
              boxShadow="lg"
            >
              <Image src={logo.src} alt="logo" />
              <Text cursor="pointer" fontWeight={600} px={3} fontSize={'10px'} fontStyle={'italic'}>
                for {user?.company_name}{' '}
              </Text>
            </Box>
          )}
        </Link>
        <Link prefetch={false} href="/settings">
          <Text cursor={'pointer'} color={'#4545FE'}>
            Back to settings
          </Text>
        </Link>
      </HStack>
      <Box w="full">
        <Text
          mx="auto"
          pb="20px"
          pt="32px"
          fontWeight={600}
          fontSize={'32px'}
          lineHeight={'41px'}
          color={'#373737'}
        >
          Customize the look and feel of your online store
        </Text>
      </Box>
      <HStack gap={'26px'} alignItems={'start'}>
        <Editor
          storeDetails={storeDetails}
          headerText={headerText}
          storeImage={storeImage}
          storeName={storeName}
          isStoreNameAvailable={isStoreNameAvailable}
          onChangeText={setHeaderText}
          onChangeImage={setStoreImage}
          onChangeName={handleStoreNameChange}
          isLoading={isLoading}
          isPublishable={isPublishable}
          handlePublish={handlePublish}
          mutation={mutation}
        />
        <VStack w={'100%'} gap={'33px'}>
          <PreviewStore
            storeDetails={storeDetails}
            headerText={headerText}
            storeImage={storeImage?.preview}
          />
        </VStack>
      </HStack>
    </Box>
  );
};

export default CreateStore;
