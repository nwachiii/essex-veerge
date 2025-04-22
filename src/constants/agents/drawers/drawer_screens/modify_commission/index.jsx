import React, {useState} from 'react';

import EditAgentCommission from './screens/modifyCommission';
import ListOfListingsCommissions from './screens/listOfListingsCommissions';

const defaultScreen = 'list of listings';
const ModifyCommission = ({customScrollbarStyles, mainScreen, handleClose, handleMainScreen}) => {
  const [screen, setScreen] = useState(defaultScreen);
  const [project_id, setProject_id] = useState('');

  const displayCommissionModificationScreens = key => {
    switch (key) {
      case 'list of listings':
        return (
          <ListOfListingsCommissions
            setProject_id={setProject_id}
            mainScreen={mainScreen}
            handleClose={handleClose}
            handleMainScreen={handleMainScreen}
            handleScreen={setScreen}
            customScrollbarStyles={customScrollbarStyles}
          />
        );

      case 'modify commission':
        return (
          <EditAgentCommission
            handleScreen={setScreen}
            setProject_id={setProject_id}
            project_id={project_id}
            customScrollbarStyles={customScrollbarStyles}
          />
        );

      default:
        return (
          <ListOfListingsCommissions
            setProject_id={setProject_id}
            mainScreen={mainScreen}
            handleClose={handleClose}
            handleMainScreen={handleMainScreen}
            handleScreen={setScreen}
            customScrollbarStyles={customScrollbarStyles}
          />
        );
    }
  };
  return displayCommissionModificationScreens(screen);
};

export default ModifyCommission;
