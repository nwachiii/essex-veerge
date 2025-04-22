import {
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Input,
  Text,
  Textarea,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react';
import {LuSend} from 'react-icons/lu';
import {BroadcastFilters} from '../filters/BroadcastFilters';
import RadioButton from '/src/images/icons/radio_button.svg';
import RadioButtonChecked from '/src/images/icons/radio_button_checked.svg';
import {useState} from 'react';
import {menuOptions} from 'constants/veergeMenu/broadcastMenuOptions';
import {useMutation} from '@tanstack/react-query';
import {postBroadcastData} from 'apis/veerge_menu';

export const SendBroadcastMessage = ({emailHistory, notifHistory, onClose}) => {
  const toast = useToast();
  const [broadCastInfo, setBroadcastInfo] = useState({
    channel: null,
    message: null,
    title: null,
  });
  const [options, setOptions] = useState([]);
  const categoryDisclosure = useDisclosure();

  const handleSelect = (name, value) => {
    setBroadcastInfo(prev => {
      return {...prev, [name]: value};
    });
  };

  const handleChange = (e, name) => {
    setBroadcastInfo(prev => {
      return {...prev, [name]: e.target.value};
    });
  };
  const selectedCategories = menuOptions.filter(item => {
    if (item.subOptions) {
      return item.subOptions.some(subOption => options.includes(subOption));
    } else if (item.label) {
      return options?.includes(item.label);
    }
    return false; // No subOptions, so exclude this item
  });
  const isOptionDisabled = options?.includes('Everyone') && selectedCategories.length > 1;
  const isDisabled =
    Object.values(broadCastInfo).every(info => info !== null) && options?.length > 0;

  const {mutate, isLoading} = useMutation(formData => postBroadcastData(formData), {
    onSuccess: res => {
      toast({
        title: res?.data?.message,
        status: 'success',
        duration: 3000,
        position: 'top-right',
      });
      onClose();
      setBroadcastInfo({
        channel: null,
        message: null,
        title: null,
      });
      setOptions([]);
      notifHistory?.refetch()
      emailHistory?.refetch();
    },
    onError: err => {
      toast({
        title: err?.response?.data?.message,
        status: 'error',
        duration: 3000,
        position: 'top-right',
      });
    },
  });

  const handleProceed = () => {
    mutate({
      channel: broadCastInfo.channel,
      message: broadCastInfo.message,
      title: broadCastInfo.title,
      ...(!options.includes('Everyone')
        ? {
            filter_fields: menuOptions.reduce((result, option) => {
              if (option.subOptions) {
                const validSubOptions = option.subOptions.filter(subOption =>
                  options.includes(subOption)
                );
                if (validSubOptions.length > 0) {
                  result[option.label] = validSubOptions;
                }
              }
              return result;
            }, {}),
          }
        : {}),
    });
  };

  console.log(broadCastInfo?.message?.length);
  return (
    <VStack align="start" gap={6} p={4}>
      <VStack align="start">
        <Text color="#191919">How do you want to broadcast your message?</Text>
        <HStack
          align="center"
          spacing="20px"
          as="div"
          role="group"
          aria-labelledby="my-radio-group"
        >
          <Button
            onClick={() => handleSelect('channel', 'email')}
            mt={0}
            variant="dark"
            bg={'#F5F5F5'}
            color={'#191919'}
            borderRadius="28px"
            display="flex"
            gap="10px"
            px={4}
            w="fit-content"
            h="39px"
            py={0}
          >
            <Text
              position={'relative'}
              fontWeight={400}
              fontSize={'14px'}
              display={'flex'}
              align={'center'}
              gap="5px"
            >
              Email
            </Text>
            <Image
              src={broadCastInfo.channel === 'email' ? RadioButtonChecked.src : RadioButton.src}
              alt=""
            />
          </Button>
          <Button
            onClick={() => handleSelect('channel', 'notification')}
            mt={0}
            variant="dark"
            bg={'#F5F5F5'}
            color={'#191919'}
            px={4}
            w="fit-content"
            borderRadius="28px"
            display="flex"
            gap="10px"
            h="39px"
            py={0}
          >
            <Text
              position={'relative'}
              fontWeight={400}
              fontSize={'14px'}
              display={'flex'}
              align={'center'}
              gap="5px"
            >
              Push Notification
            </Text>
            <Image
              src={
                broadCastInfo.channel === 'notification' ? RadioButtonChecked.src : RadioButton.src
              }
              alt=""
            />
          </Button>
        </HStack>
      </VStack>
      <VStack w={'full'} align={'start'}>
        <Flex
          align="center"
          gap="8px"
          border={'1px solid #E4E4E4'}
          borderRadius={'8px'}
          w={'full'}
          p={4}
        >
          <Text color="#919191">To: </Text>
          <BroadcastFilters
            categoryDisclosure={categoryDisclosure}
            broadCastInfo={broadCastInfo}
            options={options}
            setOptions={setOptions}
            selectedCategories={selectedCategories}
          />
        </Flex>
      </VStack>
      <Input
        name="broadcastTitle"
        border={'1px solid #E4E4E4'}
        placeholder="Broadcast Title"
        px={5}
        py={7}
        type="text"
        borderRadius={'8px'}
        onChange={e => handleChange(e, 'title')}
        value={broadCastInfo?.title}
      />
      <Box w={'full'}>
        <Textarea
          name="broadcastMessage"
          border={'1px solid #E4E4E4'}
          placeholder="Compose message"
          minH={'165px'}
          p={4}
          resize={'none'}
          onChange={e => handleChange(e, 'message')}
          value={broadCastInfo?.message}
          maxLength={300}
        />
        <Text
          color={broadCastInfo?.message?.length >= 300 ? '#CA1611' : '#919191'}
          fontSize={14}
          pos={'relative'}
          left={'50%'}
          bottom={8}
          fontWeight={broadCastInfo?.message?.length >= 300 ? 500 : 300}
          bg="#FFFFFF"
        >
          {broadCastInfo?.message?.length >= 300
            ? 'Max length exceeded'
            : broadCastInfo?.message?.length > 0
              ? `${300 - broadCastInfo?.message?.length} character${300 - broadCastInfo?.message?.length <= 1 ? '' : 's'} remaining`
              : 'Max 300 characters'}
        </Text>
      </Box>
      <Flex justifyContent="end" w={'full'}>
        <Button
          py={2}
          px={4}
          w="max-content"
          bg="#191919"
          // type="submit"
          color="#FFFFFF"
          h="fit-content"
          cursor={'pointer'}
          textAlign={'center'}
          borderRadius={'8px'}
          _hover={{
            background: '',
          }}
          onClick={handleProceed}
          isDisabled={!isDisabled || isOptionDisabled}
          isLoading={isLoading}
        >
          <LuSend />
        </Button>
      </Flex>
    </VStack>
  );
};
