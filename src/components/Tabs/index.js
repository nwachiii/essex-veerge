import {Tab, TabList, TabPanel, TabPanels, Tabs} from '@chakra-ui/react';
import React from 'react';
import {LayoutView} from '../PageLayout/LayoutView';
import { TabsSlider } from '../../ui-lib';

export const ReusableTabs = () => {
  function DataTabs({data, maxLength}) {
    const [tabIndex, setTabIndex] = React.useState(0);

    const handleSliderChange = event => {
      setTabIndex(parseInt(event.target.value, 10));
    };

    const handleTabsChange = index => {
      setTabIndex(index);
    };
    return (
      <LayoutView activePage="customers">
        <Tabs
          index={tabIndex}
          onChange={handleTabsChange}
          variant="soft-rounded"
          colorScheme="gray"
          isFitted
        >
          <TabList pos="relative">
            {data.map((tab, index) => (
              <Tab key={index}>{tab.label}</Tab>
            ))}
            <TabsSlider
              maxLength={maxLength}
              tabIndex={tabIndex}
              handleSliderChange={handleSliderChange}
            />
          </TabList>
          <TabPanels>
            {data.map((tab, index) => (
              <TabPanel p={4} key={index}>
                {tab.content}
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      </LayoutView>
    );
  }

  const tabData = [
    {
      label: 'Customer Details',
      content: 'Perhaps the greatest dish ever invented.',
    },
    {
      label: 'Listing Details',
      content: 'Perhaps the surest dish ever invented but fills the stomach more than rice.',
    },
    {
      label: 'Payment Plan',
      content: 'Perhaps the surest dish ever invented but fills the stomach more than rice.',
    },
    {
      label: 'Allocate a unit',
      content: 'Perhaps the surest dish ever invented but fills the stomach more than rice.',
    },
  ];

  return <DataTabs data={tabData} maxLength={tabData.length - 1} />;
};
