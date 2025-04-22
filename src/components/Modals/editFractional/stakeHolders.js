import React, {useEffect} from 'react';
import trashIcon from '/src/images/icons/trashIcon.svg';
import {Field, FieldArray, FormikProvider} from 'formik';
import {
  Box,
  Button,
  HStack,
  Image,
  Input,
  SimpleGrid,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import InfoIcon from '@/components/assets/infoIcon';
import StakeHolders from '@/components/Drawers/stakeHolders';
import {PlusIcon} from '@/components/assets/PlusIcon';

export const Stakeholders = ({formik}) => {
  const stakeholdersModal = useDisclosure();

  const addStakeHolder = push => () => {
    push({
      name: '',
      type: '',
    });

    const lastIndex = formik.values.stakeholders.length - 1;
    const lastItem = document.getElementById(`stake-${lastIndex}`);
    if (lastItem) {
      lastItem.scrollIntoView({behavior: 'smooth'});
    }
  };

  return (
    <FormikProvider value={formik}>
      <FieldArray name={`stakeholders`}>
        {({remove, push}) => (
          <Box position="relative">
            <HStack justify="space-between" w="full" align="center" pr="8px">
              <HStack w="fit-content" onClick={stakeholdersModal.onOpen}>
                <Text fontSize={'21.9px'} color="#191919" fontWeight={400}>
                  Stakeholders
                </Text>
                <InfoIcon borderFillColor="#919191" />
              </HStack>
              <Button
                onClick={addStakeHolder(push)}
                bg="transparent"
                variant="md-outline-radius"
                _hover={{bg: 'transparent'}}
                _focus={{bg: 'transparent'}}
                _active={{bg: 'transparent'}}
                border="1.829px solid #3D3D3D"
                // borderRadius="10px"
                fontSize="16.46px"
                fontWeight="400"
                color="#3D3D3D"
                iconSpacing="5.56"
                px="12px"
                h="45.9px"
                leftIcon={<PlusIcon fillcolor="#3D3D3D" />}
              >
                Add
              </Button>
            </HStack>

            <>
              {formik.values.stakeholders.length > 0 &&
                formik.values.stakeholders.map((stakeHolder, index) => (
                  <Box key={index} id={`stake-${index}`} w="full" position="relative" pt="26px">
                    <SimpleGrid
                      justifyContent="space-between"
                      alignItems="center"
                      spacingY="10px"
                      columns={3}
                      className="row"
                      gridTemplateColumns="max-content max-content 24px"
                      key={index}
                    >
                      <Stack maxW="240px" spacing="6px">
                        <HStack cursor="pointer" w="fit-content">
                          <Text
                            as="label"
                            color="#191919"
                            fontSize="14px"
                            cursor="pointer"
                            fontWeight="400"
                            htmlFor={`stakeholders.${index}.type`}
                          >
                            {`Stakeholder type`}
                          </Text>
                          <InfoIcon borderFillColor="#919191" />
                        </HStack>

                        <Input
                          type="text"
                          placeholder="stakeholder type..."
                          _placeholder={{
                            fontSize: '12px',
                            fontWeight: '400',
                          }}
                          h="50px"
                          fontSize="12px"
                          w="240px"
                          fontWeight="400"
                          border="1px solid #E4E4E4"
                          borderRadius="8px"
                          name={`stakeholders.${index}.type`}
                          onChange={formik.handleChange}
                          value={stakeHolder.type}
                          _focusVisible={{
                            borderColor: '#e4e4e4',
                            boxShadow: 'none',
                          }}
                          _focus={{
                            borderColor: '#e4e4e4',
                            boxShadow: 'none',
                          }}
                          _active={{
                            borderColor: '#e4e4e4',
                            boxShadow: 'none',
                          }}
                        />
                      </Stack>
                      <Stack maxW="240px" spacing="6px">
                        <HStack cursor="pointer" w="fit-content">
                          <Text
                            as="label"
                            cursor="pointer"
                            color="#191919"
                            fontSize="14px"
                            fontWeight="400"
                            htmlFor={`stakeholders.${index}.name`}
                          >
                            Stakeholder name
                          </Text>
                          <InfoIcon borderFillColor="#919191" />
                        </HStack>

                        <Input
                          type="text"
                          placeholder="stakeholder name..."
                          _placeholder={{
                            fontSize: '12px',
                            fontWeight: '400',
                          }}
                          h="50px"
                          fontSize="12px"
                          w="240px"
                          fontWeight="400"
                          border="1px solid #E4E4E4"
                          borderRadius="8px"
                          name={`stakeholders.${index}.name`}
                          onChange={formik.handleChange}
                          value={stakeHolder.name}
                          _focusVisible={{
                            borderColor: '#e4e4e4',
                            boxShadow: 'none',
                          }}
                          _focus={{
                            borderColor: '#e4e4e4',
                            boxShadow: 'none',
                          }}
                          _active={{
                            borderColor: '#e4e4e4',
                            boxShadow: 'none',
                          }}
                        />
                      </Stack>
                      <Image
                        onClick={() => remove(index)}
                        cursor="pointer"
                        boxSize="24px"
                        src={trashIcon.src}
                        alt="trashIcon"
                      />
                    </SimpleGrid>
                  </Box>
                ))}
            </>

            <StakeHolders drawerModal={stakeholdersModal} />
          </Box>
        )}
      </FieldArray>
    </FormikProvider>
  );
};
export default Stakeholders;
