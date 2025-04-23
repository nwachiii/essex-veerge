import React from 'react';
import {Box} from '@chakra-ui/react';
import CollapsedHeader from './CollapsedHeader';
import ExpandedHeader from './ExpandedHeader';

export const ManageListingHeader = Props => {
  const {
    setAddedParam,
    addedParam,
    handleExpand,
    isCollapsed,
    allColumns,
    typeOfSort,
    selectedSortColumn,
    handleSort,
    setSortBy,
    listingType,
    setListingType,
    data,
    isDraft,
    setIsDraft,
    draftCount,
    publishedListingCount,
    LISTINGS_DATA,
    isTableValid,
    forFilter,
  } = Props;

  const sort_params = [
    'A-Z',
    'Z-A',
    'Most sold to least sold',
    'Least sold  to most sold',
    'Highest price to lowest price',
    'Lowest price to highest price',
    'Highest unit to lowest unit',
    'Lowest unit to highest unit',
    'Oldest to Newest',
    'Newest to oldest',
  ];

  return (
    <Box>
      {isCollapsed ? (
        <>
          <CollapsedHeader
            data={data}
            isDraft={isDraft}
            forFilter={forFilter}
            setSortBy={setSortBy}
            draftCount={draftCount}
            allColumns={allColumns}
            setIsDraft={setIsDraft}
            typeOfSort={typeOfSort}
            handleSort={handleSort}
            addedParam={addedParam}
            sort_params={sort_params}
            isTableValid={isTableValid}
            handleExpand={handleExpand}
            LISTINGS_DATA={LISTINGS_DATA}
            setAddedParam={setAddedParam}
            selectedSortColumn={selectedSortColumn}
            publishedListingCount={publishedListingCount}
          />{' '}
        </>
      ) : (
        <>
          <ExpandedHeader
            isTableValid={isTableValid}
            sort_params={sort_params}
            setAddedParam={setAddedParam}
            draftCount={draftCount}
            isDraft={isDraft}
            setIsDraft={setIsDraft}
            data={data}
            handleExpand={handleExpand}
            listingType={listingType}
            setListingType={setListingType}
            publishedListingCount={publishedListingCount}
            LISTINGS_DATA={LISTINGS_DATA}
            addedParam={addedParam}
            forFilter={forFilter}
          />
        </>
      )}
    </Box>
  );
};

export default ManageListingHeader;
