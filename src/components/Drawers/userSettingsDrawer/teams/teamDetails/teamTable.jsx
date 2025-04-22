import React, {useState} from 'react';
import {
  Box,
  Flex,
  Text,
  HStack,
  Badge,
  Link,
  List,
  ListItem,
  VStack,
  Center,
} from '@chakra-ui/react';
import {Container3} from '@/components/common/containers';
import {MatadorCustomTable} from '@/components/common/Table';
import {TeamsMenu} from './menu';
import {changeDateFormat} from '/src/utils/formatDate';
import useLocalStorage from 'utils/useLocalStorage';
import {TEAMS_ROLES} from '..';
import defaultImage from '/src/images/image-fallback.png';
import Image from 'next/image';
import {isRoleRestricted} from 'ui-lib/ui-lib.hooks/isRoleRestricted';

export const TeamTable = ({data, refetch}) => {
  const [user] = useLocalStorage('loggedinUser');

  const TEAM_COLUMNS = data => [
    {
      Header: 'Name',
      accessor: row => {
        return (
          console.log(row),
          (
            <HStack textAlign={'left'} spacing="11px">
              {/* <Image
                alt=""
                height="48px"
                width="48px"
                borderRadius="100%"
                src={row?.img ?? defaultImage?.src}
              /> */}
              <Text>{`${row?.name}`}</Text>
            </HStack>
          )
        );
      },
    },
    {
      Header: 'Role',
      accessor: row => {
        return (
          console.log(row),
          (
            <HStack textAlign={'left'} spacing="10px" width={{base: '100px', '2xl': 'unset'}}>
              <Text textTransform={'capitalize'} whiteSpace={'normal'}>
                {row?.role}
              </Text>
              {row?.email === user?.email ? (
                <Box
                  borderRadius={'12px'}
                  border={'1px solid #1919D8'}
                  color={'#1919D8'}
                  px={'10px'}
                  py={'5px'}
                  fontSize={'12px'}
                  fontWeight={'600px'}
                >
                  You
                </Box>
              ) : null}
            </HStack>
          )
        );
      },
    },
    {
      Header: 'Email Address',
      accessor: row => {
        return (
          <Link href={row?.email === user?.email ? null : `mailto:${row?.email}`}>
            <Text color={'#4545FE'} width={{base: '100px', '2xl': 'unset'}} whiteSpace={'normal'}>
              {row?.email}
            </Text>
          </Link>
        );
      },
    },
    {
      Header: 'Recent Activity',
      accessor: row => {
        return (
          console.log(row),
          (
            <HStack textAlign={'left'} spacing="10px">
              {row?.email !== user?.email && (
                <Text textTransform={'capitalize'}>
                  {changeDateFormat(row?.recent_activity, 'add_time')}
                </Text>
              )}
              {row?.role !== TEAMS_ROLES.admin.toLowerCase()
                ? user?.role === TEAMS_ROLES.admin.toLowerCase() && (
                    <Flex justify={'flex-end'}>
                      <TeamsMenu id={row['id']} refetch={refetch} />
                    </Flex>
                  )
                : null}
            </HStack>
          )
        );
      },
    },
  ];

  // const user =
  // typeof window !== 'undefined' &&
  // localStorage &&
  // JSON?.parse(localStorage.getItem('loggedinUser')) !== undefined &&
  // JSON?.parse(localStorage.getItem('loggedinUser'));

  return (
    data && (
      <List
        my="24px"
        // borderRadius="16px"
        // border="1px solid #EAECF0"
        background="#FFF"
        // overflow={'hidden'}
      >
        {data.map((account, i) => (
          <ListItem
            key={i}
            border="1px solid #EAECF0"
            p="16px 24px"
            color="#606060"
            borderRadius={
              i == 0 ? '16px 16px 0px 0px' : i == data.length - 1 ? '0px 0px 16px 16px' : '0px'
            }
          >
            <HStack alignItems={'center'} gap={'8px'}>
              {/* <Center
                height="40px"
                width="40px"
                minW={`40px`}
                borderRadius="100%"
                overflow="hidden"
                position={'relative'}
              >
                <Image
                  alt="User Image"
                  src={account?.img ?? defaultImage?.src}
                  fill
                  style={{objectFit: 'cover'}}
                />
              </Center> */}
              <VStack alignItems={'flex-start'} gap={'8px'} flex={'1'}>
                <Flex
                  gap={'8px'}
                  align={'center'}
                  flexWrap={'wrap'}
                  textTransform="capitalize"
                  color={`#606060`}
                >
                  <Text fontWeight={'600'} fontSize={`16px`}>
                    {account?.name}
                  </Text>
                  <Text fontWeight={`400`} fontSize={`14px`}>
                    {account?.role}
                  </Text>
                </Flex>
                <Link href={account?.email === account?.email ? null : `mailto:${account?.email}`}>
                  <Text
                    wordBreak="break-all"
                    whiteSpace="break-spaces"
                    color={'#4545FE'}
                    fontSize={`14px`}
                    fontWeight={`400`}
                    lineHeight={`normal`}
                  >
                    {account?.email}
                  </Text>
                </Link>
                {account?.email !== user?.email &&
                !isRoleRestricted('team member recent activity').check ? (
                  <Text
                    textTransform={'capitalize'}
                    display={'flex'}
                    alignItems={'center'}
                    w="100%"
                    fontSize="12px"
                    justifyContent={'space-between'}
                  >
                    {changeDateFormat(account?.recent_activity, 'add_time')}
                    {/* {user?.role?.toLowerCase() === 'account owner' ? (
                      <Flex justify={'flex-end'}>
                        <TeamsMenu id={account?.id} refetch={refetch} />
                      </Flex>
                    ) : user?.role?.toLowerCase() === TEAMS_ROLES.admin.toLowerCase() &&
                      account?.role?.toLowerCase() !== 'account owner' &&
                      account?.role?.toLowerCase() !== TEAMS_ROLES.admin.toLowerCase() ? (
                      <Flex justify={'flex-end'}>
                        <TeamsMenu id={account?.id} refetch={refetch} />
                      </Flex>
                    ) : null} */}
                    <DisplayTeamMenu account={account} refetch={refetch} user={user} />
                  </Text>
                ) : null}
              </VStack>
            </HStack>
          </ListItem>
        ))}
      </List>
    )
  );
};
export default TeamTable;

const DisplayTeamMenu = ({user, account, refetch}) => {
  const isAccountOwner = user?.role?.toLowerCase() === 'account owner';
  const isAdminWithoutOwnerAccess =
    user?.role?.toLowerCase() === TEAMS_ROLES.admin.toLowerCase() &&
    account?.role?.toLowerCase() !== 'account owner' &&
    account?.role?.toLowerCase() !== TEAMS_ROLES.admin.toLowerCase();

  const shouldShowTeamsMenu = isAccountOwner || isAdminWithoutOwnerAccess;

  return (
    shouldShowTeamsMenu && (
      <Flex justify="flex-end">
        <TeamsMenu id={account?.id} refetch={refetch} />
      </Flex>
    )
  );
};
