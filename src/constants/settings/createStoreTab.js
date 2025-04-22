import React from 'react';
import EndToEndWebApp from '../../components/settings/endToendWebApp';
import ScheduleMeeting from '../../components/settings/scheduleMeeting';
import AfterSchedulingMeeting from '../../components/settings/afterSchedulingMeeting';
import CreateBasicStore from '../../components/settings/createBasicStore';

export const createStoreTab = {
  endToEnd: prop => <EndToEndWebApp {...prop} />,

  scheduleMeeting: prop => <ScheduleMeeting {...prop} />,

  viewAfterScheduledMeeting: prop => <AfterSchedulingMeeting {...prop} />,

  createBasicStore: prop => <CreateBasicStore {...prop} />,
};
