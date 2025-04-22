import {
  Box,
  Button,
  Center,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Heading,
  HStack,
  Image,
  Select,
  Stack,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import backIcon from '/src/images/icons/backArrowForDrawer.svg';
import {Toggle, Toggle2} from 'ui-lib/ui-lib.components/toggle';
import {useState} from 'react';
import {BiCheck} from 'react-icons/bi';
import {MdCheck} from 'react-icons/md';
import moment from 'moment';
import {toggleScheduleInspectionAvailability} from 'apis/listings';
import {useMutation} from '@tanstack/react-query';
// import TimeInput from 'ui-lib/ui-lib.components/timeInput';
import dropDownIcon from '/src/images/icons/dropDownForRoleSelection.svg';
import countries from 'constants/auth/country';

const Checkbox = ({isActive = false, onClick, ...rest}) => {
  return (
    <Center
      w={`24px`}
      minW={`24px`}
      h={`24px`}
      borderRadius={`4px`}
      border={`1px solid #E4E4E4`}
      p={`4px`}
      transition={`.3s`}
      cursor={`pointer`}
      bg={isActive ? `#4545FE` : `transparent`}
      onClick={onClick}
      fontSize={`30px`}
      {...rest}
    >
      <MdCheck style={{transition: `.3s`}} color={isActive ? `#fff` : 'transparent'} />
    </Center>
  );
};

export const InspectionSettingsDrawer = ({drawerDisclosure, refetch, listingDetail}) => {
  const toast = useToast();
  const [enabled, set_enabled] = useState(listingDetail?.inspection_enabled || false);
  const [selected_days, set_selected_days] = useState([]);
  const [timezone, setTimezone] = useState(listingDetail?.listing_timezone ?? '');

  const mutation = useMutation(
    payload => toggleScheduleInspectionAvailability(payload?.listingID, payload?.query),
    {
      onSuccess: res => {
        refetch();
        toast({
          description: `Updated successfully`,
          status: `success`,
          duration: 3000,
          position: 'top-right',
        });
      },
      onError: err => {
        set_enabled(!enabled);
        toast({
          description: `Error updating inspection settings`,
          status: `error`,
          duration: 3000,
          position: 'top-right',
        });
      },
    }
  );

  const handleToggle = async event => {
    if (mutation.isLoading) return;
    set_enabled(!enabled);
  };
  const handleUpdate = () => {
    const status = enabled ? `Accepted` : `Rejected`;

    const query = `?status=${status}&timezone=${timezone}`;
    return mutation.mutate({
      listingID: listingDetail?.id,
      query,
    });
  };

  const select_day = day => {
    const in_array = selected_days.find(el => el === day);

    if (in_array) {
      const arr = selected_days.filter(el => el !== day);
      set_selected_days(arr);
    } else {
      set_selected_days([...selected_days, day]);
    }
  };
  const timeZoneList = countries
    .flatMap(country => {
      return country.timezones;
    })
    .sort();

  const handleSelectComponent = event => {
    const {value} = event.target;
    return setTimezone(value);
  };

  const handleClose = () => {
    setTimezone(listingDetail?.listing_timezone);
    set_enabled(listingDetail?.inspection_enabled);
    drawerDisclosure.onClose();
  };

  const isValid =
    listingDetail?.inspection_enabled !== enabled ||
    (listingDetail?.listing_timezone !== timezone && !!timezone);

  return (
    <Drawer isOpen={drawerDisclosure.isOpen} onClose={handleClose}>
      <DrawerOverlay />
      <DrawerContent mt="65.12px" maxW="404px">
        <DrawerHeader
          p="12px 27px"
          bg="#F5F5F5"
          display={`flex`}
          alignItems="center"
          position="relative"
          justifyContent="space-between"
          boxShadow="0px 4px 8px 0px rgba(0, 0, 0, 0.02)"
          fontSize={`16px`}
          fontWeight={`600`}
          lineHeight={`20.29px`}
          textAlign={`left`}
          color="#191919"
        >
          <HStack gap={`8px`}>
            <Image alt="back icon" cursor="pointer" src={backIcon.src} onClick={handleClose} />
            <Text>Inspection Settings</Text>
          </HStack>
          <HStack spacing="15px">
            <VStack
              position="relative"
              justify="center"
              align="center"
              w="30px"
              h="30px"
              borderRadius="5px"
              transition="0.3s ease-in-out"
              _hover={{
                width: '30px',
                height: '30px',
              }}
            ></VStack>
          </HStack>
        </DrawerHeader>
        <DrawerBody p={`24px`}>
          <Stack gap={`8px`}>
            <Box bg={'#F9FAFB'} border="1px solid #E4E4E4" borderRadius="4px" p="16px">
              <HStack w="full" justify="space-between">
                <Stack spacing="none" maxW={`211px`} gap={`4px`}>
                  <Heading
                    as="h2"
                    fontSize="14px"
                    fontWeight="500"
                    lineHeight="18px"
                    color="#191919"
                  >
                    Schedule Inspection Status
                  </Heading>
                  <Text color="#606060" fontSize="12px" lineHeight="15px" fontWeight="400">
                    Visible of schedule inspection feature on your application{' '}
                  </Text>
                </Stack>
                <Toggle2 variant="alternative" value={enabled} onChange={handleToggle} />
              </HStack>
            </Box>

            <Text
              as="h2"
              fontSize="14px"
              fontWeight="500"
              lineHeight="18px"
              color="#191919"
              mt={`10px`}
            >
              Time-zone
            </Text>
            <Select
              border="1px solid #E4E4E4"
              icon={<Image src={dropDownIcon.src} alt="drop down icon" />}
              name={`timezone`}
              _focusVisible={{
                borderColor: '#E4E4E4',
              }}
              _hover={{
                borderColor: '#E4E4E4',
              }}
              onChange={handleSelectComponent}
              fontSize="14px"
              value={timezone}
              bg="#F9FAFB"
              fontWeight="500"
              color="#3D3D3D"
              maxW="390px"
              w="full"
              h="34.888px"
              borderRadius="6.491px"
            >
              <option disabled value="">
                Select time zone
              </option>
              {timeZoneList &&
                timeZoneList?.map((timezone, i) => {
                  return (
                    <option name={timezone} key={i} value={timezone}>
                      {timezone}
                    </option>
                  );
                })}
            </Select>
            <Text
              as="h2"
              fontSize="14px"
              fontWeight="500"
              lineHeight="18px"
              color="#191919"
              mt={`10px`}
            >
              Inspection Availability Date
            </Text>
            <Stack
              bg={'#F9FAFB'}
              border="1px solid #E4E4E4"
              borderRadius="4px"
              p="16px"
              gap={`20px`}
            >
              {moment.weekdays().map((day, i) => (
                <HStack
                  // onClick={
                  //   () => select_day(day)
                  //   }
                  key={i}
                >
                  <Checkbox
                    isActive={
                      true
                      // selected_days?.includes(day)
                    }
                    cursor="not-allowed"
                  />
                  <Text as="h2" fontSize="14px" fontWeight="500" lineHeight="18px" color="#3D3D3D">
                    Every {day}
                  </Text>
                </HStack>
              ))}
            </Stack>
            {/* <Text
              as="h2"
              fontSize="14px"
              fontWeight="500"
              lineHeight="18px"
              color="#191919"
              mt={`10px`}
            >
              Inspection Availability Time
            </Text>
            <HStack w="full" justify="space-between">
              <TimeInput /> <Divider h="2px" w="10px" /> <TimeInput />
            </HStack> */}
          </Stack>
        </DrawerBody>
        <DrawerFooter p={`24px`}>
          <Button
            w="full"
            h="45px"
            bg="#191919"
            borderRadius="full"
            color="#fff"
            _hover={{opacity: `auto`}}
            _active={{opacity: `auto`}}
            onClick={handleUpdate}
            isLoading={mutation.isLoading}
            _focus={{outline: 'none'}}
            _focusVisible={{outline: 'none'}}
            fontWeight={`400`}
            isDisabled={!isValid}
            fontSize="14.429px"
          >
            Update
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
