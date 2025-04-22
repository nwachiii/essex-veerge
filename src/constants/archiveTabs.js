import TabComponentForAddingToArchive from '../components/Drawers/archiveUnitDrawer/handleArchiving/TabComponentForAddingToArchive';

export const archiveTabs = [
  {
    tablist: 'Add to Archive',
    component: tabProps => (
      <TabComponentForAddingToArchive
        {...tabProps}
        numberToDisplay={tabProps.numberOfUnits}
        infoText="By adding this unit to Archive, it will become unavailable for
    purchase."
        labelText="How many units do you want to add archive?"
      />
    ),
  },
  {
    tablist: 'Remove from Archive',
    component: tabProps => (
      <TabComponentForAddingToArchive
        {...tabProps}
        toRemoving
        numberToDisplay={tabProps.numberOfArchivedUnits}
        infoText="By removing this unit from the Archive, it will become available for purchase."
        labelText="How many units do you want to remove from archive?"
      />
    ),
  },
];
