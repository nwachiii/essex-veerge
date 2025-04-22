import {DropDownComponent} from '@/components/Modals/send_offer/components/dropDown';
import {InfoIcon} from '@chakra-ui/icons';
import {Flex, HStack, Image, Stack, Text} from '@chakra-ui/react';
import React from 'react';

import InfoIconStroke from '@/components/assets/infoIconStroke';
import {Button} from 'ui-lib/ui-lib.components';

const customScrollbarStyles = (trackColor = '#fff', thumbColor = '#cbcbcb') => ({
  '&::-webkit-scrollbar': {
    width: '4px',
    borderRadius: '16px',
  },
  '&::-webkit-scrollbar-track': {
    borderRadius: '16px',
    WebkitBoxShadow: `inset 0 0 6px ${trackColor}`,
  },
  '&::-webkit-scrollbar-thumb': {
    borderRadius: '16px',
    backgroundColor: thumbColor,
  },
});

const SelectPaymentGateWayOption = ({
  setView,
  gateWayHelpers,
  selectedGateWay,
  handleGateWaySelection,
}) => {
  const dropDownStyle = {
    label: {
      fontSize: '12px',
      fontWeight: '400',
    },
    menuList: {
      maxW: 'full',
      w: '250px',
      maxH: '400px',
      sx: customScrollbarStyles(),
    },

    btn: {
      w: 'full',
      h: '45px',

      p: '8.016px 11.222px',
      borderRadius: ' 6.413px',
      fontSize: '12px',
      fontWeight: '400',
      border: '1px solid #E4E4E4',
    },
    wrapper: {
      spacing: '4.81px',
    },
  };
  const listOfGateWayOptions = [
    {
      name: 'Payaza',
      value: 'payaza',
    },
    {
      name: 'Flutterwave',
      value: 'flutterwave',
    },
  ];

  const toNextScreen = () => {
    return setView('addDetails');
  };

  return (
    <>
      <Stack spacing="21px">
        <HStack spacing="8px" w="full">
          {/* <InfoIconStroke /> */}
          <Text fontSize="14px" fontWeight="400" color="#3D3D3D">
            Select a payment gateway that suits your need.
          </Text>
        </HStack>
        {/* <DropDownComponent
          placeHolderText="Select"
          header="Payment Gateway"
          setFieldValue={handleGateWaySelection}
          fieldName={`gateway`}
          dropDownArray={listOfGateWayOptions}
          dropDownStyle={dropDownStyle}
          // dropDownIconStyle={{boxSize: '24px'}}
        /> */}
        <Stack align="center" spacing="8px" w="full">
          {gateWayHelpers.map((gateWayInfo, idx) => (
            <Flex
              p="18.5px 24px"
              role={!gateWayInfo.shouldContactSupport ? 'button' : 'presentation'}
              maxH="63px"
              key={idx}
              onClick={() =>
                gateWayInfo.shouldContactSupport ? null : handleGateWaySelection(gateWayInfo)
              }
              // width="360px"
              w="full"
              align="center"
              background="#FFF"
              justifyContent="space-between"
              borderRadius="8px"
              padding="24px"
              border="1px solid #F2F4F7"
            >
              <HStack position="relative" spacing="16px">
                <Image src={gateWayInfo?.icon} alt="payment gateway icon" />

                <Text
                  color="#000"
                  position="absolute"
                  left="52px"
                  fontSize="14px"
                  fontStyle="normal"
                  fontWeight="400"
                  wordBreak="keep-all"
                  lineHeight="normal"
                  minW="100px"
                >
                  {gateWayInfo?.name}
                </Text>
              </HStack>
              {gateWayInfo.shouldContactSupport ? (
                <HStack
                  bg="#FF91031A"
                  border=" 0.603px solid #FF9103"
                  borderRadius="7.205px"
                  p="6px"
                  maxH="24px"
                >
                  <Text fontSize="9.607px" fontWeight="500" color="#FF9103">
                    Contact Support
                  </Text>
                </HStack>
              ) : null}
            </Flex>
          ))}
        </Stack>
      </Stack>
      {/* <Button
        mt="165px"
        color="#FFF"
        variant={'dark'}
        isDisabled={!selectedGateWay?.name}
        fontSize="14.907px"
        position="sticky"
        bottom="0px"
        zIndex="2"
        _isDisabled={{
          bg: 'red',
        }}
        onClick={toNextScreen}
        fontStyle="normal"
        fontWeight="400"
        lineHeight="normal"
        h="45px"
        borderRadius="9.94px"
      >
        Proceed
      </Button> */}
    </>
  );
};

export default SelectPaymentGateWayOption;
