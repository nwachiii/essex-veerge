import {CourtHouseIcon} from '@/components/assets/courthouse';
import {HStack, Icon, Image, Stack, Text} from '@chakra-ui/react';
import React from 'react';
import {LiaAngleDownSolid} from 'react-icons/lia';
import moneyIcon from '/src/images/icons/moneyIconDark.svg';

const ConfigOption = ({handleScreen, hasBvn, mainScreenNav}) => {
  return (
    <HStack
      role="button"
      onClick={hasBvn ? () => mainScreenNav('payment config') : handleScreen('set up bvn')}
      justify="space-between"
    >
      <HStack spacing="12px">
        <Image src={moneyIcon.src} boxSize="24px" alt="money icon" />

        <Text fontSize="14px" fontWeight="400" lineHeight="17.75px" color="#191919">
          Set up payment gateway
        </Text>
      </HStack>
      <Icon color="#cbcbcb" as={LiaAngleDownSolid} transform="rotate(-90deg)" />
    </HStack>
  );
};

export default ConfigOption;
