import {Image, Stack, Text, VStack} from '@chakra-ui/react';
import React from 'react';
import emptyIcon from '../../../images/icons/emptyIcon.png';
import {Container2} from '../../common/containers';

export const EmptyDocs = () => {
  return (
    <Stack>
      <Text>
        <b>{`ID's and Documents`}</b>
      </Text>

      <Container2 h="305px" py={22}>
        <VStack h="full" justify="center">
          <Image alt="" src={emptyIcon.src} />
          <Text as="small">{`No ID's and Documents`}</Text>
        </VStack>
      </Container2>
    </Stack>
  );
};
