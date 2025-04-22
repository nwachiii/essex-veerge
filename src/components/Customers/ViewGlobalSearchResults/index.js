    import {useState} from 'react';
    import {Flex, HStack, Image, Stack, Text, useDisclosure} from '@chakra-ui/react';
    import CustomerDrawer from '/src/components/Drawers/customerDrawer';
    import avatarFallback from '/src/images/avatar.svg';
    import verifiedIcon from '/src/images/icons/verifiedIcon.svg';
    import {truncateLongText} from 'utils/truncateLongText';
    import {useRouter} from 'next/router';

export const ViewGlobalSearchResults = ({ user, listing }) => {
    const CustomerDetailsModal = useDisclosure();
    const [userId, setUserId] = useState();
    const router = useRouter();
    const [runQuery, setRunQuery] = useState(false);

    const OpenCustomerModal = item => {
        CustomerDetailsModal.onOpen();
        setUserId(item);
        setRunQuery(true);
    };
    const userName = `${user?.first_name} ${user?.last_name}`;
    const userImgSrc = user?.avatar || user?.img || user?.img?.[0] || avatarFallback.src;
    const listingImgSrc = listing ? listing?.photos[0]?.photo : '';

    const handleClick = () => {
        if (user) {
        OpenCustomerModal(user?.id);
        }
        if (listing) {
        router.push(`/listings/manage/?listingId=${listing.id}`);
        }
    };
    return (
        <>
        {user ? (
            <HStack
            textAlign={'left'}
            spacing="11px"
            cursor="pointer"
            onClick={handleClick}
            maxW={`250px`}
            minW="150px"
            _hover={{opacity: '0.6'}}
            >
            <Image
                alt="customer image"
                borderRadius="full"
                height="48px"
                width="48px"
                aspectRatio="1"
                objectFit="cover"
                src={userImgSrc}
            />
            <Flex flex={`1`} align="center" gap="8px">
                <Stack>
                <Text
                    pr="7px"
                    fontSize="14px"
                    wordWrap={'break-word'}
                    overflowWrap={`break-word`}
                    whiteSpace="break-spaces"
                    wordBreak="break-word"
                    textTransform="capitalize"
                >
                    {userName}
                </Text>

                <Text cursor={'pointer'} color={'#4545FE'} textAlign={'left'} fontSize={'12px'}>
                    <a href={`mailto:${user?.email}`}>
                    {truncateLongText(user?.email, 29).truncatedText}{' '}
                    </a>
                </Text>
                </Stack>
                {user?.status ? (
                <Image src={verifiedIcon.src} alt="verified icon" boxSize="18px" />
                ) : null}
            </Flex>
            </HStack>
        ) : listing ? (
            <HStack
            textAlign={'left'}
            spacing="11px"
            cursor="pointer"
            onClick={handleClick}
            maxW={`250px`}
            minW="150px"
            _hover={{opacity: '0.6'}}
            >
            <Image
                alt="customer image"
                borderRadius="10px"
                height="48px"
                width="48px"
                aspectRatio="1"
                objectFit="cover"
                src={listingImgSrc}
            />
            <Flex flex={`1`} align="center" gap="8px">
                <Text
                pr="7px"
                fontSize="14px"
                wordWrap={'break-word'}
                overflowWrap={`break-word`}
                whiteSpace="break-spaces"
                wordBreak="break-word"
                textTransform="capitalize"
                >
                {listing?.name}
                </Text>
            </Flex>
            </HStack>
        ) : null}

        <CustomerDrawer modalDisclosure={CustomerDetailsModal} userId={userId} runQuery={runQuery} />
        </>
    );
    };

    export default ViewGlobalSearchResults;
