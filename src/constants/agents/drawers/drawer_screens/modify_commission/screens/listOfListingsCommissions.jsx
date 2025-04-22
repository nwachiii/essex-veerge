    import {
    Center,
    DrawerBody,
    DrawerCloseButton,
    Flex,
    HStack,
    Heading,
    Image,
    Stack,
    Text,
    } from '@chakra-ui/react';
    import React from 'react';
    import {IoArrowBackSharp} from 'react-icons/io5';

    import {FaAngleRight} from 'react-icons/fa6';
    import {useQuery} from '@tanstack/react-query';
    import {useRouter} from 'next/router';
    import {fetchListingsWithAgentCommission} from 'apis/manageAgent';
    import {AnimatedLoader} from '@/components/index';
    const ListOfListingsCommissions = ({
    mainScreen,
    handleClose,
    setProject_id,
    handleScreen,
    handleMainScreen,
    customScrollbarStyles,
    }) => {
    const router = useRouter();
    const {id} = router.query;
    const canFetch = !!(mainScreen === 'modify commission' && id);
    const {data, isLoading, error, isError} = useQuery(
        ['listings commission'],
        () => fetchListingsWithAgentCommission(id),
        {enabled: canFetch}
    );

    const navigateTo = (scrn, id) => () => {
        setProject_id(id);
        handleScreen(scrn);
        /**
         * set the id of the listing
         */
    };

    return (
        <>
        <HStack
            py="7px"
            h="50px"
            bg="#fafafa"
            px="20px"
            justify="space-between"
            align="center"
            position="relative"
            boxShadow=" 0px 2px 4px 0px #0000000D"
        >
            <Flex gap="4px">
            <IoArrowBackSharp
                fontSize="20px"
                cursor="pointer"
                onClick={handleMainScreen('options')}
            />
            <Heading color="#18181B" fontSize="16px" fontWeight="600" lineHeight="22.4px">
                Listing Commission
            </Heading>
            </Flex>

            <DrawerCloseButton onClick={handleClose} position="initial" />
        </HStack>
        <DrawerBody sx={customScrollbarStyles} px="24px" pr="16px" mr="8px" py="21px">
            <Stack spacing="12px">
            {isLoading ? (
                <Center>
                <AnimatedLoader />
                </Center>
            ) : isError ? (
                <Center>
                <Text fontSize="14px" fontWeight="500">
                    {`${
                    error.message === 'Network Error'
                        ? 'Please check your network connection'
                        : error?.response?.status === 500
                        ? "Apologies for the inconvenience. We're working on it. Please try again later."
                        : error?.response?.status === 401
                            ? 'Authentication Timeout: For security reasons, your session has timed out. Please log in again to continue.'
                            : (error?.response?.data?.message ??
                            error?.response?.message ??
                            error?.message ??
                            'Something went wrong')
                    }`}
                </Text>
                </Center>
            ) : (
                data?.data?.data.map((items, idx) => (
                <Flex
                    bg="#fafafa"
                    cursor="pointer"
                    key={idx}
                    justifyContent="space-between"
                    minH="104px"
                    alignItems="center"
                    onClick={navigateTo('modify commission', items?.id)}
                    w="full"
                    rounded="4px"
                    border="0.5px solid #e4e4e7"
                    p="9px 18px 9px 12px"
                >
                    <Flex gap="12px">
                    <Image
                        bg="#cbcbcb"
                        maxW="86px"
                        minW="86px"
                        src={items?.photo_urls}
                        fontSize="8px"
                        height="86px"
                        alt="listing image"
                        objectFit="cover"
                        rounded="4px"
                    />
                    <Stack spacing="none">
                        <Heading
                        wordBreak="break-all"
                        whiteSpace="break-spaces"
                        color="#18181b"
                        fontSize="16px"
                        lineHeight="22px"
                        fontWeight="500"
                        >
                        {items?.name}
                        </Heading>
                        <Heading
                        wordBreak="break-all"
                        whiteSpace="break-spaces"
                        fontSize="11px"
                        lineHeight="17px"
                        fontWeight="400"
                        color="#27272a"
                        >
                        {'Lekki,lagos '}
                        </Heading>
                        <Heading
                        color="
                    #52525B
                    "
                        fontSize="10px"
                        lineHeight="15px"
                        fontWeight="400"
                        >
                        {`${items?.commission_rate}% commission`}
                        </Heading>
                    </Stack>
                    </Flex>

                    <FaAngleRight color="#e4e4e4" />
                </Flex>
                ))
            )}
            </Stack>
        </DrawerBody>
        </>
    );
    };

    export default ListOfListingsCommissions;
