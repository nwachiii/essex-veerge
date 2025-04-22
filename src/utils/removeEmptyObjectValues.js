export const removeEmptyObjectValues = arr => {
  // Check if arr is an array and has elements
  if (!Array.isArray(arr) || !arr.length) {
    console.warn('Input is not a non-empty array');
    return;
  }

  arr.forEach(obj => {
    // Ensure each element is an object
    if (obj === null || typeof obj !== 'object') {
      console.warn('One or more elements in the array are not objects');
      return;
    }

    Object.keys(obj).forEach(key => {
      // Remove empty, undefined, NaN, 0 values, or 'id' keys
      if (
        obj[key] === '' ||
        obj[key] === undefined ||
        Number.isNaN(obj[key]) ||
        obj[key] === 0 ||
        key === 'id'
      ) {
        delete obj[key];
      } else if (
        [
          'amount',
          'initial_deposit_in_value',
          'payment_period_in_months',
          'periodic_payment',
          'price',
        ].includes(key)
      ) {
        // Convert string numbers to Number, ignoring non-numeric values
        const cleanedValue = obj[key]?.toString().replace(/,/g, '');
        obj[key] = isNaN(cleanedValue) ? obj[key] : Number(cleanedValue);
      }
    });
  });
};

export const handleEmptySubmittedValues = arr => {
  arr.map(obj =>
    Object.keys(obj).forEach(key => {
      if (key == 'project_id') {
        obj[`${key}`] = Number(obj[key]);
      }
      if (key == 'bundle') {
        obj[`${key}`].id = Number(obj[key].id);
      }
    })
  );
  arr.forEach((item, num) => {
    item.bundle.payment_class == 'outright'
      ? (item.bundle.paymentplan = null)
      : (item.bundle.outright = null);
  });
};
//Deprecated Function Used to Run through Units Information before submission.
// export const handleUnitsIntegerValues = arr => {
//   arr.map(obj =>
//     Object.keys(obj).forEach((key, idx) => {
//       if (key == 'quantity') {
//         obj[`${key}`] = Number(obj[key]);
//       }
//       if (key == 'price') {
//         obj[`${key}`] = Number(obj[key]?.toString()?.replace(/,/g, ''));
//       }
//       if (key == 'no_of_bedrooms') {
//         obj[`${key}`] = Number(obj[key]);
//       }
//       if (key == 'fees') {
//         obj[`${key}`].map(item => {
//           Object.keys(item).forEach(key => {
//             if (item[key] === '' || item[key] === null) {
//               delete item[key];
//             }

//             if (
//               (key == 'amount' && item[`${key}`] == null) ||
//               item[`${key}`] == undefined ||
//               item[`${key}`] == ''
//             ) {
//               delete obj[`${'fees'}`];
//             } else if (key == 'amount') {
//               item[`${key}`] = item[key] && Number(item[key]?.toString()?.replace(/,/g, ''));
//             }
//             // }
//           });
//         });
//       }

//       if (key == 'payment_plan') {
//         if (obj[`${key}`].length === 1 && Object.keys(obj[`${key}`][0]).length === 0) {
//           delete obj[`${'payment_plan'}`];
//         } else {
//           obj[`${key}`]?.map((item, idx) => {
//             if (item == {} || !item?.initial_deposit_in_value) {
//               delete obj[`${'payment_plan'}`][idx];
//             }
//             Object.keys(item).forEach(key => {
//               if (
//                 key == 'initial_deposit_in_value' ||
//                 key == 'payment_period_in_months' ||
//                 key == 'periodic_payment'
//               ) {
//                 item[`${key}`] =
//                   item[key] && item[key]?.length > 0
//                     ? Number(item[key]?.toString()?.replace(/,/g, ''))
//                     : '';
//               }

//               if (obj['payment_plan']?.custom_payments?.[0]?.amount == '') {
//                 delete item['custom_payments'];
//               }
//               if (key == 'custom_payments') {
//                 item[key] &&
//                   item[key]?.length > 0 &&
//                   item[key].map(entry =>
//                     Object.keys(entry).forEach(key => {
//                       if (key == 'amount') {
//                         entry[`${key}`] =
//                           entry[key].length > 0
//                             ? Number(entry[key]?.toString()?.replace(/,/g, ''))
//                             : '';
//                       }
//                     })
//                   );
//               }
//               if (item[key] === '' || item[key] === null) {
//                 delete item[key];
//               }
//             });
//           });
//         }
//       }
//     })
//   );
// };

export const cleanUpEmptyValues = data => {
  data.forEach(item => {
    // Check if 'fees' is an array with a single empty object and set it to an empty array if true
    if (
      Array.isArray(item.fees) &&
      item.fees.length === 1 &&
      Object.keys(item.fees[0]).length === 0
    ) {
      item.fees = [];
    }

    // Check if 'payment_plan' is an array with a single null value and set it to an empty array if true
    if (
      Array.isArray(item.payment_plan) &&
      item.payment_plan.length === 1 &&
      item.payment_plan[0] === null
    ) {
      item.payment_plan = [];
    }
  });
  return data;
};

export const handleUnitsIntegerValues = arr => {
  // Filter the array to remove null or non-object elements
  const filteredArray = arr?.filter(obj => obj !== null && typeof obj === 'object');

  filteredArray?.forEach(obj => {
    // Changed from map to forEach as we're not transforming the array
    if (obj === null || typeof obj !== 'object') {
      console.warn('One or more elements in the array are not objects');
      return;
    }
    Object.keys(obj).forEach(key => {
      if (key === 'quantity' || key === 'no_of_bedrooms') {
        obj[key] = Number(obj[key]);
      }

      if (key === 'price') {
        obj[key] = Number(obj[key]?.toString()?.replace(/,/g, ''));
      }

      if (key === 'fees') {
        // Check if 'fees' is equal to '[{}]' and remove it if true
        if (JSON.stringify(obj[key]) === JSON.stringify([{}])) {
          delete obj[key];
        } else {
          obj[key].forEach(item => {
            Object.keys(item).forEach(itemKey => {
              if (!item[itemKey]) {
                delete item[itemKey];
              } else if (itemKey === 'amount') {
                item[itemKey] = Number(item[itemKey]?.toString()?.replace(/,/g, ''));
              }
            });
          });
        }
      }

      if (key === 'payment_plan') {
        if (obj[key].length === 1 && Object.keys(obj[key][0]).length === 0) {
          delete obj[key];
        } else {
          obj[key].forEach((item, idx) => {
            if (Object.keys(item).length === 0 || !item?.initial_deposit_in_value) {
              delete obj[key][idx];
            } else {
              Object.keys(item).forEach(itemKey => {
                if (
                  itemKey === 'initial_deposit_in_value' ||
                  itemKey === 'payment_period_in_months' ||
                  itemKey === 'periodic_payment'
                ) {
                  item[itemKey] =
                    item[itemKey] && item[itemKey]?.length > 0
                      ? Number(item[itemKey]?.toString()?.replace(/,/g, ''))
                      : '';
                }

                if (obj['payment_plan']?.custom_payments?.[0]?.amount === '') {
                  delete item['custom_payments'];
                }

                if (itemKey === 'custom_payments') {
                  item[itemKey]?.forEach(entry => {
                    Object.keys(entry).forEach(entryKey => {
                      if (entryKey === 'amount') {
                        entry[entryKey] =
                          entry[entryKey]?.length > 0
                            ? Number(entry[entryKey]?.toString()?.replace(/,/g, ''))
                            : '';
                      }
                    });
                  });
                }

                if (!item[itemKey]) {
                  delete item[itemKey];
                }
              });
            }
          });
        }
      }
    });
  });

  return filteredArray;
};

export const validateAndProcessPaymentPlanData = (dataArray, setBoolCheck) => {
  const validatedData = [];

  dataArray?.forEach((data, index) => {
    if (data.plan_type === 'custom') {
      delete data.periodic_payment;
      delete data.payment_frequency;
      data.custom_payments.map(entry =>
        Object.keys(entry).forEach(key => {
          if (key == 'amount' || key == 'period_in_months') {
            entry[`${key}`] =
              entry[key].length > 0 ? Number(entry[key]?.toString()?.replace(/,/g, '')) : '';
          }
        })
      );
    }
    // Step 1: Check if all fields are non-empty
    const emptyFieldKey = Object.keys(data).find(key => {
      const value = key !== 'periodic_payment' && data[key];
      return value === '' || value === null || value === 0;
    });

    const emptyCustomValues =
      data?.custom_payments?.[data?.custom_payments?.length - 1]?.period_in_months !== '' ||
      data?.custom_payments?.[data?.custom_payments.length - 1]?.amount !== '';

    // Step 2: Convert specific values to numbers
    Object.keys(data).forEach(key => {
      if (
        key === 'amount' ||
        key === 'initial_deposit_in_value' ||
        key === 'payment_period_in_months' ||
        key === 'periodic_payment' ||
        key === 'price'
      ) {
        // Check if data[key] is a string before using replace
        if (typeof data[key] === 'string') {
          // Convert "initial_deposit_in_value" to integer
          if (key === 'initial_deposit_in_value') {
            data[key] = parseInt(data[key].replace(/,/g, ''), 10);
          } else {
            // Convert other specified keys to numbers
            data[key] = Number(data[key].replace(/,/g, ''));
          }
        }
      }
    });

    // Step 3: Check if plan_type is "manual" and delete "custom_payments"
    if (data.plan_type === 'manual') {
      delete data.custom_payments;
    }

    // Step 4: Check if payment_frequency is "flexible" and delete "periodic_payment"
    if (data.payment_frequency === 'flexible') {
      delete data.periodic_payment;
    }

    if (emptyFieldKey == undefined || emptyCustomValues == undefined) {
      setBoolCheck(true);
    }
    // Add validated data to the result array
    validatedData.push(data);
  });

  return validatedData;
};

export const validateAndProcessFeesData = (dataArray, setBoolCheck) => {
  const validatedData = [];

  dataArray?.forEach((data, index) => {
    // Step 1: Check if all fields are non-empty
    const emptyFieldKey = Object.keys(data).find(key => {
      const value = key !== 'amount' && data[key];
      return value === '' || value === null || value === 0;
    });

    if (emptyFieldKey == undefined) {
      setBoolCheck(true);
    } else {
      setBoolCheck({
        status: false,
        desc: `Error in object at index ${index}: Empty, null, or 0 value found in key "${emptyFieldKey}".`,
      });
      return;
    }
    validatedData.push(data);
  });
  return validatedData;
};

export const convertNumberStringToInteger = numberString => {
  // Remove commas from the string
  const sanitizedString = Number(numberString?.toString()?.replace(/,/g, ''));

  return isNaN(sanitizedString) ? 0 : sanitizedString;
};
