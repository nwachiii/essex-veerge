import {ChevronRightIcon} from '@chakra-ui/icons';
import {Box, Button, Container, Heading, Image, Text, SimpleGrid, Flex} from '@chakra-ui/react';
import React from 'react';
import {useRouter} from 'next/router';
import {themeStyles} from '../../../../theme';
import docIcon from '/src/images/icons/doc_icon.svg';
import {useQuery} from '@tanstack/react-query';
import {fetchDocument} from '../../../../apis/listings';

export const ListingInfoDocuments = ({docText, docLink}) => {
  const {query} = useRouter();
  const Brochure = useQuery(['brochure-document', query.listingId], () =>
    fetchDocument(query?.listingId, 'brochure')
  );

  // console.log('Brochure: ', Brochure.data?.data?.results, 'PaymentPlan contract: ', PaymentPlan.data?.data?.results, 'Outright contract', Outright.data?.data?.results);

  const BrochureData = Brochure.data && Brochure.data?.data?.results;

  const BrochureDocument = BrochureData && BrochureData?.[0]?.document_url;

  const isDocumentAvailable = BrochureData && BrochureData?.length > 0;
  // console.log('BrochureDocument', BrochureData?.[0]?.document_url);

  return (
    <>
      {isDocumentAvailable || docLink ? (
        <Box mt="60px">
          <Heading fontSize="28px" fontWeight="500" color="#191919" lineHeight="11px">
            Documents
          </Heading>
          <Container {...themeStyles.containerStyles} maxW="1284px" padding="19px 36px" mt="20px">
            <Flex gap="23px">
              <Box w="277px" h="150px" border="1px solid lightgray" borderRadius="14px" p="23px">
                <Image alt="" src={docIcon.src} h="33.8px" w="40px" />
                <Text pt={2}>{`${docText || 'Brochure'}`}</Text>
                <Button
                  as="a"
                  mt={4}
                  target="_blank"
                  variant="link"
                  color="#4545FE"
                  cursor="pointer"
                  href={docLink || BrochureDocument}
                >
                  View {<ChevronRightIcon />}
                </Button>
              </Box>
            </Flex>
          </Container>
        </Box>
      ) : (
        <Box mt="60px">
          <Heading fontSize="32px" fontWeight="500" color="#191919" lineHeight="41px">
            Document
          </Heading>
          <Container {...themeStyles.containerStyles} maxW="1284px" padding="19px 36px" mt="25px">
            <Text>Nil</Text>
          </Container>
        </Box>
      )}
    </>
  );
};

export default ListingInfoDocuments;
