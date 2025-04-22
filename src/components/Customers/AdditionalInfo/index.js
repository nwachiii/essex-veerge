import React from 'react';
import {Box, extendTheme, Stack, Text, VStack, Wrap} from '@chakra-ui/react';

import {Container2} from '../../common/containers';
import {theme} from '../../../theme';
import {BankDetails} from './BankDetails';
import {NextOfKinDetails} from './NextOfKinDetails';
import {handleDateFormat} from '../../../utils/formatDate';
import {BsDashLg} from 'react-icons/bs';
import {formatToCurrency} from 'utils/formatAmount';

const styles = extendTheme({...theme});

export const AdditionalInfo = ({isGateWayDisabled, customerInfo}) => {
  return (
    <Stack>
      <Text>
        <b>Additional Information</b>
      </Text>
      <Container2 p={22}>
        <Wrap spacingX="24px" spacingY="19px" mb="25px">
          <VStack {...styles.boxStyles} textAlign="center" w={229}>
            <Text fontWeight="400" fontSize="12px" lineHeight="15px" color="#606060">
              Monthly Income
            </Text>
            <Text fontWeight="500" fontSize="14px" lineHeight="18px" color="#191919">
              {customerInfo?.user_info?.monthly_income ? (
                `${formatToCurrency(customerInfo?.user_info?.monthly_income || 0, customerInfo?.user_info?.currency)}`
              ) : (
                <BsDashLg />
              )}
            </Text>
          </VStack>
          <VStack {...styles.boxStyles} textAlign="center" w={229}>
            <Text fontWeight="400" fontSize="12px" lineHeight="15px" color="#606060">
              Occupation
            </Text>
            <Text fontWeight="500" fontSize="14px" lineHeight="18px" color="#191919">
              {customerInfo?.user_info?.occupation ?? <BsDashLg />}
            </Text>
          </VStack>
          <VStack {...styles.boxStyles} textAlign="center" w={229}>
            <Text fontWeight="400" fontSize="12px" lineHeight="15px" color="#606060">
              Marital Status
            </Text>
            <Text fontWeight="500" fontSize="14px" lineHeight="18px" color="#191919">
              {customerInfo?.user_info?.marital_status ?? <BsDashLg />}
            </Text>
          </VStack>
          <VStack {...styles.boxStyles} textAlign="center" w={213}>
            <Text fontWeight="400" fontSize="12px" lineHeight="15px" color="#606060">
              Company&apos;s Name
            </Text>
            <Text fontWeight="500" fontSize="14px" lineHeight="18px" color="#191919">
              {customerInfo?.user_info?.company_name ?? <BsDashLg />}
            </Text>
          </VStack>
          <VStack {...styles.boxStyles} w={111} textAlign="center" px="5px">
            <Text fontWeight="400" fontSize="12px" lineHeight="15px" color="#606060">
              Highest Education
            </Text>
            <Text fontWeight="500" fontSize="14px" lineHeight="18px" color="#191919">
              {customerInfo?.user_info?.highest_education ?? <BsDashLg />}
            </Text>
          </VStack>
          <VStack {...styles.boxStyles} textAlign="center" w={119}>
            <Text fontWeight="400" fontSize="12px" lineHeight="15px" color="#606060">
              Date of Birth
            </Text>
            <Text fontWeight="500" fontSize="14px" lineHeight="18px" color="#191919">
              {customerInfo?.user_info?.date_of_birth ? (
                handleDateFormat(customerInfo?.user_info?.date_of_birth)
              ) : (
                <BsDashLg />
              )}
            </Text>
          </VStack>
          <VStack {...styles.boxStyles} textAlign="center" w={194}>
            <Text fontWeight="400" fontSize="12px" lineHeight="15px" color="#606060">
              Date Joined
            </Text>
            <Text fontWeight="500" fontSize="14px" lineHeight="18px" color="#191919">
              {handleDateFormat(customerInfo?.user_info?.sign_up_time)}
            </Text>
          </VStack>
        </Wrap>
        {isGateWayDisabled ? null : <BankDetails data={customerInfo?.finances} />}
        <NextOfKinDetails
          customerInfo={
            customerInfo && customerInfo?.next_of_kin?.length > 0 && customerInfo?.next_of_kin[0]
          }
        />
      </Container2>
    </Stack>
  );
};
