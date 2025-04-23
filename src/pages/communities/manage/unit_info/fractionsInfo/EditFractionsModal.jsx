import {
  Alert,
  AlertIcon,
  Box,
  Checkbox,
  Flex,
  Image,
  SimpleGrid,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import {useMutation} from '@tanstack/react-query';
import {Formik} from 'formik';
import React, {useState} from 'react';
import {Button, Popup} from '../../../../../ui-lib/ui-lib.components';
import {createFractions} from '../../../../../apis/listings';
import allianzLogo from '/src/images/brand/allianz-logo 1.svg';
import Stakeholders from '../fractionalize_units/fractionalize.components/Stakeholders';

export const EditFractionsModal = ({editFractions}) => {
  const toast = useToast();
  const [isInsurance, setIsInsurance] = useState(true);
  const [stakeholders, setStakeholders] = useState([]);
  const mutation = useMutation(formData => createFractions(formData), {
    onSuccess: res => {
      // console.log('response', res);
      editFractions.onClose();
    },
    onError: err => {
      console.log(err);
      toast({
        title: 'An error occured',
        status: 'error',
        duration: 8000,
        isClosable: true,
        position: 'top-right',
      });
    },
  });

  return (
    <div>
      <Popup
        overflowY="auto"
        size="full"
        mt="85px"
        pb="65px"
        minW={{base: '90%', md: '60%'}}
        color="#191919"
        isOpen={editFractions.isOpen}
        onClose={editFractions.onClose}
      >
        <Text px="32px" fontSize="24px" fontWeight={600}>
          Edit Fractionalization
        </Text>
        <Popup.Body h="auto">
          <Stack w="full" px="32px" direction={{base: 'column'}} spacing="27px">
            <Formik
              initialValues={{
                action: 'create',
                packets: [],
                stakeholders: [
                  {
                    name: '',
                    type: '',
                  },
                ],
                holding_period: 20,
                dividend_amount: 0,
                enable_dividend: false,
                allow_insurance: false,
                strategy: 'buy_for_hold',
                deal_structure: 'equity',
              }}
              onSubmit={values => {
                const body = {
                  ...values,
                  // packets: investorsPacket,
                  stakeholders: stakeholders,
                  // enable_dividend: enableDividend,
                  allow_insurance: isInsurance,
                  // bundle: fractionDetail?.bundle,
                  // quantity: fractionDetail?.quantity,
                  // price_per_fraction: fractionDetail?.price_per_fraction,
                };
                mutation.mutate(body);
              }}
            >
              {props => (
                <form onSubmit={props.handleSubmit}>
                  <SimpleGrid pb={3} w="full" columns={2} spacing={10}>
                    <Checkbox
                      onChange={e => setIsInsurance(e.target.checked)}
                      fontSize={'12px'}
                      size="lg"
                      colorScheme="blue"
                      isChecked={isInsurance}
                    >
                      Still want Insurance? <br /> <Image alt="" src={allianzLogo.src} /> <br />
                      {isInsurance && (
                        <Alert status="info" borderRadius={'14px'}>
                          <AlertIcon />
                          💃 Insured with one of the best! 🚀
                        </Alert>
                      )}
                    </Checkbox>
                    {/* <Checkbox onChange={(e) => setEnableDividend(e.target.checked)} size='lg' colorScheme='green' isChecked={enableDividend}>
											Enable Dividend
										</Checkbox> */}
                  </SimpleGrid>
                  {/* {enableDividend && <EnableDividend props={props} />} */}

                  {/* <UploadInvestorsPacket values={props} setInvestorsPacket={setInvestorsPacket} />
									<Text pt={3} px={3} fontSize={'14px'} fontStyle='italic' color={'red'}>
										Only PDF files are allowed
									</Text> */}
                  <Stakeholders props={props} setStakeholders={setStakeholders} />
                  <Flex pt="60px" justify={'flex-end'} w="full">
                    <Button type="submit" variant="dark">
                      Submit
                    </Button>
                  </Flex>
                </form>
              )}
            </Formik>
          </Stack>
        </Popup.Body>
      </Popup>
    </div>
  );
};
export default EditFractionsModal;
