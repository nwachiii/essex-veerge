import React, {useState} from 'react';
import ListOfInspections from './listOfInspections';
import InspectionProfileSummary from './inspectionProfileSummary';

const defaultScreen = 'list';

const InspectionProfile = ({handleScreen, handleClose, listObj}) => {
  const [screen, setScreen] = useState(defaultScreen);

  const handleScreen = scrn => () => {
    setScreen(scrn);
  };
  const handleClose = () => {
    setScreen(defaultScreen);
  };

  const displayInspectionListScreens = key => {
    switch (key) {
      case 'list':
        return <ListOfInspections />;

      case 'summary':
        return (
          <InspectionProfileSummary refetch={refetch} navigateMainDrawer={navigateMainDrawer} />
        );
      default:
        <ListOfInspections />;
    }
  };
  return displayInspectionListScreens(screen);
};

export default InspectionProfile;
