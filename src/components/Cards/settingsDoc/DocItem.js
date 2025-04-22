import React from 'react';
import docIcon from '/src/images/icons/doc_settings_icon.svg';
import {Image, Stack, Text} from '@chakra-ui/react';
import {changeDateFormat} from '../../../utils/formatDate';

const DocItem = ({idx, date}) => {
  return (
    <Stack
      justify="space-between"
      boxShadow=" 0px 5.62075px 14.0519px rgba(0, 0, 0, 0.04)"
      borderRadius="7px"
      px="17px"
      py="17px"
      w="186.72px"
      h="120.5px"
    >
      <Image boxSize="33.72px" src={docIcon.src} alt="doc icon" />
      <Text fontSize="16px" fontWeight="700" color="#191919">
        Doc {idx + 1}
      </Text>
      <Text fontSize="14px" fontWeight="400" color="#606060">
        Uploaded: {changeDateFormat(date, 'mm/dd/yyyy')}
      </Text>
    </Stack>
  );
};

export default DocItem;
