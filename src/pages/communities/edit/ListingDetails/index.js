import {useFormik} from 'formik';
import {useEffect, useState} from 'react';
import {useMutation, useQuery} from '@tanstack/react-query';
import {Box, Container, Flex, Spinner} from '@chakra-ui/react';

import ListingDetailsForm from './ListingDetails.Form';
import {
  EditProject,
  EditProjectWithBundle,
  fetchAllBundlePaymentPlan,
  sendBase64ForUrl,
} from '../../../../apis/listings';
import {encodeFileToBase64, truncateLongText} from '../../../../utils';
import {Button} from '../../../../ui-lib';
import {useRouter} from 'next/router';
import { loggedinUserStatic } from 'apis/requests';

export const ListingDetails = ({subPages, defaultData, handleProgress}) => {
  const isBuildingTypeSingleFamilyResidential =
    defaultData?.building_type == 'Detached' || defaultData?.building_type == 'Semi Detached';
  const BUNDLE_IN_LISTING_QUERY = useQuery(
    ['units', Number(defaultData?.unit_id)],
    () => fetchAllBundlePaymentPlan(Number(defaultData?.unit_id)),
    {enabled: !!(defaultData?.unit_id ? true : false)}
  );

  const UNIT_INFO =
    BUNDLE_IN_LISTING_QUERY && BUNDLE_IN_LISTING_QUERY?.data?.data?.results?.[0]?.bundle;
  const BUNDLE_IN_PROJECT = !UNIT_INFO
    ? null
    : {
        no_of_bedrooms: UNIT_INFO?.no_of_bedrooms,
        outright_contract: UNIT_INFO?.property_document?.[0]?.document_file,
      };
  const DOCUMENT_FILE = defaultData?.property_document?.find(
    item => item?.purpose === 'brochure'
  )?.document_url;

  const [reelFiles, setReelFiles] = useState([]);
  const [oldPhotos, setOldPhotos] = useState([]);
  const [newPhotos, setNewPhotos] = useState([]);
  const [contractUrl, setContractUrl] = useState(null);
  const [brochureDocumentUrl, setBrochureDocumentUrl] = useState([]);
  const [projectBrochureName, setProjectBrochureName] = useState(
    DOCUMENT_FILE ? truncateLongText(DOCUMENT_FILE, 39)?.truncatedText : ''
  );
  const [startPeriod, setStartPeriod] = useState(defaultData?.start_period || '');
  const [docObj, setDocObj] = useState({
    name: DOCUMENT_FILE ? truncateLongText(DOCUMENT_FILE, 39)?.truncatedText : '',
  });
  const [endPeriod, setEndPeriod] = useState(defaultData?.end_period || '');
  const [startYear, setStartYear] = useState(defaultData?.start_year || '');
  const [endYear, setEndYear] = useState(defaultData?.end_year || '');
  const [files, setFiles] = useState(
    (defaultData?.photo_urls ?? defaultData?.photos)?.map(item => item?.photo ?? item)
  );

  const [contractObj, setContractObj] = useState({
    name: BUNDLE_IN_PROJECT
      ? truncateLongText(BUNDLE_IN_PROJECT?.outright_contract, 39)?.truncatedText
      : '',
  });

  const mutation = useMutation(
    ({amenities, ...rest}) =>
      !!(BUNDLE_IN_PROJECT && isBuildingTypeSingleFamilyResidential)
        ? EditProjectWithBundle(defaultData?.id, {
            ...rest,
            land_title: rest.land_title,
          })
        : EditProject(defaultData?.id, {
            ...rest,
            land_title: rest.land_title,
          }),
    {
      onSuccess: res => {
        setTimeout(() => {
          handleProgress(val => val + 1);
        }, 2300);
        localStorage.setItem('newProjectId', JSON.stringify(res.data.project.id));
        localStorage.setItem('listingInfo', JSON.stringify(res.data.project));
      },
      onError: err => {
        console.log(err);
      },
    }
  );

  const getListingImagesUrl = useMutation(payload => sendBase64ForUrl(payload), {
    onSuccess: res => {
      // console.log('LISTING_IMAGES_URL_RESPONSE', res);
      setNewPhotos(res?.data?.data);
    },
    onError: err => {
      console.log(err);
      setFiles([]);
    },
  });

  const getDocumentUrl = useMutation(payload => sendBase64ForUrl(payload), {
    onSuccess: res => {
      // console.log('DOCUMENT_URL_RESPONSE', res);
      setBrochureDocumentUrl(res?.data?.data?.[0]);
    },
    onError: err => {
      console.log(err);
      setDocObj({});
      setProjectBrochureName({});
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

  const user = loggedinUserStatic;

  const CONSTRUCTION_PERIOD = {
    start_period: startPeriod,
    start_year: startYear,
    end_period: endPeriod,
    end_year: endYear,
  };

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

  const formik = useFormik({
    initialValues: {...defaultData, ...BUNDLE_IN_PROJECT},
    onSubmit: values => {
      // const COUNTRY = values?.country || defaultData?.country?.name;
      const LISTING_NAME =
        values?.name.charAt(0).toUpperCase() + values?.name.toLowerCase().slice(1);
      const {photos, no_of_bedrooms, property_document, ...rest} = values;

      if (!isBuildingTypeSingleFamilyResidential) {
        setContractUrl(null);
      }
      user?.initial_status == 'Accepted'
        ? isBuildingTypeSingleFamilyResidential
          ? mutation.mutate({
              project: {
                ...rest,
                name: LISTING_NAME,
                photo_urls: [...newPhotos, ...oldPhotos],
                ...CONSTRUCTION_PERIOD,
                document_url: brochureDocumentUrl,
                // country: typeof COUNTRY !== 'string' ? COUNTRY?.id : COUNTRY,
                contact_persons: values.contact_persons?.map(item => item?.id),
              },
              is_unit: true,
              edit: true,
              bundle: {
                // price:price,
                unit_title: LISTING_NAME,
                no_of_bedrooms: no_of_bedrooms,
                outright_contract: contractUrl ?? BUNDLE_IN_PROJECT?.outright_contract,
              },
            })
          : mutation.mutate({
              ...rest,
              ...CONSTRUCTION_PERIOD,
              document_url: brochureDocumentUrl,
              photo_urls: [...newPhotos, ...oldPhotos],
              // country: typeof COUNTRY !== 'string' ? COUNTRY?.id : COUNTRY,
              contact_persons: values.contact_persons?.map(item => item?.id),
            })
        : alert(
            'Your developer account is yet to be verified, kindly contact support for more enquiry'
          );
    },
  });

  const handleEditImages = () => {
    setOldPhotos(files?.filter(item => formik?.values?.photo_urls?.includes(item)));
    setNewPhotos(files?.filter(item => !formik?.values?.photo_urls?.includes(item)));
  };

  const isInputFieldsValid =
    !formik?.values?.land_title ||
    getListingImagesUrl?.isLoading ||
    getListingImagesUrl?.isError ||
    getDocumentUrl?.isLoading ||
    getDocumentUrl?.isError;

  useEffect(() => {
    handleEditImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files]);

  return (
    <Box pb={8}>
      <Container
        p="12"
        maxW={'7xl'}
        border={'1px solid #E4E4E4'}
        color="gray.900"
        borderRadius="2xl"
        background="#FFFFFF"
      >
        <Box as="form" onSubmit={formik.handleSubmit}>
          <ListingDetailsForm
            files={files}
            formik={formik}
            endYear={endYear}
            docObj={docObj}
            setFiles={setFiles}
            startYear={startYear}
            endPeriod={endPeriod}
            reelFiles={reelFiles}
            setDocObj={setDocObj}
            setEndYear={setEndYear}
            startPeriod={startPeriod}
            setStartYear={setStartYear}
            setEndPeriod={setEndPeriod}
            setReelFiles={setReelFiles}
            setStartPeriod={setStartPeriod}
            getDocumentUrl={getDocumentUrl}
            handleEditImages={handleEditImages}
            getListingImagesUrl={getListingImagesUrl}
            projectBrochureName={projectBrochureName}
            contractObj={contractObj}
            setContractObj={setContractObj}
            handleProjectOutrightContract={handleProjectOutrightContract}
            handleProjectBrochure={handleProjectBrochure}
            setProjectBrochureName={setProjectBrochureName}
            isFileUploadProgress={getDocumentUrl?.isLoading}
          />
          <Flex w="full" justify={'flex-end'} mt={4}>
            <Button
              isDisabled={isInputFieldsValid}
              type="submit"
              mt={0}
              h="55px"
              w="202px"
              variant="primary"
              rounded="full"
              fontWeight={400}
            >
              {mutation?.isLoading ? <Spinner color="#FFFFFF" /> : 'Proceed'}
            </Button>
          </Flex>
        </Box>
      </Container>
    </Box>
  );
};

export default ListingDetails;
