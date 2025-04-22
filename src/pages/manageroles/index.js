import {
  Box,
  HStack,
  Image,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import React from 'react';
import {HiMiniArrowRightCircle, HiMiniArrowLeftCircle} from 'react-icons/hi2';
import {LayoutView} from '../../components';
import {BackArrowWithText} from '../../components/assets/BackArrow';
import check from '/src/images/icons/check_manageroles.png';
import upcursor from '/src/images/icons/Arrow-Right1.png';
import upcursorfade from '/src/images/icons/Arrow-Right1Fade.png';
import downcursorfade from '/src/images/icons/Arrow-Right2Fade.png';

import downcursor from '/src/images/icons/Arrow-Right2.png';
import {BsCheckCircleFill} from 'react-icons/bs';

const ManageRoles = () => {
  const [change, setChange] = React.useState(false);
  return (
    <LayoutView manageroles>
      <Box mt="10vh" mb="23px" pl="15px" w="fit-content">
        <BackArrowWithText text="Manage Roles" />
      </Box>

      <TableContainer border="1px solid #e5e5e5" borderRadius="16px" mb={8}>
        <Table variant="striped" colorScheme="gray">
          <Thead h="96px">
            <Tr bg="white">
              <Th></Th>
              <Th>
                <HStack w="full" spacing="40px">
                  {/* <Image cursor='pointer' onClick={() => setChange(false)} m='0px' filter='brightness(50%)' alt='cursor' src={change ? downcursor.src : downcursorfade.src} /> */}
                  <HiMiniArrowLeftCircle
                    fontSize={'32px'}
                    onClick={() => setChange(false)}
                    style={{
                      cursor: 'pointer',
                      m: '0px',
                      filter: 'brightness(50%)',
                    }}
                  />
                  <Text
                    textTransform="capitalize"
                    as="span"
                    fontSize="17px"
                    color="#191919"
                    fontWeight="500"
                  >
                    {change ? 'Project sales lead' : 'Admin'}
                  </Text>
                </HStack>
              </Th>
              <Th>
                <HStack>
                  <Text
                    textTransform="capitalize"
                    as="span"
                    fontSize="17px"
                    color="#191919"
                    fontWeight="500"
                  >
                    {change ? 'Sales Agent' : 'Finance Controller'}
                  </Text>
                </HStack>
              </Th>
              <Th>
                <HStack>
                  <Text
                    textTransform="capitalize"
                    as="span"
                    fontSize="17px"
                    color="#191919"
                    fontWeight="500"
                  >
                    {change ? 'Marketers/sales' : 'General Head of Sales'}
                  </Text>
                </HStack>
              </Th>
              <Th>
                <HStack>
                  <Text
                    textTransform="capitalize"
                    as="span"
                    fontSize="17px"
                    color="#191919"
                    fontWeight="500"
                  >
                    {change ? 'Customer support' : 'Head of Sales'}
                  </Text>
                </HStack>
              </Th>
              <Th>
                <HStack w="full" spacing="40px">
                  <Text
                    textTransform="capitalize"
                    as="span"
                    fontSize="17px"
                    color="#191919"
                    fontWeight="500"
                  >
                    {change ? 'Front Desk' : 'Project Manager'}
                  </Text>
                  {/* <Image cursor='pointer' m='0px' onClick={() => setChange(true)} alt='cursor' src={change ? upcursorfade.src : upcursor.src} /> */}
                  <HiMiniArrowRightCircle
                    fontSize={32}
                    onClick={() => setChange(false)}
                    style={{
                      cursor: 'pointer',
                      m: '0px',
                      filter: 'brightness(50%)',
                    }}
                  />
                </HStack>
              </Th>
            </Tr>
          </Thead>

          <Tbody bg="white">
            <Tr>
              <Td>
                <Text pl="20px" as="span" fontSize="14px" fontWeight="500" color="#000000">
                  Dashboard Access
                </Text>
              </Td>
              <Td>
                <HStack w="full" justify={change ? 'center' : 'end'}>
                  {/* <Image m='0px' alt='check' src={check.src} /> */}
                  <BsCheckCircleFill fontSize={20} style={{color: '#191919'}} />
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  {/* <Image m='0px' alt='check' src={check.src} /> */}
                  <BsCheckCircleFill fontSize={20} style={{color: '#191919'}} />
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  {/* <Image m='0px' alt='check' src={check.src} /> */}
                  <BsCheckCircleFill fontSize={20} style={{color: '#191919'}} />
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  {/* <Image m='0px' alt='check' src={check.src} /> */}
                  <BsCheckCircleFill fontSize={20} style={{color: '#191919'}} />
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  {/* <Image m='0px' alt='check' src={check.src} /> */}
                  <BsCheckCircleFill fontSize={20} style={{color: '#191919'}} />
                </HStack>
              </Td>
            </Tr>
            <Tr>
              <Td>
                <Text pl="20px" as="span" fontSize="14px" fontWeight="500" color="#000000">
                  Download report from dashboard
                </Text>
              </Td>
              <Td>
                <HStack w="full" justify={change ? 'center' : 'end'}>
                  {/* <Image m='0px' alt='check' src={check.src} /> */}
                  <BsCheckCircleFill fontSize={20} style={{color: '#191919'}} />
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  {/* <Image m='0px' alt='check' src={check.src} /> */}
                  <BsCheckCircleFill fontSize={20} style={{color: '#191919'}} />
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  <Text as="span" h="0px" border="solid 1.5px #191919 " w="13px"></Text>
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  <Text as="span" h="0px" border="solid 1.5px #191919 " w="13px"></Text>
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  <Text as="span" h="0px" border="solid 1.5px #191919 " w="13px"></Text>
                </HStack>
              </Td>
            </Tr>
            <Tr>
              <Td>
                <Text pl="20px" as="span" fontSize="14px" fontWeight="500" color="#000000">
                  Access to Web store
                </Text>
              </Td>
              <Td>
                <HStack w="full" justify={change ? 'center' : 'end'}>
                  {
                    /* {change ? <Text as='span' h='0px' border='solid 1.5px #191919 ' w='13px'></Text> : <Image m='0px' alt='check' src={check.src} />} */ <BsCheckCircleFill
                      fontSize={20}
                      style={{color: '#191919'}}
                    />
                  }
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  <Text as="span" h="0px" border="solid 1.5px #191919 " w="13px"></Text>
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  <Text as="span" h="0px" border="solid 1.5px #191919 " w="13px"></Text>
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  <Text as="span" h="0px" border="solid 1.5px #191919 " w="13px"></Text>
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  <Text as="span" h="0px" border="solid 1.5px #191919 " w="13px"></Text>
                </HStack>
              </Td>
            </Tr>
            <Tr>
              <Td>
                <Text pl="20px" as="span" fontSize="14px" fontWeight="500" color="#000000">
                  Create listings
                </Text>
              </Td>
              <Td>
                <HStack w="full" justify={change ? 'center' : 'end'}>
                  {
                    /* {change ? <Text as='span' h='0px' border='solid 1.5px #191919 ' w='13px'></Text> : <Image m='0px' alt='check' src={check.src} />} */ <BsCheckCircleFill
                      fontSize={20}
                      style={{color: '#191919'}}
                    />
                  }
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  {/* <Image m='0px' alt='check' src={check.src} /> */}
                  <BsCheckCircleFill fontSize={20} style={{color: '#191919'}} />
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  <Text as="span" h="0px" border="solid 1.5px #191919 " w="13px"></Text>
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  <Text as="span" h="0px" border="solid 1.5px #191919 " w="13px"></Text>
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  <Text as="span" h="0px" border="solid 1.5px #191919 " w="13px"></Text>
                </HStack>
              </Td>
            </Tr>
            <Tr>
              <Td>
                <Text pl="20px" as="span" fontSize="14px" fontWeight="500" color="#000000">
                  Edit listing
                </Text>
              </Td>
              <Td>
                <HStack w="full" justify={change ? 'center' : 'end'}>
                  {
                    /* {change ? <Text as='span' h='0px' border='solid 1.5px #191919 ' w='13px'></Text> : <Image m='0px' alt='check' src={check.src} />} */ <BsCheckCircleFill
                      fontSize={20}
                      style={{color: '#191919'}}
                    />
                  }
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  {/* <Image m='0px' alt='check' src={check.src} /> */}
                  <BsCheckCircleFill fontSize={20} style={{color: '#191919'}} />
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  <Text as="span" h="0px" border="solid 1.5px #191919 " w="13px"></Text>
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  <Text as="span" h="0px" border="solid 1.5px #191919 " w="13px"></Text>
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  <Text as="span" h="0px" border="solid 1.5px #191919 " w="13px"></Text>
                </HStack>
              </Td>
            </Tr>
            <Tr>
              <Td>
                <Text pl="20px" as="span" fontSize="14px" fontWeight="500" color="#000000">
                  View listing
                </Text>
              </Td>
              <Td>
                <HStack w="full" justify={change ? 'center' : 'end'}>
                  {
                    /* {change ? <Text as='span' h='0px' border='solid 1.5px #191919 ' w='13px'></Text> : <Image m='0px' alt='check' src={check.src} />} */ <BsCheckCircleFill
                      fontSize={20}
                      style={{color: '#191919'}}
                    />
                  }
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  {/* <Image m='0px' alt='check' src={check.src} /> */}
                  <BsCheckCircleFill fontSize={20} style={{color: '#191919'}} />
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  {/* <Image m='0px' alt='check' src={check.src} /> */}
                  <BsCheckCircleFill fontSize={20} style={{color: '#191919'}} />
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  {/* <Image m='0px' alt='check' src={check.src} /> */}
                  <BsCheckCircleFill fontSize={20} style={{color: '#191919'}} />
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  {/* <Image m='0px' alt='check' src={check.src} /> */}
                  <BsCheckCircleFill fontSize={20} style={{color: '#191919'}} />
                </HStack>
              </Td>
            </Tr>
            <Tr>
              <Td>
                <Text pl="20px" as="span" fontSize="14px" fontWeight="500" color="#000000">
                  Create a user account
                </Text>
              </Td>
              <Td>
                <HStack w="full" justify={change ? 'center' : 'end'}>
                  {
                    /* {change ? <Text as='span' h='0px' border='solid 1.5px #191919 ' w='13px'></Text> : <Image m='0px' alt='check' src={check.src} />} */ <BsCheckCircleFill
                      fontSize={20}
                      style={{color: '#191919'}}
                    />
                  }
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  {/* <Image m='0px' alt='check' src={check.src} /> */}
                  <BsCheckCircleFill fontSize={20} style={{color: '#191919'}} />
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  {/* <Image m='0px' alt='check' src={check.src} /> */}
                  <BsCheckCircleFill fontSize={20} style={{color: '#191919'}} />
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  {/* <Image m='0px' alt='check' src={check.src} /> */}
                  <BsCheckCircleFill fontSize={20} style={{color: '#191919'}} />
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  {/* <Image m='0px' alt='check' src={check.src} /> */}
                  <BsCheckCircleFill fontSize={20} style={{color: '#191919'}} />
                </HStack>
              </Td>
            </Tr>
            <Tr>
              <Td>
                <Text pl="20px" as="span" fontSize="14px" fontWeight="500" color="#000000">
                  View users
                </Text>
              </Td>
              <Td>
                <HStack w="full" justify={change ? 'center' : 'end'}>
                  {/* <Image m='0px' alt='check' src={check.src} /> */}
                  <BsCheckCircleFill fontSize={20} style={{color: '#191919'}} />
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  {/* <Image m='0px' alt='check' src={check.src} /> */}
                  <BsCheckCircleFill fontSize={20} style={{color: '#191919'}} />
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  {/* <Image m='0px' alt='check' src={check.src} /> */}
                  <BsCheckCircleFill fontSize={20} style={{color: '#191919'}} />
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  {/* <Image m='0px' alt='check' src={check.src} /> */}
                  <BsCheckCircleFill fontSize={20} style={{color: '#191919'}} />
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  {/* <Image m='0px' alt='check' src={check.src} /> */}
                  <BsCheckCircleFill fontSize={20} style={{color: '#191919'}} />
                </HStack>
              </Td>
            </Tr>
            <Tr>
              <Td>
                <Text pl="20px" as="span" fontSize="14px" fontWeight="500" color="#000000">
                  Blacklist user
                </Text>
              </Td>
              <Td>
                <HStack w="full" justify={change ? 'center' : 'end'}>
                  {
                    /* {change ? <Text as='span' h='0px' border='solid 1.5px #191919 ' w='13px'></Text> : <Image m='0px' alt='check' src={check.src} />} */ <BsCheckCircleFill
                      fontSize={20}
                      style={{color: '#191919'}}
                    />
                  }
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  {/* <Image m='0px' alt='check' src={check.src} /> */}
                  <BsCheckCircleFill fontSize={20} style={{color: '#191919'}} />
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  {/* <Image m='0px' alt='check' src={check.src} /> */}
                  <BsCheckCircleFill fontSize={20} style={{color: '#191919'}} />
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  <Text as="span" h="0px" border="solid 1.5px #191919 " w="13px"></Text>
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  <Text as="span" h="0px" border="solid 1.5px #191919 " w="13px"></Text>
                </HStack>
              </Td>
            </Tr>
            <Tr>
              <Td>
                <Text pl="20px" as="span" fontSize="14px" fontWeight="500" color="#000000">
                  Send private offers to users
                </Text>
              </Td>
              <Td>
                <HStack w="full" justify={change ? 'center' : 'end'}>
                  {/* <Image m='0px' alt='check' src={check.src} /> */}
                  <BsCheckCircleFill fontSize={20} style={{color: '#191919'}} />
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  {/* <Image m='0px' alt='check' src={check.src} /> */}
                  <BsCheckCircleFill fontSize={20} style={{color: '#191919'}} />
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  {/* <Image m='0px' alt='check' src={check.src} /> */}
                  <BsCheckCircleFill fontSize={20} style={{color: '#191919'}} />
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  <Text as="span" fontSize="12px" fontWeight="300" color="#000000">
                    Requires Approval
                  </Text>
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  <Text as="span" fontSize="12px" fontWeight="300" color="#000000">
                    Requires Approval
                  </Text>
                </HStack>
              </Td>
            </Tr>
            <Tr>
              <Td>
                <Text pl="20px" as="span" fontSize="14px" fontWeight="500" color="#000000">
                  View customer’s transactions
                </Text>
              </Td>
              <Td>
                <HStack w="full" justify={change ? 'center' : 'end'}>
                  {/* <Image m='0px' alt='check' src={check.src} /> */}
                  <BsCheckCircleFill fontSize={20} style={{color: '#191919'}} />
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  {/* <Image m='0px' alt='check' src={check.src} /> */}
                  <BsCheckCircleFill fontSize={20} style={{color: '#191919'}} />
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  {/* <Image m='0px' alt='check' src={check.src} /> */}
                  <BsCheckCircleFill fontSize={20} style={{color: '#191919'}} />
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  {/* <Image m='0px' alt='check' src={check.src} /> */}
                  <BsCheckCircleFill fontSize={20} style={{color: '#191919'}} />
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  <Text as="span" h="0px" border="solid 1.5px #191919 " w="13px"></Text>
                </HStack>
              </Td>
            </Tr>
            <Tr>
              <Td>
                <Text pl="20px" as="span" fontSize="14px" fontWeight="500" color="#000000">
                  Send customer’s message
                </Text>
              </Td>
              <Td>
                <HStack w="full" justify={change ? 'center' : 'end'}>
                  {/* <Image m='0px' alt='check' src={check.src} /> */}
                  <BsCheckCircleFill fontSize={20} style={{color: '#191919'}} />
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  {/* <Image m='0px' alt='check' src={check.src} /> */}
                  <BsCheckCircleFill fontSize={20} style={{color: '#191919'}} />
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  {/* <Image m='0px' alt='check' src={check.src} /> */}
                  <BsCheckCircleFill fontSize={20} style={{color: '#191919'}} />
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  {/* <Image m='0px' alt='check' src={check.src} /> */}
                  <BsCheckCircleFill fontSize={20} style={{color: '#191919'}} />
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  {/* <Image m='0px' alt='check' src={check.src} /> */}
                  <BsCheckCircleFill fontSize={20} style={{color: '#191919'}} />
                </HStack>
              </Td>
            </Tr>
            <Tr>
              <Td>
                <Text pl="20px" as="span" fontSize="14px" fontWeight="500" color="#000000">
                  Accept or reject inspection request
                </Text>
              </Td>
              <Td>
                <HStack w="full" justify={change ? 'center' : 'end'}>
                  {/* <Image m='0px' alt='check' src={check.src} /> */}
                  <BsCheckCircleFill fontSize={20} style={{color: '#191919'}} />
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  {/* <Image m='0px' alt='check' src={check.src} /> */}
                  <BsCheckCircleFill fontSize={20} style={{color: '#191919'}} />
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  {/* <Image m='0px' alt='check' src={check.src} /> */}
                  <BsCheckCircleFill fontSize={20} style={{color: '#191919'}} />
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  {/* <Image m='0px' alt='check' src={check.src} /> */}
                  <BsCheckCircleFill fontSize={20} style={{color: '#191919'}} />
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  {/* <Image m='0px' alt='check' src={check.src} /> */}
                  <BsCheckCircleFill fontSize={20} style={{color: '#191919'}} />
                </HStack>
              </Td>
            </Tr>
            <Tr>
              <Td>
                <Text pl="20px" as="span" fontSize="14px" fontWeight="500" color="#000000">
                  View customers ID
                </Text>
              </Td>
              <Td>
                <HStack w="full" justify={change ? 'center' : 'end'}>
                  {/* <Image m='0px' alt='check' src={check.src} /> */}
                  <BsCheckCircleFill fontSize={20} style={{color: '#191919'}} />
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  {/* <Image m='0px' alt='check' src={check.src} /> */}
                  <BsCheckCircleFill fontSize={20} style={{color: '#191919'}} />
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  {/* <Image m='0px' alt='check' src={check.src} /> */}
                  <BsCheckCircleFill fontSize={20} style={{color: '#191919'}} />
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  {/* <Image m='0px' alt='check' src={check.src} /> */}
                  <BsCheckCircleFill fontSize={20} style={{color: '#191919'}} />
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  {/* <Image m='0px' alt='check' src={check.src} /> */}
                  <BsCheckCircleFill fontSize={20} style={{color: '#191919'}} />
                </HStack>
              </Td>
            </Tr>
            <Tr>
              <Td>
                <Text pl="20px" as="span" fontSize="14px" fontWeight="500" color="#000000">
                  View customer’s documents status
                </Text>
              </Td>
              <Td>
                <HStack w="full" justify={change ? 'center' : 'end'}>
                  {/* <Image m='0px' alt='check' src={check.src} /> */}
                  <BsCheckCircleFill fontSize={20} style={{color: '#191919'}} />
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  {/* <Image m='0px' alt='check' src={check.src} /> */}
                  <BsCheckCircleFill fontSize={20} style={{color: '#191919'}} />
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  {/* <Image m='0px' alt='check' src={check.src} /> */}
                  <BsCheckCircleFill fontSize={20} style={{color: '#191919'}} />
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  {/* <Image m='0px' alt='check' src={check.src} /> */}
                  <BsCheckCircleFill fontSize={20} style={{color: '#191919'}} />
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  {/* <Image m='0px' alt='check' src={check.src} /> */}
                  <BsCheckCircleFill fontSize={20} style={{color: '#191919'}} />
                </HStack>
              </Td>
            </Tr>
            <Tr>
              <Td>
                <Text pl="20px" as="span" fontSize="14px" fontWeight="500" color="#000000">
                  Manage agents
                </Text>
              </Td>
              <Td>
                <HStack w="full" justify={change ? 'center' : 'end'}>
                  {/* <Image m='0px' alt='check' src={check.src} /> */}
                  <BsCheckCircleFill fontSize={20} style={{color: '#191919'}} />
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  {/* <Image m='0px' alt='check' src={check.src} /> */}
                  <BsCheckCircleFill fontSize={20} style={{color: '#191919'}} />
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  <Text as="span" h="0px" border="solid 1.5px #191919 " w="13px"></Text>
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  <Text as="span" h="0px" border="solid 1.5px #191919 " w="13px"></Text>
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  <Text as="span" h="0px" border="solid 1.5px #191919 " w="13px"></Text>
                </HStack>
              </Td>
            </Tr>
            <Tr>
              <Td>
                <Text pl="20px" as="span" fontSize="14px" fontWeight="500" color="#000000">
                  Access to account overview
                </Text>
              </Td>
              <Td>
                <HStack w="full" justify={change ? 'center' : 'end'}>
                  {/* <Image m='0px' alt='check' src={check.src} /> */}
                  <BsCheckCircleFill fontSize={20} style={{color: '#191919'}} />
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  {/* <Image m='0px' alt='check' src={check.src} /> */}
                  <BsCheckCircleFill fontSize={20} style={{color: '#191919'}} />
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  <Text as="span" h="0px" border="solid 1.5px #191919 " w="13px"></Text>
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  <Text as="span" h="0px" border="solid 1.5px #191919 " w="13px"></Text>
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  <Text as="span" h="0px" border="solid 1.5px #191919 " w="13px"></Text>
                </HStack>
              </Td>
            </Tr>
            <Tr>
              <Td>
                <Text pl="20px" as="span" fontSize="14px" fontWeight="500" color="#000000">
                  Download account report
                </Text>
              </Td>
              <Td>
                <HStack w="full" justify={change ? 'center' : 'end'}>
                  {/* <Image m='0px' alt='check' src={check.src} /> */}
                  <BsCheckCircleFill fontSize={20} style={{color: '#191919'}} />
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  {/* <Image m='0px' alt='check' src={check.src} /> */}
                  <BsCheckCircleFill fontSize={20} style={{color: '#191919'}} />
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  <Text as="span" h="0px" border="solid 1.5px #191919 " w="13px"></Text>
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  <Text as="span" h="0px" border="solid 1.5px #191919 " w="13px"></Text>
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  <Text as="span" h="0px" border="solid 1.5px #191919 " w="13px"></Text>
                </HStack>
              </Td>
            </Tr>
            <Tr>
              <Td>
                <Text pl="20px" as="span" fontSize="14px" fontWeight="500" color="#000000">
                  Access to request overview
                </Text>
              </Td>
              <Td>
                <HStack w="full" justify={change ? 'center' : 'end'}>
                  {/* <Image m='0px' alt='check' src={check.src} /> */}
                  <BsCheckCircleFill fontSize={20} style={{color: '#191919'}} />
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  {/* <Image m='0px' alt='check' src={check.src} /> */}
                  <BsCheckCircleFill fontSize={20} style={{color: '#191919'}} />
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  <Text as="span" fontSize="12px" fontWeight="300" color="#000000">
                    Partial access
                  </Text>
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  <Text as="span" fontSize="12px" fontWeight="300" color="#000000">
                    Partial access
                  </Text>
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  <Text as="span" fontSize="12px" fontWeight="300" color="#000000">
                    Partial access
                  </Text>
                </HStack>
              </Td>
            </Tr>
            <Tr>
              <Td>
                <Text pl="20px" as="span" fontSize="14px" fontWeight="500" color="#000000">
                  Access to inspection request{' '}
                </Text>
              </Td>
              <Td>
                <HStack w="full" justify={change ? 'center' : 'end'}>
                  {/* <Image m='0px' alt='check' src={check.src} /> */}
                  <BsCheckCircleFill fontSize={20} style={{color: '#191919'}} />
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  {/* <Image m='0px' alt='check' src={check.src} /> */}
                  <BsCheckCircleFill fontSize={20} style={{color: '#191919'}} />
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  {/* <Image m='0px' alt='check' src={check.src} /> */}
                  <BsCheckCircleFill fontSize={20} style={{color: '#191919'}} />
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  {/* <Image m='0px' alt='check' src={check.src} /> */}
                  <BsCheckCircleFill fontSize={20} style={{color: '#191919'}} />
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  {/* <Image m='0px' alt='check' src={check.src} /> */}
                  <BsCheckCircleFill fontSize={20} style={{color: '#191919'}} />
                </HStack>
              </Td>
            </Tr>
            <Tr>
              <Td>
                <Text pl="20px" as="span" fontSize="14px" fontWeight="500" color="#000000">
                  Access to deed request
                </Text>
              </Td>
              <Td>
                <HStack w="full" justify={change ? 'center' : 'end'}>
                  {/* <Image m='0px' alt='check' src={check.src} /> */}
                  <BsCheckCircleFill fontSize={20} style={{color: '#191919'}} />
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  {/* <Image m='0px' alt='check' src={check.src} /> */}
                  <BsCheckCircleFill fontSize={20} style={{color: '#191919'}} />
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  <Text as="span" h="0px" border="solid 1.5px #191919 " w="13px"></Text>
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  <Text as="span" h="0px" border="solid 1.5px #191919 " w="13px"></Text>
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  <Text as="span" h="0px" border="solid 1.5px #191919 " w="13px"></Text>
                </HStack>
              </Td>
            </Tr>
            <Tr>
              <Td>
                <Text pl="20px" as="span" fontSize="14px" fontWeight="500" color="#000000">
                  Access to allocation request{' '}
                </Text>
              </Td>
              <Td>
                <HStack w="full" justify={change ? 'center' : 'end'}>
                  {/* <Image m='0px' alt='check' src={check.src} /> */}
                  <BsCheckCircleFill fontSize={20} style={{color: '#191919'}} />
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  {/* <Image m='0px' alt='check' src={check.src} /> */}
                  <BsCheckCircleFill fontSize={20} style={{color: '#191919'}} />
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  <Text as="span" h="0px" border="solid 1.5px #191919 " w="13px"></Text>
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  <Text as="span" h="0px" border="solid 1.5px #191919 " w="13px"></Text>
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  <Text as="span" h="0px" border="solid 1.5px #191919 " w="13px"></Text>
                </HStack>
              </Td>
            </Tr>
            <Tr>
              <Td>
                <Text pl="20px" as="span" fontSize="14px" fontWeight="500" color="#000000">
                  Access to account request{' '}
                </Text>
              </Td>
              <Td>
                <HStack w="full" justify={change ? 'center' : 'end'}>
                  {/* <Image m='0px' alt='check' src={check.src} /> */}
                  <BsCheckCircleFill fontSize={20} style={{color: '#191919'}} />
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  {/* <Image m='0px' alt='check' src={check.src} /> */}
                  <BsCheckCircleFill fontSize={20} style={{color: '#191919'}} />
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  <Text as="span" h="0px" border="solid 1.5px #191919 " w="13px"></Text>
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  <Text as="span" h="0px" border="solid 1.5px #191919 " w="13px"></Text>
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  <Text as="span" h="0px" border="solid 1.5px #191919 " w="13px"></Text>
                </HStack>
              </Td>
            </Tr>
            <Tr>
              <Td>
                <Text pl="20px" as="span" fontSize="14px" fontWeight="500" color="#000000">
                  Access to agent request{' '}
                </Text>
              </Td>
              <Td>
                <HStack w="full" justify={change ? 'center' : 'end'}>
                  {/* <Image m='0px' alt='check' src={check.src} /> */}
                  <BsCheckCircleFill fontSize={20} style={{color: '#191919'}} />
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  {/* <Image m='0px' alt='check' src={check.src} /> */}
                  <BsCheckCircleFill fontSize={20} style={{color: '#191919'}} />
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  <Text as="span" h="0px" border="solid 1.5px #191919 " w="13px"></Text>
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  <Text as="span" h="0px" border="solid 1.5px #191919 " w="13px"></Text>
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  <Text as="span" h="0px" border="solid 1.5px #191919 " w="13px"></Text>
                </HStack>
              </Td>
            </Tr>
            <Tr>
              <Td>
                <Text pl="20px" as="span" fontSize="14px" fontWeight="500" color="#000000">
                  Access to insight{' '}
                </Text>
              </Td>
              <Td>
                <HStack w="full" justify={change ? 'center' : 'end'}>
                  {/* <Image m='0px' alt='check' src={check.src} /> */}
                  <BsCheckCircleFill fontSize={20} style={{color: '#191919'}} />
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  {/* <Image m='0px' alt='check' src={check.src} /> */}
                  <BsCheckCircleFill fontSize={20} style={{color: '#191919'}} />
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  <Text as="span" h="0px" border="solid 1.5px #191919 " w="13px"></Text>
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  <Text as="span" h="0px" border="solid 1.5px #191919 " w="13px"></Text>
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  <Text as="span" h="0px" border="solid 1.5px #191919 " w="13px"></Text>
                </HStack>
              </Td>
            </Tr>
            <Tr>
              <Td>
                <Text pl="20px" as="span" fontSize="14px" fontWeight="500" color="#000000">
                  Send broadcast{' '}
                </Text>
              </Td>
              <Td>
                <HStack w="full" justify={change ? 'center' : 'end'}>
                  {/* <Image m='0px' alt='check' src={check.src} /> */}
                  <BsCheckCircleFill fontSize={20} style={{color: '#191919'}} />
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  {/* <Image m='0px' alt='check' src={check.src} /> */}
                  <BsCheckCircleFill fontSize={20} style={{color: '#191919'}} />
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  <Text as="span" h="0px" border="solid 1.5px #191919 " w="13px"></Text>
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  <Text as="span" h="0px" border="solid 1.5px #191919 " w="13px"></Text>
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  <Text as="span" h="0px" border="solid 1.5px #191919 " w="13px"></Text>
                </HStack>
              </Td>
            </Tr>
            <Tr>
              <Td>
                <Text pl="20px" as="span" fontSize="14px" fontWeight="500" color="#000000">
                  Access to suppport center
                </Text>
              </Td>
              <Td>
                <HStack w="full" justify={change ? 'center' : 'end'}>
                  {/* <Image m='0px' alt='check' src={check.src} /> */}
                  <BsCheckCircleFill fontSize={20} style={{color: '#191919'}} />
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  {/* <Image m='0px' alt='check' src={check.src} /> */}
                  <BsCheckCircleFill fontSize={20} style={{color: '#191919'}} />
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  <Text as="span" h="0px" border="solid 1.5px #191919 " w="13px"></Text>
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  <Text as="span" h="0px" border="solid 1.5px #191919 " w="13px"></Text>
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  <Text as="span" h="0px" border="solid 1.5px #191919 " w="13px"></Text>
                </HStack>
              </Td>
            </Tr>
            <Tr>
              <Td>
                <Text pl="20px" as="span" fontSize="14px" fontWeight="500" color="#000000">
                  Price change
                </Text>
              </Td>
              <Td>
                <HStack w="full" justify={change ? 'center' : 'end'}>
                  {/* <Image m='0px' alt='check' src={check.src} /> */}
                  <BsCheckCircleFill fontSize={20} style={{color: '#191919'}} />
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  {/* <Image m='0px' alt='check' src={check.src} /> */}
                  <BsCheckCircleFill fontSize={20} style={{color: '#191919'}} />
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  <Text as="span" h="0px" border="solid 1.5px #191919 " w="13px"></Text>
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  <Text as="span" h="0px" border="solid 1.5px #191919 " w="13px"></Text>
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  <Text as="span" h="0px" border="solid 1.5px #191919 " w="13px"></Text>
                </HStack>
              </Td>
            </Tr>
            <Tr>
              <Td>
                <Text pl="20px" as="span" fontSize="14px" fontWeight="500" color="#000000">
                  Refund
                </Text>
              </Td>
              <Td>
                <HStack w="full" justify={change ? 'center' : 'end'}>
                  {/* <Image m='0px' alt='check' src={check.src} /> */}
                  <BsCheckCircleFill fontSize={20} style={{color: '#191919'}} />
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  {/* <Image m='0px' alt='check' src={check.src} /> */}
                  <BsCheckCircleFill fontSize={20} style={{color: '#191919'}} />
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  <Text as="span" h="0px" border="solid 1.5px #191919 " w="13px"></Text>
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  <Text as="span" h="0px" border="solid 1.5px #191919 " w="13px"></Text>
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  <Text as="span" h="0px" border="solid 1.5px #191919 " w="13px"></Text>
                </HStack>
              </Td>
            </Tr>
            <Tr>
              <Td>
                <Text pl="20px" as="span" fontSize="14px" fontWeight="500" color="#000000">
                  Suspend payment plan
                </Text>
              </Td>
              <Td>
                <HStack w="full" justify={change ? 'center' : 'end'}>
                  {/* <Image m='0px' alt='check' src={check.src} /> */}
                  <BsCheckCircleFill fontSize={20} style={{color: '#191919'}} />
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  {/* <Image m='0px' alt='check' src={check.src} /> */}
                  <BsCheckCircleFill fontSize={20} style={{color: '#191919'}} />
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  <Text as="span" h="0px" border="solid 1.5px #191919 " w="13px"></Text>
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  <Text as="span" h="0px" border="solid 1.5px #191919 " w="13px"></Text>
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  <Text as="span" h="0px" border="solid 1.5px #191919 " w="13px"></Text>
                </HStack>
              </Td>
            </Tr>
            <Tr>
              <Td>
                <Text pl="20px" as="span" fontSize="14px" fontWeight="500" color="#000000">
                  Terminate payment plan
                </Text>
              </Td>
              <Td>
                <HStack w="full" justify={change ? 'center' : 'end'}>
                  {/* <Image m='0px' alt='check' src={check.src} /> */}
                  <BsCheckCircleFill fontSize={20} style={{color: '#191919'}} />
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  {/* <Image m='0px' alt='check' src={check.src} /> */}
                  <BsCheckCircleFill fontSize={20} style={{color: '#191919'}} />
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  <Text as="span" h="0px" border="solid 1.5px #191919 " w="13px"></Text>
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  <Text as="span" h="0px" border="solid 1.5px #191919 " w="13px"></Text>
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  <Text as="span" h="0px" border="solid 1.5px #191919 " w="13px"></Text>
                </HStack>
              </Td>
            </Tr>
            <Tr>
              <Td>
                <Text pl="20px" as="span" fontSize="14px" fontWeight="500" color="#000000">
                  Review
                </Text>
              </Td>
              <Td>
                <HStack w="full" justify={change ? 'center' : 'end'}>
                  {/* <Image m='0px' alt='check' src={check.src} /> */}
                  <BsCheckCircleFill fontSize={20} style={{color: '#191919'}} />
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  {/* <Image m='0px' alt='check' src={check.src} /> */}
                  <BsCheckCircleFill fontSize={20} style={{color: '#191919'}} />
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  <Text as="span" h="0px" border="solid 1.5px #191919 " w="13px"></Text>
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  <Text as="span" h="0px" border="solid 1.5px #191919 " w="13px"></Text>
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  <Text as="span" h="0px" border="solid 1.5px #191919 " w="13px"></Text>
                </HStack>
              </Td>
            </Tr>
            <Tr>
              <Td>
                <Text pl="20px" as="span" fontSize="14px" fontWeight="500" color="#000000">
                  Add notes
                </Text>
              </Td>
              <Td>
                <HStack w="full" justify={change ? 'center' : 'end'}>
                  {/* <Image m='0px' alt='check' src={check.src} /> */}
                  <BsCheckCircleFill fontSize={20} style={{color: '#191919'}} />
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  {/* <Image m='0px' alt='check' src={check.src} /> */}
                  <BsCheckCircleFill fontSize={20} style={{color: '#191919'}} />
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  <Text as="span" h="0px" border="solid 1.5px #191919 " w="13px"></Text>
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  <Text as="span" h="0px" border="solid 1.5px #191919 " w="13px"></Text>
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  <Text as="span" h="0px" border="solid 1.5px #191919 " w="13px"></Text>
                </HStack>
              </Td>
            </Tr>
            <Tr>
              <Td>
                <Text pl="20px" as="span" fontSize="14px" fontWeight="500" color="#000000">
                  Send messages
                </Text>
              </Td>
              <Td>
                <HStack w="full" justify={change ? 'center' : 'end'}>
                  {/* <Image m='0px' alt='check' src={check.src} /> */}
                  <BsCheckCircleFill fontSize={20} style={{color: '#191919'}} />
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  {/* <Image m='0px' alt='check' src={check.src} /> */}
                  <BsCheckCircleFill fontSize={20} style={{color: '#191919'}} />
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  <Text as="span" h="0px" border="solid 1.5px #191919 " w="13px"></Text>
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  <Text as="span" h="0px" border="solid 1.5px #191919 " w="13px"></Text>
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  <Text as="span" h="0px" border="solid 1.5px #191919 " w="13px"></Text>
                </HStack>
              </Td>
            </Tr>
            <Tr>
              <Td>
                <Text pl="20px" as="span" fontSize="14px" fontWeight="500" color="#000000">
                  Archive unit
                </Text>
              </Td>
              <Td>
                <HStack w="full" justify={change ? 'center' : 'end'}>
                  {/* <Image m='0px' alt='check' src={check.src} /> */}
                  <BsCheckCircleFill fontSize={20} style={{color: '#191919'}} />
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  {/* <Image m='0px' alt='check' src={check.src} /> */}
                  <BsCheckCircleFill fontSize={20} style={{color: '#191919'}} />
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  <Text as="span" h="0px" border="solid 1.5px #191919 " w="13px"></Text>
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  <Text as="span" h="0px" border="solid 1.5px #191919 " w="13px"></Text>
                </HStack>
              </Td>
              <Td>
                <HStack w="full" justify="center">
                  <Text as="span" h="0px" border="solid 1.5px #191919 " w="13px"></Text>
                </HStack>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </LayoutView>
  );
};

export default ManageRoles;
