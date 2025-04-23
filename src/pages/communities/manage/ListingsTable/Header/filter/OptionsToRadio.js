import React, {useEffect, useState} from 'react';
import check from '/src/images/icons/check_listing_filter.svg';
import {
  Box,
  HStack,
  chakra,
  Image,
  Text,
  useCheckbox,
  useCheckboxGroup,
  VStack,
  Heading,
  SimpleGrid,
} from '@chakra-ui/react';

const CheckboxGroup = ({name, values, setCheckboxValues}) => {
  const {getCheckboxProps, getLabelProps} = useCheckboxGroup({
    name,
    defaultValue: [],
    onChange: values => {
      let keyName = name;
      if (name === 'Construction Level') {
        keyName = 'status[]';
      } else if (name === 'Listing Type') {
        keyName = 'building_type[]';
      }

      if (name === 'Listing Status') {
        let newValues = values.reduce((acc, curr) => {
          let modifiedCurr = curr.toLowerCase().replace(/ /g, '_');
          return {...acc, [modifiedCurr]: true};
        }, {});

        setCheckboxValues(prev => {
          let updatedValues = {...prev};
          Object.keys(prev).forEach(key => {
            if (!values.includes(key) && prev[key] === true) {
              delete updatedValues[key];
            }
          });
          return {...updatedValues, ...newValues};
        });
      } else {
        let modifiedValues = values.map(value => {
          if (value === 'Flat/Apartment') {
            return 'Apartment Complex';
          }
          return value;
        });
        setCheckboxValues(prev => ({...prev, [keyName]: modifiedValues}));
      }
    },
  });

  return {getCheckboxProps, getLabelProps};
};

const OptionsToRadio = ({constants, options, setOption, name}) => {
  const [checkboxValues, setCheckboxValues] = useState({});

  useEffect(() => {
    setOption(checkboxValues);
  }, [checkboxValues, setOption]);

  return (
    <VStack spacing="14px" w="full" pb="13px">
      {Object.entries(constants).map(([name, values], index) => {
        const {getCheckboxProps} = CheckboxGroup({name, values, setCheckboxValues});
        return (
          <VStack key={index} w="full" align="flex-start" spacing="none" columns={3}>
            <Heading mb="10px" alignSelf={'flex-start'} fontSize="14px" fontWeight="600">
              {name.replace('_', ' ')}
            </Heading>
            <HStack>
              <SimpleGrid gap="5.4px" columns={3}>
                {values.map((option, index) => (
                  <CustomCheckbox
                    key={index}
                    option={option}
                    getCheckboxProps={() => getCheckboxProps({value: option.name})}
                  />
                ))}
              </SimpleGrid>
            </HStack>
          </VStack>
        );
      })}
    </VStack>
  );
};

export default OptionsToRadio;

function CustomCheckbox(props) {
  const {option, getCheckboxProps} = props;
  const {state, getInputProps, getLabelProps, htmlProps} = useCheckbox(getCheckboxProps());
  return (
    <chakra.label {...htmlProps} {...getLabelProps()} cursor="pointer">
      <input {...getInputProps()} hidden />
      <Box p="5px" borderRadius="8.12px" h="61px" w="113px" bg="#F5F5F5">
        <VStack spacing="12px" align="flex-start">
          <Image alt="" ml="9px" src={option.image} />
          <HStack justify="space-between" spacing="none" w="full">
            <Text as="span" fontSize="9.47px" color="#3D3D3D" fontWeight="400">
              {option.name}
            </Text>
            <HStack
              border="1px solid #CBCBCB"
              borderRadius="full"
              p="1px"
              bg="transparent"
              justify="center"
            >
              <Image alt="check icon" opacity={state.isChecked ? 1 : 0} src={check.src} />
            </HStack>
          </HStack>
        </VStack>
      </Box>
    </chakra.label>
  );
}
