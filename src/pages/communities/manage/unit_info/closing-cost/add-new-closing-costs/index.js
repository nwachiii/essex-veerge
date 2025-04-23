import {useState} from 'react';
import {AddMoreBtn} from 'ui-lib/ui-lib.components';
import {useMutation} from '@tanstack/react-query';
import {addNewClosingCosts} from '/src/apis/listings';
import {toastForError} from '/src/utils/toastForErrors';
import {
  Flex,
  Text,
  Box,
  Stack,
  HStack,
  useToast,
  Spinner,
  useDisclosure,
  Image,
  Button,
  InputGroup,
  InputLeftAddon,
  DrawerCloseButton,
  ModalCloseButton,
} from '@chakra-ui/react';
import {Formik} from 'formik';
import {Popup} from 'ui-lib/ui-lib.components';
import cancelBlackIcon from '/src/images/icons/closeIconForFilter.svg';
import {AiOutlineInfoCircle} from 'react-icons/ai';

import {scrollBarStyles} from '@/components/common/ScrollBarStyles';
import {Input} from 'ui-lib/ui-lib.components';
import {updateAmountInputChange} from 'utils/formatAmount';
import NairaIcon from '@/components/assets/NairaIcon';
import {PriceMenu} from 'pages/communities/create/WholeUnits/WholeUnits.Form';

export const AddNewClosingCosts = ({unitId, refetch}) => {
  const toast = useToast();
  const CLOSING_COST_MODAL = useDisclosure();
  const ABOUT_TO_CLEAR_ALL_FIELDS = useDisclosure();
  const [amount, setAmount] = useState('');
  const [closingCostInfo, toggleclosingCostInfo] = useState(false);
  const mutation = useMutation(formData => addNewClosingCosts(formData), {
    onSuccess: res => {
      CLOSING_COST_MODAL.onClose();
      toast({
        title: 'Closing costs added successfully!',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
      refetch();
    },
    onError: err => {
      console.log(err);
      toastForError(err, true, toast);
    },
  });

  const handleReset = () => {
    CLOSING_COST_MODAL?.onClose();
    ABOUT_TO_CLEAR_ALL_FIELDS.onClose();
  };

  const handleToggleInfo = () => {
    toggleclosingCostInfo(!closingCostInfo);
  };

  const infoIconsStyle = {
    height: '24px',
    width: '24px',
    color: '#6060607a',
    marginTop: '6px',
    cursor: 'pointer',
  };

  return (
    <div>
      {' '}
      <AddMoreBtn
        mb="15px"
        btnText="Add closing costs"
        clickFunction={CLOSING_COST_MODAL.onOpen}
        h="42px"
        fontSize="14px"
        borderRadius="72px"
        borderColor="#a3a3a3"
        iconStyle={{color: '#191919'}}
        color="#191919"
      />
      <Popup
        px="30px"
        size="full"
        hideCloseBtn={true}
        color="#191919"
        minH="fit-content"
        // closeOnOverlayClick={false}

        minW={{base: '90%', md: '458px'}}
        isOpen={CLOSING_COST_MODAL.isOpen}
        onClose={CLOSING_COST_MODAL.onClose}
      >
        <HStack w="full" justify={'space-between'}>
          <Text display="flex" gap="7px" align="center" fontSize="24px" fontWeight={600} pl={0}>
            <span>Closing Cost</span>{' '}
            {/* <AiOutlineInfoCircle onClick={handleToggleInfo} style={{...infoIconsStyle}} /> */}
          </Text>
          <ModalCloseButton position="initial" onClick={handleToggleInfo} />
          {/* <Image
            alt=""
            w="28px"
            h={'26px'}
            cursor={'pointer'}
            objectFit={'cover'}
            src={cancelBlackIcon.src}
            onClick={CLOSING_COST_MODAL.onClose}
          /> */}
        </HStack>
        <Popup.Body overflowY="auto" css={scrollBarStyles} h="fit-content">
          {/* {closingCostInfo && <ClosingCostInfo toggleclosingCostInfo={toggleclosingCostInfo} />} */}
          <Formik
            initialValues={{name: '', amount: ''}}
            onSubmit={(values, actions) => {
              const payloadBody = {...values, amount: Number(amount.replaceAll(',', ''))};
              mutation.mutate({bundle: unitId, fees: [payloadBody]});
            }}
          >
            {props => (
              <Box w={'full'} as={'form'} onSubmit={props.handleSubmit}>
                <Stack>
                  <Input
                    label="Title"
                    type="text"
                    autoComplete={false}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.name}
                    name="name"
                    placeholder="Title e.g., Service charge"
                  />
                  {props.errors.name && <div id="feedback">{props.errors.name}</div>}
                </Stack>
                <Stack my={2}>
                  <Text as="label" fontSize={'14px'} fontWeight={500} pl={2}>
                    Amount
                  </Text>
                  <InputGroup>
                    <InputLeftAddon px="0px" pr="5px" bg="transparent" p="" h="55px">
                      {/* <NairaIcon fillForNairaSvgIcon="#191919" /> */}
                      <PriceMenu disableMenu fillForNairaSvgIcon="#191919" />
                    </InputLeftAddon>
                    <Input
                      noLabel
                      type="text"
                      name="amount"
                      // borderLeft="none"
                      borderLeftRadius="0px"
                      value={amount}
                      autoComplete={false}
                      onBlur={props.handleBlur}
                      placeholder="0.00"
                      onChange={e => updateAmountInputChange(e, setAmount)}
                    />
                  </InputGroup>
                  {props.errors.amount && <div id="feedback">{props.errors.amount}</div>}
                </Stack>
                <Button
                  // variant="dark"
                  variant="md-filled-radius"
                  w="full"
                  type="submit"
                  mt="10px"
                  // fontWeight={400}
                  isDisabled={!props.values.name || !amount}
                >
                  {mutation?.isLoading ? <Spinner color="#FFFFFF" /> : 'Submit'}
                </Button>
              </Box>
            )}
          </Formik>
        </Popup.Body>
      </Popup>
      {/* <ResetInputFieldsModal forFees modal={ABOUT_TO_CLEAR_ALL_FIELDS} resetFnc={handleReset} /> */}
    </div>
  );
};

export default AddNewClosingCosts;

const ClosingCostInfo = () => {
  return (
    <Flex
      w="full"
      h="fit-content"
      bg="#EAEAEA"
      borderRadius={'12px'}
      align={'center'}
      mx="auto"
      gap="10px"
      py="10px"
      px={'23px'}
      className="fade-in-animation"
    >
      <AiOutlineInfoCircle style={{height: '54px', width: '44px'}} />
      <Text fontSize={'12px'}>
        This is the point where closing costs are added (i.e. Development levy, legal fees etc).
        Fill in the title of the closing cost and input the amount. You can also add more fees
      </Text>
    </Flex>
  );
};
