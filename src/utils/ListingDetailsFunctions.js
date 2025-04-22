import * as Yup from 'yup';

export const validateForm = (values, {...rest}) => {
  const errors = {};
  if (rest.files?.length <= 0 || !rest.files)
    errors.photos = 'You must upload a photo for this listing';
  if (values.building_type !== 'Land' && values.building_type !== 'Parcel of Land') {
    if (!values.status) errors.status = 'Please select a construction status for your listing';
    if (values.status !== 'Post Construction' && !rest.startYear) errors.start_year = 'Enter year';
    if (values.status !== 'Post Construction' && !rest.startPeriod)
      errors.start_period = 'Enter period';
    if (!rest.endYear) errors.end_year = 'Enter year';
    if (!rest.endPeriod) errors.end_period = 'Enter period';
  }
  return errors;
};

export const customFormSchema = Yup.object().shape({
  name: Yup.string().required('Please enter a name for your listing'),
  land_size: Yup.string().required('Please specify the land size of your listing'),
  // land_title: Yup.string().required('Please specify the land title of your listing'),
  landmark: Yup.string().required('Please provide a landmark for your listing'),
  longitude: Yup.string().required(`Please provide the longitude for this listing`),
  description: Yup.string().required('Please give this listing a description'),
  latitude: Yup.string().required(`Please provide the latitude for this listing`),
  // building_type: Yup.string().required('Please specify your property type'),
  // land_title: Yup.string().required('Please specify the title of your listing'),
  // address: Yup.string().required(`Please specify this listing's address`),
  // country: Yup.string().required('Please specify the country your listing is located in'),
  // youtube_url: Yup.string().required(`Please provide a youtube url for this listing`),
});
