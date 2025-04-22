import {useState} from 'react';
import {
  Box,
  DrawerFooter,
  Flex,
  Image,
  Link,
  ListItem,
  OrderedList,
  Spinner,
  Stack,
  Text,
  useClipboard,
  useToast,
  VStack,
} from '@chakra-ui/react';
import {Button, Input} from 'ui-lib/ui-lib.components';
import {useMutation} from '@tanstack/react-query';
import {AddPaymentGateway} from 'apis/account';
import jwt from 'jsonwebtoken';
import {RiFileCopyLine, RiFileCopyFill} from 'react-icons/ri';

export const AddGatewayDetails = ({handleView, refetch, selectedGateWay}) => {
  const [pubKey, setPubKey] = useState('');
  const [privKey, setPrivKey] = useState('');
  const [transactionKey, setTransactionKey] = useState('');
  const toast = useToast();
  const ENV_PAYMENT_KEY = process.env.NEXT_PUBLIC_PAYMENT_VALUE_ENCRYPTION_KEY;
  const ENVIRONMENT = process.env.NEXT_PUBLIC_ENVIRONMENT_API_KEY;
  const isPayaza = selectedGateWay?.provider === 'payaza';

  const mutation = useMutation(formData => AddPaymentGateway(formData), {
    onSuccess: async res => {
      refetch();
      toast({
        title: 'New Payment Service created successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
      handleView('success');
    },
    onError: res => {
      return toast({
        title: res?.message === 'Network Error' ? 'Network Error' : 'Oops something went wrong',
        description: `${
          res?.response?.status === 500
            ? "Apologies for the inconvenience. We're working on it. Please try again later."
            : (res?.response?.data?.message ??
              res?.response?.message ??
              res?.message ??
              'Something went wrong, we are working on resolving it.')
        }`,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    },
  });

  const handleSubmit = () => {
    const user_payment_keys = JSON.stringify({
      publicKey: pubKey,
      ...(isPayaza ? {} : {privateKey: privKey}),
    });

    // @ts-ignore
    const encryptedToken = jwt.sign(user_payment_keys, ENV_PAYMENT_KEY);

    const payload = {
      provider: selectedGateWay?.provider,
      payload: {publicKey: pubKey, privateKey: privKey},

      ...(isPayaza ? {transaction_pin: transactionKey} : {}),
      primary: false,
    };

    mutation.mutate(payload);

    // mutation.mutate({
    //   provider: 'flutterwave',
    //   token: encryptedToken,
    //   primary: false,
    // });
  };

  const {hasCopied, onCopy} = useClipboard(
    `https://${ENVIRONMENT}.matadortrust.com${selectedGateWay?.webHook}`
  );
  const isValid =
    (isPayaza ? true : privKey.length > 0) &&
    pubKey.length > 0 &&
    (isPayaza ? transactionKey.trim() : true);

  return (
    <Stack h="full" my={'14px'}>
      <Flex gap="6px">
        <Image
          boxSize="20px"
          width="20px"
          src={selectedGateWay?.icon}
          alt="selected gateway icon"
        />

        <Text
          color="#3D3D3D"
          fontFamily="Euclid Circular B"
          fontSize="10px"
          fontStyle="normal"
          fontWeight="400"
          lineHeight="16.032px"
        >
          Create a {selectedGateWay?.name} Business account to complete the set-up process and Input
          your Live API Keys, use this{' '}
          <Link
            textDecoration="underline"
            color="#4545FE"
            href={selectedGateWay?.guide}
            target="_blank"
          >
            guide
          </Link>{' '}
          to get your API Keys. Submit after inputting the keys.
        </Text>
      </Flex>
      <VStack w="full" h="full" align="left" spacing={3}>
        <Input
          required
          type="text"
          id="pub_key"
          name="pub_key"
          h="45px"
          borderRadius="6.4px"
          borderColor="#E4E4E4"
          value={pubKey}
          labelStyle={{
            color: '#191919',
            fontSize: '12px',
            fontWeight: '400',
          }}
          label={
            <>
              Public key
              <Text ml="3px" as="sup" color="#FF6A6A">
                *
              </Text>
            </>
          }
          _placeholder={{
            color: 'gray.500',
          }}
          onChange={e => setPubKey(e.target.value)}
          pattern="^(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$"
        />
        {isPayaza ? null : (
          <Input
            required
            type="text"
            h="45px"
            borderRadius="6.4px"
            borderColor="#E4E4E4"
            id="priv_key"
            name="priv_key"
            value={privKey}
            labelStyle={{
              color: '#191919',
              fontSize: '12px',
              fontWeight: '400',
            }}
            label={
              <>
                Secret key
                <Text ml="3px" as="sup" color="#FF6A6A">
                  *
                </Text>
              </>
            }
            _placeholder={{
              color: 'gray.500',
            }}
            onChange={e => setPrivKey(e.target.value)}
            pattern="^(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$"
          />
        )}
        {isPayaza ? (
          <Input
            required={isPayaza}
            type="text"
            h="45px"
            borderRadius="6.4px"
            borderColor="#E4E4E4"
            id="priv_key"
            name="priv_key"
            value={transactionKey}
            labelStyle={{
              color: '#191919',
              fontSize: '12px',
              fontWeight: '400',
            }}
            label={
              <>
                Transaction Pin
                <Text ml="3px" as="sup" color="#FF6A6A">
                  *
                </Text>
              </>
            }
            _placeholder={{
              color: 'gray.500',
            }}
            onChange={e => setTransactionKey(e.target.value)}
          />
        ) : null}
        {selectedGateWay?.webHook ? (
          <Stack>
            <Text fontSize="12px" fontWeight="400">
              Connect Live Webhook{' '}
              <Text ml="3px" as="sup" color="#FF6A6A">
                *
              </Text>
            </Text>
            <Flex
              p="18.27px 12px"
              border="0.5px solid #e4e4e4"
              bg="#f5f5f5"
              gap="13px"
              justify="space-between"
              borderRadius="8px"
            >
              <Text noOfLines={1} fontSize="14px" fontWeight="400" color="#333333">
                {`https://${ENVIRONMENT}.matadortrust.com${selectedGateWay?.webHook}`}
              </Text>
              <Box aria-label="copy webhook url button" role="button" onClick={onCopy}>
                {hasCopied ? <RiFileCopyFill /> : <RiFileCopyLine />}
              </Box>
            </Flex>

            <Stack spacing="34px">
              <Text fontSize="14px" fontWeight="400" color="#3d3d3d">
                To ensure smooth transaction updates, please follow these steps to connect your
                payment gateway to our live webhook:
              </Text>
              <Box fontSize="14px" color="#3d3d3d" fontWeight="400" as={OrderedList}>
                <ListItem>Click the copy button above to copy the URL.</ListItem>
                <ListItem>
                  Navigate to your payment gateway portal settings and paste the URL into the
                  webhook field.
                </ListItem>
                <ListItem>
                  Save the changes and activate the webhook to receive real-time payment updates.
                </ListItem>
              </Box>
            </Stack>
          </Stack>
        ) : null}

        <Button
          mt="15px"
          color="#FFF"
          variant={'dark'}
          fontSize="14.907px"
          fontStyle="normal"
          position="fixed"
          bottom="24px"
          maxW="352px"
          fontWeight="400"
          lineHeight="normal"
          onClick={handleSubmit}
          isDisabled={!isValid}
          h="45px"
          borderRadius="72px"
        >
          {mutation?.isLoading ? <Spinner color="#FFFFFF" /> : 'Submit'}
        </Button>
      </VStack>
    </Stack>
  );
};

export default AddGatewayDetails;
