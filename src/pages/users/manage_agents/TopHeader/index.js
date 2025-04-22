import {Box} from '@chakra-ui/react';
import {AnimatePresence, motion} from 'framer-motion';
import React, {useState} from 'react';
import CollapseOverview from './Collapse';
import {ExpandAgentsOverview} from './Expand';

export default function TopHeader({isError, handleExpand, data, expand}) {
  return (
    <Box>
      {expand && (
        <motion.div>
          <ExpandAgentsOverview {...data} isError={isError} handleExpand={handleExpand} />
        </motion.div>
      )}
    </Box>
  );
}
