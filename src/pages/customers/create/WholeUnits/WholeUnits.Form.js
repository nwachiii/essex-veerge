import {
  Box,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SimpleGrid,
  InputGroup,
  Divider,
  Flex,
  Text,
} from '@chakra-ui/react';
import {useState} from 'react';
import {encodeFileToBase64, formatAmount} from '../../../../utils';
import {Field} from 'formik';
import {TbCurrencyDollar, TbCurrencyEuro} from 'react-icons/tb';
import {ChevronDownIcon} from '@chakra-ui/icons';
import {Input} from '../../../../ui-lib/ui-lib.components';
import NairaIcon from '../../../../components/assets/NairaIcon';
import DocInput from 'ui-lib/ui-lib.components/Input/DocInput';
import {FormErrorWrapper} from '@/components/formComponents/FormErrorWrapper';
import countries from 'constants/auth/country';

export function WholeUnitsForm({unit, setFieldValue, index, errors}) {
  const [docObj, setDocObj] = useState({name: ''});

  const listingInfo = localStorage && JSON.parse(localStorage.getItem('listingInfo'));
  const bedroomIsNotValid =
    listingInfo?.building_type.includes('Land') || listingInfo?.building_type.includes('Mall');

  const handleContractUpload = async event => {
    setDocObj(event?.currentTarget?.files[0]);
    setFieldValue(
      `units.${index}.outright_contract`,
      [await encodeFileToBase64(event.currentTarget.files[0]).then(res => res)][0]
    );
  };

  const removeFile = () => {
    setDocObj({});
  };

  const numberInputOnWheelPreventChange = e => {
    let inputValue = e.target.value;
    const regex = /^-?[0-9]*$/; // Regular expression to match positive and negative numbers

    // Replace hyphen with a blank space and convert negative numbers to positive
    if (inputValue.includes('-')) {
      inputValue = Math.abs(parseInt(inputValue)); // Convert negative number to positive
      e.target.value = inputValue;
    }

    if (!regex.test(inputValue)) {
      e.preventDefault();
      return;
    }

    e.target.blur();
    // Prevent the page/container scrolling
    e.stopPropagation();

    setTimeout(() => {
      e.target.focus();
    }, 0);
  };

  function handleKeyDown(event) {
    // Prevent '-' character
    if (event.key === '-') {
      event.preventDefault();
    }
  }

  function handlePaste(event) {
    const pasteData = (event.clipboardData || window.clipboardData).getData('text');
    if (pasteData.startsWith('-')) {
      event.preventDefault();
    }
  }

  return (
    <div>
      <SimpleGrid spacing="26px" columns={2}>
        <div>
          <label
            style={{
              fontWeight: '600',
              fontSize: '16px',
            }}
            htmlFor={`units.${index}.unit_title`}
          >
            Unit title
          </label>
          <FormErrorWrapper
            ChildComponent={Field}
            type="text"
            placeholder="e.g., 3 Bedroom Apartment "
            className="formik__field"
            name={`units.${index}.unit_title`}
            error={errors[`${index}`]?.unit_title}
          />
        </div>

        <div>
          <label
            style={{
              fontWeight: '600',
              fontSize: '16px',
            }}
            htmlFor={`units.${index}.unit_size`}
          >
            Unit size
          </label>
          <FormErrorWrapper
            ChildComponent={Field}
            type="text"
            // onPaste={handlePaste}
            // onKeyDown={handleKeyDown}
            // onWheel={numberInputOnWheelPreventChange}
            placeholder="Unit size"
            className="formik__field"
            name={`units.${index}.unit_size`}
            error={errors[`${index}`]?.unit_size}
          />
        </div>
        {!bedroomIsNotValid && (
          <div>
            <label
              style={{
                fontWeight: '600',
                fontSize: '16px',
              }}
              htmlFor={`units.${index}.no_of_bedrooms`}
            >
              Number of Bedrooms
            </label>
            <FormErrorWrapper
              ChildComponent={Field}
              type="number"
              min={0}
              onPaste={handlePaste}
              onKeyDown={handleKeyDown}
              onWheel={numberInputOnWheelPreventChange}
              placeholder="No. of bedrooms "
              className="formik__field"
              name={`units.${index}.no_of_bedrooms`}
              error={errors[`${index}`]?.no_of_bedrooms}
            />
          </div>
        )}
        <div>
          <label
            style={{
              fontWeight: '600',
              fontSize: '16px',
            }}
            htmlFor={`units.${index}.quantity`}
          >
            Unit quantity
          </label>
          <FormErrorWrapper
            ChildComponent={Field}
            type="number"
            min={0}
            onPaste={handlePaste}
            onKeyDown={handleKeyDown}
            onWheel={numberInputOnWheelPreventChange}
            placeholder="Unit quantity "
            className="formik__field"
            name={`units.${index}.quantity`}
            error={errors[`${index}`]?.quantity}
          />
        </div>
        <div>
          <label
            style={{
              fontWeight: '600',
              fontSize: '16px',
            }}
            htmlFor={`units.${index}.outright_contract`}
          >
            Outright purchase agreement
          </label>
          <FormErrorWrapper
            ChildComponent={DocInput}
            component={
              <Input
                id="file"
                name={`units.${index}.outright_contract`}
                type="file"
                onChange={e => handleContractUpload(e)}
                className="file__inputField file_Style"
                w="full"
                mt={-2}
                hideErrorMsg={true}
                h="54px"
                borderRadius="14px"
                accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/pdf"
              />
            }
            removeFile={removeFile}
            docObj={docObj}
            error={errors[`${index}`]?.outright_contract}
          />
        </div>

        <div>
          <label
            htmlFor={`units.${index}.price`}
            style={{
              fontWeight: '600',
              fontSize: '16px',
            }}
          >
            Outright price
          </label>

          <FormErrorWrapper
            ChildComponent={InputGroup}
            mt="8px"
            align="center"
            border="1px solid #E4E4E4"
            borderRadius={'10px'}
            error={errors[`${index}`]?.price}
          >
            <PriceMenu />
            <Field
              style={{
                paddingLeft: '.9em',
                marginTop: '0',
                fontSize: '18px',
                fontWeight: '500',
                borderRadius: '8px',
                border: '0.5px solid #E4E4E4',
              }}
              type="text"
              placeholder="Enter unit price "
              className="formik__field"
              name={`units.${index}.price`}
              value={formatAmount(unit.price) == 'NaN' ? '' : formatAmount(unit.price)}
            />
          </FormErrorWrapper>
          <br />
          <Flex mt={-3} gap="5px" align="center" justify={'flex-end'}>
            <Field
              style={{marginLeft: '.3em', cursor: 'pointer', fontSize: '12px', height: '23px'}}
              type="checkbox"
              name={`units.${index}.display_price`}
            />
            <Text mt={1} fontSize="12px">{`${
              unit?.display_price == true
                ? ' Price will be displayed'
                : ' Price will NOT be displayed'
            }`}</Text>
          </Flex>
        </div>
        <Box mt={!bedroomIsNotValid ? -8 : 'inherit'} mb={4}>
          <label
            style={{
              fontWeight: '600',
              fontSize: '16px',
            }}
            htmlFor={`units.${index}.youtube_url`}
          >
            Youtube url
          </label>
          <Field
            mx={1}
            type="url"
            id="youtube_url"
            // pattern='https://'
            className="formik__field"
            name={`units.${index}.youtube_url`}
            placeholder="Youtube url (optional)"
            _placeholder={{
              color: 'gray.500',
            }}
          />
        </Box>

        <Box hidden>
          <label htmlFor={`units.${index}.unit_type`}>Unit type</label>
          <Field
            as="select"
            placeholder="Unit type "
            className="formik__field"
            name={`units.${index}.unit_type`}
          >
            <option value={'RESIDENTIAL'}>Residential</option>
            <option value={'COMMERCIAL'}>Commercial</option>
            <option value={'MIXED'}>Mixed</option>
          </Field>
        </Box>
      </SimpleGrid>
      <Box mt="25px">
        <label
          htmlFor={`units.${index}.unit_description`}
          style={{
            fontWeight: '600',
          }}
        >
          Unit description
        </label>
        <FormErrorWrapper
          ChildComponent={Field}
          type="textarea"
          as="textarea"
          rows={5}
          placeholder="How would you best describe this unit ?"
          className="formik__field"
          name={`units.${index}.unit_description`}
          error={errors[`${index}`]?.unit_description}
        />
      </Box>
    </div>
  );
}
export default WholeUnitsForm;

export const PriceMenu = ({
  disableMenu,
  wrapperStyle,
  btnStyle,
  styleForIcon,
  fillForNairaSvgIcon,
}) => {
  let defaultCurrency = '$';
  if (typeof window !== 'undefined') {
    const defaultCountry = 'United States Of America';
    defaultCurrency = countries.find(item => item.name === defaultCountry)?.symbol || '$';
  }
  return (
    <Menu borderRadius={'2px'}>
      <MenuButton type="button" transition="all 0.2s">
        <HStack spacing="5px" ml={3} {...wrapperStyle}>
          {/* <NairaIcon style={styleForIcon} fillForNairaSvgIcon={fillForNairaSvgIcon} /> */}
          <HStack
            minW="25px"
            minH="25px"
            borderRadius="4px"
            justify="center"
            align="center"
            bg={fillForNairaSvgIcon || '#000000'}
          >
            <Text fontSize="14px" fontWeight="500" color="#ffffff">
              {defaultCurrency}
            </Text>
          </HStack>
          {disableMenu ? null : <ChevronDownIcon color="gray" fontSize={'14px'} />}
          <Divider borderColor="#E4E4E4" orientation="vertical" />
        </HStack>
      </MenuButton>
      {disableMenu ? null : (
        <MenuList px={2} color="#E9E9E9" bg="#191919">
          <MenuItem cursor={'not-allowed'} mb="16px" color="#E9E9E9" bg="#191919">
            <TbCurrencyDollar style={{fontSize: '24px', color: 'gray'}} /> USD (contact support)
          </MenuItem>
          <MenuItem cursor={'not-allowed'} color="#E9E9E9" bg="#191919">
            <TbCurrencyEuro style={{fontSize: '24px', color: 'gray'}} /> EUR (contact support)
          </MenuItem>
        </MenuList>
      )}
    </Menu>
  );
};

export const PriceInputWrapperStyle = {
  borderRadius: '8px',
  borderTopLeftRadius: '0px',
  borderBottomLeftRadius: '0px',
  paddingLeft: '.9em',
  marginTop: '0',
  fontSize: '18px',
  fontWeight: '500',
  border: '0.5px solid #E4E4E4',
};
