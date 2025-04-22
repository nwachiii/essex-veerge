import {Image, Select, Stack, Text} from '@chakra-ui/react';
import {Field} from 'formik';
import React, {useEffect} from 'react';
import dropDownIcon from '/src/images/icons/dropDownForRoleSelection.svg';

export const SelectAListting = ({
  listingInfo,
  index,
  val,
  eqty,
  setFieldValue,
  handleSelectProject,
  labelStyles,
  selectStyles,
}) => {
  useEffect(() => {
    handleSelectProject(eqty, val, index);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eqty]);

  const handleSelectComponent = e => {
    setFieldValue(`equities.${index}.project_id`, e.target.value);
    setFieldValue(`equities.${index}.bundle.id`, '');
    setFieldValue(`equities.${index}.bundle.allocation`, '');
    setFieldValue(`equities.${index}.bundle.deduct_from`, 'available');
  };
  return (
    <Stack spacing="11px">
      <Text
        as="label"
        fontSize="14px"
        fontWeight="500"
        color="#3D3D3D"
        htmlFor={`equities.${index}.project_id`}
      >
        Pick a listing
      </Text>
      <Field // className="formik__field"
        as={Select}
        border="1px solid #E4E4E4"
        icon={<Image src={dropDownIcon.src} alt="drop down icon" />}
        name={`equities.${index}.project_id`}
        onChange={handleSelectComponent}
        fontSize="14px"
        fontWeight="500"
        color="#3D3D3D"
        maxW="390px"
        w="full"
        h="34.888px"
        borderRadius="6.491px"
      >
        <option disabled value="">
          Choose a listing
        </option>
        {listingInfo &&
          listingInfo?.map((listing, i) => {
            return (
              <option name={listing.name} key={i} value={Number(`${listing.id}`)}>
                {listing.name}
              </option>
            );
          })}
      </Field>
    </Stack>
  );
};

export default SelectAListting;
