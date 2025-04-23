import {useFormik} from 'formik';
import {useEffect, useState} from 'react';
import {useMutation} from '@tanstack/react-query';
import {Box, Container, Stack, Text, useToast} from '@chakra-ui/react';

import {MATADOR_CREATE_LISTING_INFO} from '../../../../constants/createListing';
import CreateListingFooter from './ListingDetails.Footer';
import ListingDetailsForm from './ListingDetails.Form';
import {encodeFileToBase64} from 'utils';
import {initializeProject, initializeProjectWithBundle, sendBase64ForUrl} from 'apis/listings';
import {customFormSchema, validateForm} from '../../../../utils/ListingDetailsFunctions';
import {NeedHelpForListings} from './ListingDetails.components/NeedHelpComponentForListings';
import SelectPropertyType from '../SelectPropertyType';

export const ListingDetails = ({
  subPages,
  handleProgress,
  setSFH,
  isSFH,
  propertyType,
  setPropertyType,
}) => {
  const toast = useToast();
  const [files, setFiles] = useState([]);
  const [endYear, setEndYear] = useState('');
  const [endPeriod, setEndPeriod] = useState('');
  const [startYear, setStartYear] = useState('');
  const [reelFiles, setReelFiles] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [startPeriod, setStartPeriod] = useState('');
  // const [projectBrochure, setProjeectBrochure] = useState(''); NOTE: Now deprecated -> Replaced with brochureDocumentUrl
  const [brochureDocumentUrl, setBrochureDocumentUrl] = useState('');
  const [contractUrl, setContractUrl] = useState(null);
  const [docObj, setDocObj] = useState({name: ''});
  const [contractObj, setContractObj] = useState({name: ''});

  const isBuildingTypeSFHandLand =
    propertyType == 'Detached' || propertyType == 'Semi Detached' || propertyType == 'Land';

  const getDocumentUrl = useMutation(payload => sendBase64ForUrl(payload), {
    onSuccess: res => {
      setBrochureDocumentUrl(res?.data?.data?.[0]);
    },
    onError: err => {
      console.log(err);
      setDocObj({});
    },
  });
  const getContractUrl = useMutation(payload => sendBase64ForUrl(payload), {
    onSuccess: res => {
      setContractUrl(res?.data?.data?.[0]);
    },
    onError: err => {
      console.log(err);
      setContractUrl({});
    },
  });

  const getListingImagesUrl = useMutation(payload => sendBase64ForUrl(payload), {
    onSuccess: res => {
      setImageUrls(res?.data?.data);
    },
    onError: err => {
      console.log(err);
      setFiles([]);
    },
  });

  const user = loggedinUserStatic;

  const handleProjectBrochure = async event => {
    const file = event.currentTarget.files[0];
    setDocObj(file);
    const base64String = await encodeFileToBase64(file);
    getDocumentUrl.mutate({files: [base64String], pdf: true});
  };
  const handleProjectOutrightContract = async event => {
    const file = event.currentTarget.files[0];
    setContractObj(file);
    const base64String = await encodeFileToBase64(file);
    getContractUrl.mutate({files: [base64String], pdf: true});
  };

  const CONSTRUCTION_PERIOD = {
    start_period: startPeriod,
    start_year: startYear,
    end_period: endPeriod,
    end_year: endYear,
  };

  const mutation = useMutation(
    formData => {
      // console.log('createListing', formData);
      return isBuildingTypeSFHandLand
        ? initializeProjectWithBundle(formData)
        : initializeProject(formData);
    },
    {
      onSuccess: res => {
        setTimeout(() => {
          Boolean(isSFH) ? handleProgress(val => val + 2) : handleProgress(val => val + 1);
        }, 2300);
        toast({
          duration: 3000,
          status: 'success',
          isClosable: true,
          position: 'top-right',
          title: `Saved Successfully`,
        });
        localStorage.setItem('newProjectId', JSON.stringify(res.data.project.id));
        localStorage.setItem('listingInfo', JSON.stringify(res.data.project));
      },
      onError: err => {
        console.log(err);
        toast({
          title: `Error`,
          description: err?.response?.data?.message || 'Something went Wrong',
          status: 'error',
          duration: 8000,
          isClosable: true,
          position: 'top-right',
        });
      },
    }
  );

  const formik = useFormik({
    initialValues: MATADOR_CREATE_LISTING_INFO,
    onSubmit: values => {
      const {no_of_bedrooms, price, ...projectDataValues} = values;
      const LISTING_NAME =
        values?.name.charAt(0).toUpperCase() + values?.name.toLowerCase().slice(1);
      if (!isBuildingTypeSFHandLand) {
        setContractUrl(null);
      }
      return user?.initial_status == 'Accepted'
        ? isBuildingTypeSFHandLand
          ? mutation.mutate({
              project: {
                ...projectDataValues,
                name: LISTING_NAME,
                photo_urls: imageUrls,
                building_type: propertyType,
                ...CONSTRUCTION_PERIOD,
                document_url: brochureDocumentUrl || null,
              },
              is_unit: true,
              bundle: {
                price: price,
                unit_title: LISTING_NAME,
                no_of_bedrooms: no_of_bedrooms,
                outright_contract: contractUrl,
              },
            })
          : mutation.mutate({
              ...projectDataValues,
              name: LISTING_NAME,
              photo_urls: imageUrls,
              ...CONSTRUCTION_PERIOD,
              building_type: propertyType,
              document_url: brochureDocumentUrl || null,
            })
        : alert(
            'Your developer account is yet to be verified, kindly contact support for more enquiry'
          );
    },
    validateOnBlur: true,
    validateOnChange: true,
    validationSchema: customFormSchema,
    validate: values =>
      validateForm(
        {...values, building_type: propertyType},
        {files, startYear, startPeriod, endYear, endPeriod}
      ),
  });

  const isDisabled =
    getListingImagesUrl?.isLoading ||
    getListingImagesUrl?.isError ||
    getDocumentUrl?.isLoading ||
    // getDocumentUrl?.isError ||
    getContractUrl?.isLoading ||
    getContractUrl?.isError;
  //|| !docObj?.name?.length;

  useEffect(() => {
    const isBuildingTypeSFHandLand =
      propertyType == 'Detached' || propertyType == 'Semi Detached' || propertyType == 'Land';

    Boolean(isBuildingTypeSFHandLand) ? setSFH(true) : setSFH(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [propertyType]);

  return (
    <Box mx={'auto'}>
      {propertyType ? (
        <Container
          p="12"
          maxW={'7xl'}
          boxShadow="0px 4px 8px rgba(0, 0, 0, 0.02)"
          color="gray.900"
          borderRadius="2xl"
          background="#FFFFFF"
          border={'1px solid #E9E9E9'}
        >
          <Box as="form" onSubmit={formik.handleSubmit}>
            <ListingDetailsForm
              formik={formik}
              files={files}
              docObj={docObj}
              endYear={endYear}
              setFiles={setFiles}
              reelFiles={reelFiles}
              startYear={startYear}
              endPeriod={endPeriod}
              setDocObj={setDocObj}
              contractObj={contractObj}
              setEndYear={setEndYear}
              propertyType={propertyType}
              startPeriod={startPeriod}
              setStartYear={setStartYear}
              setEndPeriod={setEndPeriod}
              setReelFiles={setReelFiles}
              setContractObj={setContractObj}
              setStartPeriod={setStartPeriod}
              getListingImagesUrl={getListingImagesUrl}
              handleProjectBrochure={handleProjectBrochure}
              handleProjectOutrightContract={handleProjectOutrightContract}
              isFileUploadProgress={getDocumentUrl?.isLoading || getContractUrl?.isLoading}
            />
            <CreateListingFooter
              noDiscard
              formik={formik}
              mutation={mutation}
              subPages={subPages}
              isDisabled={isDisabled}
            />
          </Box>
        </Container>
      ) : (
        <SelectPropertyType propertyType={propertyType} setPropertyType={setPropertyType} />
      )}
      <NeedHelpForListings />
    </Box>
  );
};
export default ListingDetails;
