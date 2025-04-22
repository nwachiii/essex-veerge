import React from 'react';
import {VStack, Text, Spinner, Box, Flex, Link, HStack, useToast} from '@chakra-ui/react';
import {themeStyles} from '/src/theme';
import {UploadStoreDocument, Button} from '../../../ui-lib';
import {updateStore} from '../../../apis/store';
import {useMutation} from '@tanstack/react-query';
import {StoreInput} from '../../../ui-lib/ui-lib.components/Input';

const STORE_AVAILABLE = 'This store name is available';
const STORE_NOT_AVAILABLE = 'This store name is not available';

const Editor = Props => {
  const {
    headerText,
    storeName,
    storeImage,
    isStoreNameAvailable,
    onChangeText,
    onChangeImage,
    onChangeName,
    isLoading,
    storeDetails,
    isPublishable,
    handlePublish,
    mutation,
  } = Props;
  const toast = useToast();
  const UpdateMutation = useMutation(
    formData => {
      return updateStore(formData);
    },
    {
      onSuccess: res => {
        if (res?.data?.store) {
          localStorage.setItem('storeDetails', JSON.stringify(res?.data?.store));
          router.push(`/customiseStore/store_activated?domain=${res?.data?.domain}`);
          toast({
            title: 'Updated Successfully',
            description: `Your store has been updated...`,
            status: 'success',
            duration: 4000,
            isClosable: true,
            position: 'top-right',
          });
        } else {
          toast({
            title: `${'Oops...'}`,
            description: `Something went wrong...`,
            status: 'error',
            duration: 3000,
            isClosable: true,
            position: 'top-right',
          });
        }
      },
      onError: err => {
        toast({
          title: `${err.response.data.resolve ?? 'Oops...'}`,
          description: `${err.response.data.message ?? err}`,
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
      },
    }
  );

  const handleUpdateStore = () => {
    UpdateMutation.mutate({
      header_image: storeImage?.image?.split(',')[1],
      header_text: headerText ?? 'Welcome!',
    });
  };
  return (
    <VStack
      bg={themeStyles.color.matador__grey}
      py={'18px'}
      pl={'22px'}
      pr={'26px'}
      spacing={'26px'}
      borderRadius={'8px'}
      alignItems={'start'}
      h={'max-content'}
    >
      <Text {...themeStyles.textStyles.sb2} fontWeight={700}>
        Editor
      </Text>
      <UploadStoreDocument
        lable={storeDetails ? 'Upload a new image to replace existing image' : 'Hero section image'}
        h={'107px'}
        id={'header_file'}
        name={'header_file'}
        value={storeImage}
        onFileUpload={onChangeImage}
      />
      {/* <StoreInput
				lable={
					<Flex justify={'space-between'}>
						<Text>Header Text</Text>
						<Text fontSize={'12px'} fontWeight={'300'}>
							50 Characters allowed
						</Text>
					</Flex>
				}
				placeholder={storeDetails?.header_text ?? 'Header text'}
				h={'63px'}
				id={'header_text'}
				name={'header_text'}
				value={headerText}
				onChange={onChangeText}
				maxLength={50}
			/> */}
      {!storeDetails && (
        <StoreInput
          lable={'Store name'}
          h={'63px'}
          rightAddon={'.6787878.com'}
          id={'store_name'}
          name={'store_name'}
          value={storeName}
          onChange={onChangeName}
          isError={!isStoreNameAvailable && !isLoading}
          message={
            storeName?.length > 3 && isLoading ? (
              <Spinner size={'sm'} m={'4px'} color={'gray'} />
            ) : storeName ? (
              isStoreNameAvailable ? (
                STORE_AVAILABLE
              ) : (
                STORE_NOT_AVAILABLE
              )
            ) : null
          }
        />
      )}
      <HStack justify={'end'} gap={'22'} mb={'33px'} p={'13px'} w={'100%'}>
        <Button
          variant="secondary"
          bg="#F5F5F5"
          color="gray.500"
          border="1px solid gray"
          w="159px"
          borderRadius={'8px'}
          onClick={() => router.push('/settings')}
        >
          Save to draft
        </Button>
        {isPublishable && (
          <Button
            variant={'primary'}
            borderRadius={'8px'}
            onClick={handlePublish}
            disabled={!isPublishable}
            isLoading={mutation.isLoading}
          >
            Publish Store
          </Button>
        )}
        {storeDetails && (
          <Button
            variant={'primary'}
            borderRadius={'8px'}
            onClick={handleUpdateStore}
            disabled={!isPublishable}
            isLoading={UpdateMutation.isLoading}
          >
            Update Store
          </Button>
        )}
      </HStack>
      <Text {...themeStyles.textStyles.l6} pt={'35px'} color={'#191919'} w={'max-content'}>
        Want a Custom Design or Store URL?{' '}
        <Link color="blue.500" href="mailto:matadortrust@gmail.com" target="_blank">
          Contact us
        </Link>
      </Text>
    </VStack>
  );
};

export default Editor;
