import React from 'react';
import {
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  HStack,
  Heading,
  Input,
  Link,
  Select,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import AuthTermsCheck from '@/components/assets/authTermsCheck';
import DropDownIcon from '@/components/assets/dropDownIcon';
import {currencies} from 'constants/auth/country';
import {motion} from 'framer-motion';
import {validateSpecificFields} from 'utils/validateFormikFields';
import AnimateInput from '@/components/AnimateInput';

const CompanyInfo = ({isLoading, setFormSubmitted, formik}) => {
  const {onToggle, isOpen} = useDisclosure();

  const isFormValid =
    !formik.errors.company_email &&
    !formik.errors.company_name &&
    !formik.errors.company_address &&
    !formik.errors.currency &&
    !formik.errors.role &&
    isOpen;

  return (
    <Stack
      as={motion.div}
      animate={{
        opacity: 1,
        transition: {
          delay: 0.1,
        },
      }}
      initial={{opacity: 0}}
      align="center"
      spacing={'24px'}
      w="max-content"
    >
      <Heading
        textAlign="center"
        fontSize="48px"
        fontWeight="600"
        color="#141414"
        fontFamily="Neue Haas Grotesk Display Pro"
      >
        Company&apos;s information
      </Heading>

      <Stack
        maxW="400px"
        w="full"
        as="form"
        onSubmit={async e => {
          e.preventDefault();

          const isValid = await validateSpecificFields(
            ['company_email', 'company_name', 'company_address', 'currency', 'role'],
            formik
          );

          if (isValid) {
            formik.setErrors({});
            formik.setTouched({});
            setFormSubmitted(false);

            formik.handleSubmit();
          } else {
            setFormSubmitted(true);
          }
        }}
        spacing="24px"
      >
        <Stack spacing="16px" w="full">
          <FormControl isInvalid={formik.errors.company_name && formik.touched.company_name}>
            <AnimateInput
              w="full"
              type="text"
              required
              variant="auth"
              id="company_name"
              borderColor={'#E5E5E5'}
              name="company_name"
              value={formik.values.company_name}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder="Company's name"
            />
            <FormErrorMessage>{formik.errors.company_name}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={formik.errors.company_email && formik.touched.company_email}>
            <AnimateInput
              w="full"
              type="email"
              required
              id="company_email"
              name="company_email"
              borderColor={'#E5E5E5'}
              value={formik.values.company_email}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              variant="auth"
              placeholder="Company's email address"
            />
            <FormErrorMessage>{formik.errors.company_email}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={formik.errors.company_address && formik.touched.company_address}>
            <AnimateInput
              w="full"
              type="text"
              required
              id="company_address"
              borderColor={'#E5E5E5'}
              value={formik.values.company_address}
              name="company_address"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              variant="auth"
              placeholder="Company's physical address"
            />
            <FormErrorMessage>{formik.errors.company_address}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={formik.errors.currency && formik.touched.currency}>
            <Select
              variant="auth"
              name="currency"
              id="currency"
              required
              value={formik.values.currency}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              icon={<DropDownIcon />}
              iconSize="12px"
              bg={formik.values.currency ? '#ffffff' : 'transparent'}
              sx={{
                color: formik.values.currency === '' ? '#919191' : '#141414', // Placeholder color and selected value color
              }}
            >
              <option value="" disabled>
                Company's functional currency
              </option>
              {currencies.map((item, idx) => (
                <option
                  key={idx}
                  //   style={{color: '#141414'}}
                  value={item.abbreviation}
                >{`${item.currency} (${item.abbreviation})`}</option>
              ))}
            </Select>
            <FormErrorMessage>{formik.errors.currency}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={formik.errors.role && formik.touched.role}>
            <AnimateInput
              w="full"
              type="text"
              id="role"
              required
              name="role"
              borderColor={'#E5E5E5'}
              value={formik.values.role}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              variant="auth"
              placeholder="Your role"
            />
            <FormErrorMessage>{formik.errors.role}</FormErrorMessage>
          </FormControl>
          <HStack align="start" w="full" justify="space-between">
            <AuthTermsCheck onToggle={onToggle} isOpen={isOpen} />

            <Text
              w="full"
              fontSize={'14px'}
              fontWeight="500"
              color="#606060"
              fontFamily="Neue Haas Grotesk Display Pro"
            >
              I acknowledge I am legally authorised to sign up on behalf of the company
            </Text>
          </HStack>
        </Stack>
        <Button
          isLoading={isLoading}
          isDisabled={!isFormValid}
          variant="filled-radius"
          type="submit"
        >
          Proceed
        </Button>
      </Stack>
    </Stack>
  );
};

export default CompanyInfo;
