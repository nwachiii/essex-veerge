import {HStack, Image, Stack, Text} from '@chakra-ui/react';
import infoIcon from '/src/images/icons/infoIconArchiveUnit.svg';

import {CheckBoxForAllocation} from './checkBoxForAllocation';

export const UpdatingAllocation = ({value, setAllocation, arrayOfAllocation, allocationText}) => {
  return (
    <>
      <Stack spacing="10px" w="full" pr="10px">
        <HStack
          w="full"
          spacing="10px"
          px="10px"
          py="15px"
          borderRadius="10px"
          bg="#F5F5F5"
          align="start"
        >
          <Image src={infoIcon.src} w="16px" h="16px" alt="info icon" />
          <Text textAlign="start" fontSize="14px" fontWeight="300" color="#3D3D3D">
            {allocationText}
          </Text>
        </HStack>

        <HStack w="full" flexWrap="wrap"></HStack>
        {arrayOfAllocation?.length ? (
          <CheckBoxForAllocation
            setAllocation={setAllocation}
            arrayOfAllocation={arrayOfAllocation}
            value={value}
          />
        ) : null}
      </Stack>
    </>
  );
};

export default UpdatingAllocation;