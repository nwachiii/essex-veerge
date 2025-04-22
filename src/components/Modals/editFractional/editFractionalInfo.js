import {
  Box,
  Button,
  Checkbox,
  HStack,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  SimpleGrid,
  SlideFade,
  Stack,
  Text,
} from '@chakra-ui/react';
import InfoIcon from '@/components/assets/infoIcon';
import DocInput from 'ui-lib/ui-lib.components/Input/DocInput';
import minusIcon from '/src/images/icons/substractIcon.svg';
import {PlusIcon} from '@/components/assets/PlusIcon';

import React, {useEffect, useState} from 'react';
import {DropDownComponent} from '../send_offer/components/dropDown';

const EditFractionalInfo = ({
  unitInfo,
  forFractionalization,
  formik,
  strategyModal,
  removeFile,
  handleContractUpload,
  displayDropDownDefaultName,
  investorsPacketModal,
  dealStructureModal,
  customScrollbarStyle,
  holdingPeriodModal,
  docObj,
  isBuildingTypeSingleFamilyResidential,
}) => {
  const [qtyError, setQtyError] = useState('');

  const purchasedFractionalizedUnits = unitInfo?.total_purchased_fractional_units;
  const totalUnitsThatCanBeFractionalized =
    Number(unitInfo?.total_fractionalized_units) + Number(unitInfo?.quantity);

  const dropDownStyle = {
    menuList: {
      maxW: 'full',
      minW: '200px',
      maxH: '400px',
      sx: customScrollbarStyle(),
    },

    btn: {
      w: 'full',
      h: '50px',
      pl: '17px',
      pr: '8.27px',
      borderRadius: '8px',
      fontSize: '12px',
      fontWeight: '400',
      border: '1px solid #E4E4E4',
    },
    wrapper: {
      spacing: '6px',
    },
  };

  const dropDownArray = [
    {
      name: 'Buy to flip',
      value: 'buy_to_flip',
    },
    {name: 'Buy to hold', value: 'buy_for_hold'},
  ];

  const dropDownArrayForDeal_structure = [
    {
      name: 'Equity',
      value: 'equity',
    },
    {name: ' Debt ( contact support )', value: 'debt'},
    {name: ' Convertible debt ( contact support )', value: 'convertible_debt'},
  ];
  const handleQuantityValue = (event, type, name = 'quantity') => {
    event.preventDefault();
    let quantityValue = 1;
    if (type === 'add') {
      if (formik.values[name] >= totalUnitsThatCanBeFractionalized) {
        setQtyError(
          'Apologies, but you cannot fractionalize more units than are currently available.'
        );
        quantityValue = formik.values[name];
      } else {
        quantityValue = formik.values.quantity + 1;
      }
    } else if (type === 'subtract') {
      if (formik.values[name] <= purchasedFractionalizedUnits) {
        setQtyError(
          'Apologies, but you cannot fractionalize less units than are currently available.'
        );
        quantityValue = purchasedFractionalizedUnits;
      } else {
        quantityValue = formik.values.quantity === 0 ? 0 : formik.values.quantity - 1;
      }
    } else if (type === 'onchange') {
      const input = event.target.value || 0;
      let val = input;
      let cleanedString = val.toString().replace(/[^\d]/g, '');
      const isLessThanAvailbale = Number(cleanedString) < purchasedFractionalizedUnits;
      if (
        Number(cleanedString) > totalUnitsThatCanBeFractionalized ||
        Number(cleanedString) < purchasedFractionalizedUnits
      ) {
        setQtyError(
          `Apologies, but you cannot fractionalize ${isLessThanAvailbale ? 'less' : 'more'} units than are currently available.`
        );
        quantityValue = formik.values[name];
      } else {
        quantityValue = Number(cleanedString);
      }
    }

    formik.setFieldValue(name, quantityValue);
  };

  useEffect(() => {
    const timeout = setTimeout(() => setQtyError(''), 3000);
    return () => clearTimeout(timeout);
  }, [qtyError]);

  const disableArray = [{value: 'debt'}, {value: 'convertible_debt'}];
  const shouldDisableOption = (value, dropDownArray) => {
    const disable = dropDownArray.some(item => value === item.value);
    return disable;
  };

  return (
    <>
      {forFractionalization ? null : (
        <Box mt="16px">
          <Text as="label" color="#191919" fontSize="14px" fontWeight="400" htmlFor={`quantity`}>
            How many {unitInfo.unit_title} units do you want to fractionalise?
          </Text>
          <InputGroup
            align="center"
            border="1px solid #E4E4E4"
            h="50px"
            borderRadius={'8px'}
            marginTop="6px"
            pr="11px"
          >
            <Input
              type="text"
              h="50px"
              border="none"
              borderRadius="8px"
              name={`quantity`}
              onChange={event => handleQuantityValue(event, 'onchange', `quantity`)}
              value={formik.values.quantity}
              _focusVisible={{
                borderColor: 'transparent',
                boxShadow: 'none',
              }}
              _focus={{
                borderColor: 'transparent',
                boxShadow: 'none',
              }}
              _active={{
                borderColor: 'transparent',
                boxShadow: 'none',
              }}
            />
            <InputRightElement h="full" w="fit-content" mr="11px">
              <HStack spacing="6px">
                <Button
                  h="fit-content"
                  maxH="fit-content"
                  onClick={event => handleQuantityValue(event, 'subtract')}
                  p="0px"
                  bg="transparent"
                  w="fit-content"
                  minW="fit-content"
                  variant="ghost"
                  _hover={{
                    bg: 'transparent',
                  }}
                  _active={{
                    bg: 'transparent',
                  }}
                  _focus={{
                    bg: 'transparent',
                  }}
                >
                  <Image src={minusIcon.src} alt="minus icon" />
                </Button>

                <Button
                  h="fit-content"
                  maxH="fit-content"
                  onClick={event => handleQuantityValue(event, 'add')}
                  p="0px"
                  bg="transparent"
                  w="fit-content"
                  minW="fit-content"
                  variant="ghost"
                  _hover={{
                    bg: 'transparent',
                  }}
                  _active={{
                    bg: 'transparent',
                  }}
                  _focus={{
                    bg: 'transparent',
                  }}
                >
                  {' '}
                  <PlusIcon />
                </Button>
              </HStack>
            </InputRightElement>
          </InputGroup>
          <SlideFade in={!!qtyError} offsetY="5px">
            <Text fontSize="12px" color="red" fontWeight="400">
              {qtyError}
            </Text>
          </SlideFade>
        </Box>
      )}
      <SimpleGrid w="full" columns={2} spacingX="33.33px" spacingY="24px">
        <DropDownComponent
          placeHolderText="Select"
          header={
            <HStack cursor="pointer" spacing="8px" w="fit-content" onClick={strategyModal.onOpen}>
              <Text
                as="label"
                cursor="pointer"
                color="#191919"
                fontSize="14px"
                fontWeight="400"
                htmlFor={`strategy`}
              >
                Strategy
              </Text>
              <InfoIcon borderFillColor="#919191" />
            </HStack>
          }
          setFieldValue={formik.setFieldValue}
          fieldName={`strategy`}
          dropDownArray={dropDownArray}
          defaultDropName={displayDropDownDefaultName(dropDownArray, formik.values.strategy)}
          dropDownValue={formik.values?.strategy}
          dropDownStyle={dropDownStyle}
        />
        <Stack spacing="6px">
          <HStack cursor="pointer" w="fit-content" onClick={holdingPeriodModal.onOpen}>
            <Text
              as="label"
              color="#191919"
              cursor="pointer"
              fontSize="14px"
              fontWeight="400"
              htmlFor={`holding_period`}
            >
              Holding period
            </Text>
            <InfoIcon borderFillColor="#919191" />
          </HStack>

          <Input
            type="text"
            placeholder="e.g., 2 Months..."
            _placeholder={{
              fontSize: '12px',
              fontWeight: '400',
            }}
            fontSize="12px"
            h="50px"
            border="1px solid #E4E4E4"
            borderRadius="8px"
            name={`holding_period`}
            onChange={formik.handleChange}
            value={formik.values.holding_period}
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
        <DropDownComponent
          placeHolderText="Select"
          disableOption={shouldDisableOption}
          values={disableArray}
          header={
            <HStack
              w="fit-content"
              spacing="8px"
              cursor="pointer"
              onClick={dealStructureModal.onOpen}
            >
              <Text
                as="label"
                cursor="pointer"
                color="#191919"
                fontSize="14px"
                fontWeight="400"
                htmlFor={`deal_structure`}
              >
                Deal structure
              </Text>
              <InfoIcon borderFillColor="#919191" />
            </HStack>
          }
          setFieldValue={formik.setFieldValue}
          fieldName={`deal_structure`}
          defaultDropName={displayDropDownDefaultName(
            dropDownArrayForDeal_structure,
            formik.values.deal_structure
          )}
          dropDownArray={dropDownArrayForDeal_structure}
          dropDownValue={formik.values?.deal_structure}
          dropDownStyle={dropDownStyle}
        />
        <Stack spacing="6px">
          <HStack w="fit-content" cursor="pointer" onClick={investorsPacketModal.onOpen}>
            <Text
              as="label"
              color="#191919"
              fontSize="14px"
              cursor="pointer"
              fontWeight="400"
              htmlFor={`packets`}
            >
              {`Investor's packet`}
            </Text>
            <InfoIcon borderFillColor="#919191" />
          </HStack>
          <DocInput
            lengthToBeTruncated={17}
            contract={''}
            handleIdDoc={handleContractUpload}
            removeFile={removeFile}
            file={`packets`}
            docObj={docObj}
            selectDocStyle={{
              uploadBtnStyle: {
                fontSize: '9px',
                p: '11px 21px 12px 19px',
                // bg: '#3D3D3D',
                borderRadius: '8px',
              },
              emptyStateTextStyle: {
                fontSize: '12px',
              },
            }}
            selectedDocStyle={{
              text: {
                fontSize: '14px',
                fontWeight: '400',
                color: '#191919',
              },
            }}
          />
        </Stack>
        {/* {isBuildingTypeSingleFamilyResidential ? null : ( */}
        <Checkbox
          onChange={e => formik.setFieldValue('enable_dividend', e.target.checked)}
          size="lg"
          colorScheme="blue"
          w="fit-content"
          isChecked={formik.values.enable_dividend}
        >
          Enable Dividend
        </Checkbox>
        {/* )} */}
      </SimpleGrid>
    </>
  );
};

export default EditFractionalInfo;
