import React, {useState} from 'react';
import {
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Show,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import {SlArrowRight} from 'react-icons/sl';
import {GrHomeRounded} from 'react-icons/gr';
import {MdSubdirectoryArrowLeft} from 'react-icons/md';
import {CiSearch} from 'react-icons/ci';
import {searchData} from './data';
import styles from './Search.module.css';
import Link from 'next/link';

export const TermsConditionsSearchbar = () => {
  const scrollBehavior = 'inside';
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [query, setQuery] = useState('');
  return (
    <>
      <Show breakpoint="(min-width: 769px)">
        <Flex
          w="100%"
          px="78px"
          maxW="1500px"
          height="67px"
          direction="row"
          justify="space-between"
          align="center"
          position="fixed"
          top="82px"
          zIndex="1"
          bg="#ffffff"
          boxShadow="0px 4px 8px rgba(0, 0, 0, 0.02)"
        >
          <Flex maxW="319px" direction="row" columnGap="18px" align="center">
            <Link href="/">
              <GrHomeRounded />
            </Link>{' '}
            <SlArrowRight />
            <Link
              href="terms-conditions"
              style={{
                textDecoration: 'none',
                href: 'fisrt_time_setup',
                color: '#5D5FEF',
                fontStyle: 'normal',
                fontWeight: '400',
                fontSize: '14px',
                lineHeight: '18px',
              }}
            >
              Terms of Service
            </Link>
          </Flex>
          <form>
            <Flex
              direction="row"
              align="center"
              maxW="300px"
              h="43px"
              bg="#F5F5F5"
              border=" 1px solid #E4E4E4"
              borderRadius=" 12px"
              pr="5px"
            >
              <Input
                placeholder="Search for a topic"
                type="text"
                border="none"
                FontWeight="400"
                fontSize="12px"
                lineHeight="15px"
                color="#606060"
                onClick={onOpen}
                _focusVisible={{
                  border: 'none',
                }}
              />
              <CiSearch style={{width: '25px', height: '25px'}} />
            </Flex>
          </form>
          <Modal
            onClose={onClose}
            isOpen={isOpen}
            motionPreset="slideInBottom"
            scrollBehavior={scrollBehavior}
          >
            <ModalOverlay bg="rgba(0,0,0,0.2)" />
            <ModalContent>
              <ModalBody>
                <Flex direction="row" align="center">
                  <CiSearch style={{width: '25px', height: '25px'}} />
                  <Input
                    placeholder="Search the docs"
                    type="text"
                    border="none"
                    FontWeight="400"
                    fontSize="12px"
                    lineHeight="15px"
                    color="#606060"
                    onClick={onOpen}
                    _focusVisible={{
                      border: 'none',
                    }}
                    onChange={event => setQuery(event.target.value)}
                  />
                </Flex>

                {searchData
                  .filter(data => {
                    if (query === '') {
                      return null;
                    } else if (data.searchQuery.toLowerCase().includes(query.toLowerCase())) {
                      return data;
                    }
                  })
                  .map((data, index) => {
                    const {route, topic} = data;
                    return (
                      <Flex
                        key={index}
                        direction="column"
                        rowGap="4px"
                        justify="center"
                        align="center"
                        mt="20px"
                        width="400px"
                      >
                        <Link href={route} className={styles.a__}>
                          <Flex
                            direction="row"
                            justify="space-between"
                            className={styles.link__}
                            px="15px"
                            align="center"
                            onClick={onClose}
                          >
                            <Text>{topic}</Text>

                            <MdSubdirectoryArrowLeft />
                          </Flex>
                        </Link>
                      </Flex>
                    );
                  })}
              </ModalBody>
            </ModalContent>
          </Modal>
        </Flex>
      </Show>
      <Show breakpoint="(max-width: 768px)">
        <form>
          <Flex
            direction="row"
            align="center"
            maxW="320px"
            h="43px"
            bg="#F5F5F5"
            border=" 1px solid #E4E4E4"
            borderRadius=" 12px"
            pr="5px"
            mt="20px"
          >
            <Input
              placeholder="Search for a topic"
              type="text"
              border="none"
              FontWeight="400"
              fontSize="12px"
              lineHeight="15px"
              color="#606060"
              onClick={onOpen}
              _focusVisible={{
                border: 'none',
              }}
            />
            <CiSearch style={{width: '25px', height: '25px'}} />
          </Flex>
        </form>
        <Modal
          onClose={onClose}
          isOpen={isOpen}
          motionPreset="slideInBottom"
          scrollBehavior={scrollBehavior}
        >
          <ModalOverlay bg="rgba(0,0,0,0.2)" />
          <ModalContent w={{base: '370px', md: '500px'}}>
            <ModalBody>
              <Flex direction="row" align="center">
                <CiSearch style={{width: '25px', height: '25px'}} />
                <Input
                  placeholder="Search the docs"
                  type="text"
                  border="none"
                  FontWeight="400"
                  fontSize="12px"
                  lineHeight="15px"
                  color="#606060"
                  onClick={onOpen}
                  _focusVisible={{
                    border: 'none',
                  }}
                  onChange={event => setQuery(event.target.value)}
                />
              </Flex>

              {searchData
                .filter(data => {
                  if (query === '') {
                    return null;
                  } else if (data.searchQuery.toLowerCase().includes(query.toLowerCase())) {
                    return data;
                  }
                })
                .map((data, index) => {
                  const {route, topic} = data;
                  return (
                    <Flex
                      key={index}
                      mt="20px"
                      rowGap="4px"
                      direction="column"
                      justify="center"
                      align="center"
                      width="320px"
                    >
                      <Link href={route} className={styles.a__}>
                        <Flex
                          direction="row"
                          justify="space-between"
                          className={styles.link__}
                          px="15px"
                          align="center"
                          onClick={onClose}
                        >
                          <Text>{topic}</Text>

                          <MdSubdirectoryArrowLeft />
                        </Flex>
                      </Link>
                    </Flex>
                  );
                })}
            </ModalBody>
          </ModalContent>
        </Modal>
      </Show>
    </>
  );
};

export default TermsConditionsSearchbar;
