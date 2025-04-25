import {Text, Flex, Stack, Image, Box} from '@chakra-ui/react';
import {themeStyles} from '../../../../theme';
import petIcon from '/src/images/icons/pet-icon.svg';
import carIcon from '/src/images/icons/car-icon.svg';

const UnitInfoPetVehicles = () => {
  return (
    <Stack gap="16px" mt="36px">
      <Flex w="full" justify="space-between">
        <Text
          gap="15px"
          fontSize="33px"
          color="#191919"
          fontWeight={500}
          lineHeight="30.43px"
          alignContent="center"
          mb="12px"
        >
          Pets & Vehicles 
        </Text>
      </Flex>
      <Flex
        {...themeStyles.containerStyles}
        padding="13px 20px"
        maxW="100%"
        gap={{base: '16px', xl: '24px'}}
        alignItems="stretch"
      >
        {listPetVehicles.map((info, index) => {
          return (
            <Stack
              key={index}
              border="0.5px solid #E4E4E7"
              bg="#FBFCFC"
              p="12px"
              rounded="8px"
              maxW="256px"
              justify="space-between"
              flexGrow={1}
              flexBasis={0}
              gap="12px"
            >
              <Flex gap="8px" alignItems="center">
                <Flex
                  align="center"
                  justify="center"
                  p="10px"
                  boxSize="36px"
                  border="0.5px solid #E4E4E7"
                  bg="#FFF"
                  rounded="full"
                >
                  <Image src={info.icon} alt={info.name} />
                </Flex>
                <Text fontSize="15px" fontWeight={500}>
                  {info.name}
                </Text>
              </Flex>
              <Flex align="center" gap="8px" border="1px solid #E4E4E7" p="4px 6px" w="max-content">
                <Box rounded="full" bg="#DC2626" boxSize="5px" />
                <Text fontSize="12px" color="#000">
                 {info?.date}
                </Text>
              </Flex>
            </Stack>
          );
        })}
      </Flex>
    </Stack>
  );
};

export default UnitInfoPetVehicles;

const listPetVehicles = [
  {
    icon: petIcon.src,
    name: 'Pet',
    date: '1 dog (Labrador)',
  },
  {
    icon: carIcon.src,
    name: 'Vehicles',
    date: '8JQK321',
  },
  {
    icon: carIcon.src,
    name: 'Vehicles',
    date: 'TXM 4827',
  },
];
