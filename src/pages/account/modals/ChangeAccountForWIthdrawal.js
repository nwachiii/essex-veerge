import React from 'react';
import {Button, Popup} from '../../../ui-lib';
import {Box, Flex, Stack, Text, useDisclosure} from '@chakra-ui/react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faLandmark} from '@fortawesome/free-solid-svg-icons';
import {VscListSelection} from 'react-icons/vsc';
import {AiOutlineInfoCircle} from 'react-icons/ai';
import Link from 'next/link';
import {scrollBarStyles} from '../../../components/common/ScrollbarStyling';

export const ChangeAccountForWIthdrawal = ({handleChangeRecipient, bankData, modal}) => {
  return (
    <div>
      {/* <Button onClick={modal.onOpen} borderRadius='4px' fontSize='12px' fontWeight='400' _hover={{background: '#FFFFFF', border: '1px solid #191919', color: '#191919'}} right='3%' bottom='4%' position='absolute' type='button' variant='dark' w='fit-content' h='fit-content' p='5px 7px'>
				Change
			</Button>{' '} */}
      <Box cursor={'pointer'} right="3%" bottom="9%" position="absolute">
        <VscListSelection style={{fontWeight: '600', fontSize: '27px'}} onClick={modal.onOpen} />
      </Box>
      <Popup
        minW="428px"
        minH="fit-content"
        h={bankData.length == 1 ? 'fit-content' : '380px'}
        pt="21px"
        px="31px"
        mt="20vh"
        isOpen={modal?.isOpen}
        onClose={modal?.onClose}
      >
        <Text fontSize="24px" fontWeight={600}>
          Choose Recipient
        </Text>

        <Popup.Body overflowY="auto" css={scrollBarStyles}>
          <Flex
            py={4}
            w="full"
            h="fit-content"
            bg="#EAEAEA"
            borderRadius={'12px'}
            align={'center'}
            mx="auto"
            gap="10px"
            px={4}
          >
            <AiOutlineInfoCircle style={{height: '54px', width: '44px'}} />
            <Text fontSize={'14px'}>
              This shows a list of all accounts you added in settings. If your desired recipient is
              not on the list,{' '}
              <Link href="/settings" style={{color: '#4545FE'}}>
                go to settings
              </Link>{' '}
              to add a new recipient
            </Text>
          </Flex>
          <Stack mt="20px">
            {bankData?.map((item, idx) => (
              <Flex
                cursor={'pointer'}
                onClick={() => handleChangeRecipient(idx)}
                key={idx}
                border="1px solid #EAEAEA"
                borderRadius={'12px'}
                px="20px"
                py="10px"
                w="full"
                direction="row"
                alignItems="center"
                justifyContent="flex-start"
              >
                <FontAwesomeIcon icon={faLandmark} className="w-16 h-16 mr-8" />
                <Flex w="full" direction="column" alignItems="flex-start" justifyContent="center">
                  <Text fontWeight="600" fontSize="16px" clor="#606060">
                    {item?.account_name}
                  </Text>
                  <Text fontWeight="400" fontSize="14px" clor="#606060" mt="10px">
                    {item?.account_number}
                  </Text>
                  <Text fontWeight="400" fontSize="14px" clor="#606060" mt="10px">
                    {item?.bank_name}
                  </Text>
                </Flex>
              </Flex>
            ))}
          </Stack>
        </Popup.Body>
      </Popup>
    </div>
  );
};

export default ChangeAccountForWIthdrawal;
