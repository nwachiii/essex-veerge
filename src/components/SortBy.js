import {Button, Image, Menu, MenuButton, MenuItem, MenuList, Tooltip} from '@chakra-ui/react';
import sortByIcon from '/src/images/icons/sort-by-icon.svg';
import sortIdentityIcon from '/src/images/icons/sortByIdentifier.png';

import {useRouter} from 'next/router';

const SortBy = ({
  sort_params = [],
  sortFor,
  tableDisplayOption,
  url,
  setUrl,
  defaultSortValue,
  menuStyles,
  btnStyle = {},
  ...rest
}) => {
  const router = useRouter();
  const sort_name = router.query?.sort ?? defaultSortValue ?? url?.sort ?? url ?? '';

  const handleSort = e => {
    if (sortFor === 'listing') {
      if (e.target.name === 'none') {
        const mergedQuery = {
          ...router.query,
        };
        delete mergedQuery.sort;
        router.push({
          pathname: router.pathname,
          query: mergedQuery,
        });
      } else {
        const alphabeticSort = e.target.name === 'Z_A' || e.target.name === 'A_Z';
        const defaultQuery = {
          sort: `${alphabeticSort ? e.target.name : e.target.name.toLowerCase()}`,
        };

        const mergedQuery = {
          ...router.query,
          ...defaultQuery,
        };
        router.push({
          pathname: router.pathname,
          query: mergedQuery,
        });
      }
    }

    if (sortFor === 'feedback') {
      if (e.target.name === 'none') {
        const mergedQuery = {
          ...router.query,
        };
        delete mergedQuery.sort;
        router.push({
          pathname: router.pathname,
          query: mergedQuery,
        });
      } else {
        const defaultQuery = {
          sort: `${e.target.name.toLowerCase()}`,
        };

        const mergedQuery = {
          ...router.query,
          ...defaultQuery,
        };
        router.push({
          pathname: router.pathname,
          query: mergedQuery,
        });
      }
    }

    if (sortFor === 'manage_agent') {
      if (e.target.name === 'none') {
        const mergedQuery = {
          ...router.query,
        };
        delete mergedQuery.sort;
        router.push({
          pathname: router.pathname,
          query: mergedQuery,
        });
      } else {
        const defaultQuery = {
          sort: `${e.target.name.toLowerCase()}`,
        };

        const mergedQuery = {
          ...router.query,
          ...defaultQuery,
        };
        router.push({
          pathname: router.pathname,
          query: mergedQuery,
        });
      }
    }

    if (sortFor === 'blacklist') {
      if (e.target.name === 'none') {
        setUrl({sort: '', param: `?blacklist=${tableDisplayOption}`});
        router.push(`${router.route}?blacklist=${tableDisplayOption}`);
      } else {
        setUrl({
          sort: `&sort=${e.target.name.toLowerCase()}`,
          param: `?blacklist=${tableDisplayOption}&sort=${e.target.name.toLowerCase()}`,
        });
        router.push(
          `${router.route}?blacklist=${tableDisplayOption}&sort=${e.target.name.toLowerCase()}`
        );
      }
    }

    if (sortFor === 'users') {
      if (e.target.name === 'none') {
        const mergedQuery = {
          ...router.query,
        };
        delete mergedQuery.sort;
        router.push({
          pathname: router.pathname,
          query: mergedQuery,
        });
      } else {
        const defaultQuery = {
          sort: `${e.target.name.toLowerCase()}`,
        };

        const mergedQuery = {
          ...router.query,
          ...defaultQuery,
        };
        router.push({
          pathname: router.pathname,
          query: mergedQuery,
        });
      }
    }

    if (sortFor === 'outstanding_balance') {
      if (e.target.name === 'none') {
        const mergedQuery = {
          ...router.query,
        };
        delete mergedQuery.sort;
        router.push({
          pathname: router.pathname,
          query: mergedQuery,
        });
      } else {
        const defaultQuery = {
          sort: `${e.target.name.toLowerCase()}`,
        };

        const mergedQuery = {
          ...router.query,
          ...defaultQuery,
        };
        router.push({
          pathname: router.pathname,
          query: mergedQuery,
        });
      }
    }
    if (sortFor === 'user_wallet') {
      if (e.target.name === 'none') {
        const mergedQuery = {
          ...router.query,
        };
        delete mergedQuery.sort;
        router.push({
          pathname: router.pathname,
          query: mergedQuery,
        });
      } else {
        const defaultQuery = {
          sort: `${e.target.name.toLowerCase()}`,
        };

        const mergedQuery = {
          ...router.query,
          ...defaultQuery,
        };
        router.push({
          pathname: router.pathname,
          query: mergedQuery,
        });
      }
    }

    if (sortFor === 'outstanding_balance_id') {
      if (e.target.name === 'none') {
        const mergedQuery = {
          ...router.query,
        };
        delete mergedQuery.sort;
        router.push({
          pathname: router.pathname,
          query: mergedQuery,
        });
      } else {
        const defaultQuery = {
          sort: `${e.target.name.toLowerCase()}`,
        };

        const mergedQuery = {
          ...router.query,
          ...defaultQuery,
        };
        router.push({
          pathname: router.pathname,
          query: mergedQuery,
        });
      }
    }

    if (sortFor === 'deposit_breakdown') {
      if (e.target.name === 'none') {
        setUrl('');
        router.push(`${router.route.replace('[id]', router?.query?.id ?? '')}`);
      } else {
        setUrl(`?sort=${e.target.name.toLowerCase()}`);
        router.push(
          `${router.route.replace(
            '[id]',
            router?.query?.id ?? ''
          )}/?sort=${e.target.name.toLowerCase()}`
        );
      }
    }
    if (sortFor === 'fractional') {
      if (e.target.name === 'none') {
        const mergedQuery = {
          ...router.query,
        };
        delete mergedQuery.sort;
        router.push({
          pathname: router.pathname,
          query: mergedQuery,
        });
      } else {
        const defaultQuery = {
          sort: `${e.target.name.toLowerCase()}`,
        };

        const mergedQuery = {
          ...router.query,
          ...defaultQuery,
        };
        router.push({
          pathname: router.pathname,
          query: mergedQuery,
        });
      }
    }
  };

  return (
    <Menu autoSelect={false} {...menuStyles}>
      <Tooltip
        placeContent="center"
        px="5.2px"
        h="29.6px"
        bg="black"
        borderRadius="3.62px"
        label="Sort By"
      >
        <MenuButton
          mt={sortFor == 'users' ? 5 : ''}
          fontWeight="400"
          fontSize="14px"
          lineHeight="18px"
          color="#191919"
          // px="37px"
          p="10px"
          display="flex"
          _hover={{
            bg: 'rgba(0,0,0,0.1)',
            borderColor: '#919191',
            img: {opacity: 0.5},
          }}
          justifyContent="center"
          alignItems="center"
          // height="48px"
          h="36px"
          w="36px"
          minW="36px"
          border="0.5px solid #E4E4E4"
          // borderRadius="12px"
          borderRadius="8.12px"
          bg="#ffffff"
          _focus={{background: btnStyle?.bg ?? '#fff'}}
          _active={{
            background: btnStyle?.bg ?? '#fff',
          }}
          // _hover={{
          //   background: btnStyle?.bg ?? '#fff',
          // }}
          leftIcon={
            <Image
              _hover={{filter: 'grayscale(100%)'}}
              w="16px"
              h="16px"
              src={sortByIcon.src}
              alt="sort by icon"
              fontSize="4px"
            />
          }
          iconSpacing="none"
          as={Button}
          {...btnStyle}
          {...rest}
        >
          {/* Sort By */}
        </MenuButton>
      </Tooltip>
      <MenuList
        position="relative"
        zIndex="2"
        pr="18px"
        borderRadius="16px"
        overflow="hidden"
        bg="#ffffff"
      >
        {sort_params.map((item, idx) => {
          return (
            <MenuItem
              key={idx}
              onClick={handleSort}
              name={item.replace('.', '').replace(/[-\s]/g, '_')}
              fontSize="14px"
              mb="10px"
              _hover={{
                bg: 'transparent',
              }}
              _focus={{
                bg: 'transparent',
              }}
            >
              <Image
                opacity={
                  sort_name?.includes(item.toLowerCase().replace('.', '').replace(/[-\s]/g, '_'))
                    ? 1
                    : 0
                }
                mr="10px"
                h="11px"
                src={sortIdentityIcon.src}
                alt=" identifier for sort"
              />{' '}
              {item}
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
};

export default SortBy;
