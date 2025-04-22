import React, {useState} from 'react';
import {Box, Image, Text, Flex} from '@chakra-ui/react';
import VeergeAI from '@/components/assets/VeergeAI';
import {TypingAnimation} from '../TypingAnimation';

const BodySection = ({
  testSamples,
  setInputMsg,
  inputMsg,
  listOptions,
  setListOptions,
  messages,
}) => {
  // const [listOptions, setListOptions] = useState(true);

  return (
    <Flex flex="1" direction={'column'} justify={'flex-end'} gap={'34px'}>
      {listOptions ? (
        <>
          <Flex mt="43px" direction="column" gap="7px" justifyContent="center" alignItems="center">
            <VeergeAI />
            <Text fontSize="24px" fontWeight={500} lineHeight={'20px'} color="#344054">
              Welcome to Veerge AI
            </Text>
            <Text fontSize={'14px'} lineHeight="22px" fontWeight={400} color={'#667085'}>
              Here’s something I can help you do
            </Text>
          </Flex>

          <Box pb="30px">
            <Flex flexWrap={'wrap'} gap={'10px'}>
              {testSamples?.map((single, index) => (
                <Flex
                  boxSizing="content-box"
                  padding="8px 16px"
                  border="1px #D0D5DD solid"
                  w={index === 0 ? '158px' : index === 1 ? '185px' : 'fit-content'}
                  borderRadius="4px"
                  fontSize="14px"
                  fontWeight={400}
                  color="#667085"
                  cursor="pointer"
                  onClick={() => (setInputMsg(single), setListOptions(false))}
                  key={index}
                  align={'center'}
                >
                  {single}
                </Flex>
              ))}
            </Flex>
          </Box>
        </>
      ) : (
        <Flex direction={'column'} justify={'flex-end'} w="full" pb="10px" gap={'18px'} mt="auto">
          {messages?.map((el, i) => (
            <>
              <Flex
                gap={el?.sender === 'veerge_ai' ? '18px' : '0px'}
                align={'flex-start'}
                w="full"
                justify={el.sender === 'user' ? 'flex-end' : 'flex-start'}
                key={i}
              >
                {el?.sender === 'user' ? (
                  <Box
                    bg="#4E5BA6"
                    px="16px"
                    py="4px"
                    w="fit-content"
                    maxW="85%"
                    borderRadius={'4px'}
                    color={'#fff'}
                  >
                    <Text fontSize={'14px'} fontWeight={400}>
                      {el?.message}
                    </Text>
                  </Box>
                ) : el?.sender === 'veerge_ai' ? (
                  <>
                    <VeergeAI h="48px" w="48px" />
                    <Box
                      bg="#F8F9FC"
                      px="16px"
                      py="4px"
                      w="fit-content"
                      maxW="73%"
                      borderRadius={'4px'}
                      color={'#4E5BA6'}
                    >
                      <Text fontSize={'14px'} fontWeight={400}>
                        <TypingAnimation text={el?.message} interval={10} delay={500} />
                      </Text>
                    </Box>
                  </>
                ) : (
                  <></>
                )}
              </Flex>
            </>
          ))}
        </Flex>
      )}
    </Flex>
  );
};

export default BodySection;
