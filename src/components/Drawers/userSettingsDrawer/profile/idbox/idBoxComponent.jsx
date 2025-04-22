import React from 'react';
import {
  Box,
  HStack,
  VStack,
  Heading,
  Grid,
  GridItem,
  Image,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import {useRouter} from 'next/router';
import {AddIcon} from '@chakra-ui/icons';
import docIcon from '/src/images/icons/doc_settings_icon.svg';

import {Container2, Container3} from '@/components/common/containers';
import NationalID from '/src/images/national-id.png';
import UpdateId from '@/components/UpdateId';

export const IdBox = ({idInfo}) => {
  const {document, created_at} = idInfo?.documents[0] ?? '';
  const {document_type, exp_date} = idInfo?.user ?? '';

  console.log(idInfo);

  const {onOpen: idOnOpen, isOpen: idIsOpen, onClose: idOnClose} = useDisclosure();

  const issue_date = new Date(created_at).toLocaleDateString('en-us', {
    month: 'short',
    year: 'numeric',
  });

  const expiry_date = new Date(exp_date).toLocaleDateString('en-us', {
    month: 'short',
    year: 'numeric',
  });

  const router = useRouter();
  return (
    <Container3 titleFontSize="16px" title="Valid ID" border=" 1px solid #EAECF0">
      <HStack justify="space-between" w="full">
        <HStack justify="start" spacing="40px">
          <Image src={docIcon.src} alt="doc icon" />
          {document_type ? (
            <VStack alignItems="start" textAlign={'left'}>
              <Text textAlign="start" fontSize="20px" fontWeight={700}>
                {document_type || ''}
              </Text>
              <Text textAlign="start" fontSize="14px" fontWeight={400}>
                {exp_date ? `Expiration Date ${expiry_date} ` : 'No Expiry Date'}
              </Text>
            </VStack>
          ) : (
            <Text textAlign="start" fontSize="16px" fontWeight={500}>
              Uploaded ID
            </Text>
          )}
        </HStack>
        {!document_type ? (
          <Box>
            <AddIcon cursor={'pointer'} fontSize="24px" color="#374957" onClick={idOnOpen} />
            <UpdateId isOpen={idIsOpen} onClose={idOnClose} />
          </Box>
        ) : null}
      </HStack>
    </Container3>
  );
};
export default IdBox;
