import {useDisclosure} from '@chakra-ui/react';
import RealtorDrawer from '.';

export const RealtorDrawerWrapper = ({agentId, children}) => {
  const realtorDisclosure = useDisclosure();
  return (
    <>
      <RealtorDrawer
        modalDisclosure={realtorDisclosure}
        agentId={agentId}
        runQuery={realtorDisclosure.isOpen}
      >
        {children}
      </RealtorDrawer>
    </>
  );
};
