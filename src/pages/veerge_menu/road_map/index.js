import {Box, Center, Flex, Text} from '@chakra-ui/react';
import React from 'react';
import {LayoutView} from '../../../components/PageLayout/LayoutView';
import road_map_data, {colorPicker} from '../../../constants/road_map_data';

export const RoadMap = () => {
  return (
    <LayoutView>
      <Box mt="100px">
        <Text fontSize={'32px'} fontWeight={700}>
          Road Map
        </Text>

        <Flex direction={'column'} align={'stretch'} px="35px" py="25px">
          {road_map_data.map((roadMap, i) => (
            <Flex
              key={i}
              borderLeft={'1px solid #E4E4E4'}
              align="center"
              pb="35px"
              w="100%"
              justify="flex-start"
            >
              <Box
                ml="-5px"
                w="10px"
                h="10px"
                borderRadius={'full'}
                bg={roadMap?.current ? '#4545FE' : '#E4E4E4'}
              />
              <Text
                ml="20px"
                w="17%"
                color="#191919"
                fontSize={'20px'}
                fontWeight={roadMap?.current ? 500 : 400}
              >
                {roadMap?.date}
              </Text>
              <Box w="25%">
                <Center
                  px="13px"
                  py="8px"
                  borderRadius="full"
                  bg={colorPicker[roadMap?.color][1]}
                  h="fit-content"
                  w="fit-content"
                >
                  <Text color={colorPicker[roadMap?.color][0]} fontSize={'14px'} fontWeight={500}>
                    {roadMap?.tagName}
                  </Text>
                </Center>
              </Box>
              <Text w="58%" fontSize={'16px'} fontWeight={300} color="#3D3D3D">
                {roadMap?.description}
              </Text>
            </Flex>
          ))}
        </Flex>
      </Box>
    </LayoutView>
  );
};

export default RoadMap;
