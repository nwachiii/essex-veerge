import {
  Modal,
  ModalContent,
  ModalOverlay,
  Button as ChakraBtn,
  useMediaQuery,
  useToast,
} from '@chakra-ui/react';
import React, {useState} from 'react';
import {DetailedSummmaryOfCommissionRequest} from './screens/detailedSummaryOfCommissionRequest';
import CommissionPaymentDetails from './screens/commissionPaymentDetails';
import CommissionPaymentDetailsSummary from './screens/commissionPaymentDetailsSummary';
import {
  fetchCustomerEquity,
  fetchSingleCommissionRequest,
  handleRequestCommssion,
} from '../../../apis/requests';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {toastForError} from '../../../utils/toastForErrors';
import {changeDateFormat} from '../../../utils/formatDate';
import {useEffect} from 'react';
import {getAccountPastPayments, getUserPaymentBreakdown} from '../../../apis/account';
import VerifyTwoFa from './screens/verifyTwoFa';
import {CreateToast} from '../../../ui-lib';
import {useRouter} from 'next/router';
import {MatadorCustomToast} from 'pages/veerge_menu/loop';

export const AcceptCommissionRequest = ({modalDisclosure, agentId, refetch, id}) => {
  const [screen, setScreen] = useState('request details');
  const [submitInfo, setSubmitInfo] = useState({action: 'accept'});
  const [recurring, setRecurring] = useState(false);
  const [clientData, setClientData] = useState({});
  const [isShortScreenHeight] = useMediaQuery('(max-height: 740px)');
  const [canFetch, setCanFetch] = useState(false);
  const toaster = CreateToast();
  const router = useRouter();

  const [selectedEquityId, setSelectedEquityId] = useState('');

  const toast = useToast();

  // commission request info

  const commissionRequest = useQuery(
    ['individual_commission_request', id],
    () => fetchSingleCommissionRequest(id),
    {enabled: canFetch}
  );
  //commissonObj

  useEffect(() => {
    if (commissionRequest.isError) {
      toastForError(commissionRequest.error, true, toast);
    }
    if (!commissionRequest.isLoading && commissionRequest.data && canFetch) {
      modalDisclosure.onOpen();
    }
  }, [commissionRequest.isLoading, commissionRequest.isError, commissionRequest.data]);

  const commissionRequestObj = {
    data: {
      agent: {...commissionRequest.data?.data?.data?.agent, agentId},
      customer: {
        avatar: commissionRequest.data?.data?.data?.customer?.avatar,
        last_name: commissionRequest.data?.data?.data?.customer?.last_name,
        first_name: commissionRequest.data?.data?.data?.customer?.first_name,
        email: commissionRequest.data?.data?.data?.customer?.email,
        id:
          commissionRequest.data?.data?.data?.customer?.user?.id ??
          commissionRequest.data?.data?.data?.customer?.id,
      },
      unit_price: commissionRequest.data?.data?.data?.unit?.price,
      unit_size: commissionRequest.data?.data?.data?.unit?.unit_size,
      dateSold: commissionRequest.data?.data?.data?.date_sold
        ? changeDateFormat(commissionRequest.data?.data?.data?.date_sold)
        : '-',
      requestDate: commissionRequest.data?.data?.data?.created_at
        ? changeDateFormat(commissionRequest.data?.data?.data?.created_at)
        : '-',
      unit_photo: commissionRequest.data?.data?.data.unit?.photos?.[0]?.photo,
      unit_title: commissionRequest.data?.data?.data.unit?.unit_title,
      project_name: commissionRequest.data?.data?.data?.unit?.project?.name,
      notes: commissionRequest.data?.data?.data?.note,
    },
    isLoading: commissionRequest.isLoading,
    isError: commissionRequest.isError,
    error: commissionRequest.error,
  };

  const param = `${router?.query?.status || 'dashboard'}`;
  const queryClient = useQueryClient();

  const mutation = useMutation(formData => handleRequestCommssion(id, formData), {
    onSuccess: async res => {
      await refetch();
      handleClose();
      // toaster('Transaction Successful');
      toast({
        render: () => <MatadorCustomToast description={'Transaction Successful'} />,
        duration: 4000,
        isClosable: true,
        position: 'top-right',
      });
    },
    onError: err => {
      toastForError(err, true, toast);
    },
  });

  const submitPaymentForm = () => {
    mutation.mutate(submitInfo);
  };

  const account_payment_details = useQuery(
    ['commission-upcoming-details', selectedEquityId],
    () =>
      getUserPaymentBreakdown(
        selectedEquityId,
        `?recurring=${recurring}&user=${commissionRequest.data?.data?.data?.customer?.id}`
      ),
    {enabled: !!submitInfo?.equity || !!selectedEquityId, retry: 0}
  );

  const viewPastPayment = useQuery(
    ['commission_past_payment', selectedEquityId],
    () => getAccountPastPayments(selectedEquityId),
    {enabled: !!submitInfo?.equity || !!selectedEquityId, retry: 0}
  );

  const pastPayment = viewPastPayment?.data?.data;
  const incomingPayment = account_payment_details?.data?.data?.data;

  const pastPaymentObj = {data: pastPayment, isLoading: viewPastPayment.isLoading};

  const incomingPaymentObj = {data: incomingPayment, isLoading: account_payment_details.isLoading};

  useEffect(() => {
    setRecurring(pastPayment && pastPayment[0]?.equity?.auto_debit);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pastPayment]);

  // equityList
  const equityList = useQuery(['client_Equity_list', id], () => fetchCustomerEquity(id), {
    enabled: modalDisclosure.isOpen,
  });

  const equityListObj = {
    data: equityList?.data?.data,
    isLoading: equityList.isLoading,
    isError: equityList.isError,
    error: equityList.error,
  };

  const handleClose = () => {
    setSelectedEquityId('');
    setCanFetch(false);
    setSubmitInfo({action: 'accept'});
    setScreen('request details');
    return modalDisclosure.onClose();
  };

  const customScrollbarStyles = {
    '&::-webkit-scrollbar': {width: '4px', borderRadius: '16px'},
    '&::-webkit-scrollbar-track': {
      borderRadius: '16px',
      WebkitBoxShadow: 'inset 0 0 6px transparent',
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '16px',
      backgroundColor: '#e1e1e1',
      // outline: '1px solid slategrey', // You can include this line if needed
    },
  };
  const handleScreen = scrn => () => {
    return setScreen(scrn);
  };

  const displayCommissionAcceptanceScreens = key => {
    switch (key) {
      case 'request details':
        return (
          <DetailedSummmaryOfCommissionRequest
            customScrollbarStyles={customScrollbarStyles}
            handleScreen={setScreen}
            pastPaymentObj={pastPaymentObj}
            incomingPaymentObj={incomingPaymentObj}
            handleClose={handleClose}
            setSubmitInfo={setSubmitInfo}
            setSelectedEquityId={setSelectedEquityId}
            selectedEquityId={selectedEquityId}
            submitInfo={submitInfo}
            commissionRequestObj={commissionRequestObj}
            setClientData={setClientData}
            clientData={clientData}
            equityListObj={equityListObj}
          />
        );
        break;
      case 'commission payment':
        return (
          <CommissionPaymentDetails
            customScrollbarStyles={customScrollbarStyles}
            handleScreen={setScreen}
            commissionRequestObj={commissionRequestObj}
            pastPaymentObj={pastPaymentObj}
            incomingPaymentObj={incomingPaymentObj}
            handleClose={handleClose}
            setSubmitInfo={setSubmitInfo}
            submitInfo={submitInfo}
            clientData={clientData}
          />
        );
        break;
      case 'commission payment summary':
        return (
          <CommissionPaymentDetailsSummary
            submitInfo={submitInfo}
            setSubmitInfo={setSubmitInfo}
            pastPaymentObj={pastPaymentObj}
            incomingPaymentObj={incomingPaymentObj}
            clientData={clientData}
            commissionRequestObj={commissionRequestObj}
            customScrollbarStyles={customScrollbarStyles}
            handleScreen={setScreen}
            handleClose={handleClose}
          />
        );
        break;
      case 'verify 2fa':
        return (
          <VerifyTwoFa
            submitInfo={submitInfo}
            submitPaymentForm={submitPaymentForm}
            handleClose={handleClose}
            mutation={mutation}
          />
        );
        break;

      default:
        return (
          <DetailedSummmaryOfCommissionRequest
            customScrollbarStyles={customScrollbarStyles}
            handleScreen={setScreen}
            pastPaymentObj={pastPaymentObj}
            incomingPaymentObj={incomingPaymentObj}
            handleClose={handleClose}
            setSubmitInfo={setSubmitInfo}
            setSelectedEquityId={setSelectedEquityId}
            selectedEquityId={selectedEquityId}
            submitInfo={submitInfo}
            commissionRequestObj={commissionRequestObj}
            setClientData={setClientData}
            clientData={clientData}
            equityListObj={equityListObj}
          />
        );

        break;
    }
  };
  const openCommissionModal = () => {
    setCanFetch(true);
  };

  return (
    <>
      <ChakraBtn
        onClick={openCommissionModal}
        _hover={{opacity: '0.9'}}
        _active={{opacity: '0.9'}}
        isLoading={(commissionRequest.isLoading || commissionRequest.isFetching) && canFetch}
        _focus={{opacity: '0.9'}}
        // variant="primary"
        borderRadius="72"
        h="26px"
        w="58px"
        bg="#191919"
        p="4px 8px"
        color="#FFFFFF"
        fontSize="12px"
        fontWeight="500"
      >
        Accept
      </ChakraBtn>
      <Modal isOpen={modalDisclosure.isOpen} onClose={handleClose} isCentered>
        <ModalOverlay />
        <ModalContent
          p="20px"
          transform={isShortScreenHeight ? 'scale(0.8) !important' : 'none'}
          // minW="fit-content"
          maxW={screen === `verify 2fa` ? `425px` : `714px`}
          borderRadius="16px"
          bg="#fff"
        >
          {displayCommissionAcceptanceScreens(screen)}
        </ModalContent>
      </Modal>
    </>
  );
};

export default AcceptCommissionRequest;
