import {MatadorCustomDatePicker} from '@/components/common/Calendar/DatePicker';
import {Box, HStack, useDisclosure} from '@chakra-ui/react';
import {HandleInspectionRequestApproval} from 'constants/request/HandleInspectionRequestApproval';
import React from 'react';

export const ActionComponentForPendingInspectionRequest = ({info, refetch, roles}) => {
  const modalDisclosure = useDisclosure();
  return (
    <HStack spacing="8px" h="40px">
      <HandleInspectionRequestApproval
        requestId={info?.id}
        supervisorId={info?.supervisor}
        row={info}
        toTeamMember={modalDisclosure}
        refetch={refetch}
        roles={roles}
      />
      <Box boxSize="4px" borderRadius="full" bg="#D9D9D9" />

      <MatadorCustomDatePicker assignDisclosure={modalDisclosure} refetch={refetch} id={info?.id} />
    </HStack>
  );
};

export default ActionComponentForPendingInspectionRequest;
