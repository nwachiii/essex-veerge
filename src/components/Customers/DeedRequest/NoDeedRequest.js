import React from 'react';
import {Button} from '../../../ui-lib';
import {Container2} from '../../common/containers';
import {HStack, Stack, Tag, TagLabel, Text} from '@chakra-ui/react';

export const NoDeedRequest = () => {
  return (
    <Stack>
      <Text>
        <b>Deed Request</b>
      </Text>
      <Container2>
        <HStack justify="space-between" align="center" h="87px">
          <HStack>
            <Text as="small">Request Status</Text>
            <Tag p={3} w="115px" h="36px" bg="#FFF7DB" color="#FF9103" borderRadius="full">
              <TagLabel mx="auto">Pending</TagLabel>
            </Tag>
          </HStack>
          <Button variant="primary" mt={0}>
            View request
          </Button>
        </HStack>
      </Container2>
    </Stack>
  );
};
