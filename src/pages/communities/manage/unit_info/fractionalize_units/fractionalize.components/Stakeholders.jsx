import React from 'react';
import {SmallCloseIcon} from '@chakra-ui/icons';
import {Field, FieldArray, Form, Formik} from 'formik';
import {Box, HStack, Icon, SimpleGrid, Stack, Text, useDisclosure} from '@chakra-ui/react';
import StakeHolders from '../../../../../../components/Drawers/stakeHolders';
import {AddMoreBtn} from 'ui-lib/ui-lib.components';
import InfoIcon from '@/components/assets/infoIcon';

export const Stakeholders = ({setStakeholders, props}) => {
  const stakeholdersModal = useDisclosure();

  return (
    <Box position="relative">
      <HStack onClick={stakeholdersModal.onOpen}>
        <Text fontSize={'21.9px'} color="#191919" fontWeight={400}>
          Stakeholders
        </Text>
        <InfoIcon borderFillColor="#919191" />
      </HStack>
      <Formik
        initialValues={{
          stakeholders: [
            {
              name: '',
              type: '',
            },
          ],
        }}
        onSubmit={async values => {
          await new Promise(r => setTimeout(r, 500));
        }}
      >
        {({values, isSubmitting, setFieldValue}) => (
          <Form>
            <FieldArray name={`stakeholders`}>
              {({insert, remove, push}) => (
                <>
                  <div>
                    {values.stakeholders.length > 0 &&
                      values.stakeholders.map((unit, index) => (
                        <Box key={index} w="full" position="relative" pt="26px">
                          <div className="col">
                            {!!index > 0 && (
                              <Icon
                                position="absolute"
                                right={-6}
                                onClick={() => remove(index)}
                                as={SmallCloseIcon}
                                cursor="pointer"
                                width="30px"
                                height="30px"
                                alt="cancel_icon"
                                color="red"
                              />
                            )}
                          </div>{' '}
                          <SimpleGrid spacing="26px" columns={2} className="row" key={index}>
                            <Stack spacing="none">
                              <HStack>
                                <Text
                                  as="label"
                                  color="#191919"
                                  fontSize="14px"
                                  fontWeight="400"
                                  htmlFor={`stakeholders.${index}.type`}
                                >
                                  {`Stakeholder type`}
                                </Text>
                              </HStack>

                              {/* <Field
                                as="select"
                                placeholder="stakeholder type..."
                                className="formik__field"
                                name={`stakeholders.${index}.type`}
                              >
                                <option disabled value={''}>
                                  Select stakeholder type...
                                </option>
                                <option value={'asset_management'}>Asset Management</option>
                                <option value={'property_management'}>Property Management</option>
                                <option value={'financial'}>Financial</option>
                                <option value={'legal'}>Legal</option>
                              </Field> */}
                              <Field
                                type="text"
                                placeholder="e.g., Financial institution"
                                className="formik__field"
                                name={`stakeholders.${index}.type`}
                                style={{height: '50px'}}
                              />
                            </Stack>
                            <Stack spacing="none">
                              <HStack>
                                <Text
                                  as="label"
                                  color="#191919"
                                  fontSize="14px"
                                  fontWeight="400"
                                  htmlFor={`stakeholders.${index}.name`}
                                >
                                  Stakeholder name
                                </Text>
                              </HStack>
                              <Field
                                type="text"
                                placeholder="e.g., Sterling bank"
                                className="formik__field"
                                name={`stakeholders.${index}.name`}
                                style={{height: '50px'}}
                              />
                            </Stack>
                          </SimpleGrid>
                        </Box>
                      ))}
                    {setStakeholders(values.stakeholders)}
                    <AddMoreBtn
                      top="0"
                      right={'0%'}
                      position="absolute"
                      btnText="Add stakeholders"
                      clickFunction={() =>
                        push({
                          name: '',
                          type: '',
                        })
                      }
                    />
                  </div>
                </>
              )}
            </FieldArray>
          </Form>
        )}
      </Formik>

      <StakeHolders drawerModal={stakeholdersModal} />
    </Box>
  );
};
export default Stakeholders;
