import {
  Button,
  Progress,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  VStack,
  Text,
  Heading,
  HStack,
  useToast,
  Image,
  Spinner,
  Box,
  Center,
  Stack,
  StackDivider,
  useMediaQuery,
} from '@chakra-ui/react';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import React, {useEffect, useState} from 'react';
import {postExpectedActivities} from '../../apis/FetchDashboard';
import tick_animation from '../../images/animated_icons/tick_animation.gif';
import {useRouter} from 'next/router';
import {IoCheckmark, IoChevronBack, IoChevronForward} from 'react-icons/io5';

const ExpectedActivityIcon = () => {
  return (
    <svg width="54" height="54" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_dd_29801_40169)">
        <rect x="3" y="2" width="48" height="48" rx="11.52" fill="#F9FAFB" />
        <rect
          x="3.22642"
          y="2.22642"
          width="47.5472"
          height="47.5472"
          rx="11.2936"
          stroke="url(#paint0_linear_29801_40169)"
          strokeWidth="0.45283"
        />
        <path
          d="M14.8672 25.4239H18.7712L22.6752 13.7119L30.4832 37.1359L34.3872 25.4239H38.2912"
          stroke="#1ABCFE"
          strokeWidth="1.952"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <filter
          id="filter0_dd_29801_40169"
          x="0.12"
          y="0.0800001"
          width="53.76"
          height="53.76"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="0.96" />
          <feGaussianBlur stdDeviation="0.96" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.0627451 0 0 0 0 0.0941176 0 0 0 0 0.156863 0 0 0 0.06 0"
          />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_29801_40169" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="0.96" />
          <feGaussianBlur stdDeviation="1.44" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.0627451 0 0 0 0 0.0941176 0 0 0 0 0.156863 0 0 0 0.1 0"
          />
          <feBlend
            mode="normal"
            in2="effect1_dropShadow_29801_40169"
            result="effect2_dropShadow_29801_40169"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect2_dropShadow_29801_40169"
            result="shape"
          />
        </filter>
        <linearGradient
          id="paint0_linear_29801_40169"
          x1="27"
          y1="2"
          x2="27"
          y2="50"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#C3E4FF" />
          <stop offset="0.791667" stopColor="#CBF0FF" stopOpacity="0.848437" />
          <stop offset="1" stopColor="#D69CFF" stopOpacity="0.7" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export const ExpectedActivity = ({refetch, data, isExpected}) => {
  const {
    isOpen: isExpectedOpen,
    onOpen: onExpectedOpen,
    onClose: onExpectedClose,
  } = useDisclosure();
  const [step, setStep] = useState(1);
  const [expectedActivities, setExpectivities] = useState({});
  const [done, setDone] = useState(false);
  const queryClient = useQueryClient();
  const router = useRouter();

  const toast = useToast();

  const mutation = useMutation(body => postExpectedActivities(body), {
    onSuccess: async res => {
      setStep(5);
      setDone(true);
      onExpectedClose();
      toast({
        title: 'Thanks for the information',
        description: `We will get back to you as soon as possible.`,
        status: 'success',
        duration: 8000,
        isClosable: true,
        position: 'top-right',
      });
      queryClient.invalidateQueries(['dashboard', '']);
      await queryClient.refetchQueries(['dashboard', '']);
      await refetch();
      router.push('/dashboard');
    },
    onError: err => {
      console.log(err);
      toast({
        title: 'Oops ...',
        description: `${
          err?.response?.data?.message ??
          err?.response?.message ??
          err?.message ??
          'Something went wrong, we are working on resolving it'
        }`,
        status: 'error',
        duration: 8000,
        isClosable: true,
        position: 'top-right',
      });
    },
  });

  useEffect(() => {
    const timed = setTimeout(
      () => ((isExpected ?? true) ? onExpectedClose() : onExpectedOpen()),
      500
    );

    return () => clearTimeout(timed);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  const handleExpected = e => {
    let expected = {
      ...expectedActivities,
      [e.target?.name]: e.target?.textContent,
    };

    setExpectivities(expected);
    return;
  };

  const incomplete =
    !expectedActivities?.in_operations ||
    !expectedActivities?.business_type ||
    !expectedActivities?.average_monthly_revenue ||
    !expectedActivities?.total_past_unit ||
    mutation.isLoading;

  const [isShortScreenHeight] = useMediaQuery('(max-height: 740px)');

  return (
    <Modal
      motionPreset="slideInBottom"
      isCentered={true}
      isOpen={isExpectedOpen}
      onClose={onExpectedClose}
      closeOnOverlayClick={false}
    >
      <ModalOverlay bg="#00000099" />
      {step >= 5 || done ? (
        <ModalContent
          transform={isShortScreenHeight ? 'scale(0.8) !important' : 'none'}
          borderRadius="10px"
          p="24px"
        >
          <Center gap={`7px`} flexDir={`column`} minH={`300px`}>
            <Image src={tick_animation.src} alt={`tick`} width={`100px`} height={`100px`} />
            <Text
              color={`#3D3D3D`}
              textAlign={`center`}
              fontFamily={'Euclid Circular B'}
              fontSize={`18px`}
              fontStyle={`normal`}
              fontWeight={`600`}
              lineHeight={`normal`}
            >
              All Done!
            </Text>
          </Center>
        </ModalContent>
      ) : (
        <ModalContent
          borderRadius="10px"
          // minW="408px"
          // maxW={`438px`}

          minH="300px"
          transform={isShortScreenHeight ? 'scale(0.8) !important' : 'none'}
          p="24px"
          pb="30px"
        >
          <ModalHeader p="0px" fontSize="21px" fontWeight="500">
            <VStack gap={`6px`}>
              <ExpectedActivityIcon />
              <Heading
                color={`#3D3D3D`}
                textAlign={`center`}
                fontFamily={'Euclid Circular B'}
                fontSize={`18px`}
                fontStyle={`normal`}
                fontWeight={`600`}
                lineHeight={`normal`}
              >
                Expected Activities
              </Heading>
            </VStack>
          </ModalHeader>

          <ModalBody mt="10px" p="0px">
            <VStack spacing="none">
              {/* <Text w="full" mb="30px" fontSize="12px" fontWeight="400">
                Your account is currently under review, and we would appreciate your assistance in
                addressing a few remaining inquiries.
              </Text> */}
              <Text
                color={`#606060`}
                textAlign={`center`}
                fontFamily={'Euclid Circular B'}
                fontSize={`12px`}
                fontStyle={`normal`}
                fontWeight={`400`}
                lineHeight={`normal`}
              >
                We are reviewing the additional details you filled and we have just a few more
                questions.
              </Text>
              {/* <Progress
                //   mb="30px"
                alignSelf="start"
                value={25 * step}
                bg="#4545FE1A"
                borderRadius="8px"
                //   w="355px"
                //   w="full"
                w="96.5%"
                h="6px"
              /> */}
              <Stack
                mt={`16px`}
                width={`390px`}
                padding={`14px`}
                flexDirection={`column`}
                justify-content={`center`}
                align-items={`flex-start`}
                gap={`13.692px`}
                borderRadius={`12px`}
                border={`0.5px solid #E4E4E4`}
                background={`#FFF`}
                boxShadow={`0px 1px 2px 0px rgba(16, 24, 40, 0.05)`}
                divider={<StackDivider borderColor={`#E4E4E4`} margin={`0px !important`} />}
              >
                <Center
                  width={`360px`}
                  height={`234px`}
                  // padding={`76px 60px`}
                  p={`15px`}
                  borderRadius={`8px`}
                  background={`#F4F4F4`}
                >
                  <Options
                    mutation={mutation}
                    step={step}
                    handleExpected={handleExpected}
                    values={expectedActivities}
                    done={done}
                  />
                </Center>
                <HStack justifyContent={`space-between`} gap={`10px`}>
                  <Button
                    bg={`transparent`}
                    _focus={{outline: `none`}}
                    _focusVisible={{outline: `none`}}
                    _hover={{opacity: step > 1 ? `1` : `auto`}}
                    _active={{bg: `transparent`}}
                    color={`#191919`}
                    p={`0px`}
                    isDisabled={step <= 1}
                  >
                    <HStack
                      gap={`8px`}
                      textAlign={`center`}
                      fontFamily={'Euclid Circular B'}
                      fontSize={`12px`}
                      fontStyle={`normal`}
                      fontWeight={`500`}
                      lineHeight={`normal`}
                      onClick={() => {
                        setStep(step - 1);
                      }}
                    >
                      <IoChevronBack /> <Text>Back</Text>
                    </HStack>
                  </Button>
                  {step < 4 ? (
                    <Button
                      bg={`transparent`}
                      _focus={{outline: `none`}}
                      _focusVisible={{outline: `none`}}
                      _hover={{opacity: `1`}}
                      _active={{bg: `transparent`}}
                      color={`#191919`}
                      p={`0px`}
                    >
                      <HStack
                        gap={`8px`}
                        textAlign={`center`}
                        fontFamily={'Euclid Circular B'}
                        fontSize={`12px`}
                        fontStyle={`normal`}
                        fontWeight={`500`}
                        lineHeight={`normal`}
                        onClick={() => setStep(step + 1)}
                      >
                        <Text>Next</Text>
                        <IoChevronForward />
                      </HStack>
                    </Button>
                  ) : (
                    <Button
                      bg={`transparent`}
                      _focus={{outline: `none`}}
                      _focusVisible={{outline: `none`}}
                      _hover={{opacity: incomplete ? `auto` : `1`}}
                      _active={{bg: `transparent`}}
                      color={`#191919`}
                      p={`0px`}
                      isDisabled={incomplete}
                    >
                      <HStack
                        gap={`8px`}
                        textAlign={`center`}
                        fontFamily={'Euclid Circular B'}
                        fontSize={`12px`}
                        fontStyle={`normal`}
                        fontWeight={`500`}
                        lineHeight={`normal`}
                        onClick={() => mutation.mutate(expectedActivities)}
                      >
                        <Text>Done</Text>
                        <IoCheckmark />
                      </HStack>
                    </Button>
                  )}
                </HStack>
              </Stack>
              <HStack justify="center" mt={`15px`}>
                <Text
                  color={`#919191`}
                  textAlign={`center`}
                  fontFamily={'Euclid Circular B'}
                  fontSize={`12px`}
                  fontStyle={`normal`}
                  fontWeight={`400`}
                  lineHeight={`normal`}
                >
                  {step}/4
                </Text>
              </HStack>
            </VStack>
          </ModalBody>
        </ModalContent>
      )}
    </Modal>
  );
};

export default ExpectedActivity;

const Options = ({step, handleExpected, mutation, values, done}) => {
  const monthlyRevenueArray = [
    'Below 1M',
    '1M-10M',
    '10M-50M',
    '50M-200M',
    '200M-500M',
    '500M-1B',
    '1B-5B',
    'Over 5B',
  ];

  const unitsDevelopedArray = ['Below 10', '10-50', '50-100', '100-200', 'Above 200'];
  const options = {
    1: (
      <VStack mt="30px" w="full" spacing="30px">
        <Heading fontSize="16px" fontWeight="600" textAlign={`center`}>
          Are you currently in operations?
        </Heading>
        <HStack spacing="33.89px">
          <Button
            bg={values?.in_operations === `Yes` ? '#191919' : '#fff'}
            color={values?.in_operations === `Yes` ? `#fff` : `#191919`}
            w="71.11px"
            h="41.06px"
            fontSize="12px"
            fontWeight="400"
            border="solid 1px #E4E4E4"
            _focus={{outline: `none`}}
            _focusVisible={{outline: `none`}}
            _hover={{
              background: values?.in_operations === `Yes` ? 'auto' : 'rgba(25, 25, 25, 0.10)',
              borderColor: 'transparent',
            }}
            borderRadius="6.51376px"
            onClick={handleExpected}
            name="in_operations"
          >
            Yes
          </Button>
          <Button
            w="71.11px"
            h="41.06px"
            fontSize="12px"
            fontWeight="400"
            bg={values?.in_operations === `No` ? '#191919' : '#fff'}
            color={values?.in_operations === `No` ? `#fff` : `#191919`}
            name="in_operations"
            onClick={handleExpected}
            borderRadius="6.51376px"
            border="solid 1px #E4E4E4"
            _focus={{outline: `none`}}
            _focusVisible={{outline: `none`}}
            _hover={{
              background: values?.in_operations === `No` ? 'auto' : 'rgba(25, 25, 25, 0.10)',
              borderColor: 'transparent',
            }}
          >
            No
          </Button>
        </HStack>
      </VStack>
    ),
    2: (
      <VStack mt="30px" w="full" spacing="30px">
        <Heading fontSize="16px" fontWeight="600" textAlign={`center`}>
          How would you describe your business?
        </Heading>
        <Stack spacing="10px">
          <Button
            h="56px"
            py="13px"
            w="186px"
            px="2.5px"
            fontSize="12px"
            fontWeight="400"
            bg={
              values?.business_type === `I am an established company with predictable cash flow.`
                ? '#191919'
                : '#fff'
            }
            color={
              values?.business_type === `I am an established company with predictable cash flow.`
                ? '#fff'
                : '#191919'
            }
            name="business_type"
            borderRadius="6.51376px"
            onClick={handleExpected}
            whiteSpace="break-spaces"
            border="solid 1px #E4E4E4"
            _focus={{outline: `none`}}
            _focusVisible={{outline: `none`}}
            _hover={{
              background:
                values?.business_type === `I am an established company with predictable cash flow.`
                  ? 'auto'
                  : 'rgba(25, 25, 25, 0.10)',
              borderColor: 'transparent',
            }}
          >
            I am an established company with predictable cash flow.
          </Button>
          <Button
            h="56px"
            py="13px"
            px="2.5px"
            w="186px"
            bg={
              values?.business_type === `I am a new company and my cashflow is uncertain`
                ? '#191919'
                : '#fff'
            }
            color={
              values?.business_type === `I am a new company and my cashflow is uncertain`
                ? `#fff`
                : `#191919`
            }
            fontSize="12px"
            fontWeight="400"
            name="business_type"
            onClick={handleExpected}
            whiteSpace="break-spaces"
            border="solid 1px #E4E4E4"
            _focus={{outline: `none`}}
            _focusVisible={{outline: `none`}}
            _hover={{
              background:
                values?.business_type === `I am a new company and my cashflow is uncertain`
                  ? 'auto'
                  : 'rgba(25, 25, 25, 0.10)',
              borderColor: 'transparent',
            }}
            borderRadius="6.51376px"
          >
            I am a new company and my cashflow is uncertain
          </Button>
        </Stack>
      </VStack>
    ),
    3: (
      <VStack mt="20px" w="full" spacing="20px">
        <Heading whiteSpace="breakSpaces" textAlign="center" fontSize="16px" fontWeight="600">
          What do you expect your average monthly revenue to be over the next one year?
        </Heading>
        <HStack flexWrap="wrap" justify="center" gap="9px">
          {monthlyRevenueArray.map((item, idx) => {
            return (
              <Button
                key={idx}
                h="38.62px"
                p="12.31px"
                bg={values?.average_monthly_revenue === item ? '#191919' : '#fff'}
                color={values?.average_monthly_revenue === item ? `#fff` : `#191919`}
                fontSize="12px"
                fontWeight="400"
                borderRadius="6.51376px"
                onClick={handleExpected}
                border="solid 1px #E4E4E4"
                name="average_monthly_revenue"
                _focus={{outline: `none`}}
                _focusVisible={{outline: `none`}}
                _hover={{
                  background:
                    values?.average_monthly_revenue === item ? 'auto' : 'rgba(25, 25, 25, 0.10)',

                  borderColor: 'transparent',
                }}
              >
                {item}
              </Button>
            );
          })}
        </HStack>
      </VStack>
    ),
    4: (
      <VStack mt="20px" w="full" spacing="20px">
        <Heading
          w="360px"
          whiteSpace="breakSpaces"
          textAlign="center"
          fontSize="16px"
          fontWeight="600"
        >
          How many units have you developed in the past?
        </Heading>
        <HStack w="full" position="relative" justify="center">
          {mutation.isLoading || done ? (
            <Center minH={`50px`}>
              <Spinner />
            </Center>
          ) : (
            unitsDevelopedArray.map((item, idx) => {
              return (
                <>
                  <Button
                    key={idx}
                    h="38.62px"
                    p="12.31px"
                    bg={values?.total_past_unit === item ? '#191919' : '#fff'}
                    color={values?.total_past_unit === item ? `#fff` : `#191919`}
                    fontSize="12px"
                    fontWeight="400"
                    name="total_past_unit"
                    onClick={handleExpected}
                    border="solid 1px #E4E4E4"
                    _focus={{outline: `none`}}
                    _focusVisible={{outline: `none`}}
                    _hover={{
                      background:
                        values?.total_past_unit === item ? 'auto' : 'rgba(25, 25, 25, 0.10)',

                      borderColor: 'transparent',
                    }}
                    borderRadius="6.51376px"
                  >
                    {item}
                  </Button>
                </>
              );
            })
          )}
        </HStack>
      </VStack>
    ),
  };

  return options[step];
};
