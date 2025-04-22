import { useDisclosure } from '@chakra-ui/react';
import HandleArchiving from './handleArchiving';
import UpdatingAllocation from './updateAllocation';
import {useState} from 'react';

const ArchiveUnitDrawer = ({unitInfo, refetch, drawerDisclosure, handleMainScreen, bundleId}) => {
  const [screen, setScreen] = useState('handleArchiving');
  const [value, setValue] = useState('');
  const archiveUnitModal = useDisclosure()

  const customScrollbarStyles = {
    '&::-webkit-scrollbar': {
      width: '4px',
      borderRadius: '16px',
    },
    '&::-webkit-scrollbar-track': {
      borderRadius: '16px',
      WebkitBoxShadow: 'inset 0 0 6px transparent',
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '16px',
      backgroundColor: '#e1e1e1',
      outline: '1px solid slategrey', // You can include this line if needed
    },
  };

  const displayArchivingOfUnitScreens = key => {
    switch (key) {
      case 'handleArchiving':
        return (
          <HandleArchiving
            value={value}
            refetch={refetch}
            unitInfo={unitInfo}
            bundleId={bundleId}
            setValue={setValue}
            handleScreen={setScreen}
            handleMainScreen={handleMainScreen}
            archiveUnitModal={drawerDisclosure}
            customScrollbarStyles={customScrollbarStyles}
          />
        );
      case 'removeFromArchiveForAllocationComponent':
        return (
          <UpdatingAllocation
            toRemoving
            value={value}
            refetch={refetch}
            unitInfo={unitInfo}
            bundleId={bundleId}
            handleScreen={setScreen}
            customScrollbarStyles={customScrollbarStyles}
          />
        );

      case 'addToArchiveForAllocationComponent':
        return (
          <UpdatingAllocation
            value={value}
            refetch={refetch}
            unitInfo={unitInfo}
            bundleId={bundleId}
            handleScreen={setScreen}
            customScrollbarStyles={customScrollbarStyles}
          />
        );
      default:
        return (
          <HandleArchiving
            value={value}
            refetch={refetch}
            unitInfo={unitInfo}
            bundleId={bundleId}
            setValue={setValue}
            projectId={projectId}
            handleScreen={setScreen}
            listOfContacts={contacts}
            customScrollbarStyles={customScrollbarStyles}
          />
        );
    }
  };
  return <>{displayArchivingOfUnitScreens(screen)}</>;
};
export default ArchiveUnitDrawer;
