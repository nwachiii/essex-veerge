import {useEffect, useState} from 'react';
import {useFormik} from 'formik';
import {
  Box,
  Button,
  DrawerCloseButton,
  DrawerContent,
  Flex,
  HStack,
  Image,
  Input,
  InputGroup,
  Spinner,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import backIcon from '/src/images/icons/backArrowForDrawer.svg';
import DocInput from 'ui-lib/ui-lib.components/Input/DocInput';
import {encodeFileToBase64} from '../../../utils';
import {formatNumberWithCommas} from 'utils/formatAmount';
import {useMutation} from '@tanstack/react-query';
import {sendBase64ForUrl} from 'apis/listings';
import {PriceMenu} from 'pages/customers/create/WholeUnits/WholeUnits.Form';

export const EditUnitPriceDrawer = ({
  unitInfo,
  handleMainScreen,
  setEditedUnitPrice,
  handlePendingTransactions,
  pendingEquities,
  mutation,
  doc,
  setDoc,
  equityRefresh,
}) => {
  const isBuildingTypeSingleFamilyResidential =
    unitInfo?.building_type == 'Detached' || unitInfo?.building_type == 'Semi Detached';
  const agreement = unitInfo?.property_document[0]?.document_file;
  const toast = useToast();
  const initialObj = agreement?.split('/').pop();
  const [docObj, setDocObj] = useState({
    name: initialObj ? initialObj : '',
  });

  const getDocumentUrl = useMutation(payload => sendBase64ForUrl(payload), {
    onSuccess: res => {
      setDoc([res?.data?.data?.[0]]);
    },
    onError: () => {
      toast({
        description: `Error fetching the document URL`,
        duration: 3000,
        position: 'top-right',
      });
      removeFile();
    },
  });
  const handleContractUpload = async event => {
    const file = event?.currentTarget?.files[0];
    if (file) {
      const base64String = await encodeFileToBase64(file);
      getDocumentUrl.mutate({files: [base64String], pdf: true});
      setDocObj(file);
    }
  };

  const formik = useFormik({
    initialValues: {...unitInfo},
    onSubmit: values => {
      // Only send the data that was edited to the server
      const {price, starting_from, property_document} = {
        ...values,
      };
      if (pendingEquities.length > 0) {
        handlePendingTransactions();
      } else {
        mutation?.mutate({
          price: isBuildingTypeSingleFamilyResidential ? starting_from : price,
          docs: doc ? doc[0] : '',
        });
      }
    },
  });

  const unitPrice = isBuildingTypeSingleFamilyResidential
    ? formik?.values?.starting_from
    : formik?.values?.price;
  const eventName = isBuildingTypeSingleFamilyResidential ? 'starting_from' : 'price';
  useEffect(() => {
    setEditedUnitPrice(unitPrice);
  }, [unitPrice, setEditedUnitPrice]);

  useEffect(() => {
    setTimeout(() => {
      refetch();
    }, 2500);
  }, []);

  const removeFile = () => {
    setDoc('');
    setDocObj({});
  };

  const handleAmount = (event, name) => {
    const input = event.target.value || '';
    let val = input;

    const cleanedString = val.replace(/[^\d]/g, '');

    val = cleanedString.replace(/^0+(?=\d)/, '');

    const length = val.length;

    if (length === 0) {
      val = '0.00';
    } else if (length === 1) {
      val = '0.0' + val;
    } else if (length === 2) {
      val = '0.' + val.padStart(2, '0');
    } else {
      const integerPart = val.slice(0, length - 2);
      const decimalPart = val.slice(-2);
      val = integerPart + '.' + decimalPart;
    }

    formik.setFieldValue(name, val);
  };

  const isDisabled =
    docObj?.name === initialObj ||
    docObj?.name === undefined ||
    docObj?.name === '' ||
    getDocumentUrl.isLoading;

  return (
    <>
      <DrawerContent position="relative" zIndex={100} mt="65.12px" minW="410px" bg="#fff">
        <HStack
          py="12px"
          px="29px"
          bg="#F5F5F5"
          align="center"
          position="relative"
          justify="space-between"
          boxShadow="0px 4px 8px 0px rgba(0, 0, 0, 0.02)"
        >
          <HStack>
            <Image
              alt="back icon"
              cursor="pointer"
              src={backIcon.src}
              onClick={() => handleMainScreen('options')}
            />
            <Text fontSize="20px" fontWeight={600} color="#191919">
              Modify Price
            </Text>
          </HStack>

          <HStack spacing="15px">
            <VStack
              position="relative"
              justify="center"
              align="center"
              w="30px"
              h="30px"
              borderRadius="5px"
              transition="0.3s ease-in-out"
              _hover={{
                width: '30px',
                height: '30px',
              }}
            >
              <DrawerCloseButton right="0px" left="0px" my="auto" color="#000" top="0" bottom="0" />
            </VStack>
          </HStack>
        </HStack>
        <Box as="form" onSubmit={formik?.handleSubmit}>
          <VStack w="full" align="flex-start" px="8" mt="5">
            <label style={{fontSize: '12px', fontWeight: 550}}>Update Outright Price</label>
            <InputGroup border="1px solid #E9E9E9" borderRadius={'10px'}>
              <Flex alignItems="center" w="50px" justifyContent="center">
                <PriceMenu disableMenu fillForNairaSvgIcon="#12D8A0" />
              </Flex>
              <Input
                mx={1}
                label=""
                required
                type="text"
                id="price"
                name="price"
                fontSize="20px"
                h={'44px'}
                color="#191919"
                border="none"
                pl="-3"
                _focus={{outline: 'none', border: 'none', boxShadow: 'none'}}
                value={formatNumberWithCommas(
                  formik?.values?.starting_from || formik?.values?.price,
                  {minimumFractionDigits: 2, maximumFractionDigits: 2}
                )}
                onChange={event => handleAmount(event, eventName)}
              />
            </InputGroup>
          </VStack>
          <VStack align="flex-start" w="full" px="8" mt="5">
            <label style={{fontSize: '12px', fontWeight: 550}}>Update Purchase Agreement</label>
            <DocInput
              component={
                <Input
                  id="file"
                  type="file"
                  onChange={e => handleContractUpload(e)}
                  className="file__inputField file_Style-black"
                  maxW="450px"
                  w="full"
                  mt="2px"
                  h="54px"
                  borderRadius="12px"
                  accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/pdf"
                  autocapitalize="characters"
                />
              }
              removeFile={removeFile}
              docObj={docObj ? docObj : {}}
              loading={getDocumentUrl.isLoading}
            />
          </VStack>
          <Flex justifyContent="center" mt="12" px="8">
            <Button
              py={4}
              w="full"
              bg="#191919"
              type="submit"
              color="#FFFFFF"
              h="45.5px"
              cursor={'pointer'}
              textAlign={'center'}
              borderRadius={'full'}
              fontWeight={400}
              _hover={{
                background: '',
              }}
              isDisabled={isDisabled}
            >
              {mutation?.isLoading ? <Spinner /> : 'Proceed'}
            </Button>
          </Flex>
        </Box>
      </DrawerContent>
    </>
  );
};

export default EditUnitPriceDrawer;
