function addDaysUTC(date, days) {
  const result = new Date(date); // Clone date
  result.setUTCDate(result.getUTCDate() + days);
  return result;
}

function addMonthsUTC(date, months) {
  const result = new Date(date); // Clone date
  const originalDay = result.getUTCDate();
  result.setUTCMonth(result.getUTCMonth() + months);
  // Adjust day if it rolled over (e.g., Jan 31 + 1 month -> Feb 28/29)
  if (result.getUTCDate() !== originalDay) {
    result.setUTCDate(0); // Set to last day of the target month
  }
  return result;
}
/**
 * Takes a flat array of items and distributes them into a page structure,
 * filling page1 with up to 10 items before adding any to page2.
 *
 * @param {Array<object>} allItems - A single array containing all data items.
 * @returns {object} An object with 'page1' and 'page2' keys, containing arrays of items.
 *                   Returns { page1: [], page2: [] } if input is not a valid array.
 */
function structureDataIntoPages(allItems) {
  // Basic validation
  if (!Array.isArray(allItems)) {
    console.error('Input must be an array.');
    return {page1: [], page2: []};
  }

  const maxPage1Size = 10;

  // Use slice to efficiently divide the array
  const page1Items = allItems.slice(0, maxPage1Size);
  const page2Items = allItems.slice(maxPage1Size); // Takes items from index 10 onwards

  return {
    page1: page1Items,
    page2: page2Items,
  };
}

export function filterDataByFutureDateRange(data, filterType) {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0); // Normalize today to UTC start of day

  let endDate; // This will be the *end* boundary (inclusive)

  // --- Calculate the end boundary date based on the filter type ---
  switch (filterType) {
    case '1':
      return data;
    case '2':
      endDate = addDaysUTC(today, 1); // End of tomorrow
      break;
    case '3':
      endDate = addDaysUTC(today, 3); // End of the 3rd day from today
      break;
    case '4':
      endDate = addDaysUTC(today, 7); // End of the 7th day from today
      break;
    case '5':
      endDate = addMonthsUTC(today, 1); // End of the day 1 month from today
      break;
    default:
      console.warn(
        `Invalid filterType provided: "${filterType}". Expected 'Tomorrow', '3 Days', '1 Week', or '1 Month'. Returning empty data.`
      );
      // Return structure with empty arrays for invalid filter type
      return data;
  }
  // endDate is currently the START of the day *after* the period.
  // For inclusive comparison, we keep it like this and use <= endDate.

  const filterItem = item => {
    if (!item.date || typeof item.date !== 'string') {
      console.warn(`Item has missing or invalid date property:`, item);
      return false; // Skip items with missing/invalid dates
    }

    let itemDate;
    try {
      itemDate = new Date(item.date);
      // Check if the date is valid after parsing
      if (isNaN(itemDate.getTime())) {
        console.warn(`Invalid ISO date string encountered: "${item.date}"`);
        return false;
      }
      // No need to normalize itemDate time if comparing against normalized boundaries
    } catch (e) {
      console.error(`Error parsing date string "${item.date}":`, e);
      return false;
    }
    console.log({endDate, itemDate, today});

    // Check if the item's date falls within the range [today, endDate] inclusive
    return itemDate >= today && itemDate <= endDate;
  };

  // Create a new object with filtered arrays
  const filteredData = {
    page1: data.page1.filter(filterItem),
    page2: data.page2.filter(filterItem),
  };
  const structuredData = structureDataIntoPages([...filteredData.page1, ...filteredData.page2]);
  return structuredData;
}
