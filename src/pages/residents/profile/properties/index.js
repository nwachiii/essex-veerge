import {
  HStack,
  Image,
  Stack,
  Text,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuDivider,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import {useRouter} from 'next/router';
import {useQuery} from '@tanstack/react-query';
import {MATADOR_CUSTOMER_PROPERTIES} from '../../../../constants/customersProfile';
import {fetchCustomers, fetchCustomersEquity} from '../../../../apis/customers';
import {IDsAndDocuments, Inspection} from '../../../../components/Customers';
import {RxActivityLog} from 'react-icons/rx';

import PendingTxns from './pending_txns';
import {RiSpamFill} from 'react-icons/ri';
import {RxCross1} from 'react-icons/rx';
import {AiOutlineMenu} from 'react-icons/ai';
import {PiHandHeartThin} from 'react-icons/pi';
import CustomerEquities from '../customer_equities';
import {AdditionalInfo} from '../../../../components/Customers/AdditionalInfo';
import ActivityLogDrawer from '../../../../components/Drawers/activitylogDrawer';
import {WalletDetails} from '../../../../components/Customers/WalletDetails';
import {CustomerAddress} from '../../../../components/Customers/Address';
import SendAnOffer from '../../../../components/Modals/send_offer';
import UserProfileMoreOption from '@/components/Drawers/userProfileMoreOption';
import Offers from '@/components/Cards/customerProfile/sendOffer/offer';
import {useIsGatewayDisabled} from 'utils/useIsGatewayDisabled';
import { customers } from 'pages/residents/customer_overview';

export const CustomerProperties = ({customerInfo, refetch}) => {
  const {query} = useRouter();
  const SEND_OFFER_MODAL = useDisclosure();
  const customerOverviewData = customers?.[`page${1}`];
  // const filterCustomerOverviewData = customerOverviewData?.filter(
  //   item => item?.response?.id == query.id
  // )[0]?.response;
  // const {data: customerEquities} = useQuery(
  // //   ['customerEquity', filterCustomerOverviewData?.customer_id],
  //   () => fetchCustomersEquity(filterCustomerOverviewData?.customer_id ?? query.userId)
  // );
  // const PENDING_INVESTMEENTS = customerInfo?.pending_investments;
  // const isGateWayDisabled = useIsGatewayDisabled();
  return (
    <Stack
      w="full"
      maxW={{
        base: '60vw',
        xl: 'calc(100%-410px)',
      }}
      minH="100vh"
      position={'relative'}
      alignSelf="end"
      bottom="0%"
      spacing="16px"
      pb={10}
    >
      <HStack
        // mt="clamp(-54px,-5vh,-84px)"
        // position={'absolute'}
        justify={'flex-end'}
        // w="98%"
        w="full"
      >
        {/* <UserProfileMoreOption
          isGateWayDisabled={isGateWayDisabled}
          refetch={refetch}
          customerInfo={customerInfo}
          giveOffer={SEND_OFFER_MODAL}
        /> */}
      </HStack>
      <Stack w="full" spacing="60px">
        {/* <CustomerEquities
          customerEquities={customerEquities}
          refetch={refetch}
          customerInfo={customerInfo?.customer_investments}
        /> */}
        {/* <Offers offers={customerInfo?.offers} />
        {PENDING_INVESTMEENTS?.length > 0 ? <PendingTxns data={PENDING_INVESTMEENTS} /> : null} */}

        {/* {isGateWayDisabled ? null : (
          <WalletDetails
            id={query.userId}
            data={customerInfo?.finances}
            username={`${customerInfo?.user_info?.first_name}'s transactions`}
          />
        )} */}
        {/* <Inspection
          id={query.id}
          data={customerInfo?.inspection_requests?.ongoing}
          isClosed={customerInfo?.inspection_requests?.closed?.length > 0}
          closedRequests={customerInfo?.inspection_requests?.closed}
          refetch={refetch}
        />

        {customerInfo?.id_documents?.document ? (
          <IDsAndDocuments
            documents={[
              {...customerInfo?.id_documents, document_name: `ID`},
              {...customerInfo?.utility_bill, document_name: `Utility Bill`},
            ]}
          />
        ) : null}

        <CustomerAddress customerInfo={customerInfo?.user_info} />
        <AdditionalInfo
          isGateWayDisabled={isGateWayDisabled}
          customerInfo={customerInfo && customerInfo}
        /> */}
{/* 
        <SendAnOffer
          customerId={customerInfo?.user_info?.id}
          refetch={refetch}
          SEND_OFFER_MODAL={SEND_OFFER_MODAL}
        /> */}
      </Stack>
    </Stack>
  );
};
export default CustomerProperties;
