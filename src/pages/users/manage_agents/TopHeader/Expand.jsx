import {useState} from 'react';
import {theme, themeStyles} from '../../../../theme';
import {
  Box,
  Container,
  extendTheme,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Image,
  Progress,
  Stack,
  Text,
} from '@chakra-ui/react';

import {useRouter} from 'next/router';
import backArrow from '/src/images/icons/back-arrow.png';
import AgentInfoCard from '@/components/manageAgent/agentInfoCard';

const styles = extendTheme({...theme});

export const ExpandAgentsOverview = ({
  units_sold,

  agent_num,
}) => {
  const [showProgress, setShowProgress] = useState(false);
  const router = useRouter();
  const handleBack = () => {
    router.back(-1);
  };

  const agentInfoList = [
    {
      heading: `Total Certified Realtors`,
      hasAssets: true,
      value: agent_num ?? 0,
    },
    {
      heading: `Total Unit Sold`,
      hasAssets: true,
      value: units_sold ?? 0,
    },
  ];
  return (
    <Stack spacing="none" w="full">
      {showProgress && <Progress mt="-3vh" size="xs" isIndeterminate />}
      <HStack mb="27px" justify="space-between" align="center">
        <HStack>
          <Image
            onClick={handleBack}
            style={{cursor: 'pointer'}}
            mr={2}
            height="50px"
            w="50px"
            src={backArrow.src}
            alt="back_arrow"
          />
          <Heading {...styles.textStyles.h3}>Certified Realtors</Heading>
        </HStack>
      </HStack>
      <Grid templateColumns={{base: '1fr', lg: 'repeat(2, 1fr)'}} w="full" gap="24px">
        {agentInfoList.map((info, idx) => (
          <GridItem key={idx} colSpan={1}>
            <AgentInfoCard hasAssets={info.hasAssets} heading={info.heading} value={info.value} />
          </GridItem>
        ))}
      </Grid>
    </Stack>
  );
};

export default ExpandAgentsOverview;
