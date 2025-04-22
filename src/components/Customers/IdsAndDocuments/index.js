import {ChevronRightIcon} from '@chakra-ui/icons';
import {Box, Button, Flex, Image, Stack, Text, VStack} from '@chakra-ui/react';
import React from 'react';
import {IDAndDOCS} from '../../../constants/customersProfile';
import {themeStyles} from '../../../theme';
import {Container2} from '../../common/containers';
import docIcon from '/src/images/icons/DocIconForId.svg';
import {EmptyDocs} from './EmptyDocs';
import {changeDateFormat} from '../../../utils/formatDate';
import {EmptyState} from '@/components/common/Table';

export const IDsAndDocuments = ({documents = []}) => {
  return (
    <div>
      <Stack spacing="14px">
        <Text fontSize="18px" fontWeight="500">
          {`ID's and Documents`}
        </Text>

        <Container2 minH="250px" py="20px">
          {documents && documents?.length > 0 ? (
            <Flex gap={`20px`} py="0px" flexWrap={`wrap`}>
              {documents?.map(
                (doc, i) =>
                  doc?.document && (
                    <Stack
                      key={i}
                      {...themeStyles.boxStyles}
                      px="20px"
                      pt="11px"
                      pb="12px"
                      w="189px"
                      minH="210px"
                      h="full"
                      spacing="10px"
                      borderRadius="12px"
                      align="start"
                      border="1px solid #E4E4E4"
                      cursor="pointer"
                      onClick={() => window.open(doc?.document, '_blank')}
                    >
                      <Image alt="doc icon" src={docIcon.src} />
                      {doc?.document_name && (
                        <Text
                          textTransform={`capitalize`}
                          fontSize="14px"
                          fontWeight="600"
                          color="#191919"
                        >
                          {doc?.document_name}
                        </Text>
                      )}

                      <>
                        <Text fontSize="12px" fontWeight="500" color="#606060">
                          Uploaded:{' '}
                          <Text fontSize="12px" as="span">
                            {doc?.created_at
                              ? changeDateFormat(doc?.created_at, 'monthFirst')
                              : doc?.added_at
                                ? changeDateFormat(doc?.added_at, 'monthFirst')
                                : '-'}
                          </Text>
                        </Text>
                      </>
                    </Stack>
                  )
              )}
            </Flex>
          ) : (
            <EmptyState description="No ID has been uploaded yet" py="52px" />
          )}
        </Container2>
      </Stack>
    </div>
  );
};
