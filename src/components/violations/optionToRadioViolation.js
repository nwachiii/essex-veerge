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
  StackDivider,
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

const OptionToRadioViolation = ({constants, options, setOption, name, ...styled}) => {
  const [checkboxValues, setCheckboxValues] = useState({});

  useEffect(() => {
    setOption(checkboxValues);
  }, [checkboxValues, setOption]);

  return (
    <VStack
      w="full"
      divider={<StackDivider border="none" h="0.68px" bg="#f4f4f5" />}
      spacing="16px"
    >
      {Object.entries(constants).map(([name, values], index) => {
        const {getCheckboxProps} = CheckboxGroup({name, values, setCheckboxValues});
        return (
          <VStack key={index} w="full" spacing="6px" align="flex-start" columns={3}>
            <Heading fontSize="13px" fontWeight="500" color="#3F3F46" textTransform="capitalize">
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

export default OptionToRadioViolation;

function CustomCheckbox(props) {
  const {option, getCheckboxProps} = props;
  const {state, getInputProps, getLabelProps, htmlProps} = useCheckbox(getCheckboxProps());
  return (
    <chakra.label {...htmlProps} {...getLabelProps()} cursor="pointer">
      <input {...getInputProps()} hidden />
      <Box
        p="6px"
        borderRadius="8.12px"
        h="61px"
        border="0.5px solid #e4e4e7"
        w="113px"
        bg="#fafafa"
      >
        <VStack spacing="12px" align="flex-start">
          <HStack justify="space-between" spacing="none" w="full">
            {option.icon || <Image alt="" src={option.image} />}
            <HStack
              border="1px solid #CBCBCB"
              borderRadius="full"
              p="1px"
              bg="transparent"
              boxSize="12px"
              justify="center"
            >
              <Image alt="check icon" opacity={state.isChecked ? 1 : 0} src={check.src} />
            </HStack>
          </HStack>
          <Text as="span" fontSize="9.47px" color="#27272a" fontWeight="400">
            {option.name}
          </Text>
        </VStack>
      </Box>
    </chakra.label>
  );
}
