import {
  useRadio,
  useRadioGroup,
  chakra,
  Stack,
  HStack,
  Badge,
  Image,
  VStack,
  Heading,
  Text,
  Button,
  StackDivider,
  Center,
} from '@chakra-ui/react';
import React from 'react';
import selectedIcon from '/src/images/icons/mark_icon.svg';

import {changeDateFormat} from '../../../../utils/formatDate';
import {IoChevronForward} from 'react-icons/io5';

export const SelectEquityRadio = ({
  handleSubScreens,
  selectedEquityId,
  setSelectedEquityId,
  setClientData,
  agentId,
  equityList,
}) => {
  const handleChange = tag => {
    setSelectedEquityId(tag);
  };
  const {getRadioProps, getRootProps} = useRadioGroup({
    onChange: handleChange,
    value: selectedEquityId,
  });

  return (
    <VStack
      spacing="14px"
      w="full"
      divider={<StackDivider my="0px !important" border="solid 1px #E4E4E4" />}
      {...getRootProps()}
    >
      {equityList.map(item => {
        return (
          <EquityInfoRadio
            key={item?.id}
            item={item}
            agentId={agentId}
            setSelectedEquityId={setSelectedEquityId}
            setClientData={setClientData}
            handleSubScreens={handleSubScreens}
            {...getRadioProps({value: `${item?.id}`})}
          />
        );
      })}
    </VStack>
  );
};
export default SelectEquityRadio;

const EquityInfoRadio = props => {
  const {item, agentId, handleSubScreens, setClientData, setSelectedEquityId, ...radioProps} =
    props;
  const {state, getInputProps, getRadioProps, htmlProps, getLabelProps} = useRadio(radioProps);

  console.log(state.isChecked, item, !!{}, item.approved_agent);

  const handleView = e => {
    e.stopPropagation();
  };
  const canNotSelect = item.approved_agent && item.approved_agent?.id !== agentId;
  return (
    <chakra.label {...htmlProps} cursor={true ? 'default' : 'pointer'} w="full">
      <input {...getInputProps({})} hidden disabled={canNotSelect} />
      <VStack
        {...getRadioProps()}
        w="full"
        p={`9px 1px`}
        cursor={canNotSelect ? 'not-allowed' : 'pointer'}
        onClick={() =>
          canNotSelect
            ? null
            : setClientData({
                id: item.id,
                project_name: item.unit.project.name,
                unit_title: item.unit.unit_title,
                photo: item?.unit?.photos?.[0]?.photo,
                payment_plan: item.payment_plan_months,
              })
        }
        // borderBottom="solid 1px #E4E4E4"
        spacing="4px"
      >
        {item.recommendation ? (
          <Badge
            alignSelf="end"
            borderRadius="20px"
            fontSize="6px"
            fontWeight="500"
            bg="#7255CB1A"
            color="#7255CB"
            px="5px"
            py="3px"
          >
            Recommended : {item.recommendation}
          </Badge>
        ) : null}
        <HStack w="full" spacing="8px">
          {/* {!item.approved_agent ? ( */}
          <Center
            align="center"
            justify="center"
            borderRadius="3px"
            p="1px"
            bg="#D9D9D9"
            overflow={`hidden`}
          >
            <Image
              src={selectedIcon.src}
              alt="selected equity icon "
              m="0"
              sx={{transition: 'ease-in-out 0.5s'}}
              transform={state.isChecked ? 'scale(1.6)' : 'scale(0.3)'}
              opacity={state.isChecked ? '1' : '0'}
              filter={`brightness(0) invert(0)`}
            />
          </Center>
          {/* ) : null} */}

          <HStack gap={`10px`} justifyContent="space-between" w="full">
            <HStack spacing="30px">
              {/* <Image
                src={item?.unit?.photos?.[0]?.photo ?? '-'}
                borderRadius="5px"
                alt="listing image"
                bg="#F5F5F5"
                fontSize="9px"
                objectFit="cover"
                width="57px"
                height="51px"
              /> */}
              <VStack align="start" gap="4px">
                <Heading as="h4" fontSize="12px" fontWeight="500" color="#4b4b4b">
                  {item?.unit?.unit_title ?? '-'}, {item?.unit?.project.name ?? '-'}
                </Heading>
                <Text mt="1px" as="span" fontSize="10px" fontWeight="400" color="#606060">
                  {item?.created_at ? changeDateFormat(item.created_at) : '-'}
                </Text>
              </VStack>
            </HStack>

            <Stack spacing="7px" align="end">
              <Button
                onClick={e =>
                  handleSubScreens(
                    e,
                    'paymentBreakDown',
                    {
                      id: item.id,
                      project_name: item.unit.project.name,
                      unit_title: item.unit.unit_title,
                      photo: item?.unit?.photos?.[0]?.photo,
                      payment_plan: item.payment_plan_months,
                    },
                    !!item.approved_agent
                  )
                }
                spacing="8.5px"
                align="center"
                justifySelf="end"
                _hover={{cursor: 'pointer', img: {transform: 'translateX(2px)'}, bg: 'transparent'}}
                fontSize="12px"
                fontWeight="400"
                // color="#4545FE"
                color="#242526"
                p="0px"
                h="fit-content"
                bg="transparent"
                _focus={{bg: 'transparent'}}
                _active={{bg: 'transparent'}}
                // rightIcon={
                // <Image
                //   sx={{transition: 'ease-in-out 0.2s'}}
                //   src={arrow.src}
                //   alt="right arrow icon"
                // />
                // <IoChevronForward fontSize={`12px`} />
                // }
              >
                <HStack gap={`4px`}>
                  <Text>view</Text>
                  <IoChevronForward fontSize={`12px`} />
                </HStack>
              </Button>

              {!!item.approved_agent ? (
                <Text fontSize="8px" fontWeight="300" color="#3D3D3D" textAlign={`right`}>
                  Closed by{' '}
                  <Text as="span" textTransform="capitalize">
                    {`${item.approved_agent?.first_name ?? '-'} ${
                      item.approved_agent?.last_name ?? '-'
                    }`}
                  </Text>
                </Text>
              ) : null}
            </Stack>
          </HStack>
        </HStack>
      </VStack>
    </chakra.label>
  );
};
