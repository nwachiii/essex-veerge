import {DropDownComponent} from '@/components/Modals/send_offer/components/dropDown';
import {
  Box,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  SlideFade,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react';

import React from 'react';
import AssignTo from './assignTo';
import {formatDateString, formatTimeInput} from 'utils/formatDate';
import {useFetchAllListings} from 'ui-lib';

const AssignInspectionForm = ({customScrollbarStyles, setTimeZone, formik, roles}) => {
  const dropDownStyle = {
    menuList: {
      maxW: 'full',
      w: '330px',
      maxH: '400px',
      sx: customScrollbarStyles(),
    },

    btn: {
      w: 'full',
      h: '50px',
      pl: '17px',
      pr: '8.27px',
      borderRadius: '8px',
      fontSize: '12px',
      fontWeight: '400',
      border: '1px solid #E4E4E4',
    },
    wrapper: {
      spacing: '6px',
    },
  };
  const timePeriod = [
    {name: 'AM', value: 'am'},
    {name: 'PM', value: 'pm'},
  ];
  const inputStyle = {
    _focus: {boxShadow: 'none', borderColor: '#e4e4e4'},
    _focusVisible: {
      boxShadow: 'none',
      borderColor: '#e4e4e4',
    },
  };
  const inspectionTypeArray = [
    {
      name: 'In person',
      value: 'In-Person',
    },
    {
      name: 'Virtual',
      value: 'Video',
    },
  ];
  const displayDropDownDefaultName = (dropDownArray, valueOfdropDown) => {
    return dropDownArray.find(item => item.value === valueOfdropDown)?.name ?? '';
  };
  const {listingInfo} = useFetchAllListings();

  const handleDate = e => {
    const inputValue = e.target.value;
    const formattedDate = formatDateString(inputValue);

    formik.setFieldValue('date', formattedDate);
  };

  const handleTime = e => {
    const input = e.target.value;
    // Format the input as "hh:mm"
    const formattedTime = formatTimeInput(input);

    return formik.setFieldValue('time', formattedTime);
  };

  const handleListingSelection = (name, value) => {
    const selectedListing = listingInfo.find(listing => listing.id === value);
    formik.setValues({
      ...formik.values,
      listingName: selectedListing?.name ?? '',
      listingImg: selectedListing?.photo_urls?.[0],
      [name]: value,
    });
    setTimeZone(selectedListing?.timezone);
  };

  return (
    <Stack px="24px" pr="22px" spacing="16px" mt="24px">
      <DropDownComponent
        placeHolderText="Select"
        header="Select a listing"
        setFieldValue={handleListingSelection}
        fieldName={`project`}
        dropDownArray={listingInfo ? listingInfo?.map(item => ({...item, value: item.id})) : []}
        defaultDropName={displayDropDownDefaultName(
          listingInfo ? listingInfo.map(item => ({...item, value: item.id})) : [],
          formik.values.project
        )}
        dropDownValue={formik.values?.project}
        dropDownStyle={dropDownStyle}
        dropDownIconStyle={{boxSize: '24px'}}
      />
      <DropDownComponent
        placeHolderText="Select"
        header="Inspection Type"
        setFieldValue={formik.setFieldValue}
        fieldName={`type`}
        defaultDropName={displayDropDownDefaultName(inspectionTypeArray, formik.values.type)}
        dropDownArray={inspectionTypeArray}
        dropDownValue={formik.values?.type}
        dropDownStyle={dropDownStyle}
        dropDownIconStyle={{boxSize: '24px'}}
      />
      <HStack align="start" spacing="8px" w="full">
        <Stack spacing="5px" position="relative" maxW="175px">
          <Text as="label" fontSize="14px" color="#191919" fontWeight="400" htmlFor="dateText">
            Inspection Date
          </Text>
          <Input
            type="text"
            id="date"
            h="50px"
            w="full"
            name="date"
            borderRadius="8px"
            color="#191919"
            border="1px solid #E4E4E4"
            placeholder="DD/MM/YYYY"
            _placeholder={{
              fontSize: '14px',
              fontWeight: '400',
              color: '#919191',
            }}
            value={formik.values.date}
            onBlur={formik.handleBlur}
            onChange={handleDate}
            {...inputStyle}
          />
          <Box>
            <SlideFade in={formik.errors.date && formik.touched.date} offsetY="10px">
              <Text color="red" fontSize="10px" w="200px">
                {formik.errors.date}
              </Text>
            </SlideFade>
          </Box>
        </Stack>
        <Stack spacing="5px" position="relative">
          <Text as="label" fontSize="14px" color="#191919" fontWeight="400" htmlFor="timeext">
            Inspection Time
          </Text>
          <InputGroup h="50px" position="relative">
            <Input
              id="time"
              placeholder="HH:MM"
              _placeholder={{
                fontSize: '14px',
                fontWeight: '400px',
              }}
              type="text"
              h="full"
              w="full"
              name="time"
              borderRadius="8px"
              value={formik.values.time}
              onChange={handleTime}
              onBlur={formik.handleBlur}
              {...inputStyle}
            />
            <InputRightElement minW="fit-content" minH="50px" right="0px">
              <DropDownComponent
                setFieldValue={formik.setFieldValue}
                fieldName={`meridiem`}
                defaultDropName={displayDropDownDefaultName(timePeriod, formik.values.meridiem)}
                dropDownArray={timePeriod}
                dropDownValue={formik.values?.meridiem}
                dropDownStyle={{
                  btn: {
                    w: '60px',
                    h: '50px',
                    mt: '0px',
                    p: '0px',
                    pl: '5px',
                    borderLeftRadius: '0px',
                    borderRight: 'none',
                    borderTop: 'none',
                    borderBottom: 'none',
                  },

                  label: {
                    display: 'none',
                  },
                  menuList: {
                    w: '50px',
                    position: 'relative',
                    zIndex: 20000,
                    sx: customScrollbarStyles(),
                  },
                }}
                dropDownIconStyle={{boxSize: '24px'}}
                dropDownMenuStyle={{
                  flip: false,
                  placement: 'top-start',
                }}
              />
            </InputRightElement>
          </InputGroup>
          <Box>
            <SlideFade in={formik.errors.time && formik.touched.time} offsetY="10px">
              <Text color="red" fontSize="10px">
                {formik.errors.time}
              </Text>
            </SlideFade>
          </Box>
        </Stack>
      </HStack>
      <AssignTo roles={roles} formik={formik} />

      <Stack spacing="5px">
        <Text as="label" fontSize="14px" color="#191919" fontWeight="400" htmlFor="dateText">
          {'   Note (optional)'}
        </Text>
        <Textarea
          id="note"
          name="note"
          onChange={formik.handleChange}
          value={formik.values.note}
          color="#191919"
          _placeholder={{
            color: '#919191',
          }}
          _focus={{
            boxShadow: 'none',
            borderColor: '#e4e4e4',
          }}
          _focusVisible={{
            boxShadow: 'none',
            borderColor: '#e4e4e4',
          }}
          placeholder="Add note"
          fontSize="14px"
          fontWeight="400"
          resize="none"
          w="full"
          height="106px"
          border="1px solid #e4e4e4"
          bg="transparent"
        />
      </Stack>
    </Stack>
  );
};

export default AssignInspectionForm;
