  import {SearchIcon} from '@chakra-ui/icons';
  import {Input, InputGroup, InputRightElement, Box, Stack, Divider} from '@chakra-ui/react';
  import {useRouter} from 'next/router';
  import React, {useState, useMemo} from 'react';
  import ViewGlobalSearchResults from '../Customers/ViewGlobalSearchResults';
import { customScrollbarStyles } from '../common/Calendar/DatePicker';

  export const GlobalSearch = ({propertyAndCustomerList = [], isPending}) => {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredResults = useMemo(() => {
      if (!searchTerm) return [];

      if (searchTerm.startsWith('@') && searchTerm.length > 3) {
        const emailQuery = searchTerm.slice(1).toLowerCase();
        return propertyAndCustomerList.filter(({email}) => email?.toLowerCase().includes(emailQuery));
      }

      return propertyAndCustomerList.filter(({name, first_name, last_name, customer_ref, email}) => {
        const fullUserInfo = `${first_name} ${last_name} ${customer_ref ? `(${customer_ref})` : ''} ${email}`;
        return (
          name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          fullUserInfo.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
    }, [searchTerm, propertyAndCustomerList]);

    const handleSelection = selectedItem => {
      if (selectedItem) {
        if (selectedItem?.email) {
          return;
        } else {
          router.push(`/listings/manage/?listingId=${selectedItem.id}`);
        }
      }
    };

    return (
      <Box position="relative" alignSelf="center" maxW={{base: '175px', xl: '319px'}} mt="6px">
        <InputGroup>
          <Input
            pr="4.5rem"
            type="search"
            color="#222222"
            background="#F4F4F4"
            isDisabled={isPending}
            borderRadius="2xl"
            _placeholder={{color: 'gray.500'}}
            placeholder="Search..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && handleSelection(filteredResults[0])}
          />
          <InputRightElement width="4.5rem">
            <SearchIcon
              cursor="pointer"
              onClick={() => handleSelection(filteredResults[0])}
              color="gray.500"
            />
          </InputRightElement>
        </InputGroup>
        {filteredResults.length > 0 && (
          <Stack
            mt={2}
            w="full"
            bg="white"
            
            maxH="200px"
            zIndex={10}
            boxShadow="md"
            overflowY="auto"
            borderRadius="md"
            position="absolute"
            divider={<Divider orientation="horizontal" />}
            {...customScrollbarStyles}
          >
            {filteredResults.map((item, index) => (
              <Box key={index} p={2} _hover={{bg: 'gray.100', cursor: 'pointer'}}>
                <ViewGlobalSearchResults user={item?.email && item} listing={!item?.email && item} />
              </Box>
            ))}
          </Stack>
        )}
      </Box>
    );
  };
