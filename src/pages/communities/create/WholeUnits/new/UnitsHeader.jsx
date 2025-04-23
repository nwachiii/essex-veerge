import {SmallCloseIcon} from '@chakra-ui/icons';
import {Divider, HStack, Icon, Spacer, Text} from '@chakra-ui/react';
import React from 'react';
import {themeStyles} from '../../../../../theme';

export const UnitsHeader = ({index, values, remove}) => {
  return (
    <div>
      {index > 0 && (
        <Spacer mt="100px" mb="40px">
          <Divider w="full" />
        </Spacer>
      )}
      {values.units.length > 1 && (
        <HStack justify="space-between" w="full" mb={8}>
          {/* <Text fontSize="18px" fontWeight="500" color={themeStyles.color.matador__yellow}>
            Listing Index: {index + 1}
          </Text> */}
          <Icon
            position="absolute"
            right={-6}
            onClick={() => remove(index)}
            as={SmallCloseIcon}
            cursor="pointer"
            width="30px"
            height="30px"
            alt="cancel_icon"
            color="red"
          />
        </HStack>
      )}
    </div>
  );
};

export default UnitsHeader;
