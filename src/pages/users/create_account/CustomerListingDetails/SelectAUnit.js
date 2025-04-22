import {Image, Select, Spinner, Stack, Text} from '@chakra-ui/react';
import {ErrorMessage, Field} from 'formik';
import React from 'react';
import dropDownIcon from '/src/images/icons/dropDownForRoleSelection.svg';

export const SelectAUnit = ({
  index,
  isError,
  isLoading,
  listingBundles,
  setFieldValue,
  labelStyles,
  selectStyles,
}) => {
  const handleSelectComponent = e => {
    setFieldValue(`equities.${index}.bundle.id`, e.target.value);
    setFieldValue(`equities.${index}.bundle.allocation`, '');
    setFieldValue(`equities.${index}.bundle.deduct_from`, 'available');
  };
  return (
    <Stack spacing="11px" maxW="390px" w="full" justifySelf="end">
      <Text
        as="label"
        fontSize="14px"
        fontWeight="500"
        color="#3D3D3D"
        htmlFor={`equities.${index}.bundle.id`}
      >
        Pick a Unit
      </Text>

      <Field // className="formik__field"
        as={Select}
        border="1px solid #E4E4E4"
        icon={isLoading ? <Spinner /> : <Image src={dropDownIcon.src} alt="drop down icon" />}
        name={`equities.${index}.bundle.id`}
        onChange={handleSelectComponent}
        fontSize="14px"
        fontWeight="500"
        color="#3D3D3D"
        maxW="390px"
        disabled={!listingBundles?.length}
        w="full"
        h="34.888px"
        borderRadius="6.491px"
      >
        <option disabled value="">
          Choose a unit
        </option>

        {listingBundles &&
          listingBundles.map((unit, num) => (
            <option key={num} value={Number(`${unit.id}`)}>
              {unit.unit_title}
            </option>
          ))}
      </Field>
      <ErrorMessage
        name={`equities.${index}.bundle.id`}
        component="Stack"
        className="field-error"
      />
    </Stack>
  );
};

export default SelectAUnit;
