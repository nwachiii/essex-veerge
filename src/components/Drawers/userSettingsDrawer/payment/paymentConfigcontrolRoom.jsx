import {useRouter} from 'next/router';
import {useState} from 'react';
import {useQuery} from '@tanstack/react-query';
import {fetchDeveloperProfile} from '/src/apis/settings.js';
import {
  Center,
  DrawerBody,
  DrawerCloseButton,
  Flex,
  HStack,
  Image,
  Spinner,
  Stack,
  Text,
  VStack,
  Button,
} from '@chakra-ui/react';
// import {Button} from 'ui-lib/ui-lib.components';
import {AddGatewayDetails} from './AddPaymentGateway';
import SelectPaymentGateWayOption from './selectPaymentGateWayOption';
import backIcon from '/src/images/icons/backArrowForDrawer.svg';
import {getSelectedGateway} from 'apis/account';
import AddBankAccount from './addBankAccount';

export const PaymentGatewayDrawer = ({menu_toggle, mainScreenNav}) => {
  const router = useRouter();
  const [view, setView] = useState('info');
  const [selectedGateWay, setSelectGateway] = useState(null);
  const [loading, setLoading] = useState(true);
  const {data, refetch} = useQuery(['selectedGetway'], getSelectedGateway, {
    onSuccess: res => {
      if (res?.data?.data?.provider) {
        setView('success');
      }
      setLoading(false);
    },
    onError: () => {
      setLoading(false);
    },
  });
  const handleBack = newView => () => {
    setSelectGateway(null);
    let displayView = newView;
    if (view === 'select gateway option' && data?.data?.data?.provider) {
      displayView = 'success';
    }

    return setView(displayView);
  };

  const headers = {
    info: {
      component: (
        <Text as="h1" fontSize="16px" fontWeight="600" color="#191919">
          {' '}
          Add Payment Gateway
        </Text>
      ),
      onClick: mainScreenNav('options'),
    },
    'select gateway option': {
      component: (
        <Text
          as="h1"
          fontSize="16px"
          fontWeight="600"
          color="#191919"
        >{`Select Payment Gateway`}</Text>
      ),
      onClick: handleBack('info'),
    },
    addDetails: {
      component: (
        <Text
          as="h1"
          fontSize="16px"
          fontWeight="600"
          color="#191919"
        >{`Add ${selectedGateWay?.name ?? ''} to Veerge`}</Text>
      ),
      onClick: handleBack('select gateway option'),
    },
    success: {
      component: (
        <Text as="h1" fontSize="16px" fontWeight="600" color="#191919">
          {' '}
          Payment Gateway
        </Text>
      ),
      onClick: mainScreenNav('options'),
    },
  };

  const gateWayHelpers = [
    {
      icon: '/payment-gateway/flutterwave-icon.svg',
      guide: 'https://flutterwave.com/ng/support/my-account/getting-your-api-keys',
      name: 'Flutterwave',
      provider: 'flutterwave',
      webHook: '/v2/account/verify-payment-flutterwave/new',
      shouldContactSupport: false,
    },

    {
      icon: '/payment-gateway/payStack-icon.svg',
      guide: 'https://paystack.com/docs/',
      name: 'Paystack',
      provider: 'paystack',
      webHook: '',

      shouldContactSupport: false,
    },
    {
      icon: '/payment-gateway/sterling-icon.svg',
      guide: 'https://flutterwave.com/ng/support/my-account/getting-your-api-keys',
      name: 'Sterling',
      provider: 'sterling',

      webHook: '/v2/account/verify-payment-sterling/new',
      shouldContactSupport: false,
    },
    {
      icon: '/payment-gateway/wema-icon.svg',
      guide: 'https://flutterwave.com/ng/support/my-account/getting-your-api-keys',
      name: 'Wema Bank',
      provider: 'wema',
      webHook: '',
      shouldContactSupport: false,
    },
    {
      icon: '/payment-gateway/payaza-icon.svg',
      guide: 'https://docs.payaza.africa',
      name: 'Payaza',
      provider: 'payaza',
      webHook: '/v2/account/verify-payment-payaza/new/',
      shouldContactSupport: false,
    },
    {
      icon: '/payment-gateway/stripe-icon.svg',
      guide: '',
      name: 'Stripe',
      provider: 'stripe',
      webHook: '',

      shouldContactSupport: true,
    },
    {
      icon: '/payment-gateway/interswitch-icon.svg',
      guide: '',
      name: 'Interswitch',
      provider: 'interswitch',
      webHook: '',

      shouldContactSupport: true,
    },
    {
      icon: '/payment-gateway/paypal-icon.svg',
      guide: '',
      name: 'PayPal',
      webHook: '',

      provider: 'paypal',
      shouldContactSupport: true,
    },
    {
      icon: '/payment-gateway/skrill-icon.svg',
      guide: '',
      name: 'Skrill',
      provider: 'skrill',
      webHook: '',

      shouldContactSupport: true,
    },
    {
      icon: '/payment-gateway/payoneer-icon.svg',
      guide: '',
      name: 'Payoneer',
      webHook: '',

      provider: 'payoneer',
      shouldContactSupport: true,
    },
  ];

  const handleGateWaySelection = gateWayInfo => {
    setSelectGateway(gateWayInfo);
    return setView('addDetails');
  };

  const handleView = arg => {
    setView(arg);
  };

  const currentPaymentGateWay = gateWayHelpers.find(
    gateWayInfo => gateWayInfo?.provider === data?.data?.data?.provider
  );
  return (
    <>
      <HStack
        boxShadow="4px 4px 8px 0px rgba(123, 157, 157, 0.05), -4px -4px 8px 0px rgba(123, 157, 157, 0.15)"
        mb="10px"
        py="12px"
        px="29px"
        h="49.699px"
        justify="space-between"
        align="center"
        position="relative"
        width="full"
        bg="#F5F5F5"
      >
        <Header header={headers?.[view]?.component} handleBack={headers?.[view]?.onClick} />
        <HStack spacing="15px">
          <VStack
            position="relative"
            justify="center"
            align="center"
            w="30px"
            h="30px"
            borderRadius="5px"
            transition="0.3s ease-in-out"
            _hover={{
              width: '30px',
              height: '30px',
            }}
          >
            <DrawerCloseButton right="0px" left="0px" my="auto" color="#000" top="0" bottom="0" />
          </VStack>
        </HStack>
      </HStack>
      <DrawerBody>
        {loading ? (
          <Center h="80vh" position="relative">
            <Spinner />
          </Center>
        ) : (
          <>
            {view === 'info' ? (
              <GatewayInfoDrawer handleView={handleView} />
            ) : view === 'select gateway option' ? (
              <SelectPaymentGateWayOption
                selectedGateWay={selectedGateWay}
                gateWayHelpers={gateWayHelpers}
                setView={setView}
                handleGateWaySelection={handleGateWaySelection}
              />
            ) : view == 'addDetails' ? (
              <AddGatewayDetails
                refetch={refetch}
                selectedGateWay={selectedGateWay}
                handleView={handleView}
              />
            ) : view == 'success' ? (
              <PaymentGatewayAdded
                currentPaymentGateWay={currentPaymentGateWay}
                setView={setView}
              />
            ) : null}
          </>
        )}
      </DrawerBody>
    </>
  );
};

const Header = ({header, handleBack, ...wrapperProps}) => {
  return (
    <HStack {...wrapperProps}>
      {handleBack ? (
        <Image
          role="button"
          boxSize="24px"
          onClick={handleBack}
          src={backIcon.src}
          alt="navigate back icon"
        />
      ) : null}

      {header}
    </HStack>
  );
};

const GatewayInfoDrawer = ({handleView}) => {
  return (
    <Center w="full" mt="16px">
      <Stack
        w="full"
        p=" 56px 11.5px"
        align="center"
        border="1px solid #E4E4E4"
        borderRadius="16px"
        spacing="23px"
      >
        <Image src="/payment-gateway/paymentGateIcon.svg" alt="gate way options" h="103px" />
        <Stack align="center" w="full">
          <Text
            color="#191919"
            textAlign="center"
            fontFamily="Euclid Circular B"
            fontSize="20px"
            fontStyle="normal"
            fontWeight="600"
            lineHeight="normal"
          >
            Connect your payment gateway
          </Text>
          <Text
            color="#606060"
            textAlign="center"
            fontFamily='"Euclid Circular B"'
            fontSize="10px"
            fontStyle="normal"
            fontWeight="400"
            lineHeight="normal"
            maxW="337px"
          >
            This is a crucial step in enabling smooth transactions for your clients. Whether
            you&apos;re using popular options like Flutterwave, PayPal, or other trusted providers,
            our platform makes the integration process simple and hassle-free.
          </Text>
        </Stack>
        <Button
          variant={'filled-radius'}
          color="#FFF"
          fontSize="14.907px"
          w="full"
          fontStyle="normal"
          fontWeight="400"
          lineHeight="normal"
          h="45px"
          onClick={() => handleView('select gateway option')}
        >
          Proceed
        </Button>
      </Stack>
    </Center>
  );
};

const PaymentGatewayAdded = ({setView, currentPaymentGateWay}) => {
  const switchTo = view => () => {
    setView(view);
  };
  return (
    <Stack w="full" h="full" justify="space-between">
      <Flex
        mt={'10px'}
        gap="16px"
        // width="360px"
        w="full"
        align="center"
        background="#FFF"
        borderRadius="16px"
        padding="24px"
        border="1px solid #EAECF0"
      >
        <HStack boxSize="40px" justify="center" borderRadius="full" bg="#4545FE1A">
          <Image boxSize="20px" src={currentPaymentGateWay?.icon} alt="payment gateway icon" />
        </HStack>
        <Text
          color="#606060"
          fontSize="16px"
          fontStyle="normal"
          fontWeight="600"
          lineHeight="normal"
        >
          {currentPaymentGateWay?.name}
        </Text>
      </Flex>
      <Button
        mt="165px"
        color="#FFF"
        variant={'filled-radius'}
        fontSize="14.907px"
        w="full"
        fontStyle="normal"
        fontWeight="400"
        lineHeight="normal"
        h="45px"
        onClick={switchTo('select gateway option')}
      >
        Change Payment Gateway
      </Button>
    </Stack>
  );
};
