import {useEffect, useState} from 'react';
import {Box, Text, Flex, SimpleGrid, VStack, HStack, useDisclosure} from '@chakra-ui/react';
import imageIcon from '/src/images/icons/image-upload.png';

import {Input, CustomSelect, CustomTextArea} from '../../../../ui-lib';
import {InputLabel} from '../../../../ui-lib/ui-lib.components/Input/Input';

import LongAndLat from '../../../../components/Drawers/longAndLat';
import PeriodSelect from 'pages/communities/create/ListingDetails/ListingDetails.components/PeriodSelect';
import YearSelect from 'pages/communities/create/ListingDetails/ListingDetails.components/YearSelect';
import {FormErrorWrapper} from '@/components/formComponents/FormErrorWrapper';
import {DocInputForUrl} from 'ui-lib/ui-lib.components/Input';
import {UploadImagesWithURL} from 'ui-lib/ui-lib.components/MultipleFilesUpload/UploadImagesWithURL';
import {
  handleKeyDown,
  handlePaste,
  numberInputOnWheelPreventChange,
} from 'utils/numberInputsValidationProps';
import {formatNumberWithCommas} from 'utils/formatAmount';

function ListingDetailsForm({
  formik,
  files,
  setFiles,
  docObj,
  endYear,
  endPeriod,
  startYear,
  setDocObj,
  setEndYear,
  startPeriod,
  setStartYear,
  setEndPeriod,
  setStartPeriod,
  handleEditImages,
  isFileUploadProgress,
  handleProjectBrochure,
  getListingImagesUrl,
  setContractObj,
}) {
  const [showStartDate, setStartDate] = useState(false);

  useEffect(() => {
    !(formik?.values?.status === 'Post Construction') ? setStartDate(true) : setStartDate(false);
  }, [formik?.values?.status]);

  const longAndLatModal = useDisclosure();

  const removeFile = () => {
    setDocObj({});
  };
  const removeContractFile = () => {
    setContractObj({});
  };
  const isBuildingTypeSingleFamilyResidential =
    formik.values.building_type == 'Detached' || formik.values.building_type == 'Semi Detached';

  const formatLandSize = event => {
    const input = event.target.value || '';
    const name = event.target.name || '';
    let val = input;

    const cleanedString = val.replace(/[^\d]/g, '');

    val = cleanedString.replace(/^0+(?=\d)/, '');

    formik.setFieldValue(name, val);
  };

  return (
    <Box>
      <SimpleGrid columns={2} spacing={'15px 61px'} w="full">
        <Input
          mx={1}
          required
          type="text"
          id="name"
          name="name"
          onChange={formik?.handleChange}
          value={formik?.values?.name}
          placeholder="Listing name"
          _placeholder={{color: 'gray.500'}}
        />
        <Input
          mx={1}
          required
          type="text"
          id="land_size"
          name="land_size"
          onChange={formik?.handleChange}
          value={formik?.values?.land_size}
          // onChange={formatLandSize}
          // value={formatNumberWithCommas(formik?.values?.land_size)}
          placeholder="Land size"
          _placeholder={{color: 'gray.500'}}
        />
        <VStack align="stretch" mt={3} w="full">
          <FormErrorWrapper
            w="full"
            placeholder="Land title"
            _placeholder={{color: 'gray.500'}}
            id="land_title"
            name="land_title"
            label="Land title"
            ChildComponent={Input}
            onChange={formik?.handleChange}
            value={formik?.values?.land_title}
            error={formik?.errors.land_title}
            border={'1px solid #e4e4e4'}
          />
          {/* <InputLabel mb={'2px'} pl="7px" fontSize="14px" as="label" label="Select land title" /> */}
          {/* <CustomSelect
            as="select"
            id="land_title"
            noLabel
            name="land_title"
            placeholder={formik?.values?.land_title?.name || 'Select land title'}
            onChange={formik.handleChange}
            value={formik.values?.land_title}
          >
            <option value={''} disabled>
              Select a land title
            </option>
            <option value={1}>Certificate of Occupancy</option>
            <option value={2}>Right of Occupancy</option>
            <option value={3}>Deed</option>
            <option value={4}>Deed of Assignment</option>
            <option value={5}>Supreme Court Judgement</option>
            <option value={6}>Freehold</option>
            <option value={7}>Excision</option>
            <option value={8}>Gazette</option>
            <option value={9}>{`Governor's Consent`}</option>
            <option value={10}>Letter of Administration & Probate</option>
          </CustomSelect> */}
        </VStack>

        {/* <VStack align="stretch" mt={3} w="full">
          <InputLabel mb={'2px'} pl="7px" fontSize="14px" as="label" label="Select a country" />
          <CustomSelect
            noLabel
            as="select"
            id="country"
            name="country"
            placeholder={formik?.values?.country?.name || 'Select country'}
            onChange={formik?.handleChange}
            value={formik?.values?.country?.name || formik?.values?.country}
          >
            <option value={''} disabled>
              Select a country
            </option>
            <option value={1}>Nigeria</option>
            <option value={5}>Canada</option>
            <option value={6}>United Kingdom</option>
            <option value={7}>United States of America</option>
          </CustomSelect>
        </VStack> */}
        {isBuildingTypeSingleFamilyResidential ? null : (
          <CustomSelect
            id="building_type"
            name="building_type"
            label="Property type"
            onChange={formik?.handleChange}
            value={formik?.values?.building_type}
            placeholder={formik?.values?.building_type || 'Property type:'}
            _placeholder={{color: 'gray', cursor: 'not-allowed'}}
          >
            <option value={''} disabled>
              Select a property type
            </option>
            <option value={'Mall'}>Mall</option>
            <option value={'Estate'}>Estate</option>
            <option value={'Terraces'}>Terraces</option>
            <option value={'Apartment Complex'}>Apartment Complex</option>
            {/* <option value={'Semi Detached'}>Semi-detached</option> */}
            {/* <option value={'Detached'}>Detached</option> */}
            <option value={'Mixed-Use'}>Mixed-Use</option>
            {/* <option value={'Land'}>Land</option> */}
            <option value={'Parcel of Land'}>Parcel of Land</option>
          </CustomSelect>
        )}

        {isBuildingTypeSingleFamilyResidential && (
          <FormErrorWrapper
            ChildComponent={Input}
            mx={1}
            min={0}
            w="full"
            type="number"
            id="no_of_bedrooms"
            name="no_of_bedrooms"
            onPaste={handlePaste}
            onKeyDown={handleKeyDown}
            onChange={formik.handleChange}
            onWheel={numberInputOnWheelPreventChange}
            value={formik.values.no_of_bedrooms}
            placeholder="Number of bedrooms"
            _placeholder={{color: 'gray.500'}}
            error={formik.errors.no_of_bedrooms}
            border={'1px solid #e4e4e4'}
          />
        )}

        <Box mt={isBuildingTypeSingleFamilyResidential ? '' : 3} w="full">
          <Input
            mx={1}
            w="full"
            type="text"
            id="address"
            name="address"
            placeholder="Address"
            onChange={formik?.handleChange}
            value={formik.values?.address}
            _placeholder={{color: 'gray.500'}}
          />
        </Box>
        {formik?.values?.building_type !== 'Land' &&
        formik?.values?.building_type !== 'Parcel of Land' ? (
          <VStack my={3}>
            <CustomSelect
              label="Construction status"
              id="status"
              name="status"
              onChange={formik?.handleChange}
              value={formik?.values?.status}
            >
              <option value={''} disabled>
                Choose construction status
              </option>

              <option value={'Pre Construction'}>Pre-construction</option>
              <option value={'In Construction'}>In-construction</option>
              <option value={'Post Construction'}>Completed</option>
            </CustomSelect>
          </VStack>
        ) : null}

        {formik?.values?.status !== '' &&
        formik?.values?.building_type !== 'Land' &&
        formik?.values?.building_type !== 'Parcel of Land' ? (
          <Flex justify="space-between" w="full" gap="20px" mt="3px">
            {showStartDate ? (
              <Box pos={'relative'} mt={4}>
                <Text ml={1} mb={2} fontWeight={'600'} fontSize="14px">
                  Start date
                </Text>

                <HStack gap="10px">
                  <PeriodSelect
                    setPeriod={setStartPeriod}
                    objectKey={'start_period'}
                    placeholder={startPeriod}
                  />
                  <YearSelect
                    formik={formik}
                    objectKey={'start_year'}
                    setYear={setStartYear}
                    placeholder={startYear}
                    constructionStatus={formik?.values?.status}
                  />
                </HStack>
              </Box>
            ) : null}
            <Box pos={'relative'} my={4}>
              <Text ml={1} mb={2} fontWeight={'600'} fontSize="14px">
                {!showStartDate ? 'Period & Year built' : 'End date'}
              </Text>

              <HStack gap="10px" align={'center'}>
                <PeriodSelect
                  setPeriod={setEndPeriod}
                  objectKey={'end_period'}
                  placeholder={endPeriod}
                />
                <YearSelect
                  constructionStatus={formik?.values?.status}
                  formik={formik}
                  placeholder={endYear}
                  objectKey={'end_year'}
                  setYear={setEndYear}
                />
              </HStack>
            </Box>
          </Flex>
        ) : null}

        <Box mt={2}>
          <Input
            mx={1}
            required
            type="text"
            id="landmark"
            name="landmark"
            onChange={formik?.handleChange}
            value={formik?.values?.landmark}
            placeholder="Location landmark (e.g, Lekki, Lagos)"
            _placeholder={{color: 'gray.500'}}
          />
        </Box>
        <Box mt={1}>
          <Input
            onLabelClick={longAndLatModal.onOpen}
            mx={1}
            required
            type="text"
            id="longitude"
            name="longitude"
            label="Longitude"
            onChange={formik?.handleChange}
            value={formik?.values?.longitude}
            placeholder="visit https://www.latlong.net/ to generate the longitude"
            _placeholder={{color: 'gray.500'}}
          />
        </Box>

        <Input
          onLabelClick={longAndLatModal.onOpen}
          mx={1}
          required
          type="text"
          id="latitude"
          name="latitude"
          label="Latitude"
          onChange={formik?.handleChange}
          value={formik?.values?.latitude}
          placeholder="visit https://www.latlong.net/ to generate the latititude"
          _placeholder={{color: 'gray.500'}}
        />
        <Input
          mx={1}
          type="url"
          id="youtube_url"
          name="youtube_url"
          onChange={formik?.handleChange}
          value={formik?.values?.youtube_url}
          placeholder="Youtube url (optional)"
          _placeholder={{color: 'gray.500'}}
        />
        <Box>
          <InputLabel label="Project brochure" />
          <DocInputForUrl
            component={
              <Input
                id="file"
                noLabel
                w="full"
                type="file"
                h="fit-content"
                borderRadius="14px"
                placeholder="Project brochure"
                onChange={e => handleProjectBrochure(e)}
                className="file__inputField file_Style"
                name={`property_document.${0}.document_url`}
                accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/pdf"
                autocapitalize="characters"
              />
            }
            docObj={docObj}
            removeFile={removeFile}
            isFileUploadProgress={isFileUploadProgress}
          />
        </Box>
      </SimpleGrid>
      <CustomTextArea
        mx={1}
        mb={10}
        required
        type="textarea"
        rows={5}
        id="description"
        name="description"
        label="Listing description"
        onChange={formik?.handleChange}
        value={formik?.values?.description}
        placeholder="How would you best describe this listing?"
        _placeholder={{color: 'gray.500'}}
      />
      <Text
        color="#191919"
        textStyle="p"
        textAlign="left"
        opacity={0.9}
        w="100%"
        fontWeight={'600'}
        mb={-3}
      >
        Upload listing images
      </Text>
      <FormErrorWrapper
        ChildComponent={UploadImagesWithURL}
        files={files}
        setFiles={setFiles}
        maxSize={10 * 1024 * 1024}
        error={formik.errors.photo_urls}
        border={'1.5px solid #E5E5E5'}
        title={`You can easily add images to your listing by uploading them or simply dragging & dropping. Please note that the maximum number of images allowed is 10`}
        icon={imageIcon.src}
        type="image/*"
        handleEditImages={handleEditImages}
        getListingImagesUrl={getListingImagesUrl}
      />
      <Box py="28px" />
      <LongAndLat drawerModal={longAndLatModal} />
    </Box>
  );
}

export default ListingDetailsForm;
