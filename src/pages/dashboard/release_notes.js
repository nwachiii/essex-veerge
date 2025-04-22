import React, {useEffect} from 'react';
import {LayoutView} from '../../components';
import {
  Box,
  Heading,
  Link,
  Image,
  Text,
  HStack,
  Tag,
  useColorModeValue,
  Container,
  VStack,
} from '@chakra-ui/react';

const BlogTags = props => {
  return (
    <HStack spacing={2} marginTop={props.marginTop}>
      {props.tags.map((tag, index) => {
        return (
          <Tag size={'md'} variant="solid" colorScheme="orange" key={index}>
            {tag}
          </Tag>
        );
      })}
    </HStack>
  );
};

export function BlogAuthor(props) {
  return (
    <HStack
      marginTop="2"
      spacing="2"
      display="flex"
      alignItems="center"
      color={useColorModeValue('gray.500', 'gray.700')}
    >
      <Image
        borderRadius="full"
        boxSize="40px"
        src="https://100k-faces.glitch.me/random-image"
        alt={`Avatar of ${props.name}`}
      />
      <Text fontWeight="medium">{props.name}</Text>
      <Text>—</Text>
      <Text>{props.date.toLocaleDateString()}</Text>
    </HStack>
  );
}

function ReleaseNotes() {
  useEffect(() => {
    // console.log('I was loaded');
  }, []);

  return (
    <LayoutView>
      <Container maxW={'7xl'} p="12" bg="gray.900" color="whitesmoke" borderRadius="2xl">
        <Heading as="h1">Release Notes by Matador Trust</Heading>
        <Box
          marginTop={{base: '1', sm: '5'}}
          display="flex"
          flexDirection={{base: 'column', sm: 'row'}}
          justifyContent="space-between"
        >
          <Box display="flex" flex="1" marginRight="3" position="relative" alignItems="center">
            <Box
              width={{base: '100%', sm: '85%'}}
              zIndex="2"
              marginLeft={{base: '0', sm: '5%'}}
              marginTop="5%"
            >
              <Link prefetch={false} textDecoration="none" _hover={{textDecoration: 'none'}}>
                <Image
                  borderRadius="lg"
                  src={
                    'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80'
                  }
                  alt="some good alt text"
                  objectFit="contain"
                />
              </Link>
            </Box>
            <Box zIndex="1" width="100%" position="absolute" height="100%">
              <Box
                bgGradient={useColorModeValue(
                  'radial(orange.600 1px, transparent 1px)',
                  'radial(orange.300 1px, transparent 1px)'
                )}
                backgroundSize="20px 20px"
                opacity="0.4"
                height="100%"
              />
            </Box>
          </Box>
          <Box
            display="flex"
            flex="1"
            flexDirection="column"
            justifyContent="center"
            marginTop={{base: '3', sm: '0'}}
          >
            <BlogTags tags={['Engineering', 'Product']} />
            <Heading marginTop="1">
              <Link prefetch={false} textDecoration="none" _hover={{textDecoration: 'none'}}>
                Fractionalization of Real Estate
              </Link>
            </Heading>
            <Text
              as="p"
              marginTop="2"
              color={useColorModeValue('gray.200', 'gray.700')}
              fontSize="lg"
            >
              {`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
              has been the industry's standard dummy text ever since the 1500s, when an unknown
              printer took a galley of type and scrambled it to make a type specimen book.`}
            </Text>
            <BlogAuthor name="Gbemileke Peters" date={new Date('2021-04-06T19:01:27Z')} />
          </Box>
        </Box>
        <VStack py="80px" spacing={6}>
          <Heading as="h2">How can you buy property fractions?</Heading>
          <Text as="p" fontSize="lg" maxW={750}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec condimentum quam arcu, eu
            tempus tortor molestie at. Vestibulum pretium condimentum dignissim. Vestibulum ultrices
            vitae nisi sed imperdiet. Mauris quis erat consequat, commodo massa quis, feugiat
            sapien. Suspendisse placerat vulputate posuere. Curabitur neque tortor, mattis nec lacus
            non, placerat congue elit.
          </Text>
          <Text as="p" fontSize="lg" maxW={750}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec condimentum quam arcu, eu
            tempus tortor molestie at. Vestibulum pretium condimentum dignissim. Vestibulum ultrices
            vitae nisi sed imperdiet. Mauris quis erat consequat, commodo massa quis, feugiat
            sapien. Suspendisse placerat vulputate posuere. Curabitur neque tortor, mattis nec lacus
            non, placerat congue elit.
          </Text>
          <Text as="p" fontSize="lg" maxW={750}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec condimentum quam arcu, eu
            tempus tortor molestie at. Vestibulum pretium condimentum dignissim. Vestibulum ultrices
            vitae nisi sed imperdiet. Mauris quis erat consequat, commodo massa quis, feugiat
            sapien. Suspendisse placerat vulputate posuere. Curabitur neque tortor, mattis nec lacus
            non, placerat congue elit.
          </Text>
        </VStack>
      </Container>
    </LayoutView>
  );
}

export default ReleaseNotes;
