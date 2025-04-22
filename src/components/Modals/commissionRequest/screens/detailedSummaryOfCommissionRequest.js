import {
  Button,
  Flex,
  HStack,
  Heading,
  Image,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import {useState} from 'react';
import backArrowIcon from '/src/images/icons/backArrowForDrawer.svg';
import ClientInformationAndPaymentBreakDown from '../components/clientInformationAndPaymentBreakDown';
import RequestInfo from '../components/requestInfo';
import danger from '/src/images/icons/Danger.svg';
import {IoMdArrowBack} from 'react-icons/io';

export const DetailedSummmaryOfCommissionRequest = ({
  customScrollbarStyles,
  handleScreen,
  equityListObj,
  commissionRequestObj,
  setSubmitInfo,
  submitInfo,
  handleClose,
  pastPaymentObj,
  incomingPaymentObj,
  selectedEquityId,
  setSelectedEquityId,
  setClientData,
  clientData,
}) => {
  const [subScreen, setSubScreen] = useState('clientInfo');
  const [hasBeenClosed, setHasBeenClosed] = useState(false);

  const isValid = selectedEquityId && !hasBeenClosed;

  const handleSubScreens = (e, scrn, clientInfo, isClosed) => {
    // isClosed ? null :
    setSelectedEquityId(`${clientInfo?.id}`);
    setHasBeenClosed(isClosed);
    setClientData(clientInfo);
    setSubScreen(scrn);
    e.stopPropagation();
  };

  const nextScreenIs = scrn => () => {
    setSubmitInfo({...submitInfo, equity: `${selectedEquityId}`});
    return handleScreen(scrn);
  };

  return (
    <Flex
      minH="full"
      maxH="490px"
      overflowY="auto"
      sx={customScrollbarStyles}
      pr="5px"
      direction={`column`}
      gap={`12px`}
    >
      <HStack
        justify="space-between"
        // px="48px"
        align="center"
        m="0px"
        position="relative"
      >
        <HStack spacing="8px">
          {subScreen === 'paymentBreakDown' ? (
            <IoMdArrowBack
              cursor="pointer"
              onClick={() => (setSubScreen('clientInfo'), setHasBeenClosed(false))}
              fontSize={`20px`}
            />
          ) : null}
          <Heading fontSize="18px" fontWeight="600" color="#191919" m={`0px`}>
            Commission Payment
          </Heading>
        </HStack>
        <ModalCloseButton position="initial" h={`20px`} w={`20px`} />
      </HStack>
      {equityListObj.data?.suspicious ? (
        // == 'true'
        <HStack
          bg=" rgba(255, 106, 106, 0.05)"
          borderRadius="5px"
          px="32px"
          spacing="10px"
          // mx="48px"
          py="24px"
          h="66px"
          justify="start"
          align="center"
        >
          <Image src={danger.src} alt="suspicion icon" />
          <Text as="span" color="#000000" fontSize="16px" fontWeight="300">
            Suspicious activity: {equityListObj.data?.suspicious}
          </Text>
        </HStack>
      ) : null}
      <ModalBody sx={customScrollbarStyles} p={`0px`}>
        <HStack w="full" spacing="21px" align={`stretch`}>
          <ClientInformationAndPaymentBreakDown
            subScreen={subScreen}
            setClientData={setClientData}
            customScrollbarStyles={customScrollbarStyles}
            handleSubScreens={handleSubScreens}
            equityListObj={equityListObj}
            selectedEquityId={selectedEquityId}
            setSelectedEquityId={setSelectedEquityId}
            submitInfo={submitInfo}
            setSubmitInfo={setSubmitInfo}
            clientData={clientData}
            pastPaymentObj={pastPaymentObj}
            incomingPaymentObj={incomingPaymentObj}
            commissionRequestObj={commissionRequestObj}
          />
          <RequestInfo
            commissionRequestObj={commissionRequestObj}
            customScrollbarStyles={customScrollbarStyles}
          />
        </HStack>
      </ModalBody>
      <ModalFooter p="0px">
        <HStack justify="end" gap="28px" w="full">
          <Button
            bg="transparent"
            border="1px solid #FF3636"
            color="#FF3636"
            borderRadius="72px"
            w="202px"
            _hover={{opacity: '1', bg: 'transparent'}}
            h="100%"
            p={`12.5px`}
            fontSize="18px"
            fontWeight="500"
            onClick={handleClose}
          >
            Discard
          </Button>
          <Button
            borderRadius="72px"
            bg={'#242526'}
            color={'#FFFFFF'}
            fontWeight={'400'}
            fontSize={'18px'}
            _hover={{opacity: 0.9}}
            _active={{opacity: 0.9}}
            h={'100%'}
            p={`12.5px`}
            isDisabled={!isValid}
            onClick={nextScreenIs('commission payment')}
            w="202px"
          >
            <Text fontWeight={`400`}>Proceed</Text>
          </Button>
        </HStack>
      </ModalFooter>
    </Flex>
  );
};

export default DetailedSummmaryOfCommissionRequest;
