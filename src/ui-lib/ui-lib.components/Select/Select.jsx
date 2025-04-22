import {Select as ChakraSelect, VStack} from '@chakra-ui/react';
import {InputLabel} from '../Input/Input';

export const Select = ({...rest}) => {
  return (
    <ChakraSelect
      variant="outline"
      border="none"
      borderRadius="none"
      borderBottom="1px #dee solid"
      color="dark#4545FE.100"
      textColor="dark#4545FE.100"
      borderColor="dark#4545FE.100"
      {...rest}
    />
  );
};
export const CustomSelect = ({isAuth, noLabel, label, ...rest}) => {
  return (
    <VStack w="full">
      {noLabel ? null : (
        <InputLabel fontSize="14px" pl="7px" mb={0} as="label" label={label ?? rest.placeholder} />
      )}
      <ChakraSelect
        h="55px"
        as="select"
        w={'100%'}
        variant="outline"
        borderRadius="8px"
        borderBottom="1px #E5E5E5 solid"
        _placeholder={{
          color: 'gray.500',
        }}
        _active={{
          border: '1px #dee solid',
        }}
        _visited={{
          border: '1px #dee solid',
        }}
        {...rest}
      />
    </VStack>
  );
};
