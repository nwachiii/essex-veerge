import {Flex, Image, Input, InputGroup, InputRightElement, Stack, Text} from '@chakra-ui/react';
import React from 'react';
import calendarIcon from '/src/images/icons/calendarIconForCreateStore.svg';

const UnitDateRange = () => {
  return (
    <Stack spacing="8px">
      <Text fontSize="13px" fontWeight="500" color="#191919">
        Date Range 
      </Text>
      <Flex w="full" gap="16px" justifyContent="space-between">
        <Stack w="full" spacing="6px">
          <Text fontSize="13px" fontWeight="400" color="#3F3F46" textTransform="capitalize">
            From
          </Text>
          <InputGroup>
            <Input w="full" p="8px 12px 8px " h="36px" type="text" placeholder={`DD/MM/YYYY`} />
            <InputRightElement pointerEvents="none">
              <Image alt="calendar Icon" src={calendarIcon.src} boxSize="16px" />
            </InputRightElement>
          </InputGroup>
        </Stack>
        <Stack w="full" spacing="6px">
          <Text fontSize="13px" fontWeight="400" color="#3F3F46" textTransform="capitalize">
            To
          </Text>
          <InputGroup>
            <Input w="full" p="8px 12px 8px " h="36px" type="text" placeholder={`DD/MM/YYYY`} />
            <InputRightElement pointerEvents="none">
              <Image alt="calendar Icon" src={calendarIcon.src} boxSize="16px" />
            </InputRightElement>
          </InputGroup>
        </Stack>
      </Flex>
    </Stack>
  );
};

export default UnitDateRange;
