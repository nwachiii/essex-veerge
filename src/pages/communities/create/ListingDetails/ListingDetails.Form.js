import {useEffect, useMemo, useState} from 'react';
import {
  Box,
  Text,
  Flex,
  SimpleGrid,
  VStack,
  useDisclosure,
  HStack,
  InputGroup,
  InputLeftAddon,
  Stack,
} from '@chakra-ui/react';
import countryList from 'react-select-country-list';

import {Input, CustomSelect, CustomTextArea} from '../../../../ui-lib';
import {InputLabel} from '../../../../ui-lib/ui-lib.components/Input/Input';
import LongAndLat from '../../../../components/Drawers/longAndLat';
import YearSelect from './ListingDetails.components/YearSelect';
import PeriodSelect from './ListingDetails.components/PeriodSelect';
import {FormErrorWrapper} from '@/components/formComponents/FormErrorWrapper';
import {DocInputForUrl} from 'ui-lib/ui-lib.components';
import {UploadImagesWithURL} from 'ui-lib/ui-lib.components';
import imageIcon from '/src/images/icons/image-upload.png';
import {
  handleKeyDown,
  handlePaste,
  numberInputOnWheelPreventChange,
} from 'utils/numberInputsValidationProps';
import {PriceMenu} from '../WholeUnits/WholeUnits.Form';
import countries from 'constants/auth/country';

function ListingDetailsForm({
  formik,
  files,
  setFiles,
  reelFiles,
  docObj,
  setDocObj,
  setReelFiles,
  setEndYear,
  contractObj,
  setStartYear,
  setEndPeriod,
  setStartPeriod,
  setContractObj,
  propertyType,
  getListingImagesUrl,
  isFileUploadProgress,
  handleProjectBrochure,
  handleProjectOutrightContract,
}) {
  const [showStartDate, setStartDate] = useState(false);

  const removeFile = () => {
    setDocObj({});
  };
  const removeContractFile = () => {
    setContractObj({});
  };

  useEffect(() => {
    !(formik.values.status === 'Post Construction') ? setStartDate(true) : setStartDate(false);
  }, [formik.values.status]);

  const longAndLatModal = useDisclosure();

  const isBuildingTypeSingleFamilyResidential =
    propertyType == 'Detached' || propertyType == 'Semi Detached';
  const isLand = propertyType == 'Land';

  const formatLandSize = event => {
    const input = event.target.value || '';
    const name = event.target.name || '';
    let val = input;

    const cleanedString = val.replace(/[^\d]/g, '');

    val = Number(cleanedString.replace(/^0+(?=\d)/, ''));

    formik.setFieldValue(name, val);
  };

  //list of  timezones
  const timeZoneList = countries
    .flatMap(country => {
      return country.timezones;
    })
    .sort();
  return (
    <Box w="full">
      <SimpleGrid columns={2} spacing={'15px 61px'} w="full">
        <FormErrorWrapper
          ChildComponent={Input}
          mx={1}
          type="text"
          id="name"
          name="name"
          onChange={formik.handleChange}
          value={formik.values.name}
          placeholder="Listing name"
          _placeholder={{
            color: 'gray.300',
          }}
          error={!!formik.errors.name && !!formik.touched.name}
          onBlur={formik.handleBlur('name')}
          border={'1px solid #e4e4e4'}
        />
        <FormErrorWrapper
          ChildComponent={Input}
          mx={1}
          // required
          w="full"
          // type="number"
          min={0}
          id="land_size"
          name="land_size"
          onChange={formik.handleChange}
          value={formik.values.land_size}
          // onPaste={handlePaste}
          // onKeyDown={handleKeyDown}
          // onWheel={numberInputOnWheelPreventChange}
          // onChange={formatLandSize}
          // value={formatNumberWithCommas(formik?.values?.land_size)}
          placeholder="Land size"
          _placeholder={{
            color: 'gray.500',
          }}
          error={!!formik.errors.land_size && !!formik.touched.land_size}
          onBlur={formik.handleBlur('land_size')}
          border={'1px solid #e4e4e4'}
        />
        <FormErrorWrapper
          w="full"
          placeholder="Land title"
          _placeholder={{
            color: 'gray.500',
          }}
          id="land_title"
          name="land_title"
          label="Land title"
          ChildComponent={Input}
          onChange={formik.handleChange}
          value={formik.values.land_title}
          error={!!formik.errors.land_title && !!formik.touched.land_title}
          onBlur={formik.handleBlur('land_title')}
          border={'1px solid #e4e4e4'}
        />
        {/* <option value={''} disabled>
            Select a land title
          </option>
          <option value={3}>Deed</option>
          <option value={8}>Gazette</option>
          <option value={6}>Freehold</option>
          <option value={7}>Excision</option>
          <option value={4}>Deed of Assignment</option>
          <option value={2}>Right of Occupancy</option>
          <option value={9}>{`Governor's Consent`}</option>
          <option value={5}>Supreme Court Judgement</option>
          <option value={1}>Certificate of Occupancy</option>
          <option value={10}>Letter of Administration & Probate</option>
        </FormErrorWrapper> */}

        {/* This has now been replaced by <SelectPropertyType /> component */}
        {/* <FormErrorWrapper
          ChildComponent={CustomSelect}
          id="building_type"
          name="building_type"
          label="Property type"
          onChange={formik.handleChange}
          value={propertyType}
          _placeholder={{
            color: 'gray',
            cursor: 'not-allowed',
          }}
          error={formik.errors.building_type}
          border={'1px solid #e4e4e4'}
        >
          <option value={''} disabled>
            Select a property type
          </option>

          <option value={'Mall'}>Mall</option>
          <option value={'Land'}>Land</option>
          <option value={'Estate'}>Estate</option>
          <option value={'Terraces'}>Terraces</option>
          <option value={'Detached'}>Detached</option>
          <option value={'Mixed Use'}>Mixed-Use</option>
          <option value={'Semi Detached'}>Semi-detached</option>
          <option value={'Parcel of Land'}>Parcel of Land</option>
          <option value={'Apartment Complex'}>Apartment Complex</option>
        </FormErrorWrapper> */}

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
            _placeholder={{
              color: 'gray.500',
            }}
            error={!!formik.errors.no_of_bedrooms && !!formik.touched.no_of_bedrooms}
            onBlur={formik.handleBlur('no_of_bedrooms')}
            border={'1px solid #e4e4e4'}
          />
        )}
        {(isBuildingTypeSingleFamilyResidential || isLand) && (
          <Stack my={2}>
            <Text as="label" fontSize={'14px'} fontWeight={500} pl={2}>
              Outright price
            </Text>
            <InputGroup>
              <InputLeftAddon h="55px">
                {/* <NairaIcon fillForNairaSvgIcon="#191919" /> */}
                <PriceMenu
                  styleForIcon={{transform: 'scale(1)'}}
                  fillForNairaSvgIcon="#191919"
                  disableMenu
                />
              </InputLeftAddon>
              <FormErrorWrapper
                ChildComponent={Input}
                noLabel
                min={0}
                w="full"
                id="price"
                name="price"
                type="number"
                placeholder="0.00"
                _placeholder={{
                  color: 'gray.500',
                }}
                onPaste={handlePaste}
                onKeyDown={handleKeyDown}
                borderRadius="0 10px 10px 0"
                border={'1px solid #e4e4e4'}
                value={formik.values?.price?.toString()}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur('price')}
                onWheel={numberInputOnWheelPreventChange}
                error={!!formik.errors.price && !!formik.touched.price}
              />
            </InputGroup>
          </Stack>
        )}

        {(isBuildingTypeSingleFamilyResidential || isLand) && (
          <Box>
            <InputLabel label="Upload outright contract" />
            <DocInputForUrl
              component={
                <Input
                  id="file"
                  noLabel
                  w="full"
                  type="file"
                  h="fit-content"
                  borderRadius="14px"
                  name={`outright_contract`}
                  placeholder="Upload outright contract"
                  className="file__inputField file_Style"
                  onChange={e => handleProjectOutrightContract(e)}
                  accept="application/pdf"
                  autocapitalize="characters"
                />
              }
              docObj={contractObj}
              removeFile={removeContractFile}
              isFileUploadProgress={isFileUploadProgress}
            />
          </Box>
        )}

        {/* <VStack align="stretch" mt={3} w="full">
          <InputLabel mb={'2px'} pl="7px" fontSize="14px" as="label" label="Select a country" /> */}
        {/* <Select
            id="country"
            type="select"
            name="country"
            options={options}
            placeholder="Select a Country"
            styles={customSelectStyles}
            defaultValue={formik.values.country}
          /> */}
        {/* <FormErrorWrapper
            ChildComponent={CustomSelect}
            noLabel
            as="select"
            id="country"
            name="country"
            // placeholder={'Select country'}
            onChange={formik.handleChange}
            value={formik.values.country}
            error={formik.errors.country}
            border={'1px solid #e4e4e4'}
          >
            <option value={''} disabled>
              Select a country
            </option>
            <option value={1}>Nigeria</option>
            <option value={5}>Canada</option>
            <option value={6}>United Kingdom</option>
            <option value={7}>United States of America</option>
          </FormErrorWrapper>
        </VStack> */}
        <Box w="full">
          <FormErrorWrapper
            mx={1}
            w="full"
            type="text"
            id="address"
            name="address"
            placeholder="Address"
            ChildComponent={Input}
            border={'1px solid #e4e4e4'}
            onChange={formik.handleChange}
            value={formik.values.address}
            onBlur={formik.handleBlur('address')}
            _placeholder={{
              color: 'gray.500',
            }}
            error={!!formik.errors.address && !!formik.touched.address}
          />
        </Box>
        {/* <VStack my={3}>
          <FormErrorWrapper
            ChildComponent={CustomSelect}
            label="Time-zone"
            id="listing_timezone"
            name="listing_timezone"
            onChange={formik.handleChange}
            value={formik.values.listing_timezone}
            error={!!formik.errors.listing_timezone && !!formik.touched.listing_timezone}
            onBlur={formik.handleBlur('listing_timezone')}
            border={'1px solid #e4e4e4'}
          >
            <option value={''} disabled>
              Select time zone
            </option>

            {timeZoneList &&
              timeZoneList?.map((timezone, i) => {
                return (
                  <option name={timezone} key={i} value={timezone}>
                    {timezone}
                  </option>
                );
              })}
          </FormErrorWrapper>
        </VStack> */}
        {propertyType !== 'Land' && propertyType !== 'Parcel of Land' && (
          <VStack my={3}>
            <FormErrorWrapper
              ChildComponent={CustomSelect}
              label="Construction status"
              id="status"
              name="status"
              onChange={formik.handleChange}
              value={formik.values.status}
              error={!!formik.errors.status && !!formik.touched.status}
              onBlur={formik.handleBlur('status')}
              border={'1px solid #e4e4e4'}
            >
              <option value={''} disabled>
                Choose construction status
              </option>

              <option value={'Pre Construction'}>Pre-construction</option>
              <option value={'In Construction'}>In-construction</option>
              <option value={'Post Construction'}>Completed</option>
            </FormErrorWrapper>
          </VStack>
        )}

        {formik.values.status !== '' &&
        propertyType !== 'Land' &&
        propertyType !== 'Parcel of Land' ? (
          <Flex justify="space-between" w="full" gap="20px" mt="3px">
            {showStartDate ? (
              <Box pos={'relative'} mt={4}>
                <Text ml={1} mb={2} fontWeight={'600'} fontSize="14px">
                  Start date
                </Text>

                <HStack gap="10px">
                  <FormErrorWrapper
                    ChildComponent={PeriodSelect}
                    setPeriod={setStartPeriod}
                    objectKey={'start_period'}
                    error={!!formik.errors.start_period && !!formik.touched.start_period}
                    onBlur={formik.handleBlur('start_period')}
                    border={'1px solid #e4e4e4'}
                  />
                  <FormErrorWrapper
                    ChildComponent={YearSelect}
                    formik={formik}
                    setYear={setStartYear}
                    objectKey={'start_year'}
                    border={'1px solid #e4e4e4'}
                    error={!!formik.errors.start_year && !!formik.touched.start_year}
                    onBlur={formik.handleBlur('start_year')}
                    constructionStatus={formik.values.status}
                  />
                </HStack>
              </Box>
            ) : null}
            <Box pos={'relative'} my={4}>
              <Text ml={1} mb={2} fontWeight={'600'} fontSize="14px">
                {!showStartDate ? 'Period & Year built' : 'End date'}
              </Text>

              <HStack gap="10px" align={'center'}>
                <FormErrorWrapper
                  ChildComponent={PeriodSelect}
                  setPeriod={setEndPeriod}
                  objectKey={'end_period'}
                  error={!!formik.errors.end_period && !!formik.touched.end_period}
                  onBlur={formik.handleBlur('end_period')}
                  border={'1px solid #e4e4e4'}
                />
                <FormErrorWrapper
                  ChildComponent={YearSelect}
                  constructionStatus={formik.values.status}
                  formik={formik}
                  objectKey={'end_year'}
                  setYear={setEndYear}
                  error={!!formik.errors.end_year && !!formik.touched.end_year}
                  onBlur={formik.handleBlur('end_year')}
                  border={'1px solid #e4e4e4'}
                />
              </HStack>
            </Box>
          </Flex>
        ) : null}

        <Box mt={3}>
          <FormErrorWrapper
            mx={1}
            type="text"
            id="landmark"
            name="landmark"
            ChildComponent={Input}
            border={'1px solid #e4e4e4'}
            onChange={formik.handleChange}
            value={formik.values.landmark}
            onBlur={formik.handleBlur('landmark')}
            placeholder="Location landmark (e.g, Dallas, Texas)"
            _placeholder={{
              color: 'gray.500',
            }}
            error={!!formik.errors.landmark && !!formik.touched.landmark}
          />
        </Box>
        <Box position={'relative'}>
          <Box
            top="7px"
            zIndex={10}
            left="80px"
            cursor={'pointer'}
            position={'absolute'}
            onClick={longAndLatModal.onOpen}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="17"
              viewBox="0 0 16 17"
              fill="none"
            >
              <path
                d="M8.00065 15.6663C4.04732 15.6663 0.833984 12.453 0.833984 8.49967C0.833984 4.54634 4.04732 1.33301 8.00065 1.33301C11.954 1.33301 15.1673 4.54634 15.1673 8.49967C15.1673 12.453 11.954 15.6663 8.00065 15.6663ZM8.00065 2.33301C4.60065 2.33301 1.83398 5.09967 1.83398 8.49967C1.83398 11.8997 4.60065 14.6663 8.00065 14.6663C11.4007 14.6663 14.1673 11.8997 14.1673 8.49967C14.1673 5.09967 11.4007 2.33301 8.00065 2.33301Z"
                fill="#292D32"
              />
              <path
                d="M8 9.66634C7.72667 9.66634 7.5 9.43967 7.5 9.16634V5.83301C7.5 5.55967 7.72667 5.33301 8 5.33301C8.27333 5.33301 8.5 5.55967 8.5 5.83301V9.16634C8.5 9.43967 8.27333 9.66634 8 9.66634Z"
                fill="#292D32"
              />
              <path
                d="M8.00065 11.8329C7.91398 11.8329 7.82732 11.8129 7.74732 11.7796C7.66732 11.7463 7.59398 11.6996 7.52732 11.6396C7.46732 11.5729 7.42065 11.5063 7.38732 11.4196C7.35398 11.3396 7.33398 11.2529 7.33398 11.1663C7.33398 11.0796 7.35398 10.9929 7.38732 10.9129C7.42065 10.8329 7.46732 10.7596 7.52732 10.6929C7.59398 10.6329 7.66732 10.5863 7.74732 10.5529C7.90732 10.4863 8.09398 10.4863 8.25398 10.5529C8.33398 10.5863 8.40732 10.6329 8.47398 10.6929C8.53398 10.7596 8.58065 10.8329 8.61398 10.9129C8.64732 10.9929 8.66732 11.0796 8.66732 11.1663C8.66732 11.2529 8.64732 11.3396 8.61398 11.4196C8.58065 11.5063 8.53398 11.5729 8.47398 11.6396C8.40732 11.6996 8.33398 11.7463 8.25398 11.7796C8.17398 11.8129 8.08732 11.8329 8.00065 11.8329Z"
                fill="#292D32"
              />
            </svg>
          </Box>
          <FormErrorWrapper
            mx={1}
            type="text"
            id="latitude"
            name="latitude"
            label="Latitude"
            ChildComponent={Input}
            border={'1px solid #e4e4e4'}
            onChange={formik.handleChange}
            value={formik.values.latitude}
            onBlur={formik.handleBlur('latitude')}
            placeholder="visit https://www.latlong.net/ to generate the latititude"
            _placeholder={{
              color: 'gray.500',
            }}
            error={!!formik.errors.latitude && !!formik.touched.latitude}
          />
        </Box>
        <Box position={'relative'}>
          <Box
            position={'absolute'}
            left="80px"
            top="7px"
            onClick={longAndLatModal.onOpen}
            cursor={'pointer'}
            zIndex={10}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="17"
              viewBox="0 0 16 17"
              fill="none"
            >
              <path
                d="M8.00065 15.6663C4.04732 15.6663 0.833984 12.453 0.833984 8.49967C0.833984 4.54634 4.04732 1.33301 8.00065 1.33301C11.954 1.33301 15.1673 4.54634 15.1673 8.49967C15.1673 12.453 11.954 15.6663 8.00065 15.6663ZM8.00065 2.33301C4.60065 2.33301 1.83398 5.09967 1.83398 8.49967C1.83398 11.8997 4.60065 14.6663 8.00065 14.6663C11.4007 14.6663 14.1673 11.8997 14.1673 8.49967C14.1673 5.09967 11.4007 2.33301 8.00065 2.33301Z"
                fill="#292D32"
              />
              <path
                d="M8 9.66634C7.72667 9.66634 7.5 9.43967 7.5 9.16634V5.83301C7.5 5.55967 7.72667 5.33301 8 5.33301C8.27333 5.33301 8.5 5.55967 8.5 5.83301V9.16634C8.5 9.43967 8.27333 9.66634 8 9.66634Z"
                fill="#292D32"
              />
              <path
                d="M8.00065 11.8329C7.91398 11.8329 7.82732 11.8129 7.74732 11.7796C7.66732 11.7463 7.59398 11.6996 7.52732 11.6396C7.46732 11.5729 7.42065 11.5063 7.38732 11.4196C7.35398 11.3396 7.33398 11.2529 7.33398 11.1663C7.33398 11.0796 7.35398 10.9929 7.38732 10.9129C7.42065 10.8329 7.46732 10.7596 7.52732 10.6929C7.59398 10.6329 7.66732 10.5863 7.74732 10.5529C7.90732 10.4863 8.09398 10.4863 8.25398 10.5529C8.33398 10.5863 8.40732 10.6329 8.47398 10.6929C8.53398 10.7596 8.58065 10.8329 8.61398 10.9129C8.64732 10.9929 8.66732 11.0796 8.66732 11.1663C8.66732 11.2529 8.64732 11.3396 8.61398 11.4196C8.58065 11.5063 8.53398 11.5729 8.47398 11.6396C8.40732 11.6996 8.33398 11.7463 8.25398 11.7796C8.17398 11.8129 8.08732 11.8329 8.00065 11.8329Z"
                fill="#292D32"
              />
            </svg>
          </Box>
          <FormErrorWrapper
            ChildComponent={Input}
            mx={1}
            // required
            type="text"
            id="longitude"
            name="longitude"
            label="Longitude"
            onChange={formik.handleChange}
            value={formik.values.longitude}
            placeholder="visit https://www.latlong.net/ to generate the longitude"
            _placeholder={{
              color: 'gray.500',
            }}
            error={!!formik.errors.longitude && !!formik.touched.longitude}
            onBlur={formik.handleBlur('longitude')}
            border={'1px solid #e4e4e4'}
          />
        </Box>

        <FormErrorWrapper
          ChildComponent={Input}
          mx={1}
          type="url"
          id="youtube_url"
          name="youtube_url"
          onChange={formik.handleChange}
          value={formik.values.youtube_url}
          placeholder="Youtube url (optional)"
          _placeholder={{
            color: 'gray.500',
          }}
          error={formik.errors.youtube_url && !!formik.touched.youtube_url}
          onBlur={formik.handleBlur('youtube_url')}
          border={'1px solid #e4e4e4'}
        />
        {/* {isBuildingTypeSingleFamilyResidential || isLand ? null : ( */}
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
                  name={`document_url`}
                  accept="application/pdf"
                  placeholder="Project brochure"
                  className="file__inputField file_Style"
                  onChange={e => handleProjectBrochure(e)}
                  autocapitalize="characters"
                />
              }
              removeFile={removeFile}
              docObj={docObj}
              isFileUploadProgress={isFileUploadProgress}
            />
          </Box>
        {/* )} */}
      </SimpleGrid>
      <FormErrorWrapper
        ChildComponent={CustomTextArea}
        mx={1}
        mb={10}
        rows={5}
        type="textarea"
        id="description"
        name="description"
        label="Listing description"
        onChange={formik.handleChange}
        value={formik.values.description}
        placeholder="How would you best describe this listing ?"
        _placeholder={{
          color: 'gray.500',
        }}
        error={formik.errors.description && !!formik.touched.description}
        onBlur={formik.handleBlur('description')}
        border={'1px solid #e4e4e4'}
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
        files={files}
        setFiles={setFiles}
        reelFiles={reelFiles}
        maxSize={10 * 1024 * 1024}
        setReelFiles={setReelFiles}
        error={!!formik.errors.photos && !!formik.touched.photos}
        border={'1.5px solid #E5E5E5'}
        ChildComponent={UploadImagesWithURL}
        title={`You can easily add images to your listing by uploading them or simply dragging & dropping. Please note that the maximum number of images allowed is 10`}
        icon={imageIcon.src}
        getListingImagesUrl={getListingImagesUrl}
      />
      <Box py="28px" />
      <LongAndLat drawerModal={longAndLatModal} />
    </Box>
  );
}

export default ListingDetailsForm;
